export function GlassStatCallout({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none rounded-[var(--radius)] border border-white/15 bg-white/85 px-3 py-2 text-[var(--color-ink-charcoal)] shadow-[var(--shadow-soft)] backdrop-blur-md ${className ?? ""}`}
    >
      <div className="text-[15px] font-semibold leading-tight">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-wider text-[var(--color-muted)]">
        {label}
      </div>
    </div>
  );
}
