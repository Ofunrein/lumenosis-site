"use client";
import { GlowCard } from "@/components/spotlight-card";
import Magnet from "@/components/magnet";
import { StarButton } from "@/components/star-button";
import { pricingPaths } from "@/content/pricing";

export function TwoWaysIn() {
  return (
    <section className="border-b border-[var(--color-line)] bg-[#1a1a1a] py-16 md:py-24">
      <div className="mx-auto w-[min(1200px,calc(100%-32px))]">
        <div className="max-w-2xl mb-10">
          <p className="mb-3 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-purple)]">
            06 — Programs
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-display-section)] font-semibold leading-[1.05] text-white">
            Simple pricing.{" "}
            <em className="not-italic text-[var(--color-gold-italic)]">
              No surprises.
            </em>
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {pricingPaths.map((p) => (
            <GlowCard key={p.slug} glowColor="purple" customSize className="flex flex-col relative">
              {p.popular && (
                <span className="absolute -top-3 right-4 rounded-full bg-[var(--color-brand-purple)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Popular
                </span>
              )}
              <h3 className="font-semibold text-white text-lg">{p.label}</h3>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">{p.price}</span>
                {p.subtext && <span className="text-white/50 text-sm">{p.subtext}</span>}
              </div>
              <p className="mt-2 text-sm text-white/55 border-b border-white/10 pb-4">{p.pitch}</p>
              <ul className="mt-4 grid gap-2 text-sm text-white/70 flex-1">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--color-brand-purple)]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Magnet padding={60} magnetStrength={5} wrapperClassName="mt-6 w-full">
                <StarButton
                  lightColor="#cb6ce6"
                  className={`w-full justify-center h-10 text-sm ${p.popular ? "bg-[var(--color-brand-purple)] text-white" : "bg-white/10 border border-white/20 text-white hover:bg-white/15"}`}
                  onClick={() => { window.location.href = '#book'; }}
                >
                  {p.cta}
                </StarButton>
              </Magnet>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
