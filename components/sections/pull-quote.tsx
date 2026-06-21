import { Reveal } from "@/components/reveal";

export function PullQuote() {
  return (
    <section className="bg-[#f8f6ef] py-20 dark:bg-[rgb(13_10_18_/_0.72)] md:py-24">
      <Reveal variant="scale">
        <figure className="mx-auto w-[min(900px,calc(100vw_-_40px))] sm:w-[min(900px,calc(100vw_-_32px))] text-center">
          <blockquote className="font-[family-name:var(--font-display)] text-2xl italic leading-snug text-[var(--color-ink-charcoal)] md:text-3xl">
            &ldquo;I used to chase conversations. Now the right handoffs are already waiting.&rdquo;
          </blockquote>
          <figcaption className="mt-5 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
            Real Estate Professional, Austin TX
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}
