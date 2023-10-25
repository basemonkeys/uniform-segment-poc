import {
  type UniformSlotProps,
  UniformSlot,
} from "@uniformdev/canvas-next-rsc";

// Google Font via next/font
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

// Font Awesome
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

// Providers
import { Providers } from "./providers";

// Uniform Canvas Components index
import "@/components/uniform";
import { getGlobalComponent } from "@/utils";

// SilverSneakers Components
import { LanguageSelector } from "@/components/ui/client-components/navigation/LanguageSelector";

// Global CSS
import "./globals.css";

// TODO: add social media meta tags
export const metadata = {
  title: "Silver Sneakers",
  description:
    "SilverSneakers is a fitness and wellness program offered at no additional cost to seniors 65+ on eligible Medicare plans that helps you get active, get fit, and connect with others. Our program is designed for all levels and abilities and provides access to online and in-person classes, over 15,000 fitness locations, and health & wellness discounts",
};

type LayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: LayoutProps) {
  void getGlobalComponent();

  return (
    <html lang="en" className={openSans.className}>
      <body className={openSans.className}>
        <Providers>
          <LanguageSelector />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

// These functions grab the Header and Footer slots from the Home composition (see utils directory) to allow for the header and footer components to be loaded in layout.tsx
const Header = async () => {
  const globalComponent = await getGlobalComponent();

  const context: UniformSlotProps<string>["context"] = {
    composition: globalComponent,
    path: "global",
    searchParams: {},
  };

  return <UniformSlot name="header" data={globalComponent} context={context} />;
};

const Footer = async () => {
  const globalComponent = await getGlobalComponent();

  const context: UniformSlotProps<string>["context"] = {
    composition: globalComponent,
    path: "global",
    searchParams: {},
  };

  return <UniformSlot name="footer" data={globalComponent} context={context} />;
};
