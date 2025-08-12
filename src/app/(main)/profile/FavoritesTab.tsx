import { useFavoriteDestinations } from "@/app/hooks/useFavoriteDestinations";
import AddToFavoritesBtn from "@/components/AddToFavoritesBtn";
import DestinationCard from "@/components/DestinationCard";
import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import DestinationCardSkeleton from "@/components/skeletons/DestinationCardSkeleton";
import { Button } from "@/components/ui/button";
import { Heart, Loader2, MapPin } from "lucide-react";
import Link from "next/link";

type favoritesTabProps = {
  userId: string;
};

const FavoritesTab = ({ userId }: favoritesTabProps) => {
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useFavoriteDestinations(userId);

  const favoriteDestinations = data?.pages.flatMap((page) => page.destinations);

  if (isFetchingNextPage) {
    console.log("fetching next page");
  }

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

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <DestinationCardSkeleton key={index} />
          ))}
        </div>
      ) : favoriteDestinations && favoriteDestinations.length > 0 ? (
        <InfiniteScrollContainer
          onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {favoriteDestinations.map((destination) => (
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
                  initialState={{
                    addedToFavoritesByUser: true,
                    favorites: destination.favorites,
                  }}
                />
              }
            />
          ))}
          <div className="sm:col-span-2 lg:col-span-3">
            {isFetchingNextPage && <Loader2 className="mx-auto animate-spin" />}
          </div>
        </InfiniteScrollContainer>
      ) : (
        // Empty state when no favorite destinations
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-muted mb-6 rounded-full p-6">
            <Heart className="text-muted-foreground h-12 w-12" />
          </div>
          <h3 className="mb-2 text-2xl font-semibold">No saved places yet</h3>
          <p className="text-muted-foreground mb-6 max-w-lg">
            Start exploring amazing destinations and save your favorites to see
            them here. Your saved places will help you plan future trips and
            keep track of places you want to visit.
          </p>
          <Button asChild>
            <Link href="/destinations">
              <MapPin className="mr-2 h-4 w-4" />
              Explore Destinations
            </Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default FavoritesTab;
