import { DestinationType } from "@/lib/validations/destination";
import mongoose, { Document, Schema } from "mongoose";

export interface DestinationInterface
  extends Omit<DestinationType, "_id" | "createdAt" | "updatedAt" | "user">,
    Document {
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
  user: mongoose.Types.ObjectId;
}

const highlightSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const localCuisineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      maxLength: [200, "Cuisine description cannot exceed 200 characters"],
    },
  },
  { _id: false },
);

const accommodationschema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      maxLength: [150, "accommodation description cannot exceed 150 characters"],
    },
  },
  { _id: false },
);

const seasonDetailSchema = new mongoose.Schema(
  {
    season: {
      type: String,
      enum: ["Spring", "Summer", "Monsoon", "Autumn", "Winter"],
      required: true,
    },
    bestFor: {
      type: [String], // e.g. ["Bird watching", "Photography"]
      required: true,
    },
    weather: String, // short explanation
    notes: String,   // hazards, festivals, tips
  },
  { _id: false }
);


const DestinationSchema: Schema<DestinationInterface> = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    favorites: {
      type: Number,
      default: 0,
    },
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
    featured: {
      type: Boolean,
      default: false,
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
    bestSeason: {
      type: [String],
      required: true,
      validate: {
        validator: (val: string[]) => val.length >= 1,
        message: "Select at least 1 season",
      },
      enum: ["Spring", "Summer", "Monsoon", "Autumn", "Winter", "Year-round"],
    },
    image: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    activities: {
      type: [String],
      required: true,
      validate: {
        validator: (val: string[]) => val.length >= 1,
        message: "At least 1 activity required",
      },
    },
    highlights: {
      type: [highlightSchema],
      required: true,
      validate: {
        validator: (val: any[]) =>
          val.length >= 3 && val.length <= 8,
        message: "3 - 8 highlights required",
      },
    },
    localCuisines: {
      type: [localCuisineSchema],
      default: [],
    },
    accommodations: {
      type: [accommodationschema],
      default: [],
    },
  },
  { timestamps: true },
);

const Destination =
  (mongoose.models.Destination as mongoose.Model<DestinationInterface>) ||
  mongoose.model<DestinationInterface>("Destination", DestinationSchema);

export default Destination;
