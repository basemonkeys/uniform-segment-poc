"use client";

import {
  type CldImageProps,
  type CldVideoPlayerProps,
  CldImage,
  CldVideoPlayer,
} from "next-cloudinary";

import "next-cloudinary/dist/cld-video-player.css";

export const CloudinaryImage = (props: CldImageProps) => {
  return <CldImage {...props} />;
};

export const CloudinaryVideo = (props: CldVideoPlayerProps) => {
  return <CldVideoPlayer {...props} />;
};
