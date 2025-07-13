import { z } from "zod";
import { requiredString } from "./zodUtils";

export const transportTypeEnum = z.enum([
  "Local Bus",
  "Deluxe Bus",
  "Tourist Bus",
  "Jeep",
  "Microbus",
  "Sumo"
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
  fareRange: z.string(),
  bookingInfo: z.string().optional(),
  frequency: z.string().optional(),
  landmarks: z.array(requiredString()).optional(),
  // Private Transports
  route: requiredString(),
  roadCondition: z.object({
    type: z.enum(["Good", "Fair", "Poor", "Bad"]),
    description: z.string().optional(),
  }),
  fuelAvailability: z.object({
    hasStations: z.boolean(),
    description: z.string().optional(),
    recommendedStops: z.array(requiredString()).optional(),
  }),
  warnings: z.array(requiredString()).optional(),
  note: z.string().optional(),
});

export type MotorableRouteType = z.infer<typeof motorableRouteSchema>;

const permitSchema = z.object({
  name: requiredString("Permit name is required"),
  cost: z.string().optional(),
  where: z.string().optional(),
});

export const trekRouteSchema = z.object({
  _id: z.preprocess((val) => val?.toString(), z.string()),
  trekName: requiredString(),
  startingPoint: requiredString(),
  duration: z
    .object({
      roundTrip: z.string().optional(),
      oneWay: z.string().optional(),
    })
    .optional(),
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
  permits: z.array(permitSchema).optional(),
  teahouses: z.boolean().optional(),
  bestSeason: z.array(requiredString()).optional(),
  highlights: z.array(requiredString()).optional(),
  packingList: z.array(requiredString()).optional(),
  safetyTips: z.array(requiredString()).optional(),
});

export type TrekRouteType = z.infer<typeof trekRouteSchema>;

export const routeSchema = z
  .object({
    _id: z.preprocess((val) => val?.toString(), z.string()),
    destination: z.preprocess((val) => val?.toString(), z.string()),
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

export type RouteType = z.infer<typeof routeSchema>;
