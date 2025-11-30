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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: "Advent of AI",
  description: "An advent calendar of AI engineering challenges. Learn goose by building real projects from CI automation to multi-agent orchestration.",
  authors: [{ name: "Advent of AI" }],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Advent of AI",
    description: "An advent calendar of AI engineering challenges. Learn goose by building real projects from CI automation to multi-agent orchestration.",
    type: "website",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/api/og`,
        width: 1200,
        height: 630,
        alt: 'Advent of AI - Build with goose',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Advent of AI",
    description: "An advent calendar of AI engineering challenges. Learn goose by building real projects from CI automation to multi-agent orchestration.",
    images: [`${siteUrl}/api/og`],
  },
  icons: {
    icon: '/goose-logo.png',
  },
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
