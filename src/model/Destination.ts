import { DestinationType } from "@/lib/validation";
import mongoose, { Document, Schema } from "mongoose";

const transportTypeEnum = [
  "Bus",
  "Jeep",
  "Microbus",
  "Van",
  "Tempo",
  "Flight",
] as const;

interface DestinationInterface
  extends Omit<
      DestinationType,
      "_id" | "createdAt" | "updatedAt" | "user" | "favorites"
    >,
    Document {
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
  user: mongoose.Types.ObjectId;
  favorites: mongoose.Types.ObjectId[];
}

const PublicTransportSegmentSchema = new Schema(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    // transportType: {
    //   type: String,
    //   enum: transportTypeEnum,
    //   required: true,
    // },
    approxTime: { type: String },
    fare: { type: Number }, // Rs
    busTypes: [String],
    lastDeparture: { type: String },
    note: { type: String },
  },
  { _id: false },
);

const PersonalVehicleSchema = new Schema(
  {
    startingPoint: { type: String, required: true },
    route: { type: String, required: true },
    approxTime: { type: String },
    roadCondition: { type: String },
  },
  { _id: false },
);

const TrekSchema = new Schema(
  {
    // required: { type: Boolean, default: false },
    startingPoint: { type: String, required: true },
    duration: { type: String },
    distance: { type: Number }, // kms
    difficulty: { type: String },
    altitudeGain: { type: Number }, // meters
    maxAltitude: { type: Number }, // meters
    trailDescription: { type: String, required: true },
    checkpoints: [String],
    permits: [String],
    note: { type: String },
  },
  { _id: false },
);

const DestinationSchema: Schema<DestinationInterface> = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    favorites: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MotorableRoute",
        },
      ],
      default: [],
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
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    destinationRoute: {
      publicTransport: {
        type: [PublicTransportSegmentSchema],
        required: false,
        default: undefined,
      },
      personalVehicle: {
        type: [PersonalVehicleSchema],
        required: false,
        default: undefined,
      },
      trek: TrekSchema,
    },
  },
  { timestamps: true },
);

const Destination =
  (mongoose.models.Destination as mongoose.Model<DestinationInterface>) ||
  mongoose.model<DestinationInterface>("Destination", DestinationSchema);

export default Destination;
