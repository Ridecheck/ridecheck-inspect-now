# Advertise the +$35 weekend rate in the Check Availability flow

## Goal

Make the +$35 weekend rate visible inside the mobile Check Availability pop-up,
so nobody reaches the payment screen surprised by a higher price. The main
booking page (`/book`) already shows "Weekend rate applies — +$35" and stays
as-is.

## What changes

All changes are inside `StepTiming` and the pop-up, behind the existing
`hidePrices` pop-up mode so `/book` is untouched.

1. **Weekend note in the pop-up day picker** (`src/components/booking/StepTiming.tsx`)
   - When `hidePrices` is on and the selected day is a weekend, show the same
     line the booking page uses: "Weekend rate applies — +$35" beneath the
     day slider.
   - It already renders when `!hidePrices`; extend it to also render in
     `hidePrices` mode so the disclosure exists even without tile prices.

2. **Small "+$35" marker on weekend day tiles (pop-up only)**
   - When `hidePrices` and `highlightAvailability` are on, weekend day tiles
     show a small "+$35" tag under the "Available" / "Limited spots" label.
   - Weekday tiles show nothing — the base price stands.

3. **Honest handoff summary** (`src/components/landing/CheckAvailabilitySheet.tsx`)
   - On the final "You're all set!" screen, the "Inspection" summary row shows
     the actual price the customer will pay (package price + $35 when a weekend
     day is chosen), so the carried-over price matches the pay screen.

## Not changing

- The landing page, `/sydney`, and `/book` layout — untouched.
- Weekend rate amount or logic in `src/lib/booking.ts` (+$35 stays).
- Green/amber "Available" / "Limited spots" treatment on the tiles.

## Technical notes

- `buildAvailability` already sets `day.tag === "Weekend rate"` and
  `day.surcharge === 35`; we read those, no new pricing logic.
- The weekend note and tile tag use existing muted/signal design tokens.

## Validation

- Mobile viewport (384x692): run the pop-up, pick a Saturday/Sunday, confirm
  the "+$35" tag, the weekend note, and the handoff price all appear; pick a
  weekday and confirm none appear.
- Spot-check `/book` renders its existing weekend note unchanged.
- Typecheck and build pass; no page errors.
