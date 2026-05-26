"use client";

import { useEffect, useState } from "react";
import { StarButton } from "@/components/ui/star-button";
import { SpotlightButtonWrapper } from "@/components/spotlight-button";

export function StickyCtaBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const pastHero = scrollY > window.innerHeight * 0.9;
      const nearBottom = scrollY > totalHeight - 900;
      setShow(pastHero && !nearBottom);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside
      aria-label="Book a Demo"
      aria-hidden={!show}
      className={`fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-cream)] px-4 py-3 shadow-md transition-all md:inset-x-0 md:bottom-5 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span className="text-sm font-medium text-[var(--color-ink-charcoal)]">
        Ready to scale? Book a demo.
      </span>
      {show && (
        <SpotlightButtonWrapper>
          <StarButton
            lightColor="#cb6ce6"
            backgroundColor="#cb6ce6"
            className="h-9 bg-[var(--color-brand-purple)] px-4 text-sm text-white [&_span]:text-white"
            onClick={() => {
              window.location.href = "#book";
            }}
          >
            Book Demo
          </StarButton>
        </SpotlightButtonWrapper>
      )}
    </aside>
  );
}
