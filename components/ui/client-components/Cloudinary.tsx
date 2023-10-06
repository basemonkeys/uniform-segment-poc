"use client";

import { CldImage, CldVideoPlayer } from "next-cloudinary";

import "next-cloudinary/dist/cld-video-player.css";

export const CloudinaryImage = (props: any) => {
  return <CldImage {...props} />;
};

export const CloudinaryVideo = (props: any) => {
  return <CldVideoPlayer {...props} />;
};
