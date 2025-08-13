import { z } from "zod";
import { requiredString, trimmedString } from "../zodUtils";

export const transportTypeEnum = z.enum([
  "Local Bus",
  "Deluxe Bus",
  "Tourist Bus",
  "Jeep",
  "Microbus",
  "Sumo",
]);

export const motorableRouteSchema = z.object({
  _id: z.preprocess((val) => val?.toString(), z.string()),
  from: requiredString(),
  to: requiredString(),
  distance: z.number().positive(), // in km
  duration: requiredString(),
  // Public Transports
  availableServices: z
    .array(transportTypeEnum)
    .min(1, "Please add the available services"),
  fare: z.string(),
  bookingInfo: trimmedString().optional(),
  frequency: trimmedString().optional(),
  landmarks: z.array(requiredString()),
  // Private Transports
  route: requiredString(),
  roadCondition: z.object({
    type: z.enum(["Good", "Fair", "Poor", "Bad"]),
    description: trimmedString().optional(),
  }),
  fuelAvailability: z.object({
    hasStations: z.boolean(),
    description: trimmedString().optional(),
    recommendedStops: z.array(requiredString()),
  }),
  warnings: z.array(requiredString()),
  note: trimmedString().optional(),
});

export type MotorableRouteType = z.infer<typeof motorableRouteSchema>;

const permitSchema = z.object({
  name: requiredString("Permit name is required"),
  cost: trimmedString().optional(),
  where: trimmedString().optional(),
});

export const trekRouteSchema = z.object({
  _id: z.preprocess((val) => val?.toString(), z.string()),
  trekName: requiredString(),
  startingPoint: requiredString(),
  destinationPoint: trimmedString().optional(),
  duration: z.object({
    roundTrip: requiredString(),
    oneWay: trimmedString().optional(),
  }),
  difficulty: z.enum([
    "Easy",
    "Moderate",
    "Challenging",
    "Difficult",
    "Extreme",
  ]),
  elevation: z
    .object({
      start: z.number().optional(),
      max: z.number().optional(),
      gain: z.number().optional(),
    })
    .optional(),
  permits: z.array(permitSchema),
  teahouses: z.object({
    available: z.boolean(),
    locations: z.array(requiredString()),
  }),
  packingList: z.array(requiredString()),
  recommendedItinerary: z.array(requiredString()),
  bestSeason: z.array(requiredString()),
  highlights: z.array(requiredString()),
  safetyTips: z.array(requiredString()),
});

export type TrekRouteType = z.infer<typeof trekRouteSchema>;

export const routeFormSchema = z
  .object({
    destination: requiredString(),
    motorableRoute: z.array(requiredString()).optional(),
    trekRoute: z.array(requiredString()).optional(),
  })
  .refine(
    (data) =>
      (data.motorableRoute && data.motorableRoute.length > 0) ||
      (data.trekRoute && data.trekRoute.length > 0),
    {
      message:
        "At least one type of route (motorable or trek) must be provided.",
      path: ["motorableRoute"], // This is just where the error shows — optional
    },
  );

export type RouteFormType = z.infer<typeof routeFormSchema>;
