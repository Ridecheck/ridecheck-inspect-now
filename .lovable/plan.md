## Recommendation

Yes — keep both, with different jobs:

- **Homepage "Let's check if this car is worth buying"** stays as the low-friction lead capture (no payment, 60 seconds). It's the soft entry for people still deciding.
- **Every "Book & Pay Online" button** (header, hero, package cards, sticky mobile bar, footer) points to a new in-app `/book` page that mirrors the ASAP Roadworthys flow and ends in a real card payment.

## The /book flow

Three steps with a progress header, styled in the RideCheck red/black/white theme (Poppins, rounded cards, red step ticks) — same visual language as the existing wizard, not a copy of ASAP's look.

```text
1. Your Booking      2. Availability        3. Confirm & Pay
   Service address      Date picker            Contact details
   Rego + state         Morning/afternoon      Order summary
   (or "No rego?" →     time slots             Card payment
    manual make/model)
   Service selection
```

**Step 1 — Your Booking**
- Service address (suburb/postcode + street)
- Rego field with a state selector (QLD/NSW/VIC/SA/WA/TAS/ACT/NT) and a "Go" button; no live lookup yet, so it just records the rego. A "No rego? Enter details manually" link reveals make/model/year fields.
- Service cards with icons: Standard Inspection $299, Premium Inspection $379 (marked Popular), pulled from the existing packages data so pricing stays in one place.

**Step 2 — Availability**
- Calendar with the next ~14 days selectable, weekends included
- Time slot chips (e.g. 8–10am, 10am–12pm, 12–2pm, 2–4pm), some shown unavailable for realism
- Note that we confirm within 2 hours

**Step 3 — Confirm & Pay**
- Name, phone, email
- Summary panel: service, price, vehicle, address, date/time
- Card payment button, then a success page with booking reference

## Payments

To take real card payments I'll enable Lovable's built-in Stripe payments (no Stripe account or API key needed from you — a test environment is created immediately so we can trial the flow with test cards; going live needs an account claim/verification step). Then I'll create the two products ($299 Standard, $379 Premium) and wire the confirm step to Stripe Checkout, returning to a `/book/success` page.

Note: payments requires a Lovable Pro plan.

## Data

As agreed, bookings won't be stored in a database for now — the booking details ride along with the Stripe checkout session as metadata, so you can see them against each payment. If you later want a bookings dashboard and email notifications, that's a follow-up.

## Technical notes

- New routes: `src/routes/book.tsx` (flow) and `src/routes/book.success.tsx`, each with its own SEO head metadata.
- Step components under `src/components/booking/` (StepAddressVehicle, StepAvailability, StepConfirm), with shared state in a small hook.
- Replace `BOOKING_URL` usage in `SiteHeader`, `Hero`, `Packages`, `StickyCta`, `SiteFooter` with `<Link to="/book">`; keep the phone CTAs unchanged.
- Homepage `BookingWizard` untouched, except its success screen gains a secondary "Book & pay online now" link into `/book`.
- Checkout session created via a `createServerFn` in `src/lib/checkout.functions.ts`; prices come from the Stripe product IDs, not the client.
