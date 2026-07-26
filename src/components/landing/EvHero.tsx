import { ArrowRight, ExternalLink, Star, ShieldCheck, Check, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import evCar from "@/assets/ev-inspection-diagram.png.asset.json";
import { GOOGLE_REVIEWS_URL, SAMPLE_REPORT_URL } from "@/lib/ridecheck";

const bullets = [
  "Certified Aviloo battery test",
  "Battery State of Health report",
  "High-voltage and charging checks",
  "We come to the car",
];

export function EvHero() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* EV diagram — full bleed on the right */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[54%] items-center lg:flex xl:w-[56%]">
        <img
          src={evCar.url}
          alt="White electric sedan with RideCheck EV battery and high-voltage inspection callouts"
          width={1327}
          height={1191}
          className="h-auto max-h-full w-full object-contain object-right"
        />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-6 sm:px-8 sm:pb-20 lg:pb-24">
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
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground">
            <Zap className="h-3.5 w-3.5 text-signal" aria-hidden />
            Aviloo certified
          </span>

          <h1 className="mt-5 text-[2.35rem] font-extrabold leading-[1.05] text-signal sm:text-5xl lg:text-6xl">
            Used EV <span className="text-ink">Pre-Purchase Inspections</span>
          </h1>

          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            We come to the car, run a full pre-purchase inspection and test the
            battery&rsquo;s real State of Health with Aviloo &mdash; not the dashboard
            estimate.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Melbourne and Sydney. Adelaide coming soon.
          </p>

          <p className="mt-5 font-display text-lg font-bold text-ink">
            EV inspections from <span className="text-signal">$250</span>
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
              <Link to="/book" search={{ type: "ev" }}>
                Book EV Inspection
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

        {/* Mobile EV image */}
        <div className="mt-10 overflow-hidden rounded-2xl lg:hidden">
          <img
            src={evCar.url}
            alt="White electric sedan with RideCheck EV battery and high-voltage inspection callouts"
            width={1327}
            height={1191}
            className="h-auto w-full object-contain"
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
            "The battery report knocked $4k off the asking price."
          </blockquote>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-foreground/70">
            Recent EV customer
            <ShieldCheck className="h-3.5 w-3.5 text-signal" aria-hidden />
          </p>
        </div>
      </div>
    </section>
  );
}
