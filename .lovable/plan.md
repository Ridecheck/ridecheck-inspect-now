## Goal

Add a dedicated EV offer: a centred "Buying a used EV?" entry point under the Packages section, a full `/ev-inspections` page, and an EV path through the existing booking flow that only shows dates/windows where an Aviloo-certified inspector is actually available.

## 1. EV packages (new, separate tier)

Add an `evPackages` list in `src/lib/ridecheck.ts` so nobody can book a Standard and expect EV:

- **EV Battery Health Test — $250.** Aviloo State of Health test only. SoH %, remaining capacity, benchmarking, range vs original, official Aviloo PDF.
- **EV Inspection + Aviloo Battery Test — $489** (marked best value). Full pre-purchase inspection (exterior, interior, brakes, suspension, tyres), road test, full system fault scan, PPSR, paint-depth checks, photos, instant report, phone call with inspector, plus the certified Aviloo battery test and report.

The existing `$200 Aviloo` add-on gets removed from the standard checkout add-on list (it's now its own tier), leaving the Video Walkthrough add-on there. Standard/Premium copy gains one line: "Petrol, diesel and hybrid. For EVs and plug-in hybrids see EV inspections."

## 2. Entry point under Packages

Centred band below the two standard package cards on the homepage: short line "Buying a used EV?" + one-sentence hook about battery health being most of the car's value, and a pill CTA to `/ev-inspections`. Same red/ink theme, no new colours.

## 3. `/ev-inspections` page

New route with its own SEO head. Sections:

1. Hero — "Used EV inspections with certified Aviloo battery testing", CTA "Book EV inspection", coverage note (Melbourne / Sydney).
2. Why battery health matters — 3–4 short cards (battery is ~40% of value, dash range lies, degradation is invisible, warranty transfer traps).
3. What Aviloo tests — plain-English explainer of the SoH test and the PDF report.
4. The two EV package cards.
5. How it works (EV variant) — request, we match an EV-certified inspector, test performed on site, report same day.
6. EV FAQ — accordion (which EVs/PHEVs, how long the test takes, what SoH means, why availability is limited).
7. Closing CTA into the booking flow.

## 4. Booking flow: EV path with gated availability

Reuse the existing `/book` flow — no second checkout. Entry is `/book?type=ev`, and the booking state carries a `serviceType: "standard" | "ev"`.

- **Step 1** shows the EV package cards instead of Standard/Premium when `type=ev`, plus an EV-specific field: vehicle make/model and battery/drivetrain type (EV or PHEV). A small notice explains EV slots are limited because only Aviloo-certified inspectors can perform the test.
- **Step 2 (timing)** is the same request-and-confirm UI, but filtered through an EV capability layer.
- **Step 3 (review/pay)** is unchanged apart from the EV line items; the Aviloo add-on no longer appears for EV bookings (it's included/is the product).

### How the EV availability gating works

Extend `src/lib/availability.ts` with an EV-aware layer, keeping today's "open by default" behaviour for standard bookings:

- `evCoverage: Record<Region, boolean>` — which regions have Aviloo-certified inspectors at all (Melbourne + Sydney true, Adelaide false for now).
- `evOpenDays: Record<iso, Window[]>` — the only days/windows EV requests can be made. Unlike standard (open unless blocked), EV is **closed unless explicitly opened** — that matches a small certified pool.
- `isDayAvailable(iso, { serviceType, region })` and `windowsForDay(iso, { serviceType, region })` gain the same options object, so `StepTiming` needs no branching logic — it just greys out what the flags say.
- Region not EV-covered → the timing step shows a waitlist card instead of the day strip: "Aviloo testing isn't live in Adelaide yet — leave your details and we'll contact you when it is."
- Seed the mock with a realistic pattern (e.g. two to three EV days per week per region) so the prototype demonstrates the constraint, with a comment marking it as the swap point for the admin panel.

This keeps one funnel, one payment step, and one place (`availability.ts`) for your future admin panel to write EV rostering into.

## Technical notes

- Files: `src/lib/ridecheck.ts` (evPackages), `src/lib/booking.ts` (serviceType, add-on list), `src/lib/availability.ts` (EV flags), `src/routes/ev-inspections.tsx` (new), `src/routes/book.tsx` (serviceType from search params), `src/components/booking/StepBooking.tsx` + `StepTiming.tsx` + `BookingSummary.tsx`, `src/components/landing/Packages.tsx` (EV band), `SiteHeader.tsx` (nav link).
- No backend changes; EV flags stay mock data with a clear API swap point.
