export function PullQuote() {
  return (
    <section className="border-t border-b border-[var(--color-line)] py-20 md:py-28 bg-[#edeadf] dark:bg-[rgba(255,255,255,0.03)]">
      <div className="mx-auto w-[min(720px,calc(100vw-32px))] text-center px-4 sm:px-0">
        <blockquote>
          <p
            className="text-[clamp(1.3rem,2.8vw,1.9rem)] leading-[1.65] text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontStyle: "italic" }}
          >
            "I used to chase conversations. Now the right handoffs are already waiting."
          </p>
          <footer className="mt-8">
            <cite className="not-italic text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
              Real Estate Professional, Austin TX
            </cite>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
