export type FaqItem = { q: string; a: string };

export const faq: FaqItem[] = [
  {
    q: "What does this actually cost?",
    // Saved for later: "$3,000 setup + $2,500/mo", "$1,500 setup + $1,000/mo".
    a: "Pricing is scoped after the demo. We map your channels, CRM, calendar, property data, review rules, and management needs before quoting the build.",
  },
  {
    q: "How long until it is running?",
    a: "Thirty days from kickoff for the core lead desk. Week one maps lead sources and rules. Week two builds the shared brain and integrations. Week three launches priority channels. Week four tunes review, routing, and reporting.",
  },
  {
    q: "Which teams are the best fit?",
    a: "Real estate teams already spending money on leads. That includes 3 to 30 agent teams, Zillow or Realtor.com lead buyers, brokerages, agents running Meta or Google ads, and teams that need ISA coverage without hiring another full-time ISA.",
  },
  {
    q: "Which channels can Iris Lead Desk cover?",
    a: "Email, SMS, voice calls, website chat, Instagram DM, Facebook Messenger, and WhatsApp. The point is not just more channels. The point is one shared memory and one routing logic across all of them.",
  },
  {
    q: "Which CRMs and calendars do you integrate with?",
    a: "Follow Up Boss, Lofty, kvCORE, GoHighLevel, HubSpot, Google Sheets, Calendly, Google Calendar, and CRM calendars. If your system has an API, webhook, export, or clean enough workaround, we can usually connect it.",
  },
  {
    q: "Where does property data come from?",
    a: "The first version can use Google Sheets, a database, CRM listings, IDX or MLS exports, or Zillow and Apify enrichment. Iris uses available facts like price, beds, baths, square footage, links, photos, showing windows, and seller notes when they are present.",
  },
  {
    q: "Is this TCPA safe?",
    a: "We design around consent records, STOP and HELP handling, human takeover, and brokerage review. We are not legal counsel, so your compliance officer or attorney signs off before launch.",
  },
  {
    q: "What happens if the AI gets a question wrong?",
    a: "Sensitive, legal, financing, Fair Housing, low-confidence, or policy-bound replies can go to approval mode instead of auto-send. Human takeover is available anytime, and the full timeline stays visible.",
  },
  {
    q: "Can I cancel?",
    a: "Setup is a one-time implementation fee. Monthly management is month-to-month unless a custom agreement says otherwise. Thirty days notice is the default.",
  },
  {
    q: "Do my agents need to be trained?",
    a: "Your agents do not need to learn a complicated new tool. We train the owner or operator on the dashboard, routing rules, review mode, and takeover flow. Humans still handle judgment, negotiations, and relationship work.",
  },
  {
    q: "Will my brokerage approve this?",
    a: "We prepare the compliance and operating summary: recording, retention, consent, Fair Housing boundaries, review mode, and escalation rules. Brokerage approval depends on your office policies.",
  },
  {
    q: "Is this an AI ISA?",
    a: "No. AI ISA is too narrow. Iris Lead Desk is a shared-brain response system for inbound real estate leads across channels. It answers, qualifies, follows up, remembers, and routes. Your licensed team still owns the relationship and decisions.",
  },
  {
    q: "What will Iris not do?",
    a: "It will not give legal advice, financing advice, Fair Housing-sensitive guidance, negotiate on your behalf, or pretend to be a licensed agent. Those moments are routed to a human.",
  },
  {
    q: "What if I am not a fit?",
    a: "Then the strategy call ends with us telling you exactly what to do instead. No upsell, no pressure. We turn down more clients than we take.",
  },
];
