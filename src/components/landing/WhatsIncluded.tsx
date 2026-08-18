import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BatteryCharging,
  Camera,
  Car,
  Check,
  ClipboardList,
  Cog,
  ExternalLink,
  FileText,
  Gauge,
  Plug,
  ShieldCheck,
  Disc3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SAMPLE_REPORT_URL, type InspectionCategory } from "@/lib/ridecheck";

const iconMap = {
  engine: Cog,
  wheels: Disc3,
  body: Car,
  diagnostics: Gauge,
  road: ClipboardList,
  history: FileText,
  battery: BatteryCharging,
  charging: Plug,
} as const;

type Props = {
  categories: InspectionCategory[];
  image: string;
  imageAlt: string;
  eyebrow?: string;
  heading: React.ReactNode;
  intro: string;
  pointsLabel?: string;
  bookSearch?: Record<string, string>;
};

export function WhatsIncluded({
  categories,
  image,
  imageAlt,
  eyebrow = "What's included",
  heading,
  intro,
  pointsLabel = "100+ inspection points.",
  bookSearch,
}: Props) {
  const [active, setActive] = useState(0);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number) => {
    setActive(i);
    cardRefs.current[i]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };
  const current = categories[active];

  return (
    <section className="bg-haze">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest text-signal">
              {eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              {heading}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {intro}
            </p>
          </div>
          <a
            href={SAMPLE_REPORT_URL}
            target="_blank"
            rel="noopener"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-signal px-5 py-2.5 text-sm font-semibold text-signal transition-colors hover:bg-signal hover:text-signal-foreground"
          >
            View sample report
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        </div>

        {/* Category selector: slider on mobile, grid on desktop */}
        <div
          role="tablist"
          aria-label="Inspection categories"
          className="mt-10 -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 lg:grid lg:grid-cols-3 lg:overflow-visible"
        >
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon];
            const isActive = i === active;
            return (
              <button
                key={cat.name}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                role="tab"
                aria-selected={isActive}
                onClick={() => select(i)}
                className={`flex min-h-[78px] w-[78%] shrink-0 snap-start items-center gap-3 rounded-xl border bg-card p-4 text-left transition-colors sm:w-[46%] lg:w-auto ${
                  isActive
                    ? "border-signal shadow-soft"
                    : "border-border hover:border-signal/40"
                }`}
              >
                <Icon
                  className={`h-5 w-5 shrink-0 ${isActive ? "text-signal" : "text-muted-foreground"}`}
                  aria-hidden
                />
                <span className="min-w-0">
                  <span
                    className={`block text-sm font-bold leading-tight ${
                      isActive ? "text-signal" : "text-ink"
                    }`}
                  >
                    {cat.name}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {cat.points.length}+ points
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Dots (mobile / tablet) */}
        <div className="mt-4 flex justify-center gap-2 lg:hidden">
          {categories.map((cat, i) => (
            <button
              key={cat.name}
              aria-label={cat.name}
              onClick={() => select(i)}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-6 bg-signal" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>


        {/* Panel */}
        <div className="mt-5 grid gap-8 rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center">
          <div className="min-w-0">
            <h3 className="text-xl font-extrabold text-ink sm:text-2xl">{current.name}</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              {current.blurb}
            </p>
            <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {current.points.map((point) => (
                <li key={point} className="flex gap-2.5 text-sm text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            className="h-auto w-full object-contain"
          />
        </div>

        {/* Stat strip */}
        <div className="mt-5 grid gap-5 rounded-2xl border border-border bg-card p-6 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
          {[
            { Icon: ShieldCheck, title: pointsLabel, body: "One complete report. No guesswork." },
            { Icon: Camera, title: "90+ photos and video", body: "See everything we see." },
            { Icon: FileText, title: "Detailed written report", body: "Clear findings and next steps." },
            { Icon: Check, title: "Same-day delivery", body: "Straight to your inbox." },
          ].map((s) => (
            <div key={s.title} className="flex min-w-0 gap-3">
              <s.Icon className="mt-0.5 h-5 w-5 shrink-0 text-signal" aria-hidden />
              <div className="min-w-0">
                <p className="text-sm font-bold text-ink">{s.title}</p>
                <p className="text-xs text-muted-foreground">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button asChild size="lg" className="h-12 rounded-md px-8 text-base font-semibold">
            <Link to="/book" search={bookSearch ?? {}}>
              Book your inspection
              <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
