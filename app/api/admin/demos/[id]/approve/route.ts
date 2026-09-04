import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { sql } from "@/lib/turso";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  await sql(
    "UPDATE demo_rooms SET status = 'approved', approved_at = CURRENT_TIMESTAMP WHERE id = ? AND status = 'draft'",
    [id],
  );
  return NextResponse.redirect(new URL("/admin/demos", request.url), 303);
}
