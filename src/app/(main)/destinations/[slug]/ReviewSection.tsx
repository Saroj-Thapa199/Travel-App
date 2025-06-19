"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Filter, Loader2, MessageSquare, Star } from "lucide-react";
import ReviewForm from "./ReviewForm";
import { getDestinationReviews } from "@/lib/actions/review";
import ReviewCard from "@/components/ReviewCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { populatedReviewSchema, PopulatedReviewType } from "@/lib/validation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReviewSummary from "@/components/ReviewSummary";
import useGetReviews from "@/app/hooks/useGetReviews";

type ReviewSectionProps = {
  destinationName: string;
  destinationId: string;
  averageRating: number;
  reviewCount: number;
};

const ReviewSection = ({
  destinationName,
  destinationId,
  averageRating,
  reviewCount,
}: ReviewSectionProps) => {
  const [reviewdialogOpen, setReviewDialogOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  // const {
  //   data: reviews,
  //   status,
  //   error,
  // } = useQuery({
  //   queryKey: ["reviews", destinationId],
  //   queryFn: async () => {
  //     const res = await axios.get<PopulatedReviewType[]>(
  //       `/api/reviews/${destinationId}`,
  //     );
  //     return res.data;
  //   },
  // });

  const {
    data,
    status,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetReviews({ destinationId, filter, sortBy });

  const reviews = data?.pages.flatMap((page) => page.reviews);

  // console.log("reviews:", reviews);

  // const ratingCounts = {
  //   5:
  // }

  // const {data} = useQuery({ queryKey: ['todos'], queryFn: getDestinationReviews })
  // const reviews = data.data

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold">Visitor Reviews</h2>
          <Badge variant="outline" className="ml-2">
            {reviewCount} reviews
          </Badge>
        </div>

        <Dialog open={reviewdialogOpen} onOpenChange={setReviewDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-fit">
              <MessageSquare />
              Write a Review
            </Button>
          </DialogTrigger>
          <DialogContent className="space-y-8">
            <DialogHeader>
              <DialogTitle>Share Your Experience</DialogTitle>
              <DialogDescription className="mb-4">
                Tell other travelers about your visit to {destinationName}
              </DialogDescription>
              <ReviewForm
                destinationName={destinationName}
                destinationId={destinationId}
                closeDialog={() => setReviewDialogOpen(false)}
              />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <ReviewSummary
          averageRating={averageRating}
          reviewCount={reviewCount}
          destinationId={destinationId}
          filter={filter}
          setFilter={setFilter}
        />
        {/* TODO: manage h-later of below div */}
        <div className="bg-lue-300 space-y-4 md:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="text-muted-foreground size-4" />
              <span className="text-sm">Sort by:</span>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Most recent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Most recent</SelectItem>
                <SelectItem disabled={filter !== "all"} value="rating-desc">Highest rated</SelectItem>
                <SelectItem disabled={filter !== "all"} value="rating-asc">Lowest rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="max-h-[600px] space-y-4 overflow-y-auto">
            {status === "pending" ? (
              <Loader2 className="animate-spin" />
            ) : reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewCard
                  key={review._id}
                  review={populatedReviewSchema.parse(review)}
                />
              ))
            ) : (
              <p className="my-auto text-lg font-semibold">
                No reviews yet. Be the first to review
              </p>
            )}
            <div>
              <Button
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetching}
              >
                {isFetchingNextPage
                  ? "Loading more..."
                  : hasNextPage
                    ? "Load More"
                    : "Nothing more to load"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
