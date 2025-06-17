import { ReviewType } from "@/lib/validation";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export interface ReviewsApiResponse {
  reviews: ReviewType[];
  nextCursor: ReviewCursor | null;
}

interface ReviewCursor {
  cursorRating: number;
  cursorId: string;
}

interface useGetReviewsParams {
  destinationId: string;
  filter?: string;
  sortBy?: string;
  limit?: number;
}
useInfiniteQuery;
const useGetReviews = ({
  destinationId,
  filter = "all",
  sortBy = "latest",
  limit = 5,
}: useGetReviewsParams) => {
  return useInfiniteQuery({
    queryKey: ["reviews", destinationId, filter, sortBy],
    queryFn: async ({ pageParam }) => {
      const params: Record<string, any> = {
        filter,
        sortBy,
        limit,
      };
      if (pageParam) {
        params.cursorId = pageParam.cursorId;
        params.cursorRating = pageParam.cursorRating;
      }
      const { data } = await axios.get<ReviewsApiResponse>(
        `/api/reviews/${destinationId}`,
        { params },
      );
      return data;
    },
    initialPageParam: null as ReviewCursor | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};

export default useGetReviews;
