// TODO: remove this any type
export const getImageUrl = (image?: string | Types.CloudinaryImage | any) => {
  const imageUrl = typeof image === "string" ? image : image?.[0]?.url;

  if (!imageUrl || imageUrl === "unresolved") return "";

  if (imageUrl.startsWith("//")) return imageUrl.replace("//", "https://");

  return imageUrl;
};
