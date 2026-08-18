import { useState } from "react";
import { Check, ChevronDown, Minus } from "lucide-react";
import { comparisonGroups, type ComparisonValue } from "@/lib/ridecheck";

function Mark({ value }: { value: ComparisonValue }) {
  if (typeof value === "string") {
    return <span className="text-sm font-semibold text-ink">{value}</span>;
  }
  return value ? (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-signal">
      <Check className="h-3.5 w-3.5 text-signal-foreground" aria-hidden />
      <span className="sr-only">Included</span>
    </span>
  ) : (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted">
      <Minus className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
      <span className="sr-only">Not included</span>
    </span>
  );
}

const isUpgrade = (s: ComparisonValue, p: ComparisonValue) =>
  (s === false && p !== false) || (typeof s === "string" && s !== p);

export function FeatureComparison() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-center gap-2 px-5 py-4 text-base font-bold text-ink transition-colors hover:bg-haze"
      >
        Compare all features
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      <div
        className={`grid transition-all duration-500 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="max-h-[70vh] overflow-y-auto border-t border-border">
            {/* Desktop / tablet table */}
            <table className="hidden w-full border-collapse text-left sm:table">
              <thead className="sticky top-0 z-10 bg-haze">
                <tr>
                  <th className="px-5 py-3 text-xs font-bold uppercase tracking-wide text-ink">
                    Feature
                  </th>
                  <th className="w-32 px-3 py-3 text-center text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Standard
                  </th>
                  <th className="w-32 px-3 py-3 text-center text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonGroups.map((group) => (
                  <>
                    <tr key={group.label} className="bg-haze/60">
                      <td
                        colSpan={3}
                        className="px-5 py-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground"
                      >
                        {group.label}
                      </td>
                    </tr>
                    {group.rows.map((row) => (
                      <tr
                        key={row.feature}
                        className={`border-t border-border ${
                          isUpgrade(row.standard, row.premium) ? "bg-signal/5" : ""
                        }`}
                      >
                        <td className="px-5 py-3 text-sm text-ink/85">{row.feature}</td>
                        <td className="px-3 py-3 text-center">
                          <Mark value={row.standard} />
                        </td>
                        <td className="px-3 py-3 text-center">
                          <Mark value={row.premium} />
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>

            {/* Mobile stacked */}
            <div className="sm:hidden">
              {comparisonGroups.map((group) => (
                <div key={group.label}>
                  <p className="bg-haze px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    {group.label}
                  </p>
                  {group.rows.map((row) => (
                    <div
                      key={row.feature}
                      className={`border-t border-border px-4 py-3 ${
                        isUpgrade(row.standard, row.premium) ? "bg-signal/5" : ""
                      }`}
                    >
                      <p className="text-sm font-medium text-ink">{row.feature}</p>
                      <div className="mt-2 flex gap-6">
                        <span className="flex items-center gap-2 text-xs text-muted-foreground">
                          Standard <Mark value={row.standard} />
                        </span>
                        <span className="flex items-center gap-2 text-xs text-muted-foreground">
                          Premium <Mark value={row.premium} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
