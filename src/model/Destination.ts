import { DestinationType } from "@/lib/validation";
import mongoose, { Document, Schema } from "mongoose";

interface DestinationInterface
  extends Omit<DestinationType, "_id" | "createdAt" | "updatedAt">,
    Document {
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const DestinationSchema: Schema<DestinationInterface> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    region: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
      maxlength: 150,
    },
    longDescription: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      required: true,
      validate: {
        validator: (val: string[]) => val.length >= 1 && val.length <= 3,
        message: "Select 1 to 3 categories only",
      },
      enum: [
        "Mountain",
        "Hill Station",
        "City",
        "Village",
        "Pilgrimage",
        "Adventure",
        "Wildlife",
        "Cultural Heritage",
        "Natural Attraction",
      ],
    },
    image: {
      type: String,
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Destination =
  (mongoose.models.Destination as mongoose.Model<DestinationInterface>) ||
  mongoose.model<DestinationInterface>("Destination", DestinationSchema);

export default Destination;
