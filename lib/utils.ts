import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// clsx and tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Get Image Url
// TODO: remove this any type
export function getImageUrl(image?: string | Types.CloudinaryImage | any) {
  const imageUrl = typeof image === "string" ? image : image?.[0]?.url;

  if (!imageUrl || imageUrl === "unresolved") return "";

  if (imageUrl.startsWith("//")) return imageUrl.replace("//", "https://");

  return imageUrl;
}

// Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
// TODO: remove this any type
export function cloudinaryLoader({ src, width, quality }: any) {
  const params = ["f_auto", "c_limit", `w_${width}`, `q_${quality || "auto"}`];
  return `https://res.cloudinary.com/${params.join(",")}${src}`;
}
