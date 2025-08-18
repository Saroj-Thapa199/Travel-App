import dbConnect from "@/lib/dbConnect";
import Collection from "@/model/Collection";
import Destination from "@/model/Destination";
import mongoose, { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ collectionId: string; destinationId: string }>;

export const POST = async (
  request: NextRequest,
  segmentData: { params: Params },
) => {
  try {
    const { collectionId, destinationId } = await segmentData.params;

    await dbConnect();

    if (!isValidObjectId(destinationId) || !isValidObjectId(collectionId)) {
      return NextResponse.json(
        { error: "Invalid collection id or destination id" },
        { status: 400 },
      );
    }

    const collection = await Collection.findById(collectionId);
    if (!collection) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 },
      );
    }

    // ✅ Check if destination exists
    const destination = await Destination.findById(destinationId);
    if (!destination) {
      return NextResponse.json(
        { error: "Destination not found" },
        { status: 404 },
      );
    }

    // Add destination only if it's not already present
    collection.destinations = [
      new mongoose.Types.ObjectId(destinationId),
      ...collection.destinations,
    ];

    const uniqueDestinations = [
      ...new Set(collection.destinations.map((id) => id.toString())),
    ].map((idStr) => new mongoose.Types.ObjectId(idStr));

    collection.destinations = uniqueDestinations;
    await collection.save();

    return NextResponse.json("ok");
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};

export const DELETE = async (
  request: NextRequest,
  segmentData: { params: Params },
) => {
  try {
    const params = await segmentData.params;
    const { collectionId, destinationId } = params;

    await dbConnect();

    if (!isValidObjectId(destinationId) || !isValidObjectId(collectionId)) {
      return NextResponse.json(
        {
          error: "Invalid collection id or destination id",
        },
        { status: 400 },
      );
    }

    const collection = await Collection.findById(collectionId);

    if (!collection) {
      return NextResponse.json(
        {
          error: "Collection not found",
        },
        { status: 404 },
      );
    }

    collection.destinations = collection.destinations.filter(
      (destination) => destination._id.toString() !== destinationId,
    );

    await collection.save();
    return NextResponse.json("ok");
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
