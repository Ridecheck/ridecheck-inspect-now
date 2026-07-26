import { useState } from "react";
import { Check, Flame, Sun, Sunset } from "lucide-react";
import type { Day } from "@/lib/booking";
import { dayPrice, formatDayLong } from "@/lib/booking";
import {
  isDayAvailable,
  isEvRegionCovered,
  windowsForDay,
  type ServiceType,
  type Window,
} from "@/lib/availability";
import type { Region } from "@/lib/schedule.mock";
import { Zap } from "lucide-react";

export type Timing =
  | { mode: "asap" }
  | { mode: "day"; iso: string; part: Window }
  | null;

export const ASAP_SURCHARGE = 55;

export function timingLabel(timing: Timing, days: Day[]) {
  if (!timing) return "Not set yet";
  if (timing.mode === "asap") return "ASAP — next available";
  const day = days.find((d) => d.iso === timing.iso);
  if (!day) return "Not set yet";
  return `${formatDayLong(day)} — ${timing.part === "am" ? "morning" : "afternoon"}`;
}

export function StepTiming({
  days,
  basePrice,
  value,
  onChange,
  serviceType = "standard",
  region,
  regionLabel,
}: {
  days: Day[];
  basePrice: number;
  value: Timing;
  onChange: (t: Timing) => void;
  serviceType?: ServiceType;
  region?: Region | null;
  regionLabel?: string;
}) {
  const [week, setWeek] = useState(0);
  const isEv = serviceType === "ev";
  const opts = { serviceType, region };
  const selectableDays = days.slice(1);
  const visibleDays = selectableDays.slice(week * 7, week * 7 + 7);

  const activeIso = value?.mode === "day" ? value.iso : "";
  const activeDay = days.find((d) => d.iso === activeIso);

  const selectDay = (iso: string) => {
    const firstOpen = windowsForDay(iso, opts).find((w) => w.available);
    onChange({ mode: "day", iso, part: firstOpen?.key ?? "am" });
  };

  if (isEv && !isEvRegionCovered(region)) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
        <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent">
          <Zap className="h-6 w-6 text-signal" aria-hidden />
        </span>
        <h2 className="mt-4 text-lg font-bold text-ink">
          Aviloo testing isn&rsquo;t live in {regionLabel ?? "your area"} yet
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
          Certified EV testing runs in Melbourne and Sydney today. Leave your details
          on the next step and we&rsquo;ll contact you the moment it goes live near you
          &mdash; no payment is taken.
        </p>
        <button
          type="button"
          onClick={() => onChange({ mode: "asap" })}
          aria-pressed={value?.mode === "asap"}
          className={`mt-5 w-full rounded-xl border p-4 text-sm font-bold transition ${
            value?.mode === "asap"
              ? "border-signal bg-accent/40 text-ink"
              : "border-border text-ink hover:border-signal/50"
          }`}
        >
          Join the EV waitlist
        </button>
      </div>
    );
  }

  const anyOpen = selectableDays.some((d) => isDayAvailable(d.iso, opts));

  return (
    <div className="space-y-8">
      {isEv && (
        <p className="flex items-start gap-2 rounded-xl bg-accent px-4 py-3 text-xs leading-relaxed text-accent-foreground">
          <Zap className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden />
          Only days with an Aviloo-certified inspector rostered on are selectable.
        </p>
      )}
      <section>
        <h2 className="text-base font-bold text-ink sm:text-lg">Pick a time that suits</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick a day and rough time — we'll confirm your exact slot by SMS within 2 hours.
        </p>

        {!isEv && <button
          type="button"
          onClick={() => onChange({ mode: "asap" })}
          aria-pressed={value?.mode === "asap"}
          className={`mt-4 flex w-full items-center justify-between gap-3 rounded-2xl border p-4 text-left transition sm:p-5 ${
            value?.mode === "asap"
              ? "border-signal bg-accent/40 shadow-soft"
              : "border-border bg-card hover:border-signal/50"
          }`}
        >
          <span className="min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-signal px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-signal-foreground">
              <Flame className="h-3 w-3" aria-hidden />
              ASAP
            </span>
            <span className="mt-2 block font-bold text-ink">
              Same or next day · +${ASAP_SURCHARGE}
            </span>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              Priority dispatch — we assign the first inspector who frees up.
            </span>
          </span>
          <span className="shrink-0 text-right">
            <span className="block text-2xl font-extrabold text-signal">
              ${basePrice + ASAP_SURCHARGE}
            </span>
            {value?.mode === "asap" && (
              <Check className="ml-auto mt-1 h-4 w-4 text-signal" aria-hidden />
            )}
          </span>
        </button>}
      </section>

      <section>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <p className="min-w-0 truncate text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Choose a day
          </p>
          <div className="flex shrink-0 gap-1.5">
            <button
              type="button"
              onClick={() => setWeek(0)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition sm:px-3 sm:text-xs ${week === 0 ? "bg-ink text-ink-foreground" : "bg-secondary text-muted-foreground hover:text-ink"}`}
            >
              This week
            </button>
            <button
              type="button"
              onClick={() => setWeek(1)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition sm:px-3 sm:text-xs ${week === 1 ? "bg-ink text-ink-foreground" : "bg-secondary text-muted-foreground hover:text-ink"}`}
            >
              Next week
            </button>
          </div>
        </div>

        <div className="mt-3 -mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-2 sm:-mx-1 sm:px-1">
          {visibleDays.map((day) => {
            const active = day.iso === activeIso;
            const open = isDayAvailable(day.iso, opts);
            return (
              <button
                key={day.iso}
                type="button"
                disabled={!open}
                onClick={() => selectDay(day.iso)}
                aria-pressed={active}
                className={`w-[74px] shrink-0 snap-start rounded-xl border p-2.5 text-center transition sm:w-[86px] sm:p-3 ${
                  !open
                    ? "cursor-not-allowed border-border bg-secondary/50 opacity-50"
                    : active
                      ? "border-signal bg-accent/40 shadow-soft"
                      : "border-border bg-card hover:border-signal/50"
                }`}
              >
                <p className="text-[9px] font-bold uppercase tracking-tight text-muted-foreground sm:text-[10px] sm:tracking-wider">
                  {day.weekdayLabel}
                </p>
                <p className="text-lg font-extrabold text-ink">{day.dayNumber}</p>
                <p className="text-[10px] font-semibold text-muted-foreground">
                  {day.monthLabel}
                </p>
                <p
                  className={`mt-1 text-xs font-bold ${open ? "text-signal" : "text-muted-foreground line-through"}`}
                >
                  ${dayPrice(basePrice, day)}
                </p>
                {!open && (
                  <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                    {isEv ? "No EV" : "Full"}
                  </p>
                )}
              </button>
            );
          })}
        </div>
        {isEv && !anyOpen && (
          <p className="mt-3 text-xs text-muted-foreground">
            No certified EV days in this window &mdash; try next week, or call us and
            we&rsquo;ll find the next opening.
          </p>
        )}
      </section>

      {value?.mode === "day" && activeDay && (
        <section>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Morning or afternoon — {formatDayLong(activeDay)}
          </p>
          {activeDay.tag === "Weekend rate" && (
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
              Weekend rate applies — +${activeDay.surcharge}
            </p>
          )}
          <div className="mt-3 grid grid-cols-2 gap-3">
            {windowsForDay(activeDay.iso, opts).map((w) => {
              const Icon = w.key === "am" ? Sun : Sunset;
              const on = value.part === w.key;
              return (
                <button
                  key={w.key}
                  type="button"
                  disabled={!w.available}
                  onClick={() => onChange({ ...value, part: w.key })}
                  aria-pressed={on}
                  className={`flex min-h-[104px] flex-col justify-between gap-2 rounded-2xl border p-4 text-left transition sm:p-5 ${
                    !w.available
                      ? "cursor-not-allowed border-border bg-secondary/50 opacity-50"
                      : on
                        ? "border-signal bg-accent/40 shadow-soft"
                        : "border-border bg-card hover:border-signal/50"
                  }`}
                >
                  <span className="flex items-start justify-between gap-2">
                    <Icon className="h-5 w-5 text-signal" aria-hidden />
                    {on && w.available && (
                      <Check className="h-4 w-4 shrink-0 text-signal" aria-hidden />
                    )}
                  </span>
                  <span>
                    <span className="block text-base font-bold text-ink">{w.title}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {w.available ? w.note : "Unavailable"}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            We'll text your confirmed arrival time once your inspector is assigned.
          </p>
        </section>
      )}
    </div>
  );
}
