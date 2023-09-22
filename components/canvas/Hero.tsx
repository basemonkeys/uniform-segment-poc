import {
  registerUniformComponent,
  ComponentProps,
} from "@uniformdev/canvas-next-rsc";

import Image from "next/image";

import classNames from "classnames";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { Link } from "@nextui-org/link";

import Container from "../Container";
import { SSButton } from "../custom/SSButton";

import { getImageUrl } from "@/utils";

import blueSwooshOne from "../../public/blue-swoosh-1.svg";
import blueSwooshTwo from "../../public/blue-swoosh-2.svg";
import graySwooshOne from "../../public/gray-swoosh-1.svg";
import graySwooshTwo from "../../public/gray-swoosh-2.svg";

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
      return "items-center justify-center";
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
          <div className="from-26% to-98% absolute z-20 h-full w-full bg-gradient-to-r from-black opacity-90"></div>
          <div className="absolute z-10 h-full w-full bg-cover bg-left-top bg-no-repeat">
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
          <div className="absolute -z-10 h-full w-full bg-white bg-cover bg-left-top bg-no-repeat">
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
          <div className="absolute -z-10 h-full w-full bg-primary bg-cover bg-left-top bg-no-repeat">
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
            "relative z-30 flex flex-col justify-between gap-3 p-10 md:gap-7 lg:gap-16 lg:px-16 lg:py-32",
            getAlignmentClass(textAlignment),
          )}
        >
          <div
            className={classNames(
              "order-2 m-auto sm:basis-9/12 md:order-1 md:basis-1/2",
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
              "order-1 max-w-[540px] sm:basis-3/12 md:order-2 md:basis-1/2",
              getBackgroundClass(variant),
              // isCentered && "w-[737px] max-w-[737px]",
            )}
          >
            <div
              className={classNames(
                "mb-3 flex flex-col sm:text-left",
                isCentered && "items-center !text-center",
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
              <h1
                className={classNames(
                  "max-w-lg pb-5 max-lg:text-4xl max-md:text-2xl max-sm:m-auto",
                  isCentered && "!max-w-full",
                )}
              >
                {heading}
              </h1>
              <span
                className={classNames(
                  "mb-6 w-24 border-3 border-orange-500 xs:mb-10 sm:max-w-[100px] lg:mb-10",
                  isCentered && "max-sm:mx-auto",
                )}
              ></span>
              <div className={classNames("flex flex-col gap-10 sm:gap-5")}>
                {documentToReactComponents(description)}
                <div
                  className={classNames(
                    "mb-5 flex w-full gap-3 sm:justify-start md:gap-8",
                    isCentered && "!justify-center",
                  )}
                >
                  <SSButton
                    href="https://google.com"
                    as={Link}
                    // showAnchorIcon
                    color={
                      variant === HeroVariant.LightBackground
                        ? "primary"
                        : "primaryWhite"
                    }
                  >
                    {primarycta}
                  </SSButton>
                  {/* TODO: fix this SSButton as Link */}
                  {secondarycta ? (
                    <SSButton
                      href="/"
                      as={Link}
                      // showAnchorIcon
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
