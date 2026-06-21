import { AgentPersonaCard } from "@/components/agent-persona-card";
import { Reveal } from "@/components/reveal";
import { agents } from "@/content/agents";

export function MeetTheTeam() {
  return (
    <section
      id="agents"
      className="border-b border-[var(--color-line)] bg-[#f8f6ef] py-16 dark:bg-[rgb(13_10_18_/_0.72)] md:py-24"
    >
      <div className="mx-auto w-[min(1200px,calc(100%-40px))] sm:w-[min(1200px,calc(100%-32px))]">
        <Reveal variant="up" className="max-w-2xl">
          <p className="mb-3 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-purple)]">
            03 · The team
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-display-section)] font-semibold leading-[1.05] text-[var(--color-ink-charcoal)]">
            One lead desk.{" "}
            <em className="not-italic text-[var(--color-gold-italic)]">Four working layers.</em>
          </h2>
          <p className="mt-4 text-[length:var(--text-body-lg)] text-[var(--color-muted)]">
            Each layer handles a specific part of lead response: memory, text, calls, website chat,
            and social intake.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {agents.map((a, index) => (
            <Reveal
              key={a.slug}
              variant={index % 2 === 0 ? "left" : "right"}
              delay={index * 0.06}
              className="h-full"
            >
              <div className="h-full dark:[--color-bg-cream:#111019]">
                <AgentPersonaCard agent={a} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
