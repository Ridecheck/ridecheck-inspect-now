import { steps } from "@/lib/ridecheck";

export function HowItWorks() {
  return (
    <section className="border-y border-border bg-secondary/60">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="label-caps text-signal">How it works</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Four steps, no runaround</h2>

        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="border-t-2 border-ink pt-4">
              <span className="font-display text-4xl font-extrabold tracking-tight text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-base font-bold">{step.title}</h3>
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
