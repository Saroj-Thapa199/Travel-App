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
import React, { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import CustomUploader from "@/components/CustomUploader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DestinationFormType } from "@/lib/types";
import CategoriesSelect from "@/components/CategoriesSelect";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { DestinationType } from "@/lib/validation";

type AddDestinationFormProps = {
  form: UseFormReturn<DestinationFormType>;
  submit: (values: DestinationFormType) => void;
  errorMessage?: string;
  isUploading: boolean;
  setIsUploading: Dispatch<SetStateAction<boolean>>;
  isPending: boolean;
  setTabToPreview: () => void;
};

const categoriesOptions: DestinationType["categories"] = [
  "Mountain",
  "Hill Station",
  "City",
  "Village",
  "Pilgrimage",
  "Adventure",
  "Wildlife",
  "Cultural Heritage",
  "Natural Attraction",
];

const AddDestinationForm = ({
  form,
  submit,
  errorMessage,
  isUploading,
  setIsUploading,
  isPending,
  setTabToPreview,
}: AddDestinationFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-8">
        {errorMessage && (
          <span className="text-destructive">{errorMessage}</span>
        )}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Share Your Hidden Gem</AlertTitle>
          <AlertDescription>
            Help other travelers discover Nepal's lesser-known natural retreats
            by adding your favorite destination.
          </AlertDescription>
        </Alert>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-6">
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
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Kavrepalanchowk, Nepal"
                      {...field}
                    />
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
                    Short Description{" "}
                    <span className="text-destructive">*</span>
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
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination Image</FormLabel>
                  <FormControl>
                    <CustomUploader
                      onChange={field.onChange}
                      setisUploading={setIsUploading}
                      imageUrl={form.getValues().image}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-6">
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
                      rows={7}
                      className="field-sizing-fixed resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Categories</FormLabel>
                  <FormControl>
                    <CategoriesSelect categories={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Categories</FormLabel>
                  <MultiSelect
                    onValuesChange={field.onChange}
                    values={field.value}
                  >
                    <FormControl>
                      <MultiSelectTrigger className="w-full">
                        <MultiSelectValue placeholder="Select categories..." />
                      </MultiSelectTrigger>
                    </FormControl>
                    <MultiSelectContent>
                      <MultiSelectGroup>
                        {categoriesOptions.map((category) => (
                          <MultiSelectItem key={category} value={category}>
                            {category}
                          </MultiSelectItem>
                        ))}
                      </MultiSelectGroup>
                    </MultiSelectContent>
                  </MultiSelect>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant={"outline"} type="button" onClick={setTabToPreview}>
            Preview
          </Button>
          <LoadingButton
            type="submit"
            loading={isPending}
            disabled={isUploading}
          >
            Submit Destination
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default AddDestinationForm;
