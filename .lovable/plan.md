# Fix wrong "Great news!" heading in the out-of-area flow

## Problem

On the checking screen (screen 1), the settled heading after the card opens is hardcoded to `"Great news!"` / `"We can inspect your area."` for both paths. When the location is NOT covered, the card bursts open and shows "Great news!" for about 1.3 seconds before screen 2 correctly says "We might be able to help." — a false promise.

`src/components/landing/CheckAvailabilitySheet.tsx`, lines ~392–405.

## Fix

Make the settled heading and subtitle on screen 1 depend on `covered`:

- Covered: unchanged — "Great news!" / "We can inspect your area."
- Not covered: "Got your answer." / "Here's what we found." (neutral, honest, no promise)

No other changes: screen 2's "We might be able to help." copy, the car reveal variant, timings, and all other screens stay exactly as they are.

## Validation

- Playwright on 384×692 with suburb "test": screen 1 settled frame shows "Got your answer.", then screen 2 "We might be able to help." — no page errors.
- Spot-check a covered suburb (e.g. Clayton) still shows "Great news!".
- Typecheck clean.
