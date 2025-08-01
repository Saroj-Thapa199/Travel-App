import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Bell, LogOut, Shield, User } from "lucide-react";
import React from "react";

const SettingsTab = () => {
  const user = {
    bio: "This is my bio",
    name: "Saroj Thapa",
    username: "saroj_thapa199",
    email: "sarojthapa199@gmail.com",
    location: "Kathmandu, Nepal",
  };
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
              <p className="text-muted-foreground text-xs">
                Brief description for your profile. Maximum 200 characters.
              </p>
            </div>

            <div className="flex justify-end pt-4">
              <Button>Save Changes</Button>
            </div>
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
