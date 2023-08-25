import classNames from "classnames";
import Image, { ImageProps } from "next/image";
import {
  registerUniformComponent,
  ComponentProps,
} from "@uniformdev/canvas-next-rsc";

import Container from "../Container";
import { SSButton } from "../SSButton";

import blueSwooshOne from "../../public/blue-swoosh-1.svg";
import blueSwooshTwo from "../../public/blue-swoosh-2.svg";
import graySwooshOne from "../../public/gray-swoosh-1.svg";
import graySwooshTwo from "../../public/gray-swoosh-2.svg";

export type HeroProps = ComponentProps<{
  alignment: string;
  background: string;
  heading: string;
  description: string;
  primarycta: string;
  secondarycta: string;
  image: ImageProps;
  // bgImage?: Types.CloudinaryImage;
}>;

enum HeroVariants {
  ImageLeft = "imageLeft",
  ImageRight = "imageRight",
  Light = "light",
  Dark = "dark",
}

// This is one way to handle this but seems like a lot for just one class. Could do it inline
const getHeroBackgroundClasses = (variant?: string) => {
  switch (variant) {
    case HeroVariants.Light:
      return "text-black";
    case HeroVariants.Dark:
      return "text-white";
    default:
      return "";
  }
};

const getHeroAlignmentClasses = (variant?: string) => {
  switch (variant) {
    case HeroVariants.ImageLeft:
      return "md:flex-row";
    case HeroVariants.ImageRight:
      return "md:flex-row-reverse";
    default:
      return "";
  }
};

const Hero: React.FC<HeroProps> = ({
  alignment,
  background,
  heading,
  description,
  primarycta,
  secondarycta,
  image,
  // bgImage,
}) => {
  return (
    <div className="relative">
      {background === "light" ? (
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
      )}
      <Container>
        <div
          className={classNames(
            "relative flex flex-col justify-between gap-3 md:gap-7 lg:gap-16 p-10 lg:py-32 lg:px-16",
            getHeroAlignmentClasses(alignment),
          )}
        >
          <div
            className={classNames(
              "order-2 md:order-1 sm:basis-9/12 md:basis-1/2 m-auto",
            )}
          >
            <Image
              src={`https:${image}`}
              width={1000}
              height={1000}
              alt="Live Classes"
            />
          </div>
          <div
            className={classNames(
              "order-1 md:order-2 sm:basis-3/12 md:basis-1/2 max-w-lg",
              getHeroBackgroundClasses(background),
            )}
          >
            <div className="flex flex-col text-center sm:text-left mb-3">
              <h1 className="pb-5 max-md:text-2xl max-lg:text-4xl max-sm:m-auto max-w-lg">
                {heading}
              </h1>
              <span className="mb-6 xs:mb-10 lg:mb-10 w-24 max-sm:mx-auto sm:max-w-[100px] border-3 border-orange-500"></span>
              <div className="flex flex-col gap-10 sm:gap-5">
                <p className="max-sm:m-auto">{description}</p>
                <div className="flex justify-center sm:justify-start gap-3 md:gap-8 w-full mb-5">
                  <SSButton
                    color={background == "light" ? "primary" : "primaryWhite"}
                  >
                    {primarycta}
                  </SSButton>
                  {secondarycta ? (
                    <SSButton
                      color={
                        background == "light" ? "secondaryWhite" : "secondary"
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

registerUniformComponent({
  type: "hero",
  component: Hero,
});

export default Hero;
