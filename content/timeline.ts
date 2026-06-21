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
    title: "Lead-source audit.",
    body: "We trace your paid lead paths, inboxes, phone flow, CRM, calendar, and routing rules.",
  },
  {
    week: "WEEK 02",
    kicker: "Build",
    title: "Shared brain build.",
    body: "We connect your channels, property source, tone, review rules, and lead timeline.",
  },
  {
    week: "WEEK 03",
    kicker: "Launch",
    title: "Lead desk goes live.",
    body: "Email, SMS, calls, website chat, and approved social DMs start answering and routing.",
  },
  {
    week: "WEEK 04",
    kicker: "Optimize",
    title: "Tuning + handoff review.",
    body: "We review conversations, tighten human takeover, and report what is booking or leaking.",
  },
];
