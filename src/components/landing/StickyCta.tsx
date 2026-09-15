import { useState } from "react";
import { ChevronUp, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PHONE_HREF } from "@/lib/ridecheck";
import { CheckAvailabilitySheet } from "@/components/landing/CheckAvailabilitySheet";

export function StickyCta() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-50 sm:hidden">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          className="relative mx-auto flex h-auto min-h-[3.25rem] w-[84%] flex-col items-center justify-center gap-0 rounded-b-none rounded-t-2xl border-x border-t border-signal/20 bg-background/95 px-5 pb-2 pt-2.5 shadow-[0_-4px_20px_hsl(var(--signal)/0.18)] backdrop-blur transition hover:bg-background hover:shadow-[0_-6px_24px_hsl(var(--signal)/0.24)]"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
            </span>
            <span className="text-sm font-bold text-signal">Check Availability</span>
            <ChevronUp className="h-4 w-4 text-signal" aria-hidden />
          </div>
          <span className="text-[11px] font-medium text-muted-foreground">
            See if we can inspect your area today
          </span>
        </Button>

        <div className="border-t border-border bg-background/95 p-3 backdrop-blur">
          <div className="flex gap-2">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-md px-4"
            >
              <a href={PHONE_HREF} aria-label="Call RideCheck">
                <Phone className="h-5 w-5" aria-hidden />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="h-12 flex-1 rounded-md text-base font-semibold"
            >
              <Link to="/book">Book Inspection</Link>
            </Button>
          </div>
        </div>
      </div>

      <CheckAvailabilitySheet open={open} onClose={() => setOpen(false)} />
    </>
  );
}
