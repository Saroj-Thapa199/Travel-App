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
import { ReviewsApiResponse } from "@/app/hooks/useGetReviews";
import { ReviewStatApiResponse } from "@/lib/types";

type ReviewSummaryProps = {
  averageRating: number;
  reviewCount: number;
  destinationId: string;
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
};

const ReviewSummary = ({
  averageRating,
  reviewCount,
  destinationId,
  filter,
  setFilter,
}: ReviewSummaryProps) => {
  const [animatedWidth, setAnimatedWidth] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });

  const ratingArray: [5, 4, 3, 2, 1] = [5, 4, 3, 2, 1];

  const { data, status } = useQuery({
    queryKey: ["reviews", destinationId, "stats"],
    queryFn: async () => {
      const res = await axios.get<ReviewStatApiResponse>(
        `/api/reviews/${destinationId}/stats`,
      );
      return res.data;
    },
  });

  const finalAverageRating = data?.averageRating ?? averageRating

  const finalReviewCount = data?.totalCount ?? reviewCount;

  useEffect(() => {
    if (data) {
      if (data.totalCount === 0) {
        setAnimatedWidth({
          5: 0,
          4: 0,
          3: 0,
          2: 0,
          1: 0,
        });
        return;
      }
      setAnimatedWidth({
        5: (data.ratings[5] / data.totalCount) * 100,
        4: (data.ratings[4] / data.totalCount) * 100,
        3: (data.ratings[3] / data.totalCount) * 100,
        2: (data.ratings[2] / data.totalCount) * 100,
        1: (data.ratings[1] / data.totalCount) * 100,
      });
    }
  }, [data]);

  return (
    <div>
      <div className="bg-muted/50 space-y-4 rounded-lg p-5">
        <div className="flex items-center gap-4">
          <h2 className="text-4xl font-bold">
            {finalAverageRating === 0 ? 0 : finalAverageRating.toFixed(1)}
          </h2>
          <div className="flex flex-col gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.round(data?.averageRating || averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              {finalReviewCount !== 0
                ? `Based on ${finalReviewCount} review${finalReviewCount > 1 ? "s" : ""}`
                : "(No reviews yet)"}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          {ratingArray.map((rating, i) => (
            <div key={rating} className="flex items-center gap-2">
              <p className="w-3 text-sm font-medium">{rating}</p>
              <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                <div
                  className="h-full rounded-full bg-yellow-400 transition-all duration-1000"
                  style={{
                    width: `${animatedWidth[rating]}%`,
                  }}
                ></div>
              </div>
              <p className="text-muted-foreground w-3 text-sm font-medium">
                {data?.ratings[rating] || 0}
              </p>
            </div>
          ))}
        </div>
        <div className="space-y-2 pt-2">
          <p className="text-sm font-medium">Filter Reviews</p>
          <Select
            value={filter}
            onValueChange={setFilter}
            disabled={finalReviewCount === 0}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All ratings" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All ratings</SelectItem>
              {[5, 4, 3, 2, 1].map((rating) => (
                <SelectItem
                  key={rating}
                  value={`${rating.toString()} star${rating > 1 ? "s" : ""}`}
                >
                  {rating} star{rating > 1 ? "s" : ""} only
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;
