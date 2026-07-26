import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Car,
  Check,
  Clock,
  CreditCard,
  Link2,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { packages } from "@/lib/ridecheck";

const wizardSteps = ["Location", "Vehicle", "Inspection", "Your details"];

type Form = {
  location: string;
  vehicle: string;
  listing: string;
  pkg: string;
  name: string;
  phone: string;
  email: string;
};

const emptyForm: Form = {
  location: "",
  vehicle: "",
  listing: "",
  pkg: packages.find((p) => p.popular)?.name ?? packages[0].name,
  name: "",
  phone: "",
  email: "",
};

function Field({
  icon: Icon,
  ...props
}: React.ComponentProps<typeof Input> & { icon: React.ElementType }) {
  return (
    <div className="relative">
      <Icon
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-signal"
        aria-hidden
      />
      <Input {...props} className="h-12 rounded-xl pl-10" />
    </div>
  );
}

export function BookingWizard() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<Form>(emptyForm);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <section id="check-car" className="bg-haze">
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-10">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
              Let's check if this car is{" "}
              <span className="text-signal">worth buying</span>
            </h2>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden /> Takes 60 seconds
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CreditCard className="h-4 w-4" aria-hidden /> No payment required yet
              </span>
            </div>
          </div>

          {/* Step tracker */}
          <ol className="mx-auto mt-8 flex max-w-2xl items-start justify-between">
            {wizardSteps.map((label, i) => {
              const complete = done || i < step;
              const active = !done && i === step;
              return (
                <li key={label} className="relative flex flex-1 flex-col items-center">
                  {i > 0 && (
                    <span
                      className="absolute right-1/2 top-4 -z-0 h-px w-full bg-border"
                      aria-hidden
                    />
                  )}
                  <span
                    className={`relative z-10 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                      active
                        ? "bg-signal text-signal-foreground"
                        : complete
                          ? "bg-ink text-background"
                          : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {complete ? <Check className="h-4 w-4" aria-hidden /> : i + 1}
                  </span>
                  <span
                    className={`mt-2 text-center text-xs font-semibold ${
                      active ? "text-signal" : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </span>
                </li>
              );
            })}
          </ol>

          {done ? (
            <div className="mx-auto mt-10 max-w-md text-center">
              <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                <Check className="h-8 w-8 text-signal" aria-hidden />
              </span>
              <h3 className="mt-5 text-2xl font-extrabold text-ink">You're all set</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We've received your booking request and will be in touch shortly.
              </p>
              <ul className="mt-5 space-y-2 text-left">
                {[
                  "Booking received",
                  "We'll contact you within 2 hours to confirm",
                  "No payment required today",
                ].map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-2 rounded-xl bg-accent px-4 py-3 text-sm text-accent-foreground"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                className="mt-6 h-12 w-full rounded-xl"
                onClick={() => {
                  setForm(emptyForm);
                  setStep(0);
                  setDone(false);
                }}
              >
                Book another inspection
              </Button>
            </div>
          ) : (
            <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-signal">
                  Step {step + 1} of 4
                </p>

                {step === 0 && (
                  <>
                    <h3 className="mt-1 text-xl font-bold text-ink">
                      Where is the vehicle located?
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      This helps us send the closest available inspector.
                    </p>
                    <div className="mt-5">
                      <Field
                        icon={MapPin}
                        value={form.location}
                        onChange={set("location")}
                        placeholder="Enter suburb or postcode"
                        aria-label="Suburb or postcode"
                      />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      e.g. Brunswick, 3056
                    </p>
                  </>
                )}

                {step === 1 && (
                  <>
                    <h3 className="mt-1 text-xl font-bold text-ink">
                      What vehicle are you looking at?
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Enter the make, model and year, or paste the listing link.
                    </p>
                    <div className="mt-5 space-y-3">
                      <Field
                        icon={Car}
                        value={form.vehicle}
                        onChange={set("vehicle")}
                        placeholder="e.g. Toyota HiLux 2021"
                        aria-label="Vehicle make, model and year"
                      />
                      <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        or
                      </p>
                      <Field
                        icon={Link2}
                        value={form.listing}
                        onChange={set("listing")}
                        placeholder="Paste Carsales or marketplace link"
                        aria-label="Listing link"
                      />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h3 className="mt-1 text-xl font-bold text-ink">
                      Choose the inspection that's right for you
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Both include an instant digital report delivered fast.
                    </p>
                    <div className="mt-5 space-y-3">
                      {[...packages].reverse().map((p) => {
                        const selected = form.pkg === p.name;
                        return (
                          <button
                            key={p.name}
                            type="button"
                            onClick={() => setForm((f) => ({ ...f, pkg: p.name }))}
                            aria-pressed={selected}
                            className={`w-full rounded-2xl border p-4 text-left transition ${
                              selected
                                ? "border-signal bg-accent/40 shadow-soft"
                                : "border-border bg-background hover:border-signal/50"
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
                                  selected
                                    ? "border-signal bg-signal text-signal-foreground"
                                    : "border-border"
                                }`}
                                aria-hidden
                              >
                                {selected && <Check className="h-3 w-3" />}
                              </span>
                            </div>
                            <ul className="mt-3 space-y-1">
                              {p.inclusions.slice(0, 4).map((inc) => (
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
                  </>
                )}

                {step === 3 && (
                  <>
                    <h3 className="mt-1 text-xl font-bold text-ink">
                      Let's get your details
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      We'll confirm your booking within 2 hours.
                    </p>
                    <div className="mt-5 space-y-3">
                      <Field
                        icon={User}
                        value={form.name}
                        onChange={set("name")}
                        placeholder="Full name"
                        aria-label="Full name"
                        maxLength={100}
                      />
                      <Field
                        icon={Phone}
                        type="tel"
                        value={form.phone}
                        onChange={set("phone")}
                        placeholder="Phone number"
                        aria-label="Phone number"
                        maxLength={20}
                      />
                      <Field
                        icon={Mail}
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                        placeholder="Email address"
                        aria-label="Email address"
                        maxLength={255}
                      />
                    </div>
                    <ul className="mt-4 space-y-2">
                      {[
                        "No payment required today",
                        "Usually confirmed within 2 hours",
                        "Speak directly with your mechanic",
                      ].map((t) => (
                        <li
                          key={t}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-signal"
                            aria-hidden
                          />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <div className="mt-6 flex gap-3">
                  {step > 0 && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-12 rounded-xl"
                      onClick={back}
                    >
                      <ArrowLeft className="mr-1 h-4 w-4" aria-hidden />
                      Back
                    </Button>
                  )}
                  <Button
                    size="lg"
                    className="h-12 flex-1 rounded-xl text-base font-semibold shadow-soft"
                    onClick={step === 3 ? () => setDone(true) : next}
                  >
                    {step === 3 ? "Get my inspection booked" : "Continue"}
                    <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                  </Button>
                </div>

                {step === 3 && (
                  <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <Lock className="h-3.5 w-3.5 text-signal" aria-hidden />
                    Your details are secure and never shared.
                  </p>
                )}
              </div>

              {/* Side card */}
              <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-background p-6 text-center">
                {step === 3 ? (
                  <>
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                      <ShieldCheck className="h-8 w-8 text-signal" aria-hidden />
                    </span>
                    <p className="mt-5 text-sm font-bold text-ink">
                      Your details are safe with us
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Encrypted, never sold, and only used to confirm your booking.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-accent">
                      <span
                        className="absolute h-24 w-24 rounded-full bg-card/70"
                        aria-hidden
                      />
                      <MapPin className="relative h-9 w-9 text-signal" aria-hidden />
                    </div>
                    <p className="mt-5 text-sm font-bold text-ink">
                      We service all Melbourne &amp; Sydney suburbs
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Adelaide coming soon. We travel to the seller, dealer or private.
                    </p>
                  </>
                )}
                <span className="mt-4 h-1 w-10 rounded-full bg-signal" aria-hidden />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
