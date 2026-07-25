import { steps } from "@/lib/ridecheck";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-background">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
            How it <span className="text-signal">works</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Four steps, no runaround.
          </p>
        </div>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-signal font-display text-base font-extrabold text-signal-foreground">
                {i + 1}
              </span>

              <h3 className="mt-4 text-base font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
