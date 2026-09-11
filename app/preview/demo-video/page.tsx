import { DemoRoomExperience } from "@/components/demo-room-experience";
import { demoRooms } from "@/content/demo-rooms";

export const metadata = {
  title: "Demo video block preview",
  robots: { index: false, follow: false },
};

/**
 * Branch-only preview of the demo room with the Wistia video block.
 * Renders the real DemoRoomExperience against static sample data so the
 * layout can be reviewed without a DB token.
 */
export default function DemoVideoPreviewPage() {
  const room = demoRooms[0];
  if (!room) return null;
  return <DemoRoomExperience room={room} token={"preview".padEnd(43, "0")} />;
}
