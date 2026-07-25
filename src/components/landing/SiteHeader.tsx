import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOOKING_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/ridecheck";

export function SiteHeader() {
  return (
    <header className="border-b border-ink-foreground/10 bg-ink text-ink-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="font-display text-lg font-extrabold tracking-tight">
          Ride<span className="text-signal">Check</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">
          <a href="#packages" className="hover:text-signal">
            Packages
          </a>
          <a href="#how-it-works" className="hover:text-signal">
            How it works
          </a>
          <a href="#reviews" className="hover:text-signal">
            Reviews
          </a>
          <a href="#faq" className="hover:text-signal">
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={PHONE_HREF}
            className="hidden items-center gap-2 text-sm font-semibold sm:flex"
          >
            <Phone className="h-4 w-4 text-signal" aria-hidden />
            {PHONE_DISPLAY}
          </a>
          <Button asChild className="hidden font-semibold sm:inline-flex">
            <a href={BOOKING_URL} target="_blank" rel="noopener">
              Book &amp; Pay Online
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
