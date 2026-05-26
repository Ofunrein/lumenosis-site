"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import React from "react";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { StarButton } from "@/components/ui/star-button";
import { useScroll } from "@/components/ui/use-scroll";
import { cn } from "@/lib/utils";

export function Topbar() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(140);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const links = [
    { label: "Method", href: "#method" },
    { label: "Agents", href: "#agents" },
    { label: "Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
  ];

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-out",
        scrolled && !open && "flex justify-center px-3 py-3 md:py-5",
        open && "px-0 py-0",
      )}
    >
      <nav
        className={cn(
          "grid grid-cols-[1fr_auto_1fr] items-center transition-all duration-300 ease-out",
          open
            ? "h-16 w-full rounded-none px-4"
            : scrolled
              ? "h-14 w-[min(1010px,calc(100%-12px))] rounded-full border border-[var(--color-line)] bg-[var(--color-bg-cream)]/88 px-4 shadow-[var(--shadow-soft)] backdrop-blur-xl md:h-20 md:px-8 dark:bg-black/70"
              : "h-16 w-full rounded-none border-b border-[var(--color-line)] bg-[var(--color-bg-cream)]/86 px-4 shadow-none backdrop-blur-xl md:h-20 md:px-10 dark:bg-black/70",
        )}
      >
        <a
          href="#top"
          className="inline-flex h-full shrink-0 items-center gap-2 justify-self-start md:gap-3"
        >
          <Image
            src="/images/lumenosis-logo.png"
            alt="Lumenosis AI"
            width={32}
            height={32}
            className="block rounded-lg object-contain md:size-10"
          />
          <span className="leading-none text-base font-semibold text-[var(--color-ink-charcoal)] md:text-xl">
            Lumenosis <span className="text-[var(--color-brand-violet)]">AI</span>
          </span>
        </a>
        <div className="hidden h-full items-center gap-4 justify-self-center md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-[var(--color-muted)] transition-colors hover:bg-[var(--color-brand-violet-soft)] hover:text-[var(--color-ink-charcoal)] dark:text-white dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="hidden h-full items-center gap-3 justify-self-end md:flex">
          {mounted && (
            <button
              type="button"
              onClick={toggleTheme}
              className="grid size-11 place-items-center self-center rounded-2xl border border-[var(--color-line)] text-[var(--color-muted)] transition-colors hover:border-[var(--color-brand-violet)] hover:text-[var(--color-brand-violet)] dark:text-white"
              aria-label="Toggle dark/light mode"
            >
              {resolvedTheme === "dark" ? (
                <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
                  <title>Dark mode icon</title>
                  <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
                  <title>Light mode icon</title>
                  <path d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0-5a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm0 18a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm9-9h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM3 12H2a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm15.66-6.24-.7-.7a1 1 0 0 0-1.42 1.42l.7.7a1 1 0 0 0 1.42-1.42zm-12.02 12.02-.7-.7a1 1 0 0 0-1.42 1.42l.7.7a1 1 0 0 0 1.42-1.42zm12.02 0a1 1 0 0 0-1.42 0l-.7.7a1 1 0 0 0 1.42 1.42l.7-.7a1 1 0 0 0 0-1.42zm-12.02-12.02a1 1 0 0 0 0 1.42l-.7.7a1 1 0 1 0 1.42-1.42l-.7-.7a1 1 0 0 0-1.42 0z" />
                </svg>
              )}
            </button>
          )}
          <StarButton
            lightColor="#cb6ce6"
            backgroundColor="#cb6ce6"
            className="h-12 self-center rounded-full bg-[var(--color-brand-violet)] px-7 text-base text-white shadow-[0_0_28px_rgba(203,108,230,0.45)] [&_a]:flex [&_a]:items-center [&_a]:leading-none [&_span]:flex [&_span]:items-center [&_span]:leading-none [&_span]:text-white"
          >
            <a href="#book">Book a Demo</a>
          </StarButton>
        </div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="col-start-3 grid size-9 place-items-center justify-self-end rounded-md border border-[var(--color-line)] text-[var(--color-ink-charcoal)] md:hidden"
          aria-label="Toggle menu"
        >
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </button>
      </nav>
      {open && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-50 flex flex-col gap-2 border-t border-[var(--color-line)] bg-[var(--color-bg-cream)] p-4 md:hidden">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-4 py-3 text-lg text-[var(--color-ink-charcoal)] transition-colors hover:bg-[var(--color-brand-violet-soft)]"
            >
              {link.label}
            </a>
          ))}
          {mounted && (
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-2 rounded-md px-4 py-3 text-lg text-[var(--color-ink-charcoal)] transition-colors hover:bg-[var(--color-brand-violet-soft)]"
              aria-label="Toggle dark/light mode"
            >
              {resolvedTheme === "dark" ? (
                <>
                  <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden>
                    <title>Dark mode icon</title>
                    <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
                  </svg>
                  Switch to light mode
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden>
                    <title>Light mode icon</title>
                    <path d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0-5a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm0 18a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm9-9h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM3 12H2a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm15.66-6.24-.7-.7a1 1 0 0 0-1.42 1.42l.7.7a1 1 0 0 0 1.42-1.42zm-12.02 12.02-.7-.7a1 1 0 0 0-1.42 1.42l.7.7a1 1 0 0 0 1.42-1.42zm12.02 0a1 1 0 0 0-1.42 0l-.7.7a1 1 0 0 0 1.42 1.42l.7-.7a1 1 0 0 0 0-1.42zm-12.02-12.02a1 1 0 0 0 0 1.42l-.7.7a1 1 0 1 0 1.42-1.42l-.7-.7a1 1 0 0 0-1.42 0z" />
                  </svg>
                  Switch to dark mode
                </>
              )}
            </button>
          )}
          <div className="mt-auto">
            <StarButton
              lightColor="#cb6ce6"
              backgroundColor="#cb6ce6"
              className="h-12 w-full justify-center bg-[var(--color-brand-violet)] text-base text-white [&_span]:text-white"
              onClick={() => setOpen(false)}
            >
              <a href="#book">Book a Demo</a>
            </StarButton>
          </div>
        </div>
      )}
    </header>
  );
}
