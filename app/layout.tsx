import {
  type UniformSlotProps,
  UniformSlot,
} from "@uniformdev/canvas-next-rsc";

import { getGlobalComponent, getGlobalMemberComponent } from "@/utils";

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
import { Providers } from "@/components/providers";

// Uniform Canvas Components index
import "@/components/uniform";

// Global Visiter and Member Header and Footer Components
import { GlobalHeader } from "@/components/client-components/global/GlobalComponents";

// SilverSneakers Components
import { LanguageSelector } from "@/components/client-components/navigation/LanguageSelector";

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
  return (
    <html lang="en" className={openSans.className}>
      <body className={openSans.className}>
        <Providers>
          <LanguageSelector />
          <GlobalHeader Header={<Header />} MemberHeader={<MemberHeader />} />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

export const Header = async () => {
  const globalComponent = await getGlobalComponent();

  const context: UniformSlotProps<string>["context"] = {
    composition: globalComponent,
    path: "global",
    searchParams: {},
  };

  return <UniformSlot name="header" data={globalComponent} context={context} />;
};

export const MemberHeader = async () => {
  const globalComponent = await getGlobalMemberComponent();

  const context: UniformSlotProps<string>["context"] = {
    composition: globalComponent,
    path: "global",
    searchParams: {},
  };

  return <UniformSlot name="header" data={globalComponent} context={context} />;
};

export const Footer = async () => {
  const globalComponent = await getGlobalComponent();

  const context: UniformSlotProps<string>["context"] = {
    composition: globalComponent,
    path: "global",
    searchParams: {},
  };

  return <UniformSlot name="footer" data={globalComponent} context={context} />;
};
