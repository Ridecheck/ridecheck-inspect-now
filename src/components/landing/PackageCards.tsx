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
          className={`relative flex flex-col rounded-2xl p-6 sm:p-8 ${
            pkg.popular
              ? "border border-signal bg-signal/[0.04] shadow-soft"
              : "border border-border bg-card"
          }`}
        >
          {pkg.badge && (
            <span className="mb-4 inline-flex w-fit rounded-full bg-signal px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-signal-foreground">
              {pkg.badge}
            </span>
          )}

          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-extrabold leading-tight text-ink sm:text-2xl">
                {pkg.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{pkg.duration}</p>
            </div>
            <span className="font-display text-3xl font-extrabold tracking-tight text-signal sm:text-4xl">
              ${pkg.price}
            </span>
          </div>

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
