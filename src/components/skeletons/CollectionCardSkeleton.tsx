// import React from "react";
// import { Skeleton } from "@/components/ui/skeleton";

// const CollectionCardSkeleton = () => {
//   return (
//     <div
//       className="space-y-3 rounded-xl border p-4 shadow-sm"
//       aria-hidden="true"
//     >
//       <Skeleton className="h-48 w-full rounded-md" />
//       <Skeleton className="h-6 w-3/4" />
//       <Skeleton className="h-4 w-1/2" />
//       <Skeleton className="h-4 w-2/3" />
//     </div>
//   );
// };

// export default CollectionCardSkeleton;

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CollectionCardSkeleton = () => {
  return (
    <Card className="overflow-hidden pt-0">
      {/* Cover Image Skeleton */}
        <div className="aspect-video overflow-hidden">
          <Skeleton className="h-full w-full" />
        </div>

      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            {/* Title skeleton */}
            <Skeleton className="h-5 w-3/4" />
            {/* Description skeleton */}
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="-mt-3 flex flex-1 flex-col justify-between gap-4 pt-0">
        {/* Place Previews Skeleton */}
        <div className="">
          {/* Avatar circles skeleton */}
          <div className="mb-3 flex -space-x-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                className="border-background h-8 w-8 rounded-full border-2"
                style={{ zIndex: 4 - index }}
              />
            ))}
          </div>

          {/* Sample place names skeleton */}
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Skeleton className="h-3 w-52" />
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="h-3 w-42" />
            </div>
            {/* <Skeleton className="h-3 w-20" /> */}
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CollectionCardSkeleton;
