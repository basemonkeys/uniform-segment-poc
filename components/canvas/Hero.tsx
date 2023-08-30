import classNames from "classnames";
import Image from "next/image";

import {
  registerUniformComponent,
  ComponentProps,
} from "@uniformdev/canvas-next-rsc";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import Container from "../Container";
import { SSButton } from "../SSButton";

import { getImageUrl } from "@/utils";

import blueSwooshOne from "../../public/blue-swoosh-1.svg";
import blueSwooshTwo from "../../public/blue-swoosh-2.svg";
import graySwooshOne from "../../public/gray-swoosh-1.svg";
import graySwooshTwo from "../../public/gray-swoosh-2.svg";

export type HeroProps = ComponentProps<{
  variant: string;
  heading: string;
  description: any;
  primarycta: string;
  secondarycta: string;
  image: Types.CloudinaryImage;
}>;

enum HeroVariant {
  BackgroundImage = "backgroundImage",
  LeftLight = "leftLight",
  LeftDark = "leftDark",
  RightLight = "rightLight",
  RightDark = "rightDark",
}

const getAlignmentClass = (variantId?: string) => {
  switch (variantId) {
    case HeroVariant.LeftLight:
      return "md:flex-row";
    case HeroVariant.LeftDark:
      return "md:flex-row";
    case HeroVariant.RightLight:
      return "md:flex-row-reverse";
    case HeroVariant.RightDark:
      return "md:flex-row-reverse";
    default:
      return "";
  }
};

const getBackgroundClass = (variantId?: string) => {
  switch (variantId) {
    case HeroVariant.BackgroundImage:
      return "text-white";
    case HeroVariant.LeftLight:
      return "text-black";
    case HeroVariant.LeftDark:
      return "text-white";
    case HeroVariant.RightLight:
      return "text-black";
    case HeroVariant.RightDark:
      return "text-white";
    default:
      return "";
  }
};

const Hero: React.FC<HeroProps> = ({
  component,
  heading,
  description,
  primarycta,
  secondarycta,
  image,
}) => {
  const { variant } = component;
  const hasBackground = variant === HeroVariant.BackgroundImage;

  return (
    <div
      className={classNames(
        "relative",
        variant === HeroVariant.BackgroundImage && "min-h-[calc(100vh-100px)]",
      )}
    >
      {/* Gradient Opacity Layer */}
      {variant === HeroVariant.BackgroundImage && (
        <>
          <div className="absolute w-screen h-full bg-gradient-to-r from-black from-26% to-98% opacity-90"></div>
          <div className="absolute w-screen h-full -z-10 bg-left-top bg-no-repeat bg-cover">
            <Image
              fill
              src={getImageUrl(image)}
              alt="featured hero background image"
              className="object-cover"
            />
          </div>
        </>
      )}
      {variant !== HeroVariant.BackgroundImage &&
        (variant === HeroVariant.LeftLight ||
        variant === HeroVariant.RightLight ? (
          <div className="absolute w-screen h-full bg-white -z-10 bg-left-top bg-no-repeat bg-cover">
            <Image
              fill
              src={graySwooshOne}
              alt="Blue Swoosh"
              className="object-cover"
            />
            <Image
              fill
              src={graySwooshTwo}
              alt="Blue Swoosh"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="absolute w-screen h-full bg-primary -z-10 bg-left-top bg-no-repeat bg-cover">
            <Image
              fill
              src={blueSwooshOne}
              alt="Blue Swoosh"
              className="object-cover"
            />
            <Image
              fill
              src={blueSwooshTwo}
              alt="Blue Swoosh"
              className="object-cover"
            />
          </div>
        ))}
      <Container>
        <div
          className={classNames(
            "relative flex flex-col justify-between gap-3 md:gap-7 lg:gap-16 p-10 lg:py-32 lg:px-16",
            getAlignmentClass(variant),
          )}
        >
          <div
            className={classNames(
              "order-2 md:order-1 sm:basis-9/12 md:basis-1/2 m-auto",
            )}
          >
            {variant !== HeroVariant.BackgroundImage && (
              <>
                <Image
                  src={`https:${image}`}
                  width={1000}
                  height={1000}
                  alt="Live Classes"
                />
                <video>
                  <source
                    src="/Content/videos/class-montage.mp4"
                    type="video/mp4"
                  />
                  <source
                    src="/Content/videos/class-montage.webm"
                    type="video/webm"
                  />
                </video>
              </>
            )}
          </div>
          <div
            className={classNames(
              "order-1 md:order-2 sm:basis-3/12 md:basis-1/2 max-w-xl",
              getBackgroundClass(variant),
            )}
          >
            <div
              className={classNames(
                "flex flex-col sm:text-left mb-3",
                !hasBackground && "text-center",
              )}
            >
              <h1 className="pb-5 max-md:text-2xl max-lg:text-4xl max-sm:m-auto max-w-lg">
                {heading}
              </h1>
              <span
                className={classNames(
                  "mb-6 xs:mb-10 lg:mb-10 w-24 sm:max-w-[100px] border-3 border-orange-500",
                  !hasBackground && "max-sm:mx-auto",
                )}
              ></span>
              <div className="flex flex-col gap-10 sm:gap-5">
                {documentToReactComponents(description)}
                <div
                  className={classNames(
                    "flex sm:justify-start gap-3 md:gap-8 w-full mb-5",
                    !hasBackground && "justify-center ",
                  )}
                >
                  <SSButton
                    color={
                      variant === HeroVariant.LeftLight ||
                      variant === HeroVariant.RightLight
                        ? "primary"
                        : "primaryWhite"
                    }
                  >
                    {primarycta}
                  </SSButton>
                  {secondarycta ? (
                    <SSButton
                      color={
                        variant === HeroVariant.LeftLight ||
                        variant === HeroVariant.RightLight
                          ? "secondaryWhite"
                          : "secondary"
                      }
                    >
                      {secondarycta}
                    </SSButton>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

[
  undefined,
  HeroVariant.BackgroundImage,
  HeroVariant.LeftLight,
  HeroVariant.LeftDark,
  HeroVariant.RightLight,
  HeroVariant.RightDark,
].forEach((variantId) => {
  registerUniformComponent({
    type: "hero",
    component: Hero,
    variantId,
  });
});

export default Hero;
