import dbConnect from "@/lib/dbConnect";
import MotorableRoute from "@/model/MotorableRoute";
import Route from "@/model/Route";
import TrekRoute from "@/model/TrekRoute";
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

    await MotorableRoute.countDocuments()
    await TrekRoute.countDocuments()

    const route = await Route.find({ destination: destinationId })
      .populate("motorableRoute")
      .populate("trekRoute");

    return NextResponse.json(route);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch route" }, { status: 500 });
  }
};
