import { TrekRouteType } from "@/lib/RouteValidation";
import mongoose, { Document, Schema } from "mongoose";

export interface TrekRouteDocument
  extends Omit<TrekRouteType, "_id">,
    Document {}

const PermitSchema = new Schema(
  {
    name: { type: String, required: true },
    cost: { type: String },
    where: { type: String },
  },
  { _id: false }, // prevents Mongoose from creating _id for subdocuments
);

const teaHouseSchema = new Schema(
  {
    available: Boolean,
    locations: { type: [String], required: false },
  },
  { _id: false },
);

const TrekRouteSchema: Schema<TrekRouteDocument> = new Schema({
  trekName: {
    type: String,
    required: true,
  },
  startingPoint: {
    type: String,
    required: true,
  },
  destinationPoint: { type: String },
  duration: {
    roundTrip: { type: String, required: true },
    oneWay: { type: String },
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Moderate", "Challenging", "Difficult", "Extreme"],
    required: true,
  },
  elevation: {
    start: { type: Number },
    max: { type: Number },
    gain: { type: Number },
  },
  permits: [PermitSchema],
  teahouses: teaHouseSchema,
  packingList: [String],
  recommendedItinerary: [{ type: String }],
  bestSeason: [String],
  highlights: [String],
  safetyTips: [String],
});

const TrekRoute =
  (mongoose.models.TrekRoute as mongoose.Model<TrekRouteDocument>) ||
  mongoose.model<TrekRouteDocument>("TrekRoute", TrekRouteSchema);

export default TrekRoute;
