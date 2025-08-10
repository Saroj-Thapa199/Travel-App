import { DestinationType } from "@/lib/validations/destination";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export type FavoriteDestinationsApiResponse = {
  destinations: DestinationType[];
  nextCursor: number | null;
};

type useFavoriteDestinationsParams = {
  userId: string;
};

export const useFavoriteDestinations = ({
  userId,
}: useFavoriteDestinationsParams) => {
  return useInfiniteQuery({
    queryKey: ["user", userId, "favorite-destinations"],
    queryFn: async ({ pageParam }) => {
      const params: Record<string, any> = {};
      params.limit = 6;
      if (pageParam) {
        params.cursor = pageParam;
      }
      const { data } = await axios.get<FavoriteDestinationsApiResponse>(
        "/api/destinations/favorites",
        { params },
      );
      return data;
    },
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};
