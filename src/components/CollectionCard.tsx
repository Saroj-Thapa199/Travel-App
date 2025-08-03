import placeholderImage from "../assets/hero-image-2.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  MapPin,
  Calendar,
  Edit,
  Trash2,
  Share,
  Lock,
  Globe,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type CollectionCardProps = {
  _id: string;
  title: string;
  coverImage?: string;
  isPublic: boolean;
  description?: string;
  destinations: {
    _id: string;
    name: string;
    region: string;
    image: string;
  }[];
  lastUpdated: string;
};

const CollectionCard = ({
  _id,
  title,
  coverImage,
  isPublic,
  description,
  destinations,
  lastUpdated,
}: CollectionCardProps) => {
  return (
    <Link href={`/collections/${_id}`} className="grid">
      <Card className="group overflow-hidden pt-0 transition-shadow duration-300 hover:shadow-lg">
        <div className="relative">
          <div className="aspect-video overflow-hidden">
            <Image
              src={coverImage || placeholderImage}
              alt={title}
              width={300}
              height={200}
              className="transition-tansform pointer-events-none h-full w-full object-cover duration-500 select-none group-hover:scale-110"
            />
          </div>
          <div className="absolute top-3 right-3 flex gap-2">
            <Badge
              variant={isPublic ? "default" : "secondary"}
              className="gap-1"
            >
              {isPublic ? (
                <>
                  <Globe className="h-3 w-3" />
                  Public
                </>
              ) : (
                <>
                  <Lock className="h-3 w-3" />
                  Private
                </>
              )}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Collection
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <Share className="h-4 w-4" />
                  Share Collection
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive gap-2">
                  <Trash2 className="h-4 w-4" />
                  Delete Collection
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-lg leading-tight font-semibold">{title}</h3>
              <p className="text-muted-foreground line-clamp-2 text-sm">
                {description || "No description available"}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="-mt-3 flex flex-1 flex-col justify-between gap-4 pt-0">
          {/* Place Previews */}
          <div className="">
            <div className="mb-3 flex -space-x-2">
              {destinations.slice(0, 4).map((destination, index) => (
                <div
                  key={destination._id}
                  className="border-background relative h-8 w-8 overflow-hidden rounded-full border-2"
                  style={{ zIndex: 4 - index }}
                >
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
              {destinations.length > 4 && (
                <div className="border-background bg-muted flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-medium">
                  +{destinations.length - 4}
                </div>
              )}
            </div>

            {/* Sample place names */}
            <div className="space-y-1">
              {destinations.length > 0 ? (
                destinations.slice(0, 2).map((destination) => (
                  <div
                    key={destination._id}
                    className="text-muted-foreground flex items-center gap-1 text-xs"
                  >
                    <MapPin className="h-3 w-3" />
                    <span>
                      {destination.name}, {destination.region}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-muted-foreground flex items-center gap-1 text-sm">
                  {/* <MapPin className="h-3 w-3" /> */}
                  <span>No destinations added to this collection yet</span>
                </div>
              )}
              {destinations.length > 2 && (
                <p className="text-muted-foreground text-xs">
                  and {destinations.length - 2} more places
                </p>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="text-muted-foreground flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>
                {destinations.length}{" "}
                {destinations.length > 1 ? "destinations" : "destination"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Updated {lastUpdated}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CollectionCard;
