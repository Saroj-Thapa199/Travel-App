"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const opts = [
  { key: "trailDescription", label: "Trail Description" },
  { key: "duration", label: "Estimated Duration" },
  { key: "distance", label: "Total Distance" },
  { key: "difficulty", label: "Difficulty Level" },
  { key: "altitudeGain", label: "Altitude Gain" },
  { key: "maxAltitude", label: "Maximum Altitude" },
  { key: "checkpoints", label: "Key Checkpoints" },
  { key: "note", label: "Additional Notes" },
];

type TrekkingRouteOptionsDialogProps = {
  values: {
    duration: boolean;
    distance: boolean;
    difficulty: boolean;
    altitudeGain: boolean;
    maxAltitude: boolean;
    trailDescription: boolean;
    checkpoints: boolean;
    note: boolean;
  };
  setValues: Dispatch<
    SetStateAction<TrekkingRouteOptionsDialogProps["values"]>
  >;
};

const TrekkingRouteOptionsDialog = ({
  values,
  setValues,
}: TrekkingRouteOptionsDialogProps) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(values);

  const handleToggle = (key: keyof typeof options) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCancel = () => {
    // setOptions(values);
    setOpen(false);
  };

  const handleDone = () => {
    setValues(options);
    setOpen(false);
  };

  useEffect(() => {
    if (open === true) {
      setOptions(values);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>Customize Trekking Fields</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Trekking Route Fields</DialogTitle>
          <DialogDescription>
            Choose the fields you'd like to include for each trekking route.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2">
          {opts.map(({ key, label }) => (
            <div key={key} className="flex items-center space-x-3">
              <Checkbox
                id={key}
                checked={options[key as keyof typeof options]}
                disabled={key === "trailDescription"}
                onCheckedChange={() => {
                  if (key === "trailDescription") return;
                  handleToggle(key as keyof typeof options);
                }}
              />
              <Label htmlFor={key} className="cursor-pointer">
                {label}
              </Label>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant={"secondary"} onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleDone}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TrekkingRouteOptionsDialog;
