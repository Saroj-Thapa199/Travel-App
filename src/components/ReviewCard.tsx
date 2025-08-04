import { PopulatedReviewType } from "@/lib/validations/review";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import avatarPlaceholder from "@/assets/avatar-placeholder.png";
import Image from "next/image";
import { Flag, Star, ThumbsUp } from "lucide-react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

type ReviewCardProps = {
  review: PopulatedReviewType;
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="bg-background rounded-lg border p-4 transition-all hover:shadow-sm">
      <div className="flex items-start gap-4">
        <Avatar className="h-10 w-10">
          {review.user.image ? (
            <>
              <AvatarImage src={review.user.image} alt="avatar" />
            </>
          ) : (
            <Image src={avatarPlaceholder} alt="avatar" />
          )}
          <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <span className="font-medium">{review.user.name}</span>
              <div className="mt-1 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
                <span className="text-muted-foreground ml-2 text-xs">
                  {review.createdAt.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                  })}
                </span>
              </div>
            </div>

            <Badge
              variant="outline"
              className={cn(
                "text-xs",
                review.rating >= 4
                  ? "border-green-200 bg-green-50 text-green-600 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400"
                  : review.rating >= 2
                    ? "border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400"
                    : "border-red-200 bg-red-50 text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400",
              )}
            >
              {review.rating >= 4
                ? "Excellent"
                : review.rating >= 2
                  ? "Good"
                  : "Poor"}
            </Badge>
          </div>

          <p className="mt-3 text-sm">{review.comment}</p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                // onClick={() => handleHelpful(review.name)}
                className={cn(
                  "text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs transition-colors",
                  //   helpfulReviews.includes(review.name) &&
                  "text-primary hover:text-primary",
                )}
              >
                <ThumbsUp className="h-3.5 w-3.5" />
                <span>
                  {/* {helpfulReviews.includes(review.name)
                    ? "Helpful"
                    : "Mark as helpful"} */}
                  Helpful
                </span>
              </button>

              <button className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs transition-colors">
                <Flag className="h-3.5 w-3.5" />
                <span>Report</span>
              </button>
            </div>

            <div className="text-muted-foreground text-xs">
              Visited:{" "}
              {new Date(review.createdAt).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
