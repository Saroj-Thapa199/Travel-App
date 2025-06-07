"use client";

import React from "react";
import AddDestinationForm from "./AddDestinationForm";
import CustomUploader from "@/components/CustomUploader";
import { Label } from "@radix-ui/react-label";
import { ImageIcon, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    // <main className="flex h-screen items-center justify-center px-5 my-15">
    //     <AddDestinationForm />
    // </main>
    <main className="min-h-screen w-full bg-red-100 px-4 py-15 sm:px-8 xl:container">
      <div className="mx-auto my-6 max-w-3xl text-center">
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">
          Add a Hidden Gem
        </h1>
        <h2 className="text-lg">
          Share your favorite natural retreat in Nepal to help other travelers
          discover off-the-beaten-path destinations.
        </h2>
      </div>
    </main>
  );
};

export default page;
