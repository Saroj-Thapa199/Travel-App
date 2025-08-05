import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Review from "@/model/Review";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
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

    const userId = session.user.id;

    // const reviews = await Review.find({ user: userId }).populate({
    //   path: "destination",
    //   select: "name", // only include the name field
    // });

    const reviews = await Review.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "destinations",
          localField: "destination",
          foreignField: "_id",
          as: "destinationData",
        },
      },
      { $unwind: "$destinationData" },
      {
        $project: {
          _id: 1,
          rating: 1,
          comment: 1,
          destination: "$destinationData.name",
          createdAt: 1,
          updatedAt: 1,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    return NextResponse.json(reviews);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
};
