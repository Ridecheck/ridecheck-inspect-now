# Outside-coverage path in the Check Availability sheet

## Problem
The mobile Check Availability flow currently always succeeds: `buildAvailability` falls back to the Melbourne region when a suburb/postcode is unknown, so users outside coverage never see a "we don't service your area" screen. This adds that path (screens 9–10 of the reference flow) with a "we'll get in touch" capture.

## Coverage rule
- A location is covered when `regionFromLocation(suburb, postcode)` from `src/lib/schedule.mock.ts` returns a region (Melbourne/Sydney/Adelaide hints, or postcodes starting 3/2/5).
- Unknown suburbs or postcodes outside those ranges → outside coverage.
- The sheet determines this itself by calling `regionFromLocation` directly. `/book` and `buildAvailability` stay untouched (their Melbourne fallback remains).

## Flow changes (`src/components/landing/CheckAvailabilitySheet.tsx`)
1. Compute `covered = regionFromLocation(suburb, postcode) !== null` after screen 0.
2. Screen 1 (checking) plays as today — same checklist, same card. For uncovered results, the card stays closed: no wiggle-burst, no confetti, no "Great news". Headings: "Checking your area…" → "Checking complete" → transition to the outside-coverage screen.
3. New screen 2B — outside coverage (replaces the success screen when not covered):
   - Subdued envelope: closed card, soft neutral glow, no confetti, no burst animation.
   - Heading: "We might be able to help."
   - Copy (honest, no-nonsense): "We don't currently inspect in {suburb}, but we're adding areas. Leave your details and we'll get in touch when we cover you."
   - Location chip with the entered suburb (red map pin, like the success card but neutral styling).
   - Contact is pre-filled from screen 0 (shown read-only with an "Edit" link that returns to screen 0).
   - Optional free-text "Anything we should know?" field (car location, timeline).
   - Primary button "Get in touch" → confirmation state: "Thanks — we'll be in touch." with a check mark, and a "Done" button that closes the sheet.
   - Secondary link: "Try a different suburb" → back to screen 0.
4. Progress bar segment count unchanged; the uncovered path renders on the same segment.

## Lead capture
Prototype only, consistent with the rest of the flow: the submission is simulated (no network call, no backend table). Nothing is sent or stored — same as the current booking handoff, which is still a judgment prototype.

## Not changing
- The landing page (home + Sydney), the booking flow `/book`, the success animation, package step, handoff, sticky tab, StepTiming, weekend/limited tile logic.
- Reduced-motion behavior: uncovered path transitions immediately like the success path does.

## Validation
- Playwright on a phone viewport (384×692): type an uncovered suburb (e.g. "Perth" or postcode "4000") → checks run → card stays closed → "We might be able to help." screen renders with pre-filled contact → Get in touch → confirmation → Done closes the sheet.
- Type a covered suburb (e.g. "Clayton, VIC 3168") → success flow unchanged end-to-end.
- `/book` still treats unknown suburbs as Melbourne.
- Typecheck + build OK, no console errors.
