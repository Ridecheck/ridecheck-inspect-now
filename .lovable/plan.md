# Test landing page: availability-first layout

A new page at `/test` that copies the current RideCheck landing page and its styling, but rearranges the top of the page into the availability-first journey from your mockup. The live homepage, the Sydney page and the booking page stay exactly as they are.

## What you will see at /test

Same header, same sections, same look. The difference is the top of the page and one continuous flow:

1. **Hero — location first.** Same headline, photo and trust strip as today, but the card under it asks one thing: "Where's the car?" with a suburb/postcode field and a red "Check Availability" button. The three benefit tiles (local qualified mechanics, same-day reports, fast easy booking) stay beneath it.
2. **Checking your area.** Short loading state (1–2s) with the three tick lines: checking inspection coverage, finding available inspectors, checking upcoming availability.
3. **Area confirmed.** Green "Yes, we inspect in {suburb}" panel with a "Change" link, then the next available dates strip (Wed/Thu/Fri/Sat) and a morning/afternoon choice with spots left, plus the red "Book {day}, {time}" button.
4. **Select a time (optional).** Only if the visitor wants a specific hour — the existing time-slot list with spots left.
5. **Package selection.** Standard $299 / Premium $379 with their inclusion lists, then Continue.
6. **Handoff to the existing booking app** with the suburb, date, time and package carried over — same as today.

If the suburb is not covered (the demo word "test", or an interstate postcode) the same "We might be able to help." screen appears instead, exactly as it does now.

Below the flow the page keeps the rest of the current landing page unchanged: packages, how it works, what's included, recently inspected, videos, reviews, FAQs, service area, footer, and the sticky bottom bar with the Check Availability tab.

On desktop the same flow runs inside the hero card, matching the wide layout in your mockup; on mobile it runs as the stacked steps.

## Technical notes

- New route `src/routes/test.tsx` with its own `head()` (unique title/description, `noindex` so it stays out of search results).
- New component `src/components/landing/AvailabilityFirstHero.tsx` holding the step machine (location → checking → confirmed → optional time → package → handoff). It reuses the existing pieces rather than new logic: `isAreaCovered` from `src/lib/coverage.ts`, `buildAvailability`/`StepTiming` from `src/lib/booking.ts`, `PackageCards`, `OutOfAreaPanel`, and the existing design tokens in `src/styles.css`.
- The hero visuals come from the existing `Hero` layout, re-composed with the availability card in place of the current copy block; `Hero.tsx` itself is not modified.
- Handoff uses the same `/book` parameters the Check Availability sheet already sends.
- No changes to booking, pricing, coverage rules, payments or tracking — layout and flow composition only.
