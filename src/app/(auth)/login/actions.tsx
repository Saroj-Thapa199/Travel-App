"use server";

import { signIn } from "@/auth"; // assuming this is your exported `signIn`
import { LoginValues } from "@/lib/validation";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

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
