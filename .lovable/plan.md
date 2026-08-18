# Fix the "What's included" category selector

The current single-row card strip overflows on desktop (last card cut off) and is
cramped on mobile. Replace it with a responsive selector: a full grid on desktop,
a swipeable slider on mobile. No arrow controls.

## Behaviour

```text
Desktop (lg+)                         Mobile
+--------+--------+--------+          [ card ][ card ][ ca..  ->  swipe
| Engine | Wheels | Body   |          - - -  (dot indicators)
+--------+--------+--------+
| Diag   | Road   | History|
+--------+--------+--------+
```

- Desktop: 3-column grid (2 rows for 6 categories), all cards visible, equal height,
  nothing clipped. Tablet: 2 columns.
- Mobile: horizontal snap-scroll row with cards at ~78% width so the next card peeks,
  edge-to-edge bleed and no visible scrollbar. Small dot indicators under the row show
  position and are tappable.
- Active card keeps the red border + red label; inactive cards stay neutral with a
  subtle hover border.
- Selecting a category on mobile scrolls the active card into view and keeps the panel
  below in place (no page jump).
- Cards get consistent min-height so two-line names ("Wheels, Brakes & Suspension")
  don't make the grid uneven.

## Technical

- Changes are contained to `src/components/landing/WhatsIncluded.tsx`; no data or
  page changes.
- Swap the flex row for `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` at `lg`,
  and a `flex snap-x snap-mandatory overflow-x-auto` track below `lg` (rendered from
  the same array via responsive classes, single source of truth).
- Add `min-w-0` on text containers, `shrink-0` on icons, and hide the scrollbar with
  the existing utility approach in `src/styles.css` if not already present.
- Dot indicators are buttons with `aria-label` per category; `role="tablist"` /
  `aria-selected` semantics preserved.
