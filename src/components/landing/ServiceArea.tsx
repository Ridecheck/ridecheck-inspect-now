import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MapPin } from "lucide-react";
import { serviceAreas } from "@/lib/ridecheck";

const AUS_PATH =
  "M140 150 L170 112 L215 88 L260 74 L292 66 L300 96 L316 120 L336 132 L352 108 L372 70 L392 52 L402 84 L414 130 L440 168 L470 212 L494 258 L506 296 L498 332 L486 362 L470 392 L448 416 L430 438 L404 424 L376 412 L344 420 L306 430 L262 424 L214 428 L166 414 L132 392 L114 356 L106 312 L108 268 L118 220 L128 182 Z";

const cities = [
  { name: "Melbourne", x: 432, y: 428, live: true },
  { name: "Sydney", x: 480, y: 360, live: true },
  { name: "Adelaide", x: 372, y: 404, live: false },
];

export function ServiceArea() {
  return (
    <section id="locations" className="bg-haze">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-signal">
          Service area
        </p>
        <h2 className="mt-2 text-center text-2xl font-extrabold text-ink sm:text-4xl">
          Our coverage across Australia
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground">
          We are mobile. We come to the seller, the dealer or the driveway —
          across Melbourne and Sydney, with Adelaide next.
        </p>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
          {/* Map */}
          <div className="rounded-3xl border border-border bg-card p-4 shadow-soft sm:p-6">
            <svg
              viewBox="0 0 620 520"
              role="img"
              aria-label="Map of Australia with Melbourne and Sydney highlighted"
              className="w-full"
            >
              <defs>
                <pattern
                  id="rc-dots"
                  width="11"
                  height="11"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2.4" cy="2.4" r="2.1" className="fill-muted-foreground/30" />
                </pattern>
                <clipPath id="rc-aus">
                  <path d={AUS_PATH} />
                  <ellipse cx="452" cy="470" rx="22" ry="17" />
                </clipPath>
              </defs>

              <g clipPath="url(#rc-aus)">
                <rect x="0" y="0" width="620" height="520" fill="url(#rc-dots)" />
              </g>

              {cities.map((c) => (
                <g key={c.name}>
                  {c.live && (
                    <>
                      <circle
                        cx={c.x}
                        cy={c.y}
                        r="20"
                        className="fill-signal/15"
                      />
                      <circle
                        cx={c.x}
                        cy={c.y}
                        r="20"
                        className="fill-signal/25 animate-ring-pulse"
                        style={{ transformOrigin: "center" }}
                      />
                    </>
                  )}
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r={c.live ? 8 : 6}
                    className={c.live ? "fill-signal" : "fill-muted-foreground/60"}
                  />
                  <text
                    x={c.x + 16}
                    y={c.y + 5}
                    className={`text-[15px] font-bold ${
                      c.live ? "fill-ink" : "fill-muted-foreground"
                    }`}
                  >
                    {c.name}
                  </text>
                </g>
              ))}
            </svg>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-signal" aria-hidden />
                Inspecting now
              </span>
              <span className="inline-flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full bg-muted-foreground/60"
                  aria-hidden
                />
                Coming soon
              </span>
            </div>
          </div>

          {/* States */}
          <Accordion type="single" collapsible className="space-y-3">
            {serviceAreas.map((area) => (
              <AccordionItem
                key={area.state}
                value={area.state}
                className="rounded-2xl border border-border bg-card px-5 shadow-soft"
              >
                <AccordionTrigger className="py-4 text-left hover:no-underline">
                  <span className="flex min-w-0 items-center gap-3">
                    <MapPin
                      className={`h-4 w-4 shrink-0 ${
                        area.status === "live" ? "text-signal" : "text-muted-foreground"
                      }`}
                      aria-hidden
                    />
                    <span className="truncate text-base font-bold text-ink">
                      {area.state}
                    </span>
                    {area.status === "soon" && (
                      <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Soon
                      </span>
                    )}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <p className="text-sm text-muted-foreground">{area.blurb}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {area.suburbs.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-ink"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
