export function GlassStatCallout({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={`pointer-events-none rounded-xl border border-[var(--color-line)] bg-[var(--color-bg-cream)]/90 px-4 py-3 text-[var(--color-ink-charcoal)] shadow-[var(--shadow-glow-violet)] backdrop-blur-md ${className ?? ''}`}>
      <div className="text-[15px] font-semibold leading-tight">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-wider text-[var(--color-muted)]">{label}</div>
    </div>
  );
}
