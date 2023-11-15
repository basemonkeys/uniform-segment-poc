import {
  type UniformCompositionProps,
  UniformComposition,
  getDefaultCanvasClient,
} from "@uniformdev/canvas-next-rsc";
import { CANVAS_PUBLISHED_STATE } from "@uniformdev/canvas";
import { resolveComponent } from "@/components/index";

// import { getGlobalComponent, getGlobalMemberComponent } from "@/utils";

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
import "@/components";

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

// TODO: can I check user to conditionally render by id then remove MemberHeader component
export const Header = async () => {
  const client = getDefaultCanvasClient({ searchParams: {} });
  const composition = await client.getCompositionById({
    compositionId: "f289a2bd-09f9-4e33-ae03-7a6136055ec6",
    withComponentIDs: true,
    state: CANVAS_PUBLISHED_STATE,
  });
  const compositionRoute: UniformCompositionProps["route"] = {
    type: "composition",
    compositionApiResponse: composition,
    matchedRoute: "/",
  };

  return (
    <UniformComposition
      params={{
        path: ["header"],
      }}
      mode="server"
      resolveComponent={resolveComponent}
      route={compositionRoute}
    />
  );
};

export const MemberHeader = async () => {
  const client = getDefaultCanvasClient({ searchParams: {} });
  const composition = await client.getCompositionById({
    compositionId: "c7b7d708-21da-4a40-a1e8-ca235b0c7379",
    withComponentIDs: true,
    state: CANVAS_PUBLISHED_STATE,
  });
  const compositionRoute: UniformCompositionProps["route"] = {
    type: "composition",
    compositionApiResponse: composition,
    matchedRoute: "/member/dashboard",
  };

  return (
    <UniformComposition
      params={{
        path: ["header"],
      }}
      mode="server"
      resolveComponent={resolveComponent}
      route={compositionRoute}
    />
  );
};

export const Footer = async () => {
  const client = getDefaultCanvasClient({
    searchParams: {},
  });
  const composition = await client.getCompositionById({
    compositionId: "d609f2f4-89fb-47d0-bdd9-8b19ec6bf77f",
    withComponentIDs: true,
    state: CANVAS_PUBLISHED_STATE,
  });
  const compositionRoute: UniformCompositionProps["route"] = {
    type: "composition",
    compositionApiResponse: composition,
    matchedRoute: "/",
  };

  return (
    <UniformComposition
      params={{
        path: ["footer"],
      }}
      mode="server"
      resolveComponent={resolveComponent}
      route={compositionRoute}
    />
  );
};
