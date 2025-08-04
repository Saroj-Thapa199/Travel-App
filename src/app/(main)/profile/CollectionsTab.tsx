"use client";

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
  Plus,
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
import { useEffect, useState } from "react";
import CreateCollectionDialogTrigger from "./CreateCollectionDialogTrigger";
import CollectionCard from "@/components/CollectionCard";
import { CollectionsResponse } from "@/lib/types";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { cleanDistanceLocale } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import CollectionCardSkeleton from "@/components/skeletons/CollectionCardSkeleton";

interface Collection {
  _id: string;
  title: string;
  description: string;
  coverImage: string;
  placesCount: number;
  isPublic: boolean;
  lastUpdated: string;
  places: {
    _id: string;
    name: string;
    image: string;
    region: string;
  }[];
}

type CollectionsTabProps = {
  userId: string;
};

const CollectionsTab = ({ userId }: CollectionsTabProps) => {
  // Mock data - replace with actual data fetching
  const collections: Collection[] = [
    {
      _id: "1",
      title: "Beach Paradise",
      description: "My favorite coastal destinations and hidden beach gems",
      coverImage: "/placeholder.svg?height=200&width=300",
      placesCount: 8,
      isPublic: true,
      lastUpdated: "2 days ago",
      places: [
        {
          _id: "1",
          name: "Maldives",
          image: "/placeholder.svg?height=100&width=100",
          region: "Indian Ocean",
        },
        {
          _id: "2",
          name: "Santorini",
          image: "/placeholder.svg?height=100&width=100",
          region: "Greece",
        },
        {
          _id: "3",
          name: "Bora Bora",
          image: "/placeholder.svg?height=100&width=100",
          region: "French Polynesia",
        },
      ],
    },
    {
      _id: "2",
      title: "Mountain Adventures",
      description: "Epic hiking trails and mountain peaks I want to conquer",
      coverImage: "/placeholder.svg?height=200&width=300",
      placesCount: 12,
      isPublic: false,
      lastUpdated: "1 week ago",
      places: [
        {
          _id: "4",
          name: "Mount Everest Base Camp",
          image: "/placeholder.svg?height=100&width=100",
          region: "Nepal",
        },
        {
          _id: "5",
          name: "Annapurna Circuit",
          image: "/placeholder.svg?height=100&width=100",
          region: "Nepal",
        },
        {
          _id: "6",
          name: "Swiss Alps",
          image: "/placeholder.svg?height=100&width=100",
          region: "Switzerland",
        },
      ],
    },
    {
      _id: "3",
      title: "City Escapes",
      description: "Urban adventures and metropolitan must-sees",
      coverImage: "/placeholder.svg?height=200&width=300",
      placesCount: 15,
      isPublic: true,
      lastUpdated: "3 days ago",
      places: [
        {
          _id: "7",
          name: "Tokyo",
          image: "/placeholder.svg?height=100&width=100",
          region: "Japan",
        },
        {
          _id: "8",
          name: "New York",
          image: "/placeholder.svg?height=100&width=100",
          region: "USA",
        },
        {
          _id: "9",
          name: "Paris",
          image: "/placeholder.svg?height=100&width=100",
          region: "France",
        },
      ],
    },
    {
      _id: "4",
      title: "Cultural Heritage",
      description: "Historical sites and cultural landmarks around the world",
      coverImage: "/placeholder.svg?height=200&width=300",
      placesCount: 6,
      isPublic: true,
      lastUpdated: "5 days ago",
      places: [
        {
          _id: "10",
          name: "Angkor Wat",
          image: "/placeholder.svg?height=100&width=100",
          region: "Cambodia",
        },
        {
          _id: "11",
          name: "Machu Picchu",
          image: "/placeholder.svg?height=100&width=100",
          region: "Peru",
        },
      ],
    },
  ];

  const { data: collectionData, isLoading } = useQuery({
    queryKey: ["collections", "user", userId],
    queryFn: async () => {
      const { data } = await axios.get<CollectionsResponse>(
        "/api/collections/all",
      );
      return data;
    },
  });

  // const [collectionData, setCollectionData] = useState<CollectionsResponse>([]);

  // useEffect(() => {
  //   const getCollections = async () => {
  //     const res = await axios.get<CollectionsResponse>("/api/collections/all");
  //     if (res.data) setCollectionData(res.data);
  //   };

  //   getCollections();
  // }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Collections</h2>
          <p className="text-muted-foreground">
            Organize your favorite places into themed collections
          </p>
        </div>
        <CreateCollectionDialogTrigger>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Collection
          </Button>
        </CreateCollectionDialogTrigger>
      </div>

      {/* Collections Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <CollectionCardSkeleton key={index} />
            ))
          : collectionData &&
            collectionData.length > 0 &&
            collectionData.map((collection) => (
              <CollectionCard
                key={collection._id}
                _id={collection._id}
                title={collection.name}
                description={collection.description}
                isPublic={collection.visibility === "public"}
                destinations={collection.destinations}
                lastUpdated={formatDistanceToNow(collection.updatedAt, {
                  addSuffix: true,
                  locale: cleanDistanceLocale,
                })}
                coverImage={
                  collection.coverImage ||
                  collection.destinations?.[0]?.image ||
                  undefined
                }
              />
            ))}

        {/* Create New Collection Card */}
        <CreateCollectionDialogTrigger>
          <Card className="hover:border-primary/50 group cursor-pointer border-2 border-dashed transition-colors">
            <CardContent className="flex h-full min-h-[300px] flex-col items-center justify-center p-6 text-center">
              <div className="bg-muted group-hover:bg-primary/10 mb-4 rounded-full p-4 transition-colors">
                <Plus className="text-muted-foreground group-hover:text-primary h-8 w-8 transition-colors" />
              </div>
              <h3 className="mb-2 font-semibold">Create New Collection</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Start organizing your favorite places into a themed collection
              </p>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Plus className="h-4 w-4" />
                New Collection
              </Button>
            </CardContent>
          </Card>
        </CreateCollectionDialogTrigger>
      </div>

      {/* Empty State (show when no collections) */}
      {collections.length === 0 && (
        <div className="py-12 text-center">
          <div className="bg-muted mx-auto mb-4 w-fit rounded-full p-6">
            <MapPin className="text-muted-foreground h-12 w-12" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">No Collections Yet</h3>
          <p className="text-muted-foreground mx-auto mb-6 max-w-md">
            Create your first collection to start organizing your favorite
            travel destinations and places.
          </p>
          <CreateCollectionDialogTrigger>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Your First Collection
            </Button>
          </CreateCollectionDialogTrigger>
        </div>
      )}
    </div>
  );
};

export default CollectionsTab;
