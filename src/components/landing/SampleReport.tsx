import { ArrowRight, CalendarCheck, ExternalLink, ShieldCheck, UserCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SAMPLE_REPORT_URL } from "@/lib/ridecheck";
import logoAsset from "@/assets/ridecheck-logo.png.asset.json";

const bullets = [
  {
    icon: CalendarCheck,
    title: "Book your inspection",
    body: "Easy online booking. We come to the car.",
  },
  {
    icon: UserCheck,
    title: "Qualified local mechanic",
    body: "Experienced, licensed and insured.",
  },
  {
    icon: ShieldCheck,
    title: "100% Independent",
    body: "No dealer affiliations, no referral fees. The report says what the car is.",
  },
];

type Gauge = { label: string; value: number; display?: string };

const gauges: Gauge[] = [
  { label: "Exterior", value: 92, display: "Excellent" },
  { label: "Interior", value: 88, display: "Good" },
  { label: "Mechanical", value: 90, display: "Good" },
  { label: "Wheels / Tyres", value: 84, display: "Good" },
  { label: "Road Test", value: 92, display: "Excellent" },
  { label: "History Check", value: 100, display: "Clear" },
];

function GaugeRing({ gauge }: { gauge: Gauge }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - gauge.value / 100);
  const tone = gauge.value >= 90 ? "text-emerald-500" : "text-lime-500";
  return (
    <div className="flex flex-col items-center gap-1">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
        {gauge.label}
      </p>
      <div className="relative h-16 w-16">
        <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
          <circle
            cx="32"
            cy="32"
            r={r}
            fill="none"
            strokeWidth="6"
            className="stroke-neutral-200"
          />
          <circle
            cx="32"
            cy="32"
            r={r}
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            className={`stroke-current ${tone}`}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-ink">
          {gauge.value === 100 && gauge.label === "History Check" ? "100%" : `${gauge.value}%`}
        </span>
      </div>
      <p className={`text-[10px] font-semibold ${tone}`}>{gauge.display}</p>
    </div>
  );
}

export function SampleReport() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl lg:grid-cols-2">
        {/* Left — dark panel */}
        <div className="bg-ink p-8 text-ink-foreground sm:p-12">
          <span className="inline-block rounded-full border border-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white/80">
            Our Service
          </span>
          <h2 className="mt-6 font-display text-3xl font-bold leading-tight sm:text-4xl">
            From inspection to insights, all in one{" "}
            <span className="text-signal">RideCheck report</span>
          </h2>
          <p className="mt-4 max-w-md text-sm text-white/60 sm:text-base">
            We inspect the car on site and deliver a clear, same-day report so
            you can buy with confidence.
          </p>

          <ul className="mt-8 space-y-5">
            {bullets.map((b) => (
              <li key={b.title} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20">
                  <b.icon className="h-5 w-5 text-signal" />
                </span>
                <div>
                  <p className="font-semibold">{b.title}</p>
                  <p className="text-sm text-white/60">{b.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={SAMPLE_REPORT_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold transition hover:border-white/60"
            >
              View Sample Report
              <ExternalLink className="h-4 w-4" />
            </a>
            <Link
              to="/book"
              className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 text-sm font-semibold text-signal-foreground transition hover:brightness-110"
            >
              Book Inspection Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Right — red panel with phone mockup */}
        <div className="flex items-center justify-center bg-signal p-8 sm:p-12">
          <div className="w-full max-w-[300px] rounded-[2.5rem] border-4 border-ink/80 bg-white p-3 shadow-2xl">
            {/* status bar */}
            <div className="flex items-center justify-between px-3 pt-1 text-[10px] font-semibold text-ink">
              <span>9:41</span>
              <span className="h-4 w-16 rounded-full bg-ink" />
              <span className="text-[9px]">5G</span>
            </div>
            {/* app header */}
            <div className="mt-2 flex items-center justify-between px-1">
              <img src={logoAsset.url} alt="RideCheck" className="h-4" />
              <span className="text-xs text-neutral-400">≡</span>
            </div>
            {/* vehicle */}
            <div className="mt-3 rounded-xl bg-haze p-3">
              <p className="text-xs font-bold text-ink">2021 BMW 330i</p>
              <p className="text-[10px] text-neutral-500">Inspection Report</p>
              <span className="mt-1 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
                Overall: Good
              </span>
            </div>
            {/* gauges */}
            <div className="mt-4 grid grid-cols-2 gap-x-2 gap-y-4 px-1">
              {gauges.map((g) => (
                <GaugeRing key={g.label} gauge={g} />
              ))}
            </div>
            {/* footer line */}
            <div className="mt-4 flex items-start gap-1.5 rounded-lg bg-emerald-50 p-2">
              <ShieldCheck className="mt-0.5 h-3 w-3 shrink-0 text-emerald-600" />
              <p className="text-[9px] leading-snug text-neutral-600">
                No prior write-off history or finance owing — PPSR / Equifax
                checked
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
