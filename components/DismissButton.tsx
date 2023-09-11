"use client";

import { ComponentProps } from "@uniformdev/canvas-next-rsc";

import classNames from "classnames";

// TODO: abstract these from Banner into util
import { getStateClasses, getTextClass } from "./canvas/Banner";

import { XMarkIcon } from "@heroicons/react/20/solid";

type DismissButtonProps = Omit<ComponentProps, "context"> & {
  variant?: string;
};

export const DismissButton: React.FC<DismissButtonProps> = ({ component }) => {
  const { variant } = component;

  return (
    <div
      className={classNames(
        "rounded-lg border-1 border-transparent p-1",
        getStateClasses(variant),
      )}
    >
      <XMarkIcon
        className={classNames(
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
