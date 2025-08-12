import Image from "next/image";
import Link from "next/link";
import Image1 from "@/assets/hero-image-1.jpg";
import { Badge } from "./ui/badge";
import { MapPin, Star } from "lucide-react";
import { ReactNode } from "react";

type DestinationCardProps = {
  name: string;
  region: string;
  shortDescription: string;
  rating: number;
  image?: string;
  slug: string;
  reviewCount: number;
  isNew?: boolean;
  featured?: boolean;
  action?: ReactNode;
};

const DestinationCard = ({
  name,
  region,
  shortDescription,
  rating,
  image,
  slug,
  reviewCount,
  isNew,
  featured,
  action,
}: DestinationCardProps) => {
  return (
    <Link href={`/destinations/${slug}`} className="group">
      <div className="border-border/50 dark:border-border bg-card flex h-full flex-col overflow-clip rounded-lg border shadow-md transition-transform duration-500 hover:-translate-y-1.5 hover:shadow-lg dark:shadow-gray-800">
        <div className="relative h-56 overflow-hidden">
          <Image
            src={image || Image1}
            alt="destination-pic"
            priority
            fill
            sizes="600px"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {featured && (
            <Badge className="bg-primary/90 hover:bg-primary absolute top-3 left-3 dark:hidden">
              Featured
            </Badge>
          )}
          {featured && (
            <Badge
              variant={"secondary"}
              className="absolute top-3 left-3 not-dark:hidden"
            >
              Featured
            </Badge>
          )}
          <div className="absolute top-3 right-3 flex gap-1">
            {isNew && (
              <Badge className="bg-green-500/90 hover:bg-green-500">New</Badge>
            )}
            {action && action}
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between gap-3 p-5">
          <div>
            <div className="mb-2">
              <Badge
                variant="outline"
                className="bg-primary/10 text-primary border-primary/20 flex items-center gap-1 rounded-xl"
              >
                <MapPin />
                {region}
              </Badge>
            </div>
            <h3 className="mb-1 text-xl font-bold">{name}</h3>
            <p className="text-muted-foreground line-clamp-2 text-sm">
              {shortDescription}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`h-4 w-4 ${index < Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}`}
                  strokeWidth={0}
                />
              ))}
              {rating > 0 && (
                <span className="ml-1 font-semibold">{rating.toFixed(1)}</span>
              )}
            </div>
            <p className="text-muted-foreground">
              •{" "}
              <span className="underline-offset-4 hover:underline">
                {reviewCount === 0
                  ? "No reviews yet"
                  : `${reviewCount} reviews`}
              </span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
