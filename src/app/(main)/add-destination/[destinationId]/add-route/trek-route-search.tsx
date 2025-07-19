import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TrekRouteType } from "@/lib/RouteValidation";
import axios from "axios";
import { Check, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

type TrekRouteSearchProps = {
  onSegmentSelect: (segment: TrekRouteType) => void;
  selectedSegments: string[];
};

const TrekRouteSearch = ({
  onSegmentSelect,
  selectedSegments,
}: TrekRouteSearchProps) => {
  const [trekRoutes, setTrekRoutes] = useState<TrekRouteType[]>([]);

  const [trekName, setTrekName] = useState("");

  const [debouncedTrekName] = useDebounce(trekName, 300);

  const handleClear = () => {
    setTrekName("");
    setTrekRoutes([]);
  };

  useEffect(() => {
    const fetchMotorableRoutes = async () => {
      if (!debouncedTrekName.trim()) {
        setTrekRoutes([]);
        return;
      }
      const res = await axios.get(
        `/api/route-segments/trek?trekName=${debouncedTrekName}`,
      );
      setTrekRoutes(res.data);
    };
    fetchMotorableRoutes();
  }, [debouncedTrekName]);
  return (
    <div className="space-y-4">
      <div className="relative flex-1">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
        <Input
          placeholder="Search trek routes (e.g., Everest Base Camp)"
          value={trekName}
          onChange={(e) => setTrekName(e.target.value)}
          // onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          className="pl-10"
        />
      </div>

      <div className="space-y-3">
        {trekRoutes.length > 0 ? (
          <>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm font-medium">
                Available Segments
              </span>
              <span
                onClick={handleClear}
                className="text-muted-foreground hover:text-primary cursor-pointer text-sm font-medium hover:underline"
              >
                Clear All
              </span>
            </div>
            {trekRoutes.map((segment) => {
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
          debouncedTrekName.trim() &&
          trekName.trim() && (
            <div className="space-y-4 py-8 text-center">
              No any matching routes found
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TrekRouteSearch;
