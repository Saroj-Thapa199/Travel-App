import { createCollection } from "@/lib/actions/collection";
import {
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useCreateCollectionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCollection,
    onSuccess: async (data) => {
      if (!data.success) {
        throw new Error(data.error);
      }

      const queryFilter: QueryFilters = {
        queryKey: ["collections", "user", data.userId],
      };

      queryClient.invalidateQueries(queryFilter);

      await queryClient.refetchQueries(queryFilter);
    },
    onError: (error) => {
      console.log(error);
      return error;
    },
  });
};
