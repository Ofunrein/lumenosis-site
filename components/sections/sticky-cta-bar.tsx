"use client";

import { useEffect, useState } from "react";
import { StarButton } from "@/components/star-button";

export function StickyCtaBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      role="complementary"
      aria-label="Book a strategy call"
      aria-hidden={!show}
      className={`fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-cream)]/90 px-4 py-3 shadow-[var(--shadow-glow-violet)] backdrop-blur-md transition-all md:inset-x-0 md:bottom-5 ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span className="text-sm font-medium text-[var(--color-ink-charcoal)]">
        Ready to scale? Book your strategy call.
      </span>
      <StarButton
        lightColor="#cb6ce6"
        className="bg-[var(--color-brand-purple)] text-white h-9 px-4 text-sm"
        tabIndex={show ? 0 : -1}
        onClick={() => { window.location.href = '#book'; }}
      >
        Book &rarr;
      </StarButton>
    </div>
  );
}
