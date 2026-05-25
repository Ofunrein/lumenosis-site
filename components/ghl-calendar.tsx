export function GhlCalendar({ embedUrl, title }: { embedUrl: string; title: string }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius)] border border-[var(--color-line)] bg-[var(--color-bg-cream)] shadow-[var(--shadow-soft)]">
      <iframe
        title={title}
        src={embedUrl}
        loading="lazy"
        className="block min-h-[720px] w-full"
        allow="payment"
      />
    </div>
  );
}
