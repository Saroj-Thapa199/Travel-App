"use client";

import { useEffect, useState, useTransition } from "react";
import AddDestinationForm from "./AddDestinationForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { destinationSchema } from "@/lib/validation";
import Preview from "./Preview";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDestination } from "@/lib/actions/destination";
import { DestinationFormType } from "@/lib/types";
import { hasNonEmptyValue } from "@/lib/utils";

const page = () => {
  const [tab, setTab] = useState("form");
  const [error, setError] = useState<string>();
  const [noRouteErrorMsg, setNoRouteErrorMsg] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const [formHasValues, setFormHasValues] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [trekkingRouteFieldOptions, setTrekkingRouteFieldOptions] = useState({
    duration: false,
    distance: false,
    difficulty: false,
    altitudeGain: false,
    maxAltitude: false,
    trailDescription: true,
    checkpoints: false,
    note: false,
  });
  console.log(formHasValues);
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
      image:
        "https://images.unsplash.com/photo-1553886334-43d24f24d3bd?q=80&w=1177&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      // image: "",
      categories: [],
      featured: false,
    },
  });

  const values = form.watch();
  console.log(values);

  const onSubmit = async (values: DestinationFormType) => {
    console.log("clicked here also !!!");
    setError(undefined);
    startTransition(async () => {
      const { error } = await addDestination(values);
      if (error) setError(error);
    });
  };
  
  const isDestinationRouteEmpty = (
    destinationRoute: DestinationFormType["destinationRoute"],
  ) => {
    if (!destinationRoute) return true;

    const { publicTransport, personalVehicle, trek } = destinationRoute;

    const isEmpty = [publicTransport, personalVehicle, trek].every(
      (route) =>
        route === undefined ||
        (typeof route === "object" && !hasNonEmptyValue(route)),
    );

    return isEmpty;
  };

  useEffect(() => {
    // const { destinationRoute, featured, ...restValues } = values;

    // const hasAnyValue =
    //   hasNonEmptyValue(restValues) ||
    //   !isDestinationRouteEmpty(destinationRoute);

    // setFormHasValues(hasAnyValue);
    // setNoRouteErrorMsg(
    //   isDestinationRouteEmpty(destinationRoute)
    //     ? "Please add atleast one route"
    //     : undefined,
    // );

    const result = destinationSchema.safeParse(values)
    const routeSchema = destinationSchema.shape.destinationRoute
    const routeResult = routeSchema.safeParse(values.destinationRoute)
    setFormHasValues(result.success)
    setNoRouteErrorMsg(routeResult.success ? undefined : "Please add at least one route")
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
              noRouteErrorMsg={noRouteErrorMsg}
              isUploading={isUploading}
              setIsUploading={setIsUploading}
              trekkingRouteFieldOptions={trekkingRouteFieldOptions}
              setTrekkingRouteFieldOptions={setTrekkingRouteFieldOptions}
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
