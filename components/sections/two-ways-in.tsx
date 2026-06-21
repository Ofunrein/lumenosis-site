"use client";

import { Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { GlowCard } from "@/components/spotlight-card";

const paths = [
  {
    path: "PACKAGE 01 · TEAM",
    title: "Install Iris",
    titleItalic: "Lead Desk.",
    description:
      "A high-touch installation for real estate teams already paying for leads and ready to stop losing them to slow follow-up.",
    bestFor: "3 to 15 agent teams, portal lead buyers, Meta and Google ad teams",
    features: [
      "$3,000 setup + $2,500/mo starting point",
      "Email, SMS, calls, website chat, and social DM coverage",
      "Shared lead timeline across every channel",
      "Property data brain from sheets, CRM, IDX export, or enrichment",
      "Human review rules for legal, financing, and sensitive replies",
      "30-day installation with weekly optimization",
    ],
    popular: false,
    dark: false,
    cta: "Book Lead Desk Consult →",
  },
  {
    path: "PACKAGE 02 · GROWTH",
    title: "Expand your",
    titleItalic: "operation.",
    description:
      "A managed omnichannel lead desk for brokerages, growth teams, and agencies with multiple sources, agents, markets, or client accounts.",
    bestFor: "Brokerages, multi-agent offices, white-label agencies, growth teams",
    features: [
      "$7,500 to $10,000+ setup with custom monthly management",
      "Agent routing by market, source, urgency, language, or office",
      "Follow Up Boss, Lofty, kvCORE, GoHighLevel, HubSpot, or custom CRM",
      "Calendar, lead source, and property source integrations",
      "Dashboard visibility for owners, agents, handoffs, and stuck leads",
      "Ongoing monitoring, prompt tuning, reporting, and expansion",
    ],
    popular: true,
    dark: true,
    cta: "Map the Growth Build →",
  },
] as const;

export function TwoWaysIn() {
  return (
    <section className="border-b border-[var(--color-line)] bg-[#f8f6ef] py-16 dark:bg-transparent md:py-24">
      <div className="mx-auto w-[min(1200px,calc(100%-40px))] sm:w-[min(1200px,calc(100%-32px))]">
        <Reveal variant="up" className="mb-12 md:mb-16">
          <p className="mb-3 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-violet)] dark:text-white">
            06 · Programs
          </p>
          <h2 className="max-w-4xl font-[family-name:var(--font-display)] text-[length:var(--text-display-section)] font-semibold leading-[1.05] text-[var(--color-ink-charcoal)] dark:text-white">
            Productized service,{" "}
            <em className="text-[var(--color-gold-italic)]">not cheap SaaS.</em>
          </h2>
        </Reveal>

        <div className="grid items-stretch gap-6 md:grid-cols-2 lg:gap-8">
          {paths.map((path, index) => (
            <Reveal
              key={path.path}
              variant={index % 2 === 0 ? "left" : "right"}
              delay={index * 0.1}
              className="h-full"
            >
              <div className={`relative ${path.popular ? "pt-5" : ""}`}>
                {path.popular && (
                  <span className="absolute top-0 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-gold-italic)] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap text-black shadow-sm">
                    MOST POPULAR
                  </span>
                )}
                <GlowCard
                  glowColor="purple"
                  customSize
                  radius={16}
                  className={`flex h-full min-h-[560px] flex-col !p-0 ${
                    path.dark
                      ? "[--backup-border:rgb(232,196,122,0.4)] [--backdrop:#0b0711] text-white shadow-[0_34px_90px_rgb(10_7_17_/_0.32)] dark:shadow-[0_34px_90px_rgb(203_108_230_/_0.16)]"
                      : "[--backup-border:rgb(33,30,25,0.15)] [--backdrop:#fffdf7] text-[var(--color-ink-charcoal)] shadow-[0_18px_50px_rgb(33_30_25_/_0.08)] dark:[--backup-border:rgb(255,255,255,0.12)] dark:[--backdrop:#17111f] dark:text-white dark:shadow-none"
                  }`}
                >
                  <div
                    className={`pointer-events-none absolute inset-0 -z-10 rounded-[16px] ${
                      path.dark
                        ? "bg-[radial-gradient(circle_at_18%_0%,rgb(203_108_230_/_0.24),transparent_34%),radial-gradient(circle_at_86%_10%,rgb(232_196_122_/_0.18),transparent_30%),linear-gradient(135deg,#12081a_0%,#07050b_62%,#151008_100%)]"
                        : "bg-[radial-gradient(circle_at_8%_0%,rgb(203_108_230_/_0.08),transparent_28%),linear-gradient(180deg,rgb(255_253_247_/_0.96),rgb(248_244_233_/_0.86))] dark:bg-[radial-gradient(circle_at_8%_0%,rgb(203_108_230_/_0.12),transparent_28%),linear-gradient(180deg,rgb(23_17_31_/_0.96),rgb(12_9_17_/_0.94))]"
                    }`}
                  />

                  <div className="flex flex-1 flex-col p-8 md:p-10">
                    <p
                      className={`mb-5 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.18em] ${
                        path.dark
                          ? "text-[var(--color-gold-italic)]"
                          : "text-[var(--color-brand-violet)]"
                      }`}
                    >
                      {path.path}
                    </p>

                    <h3 className="mb-4 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.05] md:text-5xl">
                      {path.title}{" "}
                      <em
                        className={
                          path.dark
                            ? "text-[var(--color-gold-italic)]"
                            : "text-[var(--color-brand-violet)]"
                        }
                      >
                        {path.titleItalic}
                      </em>
                    </h3>

                    <p
                      className={`mb-7 max-w-xl text-base leading-relaxed md:text-lg ${
                        path.dark ? "text-white/86" : "text-[var(--color-muted)] dark:text-white/78"
                      }`}
                    >
                      {path.description}
                    </p>

                    <div
                      className={`mb-7 flex flex-col gap-2 border-y py-4 text-sm sm:flex-row sm:items-center ${
                        path.dark
                          ? "border-white/14 text-white/70"
                          : "border-[var(--color-line)] text-[var(--color-muted)] dark:border-white/12 dark:text-white/68"
                      }`}
                    >
                      <span className="text-[10px] font-semibold tracking-[0.16em] uppercase">
                        BEST FOR
                      </span>
                      <span
                        className={`font-medium ${
                          path.dark
                            ? "text-white"
                            : "text-[var(--color-ink-charcoal)] dark:text-white"
                        }`}
                      >
                        {path.bestFor}
                      </span>
                    </div>

                    <ul className="mb-9 grid flex-1 gap-3.5">
                      {path.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check
                            className={`mt-0.5 size-4 shrink-0 stroke-[2.2] ${
                              path.dark
                                ? "text-[var(--color-gold-italic)]"
                                : "text-[var(--color-brand-violet)]"
                            }`}
                          />
                          <span
                            className={`text-sm ${
                              path.dark
                                ? "text-white/88"
                                : "text-[var(--color-ink-charcoal)] dark:text-white/86"
                            }`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => {
                        document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`h-12 w-full rounded-xl text-sm font-semibold transition-opacity hover:opacity-85 ${
                        path.dark
                          ? "bg-[var(--color-gold-italic)] text-black"
                          : "bg-[var(--color-brand-charcoal)] text-white dark:bg-[var(--color-brand-violet)]"
                      }`}
                    >
                      {path.cta}
                    </button>
                  </div>
                </GlowCard>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
