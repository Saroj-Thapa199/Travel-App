import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DestinationsPage } from "@/lib/types";
import { DestinationType } from "@/lib/validations/destination";
import axios from "axios";
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
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type OverviewTabProps = {
  bio: string;
  joinDate: string;
  location: string;
  setTab: Dispatch<SetStateAction<string>>;
};

const OverviewTab = ({ bio, joinDate, location, setTab }: OverviewTabProps) => {
  const [savedDestinations, setSavedDestinations] = useState<DestinationType[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    setLoading(true);
    const fetchDestination = async () => {
      const { data, status } = await axios.get<DestinationsPage>(
        "/api/destinations/all",
      );
      if (!data) {
        setError("Failed to fetch destinations");
        return;
      }
      setSavedDestinations(data.destinations);
      setLoading(false);
    };

    fetchDestination();
  }, []);
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
            <p className="text-muted-foreground">{bio}</p>
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
            {savedDestinations.length > 4 &&
              savedDestinations.slice(0, 3).map((destination, index) => (
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
              ))}

            <Button
              variant="link"
              size="sm"
              onClick={() => setTab("saved")}
              className="w-full text-xs"
            >
              View All Saved Places
            </Button>
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="text-primary h-5 w-5" />
              Upcoming Trip
            </CardTitle>
          </CardHeader>
          <CardContent>
            {trips
              .filter((trip) => trip.status === "upcoming")
              .slice(0, 1)
              .map((trip, index) => (
                <div key={index} className="space-y-3">
                  <div className="relative h-32 overflow-hidden rounded-md">
                    <img
                      src={trip.image || "/placeholder.svg"}
                      alt={trip.destination}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-2 left-2 font-medium text-white">
                      {trip.destination}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="text-muted-foreground h-4 w-4" />
                      <span>
                        {trip.startDate} - {trip.endDate}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-green-500/20 bg-green-500/10 text-green-500"
                    >
                      Upcoming
                    </Badge>
                  </div>
                  <Button size="sm" className="w-full">
                    View Trip Details
                  </Button>
                </div>
              ))}
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
};

export default OverviewTab;
