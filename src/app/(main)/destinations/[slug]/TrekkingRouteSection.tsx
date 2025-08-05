import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DestinationRouteType } from "@/lib/validations/destination";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  MapPin,
  Mountain,
  Route,
  TrendingUp,
} from "lucide-react";
import React from "react";

type TrekkingRouteSectionProps = {
  trek: NonNullable<DestinationRouteType["trek"]>;
};

const TrekkingRouteSection = ({ trek }: TrekkingRouteSectionProps) => {
  return (
    <Card className="overflow-hidden shadow-sm transition-shadow duration-200 hover:shadow-md">
      <CardHeader className="bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 py-2 dark:from-emerald-950/40 dark:via-green-950/40 dark:to-teal-950/40">
        <CardTitle className="flex items-center gap-3 text-emerald-700 dark:text-emerald-300">
          <div className="rounded-lg bg-emerald-100 p-1.5 dark:bg-emerald-900/60">
            <Mountain className="h-4 w-4" />
          </div>
          <div>
            <span className="text-lg">Trekking Route</span>
            <p className="mt-0.5 text-sm font-normal text-emerald-600/80 dark:text-emerald-400/80">
              Adventure hiking experience
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-2 space-y-4 px-4 sm:px-5">
        {/* Starting Point */}
        <div className="flex items-center gap-2 text-base font-semibold">
          <MapPin className="h-4 w-4 text-orange-600" />
          <span>Starting Point: {trek.startingPoint}</span>
        </div>

        {/* Trek Stats Grid */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {trek.duration && (
            <div className="bg-card flex items-center gap-2 rounded-lg border p-2.5">
              <Clock className="h-4 w-4 text-violet-600" />
              <div>
                <p className="text-muted-foreground text-xs">Duration</p>
                <p className="text-sm font-semibold">{trek.duration}</p>
              </div>
            </div>
          )}

          {trek.distance && (
            <div className="bg-card flex items-center gap-2 rounded-lg border p-2.5">
              <Route className="h-4 w-4 text-emerald-600" />
              <div>
                <p className="text-muted-foreground text-xs">Distance</p>
                <p className="text-sm font-semibold">{trek.distance}</p>
              </div>
            </div>
          )}

          {trek.difficulty && (
            <div className="bg-card flex items-center gap-2 rounded-lg border p-2.5">
              <TrendingUp className="h-4 w-4 text-rose-600" />
              <div>
                <p className="text-muted-foreground text-xs">Difficulty</p>
                <Badge
                  variant={
                    trek.difficulty.toLowerCase().includes("easy")
                      ? "secondary"
                      : trek.difficulty.toLowerCase().includes("moderate")
                        ? "default"
                        : "destructive"
                  }
                  className="mt-0.5 text-xs"
                >
                  {trek.difficulty}
                </Badge>
              </div>
            </div>
          )}

          {trek.altitudeGain && (
            <div className="bg-card flex items-center gap-2 rounded-lg border p-2.5">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-muted-foreground text-xs">Altitude Gain</p>
                <p className="text-sm font-semibold">{trek.altitudeGain}</p>
              </div>
            </div>
          )}

          {trek.maxAltitude && (
            <div className="bg-card flex items-center gap-2 rounded-lg border p-2.5">
              <Mountain className="h-4 w-4 text-indigo-600" />
              <div>
                <p className="text-muted-foreground text-xs">Max Altitude</p>
                <p className="text-sm font-semibold">{trek.maxAltitude}</p>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Trail Description */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-slate-600" />
            <span className="text-base font-semibold">Trail Description</span>
          </div>
          <p className="text-muted-foreground pl-6 text-sm leading-relaxed">
            {trek.trailDescription}
          </p>
        </div>

        {/* Checkpoints */}
        {trek.checkpoints && trek.checkpoints.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span className="text-base font-semibold">Checkpoints</span>
            </div>
            <div className="grid grid-cols-1 gap-2 pl-6 md:grid-cols-2">
              {trek.checkpoints.map((checkpoint, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-md bg-emerald-50 p-2 dark:bg-emerald-950/30"
                >
                  <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500"></div>
                  <span className="text-xs">{checkpoint}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Required Permits */}
        {trek.permits && trek.permits.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-violet-600" />
              <span className="text-base font-semibold">Required Permits</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pl-6">
              {trek.permits.map((permit, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="px-2 py-0.5 text-xs"
                >
                  {permit}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Important Note */}
        {trek.note && (
          <Alert className="border border-amber-200/60 bg-amber-50 p-2.5 dark:border-amber-800/40 dark:bg-amber-950/20">
            <AlertCircle className="h-3.5 w-3.5 stroke-amber-500 dark:stroke-amber-400" />
            <AlertTitle className="text-sm font-semibold text-amber-700 dark:text-amber-200/70">
              Important Note:
            </AlertTitle>
            <AlertDescription className="text-xs leading-relaxed text-amber-600 dark:text-amber-300/70">
              {trek.note}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default TrekkingRouteSection;
