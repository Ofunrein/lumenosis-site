"use client";

import {
  Bath,
  BedDouble,
  CalendarDays,
  Clock3,
  Home,
  Mail,
  MapPin,
  MessageSquare,
  Ruler,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GlowCard } from "@/components/spotlight-card";

type EmailMessage = {
  id: string;
  from: "lead" | "iris";
  name: string;
  email: string;
  time: string;
  body: string;
  label?: string;
  listing?: boolean;
  valuation?: boolean;
};

type ConversationLine = {
  id: string;
  from: "lead" | "ai";
  name: string;
  text: string;
  detail?: string;
};

type ThreadRef = ReturnType<typeof useRef<HTMLDivElement | null>>;

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
    email: "assistant@lumenosis.com",
    time: "9:13 AM",
    label: "Listing details matched",
    listing: true,
    body: "Yes, Oak Ridge Modern is still active. The next private showing windows are Wednesday at 5:45 PM and Thursday at 6:10 PM.",
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
    email: "assistant@lumenosis.com",
    time: "9:17 AM",
    label: "Tour booked, valuation opened",
    valuation: true,
    body: "Perfect. I booked your Wednesday 5:45 PM tour. Since you need to sell the Round Rock condo first, start here and we will prepare the comps before your call.",
  },
];

const theoThread: ConversationLine[] = [
  {
    id: "sms-1",
    from: "lead",
    name: "Zillow lead",
    detail: "9:21 AM",
    text: "Hi, saw the listing at 412 Oak Ridge. Still available?",
  },
  {
    id: "sms-2",
    from: "ai",
    name: "Theo",
    detail: "9:21 AM",
    text: "Hey! Yes it is — 3 bed, 2 bath, $529k. Are you pre-approved or working with an agent?",
  },
  {
    id: "sms-3",
    from: "lead",
    name: "Zillow lead",
    detail: "9:22 AM",
    text: "Pre-approved, looking to move in 60 days.",
  },
  {
    id: "sms-4",
    from: "ai",
    name: "Theo",
    detail: "9:22 AM",
    text: "Perfect timing. I have Tuesday 4pm or Thursday 10am for a showing. Which works?",
  },
  {
    id: "sms-5",
    from: "lead",
    name: "Zillow lead",
    detail: "9:23 AM",
    text: "Tuesday at 4.",
  },
  {
    id: "sms-6",
    from: "ai",
    name: "Theo",
    detail: "9:23 AM",
    text: "Done! Booked Tuesday 4pm. You'll get a confirmation text. See you there!",
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

function useAutoScroll(ref: ThreadRef, trigger: unknown) {
  useEffect(() => {
    void trigger;
    const node = ref.current;
    if (!node) return;
    node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
  }, [ref, trigger]);
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
    const step = Math.max(1, Math.ceil(text.length / 96));
    const id = window.setInterval(() => {
      next = Math.min(text.length, next + step);
      setChars(next);
      if (next >= text.length) {
        window.clearInterval(id);
      }
    }, 58);

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
      <span className="grid size-10 shrink-0 place-items-center rounded-2xl border border-[#3f3350] bg-[#21192c] text-[var(--color-brand-violet)]">
        <Icon className="size-4" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-white">{subtitle}</p>
      </div>
    </div>
  );
}

function InlineListingCard() {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-white/12 bg-white text-neutral-950 shadow-[0_14px_34px_rgba(0,0,0,0.22)]">
      <div className="grid gap-0 sm:grid-cols-[0.92fr_1.08fr]">
        <div className="relative min-h-[172px] sm:min-h-full">
          <Image
            src="https://ap.rdcpix.com/574f42a37829888fdbdf1cf4d48faa27l-m3739095458rd-w960_h720.webp"
            alt="Oak Ridge Modern property preview"
            fill
            sizes="(max-width: 768px) 100vw, 260px"
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <p className="font-[family-name:var(--font-display)] text-2xl font-semibold leading-tight">
            Oak Ridge Modern
          </p>
          <p className="mt-1 text-sm text-neutral-600">1842 Oak Ridge Lane, Austin TX</p>
          <p className="mt-3 text-2xl font-bold text-[var(--color-brand-violet)]">$865,000</p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-sm text-neutral-600">
            <span className="rounded-xl bg-neutral-100 px-3 py-2 font-semibold">4 bed</span>
            <span className="rounded-xl bg-neutral-100 px-3 py-2 font-semibold">3 bath</span>
            <span className="rounded-xl bg-neutral-100 px-3 py-2 font-semibold">2,420 sq ft</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TypingDots({ align = "left" }: { align?: "left" | "right" }) {
  return (
    <div
      className={`flex w-fit items-center gap-1.5 rounded-[18px] border border-[#3f3350] bg-[#21192c] px-4 py-2.5 ${
        align === "right" ? "ml-auto" : "mr-auto"
      }`}
      role="status"
      aria-label="Typing"
    >
      <span className="size-1.5 animate-[typing-dot_1.35s_ease-in-out_infinite] rounded-full bg-white/72" />
      <span className="size-1.5 animate-[typing-dot_1.35s_ease-in-out_infinite] rounded-full bg-white/72 [animation-delay:160ms]" />
      <span className="size-1.5 animate-[typing-dot_1.35s_ease-in-out_infinite] rounded-full bg-white/72 [animation-delay:320ms]" />
    </div>
  );
}

function ValuationLinkCard() {
  return (
    <div className="mt-4 rounded-2xl border border-[var(--color-brand-violet)]/40 bg-[var(--color-brand-violet)]/15 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-violet)]">
        Seller signal detected
      </p>
      <p className="mt-2 text-base font-semibold text-white">Book your free property valuation</p>
      <p className="mt-2 text-sm leading-relaxed text-white">
        A 15-minute prep call gives Martin the condo comps, likely range, and timing notes before
        the showing.
      </p>
    </div>
  );
}

function IrisEmailDemo() {
  const shown = useRevealedCount(emailThread.length, 11500);
  const scrollRef = useRef<HTMLDivElement>(null);
  const userScrolledRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const visibleMessages = emailThread.slice(0, shown);
  const latestMessage = visibleMessages[visibleMessages.length - 1];

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;
    if (!isAtBottom) {
      userScrolledRef.current = true;
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        userScrolledRef.current = false;
      }, 3000);
    }
  };

  useEffect(() => {
    if (!userScrolledRef.current && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [shown]);

  return (
    <GlowCard glowColor="purple" customSize className="overflow-hidden p-0 [--backdrop:#130d1b]">
      <div className="grid min-h-0 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="flex min-h-0 flex-col border-b border-[var(--color-line)] p-4 sm:p-5 lg:border-b-0 lg:border-r">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-line)] pb-4">
            <SectionBadge icon={Mail} title="Iris email desk" subtitle="Live buyer inquiry" />
            <div className="rounded-full border border-[var(--color-brand-violet)]/50 bg-[#2a1638] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              {latestMessage?.from === "iris" ? "Typing reply" : "Reading lead"}
            </div>
          </div>

          <div className="mt-4 flex min-h-0 flex-1 flex-col rounded-2xl border border-[#443650] bg-[#09070d] p-3 text-sm shadow-[0_18px_44px_rgba(3,7,5,0.28)]">
            <div className="flex items-start justify-between gap-3 border-b border-[var(--color-line)] pb-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white">Subject</p>
                <p className="mt-1 font-semibold text-white">
                  Re: Oak Ridge Modern showing request
                </p>
              </div>
              <span className="rounded-full bg-[#2d183b] px-3 py-1 text-xs font-semibold text-white">
                CRM synced
              </span>
            </div>

            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="mt-3 flex h-[420px] flex-col gap-3 overflow-y-auto pr-2"
              style={{ scrollbarWidth: "none" }}
            >
              {visibleMessages.map((message) => {
                const isLatest = latestMessage?.id === message.id;
                const isIris = message.from === "iris";

                return (
                  <article
                    key={message.id}
                    className={[
                      "rounded-2xl border p-3 shadow-sm transition-all duration-300",
                      isIris
                        ? "border-[var(--color-brand-violet)]/45 bg-[#2a1438]"
                        : "border-[#443650] bg-[#18131f]",
                    ].join(" ")}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative size-9 shrink-0 overflow-hidden rounded-full border border-[#5e4b69] bg-[#21192c]">
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
                            <p className="truncate text-xs text-white">{message.email}</p>
                          </div>
                          <span className="shrink-0 text-xs text-white">{message.time}</span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-white">
                          <TypewriterText text={message.body} active={isIris && isLatest} />
                        </p>
                        {message.listing ? <InlineListingCard /> : null}
                        {message.valuation ? <ValuationLinkCard /> : null}
                        {message.label ? (
                          <p className="mt-3 inline-flex rounded-full bg-[#3a1d4d] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
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

        <div className="flex flex-col gap-4 bg-[#100b18] p-4 sm:p-5">
          <div className="relative min-h-[140px] overflow-hidden rounded-[28px] border border-[#443650] bg-[#07060a] shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
            <Image
              src="https://ap.rdcpix.com/574f42a37829888fdbdf1cf4d48faa27l-m3739095458rd-w960_h720.webp"
              alt="Modern home listing preview"
              fill
              sizes="(max-width: 1024px) 100vw, 440px"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
                Matched listing
              </p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
                Oak Ridge Modern
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#443650] bg-[#1b1424] p-4">
            <div className="flex items-start gap-3">
              <MapPin
                className="mt-1 size-4 shrink-0 text-[var(--color-brand-violet)]"
                aria-hidden
              />
              <div>
                <p className="font-semibold text-white">1842 Oak Ridge Lane</p>
                <p className="text-sm text-white">Austin, TX 78746</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {listingStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[#443650] bg-[#100b18] p-3"
                >
                  <p className="text-[10px] uppercase tracking-[0.16em] text-white">{stat.label}</p>
                  <p className="mt-1 text-lg font-semibold text-white">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-2 text-sm text-white">
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
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const rafRef = useRef<number>(0);
  const [playing, setPlaying] = useState(false);
  const [callComplete, setCallComplete] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bars, setBars] = useState<number[]>(Array.from({ length: 40 }, (_, i) => 8 + Math.abs(Math.sin(i * 0.4) * 25 + Math.sin(i * 0.8) * 15)));

  // Connect Web Audio API when first play
  const setupAudio = () => {
    const audio = audioRef.current;
    if (!audio || audioCtxRef.current) return;

    const audioCtx = new (window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 128; // 64 frequency bins
    const source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    audioCtxRef.current = audioCtx;
    analyserRef.current = analyser;
    sourceRef.current = source;
  };

  const animateBars = () => {
    const analyser = analyserRef.current;
    if (!analyser) return;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);

    // Get overall energy level from low-mid frequencies (where voice lives)
    const energy = dataArray.slice(0, 20).reduce((sum, v) => sum + v, 0) / (20 * 255);

    // Generate bars that span full width using energy + procedural pattern
    const newBars = Array.from({ length: 40 }, (_, i) => {
      // Phase-based procedural heights driven by real audio energy
      const phase1 = Math.sin(i * 0.35 + Date.now() * 0.003) * 0.5 + 0.5;
      const phase2 = Math.sin(i * 0.7 + Date.now() * 0.005) * 0.3 + 0.3;
      const phase3 = Math.sin(i * 1.1 + Date.now() * 0.002) * 0.2 + 0.2;

      // Combine phases weighted by energy level
      const combined = (phase1 * 0.5 + phase2 * 0.3 + phase3 * 0.2) * energy * 2.2;

      // Add actual frequency data contribution (logarithmic)
      const binIndex = Math.min(63, Math.floor(Math.pow(i / 39, 0.5) * 50));
      const freqVal = (dataArray[binIndex] ?? 0) / 255;

      const height = Math.max(8, Math.min(95, (combined * 60) + (freqVal * 30)));
      return height;
    });

    setBars(newBars);
    rafRef.current = requestAnimationFrame(animateBars);
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audioCtxRef.current) {
      setupAudio();
    }

    if (audioCtxRef.current?.state === "suspended") {
      await audioCtxRef.current.resume();
    }

    if (playing) {
      audio.pause();
      cancelAnimationFrame(rafRef.current);
      setPlaying(false);
    } else {
      await audio.play();
      setPlaying(true);
      animateBars();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onLoad = () => setDuration(audio.duration);
    const onEnded = () => {
      setPlaying(false);
      setCallComplete(true);
      cancelAnimationFrame(rafRef.current);
      // Reset bars to static idle waveform
      setBars(Array.from({ length: 40 }, (_, i) => 8 + Math.abs(Math.sin(i * 0.4) * 25 + Math.sin(i * 0.8) * 15)));
    };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoad);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoad);
      audio.removeEventListener("ended", onEnded);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <div className="flex flex-col gap-5 w-full p-6">
      {/* Header */}
      <div className="text-center">
        <div className="relative size-14 overflow-hidden rounded-full mx-auto mb-3">
          <Image src="/images/agents/aria.png" alt="Aria AI" fill className="object-cover" />
        </div>
        <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">Aria AI</p>
        <div className={`mt-1.5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition-all duration-500 ${
          callComplete
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
            : "border-white/15 bg-white/5 text-white/60"
        }`}>
          {callComplete ? (
            <svg viewBox="0 0 16 16" className="size-3 fill-current"><path d="M13.5 3.5L6 11 2.5 7.5 1 9l5 5 9-9z"/></svg>
          ) : (
            <span className="size-1.5 rounded-full bg-amber-400 animate-pulse" />
          )}
          {callComplete ? "Appointment booked" : "Recording call"}
        </div>
      </div>

      {/* Audio player */}
      <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlay}
            className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--color-brand-violet)] text-white hover:scale-105 transition-transform"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <svg viewBox="0 0 24 24" className="size-4 fill-current"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" className="size-4 fill-current"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>
          <div>
            <p className="text-sm font-semibold text-white">Oak Ridge inbound call</p>
            <p className="text-xs text-white/70">Availability, tour time, valuation handoff.</p>
          </div>
        </div>

        {/* Real-time waveform */}
        <div className="flex items-center gap-[2px] h-14 w-full">
          {bars.map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-full transition-all duration-75 ${
                i / 40 < progress
                  ? "bg-[var(--color-brand-violet)]"
                  : "bg-[var(--color-brand-violet)]/30"
              }`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>

        {/* Progress bar — clickable and draggable */}
        <div
          className="group relative h-6 flex items-center cursor-pointer"
          onClick={(e) => {
            const audio = audioRef.current;
            if (!audio || !duration) return;
            const rect = e.currentTarget.getBoundingClientRect();
            audio.currentTime = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * duration;
          }}
          onMouseDown={(e) => {
            const audio = audioRef.current;
            if (!audio || !duration) return;
            const container = e.currentTarget as HTMLDivElement;
            const rect = container.getBoundingClientRect(); // Capture rect at mousedown time

            const setTime = (clientX: number) => {
              const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
              audio.currentTime = pct * duration;
            };

            setTime(e.clientX);

            const onMove = (me: MouseEvent) => setTime(me.clientX);
            const onUp = () => {
              window.removeEventListener("mousemove", onMove);
              window.removeEventListener("mouseup", onUp);
            };
            window.addEventListener("mousemove", onMove);
            window.addEventListener("mouseup", onUp);
          }}
        >
          <div className="relative w-full h-1 rounded-full bg-white/15">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-[var(--color-brand-violet)]"
              style={{ width: `${progress * 100}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-3.5 rounded-full bg-[var(--color-brand-violet)] opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              style={{ left: `${progress * 100}%` }}
            />
          </div>
        </div>
        <div className="flex justify-between text-xs text-white/50 mt-1">
          <span>{fmt(currentTime)}</span>
          <span>{duration > 0 ? fmt(duration) : "4:41"}</span>
        </div>
      </div>

      {/* Feature bullets */}
      <div className="grid gap-2">
        {["Property details provided", "Questions answered", "Viewing booked automatically"].map((f) => (
          <div key={f} className="flex items-center gap-2 text-sm text-white/80">
            <span className="size-4 grid place-items-center rounded-full bg-[var(--color-brand-violet)]/20 text-[var(--color-brand-violet)] text-xs">✓</span>
            {f}
          </div>
        ))}
      </div>

      {/* Hidden audio */}
      <audio ref={audioRef} src="/aria-oak-ridge-call.mp3" preload="metadata" crossOrigin="anonymous" />
    </div>
  );
}

type ChatStep =
  | { type: "message"; index: number }
  | { type: "typing" };

// Timeline: each entry has the step to show and when (ms from start)
const theoTimeline: Array<{ step: ChatStep; showAt: number }> = [
  { step: { type: "message", index: 0 }, showAt: 0 },      // lead msg
  { step: { type: "typing" }, showAt: 1800 },               // Theo typing
  { step: { type: "message", index: 1 }, showAt: 3900 },    // Theo reply (hides typing)
  { step: { type: "message", index: 2 }, showAt: 6600 },    // lead msg
  { step: { type: "typing" }, showAt: 7800 },               // Theo typing
  { step: { type: "message", index: 3 }, showAt: 9600 },    // Theo reply
  { step: { type: "message", index: 4 }, showAt: 12300 },   // lead msg
  { step: { type: "typing" }, showAt: 13350 },              // Theo typing
  { step: { type: "message", index: 5 }, showAt: 15000 },   // Theo reply
];
const LOOP_DURATION = 19500;

const getTheoStatus = (lastVisibleIndex: number | undefined) => {
  if (lastVisibleIndex === undefined || lastVisibleIndex === 0)
    return { dot: "amber", text: "Qualifying lead" };
  if (lastVisibleIndex <= 2) return { dot: "amber", text: "Checking availability" };
  if (lastVisibleIndex <= 4) return { dot: "amber", text: "Scheduling showing" };
  // index 5 = final Theo reply "Done! Booked..."
  return { dot: "green", text: "Appointment booked", check: true };
};

function TheoSmsDemo() {
  const [elapsed, setElapsed] = useState(0);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const userScrolledRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const start = Date.now();
    const id = window.setInterval(() => {
      setElapsed((Date.now() - start) % LOOP_DURATION);
    }, 80);
    return () => window.clearInterval(id);
  }, []);

  // Determine which steps are currently visible
  const activeSteps = theoTimeline.filter((entry) => entry.showAt <= elapsed);
  const lastActive = activeSteps[activeSteps.length - 1];
  const showTyping = lastActive?.step.type === "typing";

  // Collect message indices to show
  const visibleIndices = activeSteps
    .filter((e) => e.step.type === "message")
    .map((e) => (e.step as { type: "message"; index: number }).index);

  const visibleLines = visibleIndices.map((i) => theoThread[i]).filter(Boolean);
  const latestMsgIndex = visibleIndices[visibleIndices.length - 1];
  const latest = latestMsgIndex !== undefined ? theoThread[latestMsgIndex] : undefined;

  const status = getTheoStatus(latestMsgIndex);

  const handleTheoScroll = () => {
    const el = transcriptRef.current;
    if (!el) return;
    const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;
    if (!isAtBottom) {
      userScrolledRef.current = true;
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        userScrolledRef.current = false;
      }, 3000);
    }
  };

  useEffect(() => {
    if (!userScrolledRef.current && transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [elapsed]);

  return (
    <div className="mx-auto w-full max-w-[360px] rounded-[38px] border border-[#3f3350] bg-[#07060a] p-2.5 shadow-[0_34px_120px_rgba(0,0,0,0.44)]">
      <div className="flex h-[540px] flex-col overflow-hidden rounded-[30px] border border-[#332a3d] bg-[#120d19] p-4">
        <div className="mx-auto mb-4 mt-1 h-5 w-20 rounded-full bg-black" />
        <div className="text-center">
          <div className="relative mx-auto size-14 overflow-hidden rounded-full border border-[var(--color-brand-violet)]/60 mb-2">
            <Image src="/images/agents/theo.png" alt="Theo" fill className="object-cover" />
          </div>
          <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
            Theo AI
          </p>
          <div className={`mt-2 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-500 ${
            status.dot === "green"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
              : "border-[var(--color-gold-italic)]/45 bg-[#241d16] text-white"
          }`}>
            {status.check ? (
              <svg viewBox="0 0 16 16" className="size-3 fill-current text-emerald-400"><path d="M13.5 3.5L6 11 2.5 7.5 1 9l5 5 9-9z"/></svg>
            ) : (
              <span className="size-2 rounded-full bg-amber-400 animate-pulse" />
            )}
            {status.text}
          </div>
        </div>

        <div className="my-4 h-px bg-[#3f3350]" />

        <div
          ref={transcriptRef}
          onScroll={handleTheoScroll}
          className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[var(--color-brand-violet)]/40 scrollbar-track-transparent [scrollbar-color:#cb6ce6_#120d19] [scrollbar-width:thin]"
        >
          {visibleLines.map((line) => {
            const isTheo = line.from === "ai";
            const isLatest = latest?.id === line.id;

            return (
              <div
                key={line.id}
                className="flex flex-col"
              >
                {isTheo && (
                  <p className="mb-1 self-end text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
                    THEO · AI
                  </p>
                )}
                {!isTheo && (
                  <p className="mb-1 self-start text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
                    ZILLOW LEAD
                  </p>
                )}
                <div
                  className={[
                    "max-w-[88%] rounded-[22px] px-4 py-3 text-sm leading-relaxed shadow-[0_12px_36px_rgba(0,0,0,0.18)]",
                    isTheo ? "self-end bg-[#35194a] text-white" : "self-start bg-[#21192c] text-white",
                  ].join(" ")}
                >
                  {line.text}
                </div>
              </div>
            );
          })}
          {showTyping ? <TypingDots align="right" /> : null}
        </div>
      </div>
    </div>
  );
}

export function AriaDeepDive() {
  return (
    <section
      id="aria"
      className="bg-[#0a0e0c] py-20 md:py-28 border-b border-white/5 relative overflow-hidden"
    >
      <div className="absolute left-1/2 top-0 h-[460px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(203,108,230,0.18),rgba(203,108,230,0)_62%)] blur-3xl" />
      <div className="absolute right-[-14rem] top-24 h-[460px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.14),rgba(124,58,237,0)_64%)] blur-3xl" />

      <div className="relative mx-auto grid w-[min(1480px,calc(100%-32px))] gap-9 lg:grid-cols-[0.58fr_1.42fr] lg:items-start">
        <div className="lg:sticky lg:top-32">
          <p className="mb-4 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-violet)]">
            04 - Live follow-up desk
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,4.6vw,4.7rem)] font-semibold leading-[0.99] text-white">
            The front desk that never sleeps and never asks for a raise.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
            A buyer asks about a listing. Iris replies with real property details, Aria answers the
            call, and Theo keeps the text thread moving until a showing or valuation is booked.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {microFeatures.map(({ icon: Icon, title, body }) => (
              <GlowCard key={title} glowColor="purple" customSize radius={12} className="p-4 flex flex-col gap-0 [--default-backdrop:rgba(18,12,28,0.9)]">
                <Icon className="size-5 text-[var(--color-brand-violet)]" aria-hidden />
                <p className="mt-4 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                  {title}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/65">{body}</p>
              </GlowCard>
            ))}
          </div>
        </div>

        {/* Bento grid: TOP=email full-width, BOTTOM=phone left + call right */}
        <div className="flex flex-col gap-6">

          {/* TOP: Email card — full width */}
          <div className="w-full min-h-[420px]">
            <IrisEmailDemo />
          </div>

          {/* BOTTOM: Phone left + Call right — equal halves */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <GlowCard glowColor="purple" customSize className="min-h-[560px] flex items-center justify-center [--backdrop:#130d1b] border border-white/10">
              <TheoSmsDemo />
            </GlowCard>
            <GlowCard glowColor="purple" customSize className="min-h-[560px] flex items-center justify-center [--backdrop:#130d1b] border border-white/10">
              <AriaPhoneDemo />
            </GlowCard>
          </div>

        </div>
      </div>
    </section>
  );
}
