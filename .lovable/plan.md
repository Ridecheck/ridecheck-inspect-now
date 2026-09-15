# Card-to-car reveal for the out-of-area flow

Reference panels 3 and 4: the red card opens and a car rises out of it, then the result screen shows that car with a red location pin and dotted trail.

## What changes

1. **Reveal (end of the checking screen, out-of-area only)**
   - Instead of the white check slip rising out of the card, a car rises up out of the open card, scaling slightly and settling above the card edge.
   - Small red accent strokes above the car, matching the reference.
   - Heading during this moment: "Just a moment…" / "We're finalising your result." (already in place).
   - Timing stays roughly as now: the card wiggles through the checks, opens, the car rises, everything settles in about 1.3 seconds.

2. **Result screen ("We might be able to help.")**
   - Replaces the closed card currently shown at the top with the settled car illustration: car on a soft red halo, a red map pin to its upper-right, and a short dashed red trail curving from the car to the pin.
   - The pin and trail draw in shortly after the screen appears, then hold.

3. **Covered flow is untouched** — the "Great news!" path keeps the white check card exactly as it is today.

## Technical notes

- Work is confined to `src/components/landing/CheckAvailabilitySheet.tsx` and the scoped `availability-*` rules in `src/styles.css`.
- Add a `variant` ("check" | "car") prop to `AvailabilityResultCard`. In "car" mode the slip content is the existing `RideCheckCarMark` (scaled up, red on white, no white slip background) plus the accent strokes; reuse the existing lid-open, rise, glow and settle keyframes so motion stays consistent.
- The out-of-area branch passes the car variant for both the checking screen and the settled result screen; the covered branch keeps the default.
- Pin and trail are inline SVG using existing tokens (`--signal`), animated with a short fade/draw; no new colours or images. The photographic car in the reference is not used — the brand car mark keeps it lightweight and on-brand.
- Reduced-motion continues to skip all reveal animation and show the settled composition immediately.
- Verify on a phone-sized screen: suburb "test" plays the card-to-car reveal and lands on the result screen with pin and trail; a covered suburb still shows the unchanged check-card celebration.
