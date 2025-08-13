import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import "@/lib/loadModels";
import {
  updateProfileSchema,
  UpdateProfileValues,
} from "@/lib/validations/auth";
import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

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

    const userData = await User.findById(session.user.id);

    if (!userData) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(userData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 },
    );
  }
};

export const PATCH = async (request: NextRequest) => {
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

    const body = await request.json();

    const parsedData = updateProfileSchema
      .omit({
        email: true,
        username: true,
      })
      .parse(body);

    const updatedData = await User.findByIdAndUpdate(
      session.user.id,
      parsedData,
      { new: true },
    ).lean();

    console.log({ updatedData });

    if (!updatedData) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        { status: 404 },
      );
    }

    const { _id, __v, ...requiredData } = updatedData;
    return NextResponse.json({ ...requiredData, id: _id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 },
    );
  }
};
