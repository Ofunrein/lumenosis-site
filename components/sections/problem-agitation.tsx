"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/reveal";
import { GlowCard } from "@/components/spotlight-card";

const leaks = [
  {
    n: "01",
    title: "Expensive leads wait",
    body: "Zillow, Realtor.com, Meta, Google, and website leads keep shopping while your team is still deciding who should answer.",
  },
  {
    n: "02",
    title: "Every channel starts over",
    body: "Email, SMS, calls, chat, and social DMs live in separate threads, so the next reply misses the context that already exists.",
  },
  {
    n: "03",
    title: "No clear next step",
    body: "A lead may be interested, qualified, or ready to book, but nobody can see the owner, urgency, or route without digging.",
  },
];

const stats = [
  { prefix: "", suffix: " sec", target: 60, label: "first response target" },
  { prefix: "", suffix: "+", target: 7, label: "lead channels covered" },
  { prefix: "", suffix: " days", target: 30, label: "installation window" },
];

function useCountUp(target: number, active: boolean, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const raf = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(Math.round(p * target));
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

function StatItem({
  prefix,
  suffix,
  target,
  label,
  active,
}: (typeof stats)[0] & { active: boolean }) {
  const val = useCountUp(target, active);
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <span className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,4vw,3.5rem)] font-semibold leading-none text-[var(--color-ink-charcoal)] dark:text-white">
        {prefix}
        {val}
        {suffix}
      </span>
      <span className="text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">{label}</span>
    </div>
  );
}

export function ProblemAgitation() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setActive(true);
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="method"
      className="border-b border-[var(--color-line)] bg-[#f1eee6] py-16 dark:bg-[rgb(9_7_13_/_0.76)] md:py-24"
    >
      <div className="mx-auto w-[min(1200px,calc(100%-52px))] sm:w-[min(1200px,calc(100%-32px))]">
        <Reveal variant="up">
          <div className="max-w-2xl">
            <p className="mb-3 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-purple)]">
              02 — The leak
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-display-section)] font-semibold leading-[1.05] text-[var(--color-ink-charcoal)]">
              The leak is not lead volume.{" "}
              <em className="text-[var(--color-gold-italic)]">It is response continuity.</em>
            </h2>
            <p className="mt-4 text-[length:var(--text-body-lg)] text-[var(--color-muted)]">
              Real estate teams are already paying for attention. Iris Lead Desk sits between your
              lead sources, inboxes, phones, website, social DMs, CRM, and calendar so no lead gets
              a slow, fragmented, or context-free reply.
            </p>
          </div>
        </Reveal>

        <Reveal variant="scale" delay={0.08}>
          <div
            ref={statsRef}
            className="mt-10 mb-10 grid grid-cols-3 divide-x divide-[var(--color-line)] overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white/60 dark:divide-white/10 dark:border-white/10 dark:bg-white/[0.03]"
          >
            {stats.map((s) => (
              <div key={s.label} className="px-4 py-8">
                <StatItem {...s} active={active} />
              </div>
            ))}
          </div>
        </Reveal>

        <div className="grid items-stretch gap-4 md:grid-cols-3">
          {leaks.map((leak, index) => (
            <Reveal key={leak.n} variant="scale" delay={index * 0.1} className="h-full">
              <GlowCard
                glowColor="purple"
                customSize
                className="flex h-full min-h-[280px] flex-col dark:[--color-bg-cream:#111019]"
              >
                <div className="mb-3 grid size-9 place-items-center rounded-lg bg-[var(--color-brand-purple-soft)] text-sm font-bold text-[var(--color-brand-purple)]">
                  {leak.n}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-ink-charcoal)]">
                  {leak.title}
                </h3>
                <p className="mt-2 text-[var(--color-muted)]">{leak.body}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
