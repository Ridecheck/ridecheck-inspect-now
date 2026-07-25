import { ArrowUpRight } from "lucide-react";
import { SAMPLE_REPORT_URL, recentInspections } from "@/lib/ridecheck";

export function RecentlyInspected() {
  return (
    <section className="bg-haze">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
            Recently inspected
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            A look at what a RideCheck report covers.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-3">
          {recentInspections.map((car) => (
            <li
              key={car.vehicle}
              className="rounded-3xl border border-border bg-card p-6 shadow-soft"
            >
              <p className="text-base font-bold leading-snug text-ink">
                {car.vehicle}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{car.location}</p>
              <p className="mt-5 font-display text-4xl font-extrabold tracking-tight text-ink">
                {car.score}
              </p>
              <p className="label-caps text-muted-foreground">Condition score</p>
              <a
                href={SAMPLE_REPORT_URL}
                target="_blank"
                rel="noopener"
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-ink underline-offset-4 hover:underline"
              >
                View report
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
