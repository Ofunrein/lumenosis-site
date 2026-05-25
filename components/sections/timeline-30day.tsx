import { timeline } from "@/content/timeline";

export function Timeline30Day() {
  return (
    <section
      id="process"
      className="border-b border-[var(--color-line)] bg-[var(--color-bg-cream)] py-16 md:py-24"
    >
      <div className="mx-auto w-[min(1200px,calc(100%-32px))]">
        {/* Eyebrow */}
        <p className="mb-3 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-violet)]">
          05 — Process
        </p>

        {/* Heading */}
        <h2 className="max-w-3xl font-[family-name:var(--font-display)] text-[length:var(--text-display-section)] font-semibold leading-[1.05] text-[var(--color-ink-charcoal)]">
          Thirty days to a{" "}
          <em className="not-italic text-[var(--color-gold-italic)]">
            fully running system.
          </em>
        </h2>

        {/* Timeline grid */}
        <ol className="relative mt-12 grid gap-6 md:grid-cols-4">
          {/* Connector line: desktop only, drawn behind the dot row */}
          <li
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[5px] hidden h-px bg-[var(--color-line)] md:block"
          />

          {timeline.map((w, i) => (
            <li key={w.week} className="relative">
              {/* Dot + week label row */}
              <div className="mb-4 flex items-center gap-3">
                <span
                  aria-hidden
                  className={`relative z-10 size-3 shrink-0 rounded-full ${
                    i === 1
                      ? "bg-[var(--color-gold-italic)]"
                      : "border border-[var(--color-line)] bg-white"
                  }`}
                />
                <span className="text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
                  {w.week} · {w.kicker}
                </span>
              </div>

              {/* Card content */}
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-ink-charcoal)]">
                {w.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                {w.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
