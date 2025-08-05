import { z } from "zod";

export const requiredString = (message?: string) => {
  return z
    .string()
    .trim()
    .min(1, message || "Required");
};

export const makeUndefinedIfEmpty = () => {
  return z
    .string()
    .transform((val) => (val.trim() === "" ? undefined : val))
    .optional();
};
