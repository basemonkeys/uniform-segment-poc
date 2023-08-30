import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import "./globals.css";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { Providers } from "./providers";

// Import all Uniform Canvas Components
import "../components/canvas";

export const metadata = {
  title: "Silver Sneakers",
  description:
    "SilverSneakers is a fitness and wellness program offered at no additional cost to seniors 65+ on eligible Medicare plans that helps you get active, get fit, and connect with others. Our program is designed for all levels and abilities and provides access to online and in-person classes, over 15,000 fitness locations, and health & wellness discounts",
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en" className="sstheme">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
