import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DestinationRouteType } from "@/lib/validations/destination";
import {
  AlertCircle,
  ArrowRight,
  Banknote,
  Bus,
  Calendar,
  Clock,
  Info,
  MapPin,
} from "lucide-react";
import React from "react";

const colors = ["#0ea5e9", "#10b981", "#8b5cf6", "#f59e0b"];

type PublicRouteSectionProps = {
  publicTransport: NonNullable<DestinationRouteType["publicTransport"]>;
};

const PublicRouteSection = ({ publicTransport }: PublicRouteSectionProps) => {
  return (
    <Card className="overflow-hidden shadow-sm transition-shadow duration-200 hover:shadow-md">
      <CardHeader className="bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 py-2 dark:from-sky-950/40 dark:via-blue-950/40 dark:to-indigo-950/40">
        <CardTitle className="flex items-center gap-3 text-sky-700 dark:text-sky-300">
          <div className="rounded-lg bg-sky-100 p-1.5 dark:bg-sky-900/60">
            <Bus className="h-4 w-4" />
          </div>
          <div>
            <span className="text-lg">Public Transport</span>
            {publicTransport.length > 1 && (
              <p className="mt-0.5 text-sm font-normal text-sky-600/80 dark:text-sky-400/80">
                {/* TODO: fix */}
                Total journey time: 2 days
              </p>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-2 px-4 sm:px-5">
        <div className="space-y-4">
          {publicTransport.map((segment, index) => (
            <div
              key={index}
              className="bg-card flex-1 space-y-3 rounded-lg border p-4 shadow-sm"
            >
              {/* Content */}
              {/* <div className="flex-1">
                <div className="bg-card space-y-3 rounded-lg border p-4"> */}
              {/* Route */}
              <div className="flex items-center gap-2 text-sm font-medium">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{segment.from}</span>
                </div>
                <ArrowRight className="text-muted-foreground h-3.5 w-3.5" />
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-rose-600" />
                  <span>{segment.to}</span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {segment.approxTime && (
                  <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                    <Clock className="h-3.5 w-3.5 text-violet-600" />
                    <span>Duration: {segment.approxTime}</span>
                  </div>
                )}

                {segment.fare && (
                  <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                    <Banknote className="h-3.5 w-3.5 text-amber-600" />
                    <span>Fare: {segment.fare}</span>
                  </div>
                )}

                {segment.lastDeparture && (
                  <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                    <Calendar className="h-3.5 w-3.5 text-indigo-600" />
                    <span>Last: {segment.lastDeparture}</span>
                  </div>
                )}
              </div>

              {/* Bus Types */}
              {segment.busTypes && segment.busTypes.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-muted-foreground text-xs font-medium">
                    Available Services:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {segment.busTypes.map((type, typeIndex) => (
                      <Badge
                        key={typeIndex}
                        variant="secondary"
                        className="px-2 py-0.5 text-xs"
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Note */}
              {segment.note && (
                <Alert className="border border-amber-200/60 bg-amber-50 p-2.5 dark:border-amber-800/40 dark:bg-amber-950/20">
                  <AlertCircle className="h-3.5 w-3.5 stroke-amber-500 dark:stroke-amber-400" />
                  <AlertTitle className="text-xs font-medium text-amber-700 dark:text-amber-200/70">
                    Note:
                  </AlertTitle>
                  <AlertDescription className="text-xs text-amber-600 dark:text-amber-300/70">
                    {segment.note}
                  </AlertDescription>
                </Alert>
              )}
            </div>
            //   </div>
            // </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PublicRouteSection;
