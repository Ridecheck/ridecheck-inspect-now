import { Check, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import type { Pkg } from "@/lib/ridecheck";

type Props = {
  packages: Pkg[];
  /** Adds ?type=ev to the booking link */
  ev?: boolean;
  ctaLabel?: string;
};

export function PackageCards({ packages, ev, ctaLabel = "Book inspection" }: Props) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {packages.map((pkg) => (
        <div
          key={pkg.name}
          className={`relative mt-4 flex flex-col rounded-2xl p-6 pt-9 sm:p-8 sm:pt-10 ${
            pkg.popular
              ? "border-2 border-signal bg-card shadow-soft"
              : "border border-border bg-card"
          }`}
        >
          {pkg.badge && (
            <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 whitespace-nowrap rounded-full bg-signal px-4 py-1.5 text-xs font-bold text-signal-foreground">
              {pkg.badge}
            </span>
          )}

          <div className="text-center">
            <h3 className="font-display text-xl font-extrabold leading-tight text-signal sm:text-2xl">
              {pkg.name}
            </h3>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {pkg.blurb}
            </p>

            <div className="mt-6 inline-flex items-baseline gap-2 rounded-full bg-signal px-7 py-3 text-signal-foreground">
              <span className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                ${pkg.price}
              </span>
              <span className="text-sm font-medium opacity-90">{pkg.duration}</span>
            </div>

            <p className="mt-3 text-sm text-muted-foreground">
              or 4 payments of ${(pkg.price / 4).toFixed(2)} with Afterpay or Zip
            </p>
          </div>

          <div className="mt-6 border-t border-border" />


          <ul className="mt-6 flex-1 space-y-3">
            {pkg.inclusions.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/80">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
            {pkg.excluded?.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
              >
                <X className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <span className="line-through">{item}</span>
              </li>
            ))}
          </ul>

          <Button
            asChild
            size="lg"
            className={`mt-7 h-12 w-full rounded-full text-base font-semibold ${
              pkg.popular
                ? ""
                : "bg-ink text-ink-foreground hover:bg-ink/90"
            }`}
          >
            <Link
              to="/book"
              search={ev ? { type: "ev", pkg: pkg.name } : { pkg: pkg.name }}
            >
              {ctaLabel}
            </Link>
          </Button>
        </div>
      ))}
    </div>
  );
}
