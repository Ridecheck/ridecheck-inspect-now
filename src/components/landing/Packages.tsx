import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { packages } from "@/lib/ridecheck";

export function Packages() {
  return (
    <section id="packages" className="bg-haze">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
            Inspection <span className="text-signal">Packages</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Both packages include an instant digital report so you can review the
            car's condition and decide with confidence.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative flex flex-col rounded-2xl bg-card p-7 text-card-foreground shadow-soft sm:p-9 ${
                pkg.popular ? "border-2 border-signal" : "border border-border"
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-signal px-4 py-1 text-xs font-semibold text-signal-foreground">
                  Popular
                </span>
              )}

              <h3 className="text-center text-xl font-extrabold text-signal">
                {pkg.name}
              </h3>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                {pkg.blurb}
              </p>

              <div className="mt-6 text-center">
                <span className="inline-flex items-baseline gap-2 rounded-full bg-signal px-6 py-2 text-signal-foreground">
                  <span className="font-display text-4xl font-extrabold tracking-tight">
                    ${pkg.price}
                  </span>
                  <span className="text-sm opacity-80">{pkg.duration}</span>
                </span>
                <p className="mt-2 text-sm text-muted-foreground">
                  or 4 payments of ${(pkg.price / 4).toFixed(2)} with Afterpay or Zip
                </p>
              </div>

              <ul className="mt-7 flex-1 space-y-3 border-t border-border pt-6">
                {pkg.inclusions.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                size="lg"
                className="mt-8 h-12 w-full rounded-md bg-ink text-base font-semibold text-ink-foreground hover:bg-ink/90"
              >
                <Link to="/book">
                  Book Inspection
                </Link>
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Travel surcharges may apply for vehicles outside our standard service
          suburbs. Any surcharge is confirmed with you before the inspection.
        </p>
      </div>
    </section>
  );
}
