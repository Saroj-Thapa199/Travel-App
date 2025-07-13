"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RouteForm } from "./route-form";
import RouteSegmentSection from "./route-segment-section";

const page = () => {
  return (
    <main className="mx-auto min-h-screen w-full px-4 py-15 sm:px-8 md:px-14 lg:px-20 xl:container">
      <div className="mx-auto my-6 max-w-3xl text-center">
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">Add Routes</h1>
        <h2 className="text-muted-foreground text-lg">
          Help fellow travelers find their way to the destination by sharing
          your route.
        </h2>
      </div>

      <div className="mx-auto max-w-4xl">
        <Tabs defaultValue="route-form">
          <TabsList className="mb-6 w-full">
            <TabsTrigger value="route-form" className="cursor-pointer">
              Add route
            </TabsTrigger>
            <TabsTrigger value="route-segment-form" className="cursor-pointer">
              Create route segments
            </TabsTrigger>
          </TabsList>
          <TabsContent value="route-form">
            <RouteForm />
          </TabsContent>
          <TabsContent value="route-segment-form">
            <RouteSegmentSection />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default page;
