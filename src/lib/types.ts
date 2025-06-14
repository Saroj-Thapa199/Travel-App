import { DestinationType, ReviewType } from "./validation";

export type DestinationFormType = Omit<
  DestinationType,
  "_id" | "slug" | "createdAt" | "updatedAt" | "averageRating" | "reviewCount"
>;

export type ReviewFormType = Omit<
  ReviewType,
  "_id" | "createdAt" | "updatedAt" | "user" | "destination"
>;

export type DestinationsPage = {
  destinations: DestinationType[];
  nextCursor: string | null;
};
