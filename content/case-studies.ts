export type CaseStudy = {
  category: "booking" | "revenue" | "speed" | "volume" | "cost" | "quality";
  name: string;
  role: string;
  location: string;
  quote: string;
  result: string;
  tag: string;
};

export const caseStudies: CaseStudy[] = [
  {
    category: "booking",
    name: "Daniel",
    role: "Team lead",
    location: "Austin",
    quote:
      "Aria booked more showings on a Saturday than my ISA did all week. We stopped losing leads after hours.",
    result: "+7 deals in 90 days",
    tag: "Volume",
  },
  {
    category: "revenue",
    name: "Maya",
    role: "Brokerage owner",
    location: "Phoenix",
    quote:
      "We stopped buying more leads and started closing the ones we had. The recovery sweep paid for the whole build.",
    result: "+$420K pipeline",
    tag: "Revenue",
  },
  {
    category: "speed",
    name: "James",
    role: "Solo agent",
    location: "Houston",
    quote: "By the time my competitor calls back, the appointment is already on my calendar.",
    result: "12-second pickup",
    tag: "Speed",
  },
  {
    category: "booking",
    name: "Priya",
    role: "Listing agent",
    location: "Dallas",
    quote:
      "Iris turned three buyer emails into a seller valuation the same week. That was the missing handoff.",
    result: "3 seller calls",
    tag: "Booking",
  },
  {
    category: "speed",
    name: "Camille",
    role: "Property manager",
    location: "San Antonio",
    quote:
      "Theo answered before I knew the lead came in. The whole leasing team could see the thread in the CRM.",
    result: "Under 60 seconds",
    tag: "Speed",
  },
  {
    category: "revenue",
    name: "Andre",
    role: "Investor",
    location: "Atlanta",
    quote:
      "The dormant lead campaign brought back owners I had written off. Two turned into acquisition calls.",
    result: "+$75K net",
    tag: "Revenue",
  },
  {
    category: "volume",
    name: "Elena",
    role: "Operations manager",
    location: "Miami",
    quote:
      "We had 350 conversations in two months without adding another coordinator. Every handoff finally had an owner.",
    result: "350 conversations",
    tag: "Volume",
  },
  {
    category: "cost",
    name: "Marcus",
    role: "Team owner",
    location: "Tampa",
    quote:
      "Our cost per booked consult dropped because the AI followed up with every portal lead before they went cold.",
    result: "Lower cost/appt",
    tag: "Cost",
  },
  {
    category: "quality",
    name: "Hannah",
    role: "Luxury agent",
    location: "Denver",
    quote:
      "The replies sounded like us and used the right property details. Clients thought our team had doubled.",
    result: "Real replies",
    tag: "Quality",
  },
  {
    category: "booking",
    name: "Noah",
    role: "Broker",
    location: "Charlotte",
    quote:
      "A Sunday night inquiry became a Monday morning showing. That used to sit untouched until lunch.",
    result: "Booked overnight",
    tag: "Booking",
  },
  {
    category: "quality",
    name: "Sofia",
    role: "STR operator",
    location: "Nashville",
    quote:
      "Guest questions, owner leads, and maintenance requests stopped living in separate inboxes.",
    result: "One inbox",
    tag: "Quality",
  },
  {
    category: "revenue",
    name: "Trent",
    role: "Expansion lead",
    location: "Reno",
    quote: "We added a second market without hiring a second admin. That was the proof point.",
    result: "2nd market live",
    tag: "Revenue",
  },
];
