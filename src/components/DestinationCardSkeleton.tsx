import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const DestinationCardSkeleton = () => {
  return (
    <div className="rounded-xl border p-4 shadow-sm space-y-3">
      <Skeleton className="h-48 w-full rounded-md" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
};

export default DestinationCardSkeleton;
