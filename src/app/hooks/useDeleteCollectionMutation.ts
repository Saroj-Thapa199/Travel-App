import {
  createCollection,
  deleteCollection,
  editCollection,
} from "@/lib/actions/collection";
import { CollectionsResponse } from "@/lib/types";
import {
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

export const useDeleteCollectionMutation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCollection,
    onSuccess: async (data) => {
      if (!data.success) {
        throw new Error(data.error);
      }

      const queryFilter: QueryFilters = {
        queryKey: ["user", data.userId, "collections"],
      };

      queryClient.setQueryData<CollectionsResponse>(
        ["user", data.userId, "collections"],
        (oldData) => {
          return oldData?.filter(
            (prevData) => prevData._id !== data.collectionId,
          );
        },
      );

      if (pathname === `/collections/${data.collectionId}`) {
        router.replace("/profile?tab=collections");
      }

      queryClient.invalidateQueries(queryFilter);

      queryClient.removeQueries({
        queryKey: ["collections", data.collectionId],
      });

      toast("Collection deleted");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to delete collection");
      return error;
    },
  });
};
