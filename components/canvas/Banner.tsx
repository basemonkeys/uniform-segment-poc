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

const getBannerVariantBackgroundClass = (variantId?: string) => {
  switch (variantId) {
    case BannerVariant.Primary:
      return "bg-primary";
    case BannerVariant.Success:
      return "bg-success-light";
    case BannerVariant.Error:
      return "bg-danger-light";
    case BannerVariant.Warning:
      return "bg-warning-light";
    case BannerVariant.Info:
      return "bg-info-light";
    default:
      return "bg-gray-100";
  }
};

const getBannerVariantTextClass = (variantId?: string) => {
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
    <div
      className={classNames("w-full", getBannerVariantBackgroundClass(variant))}
    >
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
              getBannerVariantTextClass(variant),
            )}
          >
            {message}
          </p>
          {callToAction && callToActionLink && (
            <Link
              href={callToActionLink.path}
              className={classNames(
                "text-sm md:text-base text-primary font-semibold underline",
                getBannerVariantTextClass(variant),
              )}
            >
              {callToAction}
            </Link>
          )}
          {dismissable && (
            <XMarkIcon
              className={classNames(
                "w-4 h-4 font-extrabold cursor-pointer",
                getBannerVariantTextClass(variant),
              )}
              // must be in a 'use client' component but this is a Uniform/server component
              // onClick={() => {
              //   console.log("close");
              // }}
            />
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
