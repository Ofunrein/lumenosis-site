export function PullQuote() {
  return (
    <section className="bg-[#f8f6ef] py-20 dark:bg-[rgb(13_10_18_/_0.72)] md:py-24">
      <figure className="mx-auto w-[min(900px,calc(100%-32px))] text-center">
        <blockquote className="font-[family-name:var(--font-display)] text-2xl italic leading-snug text-[var(--color-ink-charcoal)] md:text-3xl">
          &ldquo;I used to chase leads. Now I show up to appointments that already exist.&rdquo;
        </blockquote>
        <figcaption className="mt-5 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
          &mdash; Real Estate Professional, Austin TX
        </figcaption>
      </figure>
    </section>
  );
}
