/**
 * Availability flags for the booking picker.
 *
 * Inspectors are dispatched after a booking comes in, so we never sell a
 * specific hour. All we publish is whether a day — and each window within
 * that day — is open for requests.
 *
 * Standard inspections are OPEN unless explicitly blocked.
 * EV inspections are CLOSED unless explicitly opened, because only
 * Aviloo-certified inspectors can run the battery test and that team is small.
 *
 * When the admin panel lands, replace the lookups below with data from the API
 * (maps keyed by ISO date); the picker already greys out anything flagged
 * unavailable.
 */

import type { Region } from "@/lib/schedule.mock";

export type Window = "am" | "pm";

export type ServiceType = "standard" | "ev";

export type WindowFlag = {
  key: Window;
  title: string;
  note: string;
  available: boolean;
};

export type AvailabilityOptions = {
  serviceType?: ServiceType;
  region?: Region | null;
};

/** Blocked whole days, keyed by ISO date (YYYY-MM-DD). Admin panel will fill this. */
const blockedDays: Record<string, boolean> = {};

/** Blocked windows, keyed by `${iso}:${window}`. Admin panel will fill this. */
const blockedWindows: Record<string, boolean> = {};

/* ------------------------------------------------------------------ */
/* EV capability                                                       */
/* ------------------------------------------------------------------ */

/** Regions with at least one Aviloo-certified inspector. */
export const evCoverage: Record<Region, boolean> = {
  melbourne: true,
  sydney: true,
  adelaide: false,
};

/**
 * Weekdays each region's certified testers are rostered on, and the windows
 * they cover. 0 = Sunday … 6 = Saturday.
 *
 * MOCK — swap for `evOpenDays: Record<iso, Window[]>` fetched from the admin
 * panel. `evWindowsFor()` below is the only reader.
 */
const evRoster: Record<Region, Record<number, Window[]>> = {
  melbourne: {
    2: ["am", "pm"], // Tuesday
    4: ["am", "pm"], // Thursday
    6: ["am"], // Saturday morning
  },
  sydney: {
    1: ["am", "pm"], // Monday
    5: ["am", "pm"], // Friday
  },
  adelaide: {},
};

/** Explicit per-date overrides, e.g. a one-off certified day. Keyed `${region}:${iso}`. */
const evOpenDays: Record<string, Window[]> = {};

function evWindowsFor(iso: string, region: Region | null | undefined): Window[] {
  if (!region || !evCoverage[region]) return [];
  const override = evOpenDays[`${region}:${iso}`];
  if (override) return override;
  const weekday = new Date(`${iso}T00:00:00`).getDay();
  return evRoster[region][weekday] ?? [];
}

export function isEvRegionCovered(region: Region | null | undefined) {
  return Boolean(region && evCoverage[region]);
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

export function isDayAvailable(iso: string, opts: AvailabilityOptions = {}) {
  if (blockedDays[iso]) return false;
  if (opts.serviceType === "ev") return evWindowsFor(iso, opts.region).length > 0;
  return true;
}

export function isWindowAvailable(
  iso: string,
  window: Window,
  opts: AvailabilityOptions = {},
) {
  if (!isDayAvailable(iso, opts)) return false;
  if (blockedWindows[`${iso}:${window}`]) return false;
  if (opts.serviceType === "ev") return evWindowsFor(iso, opts.region).includes(window);
  return true;
}

export function windowsForDay(
  iso: string,
  opts: AvailabilityOptions = {},
): WindowFlag[] {
  return [
    {
      key: "am",
      title: "Morning",
      note: "8am – 12pm",
      available: isWindowAvailable(iso, "am", opts),
    },
    {
      key: "pm",
      title: "Afternoon",
      note: "12pm – 4pm",
      available: isWindowAvailable(iso, "pm", opts),
    },
  ];
}
