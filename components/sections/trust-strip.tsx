"use client";
import AutoScroll from "embla-carousel-auto-scroll";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const reLogos = [
  { id: "compass", label: "Compass", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Compass_Real_Estate_logo.svg/320px-Compass_Real_Estate_logo.svg.png" },
  { id: "kw", label: "Keller Williams", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Keller_Williams_Realty_logo.svg/320px-Keller_Williams_Realty_logo.svg.png" },
  { id: "exp", label: "eXp Realty", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/EXp_Realty_Logo.svg/320px-EXp_Realty_Logo.svg.png" },
  { id: "bhhsre", label: "Berkshire Hathaway", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Berkshire_Hathaway_HomeServices_logo.svg/320px-Berkshire_Hathaway_HomeServices_logo.svg.png" },
  { id: "allcity", label: "AllCity Real Estate", src: "https://allcityrealestate.com/wp-content/uploads/2021/01/all-city-logo.png" },
];

export function TrustStrip() {
  return (
    <section aria-label="Trusted by leading real estate teams" className="border-b border-[var(--color-line)] bg-[var(--color-brand-charcoal)]/40 py-8">
      <p className="text-center text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)] mb-6">
        Trusted by top real estate teams
      </p>
      <div className="relative mx-auto lg:max-w-5xl overflow-hidden">
        <Carousel opts={{ loop: true }} plugins={[AutoScroll({ playOnInit: true, speed: 1 })]}>
          <CarouselContent className="ml-0">
            {[...reLogos, ...reLogos].map((logo, i) => (
              <CarouselItem key={`${logo.id}-${i}`} className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5">
                <div className="mx-8 flex shrink-0 items-center justify-center opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 invert">
                  <img src={logo.src} alt={logo.label} className="h-6 w-auto" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
