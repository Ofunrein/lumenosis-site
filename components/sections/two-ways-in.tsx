import { Button } from "@/components/ui/button";
import { pricingPaths } from "@/content/pricing";

export function TwoWaysIn() {
  return (
    <section className="border-b border-[var(--color-line)] bg-white py-16 md:py-24">
      <div className="mx-auto w-[min(1200px,calc(100%-32px))]">
        {/* Eyebrow */}
        <p className="mb-3 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-violet)]">
          06 — Programs
        </p>

        {/* Heading */}
        <h2 className="max-w-3xl font-[family-name:var(--font-display)] text-[length:var(--text-display-section)] font-semibold leading-[1.05] text-[var(--color-ink-charcoal)]">
          Two ways in.{" "}
          <em className="not-italic text-[var(--color-gold-italic)]">
            One destination.
          </em>
        </h2>

        {/* Pricing cards — card-elevated recipe (white lift on page bg) */}
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {pricingPaths.map((p) => (
            <article
              key={p.slug}
              className="relative rounded-[var(--radius)] border border-[var(--color-line)] bg-[var(--color-bg-cream)] p-7 shadow-[0_4px_24px_rgba(17,21,19,0.10)]"
            >
              {/* BEST FIT badge — indigo bg + white text: #3730A3 on white = 7.22:1 WCAG AAA */}
              {p.popular ? (
                <span className="absolute -top-3 right-6 rounded-full bg-[var(--color-primary-indigo)] px-3 py-1 text-[var(--text-eyebrow)] font-semibold uppercase tracking-wider text-white">
                  Best fit
                </span>
              ) : null}

              {/* Card header */}
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink-charcoal)]">
                {p.label}
              </h3>
              <p className="mt-1 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-violet)]">
                {p.starting}
              </p>
              <p className="mt-3 text-[var(--color-muted)]">{p.pitch}</p>

              {/* Feature bullets — violet dots */}
              <ul className="mt-5 grid gap-2 text-sm text-[var(--color-muted)]">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span
                      aria-hidden
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--color-brand-violet)]"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/*
               * CTA hierarchy: Build = outline/ghost, Scale = primary fill.
               * Using variant prop when available; falls back to className override.
               */}
              <Button
                asChild
                variant={p.popular ? "primary" : "outline"}
                className="mt-7 w-full"
              >
                <a href="#book">Book a strategy call</a>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
