"use server";

import dbConnect from "@/lib/dbConnect";
import Destination from "@/model/Destination";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { DestinationFormType } from "../types";
import { destinationSchema } from "../validation";

export const addDestination = async (
  values: DestinationFormType,
): Promise<{ error: string }> => {
  try {
    console.log("submitted")
    const parsedValues = destinationSchema.omit({
        _id: true,
        slug: true,
        createdAt: true,  
        updatedAt: true,
        averageRating: true,
        reviewCount: true,
        // categories: true
      }).parse(values)
    console.log("values:")
    console.log(JSON.stringify(values, null, 2))
    console.log("parsedValues:")
    console.log(JSON.stringify(parsedValues, null, 2))

    const {success, data, error} = destinationSchema.omit({
        _id: true,
        slug: true,
        createdAt: true,  
        updatedAt: true,
        averageRating: true,
        reviewCount: true,
      }).safeParse(values)
      
      if (!success) {
        return {error: "Please fill out the form properly!"}
      }

    await dbConnect();
    await Destination.syncIndexes();
    
    const createdDestination = await Destination.create({
      ...data,
      slug: slugify(data.name, {lower: true}),
    });

    return redirect(`/destinations/${createdDestination.slug}`);
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log(error);
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error as any).code === 11000
    ) {
      console.log("mongo error");
      return { error: "Destination name already taken" };
    }
    return { error: "Something went wrong. PLease try again" };
  }
};

export const getAllDestinaitons = async () => {
  try {
    await dbConnect();

    const destinations = Destination.find();

    return destinations;
  } catch (error) {
    console.log(error);
  }
};

export const getDestinationFromSlug = async (slug: string) => {
  try {
    await dbConnect();

    const destination = await Destination.findOne({ slug });

    return destination;
  } catch (error) {
    console.log(error);
  }
};
