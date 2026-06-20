export type FaqItem = { q: string; a: string };

export const faq: FaqItem[] = [
  // TODO(martin): real pricing strings replace $X / $Y throughout file when prices locked
  {
    q: "What does this actually cost?",
    a: "Two paths. Build with us starts at $X for a one-time install. Scale with us starts at $Y per month for ongoing coverage. The strategy call walks through which one fits.",
  },
  {
    q: "How long until it is running?",
    a: "Thirty days from kickoff. Week one audit, week two build, week three launch, week four optimize. Most teams see first booked appointments inside week three.",
  },
  {
    q: "Which CRMs do you integrate with?",
    a: "Follow Up Boss, Lofty, KvCORE, Sierra, HubSpot, Salesforce, GoHighLevel, Google Sheets. If your CRM has an API, we connect it.",
  },
  {
    q: "Is this TCPA safe?",
    a: "Yes. We collect prior express written consent through your existing forms, store the consent record, honor STOP and HELP, and never message outside your opted-in audience. We are not legal counsel. Your compliance officer signs off before launch.",
  },
  {
    q: "What happens if the AI gets a question wrong?",
    a: "Aria, Theo, and Iris escalate to a human owner the moment confidence drops. You see every escalation in the dashboard with full transcript. Iteration happens in the weekly review.",
  },
  {
    q: "Can I cancel?",
    a: "Build is one-time so there is nothing to cancel. Scale is month-to-month. Thirty days notice, no penalty, no clawback.",
  },
  {
    q: "Do my agents need to be trained?",
    a: "No. The AI agents handle the volume. Your humans handle the conversion meetings. We train you on the dashboard in one 30-minute session.",
  },
  {
    q: "Will my brokerage approve this?",
    a: "We hand you a one-page compliance summary covering recording, retention, consent, and Fair Housing language. We have not had a brokerage say no when the document is in front of their attorney.",
  },
  {
    q: "Can I run multiple AI agents at once?",
    a: "Yes. Olivia + Aria + Theo + Iris is the standard four. Add a second voice line for after-hours or a Spanish-language agent on request.",
  },
  {
    q: "What can your AI agents NOT do?",
    a: "They cannot replace the relationship your agent builds face-to-face, handle legally sensitive advice, negotiate on your behalf, or attend showings. Every conversation that requires professional judgment gets escalated to a human. We will not automate the parts that require your license.",
  },
  {
    q: "What if I am not a fit?",
    a: "Then the strategy call ends with us telling you exactly what to do instead. No upsell, no pressure. We turn down more clients than we take.",
  },
];
