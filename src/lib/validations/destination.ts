import { z } from "zod";
import { makeUndefinedIfEmpty, requiredString } from "../zodUtils";

const bestSeasonEnum = z.enum([
  "Spring",
  "Summer",
  "Monsoon",
  "Autumn",
  "Winter",
  "Year-round",
]);

export const destinationSchema = z.object({
  _id: z.preprocess((val) => val?.toString(), z.string()),
  user: z.preprocess((val) => val?.toString(), z.string()),
  favorites: z.number(),
  name: requiredString(),
  slug: z.string(),
  region: requiredString(),
  image: requiredString("Please upload the image"),
  shortDescription: requiredString().max(150, "Maximum 150 characters allowed"),
  longDescription: requiredString(),
  featured: z.boolean(),
  categories: z
    .array(
      z.enum([
        "Mountain",
        "Hill Station",
        "City",
        "Village",
        "Pilgrimage",
        "Adventure",
        "Wildlife",
        "Cultural Heritage",
        "Natural Attraction",
      ]),
    )
    .min(1, "Select at least 1 category")
    .max(3, "You can select up to 3 categories"),
  bestSeason: z.array(bestSeasonEnum).min(1, "Select at least 1 season"),
  // bestTime: z.array(requiredString()),
  budget: requiredString(),
  averageRating: z.number().lte(5),
  reviewCount: z.number(),
  activities: z.array(requiredString()).min(1, "At least one activity is required"),
  highlights: z
      .array(
        z.object({
          title: requiredString("Highlight title is required"),
          description: requiredString("Highlight description is required"),
        }),
      )
      .min(3, "At least 3 highlights are required")
      .max(8, "Maximum 8 highlights allowed"),
  createdAt: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date(),
  ),
  updatedAt: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date(),
  ),
});

export type DestinationType = z.infer<typeof destinationSchema>;
