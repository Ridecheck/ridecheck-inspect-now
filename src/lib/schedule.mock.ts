/**
 * Mock inspector roster. Swap this module for a fetch to the real scheduling
 * API — `getRoster()` is the only function `booking.ts` depends on.
 */

export type Region = "melbourne" | "sydney" | "adelaide";

export const REGION_LABEL: Record<Region, string> = {
  melbourne: "Melbourne",
  sydney: "Sydney",
  adelaide: "Adelaide",
};

export type Inspector = {
  id: string;
  name: string;
  regions: Region[];
  /** 0 = Sunday … 6 = Saturday */
  workDays: number[];
  /** Inclusive start hour, exclusive end hour, 24h. */
  startHour: number;
  endHour: number;
  /** Max inspections per day. */
  dailyCap: number;
  premium: boolean;
  rating: number;
  inspections: number;
};

export const inspectors: Inspector[] = [
  {
    id: "dion",
    name: "Dion",
    regions: ["melbourne"],
    workDays: [1, 2, 3, 4, 5, 6],
    startHour: 8,
    endHour: 16,
    dailyCap: 3,
    premium: true,
    rating: 5.0,
    inspections: 640,
  },
  {
    id: "marcus",
    name: "Marcus",
    regions: ["melbourne"],
    workDays: [1, 2, 3, 4, 5],
    startHour: 9,
    endHour: 15,
    dailyCap: 3,
    premium: true,
    rating: 4.9,
    inspections: 410,
  },
  {
    id: "sam",
    name: "Sam",
    regions: ["melbourne", "sydney"],
    workDays: [2, 3, 4, 5, 6],
    startHour: 8,
    endHour: 14,
    dailyCap: 2,
    premium: false,
    rating: 4.9,
    inspections: 220,
  },
  {
    id: "ravi",
    name: "Ravi",
    regions: ["sydney"],
    workDays: [1, 2, 3, 4, 5, 6],
    startHour: 8,
    endHour: 16,
    dailyCap: 3,
    premium: true,
    rating: 5.0,
    inspections: 520,
  },
  {
    id: "tom",
    name: "Tom",
    regions: ["sydney"],
    workDays: [1, 3, 4, 5],
    startHour: 10,
    endHour: 16,
    dailyCap: 2,
    premium: false,
    rating: 4.8,
    inspections: 180,
  },
  {
    id: "elena",
    name: "Elena",
    regions: ["adelaide"],
    workDays: [1, 2, 3, 4, 5],
    startHour: 8,
    endHour: 16,
    dailyCap: 3,
    premium: true,
    rating: 4.9,
    inspections: 310,
  },
  {
    id: "brett",
    name: "Brett",
    regions: ["adelaide"],
    workDays: [2, 3, 4, 5, 6],
    startHour: 9,
    endHour: 15,
    dailyCap: 2,
    premium: false,
    rating: 4.8,
    inspections: 150,
  },
];

export function getRoster(region: Region, premiumRequired: boolean) {
  return inspectors.filter(
    (i) => i.regions.includes(region) && (!premiumRequired || i.premium),
  );
}

/** Deterministic stand-in for jobs already on the books. */
export function existingJobs(inspectorId: string, dayIndex: number, hour: number) {
  const key =
    inspectorId.charCodeAt(0) * 17 + inspectorId.length * 5 + dayIndex * 31 + hour * 13;
  return key % 10 > 5 ? 1 : 0;
}

const MELBOURNE_HINTS = [
  "melbourne",
  "brunswick",
  "richmond",
  "geelong",
  "dandenong",
  "footscray",
  "st kilda",
  "ballarat",
  "frankston",
];
const SYDNEY_HINTS = [
  "sydney",
  "parramatta",
  "bondi",
  "newcastle",
  "penrith",
  "chatswood",
  "liverpool",
  "wollongong",
  "manly",
];
const ADELAIDE_HINTS = ["adelaide", "glenelg", "norwood", "prospect"];

/** Maps a free-text suburb/postcode to a service region. */
export function regionFromLocation(suburb: string, postcode?: string): Region | null {
  const text = `${suburb} ${postcode ?? ""}`.toLowerCase();
  const code = text.match(/\b(\d{4})\b/)?.[1];

  if (MELBOURNE_HINTS.some((h) => text.includes(h))) return "melbourne";
  if (SYDNEY_HINTS.some((h) => text.includes(h))) return "sydney";
  if (ADELAIDE_HINTS.some((h) => text.includes(h))) return "adelaide";

  if (code) {
    if (code.startsWith("3")) return "melbourne";
    if (code.startsWith("2")) return "sydney";
    if (code.startsWith("5")) return "adelaide";
  }
  return null;
}
