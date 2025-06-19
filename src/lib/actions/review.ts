"use server";

import Review from "@/model/Review";
import dbConnect from "../dbConnect";
import { auth } from "@/auth";
import mongoose from "mongoose";
import { ReviewFormType } from "../types";
import { populatedReviewSchema } from "../validation";
import { z } from "zod";
import { IUserDocument } from "@/model/User";
import Destination from "@/model/Destination";

export const createReview = async (
  values: ReviewFormType & { destinationId: string },
) => {
  try {
    await dbConnect();

    
    const session = await auth();
    if (!session || !session.user?.id) {
      return { success: false, error: "Unauthenticated" };
    }
    
    if (!mongoose.Types.ObjectId.isValid(values.destinationId)) {
      return { success: false, error: "Invalid destination ID" };
    }
    
    // TODO: remove unnecessary consoles
    // console.log({
    //   ...values,
    //   user: session.user.id,
    //   destination: values.destinationId,
    // });

    const reviewDoc = await Review.create({
      ...values,
      user: session.user.id,
      destination: values.destinationId,
    });

    const destination = await Destination.findById(values.destinationId);

    if (destination) {
      let avgRating: number;
      if (destination.reviewCount === 0) {
        avgRating = reviewDoc.rating;
      } else {
        avgRating =
          (destination.averageRating * destination.reviewCount +
            reviewDoc.rating) /
          (destination.reviewCount + 1);
      }
      destination.averageRating = avgRating;
      destination.reviewCount += 1;
      await destination.save();
    }

    const populatedReview = await reviewDoc.populate<{
      user: IUserDocument;
    }>("user", "name image -_id");

    console.log(populatedReview)

    const review = populatedReviewSchema.parse(populatedReview);

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
