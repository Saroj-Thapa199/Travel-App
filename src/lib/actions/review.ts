"use server";

import Review from "@/model/Review";
import dbConnect from "../dbConnect";
import { auth } from "@/auth";
import mongoose, { isValidObjectId } from "mongoose";
import { ReviewFormType } from "../types";
import {
  EditReviewType,
  reviewSchema,
  ReviewType,
} from "../validations/review";
import Destination from "@/model/Destination";

type createReviewReturnType =
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      review: ReviewType;
    };

export const createReview = async (
  values: ReviewFormType & { destinationId: string },
): Promise<createReviewReturnType> => {
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

    const review = reviewSchema.parse(reviewDoc);

    // const review = populatedReviewSchema.parse(populatedReview);

    return { success: true, review };
  } catch (error) {
    console.error("Review creation failed:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
};

type deleteReviewReturnType =
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      userId: string;
      destinationId: string;
    };

export const deleteReview = async (
  reviewId: string,
): Promise<deleteReviewReturnType> => {
  try {
    await dbConnect();

    const session = await auth();
    if (!session || !session.user?.id) {
      return { success: false, error: "Unauthenticated" };
    }

    if (!isValidObjectId(reviewId)) {
      return { success: false, error: "Invalid review id" };
    }

    const review = await Review.findById(reviewId, "user destination").lean();

    if (!review) {
      return { success: false, error: "Unable to find matching review" };
    }

    if (review.user.toString() !== session.user.id) {
      return { success: false, error: "Unauthorized" };
    }

    await Review.findByIdAndDelete(reviewId);

    return {
      success: true,
      userId: session.user.id,
      destinationId: review.destination.toString(),
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Something went wrong. Please try again later",
    };
  }
};

type editReviewParams = {
  editData: EditReviewType;
  reviewId: string;
};

export const editReview = async ({
  editData,
  reviewId,
}: editReviewParams): Promise<createReviewReturnType> => {
  try {
    const session = await auth();
    if (!session || !session.user.id) {
      return { success: false, error: "Unauthenticated" };
    }

    if (!isValidObjectId(reviewId)) {
      return { success: false, error: "Invalid review id" };
    }

    const reviewDoc = await Review.findById(reviewId);

    console.log({ before: reviewDoc });

    if (!reviewDoc) {
      return { success: false, error: "Unable to find matching review" };
    }

    if (reviewDoc.user.toString() !== session.user.id) {
      return { success: false, error: "Unauthorized" };
    }

    reviewDoc.rating = editData.rating;
    reviewDoc.comment = editData.comment;

    await reviewDoc.save();

    console.log({ after: reviewDoc });

    const review = reviewSchema.parse(reviewDoc);

    return {
      success: true,
      review,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Something went wrong. Please try again later",
    };
  }
};
