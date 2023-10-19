"use client";

import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF as faFacebook,
  faInstagram,
  faYoutube,
  faXTwitter as faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import { cn } from "@/utils";

const socialIcons = [
  {
    icon: faFacebook,
    url: "https://www.facebook.com/silversneakers/",
    name: "Facebook",
  },
  {
    icon: faInstagram,
    url: "https://www.instagram.com/silversneakers/",
    name: "Instagram",
  },
  {
    icon: faTwitter,
    url: "https://twitter.com/silversneakers",
    name: "Twitter",
  },
  {
    icon: faYoutube,
    url: "https://www.youtube.com/user/TheSilverSneakers",
    name: "YouTube",
  },
];

type SocialIconsProps = {
  color?: string;
};

const enum SocialIconColor {
  White = "white",
  Black = "black",
  Primary = "primary",
  Secondary = "secondary",
}

const getIconColorClasses = (color?: string) => {
  switch (color) {
    case SocialIconColor.Black:
      return "bg-black text-gray-100 hover:bg-gray-900";
    case SocialIconColor.Primary:
      return "bg-primary text-white hover:bg-primary-dark";
    case SocialIconColor.Secondary:
      return "bg-white text-primary hover:bg-gray-100";
    default:
      return "bg-white text-gray-600 hover:bg-gray-100";
  }
};

const SocialIcons = ({ color = "white" }: SocialIconsProps) => {
  return (
    <div className="flex items-center justify-center gap-4">
      {socialIcons.map((icon) => (
        <Link
          key={icon.url}
          href={icon.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "h-[36px] w-[36px] justify-center gap-0 rounded-full  p-2  shadow-sm",
            getIconColorClasses(color),
          )}
        >
          <FontAwesomeIcon icon={icon.icon} />
          <span className="sr-only">{icon.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default SocialIcons;
