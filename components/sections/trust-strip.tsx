"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const reLogos = [
  {
    id: "compass",
    label: "Compass",
    src: "/images/trust/compass-logo.svg",
  },
  {
    id: "keller-williams",
    label: "Keller Williams",
    src: "/images/trust/keller-williams-logo.svg",
  },
  {
    id: "exp-realty",
    label: "eXp Realty",
    src: "/images/trust/exp-realty-logo.png",
  },
  {
    id: "remax",
    label: "RE/MAX",
    src: "/images/trust/remax-logo.svg",
  },
];

const repeatedLogos = [
  ...reLogos.map((logo) => ({ ...logo, instanceId: `${logo.id}-a` })),
  ...reLogos.map((logo) => ({ ...logo, instanceId: `${logo.id}-b` })),
  ...reLogos.map((logo) => ({ ...logo, instanceId: `${logo.id}-c` })),
];

export function TrustStrip() {
  return (
    <section
      aria-label="Trusted by leading real estate teams"
      className="border-b border-[var(--color-line)] bg-[#ede8db] py-8 dark:bg-black/30"
    >
      <p className="mb-6 text-center text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
        Trusted by top real estate teams
      </p>
      <div className="relative mx-auto overflow-hidden lg:max-w-5xl">
        <Carousel
          opts={{ loop: true }}
          plugins={[AutoScroll({ playOnInit: true, speed: 1, stopOnInteraction: false })]}
        >
          <CarouselContent className="ml-0 items-center">
            {repeatedLogos.map((logo) => (
              <CarouselItem
                key={logo.instanceId}
                className="flex basis-1/2 justify-center pl-0 sm:basis-1/3 md:basis-1/4"
              >
                <div className="mx-8 flex h-12 w-40 shrink-0 items-center justify-center opacity-65 transition-opacity hover:opacity-95 dark:opacity-95 dark:hover:opacity-100">
                  <span
                    aria-label={logo.label}
                    role="img"
                    className="block h-8 w-36 bg-[var(--color-ink-charcoal)] dark:bg-white"
                    style={{
                      WebkitMask: `url(${logo.src}) center / contain no-repeat`,
                      mask: `url(${logo.src}) center / contain no-repeat`,
                    }}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {/* Left progressive blur */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg-cream)] via-[var(--color-bg-cream)]/60 to-transparent dark:from-black/80 dark:via-black/40 dark:to-transparent" />
          <div className="absolute inset-0 backdrop-blur-[2px] [mask-image:linear-gradient(to_right,black_0%,black_40%,transparent_100%)]" />
        </div>

        {/* Right progressive blur */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28">
          <div className="absolute inset-0 bg-gradient-to-l from-[var(--color-bg-cream)] via-[var(--color-bg-cream)]/60 to-transparent dark:from-black/80 dark:via-black/40 dark:to-transparent" />
          <div className="absolute inset-0 backdrop-blur-[2px] [mask-image:linear-gradient(to_left,black_0%,black_40%,transparent_100%)]" />
        </div>
      </div>
    </section>
  );
}
