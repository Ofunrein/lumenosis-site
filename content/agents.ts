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
    slug: "iris",
    name: "Iris",
    role: "Shared lead brain",
    tagline:
      "Remembers every conversation across channels and answers email with real property facts.",
    bullets: [
      "Answers inbound emails in your approved voice",
      "Uses real listing data for price, beds, baths, links, and photos",
      "Flags legal, financing, and sensitive replies for review",
      "Keeps one timeline across email, SMS, calls, chat, and DMs",
    ],
    avatar: "/images/agents/iris.png",
    accent: "gold",
  },
  {
    slug: "theo",
    name: "Theo",
    role: "SMS follow-up",
    tagline:
      "Responds quickly, follows up, sends listing links, handles nurture, and respects opt-outs.",
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
    slug: "aria",
    name: "Aria",
    role: "Voice call handler",
    tagline: "Answers missed calls, qualifies urgency, summarizes calls, and routes hot leads.",
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
    slug: "olivia",
    name: "Olivia",
    role: "Website + social intake",
    tagline: "Handles website chat, forms, Instagram, Facebook Messenger, and WhatsApp intake.",
    bullets: [
      "Answers website chat and listing questions",
      "Captures name, phone, intent, and source",
      "Connects Instagram, Facebook, and WhatsApp when needed",
      "Routes hot leads into the right CRM workflow",
    ],
    avatar: "/images/agents/olivia.png",
    accent: "violet",
  },
];
