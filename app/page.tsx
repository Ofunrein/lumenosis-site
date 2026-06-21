import { AuroraBackground } from "@/components/aurora-background";
import { AriaDeepDive } from "@/components/sections/aria-deep-dive";
import { CalendarCTA } from "@/components/sections/calendar-cta";
import { CaseStudyWall } from "@/components/sections/case-study-wall";
import { Faq } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { FounderVSL } from "@/components/sections/founder-vsl";
import { Hero } from "@/components/sections/hero";
import { MeetTheTeam } from "@/components/sections/meet-the-team";
import { ProblemAgitation } from "@/components/sections/problem-agitation";
import { PullQuote } from "@/components/sections/pull-quote";
import { StickyCtaBar } from "@/components/sections/sticky-cta-bar";
import { Timeline30Day } from "@/components/sections/timeline-30day";
import { Topbar } from "@/components/sections/topbar";
import { TrustStrip } from "@/components/sections/trust-strip";
import { TwoWaysIn } from "@/components/sections/two-ways-in";

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
    {
      "@type": "Service",
      "@id": "https://lumenosis.com/#service",
      name: "Real Estate AI Agents",
      provider: { "@id": "https://lumenosis.com/#organization" },
      serviceType: "AI agents for real estate lead response",
      areaServed: "United States",
      url: "https://lumenosis.com",
      description:
        "AI agents that answer real estate calls, texts, emails, website leads, and social DMs, then qualify and route property conversations.",
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
      <main className="pt-20">
        <Hero />
        <TrustStrip />
        <FounderVSL />
        <ProblemAgitation />
        <MeetTheTeam />
        <AriaDeepDive />
        <Timeline30Day />
        <TwoWaysIn />
        <CaseStudyWall />
        <CalendarCTA />
        <Faq />
        <FinalCTA />
        <PullQuote />
      </main>
      <Footer />
      <StickyCtaBar />
    </>
  );
}
