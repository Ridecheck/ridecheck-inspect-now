import { ShieldCheck } from "lucide-react";
import type { AddOn } from "@/lib/booking";

type Line = { label: string; value: string };

export function BookingSummary({
  rows,
  charges,
  total,
  addOnList,
}: {
  rows: Line[];
  charges: Line[];
  total: number;
  addOnList?: AddOn[];
}) {
  return (
    <aside className="rounded-2xl bg-ink p-6 text-ink-foreground">
      <p className="text-xs font-bold uppercase tracking-widest text-signal">
        Your booking so far
      </p>

      <dl className="mt-5 space-y-4">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-ink-foreground/50">
              {row.label}
            </dt>
            <dd className="mt-0.5 text-sm font-bold">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 border-t border-ink-foreground/15 pt-4">
        {charges.map((c) => (
          <div key={c.label} className="flex justify-between py-1 text-xs">
            <span className="text-ink-foreground/70">{c.label}</span>
            <span className="font-semibold">{c.value}</span>
          </div>
        ))}
        {addOnList?.map((a) => (
          <div key={a.id} className="flex justify-between py-1 text-xs">
            <span className="text-ink-foreground/70">{a.name}</span>
            <span className="font-semibold">${a.price}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-baseline justify-between border-t border-ink-foreground/15 pt-4">
        <span className="text-sm font-bold">Total (inc. GST)</span>
        <span className="text-2xl font-extrabold text-signal">${total}</span>
      </div>

      <p className="mt-5 flex items-start gap-2 text-xs text-ink-foreground/70">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden />
        Risk-free booking. Free cancellation up to 24 hours before, and no payment is
        taken today.
      </p>
    </aside>
  );
}
