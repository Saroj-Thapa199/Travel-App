import { MotorableRouteType } from "@/lib/RouteValidation";
import mongoose, { Document, Schema } from "mongoose";

export interface MotorableRouteDocument
  extends Omit<MotorableRouteType, "_id">,
    Document {}

const MotorableRouteSchema: Schema<MotorableRouteDocument> = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  distance: { type: Number, required: true },
  duration: { type: String, required: true },
  availableServices: {
    type: [String],
    enum: ["Local Bus", "Deluxe Bus", "Tourist Bus", "Jeep", "Microbus", "Sumo"],
    required: true,
  },
  fare: { type: String, required: true },
  bookingInfo: { type: String },
  frequency: { type: String },
  landmarks: { type: [String] },
  route: { type: String, required: true },
  roadCondition: {
    type: new Schema(
      {
        type: {
          type: String,
          enum: ["Good", "Fair", "Poor", "Bad"],
          required: true,
        },
        description: { type: String },
      },
      { _id: false },
    ),
  },
  fuelAvailability: {
    type: new Schema(
      {
        hasStations: { type: Boolean },
        description: { type: String },
        recommendedStops: { type: [String], required: false },
      },
      { _id: false },
    ),
  },
  warnings: { type: [String] },
  note: { type: String },
});

const MotorableRoute =
  (mongoose.models.MotorableRoute as mongoose.Model<MotorableRouteDocument>) ||
  mongoose.model<MotorableRouteDocument>(
    "MotorableRoute",
    MotorableRouteSchema,
  );

export default MotorableRoute;
