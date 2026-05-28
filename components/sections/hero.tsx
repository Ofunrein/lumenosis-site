"use client";
import { motion } from "framer-motion";
import { Clock, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GlassStatCallout } from "@/components/glass-stat-callout";
import Magnet from "@/components/magnet";
import { SpotlightButtonWrapper } from "@/components/spotlight-button";
import { GlowCard } from "@/components/spotlight-card";
import { StarButton } from "@/components/ui/star-button";
import { niches } from "@/content/niches";

const HERO_IMAGE_ALT =
  "Exterior view of a modern two-story luxury home with large windows and a contemporary facade";
const HERO_IMAGES = {
  dark: "/images/product-card-mockup.png",
  light: "/images/product-card-mockup-day.png",
} as const;
const HERO_FADE_MS = 240;

export function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [heroVisible, setHeroVisible] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const fadeTimerRef = useRef<number | null>(null);
  const longestNiche = niches.reduce((longest, niche) =>
    niche.length > longest.length ? niche : longest,
  );
  const activeTheme = mounted && !isDarkTheme ? "light" : "dark";
  const heroSrc = HERO_IMAGES[activeTheme];

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => setIsDarkTheme(root.classList.contains("dark"));
    syncTheme();
    setMounted(true);

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReduceMotion = () => setReduceMotion(mediaQuery.matches);
    syncReduceMotion();
    mediaQuery.addEventListener("change", syncReduceMotion);
    return () => mediaQuery.removeEventListener("change", syncReduceMotion);
  }, []);

  useEffect(() => {
    if (reduceMotion || !mounted) return;
    const timeout = window.setTimeout(() => {
      setTitleIndex(titleIndex === niches.length - 1 ? 0 : titleIndex + 1);
    }, 2000);
    return () => window.clearTimeout(timeout);
  }, [mounted, reduceMotion, titleIndex]);

  useEffect(() => {
    if (!mounted) return;
    const alternateSrc = activeTheme === "dark" ? HERO_IMAGES.light : HERO_IMAGES.dark;
    const preload = new window.Image();
    preload.src = alternateSrc;
  }, [activeTheme, mounted]);

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) {
        window.clearTimeout(fadeTimerRef.current);
      }
    };
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: activeTheme intentionally retriggers the image crossfade.
  useEffect(() => {
    if (!mounted || reduceMotion) {
      setHeroVisible(true);
      return;
    }

    setHeroVisible(false);
    if (fadeTimerRef.current) {
      window.clearTimeout(fadeTimerRef.current);
    }
    fadeTimerRef.current = window.setTimeout(() => {
      setHeroVisible(true);
      fadeTimerRef.current = null;
    }, 30);
  }, [activeTheme, mounted, reduceMotion]);

  return (
    <section
      id="top"
      className="relative border-b border-[var(--color-line)] bg-[var(--color-bg-cream)] pt-28 pb-10 dark:bg-transparent xl:pb-0 xl:pt-0"
    >
      {/* Match the bounded container behavior used by the rest of the page. */}
      <div className="mx-auto grid w-[min(1200px,calc(100%-40px))] gap-8 sm:w-[min(1200px,calc(100%-32px))] xl:min-h-[660px] xl:grid-cols-[minmax(0,0.92fr)_minmax(0,0.88fr)] xl:items-stretch xl:gap-16">
        {/* Text column */}
        <div className="flex flex-col items-center justify-center px-1 py-12 text-center sm:px-4 sm:py-16 xl:px-0">
          <h1 className="w-full max-w-[650px] text-center font-[family-name:var(--font-display)] text-[clamp(2.4rem,4.45vw,4.75rem)] font-semibold leading-[1.04] tracking-tight text-[var(--color-ink-charcoal)] xl:text-[clamp(3.25rem,4vw,4.75rem)]">
            <span className="block">AI agents for your</span>
            <span
              className="relative mx-auto block max-w-full overflow-hidden text-[0.82em] italic text-[var(--color-gold-italic)] sm:text-[1em]"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="invisible block whitespace-nowrap" aria-hidden>
                {longestNiche}
              </span>
              {!mounted ? (
                <span className="absolute inset-x-0 top-0 block whitespace-nowrap">
                  {niches[0]}
                </span>
              ) : (
                niches.map((niche, index) => (
                  <motion.span
                    key={niche}
                    className="absolute inset-x-0 top-0 block whitespace-nowrap"
                    initial={false}
                    transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 50 }}
                    animate={
                      titleIndex === index
                        ? { y: 0, opacity: 1 }
                        : { y: titleIndex > index ? "-115%" : "115%", opacity: 0 }
                    }
                  >
                    {niche}
                  </motion.span>
                ))
              )}
            </span>
            <span className="block">team.</span>
          </h1>
          <p className="mt-5 w-full max-w-[590px] text-center text-[length:var(--text-body-lg)] leading-snug text-[var(--color-muted)]">
            Olivia answers your website. Aria answers the phone. Theo texts every lead in under
            sixty seconds. Iris turns inbound emails into booked valuations.
          </p>
          <div className="mt-8 flex w-full max-w-[590px] justify-center">
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
        <div className="relative mx-auto mt-4 aspect-[11/13] w-full max-w-[420px] px-2 sm:aspect-[4/3] sm:max-w-[620px] xl:mt-0 xl:aspect-auto xl:h-auto xl:min-h-full xl:max-w-none xl:px-0 xl:py-8">
          <div className="absolute inset-0 xl:inset-y-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-6 -inset-y-7 rounded-[36px] opacity-0 blur-2xl dark:hidden xl:-inset-x-8 xl:-inset-y-9 xl:blur-3xl"
              style={{
                background:
                  "radial-gradient(72% 80% at 20% 12%, rgba(24,29,37,0.34), transparent 56%), radial-gradient(84% 88% at 82% 86%, rgba(22,26,33,0.28), transparent 60%), radial-gradient(100% 100% at 50% 50%, rgba(16,20,27,0.18), transparent 74%)",
                opacity: activeTheme === "light" ? 1 : 0,
              }}
            />
            <GlowCard
              glowColor="purple"
              customSize
              radius={24}
              className="h-full w-full !p-0 overflow-hidden shadow-[0_34px_90px_rgba(18,21,28,0.22),0_12px_34px_rgba(24,28,35,0.16)] [--backdrop:rgba(243,239,231,0.95)] [--backup-border:rgba(34,40,49,0.22)] [--outer:0.92] dark:shadow-none dark:[--backdrop:transparent] dark:[--backup-border:rgba(255,255,255,0.08)] dark:[--outer:1]"
            >
              <Image
                key={heroSrc}
                src={heroSrc}
                alt={HERO_IMAGE_ALT}
                fill
                priority
                sizes="(max-width: 768px) 420px, 50vw"
                className="object-cover transition-opacity"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transitionDuration: `${reduceMotion ? 0 : HERO_FADE_MS}ms`,
                }}
              />
              <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-[rgba(255,255,255,0.24)] shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_0_0_0_1px_rgba(24,29,36,0.06)] dark:border-white/0 dark:shadow-none" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[24px] dark:hidden"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(18,22,29,0.14) 0%, rgba(18,22,29,0.06) 34%, transparent 58%), radial-gradient(92% 92% at 16% 12%, rgba(37,45,57,0.16), transparent 42%), radial-gradient(76% 80% at 84% 84%, rgba(23,28,35,0.14), transparent 54%)",
                }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(245,244,238,0.1),transparent_25%)] dark:bg-[linear-gradient(to_right,rgba(10,7,15,0.1),transparent_25%)]" />
            </GlowCard>
          </div>

          {/* Stat callouts */}
          <GlassStatCallout
            label="Avg lead response"
            value="60 seconds"
            icon={<Clock className="size-4" />}
            className="absolute left-5 top-6 xl:-left-5 xl:top-20 z-10"
          />
          <GlassStatCallout
            label="Always-on coverage"
            value="24 / 7"
            icon={<ShieldCheck className="size-4" />}
            className="absolute left-5 bottom-6 xl:-left-5 xl:bottom-20 z-10"
          />
        </div>
      </div>
    </section>
  );
}
