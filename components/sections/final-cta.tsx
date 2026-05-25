import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="border-b border-[var(--color-line)] bg-[var(--color-bg-cream)] py-24 text-center md:py-32">
      <div className="mx-auto w-[min(900px,calc(100%-32px))]">
        <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-display-section)] font-semibold leading-[1.05] text-[var(--color-ink-charcoal)]">
          Have a thirty-minute conversation that&rsquo;s{" "}
          {/* Gold #B89154 on cream #F5F4EE = 2.64:1 — fails WCAG at all sizes.
              Using primary-indigo (#1E1B4B) = 14.51:1 on cream — passes 4.5:1 decisively. */}
          <em className="not-italic text-[var(--color-primary-indigo)]">
            actually worth your time.
          </em>
        </h2>
        <Button asChild size="lg" className="mt-8">
          <a href="#book">Book a strategy call</a>
        </Button>
      </div>
    </section>
  );
}
