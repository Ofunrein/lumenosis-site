"use client";

import { Mic } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { DemoRoom } from "@/content/demo-rooms";

type EmailResult = { subject: string; reply: string; captured: string[]; nextAction: string };
type VoiceConfig = { publicKey: string; assistantId: string };

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function DemoRoomExperience({ room, token }: { room: DemoRoom; token: string }) {
  const presets = [
    `Is ${room.listing.address} still available, and when could I see it?`,
    `Tell me more about the updates, acreage, location, and anything I should verify before touring ${room.listing.address}.`,
    `We need ${room.listing.beds} bedrooms and room for horses. Is this property worth touring?`,
    "I need to sell my Beaumont home before buying. Can Patricia help me plan both?",
  ];
  const [message, setMessage] = useState(presets[0]);
  const [emailResult, setEmailResult] = useState<EmailResult | null>(null);
  const [emailError, setEmailError] = useState("");
  const [sending, setSending] = useState(false);
  const [voiceConfig, setVoiceConfig] = useState<VoiceConfig | null>(null);
  const [voiceError, setVoiceError] = useState("");
  const voiceHost = useRef<HTMLDivElement>(null);
  const [leads, setLeads] = useState(120);
  const [lossRate, setLossRate] = useState(20);
  const [qualifiedRate, setQualifiedRate] = useState(45);
  const [appointmentRate, setAppointmentRate] = useState(35);
  const [closeRate, setCloseRate] = useState(12);
  const [commission, setCommission] = useState(9000);

  const event = useCallback(
    (name: string, durationSeconds?: number) =>
      fetch(`/api/demo/${token}/event`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: name, durationSeconds }),
        keepalive: true,
      }).catch(() => undefined),
    [token],
  );

  useEffect(() => {
    const viewed = sessionStorage.getItem(`demo-viewed:${token}`);
    void event(viewed ? "repeat_visit" : "viewed");
    sessionStorage.setItem(`demo-viewed:${token}`, "1");
  }, [event, token]);

  useEffect(() => {
    if (!voiceConfig || !voiceHost.current) return;
    const host = voiceHost.current;
    const scriptId = "vapi-demo-widget";

    const widget = document.createElement("vapi-widget");
    widget.setAttribute("public-key", voiceConfig.publicKey);
    widget.setAttribute("assistant-id", voiceConfig.assistantId);
    widget.setAttribute("mode", "voice");
    widget.setAttribute("theme", "light");
    widget.setAttribute("size", "full");
    widget.setAttribute("radius", "medium");
    widget.setAttribute("main-label", "Talk with Iris");
    widget.setAttribute("start-button-text", "Start private voice demo");
    widget.setAttribute("end-button-text", "End demo");
    widget.setAttribute("require-consent", "true");
    widget.setAttribute(
      "terms-content",
      "This is an isolated AI demonstration. Audio is processed to run the conversation. Recording is disabled.",
    );
    widget.addEventListener("call-start", () => void event("voice_started"));
    widget.addEventListener("call-end", () => void event("voice_completed"));
    widget.addEventListener("error", () =>
      setVoiceError("Voice connection failed. Try the email demo instead."),
    );
    host.appendChild(widget);

    document.getElementById(scriptId)?.remove();
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://unpkg.com/@vapi-ai/client-sdk-react@0.1.1/dist/embed/widget.umd.js";
    script.async = true;
    script.onerror = () =>
      setVoiceError("Voice interface failed to load. Try the email demo instead.");
    document.head.appendChild(script);
  }, [event, voiceConfig]);

  const recovered = useMemo(() => {
    const value =
      leads *
      (lossRate / 100) *
      (qualifiedRate / 100) *
      (appointmentRate / 100) *
      (closeRate / 100) *
      commission;
    return { low: value * 0.6, high: value };
  }, [appointmentRate, closeRate, commission, leads, lossRate, qualifiedRate]);

  async function runEmailDemo() {
    setSending(true);
    setEmailError("");
    setEmailResult(null);
    try {
      const response = await fetch(`/api/demo/${token}/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Iris is unavailable");
      setEmailResult(payload);
      void event("email_completed");
    } catch (error) {
      setEmailError(error instanceof Error ? error.message : "Iris is unavailable");
    } finally {
      setSending(false);
    }
  }

  async function loadVoiceDemo() {
    setVoiceError("");
    const response = await fetch(`/api/demo/${token}/voice`);
    const payload = await response.json();
    if (!response.ok) {
      setVoiceError(payload.error || "Voice demo is unavailable");
      return;
    }
    setVoiceConfig(payload);
  }

  const bookingUrl =
    process.env.NEXT_PUBLIC_GHL_CALENDAR_EMBED_URL || "https://lumenosis.com/#book";

  return (
    <main
      id="top"
      className="min-h-screen bg-[var(--color-bg-cream)] text-[var(--color-ink-charcoal)]"
    >
      <header className="border-b border-[var(--color-line)] bg-[var(--color-bg-cream)]">
        <div className="mx-auto flex w-[min(1200px,calc(100%-32px))] items-center justify-between gap-4 py-4">
          <div>
            <span className="block text-sm font-semibold tracking-[-0.02em]">
              Built for {room.prospect.businessName}
            </span>
            <span className="mt-1 block text-xs text-[var(--color-ink-muted)]">
              Prepared for {room.prospect.fullName} · {room.prospect.role}
            </span>
          </div>
          <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.14em] text-[var(--color-ink-muted)]">
            Private demo · expires in 14 days
          </span>
        </div>
      </header>

      <section className="mx-auto grid w-[min(1200px,calc(100%-32px))] gap-12 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-24">
        <div>
          <span className="mb-3 inline-block text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-amber)]">
            Built for {room.prospect.businessName}
          </span>
          <h1 className="headline-plain max-w-3xl text-[var(--text-display-hero)]">
            See how Iris handles every listing inquiry before it goes cold.
          </h1>
          <p className="mt-6 max-w-2xl text-[var(--text-body-lg)] leading-relaxed text-[var(--color-ink-muted)]">
            {room.prospect.firstName}, this demo uses {room.listing.address} as one live example. In
            production, Iris works across your entire property inventory and pulls current details
            from every connected listing source. Nothing in this demo connects to your inbox, phone,
            calendar, or CRM.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            {[
              "Voice AI disclosed",
              "Public facts only",
              "No live-system access",
              "Recording disabled",
            ].map((item) => (
              <span
                key={item}
                className="rounded-[var(--radius-pill)] border border-[var(--color-line)] px-3 py-2"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-[var(--radius)] bg-[#151515] text-white shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
          <div className="grid h-56 grid-cols-[2fr_1fr] gap-1 bg-[#242424]">
            {room.listing.images.map((image, index) => (
              <Image
                key={image.src}
                src={image.src}
                alt={image.alt}
                width={900}
                height={600}
                sizes={
                  index === 0 ? "(min-width: 768px) 32vw, 66vw" : "(min-width: 768px) 16vw, 33vw"
                }
                className={`h-full w-full object-cover ${index === 0 ? "row-span-2" : ""}`}
              />
            ))}
          </div>
          <div className="p-6">
            <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.14em] text-[var(--color-brand-amber)]">
              Verified active listing
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{room.listing.address}</h2>
            <p className="mt-2 text-3xl font-semibold text-white">{money(room.listing.price)}</p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
              <span>
                <strong className="block text-xl">{room.listing.beds}</strong>Beds
              </span>
              <span>
                <strong className="block text-xl">{room.listing.baths}</strong>Baths
              </span>
              <span>
                <strong className="block text-xl">
                  {room.listing.squareFeet.toLocaleString()}
                </strong>
                Sq ft
              </span>
              <span>
                <strong className="block text-xl">{room.listing.acreage}</strong>Acres
              </span>
            </div>
            <p className="mt-6 text-sm leading-6 text-white/70">{room.listing.summary}</p>
            <p className="mt-4 font-[var(--font-mono)] text-xs text-white/60">
              MLS {room.listing.mls} · {room.listing.propertyType}
              {room.listing.yearBuilt ? ` · built ${room.listing.yearBuilt}` : ""}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-dark-section)] py-20 text-white md:py-28">
        <div className="mx-auto w-[min(1200px,calc(100%-32px))]">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-[var(--color-brand-amber)]">Start here</p>
            <h2 className="mt-3 text-[clamp(2.4rem,4.6vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
              Watch Iris work a buyer email.
            </h2>
            <p className="mt-6 max-w-2xl text-[var(--text-body-lg)] leading-relaxed text-white/70">
              Try one property here. The same agent can identify any listing in your inventory,
              answer from its current source data, capture buyer intent, and prepare the right
              handoff.
            </p>
          </div>
          <article className="mt-12 overflow-hidden rounded-[var(--radius)] bg-[#ece9e1] text-[#151515] shadow-[0_28px_90px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between border-b border-black/10 bg-[#f8f7f3] px-4 py-3 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="relative h-8 w-8 overflow-hidden rounded-full border border-black/10 bg-[#151515]">
                  <Image
                    src="/images/agents/iris.png"
                    alt="Iris"
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </span>
                <div>
                  <span className="block text-sm font-semibold">Iris Inbox</span>
                  <span className="block text-[11px] text-black/50">
                    {room.prospect.businessName}
                  </span>
                </div>
              </div>
              <span className="rounded-full bg-[#e8f0fe] px-3 py-1 text-xs font-medium text-[#174ea6]">
                Live demo
              </span>
            </div>
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="border-b border-black/10 p-6 lg:border-r lg:border-b-0 md:p-8">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-gold-italic)]">
                  Buyer inquiry
                </span>
                <h3 className="mt-3 text-3xl font-semibold">Write as the buyer.</h3>
                <div className="mt-6 grid gap-2">
                  {presets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setMessage(preset)}
                      className="rounded-[10px] border border-black/10 bg-white/60 px-4 py-3 text-left text-sm leading-5 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-amber)]"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
                <label className="mt-6 block text-sm font-medium" htmlFor="demo-message">
                  Buyer email
                </label>
                <textarea
                  id="demo-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={1200}
                  rows={4}
                  className="mt-2 w-full rounded-[10px] border border-black/15 bg-white p-4 text-base leading-6 text-[#151515] outline-none focus:border-[var(--color-brand-amber)] focus:ring-2 focus:ring-[var(--color-brand-amber)]/20"
                />
                <button
                  type="button"
                  disabled={sending || message.trim().length < 2}
                  onClick={runEmailDemo}
                  className="mt-4 rounded-[10px] bg-[#151515] px-5 py-3 font-semibold text-white transition hover:bg-black active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {sending ? "Iris is responding…" : "Run email demo"}
                </button>
                {emailError ? (
                  <p
                    role="alert"
                    className="mt-4 rounded-[10px] bg-red-50 p-3 text-sm text-red-800"
                  >
                    {emailError} Try again in a moment.
                  </p>
                ) : null}
              </div>
              <div className="min-w-0 bg-white p-6 md:p-8" aria-live="polite">
                {emailResult ? (
                  <>
                    <div className="border-b border-black/10 pb-5">
                      <p className="text-xs font-medium text-black/50">
                        From: Iris &lt;iris@americanrealestate.com&gt;
                      </p>
                      <p className="mt-1 break-words text-xs text-black/50">
                        To: buyer@example.com
                      </p>
                      <h3 className="mt-4 text-xl font-semibold text-[#151515]">
                        {emailResult.subject}
                      </h3>
                    </div>
                    <p className="mt-6 whitespace-pre-wrap text-[15px] leading-7 text-[#242424]">
                      {emailResult.reply}
                    </p>
                    <div className="mt-6 overflow-hidden rounded-[12px] border border-black/10 bg-[#f8f7f3]">
                      <Image
                        src={room.listing.images[0].src}
                        alt={room.listing.images[0].alt}
                        width={900}
                        height={500}
                        sizes="(min-width: 1024px) 42vw, 90vw"
                        className="h-44 w-full object-cover sm:h-52"
                      />
                      <div className="p-5">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="text-xl font-semibold text-[#151515]">
                              {money(room.listing.price)}
                            </p>
                            <p className="mt-1 text-sm font-medium text-[#333]">
                              {room.listing.address}
                            </p>
                          </div>
                          <span className="rounded-full bg-[#e5f3e8] px-3 py-1 text-xs font-semibold text-[#1e6b35]">
                            Active when verified
                          </span>
                        </div>
                        <p className="mt-4 text-sm font-medium text-[#333]">
                          {room.listing.beds} beds · {room.listing.baths} baths ·{" "}
                          {room.listing.squareFeet.toLocaleString()} sq ft · {room.listing.acreage}{" "}
                          acres
                        </p>
                        <p className="mt-3 text-sm leading-6 text-[#666]">{room.listing.summary}</p>
                        <p className="mt-4 text-xs text-[#777]">
                          MLS {room.listing.mls} · Details subject to independent verification
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 border-t border-black/10 pt-5 text-sm leading-6 text-[#555]">
                      <p className="font-semibold text-[#151515]">
                        Iris · Buyer inquiry coordinator
                      </p>
                      <p>{room.prospect.businessName}</p>
                      <p>Working with {room.prospect.fullName}</p>
                    </div>
                    <div className="mt-8 rounded-[10px] bg-[#f1eee7] p-5 text-sm">
                      <strong className="text-[#151515]">Private agent handoff</strong>
                      <p className="mt-2 leading-6 text-[#555]">
                        {emailResult.captured.length
                          ? emailResult.captured.join(" · ")
                          : "No new buyer details captured yet"}
                      </p>
                      <p className="mt-3 font-medium leading-6 text-[#151515]">
                        {emailResult.nextAction}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex min-h-80 flex-col justify-center">
                    <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.12em] text-black/40">
                      Reply preview
                    </p>
                    <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#151515]">
                      A complete reply appears here.
                    </h3>
                    <p className="mt-4 max-w-md leading-7 text-[#666]">
                      Iris answers this example from verified property facts. In production, it
                      searches every connected listing source before replying.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </article>

          <div className="mt-16 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <article className="rounded-[var(--radius)] border border-[var(--color-brand-amber)]/40 bg-[var(--color-brand-amber-soft)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] md:p-8">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-amber)]">
                <span className="h-2 w-2 rounded-full bg-[var(--color-brand-amber)] motion-safe:animate-pulse" />
                Voice channel available
              </div>
              <h2 className="mt-4 text-3xl font-semibold">Call Iris now.</h2>
              <p className="mt-3 text-sm leading-6 text-white/75">
                Ask about this property as a real buyer. Iris answers from the same verified listing
                details and hands the conversation back to Patricia.
              </p>
              {!voiceConfig ? (
                <button
                  type="button"
                  onClick={loadVoiceDemo}
                  className="mt-6 flex w-full items-center gap-4 rounded-[12px] bg-[var(--color-brand-amber)] p-4 text-left text-black shadow-[0_10px_30px_rgba(196,154,82,0.24)] transition-[transform,background-color] duration-150 hover:bg-[#d3aa62] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-dark-section)]"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-white">
                    <Mic aria-hidden="true" size={22} strokeWidth={2.4} />
                  </span>
                  <span className="min-w-0">
                    <strong className="block text-lg">Start private voice demo</strong>
                    <span className="mt-1 block text-sm text-black/70">
                      Browser microphone · 3-minute limit
                    </span>
                  </span>
                </button>
              ) : null}
              <div ref={voiceHost} className="mt-6 min-h-40" />
              <p className="mt-4 text-xs leading-5 text-white/55">
                No phone number. Recording disabled. No live calendar or CRM access.
              </p>
              {voiceError ? (
                <p role="alert" className="mt-4 text-sm text-red-300">
                  {voiceError}
                </p>
              ) : null}
            </article>
            <article className="p-2 md:p-8">
              <h2 className="text-3xl font-semibold">What Iris already knows</h2>
              <div className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {room.listing.highlights.map((item) => (
                  <div
                    key={item}
                    className="border-t border-white/15 pt-4 text-sm leading-6 text-white/75"
                  >
                    {item}
                  </div>
                ))}
                <div className="border-t border-white/15 pt-4 text-sm leading-6 text-white/75">
                  {room.listing.lotSquareFeet.toLocaleString()} sq ft lot · $
                  {room.listing.pricePerSquareFoot}/sq ft · listed {room.listing.listedAt}
                </div>
              </div>
              <p className="mt-8 text-sm leading-6 text-white/50">
                Iris can answer verified facts immediately. Questions about availability, financing,
                insurance, restrictions, condition, or negotiations route to Patricia instead of
                getting guessed.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(1200px,calc(100%-32px))] py-16 md:py-24">
        <span className="mb-3 inline-block text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-amber)]">
          Conservative opportunity model
        </span>
        <h2 className="headline-plain max-w-3xl text-[var(--text-display-section)]">
          Use your numbers. No revenue guarantee.
        </h2>
        <div className="mt-8 grid gap-8 rounded-[var(--radius)] bg-[#f8f7f3] p-6 text-[#151515] shadow-[0_20px_60px_rgba(0,0,0,0.16)] lg:grid-cols-[1fr_0.8fr] md:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { label: "Inbound leads / month", value: leads, setter: setLeads, min: 1, max: 2000 },
              {
                label: "Lost to slow response %",
                value: lossRate,
                setter: setLossRate,
                min: 1,
                max: 100,
              },
              {
                label: "Qualified %",
                value: qualifiedRate,
                setter: setQualifiedRate,
                min: 1,
                max: 100,
              },
              {
                label: "Appointment %",
                value: appointmentRate,
                setter: setAppointmentRate,
                min: 1,
                max: 100,
              },
              { label: "Close %", value: closeRate, setter: setCloseRate, min: 1, max: 100 },
              {
                label: "Average commission",
                value: commission,
                setter: setCommission,
                min: 100,
                max: 100000,
              },
            ].map(({ label, value, setter, min, max }) => (
              <label key={label} className="text-sm font-medium">
                {label}
                <input
                  type="number"
                  value={value}
                  min={min}
                  max={max}
                  step={min}
                  onChange={(e) => setter(Number(e.target.value))}
                  className="mt-2 w-full rounded-[10px] border border-black/15 bg-white px-3 py-3 text-base text-[#151515] outline-none focus:border-[var(--color-brand-amber)] focus:ring-2 focus:ring-[var(--color-brand-amber)]/20"
                />
              </label>
            ))}
          </div>
          <div className="flex flex-col justify-center rounded-[var(--radius)] bg-[var(--color-dark-section)] p-6 text-white">
            <p className="text-sm text-white/60">Estimated monthly opportunity range</p>
            <p className="mt-2 text-4xl font-semibold text-[var(--color-gold-italic)]">
              {money(recovered.low)}–{money(recovered.high)}
            </p>
            <p className="mt-4 text-sm leading-6 text-white/60">
              Directional estimate from your assumptions. Closings depend on lead quality,
              inventory, pricing, and agent performance.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-dark-section)] py-20 text-center text-white md:py-28">
        <div className="mx-auto w-[min(800px,calc(100%-32px))]">
          <h2 className="headline-plain text-[var(--text-display-section)]">
            Want this connected to one real lead source?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/70">
            We will review one workflow live, define the guardrails, and scope a controlled pilot.
            Nothing connects before you approve it.
          </p>
          <a
            href={bookingUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => void event("booking_clicked")}
            className="mt-8 inline-block rounded-[var(--radius)] bg-[var(--color-brand-amber)] px-6 py-4 font-semibold text-black"
          >
            Book a 15-minute walkthrough
          </a>
          <div className="mt-10 text-left text-xs text-white/50">
            <p>Verified sources used for this demonstration:</p>
            {room.sources.map((source) => (
              <a
                key={source.url}
                className="mt-2 block underline"
                href={source.url}
                target="_blank"
                rel="noreferrer"
              >
                {source.label} · checked {source.checkedAt}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
