# Out-of-area screen inside the booking flow

Yes — the booking flow should use the same "we don't service your area" experience as the Check Availability popup. Today the booking flow silently treats every unknown suburb as Melbourne, so someone outside coverage sees dates they can't actually book.

## What changes

- When a visitor enters their suburb/postcode on step 1 of the booking flow and taps Continue, the same coverage check used in the Check Availability popup runs.
- Covered area: nothing changes — they continue to the next step as normal.
- Not covered: instead of moving on, the step swaps to the popup's existing "We might be able to help." screen — same wording, location row, contact field, optional note, "Send enquiry" button, "Try a different suburb" link, and the "Thanks!" confirmation. The booking stops there; no dates or prices are shown.
- Going back or trying a different suburb returns them to step 1 to edit the location.

## Coverage rule

Same behaviour as the popup, via one shared check both flows call: covered by default; only the literal word "test" or clearly interstate postcodes show the out-of-area screen. If the popup's rule ever changes, the booking flow follows automatically.

## What stays untouched

- The landing page, Sydney page, Check Availability tab/popup, pricing, payment, and all other booking steps.
- The out-of-area enquiry remains prototype-only (nothing stored or emailed), matching the popup.

## Technical notes

- Extract the coverage check from `CheckAvailabilitySheet.tsx` into a shared helper (e.g. `src/lib/coverage.ts`) used by both the sheet and the booking flow.
- Extract the uncovered result + confirmation screens from `CheckAvailabilitySheet.tsx` into a shared component (e.g. `src/components/landing/OutOfAreaPanel.tsx`) with props for suburb/contact/note; the sheet and `StepBooking`/`book.tsx` both render it.
- `buildAvailability`'s Melbourne fallback in `src/lib/booking.ts` stays as-is — it becomes unreachable for uncovered areas because the screen blocks progression first.
- Verify at phone size with Playwright: covered suburb → normal booking steps; "test" → out-of-area screen → Send enquiry → Thanks! confirmation; Try a different suburb → back to step 1.
