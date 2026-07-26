import { Car, Check, Link2, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AU_STATES } from "@/lib/booking";
import { packages } from "@/lib/ridecheck";


export type BookingDetails = {
  suburb: string;
  postcode: string;
  rego: string;
  state: string;
  vehicle: string;
  listing: string;
  pkg: string;
};

function Labelled({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

export function StepBooking({
  value,
  onChange,
}: {
  value: BookingDetails;
  onChange: (patch: Partial<BookingDetails>) => void;
}) {

  return (
    <div className="space-y-8">
      <section>
        <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
          <MapPin className="h-5 w-5 text-signal" aria-hidden />
          Where is the vehicle?
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-[2fr_1fr]">
          <Labelled label="Suburb">
            <Input
              className="h-12 rounded-xl"
              placeholder="e.g. Brunswick"
              value={value.suburb}
              onChange={(e) => onChange({ suburb: e.target.value })}
              maxLength={80}
            />
          </Labelled>
          <Labelled label="Postcode">
            <Input
              className="h-12 rounded-xl"
              placeholder="3056"
              inputMode="numeric"
              value={value.postcode}
              onChange={(e) => onChange({ postcode: e.target.value })}
              maxLength={4}
            />
          </Labelled>
        </div>
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
          <Car className="h-5 w-5 text-signal" aria-hidden />
          Which vehicle are we inspecting?
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-[2fr_1fr]">
          <Labelled label="Registration">
            <Input
              className="h-12 rounded-xl uppercase"
              placeholder="ABC123"
              value={value.rego}
              onChange={(e) => onChange({ rego: e.target.value.toUpperCase() })}
              maxLength={10}
            />
          </Labelled>
          <Labelled label="State">
            <div className="flex flex-wrap gap-1.5">
              {AU_STATES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onChange({ state: s })}
                  aria-pressed={value.state === s}
                  className={`rounded-lg border px-2.5 py-1.5 text-xs font-bold transition ${
                    value.state === s
                      ? "border-signal bg-signal text-signal-foreground"
                      : "border-border text-muted-foreground hover:border-signal/50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </Labelled>
        </div>
        <div className="mt-4 grid gap-4">
          <Labelled label="Make, model and year">
            <Input
              className="h-12 rounded-xl"
              placeholder="e.g. Toyota HiLux SR5 2021"
              value={value.vehicle}
              onChange={(e) => onChange({ vehicle: e.target.value })}
              maxLength={120}
            />
          </Labelled>
          <Labelled label="Listing link (optional)">
            <div className="relative">
              <Link2
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-signal"
                aria-hidden
              />
              <Input
                className="h-12 rounded-xl pl-10"
                placeholder="Paste the Carsales or Marketplace link"
                value={value.listing}
                onChange={(e) => onChange({ listing: e.target.value })}
                maxLength={300}
              />
            </div>
          </Labelled>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-ink">Choose your inspection</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {packages.map((p) => {
            const selected = value.pkg === p.name;
            return (
              <button
                key={p.name}
                type="button"
                onClick={() => onChange({ pkg: p.name })}
                aria-pressed={selected}
                className={`rounded-2xl border p-4 text-left transition ${
                  selected
                    ? "border-signal bg-accent/40 shadow-soft"
                    : "border-border bg-card hover:border-signal/50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    {p.popular && (
                      <span className="inline-block rounded-full bg-signal px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-signal-foreground">
                        Most popular
                      </span>
                    )}
                    <p className="mt-1 font-bold text-ink">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.duration}</p>
                  </div>
                  <p className="text-2xl font-extrabold text-signal">${p.price}</p>
                </div>
                <ul className="mt-3 space-y-1">
                  {p.inclusions.slice(0, 3).map((inc) => (
                    <li
                      key={inc}
                      className="flex items-start gap-2 text-xs text-muted-foreground"
                    >
                      <Check className="mt-0.5 h-3 w-3 shrink-0 text-signal" aria-hidden />
                      {inc}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
      </section>

    </div>
  );
}
