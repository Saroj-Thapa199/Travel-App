"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeft,
  MoreHorizontal,
  Edit,
  Share,
  Trash2,
  Plus,
  Globe,
  Lock,
  MapPin,
  Calendar,
  Filter,
  Search,
  MoreVertical,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import DestinationCard from "@/components/DestinationCard";

const imageUrls = [
  "https://images.unsplash.com/photo-1553886334-43d24f24d3bd?q=80&w=1177&auto=format&fit=crop&ixlib=rb-4.1.0&ix_id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ix_id=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW91bnRhaW4lMjBsYWtlfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1607836046730-3317bd58a31b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ix_id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1747118435378-50b16d63dd4b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ix_id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1717054493682-ffe9e25fd82f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ix_id=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fHZpbGxhZ2UlMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1623492701360-fb4a1205c789?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ix_id=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

interface CollectionDetailPageProps {
  collectionId: string;
}

interface Destination {
  _id: string;
  name: string;
  region: string;
  shortDescription: string;
  image: string;
  averageRating: number;
  slug: string;
  reviewCount: number;
  createdAt: string;
}

interface Collection {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  destinationCount: number;
  destinations: Destination[];
}

// Helper function to check if destination is new
const isNew = ({
  createdAt,
  type,
  range,
}: {
  createdAt: string;
  type: string;
  range: number;
}) => {
  const created = new Date(createdAt);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - created.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= range;
};

const CollectionDetailPage = ({ collectionId }: CollectionDetailPageProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");

  // Mock collection data - replace with actual API call
  const collection: Collection = {
    id: collectionId,
    title: "Beach Paradise",
    description:
      "My favorite coastal destinations and hidden beach gems around the world. Perfect for sun, sand, and relaxation.",
    coverImage: "/placeholder.svg?height=300&width=800",
    isPublic: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    destinationCount: 8,
    destinations: [
      {
        _id: "1",
        name: "Maldives",
        region: "Indian Ocean",
        shortDescription:
          "Crystal clear waters and overwater bungalows make this a tropical paradise perfect for luxury getaways.",
        image: "/placeholder.svg?height=400&width=600",
        averageRating: 4.8,
        slug: "maldives",
        reviewCount: 234,
        createdAt: "2024-01-18",
      },
      {
        _id: "2",
        name: "Santorini",
        region: "Greece",
        shortDescription:
          "Iconic white buildings and blue domes overlooking the Aegean Sea create unforgettable sunset views.",
        image: "/placeholder.svg?height=400&width=600",
        averageRating: 4.7,
        slug: "santorini",
        reviewCount: 189,
        createdAt: "2024-01-10",
      },
      {
        _id: "3",
        name: "Bora Bora",
        region: "French Polynesia",
        shortDescription:
          "Turquoise lagoons and volcanic peaks create the ultimate romantic escape in the South Pacific.",
        image: "/placeholder.svg?height=400&width=600",
        averageRating: 4.9,
        slug: "bora-bora",
        reviewCount: 156,
        createdAt: "2024-01-05",
      },
      {
        _id: "4",
        name: "Seychelles",
        region: "Indian Ocean",
        shortDescription:
          "Pristine beaches with unique granite boulders and lush tropical vegetation.",
        image: "/placeholder.svg?height=400&width=600",
        averageRating: 4.6,
        slug: "seychelles",
        reviewCount: 98,
        createdAt: "2024-01-12",
      },
      {
        _id: "5",
        name: "Maui",
        region: "Hawaii, USA",
        shortDescription:
          "Diverse landscapes from volcanic craters to golden beaches and the famous Road to Hana.",
        image: "/placeholder.svg?height=400&width=600",
        averageRating: 4.5,
        slug: "maui",
        reviewCount: 312,
        createdAt: "2024-01-08",
      },
      {
        _id: "6",
        name: "Amalfi Coast",
        region: "Italy",
        shortDescription:
          "Dramatic cliffs, colorful villages, and Mediterranean charm along Italy's stunning coastline.",
        image: "/placeholder.svg?height=400&width=600",
        averageRating: 4.4,
        slug: "amalfi-coast",
        reviewCount: 267,
        createdAt: "2024-01-03",
      },
      {
        _id: "7",
        name: "Phi Phi Islands",
        region: "Thailand",
        shortDescription:
          "Limestone cliffs and emerald waters create a tropical paradise in the Andaman Sea.",
        image: "/placeholder.svg?height=400&width=600",
        averageRating: 4.3,
        slug: "phi-phi-islands",
        reviewCount: 145,
        createdAt: "2024-01-19",
      },
      {
        _id: "8",
        name: "Barbados",
        region: "Caribbean",
        shortDescription:
          "Perfect blend of British charm and Caribbean culture with stunning coral beaches.",
        image: "/placeholder.svg?height=400&width=600",
        averageRating: 4.2,
        slug: "barbados",
        reviewCount: 87,
        createdAt: "2024-01-16",
      },
    ],
  };

  // Filter and sort destinations
  const filteredDestinations = collection.destinations
    .filter((destination) => {
      const matchesSearch =
        destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.region.toLowerCase().includes(searchQuery.toLowerCase());

      if (filterBy === "all") return matchesSearch;
      if (filterBy === "new")
        return (
          matchesSearch &&
          isNew({ createdAt: destination.createdAt, type: "day", range: 7 })
        );
      if (filterBy === "high-rated")
        return matchesSearch && destination.averageRating >= 4.5;

      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "rating":
          return b.averageRating - a.averageRating;
        case "reviews":
          return b.reviewCount - a.reviewCount;
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        default:
          return 0;
      }
    });

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Header */}
        <div className="mb-8">
          {/* Navigation and Actions */}
          <div className="mb-6 flex items-center justify-between">
            <Link href="/profile?tab=collections">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Collections
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
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
                <DropdownMenuItem className="text-destructive hover:!bg-destructive/5 hover:!text-destructive gap-2">
                  <Trash2 className="text-destructive h-4 w-4" />
                  Delete Collection
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Collection Info */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant={collection.isPublic ? "default" : "secondary"}
                className="gap-1"
              >
                {collection.isPublic ? (
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
              <Badge variant="outline">
                {collection.destinationCount} destinations
              </Badge>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-bold md:text-4xl">
                {collection.title}
              </h1>
              <p className="text-muted-foreground max-w-3xl text-lg">
                {collection.description}
              </p>
            </div>

            <div className="text-muted-foreground flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Created {new Date(collection.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Updated {new Date(collection.updatedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <div className="relative max-w-md flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="reviews">Reviews</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-40">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="high-rated">High Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredDestinations.length} of{" "}
            {collection.destinations.length} destinations
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Destinations Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredDestinations.map((destination) => (
              <DestinationCard
                key={destination._id}
                name={destination.name}
                region={destination.region}
                shortDescription={destination.shortDescription}
                image={imageUrls[Math.floor(Math.random() * 6)]}
                rating={destination.averageRating || 0}
                slug={destination.slug}
                reviewCount={destination.reviewCount}
                isNew={true}
                featured
                action={
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical className="text-secondary hover:text-primary h-5 w-5 cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem className="text-destructive hover:!bg-destructive/5 hover:!text-destructive gap-2">
                        <Trash2 className="text-destructive h-4 w-4" />
                        Remove From Collection
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                }
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <MapPin className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <h3 className="mb-2 text-xl font-semibold">
              No destinations found
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery
                ? `No destinations match "${searchQuery}". Try adjusting your search or filters.`
                : "This collection doesn't have any destinations yet."}
            </p>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Destinations
            </Button>
          </div>
        )}

        {/* Add More Destinations */}
        {filteredDestinations.length > 0 && (
          <div className="mt-12 text-center">
            <Card className="group hover:border-primary/50 cursor-pointer border-2 border-dashed transition-colors">
              <CardContent className="flex flex-col items-center justify-center p-8">
                <div className="bg-muted group-hover:bg-primary/10 mb-4 rounded-full p-4 transition-colors">
                  <Plus className="text-muted-foreground group-hover:text-primary h-8 w-8 transition-colors" />
                </div>
                <h3 className="mb-2 font-semibold">Add More Destinations</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Discover more amazing places to add to this collection
                </p>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Plus className="h-4 w-4" />
                  Browse Destinations
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionDetailPage;
