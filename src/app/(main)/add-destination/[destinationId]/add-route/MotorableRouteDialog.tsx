"use client";

import LoadingButton from "@/components/LoadingButton";
import MotorableRouteInfo from "@/components/MotorableRouteInfo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { MotorableRouteType } from "@/lib/validations/routes";
import { Route } from "lucide-react";
import type React from "react";
import type { Dispatch, SetStateAction } from "react";

type MotorableRouteDialogProps = {
  motorableData: Omit<MotorableRouteType, "_id">;
  motorableDialogOpen: boolean;
  setMotorableDialogOpen: Dispatch<SetStateAction<boolean>>;
  handleSubmit: (data: Omit<MotorableRouteType, "_id">) => Promise<void>;
  loading: boolean;
  setTab: Dispatch<SetStateAction<string>>;
};

const MotorableRouteDialog = ({
  motorableData,
  motorableDialogOpen,
  setMotorableDialogOpen,
  handleSubmit,
  loading,
  setTab,
}: MotorableRouteDialogProps) => {
  const handleConfirm = async () => {
    await handleSubmit(motorableData);
    setMotorableDialogOpen(false);
    setTab("route-form");
  };

  return (
    <Dialog open={motorableDialogOpen} onOpenChange={setMotorableDialogOpen}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader className="pb-3">
          <DialogTitle className="flex items-center gap-2">
            <Route className="h-5 w-5" />
            Confirm Route Details
          </DialogTitle>
          <DialogDescription>
            Review the route information before adding it to the system.
          </DialogDescription>
        </DialogHeader>

        {/* Route Summary */}
        <MotorableRouteInfo motorableData={motorableData} />

        <DialogFooter className="mt-4">
          <Button
            disabled={loading}
            variant="outline"
            onClick={() => setMotorableDialogOpen(false)}
          >
            Cancel
          </Button>
          <LoadingButton onClick={handleConfirm} loading={loading}>
            Confirm & Add Route
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MotorableRouteDialog;
