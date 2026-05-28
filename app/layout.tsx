import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
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
  title: { default: "Lumenosis AI — AI agents for real estate", template: "%s — Lumenosis AI" },
  description:
    "AI agents that handle inbound calls, SMS, email, and lead recovery for real estate, brokerages, property management, short-term rentals, and investors.",
  metadataBase: new URL("https://lumenosis.com"),
  icons: {
    icon: [
      { url: "/favicon-rounded.ico", sizes: "any" },
      { url: "/icon-rounded.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon-rounded.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Lumenosis AI — AI agents for real estate",
    description: "AI agents that book qualified appointments while you sleep.",
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
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6a183ecc96c166bea68f7c1f"
          data-source="WEB_USER"
          strategy="afterInteractive"
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
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
