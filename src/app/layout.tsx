import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { GeistPixelGrid, GeistPixelSquare } from "geist/font/pixel";
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
    <html lang="en" className={`${geistMono.variable} ${GeistPixelGrid.variable} ${GeistPixelSquare.variable}`}>
      <body>
        <Oneko />
        {children}
      </body>
    </html>
  );
}


