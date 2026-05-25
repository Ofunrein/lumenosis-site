import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const payload = await req.json().catch(() => null);
  if (!payload) return NextResponse.json({ error: "invalid payload" }, { status: 400 });

  // TODO: HMAC verify against FILLOUT_WEBHOOK_SECRET when Fillout webhook is configured

  const signature =
    req.headers.get("x-fillout-signature") ?? req.headers.get("x-webhook-signature");
  if (process.env.NODE_ENV === "production" && !signature) {
    return NextResponse.json({ error: "missing signature" }, { status: 401 });
  }

  console.log("[lead] received", { ts: new Date().toISOString(), payload });

  // Optional: forward to Slack via SLACK_WEBHOOK_URL
  return NextResponse.json({ ok: true });
}
