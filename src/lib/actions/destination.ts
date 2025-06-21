"use server";

import dbConnect from "@/lib/dbConnect";
import Destination from "@/model/Destination";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { DestinationFormType } from "../types";

export const addDestination = async (
  values: DestinationFormType,
): Promise<{ error: string }> => {
  try {
    console.log("submitted")
    await dbConnect();
    await Destination.syncIndexes();

    
    const createdDestination = await Destination.create({
      ...values,
      slug: slugify(values.name, {lower: true}),
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
