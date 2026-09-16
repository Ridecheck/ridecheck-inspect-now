import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Car,
  Check,
  MapPin,
  ScanSearch,
  ShieldCheck,
  Star,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroCar from "@/assets/hero-inspection-diagram.png.asset.json";
import {
  StepTiming,
  timingLabel,
  type Timing,
} from "@/components/booking/StepTiming";
import {
  AvailabilityResultCard,
  OutOfAreaPanel,
  parseContact,
} from "@/components/landing/OutOfAreaPanel";
import { buildAvailability } from "@/lib/booking";
import { isAreaCovered } from "@/lib/coverage";
import { GOOGLE_REVIEWS_URL, packages } from "@/lib/ridecheck";

type RevealPhase = "checking" | "complete" | "burst";

const benefits = [
  { icon: ScanSearch, title: "Local, qualified", sub: "mechanics" },
  { icon: ClipboardList, title: "Same-day", sub: "detailed reports" },
  { icon: Wallet, title: "Fast & easy", sub: "booking" },
];

type Step = "location" | "checking" | "confirmed" | "package" | "vehicle" | "handoff";

function splitLocation(value: string) {
  const parts = value.split(",").map((x) => x.trim()).filter(Boolean);
  const postcode = parts.find((x) => /^\d{4}$/.test(x));
  const suburb = parts.filter((x) => !/^\d{4}$/.test(x)).join(", ");
  return { suburb: suburb || value.trim(), postcode };
}

const defaultPkg = packages.find((p) => p.popular)?.name ?? packages[0].name;

export function AvailabilityFirstHero() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("location");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [contactTouched, setContactTouched] = useState(false);
  const [revealPhase, setRevealPhase] = useState<RevealPhase>("checking");
  const [timing, setTiming] = useState<Timing>(null);
  const [pkg, setPkg] = useState(defaultPkg);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [leadNote, setLeadNote] = useState("");
  const [leadSent, setLeadSent] = useState(false);

  const { suburb, postcode } = splitLocation(location);
  const covered = isAreaCovered(suburb, postcode);
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

  // Same staged reveal the Check Availability popup uses, trimmed:
  // card only, no checklist, and a faster overall sequence.
  useEffect(() => {
    if (step !== "checking") return;
    setRevealPhase("checking");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finish = () => setStep("confirmed");
    const timers = [
      setTimeout(() => {
        if (reduceMotion) {
          finish();
          return;
        }
        setRevealPhase("complete");
      }, 1200),
      ...(reduceMotion
        ? []
        : [
            setTimeout(() => setRevealPhase("burst"), 1550),
            setTimeout(finish, 2500),
          ]),
    ];
    return () => timers.forEach(clearTimeout);
  }, [step]);

  const goToBooking = () => {
    navigate({
      to: "/book",
      search: {
        type: "standard",
        suburb,
        postcode,
        pkg: selected.name,
        vehicle: [year, make, model].filter(Boolean).join(" "),
        email: contactDetails.email,
        phone: contactDetails.phone,
        timingMode: timing?.mode,
        timingDay: timing?.mode === "day" ? timing.iso : undefined,
        timingPart: timing?.mode === "day" ? timing.part : undefined,
      },
    });
  };

  const restart = () => {
    setStep("location");
    setTiming(null);
    setLeadSent(false);
    setLeadNote("");
  };

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] items-center lg:flex">
        <img
          src={heroCar.url}
          alt="Red BMW M3 sedan with RideCheck inspection damage callouts"
          width={1408}
          height={1008}
          className="h-auto max-h-full w-full object-contain object-right"
        />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-6 sm:px-8 sm:pb-16">
        <div className="flex justify-center sm:justify-end">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-soft transition-colors hover:bg-secondary sm:w-auto sm:py-2"
          >
            <span className="font-display text-xl font-extrabold text-ink sm:text-lg">G</span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold text-ink sm:text-sm">5.0</span>
                <span className="flex" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-signal text-signal sm:h-3.5 sm:w-3.5" />
                  ))}
                </span>
              </div>
              <p className="text-sm text-muted-foreground sm:text-xs">350+ Google reviews</p>
            </div>
          </a>
        </div>

        <div className="mt-5 max-w-xl lg:max-w-[52%]">
          <h1 className="text-[2.35rem] font-extrabold leading-[1.05] text-ink sm:text-5xl">
            Let&rsquo;s check if this car is{" "}
            <span className="text-signal">worth buying.</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Enter the suburb where the car is located and we&rsquo;ll check if we can
            inspect it, show you available days and get you booked in &mdash; fast.
          </p>

          <div className="mt-6 rounded-2xl border border-border bg-card p-4 shadow-lift sm:p-5">
            {step === "location" && (
              <>
                <label
                  htmlFor="af-location"
                  className="flex items-center gap-2 text-sm font-bold text-ink"
                >
                  <MapPin className="h-4 w-4 text-signal" aria-hidden />
                  Where&rsquo;s the car?
                </label>
                <Input
                  id="af-location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter suburb or postcode"
                  className="mt-3 h-12 rounded-xl"
                />

                <label
                  htmlFor="af-contact"
                  className="mt-4 block text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Email or mobile number
                </label>
                <Input
                  id="af-contact"
                  name="contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value.slice(0, 254))}
                  onBlur={() => setContactTouched(true)}
                  placeholder="you@example.com or 04xx xxx xxx"
                  maxLength={254}
                  aria-invalid={contactTouched && !contactDetails.isValid}
                  aria-describedby="af-contact-help"
                  className="mt-2 h-12 rounded-xl"
                />
                <p
                  id="af-contact-help"
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
                  onClick={() => setStep("checking")}
                  className="mt-5 h-12 w-full rounded-xl text-base font-semibold sm:w-auto sm:px-8"
                >
                  Check Availability
                  <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                </Button>
                <p className="mt-3 text-xs text-muted-foreground">
                  No payment required at this stage.
                </p>
              </>
            )}

            {step === "checking" && (
              <div className="min-h-[16rem] py-6">
                <div
                  className={`availability-reveal flex justify-center ${
                    revealPhase === "burst" ? "is-bursting" : ""
                  }`}
                >
                  <AvailabilityResultCard
                    checking={revealPhase === "checking"}
                    variant={covered ? "check" : "car"}
                  />
                </div>
              </div>
            )}

            {step === "confirmed" && !covered && (
              <OutOfAreaPanel
                suburb={suburb}
                contact={contact}
                onContactChange={setContact}
                note={leadNote}
                onNoteChange={setLeadNote}
                sent={leadSent}
                onSend={() => setLeadSent(true)}
                onEdit={restart}
                onDone={restart}
                doneLabel="Try a different suburb"
              />
            )}

            {step === "confirmed" && covered && (
              <>
                <div className="availability-success-card rounded-xl border border-protected/30 bg-protected-soft p-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-protected text-protected-foreground">
                      <Check
                        className="availability-success-check h-4 w-4"
                        strokeWidth={3}
                        aria-hidden
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-ink">
                        Yes, we inspect in {suburb}
                        {postcode ? `, ${postcode}` : ""}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        No travel fee for this area.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={restart}
                      className="shrink-0 text-xs font-semibold text-signal underline-offset-4 hover:underline"
                    >
                      Change
                    </button>
                  </div>
                </div>

                <div className="mt-5">
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
                </div>

                <Button
                  size="lg"
                  disabled={timing === null}
                  onClick={() => setStep("package")}
                  className="mt-5 h-12 w-full rounded-xl text-base font-semibold"
                >
                  Continue
                  <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                </Button>
              </>
            )}

            {step === "package" && (
              <>
                <button
                  type="button"
                  onClick={() => setStep("confirmed")}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                  Back
                </button>
                <h2 className="mt-3 text-lg font-extrabold text-ink">
                  Choose your inspection
                </h2>
                <div className="mt-4 space-y-3">
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
                          {p.inclusions.slice(0, 4).map((inc) => (
                            <li
                              key={inc}
                              className="flex items-start gap-2 text-xs text-muted-foreground"
                            >
                              <Check className="mt-0.5 h-3 w-3 shrink-0 text-signal" aria-hidden />
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
                  onClick={() => setStep("vehicle")}
                  className="mt-5 h-12 w-full rounded-xl text-base font-semibold"
                >
                  Continue
                  <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                </Button>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-signal" aria-hidden />
                  No payment required at this stage.
                </p>
              </>
            )}

            {step === "vehicle" && (
              <>
                <button
                  type="button"
                  onClick={() => setStep("package")}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                  Back
                </button>
                <div className="mt-3 flex items-center gap-2">
                  <Car className="h-5 w-5 text-signal" aria-hidden />
                  <h2 className="text-lg font-extrabold text-ink">Tell us about the car</h2>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Add the vehicle details so we can prepare the right checks.
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Input
                    value={make}
                    onChange={(event) => setMake(event.target.value)}
                    placeholder="Make"
                    aria-label="Vehicle make"
                    className="h-12 rounded-xl"
                  />
                  <Input
                    value={model}
                    onChange={(event) => setModel(event.target.value)}
                    placeholder="Model"
                    aria-label="Vehicle model"
                    className="h-12 rounded-xl"
                  />
                  <Input
                    value={year}
                    onChange={(event) => setYear(event.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="Year"
                    aria-label="Vehicle year"
                    inputMode="numeric"
                    maxLength={4}
                    className="col-span-2 h-12 rounded-xl"
                  />
                </div>
                <Button
                  size="lg"
                  disabled={!make.trim() || !model.trim() || year.length !== 4}
                  onClick={() => setStep("handoff")}
                  className="mt-5 h-12 w-full rounded-xl text-base font-semibold"
                >
                  Continue
                  <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                </Button>
              </>
            )}

            {step === "handoff" && (
              <>
                <button
                  type="button"
                  onClick={() => setStep("vehicle")}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                  Back
                </button>
                <h2 className="mt-3 text-lg font-extrabold text-ink">
                  Ready to complete your booking
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  We&rsquo;ll carry everything across &mdash; no need to enter it again.
                </p>
                <dl className="mt-4 space-y-2 rounded-xl border border-border bg-haze p-4 text-sm">
                  {[
                    ["Location", suburb || "Not set yet"],
                    ["Vehicle", [year, make, model].filter(Boolean).join(" ")],
                    ["Preferred time", timingLabel(timing, availability.days)],
                    ["Inspection", `${selected.name} — $${handoffPrice}`],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">{label}</dt>
                      <dd className="text-right font-semibold text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-4 rounded-2xl border border-protected/25 bg-protected-soft p-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-protected/10 text-protected">
                      <ShieldCheck className="h-7 w-7" strokeWidth={2.5} aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-extrabold text-protected">You&rsquo;re protected</h3>
                      <ul className="mt-2 space-y-2">
                        {[
                          "Full refund if you cancel 24+ hours before",
                          "Secure payment with Stripe",
                          "5.0★ from 350+ customers",
                          "No hidden fees — what you see is what you pay",
                        ].map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-xs font-medium text-ink"
                          >
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

                <Button
                  size="lg"
                  onClick={goToBooking}
                  className="mt-5 h-12 w-full rounded-xl text-base font-semibold"
                >
                  Continue to booking
                  <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                </Button>
              </>
            )}
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {benefits.map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-start gap-2">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-ink" aria-hidden />
                <p className="text-xs font-semibold leading-tight text-ink">
                  {title}
                  <span className="block font-normal text-muted-foreground">{sub}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl lg:hidden">
          <img
            src={heroCar.url}
            alt="Red BMW M3 sedan with RideCheck inspection damage callouts"
            width={1408}
            height={1008}
            className="h-52 w-full object-cover sm:h-72"
          />
        </div>
      </div>
    </section>
  );
}
