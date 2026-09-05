import { ArrowRight, ExternalLink, Star, ShieldCheck, Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import heroCar from "@/assets/hero-inspection-diagram.png.asset.json";
import { GOOGLE_REVIEWS_URL, SAMPLE_REPORT_URL } from "@/lib/ridecheck";

const bullets = [
  "Same-day detailed report",
  "35+ detailed photos providing 360° coverage of the vehicle",
  "Free PPSR history check",
  "We come to the car",
];

export function Hero({ city }: { city?: "sydney" }) {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Car image — full bleed on the right */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[54%] items-center lg:flex xl:w-[56%]">
        <img
          src={heroCar.url}
          alt="Red BMW M3 sedan with RideCheck inspection damage callouts"
          width={1408}
          height={1008}
          className="h-auto max-h-full w-full object-contain object-right"
        />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-6 sm:px-8 sm:pb-20 lg:pb-24">
        {/* Google review badge — sized up for mobile */}
        <div className="flex justify-center sm:justify-end">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-soft transition-colors hover:bg-secondary sm:w-auto sm:py-2"
          >
            <span className="font-display text-xl font-extrabold text-ink sm:text-lg">G</span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold text-ink sm:text-sm">5.0</span>
                <span className="flex" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-signal text-signal sm:h-3.5 sm:w-3.5" />
                  ))}
                </span>
              </div>
              <p className="text-sm text-muted-foreground sm:text-xs">350+ Google reviews</p>
            </div>
          </a>
        </div>

        <div className="mt-8 max-w-xl lg:max-w-[46%]">
          <h1 className="mt-5 text-[2.35rem] font-extrabold leading-[1.05] text-signal sm:text-5xl lg:text-6xl">
            {city === "sydney" ? (
              <>
                Mobile Pre-Purchase <span className="text-ink">Car Inspections</span>{" "}
                <span className="text-ink">in Sydney</span>
              </>
            ) : (
              <>
                Mobile Pre-Purchase <span className="text-ink">Car Inspections</span>
              </>
            )}
          </h1>

          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            We come to the car, inspect it on site, and deliver a same-day
            detailed report with 35+ detailed photos providing 360° coverage of the vehicle and a free PPSR check.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {city === "sydney"
              ? "Across Greater Sydney — Northern Beaches to the Illawarra."
              : "Melbourne and Sydney. Adelaide coming soon."}
          </p>

          <p className="mt-5 font-display text-lg font-bold text-ink">
            Starting from just <span className="text-signal">$299</span>
          </p>

          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {bullets.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <Check className="h-4 w-4 shrink-0 text-signal" aria-hidden />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="h-13 w-full rounded-md px-8 text-base font-semibold shadow-soft sm:w-auto"
            >
              <Link to="/book">
                Book Inspection
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <a
              href={SAMPLE_REPORT_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-base font-semibold text-ink underline-offset-4 hover:text-signal hover:underline"
            >
              View sample report
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </div>
          <p className="mt-3 text-sm italic text-muted-foreground">
            Full payment at booking. Instant confirmation.
          </p>
        </div>

        {/* Mobile car image */}
        <div className="mt-10 overflow-hidden rounded-2xl lg:hidden">
          <img
            src={heroCar.url}
            alt="Red BMW M3 sedan with RideCheck inspection damage callouts"
            width={1408}
            height={1008}
            className="h-56 w-full object-cover sm:h-72"
          />
        </div>

        {/* Testimonial card over the image */}
        <div className="mt-6 max-w-sm rounded-xl bg-ink p-5 shadow-lift lg:absolute lg:bottom-6 lg:right-8 lg:mt-0">
          <div className="flex" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-signal text-signal" />
            ))}
          </div>
          <blockquote className="mt-3 text-sm font-semibold leading-relaxed text-ink-foreground">
            "Saved me from buying a written-off vehicle."
          </blockquote>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-foreground/70">
            Recent customer
            <ShieldCheck className="h-3.5 w-3.5 text-signal" aria-hidden />
          </p>
        </div>
      </div>
    </section>
  );
}
