"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { DemoRoom } from "@/content/demo-rooms";

type EmailResult = { reply: string; captured: string[]; nextAction: string };
type VoiceConfig = { publicKey: string; assistant: Record<string, unknown> };

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
    `We need ${room.listing.beds} bedrooms near ${room.listing.address.split(",")[1]?.trim()}. What should we know about this home?`,
    "I may need to sell before buying. Can someone help me plan both?",
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
    widget.setAttribute("assistant", JSON.stringify(voiceConfig.assistant));
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
        <div className="mx-auto flex w-[min(1200px,calc(100%-32px))] items-center justify-between py-4">
          <span className="text-sm font-semibold tracking-[-0.02em]">LUMENOSIS AI</span>
          <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.14em] text-[var(--color-ink-muted)]">
            Private demo · expires in 14 days
          </span>
        </div>
      </header>

      <section className="mx-auto grid w-[min(1200px,calc(100%-32px))] gap-12 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-24">
        <div>
          <span className="mb-3 inline-block text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-violet)]">
            Built for {room.prospect.businessName}
          </span>
          <h1 className="headline-plain max-w-3xl text-[var(--text-display-hero)]">
            See how Iris handles the lead before it goes cold.
          </h1>
          <p className="mt-6 max-w-2xl text-[var(--text-body-lg)] text-[var(--color-ink-muted)]">
            {room.prospect.firstName}, this isolated demo uses your active listing at{" "}
            {room.listing.address}. Nothing connects to your inbox, phone, calendar, or CRM.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            {[
              "AI disclosed",
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

        <div className="rounded-[var(--radius)] border border-[var(--color-line)] bg-white p-6 shadow-[var(--shadow-soft)]">
          <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.14em] text-[var(--color-brand-violet)]">
            Live listing context
          </p>
          <h2 className="mt-3 text-2xl font-semibold">{room.listing.address}</h2>
          <p className="mt-2 text-3xl font-semibold">{money(room.listing.price)}</p>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
            <span>
              <strong className="block text-xl">{room.listing.beds}</strong>Beds
            </span>
            <span>
              <strong className="block text-xl">{room.listing.baths}</strong>Baths
            </span>
            <span>
              <strong className="block text-xl">{room.listing.squareFeet.toLocaleString()}</strong>
              Sq ft
            </span>
            <span>
              <strong className="block text-xl">{room.listing.acreage}</strong>Acres
            </span>
          </div>
          <p className="mt-6 font-[var(--font-mono)] text-xs text-[var(--color-ink-muted)]">
            MLS {room.listing.mls} · verified active September 4, 2026
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-dark-section)] py-20 text-white md:py-28">
        <div className="mx-auto grid w-[min(1200px,calc(100%-32px))] gap-8 lg:grid-cols-2">
          <article className="rounded-[var(--radius)] border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-gold-italic)]">
              Email lead test
            </span>
            <h2 className="mt-3 text-3xl font-semibold">Send Iris a buyer inquiry.</h2>
            <div className="mt-6 grid gap-2">
              {presets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setMessage(preset)}
                  className="rounded-[var(--radius)] border border-white/10 px-4 py-3 text-left text-sm hover:bg-white/10"
                >
                  {preset}
                </button>
              ))}
            </div>
            <label className="mt-6 block text-sm font-medium" htmlFor="demo-message">
              Or type anything
            </label>
            <textarea
              id="demo-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={1200}
              rows={4}
              className="mt-2 w-full rounded-[var(--radius)] border border-white/15 bg-black/20 p-4 text-white"
            />
            <button
              type="button"
              disabled={sending || message.trim().length < 2}
              onClick={runEmailDemo}
              className="mt-4 rounded-[var(--radius)] bg-[var(--color-brand-amber)] px-5 py-3 font-semibold text-black disabled:opacity-50"
            >
              {sending ? "Iris is responding…" : "Run email demo"}
            </button>
            {emailError ? (
              <p role="alert" className="mt-4 text-sm text-red-300">
                {emailError}
              </p>
            ) : null}
            {emailResult ? (
              <div className="mt-6 rounded-[var(--radius)] bg-white p-5 text-[var(--color-ink-charcoal)]">
                <p className="whitespace-pre-wrap text-sm leading-6">{emailResult.reply}</p>
                <div className="mt-5 border-t border-[var(--color-line)] pt-4 text-sm">
                  <strong>What Iris captured</strong>
                  <p className="mt-1 text-[var(--color-ink-muted)]">
                    {emailResult.captured.length
                      ? emailResult.captured.join(" · ")
                      : "No new lead details yet"}
                  </p>
                  <strong className="mt-3 block">Next action</strong>
                  <p className="mt-1 text-[var(--color-ink-muted)]">{emailResult.nextAction}</p>
                </div>
              </div>
            ) : null}
          </article>

          <article className="rounded-[var(--radius)] border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-gold-italic)]">
              Voice lead test
            </span>
            <h2 className="mt-3 text-3xl font-semibold">Talk with Iris in your browser.</h2>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Three-minute limit. No phone number. No recording. No live booking or CRM writes.
            </p>
            {!voiceConfig ? (
              <button
                type="button"
                onClick={loadVoiceDemo}
                className="mt-6 rounded-[var(--radius)] bg-[var(--color-brand-amber)] px-5 py-3 font-semibold text-black"
              >
                Load secure voice demo
              </button>
            ) : null}
            <div ref={voiceHost} className="mt-6 min-h-40" />
            {voiceError ? (
              <p role="alert" className="mt-4 text-sm text-red-300">
                {voiceError}
              </p>
            ) : null}
          </article>
        </div>
      </section>

      <section className="mx-auto w-[min(1200px,calc(100%-32px))] py-16 md:py-24">
        <span className="mb-3 inline-block text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-violet)]">
          Conservative opportunity model
        </span>
        <h2 className="headline-plain max-w-3xl text-[var(--text-display-section)]">
          Use your numbers. No revenue guarantee.
        </h2>
        <div className="mt-8 grid gap-8 rounded-[var(--radius)] border border-[var(--color-line)] bg-white p-6 shadow-[var(--shadow-soft)] lg:grid-cols-[1fr_0.8fr] md:p-8">
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
                  className="mt-2 w-full rounded-[var(--radius)] border border-[var(--color-line)] bg-[var(--color-bg-cream)] px-3 py-3"
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
