import Image from "next/image";
import type { Agent } from "@/content/agents";

// Chip recipes — only the role chip carries accent color, body stays neutral.
// Gold (#B89154) on cream fails WCAG at 2.64:1. Iris's gold chip uses indigo
// text on a gold-tinted bg (~14.5:1). Cyan chip uses cyan-700 (#0e7490) on
// cyan-tinted bg (~4.6:1, passes AA).
const chipClass: Record<Agent["accent"], string> = {
  violet:
    "bg-[var(--color-brand-violet)]/10 text-[var(--color-brand-violet)]",
  indigo:
    "bg-[var(--color-primary-indigo)]/10 text-[var(--color-primary-indigo)]",
  gold: "bg-[var(--color-gold-italic)]/15 text-[var(--color-primary-indigo)]",
  cyan: "bg-cyan-500/10 text-[#0e7490]",
};

// Bullet dot uses accent color per variant for visual differentiation.
const dotClass: Record<Agent["accent"], string> = {
  violet: "bg-[var(--color-brand-violet)]",
  indigo: "bg-[var(--color-primary-indigo)]",
  gold: "bg-[var(--color-gold-italic)]",
  cyan: "bg-[#0e7490]",
};

export function AgentPersonaCard({ agent }: { agent: Agent }) {
  return (
    <article
      className={[
        // card-soft recipe from design-tokens.md
        "flex h-full flex-col",
        "rounded-[var(--radius)]",
        "border border-[var(--color-line)]",
        "bg-[var(--color-bg-cream)]",
        "shadow-[var(--shadow-soft)]",
        "p-6",
      ].join(" ")}
    >
      {/* Avatar circle */}
      <div className="relative mx-auto mb-5 size-24 overflow-hidden rounded-full bg-[var(--color-line)]">
        <Image
          src={agent.avatar}
          alt={`${agent.name} avatar`}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      {/* Role chip — accent color only here */}
      <span
        className={[
          "mx-auto mb-3 inline-block rounded-full px-3 py-1",
          "text-[var(--text-eyebrow)] font-semibold uppercase tracking-wider",
          chipClass[agent.accent],
        ].join(" ")}
      >
        {agent.role}
      </span>

      {/* Name */}
      <h3 className="text-center font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink-charcoal)]">
        {agent.name}
      </h3>

      {/* Tagline */}
      <p className="mt-2 text-center text-sm leading-snug text-[var(--color-muted)]">
        {agent.tagline}
      </p>

      {/* Bullets */}
      <ul className="mt-5 flex flex-col gap-2 text-sm text-[var(--color-muted)]">
        {agent.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <span
              aria-hidden
              className={[
                "mt-[0.4em] size-1.5 shrink-0 rounded-full",
                dotClass[agent.accent],
              ].join(" ")}
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
