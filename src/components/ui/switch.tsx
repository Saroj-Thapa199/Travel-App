"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "default" | "lg";
};

const sizeClasses = {
  default: {
    root: "h-[1.15rem] w-8",
    thumb: "size-4",
    translate: "data-[state=checked]:translate-x-[calc(100%-2px)]",
  },
  lg: {
    root: "h-6 w-11",
    thumb: "size-5",
    translate: "data-[state=checked]:translate-x-[calc(1.4rem-1px)]",
  },
};

function Switch({ className, size = "default", ...props }: SwitchProps) {
  const sizes = sizeClasses[size];

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer focus-visible:border-ring focus-visible:ring-ring/50 inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",
        sizes.root,
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none rounded-full ring-0 transition-transform",
          sizes.thumb,
          "data-[state=unchecked]:translate-x-0",
          sizes.translate,
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
