"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { RouteForm } from "./route-form";
import RouteSegmentSection from "./route-segment-section";

type AddRouteTabsProps = {
  destinationId: string;
  destinationName: string;
};

const AddRouteTabs = ({
  destinationId,
  destinationName,
}: AddRouteTabsProps) => {
  const [tab, setTab] = useState("route-form");
  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList className="mb-6 w-full">
        <TabsTrigger value="route-form" className="cursor-pointer">
          Add route
        </TabsTrigger>
        <TabsTrigger value="route-segment-form" className="cursor-pointer">
          Create route segments
        </TabsTrigger>
      </TabsList>
      <TabsContent value="route-form">
        <RouteForm
          destinationId={destinationId}
          destinationName={destinationName}
        />
      </TabsContent>
      <TabsContent value="route-segment-form">
        <RouteSegmentSection setTab={setTab} />
      </TabsContent>
    </Tabs>
  );
};

export default AddRouteTabs;
