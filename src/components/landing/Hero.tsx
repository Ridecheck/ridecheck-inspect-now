import { Star, ShieldCheck, Clock, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-inspection.jpg";
import { BOOKING_URL, SAMPLE_REPORT_URL } from "@/lib/ridecheck";

const badges = [
  { icon: Star, label: "5.0 Google rating", sub: "130+ reviews" },
  { icon: ShieldCheck, label: "No dealer associations", sub: "Fully independent" },
  { icon: Clock, label: "48-hour turnaround", sub: "Guaranteed" },
  { icon: Camera, label: "90+ photos and video", sub: "Every report" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="RideCheck inspector examining the front wheel arch of a silver used sedan in a suburban driveway"
          width={1408}
          height={1008}
          className="h-full w-full object-cover object-[70%_center] opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-12 sm:px-8 sm:pb-20 sm:pt-20">
        <p className="label-caps text-signal">Mobile pre-purchase inspections</p>
        <h1 className="mt-4 max-w-3xl text-[2.1rem] font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
          Pre-Purchase Car Inspection in Melbourne &amp; Sydney
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-foreground/80 sm:text-lg">
          We come to the car and inspect it on site. You get a same-day detailed
          report with 90+ photos and video, plus a free PPSR check — and a call
          from the mechanic who did the work.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-13 w-full px-8 text-base font-semibold sm:w-auto"
          >
            <a href={BOOKING_URL} target="_blank" rel="noopener">
              Book &amp; Pay Online
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-13 w-full border-ink-foreground/30 bg-transparent px-8 text-base text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground sm:w-auto"
          >
            <a href={SAMPLE_REPORT_URL} target="_blank" rel="noopener">
              View sample report
            </a>
          </Button>
        </div>
        <p className="mt-3 text-sm text-ink-foreground/60">
          Full payment at booking. Instant confirmation.
        </p>

        <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-ink-foreground/15 bg-ink-foreground/15 lg:grid-cols-4">
          {badges.map(({ icon: Icon, label, sub }) => (
            <li key={label} className="bg-ink px-4 py-4">
              <Icon className="h-4 w-4 text-signal" aria-hidden />
              <p className="mt-2 text-sm font-semibold leading-tight">{label}</p>
              <p className="text-xs text-ink-foreground/55">{sub}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
