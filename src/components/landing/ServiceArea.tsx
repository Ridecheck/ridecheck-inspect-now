import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MapPin } from "lucide-react";
import { serviceAreas } from "@/lib/ridecheck";

const AUS_PATH =
  "M432 58 L470 92 L486 132 L500 178 L512 226 L520 274 L512 316 L498 356 L486 396 L466 424 L436 446 L400 452 L364 442 L330 436 L296 442 L258 446 L216 440 L176 424 L142 400 L118 366 L106 322 L102 274 L108 226 L124 182 L146 146 L176 118 L214 96 L256 80 L300 66 L346 56 L390 52 Z";

const cities = [
  { name: "Melbourne", x: 430, y: 424, live: true },
  { name: "Sydney", x: 490, y: 356, live: true },
  { name: "Adelaide", x: 366, y: 404, live: false },
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
                  <ellipse cx="470" cy="486" rx="26" ry="20" />
                </clipPath>
              </defs>

              <g clipPath="url(#rc-aus)">
                <rect x="0" y="0" width="620" height="520" fill="url(#rc-dots)" />
              </g>

              {cities.map((c) => (
                <g key={c.name}>
                  {c.live && (
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r="20"
                      className="fill-signal/15"
                    />
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
