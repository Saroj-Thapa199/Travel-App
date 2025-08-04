import DestinationCard from "@/components/DestinationCard";
import { Button } from "@/components/ui/button";
import { DestinationsPage } from "@/lib/types";
import { DestinationType } from "@/lib/validations/destination";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const FavoritesTab = () => {
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
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Saved Places</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Create Collection
          </Button>
          <Button size="sm">
            <Link href="/destinations">Explore More</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {savedDestinations.map((destination, index) => (
          <DestinationCard
            key={destination._id}
            name={destination.name}
            slug={destination.slug}
            image={destination.image}
            region={destination.region}
            shortDescription={destination.shortDescription}
            rating={destination.averageRating}
            reviewCount={destination.reviewCount}
            isNew={true}
          />
        ))}
      </div>
    </>
  );
};

export default FavoritesTab;
