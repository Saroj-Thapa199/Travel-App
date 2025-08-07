"use client";

import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Plus,
  BookmarkPlus,
  Check,
  Loader2,
  Search,
  Globe,
  Lock,
  FolderPlus,
  X,
} from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";
import { UnPopulatedCollectionsResponse } from "@/lib/types";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import {
  createCollectionSchema,
  CreateCollectionType,
} from "@/lib/validations/collection";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useCreateCollectionMutation } from "@/app/hooks/useCreateCollectionMutation";
import LoadingButton from "./LoadingButton";

type AddToCollectionsBtnProps = {
  destinationId: string;
};

const AddToCollectionsBtn = ({ destinationId }: AddToCollectionsBtnProps) => {
  const { status, data: sessionData } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const queryClient = useQueryClient();

  const queryKey: QueryKey = [
    "user",
    sessionData?.user.id,
    "collections",
    "names",
  ];

  const { data, isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      console.log("queryFn called");
      const { data } = await axios.get<UnPopulatedCollectionsResponse>(
        "/api/collections/all/names",
      );
      return data;
    },
    enabled: status === "authenticated" && !!sessionData?.user.id,
  });

  const form = useForm<CreateCollectionType>({
    resolver: zodResolver(createCollectionSchema),
    defaultValues: {
      name: "",
      description: "",
      visibility: "public",
      destinations: [destinationId],
    },
  });

  const createCollectionMutation = useCreateCollectionMutation();

  const { mutate } = useMutation({
    mutationFn: ({
      collectionId,
      collectionIncludesDestination,
    }: {
      collectionId: string;
      collectionIncludesDestination: boolean;
    }) => {
      return collectionIncludesDestination
        ? axios.delete(
            `/api/collections/${collectionId}/add-remove-destination/${destinationId}`,
          )
        : axios.post(
            `/api/collections/${collectionId}/add-remove-destination/${destinationId}`,
          );
    },
    onMutate: async ({ collectionId, collectionIncludesDestination }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousState =
        queryClient.getQueryData<UnPopulatedCollectionsResponse>(queryKey);

      queryClient.setQueryData<UnPopulatedCollectionsResponse>(queryKey, () =>
        previousState?.map((collection) =>
          collection._id === collectionId
            ? {
                ...collection,
                destinations: collectionIncludesDestination
                  ? collection.destinations.filter((id) => id !== destinationId)
                  : [...collection.destinations, destinationId],
              }
            : collection,
        ),
      );

      return { previousState };
    },
    onSuccess: (_data, variables) => {
      const { collectionId, collectionIncludesDestination } = variables;
      const collection = queryClient
        .getQueryData<UnPopulatedCollectionsResponse>(queryKey)
        ?.find((c) => c._id === collectionId);
      const name = collection?.name || "collection";
      const verb = collectionIncludesDestination ? "removed from" : "added to";
      toast.success(`Destination ${verb} "${name}"`);
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
      queryClient.invalidateQueries({ queryKey });
    },
  });

  // Filter collections based on search
  const filteredCollections = data?.filter((collection) =>
    collection.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCollectionToggle = async (
    collectionId: string,
    event: React.MouseEvent,
  ) => {
    // Prevent dropdown from closing
    event.preventDefault();
    event.stopPropagation();

    console.log(collectionId);

    mutate({
      collectionId,
      collectionIncludesDestination: !!data
        ?.find((collection) => collection._id === collectionId)
        ?.destinations.includes(destinationId),
    });
  };

  const onSubmit = async (values: CreateCollectionType) => {
    createCollectionMutation.mutate(values, {
      onSettled: () => {
        setIsCreateModalOpen(false);
        form.reset();
      },
    });
  };

  if (status !== "authenticated") {
    return (
      <Button disabled className="w-full">
        <BookmarkPlus className="h-4 w-4" />
        Add To Collection
      </Button>
    );
  }

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button className="w-full">
            <BookmarkPlus className="h-4 w-4" />
            Add To Collection
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-80 max-w-full"
          align="start"
          side="top"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <DropdownMenuLabel className="flex items-center justify-between">
            <span>Add to Collection</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 gap-1 px-2 text-xs"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="h-3 w-3" />
              New
            </Button>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* Search */}
          <div className="p-2">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 pl-8"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Collections List */}
          <ScrollArea className="max-h-64">
            <div className="p-1">
              {isLoading ? (
                <div className="space-y-2 p-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 flex-1" />
                    </div>
                  ))}
                </div>
              ) : filteredCollections && filteredCollections.length > 0 ? (
                filteredCollections.map((collection) => (
                  <DropdownMenuItem
                    key={collection._id}
                    className="focus:bg-accent flex cursor-pointer items-center justify-between p-2"
                    onClick={(e) => handleCollectionToggle(collection._id, e)}
                    onSelect={(e) => e.preventDefault()}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={collection._id}
                        checked={collection.destinations.includes(
                          destinationId,
                        )}
                        className="pointer-events-none"
                      />
                      <Label
                        htmlFor={collection._id}
                        className="pointer-events-none block leading-normal font-normal"
                      >
                        {collection.name}
                      </Label>
                    </div>
                    <div className="flex items-center">
                      {collection.visibility === "public" ? (
                        <Globe className="text-muted-foreground h-3 w-3" />
                      ) : (
                        <Lock className="text-muted-foreground h-3 w-3" />
                      )}
                    </div>
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="text-muted-foreground p-4 text-center text-sm">
                  {searchQuery ? "No collections found" : "No collections yet"}
                </div>
              )}
            </div>
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Create New Collection Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {/* <FolderPlus className="h-5 w-5" /> */}
              Create New Collection
            </DialogTitle>
            <DialogDescription>
              Create a new collection and add this destination to it.
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
                    <FormLabel>Description (Optional)</FormLabel>
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

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateModalOpen(false)}
                >
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  loading={createCollectionMutation.isPending}
                  className="gap-2"
                >
                  Create & Add
                </LoadingButton>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddToCollectionsBtn;
