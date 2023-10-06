import {
  registerUniformComponent,
  ComponentProps,
} from "@uniformdev/canvas-next-rsc";

import Link from "next/link";

import { DismissButton } from "@/components/ui/dismiss-button";

import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";

import { cn } from "@/utils";

type BannerProps = ComponentProps<{
  message: string;
  callToAction?: string;
  callToActionLink?: {
    path: string;
  };
  dismissable?: boolean;
}>;

export enum BannerVariant {
  Primary = "primary",
  Success = "success",
  Danger = "danger",
  Warning = "warning",
  Info = "info",
}

const getBackgroundClass = (variantId?: string) => {
  switch (variantId) {
    case BannerVariant.Primary:
      return "bg-primary";
    case BannerVariant.Success:
      return "bg-success-light";
    case BannerVariant.Danger:
      return "bg-danger-light";
    case BannerVariant.Warning:
      return "bg-warning-light";
    case BannerVariant.Info:
      return "bg-info-light";
    default:
      return "bg-default-light";
  }
};

export const getTextClass = (variantId?: string) => {
  switch (variantId) {
    case BannerVariant.Primary:
      return "!text-white";
    case BannerVariant.Success:
      return "!text-success-dark";
    case BannerVariant.Danger:
      return "!text-danger-dark";
    case BannerVariant.Warning:
      return "!text-warning-dark";
    case BannerVariant.Info:
      return "!text-info-dark";
    default:
      return "";
  }
};

export const getStateClasses = (variantId?: string) => {
  switch (variantId) {
    case BannerVariant.Primary:
      return "hover:bg-primary-dark active:shadow-inner";
    case BannerVariant.Success:
      return "hover:bg-success-hover active:shadow-inner";
    case BannerVariant.Danger:
      return "hover:bg-danger-hover active:shadow-inner";
    case BannerVariant.Warning:
      return "hover:bg-warning-hover active:shadow-inner";
    case BannerVariant.Info:
      return "hover:bg-info-hover active:shadow-inner";
    default:
      return "hover:bg-default-hover active:shadow-inner";
  }
};

const Banner: React.FC<BannerProps> = ({
  component,
  message,
  callToAction,
  callToActionLink,
  dismissable,
}) => {
  const { variant } = component;

  return (
    <div className={cn("w-full", getBackgroundClass(variant))}>
      <div className="container px-10 py-2 lg:px-16">
        <div className="flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-3">
          {variant === BannerVariant.Success && (
            <CheckCircleIcon className="h-4 w-4 text-success" />
          )}
          {variant === BannerVariant.Danger && (
            <XCircleIcon className="h-4 w-4 text-danger" />
          )}
          {variant === BannerVariant.Warning && (
            <ExclamationTriangleIcon className="h-4 w-4 text-warning" />
          )}
          {variant === BannerVariant.Info && (
            <InformationCircleIcon className="h-4 w-4 text-info" />
          )}
          <p
            className={cn(
              "text-sm text-black md:text-base",
              getTextClass(variant),
            )}
          >
            {message}
          </p>
          {callToAction && callToActionLink && (
            <Link
              href={callToActionLink.path}
              className={cn(
                "text-sm font-semibold underline md:text-base",
                getTextClass(variant),
              )}
            >
              {callToAction}
            </Link>
          )}
          {dismissable && <DismissButton variant={variant} />}
        </div>
      </div>
    </div>
  );
};

[
  undefined,
  BannerVariant.Primary,
  BannerVariant.Success,
  BannerVariant.Danger,
  BannerVariant.Warning,
  BannerVariant.Info,
].forEach((variantId) => {
  registerUniformComponent({
    type: "banner",
    component: Banner,
    variantId,
  });
});

export default Banner;
