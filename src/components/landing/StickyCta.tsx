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
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          className="flex w-full items-center justify-center gap-1.5 rounded-t-xl border-x border-t border-border bg-secondary py-2 text-sm font-semibold text-ink"
        >
          Check Availability
          <ChevronUp className="h-4 w-4 text-signal" aria-hidden />
        </button>

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
