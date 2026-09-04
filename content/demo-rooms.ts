export type DemoRoom = {
  slug: string;
  prospect: { firstName: string; businessName: string; role: string };
  listing: {
    address: string;
    status: "active";
    price: number;
    beds: number;
    baths: number;
    squareFeet: number;
    acreage: number;
    mls: string;
  };
  sources: { label: string; url: string; checkedAt: string }[];
  expiresAt: string;
  approved: boolean;
};

export const demoRooms: DemoRoom[] = [
  {
    slug: "patricia-any-old-street",
    prospect: {
      firstName: "Patricia",
      businessName: "American Real Estate, ERA Powered",
      role: "REALTOR®",
    },
    listing: {
      address: "471 Any Old Street East, Buna, TX 77612",
      status: "active",
      price: 389900,
      beds: 3,
      baths: 2,
      squareFeet: 2000,
      acreage: 12.41,
      mls: "82557177",
    },
    sources: [
      {
        label: "Active listing and current price",
        url: "https://www.har.com/homedetail/471-any-old-st-buna-tx-77612/4384980",
        checkedAt: "2026-09-04",
      },
      {
        label: "Listing agent and brokerage profile",
        url: "https://www.har.com/patricia-mack/agent_trishamack",
        checkedAt: "2026-09-04",
      },
    ],
    expiresAt: "2026-09-18T23:59:59.000Z",
    approved: true,
  },
];

export function demoRoomBySlug(slug: string) {
  return demoRooms.find((room) => room.slug === slug);
}
