export const AU_STATES = ["VIC", "NSW", "SA", "QLD", "WA", "TAS", "NT", "ACT"];

export type AddOn = {
  id: string;
  name: string;
  /** Short label used in the booking summary. Falls back to `name`. */
  summaryLabel?: string;
  blurb: string;
  price: number;
};

/** Optional extras. Add more entries here — the UI renders the list as-is. */
export const addOns: AddOn[] = [
  {
    id: "video-walkthrough",
    name: "Video Walkthrough",
    summaryLabel: "Video Walkthrough",
    blurb:
      "A full video tour of the vehicle from our inspector — see and hear everything, ideal if you can't be there in person.",
    price: 50,
  },
];


import {
  existingJobs,
  inspectors,
  getRoster,
  REGION_LABEL,
  regionFromLocation,
  type Region,
} from "@/lib/schedule.mock";

export { REGION_LABEL, regionFromLocation };
export type { Region };

export type Slot = {
  label: string;
  hour: number;
  period: "morning" | "afternoon";
  /** Inspectors rostered on for this hour. */
  capacity: number;
  /** Inspectors still free. */
  remaining: number;
  available: boolean;
  inspectorIds: string[];
};

const HOURS = [8, 9, 10, 11, 12, 13, 14, 15];

function hourLabel(h: number) {
  const fmt = (n: number) => (n === 12 ? "12 pm" : n > 12 ? `${n - 12} pm` : `${n} am`);
  return `${fmt(h)} \u2013 ${fmt(h + 1)}`;
}

export type Day = {
  date: Date;
  iso: string;
  weekdayLabel: string;
  dayNumber: string;
  monthLabel: string;
  surcharge: number;
  tag?: string;
  slots: Slot[];
  /** Total inspector-hours still free across the day. */
  remaining: number;
  capacity: number;
};

export type Availability = {
  region: Region | null;
  regionLabel: string;
  covered: boolean;
  days: Day[];
};

export function buildAvailability({
  basePrice,
  suburb,
  postcode,
  premiumRequired = false,
  count = 14,
}: {
  basePrice: number;
  suburb: string;
  postcode?: string;
  premiumRequired?: boolean;
  count?: number;
}): Availability {
  // Prototype/testing: every location is treated as covered. Unknown suburbs
  // fall back to the Melbourne pool so the flow is always testable.
  const region: Region = regionFromLocation(suburb ?? "", postcode) ?? "melbourne";
  const roster = getRoster(region, premiumRequired);
  const covered = roster.length > 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nowHour = new Date().getHours();

  const days = Array.from({ length: count }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dow = date.getDay();
    const weekend = dow === 0 || dow === 6;
    const surcharge = i === 0 ? 55 : weekend ? 35 : 0;

    const slots: Slot[] = HOURS.map((h) => {
      const onShift = roster.filter(
        (ins) => ins.workDays.includes(dow) && h >= ins.startHour && h < ins.endHour,
      );
      const free = onShift.filter((ins) => {
        if (existingJobs(ins.id, i, h) > 0) return false;
        // Today: no same-hour or past bookings, allow 2h lead time.
        if (i === 0 && h < nowHour + 2) return false;
        return true;
      });
      return {
        label: hourLabel(h),
        hour: h,
        period: h < 12 ? "morning" : "afternoon",
        capacity: onShift.length,
        remaining: free.length,
        available: free.length > 0,
        inspectorIds: free.map((ins) => ins.id),
      };
    });

    return {
      date,
      iso: date.toISOString().slice(0, 10),
      weekdayLabel:
        i === 0
          ? "Today"
          : i === 1
            ? "Tomorrow"
            : date.toLocaleDateString("en-AU", { weekday: "short" }),
      dayNumber: String(date.getDate()),
      monthLabel: date.toLocaleDateString("en-AU", { month: "short" }),
      surcharge,
      tag: i === 0 ? "ASAP rate" : weekend ? "Weekend rate" : undefined,
      slots,
      remaining: slots.reduce((n, s) => n + s.remaining, 0),
      capacity: slots.reduce((n, s) => n + s.capacity, 0),
    };
  });

  return {
    region,
    regionLabel: region ? REGION_LABEL[region] : "your area",
    covered,
    days,
  };
}

export function findSlot(days: Day[], iso: string, label: string) {
  return days.find((d) => d.iso === iso)?.slots.find((s) => s.label === label);
}

export function arrivalWindow(slot: Slot) {
  const t = (h: number) => `${h > 12 ? h - 12 : h}:00${h >= 12 ? "pm" : "am"}`;
  return `${t(slot.hour)}\u2013${t(slot.hour + 1)} arrival \u00b7 ~90 min on site`;
}

export function dayPrice(basePrice: number, day: Day) {
  return basePrice + day.surcharge;
}

export function formatDayLong(day: Day) {
  return day.date.toLocaleDateString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

/** Deterministically assigns the inspector who will attend a chosen slot. */
export function assignInspector(slot: Slot | undefined) {
  if (!slot || slot.inspectorIds.length === 0) return null;
  const id = slot.inspectorIds[slot.hour % slot.inspectorIds.length];
  return inspectors.find((i) => i.id === id) ?? null;
}
