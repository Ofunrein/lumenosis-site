import Image from "next/image";
import { trustLogos } from "@/content/trust-logos";

export function TrustStrip() {
  return (
    <section
      aria-label="Trust signals"
      className="border-b border-[var(--color-line)] bg-[var(--color-bg-cream)] py-6"
    >
      <div className="mx-auto flex w-[min(1200px,calc(100%-32px))] flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {trustLogos.map((logo) => (
          <div
            key={logo.label}
            className="grid size-12 place-items-center opacity-70 grayscale transition-opacity hover:opacity-100 hover:grayscale-0"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={40}
              className="h-7 w-auto"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
