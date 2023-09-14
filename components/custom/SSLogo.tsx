import Image from "next/image";
import { Link } from "@nextui-org/link";

import { getImageUrl } from "@/utils";

// TODO: replace with Cloudinary
import logoWordmark from "../../public/logo_wordmark.svg";
import logoPrimary from "../../public/logo_primary.svg";
import logoSymbol from "../../public/logo_symbol.svg";
import logoTivity from "../../public/logo_tivity.svg";

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

export const SSLogo: React.FC<LogoProps> = ({
  src = "",
  isLink = false,
  href = "/",
  className = "py-6 pr-3",
  variant = "wordmark",
  width = 125,
  height = 57,
}) => {
  return (
    <>
      {isLink ? (
        <Link className={className} href={href}>
          <Image
            src={src ? src : getLogo(variant)}
            width={width}
            height={height}
            quality={100}
            alt="Silver Sneakers Logo"
          />
        </Link>
      ) : (
        <div className={className}>
          <Image
            src={getImageUrl(getLogo(variant))}
            width={width}
            height={height}
            quality={100}
            alt="Silver Sneakers Logo"
          />
        </div>
      )}
    </>
  );
};
