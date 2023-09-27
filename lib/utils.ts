import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// clsx and tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Get Image Url
export function getImageUrl(image?: string | Types.CloudinaryImage | any) {
  const imageUrl = typeof image === "string" ? image : image?.[0]?.url;

  if (!imageUrl || imageUrl === "unresolved") return "";

  if (imageUrl.startsWith("//")) return imageUrl.replace("//", "https://");

  return imageUrl;
}
