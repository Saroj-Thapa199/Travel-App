"use client";

import { Button } from "@/components/ui/button";
import { MapPin, Route, AlertTriangle, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DestinationRoute, RouteApiResponse } from "@/lib/types";
import MotorableRouteInfo from "@/components/MotorableRouteInfo";
import TrekRouteInfo from "@/components/TrekRouteInfo";

interface RouteSectionProps {
  destinationId: string;
  destinationName?: string; // Optional destination name prop
}

const getBasicRoute = (data: DestinationRoute) => {
  const { motorableRoute, trekRoute } = data;
  let arr: string[] = [];
  for (let i = 0; i < motorableRoute.length; i++) {
    arr.push(motorableRoute[i].from);
    i + 1 === motorableRoute.length && arr.push(motorableRoute[i].to);
  }
  // if (motorableRoute.length > 0) {
  //     motorableRoute.forEach((route, index) => {
  //       index === 0 ? arr.push(route.from) : arr.push(route.to)
  //       index +1 === motorableRoute.length && arr.push(route.to)
  //     })
  // }
  return arr;
};

// const DestinationRoute = ({ data }: { data: RouteApiResponse }) => {};

const RouteSection = ({
  destinationId,
  destinationName,
}: RouteSectionProps) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["routes", destinationId],
    queryFn: async () => {
      const { data } = await axios.get<RouteApiResponse>(
        `/api/route/${destinationId}`,
      );
      return data;
    },
  });

  console.log(data);
  data?.length && data.length > 0 && console.log(getBasicRoute(data[0]));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="space-y-4 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
          <div>
            <h3 className="text-muted-foreground mb-2 text-lg font-semibold">
              Loading Routes
            </h3>
            <p className="text-muted-foreground/90">
              Finding routes to {destinationName || "your destination"}...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 dark:bg-red-950">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-red-800">
              Unable to Load Routes
            </h3>
            <p className="text-muted-foreground mb-4">
              There was an error loading the route information.
            </p>
            <Button onClick={() => refetch()} variant="outline">
              <Route className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-900">
            <MapPin className="h-6 w-6 text-gray-500" />
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              No Routes Available
            </h3>
            <p className="dark:text-300 text-gray-600">
              No route information found for{" "}
              {destinationName || "this destination"}.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return data.length > 1 ? (
    <div className="space-y-8">
      {data.map((routeGroup, index) => (
        <div
          key={index}
          className="border-border bg-card space-y-6 rounded-2xl border p-3 shadow-sm sm:p-6"
        >
          <div>
            <h2 className="text-primary text-lg font-semibold">
              Route {index + 1}
            </h2>
            <p>
              {/* {getBasicRoute(data)} */}
              hello
            </p>
          </div>

          {routeGroup.motorableRoute.length > 0 && (
            <div className="space-y-5">
              {routeGroup.motorableRoute.map((route) => (
                <MotorableRouteInfo
                  key={route._id}
                  motorableData={route}
                  interactiveMode
                />
              ))}
            </div>
          )}

          {routeGroup.trekRoute.length > 0 && (
            <div className="space-y-5">
              {routeGroup.trekRoute.map((route) => (
                <TrekRouteInfo
                  key={route._id}
                  trekData={route}
                  interactiveMode
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  ) : (
    <div className="space-y-8">
      <div className="space-y-5">
        {data[0].motorableRoute.map((route) => (
          <MotorableRouteInfo
            key={route._id}
            motorableData={route}
            interactiveMode
          />
        ))}
      </div>
      <div className="space-y-5">
        {data[0].trekRoute.map((route) => (
          <TrekRouteInfo key={route._id} trekData={route} interactiveMode />
        ))}
      </div>
    </div>
  );
};

export default RouteSection;
