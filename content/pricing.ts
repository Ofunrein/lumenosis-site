export type PricingPath = {
  slug: "starter" | "professional" | "team" | "enterprise";
  label: string;
  price: string;
  subtext: string;
  pitch: string;
  bullets: string[];
  popular?: boolean;
  cta: string;
};

export const pricingPaths: PricingPath[] = [
  {
    slug: "starter",
    label: "Starter",
    price: "$197",
    subtext: "/mo",
    pitch: "For solo agents installing their first AI front desk.",
    bullets: [
      "Olivia website chat agent",
      "Up to 300 leads/mo handled",
      "CRM auto-sync",
      "Email support",
    ],
    cta: "Get started",
  },
  {
    slug: "professional",
    label: "Professional",
    price: "$397",
    subtext: "/mo",
    pitch: "For busy agents and small teams with daily inquiry volume.",
    bullets: [
      "Everything in Starter",
      "Aria 24/7 voice receptionist",
      "Theo SMS sales agent",
      "Up to 700 leads/mo handled",
      "Priority onboarding",
    ],
    popular: true,
    cta: "Get started",
  },
  {
    slug: "team",
    label: "Team",
    price: "$697",
    subtext: "/mo",
    pitch: "For brokerages and multi-location teams.",
    bullets: [
      "Everything in Professional",
      "Iris email assistant",
      "Up to 1,400 leads/mo handled",
      "Monthly performance review",
      "Lead recovery sweep",
    ],
    cta: "Get started",
  },
  {
    slug: "enterprise",
    label: "Enterprise",
    price: "Custom",
    subtext: "",
    pitch: "For large brokerages, property managers, and CRE teams.",
    bullets: [
      "Unlimited lead volume",
      "Custom agent training",
      "Dedicated build engineer",
      "Multi-location deployment",
      "SLA + compliance review",
    ],
    cta: "Book a strategy call",
  },
];
