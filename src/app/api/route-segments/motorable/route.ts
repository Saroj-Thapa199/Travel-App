import dbConnect from "@/lib/dbConnect";
import MotorableRoute from "@/model/MotorableRoute";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;

    const from = searchParams.get("from") || "";
    const to = searchParams.get("to") || "";

    const motorableRoutes = await MotorableRoute.find({
      $and: [
        { from: { $regex: from, $options: "i" } },
        { to: { $regex: to, $options: "i" } },
      ],
    });

    return NextResponse.json(motorableRoutes);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch routes" },
      { status: 500 },
    );
  }
};
