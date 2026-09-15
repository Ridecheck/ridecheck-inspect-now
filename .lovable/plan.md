# Green "lit up" success card on the availability success screen

## What changes

On the Check Availability success screen (screen 2 of the sheet — the card showing the suburb + "Mobile inspection available"), the plain grey square lights up green as a positive confirmation:

- Card becomes a green success card: soft green background tint, green border, and a subtle green glow shadow — using the existing `--protected` green tokens (same green family as the "You're protected" card).
- The check icon next to "Mobile inspection available" turns green and gets a small pop-in as the card appears (consistent with the existing reveal, disabled under reduced motion).
- The location pin keeps its RideCheck red so the brand stays present; only the confirmation state goes green.
- The card lights up as it enters (gentle scale/fade + glow bloom, ~400ms), so the success moment reads as "confirmed, go ahead".

## Files touched

- `src/components/landing/CheckAvailabilitySheet.tsx` — screen 2 info card classes + icon color.
- `src/styles.css` — one scoped utility/keyframe for the green glow + pop-in; reduced-motion fallback.

## Not changing

- The envelope/animation reveal, headings, wording, day slider, package step, handoff, protected card, sticky tab, or the landing page.
