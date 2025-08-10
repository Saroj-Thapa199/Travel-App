import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Review from "@/model/Review";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const cursor = Number(searchParams.get("cursor"));
    const limit = searchParams.get("limit")
      ? Number(searchParams.get("limit"))
      : 10;
    const session = await auth();

    if (!session || !session.user.id) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }
    
    await dbConnect();

    let query: any = { user: session.user.id };

    if (cursor) {
      query.createdAt = { $lte: new Date(Number(cursor)) };
    }

    const results = await Review.find(query)
      .populate({
        path: "destination",
        select: "name slug",
      })
      .sort({ createdAt: -1 })
      .limit(limit + 1)
      .lean();

    const hasNextPage = results.length > limit;

    const reviews = hasNextPage ? results.slice(0, -1) : results;

    const nextCursor = hasNextPage
      ? results[results.length - 1].createdAt.getTime()
      : null;

    // const reviews = await Review.aggregate([
    //   { $match: { user: new mongoose.Types.ObjectId(userId) } },
    //   {
    //     $lookup: {
    //       from: "destinations",
    //       localField: "destination",
    //       foreignField: "_id",
    //       as: "destinationData",
    //     },
    //   },
    //   { $unwind: "$destinationData" },
    //   {
    //     $project: {
    //       _id: 1,
    //       rating: 1,
    //       comment: 1,
    //       destination: "$destinationData.name",
    //       createdAt: 1,
    //       updatedAt: 1,
    //     },
    //   },
    //   { $sort: { createdAt: -1 } },
    // ]);

    return NextResponse.json({
      reviews,
      nextCursor,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
};
