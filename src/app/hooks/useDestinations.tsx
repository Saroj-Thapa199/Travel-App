import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { DestinationType } from "@/lib/validation";

interface DestinationsApiResponse {
  destinations: DestinationType[];
  nextCursor: DestinationCursor | null;
}

interface DestinationCursor {
  cursorRating: number;
  cursorId: string;
}

interface UseDestinationsParams {
  searchTerm?: string;
  sortBy?: "rating-asc" | "rating-desc" | "default";
  limit?: number;
}
useInfiniteQuery
const useDestinations = ({
  searchTerm = "",
  sortBy = "default",
  limit = 12,
}: UseDestinationsParams = {}) => {
  return useInfiniteQuery<
    DestinationsApiResponse,
    Error,
    InfiniteData<DestinationsApiResponse>,
    [string, string, string],
    DestinationCursor | null
  >({
    queryKey: ["destinations", searchTerm, sortBy],
    queryFn: async ({ pageParam }) => {
      const params: Record<string, any> = {
        limit,
        searchTerm,
        sortBy,
      };

      if (pageParam) {
        params.cursorRating = pageParam.cursorRating;
        params.cursorId = pageParam.cursorId;
      }

      const { data } = await axios.get<DestinationsApiResponse>("/api/destinations/all", { params });
      return data;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};

export default useDestinations;
