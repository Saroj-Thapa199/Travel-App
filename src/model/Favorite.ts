import mongoose, { Document, Schema } from "mongoose";

interface FavoriteInterface extends Document {
  user: mongoose.Types.ObjectId;
  destination: mongoose.Types.ObjectId;
  createdAt: Date;
}

const FavoriteSchema: Schema<FavoriteInterface> = new Schema(
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
  },
  { timestamps: true },
);

// Enforce unique favorite per user and destination
FavoriteSchema.index({ user: 1, destination: 1 }, { unique: true });

const Favorite =
  (mongoose.models.Favorite as mongoose.Model<FavoriteInterface>) ||
  mongoose.model<FavoriteInterface>("Favorite", FavoriteSchema);

export default Favorite;
