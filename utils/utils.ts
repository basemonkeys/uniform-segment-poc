import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getCanvasClient } from "@uniformdev/canvas-next-rsc";

// clsx and tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Get global Header and Footer components from Uniform
export const getGlobalComponent = async () => {
  // this is the ID of the Home composition which uses the HomePage component
  const globalCompositionId = "4562edb4-2801-4ebf-8f17-11b62a94a30a";

  const canvasClient = getCanvasClient({
    revalidate: 60,
  });

  const { composition: globalComponent } =
    await canvasClient.getCompositionById({
      compositionId: globalCompositionId,
    });

  return globalComponent;
};

// Get Image Url
export function getImageUrl(image?: string | Types.CloudinaryImage | any) {
  const imageUrl = typeof image === "string" ? image : image?.[0]?.url;

  if (!imageUrl || imageUrl === "unresolved") return "";

  if (imageUrl.startsWith("//")) return imageUrl.replace("//", "https://");

  return imageUrl;
}
