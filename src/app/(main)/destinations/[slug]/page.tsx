import DestinationHeaderImage from "@/components/DestinationHeaderImage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDestinationFromSlug } from "@/lib/actions/destination";
import { destinationSchema } from "@/lib/validations/destination";
import { cache } from "react";
import ReviewSection from "./ReviewSection";
import { notFound } from "next/navigation";
import RouteSection from "./RouteSection";
import DestinationInfoCard from "./DestinationInfoCard";
import { auth } from "@/auth";
import { FavoritesInfo } from "@/lib/types";

export const getCachedDestinationFromSlug = cache(async (slug: string) => {
  return getDestinationFromSlug(slug);
});

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const data = await getCachedDestinationFromSlug(slug);

  return {
    title: data?.name,
    description: data?.shortDescription,
  };
};

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const data = await getCachedDestinationFromSlug(slug);
  if (!data) return notFound();

  const session = await auth();

  console.log(data);

  const destination = destinationSchema.parse(data);

  const favoritesData: FavoritesInfo = {
    favorites: destination.favorites.length,
    addedToFavoritesByUser: destination.favorites.some(
      (id) => id === session?.user.id,
    ),
  };

  return (
    <main className="my-15">
      <DestinationHeaderImage
        destinationId={destination._id}
        image={destination.image}
        name={destination.name}
        region={destination.region}
        rating={destination.averageRating}
        budget={destination.budget}
        reviewCount={destination.reviewCount}
        favoritesData={favoritesData}
        className="h-[50vh] rounded-none border-0 sm:h-[60vh]"
      />

      <div className="mx-auto grid grid-cols-1 gap-8 px-4 py-8 sm:px-8 md:px-14 lg:grid-cols-3 lg:px-20 xl:container">
        <section className="md:col-span-2">
          <Tabs defaultValue="overview" className="">
            <TabsList className="mb-6 w-full">
              <TabsTrigger value="overview" className="cursor-pointer">
                Overview
              </TabsTrigger>
              <TabsTrigger value="routes" className="cursor-pointer">
                Routes
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
                    {destination.longDescription}
                    {destination.longDescription}
                    {destination.longDescription}
                    {destination.longDescription}
                    {destination.longDescription}
                    {destination.longDescription}
                    {destination.longDescription}
                    {destination.longDescription}
                    {destination.longDescription}
                    {destination.longDescription}
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="routes">
              <RouteSection destinationId={destination._id} />
            </TabsContent>
            <TabsContent value="attractions">
              Change your password here.
            </TabsContent>
            <TabsContent value="review">
              <ReviewSection
                destinationName={destination.name}
                destinationId={destination._id}
                averageRating={destination.averageRating}
                reviewCount={destination.reviewCount}
              />
            </TabsContent>
          </Tabs>
        </section>
        <section className="col-span-1">
          <DestinationInfoCard
            destinationId={destination._id}
            categories={destination.categories}
            bestSeason={destination.bestSeason}
            // favorites={destination.favorites}
            // favoriteByUser={
            //   session?.user.id
            //     ? destination.favorites.includes(session.user.id)
            //     : false
            // }
            favoritesData={favoritesData}
          />
        </section>
      </div>
    </main>
  );
};

export default page;
