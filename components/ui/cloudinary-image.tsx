"use client";

import { CldImage } from "next-cloudinary";

type CloudinaryImageProps = {
  src: string;
  width: string;
  height: string;
  fill: boolean;
  alt: string;
};

const CloudinaryImage = (props: any) => {
  return <CldImage {...props} />;
};

export default CloudinaryImage;
