import MotorableRouteInfo from "@/components/MotorableRouteInfo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MotorableRouteType } from "@/lib/RouteValidation";
import { Info, MapPin, Route } from "lucide-react";
import React, { useState } from "react";

type MotorableRouteProps = {
  motorableData: MotorableRouteType;
};

const MotorableRoute = ({ motorableData }: MotorableRouteProps) => {
  const [showFull, setShowFull] = useState(false);
  return (
    showFull ? (
        <MotorableRouteInfo
          motorableData={motorableData}
          interactiveMode
          showFull={showFull}
          setShowFull={setShowFull}
        />
      ) : (
        <div className="bg-muted/50 mb-4 rounded-lg p-3">
          {/* Header */}
          <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="font-medium">
                {motorableData.from} → {motorableData.to}
              </span>
            </div>
            <div className="flex items-center gap-2 max-sm:justify-between">
              <Badge variant="secondary" className="max-sm:ml-6">
                Motorable Route
              </Badge>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setShowFull((prev) => !prev)}
              >
                {showFull ? "Show Summary" : "Show Full Info"}
              </Button>
            </div>
          </div>

          {/* Summary Grid */}
          <div className="grid grid-cols-2 gap-4 text-center text-sm sm:grid-cols-4">
            <div>
              <div className="font-semibold">{motorableData.distance} km</div>
              <div className="text-muted-foreground">Distance</div>
            </div>
            <div>
              <div className="font-semibold">{motorableData.duration}</div>
              <div className="text-muted-foreground">Duration</div>
            </div>
            <div>
              <div className="font-semibold">{motorableData.fareRange}</div>
              <div className="text-muted-foreground">Fare</div>
            </div>
            <div>
              <div className="font-semibold">
                {motorableData.roadCondition.type}
              </div>
              <div className="text-muted-foreground">Road Quality</div>
            </div>
          </div>

          {/* Important Details */}
          <div className="mt-4 space-y-3 rounded-lg border p-3 text-sm">
            {motorableData.bookingInfo && (
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Info className="h-3 w-3" />
                  <span className="text-muted-foreground text-sm">
                    Booking Info
                  </span>
                </div>
                <p className="bg-muted rounded p-2 text-xs">
                  {motorableData.bookingInfo}
                </p>
              </div>
            )}

            {motorableData.route && (
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Route className="h-3 w-3" />
                  <span className="text-muted-foreground text-sm">
                    Route Info
                  </span>
                </div>
                <p className="bg-muted rounded p-2 text-xs">
                  {motorableData.route}
                </p>
              </div>
            )}

            {motorableData.roadCondition.description && (
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Info className="h-3 w-3" />
                  <span className="text-muted-foreground text-sm">
                    Road Details
                  </span>
                </div>
                <p className="bg-muted rounded p-2 text-xs">
                  {motorableData.roadCondition.description}
                </p>
              </div>
            )}
          </div>
        </div>
      )
  );
};

export default MotorableRoute;
