import dbConnect from "@/lib/dbConnect";
import MotorableRoute from "@/model/MotorableRoute";
import TrekRoute from "@/model/TrekRoute";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;

    const trekName = searchParams.get("trekName") || "";
    const to = searchParams.get("to") || "";

    const trekRoutes = await TrekRoute.find({
      trekName: { $regex: trekName, $options: "i" },
    });

    return NextResponse.json(trekRoutes);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch routes" },
      { status: 500 },
    );
  }
};
