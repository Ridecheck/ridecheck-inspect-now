## Goal

Replace the flat 4-card "How it works" grid with a two-column section: a numbered step rail on the left, and a scroll-reactive photo collage on the right — inspired by the reference, but our own composition and in RideCheck red/ink/white.

## Layout

```text
 ┌───────────────────────────────┬──────────────────────────┐
 │  How it works                 │   col A   col B   col C  │
 │  ─────────────────            │   [ ]     [ ]     [ ]    │
 │  (1) Book and pay online      │   [ ]     [ ]     [ ]    │
 │  (2) Our expert connects      │   [ ]     [ ]     [ ]    │
 │  (3) On-site inspection       │   ↑drift  ↓drift  ↑drift │
 │  (4) Same-day report          │                          │
 │  [ Book Inspection ]          │                          │
 └───────────────────────────────┴──────────────────────────┘
```

- Desktop: left rail ~44% width, sticky while the collage scrolls past. Right side is a 3-column tile mosaic with mixed aspect ratios (not a uniform grid) so it reads as a portfolio, not a table.
- Mobile: steps stack full width; collage becomes a shorter 2-column mosaic below the CTA, still with a gentler drift.

## Step rail

- Keep the existing 4 steps from `src/lib/ridecheck.ts` (unchanged copy).
- Each step gets a large outlined numeral, a thin vertical connector line, title, and body.
- As the section scrolls, the step nearest the viewport centre becomes "active": numeral fills with signal red, connector segment above it fills, body text goes full contrast. Inactive steps sit at muted contrast.
- A "Book Inspection" CTA sits under the last step, linking to `/book`.

## Photo collage (placeholder tiles)

- Empty placeholder tiles: rounded, bordered, subtle haze fill with a faint diagonal texture, a small camera glyph and a caption slot (e.g. "Engine bay", "Diagnostic scan", "Paint reading", "Undercarriage", "Road test", "Interior", "Tyres", "Report"). No stock imagery.
- Tiles are driven by a plain array in the component so real photos drop in later by adding a `src` — same pattern already used in `InspectionVideos.tsx` (tile renders the image when `src` exists, placeholder when it doesn't).
- Column A and C drift up, column B drifts down, each at a different rate, tied to the section's scroll progress.

## Motion

- One `requestAnimationFrame`-throttled scroll listener computes section progress (0→1) via `getBoundingClientRect`, writes a CSS variable per column; transforms are pure CSS `translate3d`, so it stays cheap.
- Drift range kept small (~40–80px) so nothing clips or leaves gaps; section uses `overflow-hidden`.
- Respects `prefers-reduced-motion`: drift and active-step transitions disabled, everything renders static.
- No new dependencies.

## Technical notes

- Rewrite `src/components/landing/HowItWorks.tsx`; add a small `useScrollProgress` hook (local to the component file or `src/hooks/`).
- Tile list and captions live in the component; step copy stays in `src/lib/ridecheck.ts`.
- Colours strictly via existing tokens (`signal`, `ink`, `haze`, `border`, `muted-foreground`) — no hardcoded hex.
- Homepage wiring in `src/routes/index.tsx` is unchanged; `/how-it-works` placeholder route stays as-is for now (we can reuse this section there later).

## Iteration

This is round one — once it's on screen we can push density, tile shapes, drift intensity and the active-step treatment further.
