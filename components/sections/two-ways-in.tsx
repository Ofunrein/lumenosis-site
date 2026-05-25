import { Pencil, Star, Sparkles, Building } from "lucide-react";
import { CreativePricing, type PricingTier } from "@/components/ui/creative-pricing";

const tiers: PricingTier[] = [
  {
    name: "Starter",
    icon: <Pencil className="w-5 h-5" />,
    price: "$197",
    period: "/mo",
    description: "For solo agents installing their first AI front desk.",
    color: "violet",
    features: [
      "Olivia website chat agent",
      "Up to 300 leads/mo handled",
      "CRM auto-sync",
      "Email support",
    ],
  },
  {
    name: "Professional",
    icon: <Star className="w-5 h-5" />,
    price: "$397",
    period: "/mo",
    description: "For busy agents and small teams.",
    color: "violet",
    features: [
      "Everything in Starter",
      "Aria 24/7 voice receptionist",
      "Theo SMS sales agent",
      "Up to 700 leads/mo",
      "Priority onboarding",
    ],
    popular: true,
  },
  {
    name: "Team",
    icon: <Sparkles className="w-5 h-5" />,
    price: "$697",
    period: "/mo",
    description: "For brokerages and multi-location teams.",
    color: "violet",
    features: [
      "Everything in Professional",
      "Iris email assistant",
      "Up to 1,400 leads/mo",
      "Monthly review with Martin",
      "Lead recovery sweep",
    ],
  },
  {
    name: "Enterprise",
    icon: <Building className="w-5 h-5" />,
    price: "Custom",
    description: "For large brokerages and CRE teams.",
    color: "violet",
    features: [
      "Unlimited lead volume",
      "Custom agent training",
      "Dedicated build engineer",
      "Multi-location deployment",
      "SLA + compliance review",
    ],
  },
];

export function TwoWaysIn() {
  return (
    <section className="border-b border-[var(--color-line)] bg-[var(--color-bg-cream)] py-16 md:py-24">
      <div className="mx-auto w-[min(1200px,calc(100%-32px))]">
        <div className="max-w-2xl mb-10">
          <p className="mb-3 text-[var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-violet)]">
            06 — Programs
          </p>
        </div>
        <CreativePricing
          tag="Simple Pricing"
          title="Two ways in."
          description="Both paths lead to the same outcome: qualified appointments on your calendar."
          tiers={tiers}
        />
      </div>
    </section>
  );
}
