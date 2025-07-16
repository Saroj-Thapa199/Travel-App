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
) => {
  try {
    const { success, data, error } = motorableRouteSchema
      .omit({ _id: true })
      .safeParse(values);

    if (!success) {
      console.log(error.message);
      return { error: "Please fill out the form properly!" };
    }

    await dbConnect();

    console.log("parsedData", JSON.stringify(data, null, 2));

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return { error: "success" };
    // const motorableRoute = await MotorableRoute.create(data)
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. PLease try again" };
  }
};

export const createTrekRoute = async (values: Omit<TrekRouteType, "_id">) => {
  try {
    const { success, data, error } = await trekRouteSchema.safeParse(values);

    if (!success) {
      console.log(error.message);
      return { error: "Please fill out the form properly!" };
    }

    await dbConnect();

    console.log("parsedData", JSON.stringify(data, null, 2));

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return { error: "success" };

    const trekRoute = await TrekRoute.create(data);
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. PLease try again" };
  }
};
