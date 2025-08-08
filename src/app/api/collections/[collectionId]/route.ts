import dbConnect from "@/lib/dbConnect";
import Collection from "@/model/Collection";
import { NextRequest, NextResponse } from "next/server";
import "@/lib/loadModels";
import { isValidObjectId } from "mongoose";

type Params = Promise<{ collectionId: string }>;

export const GET = async (
  request: NextRequest,
  segmentData: { params: Params },
) => {
  try {
    const { collectionId } = await segmentData.params;
    await dbConnect();

    if (!isValidObjectId(collectionId)) {
      return NextResponse.json(
        { error: "Invalid collection id" },
        { status: 400 },
      );
    }

    const collection =
      await Collection.findById(collectionId).populate("destinations");

    if (!collection) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(collection);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
