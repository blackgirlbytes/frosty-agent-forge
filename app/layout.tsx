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
  title: "Advent of AI - 17 Days of AI Agent Challenges",
  description: "Build AI agent proficiency through 17 hands-on challenges. Learn goose framework and agentic workflows this December.",
  authors: [{ name: "Advent of AI" }],
  openGraph: {
    title: "Advent of AI - 17 Days of AI Agent Challenges",
    description: "Build AI agent proficiency through 17 hands-on challenges. Learn goose framework and agentic workflows this December.",
    type: "website",
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Advent of AI - Build with Agents',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Advent of AI - 17 Days of AI Agent Challenges",
    description: "Build AI agent proficiency through 17 hands-on challenges. Learn goose framework and agentic workflows this December.",
    images: ['/api/og'],
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
