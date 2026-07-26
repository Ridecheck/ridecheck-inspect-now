## Goal

Two emails fire when a booking is paid:

1. **Customer booking confirmation** — sent to the buyer.
2. **Internal job alert** — sent to the RideCheck ops inbox with everything needed to dispatch an inspector.

Both are built as real, brand-styled templates in the project so they send for real once the sender domain is verified. Until then you can preview them from the Cloud dashboard without sending.

## Prerequisites (I handle these, no code for you)

The project currently has no backend and no email setup. Two things have to be turned on first:

- **Lovable Cloud** — required for any email sending.
- **A sender domain you own** — e.g. `notify.vehicleinspect.com.au`. I'll open the setup dialog; you add the DNS records it shows. Emails start sending once it verifies. There is no free shared sender domain.

Scaffolding and template work can proceed while DNS is still propagating.

## Email 1 — Booking confirmation (customer)

Subject: `Your RideCheck inspection is booked — [vehicle]`

Contents:
- RideCheck logo, red/black brand styling matching the site.
- "Booking confirmed" heading and a short line explaining that an inspector is being matched and they'll get an SMS with the inspector's name and ETA.
- Booking details block: reference number, vehicle, seller/vehicle location, timing (ASAP or the chosen day + AM/PM window), package name, any add-ons, total paid.
- For EV bookings: an extra line noting the Aviloo battery health test is included and that an Aviloo-certified inspector will be assigned.
- What happens next — 3 short steps (matched → inspected on site → same-day report).
- Contact footer with the phone number and a link back to the site.

## Email 2 — Internal job alert (ops)

Subject: `New booking — [suburb] — [vehicle] — [ASAP / day + window]`

Plain, dense, scannable — no marketing styling:
- Reference, timestamp, service type (standard / EV).
- Customer name, phone, email.
- Vehicle description and listing link if supplied.
- Vehicle location: address/suburb/postcode, region.
- Package, add-ons, total paid, payment status.
- Any notes the customer left.

Recipient is a single configurable ops address so it can be changed without a rebuild.

## Trigger

The send happens server-side after the Stripe payment succeeds, at the same point the flow currently shows the success screen — not from the browser. Each send uses an idempotency key derived from the booking reference so a retry or page refresh can't double-send.

## Mock/preview

Both templates get realistic preview data (a Melbourne Standard booking, and an EV booking with the Aviloo test) so they render fully in the Cloud email preview before any real send. That's how you'll review the design.

## Technical notes

- Templates as React Email `.tsx` components in `src/lib/email-templates/`, registered in the scaffolded registry.
- Sending via the scaffolded `sendTemplateEmail` helper called from a TanStack server function; no queue, cron, or email tables are created — delivery, retries, suppression and unsubscribe are handled by the platform.
- A booking reference is generated server-side at payment confirmation and threaded into both emails.

## Not included

- No booking records stored in a database yet — the emails are built from the booking payload at payment time. If you want a bookings table and an admin view later, that's a separate piece of work.
- No SMS. The confirmation email references SMS as the next step, but sending it isn't in scope here.
