"use client";

import { extendVariants, Button } from "@nextui-org/react";

export const SSButton = extendVariants(Button, {
  variants: {
    variant: {
      icon: "",
    },
    color: {
      primary: "bg-primary font-bold",
      primaryWhite:
        "bg-white text-primary font-bold shadow-[0_0_4px_0px_rgba(0,0,0,0.25)]",
      secondary: "bg-primary text-white font-bold border-2 border-white",
      secondaryWhite:
        "bg-white text-primary font-bold border-2 border-primary shadow-[0_0_4px_0px_rgba(0,0,0,0.25)]",
    },
    size: {
      xs: "px-3 py-3 text-xs h-4",
      sm: "px-3 py-3 text-sm h-5",
      md: "px-2.5 py-1.5 h-8 text-base",
      lg: "px-3 py-2 h-9 text-base",
      xl: "px-4 py-3 h-11 text-base",
    },
    radius: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "xl",
    radius: "md",
  },
});
