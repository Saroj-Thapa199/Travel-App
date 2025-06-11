import mongoose, { Document, Schema } from "mongoose";

export interface UserInterface {
  name: string;
  email: string;
  password: string;
}

export interface IUserDocument extends UserInterface, Document {}

const UserSchema: Schema<IUserDocument> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
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
