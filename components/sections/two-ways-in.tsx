"use client";
import Magnet from '@/components/magnet';
import { StarButton } from '@/components/star-button';
import { pricingPaths } from "@/content/pricing";

export function TwoWaysIn() {
  return (
    <section className="border-b border-[var(--color-line)] bg-black py-16 md:py-24">
      <div className="mx-auto w-[min(1200px,calc(100%-32px))]">
        {/* Eyebrow */}
        <p className="mb-3 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-purple)]">
          06 — Programs
        </p>

        {/* Heading */}
        <h2 className="max-w-3xl font-[family-name:var(--font-display)] text-[length:var(--text-display-section)] font-semibold leading-[1.05] text-white">
          Two ways in.{" "}
          <em className="not-italic text-[var(--color-gold-italic)]">
            One destination.
          </em>
        </h2>

        {/* Pricing cards */}
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {pricingPaths.map((p) => (
            <article
              key={p.slug}
              className="relative rounded-2xl border border-[var(--color-line)] bg-[var(--color-brand-charcoal)]/80 p-7 shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
            >
              {/* BEST FIT badge */}
              {p.popular ? (
                <span className="absolute -top-3 right-6 rounded-full bg-[var(--color-brand-purple)] px-3 py-1 text-[var(--text-eyebrow)] font-semibold uppercase tracking-wider text-white">
                  Best fit
                </span>
              ) : null}

              {/* Card header */}
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
                {p.label}
              </h3>
              <p className="mt-1 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-purple)]">
                {p.starting}
              </p>
              <p className="mt-3 text-white/60">{p.pitch}</p>

              {/* Feature bullets */}
              <ul className="mt-5 grid gap-2 text-sm text-white/60">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span
                      aria-hidden
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--color-brand-purple)]"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 w-full flex">
                <Magnet padding={40} magnetStrength={4} wrapperClassName="w-full">
                  <StarButton
                    lightColor="#cb6ce6"
                    className={`w-full h-12 text-sm justify-center ${p.popular ? 'bg-[var(--color-brand-purple)] text-white' : 'bg-white/10 border border-white/20 text-white hover:bg-white/15'}`}
                    onClick={() => { window.location.href = '#book'; }}
                  >
                    Book a strategy call
                  </StarButton>
                </Magnet>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
