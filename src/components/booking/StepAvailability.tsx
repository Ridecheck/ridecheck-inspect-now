import { useState } from "react";
import { Clock, Flame, MapPin, TrendingDown, Users, Zap } from "lucide-react";
import type { Day, Slot } from "@/lib/booking";
import { arrivalWindow, dayPrice, formatDayLong } from "@/lib/booking";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/ridecheck";

export type SlotSelection = { iso: string; slot: string } | null;

function capacityTone(day: Day) {
  if (day.remaining === 0) return "bg-muted-foreground/40";
  if (day.remaining <= 3) return "bg-signal";
  return "bg-emerald-500";
}

export function StepAvailability({
  days,
  basePrice,
  selection,
  onSelect,
  activeIso,
  onActiveIso,
  regionLabel,
  covered,
}: {
  days: Day[];
  basePrice: number;
  selection: SlotSelection;
  onSelect: (s: SlotSelection) => void;
  activeIso: string;
  onActiveIso: (iso: string) => void;
  regionLabel: string;
  covered: boolean;
}) {
  const [week, setWeek] = useState(0);
  const visibleDays = days.slice(week * 7, week * 7 + 7);
  const activeDay = days.find((d) => d.iso === activeIso) ?? days[0];

  const openDays = days.filter((d) => d.remaining > 0);
  const fastest = openDays[0] ?? days[0];
  const cheapest = [...openDays].sort(
    (a, b) => a.surcharge - b.surcharge || a.date.getTime() - b.date.getTime(),
  )[0];

  const pick = (day: Day) => {
    const slot = day.slots.find((s) => s.available);
    if (!slot) return;
    onActiveIso(day.iso);
    onSelect({ iso: day.iso, slot: slot.label });
  };

  if (!covered) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent">
          <MapPin className="h-7 w-7 text-signal" aria-hidden />
        </span>
        <h2 className="mt-5 text-lg font-bold text-ink">
          We don't have inspectors there yet
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
          We currently cover Melbourne and Sydney, with Adelaide coming soon. Call us and
          we'll tell you straight whether we can get someone out to you.
        </p>
        <a
          href={PHONE_HREF}
          className="mt-5 inline-flex h-12 items-center justify-center rounded-xl bg-signal px-6 text-sm font-bold text-signal-foreground"
        >
          Call {PHONE_DISPLAY}
        </a>
      </div>
    );
  }

  const morning = activeDay.slots.filter((s) => s.period === "morning");
  const afternoon = activeDay.slots.filter((s) => s.period === "afternoon");

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-base font-bold text-ink sm:text-lg">Pick a time that suits</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Live availability across our {regionLabel} inspectors.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <HighlightCard
            badge="Fastest"
            badgeIcon={Zap}
            note={
              fastest.remaining === 1
                ? "Last inspector free that day"
                : `${fastest.remaining} slots left`
            }
            day={fastest}
            basePrice={basePrice}
            onClick={() => pick(fastest)}
          />
          {cheapest && cheapest.iso !== fastest.iso && (
            <HighlightCard
              badge="Best price"
              badgeIcon={TrendingDown}
              note={`Save $${dayPrice(basePrice, fastest) - dayPrice(basePrice, cheapest)} vs the earliest slot`}
              day={cheapest}
              basePrice={basePrice}
              onClick={() => pick(cheapest)}
            />
          )}
        </div>
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
            const active = day.iso === activeDay.iso;
            const sold = day.remaining === 0;
            return (
              <button
                key={day.iso}
                type="button"
                disabled={sold}
                onClick={() => onActiveIso(day.iso)}
                aria-pressed={active}
                className={`min-w-[86px] shrink-0 rounded-xl border p-3 text-center transition ${
                  sold
                    ? "cursor-not-allowed border-border bg-secondary/50 opacity-60"
                    : active
                      ? "border-signal bg-accent/40 shadow-soft"
                      : "border-border bg-card hover:border-signal/50"
                }`}
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {day.weekdayLabel}
                </p>
                <p className="text-lg font-extrabold text-ink">{day.dayNumber}</p>
                <p className="text-[10px] font-semibold text-muted-foreground">
                  {day.monthLabel}
                </p>
                <p
                  className={`mt-1 text-xs font-bold ${sold ? "text-muted-foreground line-through" : "text-signal"}`}
                >
                  ${dayPrice(basePrice, day)}
                </p>
                <span
                  className={`mx-auto mt-1.5 block h-1.5 w-1.5 rounded-full ${capacityTone(day)}`}
                  aria-hidden
                />
              </button>
            );
          })}
        </div>
        <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
          <Legend tone="bg-emerald-500" label="Good availability" />
          <Legend tone="bg-signal" label="Filling fast" />
          <Legend tone="bg-muted-foreground/40" label="Fully booked" />
        </p>
      </section>

      <section>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Available times — {formatDayLong(activeDay)}
        </p>
        {activeDay.tag && (
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            <Flame className="h-3.5 w-3.5 text-signal" aria-hidden />
            {activeDay.tag} applies — +${activeDay.surcharge}
          </p>
        )}

        {activeDay.remaining === 0 ? (
          <p className="mt-4 rounded-xl border border-border bg-secondary/50 px-4 py-6 text-center text-sm text-muted-foreground">
            Every inspector is booked out on this day. Try another date.
          </p>
        ) : (
          <div className="mt-4 space-y-6">
            {[
              { title: "Morning", slots: morning },
              { title: "Afternoon", slots: afternoon },
            ]
              .filter((g) => g.slots.length > 0)
              .map((group) => (
                <div key={group.title}>
                  <p className="text-xs font-bold text-ink">{group.title}</p>
                  <div className="mt-2 grid gap-3 sm:grid-cols-3">
                    {group.slots.map((slot) => (
                      <SlotCard
                        key={slot.label}
                        slot={slot}
                        price={dayPrice(basePrice, activeDay)}
                        chosen={
                          selection?.iso === activeDay.iso &&
                          selection.slot === slot.label
                        }
                        onClick={() =>
                          onSelect({ iso: activeDay.iso, slot: slot.label })
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Legend({ tone, label }: { tone: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-1.5 w-1.5 rounded-full ${tone}`} aria-hidden />
      {label}
    </span>
  );
}

function SlotCard({
  slot,
  price,
  chosen,
  onClick,
}: {
  slot: Slot;
  price: number;
  chosen: boolean;
  onClick: () => void;
}) {
  if (!slot.available) {
    return (
      <div className="rounded-xl border border-border bg-secondary/50 p-4 text-center">
        <p className="text-sm font-semibold text-muted-foreground line-through">
          {slot.label}
        </p>
        <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {slot.capacity === 0 ? "No inspector rostered" : "Booked out"}
        </p>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={chosen}
      className={`rounded-xl border p-4 text-center transition ${
        chosen
          ? "border-signal bg-accent/40 shadow-soft"
          : "border-border bg-card hover:border-signal/50"
      }`}
    >
      <p className="text-sm font-bold text-ink">{slot.label}</p>
      <p className="mt-1 text-sm font-extrabold text-signal">${price}</p>
      <p
        className={`mt-1 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${
          slot.remaining === 1 ? "text-signal" : "text-muted-foreground"
        }`}
      >
        <Users className="h-3 w-3" aria-hidden />
        {slot.remaining === 1 ? "1 inspector left" : `${slot.remaining} inspectors free`}
      </p>
      <p className="mt-1 text-[10px] text-muted-foreground">{arrivalWindow(slot)}</p>
    </button>
  );
}

function HighlightCard({
  badge,
  badgeIcon: Icon,
  note,
  day,
  basePrice,
  onClick,
}: {
  badge: string;
  badgeIcon: React.ElementType;
  note: string;
  day: Day;
  basePrice: number;
  onClick: () => void;
}) {
  const first = day.slots.find((s) => s.available);
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl border border-border bg-card p-5 text-center transition hover:border-signal hover:shadow-soft"
    >
      <span className="inline-flex items-center gap-1.5 rounded-full bg-signal px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-signal-foreground">
        <Icon className="h-3 w-3" aria-hidden />
        {badge}
      </span>
      <p className="mt-3 font-bold text-ink">{formatDayLong(day)}</p>
      <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="h-3.5 w-3.5" aria-hidden />
        {first?.label ?? "No slots"}
      </p>
      <p className="mt-2 text-3xl font-extrabold text-signal">
        ${dayPrice(basePrice, day)}
      </p>
      <p className="mt-1 text-xs font-semibold text-muted-foreground">{note}</p>
    </button>
  );
}
