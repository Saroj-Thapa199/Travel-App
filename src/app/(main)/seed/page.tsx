"use client";

import LoadingButton from "@/components/LoadingButton";
import { seedDestinations, seedReviews } from "@/lib/seed";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

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
      const res = await axios.get("/api/reviews/684bbb26eb5e7bd4c944be23")
      console.log(res)
    }

    fetchReviews()
  }, [])

  return (
    <div className="grid h-screen w-full place-items-center">
      <div className="mx-auto flex flex-col space-y-4">
        <LoadingButton loading={loading1} onClick={destinationSeed}>
          Seed Destinations
        </LoadingButton>
        <LoadingButton loading={loading2} onClick={reviewSeed}>
          Seed Reviews
        </LoadingButton>
      </div>
    </div>
  );
};

export default page;
