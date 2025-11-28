import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: "Advent of AI - Frosty Agent Forge",
  description: "A 17-day AI agent challenge platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${syne.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
