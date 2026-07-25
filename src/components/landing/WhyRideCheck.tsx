import { differentiators } from "@/lib/ridecheck";

export function WhyRideCheck() {
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="label-caps text-signal">Why RideCheck</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
          Independent by design, not by slogan
        </h2>

        <div className="mt-10 grid gap-px overflow-hidden rounded-lg bg-ink-foreground/15 sm:grid-cols-2">
          {differentiators.map((item, i) => (
            <div key={item.title} className="bg-ink p-6 sm:p-8">
              <span className="label-caps text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-foreground/70">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
