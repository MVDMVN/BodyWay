import type { Metadata } from "next";
import ThemeProviderClient from "@/app/Components/ThemeProviderClient";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // какие нужны
  display: "swap",
});

export const metadata: Metadata = {
  title: "BodyWay",
  description: "Quiz → lightweight meal & workout suggestions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={plex.className}>
        <ThemeProviderClient>{children}</ThemeProviderClient>
      </body>
    </html>
  );
}
