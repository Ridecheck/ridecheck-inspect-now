import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  MapPin,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { packages } from "@/lib/ridecheck";
import logoAsset from "@/assets/ridecheck-logo.png.asset.json";

const BOOKING_DOMAIN = "book.vehicleinspect.com.au";

const checkingSteps = [
  "Checking service coverage",
  "Finding nearby inspectors",
  "Checking availability",
];

const defaultPkg = packages.find((p) => p.popular)?.name ?? packages[0].name;

type RevealPhase = "checking" | "complete" | "burst";

function AvailabilityResultCard({ settled = false }: { settled?: boolean }) {
  return (
    <div
      className={`availability-result ${settled ? "is-settled" : ""}`}
      aria-hidden
    >
      <span className="availability-glow" />
      <div className="availability-confetti">
        {Array.from({ length: 10 }, (_, index) => (
          <span key={index} className={`availability-confetti-piece piece-${index + 1}`} />
        ))}
      </div>
      <div className="availability-envelope">
        <div className="availability-result-slip">
          <span className="availability-check-ring">
            <Check strokeWidth={3.5} />
          </span>
          <span className="availability-result-label">Area available</span>
        </div>
        <div className="availability-envelope-back" />
        <div className="availability-envelope-front">
          <span className="availability-brand-badge inline-flex items-center justify-center rounded-full bg-background">
            <img src={logoAsset.url} alt="" />
          </span>
        </div>
      </div>
    </div>
  );
}

function splitLocation(value: string) {
  const parts = value.split(",").map((x) => x.trim()).filter(Boolean);
  const postcode = parts.find((x) => /^\d{4}$/.test(x));
  const suburb = parts.filter((x) => !/^\d{4}$/.test(x)).join(", ");
  return { suburb: suburb || value.trim(), postcode };
}

function parseContact(value: string) {
  const contact = value.trim();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  const digits = contact.replace(/\D/g, "");
  const isPhone = /^[+()\d\s-]+$/.test(contact) && digits.length >= 8 && digits.length <= 15;
  return {
    isValid: contact.length <= 254 && (isEmail || isPhone),
    email: isEmail ? contact : undefined,
    phone: isPhone ? contact : undefined,
  };
}

export function CheckAvailabilitySheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const [screen, setScreen] = useState(0);
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [contactTouched, setContactTouched] = useState(false);
  const [pkg, setPkg] = useState(defaultPkg);
  const [checkStep, setCheckStep] = useState(0);
  const [revealPhase, setRevealPhase] = useState<RevealPhase>("checking");

  // Reset the funnel each time the sheet is opened.
  useEffect(() => {
    if (open) {
      setScreen(0);
      setCheckStep(0);
      setRevealPhase("checking");
    }
  }, [open]);

  // Run the fake coverage check.
  useEffect(() => {
    if (screen !== 1) return;
    setCheckStep(0);
    setRevealPhase("checking");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers = [
      setTimeout(() => setCheckStep(1), 650),
      setTimeout(() => setCheckStep(2), 1300),
      setTimeout(() => setCheckStep(3), 1900),
      setTimeout(() => {
        if (reduceMotion) {
          setScreen(2);
          return;
        }
        setRevealPhase("complete");
      }, 2200),
      ...(!reduceMotion
        ? [
            setTimeout(() => setRevealPhase("burst"), 2920),
            setTimeout(() => setScreen(2), 3820),
          ]
        : []),
    ];
    return () => timers.forEach(clearTimeout);
  }, [screen]);

  const { suburb, postcode } = splitLocation(location);
  const selected = packages.find((p) => p.name === pkg) ?? packages[0];
  const contactDetails = parseContact(contact);

  const goToBooking = () => {
    onClose();
    navigate({
      to: "/book",
      search: {
        type: "standard",
        suburb,
        postcode,
        pkg: selected.name,
        email: contactDetails.email,
        phone: contactDetails.phone,
      },
    });
  };

  const canBack = screen === 3 || screen === 4;

  return (
    <div
      className={`fixed inset-0 z-[60] sm:hidden ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close availability check"
        onClick={onClose}
        className={`absolute inset-0 bg-ink/50 transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Check availability"
        className={`absolute inset-x-0 bottom-0 max-h-[90vh] overflow-y-auto rounded-t-3xl bg-background shadow-lift transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="sticky top-0 z-10 bg-background px-5 pb-3 pt-3">
          <span
            className="mx-auto block h-1.5 w-10 rounded-full bg-border"
            aria-hidden
          />
          <div className="mt-3 flex items-center justify-between gap-3">
            {canBack ? (
              <button
                type="button"
                onClick={() => setScreen((s) => s - 1)}
                className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Back
              </button>
            ) : (
              <span className="label-caps text-muted-foreground">
                Check availability
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
          <div className="mt-3 flex gap-1.5" aria-hidden>
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`h-1 flex-1 rounded-full ${
                  i <= screen ? "bg-signal" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="px-5 pb-8 pt-2">
          {screen === 0 && (
            <>
              <h2 className="text-xl font-extrabold text-ink">
                Check availability
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Tell us where the car is and we'll confirm we cover it.
              </p>

              <label
                className="mt-5 block text-xs font-bold uppercase tracking-wider text-muted-foreground"
                htmlFor="ca-location"
              >
                Your location
              </label>
              <div className="relative mt-2">
                <MapPin
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-signal"
                  aria-hidden
                />
                <Input
                  id="ca-location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Suburb or postcode"
                  className="h-12 rounded-xl pl-10"
                />
              </div>

              <label
                className="mt-5 block text-xs font-bold uppercase tracking-wider text-muted-foreground"
                htmlFor="ca-contact"
              >
                Email or mobile number
              </label>
              <Input
                id="ca-contact"
                name="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value.slice(0, 254))}
                onBlur={() => setContactTouched(true)}
                placeholder="you@example.com or 04xx xxx xxx"
                maxLength={254}
                aria-invalid={contactTouched && !contactDetails.isValid}
                aria-describedby="ca-contact-help"
                className="mt-2 h-12 rounded-xl"
              />
              <p
                id="ca-contact-help"
                className={`mt-1.5 text-xs ${
                  contactTouched && !contactDetails.isValid
                    ? "font-semibold text-signal"
                    : "text-muted-foreground"
                }`}
              >
                {contactTouched && !contactDetails.isValid
                  ? "Enter a valid email address or mobile number."
                  : "We'll use this to follow up on availability."}
              </p>

              <Button
                size="lg"
                disabled={location.trim() === "" || !contactDetails.isValid}
                onClick={() => setScreen(1)}
                className="mt-6 h-12 w-full rounded-xl text-base font-semibold"
              >
                Check Availability
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
              </Button>
            </>
          )}

          {screen === 1 && (
            <div className="min-h-[21rem] py-6">
              {revealPhase === "checking" ? (
                <>
                  <h2 className="text-xl font-extrabold text-ink">Checking…</h2>
                  <ul className="mt-6 space-y-3">
                    {checkingSteps.map((label, i) => {
                      const done = checkStep > i;
                      const active = checkStep === i;
                      return (
                        <li
                          key={label}
                          className={`flex items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm ${
                            done || active ? "text-ink" : "text-muted-foreground"
                          }`}
                        >
                          {done ? (
                            <Check className="h-4 w-4 shrink-0 text-signal" aria-hidden />
                          ) : (
                            <Loader2
                              className={`h-4 w-4 shrink-0 ${
                                active ? "animate-spin text-signal" : "text-border"
                              }`}
                              aria-hidden
                            />
                          )}
                          {label}
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : (
                <div className={`availability-reveal text-center ${revealPhase === "burst" ? "is-bursting" : ""}`}>
                  <AvailabilityResultCard />
                  <h2 className="mt-5 text-xl font-extrabold text-ink">
                    {revealPhase === "complete" ? "Checking complete" : "Great news!"}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {revealPhase === "complete"
                      ? "Preparing your result…"
                      : "We can inspect your area."}
                  </p>
                </div>
              )}
            </div>
          )}

          {screen === 2 && (
            <div className="py-4 text-center">
              <AvailabilityResultCard settled />
              <h2 className="mt-4 text-xl font-extrabold text-ink">
                Great news!
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                We can inspect your area.
              </p>

              <div className="mt-5 rounded-2xl border border-border bg-haze p-4 text-left">
                <p className="flex items-center gap-2 text-sm font-bold text-ink">
                  <MapPin className="h-4 w-4 text-signal" aria-hidden />
                  {suburb}
                </p>
                <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-signal" aria-hidden />
                  Mobile inspection available
                </p>
              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                You're just a few steps away from booking your inspection.
              </p>

              <Button
                size="lg"
                onClick={() => setScreen(3)}
                className="mt-6 h-12 w-full rounded-xl text-base font-semibold"
              >
                Continue
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
              </Button>
            </div>
          )}

          {screen === 3 && (
            <>
              <h2 className="text-xl font-extrabold text-ink">
                Choose your inspection
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Both include an instant digital report delivered fast.
              </p>

              <div className="mt-5 space-y-3">
                {packages.map((p) => {
                  const active = pkg === p.name;
                  return (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => setPkg(p.name)}
                      aria-pressed={active}
                      className={`w-full rounded-2xl border p-4 text-left transition ${
                        active
                          ? "border-signal bg-accent/40 shadow-soft"
                          : "border-border bg-background"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          {p.popular && (
                            <span className="inline-block rounded-full bg-signal px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-signal-foreground">
                              Most popular
                            </span>
                          )}
                          <p className="mt-1 font-bold text-ink">{p.name}</p>
                          <p className="text-2xl font-extrabold text-signal">
                            ${p.price}
                          </p>
                        </div>
                        <span
                          className={`mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                            active
                              ? "border-signal bg-signal text-signal-foreground"
                              : "border-border"
                          }`}
                          aria-hidden
                        >
                          {active && <Check className="h-3 w-3" />}
                        </span>
                      </div>
                      <ul className="mt-3 space-y-1">
                        {p.inclusions.slice(0, 3).map((inc) => (
                          <li
                            key={inc}
                            className="flex items-start gap-2 text-xs text-muted-foreground"
                          >
                            <Check
                              className="mt-0.5 h-3 w-3 shrink-0 text-signal"
                              aria-hidden
                            />
                            {inc}
                          </li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>

              <Button
                size="lg"
                onClick={() => setScreen(4)}
                className="mt-6 h-12 w-full rounded-xl text-base font-semibold"
              >
                Continue
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
              </Button>
            </>
          )}

          {screen === 4 && (
            <>
              <h2 className="text-xl font-extrabold text-ink">
                Taking you to booking
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                You're moving into our secure booking system at{" "}
                <span className="font-semibold text-ink">{BOOKING_DOMAIN}</span>.
              </p>

              <div className="mt-5 rounded-2xl border border-border bg-haze p-4">
                <p className="label-caps text-muted-foreground">
                  We'll carry these across
                </p>
                <dl className="mt-3 space-y-2 text-sm">
                  {[
                    ["Location", suburb],
                    ["Inspection", `${selected.name} — $${selected.price}`],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">{label}</dt>
                      <dd className="text-right font-semibold text-ink">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                No need to enter any of it again — pick your time and confirm.
              </p>

              <Button
                size="lg"
                onClick={goToBooking}
                className="mt-6 h-12 w-full rounded-xl text-base font-semibold"
              >
                Continue to booking
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
