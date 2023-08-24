import { Inter } from "next/font/google";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import "./globals.css";

import { Providers } from "./providers";

// Import all Uniform Canvas Components
import "../components/canvas";

import Header from "../components/Header";
import MainNav from "../components/MainNav";
// import Footer from "../components/canvas/navigation/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Silver Sneakers",
  description: "Take online classes from home or visit us at the gym.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="sstheme">
      <body className={inter.className}>
        <Providers>
          <Header
          // onLogin={function (): void {
          //   throw new Error("Function not implemented.");
          // }}
          // onLogout={function (): void {
          //   throw new Error("Function not implemented.");
          // }}
          // onCheckEligibility={function (): void {
          //   throw new Error("Function not implemented.");
          // }}
          >
            {/* @ts-expect-error Server Component */}
            <MainNav />
          </Header>
          <main className="main">{children}</main>
          {/* TODO: This is a placeholder but ... some Tailwind styles are not accessible here, like text color and padding.
        This must be related to themeing. Maybe this will not be an issue once Footer component is styled. */}
          <footer className="text-center font-bold py-24">
            This is the footer!!!
          </footer>
        </Providers>
        {/* <Footer/> */}
      </body>
    </html>
  );
}
