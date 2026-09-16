import {
  ArrowRight,
  Check,
  Clock,
  DollarSign,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function parseContact(value: string) {
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

export function AvailabilityResultCard({
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

/**
 * The shared "We might be able to help." screen used by the Check
 * Availability popup and the booking flow when a location falls outside
 * coverage. Prototype only — the enquiry is simulated, nothing is stored.
 */
export function OutOfAreaPanel({
  suburb,
  contact,
  onContactChange,
  note,
  onNoteChange,
  sent,
  onSend,
  onEdit,
  onDone,
  doneLabel = "Back to home",
}: {
  suburb: string;
  contact: string;
  /** When provided, contact is editable inline (booking flow); otherwise it
   *  shows read-only with an Edit link (availability popup). */
  onContactChange?: (value: string) => void;
  note: string;
  onNoteChange: (value: string) => void;
  sent: boolean;
  onSend: () => void;
  onEdit: () => void;
  onDone: () => void;
  doneLabel?: string;
}) {
  if (sent) {
    return (
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
            <p className="text-sm font-bold text-ink">We'll be in touch soon</p>
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
          onClick={onDone}
          className="mt-7 h-12 w-full rounded-xl text-base font-semibold"
        >
          {doneLabel}
        </Button>
      </div>
    );
  }

  const contactValid = !onContactChange || parseContact(contact).isValid;

  return (
    <div className="py-4 text-center">
      <AvailabilityResultCard settled variant="car" />
      <h2 className="mt-4 text-xl font-extrabold text-ink">
        We might be able to help.
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        We don't currently have a local inspector in{" "}
        {suburb || "your area"}, but we may still be able to assist. This area
        may require a travel fee depending on the location.
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Leave your details below and we'll get in touch with options and a
        quote.
      </p>

      <div className="mt-5 rounded-2xl border border-border bg-haze p-4 text-left">
        <div className="flex items-center justify-between gap-3">
          <p className="flex min-w-0 items-center gap-2 text-sm font-semibold text-ink">
            <MapPin className="h-4 w-4 shrink-0 text-signal" aria-hidden />
            <span className="truncate">{suburb}</span>
          </p>
          <button
            type="button"
            onClick={onEdit}
            className="shrink-0 text-xs font-bold uppercase tracking-wider text-signal"
          >
            Edit
          </button>
        </div>

        {onContactChange ? (
          <div className="mt-3 border-t border-border pt-3">
            <label
              htmlFor="ooa-contact"
              className="block text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Email or mobile number
            </label>
            <Input
              id="ooa-contact"
              value={contact}
              onChange={(e) => onContactChange(e.target.value.slice(0, 254))}
              placeholder="you@example.com or 04xx xxx xxx"
              maxLength={254}
              className="mt-2 h-12 rounded-xl"
            />
          </div>
        ) : (
          <div className="mt-2 flex items-center justify-between gap-3 border-t border-border pt-2">
            <p className="flex min-w-0 items-center gap-2 text-sm text-ink">
              <Mail className="h-4 w-4 shrink-0 text-signal" aria-hidden />
              <span className="truncate">{contact}</span>
            </p>
            <button
              type="button"
              onClick={onEdit}
              className="shrink-0 text-xs font-bold uppercase tracking-wider text-signal"
            >
              Edit
            </button>
          </div>
        )}

        <label
          htmlFor="ooa-lead-note"
          className="mt-4 block text-xs font-bold uppercase tracking-wider text-muted-foreground"
        >
          Anything we should know? (optional)
        </label>
        <Textarea
          id="ooa-lead-note"
          value={note}
          onChange={(e) => onNoteChange(e.target.value.slice(0, 500))}
          placeholder="e.g. where the car is, when you need it, or any other details…"
          maxLength={500}
          className="mt-2 min-h-[76px] rounded-xl"
        />
      </div>

      <Button
        size="lg"
        disabled={!contactValid}
        onClick={onSend}
        className="mt-6 h-12 w-full rounded-xl text-base font-semibold"
      >
        Send enquiry
        <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
      </Button>
      <button
        type="button"
        onClick={onEdit}
        className="mt-3 w-full text-sm font-semibold text-muted-foreground"
      >
        Try a different suburb
      </button>
    </div>
  );
}
