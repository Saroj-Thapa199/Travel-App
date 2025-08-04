"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  Lock,
  MapPin,
  Plus,
  ImageIcon,
  ExternalLink,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import axios from "axios";
import {
  createCollectionSchema,
  type CreateCollectionType,
} from "@/lib/validations/collection";
import { isImageUrl } from "@/lib/zodUtils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { createCollection } from "@/lib/actions/collection";
import { Skeleton } from "@/components/ui/skeleton";
import ImageWithProxyFallback from "@/components/ImageWithProxyFallback";
import { DestinationType } from "@/lib/validations/destination";

interface CreateCollectionModalProps {
  children: React.ReactNode;
}

const CreateCollectionDialogTrigger = ({
  children,
}: CreateCollectionModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [randomDestinations, setRandomDestinations] = useState<
    DestinationType[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isValidatingUrl, setIsValidatingUrl] = useState(false);
  const fetchInProgress = useRef(false);

  const form = useForm<CreateCollectionType>({
    resolver: zodResolver(createCollectionSchema),
    defaultValues: {
      name: "",
      description: "",
      visibility: "public",
      destinations: [],
      coverImage: "",
    },
  });

  const coverImageValue = form.watch("coverImage");

  const togglePlace = (placeId: string) => {
    const current = form.getValues("destinations");
    if (current.includes(placeId)) {
      form.setValue(
        "destinations",
        current.filter((id) => id !== placeId),
      );
    } else {
      form.setValue("destinations", [...current, placeId]);
    }
  };

  const onSubmit = async (values: CreateCollectionType) => {
    await createCollection(values);
    console.log(values);
    setIsOpen(false);
    form.reset();
    setImageError(false);
  };

  useEffect(() => {
    const getRandomDestinations = async () => {
      if (fetchInProgress.current) return;
      fetchInProgress.current = true;
      setLoading(true);
      try {
        const res = await axios.get<DestinationType[]>(
          "/api/destinations/random",
        );
        setRandomDestinations(res.data);
      } catch (error) {
        console.error("Failed to fetch", error);
      } finally {
        setLoading(false);
        fetchInProgress.current = false;
      }
    };

    if (isOpen) getRandomDestinations();
  }, [isOpen]);

  // Reset image error when URL changes
  useEffect(() => {
    setImageError(false);
  }, [coverImageValue]);

  // Validate URL in real-time
  const validateImageUrl = async (url: string) => {
    if (!url || url.trim() === "") return { isValid: false, isUrl: false };

    const trimmedUrl = url.trim();

    // Check if it's a valid URL format
    try {
      new URL(trimmedUrl);
    } catch {
      return { isValid: false, isUrl: false };
    }

    // Check if it's an image URL
    const isImage = isImageUrl(trimmedUrl);
    if (!isImage) {
      return { isValid: false, isUrl: true };
    }

    // Test if image actually loads
    setIsValidatingUrl(true);
    try {
      await new Promise((resolve, reject) => {
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.onload = resolve;
        img.onerror = reject;
        img.src = trimmedUrl;
      });
      setIsValidatingUrl(false);
      return { isValid: true, isUrl: true };
    } catch {
      setIsValidatingUrl(false);
      return { isValid: false, isUrl: true };
    }
  };

  const [urlValidation, setUrlValidation] = useState<{
    isValid: boolean;
    isUrl: boolean;
  }>({ isValid: false, isUrl: false });

  useEffect(() => {
    const validateUrl = async () => {
      if (coverImageValue) {
        const validation = await validateImageUrl(coverImageValue);
        setUrlValidation(validation);
      } else {
        setUrlValidation({ isValid: false, isUrl: false });
      }
    };

    const timeoutId = setTimeout(validateUrl, 500); // Debounce validation
    return () => clearTimeout(timeoutId);
  }, [coverImageValue]);

  const selectedDestinations = form.watch("destinations");

  const getValidationIcon = () => {
    if (!coverImageValue || coverImageValue.trim() === "") return null;
    if (isValidatingUrl)
      return (
        <div className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
      );
    if (urlValidation.isValid)
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (urlValidation.isUrl)
      return <XCircle className="h-4 w-4 text-destructive" />;
    return <XCircle className="h-4 w-4 text-destructive" />;
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen((prev) => !prev);
        form.reset();
        setImageError(false);
        setUrlValidation({ isValid: false, isUrl: false });
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Collection</DialogTitle>
          <DialogDescription>
            Organize your favorite places into a themed collection to share with
            others or keep for yourself.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            {/* Collection Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collection Title *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Beach Paradise, Mountain Adventures"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what makes this collection special..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cover Image URL */}
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <FormLabel>Cover Image URL (Optional)</FormLabel>
                      <p className="text-muted-foreground text-sm">
                        Provide a URL for your cover image. If not provided, the
                        first destination's image will be used as cover, or a
                        default image if no destinations are added.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="relative">
                        <FormControl>
                          <Input
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            className="pr-20"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-2">
                          {getValidationIcon()}
                          <ExternalLink className="text-muted-foreground h-4 w-4" />
                        </div>
                      </div>

                      {/* Cover Image Preview */}
                      <div className="bg-muted relative h-44 w-full overflow-hidden rounded-lg border">
                        {coverImageValue && urlValidation.isValid ? (
                          !imageError ? (
                            <>
                              <ImageWithProxyFallback
                                src={coverImageValue}
                                alt="Cover preview"
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                              <div className="absolute bottom-2 left-2 text-sm text-white">
                                <p className="font-medium">Preview</p>
                                <p className="text-xs opacity-90">
                                  Custom cover image
                                </p>
                              </div>
                            </>
                          ) : (
                            <div className="text-muted-foreground flex h-full flex-col items-center justify-center text-center">
                              <ImageIcon className="mb-2 h-8 w-8" />
                              <p className="text-sm font-medium">
                                Failed to load image
                              </p>
                              <p className="text-xs">Check the URL above</p>
                            </div>
                          )
                        ) : (
                          <div className="text-muted-foreground flex h-full flex-col items-center justify-center text-center">
                            <ImageIcon className="mb-2 h-8 w-8" />
                            <p className="text-sm font-medium">
                              {coverImageValue && !urlValidation.isValid
                                ? "Invalid image URL"
                                : "No image selected"}
                            </p>
                            <p className="text-xs">
                              {coverImageValue && !urlValidation.isValid
                                ? "Please enter a valid image URL"
                                : "Paste a cover image URL above"}
                            </p>
                          </div>
                        )}
                      </div>

                      {coverImageValue && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => form.setValue("coverImage", undefined)}
                          className="w-fit"
                        >
                          Clear cover image URL
                        </Button>
                      )}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Privacy Settings */}
            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Privacy Settings</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col gap-3 md:grid md:grid-cols-2"
                    >
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="public" />
                        </FormControl>
                        <FormLabel className="flex cursor-pointer items-center gap-2">
                          <Globe className="h-4 w-4" />
                          <div>
                            <p className="font-medium">Public</p>
                            <p className="text-muted-foreground text-xs">
                              Anyone can view this collection
                            </p>
                          </div>
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="private" />
                        </FormControl>
                        <FormLabel className="flex cursor-pointer items-center gap-2">
                          <Lock className="h-4 w-4" />
                          <div>
                            <p className="font-medium">Private</p>
                            <p className="text-muted-foreground text-xs">
                              Only you can view this collection
                            </p>
                          </div>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Destination Selection */}
            <div className="space-y-2">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label>Add Places (Optional)</Label>
                  <Badge variant="secondary">
                    {form.watch("destinations").length} selected
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">
                  Choose some places to get started. You can add more or edit
                  later.
                </p>
              </div>
              <div className="rounded-xl border py-1">
                <div className="grid max-h-52 gap-3 overflow-y-auto rounded-xl px-2 py-1 sm:grid-cols-2">
                  {loading
                    ? Array.from({ length: 6 }).map((_, index) => (
                        <RandomDestinationCardSkeleton key={index} />
                      ))
                    : randomDestinations.map((destination) => {
                        const isSelected = form
                          .watch("destinations")
                          .includes(destination._id);
                        return (
                          <Card
                            key={destination._id}
                            className={`cursor-pointer transition-all hover:shadow-md ${
                              isSelected
                                ? "ring-primary bg-primary/5 ring-2"
                                : "hover:bg-muted/50"
                            }`}
                            onClick={() => togglePlace(destination._id)}
                          >
                            <CardContent className="p-3">
                              <div className="flex items-center gap-3">
                                <Image
                                  src={destination.image || "/placeholder.svg"}
                                  alt={destination.name}
                                  width={40}
                                  height={40}
                                  className="rounded-lg object-cover"
                                />
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-medium">
                                    {destination.name}
                                  </p>
                                  <p className="text-muted-foreground flex items-center gap-1 text-xs">
                                    <MapPin className="h-3 w-3" />
                                    {destination.region}
                                  </p>
                                </div>
                                {isSelected && (
                                  <div className="bg-primary flex h-5 w-5 items-center justify-center rounded-full">
                                    <Plus className="text-primary-foreground h-3 w-3 rotate-45" />
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create Collection</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCollectionDialogTrigger;

const RandomDestinationCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <Skeleton className="size-10" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-2/4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
