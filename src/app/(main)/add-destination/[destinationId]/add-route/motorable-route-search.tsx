import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MotorableRouteType } from "@/lib/validations/routes";
import axios from "axios";
import { ArrowBigRight, ArrowRight, Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

type MotorableRouteSearchProps = {
  onSegmentSelect: (segment: MotorableRouteType) => void;
  selectedSegments: string[];
};

const MotorableRouteSearch = ({
  onSegmentSelect,
  selectedSegments,
}: MotorableRouteSearchProps) => {
  //   const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
  const [motorableRoutes, setMotorableRoutes] = useState<MotorableRouteType[]>(
    [],
  );

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [debouncedFrom] = useDebounce(from, 300);
  const [debouncedTo] = useDebounce(to, 300);

  //   const onSegmentSelect = (data: MotorableRouteType) => {};

  const handleClear = () => {
    setFrom("");
    setTo("");
    setMotorableRoutes([]);
  };

  useEffect(() => {
    const fetchMotorableRoutes = async () => {
      if (!debouncedFrom.trim() && !debouncedTo.trim()) {
        setMotorableRoutes([]);
        return;
      }
      console.log("came here");
      const res = await axios.get(
        `/api/route-segments/motorable?from=${debouncedFrom}&to=${debouncedTo}`,
      );
      setMotorableRoutes(res.data);
    };
    fetchMotorableRoutes();
  }, [debouncedFrom, debouncedTo]);
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <ArrowRight className="size-8" />
        <Input
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        {motorableRoutes.length > 0 ? (
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
            {motorableRoutes.map((segment) => {
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
                            {segment.from} → {segment.to}
                          </h5>
                          <p className="text-muted-foreground text-sm">
                            {segment.distance}km • {segment.duration} •{" "}
                            {segment.fare}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {segment.availableServices.map((service) => (
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
          (debouncedFrom.trim() || debouncedTo.trim()) && (
            <div className="space-y-4 py-8 text-center">
              No any matching routes found
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MotorableRouteSearch;
