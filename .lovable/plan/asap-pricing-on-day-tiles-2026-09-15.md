# ASAP pricing on day tiles

When the customer taps the **Same or next day (ASAP)** option, the day slider should visually reflect what that priority dispatch costs.

## What changes

In `StepTiming` (the shared availability slider used in the booking flow and the Check Availability sheet):

1. **When ASAP is selected** (`value.mode === "asap"`):
   - Today's tile appears in the day slider (currently the slider hides today via `days.slice(1)`).
   - Today and tomorrow's tiles show the priority price — **base price + $55** (e.g. $354 / $434) — instead of their normal price.
   - Today and tomorrow's tiles get a small red **flame icon** next to the price, marking them as the ASAP-eligible days.
2. **When ASAP is not selected**: the slider behaves exactly as it does today — tomorrow onward, normal prices, no flames.

## Not changing

- The ASAP card itself (label, price, check state).
- Weekend-rate pricing on later days; normal day selection, time windows, week toggle.
- Handoff and booking page params — `timingMode: "asap"` is already passed through.

## Technical notes

- Single-file change in `src/components/booking/StepTiming.tsx`; use the existing `ASAP_SURCHARGE` constant and the already-imported `Flame` icon.
- Today is not selectable as a normal day tile (ASAP covers it); tapping the today tile while in ASAP mode keeps ASAP selected.
- Verify with `bunx tsc --noEmit` and a mobile Playwright pass: select ASAP, confirm today's tile appears with +$55 pricing and flame on today/tomorrow; deselect and confirm the slider returns to normal.
