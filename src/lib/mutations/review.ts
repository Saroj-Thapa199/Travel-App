import {
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createReview } from "../actions/review";
import { populatedReviewSchema } from "../validation";

export const useCreateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: async ({ success, data }) => {
      const newReview = populatedReviewSchema.parse(data);
      if (!success || !newReview) return;
      const queryFilter = {
        queryKey: ["reviews"],
        predicate: (query) =>
          query.queryKey[1] === newReview?.destination &&
          (query.queryKey.includes("all") ||
            query.queryKey.includes("stats") ||
            query.queryKey.includes(
              `${newReview.rating} star${newReview.rating > 1 ? "s" : ""}`,
            )),
      } satisfies QueryFilters;

      //   await queryClient.invalidateQueries(queryFilter);
      await queryClient.refetchQueries(queryFilter);
    },
    onError: (error) => {
      console.log(error);
      return error;
    },
  });
};
