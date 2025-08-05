"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Globe, Lock, MapPin, Plus, Trash2 } from "lucide-react";
import axios from "axios";
import {
  createCollectionSchema,
  type CreateCollectionType,
} from "@/lib/validations/collection";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CollectionType } from "@/lib/types";
import { useUpdateCollectionMutation } from "@/app/hooks/useUpdateCollectionMutation";
import LoadingButton from "./LoadingButton";
import { deleteCollection } from "@/lib/actions/collection";
import { useDeleteCollectionMutation } from "@/app/hooks/useDeleteCollectionMutation";

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
  const mutation = useDeleteCollectionMutation();

  const onDelete = async () => {
    mutation.mutate(collectionId, {
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
