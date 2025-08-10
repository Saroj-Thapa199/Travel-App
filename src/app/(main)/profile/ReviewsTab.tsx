import useUserReviews from "@/app/hooks/useUserReviews";
import DeleteReviewDialog from "@/components/DeleteReviewDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DestinationPopulatedReviewType } from "@/lib/types";
import { ReviewType } from "@/lib/validations/review";
import {
  ReviewActionsDialogProvider,
  useReviewActionsDialog,
} from "@/providers/ReviewActionsDialogProvider";
import axios from "axios";
import { Loader2, MessageSquare, Star } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type ReviewsTabProps = {
  userId: string;
};

const ReviewsTab = ({ userId }: ReviewsTabProps) => {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useUserReviews(userId);

  const reviews = data?.pages.flatMap((page) => page.reviews);

  const { openEditDialog, openDeleteDialog } = useReviewActionsDialog();

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Reviews</h2>
        <Button>
          <Link href="/destinations">Write a Review</Link>
        </Button>
      </div>

      <div className="space-y-6">
        {isLoading &&
          Array.from({ length: 5 }).map((_, index) => (
            <ReviewCardSkeleton key={index} />
          ))}
        {!isLoading &&
          reviews &&
          reviews.length > 0 &&
          reviews.map((review, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="md:w-1/4">
                    <Link
                      href={`/destinations/${review.destination.slug}`}
                      className="mb-2 inline-block text-lg font-bold hover:underline"
                    >
                      {review.destination.name}
                    </Link>

                    <div className="mb-2 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="md:w-3/4">
                    <p className="text-muted-foreground">{review.comment}</p>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          openEditDialog(review._id, {
                            rating: review.rating,
                            comment: review.comment,
                          })
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteDialog(review._id)}
                        className="text-destructive hover:text-destructive"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

        {hasNextPage && !isFetchingNextPage && (
          <div className="grid place-items-center">
            <Button
              onClick={() => fetchNextPage()}
              variant={"ghost"}
              className="mx-auto"
            >
              Load more
            </Button>
          </div>
        )}
        {isFetchingNextPage && <Loader2 className="mx-auto animate-spin" />}

        {reviews && reviews.length === 0 && (
          <div className="bg-muted/30 rounded-lg border border-dashed py-12 text-center">
            <MessageSquare className="text-muted-foreground mx-auto mb-3 h-12 w-12" />
            <h3 className="mb-2 text-lg font-medium">No Reviews Yet</h3>
            <p className="text-muted-foreground mb-4">
              You haven't written any reviews yet. Share your experiences to
              help other travelers!
            </p>
            <Button>Write Your First Review</Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewsTab;

const ReviewCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="md:w-1/4">
            <Skeleton className="mb-2 h-5 w-2/3" />

            <div className="mb-2 flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="fill-accent text-accent stroke-accent h-5 w-5 animate-pulse"
                />
              ))}
            </div>
            <Skeleton className="h-4 w-32" />
          </div>

          <div className="md:w-3/4">
            <div className="space-y-2">
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
              <Skeleton className="h-4 w-1/3" />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
