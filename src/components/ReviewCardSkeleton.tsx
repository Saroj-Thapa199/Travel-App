import React from "react";
import { Skeleton } from "./ui/skeleton";

const ReviewCardSkeleton = () => {
  return (
    <div
      className="bg-background rounded-lg border p-4 transition-all hover:shadow-sm"
      aria-hidden="true"
    >
      <div className="flex items-start gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1">
          <div className="flex h-10 items-center justify-between">
            <div className="flex h-full flex-col justify-between py-0.5">
              <Skeleton className="h-6 w-36 my-auto" />
            </div>
            <Skeleton className="h-4 w-20 rounded-full max-sm:hidden" />
          </div>
          <div className="mt-4 space-y-2.5">
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-3/4" />
          </div>
          <div className="my-4 flex items-center justify-between">
            <div className="flex gap-4">
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCardSkeleton;
