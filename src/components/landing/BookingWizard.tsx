import { ArrowRight, Clock, CreditCard, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BOOKING_URL } from "@/lib/ridecheck";

const wizardSteps = ["Location", "Vehicle", "Inspection", "Your details"];

export function BookingWizard() {
  return (
    <section id="check-car" className="bg-haze">
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-10">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
              Let's check if this car is{" "}
              <span className="text-signal">worth buying</span>
            </h2>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden /> Takes 60 seconds
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CreditCard className="h-4 w-4" aria-hidden /> No payment required yet
              </span>
            </div>
          </div>

          {/* Step tracker */}
          <ol className="mx-auto mt-8 flex max-w-2xl items-start justify-between">
            {wizardSteps.map((label, i) => (
              <li key={label} className="relative flex flex-1 flex-col items-center">
                {i > 0 && (
                  <span
                    className="absolute right-1/2 top-4 -z-0 h-px w-full bg-border"
                    aria-hidden
                  />
                )}
                <span
                  className={`relative z-10 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                    i === 0
                      ? "bg-signal text-signal-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </span>
                <span
                  className={`mt-2 text-center text-xs font-semibold ${
                    i === 0 ? "text-signal" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            {/* Step 1 */}
            <div>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
                <Send className="h-5 w-5 text-signal" aria-hidden />
              </span>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-signal">
                Step 1 of 4
              </p>
              <h3 className="mt-1 text-xl font-bold text-ink">
                Where is the vehicle located?
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                This helps us send the closest available inspector.
              </p>

              <div className="relative mt-5">
                <MapPin
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-signal"
                  aria-hidden
                />
                <Input
                  type="text"
                  placeholder="Enter suburb or postcode"
                  aria-label="Suburb or postcode"
                  className="h-12 rounded-xl pl-10"
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">e.g. Brunswick, 3056</p>

              <Button
                asChild
                size="lg"
                className="mt-5 h-12 w-full rounded-xl text-base font-semibold shadow-soft"
              >
                <a href={BOOKING_URL} target="_blank" rel="noopener">
                  Continue
                  <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                </a>
              </Button>

              <p className="mt-4 rounded-xl bg-accent px-4 py-3 text-sm text-accent-foreground">
                Same day and next day inspection spots available this week.
              </p>
            </div>

            {/* Map card */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-background p-6 text-center">
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-accent">
                <span className="absolute h-24 w-24 rounded-full bg-card/70" aria-hidden />
                <MapPin className="relative h-9 w-9 text-signal" aria-hidden />
              </div>
              <p className="mt-5 text-sm font-bold text-ink">
                We service all Melbourne &amp; Sydney suburbs
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Adelaide coming soon. We travel to the seller, dealer or private.
              </p>
              <span className="mt-4 h-1 w-10 rounded-full bg-signal" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
