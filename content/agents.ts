export type Agent = {
  slug: "olivia" | "aria" | "theo" | "iris";
  name: string;
  role: string;
  tagline: string;
  bullets: string[];
  avatar: string;
  accent: "violet" | "indigo" | "gold" | "cyan";
};

export const agents: Agent[] = [
  {
    slug: "olivia",
    name: "Olivia",
    role: "Website + social intake",
    tagline: "Turns visitors, form fills, and DMs into clean lead records.",
    bullets: [
      "Answers website chat and listing questions",
      "Captures name, phone, intent, and source",
      "Connects Instagram, Facebook, and WhatsApp when needed",
      "Routes hot leads into the right CRM workflow",
    ],
    avatar: "/images/agents/olivia.png",
    accent: "violet",
  },
  {
    slug: "aria",
    name: "Aria",
    role: "Voice call handler",
    tagline: "Answers missed calls, qualifies intent, and routes urgent leads.",
    bullets: [
      "Picks up after-hours and overflow calls",
      "Qualifies buyer, seller, timeline, and urgency",
      "Summarizes every call for the human owner",
      "Books showings or valuation calls when approved",
    ],
    avatar: "/images/agents/aria.png",
    accent: "indigo",
  },
  {
    slug: "theo",
    name: "Theo",
    role: "SMS follow-up",
    tagline: "Keeps lead conversations moving before they go cold.",
    bullets: [
      "Sends the first text in under 60 seconds",
      "Shares property links, photos, and showing windows",
      "Runs long-term nurture for unready leads",
      "Honors consent, STOP, and human takeover rules",
    ],
    avatar: "/images/agents/theo.png",
    accent: "cyan",
  },
  {
    slug: "iris",
    name: "Iris",
    role: "Shared lead brain",
    tagline: "Remembers the full conversation so no channel starts from zero.",
    bullets: [
      "Answers inbound emails in your approved voice",
      "Uses real listing data for price, beds, baths, links, and photos",
      "Flags legal, financing, and sensitive replies for review",
      "Keeps one timeline across email, SMS, calls, chat, and DMs",
    ],
    avatar: "/images/agents/iris.png",
    accent: "gold",
  },
];
