"use client";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GlassStatCallout } from "@/components/glass-stat-callout";
import Magnet from "@/components/magnet";
import { StarButton } from "@/components/ui/star-button";
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
      className="relative overflow-hidden border-b border-[var(--color-line)] bg-[#f5f4ee] pb-16 pt-20 dark:bg-[#0d0a12] md:pt-28"
    >
      {/* Dark mode: radial overlay for text legibility over Aurora */}
      <div className="absolute inset-0 z-10 hidden dark:block bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(0,0,0,0.6)_70%)] pointer-events-none" />

      <div className="relative z-20 mx-auto grid w-[min(1200px,calc(100%-32px))] items-start gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-12">
        <div>
          <p className="mb-3 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-purple)]">
            5.0 from 50+ verified real estate professionals
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-[length:var(--text-display-hero)] font-semibold leading-[1.04] tracking-tight text-[var(--color-ink-charcoal)]">
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
          <p className="mt-5 max-w-xl text-[length:var(--text-body-lg)] leading-snug text-[var(--color-muted)]">
            Olivia answers your website. Aria answers the phone. Theo texts every lead in under
            sixty seconds. Iris turns inbound emails into booked valuations.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Magnet padding={60} magnetStrength={5}>
              <StarButton
                lightColor="#cb6ce6"
                backgroundColor="#cb6ce6"
                className="bg-[var(--color-brand-purple)] text-white px-6 h-12 text-base [&_span]:text-white"
              >
                <a href="#book">Book a Demo</a>
              </StarButton>
            </Magnet>
            <Magnet padding={60} magnetStrength={5}>
              <StarButton
                lightColor="#cb6ce6"
                backgroundColor="transparent"
                className="h-12 border border-[var(--color-line)] bg-[var(--color-bg-cream)] px-6 text-base text-[var(--color-ink-charcoal)] hover:bg-[var(--color-brand-violet-soft)] dark:bg-[#14101c] [&_span]:text-[var(--color-ink-charcoal)] dark:[&_span]:text-white"
              >
                <a href="#vsl">Watch 90s overview</a>
              </StarButton>
            </Magnet>
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full max-w-[460px] justify-self-center md:max-w-none">
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[var(--color-brand-charcoal)] border border-[var(--color-line)]">
            <Image
              src="/images/product-card-mockup.png"
              alt="Lumenosis AI dashboard with CRM, iMessage thread, and booked appointment"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 460px"
              className="object-cover opacity-80"
            />
          </div>
          <GlassStatCallout
            label="Avg response"
            value="60 seconds"
            className="absolute -left-3 top-8 md:-left-6"
          />
          <GlassStatCallout
            label="More bookings"
            value="+300%"
            className="absolute -right-3 top-1/2 hidden md:-right-8 md:block"
          />
          <GlassStatCallout
            label="Coverage"
            value="24 / 7"
            className="absolute -bottom-4 left-12 md:-bottom-6"
          />
        </div>
      </div>
    </section>
  );
}
