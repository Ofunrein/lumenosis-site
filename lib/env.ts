import { z } from "zod";

const ServerEnv = z.object({
  DEMO_ROOM_SECRET: z.string().min(32).optional(),
  OPENAI_API_KEY: z.string().min(20).optional(),
  VAPI_PUBLIC_KEY: z.string().min(10).optional(),
  VAPI_DEMO_ASSISTANT_ID: z.string().uuid().optional(),
  FILLOUT_API_KEY: z.string().min(10).optional(),
  GHL_LOCATION_PIT: z.string().min(10).optional(),
  GHL_CALENDAR_ID: z.string().min(1).optional(),
  MAUTIC_BASE_URL: z.string().url().optional(),
  MAUTIC_USERNAME: z.string().min(1).optional(),
  MAUTIC_PASSWORD: z.string().min(1).optional(),
});

const ClientEnv = z.object({
  NEXT_PUBLIC_FILLOUT_FORM_ID: z.string().min(1).optional(),
  NEXT_PUBLIC_GHL_CALENDAR_EMBED_URL: z.string().url().optional(),
});

export const serverEnv = ServerEnv.parse({
  DEMO_ROOM_SECRET: process.env.DEMO_ROOM_SECRET,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  VAPI_PUBLIC_KEY: process.env.VAPI_PUBLIC_KEY,
  VAPI_DEMO_ASSISTANT_ID: process.env.VAPI_DEMO_ASSISTANT_ID,
  FILLOUT_API_KEY: process.env.FILLOUT_API_KEY,
  GHL_LOCATION_PIT: process.env.GHL_LOCATION_PIT,
  GHL_CALENDAR_ID: process.env.GHL_CALENDAR_ID,
  MAUTIC_BASE_URL: process.env.MAUTIC_BASE_URL,
  MAUTIC_USERNAME: process.env.MAUTIC_USERNAME,
  MAUTIC_PASSWORD: process.env.MAUTIC_PASSWORD,
});

export const clientEnv = ClientEnv.parse({
  NEXT_PUBLIC_FILLOUT_FORM_ID: process.env.NEXT_PUBLIC_FILLOUT_FORM_ID,
  NEXT_PUBLIC_GHL_CALENDAR_EMBED_URL: process.env.NEXT_PUBLIC_GHL_CALENDAR_EMBED_URL,
});
