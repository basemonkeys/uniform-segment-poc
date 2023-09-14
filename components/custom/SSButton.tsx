"use client";

import { extendVariants } from "@nextui-org/react";
// import { useButton, extendVariants, Spinner } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
// import { forwardRef } from "@nextui-org/system";

// const CustomButton = forwardRef((props, ref) => {
//   const {
//     domRef,
//     children,
//     // classNames,
//     // drips,
//     spinnerSize,
//     spinner = <Spinner color="current" size={spinnerSize} />,
//     spinnerPlacement,
//     startContent,
//     endContent,
//     isLoading,
//     disableRipple,
//     getButtonProps,
//   } = useButton({
//     ref,
//     ...props,
//   });

//   return (
//     <button ref={domRef} {...getButtonProps()}>
//       {startContent}
//       {isLoading && spinnerPlacement === "start" && spinner}
//       {children}
//       {isLoading && spinnerPlacement === "end" && spinner}
//       {endContent}
//       {/* {!disableRipple && <Drip drips={drips} />} */}
//     </button>
//   );
// });

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
      success: "bg-success-dark text-white font-bold",
      warning: "bg-warning text-white font-bold",
      error: "bg-error-dark text-white font-bold",
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
    isDisabled: {
      true: "opacity-50 pointer-events-none",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "xl",
    radius: "md",
  },
});

// SSButton.displayName = "SSButton";
// export default SSButton;
