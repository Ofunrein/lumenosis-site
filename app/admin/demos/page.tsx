import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { sql } from "@/lib/turso";

export const dynamic = "force-dynamic";

type Demo = {
  id: string;
  full_name: string;
  business_name: string;
  email: string;
  address: string;
  status: string;
  access_token: string;
  subject: string;
  body: string;
  outreach_status: string;
  created_at: string;
};

export default async function DemoAdminPage() {
  if (!(await isAdmin())) redirect("/admin/demos/login");
  const demos = (await sql(`SELECT d.id, p.full_name, p.business_name, p.email, l.address, d.status,
    d.access_token, o.subject, o.body, o.status AS outreach_status, d.created_at
    FROM demo_rooms d JOIN prospects p ON p.id = d.prospect_id
    JOIN listings l ON l.id = d.listing_id JOIN outreach_drafts o ON o.demo_room_id = d.id
    ORDER BY d.created_at DESC`)) as Demo[];

  return (
    <main className="min-h-screen bg-[#0c0c0d] px-4 py-12 text-white">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#c49a52]">Lumenosis</p>
            <h1 className="mt-2 text-4xl font-semibold">Demo review queue</h1>
          </div>
          <span className="text-sm text-white/60">{demos.length} demos</span>
        </div>

        <form
          action="/api/admin/demos/generate"
          method="post"
          className="mt-10 grid gap-3 rounded-[14px] bg-[#f8f7f3] p-6 text-[#151515] md:grid-cols-2"
        >
          <h2 className="text-xl font-semibold md:col-span-2">Generate real-estate demo</h2>
          {[
            ["fullName", "Agent full name"],
            ["email", "Agent email"],
            ["businessName", "Team or brokerage"],
            ["listingAddress", "Active listing address"],
            ["listingUrl", "Listing URL"],
          ].map(([name, label]) => (
            <label key={name} className="text-sm font-medium">
              {label}
              <input
                name={name}
                type={name === "email" ? "email" : name === "listingUrl" ? "url" : "text"}
                required
                className="mt-2 w-full rounded-[9px] border border-black/15 bg-white px-3 py-3 text-base outline-none focus:border-[#c49a52]"
              />
            </label>
          ))}
          <label className="text-sm font-medium">
            Sender inbox
            <select
              name="senderInbox"
              className="mt-2 w-full rounded-[9px] border border-black/15 bg-white px-3 py-3 text-base"
            >
              <option>iris-demo@agentmail.to</option>
              <option>iris-outreach@agentmail.to</option>
              <option>olivia-outreach@agentmail.to</option>
              <option>aria-outreach@agentmail.to</option>
            </select>
          </label>
          <button
            type="submit"
            className="rounded-[10px] bg-[#151515] px-5 py-3 font-semibold text-white md:col-span-2"
          >
            Research and generate draft
          </button>
        </form>

        <div className="mt-8 grid gap-5">
          {demos.map((demo) => (
            <article key={demo.id} className="rounded-[14px] bg-[#f8f7f3] p-6 text-[#151515]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-[#8a682c]">
                    {demo.status} · outreach {demo.outreach_status}
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold">{demo.full_name}</h2>
                  <p className="mt-1 text-sm text-[#666]">
                    {demo.business_name} · {demo.address}
                  </p>
                </div>
                <Link
                  className="rounded-[9px] border border-black/15 px-4 py-2 text-sm font-semibold"
                  href={`/demo/${demo.access_token}`}
                  target="_blank"
                >
                  Preview demo
                </Link>
              </div>
              <div className="mt-5 rounded-[10px] bg-white p-5">
                <strong>{demo.subject}</strong>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-[#555]">
                  {demo.body}
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                {demo.status === "draft" ? (
                  <form action={`/api/admin/demos/${demo.id}/approve`} method="post">
                    <button
                      type="submit"
                      className="rounded-[9px] bg-[#151515] px-4 py-2 font-semibold text-white"
                    >
                      Approve demo
                    </button>
                  </form>
                ) : null}
                {demo.status === "approved" && demo.outreach_status === "draft" ? (
                  <form action={`/api/admin/demos/${demo.id}/send`} method="post">
                    <button
                      type="submit"
                      className="rounded-[9px] bg-[#c49a52] px-4 py-2 font-semibold text-black"
                    >
                      Send outreach
                    </button>
                  </form>
                ) : null}
              </div>
            </article>
          ))}
          {!demos.length ? (
            <p className="rounded-[14px] border border-white/10 p-8 text-white/60">
              No drafts yet.
            </p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
