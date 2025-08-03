"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Edit, MapPin } from "lucide-react";
import avatarPlaceholder from "@/assets/avatar-placeholder.png";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from "./OverviewTab";
import FavoritesTab from "./FavoritesTab";
import ReviewsTab from "./ReviewsTab";
import SettingsTab from "./SettingsTab";
import CollectionsTab from "./CollectionsTab";

const page = () => {
  const searchParams = useSearchParams();

  const tabQuery = searchParams.get("tab");

  const { data, status } = useSession();
  if (status === "unauthenticated" || !data?.user) {
    return redirect("/");
  }

  const user = data.user;

  const [tab, setTab] = useState<string>(() => {
    const validTabs = [
      "overview",
      "collections",
      "saved",
      "reviews",
      "settings",
    ];
    return typeof tabQuery === "string" && validTabs.includes(tabQuery)
      ? tabQuery
      : "overview";
  });

  return (
    <main className="mx-auto min-h-screen w-full px-4 py-15 sm:px-8 md:px-14 lg:px-20 xl:container">
      {/* Profile Header */}
      <div className="relative mb-8">
        <div className="h-48 overflow-hidden rounded-xl md:h-64">
          <img
            src={user?.image || "/placeholder.svg"}
            alt="Cover"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        </div>

        <div className="absolute right-0 bottom-0 left-0 flex translate-y-1/2 transform flex-col items-center gap-4 px-4 md:flex-row md:items-end md:px-8">
          <Avatar className="border-background h-24 w-24 border-4 md:h-32 md:w-32">
            <AvatarImage
              src={user.image ? user.image : undefined}
              alt={user.name || "username"}
            />
            <AvatarFallback>
              {user?.name ? user.name.charAt(0) : "UN"}
            </AvatarFallback>
          </Avatar>

          <div className="bg-background/80 mt-8 flex-1 rounded-lg p-4 text-center backdrop-blur-sm md:mt-0 md:bg-transparent md:p-0 md:text-left md:backdrop-blur-none">
            <h1 className="text-2xl font-bold md:mb-1 md:text-3xl">
              {user.name}
            </h1>
            <p className="flex items-center justify-center gap-1 text-sm md:justify-start">
              <MapPin className="h-4 w-4" />
              {/* {user.location} */}
              Kathmandu, Nepal
            </p>
          </div>

          <div className="mb-4 flex gap-2 md:mb-8">
            <Button size="sm" variant="secondary" className="gap-1">
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
            <Button size="sm" variant="outline">
              <Camera className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mt-16 mb-8 grid grid-cols-2 gap-4 md:mt-20 md:grid-cols-4">
        <Card className="bg-background/50 hover:bg-background/80 backdrop-blur-sm transition-colors">
          <CardContent className="flex flex-col items-center p-4">
            <p className="text-primary text-3xl font-bold">
              {/* {user.stats.trips} */}
              12
            </p>
            <p className="text-muted-foreground text-sm">Trips</p>
          </CardContent>
        </Card>
        <Card className="bg-background/50 hover:bg-background/80 backdrop-blur-sm transition-colors">
          <CardContent className="flex flex-col items-center p-4">
            <p className="text-primary text-3xl font-bold">
              {/* {user.stats.reviews} */}8
            </p>
            <p className="text-muted-foreground text-sm">Reviews</p>
          </CardContent>
        </Card>
        <Card className="bg-background/50 hover:bg-background/80 backdrop-blur-sm transition-colors">
          <CardContent className="flex flex-col items-center p-4">
            <p className="text-primary text-3xl font-bold">
              {/* {user.stats.photos} */}
              34
            </p>
            <p className="text-muted-foreground text-sm">Photos</p>
          </CardContent>
        </Card>
        <Card className="bg-background/50 hover:bg-background/80 backdrop-blur-sm transition-colors">
          <CardContent className="flex flex-col items-center p-4">
            <p className="text-primary text-3xl font-bold">
              {/* {user.stats.savedPlaces} */}
              16
            </p>
            <p className="text-muted-foreground text-sm">Saved Places</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={tab} onValueChange={setTab} className="mt-8">
        <TabsList className="mb-8 w-full max-sm:grid max-sm:h-fit max-sm:grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="saved">Saved Places</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          <OverviewTab
            bio="This is my bio"
            joinDate="March 2022"
            location="Kathmandu, Nepal"
            setTab={setTab}
          />
        </TabsContent>

        <TabsContent value="saved" className="space-y-6">
          <FavoritesTab />
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <ReviewsTab />
        </TabsContent>

        <TabsContent value="settings" className="space-y-8">
          <SettingsTab />
        </TabsContent>

        <TabsContent value="collections" className="space-y-6">
          <CollectionsTab />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default page;
