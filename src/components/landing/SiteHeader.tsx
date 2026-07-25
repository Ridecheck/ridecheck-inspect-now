import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOOKING_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/ridecheck";
import logoAsset from "@/assets/ridecheck-logo.png.asset.json";

const links = [
  { href: "#packages", label: "Packages" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <a href="#top" aria-label="RideCheck home">
          <img
            src={logoAsset.url}
            alt="RideCheck Vehicle Inspections"
            width={398}
            height={101}
            className="h-9 w-auto sm:h-11"
          />
        </a>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-ink lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="border-b-2 border-transparent pb-1 transition-colors hover:border-signal hover:text-signal"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={PHONE_HREF}
            className="hidden items-center gap-2 text-sm font-semibold text-ink sm:flex"
          >
            <Phone className="h-4 w-4 text-signal" aria-hidden />
            {PHONE_DISPLAY}
          </a>
          <Button
            asChild
            className="hidden rounded-md px-6 font-semibold shadow-soft sm:inline-flex"
          >
            <a href={BOOKING_URL} target="_blank" rel="noopener">
              Book Inspection
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
