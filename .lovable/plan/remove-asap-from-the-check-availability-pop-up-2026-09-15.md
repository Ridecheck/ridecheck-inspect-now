# Remove ASAP from the Check Availability pop-up

## Why

ASAP (same/next day + $55 priority fee) isn't offered yet, so it shouldn't appear in the mobile Check Availability pop-up. The main `/book` flow keeps ASAP for now — it will be switched on in the pop-up later when demand exists.

## Current state

- The timing screen in the pop-up reuses `StepTiming` (`src/components/booking/StepTiming.tsx`), shared with the `/book` booking flow.
- `StepTiming` currently always renders: the ASAP card (flame badge, "+$55", priority dispatch copy), the flame icon and priority price on today/tomorrow tiles when ASAP is selected, and hides today's tile unless ASAP is selected.

## Changes

1. `src/components/booking/StepTiming.tsx`
   - Add an optional prop `showAsap?: boolean` (default `true`) so the existing `/book` flow is unchanged.
   - When `showAsap` is false:
     - Skip rendering the ASAP card entirely.
     - Always show the day slider starting from tomorrow (`days.slice(1)`), ignore the flame/priority-price treatment on day tiles, and never set an ASAP timing.
2. `src/components/landing/CheckAvailabilitySheet.tsx`
   - Pass `showAsap={false}` to `StepTiming` on the date-selection screen.
   - No other flow changes: progress bar, success reveal, package step, handoff, and the params passed to `/book` stay as they are (handoff already only ever sends a day-mode timing from this screen).

## Not changing

- The `/book` booking flow — it keeps the ASAP card and priority pricing.
- The sticky tab, location/contact form, checking animation, success screens, package selection, handoff, and the landing page.
- No copy or pricing changes anywhere else.

## Validation

- Typecheck (`tsgo --noEmit`) and build pass.
- Playwright on a phone-sized viewport: run the sheet through location → checking → success → dates and confirm the ASAP card is gone, today's tile stays hidden, days and morning/afternoon still select, and Continue → package → handoff still reaches `/book` with the chosen day.
- Spot-check `/book` directly to confirm ASAP still renders there.
