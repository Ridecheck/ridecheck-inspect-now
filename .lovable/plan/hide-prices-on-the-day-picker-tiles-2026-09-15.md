# Hide prices on the day picker tiles

The concern was that day tiles show prices before the customer has chosen Standard or Premium. Simplest fix: remove prices from the day tiles entirely, keeping the current step order.

## What changes

- On the Check Availability pop-up's date screen, each day tile shows only the day name, date, and availability (Available / Limited / Booked out) — no price.
- Prices then appear only where the package is known: the Standard $299 / Premium $379 cards and the final handoff summary.
- Everything else in the pop-up stays the same: checking animation, success card, package choice, morning/afternoon windows, and the booking handoff.

## Not changing

- The main booking flow at /book keeps prices on its day tiles as it does today — this change is scoped to the pop-up.

## Technical notes

Add an optional `hidePrices` prop to `StepTiming` in `src/components/booking/StepTiming.tsx`; when true, the price line (including any surcharge/weekend price) is not rendered. `CheckAvailabilitySheet.tsx` passes `hidePrices`. Default remains false so /book is untouched.
