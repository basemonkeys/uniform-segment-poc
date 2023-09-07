import classNames from "classnames";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import {
  registerUniformComponent,
  ComponentProps,
} from "@uniformdev/canvas-next-rsc";

import Image from "next/image";

import Container from "../Container";
import { SSButton } from "../SSButton";

import { getImageUrl } from "@/utils";

import blueSwooshOne from "../../public/blue-swoosh-1.svg";
import blueSwooshTwo from "../../public/blue-swoosh-2.svg";
import graySwooshOne from "../../public/gray-swoosh-1.svg";
import graySwooshTwo from "../../public/gray-swoosh-2.svg";
import { text } from "body-parser";

export type HeroProps = ComponentProps<{
  textAlignment?: string;
  heading: string;
  description: any;
  primarycta: string;
  secondarycta?: string;
  image?: Types.CloudinaryImage;
  logo?: Types.CloudinaryImage;
}>;

export enum HeroVariant {
  ImageBackground = "imageBackground",
  VideoBackground = "videoBackground",
  DarkBackground = "darkBackground",
  LightBackground = "lightBackground",
}

export enum HeroAlignment {
  Left = "left",
  Center = "center",
  Right = "right",
}

const getBackgroundClass = (variantId?: string) => {
  switch (variantId) {
    case HeroVariant.LightBackground:
      return "text-black";
    default:
      return "text-white";
  }
};

const getAlignmentClass = (alignmentId?: string) => {
  switch (alignmentId) {
    case HeroAlignment.Center:
      return "justify-center";
    case HeroAlignment.Right:
      return "md:flex-row";
    default:
      return "md:flex-row-reverse";
  }
};

const Hero: React.FC<HeroProps> = ({
  component,
  textAlignment,
  heading,
  description,
  primarycta,
  secondarycta,
  image,
  logo,
}) => {
  const { variant } = component;
  const isCentered = textAlignment === HeroAlignment.Center;

  return (
    <div
      className={classNames(
        "relative",
        variant === HeroVariant.ImageBackground && "min-h-[calc(100vh-100px)]",
      )}
    >
      {/* Gradient Opacity Layer */}
      {variant === HeroVariant.ImageBackground && (
        <>
          <div className="absolute w-full h-full bg-gradient-to-r from-black from-26% to-98% opacity-90 z-20"></div>
          <div className="absolute w-full h-full z-10 bg-left-top bg-no-repeat bg-cover">
            <Image
              fill
              src={getImageUrl(image)}
              alt="featured hero background image"
              className="object-cover"
            />
          </div>
        </>
      )}
      {variant !== HeroVariant.ImageBackground &&
        (variant === HeroVariant.LightBackground ? (
          <div className="absolute w-full h-full bg-white -z-10 bg-left-top bg-no-repeat bg-cover">
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
          <div className="absolute w-full h-full bg-primary -z-10 bg-left-top bg-no-repeat bg-cover">
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
            "z-30 relative flex flex-col justify-between gap-3 md:gap-7 lg:gap-16 p-10 lg:py-32 lg:px-16",
            getAlignmentClass(textAlignment),
          )}
        >
          <div
            className={classNames(
              "order-2 md:order-1 sm:basis-9/12 md:basis-1/2 m-auto",
            )}
          >
            {variant !== HeroVariant.ImageBackground && (
              <>
                <Image
                  src={getImageUrl(image)}
                  width={1000}
                  height={1000}
                  alt="Live Classes"
                />
                {/* <video>
                  <source
                    src="/Content/videos/class-montage.mp4"
                    type="video/mp4"
                  />
                  <source
                    src="/Content/videos/class-montage.webm"
                    type="video/webm"
                  />
                </video> */}
              </>
            )}
          </div>
          <div
            className={classNames(
              "order-1 md:order-2 sm:basis-3/12 md:basis-1/2 max-w-[540px]",
              getBackgroundClass(variant),
              isCentered && "w-[737px] max-w-[737px]",
            )}
          >
            <div
              className={classNames(
                "flex flex-col sm:text-left mb-3",
                isCentered && "text-center",
              )}
            >
              {logo && (
                <Image
                  src={getImageUrl(logo)}
                  width={280}
                  height={100}
                  alt="Silver Sneakers"
                />
              )}
              <h1 className="pb-5 max-md:text-2xl max-lg:text-4xl max-sm:m-auto max-w-lg">
                {heading}
              </h1>
              <span
                className={classNames(
                  "mb-6 xs:mb-10 lg:mb-10 w-24 sm:max-w-[100px] border-3 border-orange-500",
                  isCentered && "max-sm:mx-auto",
                )}
              ></span>
              <div className="flex flex-col gap-10 sm:gap-5">
                {documentToReactComponents(description)}
                <div
                  className={classNames(
                    "flex sm:justify-start gap-3 md:gap-8 w-full mb-5",
                    isCentered && "justify-center ",
                  )}
                >
                  <SSButton
                    color={
                      variant === HeroVariant.LightBackground
                        ? "primary"
                        : "primaryWhite"
                    }
                  >
                    {primarycta}
                  </SSButton>
                  {secondarycta ? (
                    <SSButton
                      color={
                        variant === HeroVariant.LightBackground
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
  HeroVariant.ImageBackground,
  HeroVariant.VideoBackground,
  HeroVariant.DarkBackground,
  HeroVariant.LightBackground,
].forEach((variantId) => {
  registerUniformComponent({
    type: "hero",
    component: Hero,
    variantId,
  });
});

export default Hero;
