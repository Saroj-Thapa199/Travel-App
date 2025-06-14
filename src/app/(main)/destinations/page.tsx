"use client";

import DestinationCard from "@/components/DestinationCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, SearchIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import DestinationCardSkeleton from "@/components/DestinationCardSkeleton";
import useDestinations from "@/app/hooks/useDestinations";
import LoadingButton from "@/components/LoadingButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const page = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [searchTerm, setSearchTerm] = useState<string>();
  const [selectedValue, setSelectedValue] = useState<"rating-asc" | "rating-desc" | "default">("default")
  const [sortBy, setSortBy] = useState<"rating-asc" | "rating-desc" | "default">("default");
  const [hasSearched, setHasSearched] = useState(false);
  console.log({searchTerm, sortBy});
  const {
    data,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    status,
    fetchNextPage,
  } = useDestinations({ searchTerm, sortBy });

  const destinations = data?.pages.flatMap((page) => page.destinations) || [];

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
      <div className="mx-auto mb-8 flex flex-col sm:flex-row max-sm:items-center max-w-xl justify-evenly gap-2">
        <div className="flex gap-2">
          <div className="relative">
          <Input
            ref={searchInputRef}
            name="query"
            placeholder="Search destinations..."
            className="max-w-sm ps-10"
          />
          <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 size-5 -translate-y-1/2 transform" />
        </div>
        <LoadingButton
          disabled={status === "pending"}
          loading={status === "pending" && hasSearched}
          onClick={() => {
            setSearchTerm(searchInputRef.current?.value);
            setSortBy(selectedValue)
            setHasSearched(true);
          }}
        >
          Search
        </LoadingButton>
        </div>
        <Select onValueChange={setSelectedValue as () => void}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="rating-desc">Rating</SelectItem>
          </SelectContent>
        </Select>
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
        {status === "pending"
          ? Array.from({ length: 6 }).map((_, index) => (
              <DestinationCardSkeleton key={index} />
            ))
          : destinations?.map((destination, index) => (
              <DestinationCard
                key={destination._id}
                name={destination.name}
                region={destination.region}
                shortDescription={destination.shortDescription}
                image={destination.image}
                ratings={destination?.averageRating || 0}
                slug={destination.slug}
              />
            ))}
        {/* {[1, 2, 3, 4, 5, 6].map((destination, index) => (
          <DestinationCard
            key={index}
            name="Bethanchowk Narayanthan"
            region="Destination, Nepal"
            shortDescription="Serene hilltop with panoramic Himalayan views, pristine forests, and spiritual significance."
            ratings={3.6}
            slug="#"
          />
        ))} */}
      </div>
      <div>
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetching}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
              ? "Load More"
              : "Nothing more to load"}
        </Button>
      </div>
      <div>{isFetchingNextPage ? "Fetching..." : null}</div>
    </main>
  );
};

export default page;
