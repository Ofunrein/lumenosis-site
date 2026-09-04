import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { demoRooms } from "@/content/demo-rooms";

function secret() {
  const value = process.env.DEMO_ROOM_SECRET;
  if (!value || value.length < 32)
    throw new Error("DEMO_ROOM_SECRET must be at least 32 characters");
  return value;
}

export function tokenForDemoRoom(slug: string) {
  return createHmac("sha256", secret()).update(`lumenosis-demo:${slug}`).digest("base64url");
}

export function demoRoomForToken(token: string) {
  if (!/^[A-Za-z0-9_-]{43}$/.test(token)) return null;

  const supplied = Buffer.from(token);
  const room = demoRooms.find((candidate) => {
    const expected = Buffer.from(tokenForDemoRoom(candidate.slug));
    return expected.length === supplied.length && timingSafeEqual(expected, supplied);
  });

  if (!room?.approved) return null;
  return { room, expired: Date.now() >= new Date(room.expiresAt).getTime() };
}
