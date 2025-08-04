import { z } from "zod";
import { isImageUrl, requiredString } from "../zodUtils";

export const createCollectionSchema = z.object({
  name: requiredString("Please provide a title collection"),
  description: z.string().trim(),
  coverImage: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true; // skip validation if empty or undefined
        try {
          new URL(val);
        } catch {
          return false;
        }
        return isImageUrl(val);
      },
      {
        message: "Must be a valid image URL",
      },
    ),
  visibility: z.enum(["public", "private"]),
  destinations: z.array(requiredString()),
});

export type CreateCollectionType = z.infer<typeof createCollectionSchema>;
