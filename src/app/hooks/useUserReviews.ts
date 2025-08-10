import { DestinationPopulatedReviewType } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export type UserReviewsApiResponse = {
  reviews: DestinationPopulatedReviewType[];
  nextCursor: number | null;
};

const useUserReviews = (userId: string) => {
  return useInfiniteQuery({
    queryKey: ["user", userId, "reviews"],
    queryFn: async ({ pageParam }) => {
      const params: Record<string, any> = {};
      if (pageParam) {
        params.cursor = pageParam;
      }
      const { data } = await axios.get<UserReviewsApiResponse>(
        "/api/reviews/user-reviews",
        { params },
      );
      return data;
    },
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};

export default useUserReviews;
