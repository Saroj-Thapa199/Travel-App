import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DestinationRouteType } from "@/lib/validation";
import {
  AlertCircle,
  ArrowRight,
  Banknote,
  Bus,
  Calendar,
  Car,
  Clock,
  Compass,
  Info,
  MapPin,
  Route,
} from "lucide-react";
import React from "react";

const colors = ["#0ea5e9", "#10b981", "#8b5cf6", "#f59e0b"];

type PersonalRouteSectionProps = {
  personalVehicle: NonNullable<DestinationRouteType["personalVehicle"]>;
};

const PersonalRouteSection = ({
  personalVehicle,
}: PersonalRouteSectionProps) => {
  return (
    <Card className="overflow-hidden shadow-sm transition-shadow duration-200 hover:shadow-md">
      <CardHeader className="bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 py-2 dark:from-orange-950/40 dark:via-amber-950/40 dark:to-yellow-950/40">
        <CardTitle className="flex items-center gap-3 text-orange-700 dark:text-orange-300">
          <div className="rounded-lg bg-orange-100 p-1.5 dark:bg-orange-900/60">
            <Car className="h-4 w-4" />
          </div>
          <div>
            <span className="text-lg">Personal Vehicle</span>
            <p className="mt-0.5 text-sm font-normal text-orange-600/80 dark:text-orange-400/80">
              {personalVehicle.length} route
              {personalVehicle.length > 1 ? "s" : ""} available
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-2 px-4 sm:px-5">
        <div className="space-y-4">
          {personalVehicle.map((vehicle, index) => (
            <div
              key={index}
              className="bg-card space-y-3 rounded-lg border p-4 shadow-sm"
            >
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Route className="h-4 w-4 text-emerald-600" />
                <span>Route Option {index + 1}</span>
              </div>

              <div className="space-y-3">
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-1">
                    <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                      <MapPin className="h-3.5 w-3.5 text-violet-600" />
                      <span>Starting Point</span>
                    </div>
                    <p className="pl-5 text-sm font-medium">
                      {vehicle.startingPoint}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                      <Compass className="h-3.5 w-3.5 text-purple-600" />
                      <span>Route Description</span>
                    </div>
                    <p className="pl-5 text-sm font-medium">{vehicle.route}</p>
                  </div>
                </div>

                <div className="grid gap-3 pt-1 md:grid-cols-2">
                  {vehicle.approxTime && (
                    <div className="flex items-center gap-1.5 text-xs">
                      <Clock className="h-3.5 w-3.5 text-violet-600" />
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{vehicle.approxTime}</span>
                    </div>
                  )}

                  {vehicle.roadCondition && (
                    <div className="flex items-center gap-1.5 text-xs">
                      <AlertCircle className="h-3.5 w-3.5 text-orange-600" />
                      <span className="text-muted-foreground">
                        Road Condition:
                      </span>
                      <span className="font-medium">
                        {vehicle.roadCondition}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalRouteSection;
