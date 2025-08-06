import { createCollection } from "@/lib/actions/collection";
import {
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateCollectionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCollection,
    onSuccess: async (data) => {
      if (!data.success) {
        throw new Error(data.error);
      }

      const queryFilter: QueryFilters = {
        queryKey: ["user", data.userId, "collections"],
      };

      await queryClient.invalidateQueries(queryFilter);

      toast.success("Collection created");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to create collection");
      return error;
    },
  });
};
