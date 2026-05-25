import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[var(--color-bg-cream)] dark:bg-black/40 py-12 text-sm text-[var(--color-muted)] md:py-16 border-t border-[var(--color-line)]">
      <div className="mx-auto flex w-[min(1200px,calc(100%-32px))] flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-lg bg-[var(--color-brand-purple)] text-white font-semibold select-none">
            L
          </span>
          <span>&copy; {new Date().getFullYear()} Lumenosis AI</span>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-5">
          <Link
            href="/privacy"
            className="transition-colors hover:text-[var(--color-ink-charcoal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-purple)] focus-visible:ring-offset-2"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="transition-colors hover:text-[var(--color-ink-charcoal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-purple)] focus-visible:ring-offset-2"
          >
            Terms
          </Link>
          <a
            href="#book"
            className="transition-colors hover:text-[var(--color-ink-charcoal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-purple)] focus-visible:ring-offset-2"
          >
            Book a call
          </a>
          <a
            href="mailto:hello@lumenosis.ai"
            className="transition-colors hover:text-[var(--color-ink-charcoal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-purple)] focus-visible:ring-offset-2"
          >
            Email
          </a>
        </nav>
      </div>
    </footer>
  );
}
