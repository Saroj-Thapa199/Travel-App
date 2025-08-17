import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { DestinationType } from "@/lib/validations/destination";

interface DestinationCursor {
  cursorRating?: number;
  cursorName?: string;
  cursorId: string;
}

interface DestinationsApiResponse {
  destinations: DestinationType[];
  nextCursor: DestinationCursor | null;
}

interface UseDestinationsParams {
  searchTerm?: string;
  sortBy?: "rating-asc" | "rating-desc" | "default";
  limit?: number;
  category?: string;
}

const useDestinations = ({
  category = "all",
  searchTerm = "",
  sortBy = "default",
  limit = 12,
}: UseDestinationsParams = {}) => {
  return useInfiniteQuery<
    DestinationsApiResponse,
    Error,
    InfiniteData<DestinationsApiResponse>,
    [string, string, string, string],
    DestinationCursor | null
  >({
    queryKey: ["destinations", category, searchTerm, sortBy],
    queryFn: async ({ pageParam }) => {
      const params: Record<string, any> = {
        category,
        limit,
        searchTerm,
        sortBy,
      };

      // Handle cursor params based on sort type
      if (pageParam) {
        if (sortBy === "default" && pageParam.cursorName) {
          params.cursorName = pageParam.cursorName;
          params.cursorId = pageParam.cursorId;
        } else if (
          (sortBy === "rating-asc" || sortBy === "rating-desc") &&
          pageParam.cursorRating !== undefined
        ) {
          params.cursorRating = pageParam.cursorRating;
          params.cursorId = pageParam.cursorId;
        }
      }

      const { data } = await axios.get<DestinationsApiResponse>(
        "/api/destinations/all",
        { params },
      );
      return data;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};

export default useDestinations;
