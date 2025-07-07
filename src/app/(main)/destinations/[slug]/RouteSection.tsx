"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Bus,
  Car,
  Mountain,
  Clock,
  MapPin,
  Route,
  AlertCircle,
  Banknote,
  Calendar,
  Compass,
  TrendingUp,
  FileText,
  CheckCircle2,
  Info,
  ArrowRight,
} from "lucide-react";
import type { DestinationRouteType } from "@/lib/validation";
import PublicRouteSection from "./PublicRouteSection";
import TrekkingRouteSection from "./TrekkingRouteSection";

interface RouteSectionProps {
  destinationRoute?: DestinationRouteType;
}

const RouteSection = ({ destinationRoute }: RouteSectionProps) => {
  // Show a polite message if the destination has no route information
  if (!destinationRoute) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <MapPin className="text-muted-foreground/50 mb-3 h-10 w-10" />
          <h3 className="text-muted-foreground mb-1 text-lg font-semibold">
            No Route Information
          </h3>
          <p className="text-muted-foreground max-w-sm text-sm">
            Route information is not available for this destination at the
            moment.
          </p>
        </CardContent>
      </Card>
    );
  }

  const { publicTransport, personalVehicle, trek } = destinationRoute;

  return (
    <div className="space-y-5">
      {/* Header Section */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">How to Get There</h2>
        <p className="text-muted-foreground">
          Choose the best route option that suits your travel preferences and
          budget
        </p>
      </div>

      <div className="space-y-4">
        {/* Public Transport Section */}
        {publicTransport && (
          <PublicRouteSection publicTransport={publicTransport} />
        )}

        {/* Personal Vehicle Section */}
        {personalVehicle && personalVehicle.length > 0 && (
          <Card className="overflow-hidden shadow-sm transition-shadow duration-200 hover:shadow-md">
            <CardHeader className="bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 pb-3 dark:from-emerald-950/40 dark:via-green-950/40 dark:to-teal-950/40">
              <CardTitle className="flex items-center gap-3 text-emerald-700 dark:text-emerald-300">
                <div className="rounded-lg bg-emerald-100 p-1.5 dark:bg-emerald-900/60">
                  <Car className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-lg">Personal Vehicle</span>
                  <p className="mt-0.5 text-sm font-normal text-emerald-600/80 dark:text-emerald-400/80">
                    {personalVehicle.length} route
                    {personalVehicle.length > 1 ? "s" : ""} available
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {personalVehicle.map((vehicle, index) => (
                  <div
                    key={index}
                    className="bg-card space-y-3 rounded-lg border p-3"
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
                          <p className="pl-5 text-sm font-medium">
                            {vehicle.route}
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-3 pt-1 md:grid-cols-2">
                        {vehicle.approxTime && (
                          <div className="flex items-center gap-1.5 text-xs">
                            <Clock className="h-3.5 w-3.5 text-violet-600" />
                            <span className="text-muted-foreground">
                              Duration:
                            </span>
                            <span className="font-medium">
                              {vehicle.approxTime}
                            </span>
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
        )}

        {/* Trek Section */}
        {trek && (
          // <Card className="overflow-hidden shadow-sm transition-shadow duration-200 hover:shadow-md">
          //   <CardHeader className="bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 pb-3 dark:from-orange-950/40 dark:via-amber-950/40 dark:to-yellow-950/40">
          //     <CardTitle className="flex items-center gap-3 text-orange-700 dark:text-orange-300">
          //       <div className="rounded-lg bg-orange-100 p-1.5 dark:bg-orange-900/60">
          //         <Mountain className="h-4 w-4" />
          //       </div>
          //       <div>
          //         <span className="text-lg">Trekking Route</span>
          //         <p className="mt-0.5 text-sm font-normal text-orange-600/80 dark:text-orange-400/80">
          //           Adventure hiking experience
          //         </p>
          //       </div>
          //     </CardTitle>
          //   </CardHeader>
          //   <CardContent className="space-y-4 p-4">
          //     {/* Starting Point */}
          //     <div className="flex items-center gap-2 text-base font-semibold">
          //       <MapPin className="h-4 w-4 text-orange-600" />
          //       <span>Starting Point: {trek.startingPoint}</span>
          //     </div>

          //     {/* Trek Stats Grid */}
          //     <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          //       {trek.duration && (
          //         <div className="bg-card flex items-center gap-2 rounded-lg border p-2.5">
          //           <Clock className="h-4 w-4 text-violet-600" />
          //           <div>
          //             <p className="text-muted-foreground text-xs">Duration</p>
          //             <p className="text-sm font-semibold">{trek.duration}</p>
          //           </div>
          //         </div>
          //       )}

          //       {trek.distance && (
          //         <div className="bg-card flex items-center gap-2 rounded-lg border p-2.5">
          //           <Route className="h-4 w-4 text-emerald-600" />
          //           <div>
          //             <p className="text-muted-foreground text-xs">Distance</p>
          //             <p className="text-sm font-semibold">{trek.distance}</p>
          //           </div>
          //         </div>
          //       )}

          //       {trek.difficulty && (
          //         <div className="bg-card flex items-center gap-2 rounded-lg border p-2.5">
          //           <TrendingUp className="h-4 w-4 text-rose-600" />
          //           <div>
          //             <p className="text-muted-foreground text-xs">
          //               Difficulty
          //             </p>
          //             <Badge
          //               variant={
          //                 trek.difficulty.toLowerCase().includes("easy")
          //                   ? "secondary"
          //                   : trek.difficulty.toLowerCase().includes("moderate")
          //                     ? "default"
          //                     : "destructive"
          //               }
          //               className="mt-0.5 text-xs"
          //             >
          //               {trek.difficulty}
          //             </Badge>
          //           </div>
          //         </div>
          //       )}

          //       {trek.altitudeGain && (
          //         <div className="bg-card flex items-center gap-2 rounded-lg border p-2.5">
          //           <TrendingUp className="h-4 w-4 text-purple-600" />
          //           <div>
          //             <p className="text-muted-foreground text-xs">
          //               Altitude Gain
          //             </p>
          //             <p className="text-sm font-semibold">
          //               {trek.altitudeGain}
          //             </p>
          //           </div>
          //         </div>
          //       )}

          //       {trek.maxAltitude && (
          //         <div className="bg-card flex items-center gap-2 rounded-lg border p-2.5">
          //           <Mountain className="h-4 w-4 text-indigo-600" />
          //           <div>
          //             <p className="text-muted-foreground text-xs">
          //               Max Altitude
          //             </p>
          //             <p className="text-sm font-semibold">
          //               {trek.maxAltitude}
          //             </p>
          //           </div>
          //         </div>
          //       )}
          //     </div>

          //     <Separator />

          //     {/* Trail Description */}
          //     <div className="space-y-2">
          //       <div className="flex items-center gap-2">
          //         <FileText className="h-4 w-4 text-slate-600" />
          //         <span className="text-base font-semibold">
          //           Trail Description
          //         </span>
          //       </div>
          //       <p className="text-muted-foreground pl-6 text-sm leading-relaxed">
          //         {trek.trailDescription}
          //       </p>
          //     </div>

          //     {/* Checkpoints */}
          //     {trek.checkpoints && trek.checkpoints.length > 0 && (
          //       <div className="space-y-2">
          //         <div className="flex items-center gap-2">
          //           <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          //           <span className="text-base font-semibold">Checkpoints</span>
          //         </div>
          //         <div className="grid grid-cols-1 gap-2 pl-6 md:grid-cols-2">
          //           {trek.checkpoints.map((checkpoint, index) => (
          //             <div
          //               key={index}
          //               className="flex items-center gap-2 rounded-md bg-emerald-50 p-2 dark:bg-emerald-950/30"
          //             >
          //               <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500"></div>
          //               <span className="text-xs">{checkpoint}</span>
          //             </div>
          //           ))}
          //         </div>
          //       </div>
          //     )}

          //     {/* Required Permits */}
          //     {trek.permits && trek.permits.length > 0 && (
          //       <div className="space-y-2">
          //         <div className="flex items-center gap-2">
          //           <FileText className="h-4 w-4 text-violet-600" />
          //           <span className="text-base font-semibold">
          //             Required Permits
          //           </span>
          //         </div>
          //         <div className="flex flex-wrap gap-1.5 pl-6">
          //           {trek.permits.map((permit, index) => (
          //             <Badge
          //               key={index}
          //               variant="outline"
          //               className="px-2 py-0.5 text-xs"
          //             >
          //               {permit}
          //             </Badge>
          //           ))}
          //         </div>
          //       </div>
          //     )}

          //     {/* Important Note */}
          //     {trek.note && (
          //       <div className="flex gap-2 rounded-lg border border-amber-200/60 bg-amber-50 p-3 dark:border-amber-800/60 dark:bg-amber-950/30">
          //         <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
          //         <div className="space-y-1">
          //           <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">
          //             Important Note
          //           </span>
          //           <p className="text-xs leading-relaxed text-amber-700 dark:text-amber-300">
          //             {trek.note}
          //           </p>
          //         </div>
          //       </div>
          //     )}
          //   </CardContent>
          // </Card>
          <TrekkingRouteSection trek={trek} />
        )}
      </div>
    </div>
  );
};

export default RouteSection;
