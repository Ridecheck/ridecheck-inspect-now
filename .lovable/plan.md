# Animated availability success reveal

Add a two-stage success animation inside the existing mobile Check Availability sheet, inspired by the supplied red envelope/card reference. The landing page and the rest of the funnel remain unchanged.

## Sequence

1. Keep the current three-step coverage check.
2. When checking completes, hold briefly on a centered red result card with the message “Checking complete” and a subtle bounce/glow to build anticipation.
3. The card opens automatically: a white result slip with a checkmark rises out, while a small burst of red streamers and paper pieces travels outward.
4. Settle into the existing “Great news” screen, with the animated card above the current location, availability message, and Continue button.

## Motion and presentation

- Build the card, checkmark, streamers, and paper pieces from lightweight HTML/CSS and existing icons; no emoji or heavy animation dependency.
- Keep the burst brief and polished rather than celebratory overload: roughly 0.8 seconds after a short anticipation pause.
- Add soft red glow and small card movement without changing RideCheck’s current colours or typography.
- Respect reduced-motion settings by skipping the bounce and burst, revealing the completed state immediately.
- Ensure the animation remains contained within the mobile sheet and does not shift the sheet controls or success details.

## Technical details

- Extend `CheckAvailabilitySheet.tsx` with a short reveal phase between checking and the existing success state.
- Add scoped keyframes and semantic animation utilities to `src/styles.css` for the card rise, slip reveal, confetti burst, and settled state.
- Clear all reveal timers when the sheet closes or the screen changes, so reopening always starts cleanly.
- Verify the full mobile flow, including closing during animation, replaying after reopening, reduced motion, and continuing to package selection.

## Not changing

The sticky tab, location/contact form, package selection, booking handoff, desktop experience, and the existing landing page remain untouched.
