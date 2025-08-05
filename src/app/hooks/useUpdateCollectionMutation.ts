import { createCollection, editCollection } from "@/lib/actions/collection";
import {
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateCollectionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editCollection,
    onSuccess: async (data) => {
      if (!data.success) {
        throw new Error(data.error);
      }

      const queryFilter: QueryFilters = {
        queryKey: ["collections", "user", data.userId],
      };

      await queryClient.invalidateQueries(queryFilter);

      toast.success("Collection updated");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to update collection");
      return error;
    },
  });
};
