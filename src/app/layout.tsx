import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { GeistPixelGrid } from "geist/font/pixel";
import CursorGlow from "@/components/CursorGlow";
import Oneko from "@/components/Oneko";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fayz",
  description: "Computer science student & software developer writing production AI apps end to end.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistMono.variable} ${GeistPixelGrid.variable}`}>
      <body>
        <CursorGlow />
        <Oneko />
        {children}
      </body>
    </html>
  );
}


