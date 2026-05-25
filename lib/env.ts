import { z } from "zod";

const ServerEnv = z.object({
  FILLOUT_API_KEY: z.string().min(10).optional(),
  GHL_LOCATION_PIT: z.string().min(10).optional(),
  GHL_CALENDAR_ID: z.string().min(1).optional(),
});

const ClientEnv = z.object({
  NEXT_PUBLIC_FILLOUT_FORM_ID: z.string().min(1).optional(),
  NEXT_PUBLIC_GHL_CALENDAR_EMBED_URL: z.string().url().optional(),
});

export const serverEnv = ServerEnv.parse({
  FILLOUT_API_KEY: process.env.FILLOUT_API_KEY,
  GHL_LOCATION_PIT: process.env.GHL_LOCATION_PIT,
  GHL_CALENDAR_ID: process.env.GHL_CALENDAR_ID,
});

export const clientEnv = ClientEnv.parse({
  NEXT_PUBLIC_FILLOUT_FORM_ID: process.env.NEXT_PUBLIC_FILLOUT_FORM_ID,
  NEXT_PUBLIC_GHL_CALENDAR_EMBED_URL: process.env.NEXT_PUBLIC_GHL_CALENDAR_EMBED_URL,
});
