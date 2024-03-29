"use client";

import { cn } from "@/utils";

import {
  getStateClasses,
  getTextClass,
} from "@/components/uniform/global/Banner";

import { XMarkIcon } from "@heroicons/react/20/solid";

type DismissButtonProps = {
  variant?: string;
};

export const DismissButton = ({ variant }: DismissButtonProps) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-transparent p-1",
        getStateClasses(variant),
      )}
    >
      <XMarkIcon
        className={cn(
          "h-4 w-4 cursor-pointer font-extrabold",
          getTextClass(variant),
        )}
        onClick={() => {
          console.log("close");
        }}
      />
    </div>
  );
};
