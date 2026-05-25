"use client";
import { Suspense, lazy } from 'react';
import Magnet from '@/components/magnet';
import { StarButton } from '@/components/star-button';
import { GlassStatCallout } from '@/components/glass-stat-callout';
import { RotatingText } from '@/components/rotating-text';
import { niches } from '@/content/niches';
import Image from 'next/image';

const Aurora = lazy(() => import('@/components/aurora'));

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-black border-b border-[var(--color-line)] pb-16 pt-20 md:pt-28">
      {/* Aurora animated bg */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Suspense fallback={null}>
          <Aurora colorStops={["#cb6ce6", "#7c3aed", "#cb6ce6"]} blend={0.4} amplitude={1.0} speed={0.4} />
        </Suspense>
      </div>
      {/* Radial fade overlay so text stays legible */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_top,transparent_0%,black_70%)]" />

      <div className="relative z-20 mx-auto grid w-[min(1200px,calc(100%-32px))] items-start gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-12">
        <div>
          <p className="mb-3 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-purple)]">
            5.0 from 50+ verified real estate professionals
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-[length:var(--text-display-hero)] font-semibold leading-[1.04] tracking-tight text-white">
            AI agents for your{" "}
            <RotatingText words={niches} className="italic text-[var(--color-gold-italic)]" />{" "}
            team.
          </h1>
          <p className="mt-5 max-w-xl text-[length:var(--text-body-lg)] leading-snug text-white/70">
            Olivia answers your website. Aria answers the phone. Theo texts every lead in
            under sixty seconds. Iris turns inbound emails into booked valuations.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Magnet padding={60} magnetStrength={5}>
              <StarButton lightColor="#cb6ce6" className="bg-[var(--color-brand-purple)] text-white px-6 h-12 text-base">
                Book a strategy call
              </StarButton>
            </Magnet>
            <Magnet padding={60} magnetStrength={5}>
              <StarButton lightColor="#ffffff" className="bg-white/10 border border-white/20 text-white px-6 h-12 text-base backdrop-blur-sm hover:bg-white/15">
                Watch 90s overview
              </StarButton>
            </Magnet>
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full max-w-[460px] justify-self-center md:max-w-none">
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[var(--color-brand-charcoal)] border border-[var(--color-line)]">
            <Image
              src="/images/product-card-mockup.png"
              alt="Lumenosis AI dashboard with CRM, iMessage thread, and booked appointment"
              fill priority sizes="(max-width: 768px) 100vw, 460px"
              className="object-cover opacity-80"
            />
          </div>
          <GlassStatCallout label="Avg response" value="60 seconds" className="absolute -left-3 top-8 md:-left-6 bg-black/80 border-[var(--color-line)] text-white" />
          <GlassStatCallout label="More bookings" value="+300%" className="absolute -right-3 top-1/2 hidden md:-right-8 md:block bg-black/80 border-[var(--color-line)] text-white" />
          <GlassStatCallout label="Coverage" value="24 / 7" className="absolute -bottom-4 left-12 md:-bottom-6 bg-black/80 border-[var(--color-line)] text-white" />
        </div>
      </div>
    </section>
  );
}
