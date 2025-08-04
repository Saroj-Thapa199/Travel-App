"use client";

import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { TrekRouteType } from "@/lib/validations/routes";
import { Mountain } from "lucide-react";
import type React from "react";
import type { Dispatch, SetStateAction } from "react";
import TrekRouteInfo from "@/components/TrekRouteInfo";

type TrekRouteDialogProps = {
  trekData: Omit<TrekRouteType, "_id">;
  trekDialogOpen: boolean;
  setTrekDialogOpen: Dispatch<SetStateAction<boolean>>;
  handleSubmit: (data: Omit<TrekRouteType, "_id">) => Promise<void>;
  loading: boolean;
  setTab: Dispatch<SetStateAction<string>>;
};

const TrekRouteDialog = ({
  trekData,
  trekDialogOpen,
  setTrekDialogOpen,
  handleSubmit,
  loading,
  setTab,
}: TrekRouteDialogProps) => {
  const handleConfirm = async () => {
    await handleSubmit(trekData);
    setTrekDialogOpen(false);
    setTab("route-form");
  };

  return (
    <Dialog open={trekDialogOpen} onOpenChange={setTrekDialogOpen}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
        <ScrollArea >
          <DialogHeader className="pb-3">
            <DialogTitle className="flex items-center gap-2">
              <Mountain className="h-5 w-5" />
              Confirm Trek Details
            </DialogTitle>
            <DialogDescription>
              Review the trek information before adding it to the system.
            </DialogDescription>
          </DialogHeader>

          <TrekRouteInfo trekData={trekData} />

          <DialogFooter className="mt-4">
            <Button
              disabled={loading}
              variant="outline"
              onClick={() => setTrekDialogOpen(false)}
            >
              Cancel
            </Button>
            <LoadingButton loading={loading} onClick={handleConfirm}>
              Confirm & Add Trek
            </LoadingButton>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TrekRouteDialog;
