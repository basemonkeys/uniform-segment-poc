"use client";

import { cn } from "@/utils";

// TODO: make these into utils?
import { getStateClasses, getTextClass } from "../../uniform/global/Banner";

import { XMarkIcon } from "@heroicons/react/20/solid";

type DismissButtonProps = {
  variant?: string;
};

export const DismissButton: React.FC<DismissButtonProps> = ({ variant }) => {
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
