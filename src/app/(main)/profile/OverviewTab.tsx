import { useFavoriteDestinations } from "@/app/hooks/useFavoriteDestinations";
import useProfileData from "@/app/hooks/useProfileData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  CheckCircle,
  Clock,
  Heart,
  MapPin,
  Star,
  User,
} from "lucide-react";
import Link from "next/link";

type OverviewTabProps = {
  userId: string;
  bio: string;
  joinDate: string;
  location: string;
  handleTabChange: (value: string) => void;
};

const OverviewTab = ({
  userId,
  bio,
  joinDate,
  location,
  handleTabChange,
}: OverviewTabProps) => {
  const {data: profileData, isPending: loadingProfileData} = useProfileData(userId)

  const { data, isPending } = useFavoriteDestinations(userId);

  const favoriteDestinations = data?.pages.flatMap((page) => page.destinations);
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div className="space-y-6 md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="text-primary h-5 w-5" />
              About Me
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* <p className="text-muted-foreground">{bio}</p> */}
            <p className="text-muted-foreground">{loadingProfileData ? "Loading..." : profileData?.bio || "No bio added yet"}</p>
            <div className="mt-4 grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
              <div className="flex items-center gap-2">
                <Calendar className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground">Joined:</span>
                <span>{joinDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground">Location:</span>
                <span>{location}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="text-primary h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Saved a new destination</p>
                <p className="text-muted-foreground text-sm">
                  You saved <span className="text-primary">Tatopani</span> to
                  your wishlist
                </p>
                <p className="text-muted-foreground mt-1 text-xs">2 days ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border p-3">
              <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Wrote a review</p>
                <p className="text-muted-foreground text-sm">
                  You reviewed{" "}
                  <span className="text-primary">Panchpokhari</span>
                </p>
                <p className="text-muted-foreground mt-1 text-xs">1 week ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border p-3">
              <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Completed a trip</p>
                <p className="text-muted-foreground text-sm">
                  You marked your trip to{" "}
                  <span className="text-primary">Panchpokhari</span> as
                  completed
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  2 weeks ago
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="text-primary h-5 w-5" />
              Saved Places
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isPending ? (
              Array.from({ length: 3 }).map((_, index) => (
                <DestinationSkeleton key={index} />
              ))
            ) : favoriteDestinations && favoriteDestinations.length > 0 ? (
              favoriteDestinations.slice(0, 3).map((destination, index) => (
                <Link
                  key={index}
                  href={`/destinations/${destination.slug}`}
                  className="hover:bg-muted flex items-center gap-3 rounded-lg p-2 transition-colors"
                >
                  <img
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                  <div>
                    <h5 className="text-sm font-medium">{destination.name}</h5>
                    <p className="text-muted-foreground text-xs">
                      {destination.region}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-muted-foreground py-4 text-center text-sm">
                No saved places yet
              </p>
            )}

            {favoriteDestinations && favoriteDestinations.length > 0 && (
              <Button
                variant="link"
                size="sm"
                onClick={() => handleTabChange("saved")}
                className="w-full text-xs"
              >
                View All Saved Places
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;

const DestinationSkeleton = () => {
  return (
    <div className="flex items-center gap-3 rounded-lg p-2">
      {/* Can change bg of skeleton to input if not visible*/}
      <Skeleton className="size-12" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-44" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
};
