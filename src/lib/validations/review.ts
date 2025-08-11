import { z } from "zod";
import { requiredString } from "../zodUtils";

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

export const editReviewSchema = z.object({
  rating: z
    .number()
    .gte(1, "Rating cannot be 0")
    .lte(5, "Rating cannot be more than 5"),
  comment: z.string().trim().optional(),
});

export type EditReviewType = z.infer<typeof editReviewSchema>;

export const populatedReviewSchema = reviewSchema.omit({ user: true }).extend({
  user: z.object({
    _id: z.string(),
    name: z.string(),
    image: z.string().optional(),
  }),
});

export type PopulatedReviewType = z.infer<typeof populatedReviewSchema>;
