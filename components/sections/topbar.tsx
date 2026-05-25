import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-line)] bg-[var(--color-bg-cream)]/85 backdrop-blur-md">
      <div className="mx-auto flex min-h-16 w-[min(1200px,calc(100%-32px))] items-center justify-between gap-4">
        <Link
          href="#top"
          className="inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink-charcoal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-violet)] focus-visible:ring-offset-2"
        >
          <span
            aria-hidden
            className="grid size-8 place-items-center rounded-lg bg-[var(--color-primary-indigo)] text-white text-sm font-bold"
          >
            L
          </span>
          <span>Lumenosis AI</span>
        </Link>
        <nav
          aria-label="Page"
          className="hidden items-center gap-6 text-sm text-[var(--color-muted)] md:flex"
        >
          <a
            href="#method"
            className="hover:text-[var(--color-ink-charcoal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-violet)] focus-visible:ring-offset-2 rounded"
          >
            Method
          </a>
          <a
            href="#agents"
            className="hover:text-[var(--color-ink-charcoal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-violet)] focus-visible:ring-offset-2 rounded"
          >
            Agents
          </a>
          <a
            href="#process"
            className="hover:text-[var(--color-ink-charcoal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-violet)] focus-visible:ring-offset-2 rounded"
          >
            Process
          </a>
          <a
            href="#faq"
            className="hover:text-[var(--color-ink-charcoal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-violet)] focus-visible:ring-offset-2 rounded"
          >
            FAQ
          </a>
        </nav>
        <Button asChild size="sm">
          <a href="#book">Book a strategy call</a>
        </Button>
      </div>
    </header>
  );
}
