import Image from "next/image";
import type { Agent } from "@/content/agents";
import { GlowCard } from "@/components/spotlight-card";

const accentClass: Record<Agent["accent"], string> = {
  violet: "bg-[var(--color-brand-violet)] text-white",
  indigo: "bg-[var(--color-brand-purple)]/15 text-[var(--color-brand-purple)]",
  gold: "bg-[var(--color-gold-italic)]/15 text-[var(--color-gold-italic)]",
  cyan: "bg-cyan-500/15 text-cyan-400",
};

export function AgentPersonaCard({ agent }: { agent: Agent }) {
  return (
    <GlowCard glowColor="purple" customSize className="flex h-full flex-col">
      <div className="relative mx-auto mb-4 size-24 overflow-hidden rounded-full border border-[var(--color-line)] bg-[var(--color-brand-charcoal)]">
        <Image src={agent.avatar} alt={`${agent.name}`} fill sizes="100px" className="object-cover" />
      </div>
      {/* Fixed single-line role chip */}
      <span className={`mx-auto mb-3 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] whitespace-nowrap overflow-hidden text-ellipsis max-w-full ${accentClass[agent.accent]}`}>
        {agent.role}
      </span>
      <h3 className="text-center font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-ink-charcoal)]">
        {agent.name}
      </h3>
      <p className="mt-2 text-center text-sm text-[var(--color-muted)] line-clamp-2">{agent.tagline}</p>
      <ul className="mt-4 grid gap-2 text-sm text-[var(--color-muted)]">
        {agent.bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--color-brand-purple)]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </GlowCard>
  );
}
