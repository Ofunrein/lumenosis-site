export type PricingPath = {
  slug: "build" | "scale";
  label: string;
  starting: string;
  pitch: string;
  bullets: string[];
  popular?: boolean;
};

export const pricingPaths: PricingPath[] = [
  {
    slug: "build",
    label: "Build with us",
    starting: "Starts at $X",
    pitch: "For solo agents and small teams installing their first AI front desk.",
    bullets: [
      "One-time install of voice + email + SMS agents",
      "Workflow mapped to your CRM",
      "30-day launch sprint",
      "Two weeks of optimization included",
    ],
  },
  {
    slug: "scale",
    label: "Scale with us",
    starting: "Starts at $Y/mo",
    pitch: "For brokerages, property management, and multi-location teams.",
    bullets: [
      "Everything in Build",
      "Per-agent + per-location coverage",
      "Monthly performance review with Martin",
      "Lead recovery sweep on dormant CRM contacts",
      "Priority new-agent buildouts",
    ],
    popular: true,
  },
];
