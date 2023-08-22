import {
  registerUniformComponent,
  ComponentProps,
  UniformSlotProps
} from "@uniformdev/canvas-next-rsc";

import Image, { ImageProps } from 'next/image'
import { SSButton } from "../SSButton";

import blueSwooshOne from '../../public/blue-swoosh-1.svg'
import blueSwooshTwo from '../../public/blue-swoosh-2.svg'
import graySwooshOne from '../../public/gray-swoosh-1.svg'
import graySwooshTwo from '../../public/gray-swoosh-2.svg'

type HeroProps = ComponentProps<{
  bgImage?: Types.CloudinaryImage;
  image: ImageProps;
  heading: string;
  description: string;
  primarycta: string;
  secondarycta: string;
}>;

const Hero: React.FC<HeroProps> = ({ 
  bgImage,
  image,
  heading,
  description,
  primarycta,
  secondarycta,
 }) => {
  return (
    <div className="relative">
      {/* <pre>{JSON.stringify()}</pre> */}
      {image ?
      (
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
      )
        :
      (
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
      )}
      <div className="relative flex flex-col md:flex-row justify-between gap-3 md:gap-16 m-auto p-10 lg:p-36">
        <div className="order-2 md:order-1 m-auto">
          <Image
            src={`https:${image}`}
            width={1000}
            height={1000}
            alt="Live Classes"
          />
        </div>
        <div className="order-1 md:order-2 text-white">
          <div className="flex flex-col text-center sm:text-left mb-3">
            <h2 className="max-w-xs md:max-w-md pb-5 max-md:text-2xl max-sm:m-auto ">{heading}</h2>
            <span className="mb-6 lg:mb-10 w-24 max-sm:mx-auto sm:max-w-[100px] border-3 border-orange-500"></span>
            <div className="flex flex-col gap-5">
              <p className="max-md:max-w-md max-sm:m-auto">{description}</p>
              <div className="flex justify-center sm:justify-start gap-3 md:gap-8">
                <SSButton color="secondaryWhite">{primarycta}</SSButton>
                {secondarycta ? <SSButton color="secondary">{secondarycta}</SSButton> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
 };

registerUniformComponent({
  type: "hero",
  component: Hero,
});

export default Hero;
