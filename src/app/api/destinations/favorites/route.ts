import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Destination, { DestinationInterface } from "@/model/Destination";
import Favorite from "@/model/Favorite";
import { NextRequest, NextResponse } from "next/server";
import "@/lib/loadModels";
import { FavoriteDestinationsApiResponse } from "@/app/hooks/useFavoriteDestinations";

export const GET = async (request: NextRequest) => {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const cursor = searchParams.get("cursor");
    const limit = searchParams.get("limit")
      ? Number(searchParams.get("limit"))
      : 12;
    const session = await auth();

    if (!session || !session.user.id) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }

    // Start building the query
    let query: any = { user: session.user.id };

    // If a cursor is provided, query for documents created before the cursor (or use _id if preferred)
    if (cursor) {
      query.createdAt = { $lt: new Date(Number(cursor)) }; // Assuming cursor is a timestamp of 'createdAt'
    }

    const results = await Favorite.find(query)
      .populate<{ destination: DestinationInterface }>("destination")
      .sort({ createdAt: -1 }) // Sort by createdAt descending
      .limit(limit + 1); // Fetch limit + 1 to check for next page

    const hasNextPage = results.length > limit;

    const nextCursor = hasNextPage
      ? results[results.length - 1].createdAt.getTime()
      : null;

    const favorites = hasNextPage ? results.slice(0, -1) : results;

    const favoriteDestinations = favorites.map((favorite) =>
      favorite.destination.toObject(),
    );

    return NextResponse.json<FavoriteDestinationsApiResponse>({
      destinations: favoriteDestinations,
      nextCursor,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch favorite destinations" },
      { status: 500 },
    );
  }
};
