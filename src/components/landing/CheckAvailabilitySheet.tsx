import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  DollarSign,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  StepTiming,
  timingLabel,
  type Timing,
} from "@/components/booking/StepTiming";
import { Textarea } from "@/components/ui/textarea";
import { buildAvailability } from "@/lib/booking";
import { packages, PHONE_HREF } from "@/lib/ridecheck";


const BOOKING_DOMAIN = "book.vehicleinspect.com.au";
const AVAILABILITY_HELP_KEY = "ridecheck-availability-help-shown";
const INACTIVITY_DELAY_MS = 12000;

const checkingSteps = [
  "Checking service coverage",
  "Checking available inspection days",
  "Preparing your booking options",
];

const defaultPkg = packages.find((p) => p.popular)?.name ?? packages[0].name;

type RevealPhase = "checking" | "complete" | "burst";

function RideCheckCarMark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden>
      <path
        fill="currentColor"
        d="M18.5 20.3c.9-3.2 3.8-5.4 7.1-5.4h12.8c3.3 0 6.2 2.2 7.1 5.4l2.4 8.1c3.5.9 6.1 4 6.1 7.8v9.3c0 2.8-2.2 5-5 5h-1.2v2.4a3.8 3.8 0 0 1-3.8 3.8h-2.2a3.8 3.8 0 0 1-3.8-3.8v-2.4H26v2.4a3.8 3.8 0 0 1-3.8 3.8H20a3.8 3.8 0 0 1-3.8-3.8v-2.4H15c-2.8 0-5-2.2-5-5v-9.3c0-3.8 2.6-6.9 6.1-7.8l2.4-8.1Z"
      />
      <path fill="var(--background)" d="M24.1 20.1h15.8c.7 0 1.3.5 1.5 1.1l1.9 6.4H20.7l1.9-6.4c.2-.6.8-1.1 1.5-1.1Z" />
      <circle cx="19.1" cy="38.6" r="4.1" fill="var(--background)" />
      <circle cx="44.9" cy="38.6" r="4.1" fill="var(--background)" />
      <rect x="25.2" y="37.2" width="13.6" height="3.5" rx="1.75" fill="var(--background)" />
    </svg>
  );
}

function AvailabilityResultCard({
  settled = false,
  checking = false,
  variant = "check",
}: {
  settled?: boolean;
  checking?: boolean;
  variant?: "check" | "car";
}) {
  const isCar = variant === "car";
  return (
    <div
      className={`availability-result ${settled ? "is-settled" : ""} ${isCar ? "is-car-variant" : ""}`}
      aria-hidden
    >
      <span className="availability-glow" />
      {isCar && settled && (
        <svg className="availability-pin-trail" viewBox="0 0 240 120">
          <path
            d="M74 88 C 108 96, 160 76, 178 44"
            fill="none"
            stroke="var(--signal)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="6 9"
          />
          <g className="availability-pin">
            <path
              d="M186 8c-9.4 0-17 7.6-17 17 0 12.3 17 27 17 27s17-14.7 17-27c0-9.4-7.6-17-17-17Z"
              fill="var(--signal)"
            />
            <circle cx="186" cy="25" r="6" fill="var(--background)" />
          </g>
        </svg>
      )}
      <div className="availability-confetti">
        {Array.from({ length: 14 }, (_, index) => (
          <span key={index} className={`availability-confetti-piece piece-${index + 1}`} />
        ))}
      </div>
      <div className={`availability-envelope ${checking ? "is-checking" : ""}`}>
        <div className={`availability-result-slip ${isCar ? "is-car" : ""}`}>
          {isCar ? (
            <>
              <span className="availability-car-rays" />
              <RideCheckCarMark />
            </>
          ) : (
            <Check strokeWidth={3.6} />
          )}
        </div>
        <div className="availability-envelope-back" />
        <span className="availability-envelope-side availability-envelope-side-left" />
        <span className="availability-envelope-side availability-envelope-side-right" />
        <div className="availability-envelope-front">
          <span className="availability-brand-badge bg-background rounded-full shadow-lg">
            <RideCheckCarMark />
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
  const sheetRef = useRef<HTMLDivElement>(null);
  const [screen, setScreen] = useState(0);
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [contactTouched, setContactTouched] = useState(false);
  const [pkg, setPkg] = useState(defaultPkg);
  const [timing, setTiming] = useState<Timing>(null);
  const [checkStep, setCheckStep] = useState(0);
  const [revealPhase, setRevealPhase] = useState<RevealPhase>("checking");
  const [leadSent, setLeadSent] = useState(false);
  const [leadNote, setLeadNote] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [activityVersion, setActivityVersion] = useState(0);

  // Reset the funnel each time the sheet is opened. Layout effect so the first
  // screen is in place before the panel is painted sliding up.
  useLayoutEffect(() => {
    if (open) {
      setScreen(0);
      setCheckStep(0);
      setRevealPhase("checking");
      setLeadSent(false);
      setLeadNote("");
      setHasInteracted(false);
      setHelpOpen(false);
      setActivityVersion(0);
      sheetRef.current?.scrollTo({ top: 0 });
    } else {
      setHelpOpen(false);
    }
  }, [open]);

  useLayoutEffect(() => {
    sheetRef.current?.scrollTo({ top: 0 });
  }, [screen]);

  const markActivity = () => {
    setHasInteracted(true);
    setHelpOpen(false);
    setActivityVersion((value) => value + 1);
  };

  useEffect(() => {
    if (
      !open ||
      !hasInteracted ||
      screen === 1 ||
      leadSent ||
      sessionStorage.getItem(AVAILABILITY_HELP_KEY)
    ) return;

    const timer = setTimeout(() => {
      sessionStorage.setItem(AVAILABILITY_HELP_KEY, "1");
      setHelpOpen(true);
    }, INACTIVITY_DELAY_MS);
    return () => clearTimeout(timer);
  }, [activityVersion, hasInteracted, leadSent, open, screen]);


  const { suburb, postcode } = splitLocation(location);
  // "test" as the suburb forces the outside-coverage flow for easy testing.
  const isTestTrigger = location.trim().toLowerCase() === "test";
  // Prototype: only the literal word "test" (or a clearly interstate postcode)
  // falls outside coverage. Any other suburb is treated as serviceable.
  const outOfAreaPostcode = /\b[0146789]\d{3}\b/.test(`${suburb} ${postcode ?? ""}`);
  const covered = isTestTrigger ? false : !outOfAreaPostcode;

  // Run the fake coverage check.
  useEffect(() => {
    if (screen !== 1) return;
    setCheckStep(0);
    setRevealPhase("checking");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finish = () => setScreen(2);
    const timers = [
      setTimeout(() => setCheckStep(1), 650),
      setTimeout(() => setCheckStep(2), 1300),
      setTimeout(() => setCheckStep(3), 1900),
      setTimeout(() => {
        if (reduceMotion) {
          finish();
          return;
        }
        setRevealPhase("complete");
      }, 2200),
      ...(reduceMotion
        ? []
        : [
            setTimeout(() => setRevealPhase("burst"), 2720),
            setTimeout(finish, 4070),
          ]),
    ];
    return () => timers.forEach(clearTimeout);
  }, [screen, covered]);

  const selected = packages.find((p) => p.name === pkg) ?? packages[0];
  const contactDetails = parseContact(contact);
  const availability = useMemo(
    () =>
      buildAvailability({
        basePrice: selected.price,
        suburb,
        postcode,
        premiumRequired: Boolean(selected.popular),
      }),
    [selected.price, selected.popular, suburb, postcode],
  );

  const chosenDay =
    timing?.mode === "day"
      ? availability.days.find((d) => d.iso === timing.iso)
      : undefined;
  const handoffPrice = selected.price + (chosenDay?.surcharge ?? 0);

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
        timingMode: timing?.mode,
        timingDay: timing?.mode === "day" ? timing.iso : undefined,
        timingPart: timing?.mode === "day" ? timing.part : undefined,
      },
    });
  };

  const canBack = screen >= 3;

  return (
    <div
      className={`fixed inset-0 z-[60] sm:hidden ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close availability check"
        onClick={onClose}
        className={`absolute inset-0 bg-ink/50 transition-opacity duration-300 ease-out ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label="Check availability"
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className={`absolute inset-x-0 bottom-0 max-h-[85dvh] transform-gpu rounded-t-3xl bg-background shadow-lift transition-transform duration-300 ease-out ${
          open ? "translate-y-0 overflow-y-auto" : "translate-y-full overflow-hidden"
        }`}
        onPointerDownCapture={markActivity}
        onKeyDownCapture={markActivity}

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
            {[0, 1, 2, 3, 4, 5].map((i) => (
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
                  onChange={(e) => {
                    setLocation(e.target.value);
                    markActivity();
                  }}
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
                onChange={(e) => {
                  setContact(e.target.value.slice(0, 254));
                  markActivity();
                }}
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
              <div className={`availability-reveal text-center ${revealPhase === "burst" ? "is-bursting" : ""}`}>
                <AvailabilityResultCard
                  checking={revealPhase === "checking"}
                  variant={covered ? "check" : "car"}
                />
                <h2 className="mt-1 text-xl font-extrabold text-ink">
                  {revealPhase === "checking"
                    ? `${checkingSteps[Math.min(checkStep, checkingSteps.length - 1)]}…`
                    : revealPhase === "complete"
                      ? "Just a moment…"
                      : covered
                        ? "Great news!"
                        : "Got your answer."}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {revealPhase === "checking"
                    ? "Making sure we can get to you."
                    : revealPhase === "complete"
                      ? "We're finalising your result."
                      : covered
                        ? "We can inspect your area."
                        : "Here's what we found."}
                </p>
                <ul className="mt-5 space-y-3 text-left">
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
                          <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal text-signal-foreground">
                            <Check className="h-3 w-3" aria-hidden />
                          </span>
                        ) : (
                          <Loader2
                            className={`h-5 w-5 shrink-0 ${
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
              </div>
            </div>
          )}

          {screen === 2 && covered && (
            <div className="py-4 text-center">
              <AvailabilityResultCard settled />
              <h2 className="mt-4 text-xl font-extrabold text-ink">
                Great news!
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                We can inspect your area.
              </p>

              <div className="availability-success-card mt-5 rounded-2xl border border-protected/30 bg-protected-soft p-4 text-left">
                <p className="flex items-center gap-2 text-sm font-bold text-ink">
                  <MapPin className="h-4 w-4 text-signal" aria-hidden />
                  {suburb}
                </p>
                <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-protected">
                  <Check
                    className="availability-success-check h-4 w-4 text-protected"
                    aria-hidden
                  />
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
                Show available dates
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
              </Button>
            </div>
          )}

          {screen === 2 && !covered && leadSent && (
            <div className="py-6 text-center">
              <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-protected-soft">
                <Check
                  className="availability-success-check h-10 w-10 text-protected"
                  strokeWidth={3}
                  aria-hidden
                />
              </span>
              <h2 className="mt-5 text-2xl font-extrabold text-ink">Thanks!</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                We've received your enquiry.
              </p>

              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-haze p-4 text-left">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-protected-soft text-protected">
                  <Mail className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">
                    We'll be in touch soon
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Our team will review your request and get back to you with
                    availability and any applicable travel fees.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5">
                {[
                  { icon: MessageCircle, label: "Usually within a few hours" },
                  { icon: Clock, label: "We'll confirm availability" },
                  { icon: DollarSign, label: "Transparent pricing" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-haze text-ink">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <p className="text-[11px] leading-tight text-muted-foreground">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                variant="secondary"
                onClick={onClose}
                className="mt-7 h-12 w-full rounded-xl text-base font-semibold"
              >
                Back to home
              </Button>
            </div>
          )}

          {screen === 2 && !covered && !leadSent && (
            <div className="py-4 text-center">
              <AvailabilityResultCard settled variant="car" />
              <h2 className="mt-4 text-xl font-extrabold text-ink">
                We might be able to help.
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                We don't currently have a local inspector in{" "}
                {suburb || "your area"}, but we may still be able to assist.
                This area may require a travel fee depending on the location.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Leave your details below and we'll get in touch with options and
                a quote.
              </p>

              <div className="mt-5 rounded-2xl border border-border bg-haze p-4 text-left">
                <div className="flex items-center justify-between gap-3">
                  <p className="flex min-w-0 items-center gap-2 text-sm font-semibold text-ink">
                    <MapPin className="h-4 w-4 shrink-0 text-signal" aria-hidden />
                    <span className="truncate">{suburb}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => setScreen(0)}
                    className="shrink-0 text-xs font-bold uppercase tracking-wider text-signal"
                  >
                    Edit
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between gap-3 border-t border-border pt-2">
                  <p className="flex min-w-0 items-center gap-2 text-sm text-ink">
                    <Mail className="h-4 w-4 shrink-0 text-signal" aria-hidden />
                    <span className="truncate">{contact}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => setScreen(0)}
                    className="shrink-0 text-xs font-bold uppercase tracking-wider text-signal"
                  >
                    Edit
                  </button>
                </div>
                <label
                  htmlFor="ca-lead-note"
                  className="mt-4 block text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Anything we should know? (optional)
                </label>
                <Textarea
                  id="ca-lead-note"
                  value={leadNote}
                  onChange={(e) => setLeadNote(e.target.value.slice(0, 500))}
                  placeholder="e.g. where the car is, when you need it, or any other details…"
                  maxLength={500}
                  className="mt-2 min-h-[76px] rounded-xl"
                />
              </div>

              <Button
                size="lg"
                onClick={() => setLeadSent(true)}
                className="mt-6 h-12 w-full rounded-xl text-base font-semibold"
              >
                Send enquiry
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
              </Button>
              <button
                type="button"
                onClick={() => setScreen(0)}
                className="mt-3 w-full text-sm font-semibold text-muted-foreground"
              >
                Try a different suburb
              </button>
            </div>
          )}

          {screen === 3 && (
            <>
              <StepTiming
                days={availability.days}
                basePrice={selected.price}
                value={timing}
                onChange={setTiming}
                serviceType="standard"
                region={availability.region}
                regionLabel={availability.regionLabel}
                showAsap={false}
                hidePrices
                highlightAvailability
              />

              <Button
                size="lg"
                disabled={timing === null}
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
                onClick={() => setScreen(5)}
                className="mt-6 h-12 w-full rounded-xl text-base font-semibold"
              >
                Continue
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
              </Button>
            </>
          )}

          {screen === 5 && (
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
                    ["Preferred time", timingLabel(timing, availability.days)],
                    ["Inspection", `${selected.name} — $${handoffPrice}`],
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

              <div className="mt-4 rounded-2xl border border-protected/25 bg-protected-soft p-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-protected/10 text-protected">
                    <ShieldCheck className="h-7 w-7" strokeWidth={2.5} aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-extrabold text-protected">You’re protected</h3>
                    <ul className="mt-2 space-y-2">
                      {[
                        "Full refund if you cancel 24+ hours before",
                        "Secure payment with Stripe",
                        "5.0★ from 350+ customers",
                        "No hidden fees — what you see is what you pay",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs font-medium text-ink">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-protected text-protected-foreground">
                            <Check className="h-2.5 w-2.5" strokeWidth={3.5} aria-hidden />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
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

      {helpOpen && open && (
        <div className="animate-nudge-in fixed inset-x-4 bottom-4 z-[70] rounded-2xl border border-signal/20 bg-background p-4 pr-10 shadow-lift">
          <span className="pointer-events-none absolute inset-0 rounded-2xl bg-signal/5" aria-hidden />
          <p className="relative text-sm font-bold text-ink">Need a hand?</p>
          <p className="relative mt-0.5 text-xs text-muted-foreground">
            We can help you get your inspection booked.
          </p>
          <a
            href={PHONE_HREF}
            className="relative mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-signal"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden />
            Give us a call
          </a>
          <button
            type="button"
            onClick={() => setHelpOpen(false)}
            aria-label="Dismiss booking help"
            className="absolute right-2 top-2 rounded-full p-1 text-muted-foreground transition hover:text-ink"
          >
            <X className="h-3.5 w-3.5" aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}
