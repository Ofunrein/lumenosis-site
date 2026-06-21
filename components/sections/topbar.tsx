"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import React from "react";
import { SpotlightButtonWrapper } from "@/components/spotlight-button";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { StarButton } from "@/components/ui/star-button";
import { useScroll } from "@/components/ui/use-scroll";
import { cn } from "@/lib/utils";

function ThemeToggleIcon({ dark }: { dark: boolean }) {
  if (dark) {
    return (
      <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden>
        <title>Dark mode icon</title>
        <path
          d="M19.55 15.82A7.55 7.55 0 0 1 8.18 6.45a.72.72 0 0 0-.82-1.04 8.5 8.5 0 1 0 11.23 11.23.72.72 0 0 0-.94-.94 7.3 7.3 0 0 1-1.9.25 7.55 7.55 0 0 1-7.55-7.55c0-.65.08-1.28.24-1.89a6.15 6.15 0 1 0 11.11 9.31z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden>
      <title>Light mode icon</title>
      <circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="1.9" />
      <path
        d="M12 2.75v2.1M12 19.15v2.1M21.25 12h-2.1M4.85 12h-2.1M18.55 5.45l-1.48 1.48M6.93 17.07l-1.48 1.48M18.55 18.55l-1.48-1.48M6.93 6.93 5.45 5.45"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Topbar() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(140);
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const homePrefix = pathname === "/" ? "" : "/";
  const links = [
    { label: "Method", href: `${homePrefix}#method` },
    { label: "System", href: `${homePrefix}#agents` },
    { label: "Process", href: `${homePrefix}#process` },
    { label: "FAQ", href: `${homePrefix}#faq` },
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
            ? "w-[min(860px,calc(100vw_-_32px))] shadow-md dark:shadow-[0_0_30px_rgba(203,108,230,0.1)]"
            : "w-[min(1000px,calc(100vw_-_32px))] shadow-sm dark:shadow-[0_0_30px_rgba(203,108,230,0.1)]",
        )}
      >
        {/* Mobile left spacer — keeps logo centered when hamburger is on the right */}
        <div className="size-10 shrink-0 md:hidden" aria-hidden />

        {/* Logo — absolutely centered on mobile, normal flow on desktop */}
        <a
          href={pathname === "/" ? "#top" : "/"}
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
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
            className="rounded-lg md:w-[34px] md:h-[34px] w-[40px] h-[40px]"
          />
          <span className="font-semibold text-[19px] md:text-[17px] text-[var(--color-ink-charcoal)]">
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
                className="grid size-10 place-items-center text-[rgba(47,40,78,0.88)] transition-colors duration-200 hover:text-[rgba(47,40,78,1)] dark:text-[rgba(243,242,251,0.9)] dark:hover:text-white"
                aria-label="Toggle dark/light mode"
              >
                <ThemeToggleIcon dark={resolvedTheme === "dark"} />
              </button>
            )}
            <a
              href="https://app.lumenosis.com"
              className="px-4 h-9 inline-flex items-center text-sm font-semibold text-[var(--color-ink-charcoal)] dark:text-white/80 hover:text-[var(--color-brand-violet)] dark:hover:text-white transition-colors rounded-full border border-[var(--color-line)] dark:border-white/15 hover:border-[var(--color-brand-violet)]/50"
            >
              Log in
            </a>
            <SpotlightButtonWrapper>
              <StarButton
                lightColor="#cb6ce6"
                className="bg-[var(--color-brand-violet)] text-white px-4 h-9 text-sm !text-white"
              >
                <a href={`${homePrefix}#book`}>Book Demo</a>
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
          <a
            href="https://app.lumenosis.com"
            onClick={() => setOpen(false)}
            className="px-4 py-3 text-base font-semibold text-[var(--color-ink-charcoal)] dark:text-white rounded-xl hover:bg-[var(--color-brand-violet-soft)] transition-colors text-center"
          >
            Log in
          </a>
          <div className="flex items-center justify-between px-4 py-2">
            <span className="text-sm text-[var(--color-muted)] dark:text-white/60">Appearance</span>
            {mounted && (
              <button
                type="button"
                onClick={toggleTheme}
                className="grid size-10 place-items-center text-[rgba(47,40,78,0.88)] transition-colors duration-200 hover:text-[rgba(47,40,78,1)] dark:text-[rgba(243,242,251,0.9)] dark:hover:text-white"
                aria-label="Toggle dark/light mode"
              >
                <ThemeToggleIcon dark={resolvedTheme === "dark"} />
              </button>
            )}
          </div>
          <SpotlightButtonWrapper>
            <StarButton
              lightColor="#cb6ce6"
              className="w-full bg-[var(--color-brand-violet)] text-white h-11 text-sm justify-center !text-white"
            >
              <a href={`${homePrefix}#book`} onClick={() => setOpen(false)}>
                Book Demo
              </a>
            </StarButton>
          </SpotlightButtonWrapper>
        </div>
      )}
    </header>
  );
}
