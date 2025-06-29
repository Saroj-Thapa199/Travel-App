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
} from "@/components/ui/form"

import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { seedDestinations, seedReviews } from "@/lib/actions/seed";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { UserRound } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

  const formSchema = z.object({
    favoriteFrameworks: z.array(z.string()).min(1, "Required"),
  });


const page = () => {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      favoriteFrameworks: [],
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("form submitted with data: ", data)
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

  useEffect(() => {
    const fetchReviews = async () => {
      // const res = await axios.get("/api/reviews/685286ab9840c4a1504186c8")
      // const res2 = await axios.get("/api/reviews/685286ab9840c4a1504186c8/stats")
      // const res2 = await axios.get("/api/reviews/685286ab9840c4a1504186c9/stats")
      // console.log(res)
      // console.log(res2.data)
    };

    fetchReviews();
  }, []);

  return (
    <div className="grid h-screen w-full place-items-center">
      <div className="mx-auto flex flex-col space-y-4">
        <LoadingButton loading={loading1} onClick={destinationSeed}>
          Seed Destinations
        </LoadingButton>
        <LoadingButton loading={loading2} onClick={reviewSeed}>
          Seed Reviews
        </LoadingButton>
        <ProtectedActionButton onClick={() => console.log("clicked")}>
          Continue
        </ProtectedActionButton>
      </div>
      {/* <Avatar>
        <AvatarImage />
        <AvatarFallback>
          <UserRound />
        </AvatarFallback>
      </Avatar> */}
      {/* <CategoriesSelect /> */}

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
          control={form.control}
          name="favoriteFrameworks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Favorite Frameworks</FormLabel>
              <MultiSelect onValuesChange={field.onChange} values={field.value}>
                <FormControl>
                  <MultiSelectTrigger className="w-full">
                    <MultiSelectValue placeholder="Select frameworks..." />
                  </MultiSelectTrigger>
                </FormControl>
                <MultiSelectContent>
                  <MultiSelectGroup>
                    <MultiSelectItem value="next.js">Next.js</MultiSelectItem>
                    <MultiSelectItem value="sveltekit">
                      SvelteKit
                    </MultiSelectItem>
                    <MultiSelectItem value="nuxt.js">Nuxt.js</MultiSelectItem>
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
        <Button type="submit">Submit</Button>
        </form>
        </Form>
        {/* <MultiSelect>
          <MultiSelectTrigger className="w-full max-w-[400px]">
            <MultiSelectValue placeholder="Select frameworks..." />
          </MultiSelectTrigger>
          <MultiSelectContent>
            <MultiSelectGroup>
              <MultiSelectItem value="next.js">Next.js</MultiSelectItem>
              <MultiSelectItem value="sveltekit">SvelteKit</MultiSelectItem>
              <MultiSelectItem value="nuxt.js">Nuxt.js</MultiSelectItem>
              <MultiSelectItem value="remix">Remix</MultiSelectItem>
              <MultiSelectItem value="astro">Astro</MultiSelectItem>
              <MultiSelectItem value="vue">Vue.js</MultiSelectItem>
              <MultiSelectItem value="react">React</MultiSelectItem>
            </MultiSelectGroup>
          </MultiSelectContent>
        </MultiSelect> */}
      </div>
    </div>
  );
};

export default page;
