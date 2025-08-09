"use client";

import CategoriesSelect from "@/components/CategoriesSelect";
import LoadingButton from "@/components/LoadingButton";
import ProtectedActionButton from "@/components/ProtectedActionButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TagsInput } from "@/components/ui/tags-input";

import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { seedDestinations } from "@/lib/actions/seed/destination";
import { seedReviews } from "@/lib/actions/seed/review";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { seedMotorableRoutes } from "@/lib/actions/seed/motorableRoutes";
import { seedTrekRoutes } from "@/lib/actions/seed/trekRoutes";
import AddToFavoritesBtn from "@/components/AddToFavoritesBtn";
import AddToCollectionsBtn from "@/components/AddToCollectionsBtn";

const formSchema = z.object({
  favoriteFrameworks: z.array(z.string()).min(1, "Required"),
  tags: z.array(z.string()).min(1, "at least 1 required"),
});

const page = () => {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      favoriteFrameworks: [],
      tags: [],
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("form submitted with data: ", data);
  }

  const destinationSeed = async () => {
    setLoading1(true);
    await seedDestinations();
    setLoading1(false);
  };

  const reviewSeed = async () => {
    setLoading2(true);
    await seedReviews();
    setLoading2(false);
  };

  const motorableRouteSeed = async () => {
    setLoading3(true);
    await seedMotorableRoutes();
    setLoading3(false);
  };

  const trekRouteSeed = async () => {
    setLoading4(true);
    await seedTrekRoutes();
    setLoading4(false);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await axios.get("/api/reviews/685286ab9840c4a1504186c9");
      console.log(res);
    };

    // fetchReviews();

    const fetchRouteSegments = async () => {
      const res1 = await axios.get("/api/route-segments/motorable?from=kath");
      const res2 = await axios.get("/api/route-segments/trek?name=everest");
      console.log(res1.data);
      console.log(res2.data);
    };

    // fetchRouteSegments()

    const fetchSuggestedDestinations = async () => {
      const res1 = await axios.get(
        "/api/destinations/suggested/68879a260fc53edc0c426dcd",
      );
      console.log(res1.data);
    };

    // fetchSuggestedDestinations();

    // const fetchCollections = async () => {
    //   const res1 = await axios.get("/api/collections/all");
    //   console.log(res1.data);
    // };
    
    // fetchCollections();

    // const fetchCollectionsNames = async () => {
    //   const res1 = await axios.get("/api/collections/all/names");
    //   console.log(res1.data);
    // };

    // fetchCollectionsNames()

    const fetchFavoriteDestinations = async () => {
      const res = await axios.get("api/destinations/favorites")
      console.log(res.data)
    }

    fetchFavoriteDestinations()
  }, []);

  return (
    <div className="grid h-screen w-full place-items-center py-15">
      <div className="mx-auto flex flex-col space-y-4">
        <LoadingButton loading={loading1} onClick={destinationSeed}>
          Seed Destinations
        </LoadingButton>
        <LoadingButton loading={loading2} onClick={reviewSeed}>
          Seed Reviews
        </LoadingButton>
        <LoadingButton loading={loading3} onClick={motorableRouteSeed}>
          Seed Motorable Routes
        </LoadingButton>
        <LoadingButton loading={loading4} onClick={trekRouteSeed}>
          Seed Trek Routes
        </LoadingButton>
        <ProtectedActionButton onClick={() => console.log("clicked")}>
          Continue
        </ProtectedActionButton>
        <AddToFavoritesBtn
          destinationId="68879a260fc53edc0c426dcd"
          initialState={{ addedToFavoritesByUser: false, favorites: 10 }}
          btnStyle="button-text"
        />
        {/* <AddToFavoritesBtn
          destinationId="68879a260fc53edc0c426dcd"
          initialState={{ addedToFavoritesByUser: false, favorites: 10 }}
          btnStyle="icon"
        /> */}
        <AddToCollectionsBtn destinationId="68879a260fc53edc0c426dcd"/>
      </div>

      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="favoriteFrameworks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Favorite Frameworks</FormLabel>
                  <MultiSelect
                    onValuesChange={field.onChange}
                    values={field.value}
                  >
                    <FormControl>
                      <MultiSelectTrigger className="w-full">
                        <MultiSelectValue placeholder="Select frameworks..." />
                      </MultiSelectTrigger>
                    </FormControl>
                    <MultiSelectContent>
                      <MultiSelectGroup>
                        <MultiSelectItem value="next.js">
                          Next.js
                        </MultiSelectItem>
                        <MultiSelectItem value="sveltekit">
                          SvelteKit
                        </MultiSelectItem>
                        <MultiSelectItem value="nuxt.js">
                          Nuxt.js
                        </MultiSelectItem>
                        <MultiSelectItem value="remix">Remix</MultiSelectItem>
                        <MultiSelectItem value="astro">Astro</MultiSelectItem>
                        <MultiSelectItem value="vue">Vue</MultiSelectItem>
                      </MultiSelectGroup>
                    </MultiSelectContent>
                  </MultiSelect>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Favorite Frameworks</FormLabel>
                  <TagsInput
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="enter your used tech"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default page;
