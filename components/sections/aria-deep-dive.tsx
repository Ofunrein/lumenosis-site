"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Bath,
  BedDouble,
  CalendarDays,
  Clock3,
  Home,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Ruler,
} from "lucide-react";
import { GlowCard } from "@/components/spotlight-card";

type EmailMessage = {
  id: string;
  from: "lead" | "iris";
  name: string;
  email: string;
  time: string;
  body: string;
  label?: string;
};

type ConversationLine = {
  id: string;
  from: "lead" | "agent";
  name: string;
  text: string;
  detail?: string;
};

const emailThread: EmailMessage[] = [
  {
    id: "email-1",
    from: "lead",
    name: "Emily Rivera",
    email: "emily.rivera@example.com",
    time: "9:12 AM",
    body: "Hi, is 1842 Oak Ridge Lane still available? We are moving from Austin and want something close to Barton Creek Elementary. We can tour after 5:30 this week.",
  },
  {
    id: "email-2",
    from: "iris",
    name: "Iris",
    email: "assistant@lumenosis.ai",
    time: "9:13 AM",
    label: "Listing details matched",
    body: "Yes, Oak Ridge Modern is still active. It is a 4 bed, 3 bath remodel at $865,000 with a two-car garage, shaded deck, and new roof. I can hold Wednesday at 5:45 PM or Thursday at 6:10 PM. Are you financing or paying cash?",
  },
  {
    id: "email-3",
    from: "lead",
    name: "Emily Rivera",
    email: "emily.rivera@example.com",
    time: "9:16 AM",
    body: "Financing. We are pre-approved up to 900k, but we probably need to sell our Round Rock condo before closing.",
  },
  {
    id: "email-4",
    from: "iris",
    name: "Iris",
    email: "assistant@lumenosis.ai",
    time: "9:17 AM",
    label: "Tour booked, seller signal flagged",
    body: "I placed you on the Wednesday 5:45 PM tour and flagged the sell-before-buy timing for Martin. I can also schedule a 15-minute pricing call for the condo so he walks in with comps ready.",
  },
];

const ariaTranscript: ConversationLine[] = [
  {
    id: "call-1",
    from: "lead",
    name: "Caller",
    detail: "Inbound call",
    text: "Hi, I am calling about the Oak Ridge house. Is it still available?",
  },
  {
    id: "call-2",
    from: "agent",
    name: "Aria",
    detail: "Property answer",
    text: "It is available. Four bedrooms, three baths, listed at $865,000. Are you hoping to tour this week?",
  },
  {
    id: "call-3",
    from: "lead",
    name: "Caller",
    detail: "Buyer intent",
    text: "Yes. We are pre-approved, but I need to sell my current place first.",
  },
  {
    id: "call-4",
    from: "agent",
    name: "Aria",
    detail: "Valuation slot",
    text: "I can book the showing and hold a valuation call for your current home. Wednesday 5:45 PM is open.",
  },
  {
    id: "call-5",
    from: "lead",
    name: "Caller",
    detail: "Confirmed",
    text: "That works. Please send the details.",
  },
  {
    id: "call-6",
    from: "agent",
    name: "Aria",
    detail: "Calendar updated",
    text: "You are booked. I am sending the calendar invite, property packet, and condo pricing call link now.",
  },
];

const theoThread: ConversationLine[] = [
  {
    id: "sms-1",
    from: "lead",
    name: "Zillow lead",
    detail: "9:21 AM",
    text: "I want more info on the Oak Ridge listing.",
  },
  {
    id: "sms-2",
    from: "agent",
    name: "Theo",
    detail: "9:21 AM",
    text: "I can help. Are you looking to tour it, ask about price, or compare it with similar homes nearby?",
  },
  {
    id: "sms-3",
    from: "lead",
    name: "Zillow lead",
    detail: "9:22 AM",
    text: "Tour. We are in town tomorrow afternoon.",
  },
  {
    id: "sms-4",
    from: "agent",
    name: "Theo",
    detail: "9:22 AM",
    text: "Tomorrow has 2:30 PM and 4:15 PM. I can hold either. Are you already pre-approved?",
  },
  {
    id: "sms-5",
    from: "lead",
    name: "Zillow lead",
    detail: "9:23 AM",
    text: "Yes. 4:15 is better.",
  },
  {
    id: "sms-6",
    from: "agent",
    name: "Theo",
    detail: "9:23 AM",
    text: "Held for 4:15 PM. I sent the calendar invite and the agent will text you the entry details.",
  },
];

const listingStats = [
  { label: "Price", value: "$865,000" },
  { label: "Beds", value: "4" },
  { label: "Baths", value: "3" },
  { label: "Sq ft", value: "2,420" },
];

const microFeatures = [
  {
    icon: Clock3,
    title: "Fast pickup",
    body: "Aria answers missed calls before the lead opens a second browser tab.",
  },
  {
    icon: CalendarDays,
    title: "Calendar booking",
    body: "Tours, valuation calls, and follow-ups land on the right calendar.",
  },
  {
    icon: MessageSquare,
    title: "Channel memory",
    body: "Email, voice, and SMS share the same lead context.",
  },
  {
    icon: Home,
    title: "Listing aware",
    body: "Every reply uses property facts, showing windows, and seller signals.",
  },
];

function useRevealedCount(total: number, delayMs: number) {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCount((current) => (current >= total ? 1 : current + 1));
    }, delayMs);
    return () => window.clearInterval(id);
  }, [delayMs, total]);

  return count;
}

function TypewriterText({ text, active }: { text: string; active: boolean }) {
  const [chars, setChars] = useState(active ? 0 : text.length);

  useEffect(() => {
    if (!active) {
      setChars(text.length);
      return;
    }

    setChars(0);
    let next = 0;
    const step = Math.max(2, Math.ceil(text.length / 72));
    const id = window.setInterval(() => {
      next = Math.min(text.length, next + step);
      setChars(next);
      if (next >= text.length) {
        window.clearInterval(id);
      }
    }, 24);

    return () => window.clearInterval(id);
  }, [active, text]);

  return (
    <>
      {text.slice(0, chars)}
      {active && chars < text.length ? <span className="ml-0.5 animate-pulse">|</span> : null}
    </>
  );
}

function SectionBadge({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: typeof Mail;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/8 text-[var(--color-brand-violet)]">
        <Icon className="size-4" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-white/50">{subtitle}</p>
      </div>
    </div>
  );
}

function IrisEmailDemo() {
  const shown = useRevealedCount(emailThread.length, 2600);
  const scrollRef = useRef<HTMLDivElement>(null);
  const visibleMessages = emailThread.slice(0, shown);
  const latestMessage = visibleMessages[visibleMessages.length - 1];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [shown]);

  return (
    <GlowCard
      glowColor="purple"
      customSize
      className="overflow-hidden p-0 [--backdrop:rgba(5,12,9,0.82)]"
    >
      <div className="grid min-h-[610px] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex min-h-0 flex-col border-b border-[var(--color-line)] p-4 sm:p-5 lg:border-b-0 lg:border-r">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-line)] pb-4">
            <SectionBadge icon={Mail} title="Iris email desk" subtitle="Live buyer inquiry" />
            <div className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
              {latestMessage?.from === "iris" ? "Typing reply" : "Reading lead"}
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-[#0e1712]/90 p-3 text-sm shadow-[0_18px_44px_rgba(3,7,5,0.28)]">
            <div className="flex items-start justify-between gap-3 border-b border-[var(--color-line)] pb-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/42">Subject</p>
                <p className="mt-1 font-semibold text-white">
                  Re: Oak Ridge Modern showing request
                </p>
              </div>
              <span className="rounded-full bg-[var(--color-brand-violet-soft)] px-3 py-1 text-xs font-semibold text-[var(--color-brand-violet)]">
                CRM synced
              </span>
            </div>

            <div ref={scrollRef} className="mt-3 flex max-h-[450px] flex-col gap-3 overflow-hidden">
              {visibleMessages.map((message) => {
                const isLatest = latestMessage?.id === message.id;
                const isIris = message.from === "iris";

                return (
                  <article
                    key={message.id}
                    className={[
                      "rounded-2xl border p-3 shadow-sm transition-all duration-300",
                      isIris
                        ? "border-[var(--color-brand-violet)]/35 bg-[var(--color-brand-violet)]/12"
                        : "border-white/10 bg-white/[0.07]",
                    ].join(" ")}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative size-9 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/10">
                        <Image
                          src={isIris ? "/images/agents/iris.png" : "/images/agents/olivia.png"}
                          alt={isIris ? "Iris" : "Lead profile"}
                          fill
                          sizes="36px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-white">
                              {message.name}
                            </p>
                            <p className="truncate text-xs text-white/45">{message.email}</p>
                          </div>
                          <span className="shrink-0 text-xs text-white/45">{message.time}</span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-white/82">
                          <TypewriterText text={message.body} active={isIris && isLatest} />
                        </p>
                        {message.label ? (
                          <p className="mt-3 inline-flex rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
                            {message.label}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 bg-[radial-gradient(circle_at_50%_0%,rgba(203,108,230,0.18),transparent_46%)] p-4 sm:p-5">
          <div className="relative min-h-[210px] overflow-hidden rounded-[28px] border border-white/12 bg-[#07120d] shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
            <Image
              src="/images/listings/oak-ridge-modern.svg"
              alt="Modern home listing preview"
              fill
              sizes="(max-width: 1024px) 100vw, 440px"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Matched listing</p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
                Oak Ridge Modern
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/[0.07] p-4">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 size-4 shrink-0 text-[var(--color-brand-violet)]" aria-hidden />
              <div>
                <p className="font-semibold text-white">1842 Oak Ridge Lane</p>
                <p className="text-sm text-white/52">Austin, TX 78746</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {listingStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-black/24 p-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">{stat.label}</p>
                  <p className="mt-1 text-lg font-semibold text-white">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-2 text-sm text-white/58">
              <p className="flex items-center gap-2">
                <BedDouble className="size-4 text-[var(--color-brand-violet)]" aria-hidden />
                New primary suite and walk-in closet
              </p>
              <p className="flex items-center gap-2">
                <Bath className="size-4 text-[var(--color-brand-violet)]" aria-hidden />
                Three updated bathrooms
              </p>
              <p className="flex items-center gap-2">
                <Ruler className="size-4 text-[var(--color-brand-violet)]" aria-hidden />
                Seller prefers closing before July 15
              </p>
            </div>
          </div>
        </div>
      </div>
    </GlowCard>
  );
}

function AriaPhoneDemo() {
  const shown = useRevealedCount(ariaTranscript.length, 2300);
  const visible = ariaTranscript.slice(0, shown);
  const latest = visible[visible.length - 1];

  return (
    <div className="mx-auto w-full max-w-[430px] rounded-[44px] border border-white/12 bg-[#08120d] p-3 shadow-[0_30px_110px_rgba(0,0,0,0.42)]">
      <div className="min-h-[640px] overflow-hidden rounded-[34px] border border-white/8 bg-[linear-gradient(180deg,#10241a_0%,#07120d_100%)] p-5">
        <div className="mx-auto mb-5 h-7 w-28 rounded-b-3xl bg-black/80" />
        <div className="text-center">
          <div className="relative mx-auto size-20 overflow-hidden rounded-full border border-emerald-300/30 bg-emerald-400/10">
            <Image src="/images/agents/aria.png" alt="Aria" fill sizes="80px" className="object-cover" />
          </div>
          <p className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-white">Aria</p>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">Voice receptionist</p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
            <span className="size-2 rounded-full bg-emerald-300" />
            On call 02:14
          </div>
        </div>

        <div className="my-5 h-px bg-white/10" />

        <div className="space-y-3">
          {visible.map((line) => {
            const isAria = line.from === "agent";
            const isLatest = latest?.id === line.id;

            return (
              <div
                key={line.id}
                className={[
                  "max-w-[88%] rounded-3xl px-4 py-3 text-sm leading-relaxed",
                  isAria
                    ? "ml-auto bg-emerald-500/18 text-white"
                    : "mr-auto bg-white/[0.08] text-white/82",
                ].join(" ")}
              >
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/38">
                  {line.name} - {line.detail}
                </p>
                <TypewriterText text={line.text} active={isAria && isLatest} />
              </div>
            );
          })}
        </div>

        <div className="mt-5 rounded-3xl border border-white/10 bg-black/22 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/38">Live actions</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-white/70">
            {["Showing held", "Valuation flagged", "CRM note added", "SMS sent"].map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-center">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TheoSmsDemo() {
  const shown = useRevealedCount(theoThread.length, 2100);
  const visible = theoThread.slice(0, shown);
  const latest = visible[visible.length - 1];

  return (
    <GlowCard
      glowColor="purple"
      customSize
      className="p-0 [--backdrop:rgba(5,12,9,0.76)]"
    >
      <div className="overflow-hidden rounded-2xl">
        <div className="flex items-center justify-between border-b border-[var(--color-line)] p-4">
          <SectionBadge icon={MessageSquare} title="Theo SMS desk" subtitle="Portal lead recovery" />
          <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
            Live thread
          </span>
        </div>

        <div className="mx-auto flex min-h-[410px] max-w-[380px] flex-col bg-[#07120d] p-4">
          <div className="mb-3 flex items-center gap-3 rounded-[24px] bg-white/[0.07] px-3 py-2 shadow-sm">
            <div className="relative size-10 overflow-hidden rounded-full">
              <Image src="/images/agents/theo.png" alt="Theo" fill sizes="40px" className="object-cover" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Theo</p>
              <p className="text-xs text-white/50">SMS sales agent</p>
            </div>
            <Phone className="ml-auto size-4 text-[var(--color-brand-violet)]" aria-hidden />
          </div>

          <div className="flex flex-1 flex-col justify-end gap-2">
            {visible.map((line) => {
              const isTheo = line.from === "agent";
              const isLatest = latest?.id === line.id;

              return (
                <div
                  key={line.id}
                  className={[
                    "max-w-[84%] rounded-[22px] px-3.5 py-2.5 text-sm leading-snug shadow-sm",
                    isTheo
                      ? "ml-auto rounded-br-md bg-[var(--color-brand-violet)] text-white"
                      : "mr-auto rounded-bl-md bg-white/[0.10] text-white/82",
                  ].join(" ")}
                >
                  <p className={isTheo ? "text-white/55 text-[10px]" : "text-white/38 text-[10px]"}>
                    {line.detail}
                  </p>
                  <TypewriterText text={line.text} active={isTheo && isLatest} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </GlowCard>
  );
}

export function AriaDeepDive() {
  return (
    <section
      id="aria"
      className="relative overflow-hidden border-b border-white/10 bg-[#07120d] py-20 text-white md:py-28"
    >
      <div className="absolute left-1/2 top-0 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(203,108,230,0.22),transparent_62%)] blur-3xl" />
      <div className="absolute right-[-14rem] top-28 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.18),transparent_64%)] blur-3xl" />

      <div className="relative mx-auto grid w-[min(1280px,calc(100%-32px))] gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div className="lg:sticky lg:top-32">
          <p className="mb-4 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.16em] text-emerald-300">
            04 - Live follow-up desk
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,5.6vw,5.35rem)] font-semibold leading-[0.98] text-[#f6f1e7]">
            The front desk that never sleeps and never asks for a raise.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/62">
            A buyer asks about a listing. Iris replies with real property details, Aria answers the call, and Theo keeps the text thread moving until a showing or valuation is booked.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {microFeatures.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                <Icon className="size-5 text-emerald-300" aria-hidden />
                <p className="mt-4 font-[family-name:var(--font-display)] text-xl font-semibold text-[#f6f1e7]">
                  {title}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/52">{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          <IrisEmailDemo />
          <div className="grid items-start gap-5 xl:grid-cols-[0.88fr_1.12fr]">
            <TheoSmsDemo />
            <AriaPhoneDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
