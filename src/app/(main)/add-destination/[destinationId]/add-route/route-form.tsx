"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { X, Car, Mountain, MapPin, ArrowRight } from "lucide-react";
import { useState, useTransition } from "react";
import {
  MotorableRouteType,
  routeFormSchema,
  RouteFormType,
  TrekRouteType,
} from "@/lib/RouteValidation";
import MotorableRouteSearch from "./motorable-route-search";
import TrekRouteSearch from "./trek-route-search";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TrekRouteInfo from "@/components/TrekRouteInfo";
import { createDestinationRoute } from "@/lib/actions/route";
import LoadingButton from "@/components/LoadingButton";
import MotorableRouteInfo from "@/components/MotorableRouteInfo";

type RouteFormProps = {
  destinationId: string;
  destinationName: string;
};

export function RouteForm({ destinationId, destinationName }: RouteFormProps) {
  const [selectedMotorableRoutes, setSelectedMotorableRoutes] = useState<
    MotorableRouteType[]
  >([]);
  const [selectedTrekRoutes, setSelectedTrekRoutes] = useState<TrekRouteType[]>(
    [],
  );
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<RouteFormType>({
    resolver: zodResolver(routeFormSchema),
    values: {
      destination: destinationId,
      motorableRoute: selectedMotorableRoutes.map((route) => route._id),
      trekRoute: selectedTrekRoutes.map((route) => route._id),
    },
  });

  const values = form.watch();

  console.log(values);

  const handleSubmit = (data: RouteFormType) => {
    setError(undefined);

    startTransition(async () => {
      const { error } = await createDestinationRoute(values);
      if (error) setError(error);
    });
  };

  const handleMotorableSegmentSelect = (
    motorableSegment: MotorableRouteType,
  ) => {
    if (!selectedMotorableRoutes.find((r) => r._id === motorableSegment._id)) {
      setSelectedMotorableRoutes([
        ...selectedMotorableRoutes,
        motorableSegment,
      ]);
    }
  };

  const handleTrekSegmentSelect = (trekSegment: TrekRouteType) => {
    if (!selectedTrekRoutes.find((r) => r._id === trekSegment._id)) {
      setSelectedTrekRoutes([...selectedTrekRoutes, trekSegment]);
    }
  };

  const removeMotorableRoute = (routeId: string) => {
    setSelectedMotorableRoutes((prev) => prev.filter((r) => r._id !== routeId));
  };

  const removeTrekRoute = (routeId: string) => {
    setSelectedTrekRoutes((prev) => prev.filter((r) => r._id !== routeId));
  };

  return (
    <div className="space-y-5">
      {error && <div className="text-destructive text-center">{error}</div>}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="size-8" />
            <div className="flex flex-col pt-1">
              <span>Create New Route</span>
              <span className="text-muted-foreground text-sm">
                {destinationName}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">
                      Motorable Route Segments
                    </h3>
                  </div>

                  <MotorableRouteSearch
                    onSegmentSelect={handleMotorableSegmentSelect}
                    selectedSegments={selectedMotorableRoutes.map((r) => r._id)}
                  />

                  {selectedMotorableRoutes.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-muted-foreground text-sm font-medium">
                        Selected Motorable Routes
                      </h4>
                      <div className="space-y-2">
                        {selectedMotorableRoutes.map((route, index) => (
                          <div
                            key={route._id}
                            className="bg-muted/30 flex items-center gap-3 rounded-lg border p-3"
                          >
                            <div className="text-muted-foreground flex items-center gap-2 text-sm">
                              <span className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium">
                                {index + 1}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {route.from}
                                </span>
                                <ArrowRight className="text-muted-foreground h-4 w-4" />
                                <span className="font-medium">{route.to}</span>
                              </div>
                              <p className="text-muted-foreground text-sm">
                                {route.distance}km • {route.duration} •{" "}
                                {route.fare}
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeMotorableRoute(route._id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Mountain className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">
                      Trek Route Segments
                    </h3>
                  </div>

                  <TrekRouteSearch
                    onSegmentSelect={handleTrekSegmentSelect}
                    selectedSegments={selectedTrekRoutes.map((r) => r._id)}
                  />

                  {selectedTrekRoutes.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-muted-foreground text-sm font-medium">
                        Selected Trek Routes
                      </h4>
                      <div className="space-y-2">
                        {selectedTrekRoutes.map((route, index) => (
                          <div
                            key={route._id}
                            className="bg-muted/30 flex items-center gap-3 rounded-lg border p-3"
                          >
                            <div className="text-muted-foreground flex items-center gap-2 text-sm">
                              <span className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium">
                                {index + 1}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">
                                {route.trekName}
                              </div>
                              <p className="text-muted-foreground text-sm">
                                Starting from: {route.startingPoint} •{" "}
                                {route.difficulty}
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeTrekRoute(route._id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div className="pt-4">
                <LoadingButton
                  type="submit"
                  loading={isPending}
                  className="w-full"
                  size="lg"
                  disabled={
                    selectedMotorableRoutes.length === 0 &&
                    selectedTrekRoutes.length === 0
                  }
                >
                  Create Route
                </LoadingButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Route Summary */}
      {(selectedMotorableRoutes.length > 0 ||
        selectedTrekRoutes.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Route Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedMotorableRoutes.length > 0 && (
                <div>
                  <h4 className="text-muted-foreground mb-3 flex items-center gap-2 text-sm font-medium">
                    <Car className="h-4 w-4" />
                    MOTORABLE ROUTE SEGMENTS ({selectedMotorableRoutes.length})
                  </h4>
                  <Accordion type="multiple" className="w-full">
                    {selectedMotorableRoutes.map((route, index) => (
                      <AccordionItem key={route._id} value={route._id}>
                        <AccordionTrigger>
                          <div>
                            <span>{index + 1}. </span>
                            {route.from} to {route.to}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="w-full">
                          <MotorableRouteInfo motorableData={route} />
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}

              {selectedTrekRoutes.length > 0 && (
                <div>
                  <h4 className="text-muted-foreground mb-3 flex items-center gap-2 text-sm font-medium">
                    <Mountain className="h-4 w-4" />
                    TREK ROUTE SEGMENTS ({selectedTrekRoutes.length})
                  </h4>
                  <Accordion type="multiple" className="w-full">
                    {selectedTrekRoutes.map((route, index) => (
                      <AccordionItem key={route._id} value={route._id}>
                        <AccordionTrigger>
                          <div>
                            <span>{index + 1}. </span>
                            {route.trekName}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="w-full">
                          <TrekRouteInfo trekData={route} />
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
