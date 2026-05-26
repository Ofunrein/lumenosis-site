export type TimelineWeek = {
  week: string;
  kicker: string;
  title: string;
  body: string;
};

export const timeline: TimelineWeek[] = [
  {
    week: "WEEK 01",
    kicker: "Foundation",
    title: "Audit + workflow map.",
    body: "One real lead path traced end-to-end. First leak named.",
  },
  {
    week: "WEEK 02",
    kicker: "Build",
    title: "CRM cleanup + agent training.",
    body: "Olivia, Aria, Theo, and Iris trained on your market. CRM fields fixed.",
  },
  {
    week: "WEEK 03",
    kicker: "Launch",
    title: "Phones, email, and SMS go live.",
    body: "Calls answered in 12 seconds. Texts in under 60. Dashboard fills up.",
  },
  {
    week: "WEEK 04",
    kicker: "Optimize",
    title: "Scale + report.",
    body: "Weekly review. Tighten what works. Expand to the next niche.",
  },
];
