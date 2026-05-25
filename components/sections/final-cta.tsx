"use client";
import Magnet from '@/components/magnet';
import { StarButton } from '@/components/ui/star-button';

export function FinalCTA() {
  return (
    <section className="border-b border-[var(--color-line)] bg-[var(--color-bg-cream)] dark:bg-transparent py-24 text-center md:py-32">
      <div className="mx-auto w-[min(900px,calc(100%-32px))]">
        <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-display-section)] font-semibold leading-[1.05] text-[var(--color-ink-charcoal)]">
          Have a thirty-minute conversation that&rsquo;s{" "}
          <em className="not-italic text-[var(--color-brand-purple)]">
            actually worth your time.
          </em>
        </h2>
        <div className="mt-8 flex justify-center">
          <Magnet padding={80} magnetStrength={5}>
            <StarButton lightColor="#cb6ce6" backgroundColor="#cb6ce6" className="bg-[var(--color-brand-purple)] text-white px-8 h-14 text-lg [&_span]:text-white">
              Book a Demo
            </StarButton>
          </Magnet>
        </div>
      </div>
    </section>
  );
}
