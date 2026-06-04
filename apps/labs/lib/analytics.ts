'use client';

import { track } from '@vercel/analytics';

type AnalyticsProperties = Record<string, string | number | boolean | null | undefined>;

export function trackLabEvent(name: string, properties: AnalyticsProperties = {}) {
  try {
    track(name, properties);
  } catch {
    // Analytics should never block the learning flow.
  }
}
