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

export default function Page() {
  return (
    <>
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
