import Image from "next/image";
import { GlowCard } from "@/components/spotlight-card";

export function FounderVSL() {
  return (
    <section
      id="vsl"
      className="border-b border-[var(--color-line)] bg-[#f8f6ef] py-16 dark:bg-[#0d0a12] md:py-24"
    >
      <div className="mx-auto grid w-[min(1200px,calc(100%-32px))] items-center gap-10 md:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="mb-3 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-purple)]">
            01 — Why this matters
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-display-section)] font-semibold leading-[1.05] text-[var(--color-ink-charcoal)]">
            Why most agents are losing to faster competitors in 2026 —{" "}
            <em className="text-[var(--color-gold-italic)]">and what to do instead.</em>
          </h2>
          <ul className="mt-6 grid gap-3 text-[var(--color-muted)]">
            <li className="flex gap-3">
              <span
                aria-hidden
                className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--color-brand-purple)]"
              />
              <span>Speed-to-lead beats lead volume every time.</span>
            </li>
            <li className="flex gap-3">
              <span
                aria-hidden
                className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--color-brand-purple)]"
              />
              <span>Most teams already have leads. They lose them to slow follow-up.</span>
            </li>
            <li className="flex gap-3">
              <span
                aria-hidden
                className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--color-brand-purple)]"
              />
              <span>AI agents are not a chatbot. They are a front desk.</span>
            </li>
            <li className="flex gap-3">
              <span
                aria-hidden
                className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--color-brand-purple)]"
              />
              <span>Done right, the first booked appointment lands inside week three.</span>
            </li>
          </ul>
        </div>
        <GlowCard
          glowColor="purple"
          customSize
          className="overflow-hidden p-0 dark:[--color-bg-cream:#111019]"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[var(--color-dark-section)] shadow-[var(--shadow-glow-violet)]">
            <Image
              src="/images/martin-headshot.jpg"
              alt="Martin Ofunrein on Lumenosis AI strategy for real estate"
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              className="object-cover"
            />
            <button
              type="button"
              aria-label="Play overview video"
              className="absolute inset-0 grid place-items-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-purple)] focus-visible:ring-offset-2"
            >
              <span className="grid size-20 place-items-center rounded-full bg-[var(--color-brand-purple)]/90 shadow-[var(--shadow-glow-violet)]">
                <svg viewBox="0 0 24 24" className="size-8" fill="currentColor" aria-hidden>
                  <title>Play overview</title>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          </div>
        </GlowCard>
      </div>
    </section>
  );
}
