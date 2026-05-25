import type { Metadata } from "next";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumenosis AI — AI agents for real estate",
  description:
    "AI agents that handle inbound calls, SMS, email, and lead recovery for real estate, brokerages, property management, short-term rentals, and investors.",
  metadataBase: new URL("https://lumenosis.ai"),
  openGraph: {
    title: "Lumenosis AI — AI agents for real estate",
    description:
      "AI agents that book qualified appointments while you sleep. Real estate, brokerages, property management.",
    url: "https://lumenosis.ai",
    siteName: "Lumenosis AI",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
