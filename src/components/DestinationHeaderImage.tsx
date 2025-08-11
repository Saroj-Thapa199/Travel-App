"use client";

import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Share, Star } from "lucide-react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { FavoritesInfo } from "@/lib/types";
import AddToFavoritesBtn from "./AddToFavoritesBtn";

type DestinationHeaderImageProps = {
  destinationId: string;
  name: string;
  region: string;
  image: string;
  rating: number;
  reviewCount: number;
  budget: string;
  favoritesData: FavoritesInfo;
  className?: string;
};

const DestinationHeaderImage = ({
  destinationId,
  name,
  region,
  image,
  rating,
  reviewCount,
  budget,
  favoritesData,
  className,
}: DestinationHeaderImageProps) => {
  return (
    <Card className={cn("overflow-clip p-0", className)}>
      <CardContent className="h-full p-0">
        <figure className="bg-muted relative h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={image}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 700px"
              alt="destination-image"
              className="object-cover"
            />
          </div>
          {/* Gradient */}
          <div className="from-primary/60 dark:from-secondary/60 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"></div>
          {/* Informations */}
          <figcaption className="absolute inset-0 flex items-end p-6">
            <div>
              <Badge className="rounded-full px-2.5 dark:hidden">
                {region}
              </Badge>
              <Badge
                variant={"secondary"}
                className="rounded-full px-2.5 not-dark:hidden"
              >
                {region}
              </Badge>
              <h2 className="text-secondary dark:text-primary text-xl leading-relaxed font-bold sm:text-2xl md:text-3xl">
                {name}
              </h2>
              <div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${index < Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  {rating > 0 && (
                    <span className="text-secondary dark:text-primary ml-2 font-medium">
                      {rating.toFixed(1)}
                    </span>
                  )}
                  <span className="text-secondary dark:text-primary ml-2 font-medium">
                    •
                  </span>
                  <span className="text-secondary dark:text-primary ml-2 font-medium">
                    {reviewCount === 0
                      ? "No reviews yet"
                      : `${reviewCount} ${reviewCount > 1 ? "reviews" : "review"}`}
                  </span>
                  <span className="text-secondary dark:text-primary ml-2 font-medium max-sm:hidden">
                    |
                  </span>
                  <span className="text-secondary dark:text-primary ml-2 font-medium max-sm:hidden">
                    {budget || "budget"}
                  </span>
                </div>
              </div>
            </div>
          </figcaption>
          <div className="absolute top-4 right-4 flex gap-2">
            <AddToFavoritesBtn
              btnStyle="icon"
              destinationId={destinationId}
              initialState={favoritesData}
            />
            <Button
              variant="outline"
              size="icon"
              className="border-white/20 bg-black/30 text-white hover:bg-black/50 hover:text-white dark:border-white/20 dark:bg-black/30 dark:text-white dark:hover:bg-black/50 dark:hover:text-white"
            >
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </figure>
      </CardContent>
    </Card>
  );
};

export default DestinationHeaderImage;
