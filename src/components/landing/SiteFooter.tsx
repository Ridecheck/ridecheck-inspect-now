import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BOOKING_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
  TERMS_URL,
  WHATSAPP_URL,
} from "@/lib/ridecheck";
import logoWhite from "@/assets/ridecheck-logo-white.webp.asset.json";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="rounded-2xl bg-signal p-8 text-signal-foreground sm:p-12">
          <h2 className="max-w-lg text-2xl font-extrabold sm:text-3xl">
            Know exactly what you're buying before you pay for it.
          </h2>
          <Button
            asChild
            size="lg"
            className="mt-6 h-13 rounded-md bg-ink px-8 text-base font-semibold text-ink-foreground hover:bg-ink/90"
          >
            <a href={BOOKING_URL} target="_blank" rel="noopener">
              Book &amp; Pay Online
              <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
            </a>
          </Button>
        </div>

        <div className="mt-14 grid gap-8 border-t border-ink-foreground/15 pt-10 sm:grid-cols-3">
          <div>
            <p className="label-caps text-signal">Service areas</p>
            <p className="mt-3 text-sm text-ink-foreground/75">
              Melbourne, VIC
              <br />
              Sydney, NSW
              <br />
              Adelaide, SA — coming soon
            </p>
          </div>
          <div>
            <p className="label-caps text-signal">Contact</p>
            <div className="mt-3 space-y-1 text-sm text-ink-foreground/75">
              <a href={PHONE_HREF} className="block hover:text-ink-foreground">
                {PHONE_DISPLAY}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener"
                className="block hover:text-ink-foreground"
              >
                WhatsApp
              </a>
            </div>
          </div>
          <div>
            <img
              src={logoWhite.url}
              alt="RideCheck Vehicle Inspections"
              className="h-10 w-auto"
            />
            <p className="mt-3 text-sm text-ink-foreground/75">
              Independent mobile pre-purchase vehicle inspections. No dealer
              associations, ever.
            </p>
            <a
              href={TERMS_URL}
              target="_blank"
              rel="noopener"
              className="mt-3 inline-block text-sm text-ink-foreground/60 underline-offset-4 hover:underline"
            >
              Terms &amp; Conditions
            </a>
          </div>
        </div>

        <p className="mt-10 text-xs text-ink-foreground/45">
          &copy; {new Date().getFullYear()} RideCheck Vehicle Inspections. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
