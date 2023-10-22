"use client";

import { useContext } from "react";
import { registerUniformComponent } from "@uniformdev/canvas-next-rsc";

import { StepsContext } from "@/components/ui/client-components/Steps";

import { StepItemProps } from "@/components/uniform/content/StepItem";

import { cn } from "@/utils";

export function StepItem(props: StepItemProps) {
  const { stepNumber, title, description } = props;
  // TODO: look into this and remove ts ignore
  //   @ts-ignore
  let { stepsBackground } = useContext(StepsContext);
  const isDark = stepsBackground;

  return (
    <div className="z-10 flex flex-col items-center justify-center gap-3">
      <div
        className={cn(
          "flex h-[125px] w-[125px] flex-col items-center justify-center rounded-full bg-primary-dark text-white",
          isDark && "bg-white text-primary-dark",
        )}
      >
        <h3>Step</h3>
        <h3>{stepNumber}</h3>
      </div>
      <div className={cn("max-w-[306px]", isDark && "text-white")}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

registerUniformComponent({
  type: "stepItem",
  component: StepItem,
});
