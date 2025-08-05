import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCollection = (collectionId: string, enabled = true) => {
  //   return useQuery({
  //     queryKey: ["collection", collectionId],
  //     queryFn: () => async () => {
  //         const res = await axios
  //     },
  //     enabled,
  //     cacheTime: 1000 * 60 * 5,
  //   });
};
