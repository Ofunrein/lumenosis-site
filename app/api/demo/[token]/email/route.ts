import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { allowRequest, clientAddress } from "@/lib/demo-rate-limit";
import { demoRoomForToken } from "@/lib/demo-room";

export const dynamic = "force-dynamic";

const Input = z.object({ message: z.string().trim().min(2).max(1200) });
const Output = z.object({
  reply: z.string().min(1),
  captured: z.array(z.string()).max(8),
  nextAction: z.string().min(1),
});

export async function POST(request: NextRequest, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params;
  const match = demoRoomForToken(token);
  if (!match) return NextResponse.json({ error: "Demo not found" }, { status: 404 });
  if (match.expired) return NextResponse.json({ error: "Demo expired" }, { status: 410 });

  const key = `${token}:${clientAddress(request.headers)}:email`;
  if (!allowRequest(key, 8, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Demo limit reached" }, { status: 429 });
  }

  const parsed = Input.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid inquiry" }, { status: 400 });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Email demo is not configured" }, { status: 503 });

  const { room } = match;
  const knowledge = [
    `Business: ${room.prospect.businessName}`,
    `Listing status: ${room.listing.status}`,
    `Address: ${room.listing.address}`,
    `Price: $${room.listing.price.toLocaleString("en-US")}`,
    `Bedrooms: ${room.listing.beds}`,
    `Bathrooms: ${room.listing.baths}`,
    `Square feet: ${room.listing.squareFeet}`,
    `Acreage: ${room.listing.acreage}`,
    `MLS: ${room.listing.mls}`,
  ].join("\n");

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: ["Bearer", apiKey].join(" "), "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.2,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "iris_demo_reply",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              reply: { type: "string" },
              captured: { type: "array", items: { type: "string" } },
              nextAction: { type: "string" },
            },
            required: ["reply", "captured", "nextAction"],
          },
        },
      },
      messages: [
        {
          role: "system",
          content: `You are Iris, an AI assistant demonstrating lead response for ${room.prospect.businessName}. Do not add an identity introduction; the application adds the required AI disclosure. Answer the useful question first, then ask exactly one low-friction qualification or showing question. Use only the verified facts below. Say plainly when a fact is unknown. Never give legal, lending, fair-housing, negotiation, safety, school-quality, crime, or pricing advice. Escalate those topics to a licensed human. Return JSON with reply (short email), captured (facts explicitly provided by the lead), and nextAction.\n\nVERIFIED FACTS\n${knowledge}`,
        },
        { role: "user", content: parsed.data.message },
      ],
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error("[demo-email] OpenAI request failed", {
      status: response.status,
      detail: detail.slice(0, 300),
    });
    return NextResponse.json({ error: "Iris is temporarily unavailable" }, { status: 502 });
  }
  const payload = await response.json();
  const text = payload.choices?.[0]?.message?.content;
  let decoded: unknown = null;
  try {
    decoded = typeof text === "string" ? JSON.parse(text) : null;
  } catch {
    decoded = null;
  }
  const result = Output.safeParse(decoded);
  if (!result.success)
    return NextResponse.json({ error: "Iris returned an invalid response" }, { status: 502 });

  const reply = `I’m Iris, the AI assistant for ${room.prospect.businessName}. ${result.data.reply}`;
  return NextResponse.json({ ...result.data, reply }, { headers: { "Cache-Control": "no-store" } });
}
