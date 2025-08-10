"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoadingButton from "./LoadingButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "@/lib/actions/review";
import { toast } from "sonner";

interface DeleteReviewDialogProps {
  reviewId: string;
  userId: string;
  open: boolean;
  setOpen: (val: boolean) => void;
}

const DeleteReviewDialog = ({
  reviewId,
  open,
  setOpen,
}: DeleteReviewDialogProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteReview,
    onSuccess: async (data) => {
      if (!data.success) {
        throw new Error(data.error);
      }

      await queryClient.invalidateQueries({
        queryKey: ["user", data.userId, "reviews"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["reviews", data.destinationId],
      });
    },
  });
  const onDelete = () => {
    mutate(reviewId, {
        onSuccess: () => {
            toast.success("Review deleted")
        },
        onError: (error) => {
            toast.error(error.message)
        },
      onSettled: () => {
        setOpen(false);
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />{" "}
            Delete Review
          </DialogTitle>
          <DialogDescription className="text-left">
            You're about to delete a review. This will permanently remove the
            review and all its data from your profile and the server.
            <span className="text-muted-foreground mt-2 block text-sm">
              This action cannot be undone.
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={isPending}
            type="button"
            variant={"destructive"}
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
            Delete Forever
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteReviewDialog;
