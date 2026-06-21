import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[#f1eee6] py-12 text-sm text-[var(--color-muted)] dark:bg-[rgb(9_7_13_/_0.76)] md:py-16">
      <div className="mx-auto flex w-[min(1200px,calc(100%-32px))] flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/images/lumenosis-logo.png"
            alt="Lumenosis AI"
            width={32}
            height={32}
            className="rounded-lg"
          />
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
            Book Demo
          </a>
          <a
            href="mailto:hello@lumenosis.com"
            className="transition-colors hover:text-[var(--color-ink-charcoal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-purple)] focus-visible:ring-offset-2"
          >
            Email
          </a>
        </nav>
      </div>
    </footer>
  );
}
