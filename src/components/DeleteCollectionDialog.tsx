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
import { useDeleteCollectionMutation } from "@/app/hooks/useDeleteCollectionMutation";
import { usePathname, useRouter } from "next/navigation";

interface DeleteCollectionDialogProps {
  collectionId: string;
  collectionName: string;
  userId: string;
  open: boolean;
  setOpen: (val: boolean) => void;
}

const DeleteCollectionDialog = ({
  collectionId,
  collectionName,
  open,
  setOpen,
}: DeleteCollectionDialogProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const mutation = useDeleteCollectionMutation();

  const onDelete = async () => {
    mutation.mutate(collectionId, {
      onSettled: () => {
        setOpen(false);
        // if (pathname === `/collections/${collectionId}`) {
        //   router.replace("/profile?tab=collections")
        // }
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />{" "}
            Delete Collection
          </DialogTitle>
          <DialogDescription className="text-left">
            You're about to delete{" "}
            <span className="text-foreground font-semibold">
              "{collectionName}"
            </span>
            . This will permanently remove the collection and all its
            destinations from your profile.
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
            type="button"
            loading={mutation.isPending}
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

export default DeleteCollectionDialog;
