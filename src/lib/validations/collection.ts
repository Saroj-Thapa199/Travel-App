import { z } from "zod";
import { requiredString, trimmedString } from "../zodUtils";

export const createCollectionSchema = z.object({
  name: requiredString("Please provide a title collection"),
  description: trimmedString(),
  visibility: z.enum(["public", "private"]),
  destinations: z.array(requiredString()),
});

export type CreateCollectionType = z.infer<typeof createCollectionSchema>;
