import { forwardRef } from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300",
  {
    variants: {
      variant: {
        primary: "bg-primary font-bold text-white hover:bg-primary-dark",
        primaryWhite:
          "bg-white text-primary font-bold shadow-[0_0_4px_0px_rgba(0,0,0,0.25)]",
        secondary:
          "bg-primary text-white font-bold border-2 border-white hover:bg-primary-dark",
        secondaryWhite:
          "bg-white text-primary font-bold border-2 border-primary shadow-[0_0_4px_0px_rgba(0,0,0,0.25)]",
        success: "bg-success text-white font-bold hover:bg-success-dark",
        warning: "bg-warning text-white font-bold hover:bg-warning-dark",
        danger: "bg-danger text-white font-bold hover:bg-danger-dark",
      },
      size: {
        xs: "px-3 py-3 text-xs h-4 rounded-sm",
        sm: "px-3 py-3 text-sm h-5 rounded-sm",
        md: "px-2.5 py-1.5 h-8 text-base rounded-md",
        lg: "px-3 py-2 h-9 text-base rounded-md",
        xl: "px-4 py-3 h-11 text-base rounded-md",
        icon: "h-10 w-10",
      },
      radius: {
        md: "rounded-md",
        full: "rounded-full",
      },
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, radius, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <>
        <Comp
          className={cn(buttonVariants({ variant, size, radius, className }))}
          ref={ref}
          {...props}
        />
      </>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
