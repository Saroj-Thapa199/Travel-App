import { FavoritesInfo } from "@/lib/types";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import ProtectedActionButton from "./ProtectedActionButton";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import useFavoritesInfo from "@/app/hooks/useFavoritesInfo";
import axios, { AxiosError } from "axios";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface AddToFavoritesBtnProps {
  destinationId: string;
  initialState: FavoritesInfo;
  btnStyle: "icon" | "button-text";
}

const AddToFavoritesBtn = ({
  destinationId,
  initialState,
  btnStyle,
}: AddToFavoritesBtnProps) => {
  const { data: sessionData, status } = useSession();

  const queryClient = useQueryClient();

  const { data } = useFavoritesInfo(destinationId, initialState);

  const queryKey: QueryKey = ["favorites-info", destinationId];

  const { mutate } = useMutation({
    mutationFn: () =>
      data.addedToFavoritesByUser
        ? axios.delete(`/api/${destinationId}/favorites`)
        : axios.post(`/api/${destinationId}/favorites`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<FavoritesInfo>(queryKey);

      queryClient.setQueryData<FavoritesInfo>(queryKey, () => ({
        favorites:
          (previousState?.favorites || 0) +
          (previousState?.addedToFavoritesByUser ? -1 : 1),
        addedToFavoritesByUser: !previousState?.addedToFavoritesByUser,
      }));

      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error(error);
      if (error instanceof AxiosError && error.response?.data.error) {
        toast.warning(error.response?.data.error);
        return
      }
      toast.error("Something went wrong. Please try again");
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey})
    }
  });

  return btnStyle === "icon" ? (
    <ProtectedActionButton
      variant="outline"
      size="icon"
      className={cn(
        "border-white/20 bg-black/30 text-white hover:bg-black/50 hover:text-white",
        "dark:border-white/20 dark:bg-black/30 dark:text-white dark:hover:bg-black/50 dark:hover:text-white",
        data.addedToFavoritesByUser &&
          "border-red-400 bg-red-500/70 text-white hover:bg-red-500",
        data.addedToFavoritesByUser &&
          "dark:border-red-400 dark:bg-red-500/70 dark:text-white dark:hover:bg-red-500",
      )}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        mutate()
      }}
    >
      <Heart
        className={cn("h-4 w-4", data.addedToFavoritesByUser && "fill-current")}
      />
    </ProtectedActionButton>
  ) : (
    <Button
      variant={data.addedToFavoritesByUser ? "outline" : "outline"}
      disabled={status === "unauthenticated" || !sessionData?.user.id}
      className="w-full"
      onClick={() => mutate()}
    >
      <Heart
        className={cn(
          "sie-4",
          data.addedToFavoritesByUser ? "fill-current" : "",
        )}
      />
      {data.addedToFavoritesByUser
        ? `Remove from Favorites: ${data.favorites}`
        : `Add to Favorites: ${data.favorites}`}
    </Button>
  );
};

export default AddToFavoritesBtn;
