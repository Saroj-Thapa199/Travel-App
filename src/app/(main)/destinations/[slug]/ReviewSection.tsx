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
import { Filter, Loader2, MessageSquare } from "lucide-react";
import ReviewForm from "./ReviewForm";
import ReviewCard from "@/components/ReviewCard";
import { populatedReviewSchema } from "@/lib/validations/review";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReviewSummary from "@/components/ReviewSummary";
import useGetReviews from "@/app/hooks/useGetReviews";
import ReviewCardSkeleton from "@/components/skeletons/ReviewCardSkeleton";
import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import ProtectedActionButton from "@/components/ProtectedActionButton";
import { ReviewActionsDialogProvider } from "@/providers/ReviewActionsDialogProvider";
import { useSession } from "next-auth/react";

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

  const {
    data,
    status,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetReviews({ destinationId, filter, sortBy });

  const reviews = data?.pages.flatMap((page) => page.reviews);

  const session = useSession();

  return (
    <ReviewActionsDialogProvider>
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
              <ProtectedActionButton className="w-full sm:w-fit">
                <MessageSquare />
                Write a Review
              </ProtectedActionButton>
            </DialogTrigger>
            <DialogContent className="space-y-8">
              <DialogHeader className="mb-0">
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
                  <SelectItem disabled={filter !== "all"} value="rating-desc">
                    Highest rated
                  </SelectItem>
                  <SelectItem disabled={filter !== "all"} value="rating-asc">
                    Lowest rated
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <InfiniteScrollContainer
              onBottomReached={() =>
                hasNextPage && !isFetching && fetchNextPage()
              }
              className="max-h-[600px] space-y-4 overflow-y-auto"
            >
              {status === "pending" ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <ReviewCardSkeleton key={index} />
                ))
              ) : reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                  <ReviewCard
                    key={review._id}
                    review={populatedReviewSchema.parse(review)}
                    userId={session.data?.user.id}
                  />
                ))
              ) : (
                <>
                  {filter === "all" ? (
                    <p className="my-auto text-lg font-semibold">
                      No reviews yet. Be the first to review
                    </p>
                  ) : (
                    <div className="text-center">
                      <p className="my-auto mb-2 text-lg font-semibold">
                        No reviews match your current filter.
                      </p>
                      <Button onClick={() => setFilter("all")}>
                        Clear filter
                      </Button>
                    </div>
                  )}
                </>
              )}
              {isFetchingNextPage && (
                <Loader2 className="mx-auto my-6 size-8 animate-spin font-light" />
              )}
            </InfiniteScrollContainer>
          </div>
        </div>
      </section>
    </ReviewActionsDialogProvider>
  );
};

export default ReviewSection;
