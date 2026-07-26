import { Clock, Flame, TrendingDown, Zap } from "lucide-react";
import type { Day } from "@/lib/booking";
import { dayPrice, formatDayLong } from "@/lib/booking";

export type SlotSelection = { iso: string; slot: string } | null;

export function StepAvailability({
  days,
  basePrice,
  selection,
  onSelect,
  activeIso,
  onActiveIso,
}: {
  days: Day[];
  basePrice: number;
  selection: SlotSelection;
  onSelect: (s: SlotSelection) => void;
  activeIso: string;
  onActiveIso: (iso: string) => void;
}) {
  const activeDay = days.find((d) => d.iso === activeIso) ?? days[0];

  const fastest = days.find((d) => d.slots.some((s) => s.available)) ?? days[0];
  const cheapest = [...days]
    .filter((d) => d.slots.some((s) => s.available))
    .sort((a, b) => a.surcharge - b.surcharge)[0];

  const pick = (day: Day) => {
    const slot = day.slots.find((s) => s.available);
    if (!slot) return;
    onActiveIso(day.iso);
    onSelect({ iso: day.iso, slot: slot.label });
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-bold text-ink">Pick a time that suits</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Live availability across our Melbourne and Sydney inspectors.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <HighlightCard
            badge="Fastest"
            badgeIcon={Zap}
            note="Only 1 slot remaining"
            day={fastest}
            basePrice={basePrice}
            onClick={() => pick(fastest)}
          />
          {cheapest && cheapest.iso !== fastest.iso && (
            <HighlightCard
              badge="Best price"
              badgeIcon={TrendingDown}
              note={`Save $${dayPrice(basePrice, fastest) - dayPrice(basePrice, cheapest)} vs today`}
              day={cheapest}
              basePrice={basePrice}
              onClick={() => pick(cheapest)}
            />
          )}
        </div>
      </section>

      <section>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Choose a day
        </p>
        <div className="mt-3 -mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
          {days.map((day) => {
            const active = day.iso === activeDay.iso;
            const sold = !day.slots.some((s) => s.available);
            return (
              <button
                key={day.iso}
                type="button"
                onClick={() => onActiveIso(day.iso)}
                aria-pressed={active}
                className={`min-w-[86px] shrink-0 rounded-xl border p-3 text-center transition ${
                  active
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
              </button>
            );
          })}
        </div>
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
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {activeDay.slots.map((slot) => {
            const chosen =
              selection?.iso === activeDay.iso && selection.slot === slot.label;
            if (!slot.available) {
              return (
                <div
                  key={slot.label}
                  className="rounded-xl border border-border bg-secondary/50 p-4 text-center"
                >
                  <p className="text-sm font-semibold text-muted-foreground line-through">
                    {slot.label}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Booked nearby
                  </p>
                </div>
              );
            }
            return (
              <button
                key={slot.label}
                type="button"
                onClick={() => onSelect({ iso: activeDay.iso, slot: slot.label })}
                aria-pressed={chosen}
                className={`rounded-xl border p-4 text-center transition ${
                  chosen
                    ? "border-signal bg-accent/40 shadow-soft"
                    : "border-border bg-card hover:border-signal/50"
                }`}
              >
                <p className="text-sm font-bold text-ink">{slot.label}</p>
                <p className="mt-1 text-sm font-extrabold text-signal">
                  ${dayPrice(basePrice, activeDay)}
                </p>
              </button>
            );
          })}
        </div>
      </section>
    </div>
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
