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
import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import { categoriesList } from "@/lib/data";
import { isNew } from "@/lib/utils";

const page = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState<string>();
  // const [selectedValue, setSelectedValue] = useState<
  //   "rating-asc" | "rating-desc" | "default"
  // >("default");
  const [sortBy, setSortBy] = useState<
    "rating-asc" | "rating-desc" | "default"
  >("default");
  const [hasSearched, setHasSearched] = useState(false);
  const {
    data,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    status,
    fetchNextPage,
  } = useDestinations({ searchTerm, sortBy, category });

  const destinations = data?.pages.flatMap((page) => page.destinations) || [];

  const triggerSearch = () => {
    setSearchTerm(searchInputRef.current?.value);
    setHasSearched(true);
  };

  const handleBottomReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <main className="mx-auto min-h-screen w-full px-4 py-15 sm:px-8 md:px-14 lg:px-20 xl:container">
      <div className="mx-auto my-6 max-w-3xl text-center">
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">
          Explore Amazing Destinations
        </h1>
        <h2 className="text-muted-foreground text-lg">
          Discover breathtaking locations around the world and find your next
          adventure.
        </h2>
      </div>
      <div className="mx-auto mb-8 flex max-w-xl flex-col justify-evenly gap-2 max-sm:items-center sm:flex-row">
        <div className="flex gap-2">
          <div className="relative">
            <Input
              ref={searchInputRef}
              disabled={status === "pending"}
              name="query"
              placeholder="Search destinations..."
              onKeyDown={(e) => {
                if (e.key === "Enter") triggerSearch();
              }}
              className="max-w-sm ps-10"
            />
            <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 size-5 -translate-y-1/2 transform" />
          </div>
          <LoadingButton
            disabled={status === "pending"}
            loading={status === "pending" && hasSearched}
            onClick={triggerSearch}
          >
            Search
          </LoadingButton>
        </div>
        <Select value={sortBy} onValueChange={setSortBy as () => void}>
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
        {categoriesList.map((individualCat) => (
          <Badge
            key={individualCat}
            variant={category === individualCat ? "default" : "outline"}
            className="hover:bg-primary hover:text-primary-foreground cursor-pointer capitalize transition-colors"
            onClick={() => setCategory(individualCat)}
          >
            {individualCat}
          </Badge>
        ))}
      </div>
      <InfiniteScrollContainer
        // onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
        onBottomReached={handleBottomReached}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {status === "pending" ? (
          Array.from({ length: 6 }).map((_, index) => (
            <DestinationCardSkeleton key={index} />
          ))
        ) : destinations.length > 0 ? (
          destinations.map((destination) => (
            <DestinationCard
              key={destination._id}
              name={destination.name}
              region={destination.region}
              shortDescription={destination.shortDescription}
              image={destination.image}
              rating={destination?.averageRating || 0}
              slug={destination.slug}
              reviewCount={destination.reviewCount}
              isNew={isNew({
                createdAt: destination.createdAt,
                type: "day",
                range: 3,
              })}
            />
          ))
        ) : searchTerm || category !== "all" ? (
          <div className="col-span-full">
            <div className="flex flex-col items-center justify-center py-8 text-center sm:py-16">
              <div className="bg-muted mb-6 rounded-full p-6">
                <SearchIcon className="text-muted-foreground h-12 w-12" />
              </div>
              <h3 className="mb-2 text-2xl font-semibold">
                No destinations found
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                {searchTerm
                  ? `We couldn't find any destinations matching "${searchTerm}"`
                  : category !== "all"
                    ? `No destinations found in the "${category}" category`
                    : "No destinations match your current filters"}
              </p>
              <Button
                onClick={() => {
                  setSearchTerm(undefined);
                  setHasSearched(false);
                  if (searchInputRef.current) {
                    searchInputRef.current.value = "";
                  }
                }}
              >
                Clear Search
              </Button>
            </div>
          </div>
        ) : (
          <div className="col-span-full">
            <div className="flex flex-col items-center justify-center text-center sm:py-16">
              <div className="bg-muted mb-6 rounded-full p-6">
                <svg
                  className="text-muted-foreground h-12 w-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-2xl font-semibold">
                No destinations available
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                It looks like there are no destinations to explore right now.
                Check back later for amazing places to discover!
              </p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Refresh page
              </Button>
            </div>
          </div>
        )}
      </InfiniteScrollContainer>
      {isFetchingNextPage && (
        <div className="hidden sm:grid sm:w-full sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <DestinationCardSkeleton key={index} />
          ))}
        </div>
      )}
      {isFetchingNextPage && (
        <Loader2 className="mx-auto my-6 size-8 animate-spin font-light" />
      )}
    </main>
  );
};

export default page;
