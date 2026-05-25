const leaks = [
  {
    n: "01",
    title: "Slow first response",
    body: "Portal leads, missed calls, and form submits sit while the prospect keeps searching.",
  },
  {
    n: "02",
    title: "Weak qualification",
    body: "The team does not capture timeline, intent, financing, property type, or next step cleanly.",
  },
  {
    n: "03",
    title: "No visible owner",
    body: "Leads enter the CRM. Nobody can see who owns the next action or when it is due.",
  },
];

export function ProblemAgitation() {
  return (
    <section id="method" className="border-b border-[var(--color-line)] bg-black py-16 md:py-24">
      <div className="mx-auto w-[min(1200px,calc(100%-32px))]">
        <div className="max-w-2xl">
          <p className="mb-3 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-purple)]">
            02 — The leak
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-display-section)] font-semibold leading-[1.05] text-white">
            The expensive leaks{" "}
            <em className="text-[var(--color-gold-italic)]">are not ad spend.</em>
          </h2>
          <p className="mt-4 text-[length:var(--text-body-lg)] text-white/60">
            You already have leads. You already have a CRM. The leak is the missing operating
            layer between them. Every minute a lead waits costs five hundred to two thousand
            dollars in eventual deal value.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {leaks.map((leak) => (
            <article
              key={leak.n}
              className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-brand-charcoal)]/80 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
            >
              <div className="mb-3 grid size-9 place-items-center rounded-lg bg-[var(--color-brand-purple-soft)] text-sm font-bold text-[var(--color-brand-purple)]">
                {leak.n}
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                {leak.title}
              </h3>
              <p className="mt-2 text-white/60">{leak.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
