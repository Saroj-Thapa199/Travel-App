import { DestinationType } from "./validation";

export const categoriesList: readonly [
  "all",
  ...DestinationType["categories"],
] = [
  "all",
  "Mountain",
  "Hill Station",
  "City",
  "Village",
  "Pilgrimage",
  "Adventure",
  "Wildlife",
  "Cultural Heritage",
  "Natural Attraction",
] as const;
