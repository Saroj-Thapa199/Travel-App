import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type isNewParameters = {
  createdAt: Date;
  type?: "day" | "hour" | "minutes";
  range?: number;
};

export const isNew = ({
  createdAt,
  type = "day",
  range = 30,
}: isNewParameters) => {
  const currentDate = new Date();

  const difference = currentDate.valueOf() - new Date(createdAt).valueOf();
  
  let differenceInType: number;
  if (type === "day") {
    differenceInType = difference / (1000 * 3600 * 24);
  } else if (type === "hour") {
    differenceInType = difference / (1000 * 3600);
  } else {
    differenceInType = difference / (1000 * 60);
  }

  return differenceInType < range;
};

export const hasNonEmptyValue = (value: any): boolean => {
    if (typeof value === "string") {
      return value.trim() !== "";
    }

    if (typeof value === "number" || typeof value === "boolean") {
      return true;
    }

    if (Array.isArray(value)) {
      return value.some((item) => hasNonEmptyValue(item));
    }

    if (typeof value === "object" && value !== null) {
      return Object.values(value).some((val) => hasNonEmptyValue(val));
    }

    return false;
  }