import { z, ZodNumber } from "zod";

// const requiredString = z.string().trim().min(1, "Required");

const requiredString = (message?: string) => {
  return z
    .string()
    .trim()
    .min(1, message || "Required");
};

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

export const destinationSchema = z.object({
  _id: z.preprocess((val) => val?.toString(), z.string()),
  name: requiredString(),
  slug: z.string(),
  region: requiredString(),
  image: requiredString("Please upload the image"),
  shortDescription: requiredString().max(150, "Maximum 150 characters allowed"),
  longDescription: requiredString(),
  averageRating: z.number().lte(5),
  reviewCount: z.number(),
  createdAt: z
    .preprocess(
      (val) => (typeof val === "string" ? new Date(val) : val),
      z.date(),
    )
    .optional(),
  updatedAt: z
    .preprocess(
      (val) => (typeof val === "string" ? new Date(val) : val),
      z.date(),
    )
    .optional(),
});

export type DestinationType = z.infer<typeof destinationSchema>;

export const reviewSchema = z.object({
  _id: z.preprocess((val) => val?.toString(), z.string()),
  destination: z.preprocess((val) => val?.toString(), z.string()),
  user: z.preprocess((val) => val?.toString(), z.string()),
  rating: z
    .number()
    .gte(1, "Rating cannot be 0")
    .lte(5, "Rating cannot be more than 5"),
  comment: z
    .string()
    .transform((val) => (val.trim() === "" ? undefined : val))
    .optional(),
  createdAt: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date(),
  ),
  updatedAt: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date(),
  ),
});

export type ReviewType = z.infer<typeof reviewSchema>;

export const populatedReviewSchema = reviewSchema.omit({ user: true }).extend({
  user: z.object({
    name: z.string(),
    image: z.string().optional(),
  }),
});

export type PopulatedReviewType = z.infer<typeof populatedReviewSchema>;
