"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, MapPin } from "lucide-react";
import CreateCollectionDialogTrigger from "./CreateCollectionDialogTrigger";
import CollectionCard from "@/components/CollectionCard";
import { CollectionsResponse } from "@/lib/types";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { cleanDistanceLocale } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import CollectionCardSkeleton from "@/components/skeletons/CollectionCardSkeleton";
import { CollectionActionsDialogProvider } from "@/providers/CollectionActionsDialogProvider";

type CollectionsTabProps = {
  userId: string;
};

const CollectionsTab = ({ userId }: CollectionsTabProps) => {
  const { data: collectionData, isLoading } = useQuery({
    queryKey: ["collections", "user", userId],
    queryFn: async () => {
      const { data } = await axios.get<CollectionsResponse>(
        "/api/collections/all",
      );
      return data;
    },
  });

  return (
    <CollectionActionsDialogProvider userId={userId}>
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
                  coverImage={collection.destinations?.[0]?.image || undefined}
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
        {collectionData && collectionData.length === 0 && (
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
    </CollectionActionsDialogProvider>
  );
};

export default CollectionsTab;
