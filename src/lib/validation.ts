import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const signUpSchema = z.object({
  email: requiredString.email("Invalid email address"),
  username: requiredString.regex(
    /^[a-zA-z0-9_-]+$/,
    "Only letters, numbers and special characters - and _ allowed",
  ),
  password: requiredString
    .min(8, "Must be minimum 8 characters")
    .max(32, "Must be maximum 32 characters"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: requiredString.email("Invalid email address"),
  password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;

export const destinationSchema = z.object({
  name: requiredString,
  shortDescription: requiredString.max(150, "Maximum 150 characters allowed"),
  longDescription: requiredString,
  image: z.string().min(1, "Please the upload the image")
});

export type DestinationType = z.infer<typeof destinationSchema>
