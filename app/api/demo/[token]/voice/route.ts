import { type NextRequest, NextResponse } from "next/server";
import { allowRequest, clientAddress } from "@/lib/demo-rate-limit";
import { demoRoomForToken } from "@/lib/demo-room";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params;
  const match = demoRoomForToken(token);
  if (!match) return NextResponse.json({ error: "Demo not found" }, { status: 404 });
  if (match.expired) return NextResponse.json({ error: "Demo expired" }, { status: 410 });

  const key = `${token}:${clientAddress(request.headers)}:voice`;
  if (!allowRequest(key, 3, 24 * 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Voice demo limit reached" }, { status: 429 });
  }

  const publicKey = process.env.VAPI_PUBLIC_KEY;
  if (!publicKey)
    return NextResponse.json({ error: "Voice demo is not configured" }, { status: 503 });

  const { room } = match;
  const system = `You are Iris, an AI assistant demonstrating lead response for ${room.prospect.businessName}. This is an isolated demonstration, not a live brokerage system. Use only these verified facts: the active listing is ${room.listing.address}; price $${room.listing.price}; ${room.listing.beds} bedrooms; ${room.listing.baths} bathrooms; ${room.listing.squareFeet} square feet; ${room.listing.acreage} acres; MLS ${room.listing.mls}. Answer the useful question first, then ask exactly one short qualification or showing question. Say when a fact is unknown. Never claim to book, text, email, transfer, or write to a CRM. Never give legal, lending, fair-housing, negotiation, safety, school-quality, crime, or pricing advice; offer a licensed human instead. Keep every turn under 35 words.`;

  return NextResponse.json(
    {
      publicKey,
      assistant: {
        name: `Iris Demo — ${room.prospect.businessName}`,
        firstMessage: `Hi, I’m Iris, the AI assistant built for ${room.prospect.businessName}. This is a private demonstration using public information. What would you like to test?`,
        firstMessageMode: "assistant-speaks-first",
        maxDurationSeconds: 180,
        recordingEnabled: false,
        model: {
          provider: "openai",
          model: "gpt-4o-mini",
          temperature: 0.2,
          messages: [{ role: "system", content: system }],
        },
        voice: { provider: "openai", voiceId: "alloy" },
        transcriber: { provider: "deepgram", model: "nova-2", language: "en" },
        clientMessages: ["transcript", "speech-update", "status-update", "conversation-update"],
      },
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
