## What's worth adopting from ASAP Roadworthys

Their funnel works because of four things, all of which we can do without taking payments yet:

1. **Progress header with urgency** — three labelled steps (Your Booking / Availability / Confirm) plus a "2:34 mins to reserve your booking" timer.
2. **Two headline slot cards** — "Fastest / Selling Fast" (today, premium price) vs "Best Price" (a few days out, cheaper). This is the real upsell: dynamic pricing nudges, "Only 1 slot remaining".
3. **A 7-day calendar strip + hourly time grid** — each day shows a price, unavailable hours are greyed as "BOOKED NEARBY", the chosen slot is highlighted.
4. **A persistent "Your booking so far" summary panel** — service, vehicle, location, when, itemised fees, total, promo code — plus add-on upsell tiles and risk-free-cancellation reassurance.

## Plan: a `/book` route in the RideCheck theme

### Step 1 — Your booking
- Address / suburb + postcode
- Rego + state selector (VIC / NSW / SA / other)
- Vehicle make, model, year (or listing link)
- Service choice: Standard $299 / Premium $379, pulled from `src/lib/ridecheck.ts`

### Step 2 — Availability
- Two hero slot cards: **Fastest** (earliest slot, red badge) and **Best Price** (a later day, "Save $X")
- 7-day scrollable date strip, each day showing its price
- Hourly slot grid (8am–4pm), unavailable ones greyed with "Booked nearby"
- Sticky bottom bar: back arrow + `Review — $299`

### Step 3 — Review & confirm
- Contact details (name, phone, email)
- "Help us prepare for arrival" notes textarea
- **Add-on upsells** as tiles: PPSR history report, extended road test, cold-start video, post-inspection mechanic call — each with a price and a + button that updates the total
- Inspector card (name, rating, "verified"), risk-free cancellation banner, T&Cs checkbox
- Promo code field (visual only for now)
- Final button: **Request booking** — no card fields, no payment. Confirmation screen mirrors the existing wizard's success state ("we'll confirm within 2 hours, no payment required today").

### Persistent side panel
Sticky "Your booking so far" card (dark ink background, red labels) visible on all three steps on desktop, collapsible summary bar on mobile.

### Wiring
- All "Book & Pay Online" CTAs (Hero, Packages, SiteHeader, StickyCta, SiteFooter) relabelled **Book Inspection** and pointed at `/book`.
- Homepage "Let's check if this car is worth buying" wizard stays as the low-friction lead capture; its final button will hand off into `/book` with the chosen package prefilled.

### Technical notes
- New route `src/routes/book.tsx` plus components under `src/components/booking/` (`StepBooking`, `StepAvailability`, `StepReview`, `BookingSummary`, `SlotCalendar`).
- Availability is generated client-side from a deterministic mock (weekend/today surcharge, some slots marked booked) in `src/lib/booking.ts` — easy to swap for a real backend later.
- Step and selections held in URL search params so back/forward and refresh work.
- No database and no payment provider in this pass; the submit handler just shows the confirmation state. Adding Cloud storage + Stripe later slots into the same final step.

Prices shown: $299 Standard / $379 Premium. Same-day slots get a small surcharge shown as "ASAP rate" only if you want that — say the word and I'll leave prices flat instead.
