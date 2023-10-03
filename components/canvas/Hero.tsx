import {
  registerUniformComponent,
  ComponentProps,
} from "@uniformdev/canvas-next-rsc";

import Link from "next/link";
import Image from "next/image";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { Button } from "@/components/ui/button";
import { CloudinaryImage, CloudinaryVideo } from "@/components/ui/cloudinary";

import { cn } from "@/lib/utils";
import { getImageUrl } from "@/lib/utils";

export type HeroProps = ComponentProps<{
  textAlignment?: string;
  heading: string;
  description: any;
  primarycta: string;
  secondarycta?: string;
  image?: string;
  video?: string;
  logo?: string;
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
  video,
  logo,
}) => {
  const { variant } = component;
  const isCentered = textAlignment === HeroAlignment.Center;

  console.log(logo);

  return (
    <div
      className={cn(
        "relative",
        variant === HeroVariant.ImageBackground && "min-h-[calc(100vh-100px)]",
      )}
    >
      {/* Gradient Opacity Layer */}
      {variant === HeroVariant.ImageBackground && (
        <>
          <div className="from-26% to-98% absolute z-20 h-full w-full bg-gradient-to-r from-black opacity-90"></div>
          <div className="absolute z-10 h-full w-full bg-cover bg-left-top bg-no-repeat">
            {/* TODO: integrate Cloudinary into Contentful and map a Uniform JSON Object parameter to the Contenful field. This will provide a Cloudinary url, similar to Logo, which should work as the src */}
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
            <CloudinaryImage
              fill
              src="silversneakers/ayfp6mzjmqo5dpyzhosj"
              alt="Blue Swoosh"
              className="object-cover"
            />
            <CloudinaryImage
              fill
              src="silversneakers/feffiy7gf94xaebp2lep"
              alt="Blue Swoosh"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="absolute -z-10 h-full w-full bg-primary bg-cover bg-left-top bg-no-repeat">
            <CloudinaryImage
              fill
              src="silversneakers/oydg5urpuzfkrh2pywu6"
              alt="Blue Swoosh"
              className="object-cover"
            />
            <CloudinaryImage
              fill
              src="silversneakers/okjz19zlcyva7oyeisrs"
              alt="Blue Swoosh"
              className="object-cover"
            />
          </div>
        ))}
      <div
        className={cn(
          "container relative z-30 flex flex-col justify-between gap-3 p-10 md:gap-7 lg:gap-16 lg:px-16 lg:py-32",
          getAlignmentClass(textAlignment),
        )}
      >
        <div
          className={cn(
            "relative order-1 m-auto sm:basis-9/12 md:order-1 md:basis-1/2",
          )}
        >
          {variant !== HeroVariant.ImageBackground && (
            <>
              {/* TODO: integrate Cloudinary into Contentful and map a Uniform JSON Object parameter to the Contenful field. This will provide a Cloudinary url, similar to Logo, which should work as the src. This will allow the use of CloudinaryImage. */}
              <Image
                src={getImageUrl(image)}
                width="1000"
                height="1000"
                alt="Live Classes"
              />
              {video && (
                <div className="absolute top-[20%] w-full">
                  <CloudinaryVideo width="1920px" height="1080px" src={video} />
                </div>
              )}
            </>
          )}
        </div>
        <div
          className={cn(
            "order-2 max-w-[540px] sm:basis-3/12 md:order-2 md:basis-1/2",
            getBackgroundClass(variant),
            // isCentered && "w-[737px] max-w-[737px]",
          )}
        >
          <div
            className={cn(
              "mb-3 flex flex-col sm:text-left",
              isCentered && "items-center !text-center",
            )}
          >
            {logo && (
              <CloudinaryImage
                src={getImageUrl(logo)}
                width={280}
                height={100}
                alt="Silver Sneakers"
              />
            )}
            <h1
              className={cn(
                "max-w-lg pb-5 max-lg:text-4xl max-md:text-2xl max-sm:m-auto",
                isCentered && "!max-w-full",
              )}
            >
              {heading}
            </h1>
            <span
              className={cn(
                "mb-6 w-24 border-3 border-orange-500 xs:mb-10 sm:max-w-[100px] lg:mb-10",
                isCentered && "max-sm:mx-auto",
              )}
            ></span>
            <div className={cn("flex flex-col gap-10 sm:gap-5")}>
              {documentToReactComponents(description)}
              <div
                className={cn(
                  "mb-5 flex w-full gap-3 max-sm:flex-col sm:justify-start md:gap-8",
                  isCentered && "!justify-center",
                )}
              >
                <Button
                  asChild
                  variant={
                    variant === HeroVariant.LightBackground
                      ? "primary"
                      : "primaryWhite"
                  }
                  size="xl"
                >
                  <Link href="https://google.com">{primarycta}</Link>
                </Button>
                {secondarycta ? (
                  <Button
                    asChild
                    variant={
                      variant === HeroVariant.LightBackground
                        ? "secondaryWhite"
                        : "secondary"
                    }
                    size="xl"
                  >
                    <Link href="/">{secondarycta}</Link>
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
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
