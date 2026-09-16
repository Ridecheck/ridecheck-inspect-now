# Bring the Check Availability flow's moments into /test

The `/test` page keeps its availability-first layout, but the flow inside the hero card borrows the polished moments already built into the Check Availability popup, so the two feel like the same product. Nothing on the homepage, Sydney page, booking page or the popup itself changes.

## What changes on /test

1. **Contact field on the first step.** Alongside "Where's the car?", the card asks for an email or mobile number with the popup's validation and helper line ("We'll use this to follow up on availability."), so the details carry through to booking. The Check Availability button stays disabled until both are valid.
2. **The popup's checking animation.** The plain spinner is replaced with the popup's envelope reveal: the branded card during checking, the three tick lines ("Checking service coverage", "Checking available inspection days", "Preparing your booking options"), the anticipation pause, then the burst reveal — "Great news! We can inspect your area." or, for an uncovered suburb, "Got your answer. Here's what we found." Reduced motion skips straight to the result.
3. **The green confirmation card.** The "Yes, we inspect in {suburb}" panel uses the popup's protected-green styling with the animated check, plus the Change link and "No travel fee for this area."
4. **Package step spot-on with the popup.** The Standard/Premium cards get the popup's selected-state ring and radio check, matching the popup exactly.
5. **"You're protected" card on the final step.** The handoff step gains the popup's green trust card (refund if cancelled 24+ hours before, secure Stripe payment, 5.0★ from 350+ customers, no hidden fees) above the Continue to booking button.
6. **Out-of-area path unchanged.** Still the shared "We might be able to help." panel, now preceded by the same reveal animation.

The date strip, morning/afternoon tiles, optional specific-time step and the handoff into `/book` all stay as they are.

## Technical notes

- `src/components/landing/AvailabilityFirstHero.tsx` is the only file changed.
- Reuses existing pieces rather than duplicating: `AvailabilityResultCard` and `parseContact` from `OutOfAreaPanel.tsx`, the `availability-reveal` / `availability-success-card` classes already in `src/styles.css`, and the same `checkingSteps` labels and `RevealPhase` timing the popup uses.
- The contact value feeds the existing `/book` handoff params (`email`, `phone`) already wired up.
- No changes to coverage rules, availability generation, pricing, payments or tracking.
