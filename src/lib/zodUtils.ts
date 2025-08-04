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

export const isImageUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    return /\.(jpg|jpeg|png|webp|gif|svg)$/.test(parsed.pathname);
  } catch {
    return false;
  }
};
