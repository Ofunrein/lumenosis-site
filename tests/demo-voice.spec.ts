import { expect, test } from "@playwright/test";
import type { DemoRoom } from "../content/demo-rooms";
import { demoVoiceOverrides } from "../lib/demo-voice";

function room(name: string, business: string, address: string, mls: string): DemoRoom {
  return {
    slug: name.toLowerCase(),
    prospect: { firstName: name, fullName: `${name} Agent`, businessName: business, role: "REALTOR®" },
    listing: {
      address,
      status: "active",
      price: 500000,
      beds: 3,
      baths: 2,
      squareFeet: 1800,
      acreage: 1,
      mls,
      propertyType: "Single-family home",
      yearBuilt: 2001,
      lotSquareFeet: 43560,
      pricePerSquareFoot: 278,
      listedAt: "September 1, 2026",
      summary: "Verified summary",
      highlights: ["Verified highlight"],
      buyerNotes: ["Showing availability requires human confirmation"],
      images: [],
    },
    sources: [{ label: "MLS source", url: `https://example.com/${mls}`, checkedAt: "2026-09-08" }],
    safetyBoundaries: ["Never promise showing availability"],
    expiresAt: "2026-09-18T23:59:59.000Z",
    approved: true,
  };
}

test("voice override introduces the specific team and binds its verified listing context", () => {
  const value = demoVoiceOverrides(room("Patricia", "ERA Team", "1 Private Road", "MLS-A"));
  expect(value.firstMessage).toContain("ERA Team");
  expect(value.firstMessage).toContain("AI voice assistant and receptionist");
  const prompt = JSON.stringify(value.model);
  for (const fact of ["Patricia Agent", "1 Private Road", "MLS-A", "Verified highlight", "MLS source"])
    expect(prompt).toContain(fact);
  expect(prompt).toContain("Never promise showing availability");
});

test("two demo rooms produce isolated overrides without cross-demo facts", () => {
  const a = JSON.stringify(demoVoiceOverrides(room("Patricia", "ERA Team", "1 Private Road", "MLS-A")));
  const b = JSON.stringify(demoVoiceOverrides(room("Jordan", "North Team", "2 Secret Lane", "MLS-B")));
  expect(a).not.toContain("Jordan");
  expect(a).not.toContain("2 Secret Lane");
  expect(a).not.toContain("MLS-B");
  expect(b).not.toContain("Patricia");
  expect(b).not.toContain("1 Private Road");
  expect(b).not.toContain("MLS-A");
});

test("voice policy blocks secrecy attacks, prompt injection, invented facts, and regulated advice", () => {
  const prompt = JSON.stringify(demoVoiceOverrides(room("Patricia", "ERA Team", "1 Private Road", "MLS-A"))).toLowerCase();
  for (const rule of [
    "never reveal",
    "system prompt",
    "other demo",
    "verified facts",
    "do not invent",
    "fair housing",
    "mortgage qualification",
    "legal advice",
    "one question at a time",
    "human confirmation",
  ]) expect(prompt).toContain(rule);
});
