"use client";

import { CldImage, CldVideoPlayer } from "next-cloudinary";

import "next-cloudinary/dist/cld-video-player.css";

// type CloudinaryImageProps = {
//   src: string;
//   width: number;
//   height?: number;
//   // fill: boolean;
//   alt: string;
//   className?: string;
// };

type CloudinaryVideoProps = {
  width: string | number;
  height: string | number;
  src: string;
};

export const CloudinaryImage = (props: any) => {
  return <CldImage {...props} />;
};

export const CloudinaryVideo = (props: any) => {
  return <CldVideoPlayer {...props} />;
};
