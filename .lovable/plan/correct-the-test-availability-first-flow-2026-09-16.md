# Correct the `/test` availability-first flow

## Scope
Only update the experimental `/test` page flow. Keep the live homepage, Sydney page, sticky Check Availability tab, popup, and existing booking/payment logic unchanged.

## Changes

1. **Add the missing car capture before final booking**
   - Insert a dedicated vehicle step after package selection and before the final handoff.
   - Capture **Make**, **Model**, and **Year** in three clear fields, matching the reference layout.
   - Require all three before continuing.
   - Combine them into the existing vehicle value and carry it into `/book`, so customers do not re-enter the car details.
   - Show the selected vehicle in the final booking summary.

2. **Match the header date picker to the sticky availability flow**
   - Remove the custom four-day grid and separate homemade morning/afternoon controls from the confirmed-area screen.
   - Reuse the exact existing `StepTiming` picker used by the sticky Check Availability flow, including:
     - “This week” and “Next week” controls
     - horizontally scrolling availability tiles
     - green available, amber limited, and selected states
     - weekend surcharge label
     - morning/afternoon selection
     - no ASAP option and no package prices in day tiles
   - Keep the flow inside the `/test` header card and continue to package selection after a date and rough time are chosen.

3. **Restore the original review badge treatment**
   - Replace the simplified inline review text at the top of `/test` with the original landing page’s bordered white Google review badge.
   - Match its Google “G”, 5.0 rating, five red stars, “350+ Google reviews” line, rounded border, shadow, alignment, and link behaviour.

4. **Verify the full mobile journey**
   - Test covered and out-of-area paths at phone width.
   - Confirm the sequence: location/contact → checking reveal → area confirmed/date picker → package → Make/Model/Year → final summary → existing booking page.
   - Confirm all location, contact, date, package, and vehicle details carry into booking without changing its underlying logic.
