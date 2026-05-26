"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import React from "react";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { StarButton } from "@/components/ui/star-button";
import { useScroll } from "@/components/ui/use-scroll";
import { SpotlightButtonWrapper } from "@/components/spotlight-button";
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
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 md:pt-4 pointer-events-none">
      <nav
        className={cn(
          "pointer-events-auto relative flex items-center justify-between gap-4 rounded-full border border-[var(--color-line)] dark:border-white/[0.08] px-4 py-4 transition-all duration-300 ease-out",
          "bg-[var(--color-bg-cream)]/70 dark:bg-black/40 backdrop-blur-xl",
          "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(255,255,255,0.04)]",
          scrolled
            ? "w-[min(860px,calc(100%-32px))] shadow-md dark:shadow-[0_0_30px_rgba(203,108,230,0.1)]"
            : "w-[min(1000px,calc(100%-32px))] shadow-sm dark:shadow-[0_0_30px_rgba(203,108,230,0.1)]",
        )}
      >
        {/* Mobile left spacer — keeps logo centered when hamburger is on the right */}
        <div className="size-10 shrink-0 md:hidden" aria-hidden />

        {/* Logo — absolutely centered on mobile, normal flow on desktop */}
        <a
          href="#top"
          className="
            absolute left-1/2 -translate-x-1/2
            md:relative md:left-auto md:translate-x-0 md:flex-none
            inline-flex items-center gap-2 shrink-0 ml-1
          "
        >
          <Image
            src="/images/lumenosis-logo.png"
            alt="Lumenosis AI"
            width={34}
            height={34}
            className="rounded-lg"
          />
          <span className="font-semibold text-[17px] text-[var(--color-ink-charcoal)]">
            Lumenosis <span className="text-[var(--color-brand-violet)]">AI</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 text-[16px] text-[var(--color-muted)] hover:text-[var(--color-ink-charcoal)] transition-colors rounded-full hover:bg-[var(--color-brand-violet-soft)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            {mounted && (
              <button
                type="button"
                onClick={toggleTheme}
                className="grid size-8 place-items-center rounded-full border border-[var(--color-line)] text-[var(--color-muted)] hover:text-[var(--color-brand-violet)] transition-colors"
                aria-label="Toggle dark/light mode"
              >
                {resolvedTheme === "dark" ? (
                  <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
                    <title>Dark mode icon</title>
                    <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
                    <title>Light mode icon</title>
                    <path d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0-5a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm0 18a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm9-9h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM3 12H2a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm15.66-6.24-.7-.7a1 1 0 0 0-1.42 1.42l.7.7a1 1 0 0 0 1.42-1.42zm-12.02 12.02-.7-.7a1 1 0 0 0-1.42 1.42l.7.7a1 1 0 0 0 1.42-1.42zm12.02 0a1 1 0 0 0-1.42 0l-.7.7a1 1 0 0 0 1.42 1.42l.7-.7a1 1 0 0 0 0-1.42zm-12.02-12.02a1 1 0 0 0 0 1.42l-.7.7a1 1 0 1 0 1.42-1.42l-.7-.7a1 1 0 0 0-1.42 0z" />
                  </svg>
                )}
              </button>
            )}
            <SpotlightButtonWrapper>
              <StarButton
                lightColor="#cb6ce6"
                className="bg-[var(--color-brand-violet)] text-white px-4 h-9 text-sm !text-white"
              >
                <a href="#book">Book a Demo</a>
              </StarButton>
            </SpotlightButtonWrapper>
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="grid size-10 place-items-center rounded-full border border-[var(--color-line)] text-[var(--color-ink-charcoal)] md:hidden pointer-events-auto"
            aria-label="Toggle menu"
          >
            <MenuToggleIcon open={open} className="size-4" duration={300} />
          </button>
        </div>
      </nav>

      {open && (
          <div className="absolute top-full left-0 right-0 mt-3 rounded-2xl overflow-hidden border border-[var(--color-line)] dark:border-white/10 bg-[var(--color-bg-cream)]/95 dark:bg-[#161616]/95 backdrop-blur-xl shadow-xl z-50 p-3 flex flex-col gap-1 md:hidden pointer-events-auto">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-base text-[var(--color-ink-charcoal)] dark:text-white rounded-xl hover:bg-[var(--color-brand-violet-soft)] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="h-px bg-[var(--color-line)] dark:bg-white/10 my-1" />
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-sm text-[var(--color-muted)] dark:text-white/60">Appearance</span>
              {mounted && (
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="grid size-8 place-items-center rounded-full border border-[var(--color-line)] dark:border-white/10 text-[var(--color-muted)] dark:text-white/70 hover:text-[var(--color-brand-violet)] transition-colors"
                  aria-label="Toggle dark/light mode"
                >
                  {resolvedTheme === "dark" ? (
                    <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
                      <title>Dark mode icon</title>
                      <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
                      <title>Light mode icon</title>
                      <path d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0-5a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm0 18a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm9-9h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zM3 12H2a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm15.66-6.24-.7-.7a1 1 0 0 0-1.42 1.42l.7.7a1 1 0 0 0 1.42-1.42zm-12.02 12.02-.7-.7a1 1 0 0 0-1.42 1.42l.7.7a1 1 0 0 0 1.42-1.42zm12.02 0a1 1 0 0 0-1.42 0l-.7.7a1 1 0 0 0 1.42 1.42l.7-.7a1 1 0 0 0 0-1.42zm-12.02-12.02a1 1 0 0 0 0 1.42l-.7.7a1 1 0 1 0 1.42-1.42l-.7-.7a1 1 0 0 0-1.42 0z" />
                    </svg>
                  )}
                </button>
              )}
            </div>
            <SpotlightButtonWrapper>
              <StarButton
                lightColor="#cb6ce6"
                className="w-full bg-[var(--color-brand-violet)] text-white h-11 text-sm justify-center !text-white"
              >
                <a href="#book" onClick={() => setOpen(false)}>Book a Demo</a>
              </StarButton>
            </SpotlightButtonWrapper>
          </div>
        )}
    </header>
  );
}
