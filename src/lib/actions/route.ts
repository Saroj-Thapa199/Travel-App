"use server";

import MotorableRoute from "@/model/MotorableRoute";
import dbConnect from "../dbConnect";
import {
  motorableRouteSchema,
  MotorableRouteType,
  trekRouteSchema,
  TrekRouteType,
} from "../RouteValidation";
import TrekRoute from "@/model/TrekRoute";

export const createMotorableRoute = async (
  values: Omit<MotorableRouteType, "_id">,
): Promise<{ success: true } | { success: false; error: string }> => {
  try {
    const { success, data, error } = motorableRouteSchema
      .omit({ _id: true })
      .safeParse(values);

    if (!success) {
      console.log(error.message);
      return {
        success: false,
        error: "Please fill out the form properly!",
      };
    }

    await dbConnect();

    console.log("parsedData", JSON.stringify(data, null, 2));

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const motorableRoute = await MotorableRoute.create(data);

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Something went wrong. PLease try again",
    };
  }
};

export const createTrekRoute = async (
  values: Omit<TrekRouteType, "_id">,
): Promise<{ success: true } | { success: false; error: string }> => {
  try {
    const { success, data, error } = trekRouteSchema
      .omit({ _id: true })
      .safeParse(values);

    if (!success) {
      console.log(error.message);
      return {
        success: false,
        error: "Please fill out the form properly!",
      };
    }

    await dbConnect();

    console.log("parsedData", JSON.stringify(data, null, 2));

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const trekRoute = await TrekRoute.create(data);

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Something went wrong. PLease try again",
    };
  }
};
