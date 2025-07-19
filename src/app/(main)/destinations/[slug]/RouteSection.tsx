"use client";

import { Button } from "@/components/ui/button";
import {
  MapPin,
  Route,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RouteApiResponse } from "@/lib/types";
import TrekRouteInfo from "@/components/TrekRouteInfo";
import MotorableRouteInfo from "@/components/MotorableRouteInfo";
import MotorableRoute from "./MotorableRoute";

interface RouteSectionProps {
  destinationId: string;
  destinationName?: string; // Optional destination name prop
}

const RouteSection = ({
  destinationId,
  destinationName,
}: RouteSectionProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["routes", destinationId],
    queryFn: async () => {
      const { data } = await axios.get<RouteApiResponse>(
        `/api/route/${destinationId}`,
      );
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="space-y-4 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-600" />
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Loading Routes
            </h3>
            <p className="text-gray-600">
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
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-red-800">
              Unable to Load Routes
            </h3>
            <p className="mb-4 text-gray-600">
              There was an error loading the route information.
            </p>
            <Button onClick={() => window.location.reload()} variant="outline">
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
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
            <MapPin className="h-6 w-6 text-gray-500" />
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              No Routes Available
            </h3>
            <p className="text-gray-600">
              No route information found for{" "}
              {destinationName || "this destination"}.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return data.length > 1 ? (
    "greater than 1"
  ) : (
    <div className="space-y-8">
      <div className="space-y-5">
        {data[0].motorableRoute.map((route) => (
          // <MotorableRoute key={route._id} motorableData={route} />
          <MotorableRouteInfo key={route._id} motorableData={route} interactiveMode />
        ))}
      </div>
      <div className="space-y-5">
        {data[0].trekRoute.map((route) => (
          <TrekRouteInfo key={route._id} trekData={route} />
        ))}
      </div>
    </div>
  );
};

export default RouteSection;
