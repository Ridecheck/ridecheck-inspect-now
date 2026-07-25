import { ArrowRight, ExternalLink, Star, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-inspection-light.png";
import { BOOKING_URL, GOOGLE_REVIEWS_URL, SAMPLE_REPORT_URL } from "@/lib/ridecheck";

export function Hero() {
  return (
    <section className="overflow-hidden bg-background">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold text-ink">
            <ShieldCheck className="h-4 w-4 text-signal" aria-hidden />
            No dealer associations, ever
          </span>

          <h1 className="mt-5 text-[2.35rem] font-extrabold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            Mobile Pre-Purchase Car Inspections
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            We come to the car, inspect it on site, and deliver a same-day
            detailed report with 90+ photos, video and a free PPSR check.
          </p>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Melbourne and Sydney. Adelaide coming soon.
          </p>

          <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="h-13 w-full rounded-full px-8 text-base font-semibold shadow-soft sm:w-auto"
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
              className="inline-flex items-center gap-2 text-base font-semibold text-ink underline-offset-4 hover:underline"
            >
              View sample report
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </div>
          <p className="mt-3 text-sm italic text-muted-foreground">
            Full payment at booking. Instant confirmation.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-3 rounded-xl border border-border border-l-4 border-l-signal bg-card px-4 py-3 shadow-soft transition-colors hover:bg-secondary"
            >
              <div>
                <div className="flex" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-signal text-signal" />
                  ))}
                </div>
                <p className="mt-1 text-sm font-bold text-ink">
                  Rated 5.0 on Google
                </p>
                <p className="text-xs text-muted-foreground">130+ reviews</p>
              </div>
            </a>

            <div className="flex items-center gap-3 rounded-xl border border-border border-l-4 border-l-ink bg-card px-4 py-3 shadow-soft">
              <div>
                <ShieldCheck className="h-5 w-5 text-ink" aria-hidden />
                <p className="mt-1 text-sm font-bold text-ink">
                  Fully independent
                </p>
                <p className="text-xs text-muted-foreground">
                  No referral fees, no dealer ties
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-x-6 top-10 -z-10 h-3/4 rounded-3xl bg-haze" />
          <img
            src={heroImage}
            alt="Silver SUV being examined for damage during a RideCheck mobile pre-purchase inspection"
            width={1200}
            height={912}
            className="w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
