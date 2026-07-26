import { Check, Mail, Phone, Plus, Star, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addOns } from "@/lib/booking";
import { REGION_LABEL, type Inspector } from "@/lib/schedule.mock";
import { TERMS_URL } from "@/lib/ridecheck";

export type ContactDetails = {
  name: string;
  phone: string;
  email: string;
  notes: string;
  agreed: boolean;
};

export function StepReview({
  inspector,
  value,
  onChange,
  selectedAddOns,
  onToggleAddOn,
}: {
  inspector: Inspector | null;
  value: ContactDetails;
  onChange: (patch: Partial<ContactDetails>) => void;
  selectedAddOns: string[];
  onToggleAddOn: (id: string) => void;
}) {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-border bg-card p-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {inspector ? "Your assigned inspector" : "Your inspector"}
        </p>
        <div className="mt-3 flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent text-base font-extrabold text-signal">
            {(inspector?.name ?? "R").charAt(0)}
          </span>
          <div>
            <p className="flex items-center gap-2 font-bold text-ink">
              {inspector?.name ?? "Assigned once you pick a time"}
              <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
                <Check className="h-3 w-3 text-signal" aria-hidden />
                Verified
              </span>
            </p>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-signal text-signal" aria-hidden />
              {inspector
                ? `${inspector.rating.toFixed(1)} \u00b7 ${inspector.inspections}+ inspections \u00b7 ${inspector.regions.map((r) => REGION_LABEL[r]).join(" & ")}`
                : "5.0 \u00b7 Melbourne & Sydney"}
            </p>
          </div>
        </div>
        <p className="mt-4 rounded-xl bg-accent/50 px-4 py-3 text-xs text-accent-foreground">
          Your inspector calls before heading out and texts you when they are on the way.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-ink">Your details</h2>
        <div className="mt-4 space-y-3">
          <IconInput
            icon={User}
            placeholder="Full name"
            aria-label="Full name"
            value={value.name}
            onChange={(e) => onChange({ name: e.target.value })}
            maxLength={100}
          />
          <IconInput
            icon={Phone}
            type="tel"
            placeholder="Phone number"
            aria-label="Phone number"
            value={value.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            maxLength={20}
          />
          <IconInput
            icon={Mail}
            type="email"
            placeholder="Email address"
            aria-label="Email address"
            value={value.email}
            onChange={(e) => onChange({ email: e.target.value })}
            maxLength={255}
          />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-ink">Help us prepare for arrival</h2>
        <Textarea
          className="mt-3 min-h-24 rounded-xl"
          placeholder="e.g. Dealer yard, ask for Sam at the front desk. Car is at the rear lot."
          aria-label="Notes for the inspector"
          value={value.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
          maxLength={500}
        />
      </section>

      <section>
        <h2 className="text-lg font-bold text-ink">Recommended add-ons</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Optional extras. Add them now or ask your inspector on the day.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {addOns.map((a) => {
            const on = selectedAddOns.includes(a.id);
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => onToggleAddOn(a.id)}
                aria-pressed={on}
                className={`flex items-start justify-between gap-3 rounded-2xl border p-4 text-left transition ${
                  on
                    ? "border-signal bg-accent/40"
                    : "border-border bg-card hover:border-signal/50"
                }`}
              >
                <div>
                  <p className="text-sm font-bold text-ink">{a.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{a.blurb}</p>
                  <p className="mt-1.5 text-sm font-extrabold text-signal">+${a.price}</p>
                </div>
                <span
                  className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                    on
                      ? "border-signal bg-signal text-signal-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                  aria-hidden
                >
                  {on ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Promo code
        </p>
        <div className="mt-2 flex gap-2">
          <Input
            className="h-12 max-w-xs rounded-xl uppercase"
            placeholder="Enter code"
            aria-label="Promo code"
            maxLength={20}
          />
          <Button variant="outline" className="h-12 rounded-xl px-6">
            Apply
          </Button>
        </div>
      </section>

      <label className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
        <input
          type="checkbox"
          checked={value.agreed}
          onChange={(e) => onChange({ agreed: e.target.checked })}
          className="mt-0.5 h-4 w-4 accent-signal"
        />
        <span>
          I have read and accept the{" "}
          <a
            href={TERMS_URL}
            target="_blank"
            rel="noopener"
            className="font-semibold text-signal underline"
          >
            terms and conditions
          </a>{" "}
          and authorise this booking request.
        </span>
      </label>
    </div>
  );
}

function IconInput({
  icon: Icon,
  ...props
}: React.ComponentProps<typeof Input> & { icon: React.ElementType }) {
  return (
    <div className="relative">
      <Icon
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-signal"
        aria-hidden
      />
      <Input {...props} className="h-12 rounded-xl pl-10" />
    </div>
  );
}
