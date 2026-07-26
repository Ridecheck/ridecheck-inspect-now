import { Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PHONE_HREF } from "@/lib/ridecheck";

export function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-3 backdrop-blur sm:hidden">
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
  );
}
