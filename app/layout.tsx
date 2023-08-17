import "./globals.css";
import { Inter } from "next/font/google";

import { Footer } from "@/components/Footer";
// Import all Uniform Canvas Components
import "../components/canvas";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Silver Sneakers",
  description: "Take online classes from home or visit us at the gym.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="main">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
