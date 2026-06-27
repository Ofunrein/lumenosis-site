import { GlowCard } from "@/components/spotlight-card";

const plans = [
  {
    label: "Team",
    title: "Install Iris Lead Desk",
    description:
      "For operators already investing in inquiries and losing opportunities to slow, fragmented follow-up.",
    bestFor: "3-15 operator teams, portal inquiry buyers, Meta/Google ad teams, brokerages without reliable response coverage",
    features: [
      "Email, SMS, calls, website chat, and social DM coverage",
      "Shared conversation timeline across every channel",
      "Property data brain from sheets, CRM, IDX export, or enrichment",
      "Human review rules for financing, legal, pricing, and sensitive replies",
      "CRM and calendar routing",
      "Two-week launch with optimization included",
    ],
    cta: "Request a Demo",
    ctaHref: "#book",
    featured: false,
  },
  {
    label: "Growth",
    title: "Expand your operation",
    description:
      "A managed omnichannel desk for brokerages, growth teams, and agencies with multiple sources, operators, markets, or client accounts.",
    bestFor: "Brokerages, multi-operator offices, white-label agencies, growth teams",
    features: [
      "Operator routing by market, source, urgency, language, or office",
      "Follow Up Boss, Lofty, kvCORE, GoHighLevel, HubSpot, or custom CRM",
      "Calendar, inquiry source, and property source integrations",
      "Owner visibility for operators, handoffs, and stuck conversations",
      "Ongoing monitoring, prompt tuning, reporting, and expansion",
    ],
    cta: "Map the Growth Build",
    ctaHref: "#book",
    featured: true,
  },
] as const;

export function TwoWaysIn() {
  return (
    <section id="plans" className="border-t border-[var(--color-line)] py-24 md:py-32">
      <div className="mx-auto w-[min(1120px,calc(100vw-32px))] px-5 sm:px-8 lg:px-0">

        {/* Header */}
        <div className="mb-14 md:mb-16">
          <h2 className="text-[clamp(1.9rem,4vw,3.1rem)] font-bold tracking-[-0.035em] leading-[1.05] text-[var(--color-ink)] max-w-[560px]">
            Install the desk that fits your operation.
          </h2>
          <p className="mt-4 text-[1.0625rem] text-[var(--color-muted)] max-w-[440px] leading-relaxed">
            Both options include the same AI system. The difference is scope, routing complexity, and how many channels you're coordinating.
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid gap-5 md:grid-cols-2 auto-rows-fr">
          {plans.map((plan) => (
            <GlowCard
              key={plan.label}
              glowColor="purple"
              customSize
              radius={14}
              className={[
                "flex flex-col p-7 border h-full",
                plan.featured
                  ? "[border-color:rgba(196,154,82,0.4)] bg-[#0a0e0c]"
                  : "border-[var(--color-line)]",
              ].join(" ")}
            >
              {/* Plan label */}
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="text-[0.6875rem] font-mono font-semibold uppercase tracking-[0.1em] text-[rgba(255,255,255,0.5)]">
                  {plan.label}
                </span>
                {plan.featured && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[0.625rem] font-semibold uppercase tracking-[0.1em] bg-[var(--color-brand-amber-soft)] text-[var(--color-brand-amber)]">
                    Popular
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className={`text-[1.25rem] font-bold tracking-[-0.02em] leading-[1.2] ${plan.featured ? "text-white" : "text-[var(--color-ink)]"}`}>
                {plan.title}
              </h3>

              {/* Description */}
              <p className={`mt-3 text-[0.9375rem] leading-relaxed ${plan.featured ? "text-white/85" : "text-[var(--color-muted)]"}`}>
                {plan.description}
              </p>

              {/* Best for */}
              <p className={`mt-4 text-[0.8125rem] leading-relaxed ${plan.featured ? "text-white/60" : "text-[var(--color-muted)] opacity-70"}`}>
                <span className="font-semibold uppercase tracking-[0.08em] text-[0.625rem]">Best for: </span>
                {plan.bestFor}
              </p>

              {/* Features */}
              <ul className="mt-6 grid gap-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[0.875rem]">
                    <span className={`mt-[3px] shrink-0 size-4 flex items-center justify-center rounded-full ${plan.featured ? "bg-[var(--color-brand-amber-soft)]" : "bg-[var(--color-line)]"}`}>
                      <svg viewBox="0 0 10 10" className={`size-2.5 ${plan.featured ? "text-[var(--color-brand-amber)]" : "text-[var(--color-muted)]"}`} fill="none" aria-hidden>
                        <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className={plan.featured ? "text-white/85" : "text-[var(--color-muted)]"}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={plan.ctaHref}
                className={[
                  "mt-8 inline-flex items-center justify-center h-11 rounded-full text-[14px] font-semibold transition-opacity hover:opacity-85 active:scale-[0.97]",
                  plan.featured
                    ? "bg-[var(--color-brand-amber)] text-white"
                    : "bg-[var(--color-ink)] text-[var(--color-bg)]",
                ].join(" ")}
              >
                {plan.cta}
              </a>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
