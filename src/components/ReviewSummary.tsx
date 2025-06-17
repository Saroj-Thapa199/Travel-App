import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PopulatedReviewType } from "@/lib/validation";
import { ReviewsApiResponse } from "@/app/hooks/useGetReviews";

type ReviewSummaryProps = {
  averageRating: number;
  reviewCount: number;
  destinationId: string;
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>

};

const ReviewSummary = ({
  averageRating,
  reviewCount,
  destinationId,
  filter,
  setFilter
}: ReviewSummaryProps) => {
  const [animatedWidth, setAnimatedWidth] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });

  const ratingArray: [5, 4, 3, 2, 1] = [5, 4, 3, 2, 1];

  const {
    data,
    status,
    error,
  } = useQuery({
    queryKey: ["reviews", destinationId, "all-reviews"],
    queryFn: async () => {
      const res = await axios.get<ReviewsApiResponse>(
        `/api/reviews/${destinationId}?limit=${reviewCount}`,
      );
      return res.data;
    },
  });

  const reviews = data?.reviews

  const getRatingCounts = (targetRatings: number) => {
    const matchedRatings = reviews?.filter(
      (review) => review.rating === targetRatings,
    );
    return matchedRatings?.length || 0;
  };

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      setAnimatedWidth({
        5: (getRatingCounts(5) / reviewCount) * 100,
        4: (getRatingCounts(4) / reviewCount) * 100,
        3: (getRatingCounts(3) / reviewCount) * 100,
        2: (getRatingCounts(2) / reviewCount) * 100,
        1: (getRatingCounts(1) / reviewCount) * 100,
      });
    }
  }, [reviews]);
  return (
    <div className="bg-muted/50 space-y-4 rounded-lg p-5">
      <div className="flex items-center gap-4">
        <h2 className="text-4xl font-bold">{averageRating.toFixed(1)}</h2>
        <div className="flex flex-col gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${i < Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <p className="text-muted-foreground text-sm">
            {reviewCount !== 0
              ? `Based on ${reviewCount} review${reviewCount > 1 && "s"}`
              : "(No reviews yet)"}
          </p>
        </div>
      </div>
      <div className="space-y-2">
        {ratingArray.map((rating, i) => (
          <div key={rating} className="flex items-center gap-2">
            <p className="w-3 text-sm font-medium">{rating}</p>
            <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
              {/* {reviews?.length && reviews.length > 0 ? ( */}
              <div
                className="h-full rounded-full bg-yellow-400 transition-all duration-1000"
                style={{
                  // width: `${(getRatingCounts(rating) / (reviews?.length || 0)) * 100}%`
                  width: `${animatedWidth[rating]}%`,
                }}
              ></div>
              {/* ): null} */}
            </div>
            <p className="text-muted-foreground w-3 text-sm font-medium">
              {getRatingCounts(rating)}
            </p>
          </div>
        ))}
      </div>
      <div className="space-y-2 pt-2">
        <p className="text-sm font-medium">Filter Reviews</p>
        <Select value={filter} onValueChange={setFilter} disabled={reviewCount === 0}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All ratings" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All ratings</SelectItem>
            {[5, 4, 3, 2, 1].map((rating) => (
              <SelectItem key={rating} value={`${rating.toString()} star${rating > 1 && "s"}`}>
                {rating} star{rating > 1 && "s"} only
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ReviewSummary;
