import dbConnect from "@/lib/dbConnect";
import Destination from "@/model/Destination";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();

    const destinations = await Destination.aggregate([
      { $sample: { size: 6 } },
    ]);

    return NextResponse.json(destinations);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
};
