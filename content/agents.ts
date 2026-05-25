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
    role: "Front desk chat",
    tagline: "Answers website visitors in seconds and captures every lead.",
    bullets: [
      "Instant replies to property questions",
      "Captures name, phone, intent before they leave",
      "Routes hot leads to your CRM in real time",
      "Speaks your market's language",
    ],
    avatar: "/images/agents/olivia.png",
    accent: "violet",
  },
  {
    slug: "aria",
    name: "Aria",
    role: "24/7 voice receptionist",
    tagline: "Picks up every call. Books showings while you sleep.",
    bullets: [
      "12-second average pickup, day or night",
      "Qualifies buyers, sellers, renters in-call",
      "Books showings + valuations directly to your calendar",
      "TCPA-safe two-party recording where required",
    ],
    avatar: "/images/agents/aria.png",
    accent: "indigo",
  },
  {
    slug: "theo",
    name: "Theo",
    role: "SMS sales agent",
    tagline: "First text in under 60 seconds. Two-way conversations until booked.",
    bullets: [
      "Sub-60-second response on every form fill",
      "Multi-step nurture until booked or opted out",
      "Reactivates dormant CRM contacts on demand",
      "STOP-compliant, written consent only",
    ],
    avatar: "/images/agents/theo.png",
    accent: "cyan",
  },
  {
    slug: "iris",
    name: "Iris",
    role: "Email assistant",
    tagline: "Listing-aware replies that turn buyer inquiries into seller valuations.",
    bullets: [
      "Reads every inbound email, answers in your voice",
      "Detects seller signal in buyer inquiries",
      "Books valuation appointments automatically",
      "Logs every thread in your CRM",
    ],
    avatar: "/images/agents/iris.png",
    accent: "gold",
  },
];
