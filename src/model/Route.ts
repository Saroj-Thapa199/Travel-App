import mongoose, { Schema, Types } from "mongoose";

export interface RouteDocument extends Document {
  destination: Types.ObjectId;
  motorableRoute?: Types.ObjectId[];
  trekRoute?: Types.ObjectId[];
}

const RouteSchema: Schema<RouteDocument> = new mongoose.Schema({
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Destination",
    required: true,
  },
  motorableRoute: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MotorableRoute",
    },
  ],
  trekRoute: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrekRoute",
    },
  ],
});

const Route =
  (mongoose.models.Route as mongoose.Model<RouteDocument>) ||
  mongoose.model<RouteDocument>("Route", RouteSchema);

export default Route;
