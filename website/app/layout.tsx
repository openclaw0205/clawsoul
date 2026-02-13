import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ClawSoul - Soul Templates for OpenClaw",
    template: "%s | ClawSoul",
  },
  description:
    "Community-driven marketplace for OpenClaw soul templates. Give your AI assistant expertise instantly with pre-configured personality templates.",
  keywords: [
    "OpenClaw",
    "AI",
    "assistant",
    "templates",
    "persona",
    "soul",
    "AI agent",
    "LLM",
    "prompt engineering",
    "AI personality",
  ],
  metadataBase: new URL("https://clawsoul.vercel.app"),
  openGraph: {
    title: "ClawSoul - Soul Templates for OpenClaw",
    description:
      "Give your AI assistant expertise instantly with community-driven soul templates.",
    type: "website",
    siteName: "ClawSoul",
    url: "https://clawsoul.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClawSoul - Soul Templates for OpenClaw",
    description:
      "Give your AI assistant expertise instantly with community-driven soul templates.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    languages: {
      en: "/en",
      zh: "/zh",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950`}
      >
        {children}
      </body>
    </html>
  );
}
