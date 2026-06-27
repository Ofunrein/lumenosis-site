"use client";

import Image from "next/image";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { RotatingText } from "@/components/rotating-text";

const HERO_IMAGE_ALT =
  "Lumenosis AI agent inbox showing real estate conversations across channels";
const HERO_IMAGES = {
  dark: "/images/product-card-mockup.png",
  light: "/images/product-card-mockup-day.png",
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

  const response = useResponseCycle(650);
  const channels = useCountUp(CHANNEL_MAX, 1000);

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
      {/* Full-bleed atmospheric background image */}
      <div className="absolute inset-0 z-0">
        <Image
          key={heroSrc}
          src={heroSrc}
          alt={HERO_IMAGE_ALT}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[48%_100%]"
          style={{
            opacity: imgVisible ? (isDark ? 0.82 : 0.75) : 0,
            transitionProperty: "opacity",
            transitionDuration: `${reduceMotion ? 0 : HERO_FADE_MS}ms`,
          }}
        />
        {/* Left gradient — bg bleeds over image */}
        <div
          className="absolute inset-0"
          style={{
            background: mounted && isDark
              ? "linear-gradient(to right, #070708 22%, rgba(7,7,8,0.80) 38%, rgba(7,7,8,0.0) 55%, transparent 100%)"
              : "linear-gradient(to right, #f5f4ee 22%, rgba(245,244,238,0.82) 40%, rgba(245,244,238,0.08) 62%, transparent 100%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--color-bg)] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--color-bg)] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-6 sm:px-10 lg:px-8 pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="max-w-[600px]">
          <h1 className="text-[clamp(1.75rem,5.5vw,5rem)] font-bold leading-[1.08] tracking-[-0.04em] text-[var(--color-ink)]">
            <span className="sr-only">
              The AI operations layer for real estate teams, brokerages, property managers, short-term rental operators, and investors.
            </span>
            <span aria-hidden="true">
              {/* 'pretty' prevents orphaning "for" at the end of the first line */}
              <span className="block" style={{ textWrap: "pretty" } as React.CSSProperties}>
                The AI operations layer for
              </span>
              <span className="block text-[var(--color-brand-amber)] min-h-[1.1em]">
                <RotatingText
                  words={["real estate teams", "brokerages", "property managers", "short-term rentals", "investors"]}
                  intervalMs={2200}
                  minWidth="min(100%, 8ch)"
                />
              </span>
            </span>
          </h1>

          <p className="mt-6 text-[1.0625rem] leading-[1.65] text-[var(--color-muted)] max-w-[460px]">
            Iris, Aria, Theo, and Olivia handle every inbound conversation
            across email, calls, SMS, and chat. Qualify, route, and follow
            up before leads go cold.
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

            {/* Stat 3: 24/7 — static */}
            <div>
              <p className="text-[1.25rem] font-semibold tracking-[-0.025em] text-[var(--color-ink)]">24/7</p>
              <p className="text-[0.8125rem] text-[var(--color-muted)] mt-0.5">no nights or weekends</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
