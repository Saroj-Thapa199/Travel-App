import DestinationHeaderImage from "@/components/DestinationHeaderImage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllDestinaitons, getDestinationFromSlug } from "@/lib/actions/destination";
import { destinationSchema } from "@/lib/validation";
import { ImageIcon, Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import { z } from "zod";
import ReviewSection from "./ReviewSection";
import { notFound } from "next/navigation";

// export async function generateStaticParams() {
//   const res = await fetch("http://localhost:3000/api/destinations/all");
//   const data = await res.json();
//   const destinations = z.array(destinationSchema).parse(data.destinations);

//   return destinations?.map((destination) => ({
//     slug: destination.slug,
//   }))
// }

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const {slug} = await params;
  console.log({slug})
  const data = await getDestinationFromSlug(slug)
  if(!data) return notFound()

  const destination = destinationSchema.parse(data)
  return (
    <main className="my-15">
      <DestinationHeaderImage
        image={destination.image}
        name={destination.name}
        region={destination.region}
        rating={2.6}
        className="h-[50vh] rounded-none border-0"
      />

      <div className="grid grid-cols-1 gap-8 px-4 py-8 sm:px-8 md:px-14 lg:grid-cols-3 lg:px-20 xl:container">
        <section className="md:col-span-2">
          <Tabs defaultValue="overview" className="">
            <TabsList className="mb-6 w-full">
              <TabsTrigger value="overview" className="cursor-pointer">
                Overview
              </TabsTrigger>
              <TabsTrigger value="attractions" className="cursor-pointer">
                Attractions
              </TabsTrigger>
              <TabsTrigger value="review" className="cursor-pointer">
                Review
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="">
                <div>
                  <h2 className="mb-3 text-xl font-semibold">
                    About {destination.name}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {destination.shortDescription}
                  </p>
                  <p className="text-muted-foreground">
                    {destination.longDescription}
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="attractions">
              Change your password here.
            </TabsContent>
            <TabsContent value="review">
              <ReviewSection destinationName={destination.name} destinationId={destination._id} />
            </TabsContent>
          </Tabs>
        </section>
        <section className="col-span-1 min-h-52 w-full bg-red-100"></section>
      </div>
    </main>
  );
};

export default page;
