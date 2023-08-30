import Image, { ImageProps } from "next/image";

import {
  registerUniformComponent,
  ComponentProps,
} from "@uniformdev/canvas-next-rsc";

import Container from "../Container";
import { SSButton } from "../SSButton";

import { getImageUrl } from "@/utils";

export type HeroProps = ComponentProps<{
  heading: string;
  description: string;
  primarycta: string;
  image: Types.CloudinaryImage;
}>;

const FeaturedHero: React.FC<HeroProps> = ({
  heading,
  description,
  primarycta,
  image,
}) => {
  return (
    <div className="relative min-h-[calc(100vh-100px)]">
      {/* Gradient Opacity Layer */}
      {/* <div className="absolute w-screen h-full 
      bg-gradient-to-r from-orange-900 to-blue-900 opacity-50"></div> */}
      <div className="absolute w-screen h-full bg-gradient-to-r from-black from-30% to-90% opacity-50"></div>
      <div className="absolute w-screen h-full -z-10 bg-left-top bg-no-repeat bg-cover">
        {/* <Image
          fill
          src={getImageUrl(image)}
          alt="featured hero background image"
          className="object-cover"
        /> */}
      </div>
      <Container>
        <div className="relative flex flex-col text-left p-10 lg:py-32 lg:px-16 text-white max-w-xl">
          <h1 className="pb-5 max-md:text-2xl max-lg:text-4xl max-sm:m-auto">
            {heading}
          </h1>
          <span className="mb-6 xs:mb-10 lg:mb-10 w-24 sm:max-w-[100px] border-3 border-orange-500"></span>
          <div className="flex flex-col gap-10 sm:gap-5">
            <p className="max-sm:m-auto">{description}</p>
            <div className="flex sm:justify-start gap-3 md:gap-8 w-full mb-5">
              <SSButton color="primary">{primarycta}</SSButton>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

registerUniformComponent({
  type: "featuredHero",
  component: FeaturedHero,
});

export default FeaturedHero;
