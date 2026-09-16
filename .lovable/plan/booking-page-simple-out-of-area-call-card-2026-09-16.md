# Booking page: simple out-of-area call card

## Goal
When someone on the booking page enters an area we don't service and taps Continue, show one short call card instead of the full enquiry panel. The Check Availability popup keeps its existing out-of-area flow unchanged.

## Changes — `src/routes/book.tsx` only

1. Replace the current `OutOfAreaPanel` usage (step 0, uncovered) with a small inline card:
   - Small red car/pin accent consistent with existing styling.
   - Heading: "We might be able to help."
   - One line: "We don't currently have a local inspector in {suburb}, but give us a call and we'll see what we can do."
   - Primary red button: "Call 0424 287 403" — a direct `tel:` link using `PHONE_HREF` / `PHONE_DISPLAY` from `src/lib/ridecheck.ts`, so tapping opens the dialler immediately.
   - Text link below: "Try a different suburb" — returns to the normal booking form (`setOutOfArea(false)`).
   - No enquiry form, no notes field, no confirmation screen.

2. Remove now-unused code from the booking page:
   - `leadContact`, `leadNote`, `leadSent` state and their handlers.
   - The `OutOfAreaPanel` import (the panel itself stays — the Check Availability popup still uses it).
   - Keep `isAreaCovered` from `src/lib/coverage.ts` — the coverage rule is unchanged.

3. Keep everything else as is: covered suburbs flow to the timing step as normal; the hidden-conditions on the desktop Continue row and mobile bottom bar for the out-of-area state stay (the card carries its own actions).

## Not changing
- The Check Availability popup and its full out-of-area enquiry flow.
- The coverage rule, booking logic, pricing, or `/book` defaults.
- Landing and Sydney pages.
