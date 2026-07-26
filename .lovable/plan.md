Keep everything mocked — no backend, no Lovable Cloud. Restructure the availability step so it behaves like a real multi-mechanic calendar, and define the data shape your existing app can feed in later.

## 1. Model capacity, not a single yes/no slot

Today each hour is either available or not. Change the mock data in `src/lib/booking.ts` so each slot carries how many inspectors are free:

```text
slot = { label: "9 am – 10 am", capacity: 3, taken: 2, remaining: 1 }
```

The UI then shows honest scarcity instead of a flat grid:
- 2+ free: normal selectable slot
- exactly 1 free: "1 inspector left" in red
- 0 free: greyed with "Booked out" (replaces the current "Booked nearby")

## 2. Region-aware availability

A vehicle in a Melbourne suburb should only see Melbourne inspectors. Mock inspectors get a `regions` list (`melbourne`, `sydney`), and the suburb/postcode captured in step 1 picks which pool builds the calendar. If the suburb is outside coverage, the step shows an "Adelaide coming soon — request a callback" state instead of a dead calendar.

## 3. Better day strip

- Extend from 7 days to 14, horizontally scrollable, with a "Next week" jump.
- Each day chip shows price and a capacity dot: green (plenty), amber (filling), grey (full).
- Full days are dimmed and non-selectable rather than clickable-then-empty.
- Keep the existing ASAP and weekend surcharges.

## 4. Slot grid improvements

- Group slots under "Morning / Afternoon" headings.
- Show an arrival window ("9:00–10:00 arrival, ~90 min on site") so buyers understand it's not an exact-minute booking.
- Keep Fastest / Best price cards, but base them on real remaining capacity in the mock data.

## 5. Assignment shown at review

Auto-assign a mock inspector for the chosen slot and surface it on the review step: name, region, inspections completed, rating. This is the pattern your real app can fill in, and it makes the booking feel concrete.

## 6. A clean seam for your real app

All schedule logic lives in one place so swapping mock for live data is a single-file change.

```text
src/lib/booking.ts   ->  types + buildDays(...) reading from a provider
src/lib/schedule.mock.ts  ->  mock inspectors, working hours, existing jobs
```

`buildDays()` will take `{ region, packageName, days }` and return the same `Day[]` shape it does now, so no component changes are needed when the data becomes real. When your app is ready, the mock provider is replaced with a fetch to your API returning inspectors, their working hours and their booked jobs.

## Technical notes

- Files touched: `src/lib/booking.ts` (capacity/region-aware generator), new `src/lib/schedule.mock.ts` (inspectors, hours, jobs), `src/components/booking/StepAvailability.tsx` (day strip, grouped grid, capacity states), `src/components/booking/StepReview.tsx` (assigned inspector card), `src/routes/book.tsx` (pass region derived from suburb into `buildDays`).
- Availability stays deterministic (seeded) so the preview doesn't flicker between renders.
- No database, no auth, no payments — everything stays front-end.
