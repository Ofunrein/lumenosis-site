"use client";
import { useState, useRef, useEffect } from "react";
import { GlowCard } from "@/components/spotlight-card";
import { PhoneMockup } from "@/components/phone-mockup";

const emailThread = [
  { from: "lead" as const, name: "John Carter", time: "9:15 AM", text: "Hi, calling about 412 Oak — is it still available?" },
  { from: "ai" as const, name: "Iris AI", time: "9:16 AM", text: "It is! 3 bed, 2 bath, 1,840 sqft, listed at $529k. Next viewing is Monday June 17th at 1pm. Are you also looking to sell your current home?", label: "Valuation inquiry detected" },
  { from: "lead" as const, name: "John Carter", time: "9:18 AM", text: "Actually yes, I need to sell first." },
  { from: "ai" as const, name: "Iris AI", time: "9:18 AM", text: "I've booked a free home valuation for Tuesday at 4pm. You'll receive a confirmation text shortly.", label: "Valuation booked" },
];

const phoneBubbles = [
  { from: "agent" as const, text: "Hi, calling about 412 Oak — is it still available?" },
  { from: "ai" as const, text: "It is. Three bed, two bath, $529k. Are you looking to buy in the next 60 days?" },
  { from: "agent" as const, text: "Yeah, need to sell first." },
  { from: "ai" as const, text: "Got it. Tuesday at 4pm works for a free valuation?" },
  { from: "agent" as const, text: "Perfect." },
  { from: "ai" as const, text: "Booked. Confirmation text incoming." },
];

function EmailCard() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setShown(prev => (prev < emailThread.length ? prev + 1 : 1));
    }, 2200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [shown]);

  return (
    <GlowCard glowColor="purple" customSize className="flex flex-col gap-3 min-h-[320px]">
      <div className="flex items-center gap-2 border-b border-[var(--color-line)] pb-3">
        <span className="text-lg">📧</span>
        <div>
          <p className="font-semibold text-[var(--color-ink-charcoal)] text-sm">Iris Handles an Email</p>
          <p className="text-[var(--color-muted)] text-xs">AI replies in under 60 seconds</p>
        </div>
      </div>
      <div ref={scrollRef} className="flex flex-col gap-2 overflow-hidden flex-1">
        {emailThread.slice(0, shown).map((msg, i) => (
          <div key={i} className={`rounded-xl px-3 py-2 text-sm max-w-[85%] ${msg.from === "ai" ? "bg-[var(--color-brand-purple)]/20 border border-[var(--color-brand-purple)]/30 self-end text-[var(--color-ink-charcoal)]" : "bg-[var(--color-brand-violet-soft)] text-[var(--color-ink-charcoal)] self-start"}`}>
            <p className="font-semibold text-xs text-[var(--color-muted)] mb-1">{msg.name} · {msg.time}</p>
            <p>{msg.text}</p>
            {"label" in msg && msg.label && <p className="mt-1 text-[10px] text-[var(--color-brand-purple)] font-semibold uppercase tracking-wider">✓ {msg.label}</p>}
          </div>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
        {["Valuation Booked", "Viewing Booked", "1 min response"].map(t => (
          <span key={t} className="text-[10px] text-[var(--color-muted)] border border-[var(--color-line)] px-2 py-0.5 rounded-full">✓ {t}</span>
        ))}
      </div>
    </GlowCard>
  );
}

function AudioCallCard() {
  const [playing, setPlaying] = useState(false);
  const bars = Array.from({ length: 40 }, (_, i) => ({ h: 10 + Math.sin(i * 0.8) * 18 + ((i * 7 + 3) % 13), active: i < (playing ? 18 : 0) }));

  return (
    <GlowCard glowColor="purple" customSize className="flex flex-col gap-3">
      <div className="flex items-center gap-2 border-b border-[var(--color-line)] pb-3">
        <span className="text-lg">📞</span>
        <div>
          <p className="font-semibold text-[var(--color-ink-charcoal)] text-sm">Aria Handles a Live Call</p>
          <p className="text-[var(--color-muted)] text-xs">Answers, qualifies, books appointments</p>
        </div>
      </div>
      <div className="flex items-center gap-1 h-16 justify-center px-2">
        {bars.map((b, i) => (
          <div key={i} className="w-1 rounded-full transition-all duration-150"
            style={{ height: `${b.h}px`, backgroundColor: i < (playing ? 18 : 5) ? '#cb6ce6' : 'rgba(128,128,128,0.3)' }} />
        ))}
      </div>
      <button type="button" onClick={() => setPlaying(!playing)}
        className="mx-auto grid size-10 place-items-center rounded-full bg-[var(--color-brand-purple)] text-white hover:scale-110 transition-transform">
        {playing ? "⏸" : "▶"}
      </button>
      <p className="text-center text-[var(--color-muted)] text-xs">0:38 / 2:14</p>
      <div className="grid gap-2">
        {["Property details provided", "Questions answered", "Viewing booked automatically"].map(f => (
          <div key={f} className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
            <span className="size-4 rounded-full bg-[var(--color-brand-purple)]/20 text-[var(--color-brand-purple)] text-xs grid place-items-center">✓</span>
            {f}
          </div>
        ))}
      </div>
    </GlowCard>
  );
}

function AutomationFlowCard() {
  const steps = [
    { icon: "👤", label: "Lead In" },
    { icon: "📧", label: "Iris\nEmail", sub: true },
    { icon: "📅", label: "Meeting\nBooked" },
    { icon: "📞", label: "Aria\nVoice", sub: true },
    { icon: "🗂", label: "CRM\nUpdated" },
  ];

  return (
    <GlowCard glowColor="purple" customSize className="flex flex-col gap-3">
      <div className="flex items-center gap-2 border-b border-[var(--color-line)] pb-3">
        <span className="text-lg">⚡</span>
        <div>
          <p className="font-semibold text-[var(--color-ink-charcoal)] text-sm">Automation Flow</p>
          <p className="text-[var(--color-muted)] text-xs">Lead to booking — no human input</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-1 mt-2">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center gap-1 text-center">
            <div className={`size-8 rounded-full grid place-items-center text-xs ${step.sub ? "bg-[var(--color-brand-purple)]/20 border border-[var(--color-brand-purple)]/40" : "bg-[var(--color-brand-violet-soft)]"}`}>
              {step.icon}
            </div>
            <p className="text-[9px] text-[var(--color-muted)] whitespace-pre-line leading-tight">{step.label}</p>
          </div>
        ))}
      </div>
    </GlowCard>
  );
}

export function AriaDeepDive() {
  return (
    <section id="aria" className="bg-[var(--color-bg-cream)] dark:bg-transparent dark:bg-[rgba(0,0,0,0.3)] py-20 md:py-28 border-b border-[var(--color-line)]">
      <div className="mx-auto w-[min(1200px,calc(100%-32px))]">
        <div className="max-w-2xl mb-10">
          <p className="mb-3 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-gold-italic)]">
            04 — AI Receptionist
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-display-section)] font-semibold leading-[1.05] text-[var(--color-ink-charcoal)]">
            The front desk that <em className="not-italic text-[var(--color-gold-italic)]">never sleeps</em> and never asks for a raise.
          </h2>
          <p className="mt-4 text-[length:var(--text-body-lg)] text-[var(--color-muted)]">
            Every lead your funnel produces gets answered in under twelve seconds, on voice and SMS. Trained on your market, your CRM, your hours.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-1"><EmailCard /></div>
          <div className="lg:col-span-1">
            <GlowCard glowColor="purple" customSize className="min-h-[320px]">
              <PhoneMockup name="Aria" role="Lumenosis AI · Voice Receptionist" bubbles={phoneBubbles} />
            </GlowCard>
          </div>
          <div className="lg:col-span-1 flex flex-col gap-5">
            <AudioCallCard />
            <AutomationFlowCard />
          </div>
        </div>
      </div>
    </section>
  );
}
