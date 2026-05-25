import { Button } from "@/components/ui/button";
import { GlassStatCallout } from "@/components/glass-stat-callout";
import { RotatingText } from "@/components/rotating-text";
import { niches } from "@/content/niches";
import Image from "next/image";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-[var(--color-line)] bg-gradient-to-b from-white to-[var(--color-bg-cream)] pt-24 pb-16 md:pt-32 md:pb-24"
    >
      <div className="mx-auto grid w-[min(1200px,calc(100%-32px))] items-start gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-12">
        {/* Left: copy stack */}
        <div>
          <span className="mb-3 inline-block text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-violet)]">
            5.0 from 50+ verified real estate professionals
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-[length:var(--text-display-hero)] font-semibold leading-[1.04] tracking-tight text-[var(--color-primary-indigo)]">
            AI agents for your{" "}
            <RotatingText
              words={niches}
              className="italic text-[var(--color-gold-italic)]"
            />{" "}
            team.
          </h1>
          <p className="mt-5 max-w-xl text-[length:var(--text-body-lg)] leading-snug text-[var(--color-muted)]">
            Olivia answers your website. Aria answers the phone. Theo texts
            every lead in under sixty seconds. Iris turns inbound emails into
            booked valuations.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#book">Book a strategy call</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#vsl">Watch 90s overview</a>
            </Button>
          </div>
        </div>

        {/* Right: product card with floating glass stat callouts */}
        <div className="relative mx-auto w-full max-w-sm md:max-w-none">
          {/* aspect wrapper */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius)] bg-[var(--color-dark-section)]">
            <Image
              src="/images/product-card-mockup.png"
              alt="Lumenosis AI dashboard showing a CRM conversation thread, iMessage reply, and a booked appointment confirmation"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 460px"
              className="object-cover"
            />
          </div>

          {/* top-left callout */}
          <GlassStatCallout
            label="Avg response"
            value="60 seconds"
            className="absolute top-6 left-6"
          />

          {/* mid-right callout — hidden on mobile to prevent overflow past card edge */}
          <GlassStatCallout
            label="More bookings"
            value="+300%"
            className="absolute top-1/2 -right-4 hidden -translate-y-1/2 md:block md:-right-8"
          />

          {/* bottom-left callout */}
          <GlassStatCallout
            label="Coverage"
            value="24 / 7"
            className="absolute bottom-6 left-6"
          />
        </div>
      </div>
    </section>
  );
}
