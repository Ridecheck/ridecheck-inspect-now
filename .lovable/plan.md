# Availability nudge + phone helper on the sticky bar

Implements the 7-step sequence from the reference flow. Only the sticky bottom bar area changes; the landing page, the availability sheet and the booking flow stay as they are.

## The sequence

1. **Land on the page** — bottom bar and the Check Availability tab look exactly as they do now. No nudge.
2. **Scroll about 30%** — a small message appears just above the tab: "Not sure if we cover your area?" with "Check availability below" and a downward arrow, plus a small close (x). Soft pink card, no icons.
3. **Subtle pulse** — as the nudge appears, the Check Availability tab gently pulses for roughly 4–5 seconds to draw the eye.
4. **It goes away** — the nudge closes on its own after about 6 seconds, or immediately if the person taps the x, taps outside, or opens the availability sheet. The tab stays. It only shows once per visit.
5. **Tap the phone button** — a small speech bubble appears above it: "Need help with your booking?", "Give us a call" and the number 0424 287 403 in red, with its own close (x). Tapping the number still dials.
6. **Tap anywhere outside** — the bubble closes and the bar returns to normal.
7. **Tap Check Availability** — the existing availability flow opens unchanged, and any nudge or bubble closes first.

## Details

- The nudge never covers the Book Inspection button; it sits above the tab and pushes nothing.
- Once dismissed or once the sheet has been opened, the nudge does not return for the rest of the session.
- Reduced-motion settings skip the pulse and fade; the nudge simply appears and disappears.
- Mobile only, matching the current sticky bar.

## Technical notes

- All work in `src/components/landing/StickyCta.tsx`; the phone button becomes a button with an anchor inside a small popover-style bubble rather than a plain link.
- Scroll trigger: a passive `scroll` listener firing once past 30% of scrollable height, with a short delay; timers cleared on unmount.
- Session-once state held in component state plus `sessionStorage` so it doesn't re-fire on route changes back to home.
- Pulse and fade added as scoped keyframes/utilities in `src/styles.css` using existing `--signal` tokens; no new colours.
- Verified at phone size with Playwright: scroll triggers the nudge, pulse runs, auto-dismiss works, phone bubble opens/closes, and the availability sheet still opens cleanly.
