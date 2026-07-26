export const AU_STATES = ["VIC", "NSW", "SA", "QLD", "WA", "TAS", "NT", "ACT"];

export type AddOn = {
  id: string;
  name: string;
  blurb: string;
  price: number;
};

export const addOns: AddOn[] = [
  {
    id: "ppsr-plus",
    name: "CarHistory + valuation report",
    blurb: "Odometer, written-off, stolen and market valuation data.",
    price: 39,
  },
  {
    id: "road-test",
    name: "Extended road test",
    blurb: "Additional 20km highway and stop-start loop with notes.",
    price: 49,
  },
  {
    id: "cold-start",
    name: "Cold-start video",
    blurb: "We return at first start of day to capture a true cold start.",
    price: 59,
  },
  {
    id: "buyer-call",
    name: "Negotiation call",
    blurb: "A 20-minute call to help you price the faults we found.",
    price: 29,
  },
];

export type Slot = {
  label: string;
  available: boolean;
};

const HOURS = [8, 9, 10, 11, 12, 13, 14, 15];

function hourLabel(h: number) {
  const fmt = (n: number) => (n === 12 ? "12 pm" : n > 12 ? `${n - 12} pm` : `${n} am`);
  return `${fmt(h)} – ${fmt(h + 1)}`;
}

/** Deterministic pseudo-availability so the UI is stable between renders. */
function seed(dayIndex: number, hour: number) {
  return (dayIndex * 7 + hour * 13) % 10;
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
};

export function buildDays(basePrice: number, count = 7): Day[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Array.from({ length: count }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const weekend = date.getDay() === 0 || date.getDay() === 6;

    const surcharge = i === 0 ? 55 : weekend ? 35 : 0;

    const slots = HOURS.map((h) => ({
      label: hourLabel(h),
      available: seed(i, h) > (i === 0 ? 5 : 2),
    }));

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
    };
  });
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
