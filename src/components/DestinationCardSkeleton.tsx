import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const DestinationCardSkeleton = () => {
  return (
    <div
      className="space-y-3 rounded-xl border p-4 shadow-sm"
      aria-hidden="true"
    >
      <Skeleton className="h-48 w-full rounded-md" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
};

export default DestinationCardSkeleton;
