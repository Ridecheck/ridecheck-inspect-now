import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

type CountUpProps = {
  end: number;
  format?: (value: number) => string;
};

function CountUp({ end, format = String }: CountUpProps) {
  const [value, setValue] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasRunRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setValue(end);
      hasRunRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasRunRef.current) return;
        hasRunRef.current = true;
        observer.disconnect();

        const duration = 1450;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(end * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={elementRef}>{format(value)}</span>;
}

const stats = [
  {
    end: 6,
    format: (value: number) => `${value}+`,
    label: (
      <>
        Years
        <br />
        in business
      </>
    ),
  },
  {
    end: 5000,
    format: (value: number) => `${value.toLocaleString("en-AU")}+`,
    label: (
      <>
        Inspections
        <br />
        completed
      </>
    ),
  },
  {
    end: 350,
    format: (value: number) => `${value}+`,
    label: <>5-star reviews</>,
    stars: true,
  },
];

export function TrustStatsStrip() {
  return (
    <section aria-label="RideCheck experience and reviews" className="border-y border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-14">
        <div className="grid gap-8 sm:grid-cols-3 sm:gap-0">
          {stats.map((stat, index) => (
            <div
              key={stat.end}
              className={`relative flex min-h-36 flex-col items-center justify-center text-center sm:min-h-44 sm:px-6 ${
                index > 0
                  ? "before:absolute before:left-1/2 before:top-[-1rem] before:h-px before:w-20 before:-translate-x-1/2 before:bg-signal/35 sm:before:left-0 sm:before:top-1/2 sm:before:h-32 sm:before:w-px sm:before:-translate-x-0 sm:before:-translate-y-1/2"
                  : ""
              }`}
            >
              <p className="font-display text-6xl font-extrabold leading-none text-signal sm:text-7xl lg:text-8xl">
                <CountUp end={stat.end} format={stat.format} />
              </p>
              {stat.stars && (
                <span className="mt-2 flex gap-1 text-limited" aria-label="Five stars">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <Star key={star} className="h-7 w-7 fill-current sm:h-8 sm:w-8" strokeWidth={1.5} />
                  ))}
                </span>
              )}
              <p className="mt-4 font-display text-lg font-semibold uppercase leading-relaxed text-ink sm:text-xl">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 w-fit text-center sm:mt-7">
          <p className="font-serif text-3xl italic leading-tight text-muted-foreground sm:text-4xl lg:text-5xl">
            Trusted by Australian car buyers
          </p>
          <span className="mx-auto mt-2 block h-1 w-44 rotate-[-2deg] rounded-full bg-signal sm:w-64" aria-hidden />
        </div>
      </div>
    </section>
  );
}