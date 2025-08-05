"use server";

import Collection from "@/model/Collection";
import dbConnect from "../dbConnect";
import {
  createCollectionSchema,
  CreateCollectionType,
} from "../validations/collection";
import { auth } from "@/auth";

type CreateCollectionReturnType =
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      userId: string;
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
    const data = await createCollectionSchema.parseAsync(values);

    await dbConnect();

    await Collection.create({
      ...data,
      user: session.user.id,
    });

    return {
      success: true,
      userId: session.user.id,
    };
  } catch (error) {
    console.error("Collection creation failed:", error);
    return { success: false, error: "Something went wrong. Please try again" };
  }
};

type editCollectionParameters = {
  editData: Omit<CreateCollectionType, "destinations">;
  collectionId: string;
};

export const editCollection = async ({
  editData,
  collectionId,
}: editCollectionParameters): Promise<CreateCollectionReturnType> => {
  try {
    const session = await auth();
    if (!session || !session.user.id) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    await dbConnect();

    const collection = await Collection.findById(collectionId);

    if (collection?.user.toString() !== session.user.id) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    collection.name = editData.name;
    collection.description = editData.description;
    collection.visibility = editData.visibility;

    await collection.save();

    console.log(collection);

    return {
      success: true,
      userId: session.user.id,
    };
  } catch (error) {
    console.error("Collection creation failed:", error);
    return { success: false, error: "Something went wrong. Please try again" };
  }
};

type deleteCollectionReturnType = 
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      userId: string;
      collectionId: string
    };


export const deleteCollection = async (collectionId: string): Promise<deleteCollectionReturnType> => {
  try {
    const session = await auth();
    if (!session || !session.user.id) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    await dbConnect();

    const collection = await Collection.findById(collectionId).select("user");

    if (collection?.user.toString() !== session.user.id) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    await Collection.findByIdAndDelete(collectionId)

    console.log(collection);

    return {
      success: true,
      userId: session.user.id,
      collectionId: collection.id
    };
  } catch (error) {
    console.error("Collection creation failed:", error);
    return { success: false, error: "Something went wrong. Please try again" };
  }
};
