"use client";

import LoadingButton from "@/components/LoadingButton";
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
import { Textarea } from "@/components/ui/textarea";
import { destinationSchema, DestinationType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { startTransition, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { addDestination } from "./actions";
import CustomUploader from "@/components/CustomUploader";

const AddDestinationForm = () => {
    const [error, setError] = useState<string>()
    const [isUploading, setIsUploading] = useState(false)
    const [isPending, startTransition] = useTransition()

  const form = useForm<DestinationType>({
    resolver: zodResolver(destinationSchema),
    defaultValues: {
      name: "",
      shortDescription: "",
      longDescription: "",
      image: ""
    },
  });

  const onSubmit = async (values: DestinationType) => {
    console.log({values})
    setError(undefined)
    startTransition(async() => {
        const {error} = await addDestination(values)
        if (error) setError(error)
    })
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {error && <span className="text-destructive">{error}</span>}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destination Name</FormLabel>
              <FormControl>
                <Input placeholder="Bethanchowk Narayan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">
                Short Description <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief Description (max 150 characters)"
                  {...field}
                  maxLength={150}
                  className="resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="longDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detailed Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide a detailed description of the destination, including its natural features, cultural significance, and what makes it special."
                  {...field}
                  className="max-h-40 resize-none overflow-y-auto"
                />
              </FormControl>
              <FormDescription>This is your long description.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destination Image</FormLabel>
              <FormControl>
                <CustomUploader onChange={field.onChange} setisUploading={setIsUploading} />
              </FormControl>
              <FormDescription>This is your long description.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton type="submit" loading={isPending} disabled={isUploading}>
          Submit Destination
        </LoadingButton>
      </form>
    </Form>
  );
};

export default AddDestinationForm;
