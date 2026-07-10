"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { RotatingText } from "@/components/rotating-text";

const HERO_IMAGE_ALT =
  "Modern hillside home overlooking a valley, wildflower meadow in the foreground";
const HERO_IMAGES = {
  dark: "/images/hero-hillside-dusk.webp",
  light: "/images/hero-hillside-day.webp",
} as const;
const HERO_FADE_MS = 300;

const RESPONSE_STEPS = ["3 days", "12 hours", "60 minutes", "< 60 seconds"];
const CHANNEL_MAX = 7;

function useCountUp(to: number, durationMs = 1200) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const steps = to;
    const interval = durationMs / steps;
    let current = 0;
    const id = setInterval(() => {
      current += 1;
      setVal(current);
      if (current >= to) clearInterval(id);
    }, interval);
    return () => clearInterval(id);
  }, [started, to, durationMs]);

  return { val, trigger: () => setStarted(true) };
}

function useResponseCycle(durationMs = 800) {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    if (idx >= RESPONSE_STEPS.length - 1) return;
    const fadeOut = setTimeout(() => setVisible(false), durationMs - 150);
    const next = setTimeout(() => {
      setIdx((i) => i + 1);
      setVisible(true);
    }, durationMs);
    return () => { clearTimeout(fadeOut); clearTimeout(next); };
  }, [started, idx, durationMs]);

  return { label: RESPONSE_STEPS[idx], visible, trigger: () => setStarted(true) };
}

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [imgVisible, setImgVisible] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsTriggered, setStatsTriggered] = useState(false);

  const response = useResponseCycle(1100);
  const channels = useCountUp(CHANNEL_MAX, 1800);
  const hours = useCountUp(24, 1600);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setIsDark(root.classList.contains("dark"));
    sync();
    setMounted(true);
    const obs = new MutationObserver(sync);
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Trigger stat animations when section enters view
  useEffect(() => {
    if (statsTriggered || reduceMotion) return;
    const el = statsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsTriggered(true);
          response.trigger();
          channels.trigger();
          hours.trigger();
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statsTriggered, reduceMotion]);

  const activeTheme = mounted ? (isDark ? "dark" : "light") : "light";
  const heroSrc = HERO_IMAGES[activeTheme];

  // biome-ignore lint/correctness/useExhaustiveDependencies: activeTheme triggers crossfade
  useEffect(() => {
    if (!mounted || reduceMotion) { setImgVisible(true); return; }
    setImgVisible(false);
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    fadeTimer.current = setTimeout(() => { setImgVisible(true); fadeTimer.current = null; }, 30);
    return () => { if (fadeTimer.current) clearTimeout(fadeTimer.current); };
  }, [activeTheme, mounted, reduceMotion]);

  return (
    <section
      id="top"
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden"
    >
      {/* Full-bleed image with no vignette or drop shadow. */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0">
          <Image
            key={heroSrc}
            src={heroSrc}
            alt={HERO_IMAGE_ALT}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[58%_center]"
            style={{
              opacity: imgVisible ? (isDark ? 0.72 : 0.78) : 0,
              transitionProperty: "opacity",
              transitionDuration: `${reduceMotion ? 0 : HERO_FADE_MS}ms`,
            }}
          />
        </div>
        <div className="absolute inset-0 bg-white/10 dark:bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-[min(1120px,calc(100vw-48px))] xl:w-[min(1120px,calc(100vw-80px))] pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="max-w-[620px] [text-shadow:0_1px_12px_rgba(245,244,238,0.9)] dark:[text-shadow:0_2px_14px_rgba(0,0,0,0.95)]">
          <h1 className="text-[clamp(1.75rem,3.8vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.04em] text-[var(--color-ink)]">
            <span className="sr-only">
              The AI operations layer for real estate teams, brokerages, property managers, short-term rental operators, and investors.
            </span>
            <span aria-hidden="true">
              <span className="block whitespace-nowrap">
                AI operations for
              </span>
              <span className="block text-[var(--color-brand-amber)] min-h-[1.1em]">
                <RotatingText
                  words={["real estate teams", "brokerages", "property managers", "short-term rentals", "investors"]}
                  intervalMs={2200}
                  minWidth="min(100%, 17ch)"
                />
              </span>
            </span>
          </h1>

          <p className="mt-6 text-[1.0625rem] leading-[1.65] text-[var(--color-muted)] max-w-[460px]">
            One team, all channels, nothing missed. Never let a conversation
            go cold or an opportunity go unnoticed. Busy work — scheduling,
            follow-ups, and the rest — handled too.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#book"
              className="inline-flex items-center px-6 h-11 rounded-full text-[14px] font-semibold bg-[var(--color-ink)] text-[var(--color-bg)] hover:opacity-85 transition-opacity active:scale-[0.97]"
            >
              Request a Demo
            </a>
            <a
              href="#agents"
              className="inline-flex items-center px-6 h-11 rounded-full text-[14px] font-medium border border-[var(--color-line)] text-[var(--color-ink)] hover:bg-[var(--color-line)] transition-colors"
            >
              See how it works
            </a>
          </div>

          {/* Animated stats */}
          <div ref={statsRef} className="mt-10 flex flex-wrap gap-7">
            {/* Stat 1: response time — cycles from days → hours → minutes → seconds */}
            <div className="min-w-[130px]">
              <p
                className="text-[1.25rem] font-semibold tracking-[-0.025em] text-[var(--color-ink)] transition-opacity duration-150"
                style={{ opacity: response.visible ? 1 : 0 }}
              >
                {reduceMotion ? "< 60 seconds" : response.label}
              </p>
              <p className="text-[0.8125rem] text-[var(--color-muted)] mt-0.5">first response</p>
            </div>

            {/* Stat 2: channel count — counts up 1→7 */}
            <div>
              <p className="text-[1.25rem] font-semibold tracking-[-0.025em] text-[var(--color-ink)] tabular-nums">
                {reduceMotion ? "7+" : `${channels.val}${channels.val >= CHANNEL_MAX ? "+" : ""}`}
              </p>
              <p className="text-[0.8125rem] text-[var(--color-muted)] mt-0.5">channels covered</p>
            </div>

            {/* Stat 3: 24/7 — counts up to 24 */}
            <div>
              <p className="text-[1.25rem] font-semibold tracking-[-0.025em] text-[var(--color-ink)] tabular-nums">
                {reduceMotion ? "24/7" : `${hours.val}/7`}
              </p>
              <p className="text-[0.8125rem] text-[var(--color-muted)] mt-0.5">no nights or weekends</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
