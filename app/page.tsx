import { AuroraBackground } from "@/components/aurora-background";
import { AriaDeepDive } from "@/components/sections/aria-deep-dive";
import { CalendarCTA } from "@/components/sections/calendar-cta";
import { Faq } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { PullQuote } from "@/components/sections/pull-quote";
import { StickyCtaBar } from "@/components/sections/sticky-cta-bar";
import { Topbar } from "@/components/sections/topbar";
import { TrustStrip } from "@/components/sections/trust-strip";

const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://lumenosis.com/#organization",
      name: "Lumenosis AI",
      alternateName: ["Lumenosis", "Lumenosis AI Agents"],
      url: "https://lumenosis.com",
      logo: "https://lumenosis.com/images/lumenosis-logo-rounded.png",
      description:
        "Lumenosis AI builds real estate AI agents for calls, SMS, email, website chat, and social DMs.",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://lumenosis.com/#software",
      name: "Lumenosis AI",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://lumenosis.com",
      creator: { "@id": "https://lumenosis.com/#organization" },
      description:
        "AI lead desk software for real estate teams, property managers, and short-term rental operators.",
      offers: {
        "@type": "Offer",
        category: "Real estate AI agents",
        availability: "https://schema.org/InStock",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is static SEO metadata generated from local constants.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteStructuredData) }}
      />
      <AuroraBackground />
      <Topbar />
      <main id="top">
        <Hero />
        <TrustStrip />
        <Process />
        <AriaDeepDive />
        <Faq />
        <CalendarCTA />
        <FinalCTA />
        <PullQuote />
      </main>
      <Footer />
      <StickyCtaBar />
    </>
  );
}
