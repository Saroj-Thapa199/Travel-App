import Image from "next/image";
import Link from "next/link";
import Image1 from "@/assets/hero-image-1.jpg";
import { Badge } from "./ui/badge";
import { Star } from "lucide-react";

type DestinationCardProps = {
  name: string;
  region: string;
  description: string;
  ratings: number;
};

const DestinationCard = ({
  name,
  region,
  description,
  ratings,
}: DestinationCardProps) => {
  return (
    <Link href={"#"} className="group">
      <div className="border-border/50 dark:border-border bg-card overflow-clip rounded-lg border shadow-sm transition-transform duration-200 ease-out hover:-translate-y-1.5 hover:shadow-md dark:shadow-gray-800">
        <div className="h-56 overflow-hidden">
          <Image
            src={Image1}
            alt="destination-pic"
            className="h-full w-full object-cover transition-transform duration-[400ms] group-hover:scale-110"
          />
        </div>
        <div className="p-5">
          <div className="mb-2">
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/20 rounded-xl"
            >
              {region}
            </Badge>
          </div>
          <h3 className="mb-1 text-xl font-bold">{name}</h3>
          <p className="text-muted-foreground mb-3 line-clamp-2 text-sm font-semibold">
            {description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {[...Array(Math.round(ratings))].map((_, index) => (
                <Star
                  key={index}
                  className="size-4"
                  fill="orange"
                  strokeWidth={0}
                />
              ))}
              {[...Array(5 - Math.round(ratings))].map((_, index) => (
                <Star
                  key={index}
                  className="size-4"
                  fill="gray"
                  strokeWidth={0}
                />
              ))}
              <span className="tex ml-1 font-semibold">3.6</span>
            </div>
            <p className="text-muted-foreground">
              •{" "}
              <span className="underline-offset-4 hover:underline">
                3 reviews
              </span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
