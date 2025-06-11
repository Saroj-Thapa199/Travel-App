import DestinationCard from "@/components/DestinationCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllDestinaitons } from "@/lib/actions/destination";
import { destinationSchema } from "@/lib/validation";
import { SearchIcon } from "lucide-react";
import React from "react";
import { z } from "zod";

const categories = [
  "All",
  "Popular",
  "Beach",
  "Mountain",
  "City",
  "Cultural",
  "Adventure",
  "Relaxation",
];

const page = async () => {
  const rawDestinations = await getAllDestinaitons()
  const destinations = z.array(destinationSchema).parse(rawDestinations);

  return (
    <main className="min-h-screen w-full px-4 py-15 sm:px-8 md:px-14 lg:px-20 xl:container">
      <div className="mx-auto my-6 max-w-3xl text-center">
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">
          Explore Amazing Destinations
        </h1>
        <h2 className="text-muted-foreground text-lg">
          Discover breathtaking locations around the world and find your next
          adventure.
        </h2>
      </div>
      <div className="mx-auto mb-8 flex max-w-4xl justify-center gap-2">
        <div className="relative">
          <Input
            name="query"
            placeholder="Search destinations..."
            className="max-w-sm ps-10"
          />
          <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 size-5 -translate-y-1/2 transform" />
        </div>
        <Button>Search</Button>
      </div>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant="outline"
            className="hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
          >
            {category}
          </Badge>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {destinations?.map(destination => (
          <DestinationCard
            key={destination._id}
            name={destination.name}
            region={destination.region}
            shortDescription={destination.shortDescription}
            image={destination.image}
            ratings={3.6}
            slug={destination.slug}
          />
        ))}
        {[1, 2, 3, 4, 5, 6].map((destination, index) => (
          <DestinationCard
            key={index}
            name="Bethanchowk Narayanthan"
            region="Destination, Nepal"
            shortDescription="Serene hilltop with panoramic Himalayan views, pristine forests, and spiritual significance."
            ratings={3.6}
            slug="#"
          />
        ))}
      </div>
    </main>
  );
};

export default page;
