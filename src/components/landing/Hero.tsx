import { ArrowRight, ExternalLink, Star, ShieldCheck, Check, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroCar from "@/assets/hero-red-car.jpg";
import { BOOKING_URL, GOOGLE_REVIEWS_URL, SAMPLE_REPORT_URL } from "@/lib/ridecheck";

const bullets = [
  "Same-day detailed report",
  "90+ photos and video",
  "Free PPSR history check",
  "We come to the car",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Car image — full bleed on the right */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] lg:block">
        <img
          src={heroCar}
          alt="Red sedan inspected by RideCheck against a city skyline"
          width={1408}
          height={1008}
          className="h-full w-full object-cover object-left"
        />
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-6 sm:px-8 sm:pb-20 lg:pb-24">
        {/* Top widget row */}
        <div className="flex flex-wrap items-center justify-end gap-3">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener"
            className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-2 shadow-soft transition-colors hover:bg-secondary"
          >
            <span className="font-display text-lg font-extrabold text-ink">G</span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-ink">5.0</span>
                <span className="flex" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-signal text-signal" />
                  ))}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">130+ Google reviews</p>
            </div>
          </a>

          <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-2 shadow-soft">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent">
              <Users className="h-4 w-4 text-signal" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-bold text-ink">Trusted by 500+</p>
              <p className="text-xs text-muted-foreground">Melbourne &amp; Sydney buyers</p>
            </div>
          </div>
        </div>

        <div className="mt-8 max-w-xl lg:max-w-[46%]">
          <span className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground">
            <ShieldCheck className="h-4 w-4 text-signal" aria-hidden />
            No dealer associations, ever
          </span>

          <h1 className="mt-5 text-[2.35rem] font-extrabold leading-[1.05] text-signal sm:text-5xl lg:text-6xl">
            Mobile Pre-Purchase <span className="text-ink">Car Inspections</span>
          </h1>

          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            We come to the car, inspect it on site, and deliver a same-day
            detailed report with 90+ photos, video and a free PPSR check.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Melbourne and Sydney. Adelaide coming soon.
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
              <a href={BOOKING_URL} target="_blank" rel="noopener">
                Book &amp; Pay Online
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
              </a>
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
            src={heroCar}
            alt="Red sedan inspected by RideCheck against a city skyline"
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
