import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BatteryCharging,
  Camera,
  Car,
  Check,
  ChevronDown,
  ClipboardList,

  Cog,
  ExternalLink,
  FileText,
  Gauge,
  MousePointerClick,
  Plug,
  Plus,
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

/** Highlight regions as % of the diagram box. `history` has no on-car region. */
const regionMap: Record<string, { x: number; y: number; rx: number; ry: number } | undefined> = {
  engine: { x: 26, y: 45, rx: 15, ry: 14 },
  wheels: { x: 35, y: 68, rx: 12, ry: 11 },
  body: { x: 78, y: 40, rx: 16, ry: 14 },
  diagnostics: { x: 52, y: 29, rx: 13, ry: 10 },
  road: { x: 87, y: 60, rx: 11, ry: 11 },
  battery: { x: 40, y: 55, rx: 16, ry: 12 },
  charging: { x: 80, y: 52, rx: 12, ry: 11 },
  history: undefined,
};

/** Report-style visual for off-vehicle checks (History & Documentation). */
function DocVisual() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border bg-haze p-6">
      <div className="relative h-[168px] w-[132px] rounded-lg border border-border bg-card p-3 shadow-soft">
        <div className="h-1.5 w-full rounded-full bg-signal" />
        <div className="mt-5 space-y-2.5">
          {[100, 80, 92, 65, 88, 55].map((w, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full bg-border"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {["VIN", "PPSR", "Odometer", "Finance", "Written-off"].map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-bold text-ink"
          >
            <Check className="h-3 w-3 text-signal" aria-hidden />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}


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
  const [expanded, setExpanded] = useState(false);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number) => {
    setActive(i);
    setExpanded(false);
    cardRefs.current[i]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };
  const current = categories[active];
  const isHistory = !regionMap[current.icon];


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
                className={`flex w-[168px] shrink-0 snap-start flex-col items-start gap-2 rounded-xl border bg-card p-4 text-left transition-colors lg:min-h-[78px] lg:w-auto lg:flex-row lg:items-center lg:gap-3 ${
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
        <div className="mt-5 flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-9 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-x-8 lg:gap-y-0 lg:items-start">
          {/* Header */}
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <h3 className="text-xl font-extrabold text-ink sm:text-2xl">{current.name}</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              {current.blurb}
            </p>
          </div>

          {/* Visual */}
          <div className="relative min-w-0 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center">
            {isHistory ? (
              <DocVisual />
            ) : (
              <div className="relative">
                {/* Soft red wash behind the car */}
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden
                  className="pointer-events-none absolute inset-0 h-full w-full [filter:blur(14px)]"
                >
                  {categories.map((cat, i) => {
                    const r = regionMap[cat.icon];
                    if (!r) return null;
                    return (
                      <ellipse
                        key={cat.name}
                        cx={r.x}
                        cy={r.y}
                        rx={r.rx}
                        ry={r.ry}
                        fillOpacity={0.22}
                        className="fill-signal transition-opacity duration-500 motion-reduce:transition-none"
                        style={{ opacity: i === active ? 1 : 0 }}
                      />
                    );
                  })}
                </svg>

                <img
                  src={image}
                  alt={imageAlt}
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="relative h-auto w-full object-contain"
                />

                {/* Active area: brightened, punchier copy of the photo */}
                {categories.map((cat, i) => {
                  const r = regionMap[cat.icon];
                  if (!r) return null;
                  const mask = `radial-gradient(ellipse ${r.rx * 1.4}% ${r.ry * 1.4}% at ${r.x}% ${r.y}%, #000 40%, rgba(0,0,0,0.5) 65%, transparent 80%)`;
                  return (
                    <img
                      key={cat.name}
                      src={image}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      className="pointer-events-none absolute inset-0 h-full w-full object-contain transition-opacity duration-500 motion-reduce:transition-none [filter:brightness(1.18)_saturate(1.5)_contrast(1.1)]"
                      style={{
                        opacity: i === active ? 1 : 0,
                        maskImage: mask,
                        WebkitMaskImage: mask,
                      }}
                    />
                  );
                })}

                {/* Hotspots — only the active one on mobile */}
                {categories.map((cat, i) => {
                  const r = regionMap[cat.icon];
                  if (!r) return null;
                  const isActive = i === active;
                  const Icon = iconMap[cat.icon];
                  return (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => select(i)}
                      aria-label={`Show ${cat.name} checks`}
                      style={{ left: `${r.x}%`, top: `${r.y}%` }}
                      className={`absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border bg-card transition-all duration-300 motion-reduce:transition-none ${
                        isActive
                          ? "z-10 h-8 w-8 border-signal text-signal shadow-soft sm:h-10 sm:w-10 lg:h-11 lg:w-11"
                          : "h-5 w-5 border-border text-muted-foreground shadow-sm hover:border-signal/60 hover:text-signal sm:h-6 sm:w-6 lg:h-7 lg:w-7"
                      }`}
                    >
                      {isActive ? (
                        <Icon className="h-4 w-4 animate-scale-in sm:h-5 sm:w-5" aria-hidden />
                      ) : (
                        <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden />
                      )}

                    </button>
                  );
                })}

                {/* Label chip near the active hotspot */}
                {regionMap[current.icon] && (
                  <span
                    key={current.name}
                    style={{
                      left: `${regionMap[current.icon]!.x}%`,
                      top: `${regionMap[current.icon]!.y}%`,
                    }}
                    className="pointer-events-none absolute z-10 -translate-x-1/2 translate-y-6 animate-fade-in whitespace-nowrap rounded-full border border-signal/30 bg-card px-3 py-1 text-[11px] font-bold text-signal shadow-soft"
                  >
                    {current.name}
                  </span>
                )}
              </div>
            )}

            <div className="mt-4 flex items-start justify-center gap-2 text-center text-xs leading-snug text-muted-foreground">
              {isHistory ? (
                <>
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden />
                  <span>Checked off-vehicle against national records.</span>
                </>
              ) : (
                <>
                  <MousePointerClick className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden />
                  <span>
                    <span className="lg:hidden">Tap</span>
                    <span className="hidden lg:inline">Click</span> a hotspot to see what we
                    check
                    <br className="hidden sm:block" /> in each area.
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Checklist */}
          <div className="min-w-0 lg:col-start-1 lg:row-start-2 lg:mt-6">
            <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {current.points.map((point, i) => (
                <li
                  key={point}
                  className={`gap-2.5 text-sm text-foreground ${
                    !expanded && i >= 5 ? "hidden lg:flex" : "flex"
                  }`}
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            {current.points.length > 5 && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-haze py-2.5 text-xs font-bold text-ink transition-colors hover:border-signal/40 lg:hidden"
              >
                {expanded ? "Show fewer points" : `Show all ${current.points.length} points`}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>
            )}
          </div>
        </div>


        {/* Stat strip */}
        <div className="mt-5 grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft sm:gap-5 sm:p-6 lg:grid-cols-4">
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
