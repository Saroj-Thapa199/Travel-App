import { useFavoriteDestinations } from "@/app/hooks/useFavoriteDestinations";
import AddToFavoritesBtn from "@/components/AddToFavoritesBtn";
import DestinationCard from "@/components/DestinationCard";
import { Button } from "@/components/ui/button";
import { DestinationsPage } from "@/lib/types";
import { DestinationType } from "@/lib/validations/destination";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

type favoritesTabProps = {
  userId: string
}

const FavoritesTab = ({userId}: favoritesTabProps) => {

  const {data, hasNextPage, fetchNextPage} = useFavoriteDestinations({userId})

  const favoriteDestinations = data?.pages.flatMap(page => page.destinations)

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Saved Places</h2>
        <div className="flex items-center gap-2">
          {/* <Button variant="outline" size="sm">
            Create Collection
          </Button> */}
          <Button>
            <Link href="/destinations">Explore More</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favoriteDestinations && favoriteDestinations.map((destination, index) => (
          <DestinationCard
            key={destination._id}
            name={destination.name}
            slug={destination.slug}
            image={destination.image}
            region={destination.region}
            shortDescription={destination.shortDescription}
            rating={destination.averageRating}
            reviewCount={destination.reviewCount}
            action={
              <AddToFavoritesBtn
                btnStyle="icon"
                destinationId={destination._id}
                initialState={{ addedToFavoritesByUser: true, favorites: destination.favorites }}
              />
            }
          />
        ))}
        <div className="sm-col-span-2 lg:col-span-3 justify-center">
          {hasNextPage && <Button variant={"ghost"} onClick={() => fetchNextPage()}>Load more</Button>}
        </div>
      </div>
    </>
  );
};

export default FavoritesTab;
