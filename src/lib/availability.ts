/**
 * Availability flags for the booking picker.
 *
 * Inspectors are dispatched after a booking comes in, so we never sell a
 * specific hour. All we publish is whether a day — and each window within
 * that day — is open for requests.
 *
 * Today everything is open. When the admin panel lands, replace the two
 * lookups below with data from the API (or a fetched map keyed by ISO date);
 * the picker already greys out anything flagged unavailable.
 */

export type Window = "am" | "pm";

export type WindowFlag = {
  key: Window;
  title: string;
  note: string;
  available: boolean;
};

/** Blocked whole days, keyed by ISO date (YYYY-MM-DD). Admin panel will fill this. */
const blockedDays: Record<string, boolean> = {};

/** Blocked windows, keyed by `${iso}:${window}`. Admin panel will fill this. */
const blockedWindows: Record<string, boolean> = {};

export function isDayAvailable(iso: string) {
  return !blockedDays[iso];
}

export function isWindowAvailable(iso: string, window: Window) {
  return isDayAvailable(iso) && !blockedWindows[`${iso}:${window}`];
}

export function windowsForDay(iso: string): WindowFlag[] {
  return [
    { key: "am", title: "Morning", note: "8am – 12pm", available: isWindowAvailable(iso, "am") },
    { key: "pm", title: "Afternoon", note: "12pm – 4pm", available: isWindowAvailable(iso, "pm") },
  ];
}
