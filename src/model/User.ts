import mongoose, { Document, Schema } from "mongoose";

export interface UserInterface {
  username: string;
  email: string;
  password: string;
}

interface IUserDocument extends UserInterface, Document {}

const UserSchema: Schema<IUserDocument> = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

const User =
  (mongoose.models.User as mongoose.Model<IUserDocument>) ||
  mongoose.model<IUserDocument>("User", UserSchema);

export default User;
