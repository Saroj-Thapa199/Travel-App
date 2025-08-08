import { createCollection, editCollection } from "@/lib/actions/collection";
import {
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateCollectionMutation = (collectionId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editCollection,
    onSuccess: async (data) => {
      if (!data.success) {
        throw new Error(data.error);
      }

      const queryFilter: QueryFilters = {
        queryKey: ["user", data.userId, "collections"],
      };

      await queryClient.invalidateQueries(queryFilter);
      await queryClient.invalidateQueries({queryKey: ["collection", collectionId]});

      toast.success("Collection updated");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to update collection");
      return error;
    },
  });
};
