import { FilloutEmbed } from "@/components/fillout-embed";
import { GhlCalendar } from "@/components/ghl-calendar";

export function CalendarCTA() {
  const formId = process.env.NEXT_PUBLIC_FILLOUT_FORM_ID ?? "";
  const embedUrl = process.env.NEXT_PUBLIC_GHL_CALENDAR_EMBED_URL ?? "";

  return (
    <section id="book" className="border-b border-[var(--color-line)] bg-[var(--color-brand-charcoal)]/40 py-16 md:py-24">
      <div className="mx-auto grid w-[min(1200px,calc(100%-32px))] items-start gap-10 md:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="mb-3 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-purple)]">
            08 — Book
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-display-section)] font-semibold leading-[1.05] text-white">
            A 30-minute conversation that&apos;s{" "}
            <em className="not-italic text-[var(--color-gold-italic)]">
              actually worth your time.
            </em>
          </h2>
          <ul className="mt-6 grid gap-3 text-white/60">
            <li>You walk through your one biggest leak.</li>
            <li>We map the smallest useful workflow to fix it.</li>
            <li>You leave with a build path, not a sales pitch.</li>
            <li>Not a fit? We tell you exactly what to do instead.</li>
          </ul>
        </div>
        <div className="grid gap-5">
          {formId ? (
            <FilloutEmbed formId={formId} />
          ) : (
            <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-brand-charcoal)] p-6 text-white/60">
              Form embed is configured via NEXT_PUBLIC_FILLOUT_FORM_ID env var.
            </div>
          )}
          {embedUrl ? (
            <GhlCalendar
              embedUrl={embedUrl}
              title="Lumenosis AI strategy call calendar"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
