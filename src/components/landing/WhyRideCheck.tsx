import { ShieldCheck, Camera, PhoneCall, FileSearch } from "lucide-react";
import { differentiators } from "@/lib/ridecheck";

const icons = [ShieldCheck, Camera, PhoneCall, FileSearch];

export function WhyRideCheck() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
            Why RideCheck
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Independent by design, not by slogan.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {differentiators.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={item.title}
                className="rounded-3xl border border-border bg-card p-7 shadow-soft"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-signal">
                  <Icon className="h-5 w-5 text-signal-foreground" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
