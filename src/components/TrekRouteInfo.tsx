import { TrekRouteType } from "@/lib/validations/routes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mountain,
  Clock,
  TrendingUp,
  FileText,
  DollarSign,
  MapPin,
  Calendar,
  Star,
  Backpack,
  Shield,
  Home,
  Info,
  Route,
  List,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

type TrekRouteInfoProps = {
  trekData: Omit<TrekRouteType, "_id">;
  interactiveMode?: boolean;
};

const TrekRouteInfo = ({
  trekData,
  interactiveMode = false,
}: TrekRouteInfoProps) => {
  const [showFull, setShowFull] = useState(interactiveMode ? false : true);
  return showFull ? (
    <div className="space-y-4">
      {/* Trek Summary */}
      <div className="bg-muted/50 rounded-lg p-3">
        <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Mountain className="h-4 w-4" />
            <span className="font-medium">{trekData.trekName}</span>
          </div>
          {interactiveMode ? (
            <div className="flex items-center gap-2 max-sm:justify-between">
              <Badge variant="secondary" className="max-sm:ml-6">
                Trek Route
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
          ) : (
            <Badge variant="secondary" className="max-sm:ml-6">
              Trek Route
            </Badge>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 text-center text-sm sm:grid-cols-4">
          <div>
            <div className="font-semibold">{trekData.difficulty}</div>
            <div className="text-muted-foreground">Difficulty</div>
          </div>
          <div>
            <div className="font-semibold">{trekData.duration.roundTrip}</div>
            <div className="text-muted-foreground">Round Trip</div>
          </div>
          {trekData.duration.oneWay && (
            <div>
              <div className="font-semibold">{trekData.duration.oneWay}</div>
              <div className="text-muted-foreground">One Way</div>
            </div>
          )}
          <div>
            <div className="font-semibold">
              {trekData.teahouses.available ? "Yes" : "No"}
            </div>
            <div className="text-muted-foreground">Teahouses</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Basic Information */}
        <Card className="gap-3">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Info className="h-4 w-4" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <InfoRow
              label="Starting Point"
              value={trekData.startingPoint}
              icon={<MapPin className="h-3 w-3" />}
            />
            {trekData.destinationPoint && (
              <InfoRow
                label="Destination Point"
                value={trekData.destinationPoint}
                icon={<Route className="h-3 w-3" />}
              />
            )}
            <InfoRow
              label="Round Trip Duration"
              value={trekData.duration.roundTrip}
              icon={<Clock className="h-3 w-3" />}
            />
            {trekData.duration.oneWay && (
              <InfoRow
                label="One Way Duration"
                value={trekData.duration.oneWay}
                icon={<Clock className="h-3 w-3" />}
              />
            )}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-3 w-3" />
                <span className="text-muted-foreground text-sm">
                  Difficulty:
                </span>
              </div>
              <Badge className={getDifficultyColor(trekData.difficulty)}>
                {trekData.difficulty}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Teahouses Information */}
        <Card className="gap-3">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Home className="h-4 w-4" />
              Teahouses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between py-1">
              <span className="text-muted-foreground text-sm">Available:</span>
              <Badge
                variant={trekData.teahouses.available ? "default" : "secondary"}
              >
                {trekData.teahouses.available ? "Yes" : "No"}
              </Badge>
            </div>
            {trekData.teahouses.available &&
              trekData.teahouses.locations.length > 0 && (
                <div>
                  <span className="text-muted-foreground mb-2 block text-sm">
                    Locations:
                  </span>
                  <div className="space-y-1">
                    {trekData.teahouses.locations.map((location, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className="bg-primary h-1.5 w-1.5 rounded-full"></div>
                        {location}
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </CardContent>
        </Card>

        {/* Elevation Details */}
        {(trekData.elevation?.start ||
          trekData.elevation?.max ||
          trekData.elevation?.gain) && (
          <Card className="gap-3">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4" />
                Elevation Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {trekData.elevation?.start && (
                <InfoRow
                  label="Start Elevation"
                  value={`${trekData.elevation.start}m`}
                />
              )}
              {trekData.elevation?.max && (
                <InfoRow
                  label="Max Elevation"
                  value={`${trekData.elevation.max}m`}
                />
              )}
              {trekData.elevation?.gain && (
                <InfoRow
                  label="Elevation Gain"
                  value={`${trekData.elevation.gain}m`}
                />
              )}
            </CardContent>
          </Card>
        )}

        {/* Permits */}
        {trekData.permits.length > 0 && (
          <Card className="gap-3">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4" />
                Permits Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {trekData.permits.map((permit, index) => (
                  <div key={index} className="bg-muted rounded p-2">
                    <div className="text-sm font-medium">{permit.name}</div>
                    {permit.cost && (
                      <div className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
                        <DollarSign className="h-3 w-3" />
                        Cost: {permit.cost}
                      </div>
                    )}
                    {permit.where && (
                      <div className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
                        <MapPin className="h-3 w-3" />
                        Where: {permit.where}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Best Season */}
        {trekData.bestSeason.length > 0 && (
          <Card className="gap-3">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="h-4 w-4" />
                Best Season
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {trekData.bestSeason.map((season, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {season}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Highlights */}
      {trekData.highlights.length > 0 && (
        <Card className="gap-3">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Star className="h-4 w-4" />
              Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {trekData.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="bg-primary h-1.5 w-1.5 rounded-full"></div>
                  {highlight}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommended Itinerary */}
      {trekData.recommendedItinerary.length > 0 && (
        <Card className="gap-3">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <List className="h-4 w-4" />
              Recommended Itinerary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {trekData.recommendedItinerary.map((day, index) => (
                <div key={index} className="flex items-start gap-3 text-sm">
                  {/* <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div> */}
                  <Badge className="sm:hidden">{index + 1}</Badge>
                  <Badge className="max-sm:hidden sm:min-w-14">
                    Day {index + 1}
                  </Badge>
                  <span>{day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Packing List */}
      {trekData.packingList.length > 0 && (
        <Card className="gap-3">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Backpack className="h-4 w-4" />
              Packing List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
              {trekData.packingList.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="bg-primary h-1.5 w-1.5 rounded-full"></div>
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Safety Tips */}
      {trekData.safetyTips.length > 0 && (
        <Card className="gap-3 border-blue-200 dark:border-blue-800/60">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base text-blue-800 dark:text-blue-200">
              <Shield className="h-4 w-4" />
              Safety Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {trekData.safetyTips.map((tip, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 rounded bg-blue-50 p-2 text-sm dark:bg-blue-950/40"
                >
                  <Shield className="mt-0.5 h-3 w-3 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                  <span className="text-blue-800 dark:text-blue-200/80">
                    {tip}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  ) : (
    <div className="bg-muted/50 mb-4 rounded-lg border p-3 dark:border-none">
      <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Mountain className="h-4 w-4" />
          <span className="font-medium">{trekData.trekName}</span>
        </div>
        {interactiveMode ? (
          <div className="flex items-center gap-2 max-sm:justify-between">
            <Badge variant="secondary" className="max-sm:ml-6">
              Trek Route
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
        ) : (
          <Badge variant="secondary" className="max-sm:ml-6">
            Trek Route
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 text-center text-sm sm:grid-cols-4">
        <div>
          <div className="font-semibold">{trekData.difficulty}</div>
          <div className="text-muted-foreground">Difficulty</div>
        </div>
        <div>
          <div className="font-semibold">{trekData.duration.roundTrip}</div>
          <div className="text-muted-foreground">Round Trip</div>
        </div>
        {trekData.duration.oneWay && (
          <div>
            <div className="font-semibold">{trekData.duration.oneWay}</div>
            <div className="text-muted-foreground">One Way</div>
          </div>
        )}
        <div>
          <div className="font-semibold">
            {trekData.teahouses.available ? "Yes" : "No"}
          </div>
          <div className="text-muted-foreground">Teahouses</div>
        </div>
      </div>

      <Card className="mt-4 gap-3 max-sm:hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Info className="h-4 w-4" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <InfoRow
            label="Starting Point"
            value={trekData.startingPoint}
            icon={<MapPin className="h-3 w-3" />}
          />
          {trekData.destinationPoint && (
            <InfoRow
              label="Destination Point"
              value={trekData.destinationPoint}
              icon={<Route className="h-3 w-3" />}
            />
          )}
          {trekData?.elevation?.max && (
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-3 w-3" />
                <span className="text-muted-foreground text-sm">
                  Max Elevation:
                </span>
              </div>
              <Badge className={getDifficultyColor(trekData.difficulty)}>
                {trekData.elevation.max} m
              </Badge>
            </div>
          )}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2">
              <FileText className="h-3 w-3" />
              <span className="text-muted-foreground text-sm">Permits:</span>
            </div>
            <Badge variant={"secondary"}>
              {trekData.permits.length > 0
                ? `${trekData.permits.length} required`
                : "Not required"}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrekRouteInfo;

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "bg-green-100 text-green-800";
    case "Moderate":
      return "bg-blue-100 text-blue-800";
    case "Challenging":
      return "bg-yellow-100 text-yellow-800";
    case "Difficult":
      return "bg-orange-100 text-orange-800";
    case "Extreme":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const InfoRow = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}) => (
  <div className="flex items-center justify-between py-1">
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-muted-foreground text-sm">{label}:</span>
    </div>
    <span className="w-fit text-right text-sm font-medium">{value}</span>
  </div>
);
