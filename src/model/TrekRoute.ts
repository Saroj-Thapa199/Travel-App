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

const TrekRouteSchema: Schema<TrekRouteDocument> = new Schema({
  trekName: {
    type: String,
    required: true,
  },
  startingPoint: {
    type: String,
    required: true,
  },
  duration: {
    roundTrip: {type: String},
    oneWay: {type: String},
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Moderate", "Challenging", "Difficult", "Extreme"],
    required: true,
  },
  elevation: {
    start: {type: Number},
    max: {type: Number},
    gain: {type: Number},
  },
  permits: [PermitSchema],
  teahouses: {type: Boolean},
  bestSeason: [String],
  highlights: [String],
  packingList: [String],
  safetyTips: [String],
});

const TrekRoute =
  (mongoose.models.TrekRoute as mongoose.Model<TrekRouteDocument>) ||
  mongoose.model<TrekRouteDocument>("TrekRoute", TrekRouteSchema);

export default TrekRoute;
