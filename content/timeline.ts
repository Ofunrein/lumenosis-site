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
    body: "We trace one real lead path end-to-end. Field-by-field, message-by-message, owner-by-owner. The first leak gets named.",
  },
  {
    week: "WEEK 02",
    kicker: "Build",
    title: "CRM cleanup + agent training.",
    body: "Olivia, Aria, Theo, and Iris learn your market, your scripts, your inventory, your hours. Your CRM gets the fields it should have had on day one.",
  },
  {
    week: "WEEK 03",
    kicker: "Launch",
    title: "Phones, email, and SMS go live.",
    body: "Inbound calls answered in 12 seconds. Texts in under 60. Emails replied to with property context. You watch the dashboard fill up.",
  },
  {
    week: "WEEK 04",
    kicker: "Optimize",
    title: "Scale + report.",
    body: "Weekly performance review. Tighten what works. Cut what does not. Add a second voice agent or expand to a new niche.",
  },
];
