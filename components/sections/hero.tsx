"use client";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Clock, ShieldCheck } from "lucide-react";
import { GlassStatCallout } from "@/components/glass-stat-callout";
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
      className="relative overflow-hidden border-b border-[var(--color-line)] bg-[var(--color-bg-cream)] dark:bg-transparent pb-16 pt-20 md:pt-28"
    >
      <div className="relative z-10 mx-auto grid w-[min(1200px,calc(100%-48px))] sm:w-[min(1200px,calc(100%-32px))] items-start gap-8 md:grid-cols-[0.65fr_1.35fr] lg:grid-cols-[0.6fr_1.4fr] xl:grid-cols-[0.55fr_1.45fr] md:gap-10">
        <div>
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
          <div className="mt-7 flex flex-col items-start gap-3">
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

        <div className="relative aspect-[4/5] w-full max-w-[460px] justify-self-center md:max-w-none">
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[var(--color-brand-charcoal)] border border-[var(--color-line)]">
            <Image
              src="/images/product-card-mockup.png"
              alt="Lumenosis AI dashboard with CRM, iMessage thread, and booked appointment"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 67vw, 72vw"
              className="object-cover opacity-80"
            />
          </div>
          <GlassStatCallout
            label="Avg lead response"
            value="60 seconds"
            icon={<Clock className="size-4" />}
            className="absolute -left-3 top-4 md:-left-6"
          />
          <GlassStatCallout
            label="Always-on coverage"
            value="24 / 7"
            icon={<ShieldCheck className="size-4" />}
            className="absolute -bottom-4 left-12 md:-bottom-6"
          />
        </div>
      </div>
    </section>
  );
}
