import mongoose, { Document, Schema } from "mongoose";

interface CollectionInterface extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  description: string;
  coverImage: string;
  destinations: [mongoose.Types.ObjectId];
  visibility: "public" | "private";
}

const CollectionSchema: Schema<CollectionInterface> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    destinations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destination",
      },
    ],
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "private",
    },
  },
  { timestamps: true },
);

// Enforce unique collection names per user
CollectionSchema.index({ user: 1, name: 1 }, { unique: true });

const Collection =
  (mongoose.models.Collection as mongoose.Model<CollectionInterface>) ||
  mongoose.model<CollectionInterface>("Collection", CollectionSchema);

export default Collection;
