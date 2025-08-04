"use server";

import Collection from "@/model/Collection";
import dbConnect from "../dbConnect";
import {
  createCollectionSchema,
  CreateCollectionType,
} from "../validations/collection";
import { auth } from "@/auth";
import { cleanUrl } from "../utils";
import { CollectionType } from "../types";
import { InferSchemaType } from "mongoose";

type CreateCollectionReturnType =
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      userId: string
    };

export const createCollection = async (
  values: CreateCollectionType,
): Promise<CreateCollectionReturnType> => {
  try {
    const session = await auth();
    if (!session || !session.user.id) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }
    const { success, data, error } = createCollectionSchema.safeParse(values);

    if (!success) {
      console.log(error.message);
      return {
        success: false,
        error: "Please fill the form properly",
      };
    }

    await dbConnect();

    if (data.coverImage) {
      data.coverImage = cleanUrl(data.coverImage);
    }

    const collectionDoc = await Collection.create({
      ...data,
      user: session.user.id,
    });
    const collection = (
      await collectionDoc.populate("destinations")
    ).toObject();

    console.log(collection);
    return {
      success: true,
      userId: session.user.id
    };
  } catch (error) {
    console.error("Collection creation failed:", error);
    return { success: false, error: "Something went wrong. Please try again" };
  }
};
