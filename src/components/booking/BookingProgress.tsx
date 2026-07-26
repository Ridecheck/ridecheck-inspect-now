import { Check } from "lucide-react";

type BookingProgressProps = {
  steps: string[];
  current: number;
  complete?: boolean;
};

export function BookingProgress({ steps, current, complete = false }: BookingProgressProps) {
  const progressWidth = complete
    ? "100%"
    : `${(Math.max(0, current) / (steps.length - 1)) * 100}%`;

  return (
    <div className="w-full" aria-label="Booking progress">
      <div className="relative flex items-center justify-between">
        {/* Background track */}
        <div className="absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-secondary" aria-hidden />

        {/* Filled track */}
        <div
          className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-signal transition-all duration-500 ease-out"
          style={{ width: progressWidth }}
          aria-hidden
        />

        {steps.map((label, i) => {
          const isComplete = complete || i < current;
          const isActive = !complete && i === current;

          return (
            <div key={label} className="relative z-10 flex flex-1 flex-col items-center gap-1.5">
              <span
                className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors duration-300 sm:h-8 sm:w-8 sm:text-sm ${
                  isComplete
                    ? "bg-signal text-signal-foreground"
                    : isActive
                      ? "bg-signal text-signal-foreground ring-4 ring-signal/20"
                      : "border-2 border-secondary bg-background text-muted-foreground"
                }`}
              >
                {isComplete ? <Check className="h-3.5 w-3.5" aria-hidden /> : i + 1}
              </span>
              <span
                className={`max-w-[5.5rem] text-center text-[10px] font-bold uppercase tracking-wider sm:max-w-none sm:text-xs ${
                  isActive
                    ? "text-signal"
                    : isComplete
                      ? "text-ink"
                      : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
