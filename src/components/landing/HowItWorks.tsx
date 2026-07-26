import { useEffect, useRef, useState } from "react";
import { ArrowRight, Camera } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { steps } from "@/lib/ridecheck";

type Tile = {
  caption: string;
  /** Drop a photo URL here when the shot is ready. */
  src?: string;
  /** Tailwind aspect ratio class so the mosaic stays uneven. */
  ratio: string;
};

const columns: Tile[][] = [
  [
    { caption: "Engine bay", ratio: "aspect-[4/5]" },
    { caption: "Undercarriage", ratio: "aspect-square" },
    { caption: "Tyres and brakes", ratio: "aspect-[4/5]" },
  ],
  [
    { caption: "Diagnostic scan", ratio: "aspect-square" },
    { caption: "Paint depth reading", ratio: "aspect-[4/5]" },
    { caption: "Interior check", ratio: "aspect-square" },
  ],
  [
    { caption: "Panel and body", ratio: "aspect-[4/5]" },
    { caption: "Road test", ratio: "aspect-square" },
    { caption: "Report handover", ratio: "aspect-[4/5]" },
  ],
];

/** Column drift in px across the full scroll pass. Middle column moves the other way. */
const drift = [-70, 55, -45];

function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0.5);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const raw = (window.innerHeight - rect.top) / total;
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);

  return progress;
}

function PhotoTile({ tile }: { tile: Tile }) {
  return (
    <figure
      className={`group relative overflow-hidden rounded-2xl border border-border bg-haze ${tile.ratio}`}
    >
      {tile.src ? (
        <img
          src={tile.src}
          alt={tile.caption}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      ) : (
        <>
          <div
            className="absolute inset-0 opacity-[0.55] [background-image:repeating-linear-gradient(135deg,transparent,transparent_9px,hsl(var(--border))_9px,hsl(var(--border))_10px)]"
            aria-hidden
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-3 text-center">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-signal">
              <Camera className="h-4 w-4" aria-hidden />
            </span>
            <figcaption className="text-[0.7rem] font-semibold leading-tight text-muted-foreground">
              {tile.caption}
            </figcaption>
          </div>
        </>
      )}
    </figure>
  );
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef);
  const [active, setActive] = useState(0);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.index);
          setActive(index);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="overflow-hidden bg-background"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,44%)_minmax(0,1fr)] lg:gap-14">
          {/* Step rail */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="label-caps text-muted-foreground">The process</p>
            <h2 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
              How it <span className="text-signal">works</span>
            </h2>
            <p className="mt-3 max-w-md text-muted-foreground">
              Four steps, no runaround. Booked online, inspected on site,
              reported the same day.
            </p>

            <ol className="mt-9 space-y-1">
              {steps.map((step, i) => {
                const isActive = i === active;
                return (
                  <li
                    key={step.title}
                    data-index={i}
                    ref={(el) => {
                      stepRefs.current[i] = el;
                    }}
                    className="relative grid grid-cols-[auto_minmax(0,1fr)] gap-4 pb-7"
                  >
                    <div className="flex flex-col items-center">
                      <span
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 font-display text-base font-extrabold transition-colors duration-300 ${
                          isActive
                            ? "border-signal bg-signal text-signal-foreground"
                            : "border-border bg-card text-muted-foreground"
                        }`}
                      >
                        {i + 1}
                      </span>
                      {i < steps.length - 1 ? (
                        <span
                          className={`mt-2 w-0.5 flex-1 rounded-full transition-colors duration-300 ${
                            i < active ? "bg-signal" : "bg-border"
                          }`}
                          aria-hidden
                        />
                      ) : null}
                    </div>

                    <div className="pt-1.5">
                      <h3
                        className={`text-lg font-bold transition-colors duration-300 ${
                          isActive ? "text-ink" : "text-ink/60"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`mt-1.5 text-sm leading-relaxed transition-colors duration-300 ${
                          isActive
                            ? "text-muted-foreground"
                            : "text-muted-foreground/60"
                        }`}
                      >
                        {step.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <Button
              asChild
              size="lg"
              className="h-12 w-full rounded-md px-8 text-base font-semibold shadow-soft sm:w-auto"
            >
              <Link to="/book">
                Book Inspection
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>

          {/* Photo mosaic */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {columns.map((column, colIndex) => (
              <div
                key={colIndex}
                style={{
                  transform: `translate3d(0, ${((progress - 0.5) * drift[colIndex]).toFixed(2)}px, 0)`,
                }}
                className={`flex flex-col gap-3 will-change-transform motion-reduce:!transform-none sm:gap-4 ${
                  colIndex === 2 ? "hidden lg:flex" : ""
                } ${colIndex === 1 ? "lg:mt-10" : ""} ${colIndex === 2 ? "lg:mt-4" : ""}`}
              >
                {column.map((tile) => (
                  <PhotoTile key={tile.caption} tile={tile} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
