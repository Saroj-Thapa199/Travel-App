"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Edit, MapPin } from "lucide-react";
import avatarPlaceholder from "@/assets/avatar-placeholder.png";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from "./OverviewTab";
import FavoritesTab from "./FavoritesTab";

const page = () => {
  const { data, status } = useSession();
  if (status === "unauthenticated" || !data?.user) {
    return redirect("/");
  }

  const user = data?.user;

  const [tab, setTab] = useState("overview");
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
          <TabsTrigger value="trips">My Trips</TabsTrigger>
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
          {/* <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Saved Places</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Create Collection
              </Button>
              <Button size="sm">
                <Link href="/destinations">Explore More</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedDestinations.map((destination, index) => (
              <Link key={index} href={`/destination/${destination.id}`} className="group">
                <div className="rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-background border border-border/50 h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 bg-black/30 text-white hover:bg-black/50 hover:text-white"
                      >
                        <Heart className="h-4 w-4 fill-white" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/20 flex items-center gap-1"
                      >
                        <MapPin className="h-3 w-3" />
                        {destination.region}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-xl mb-1 group-hover:text-primary transition-colors">
                      {destination.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{destination.description}</p>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(destination.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"}`}
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-1 text-sm font-medium">{destination.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div> */}
          <FavoritesTab />
        </TabsContent>

        {/* <TabsContent value="trips" className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">My Trips</h2>
            <Button>Plan New Trip</Button>
          </div>

          <Tabs defaultValue="upcoming">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past Trips</TabsTrigger>
              <TabsTrigger value="all">All Trips</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trips
                  .filter((trip) => trip.status === "upcoming")
                  .map((trip, index) => (
                    <Card key={index} className="overflow-hidden group">
                      <div className="relative h-40">
                        <img
                          src={trip.image || "/placeholder.svg"}
                          alt={trip.destination}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-3 left-3">
                          <Badge className="bg-green-500/90 hover:bg-green-500">Upcoming</Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="group-hover:text-primary transition-colors">{trip.destination}</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {trip.startDate} - {trip.endDate}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <div className="px-6 pb-6 flex justify-between">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </Card>
                  ))}
              </div>

              {trips.filter((trip) => trip.status === "upcoming").length === 0 && (
                <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-medium mb-2">No Upcoming Trips</h3>
                  <p className="text-muted-foreground mb-4">You don't have any upcoming trips planned.</p>
                  <Button>Plan a Trip</Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trips
                  .filter((trip) => trip.status === "completed")
                  .map((trip, index) => (
                    <Card key={index} className="overflow-hidden group">
                      <div className="relative h-40">
                        <img
                          src={trip.image || "/placeholder.svg"}
                          alt={trip.destination}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-3 left-3">
                          <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                            Completed
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="group-hover:text-primary transition-colors">{trip.destination}</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {trip.startDate} - {trip.endDate}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <div className="px-6 pb-6 flex justify-between">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Star className="h-4 w-4" />
                          Review
                        </Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="all" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trips.map((trip, index) => (
                  <Card key={index} className="overflow-hidden group">
                    <div className="relative h-40">
                      <img
                        src={trip.image || "/placeholder.svg"}
                        alt={trip.destination}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-3 left-3">
                        <Badge
                          className={
                            trip.status === "upcoming"
                              ? "bg-green-500/90 hover:bg-green-500"
                              : "bg-white/10 border-white/20 text-white"
                          }
                          variant={trip.status === "upcoming" ? "default" : "outline"}
                        >
                          {trip.status === "upcoming" ? "Upcoming" : "Completed"}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="group-hover:text-primary transition-colors">{trip.destination}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {trip.startDate} - {trip.endDate}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <div className="px-6 pb-6 flex justify-between">
                      <Button variant="outline" size="sm" className={trip.status === "upcoming" ? "" : "gap-1"}>
                        {trip.status === "upcoming" ? (
                          "Edit"
                        ) : (
                          <>
                            <Star className="h-4 w-4" />
                            Review
                          </>
                        )}
                      </Button>
                      <Button size="sm">View Details</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>

        

        <TabsContent value="reviews" className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">My Reviews</h2>
            <Button>
              <Link href="/destinations">Write a Review</Link>
            </Button>
          </div>

          <div className="space-y-6">
            {reviews.map((review, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/4">
                      <h3 className="font-bold text-lg mb-2">{review.destination}</h3>
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>

                    <div className="md:w-3/4">
                      <p className="text-muted-foreground">{review.comment}</p>
                      <div className="flex justify-end mt-4 gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {reviews.length === 0 && (
              <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="text-lg font-medium mb-2">No Reviews Yet</h3>
                <p className="text-muted-foreground mb-4">
                  You haven't written any reviews yet. Share your experiences to help other travelers!
                </p>
                <Button>Write Your First Review</Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="space-y-1 sticky top-24">
                <h3 className="font-medium text-lg mb-4">Settings</h3>
                <Button variant="ghost" className="w-full justify-start gap-2 text-primary" size="sm">
                  <User className="h-4 w-4" />
                  Account
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" size="sm">
                  <Bell className="h-4 w-4" />
                  Notifications
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" size="sm">
                  <Shield className="h-4 w-4" />
                  Privacy & Security
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-destructive hover:text-destructive"
                  size="sm"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Account Settings
                  </CardTitle>
                  <CardDescription>Update your personal information and account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={user.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue={user.username} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue={user.location} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" defaultValue={user.bio} rows={4} />
                    <p className="text-xs text-muted-foreground">
                      Brief description for your profile. Maximum 200 characters.
                    </p>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Manage how and when you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive updates via email</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Trip Reminders</p>
                        <p className="text-sm text-muted-foreground">Get reminders about upcoming trips</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Destinations</p>
                        <p className="text-sm text-muted-foreground">Be notified when new destinations are added</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing Emails</p>
                        <p className="text-sm text-muted-foreground">Receive promotional offers and newsletters</p>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button>Save Preferences</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Privacy & Security
                  </CardTitle>
                  <CardDescription>Manage your account security and privacy settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enable
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Profile Visibility</p>
                        <p className="text-sm text-muted-foreground">Control who can see your profile information</p>
                      </div>
                      <Select defaultValue="public">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="friends">Friends Only</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Data Sharing</p>
                        <p className="text-sm text-muted-foreground">Allow us to use your data to improve services</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button>Save Settings</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent> */}
      </Tabs>
    </main>
  );
};

export default page;
