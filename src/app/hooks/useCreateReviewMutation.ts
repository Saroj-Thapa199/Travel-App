import { createReview } from "@/lib/actions/review";
import {
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useCreateReviewMutation = () => {
  const queryClient = useQueryClient();

  const session = useSession();

  return useMutation({
    mutationFn: createReview,
    onSuccess: async (data) => {
      if (!data.success) {
        throw new Error(data.error);
      }

      const newReview = data.review

      const queryFilter = {
        queryKey: ["reviews"],
        predicate: (query) =>
          query.queryKey[1] === newReview?.destination &&
          (query.queryKey.includes("all") ||
            query.queryKey.includes("stats") ||
            query.queryKey.includes(
              `${newReview.rating} star${newReview?.rating > 1 ? "s" : ""}`,
            )),
      } satisfies QueryFilters;

      await queryClient.invalidateQueries(queryFilter);

      if (session.data?.user.id) {
        await queryClient.invalidateQueries({
          queryKey: ["user", session.data.user.id, "reviews"],
        });
      }
      // await queryClient.refetchQueries(queryFilter);
    },
    onError: (error) => {
      console.log(error);
      return error;
    },
  });
};
