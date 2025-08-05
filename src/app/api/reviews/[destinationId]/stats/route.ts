import Review from "@/model/Review";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ destinationId: string }>;

export const GET = async (
  request: NextRequest,
  segmentData: { params: Params },
) => {
  try {
    const params = await segmentData.params;
    const { destinationId } = params;

    const reviews = await Review.aggregate([
      { $match: { destination: new mongoose.Types.ObjectId(destinationId) } },
      { $group: { _id: "$rating", count: { $sum: 1 } } },
      {
        $group: {
          _id: null,
          ratings: { $push: { k: { $toString: "$_id" }, v: "$count" } },
          totalCount: { $sum: "$count" },
          totalScore: { $sum: { $multiply: ["$_id", "$count"] } },
        },
      },
      {
        $project: {
          _id: 0,
          totalCount: 1,
          averageRating: {
            $cond: [
              { $eq: ["$totalCount", 0] },
              0,
              { $round: [{ $divide: ["$totalScore", "$totalCount"] }, 1] }, // round to 1 decimal
            ],
          },
          ratings: { $arrayToObject: "$ratings" },
        },
      },
    ]);

    const rawStats = reviews[0]; // or we can do like const [rawStats] = await Review.aggregrate[...]

    const reviewStats: {
      averageRating: number;
      totalCount: number;
      ratings: Record<string, number | string>;
    } = {
      totalCount: rawStats?.totalCount || 0,
      averageRating: rawStats?.averageRating || 0,
      ratings: {},
    };

    for (let i = 1; i <= 5; i++) {
      reviewStats.ratings[i] = rawStats?.ratings?.[i] ?? 0;
    }

    // console.log(reviewStats);

    return NextResponse.json(reviewStats);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch review stats" },
      { status: 500 },
    );
  }
};
