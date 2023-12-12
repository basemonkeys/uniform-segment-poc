"use client";

import Link from "next/link";

import { getImageUrl } from "@/utils";

import { CloudinaryImage } from "./Cloudinary";

const logoWordmark =
  "https://res.cloudinary.com/tivityhealth/image/upload/v1701723499/SilverSneakers/Logos/silversneakers_logo_wordmark.svg";
const logoPrimary =
  "https://res.cloudinary.com/tivityhealth/image/upload/v1701723502/SilverSneakers/Logos/silversneakers_logo_primary.svg";
const logoSymbol =
  "https://res.cloudinary.com/tivityhealth/image/upload/v1702342381/SilverSneakers/Logos/silversneakers_logo_symbol.svg";
const logoTivity =
  "https://res.cloudinary.com/tivityhealth/image/upload/v1702342381/SilverSneakers/Logos/silversneakers_logo_tivity.svg";

type LogoProps = {
  src?: string | Types.CloudinaryImage;
  isLink?: boolean;
  href?: string;
  className?: string;
  variant?: string;
  width?: number;
  height?: number;
};

export enum LogoVariant {
  Wordmark = "wordmark",
  Primary = "primary",
  Symbol = "symbol",
  Tivity = "tivity",
}

const getLogo = (variantId?: string) => {
  switch (variantId) {
    case LogoVariant.Wordmark:
      return getImageUrl(logoWordmark);
    case LogoVariant.Primary:
      return getImageUrl(logoPrimary);
    case LogoVariant.Symbol:
      return getImageUrl(logoSymbol);
    case LogoVariant.Tivity:
      return getImageUrl(logoTivity);
    default:
      return getImageUrl(logoWordmark);
  }
};

export const Logo = ({
  src = "",
  isLink = false,
  href = "/",
  className = "py-6 pr-3",
  variant = "wordmark",
  width = 525,
  height = 57,
}: LogoProps) => {
  return (
    <>
      {isLink ? (
        <Link className={className} href={href}>
          <CloudinaryImage
            src={src ? src : getLogo(variant)}
            width={width}
            height={height}
            sizes="100vw"
            alt="Silver Sneakers Logo"
          />
        </Link>
      ) : (
        <div className={className}>
          <CloudinaryImage
            src={getImageUrl(getLogo(variant))}
            width={width}
            height={height}
            sizes="100vw"
            alt="Silver Sneakers Logo"
          />
        </div>
      )}
    </>
  );
};
