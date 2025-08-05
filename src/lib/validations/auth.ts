import { z } from "zod";
import { requiredString } from "../zodUtils";

export const signUpSchema = z.object({
  email: requiredString().email("Invalid email address"),
  name: requiredString(),
  password: requiredString()
    .min(8, "Must be minimum 8 characters")
    .max(32, "Must be maximum 32 characters"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: requiredString().email("Invalid email address"),
  password: requiredString(),
});

export type LoginValues = z.infer<typeof loginSchema>;
