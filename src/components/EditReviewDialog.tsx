import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { editReviewSchema, EditReviewType } from "@/lib/validations/review";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import InteractiveStarRating from "./InteractiveStarRating";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editReview } from "@/lib/actions/review";
import { toast } from "sonner";
import LoadingButton from "./LoadingButton";

type EditCollectionDialogProps = {
  reviewId: string;
  userId: string;
  destinationName: string;
  originalData: EditReviewType;
  open: boolean;
  setOpen: (val: boolean) => void;
};

const EditReviewDialog = ({
  reviewId,
  userId,
  originalData,
  destinationName,
  open,
  setOpen,
}: EditCollectionDialogProps) => {
  const form = useForm<EditReviewType>({
    resolver: zodResolver(editReviewSchema),
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: editReview,
    onSuccess: async (data) => {
      if (!data.success) {
        throw new Error(data.error);
      }

      await queryClient.invalidateQueries({
        queryKey: ["user", data.review.user, "reviews"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["reviews", data.review.destination],
      });
    },
  });

  const onSubmit = (editData: EditReviewType) => {
    mutate(
      { editData, reviewId },
      {
        onSuccess: () => {
          toast.success("Review updated");
        },
        onError: (error) => {
          toast.error(error.message);
        },
        onSettled: () => {
          setOpen(false);
        },
      },
    );
  };

  useEffect(() => {
    if (open && originalData) {
      form.reset({
        rating: originalData.rating,
        comment: originalData.comment,
      });
    }
  }, [open, originalData]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="gap-2 space-y-8">
        <DialogHeader className="mb-0">
          <DialogTitle>Share Your Experience</DialogTitle>
          <DialogDescription className="mb-4">
            Tell other travelers about your visit to {destinationName}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mb-0 space-y-6"
          >
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Rating</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <InteractiveStarRating
                        defaultValue={form.getValues("rating")}
                        onRate={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>Click to rate.</FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Review</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder={`Enter your experience visiting ${destinationName}...`}
                      className="field-sizing-fixed resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <LoadingButton loading={isPending} type="submit">
                Update Review
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditReviewDialog;
