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
import { useState } from "react";
import CreateCollectionDialogTrigger from "./CreateCollectionDialogTrigger";

const imageUrls = [
  "https://images.unsplash.com/photo-1553886334-43d24f24d3bd?q=80&w=1177&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW91bnRhaW4lMjBsYWtlfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1607836046730-3317bd58a31b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1747118435378-50b16d63dd4b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1717054493682-ffe9e25fd82f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fHZpbGxhZ2UlMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1623492701360-fb4a1205c789?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

interface Collection {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  placesCount: number;
  isPublic: boolean;
  lastUpdated: string;
  places: {
    id: string;
    name: string;
    image: string;
    location: string;
  }[];
}

const CollectionsTab = () => {
  // Mock data - replace with actual data fetching
  const collections: Collection[] = [
    {
      id: "1",
      title: "Beach Paradise",
      description: "My favorite coastal destinations and hidden beach gems",
      coverImage: "/placeholder.svg?height=200&width=300",
      placesCount: 8,
      isPublic: true,
      lastUpdated: "2 days ago",
      places: [
        {
          id: "1",
          name: "Maldives",
          image: "/placeholder.svg?height=100&width=100",
          location: "Indian Ocean",
        },
        {
          id: "2",
          name: "Santorini",
          image: "/placeholder.svg?height=100&width=100",
          location: "Greece",
        },
        {
          id: "3",
          name: "Bora Bora",
          image: "/placeholder.svg?height=100&width=100",
          location: "French Polynesia",
        },
      ],
    },
    {
      id: "2",
      title: "Mountain Adventures",
      description: "Epic hiking trails and mountain peaks I want to conquer",
      coverImage: "/placeholder.svg?height=200&width=300",
      placesCount: 12,
      isPublic: false,
      lastUpdated: "1 week ago",
      places: [
        {
          id: "4",
          name: "Mount Everest Base Camp",
          image: "/placeholder.svg?height=100&width=100",
          location: "Nepal",
        },
        {
          id: "5",
          name: "Annapurna Circuit",
          image: "/placeholder.svg?height=100&width=100",
          location: "Nepal",
        },
        {
          id: "6",
          name: "Swiss Alps",
          image: "/placeholder.svg?height=100&width=100",
          location: "Switzerland",
        },
      ],
    },
    {
      id: "3",
      title: "City Escapes",
      description: "Urban adventures and metropolitan must-sees",
      coverImage: "/placeholder.svg?height=200&width=300",
      placesCount: 15,
      isPublic: true,
      lastUpdated: "3 days ago",
      places: [
        {
          id: "7",
          name: "Tokyo",
          image: "/placeholder.svg?height=100&width=100",
          location: "Japan",
        },
        {
          id: "8",
          name: "New York",
          image: "/placeholder.svg?height=100&width=100",
          location: "USA",
        },
        {
          id: "9",
          name: "Paris",
          image: "/placeholder.svg?height=100&width=100",
          location: "France",
        },
      ],
    },
    {
      id: "4",
      title: "Cultural Heritage",
      description: "Historical sites and cultural landmarks around the world",
      coverImage: "/placeholder.svg?height=200&width=300",
      placesCount: 6,
      isPublic: true,
      lastUpdated: "5 days ago",
      places: [
        {
          id: "10",
          name: "Angkor Wat",
          image: "/placeholder.svg?height=100&width=100",
          location: "Cambodia",
        },
        {
          id: "11",
          name: "Machu Picchu",
          image: "/placeholder.svg?height=100&width=100",
          location: "Peru",
        },
      ],
    },
  ];

  const [open, setOpen] = useState(false);

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
        <CreateCollectionDialogTrigger onCreateCollection={() => {}}>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Collection
          </Button>
        </CreateCollectionDialogTrigger>
      </div>

      {/* Collections Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => (
          <Card
            key={collection.id}
            className="group overflow-hidden pt-0 transition-shadow duration-300 hover:shadow-lg"
          >
            <div className="relative">
              <div className="aspect-video overflow-hidden">
                <Image
                  src={
                    imageUrls[Math.floor(Math.random() * 6)] ||
                    "/placeholder.svg"
                  }
                  alt={collection.title}
                  width={300}
                  height={200}
                  className="transition-tansform h-full w-full object-cover duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute top-3 right-3 flex gap-2">
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0"
                    >
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
                  <h3 className="text-lg leading-tight font-semibold">
                    {collection.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2 text-sm">
                    {collection.description}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="-mt-3 pt-0">
              {/* Place Previews */}
              <div className="mb-4">
                <div className="mb-3 flex -space-x-2">
                  {collection.places.slice(0, 4).map((place, index) => (
                    <div
                      key={place.id}
                      className="border-background relative h-8 w-8 overflow-hidden rounded-full border-2"
                      style={{ zIndex: 4 - index }}
                    >
                      <Image
                        src={
                          imageUrls[Math.floor(Math.random() * 6)] ||
                          "/placeholder.svg"
                        }
                        alt={place.name}
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                  {collection.placesCount > 4 && (
                    <div className="border-background bg-muted flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-medium">
                      +{collection.placesCount - 4}
                    </div>
                  )}
                </div>

                {/* Sample place names */}
                <div className="space-y-1">
                  {collection.places.slice(0, 2).map((place) => (
                    <div
                      key={place.id}
                      className="text-muted-foreground flex items-center gap-1 text-xs"
                    >
                      <MapPin className="h-3 w-3" />
                      <span>
                        {place.name}, {place.location}
                      </span>
                    </div>
                  ))}
                  {collection.placesCount > 2 && (
                    <p className="text-muted-foreground text-xs">
                      and {collection.placesCount - 2} more places
                    </p>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="text-muted-foreground flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{collection.placesCount} places</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Updated {collection.lastUpdated}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Create New Collection Card */}
        <CreateCollectionDialogTrigger onCreateCollection={() => {}}>
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
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Your First Collection
          </Button>
        </div>
      )}
    </div>
  );
};

export default CollectionsTab;
