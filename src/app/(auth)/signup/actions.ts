"use server";

import dbConnect from "@/lib/dbConnect";
import { signUpSchema, SignUpValues } from "@/lib/validation";
import User from "@/model/User";
import bcrypt from "bcryptjs";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

export const signUp = async (
  credentials: SignUpValues,
): Promise<{ error: string }> => {
  try {
    const { username, email, password } = signUpSchema.parse(credentials);

    await dbConnect();

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return {
        error: "Username already taken",
      };
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return {
        error: "Email already taken",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return redirect("/login");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log(error);
    return {
      error: "Something went wrong. Please try again",
    };
  }
};
