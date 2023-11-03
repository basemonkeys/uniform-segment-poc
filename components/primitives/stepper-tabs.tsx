"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/utils";

const StepperTabs = TabsPrimitive.Root;

const StepperTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn("inline-flex w-full", className)}
    {...props}
  />
));
StepperTabsList.displayName = TabsPrimitive.List.displayName;

const StepperTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "group flex w-1/4 flex-col items-center justify-center whitespace-nowrap border-b-6 border-default px-3 py-1.5 font-bold text-default ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none",
      className,
    )}
    {...props}
  />
));
StepperTabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const StepperTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
StepperTabsContent.displayName = TabsPrimitive.Content.displayName;

export { StepperTabs, StepperTabsList, StepperTabsTrigger, StepperTabsContent };
