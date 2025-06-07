import { DestinationType } from "@/lib/validation";
import mongoose, { Document, Schema } from "mongoose";

interface DestinationInterface extends DestinationType, Document {
  slug: string
}

const DestinationSchema: Schema<DestinationInterface> = new mongoose.Schema({
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
  shortDescription: {
    type: String,
    required: true,
    maxlength: 150,
  },
  longDescription: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true
  }
});

const Destination =
  (mongoose.models.Destination as mongoose.Model<DestinationInterface>) ||
  mongoose.model<DestinationInterface>("Destination", DestinationSchema);

export default Destination;
