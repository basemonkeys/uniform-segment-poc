"use client";

import Link from "next/link";

import { CldImage } from "next-cloudinary";

import { getImageUrl } from "@/utils";

// TODO: replace with Cloudinary
import logoWordmark from "../../../public/logo_wordmark.svg";
import logoPrimary from "../../../public/logo_primary.svg";
import logoSymbol from "../../../public/logo_symbol.svg";
import logoTivity from "../../../public/logo_tivity.svg";

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
      return getImageUrl(logoWordmark.src);
    case LogoVariant.Primary:
      return getImageUrl(logoPrimary.src);
    case LogoVariant.Symbol:
      return getImageUrl(logoSymbol.src);
    case LogoVariant.Tivity:
      return getImageUrl(logoTivity.src);
    default:
      return getImageUrl(logoWordmark.src);
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
          <CldImage
            src={src ? src : getImageUrl(getLogo(variant))}
            width={width}
            height={height}
            sizes="100vw"
            alt="Silver Sneakers Logo"
          />
        </Link>
      ) : (
        <div className={className}>
          <CldImage
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
