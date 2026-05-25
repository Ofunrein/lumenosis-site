export type CaseStudy = {
  category: "booking" | "revenue" | "speed";
  metric: string;
  quote: string;
  attribution: string;
};

export const caseStudies: CaseStudy[] = [
  {
    category: "booking",
    metric: "+7 transactions in 90 days",
    quote: "Aria booked more showings on a Saturday than my ISA did all week.",
    attribution: "Real Estate Team, Austin TX",
  },
  {
    category: "revenue",
    metric: "37% lift in conversion",
    quote: "We stopped buying more leads and started closing the ones we had.",
    attribution: "Brokerage Owner, Phoenix AZ",
  },
  {
    category: "speed",
    metric: "12-second avg pickup",
    quote: "By the time my competitor calls back, the appointment is on my calendar.",
    attribution: "Solo Agent, Houston TX",
  },
  {
    category: "booking",
    metric: "163% more weekend showings",
    quote: "Iris turned three buyer emails into a listing the same week.",
    attribution: "Real Estate Pro, Dallas TX",
  },
  {
    category: "speed",
    metric: "Sub-60s text response",
    quote: "Theo answered before I knew the lead came in.",
    attribution: "Property Manager, San Antonio TX",
  },
  {
    category: "revenue",
    metric: "+$420k closed pipeline",
    quote: "The recovery sweep on our old CRM list paid for the year.",
    attribution: "Investor, Atlanta GA",
  },
];
