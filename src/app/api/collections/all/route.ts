import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import "@/lib/loadModels";
import Collection from "@/model/Collection";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();
    const session = await auth();

    if (!session || !session.user.id) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const collections = await Collection.find({
      user: session.user.id,
    })
      .populate("destinations", "name region image")
      .sort({ createdAt: -1 });

    return NextResponse.json(collections);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch collections" },
      { status: 500 },
    );
  }
};
