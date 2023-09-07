// TODO: I need this for an on click, but this also needs to be a default server component since it uses registerUniformComponent.

// "use client";

import classNames from "classnames";

import {
  registerUniformComponent,
  ComponentProps,
} from "@uniformdev/canvas-next-rsc";

import Link from "next/link";

import Container from "../Container";
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

type BannerProps = ComponentProps<{
  dismissable?: boolean;
  message: string;
  callToAction?: string;
  callToActionLink?: {
    path: string;
  };
}>;

enum BannerVariant {
  Primary = "primary",
  Success = "success",
  Error = "error",
  Warning = "warning",
  Info = "info",
}

const getBackgroundClass = (variantId?: string) => {
  switch (variantId) {
    case BannerVariant.Primary:
      return "bg-primary";
    case BannerVariant.Success:
      return "bg-success-light";
    case BannerVariant.Error:
      return "bg-error-light";
    case BannerVariant.Warning:
      return "bg-warning-light";
    case BannerVariant.Info:
      return "bg-info-light";
    default:
      return "bg-gray-100";
  }
};

const getTextClass = (variantId?: string) => {
  switch (variantId) {
    case BannerVariant.Primary:
      return "!text-white";
    case BannerVariant.Success:
      return "!text-success-dark";
    case BannerVariant.Error:
      return "!text-error-dark";
    case BannerVariant.Warning:
      return "!text-warning-dark";
    case BannerVariant.Info:
      return "!text-info-dark";
    default:
      return "text-black";
  }
};

const getStateClasses = (variantId?: string) => {
  switch (variantId) {
    case BannerVariant.Primary:
      return "hover:bg-primary-dark active:border-1 active:shadow-inner";
    case BannerVariant.Success:
      return "hover:bg-success-hover active:border-1 active:border-success-dark";
    case BannerVariant.Error:
      return "hover:bg-error-hover active:border-1 active:border-error-dark";
    case BannerVariant.Warning:
      return "hover:bg-warning-hover active:border-1 active:border-warning-dark";
    case BannerVariant.Info:
      return "hover:bg-info-hover active:border-1 active:border-info-dark";
    default:
      return "hover:bg-default-hover active:border-1 active:shadow-inner";
  }
};

const Banner: React.FC<BannerProps> = ({
  component,
  dismissable,
  message,
  callToAction,
  callToActionLink,
}) => {
  const { variant } = component;
  console.log(callToActionLink);

  return (
    <div className={classNames("w-full", getBackgroundClass(variant))}>
      <Container className="px-10 lg:px-16 py-2">
        <div className="flex justify-center items-center gap-3">
          {variant === BannerVariant.Success && (
            <CheckCircleIcon className="w-4 h-4 text-success" />
          )}
          {variant === BannerVariant.Error && (
            <XCircleIcon className="w-4 h-4 text-error" />
          )}
          {variant === BannerVariant.Warning && (
            <ExclamationTriangleIcon className="w-4 h-4 text-warning" />
          )}
          {variant === BannerVariant.Info && (
            <InformationCircleIcon className="w-4 h-4 text-info" />
          )}
          <p
            className={classNames(
              "text-sm md:text-base text-black",
              getTextClass(variant),
            )}
          >
            {message}
          </p>
          {callToAction && callToActionLink && (
            <Link
              href={callToActionLink.path}
              className={classNames(
                "text-sm md:text-base text-primary font-semibold underline",
                getTextClass(variant),
              )}
            >
              {callToAction}
            </Link>
          )}
          {dismissable && (
            <div
              className={classNames(
                "p-1 rounded-lg border-1 border-transparent",
                getStateClasses(variant),
              )}
            >
              <XMarkIcon
                className={classNames(
                  "w-4 h-4 font-extrabold cursor-pointer",
                  getTextClass(variant),
                )}
                // must be in a 'use client' component but this is a Uniform/server component
                // onClick={() => {
                //   console.log("close");
                // }}
              />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

[
  undefined,
  BannerVariant.Primary,
  BannerVariant.Success,
  BannerVariant.Error,
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
