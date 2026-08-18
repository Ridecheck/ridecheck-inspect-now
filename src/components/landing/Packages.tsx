import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { PackageCards } from "@/components/landing/PackageCards";
import { packages } from "@/lib/ridecheck";

export function Packages() {
  return (
    <section id="packages" className="bg-haze">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
            Choose your <span className="text-signal">inspection</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Both packages include an instant digital report so you can review the
            car&rsquo;s condition and decide with confidence.
          </p>
        </div>

        <div className="mt-12">
          <PackageCards packages={packages} />
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/ev-inspections"
            className="inline-flex items-center gap-2 text-sm font-bold text-signal underline underline-offset-4 hover:opacity-80 sm:text-base"
          >
            Buying a used EV or plug-in hybrid? View EV packages
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Standard and Premium cover petrol, diesel and conventional hybrids. Travel
          surcharges may apply for vehicles outside our standard service
          suburbs. Any surcharge is confirmed with you before the inspection.
        </p>
      </div>
    </section>
  );
}
