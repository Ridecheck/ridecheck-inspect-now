import { useState } from "react";
import { BatteryCharging, Fuel } from "lucide-react";
import { useDrivetrainDetection } from "@/hooks/use-ev-detection";
import { isElectrified } from "@/lib/ev-detect";
import type { ServiceType } from "@/lib/availability";

/**
 * Suggests switching between the standard and EV booking protocols based on
 * the vehicle the buyer typed. Suggestion only — we never switch silently,
 * because a false positive would drop someone into the gated EV calendar.
 */
export function EvDetectionPrompt({
  vehicle,
  listing = "",
  serviceType,
  onSwitch,
}: {
  vehicle: string;
  listing?: string;
  serviceType: ServiceType;
  onSwitch: (next: ServiceType, drivetrain: "ev" | "phev") => void;
}) {
  const drivetrain = useDrivetrainDetection(vehicle, listing);
  const [dismissed, setDismissed] = useState(false);

  const suggestEv = serviceType === "standard" && isElectrified(drivetrain);
  const suggestStandard = serviceType === "ev" && drivetrain === "ice";

  if (dismissed || (!suggestEv && !suggestStandard)) return null;

  return (
    <div className="rounded-2xl border border-signal/40 bg-accent/50 p-4">
      <p className="flex items-start gap-2 text-sm font-semibold text-ink">
        {suggestEv ? (
          <BatteryCharging className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden />
        ) : (
          <Fuel className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden />
        )}
        {suggestEv
          ? drivetrain === "phev"
            ? "That looks like a plug-in hybrid"
            : "That looks like an electric vehicle"
          : "That looks like a petrol or diesel vehicle"}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        {suggestEv
          ? "Our EV inspections add a certified Aviloo battery health test, and run on separate dates with our EV-certified inspectors."
          : "Standard inspections cover petrol, diesel and conventional hybrids, with far more dates available."}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() =>
            onSwitch(
              suggestEv ? "ev" : "standard",
              drivetrain === "phev" ? "phev" : "ev",
            )
          }
          className="rounded-xl bg-signal px-4 py-2 text-xs font-bold text-signal-foreground transition hover:bg-signal/90"
        >
          {suggestEv ? "Switch to EV inspection" : "Switch to standard inspection"}
        </button>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="rounded-xl border border-border px-4 py-2 text-xs font-bold text-muted-foreground transition hover:border-signal/50"
        >
          {suggestEv ? "No, it's petrol/diesel" : "No, it's electric"}
        </button>
      </div>
    </div>
  );
}
