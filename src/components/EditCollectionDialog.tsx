"use client";

import type React from "react";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Globe, Lock } from "lucide-react";
import {
  createCollectionSchema,
  type CreateCollectionType,
} from "@/lib/validations/collection";
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
import { useQueryClient } from "@tanstack/react-query";
import { CollectionsResponse, CollectionType } from "@/lib/types";
import { useUpdateCollectionMutation } from "@/app/hooks/useUpdateCollectionMutation";
import LoadingButton from "./LoadingButton";

interface EditCollectionDialogProps {
  collectionId: string;
  userId: string;
  open: boolean;
  setOpen: (val: boolean) => void;
}

const EditCollectionDialog = ({
  collectionId,
  userId,
  open,
  setOpen,
}: EditCollectionDialogProps) => {
  const queryClient = useQueryClient();

  const collection = queryClient
    .getQueryData<CollectionsResponse>(["user", userId, "collections"])
    ?.find((c) => c._id === collectionId) || queryClient.getQueryData<CollectionType>(["collection", collectionId])

  const form = useForm<Omit<CreateCollectionType, "destinations">>({
    resolver: zodResolver(createCollectionSchema.omit({ destinations: true })),
    defaultValues: {
      name: "",
      description: "",
      visibility: "public",
    },
  });

  const mutation = useUpdateCollectionMutation(collectionId);

  const onSubmit = async (
    values: Omit<CreateCollectionType, "destinations">,
  ) => {
    console.log(values);
    mutation.mutate(
      { editData: values, collectionId: collectionId },
      {
        onSettled: () => {
          setOpen(false);
          form.reset();
        },
      },
    );
  };

  useEffect(() => {
    if (open && collection) {
      form.reset({
        name: collection.name,
        description: collection.description,
        visibility: collection.visibility,
      });
    }
  }, [open, collection]);

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) form.reset();
      }}
    >
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
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <LoadingButton type="submit" loading={mutation.isPending}>
                Update Collection
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCollectionDialog;
