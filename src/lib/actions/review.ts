"use server";

import Review from "@/model/Review";
import dbConnect from "../dbConnect";
import { auth } from "@/auth";
import mongoose from "mongoose";
import { ReviewFormType } from "../types";
import { destinationSchema, populatedReviewSchema, reviewSchema } from "../validation";
import { z } from "zod";
import { IUserDocument } from "@/model/User";

export const createReview = async (
  values: ReviewFormType & { destination: string },
) => {
  try {
    await dbConnect();

    const session = await auth();
    if (!session || !session.user?.id) {
      return { success: false, error: "Unauthenticated" };
    }

    if (!mongoose.Types.ObjectId.isValid(values.destination)) {
      return { success: false, error: "Invalid destination ID" };
    }

    console.log({
      ...values,
      user: new mongoose.Types.ObjectId(session.user.id),
      destination: new mongoose.Types.ObjectId(values.destination),
    });

    const reviewDoc = await Review.create({
      ...values,
      user: new mongoose.Types.ObjectId(session.user.id),
      destination: new mongoose.Types.ObjectId(values.destination),
    });

    const review = reviewSchema.parse(reviewDoc);

    return { success: true, data: review };
  } catch (error) {
    console.error("Review creation failed:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
};

export const getDestinationReviews = async (destinationId: string) => {
  try {
    await dbConnect();

    const reviewsDoc = await Review.find({
      destination: destinationId,
    }).populate<{ user: IUserDocument }>("user", "name image -_id");
    if (reviewsDoc.length === 0) return { success: false, error: "No reviews" };

    // const formattedReviewsDoc = reviewsDoc.map((review) => {
    //   const obj = review.toObject();
    //   return { ...obj };
    // });

    const reviews = z.array(populatedReviewSchema).parse(reviewsDoc);

    return { success: true, data: reviews };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Something went wrong." };
  }
};
