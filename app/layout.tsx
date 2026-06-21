import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
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
  title: {
    default: "Lumenosis AI — Managed AI lead desk for real estate operators",
    template: "%s — Lumenosis AI",
  },
  description:
    "Iris is a managed AI lead desk for real estate teams. It answers leads fast, remembers the full conversation across every channel, uses real property data, and routes the next step to the right human.",
  metadataBase: new URL("https://lumenosis.com"),
  icons: {
    icon: [
      { url: "/favicon-rounded.ico", sizes: "any" },
      { url: "/icon-rounded.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon-rounded.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Lumenosis AI — Managed AI lead desk for real estate operators",
    description:
      "Managed AI lead handling for real estate teams that need fast replies, property-aware answers, and human routing.",
    url: "https://lumenosis.com",
    siteName: "Lumenosis AI",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <ThemeProvider>
          <a
            href="#top"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[var(--color-brand-purple)] focus:px-3 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
