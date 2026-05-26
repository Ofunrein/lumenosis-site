"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { Check } from "lucide-react";
import Magnet from "@/components/magnet";
import { StarButton } from "@/components/ui/star-button";
import { SpotlightButtonWrapper } from "@/components/spotlight-button";

const paths = [
  {
    path: "PATH 01 · LAUNCH",
    title: "Start your",
    titleItalic: "team.",
    description:
      "The complete AI front desk for solo agents and small teams who want to stop losing leads to slow follow-up — in 30 days.",
    bestFor: "Solo agents & small teams",
    features: [
      "Olivia website chat agent",
      "Aria 24/7 voice receptionist",
      "Theo SMS sales agent",
      "CRM auto-sync + lead scoring",
      "30-day launch sprint",
      "2 weeks optimization included",
    ],
    popular: false,
    dark: false,
    cta: "Book a Demo →",
    price: "Starts at $197/mo",
  },
  {
    path: "PATH 02 · SCALE",
    title: "Scale your",
    titleItalic: "operation.",
    description:
      "Already running a team? We flood your pipeline with qualified booked appointments every month using the same system driving 300%+ booking lifts.",
    bestFor: "Brokerages, property management & multi-location teams",
    features: [
      "Everything in Launch",
      "Iris email assistant",
      "Per-agent + per-location coverage",
      "Monthly review with Martin",
      "Lead recovery sweep on dormant contacts",
      "Priority new-agent buildouts",
    ],
    popular: true,
    dark: true,
    cta: "Book a Demo →",
    price: "Starts at $397/mo",
  },
] as const;

function MagneticCard({ children, className }: { children: ReactNode; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [glowVisible, setGlowVisible] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const PAD = 70;
    const STRENGTH = 5;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const inRange =
        Math.abs(e.clientX - rect.left) < rect.width / 2 + PAD &&
        Math.abs(e.clientY - rect.top) < rect.height / 2 + PAD;
      if (inRange) {
        setIsActive(true);
        setPos({ x: dx / STRENGTH, y: dy / STRENGTH });
        setGlowPos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
        setGlowVisible(true);
      } else {
        setIsActive(false);
        setPos({ x: 0, y: 0 });
        setGlowVisible(false);
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={wrapRef} className="relative" style={{ display: "block" }}>
      <div
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          transition: isActive ? "transform 0.25s ease-out" : "transform 0.45s ease-in-out",
          willChange: "transform",
        }}
        className={className}
      >
        {/* Spotlight glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${glowPos.x}% ${glowPos.y}%, rgba(203,108,230,0.15), transparent 60%)`,
            opacity: glowVisible ? 1 : 0,
          }}
        />
        {children}
      </div>
    </div>
  );
}

export function TwoWaysIn() {
  return (
    <section className="border-b border-[var(--color-line)] bg-[#f8f6ef] py-16 dark:bg-[rgb(13_10_18_/_0.72)] md:py-24">
      <div className="mx-auto w-[min(1200px,calc(100%-32px))]">
        <div className="mb-12 md:mb-16">
          <p className="mb-3 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-violet)] dark:text-white">
            06 — Programs
          </p>
          <h2 className="max-w-4xl font-[family-name:var(--font-display)] text-[length:var(--text-display-section)] font-semibold leading-[1.05] text-[var(--color-ink-charcoal)] dark:text-white">
            Two ways in. <em className="text-[var(--color-gold-italic)]">One destination.</em>
          </h2>
        </div>

        <div className="grid items-stretch gap-6 md:grid-cols-2 lg:gap-8">
          {paths.map((path) => (
            <div key={path.path} className="relative">
              {path.popular && (
                <span className="absolute top-0 right-6 -translate-y-1/2 z-20 rounded-full bg-[var(--color-gold-italic)] text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap shadow-sm">
                  MOST POPULAR
                </span>
              )}
              <MagneticCard
                className={`isolate relative flex min-h-[560px] h-full flex-col overflow-hidden rounded-2xl border p-8 md:p-10 ${
                  path.dark
                    ? "md:-mt-4 border-[rgb(232_196_122_/_0.28)] bg-[#0b0711] text-white shadow-[0_34px_90px_rgb(10_7_17_/_0.32)] dark:shadow-[0_34px_90px_rgb(203_108_230_/_0.16)]"
                    : "border-[rgb(33_30_25_/_0.12)] bg-[#fffdf7] text-[var(--color-ink-charcoal)] shadow-[0_18px_50px_rgb(33_30_25_/_0.08)] dark:border-[rgb(255_255_255_/_0.1)] dark:bg-[#17111f] dark:text-white dark:shadow-none"
                }`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 -z-10 ${
                    path.dark
                      ? "bg-[radial-gradient(circle_at_18%_0%,rgb(203_108_230_/_0.24),transparent_34%),radial-gradient(circle_at_86%_10%,rgb(232_196_122_/_0.18),transparent_30%),linear-gradient(135deg,#12081a_0%,#07050b_62%,#151008_100%)]"
                      : "bg-[radial-gradient(circle_at_8%_0%,rgb(203_108_230_/_0.08),transparent_28%),linear-gradient(180deg,rgb(255_253_247_/_0.96),rgb(248_244_233_/_0.86))] dark:bg-[radial-gradient(circle_at_8%_0%,rgb(203_108_230_/_0.12),transparent_28%),linear-gradient(180deg,rgb(23_17_31_/_0.96),rgb(12_9_17_/_0.94))]"
                  }`}
                />

                <p
                  className={`mb-5 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.18em] ${
                    path.dark ? "text-[var(--color-gold-italic)]" : "text-[var(--color-brand-violet)]"
                  }`}
                >
                  {path.path}
                </p>

                <h3 className="mb-4 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.05] md:text-5xl">
                  {path.title}{" "}
                  <em
                    className={
                      path.dark
                        ? "text-[var(--color-gold-italic)]"
                        : "text-[var(--color-brand-violet)]"
                    }
                  >
                    {path.titleItalic}
                  </em>
                </h3>

                <p
                  className={`mb-7 max-w-xl text-base leading-relaxed md:text-lg ${
                    path.dark ? "text-white/86" : "text-[var(--color-muted)] dark:text-white/78"
                  }`}
                >
                  {path.description}
                </p>

                <div
                  className={`mb-7 flex flex-col gap-2 border-y py-4 text-sm sm:flex-row sm:items-center ${
                    path.dark
                      ? "border-white/14 text-white/70"
                      : "border-[var(--color-line)] text-[var(--color-muted)] dark:border-white/12 dark:text-white/68"
                  }`}
                >
                  <span className="text-[10px] font-semibold tracking-[0.16em] uppercase">
                    BEST FOR
                  </span>
                  <span
                    className={`font-medium ${
                      path.dark ? "text-white" : "text-[var(--color-ink-charcoal)] dark:text-white"
                    }`}
                  >
                    {path.bestFor}
                  </span>
                </div>

                <ul className="mb-9 grid flex-1 gap-3.5">
                  {path.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className={`mt-0.5 size-4 shrink-0 stroke-[2.2] ${
                          path.dark
                            ? "text-[var(--color-gold-italic)]"
                            : "text-[var(--color-brand-violet)]"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          path.dark
                            ? "text-white/88"
                            : "text-[var(--color-ink-charcoal)] dark:text-white/86"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <p
                  className={`mb-4 text-xs font-semibold tracking-widest uppercase ${
                    path.dark ? "text-[var(--color-gold-italic)]" : "text-[var(--color-brand-violet)]"
                  }`}
                >
                  {path.price}
                </p>

                <Magnet
                  padding={60}
                  magnetStrength={5}
                  wrapperClassName="w-full"
                  innerClassName="w-full"
                  style={{ position: "relative", display: "block", width: "100%" }}
                >
                  <SpotlightButtonWrapper className="w-full">
                    <StarButton
                      lightColor={path.dark ? "#e8c47a" : "#cb6ce6"}
                      backgroundColor={path.dark ? "#e8c47a" : "#cb6ce6"}
                      className={`h-12 w-full justify-center rounded-xl text-sm shadow-none ${
                        path.dark
                          ? "bg-[var(--color-gold-italic)] text-black [&_span]:!text-black"
                          : "bg-[var(--color-brand-charcoal)] text-white dark:bg-[var(--color-brand-violet)] [&_span]:!text-white"
                      }`}
                      onClick={() => {
                        document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      {path.cta}
                    </StarButton>
                  </SpotlightButtonWrapper>
                </Magnet>
              </MagneticCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
