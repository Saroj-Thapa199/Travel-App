import { Utensils } from "lucide-react";
import React from "react";

interface LocalCuisinesProps {
  localCuisines: {
    name: string;
    description: string;
  }[];
}

const LocalCuisines = ({ localCuisines }: LocalCuisinesProps) => {
  return (
    <section>
      <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold">
        <Utensils className="size-6" /> Local Cuisines
      </h2>
      <div className="space-y-3">
        {localCuisines.map((cuisine, index) => (
          <div key={index} className="flex gap-3 rounded-lg border p-4">
            {/* <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
              {index + 1}
            </div> */}
            <div>
              <h3 className="mb-1 font-semibold">{cuisine.name}</h3>
              <p className="text-muted-foreground text-sm">
                {cuisine.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LocalCuisines;
