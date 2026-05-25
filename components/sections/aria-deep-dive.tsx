import { PhoneMockup } from "@/components/phone-mockup";

const bubbles = [
  {
    from: "agent" as const,
    text: "Hi, calling about 412 Oak — is it still available?",
  },
  {
    from: "ai" as const,
    text: "It is. Three bed, two bath, 1,840 sq ft, listed at $529k. Are you looking to buy in the next sixty days?",
  },
  {
    from: "agent" as const,
    text: "Yeah, also need to sell my current place first.",
  },
  {
    from: "ai" as const,
    text: "Got it. I can book a free home valuation with our agent this week. Tuesday at 4pm or Thursday at 10am?",
  },
  { from: "agent" as const, text: "Tuesday works." },
  {
    from: "ai" as const,
    text: "Booked. You'll get a confirmation text in a moment. Anything else?",
  },
] satisfies { from: "agent" | "ai"; text: string }[];

// card-dark recipe for micro-feature tiles (design-tokens.md §Card Variants)
const TILE_CLASSES =
  "rounded-[var(--radius)] border border-white/[0.08] bg-white/[0.04] p-4";

const features = [
  { title: "12-second pickup", body: "Average answer time, day or night." },
  {
    title: "Direct booking",
    body: "Slots into your calendar, not someone else's.",
  },
  {
    title: "TCPA-safe",
    body: "Two-party consent recording where required.",
  },
  {
    title: "Encrypted",
    body: "Call data encrypted in transit and at rest.",
  },
];

export function AriaDeepDive() {
  return (
    <section
      id="aria"
      // Dark section: bg-[var(--color-dark-section)] + py-20 md:py-28 per design-tokens dark-section padding
      className="bg-[var(--color-dark-section)] py-20 text-white md:py-28"
    >
      <div className="mx-auto w-[min(1200px,calc(100%-32px))]">
        {/* Two-col layout: copy left, phone right — stacks on mobile */}
        <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
          {/* Left: copy + feature tiles */}
          <div>
            {/* Eyebrow — gold on dark passes WCAG 6.31:1 */}
            <p className="mb-3 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-gold-italic)]">
              04 — AI Receptionist
            </p>

            <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-display-section)] font-semibold leading-[1.05]">
              The front desk that{" "}
              <em className="not-italic text-[var(--color-gold-italic)]">
                never sleeps
              </em>{" "}
              and never asks for a raise.
            </h2>

            <p className="mt-5 text-[length:var(--text-body-lg)] text-white/65">
              It is 9:47 in the morning. Three valuations are booked. You have
              not checked your email once. Aria handled the phone for you.
            </p>

            {/* Micro-feature tiles — card-dark recipe, 2-col on sm+ */}
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map((f) => (
                <div key={f.title} className={TILE_CLASSES}>
                  <dt className="font-semibold text-white">{f.title}</dt>
                  <dd className="mt-1 text-sm text-white/65">{f.body}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right: phone mockup — centered on mobile, aligned on desktop */}
          <PhoneMockup
            name="Aria"
            role="Lumenosis voice receptionist"
            bubbles={bubbles}
          />
        </div>
      </div>
    </section>
  );
}
