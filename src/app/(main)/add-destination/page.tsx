"use client";

import { useEffect, useState, useTransition } from "react";
import AddDestinationForm from "./AddDestinationForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { destinationSchema, DestinationType } from "@/lib/validation";
import Preview from "./Preview";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDestination } from "@/lib/actions/destination";
import { DestinationFormType } from "@/lib/types";

const page = () => {
  const [tab, setTab] = useState("form");
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const [formHasValues, setFormHasValues] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<DestinationFormType>({
    resolver: zodResolver(
      destinationSchema.omit({
        _id: true,
        slug: true,
        createdAt: true,
        updatedAt: true,
        averageRating: true,
        reviewCount: true,
        // categories: true
      }),
    ),
    defaultValues: {
      name: "",
      region: "",
      shortDescription: "",
      longDescription: "",
      image: "",
      categories: [],
      featured: false
    },
  });

  const values = form.watch();
  console.log(values)

  const onSubmit = async (values: DestinationFormType) => {
    setError(undefined);
    startTransition(async () => {
      const { error } = await addDestination(values);
      if (error) setError(error);
    });
  };

  useEffect(() => {
    const hasAnyValue = Object.values(values).some((value) => {
      return typeof value === "string"
        ? value.trim() !== ""
        : value !== undefined && value !== null;
      // return Boolean(value.trim());
    });

    setFormHasValues(hasAnyValue);
  }, [values]);

  return (
    <main className="mx-auto min-h-screen w-full px-4 py-15 sm:px-8 md:px-14 lg:px-20 xl:container">
      <div className="mx-auto my-6 max-w-3xl text-center">
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">
          Add a Hidden Gem
        </h1>
        <h2 className="text-muted-foreground text-lg">
          Share your favorite natural retreat in Nepal to help other travelers
          discover off-the-beaten-path destinations.
        </h2>
      </div>

      <div className="mx-auto max-w-4xl">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-6 w-full">
            <TabsTrigger value="form" className="cursor-pointer">
              Add destination
            </TabsTrigger>
            <TabsTrigger value="preview" className="cursor-pointer">
              Preview
            </TabsTrigger>
          </TabsList>
          <TabsContent value="form">
            <AddDestinationForm
              form={form}
              submit={onSubmit}
              errorMessage={error}
              isUploading={isUploading}
              setIsUploading={setIsUploading}
              isPending={isPending}
              setTabToPreview={() => {
                setTab("preview");
                window.scrollTo(0, 150);
              }}
            />
          </TabsContent>
          <TabsContent value="preview">
            <Preview
              destination={values}
              showPreview={formHasValues}
              loading={isPending}
              isUploading={isUploading}
              submit={form.handleSubmit(onSubmit)}
              setTabToForm={() => {
                setTab("form");
                window.scrollTo(0, 150);
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default page;
