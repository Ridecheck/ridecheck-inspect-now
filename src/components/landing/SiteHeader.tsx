import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/ridecheck";
import logoAsset from "@/assets/ridecheck-logo.png.asset.json";

const navLinks = [
  { to: "/about", label: "About Us" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/pricing", label: "Pricing" },
  { to: "/ev-inspections", label: "EV Inspections" },
  { to: "/locations", label: "Locations" },
  { to: "/faqs", label: "FAQs" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 sm:px-8">
        <Link to="/" aria-label="RideCheck home">
          <img
            src={logoAsset.url}
            alt="RideCheck Vehicle Inspections"
            width={398}
            height={101}
            className="h-9 w-auto sm:h-11"
          />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-ink lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="border-b-2 border-transparent pb-1 transition-colors hover:border-signal hover:text-signal"
              activeProps={{ className: "border-signal text-signal" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={PHONE_HREF}
            className="hidden items-center gap-2 text-sm font-semibold text-ink xl:flex"
          >
            <Phone className="h-4 w-4 text-signal" aria-hidden />
            {PHONE_DISPLAY}
          </a>
          <Button
            asChild
            className="rounded-md px-4 text-sm font-semibold shadow-soft sm:px-6"
          >
            <Link to="/book">Book Now</Link>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-ink lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto max-w-6xl space-y-2 px-5 py-4 sm:px-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl bg-secondary/60 px-4 py-3.5 text-base font-semibold text-ink"
              >
                {link.label}
                <span aria-hidden className="text-signal">
                  &rsaquo;
                </span>
              </Link>
            ))}
            <a
              href={PHONE_HREF}
              className="flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3.5 text-base font-semibold text-ink"
            >
              <Phone className="h-4 w-4 text-signal" aria-hidden />
              {PHONE_DISPLAY}
            </a>
            <Button
              asChild
              size="lg"
              className="h-12 w-full rounded-xl text-base font-semibold"
            >
              <Link to="/book" onClick={() => setOpen(false)}>
                Book Now
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
