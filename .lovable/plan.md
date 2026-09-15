# Swap the order: inspection choice before dates

Right now the Check Availability pop-up asks for the day and time before the customer picks Standard or Premium. Since the day prices shown depend on which inspection is chosen, the package step should come first.

## New order

```text
1. Location + contact
2. Checking your area
3. Great news (area available)
4. Choose your inspection (Standard $299 / Premium $379)
5. Pick a day and time
6. Handoff to booking
```

## What changes

- The "Choose your inspection" screen moves ahead of the date/time screen.
- The date slider then shows prices that match the selected inspection, so nothing changes price after the customer picks a day.
- "Show available dates" on the success screen becomes a step into the inspection choice; the wording on that button is updated to match (e.g. "Choose your inspection").
- Back navigation, the progress bar, and the handoff summary (location, inspection, preferred time) all keep working in the new order.

## Technical notes

In `src/components/landing/CheckAvailabilitySheet.tsx`, swap the bodies of screen 3 and screen 4 so the package selection renders at index 3 and `StepTiming` at index 4, updating each Continue button's target index. The `availability` memo already derives from `selected.price`/`selected.popular`, so it will be built after the package is known. Reset `timing` to `null` when the selected package changes, so a stale day/time selection can't carry a price from the other package. Everything else (reveal animation, protected card, booking params) stays as-is.
