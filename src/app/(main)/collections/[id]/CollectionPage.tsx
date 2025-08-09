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
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CollectionType } from "@/lib/types";
import { notFound } from "next/navigation";
import { isNew } from "@/lib/utils";
import { toast } from "sonner";
import EditCollectionDialog from "@/components/EditCollectionDialog";
import DeleteCollectionDialog from "@/components/DeleteCollectionDialog";

type CollectionDetailPageProps = {
  userId?: string;
  collectionId: string;
};

const CollectionDetailPage = ({
  collectionId,
  userId,
}: CollectionDetailPageProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [filterBy, setFilterBy] = useState("all");

  const queryClient = useQueryClient();

  const queryKey: QueryKey = ["collection", collectionId];

  const { data: collection, isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const { data } = await axios.get<CollectionType>(
        `/api/collections/${collectionId}`,
      );
      return data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: (destinationId: string) =>
      axios.delete(
        `/api/collections/${collectionId}/add-remove-destination/${destinationId}`,
      ),
    onMutate: async (destinationId) => {
      await queryClient.cancelQueries({
        queryKey,
      });

      const previousState = queryClient.getQueryData<CollectionType>(queryKey);

      queryClient.setQueryData<CollectionType>(queryKey, () =>
        previousState
          ? {
              ...previousState,
              destinations: previousState.destinations.filter(
                (destination) => destination._id !== destinationId,
              ),
            }
          : undefined,
      );

      toast.success("Removed from collection");

      return { previousState };
    },
    onError: (error, variables, context) => {
      if (context?.previousState) {
        queryClient.setQueryData(queryKey, context.previousState);
        console.error(error);
        if (error instanceof AxiosError && error.response?.data.error) {
          toast.warning(error.response?.data.error);
        }
        toast.error("Something went wrong. Please try again");
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [["user", userId, "collections"]],
      });
    },
  });

  if (isLoading) return "Loading";

  if (!collection) return notFound();

  // Precompute original order map for latest-added sorting
  const destinationOrderMap = new Map(
    collection.destinations.map((d, idx) => [d._id, idx]),
  );

  // Filter and sort destinations
  const filteredDestinations = collection.destinations
    .filter((destination) => {
      const matchesSearch =
        destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.region.toLowerCase().includes(searchQuery.toLowerCase());

      if (filterBy === "all") return matchesSearch;

      if (filterBy === "high-rated")
        return matchesSearch && destination.averageRating >= 4.5;

      if (filterBy === "most-reviewed")
        return matchesSearch && destination.reviewCount >= 50;

      if (filterBy === "low-rated")
        return matchesSearch && destination.averageRating < 3.0;

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
        case "default":
          return (
            (destinationOrderMap.get(b._id) ?? 0) -
            (destinationOrderMap.get(a._id) ?? 0)
          );
        default:
          return 0;
      }
    });

  return (
    <div className="bg-background min-h-screen">
      <div className="py-8">
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

            <div className="hidden items-center gap-2 sm:flex">
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Destinations
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                disabled={collection.visibility === "private"}
              >
                <Share className="h-4 w-4" />
                Share
              </Button>
              {collection.user === userId && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => setEditDialogOpen(true)}
                      className="gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Edit Collection
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setDeleteDialogOpen(true)}
                      className="text-destructive hover:!bg-destructive/5 hover:!text-destructive gap-2"
                    >
                      <Trash2 className="text-destructive h-4 w-4" />
                      Delete Collection
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>

          {/* Collection Info */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant={
                  collection.visibility === "public" ? "default" : "secondary"
                }
                className="gap-1"
              >
                {collection.visibility === "public" ? (
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
                {collection.destinations.length} destinations
              </Badge>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-bold md:text-4xl">
                {collection.name}
              </h1>
              {collection.description && (
                <p className="text-muted-foreground max-w-3xl text-lg">
                  {collection.description}
                </p>
              )}
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
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="reviews">Reviews</SelectItem>
                {/* <SelectItem value="newest">Newest</SelectItem> */}
              </SelectContent>
            </Select>
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-52">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="high-rated">High Rated (≥ 4.5)</SelectItem>
                <SelectItem value="most-reviewed">Most Reviewed</SelectItem>
                <SelectItem value="low-rated">Low Rated (≤ 3.0)</SelectItem>
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDestinations.map((destination) => (
              <DestinationCard
                key={destination._id}
                name={destination.name}
                region={destination.region}
                shortDescription={destination.shortDescription}
                image={destination.image}
                rating={destination.averageRating || 0}
                slug={destination.slug}
                reviewCount={destination.reviewCount}
                action={
                  collection.user === userId ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="text-secondary hover:text-primary h-5 w-5 cursor-pointer" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            mutate(destination._id);
                          }}
                          className="text-destructive hover:!bg-destructive/5 hover:!text-destructive gap-2"
                        >
                          <Trash2 className="text-destructive h-4 w-4" />
                          Remove From Collection
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : undefined
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
            <Card className="group hover:border-primary/50 border-2 border-dashed transition-colors">
              <CardContent className="flex flex-col items-center justify-center p-8">
                <div className="bg-muted group-hover:bg-primary/10 mb-4 rounded-full p-4 transition-colors">
                  <Plus className="text-muted-foreground group-hover:text-primary h-8 w-8 transition-colors" />
                </div>
                <h3 className="mb-2 font-semibold">Add More Destinations</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Discover more amazing places to add to this collection
                </p>
                <Button
                  variant="outline"
                  className="gap-2 bg-transparent"
                  asChild
                >
                  <Link href={"/api/destinations"}>
                    <Plus className="h-4 w-4" />
                    Browse Destinations
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      {userId && collection.user === userId && (
        <EditCollectionDialog
          collectionId={collectionId}
          userId={userId}
          open={editDialogOpen}
          setOpen={setEditDialogOpen}
        />
      )}
      {userId && collection.user === userId && (
        <DeleteCollectionDialog
          collectionId={collectionId}
          collectionName={collection.name}
          userId={userId}
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
        />
      )}
    </div>
  );
};

export default CollectionDetailPage;
