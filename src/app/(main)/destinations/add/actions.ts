"use server";

import dbConnect from "@/lib/dbConnect";
import { DestinationType } from "@/lib/validation";
import Destination from "@/model/Destination";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import slugify from "slugify"

export const addDestination = async (
  values: DestinationType,
): Promise<{ error: string }> => {
  try {
    await dbConnect();
    await Destination.syncIndexes()

    const createdDestination = await Destination.create({
      ...values,
      slug: slugify(values.name)
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
