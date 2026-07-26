import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { BookingProgress } from "@/components/booking/BookingProgress";
import { StepBooking, type BookingDetails } from "@/components/booking/StepBooking";
import {
  StepTiming,
  timingLabel,
  ASAP_SURCHARGE,
  type Timing,
} from "@/components/booking/StepTiming";
import { StepReview, type ContactDetails } from "@/components/booking/StepReview";
import { addOns, buildAvailability } from "@/lib/booking";
import { packages, PHONE_DISPLAY, PHONE_HREF } from "@/lib/ridecheck";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { StripeEmbeddedCheckout } from "@/components/StripeEmbeddedCheckout";
import logoAsset from "@/assets/ridecheck-logo.png.asset.json";

const TITLE = "Book a Pre-Purchase Car Inspection | RideCheck";
const DESCRIPTION =
  "Book a mobile pre-purchase car inspection in Melbourne or Sydney. Choose your vehicle, pick a time from live availability, pay securely and we confirm within 2 hours.";

type BookSearch = {
  suburb?: string;
  postcode?: string;
  vehicle?: string;
  listing?: string;
  pkg?: string;
  name?: string;
  phone?: string;
  email?: string;
  paid?: string;
};

const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);

export const Route = createFileRoute("/book")({
  validateSearch: (search: Record<string, unknown>): BookSearch => ({
    suburb: str(search.suburb),
    postcode: str(search.postcode),
    vehicle: str(search.vehicle),
    listing: str(search.listing),
    pkg: str(search.pkg),
    name: str(search.name),
    phone: str(search.phone),
    email: str(search.email),
    paid: str(search.paid),
  }),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BookPage,
});

const stepLabels = ["Your booking", "Availability", "Confirm"];

function BookPage() {
  const prefill = Route.useSearch();
  const prefilledPkg =
    packages.find((p) => p.name.toLowerCase() === prefill.pkg?.toLowerCase())?.name ??
    packages.find((p) => p.popular)?.name ??
    packages[0].name;

  const [step, setStep] = useState(
    prefill.suburb && prefill.vehicle ? 1 : 0,
  );
  const [paying, setPaying] = useState(false);
  const [done, setDone] = useState(prefill.paid === "1");

  const [details, setDetails] = useState<BookingDetails>({
    suburb: prefill.suburb ?? "",
    postcode: prefill.postcode ?? "",
    rego: "",
    state: "VIC",
    vehicle: prefill.vehicle ?? "",
    listing: prefill.listing ?? "",
    pkg: prefilledPkg,
  });
  const [timing, setTiming] = useState<Timing>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [contact, setContact] = useState<ContactDetails>({
    name: prefill.name ?? "",
    phone: prefill.phone ?? "",
    email: prefill.email ?? "",
    notes: "",
    agreed: false,
  });


  const pkg = packages.find((p) => p.name === details.pkg) ?? packages[0];
  const availability = useMemo(
    () =>
      buildAvailability({
        basePrice: pkg.price,
        suburb: details.suburb,
        postcode: details.postcode,
        premiumRequired: Boolean(pkg.popular),
      }),
    [pkg.price, pkg.popular, details.suburb, details.postcode],
  );
  const days = availability.days;
  const chosenDay = timing?.mode === "day" ? days.find((d) => d.iso === timing.iso) : undefined;

  const chosenAddOns = addOns.filter((a) => selectedAddOns.includes(a.id));
  const surcharge =
    timing?.mode === "asap" ? ASAP_SURCHARGE : (chosenDay?.surcharge ?? 0);
  const surchargeLabel =
    timing?.mode === "asap" ? "ASAP priority" : (chosenDay?.tag ?? "Surcharge");
  const total =
    pkg.price + surcharge + chosenAddOns.reduce((sum, a) => sum + a.price, 0);

  const canContinue =
    step === 0
      ? details.suburb.trim() !== "" && details.vehicle.trim() !== ""
      : step === 1
        ? timing !== null
        : contact.name.trim() !== "" &&
          contact.phone.trim() !== "" &&
          contact.email.trim() !== "" &&
          contact.agreed;

  const summary = (
    <BookingSummary
      rows={[
        { label: "Service", value: pkg.name },
        {
          label: "Vehicle",
          value:
            [details.vehicle, details.rego && `(${details.rego} ${details.state})`]
              .filter(Boolean)
              .join(" ") || "Not set yet",
        },
        {
          label: "Location",
          value:
            [details.suburb, details.postcode].filter(Boolean).join(" ") ||
            "Not set yet",
        },
        {
          label: "When",
          value: timingLabel(timing, days),
        },
      ]}
      charges={[
        { label: pkg.name, value: `$${pkg.price}` },
        ...(surcharge
          ? [{ label: surchargeLabel, value: `$${surcharge}` }]
          : []),
      ]}
      addOnList={chosenAddOns}
      total={total}
    />
  );

  return (
    <div className="min-h-screen bg-haze pb-28 sm:pb-0">
      <PaymentTestModeBanner />
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <Link to="/" aria-label="RideCheck home">
            <img
              src={logoAsset.url}
              alt="RideCheck Vehicle Inspections"
              width={398}
              height={101}
              className="h-9 w-auto sm:h-10"
            />
          </Link>

          <div className="hidden md:block" />

          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 text-sm font-semibold text-ink"
          >
            <Phone className="h-4 w-4 text-signal" aria-hidden />
            <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
          </a>
        </div>
      </header>

      {done ? (
        <main className="mx-auto max-w-xl px-5 py-16 text-center sm:px-8">
          <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent">
            <Check className="h-8 w-8 text-signal" aria-hidden />
          </span>
          <h1 className="mt-6 text-3xl font-extrabold text-ink">
            Payment received — booking confirmed
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We're matching you with your nearest inspector. You'll get an SMS with your
            confirmed time within 2 hours.
          </p>
          <ul className="mt-6 space-y-2 text-left">
            {[
              "Payment complete",
              "Your inspector calls to confirm access with the seller",
              "Free cancellation up to 24 hours before",
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
          <Button asChild variant="outline" className="mt-8 h-12 w-full rounded-xl">
            <Link to="/">Done</Link>
          </Button>
        </main>
      ) : (
        <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
              {step === 0
                ? "Book your inspection"
                : step === 1
                  ? "Select a time"
                  : "Review and confirm"}
            </h1>
            <p className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
              <Clock className="h-3.5 w-3.5 text-signal" aria-hidden />
              Takes about 2 minutes · secure payment
            </p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <div className="min-w-0 rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-8">

              {step === 0 && (
                <StepBooking
                  value={details}
                  onChange={(patch) => setDetails((d) => ({ ...d, ...patch }))}
                />
              )}
              {step === 1 && (
                <StepTiming
                  days={days}
                  basePrice={pkg.price}
                  value={timing}
                  onChange={setTiming}
                />
              )}
              {step === 2 && paying && (
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => setPaying(false)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-ink"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden />
                    Back to your details
                  </button>
                  <StripeEmbeddedCheckout
                    amountInCents={total * 100}
                    description={`${pkg.name} — ${details.vehicle || "vehicle"} · ${details.suburb || "Melbourne"}`}
                    customerEmail={contact.email || undefined}
                    returnUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/book?paid=1`}
                  />
                </div>
              )}
              {step === 2 && !paying && (
                <StepReview
                  inspector={null}
                  value={contact}
                  onChange={(patch) => setContact((c) => ({ ...c, ...patch }))}
                  selectedAddOns={selectedAddOns}
                  onToggleAddOn={(id) =>
                    setSelectedAddOns((prev) =>
                      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
                    )
                  }
                />
              )}

              <div className={`mt-8 gap-3 ${paying ? "hidden" : "hidden sm:flex"}`}>
                {step > 0 && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 rounded-xl"
                    onClick={() => setStep((s) => s - 1)}
                  >
                    <ArrowLeft className="mr-1 h-4 w-4" aria-hidden />
                    Back
                  </Button>
                )}
                <Button
                  size="lg"
                  disabled={!canContinue}
                  className="h-12 flex-1 rounded-xl text-base font-semibold shadow-soft"
                  onClick={() => (step === 2 ? setPaying(true) : setStep((s) => s + 1))}
                >
                  {step === 2 ? `Pay $${total}` : "Continue"}
                  <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                </Button>
              </div>
            </div>

            <div className="lg:sticky lg:top-8 lg:self-start">{summary}</div>
          </div>
        </main>
      )}

      {!done && !paying && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-3 backdrop-blur sm:hidden">
          <div className="flex gap-2">
            {step > 0 && (
              <Button
                variant="outline"
                size="lg"
                className="h-12 rounded-xl px-4"
                onClick={() => setStep((s) => s - 1)}
                aria-label="Back"
              >
                <ArrowLeft className="h-5 w-5" aria-hidden />
              </Button>
            )}
            <Button
              size="lg"
              disabled={!canContinue}
              className="h-12 flex-1 rounded-xl text-base font-semibold"
              onClick={() => (step === 2 ? setPaying(true) : setStep((s) => s + 1))}
            >
              {step === 2 ? `Pay $${total}` : "Continue"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
