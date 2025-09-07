import type { Metadata } from "next";
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

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""; // "/lander/bodyway" в твоём случае

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        {/* КЛЮЧЕВОЕ: фиксируем базовый путь для всех относительных URL */}
        <base href={(basePath ? basePath : "") + "/"} />
      </head>
      <body className={plex.className}>{children}</body>
    </html>
  );
}
