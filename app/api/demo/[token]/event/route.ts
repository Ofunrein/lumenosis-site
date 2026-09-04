import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAdmin } from "@/lib/admin-auth";
import { allowRequest, clientAddress } from "@/lib/demo-rate-limit";
import { demoRoomForToken } from "@/lib/demo-room";
import { sql, tursoConfigured } from "@/lib/turso";

const Event = z.object({
  event: z.enum([
    "viewed",
    "email_completed",
    "voice_started",
    "voice_completed",
    "repeat_visit",
    "booking_clicked",
  ]),
  durationSeconds: z.number().int().min(0).max(180).optional(),
});

export async function POST(request: NextRequest, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params;
  const match = await demoRoomForToken(token, await isAdmin());
  if (!match) return NextResponse.json({ error: "Demo not found" }, { status: 404 });

  const parsed = Event.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid event" }, { status: 400 });
  if (!allowRequest(`${token}:${clientAddress(request.headers)}:events`, 30, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Event limit reached" }, { status: 429 });
  }

  const properties = {
    distinct_id: `demo:${match.room.slug}`,
    demo: match.room.slug,
    business: match.room.prospect.businessName,
    expired: match.expired,
    duration_seconds: parsed.data.durationSeconds,
  };
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = (process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com").replace(
    /\/$/,
    "",
  );

  if (posthogKey) {
    await fetch(`${posthogHost}/capture/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: posthogKey, event: `demo_${parsed.data.event}`, properties }),
      cache: "no-store",
    }).catch(() => undefined);
  }

  if (tursoConfigured() && match.id !== match.room.slug) {
    await sql(
      "INSERT INTO engagement_events (demo_room_id, event, duration_seconds) VALUES (?, ?, ?)",
      [match.id, parsed.data.event, parsed.data.durationSeconds ?? null],
    ).catch(() => undefined);
  }

  console.info("[demo-event]", { event: parsed.data.event, demo: match.room.slug });
  return NextResponse.json({ ok: true });
}
