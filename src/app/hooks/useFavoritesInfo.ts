import { FavoritesInfo } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFavoritesInfo = (
  destinationId: string,
  initialState: FavoritesInfo,
) => {
  return useQuery({
    queryKey: ["favorites-info", destinationId],
    queryFn: async () => {
      const { data } = await axios.get<FavoritesInfo>(
        `/api/${destinationId}/favorites`,
      );
      return data;
    },
    initialData: initialState,
    staleTime: Infinity,
  });
};

export default useFavoritesInfo;
