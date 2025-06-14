"use client";

import InteractiveStarRating from "@/components/InteractiveStarRating";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { createReview } from "@/lib/actions/review";
import { ReviewFormType } from "@/lib/types";
import { reviewSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type ReviewFormProps = {
  destinationName: string;
  destinationId: string;
};

const ReviewForm = ({ destinationName, destinationId }: ReviewFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const form = useForm<ReviewFormType>({
    resolver: zodResolver(
      reviewSchema.omit({
        _id: true,
        createdAt: true,
        updatedAt: true,
        user: true,
        destination: true,
      }),
    ),
    defaultValues: {
      rating: 0,
    },
  });

  const onSubmit = async (values: ReviewFormType) => {
    setLoading(true);
    setError(undefined)
    const res = await createReview({ ...values, destination: destinationId });
    setLoading(false)
    if (res.success) {
      console.log("success");
      const review = reviewSchema.parse(res.data);
      console.log("review", review);
    }
    setError (res.error)
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {error && <p className="text-destructive">{error}</p>}
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Rating</FormLabel>
              <div className="flex items-center gap-2">
                <FormControl>
                  <InteractiveStarRating onRate={field.onChange} />
                </FormControl>
                <FormDescription>Click to rate.</FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Review</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder={`Enter your experience visiting ${destinationName}...`}
                  className="field-sizing-fixed resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton loading={loading} type="submit">Submit Review</LoadingButton>
      </form>
    </Form>
  );
};

export default ReviewForm;
