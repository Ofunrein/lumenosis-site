"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "@/content/faq";

export function Faq() {
  return (
    <section
      id="faq"
      className="border-b border-[var(--color-line)] bg-[var(--color-bg-cream)] dark:bg-transparent py-16 md:py-24"
    >
      <div className="mx-auto grid w-[min(1200px,calc(100%-32px))] gap-10 md:grid-cols-[0.6fr_1fr]">
        <div>
          <span className="inline-block mb-3 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-purple)]">
            09 — FAQ
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-display-section)] font-semibold leading-[1.05] text-[var(--color-ink-charcoal)]">
            Questions{" "}
            <em className="not-italic text-[var(--color-gold-italic)]">
              we get every week.
            </em>
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faq.map((item, i) => (
            <AccordionItem
              key={item.q}
              value={`q-${i}`}
              className="border-b border-[var(--color-line)] last:border-b-0"
            >
              <AccordionTrigger className="text-left font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink-charcoal)] hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-purple)] focus-visible:ring-offset-2">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-[var(--color-muted)] dark:text-white/86">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
