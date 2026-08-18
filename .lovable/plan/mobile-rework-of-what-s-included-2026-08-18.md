# Mobile rework of "What's included"

Yes — the mock is clear. Restructure the section on mobile to match it, keeping the desktop
grid + side-by-side panel as-is.

## Mobile order (below `lg`)

```text
WHAT'S INCLUDED
Every RideCheck inspection is thorough. And it shows.
[ View sample report ]
[tile][tile][tile] ->  swipe
      - - - -        (dots)
+-----------------------------+
| Category name               |
| blurb                       |
| [ car visual + hotspots ]   |
| Tap a hotspot caption       |
| check 1 ... check 5         |
| [ Show all points  v ]      |
+-----------------------------+
[ 4 trust items, 2x2 grid ]
```

Key changes vs. the current build:

1. **Visual first** — the car diagram moves above the checklist on mobile, so it isn't
   buried under a long list.
2. **Collapsed checklist** — show 5 points, then a "Show all points" toggle that expands
   the rest (chevron rotates). Desktop keeps the full two-column list.
3. **Only the active hotspot shows** on mobile, so the marker always matches the selected
   category; tapping a hotspot still switches category.
4. **History & Documentation** gets a report-style visual instead of the car (document card
   with red header bar plus small check tags: VIN, PPSR, Odometer, Finance, Written-off),
   since those checks aren't on-car.
5. **Tiles**: smaller icon-above-name cards (~168px wide, snap scroll) matching the mock,
   with red border + red text when active. Dots below stay.
6. **Trust bar** becomes a 2x2 grid on mobile with tighter type.

Copy stays as-is ("Tap a hotspot..." on touch, "Click a hotspot..." on desktop).

## Technical

- All work in `src/components/landing/WhatsIncluded.tsx`; no data or route changes.
  Category data in `src/lib/ridecheck.ts` is unchanged.
- Reorder with flex `order` utilities / duplicated placement via responsive classes so a
  single JSX tree serves both layouts (visual `order-first lg:order-none`).
- New local state `expanded`, reset when the active category changes; list slices to 5
  below `lg` via a `showAll || i < 5` check plus `lg:` always-visible fallback.
- New small `DocVisual` sub-component in the same file for the history category,
  built from existing tokens (card/border/signal) — no new assets or dependencies.
- Hotspot rendering: keep all hotspots at `lg`, render only the active one below `lg`.
- No hardcoded colours; semantic tokens only.
