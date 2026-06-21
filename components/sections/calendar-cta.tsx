import { GhlCalendar } from "@/components/ghl-calendar";
import { Reveal } from "@/components/reveal";

export function CalendarCTA() {
  const embedUrl = process.env.NEXT_PUBLIC_GHL_CALENDAR_EMBED_URL ?? "";

  return (
    <section
      id="book"
      className="border-b border-[var(--color-line)] bg-[#f8f6ef] py-8 dark:bg-transparent md:py-10"
    >
      <div className="mx-auto grid min-h-[calc(100svh-96px)] w-[min(1240px,calc(100%-40px))] items-center gap-7 sm:w-[min(1240px,calc(100%-32px))] md:grid-cols-[0.72fr_1.28fr]">
        <Reveal variant="left">
          <div>
            <p className="mb-3 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-purple)]">
              08 · Book
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-[1.04] text-[var(--color-ink-charcoal)]">
              A 30-minute demo that&apos;s{" "}
              <em className="not-italic text-[var(--color-gold-italic)]">actually useful.</em>
            </h2>
            <ul className="mt-6 grid gap-3 text-[var(--color-muted)]">
              <li>We map your current lead sources, CRM, calendar, and handoff rules.</li>
              <li>We identify where leads wait, repeat themselves, or lose context.</li>
              <li>You leave with a practical installation path and first-channel priority.</li>
              <li>If Iris is not the right fit, we tell you what to fix before buying anything.</li>
            </ul>
          </div>
        </Reveal>
        <Reveal variant="right" delay={0.08} className="grid gap-5">
          {embedUrl ? (
            <GhlCalendar embedUrl={embedUrl} title="Lumenosis AI strategy call calendar" />
          ) : (
            <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-cream)] p-6 text-[var(--color-muted)] dark:bg-white/[0.04]">
              Calendar embed is configured via NEXT_PUBLIC_GHL_CALENDAR_EMBED_URL env var.
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
