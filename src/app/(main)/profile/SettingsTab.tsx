import useProfileData from "@/app/hooks/useProfileData";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ProfileData } from "@/lib/types";
import {
  updateProfileSchema,
  UpdateProfileValues,
} from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Bell, CheckCircle, LogOut, Shield, User } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type SettingsTabProps = {
  userId: string;
};

const SettingsTab = ({ userId }: SettingsTabProps) => {
  const { data: session, update } = useSession();
  console.log("in session:", session?.user);

  const queryClient = useQueryClient();
  const queryKey: QueryKey = ["user", userId, "profile"];
  
  const { data: profileData } = useProfileData(userId)

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: UpdateProfileValues) => {
      const { data } = await axios.patch<ProfileData>("/api/profile", values);
      return data;
    },
    onSuccess: async (updatedData) => {
      console.log("updatedData in onsuccess", updatedData)
      await queryClient.invalidateQueries({ queryKey });
      await update({
        ...session,
        user: {
          ...session?.user,
          ...updatedData,
        },
      });

      toast("Success!", {
        description: "Profile updated successfully",
        icon: <CheckCircle className="size-4" />,
      });
    },
    onError: (error, variables) => {
      console.error(error);
      if (error instanceof AxiosError && error.response?.data.error) {
        toast.error(error.response?.data.error);
      }
      toast.error("Something went wrong. Please try again");
    },
  });
  const form = useForm<UpdateProfileValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: "",
      // username: "",
      email: "",
      bio: "",
      location: "",
    },
  });

  const onSubmit = (values: UpdateProfileValues) => {
    console.log(values);
    mutate(values);
  };

  useEffect(() => {
    if (profileData) {
      form.reset({
        name: profileData.name,
        username: profileData?.username,
        email: profileData.email,
        location: profileData?.location,
        bio: profileData?.bio,
      });
    }
  }, [profileData]);
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div className="md:col-span-1">
        <div className="sticky top-24 space-y-1">
          <h3 className="mb-4 text-lg font-medium">Settings</h3>
          <Button
            variant="ghost"
            className="text-primary w-full justify-start gap-2"
            size="sm"
          >
            <User className="h-4 w-4" />
            Account
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            size="sm"
          >
            <Bell className="h-4 w-4" />
            Notifications
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            size="sm"
          >
            <Shield className="h-4 w-4" />
            Privacy & Security
          </Button>
          <Button
            variant="ghost"
            className="text-destructive hover:text-destructive w-full justify-start gap-2"
            size="sm"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      <div className="space-y-6 md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="text-primary h-5 w-5" />
              Account Settings
            </CardTitle>
            <CardDescription>
              Update your personal information and account details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    disabled
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="eg. username_123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            readOnly
                            placeholder="example@gmail.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="eg. Kathmandu, Nepal"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea rows={3} maxLength={200} {...field} />
                        {/* <Input placeholder="Enter your full name" {...field} /> */}
                      </FormControl>
                      <FormDescription className="flex items-center justify-between text-xs">
                        {/* Brief description for your profile. Maximum 200 characters. */}
                        <span>
                          Brief description for your profile. Maximum 200
                          characters.
                        </span>
                        <span>
                          {form.getValues("bio")?.trim().length ?? 0}/200
                          characters
                        </span>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end pt-4">
                  <LoadingButton loading={isPending} type="submit">
                    Save Changes
                  </LoadingButton>
                </div>
              </form>
            </Form>

            {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
            </div> */}

            {/* <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" defaultValue={user.bio} rows={4} />
              <p className="text-muted-foreground text-xs">
                Brief description for your profile. Maximum 200 characters.
              </p>
            </div> */}

            {/* <div className="flex justify-end pt-4">
              <Button>Save Changes</Button>
            </div> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="text-primary h-5 w-5" />
              Notification Preferences
            </CardTitle>
            <CardDescription>
              Manage how and when you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-muted-foreground text-sm">
                    Receive updates via email
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Trip Reminders</p>
                  <p className="text-muted-foreground text-sm">
                    Get reminders about upcoming trips
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Destinations</p>
                  <p className="text-muted-foreground text-sm">
                    Be notified when new destinations are added
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Marketing Emails</p>
                  <p className="text-muted-foreground text-sm">
                    Receive promotional offers and newsletters
                  </p>
                </div>
                <Switch />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button>Save Preferences</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="text-primary h-5 w-5" />
              Privacy & Security
            </CardTitle>
            <CardDescription>
              Manage your account security and privacy settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-muted-foreground text-sm">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Profile Visibility</p>
                  <p className="text-muted-foreground text-sm">
                    Control who can see your profile information
                  </p>
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
                  <p className="text-muted-foreground text-sm">
                    Allow us to use your data to improve services
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button>Save Settings</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsTab;
