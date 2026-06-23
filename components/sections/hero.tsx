"use client";
import { Clock, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GlassStatCallout } from "@/components/glass-stat-callout";
import Magnet from "@/components/magnet";
import { RotatingText } from "@/components/rotating-text";
import { SpotlightButtonWrapper } from "@/components/spotlight-button";
import { GlowCard } from "@/components/spotlight-card";
import { StarButton } from "@/components/ui/star-button";

const HERO_IMAGE_ALT =
  "Exterior view of a modern two-story luxury home with large windows and a contemporary facade";
const HERO_IMAGES = {
  dark: "/images/product-card-mockup.png",
  light: "/images/product-card-mockup-day.png",
} as const;
const HERO_FADE_MS = 240;
const HERO_AUDIENCES = [
  "real estate teams",
  "brokerages",
  "property managers",
  "short-term rental operators",
  "investors",
] as const;

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [heroVisible, setHeroVisible] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const fadeTimerRef = useRef<number | null>(null);
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
      className="relative border-b border-[var(--color-line)] bg-[var(--color-bg-cream)] pt-6 pb-10 dark:bg-transparent md:pt-10 xl:pb-0 xl:pt-0"
    >
      {/* Match the bounded container behavior used by the rest of the page. */}
      <div className="mx-auto grid w-full max-w-[1200px] min-w-0 justify-items-center gap-8 overflow-hidden px-5 sm:px-4 xl:min-h-[660px] xl:grid-cols-[minmax(0,0.92fr)_minmax(0,0.88fr)] xl:items-stretch xl:justify-items-stretch xl:gap-16 xl:px-0">
        {/* Text column */}
        <div className="flex flex-col items-center justify-center px-1 py-8 text-center sm:px-4 sm:py-12 xl:px-0 xl:py-16">
          <h1 className="w-full max-w-[650px] text-center font-[family-name:var(--font-display)] text-[clamp(2rem,8.2vw,4.75rem)] font-semibold leading-[1.04] tracking-tight text-[var(--color-ink-charcoal)] [overflow-wrap:anywhere] [text-wrap:balance] xl:text-[clamp(3.25rem,4vw,4.75rem)]">
            <span className="sr-only">
              The AI operations layer for real estate teams, brokerages, property managers,
              short-term rental operators, and investors.
            </span>
            <span className="headline-plain block max-w-full" aria-hidden="true">
              The AI operations layer for
            </span>
            <span
              className="mt-[1.12em] block min-h-[1.22em] leading-[1.06] italic text-[var(--color-gold-italic)] sm:mt-[0.96em] xl:mt-[0.82em]"
              aria-hidden="true"
            >
              <RotatingText
                words={HERO_AUDIENCES}
                intervalMs={2300}
                minWidth="min(100%, 8ch)"
                className="text-center"
              />
            </span>
          </h1>
          <p className="mx-auto mt-5 w-full max-w-[342px] min-w-0 text-center text-base leading-snug text-[var(--color-muted)] sm:max-w-[590px] sm:text-[length:var(--text-body-lg)]">
            Iris handles the conversations between your lead sources and your agents, answering
            inquiries, qualifying prospects, following up, and routing ready opportunities to the
            right person.
          </p>
          <div className="mt-8 flex w-full max-w-[590px] justify-center">
            <Magnet padding={60} magnetStrength={5}>
              <SpotlightButtonWrapper>
                <StarButton
                  lightColor="#cb6ce6"
                  backgroundColor="#cb6ce6"
                  className="bg-[var(--color-brand-purple)] text-white px-6 h-12 text-base [&_span]:text-white"
                >
                  <a href="#book">Request a Demo</a>
                </StarButton>
              </SpotlightButtonWrapper>
            </Magnet>
          </div>
        </div>

        {/* Image column */}
        <div className="relative mx-auto mt-4 aspect-[11/13] w-full max-w-[342px] min-w-0 px-2 sm:aspect-[4/3] sm:max-w-[620px] xl:mt-0 xl:aspect-auto xl:h-auto xl:min-h-full xl:max-w-none xl:px-0 xl:py-8">
          <div className="absolute inset-0 xl:inset-y-8">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[36px] opacity-0 blur-2xl dark:hidden sm:-inset-x-6 sm:-inset-y-7 xl:-inset-x-8 xl:-inset-y-9 xl:blur-3xl"
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
              className="h-full w-full !p-0 overflow-hidden shadow-[0_34px_90px_rgba(18,21,28,0.22),0_12px_34px_rgba(24,28,35,0.16)] [--border:0] [--backdrop:rgba(243,239,231,0.95)] [--backup-border:transparent] [--outer:0.92] dark:shadow-none dark:[--backdrop:transparent] dark:[--backup-border:transparent] dark:[--outer:1]"
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
              <div className="pointer-events-none absolute inset-[1px] rounded-[23px] shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] dark:shadow-none" />
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
            label="First response target"
            value="60 seconds"
            icon={<Clock className="size-4" />}
            className="absolute left-5 top-6 xl:-left-5 xl:top-20 z-10"
          />
          <GlassStatCallout
            label="Channels covered"
            value="7+"
            icon={<ShieldCheck className="size-4" />}
            className="absolute left-5 bottom-6 xl:-left-5 xl:bottom-20 z-10"
          />
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-10 backdrop-blur-sm [mask-image:linear-gradient(to_bottom,transparent,black_60%)] z-10"
      />
    </section>
  );
}
