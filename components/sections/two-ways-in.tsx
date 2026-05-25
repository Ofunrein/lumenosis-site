"use client";

import { Check } from "lucide-react";
import Magnet from "@/components/magnet";
import { GlowCard } from "@/components/spotlight-card";
import { StarButton } from "@/components/ui/star-button";

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

export function TwoWaysIn() {
  return (
    <section className="border-b border-[var(--color-line)] bg-[var(--color-bg-cream)] py-16 dark:bg-transparent md:py-24">
      <div className="mx-auto w-[min(1200px,calc(100%-32px))]">
        <div className="mb-12">
          <p className="mb-3 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-violet)]">
            06 — Programs
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-display-section)] font-semibold leading-[1.05] text-[var(--color-ink-charcoal)]">
            Two ways in. <em className="text-[var(--color-gold-italic)]">One destination.</em>
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {paths.map((path) => (
            <GlowCard
              key={path.path}
              glowColor="purple"
              customSize
              className={`flex h-full flex-col p-8 ${
                path.dark
                  ? "[--backup-border:rgb(203_108_230_/_0.2)] [--backdrop:var(--color-brand-charcoal)] text-white"
                  : "[--backup-border:var(--color-line)] [--backdrop:var(--color-bg-cream)] text-[var(--color-ink-charcoal)] dark:[--backdrop:rgb(0_0_0_/_0.4)]"
              }`}
            >
              {path.popular && (
                <span className="absolute -top-3 right-6 rounded-full bg-[var(--color-gold-italic)] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
                  MOST POPULAR
                </span>
              )}

              <p
                className={`mb-4 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] ${
                  path.dark ? "text-[var(--color-gold-italic)]" : "text-[var(--color-brand-violet)]"
                }`}
              >
                {path.path}
              </p>

              <h3 className="mb-3 font-[family-name:var(--font-display)] text-4xl font-semibold">
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
                className={`mb-5 text-base ${
                  path.dark ? "text-white/65" : "text-[var(--color-muted)]"
                }`}
              >
                {path.description}
              </p>

              <div
                className={`mb-5 flex items-center gap-2 border-t pt-4 pb-4 text-sm ${
                  path.dark
                    ? "border-white/10 text-white/45"
                    : "border-[var(--color-line)] text-[var(--color-muted)]"
                }`}
              >
                <span className="text-[10px] font-semibold tracking-wider uppercase">BEST FOR</span>
                <span
                  className={`font-medium ${
                    path.dark ? "text-white/80" : "text-[var(--color-ink-charcoal)]"
                  }`}
                >
                  {path.bestFor}
                </span>
              </div>

              <ul className="mb-8 grid flex-1 gap-3">
                {path.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className={`mt-0.5 size-4 shrink-0 ${
                        path.dark
                          ? "text-[var(--color-gold-italic)]"
                          : "text-[var(--color-brand-violet)]"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        path.dark ? "text-white/75" : "text-[var(--color-ink-charcoal)]"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <p
                className={`mb-3 text-xs font-semibold tracking-widest uppercase ${
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
                <StarButton
                  lightColor={path.dark ? "#e8c47a" : "#cb6ce6"}
                  backgroundColor={path.dark ? "#e8c47a" : "#cb6ce6"}
                  className={`h-12 w-full justify-center rounded-xl text-sm ${
                    path.dark
                      ? "bg-[var(--color-gold-italic)] text-black [&_span]:text-black"
                      : "bg-[var(--color-brand-charcoal)] text-white dark:bg-[var(--color-brand-violet)] [&_span]:text-white"
                  }`}
                  onClick={() => {
                    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {path.cta}
                </StarButton>
              </Magnet>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
