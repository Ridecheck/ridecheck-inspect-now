import { CalendarDays, Check, Flame, Sun, Sunset } from "lucide-react";
import type { Day } from "@/lib/booking";
import { dayPrice, formatDayLong } from "@/lib/booking";

export type Timing =
  | { mode: "asap" }
  | { mode: "day"; iso: string; part: "am" | "pm" }
  | null;

export const ASAP_SURCHARGE = 55;

export function timingLabel(timing: Timing, days: Day[]) {
  if (!timing) return "Not set yet";
  if (timing.mode === "asap") return "ASAP — next available";
  const day = days.find((d) => d.iso === timing.iso);
  if (!day) return "Not set yet";
  return `${formatDayLong(day)}, ${timing.part === "am" ? "morning" : "afternoon"}`;
}

export function StepTiming({
  days,
  basePrice,
  value,
  onChange,
  regionLabel,
}: {
  days: Day[];
  basePrice: number;
  value: Timing;
  onChange: (t: Timing) => void;
  regionLabel: string;
}) {
  const selectableDays = days.filter((_, i) => i > 0);
  const activeIso = value?.mode === "day" ? value.iso : "";
  const activeDay = days.find((d) => d.iso === activeIso);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-base font-bold text-ink sm:text-lg">
          How soon do you need it?
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          We dispatch the nearest available {regionLabel} inspector and confirm your exact
          time by SMS.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => onChange({ mode: "asap" })}
            aria-pressed={value?.mode === "asap"}
            className={`rounded-2xl border p-5 text-left transition ${
              value?.mode === "asap"
                ? "border-signal bg-accent/40 shadow-soft"
                : "border-border bg-card hover:border-signal/50"
            }`}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-signal px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-signal-foreground">
              <Flame className="h-3 w-3" aria-hidden />
              ASAP
            </span>
            <p className="mt-3 font-bold text-ink">Same or next day</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Priority dispatch to the first inspector who frees up.
            </p>
            <p className="mt-3 text-2xl font-extrabold text-signal">
              ${basePrice + ASAP_SURCHARGE}
            </p>
            <p className="text-xs font-semibold text-muted-foreground">
              Includes +${ASAP_SURCHARGE} priority fee
            </p>
          </button>

          <button
            type="button"
            onClick={() =>
              onChange(
                value?.mode === "day"
                  ? value
                  : { mode: "day", iso: selectableDays[0].iso, part: "am" },
              )
            }
            aria-pressed={value?.mode === "day"}
            className={`rounded-2xl border p-5 text-left transition ${
              value?.mode === "day"
                ? "border-signal bg-accent/40 shadow-soft"
                : "border-border bg-card hover:border-signal/50"
            }`}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ink-foreground">
              <CalendarDays className="h-3 w-3" aria-hidden />
              Pick a day
            </span>
            <p className="mt-3 font-bold text-ink">Choose your date</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Tell us morning or afternoon and we'll fit you in.
            </p>
            <p className="mt-3 text-2xl font-extrabold text-signal">${basePrice}</p>
            <p className="text-xs font-semibold text-muted-foreground">
              Weekdays ${basePrice} · weekends +$35
            </p>
          </button>
        </div>
      </section>

      {value?.mode === "day" && (
        <>
          <section>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Choose a day
            </p>
            <div className="mt-3 -mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-2 sm:-mx-1 sm:px-1">
              {selectableDays.map((day) => {
                const active = day.iso === activeIso;
                return (
                  <button
                    key={day.iso}
                    type="button"
                    onClick={() => onChange({ ...value, iso: day.iso })}
                    aria-pressed={active}
                    className={`w-[74px] shrink-0 snap-start rounded-xl border p-2.5 text-center transition sm:w-[86px] sm:p-3 ${
                      active
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
                    <p className="mt-1 text-xs font-bold text-signal">
                      ${dayPrice(basePrice, day)}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          <section>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Morning or afternoon?
            </p>
            {activeDay?.tag === "Weekend rate" && (
              <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                Weekend rate applies — +${activeDay.surcharge}
              </p>
            )}
            <div className="mt-3 grid grid-cols-2 gap-3">
              {(
                [
                  { key: "am", title: "Morning", note: "8am – 12pm", icon: Sun },
                  { key: "pm", title: "Afternoon", note: "12pm – 4pm", icon: Sunset },
                ] as const
              ).map(({ key, title, note, icon: Icon }) => {
                const on = value.part === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => onChange({ ...value, part: key })}
                    aria-pressed={on}
                    className={`flex items-center justify-between gap-2 rounded-xl border p-4 text-left transition ${
                      on
                        ? "border-signal bg-accent/40 shadow-soft"
                        : "border-border bg-card hover:border-signal/50"
                    }`}
                  >
                    <span>
                      <span className="flex items-center gap-1.5 text-sm font-bold text-ink">
                        <Icon className="h-4 w-4 text-signal" aria-hidden />
                        {title}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {note}
                      </span>
                    </span>
                    {on && <Check className="h-4 w-4 shrink-0 text-signal" aria-hidden />}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              We'll text your confirmed arrival time once your inspector is assigned.
            </p>
          </section>
        </>
      )}
    </div>
  );
}
