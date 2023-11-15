"use client";

import { useAtomValue } from "jotai";

import { cn } from "@/utils";
import { stepsBackgroundAtom } from "@/utils/uiState";

import type { StepItemProps } from "@/components/uniform/content/StepItem";

import { StepsVariant } from "@/components/uniform/content/Steps";

export function StepItem(props: StepItemProps) {
  const { stepNumber, title, description } = props;
  const isDark =
    useAtomValue(stepsBackgroundAtom) === StepsVariant.DarkBackground;

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
