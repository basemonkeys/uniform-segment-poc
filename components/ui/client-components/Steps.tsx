"use client";

import { createContext, useState } from "react";
import Link from "next/link";

import { cn } from "@/utils";

import { Button } from "../button";
import { LightBackground, DarkBackground } from "@/components/ui/Backgrounds";

import { StepsProps } from "@/components/uniform/content/Steps";

export enum StepsVariant {
  DarkBackground = "darkBackground",
}

export const StepsContext = createContext("");

export function Steps(props: StepsProps) {
  const { title, component, children } = props;
  const { variant } = component;
  const [stepsBackground, setStepsBackground] = useState(variant);
  const isDark = stepsBackground;

  return (
    <div
      id={component._id}
      className={cn("relative", isDark ? "bg-primary" : "bg-white")}
    >
      {isDark ? <DarkBackground /> : <LightBackground />}
      <div className="relative flex flex-col items-center justify-center space-y-20 px-20 py-20 lg:px-20 lg:py-32">
        <h2 className={cn("text-center", isDark && "text-white")}>{title}</h2>
        {/* TODO: look into this and remove ts ignore */}
        {/* @ts-ignore */}
        <StepsContext.Provider value={{ stepsBackground }}>
          <div className="flex flex-col items-start justify-center gap-12 text-center lg:flex-row">
            <div
              className={cn(
                "absolute top-[300px] z-0 hidden h-[21px] w-[725px] bg-primary-dark lg:block",
                isDark && "bg-white",
              )}
            ></div>
            {children}
          </div>
          <Button
            variant={isDark ? "primaryWhite" : "primary"}
            size="xl"
            asChild
          >
            <Link href="/eligibility/check-eligibility">Check Eligibility</Link>
          </Button>
        </StepsContext.Provider>
      </div>
    </div>
  );
}
