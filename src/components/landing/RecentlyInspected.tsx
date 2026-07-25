import { ArrowUpRight } from "lucide-react";
import { SAMPLE_REPORT_URL, recentInspections } from "@/lib/ridecheck";

export function RecentlyInspected() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="label-caps text-signal">Recently inspected</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            What a RideCheck report looks like
          </h2>
        </div>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {recentInspections.map((car) => (
          <li key={car.vehicle} className="rounded-lg border border-border bg-card p-5">
            <p className="text-base font-semibold leading-snug">{car.vehicle}</p>
            <p className="mt-1 text-sm text-muted-foreground">{car.location}</p>
            <p className="mt-4 font-display text-3xl font-extrabold tracking-tight">
              {car.score}
            </p>
            <p className="label-caps text-muted-foreground">Condition score</p>
            <a
              href={SAMPLE_REPORT_URL}
              target="_blank"
              rel="noopener"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-signal underline-offset-4 hover:underline"
            >
              View report
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
