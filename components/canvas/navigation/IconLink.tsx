import { FC } from "react";

import {
  ComponentProps,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

import Link from "next/link";
import Image from "next/image";

import { getImageUrl } from "@/utils";

type IconLinkProps = ComponentProps<{
  link: Types.ProjectMapLink;
  icon: string | Types.CloudinaryImage;
}>;

const IconLink: FC<IconLinkProps> = ({ icon, link }) => {
  const imageUrl = getImageUrl(icon);
  if (!link || !imageUrl) return null;
  return (
    <Link
      target="_blank"
      className="shrink-0 [&:not(:last-child)]:mr-3"
      href={link?.path || "#"}
    >
      <Image src={imageUrl} width="32" height="32" alt="iconLink" />
    </Link>
  );
};

registerUniformComponent({
  type: "iconLink",
  component: IconLink,
});
