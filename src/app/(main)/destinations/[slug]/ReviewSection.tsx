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
import { Loader2, MessageSquare } from "lucide-react";
import ReviewForm from "./ReviewForm";
import { getDestinationReviews } from "@/lib/actions/review";
import ReviewCard from "@/components/ReviewCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  populatedReviewSchema,
  PopulatedReviewType,
} from "@/lib/validation";
import { useState } from "react";

type ReviewSectionProps = {
  destinationName: string;
  destinationId: string;
};

const ReviewSection = ({
  destinationName,
  destinationId,
}: ReviewSectionProps) => {
  const [reviewdialogOpen, setReviewDialogOpen] = useState(false)

  const {
    data: reviews,
    status,
    error,
  } = useQuery({
    queryKey: ["reviews", destinationId],
    queryFn: async () => {
      const res = await axios.get<PopulatedReviewType[]>(
        `/api/reviews/${destinationId}`,
      );
      return res.data;
    },
  });

  // const {data} = useQuery({ queryKey: ['todos'], queryFn: getDestinationReviews })
  // const reviews = data.data
  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold">Visitor Reviews</h2>
          <Badge variant="outline" className="ml-2">
            {5} reviews
          </Badge>
        </div>

        <Dialog open={reviewdialogOpen} onOpenChange={setReviewDialogOpen}>
          <DialogTrigger asChild >
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
        <div className="bg-green-300"></div>
        {/* TODO: manage h-later of below div */}
        <div className="bg-lue-300 max-h-[550px] space-y-4 overflow-y-auto md:col-span-2">
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
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
