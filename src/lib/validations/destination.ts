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

const publicTransportSegmentSchema = z.object({
  from: requiredString(),
  to: requiredString(),
  // transportType: transportTypeEnum,
  approxTime: makeUndefinedIfEmpty(),
  fare: z.number().positive().optional(),
  busTypes: z.array(z.string()).optional(),
  lastDeparture: makeUndefinedIfEmpty(),
  note: makeUndefinedIfEmpty(),
});

const publicTransportSchema = z
  .array(publicTransportSegmentSchema)
  .min(1, "Cannot be empty");

const individualPersonalVehicleSchema = z.object({
  startingPoint: requiredString(),
  route: requiredString(),
  approxTime: makeUndefinedIfEmpty(),
  roadCondition: makeUndefinedIfEmpty(),
});

const personalVehicleSchema = z
  .array(individualPersonalVehicleSchema)
  .min(1, "Cannot be empty");

const trekSchema = z
  .object({
    // required: z.boolean().default(false).optional(),
    startingPoint: requiredString(),
    duration: makeUndefinedIfEmpty(),
    distance: z.number().positive().optional(),
    difficulty: makeUndefinedIfEmpty(),
    altitudeGain: z.number().positive().optional(),
    maxAltitude: z.number().positive().optional(),
    trailDescription: requiredString(),
    checkpoints: z.array(z.string()).optional(),
    permits: z.array(z.string()).optional(),
    note: makeUndefinedIfEmpty(),
  })
  .transform((obj) => {
    const allEmpty = Object.values(obj).every(
      (val) => val === undefined || (Array.isArray(val) && val.length === 0),
    );

    return allEmpty ? undefined : obj;
  });

export const destinationSchema = z.object({
  _id: z.preprocess((val) => val?.toString(), z.string()),
  user: z.preprocess((val) => val?.toString(), z.string()),
  favorites: z.array(z.preprocess((val) => val?.toString(), z.string())),
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
  destinationRoute: z
    .object({
      publicTransport: publicTransportSchema.optional(),
      personalVehicle: personalVehicleSchema.optional(),
      trek: trekSchema.optional(),
    })
    .optional(),
  // .refine(
  //   (val) =>
  //     val.publicTransport !== undefined ||
  //     val.personalVehicle !== undefined ||
  //     val.trek !== undefined,
  //   {
  //     message: "At least one route option must be provided",
  //     path: ["destinationRoute"],
  //   },
  // ),

  createdAt: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date(),
  ),
  updatedAt: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date(),
  ),
});

export type DestinationRouteType = z.infer<
  typeof destinationSchema
>["destinationRoute"];

export type DestinationType = z.infer<typeof destinationSchema>;