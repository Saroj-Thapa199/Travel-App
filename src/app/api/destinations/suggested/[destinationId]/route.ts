import dbConnect from "@/lib/dbConnect";
import Destination from "@/model/Destination";
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

    await dbConnect();

    if (!mongoose.isValidObjectId(destinationId)) {
      return NextResponse.json(
        {
          error: "Invalid destination id",
        },
        { status: 400 },
      );
    }

    const destination = await Destination.findById(destinationId, "categories bestSeason");
    if (!destination) {
      return NextResponse.json(
        {
          error: "No destination found for given id",
        },
        { status: 400 },
      );
    }

    const suggestedDestinations = await Destination.aggregate([
      {
        $match: {
          _id: { $ne: destination._id },
          categories: { $in: destination.categories },
        },
      },
      {
        $addFields: {
          matchCount: {
            $size: {
              $setIntersection: ["$categories", destination.categories],
            },
          },
          randomOrder: { $rand: {} }, // 👈 Add a random number
        },
      },
      {
        $sort: {
          matchCount: -1, // Primary sort
          randomOrder: 1, // Secondary sort (random)
        },
      },
      {
        $limit: 3,
      },
      {
        $project: {
          matchCount: 0,
          randomOrder: 0,
        },
      },
    ]);

    const alreadyIncludedIds = [
      destination._id,
      ...suggestedDestinations.map((d) => d._id),
    ];

    // --- Step 2: If < 3, add season-based suggestions ---
    if (suggestedDestinations.length < 3 && destination.bestSeason.length) {
      const seasonMatches = await Destination.aggregate([
        {
          $match: {
            _id: { $nin: alreadyIncludedIds },
            season: { $in: destination.bestSeason },
          },
        },
        {
          $addFields: {
            matchCount: {
              $size: { $setIntersection: ["$season", destination.bestSeason] },
            },
            randomOrder: { $rand: {} },
          },
        },
        { $sort: { matchCount: -1, randomOrder: 1 } },
        { $limit: 3 - suggestedDestinations.length },
        { $project: { matchCount: 0, randomOrder: 0 } },
      ]);

      seasonMatches.forEach(destination => {
        suggestedDestinations.push(destination)
      })

      alreadyIncludedIds.push(...seasonMatches.map((d) => d._id));
    }

    // --- Step 3: If still < 3, random fallback ---
    if (suggestedDestinations.length < 3) {
      const randomFill = await Destination.aggregate([
        {
          $match: {
            _id: { $nin: alreadyIncludedIds },
          },
        },
        { $sample: { size: 3 - suggestedDestinations.length } },
      ]);

      randomFill.forEach(destination => {
        suggestedDestinations.push(destination)
      })
    }

    return NextResponse.json(suggestedDestinations);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch suggested destinations" },
      { status: 500 },
    );
  }
};
