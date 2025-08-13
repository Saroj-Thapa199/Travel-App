import mongoose, { Document, Schema } from "mongoose";

export interface UserInterface {
  name: string;
  email: string;
  password: string;
  location: string;
  bio: string;
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
    minlength: [8, "Password must be minimum 8 characters in length"],
    select: false,
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
    maxlength: [200, "Bio should be max 200 characters"]
  }
});

const User =
  (mongoose.models.User as mongoose.Model<IUserDocument>) ||
  mongoose.model<IUserDocument>("User", UserSchema);

export default User;
