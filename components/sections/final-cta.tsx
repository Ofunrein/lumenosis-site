"use client";
import Magnet from "@/components/magnet";
import { Reveal } from "@/components/reveal";
import { SpotlightButtonWrapper } from "@/components/spotlight-button";
import { StarButton } from "@/components/ui/star-button";

export function FinalCTA() {
  return (
    <section className="border-b border-[var(--color-line)] bg-[#f5f2e9] py-24 text-center dark:bg-transparent md:py-32">
      <div className="mx-auto w-[min(900px,calc(100%-40px))] sm:w-[min(900px,calc(100%-32px))]">
        <Reveal variant="up">
          <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-display-section)] font-semibold leading-[1.05] text-[var(--color-ink-charcoal)]">
            Install the lead desk before your next paid lead source{" "}
            <em className="not-italic text-[var(--color-brand-purple)]">starts leaking.</em>
          </h2>
        </Reveal>
        <Reveal variant="scale" delay={0.08} className="mt-8 flex justify-center">
          <Magnet padding={80} magnetStrength={5}>
            <SpotlightButtonWrapper>
              <StarButton
                lightColor="#cb6ce6"
                backgroundColor="#cb6ce6"
                className="bg-[var(--color-brand-purple)] text-white px-8 h-14 text-lg [&_span]:text-white"
                onClick={() => {
                  document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Book Demo
              </StarButton>
            </SpotlightButtonWrapper>
          </Magnet>
        </Reveal>
      </div>
    </section>
  );
}
