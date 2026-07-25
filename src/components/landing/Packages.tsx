import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOOKING_URL, packages } from "@/lib/ridecheck";

export function Packages() {
  return (
    <section id="packages" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <p className="label-caps text-signal">Packages</p>
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Options to suit your needs</h2>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Both packages include an instant digital report so you can review the
        car's condition and decide with confidence.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`relative flex flex-col rounded-lg border bg-card p-6 sm:p-8 ${
              pkg.popular ? "border-signal shadow-lg" : "border-border"
            }`}
          >
            {pkg.popular && (
              <span className="label-caps absolute -top-3 left-6 rounded-sm bg-signal px-3 py-1 text-signal-foreground">
                Most popular
              </span>
            )}
            <h3 className="text-xl font-bold">{pkg.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{pkg.blurb}</p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-5xl font-extrabold tracking-tight">
                ${pkg.price}
              </span>
              <span className="text-sm text-muted-foreground">{pkg.duration}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              or 4 payments of ${(pkg.price / 4).toFixed(2)} with Afterpay or Zip
            </p>

            <ul className="mt-6 flex-1 space-y-3 border-t border-border pt-6">
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
              variant={pkg.popular ? "default" : "outline"}
              className="mt-8 h-12 w-full text-base font-semibold"
            >
              <a href={BOOKING_URL} target="_blank" rel="noopener">
                Book Now
              </a>
            </Button>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        Travel surcharges may apply for vehicles outside our standard service
        suburbs. Any surcharge is confirmed with you before the inspection.
      </p>
    </section>
  );
}
