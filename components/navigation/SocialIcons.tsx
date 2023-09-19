"use client";

import { Link } from "@nextui-org/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF as faFacebook,
  faInstagram,
  faYoutube,
  faXTwitter as faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const socialIcons = [
  {
    icon: faFacebook,
    url: "https://www.facebook.com/silversneakers/",
  },
  {
    icon: faInstagram,
    url: "https://www.instagram.com/silversneakers/",
  },
  {
    icon: faTwitter,
    url: "https://twitter.com/silversneakers",
  },
  {
    icon: faYoutube,
    url: "https://www.youtube.com/user/TheSilverSneakers",
  },
];

const SocialIcons = () => {
  return (
    <div className="flex items-center justify-center gap-4">
      {socialIcons.map((icon) => (
        <Link
          isExternal
          key={icon.url}
          href={icon.url}
          className="h-[36px] w-[36px] justify-center gap-0 rounded-full bg-white p-2 text-gray-600 shadow-sm hover:bg-gray-200"
        >
          <FontAwesomeIcon icon={icon.icon} />
        </Link>
      ))}
    </div>
  );
};

export default SocialIcons;
