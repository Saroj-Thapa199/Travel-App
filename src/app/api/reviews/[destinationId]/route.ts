import dbConnect from "@/lib/dbConnect";
import Review from "@/model/Review";
import { IUserDocument } from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ destinationId: string }>;

export const GET = async (
  request: NextRequest,
  segmentData: { params: Params },
) => {
  try {
    const params = await segmentData.params;
    const { destinationId } = params;

    await dbConnect();

    const reviews = await Review.find({ destination: destinationId }).populate<{
      user: IUserDocument;
    }>("user", "name image -_id");

    // if (reviews.length === 0)
    //   return NextResponse.json({ error: "No reviews yet" }, { status: 404 });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
};
