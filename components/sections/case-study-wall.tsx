"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlowCard } from "@/components/spotlight-card";
import { caseStudies } from "@/content/case-studies";

const labels = {
  booking: "Booking volume",
  revenue: "Revenue",
  speed: "Speed-to-lead",
} as const;

export function CaseStudyWall() {
  return (
    <section className="border-b border-[var(--color-line)] bg-[var(--color-bg-cream)] dark:bg-black/25 py-16 md:py-24">
      <div className="mx-auto w-[min(1200px,calc(100%-32px))]">
        <span className="inline-block mb-3 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-purple)]">
          07 — Results
        </span>
        <h2 className="max-w-3xl font-[family-name:var(--font-display)] text-[length:var(--text-display-section)] font-semibold leading-[1.05] text-[var(--color-ink-charcoal)]">
          Don&apos;t just take our word for it.
        </h2>

        <Tabs defaultValue="booking" className="mt-8">
          <TabsList className="flex h-auto flex-wrap gap-2 bg-transparent p-0">
            {(Object.entries(labels) as Array<[keyof typeof labels, string]>).map(([k, v]) => (
              <TabsTrigger
                key={k}
                value={k}
                className="rounded-[var(--radius-pill)] border border-[var(--color-line)] bg-[var(--color-brand-violet-soft)] px-4 py-2 text-sm font-medium text-[var(--color-muted)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-purple)] focus-visible:ring-offset-2 data-[state=active]:border-[var(--color-brand-purple)] data-[state=active]:bg-[var(--color-brand-purple)] data-[state=active]:text-white data-[state=active]:shadow-none"
              >
                {v}
              </TabsTrigger>
            ))}
          </TabsList>

          {(Object.keys(labels) as Array<keyof typeof labels>).map((cat) => (
            <TabsContent
              key={cat}
              value={cat}
              className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3"
            >
              {caseStudies
                .filter((c) => c.category === cat)
                .map((c) => (
                  <GlowCard key={c.quote} glowColor="purple" customSize className="dark:[--color-bg-cream:rgb(0_0_0_/_0.4)] dark:backdrop-blur-sm">
                    <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-brand-purple)]">
                      {c.metric}
                    </p>
                    <blockquote className="mt-3 text-[var(--text-body-lg)] leading-snug text-[var(--color-ink-charcoal)]">
                      &ldquo;{c.quote}&rdquo;
                    </blockquote>
                    <p className="mt-3 text-[var(--text-eyebrow)] font-medium uppercase tracking-[0.1em] text-[var(--color-muted)]">
                      &mdash; {c.attribution}
                    </p>
                  </GlowCard>
                ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
