import { z } from "zod";
import { requiredString, trimmedString } from "../zodUtils";

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

export const updateProfileSchema = z.object({
  name: requiredString(),
  username: trimmedString().optional(),
  email: requiredString().email("Invalid email address"),
  location: trimmedString().optional(),
  bio: trimmedString().max(200, "Bio cannot exceed 200 characters.").optional()
})

export type UpdateProfileValues = z.infer<typeof updateProfileSchema>
