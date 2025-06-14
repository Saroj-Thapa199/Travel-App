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
import { MessageSquare } from "lucide-react";
import ReviewForm from "./ReviewForm";
import { getDestinationReviews } from "@/lib/actions/review";
import ReviewCard from "@/components/ReviewCard";
import { useQuery } from "@tanstack/react-query";

type ReviewSectionProps = {
  destinationName: string;
  destinationId: string;
};

const ReviewSection = async ({
  destinationName,
  destinationId,
}: ReviewSectionProps) => {
  const reviews = await getDestinationReviews(destinationId);
  console.log(reviews);
  // const {data} = useQuery({ queryKey: ['todos'], queryFn: getDestinationReviews })
  // const reviews = data.data
  return (
    <section className="space-y-6">
      <div className="flex justify-between">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold">Visitor Reviews</h2>
          <Badge variant="outline" className="ml-2">
            {5} reviews
          </Badge>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="">
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
              />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="bg-green-300"></div>
        <div className="bg-lue-300 min-h-96 md:col-span-2 space-y-4">
          {reviews.data?.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
