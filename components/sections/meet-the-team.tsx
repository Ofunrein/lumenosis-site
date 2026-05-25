import { AgentPersonaCard } from "@/components/agent-persona-card";
import { agents } from "@/content/agents";

export function MeetTheTeam() {
  return (
    <section
      id="agents"
      className="border-b border-[var(--color-line)] bg-black py-16 md:py-24"
    >
      <div className="mx-auto w-[min(1200px,calc(100%-32px))]">
        <div className="max-w-2xl">
          <p className="mb-3 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-purple)]">
            03 — The team
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-display-section)] font-semibold leading-[1.05] text-white">
            Meet your{" "}
            <em className="not-italic text-[var(--color-gold-italic)]">
              new team.
            </em>
          </h2>
          <p className="mt-4 text-[length:var(--text-body-lg)] text-white/60">
            Four named AI agents with one job each. Trained on your market,
            your inventory, your hours, and your CRM.
          </p>
        </div>

        {/* 1 col → 2 col (md) → 4 col (lg) grid */}
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {agents.map((a) => (
            <AgentPersonaCard key={a.slug} agent={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
