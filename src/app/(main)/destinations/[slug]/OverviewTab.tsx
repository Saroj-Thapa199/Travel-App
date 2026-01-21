"use client";

import Accommodations from "@/components/Accomodations";
import Activities from "@/components/Activities";
import Highlights from "@/components/Highlights";
import LocalCuisines from "@/components/LocalCuisines";
import { Separator } from "@/components/ui/separator";
import { DestinationType } from "@/lib/validations/destination";

interface DestinationOverviewProps {
  name: string;
  region: string;
  shortDescription: string;
  longDescription: string;
  image?: string;
  activities?: string[];
  highlights?: Array<{
    title: string;
    description: string;
  }>;
  destination: DestinationType;
}

const DestinationOverview = ({
  name,
  shortDescription,
  longDescription,
  destination,
}: DestinationOverviewProps) => {
  return (
    <div className="space-y-8">
      {/* About Section */}
      <div>
        <h2 className="mb-4 text-2xl font-bold">About {name}</h2>
        <div className="space-y-4">
          <div className="text-muted-foreground flex items-center gap-2"></div>
          <p className="text-lg leading-relaxed">{shortDescription}</p>
          <p className="text-muted-foreground leading-relaxed">
            {longDescription}
            {longDescription}
          </p>
        </div>
      </div>

      <Separator />

      {/* Key Highlights */}
      <Highlights highlights={destination.highlights} />

      <Separator />

      {/* Local Cuisines Section */}
      {destination.localCuisines.length > 0 && (
        <LocalCuisines localCuisines={destination.localCuisines} />
      )}
      <Separator />

      {/* Activities to d0 */}
      <Activities activities={destination.activities} />

      <Separator />

      {/* Accommodations options */}
      <Accommodations accommodations={destination.accommodations} />
    </div>
  );
};

export default DestinationOverview;
