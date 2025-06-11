import { ReviewType } from "@/lib/validation";
import mongoose, { Document, Schema } from "mongoose";

export interface ReviewInterface extends Omit<ReviewType, "_id" | "destination" | "user">, Document {
  user: mongoose.Types.ObjectId;
  destination: mongoose.Types.ObjectId;
}

const ReviewSchema: Schema<ReviewInterface> = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: String,
  },
  { timestamps: true },
);

const Review =
  (mongoose.models.Review as mongoose.Model<ReviewInterface>) ||
  mongoose.model<ReviewInterface>("Review", ReviewSchema);

export default Review;
