// A layout.js and page.js file can be defined in the same folder. The layout will wrap the page.

import {
  UniformComposition,
  GoogleTagManagerAnalytics,
  UniformCompositionProps,
} from "@uniformdev/canvas-next-rsc";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import { Providers } from "./providers";

export const metadata = {
  title: "Silver Sneakers",
  description:
    "SilverSneakers is a fitness and wellness program offered at no additional cost to seniors 65+ on eligible Medicare plans that helps you get active, get fit, and connect with others. Our program is designed for all levels and abilities and provides access to online and in-person classes, over 15,000 fitness locations, and health & wellness discounts",
};

type Props = {
  children: React.ReactNode;
};
type SlugProps = Pick<UniformCompositionProps, "params" | "searchParams">;
type RootLayoutProps = Props & SlugProps;

export default async function RootLayout({
  children,
  ...props
}: RootLayoutProps) {
  return (
    <html lang="en" className="sstheme">
      <body className={inter.className}>
        <Providers>
          <UniformComposition {...props}>
            <GoogleTagManagerAnalytics />
            {children}
          </UniformComposition>
        </Providers>
        {/* TODO: This is a placeholder but ... some Tailwind styles are not accessible here, like text color and padding.
          This must be related to themeing. Maybe this will not be an issue once Footer component is styled. */}
        <footer className="text-center font-bold py-24">
          This is the footer!!!
        </footer>
      </body>
    </html>
  );
}
