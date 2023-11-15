import { type ComponentProps } from "@uniformdev/canvas-next-rsc/component";

import Link from "next/link";
import Image from "next/image";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { Button } from "@/components/primitives/button";
import { Separator } from "@/components/primitives/separator";
import {
  CloudinaryImage,
  CloudinaryVideo,
} from "@/components/client-components/Cloudinary";

import { LightBackground, DarkBackground } from "@/components/Backgrounds";

import { cn, getImageUrl } from "@/utils";

type HeroProps = ComponentProps<{
  textAlignment?: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description: any;
  primarycta: string;
  primaryUrl: string;
  secondarycta?: string;
  secondaryUrl?: string;
  image?: string;
  video?: string;
  logo?: string;
  silversneakersGo: boolean;
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
      return "text-foreground";
    default:
      return "text-white dark-background-link";
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

export const Hero = ({
  component,
  textAlignment,
  title,
  description,
  primarycta,
  primaryUrl,
  secondarycta,
  secondaryUrl,
  image,
  video,
  logo,
  silversneakersGo,
}: HeroProps) => {
  const { variant } = component;
  const isCentered = textAlignment === HeroAlignment.Center;

  return (
    <div
      id={component._id}
      className={cn(
        "relative",
        variant === HeroVariant.ImageBackground &&
          "min-h-[calc(100vh-100px)] max-lg:min-h-fit",
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
          <LightBackground />
        ) : (
          <DarkBackground />
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
                  <CloudinaryVideo
                    width="1920px"
                    height="1080px"
                    src={video}
                    // TODO: figure out how to display this dynamically based on the video
                    poster="https://res.cloudinary.com/seth-hall/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1699571358/silversneakers/thumbnail1_uyjane.jpg?_s=public-apps"
                  />
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
              {title}
            </h1>
            {/* orange separator */}
            <Separator
              orientation="horizontal"
              className={cn(
                "mb-6 w-24 border-3 border-orange-500 xs:mb-10 sm:max-w-[100px] lg:mb-10",
                isCentered && "max-sm:mx-auto",
              )}
            />
            <div
              className={cn("prose flex flex-col", getBackgroundClass(variant))}
            >
              {documentToReactComponents(description)}
              <div
                className={cn(
                  "mb-5 flex w-full gap-3 max-sm:flex-col sm:justify-start md:gap-8",
                  isCentered && "!justify-center",
                )}
              >
                {silversneakersGo ? (
                  <>
                    <CloudinaryImage
                      src="silversneakers/app_store_logo_ks3dwp"
                      width={160}
                      height={100}
                      alt="Silver Sneakers"
                    />

                    <CloudinaryImage
                      src="silversneakers/google_play_logo_mxdwse"
                      width={160}
                      height={100}
                      alt="Silver Sneakers"
                    />
                  </>
                ) : (
                  <>
                    <Button
                      variant={
                        variant === HeroVariant.LightBackground
                          ? "primary"
                          : "primaryWhite"
                      }
                      asChild
                    >
                      <Link href={primaryUrl}>{primarycta}</Link>
                    </Button>
                    {secondarycta ? (
                      <Button
                        variant={
                          variant === HeroVariant.LightBackground
                            ? "secondaryWhite"
                            : "secondary"
                        }
                        asChild
                      >
                        {/* this syntax within hreg is needed because secondaryUrl could be undefined. */}
                        <Link href={`${secondaryUrl}`}>{secondarycta}</Link>
                      </Button>
                    ) : null}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
