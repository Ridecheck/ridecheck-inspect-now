# Match and strengthen the availability day cards

## What will change
- Keep the shared date slider, but add a pop-up-only visual mode so the main booking flow remains unchanged.
- Match the day cards in the Check Availability pop-up to the original booking flow’s larger width, height, spacing, typography, and horizontal swipe behavior.
- Give every serviceable day a clear green-tinted surface, green border, and an “Available” label so customers immediately understand that RideCheck can attend.
- Keep unavailable dates muted and disabled, with their existing unavailable status.
- Give the selected available day a stronger green border, check mark, and glow while preserving the current morning/afternoon selection and Continue behavior.

## Technical details
- Add an optional availability-focused presentation prop to the shared `StepTiming` picker.
- Enable that prop only from the mobile Check Availability sheet, alongside the existing hidden-price and hidden-ASAP settings.
- Reuse the existing semantic green design tokens; do not introduce hardcoded colours.

## Validation
- Check the mobile pop-up at 384px width against the supplied booking-flow reference.
- Confirm card sizing, horizontal scrolling, green available states, selected state, unavailable states, time-window selection, and Continue behavior.
- Confirm the main `/book` date picker has not changed and the app builds without errors.
