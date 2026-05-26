"use client";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Clock, ShieldCheck } from "lucide-react";
import { GlassStatCallout } from "@/components/glass-stat-callout";
import { GlowCard } from "@/components/spotlight-card";
import Magnet from "@/components/magnet";
import { StarButton } from "@/components/ui/star-button";
import { SpotlightButtonWrapper } from "@/components/spotlight-button";
import { niches } from "@/content/niches";

export function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const reduce = useReducedMotion();
  const longestNiche = niches.reduce((longest, niche) =>
    niche.length > longest.length ? niche : longest,
  );

  useEffect(() => {
    if (reduce) return;
    const timeout = window.setTimeout(() => {
      setTitleIndex(titleIndex === niches.length - 1 ? 0 : titleIndex + 1);
    }, 2000);
    return () => window.clearTimeout(timeout);
  }, [titleIndex, reduce]);

  return (
    <section
      id="top"
      className="relative border-b border-[var(--color-line)] bg-[var(--color-bg-cream)] dark:bg-transparent pt-20 md:pt-0"
    >
      {/* Two-column: text left, image right — image fills full column height */}
      <div className="mx-auto grid w-[min(1400px,100%)] md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:min-h-[580px] lg:min-h-[660px] md:items-stretch">

        {/* Text column */}
        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 md:pl-[max(32px,calc((100vw-1400px)/2+40px))] md:pr-14 lg:pl-[max(48px,calc((100vw-1400px)/2+60px))] text-center md:text-left">
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,4.8vw,5rem)] font-semibold leading-[1.04] tracking-tight text-[var(--color-ink-charcoal)]">
            AI agents for your{" "}
            <span
              className="relative inline-grid overflow-hidden align-bottom text-[0.82em] italic text-[var(--color-gold-italic)] sm:text-[1em]"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="invisible whitespace-nowrap" aria-hidden>
                {longestNiche}
              </span>
              {niches.map((niche, index) => (
                <motion.span
                  key={niche}
                  className="absolute inset-x-0 top-0 whitespace-nowrap"
                  initial={reduce ? false : { opacity: 0, y: "-115%" }}
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 50 }}
                  animate={
                    titleIndex === index
                      ? { y: 0, opacity: 1 }
                      : { y: titleIndex > index ? "-115%" : "115%", opacity: 0 }
                  }
                >
                  {niche}
                </motion.span>
              ))}
            </span>{" "}
            team.
          </h1>
          <p className="mt-5 max-w-lg text-[length:var(--text-body-lg)] leading-snug text-[var(--color-muted)]">
            Olivia answers your website. Aria answers the phone. Theo texts every lead in under
            sixty seconds. Iris turns inbound emails into booked valuations.
          </p>
          <div className="mt-8 flex justify-center md:justify-start">
            <Magnet padding={60} magnetStrength={5}>
              <SpotlightButtonWrapper>
                <StarButton
                  lightColor="#cb6ce6"
                  backgroundColor="#cb6ce6"
                  className="bg-[var(--color-brand-purple)] text-white px-6 h-12 text-base [&_span]:text-white"
                >
                  <a href="#book">Book a Demo</a>
                </StarButton>
              </SpotlightButtonWrapper>
            </Magnet>
          </div>
        </div>

        {/* Image column */}
        <div className="relative aspect-[4/5] md:aspect-auto md:h-auto md:min-h-full md:py-8 md:pr-8">
          <div className="absolute inset-0 md:inset-y-8 md:right-8">
            <GlowCard
              glowColor="purple"
              customSize
              radius={24}
              className="h-full w-full !p-0 overflow-hidden [--backdrop:transparent] [--backup-border:rgba(203,108,230,0.55)] dark:[--backup-border:rgba(203,108,230,0.65)]"
            >
              <Image
                src="/images/product-card-mockup.png"
                alt="Lumenosis AI — AI agents for real estate teams"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(245,244,238,0.1),transparent_25%)] dark:bg-[linear-gradient(to_right,rgba(10,7,15,0.1),transparent_25%)]" />
            </GlowCard>
          </div>

          {/* Stat callouts */}
          <GlassStatCallout
            label="Avg lead response"
            value="60 seconds"
            icon={<Clock className="size-4" />}
            className="absolute left-6 top-10 md:-left-5 md:top-20 z-10"
          />
          <GlassStatCallout
            label="Always-on coverage"
            value="24 / 7"
            icon={<ShieldCheck className="size-4" />}
            className="absolute left-6 bottom-10 md:-left-5 md:bottom-20 z-10"
          />
        </div>
      </div>
    </section>
  );
}
