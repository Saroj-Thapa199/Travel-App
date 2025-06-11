"use server";

import { signIn, signOut } from "@/auth"; // assuming this is your exported `signIn`
import { LoginValues, signUpSchema, SignUpValues } from "@/lib/validation";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import dbConnect from "../dbConnect";
import User from "@/model/User";
import bcrypt from "bcryptjs";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export const signUp = async (
  credentials: SignUpValues,
): Promise<{ error: string }> => {
  try {
    const { name, email, password } = signUpSchema.parse(credentials);

    await dbConnect();

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return {
        error: "Email already taken",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
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

export const login = async (credentials: LoginValues) => {
  try {
    await signIn("credentials", {
      redirect: false,
      ...credentials,
    });

    return redirect("/");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
};

export const logOut = async() => {
    await signOut({redirectTo: "/login"})
}

