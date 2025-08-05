"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Check } from "lucide-react";
import type {
  MotorableRouteType,
  TrekRouteType,
} from "@/lib/validations/routes";
import { useDebounce } from "use-debounce";

interface RouteSegmentSearchProps {
  type: "motorable" | "trek";
  onSegmentSelect: (segment: MotorableRouteType | TrekRouteType) => void;
  onCreateNew: (searchQuery: string) => void;
  selectedSegments: string[];
  availableSegments: (MotorableRouteType | TrekRouteType)[];
}

export function RouteSegmentSearch({
  type,
  onSegmentSelect,
  onCreateNew,
  selectedSegments,
  availableSegments,
}: RouteSegmentSearchProps) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [debouncedFrom] = useDebounce(from, 1000);
  const [debouncedTo] = useDebounce(to, 1000);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const filteredSegments = availableSegments.filter((segment) => {
    const searchLower = searchQuery.toLowerCase();
    if (type === "motorable") {
      const motorableSegment = segment as MotorableRouteType;
      return (
        motorableSegment.from.toLowerCase().includes(searchLower) ||
        motorableSegment.to.toLowerCase().includes(searchLower) ||
        `${motorableSegment.from}-${motorableSegment.to}`
          .toLowerCase()
          .includes(searchLower)
      );
    } else {
      const trekSegment = segment as TrekRouteType;
      return (
        trekSegment.trekName.toLowerCase().includes(searchLower) ||
        trekSegment.startingPoint.toLowerCase().includes(searchLower)
      );
    }
  });

  const handleSearch = () => {
    setShowResults(true);
  };

  const handleCreateNew = () => {
    onCreateNew(searchQuery);
    setSearchQuery("");
    setShowResults(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            placeholder={
              type === "motorable"
                ? "Search route segments (e.g., Kathmandu-Pokhara)"
                : "Search trek routes (e.g., Everest Base Camp)"
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch} variant="outline">
          Search
        </Button>
      </div>

      {showResults && (
        <div className="space-y-3">
          {filteredSegments.length > 0 ? (
            <>
              <h4 className="text-muted-foreground text-sm font-medium">
                Available Segments
              </h4>
              {filteredSegments.map((segment) => {
                const isSelected = selectedSegments.includes(segment._id);
                return (
                  <Card
                    key={segment._id}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "hover:border-primary/50"
                    }`}
                    onClick={() => !isSelected && onSegmentSelect(segment)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          {type === "motorable" ? (
                            <div>
                              <h5 className="font-medium">
                                {(segment as MotorableRouteType).from} →{" "}
                                {(segment as MotorableRouteType).to}
                              </h5>
                              <p className="text-muted-foreground text-sm">
                                {(segment as MotorableRouteType).distance}km •{" "}
                                {(segment as MotorableRouteType).duration} •{" "}
                                {(segment as MotorableRouteType).fare}
                              </p>
                              <div className="mt-2 flex flex-wrap gap-1">
                                {(
                                  segment as MotorableRouteType
                                ).availableServices.map((service) => (
                                  <Badge
                                    key={service}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {service}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div>
                              <h5 className="font-medium">
                                {(segment as TrekRouteType).trekName}
                              </h5>
                              <p className="text-muted-foreground text-sm">
                                Starting from:{" "}
                                {(segment as TrekRouteType).startingPoint}
                              </p>
                              <div className="mt-2 flex items-center gap-2">
                                <Badge variant="outline">
                                  {(segment as TrekRouteType).difficulty}
                                </Badge>
                                {(segment as TrekRouteType).teahouses && (
                                  <Badge variant="secondary">
                                    Teahouses Available
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          {isSelected ? (
                            <div className="text-primary flex items-center gap-2">
                              <Check className="h-4 w-4" />
                              <span className="text-sm font-medium">
                                Selected
                              </span>
                            </div>
                          ) : (
                            <Button size="sm">Select</Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </>
          ) : (
            <div className="space-y-4 py-8 text-center">
              <p className="text-muted-foreground">
                No {type === "motorable" ? "motorable route" : "trek route"}{" "}
                segments found for "{searchQuery}"
              </p>
              <Button onClick={handleCreateNew} className="gap-2">
                <Plus className="h-4 w-4" />
                Create New{" "}
                {type === "motorable" ? "Motorable Route" : "Trek Route"}{" "}
                Segment
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
