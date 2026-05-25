"use client";
import AutoScroll from "embla-carousel-auto-scroll";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const reLogos = [
  {
    id: "compass",
    label: "Compass",
    content: (
      <svg viewBox="0 0 120 30" className="h-6 w-auto fill-[var(--color-ink-charcoal)]">
        <text x="0" y="22" fontFamily="Georgia, serif" fontSize="18" fontWeight="700">Compass</text>
      </svg>
    )
  },
  {
    id: "kw",
    label: "Keller Williams",
    content: (
      <svg viewBox="0 0 160 30" className="h-6 w-auto fill-[var(--color-ink-charcoal)]">
        <text x="0" y="22" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="700">Keller Williams</text>
      </svg>
    )
  },
  {
    id: "exp",
    label: "eXp Realty",
    content: (
      <svg viewBox="0 0 100 30" className="h-6 w-auto fill-[var(--color-ink-charcoal)]">
        <text x="0" y="22" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="700">eXp Realty</text>
      </svg>
    )
  },
  {
    id: "bhhs",
    label: "Berkshire Hathaway HS",
    content: (
      <svg viewBox="0 0 230 30" className="h-5 w-auto fill-[var(--color-ink-charcoal)]">
        <text x="0" y="21" fontFamily="Georgia, serif" fontSize="11" fontWeight="600">Berkshire Hathaway HS</text>
      </svg>
    )
  },
  {
    id: "remax",
    label: "RE/MAX",
    content: (
      <svg viewBox="0 0 90 30" className="h-6 w-auto fill-[var(--color-ink-charcoal)]">
        <text x="0" y="22" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="900">RE/MAX</text>
      </svg>
    )
  },
];

export function TrustStrip() {
  return (
    <section aria-label="Trusted by leading real estate teams" className="border-b border-[var(--color-line)] bg-[var(--color-bg-cream)]/60 dark:bg-black/30 py-8">
      <p className="text-center text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)] mb-6">
        Trusted by top real estate teams
      </p>
      <div className="relative mx-auto lg:max-w-5xl overflow-hidden">
        <Carousel opts={{ loop: true }} plugins={[AutoScroll({ playOnInit: true, speed: 1, stopOnInteraction: false })]}>
          <CarouselContent className="ml-0 items-center">
            {[...reLogos, ...reLogos].map((logo, i) => (
              <CarouselItem key={`${logo.id}-${i}`} className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5">
                <div className="mx-10 flex shrink-0 items-center justify-center opacity-50 hover:opacity-100 transition-opacity">
                  {logo.content}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--color-bg-cream)] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--color-bg-cream)] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
