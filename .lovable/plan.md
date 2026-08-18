# "What's included": keep the current pattern, borrow the polish

## Recommendation

Keep the selector + single panel we built. It converts better than the carousel of
full checklist cards in the reference for three reasons:

- One thing to read at a time. The carousel shows three partial cards and buries the
  rest behind swiping — users skim, then leave. Our panel shows a full category with
  a blurb and the complete list.
- The car diagram stays on screen. That image is the proof the inspection is thorough;
  the card carousel has no visual at all.
- The CTA stays in view. Our section ends with the trust strip and one red
  "Book your inspection" button. The carousel ends with more cards.

The carousel is better at only one thing: it feels like "there is a LOT here". We can
get that signal without losing the panel.

## What to change (small, presentation only)

1. Show total coverage up front: a "100+ points across 6 areas" line under the intro,
   so the breadth is stated instead of implied by scroll length.
2. Make the panel checklist read as two dense columns like the reference — tighter row
   spacing, smaller check icons, three columns at `lg` when a category has 12+ points.
3. Card polish from the reference: rounded icon badge in a circle outline on each
   category card, slightly larger name, point count as a subtle pill.
4. Keep the reference's "Comprehensive insights report" idea as a final, non-selectable
   card in the grid that links to the sample report — it gives the PPSR/written-off/
   valuation proof a home without a new section.
5. Add a keyboard arrow-key handler on the tablist (accessibility, no visual arrows).

No layout regression: desktop stays a 3-column grid, mobile stays the snap slider with
dots, and nothing new is added below the fold.

## Technical

- All changes contained to `src/components/landing/WhatsIncluded.tsx`.
- Optional single addition to `src/lib/ridecheck.ts`: an `insightsPoints` array for the
  final report card (finance owing, written-off status, registration/stolen, market
  valuation), reused on the EV page.
- Semantic tokens only (signal / ink / card / haze / border); no hardcoded colours.
