import { AgentPersonaCard } from "@/components/agent-persona-card";
import { agents } from "@/content/agents";

export function MeetTheTeam() {
  return (
    <section
      id="agents"
      className="border-b border-[var(--color-line)] bg-[var(--color-bg-cream)] dark:bg-black/25 py-16 md:py-24"
    >
      <div className="mx-auto w-[min(1200px,calc(100%-32px))]">
        <div className="max-w-2xl">
          <p className="mb-3 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-purple)]">
            03 — The team
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-display-section)] font-semibold leading-[1.05] text-[var(--color-ink-charcoal)]">
            Meet your{" "}
            <em className="not-italic text-[var(--color-gold-italic)]">
              new team.
            </em>
          </h2>
          <p className="mt-4 text-[length:var(--text-body-lg)] text-[var(--color-muted)]">
            Four named AI agents with one job each. Trained on your market,
            your inventory, your hours, and your CRM.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {agents.map((a) => (
            <div key={a.slug} className="h-full dark:[--color-bg-cream:rgb(0_0_0_/_0.4)]">
              <AgentPersonaCard agent={a} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
