import { z } from "zod";
import { requiredString } from "../zodUtils";

export const createCollectionSchema = z.object({
  name: requiredString("Please provide a title collection"),
  description: z.string().trim(),
  visibility: z.enum(["public", "private"]),
  destinations: z.array(requiredString()),
});

export type CreateCollectionType = z.infer<typeof createCollectionSchema>;
