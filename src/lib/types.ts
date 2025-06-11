import { DestinationType, ReviewType } from "./validation";

export type DestinationFormType = Omit<DestinationType, "_id" | "slug"  | "createdAt" | "updatedAt">

export type ReviewFormType = Omit<ReviewType, "_id" | "createdAt" | "updatedAt" | "user" | "destination">