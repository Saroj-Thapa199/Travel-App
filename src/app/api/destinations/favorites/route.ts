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
    const cursor = Number(searchParams.get("cursor"));
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

    const results = await Favorite.find({ user: session.user.id })
      .populate<{ destination: DestinationInterface }>("destination")
      .sort({ createdAt: -1 })
      .skip(cursor)
      .limit(limit + 1);

    const hasNextPage = results.length > limit;

    const nextCursor = hasNextPage ? cursor + limit : null;

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
