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
  const assistantId = process.env.VAPI_DEMO_ASSISTANT_ID;
  if (!publicKey || !assistantId)
    return NextResponse.json({ error: "Voice demo is not configured" }, { status: 503 });

  return NextResponse.json(
    {
      publicKey,
      assistantId,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
