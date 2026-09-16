# Mobile assistance prompts and one-tap calling

Keep the current Check Availability tab and sticky Book Inspection bar visually unchanged while refining the supporting mobile interactions.

## Changes

- Restore the small phone icon as a direct `tel:` link so one tap immediately opens the device dialler.
- Keep the existing availability discovery callout, trigger it around 30% page scroll, and automatically dismiss it after about five seconds.
- Add a one-time hesitation prompt after roughly 50 seconds of meaningful page engagement, provided the visitor has not opened availability or started booking.
- Add a one-time “Need a hand?” prompt inside the availability flow after roughly 12 seconds of inactivity following location entry or interaction.
- Reset the inactivity timer whenever the visitor types, selects, navigates, or continues; close the prompt on progress, sheet close, dismissal, navigation, or calling.
- Enforce one visible prompt at a time and remember shown or dismissed prompts for the current browser session.
- Use the existing red, white, black, rounded, softly shadowed style and current subtle fade/slide animation; no overlays or aggressive motion.

## Technical notes

- Coordinate prompt state in `StickyCta` and expose minimal interaction/progress callbacks from `CheckAvailabilitySheet`.
- Treat opening availability or following `/book` as conversion intent, suppressing the hesitation prompt for the rest of the session.
- Keep all booking, availability, payment, tracking, pricing, and handoff logic unchanged.
- Verify on a phone viewport: direct dial link, scroll prompt timing, hesitation suppression, availability inactivity prompt reset/dismissal, prompt exclusivity, and persistent sticky CTAs.
