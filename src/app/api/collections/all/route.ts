import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Collection from "@/model/Collection";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await auth();
    await dbConnect();

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

    // TODO: remove this delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return NextResponse.json(collections);
  } catch (error) {
    return Response.json(
      { error: "Failed to add to favorites" },
      { status: 500 },
    );
  }
};
