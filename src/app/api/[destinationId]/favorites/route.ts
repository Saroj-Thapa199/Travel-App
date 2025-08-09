import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Destination from "@/model/Destination";
import Favorite from "@/model/Favorite";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";


type Params = Promise<{ destinationId: string }>;

// GET: get favorites count and check if current user favorited
export const GET = async (
  request: NextRequest,
  segmentData: { params: Params },
) => {
  try {
    const params = await segmentData.params;
    const { destinationId } = params;

    await dbConnect();
    const session = await auth();

    if (!mongoose.isValidObjectId(destinationId)) {
      return NextResponse.json(
        { error: "Invalid destination id" },
        { status: 400 },
      );
    }

    // Count how many users favorited this destination
    const favoritesCount = await Favorite.countDocuments({
      destination: destinationId,
    });

    


    let addedToFavoritesByUser = false;

    if (session?.user?.id && mongoose.isValidObjectId(session.user.id)) {
      // Check if current user has favorited this destination
      const existingFavorite = await Favorite.findOne({
        destination: destinationId,
        user: session.user.id,
      });
      addedToFavoritesByUser = !!existingFavorite;
    }

    return NextResponse.json({
      favorites: favoritesCount,
      addedToFavoritesByUser,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch favorites info" },
      { status: 500 },
    );
  }
};


// POST: add favorite
export const POST = async (
  request: NextRequest,
  segmentData: { params: Params },
) => {
  try {
    const params = await segmentData.params;
    const { destinationId } = params;

    await dbConnect();

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!mongoose.isValidObjectId(destinationId)) {
      return NextResponse.json(
        { error: "Invalid destination id" },
        { status: 400 },
      );
    }

    // Check if favorite already exists to avoid duplicates (unique index helps too)
    const existingFavorite = await Favorite.findOne({
      destination: destinationId,
      user: session.user.id,
    });

    if (!existingFavorite) {
      await Favorite.create({
        user: session.user.id,
        destination: destinationId,
      });
    }

    const favoritesCount = await Favorite.countDocuments({
      destination: destinationId,
    });

    await Destination.findByIdAndUpdate(destinationId, {favorites: favoritesCount})

    return NextResponse.json({
      favorites: favoritesCount,
      addedToFavoritesByUser: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to add to favorites" },
      { status: 500 },
    );
  }
};

// DELETE: remove favorite
export const DELETE = async (
  request: NextRequest,
  segmentData: { params: Params },
) => {
  try {
    const params = await segmentData.params;
    const { destinationId } = params;

    await dbConnect();

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!mongoose.isValidObjectId(destinationId)) {
      return NextResponse.json(
        { error: "Invalid destination id" },
        { status: 400 },
      );
    }

    await Favorite.deleteOne({
      destination: destinationId,
      user: session.user.id,
    });

    const favoritesCount = await Favorite.countDocuments({
      destination: destinationId,
    });

    await Destination.findByIdAndUpdate(destinationId, {favorites: favoritesCount})

    return NextResponse.json({
      favorites: favoritesCount,
      addedToFavoritesByUser: false,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to remove from favorites" },
      { status: 500 },
    );
  }
};
