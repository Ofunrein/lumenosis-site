import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { sql } from "@/lib/turso";

function html(text: string) {
  return `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;font-size:15px;line-height:1.6;color:#1f2937">${text
    .split("\n\n")
    .map(
      (part) =>
        `<p>${part.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\n", "<br>")}</p>`,
    )
    .join("")}</div>`;
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  const rows = await sql(
    `SELECT o.id, o.sender_inbox, o.recipient, o.subject, o.body FROM outreach_drafts o
    JOIN demo_rooms d ON d.id = o.demo_room_id WHERE o.demo_room_id = ? AND o.status = 'draft' AND d.status = 'approved' LIMIT 1`,
    [id],
  );
  const draft = rows[0];
  if (!draft) return NextResponse.json({ error: "Approved draft not found" }, { status: 404 });
  const apiKey = process.env.AGENTMAIL_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "AgentMail is not configured" }, { status: 503 });
  const inbox = String(draft.sender_inbox);
  const response = await fetch(
    `https://api.agentmail.to/v0/inboxes/${encodeURIComponent(inbox)}/messages/send`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        to: String(draft.recipient),
        subject: String(draft.subject),
        text: String(draft.body),
        html: html(String(draft.body)),
        labels: ["outreach", "demo-room"],
        headers: { "List-Unsubscribe": `<mailto:${inbox}?subject=unsubscribe>` },
      }),
    },
  );
  if (!response.ok) return NextResponse.json({ error: "AgentMail send failed" }, { status: 502 });
  const sent = await response.json();
  await sql(
    "UPDATE outreach_drafts SET status = 'sent', sent_at = CURRENT_TIMESTAMP, provider_message_id = ? WHERE id = ?",
    [sent.message_id ?? "", draft.id],
  );
  await sql(
    "UPDATE prospects SET status = 'contacted' WHERE id = (SELECT prospect_id FROM demo_rooms WHERE id = ?)",
    [id],
  );
  return NextResponse.redirect(new URL("/admin/demos", request.url), 303);
}
