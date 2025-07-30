"use client";

import useFavoritesInfo from "@/app/hooks/useFavoritesInfo";
import AddToFavoritesBtn from "@/components/AddToFavoritesBtn";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FavoritesInfo } from "@/lib/types";
// import { addDestinationToFavorites } from "@/lib/actions/destination";
import { DestinationType } from "@/lib/validation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Calendar,
  Clock,
  DollarSign,
  ImageIcon,
  MapPin,
  Tags,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type DestinationInfoCardProps = {
  destinationId: string;
  categories: string[];
  bestSeason: string[];
  favoritesData: FavoritesInfo;
};

const DestinationInfoCard = ({
  destinationId,
  categories,
  bestSeason,
  favoritesData,
}: DestinationInfoCardProps) => {
  const {
    data: suggestedDestinations,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["destinations", "suggested", destinationId],
    queryFn: async () => {
      const { data } = await axios.get<DestinationType[]>(
        `/api/destinations/suggested/${destinationId}`,
      );
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const { data } = useFavoritesInfo(destinationId, favoritesData);

  if (error) {
    return "Error...";
  }
  
  return (
    // <div className="lg:col-span-1 h-full">
    <div className="bg-muted sticky top-24 rounded-xl p-6">
      <h3 className="mb-4 font-semibold">Quick Facts</h3>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Calendar className="text-muted-foreground mt-0.5 h-5 w-5" />
          <div>
            <p className="font-medium">Best time to visit</p>
            <p className="text-muted-foreground text-sm">
              {/* {destination.quickFacts.crowdedDays} */}
              {/* Weekends and local festivals */}
              {bestSeason.join(", ").replace(/, ([^,]*)$/, " and $1")}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <DollarSign className="text-muted-foreground mt-0.5 h-5 w-5" />
          <div>
            <p className="font-medium">Estimated Budget</p>
            <p className="text-muted-foreground text-sm">
              {/* {destination.quickFacts.crowdedDays} */}
              NPR 10K - 20K
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Tags className="text-muted-foreground mt-0.5 h-5 w-5" />
          <div>
            <p className="font-medium">Categories</p>
            <p className="text-muted-foreground text-sm">
              {/* {destination.quickFacts.arrivalDeparture} */}
              {/* 3-4 hour drive from Kathmandu */}
              {categories.join(", ")}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <Button className="w-full" disabled>
          Favorites: {data.favorites || favoritesData.favorites}
        </Button>
        <AddToFavoritesBtn
          destinationId={destinationId}
          initialState={favoritesData}
          btnStyle="button-text"
        />
      </div>

      <div className="mt-6 border-t pt-6">
        <h4 className="mb-3 font-medium">You might also like</h4>
        <div className="space-y-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <DestinationSkeleton key={index} />
              ))
            : suggestedDestinations &&
              suggestedDestinations.map((destination, index) => (
                <Link
                  key={index}
                  href={`/destinations/${destination.slug}`}
                  className="hover:bg-background/80 flex items-center gap-3 rounded-lg p-2 transition-colors"
                >
                  <Image
                    width={48}
                    height={48}
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    className="aspect-square rounded-md object-cover"
                  />
                  <div>
                    <h5 className="text-sm font-medium">{destination.name}</h5>
                    <p className="text-muted-foreground text-xs">
                      {destination.region}
                    </p>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default DestinationInfoCard;

const DestinationSkeleton = () => {
  return (
    <div className="bg-background dark:bg-primary-foreground flex items-center gap-3 rounded-lg p-2">
      {/* <Skeleton className="size-12 bg-card" /> */}
      {/* <Skeleton className="size-12 grid place-items-center"> */}
      <ImageIcon className="text-input size-12 animate-pulse" />
      {/* </Skeleton> */}
      <div className="space-y-2">
        <Skeleton className="bg-input h-4 w-44" />
        <Skeleton className="bg-input h-4 w-32" />
      </div>
    </div>
  );
};
