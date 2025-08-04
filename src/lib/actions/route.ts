"use server";

import MotorableRoute from "@/model/MotorableRoute";
import dbConnect from "../dbConnect";
import {
  motorableRouteSchema,
  MotorableRouteType,
  routeFormSchema,
  RouteFormType,
  trekRouteSchema,
  TrekRouteType,
} from "../validations/routes";
import TrekRoute from "@/model/TrekRoute";
import Route from "@/model/Route";
import { redirect } from "next/navigation";
import Destination from "@/model/Destination";
import { isRedirectError } from "next/dist/client/components/redirect-error";

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

export const createDestinationRoute = async (values: RouteFormType) => {
  try {
    const { success, data, error } = routeFormSchema.safeParse(values);

    if (!success) {
      return { error: "Form field incorrectly" };
    }

    await dbConnect();

    const destination = await Destination.findById(data.destination, "slug");

    if (!destination) {
      return { error: "Destination doesn't exists" };
    }

    await Route.create(data);

    return redirect(`/destinations/${destination.slug}`);
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log(error);
    return { error: "Something went wrong. PLease try again" };
  }
};
