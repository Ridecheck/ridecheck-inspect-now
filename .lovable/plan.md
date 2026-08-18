# "What's included": a reactive car diagram instead of the reused hero image

## The call

Keep the current selector + panel layout — it converts better than the swipeable
checklist cards (one thing to read, diagram visible, single CTA in view).

But the diagram is the weak point. Two problems:

1. It reuses the hero image, so by the time the user scrolls here the picture is
   already spent — it stops reading as information and starts reading as filler.
2. Making it a click-to-explore hotspot map (image-19) adds a second way to do the
   same thing the category cards already do. Two controls for one job means users
   click the car, nothing they expect happens, and they lose the thread.

So: new dedicated diagram, and it responds to the selector rather than being a
separate thing to click.

## What it does

```text
[ Engine ] [ Wheels ] [ Body ]        <- user picks here
[ Diag   ] [ Road   ] [ History ]
+-------------------------+-----------------------+
| Engine & Mechanical     |   neutral silver car  |
| blurb                   |   engine bay glowing  |
| check list (2 cols)     |   red, rest dimmed    |
+-------------------------+-----------------------+
```

- Same car model as the hero — the BMW M3 sedan — so the brand stays consistent, but
  rendered fresh: neutral silver instead of red, clean three-quarter side angle, plain
  background, no callout labels or report card. Same vehicle, clearly a different image.
- Selecting a category highlights that region of the car: the region tints in the red
  brand accent with a soft glow, everything else stays muted grey.

- Small pulsing markers sit on each region. They are clickable as a shortcut, but they
  are not the primary control and nothing is hidden behind them — the checklist below
  already shows everything.
- Smooth crossfade between highlight states, respecting reduced-motion.
- Categories with no physical location on the car (History & Documentation) show the
  full car in neutral state with a document/report badge instead of a region glow.

## Alternative if the diagram proves fussy

Drop the image entirely and let the panel run full width as a dense three-column
checklist with a "100+ points across 6 areas" counter. Less pretty, equally clear,
zero risk. I'd only fall back to this if the highlight rendering looks cheap.

## Technical

- Generate one base car illustration — BMW M3 sedan, neutral silver, transparent
  background — as a Lovable asset. Not a crop or recolour of the hero file.

- Highlights are an absolutely positioned SVG overlay over the base image: one `<path>`
  or ellipse per region using `fill-signal` with opacity transition, so highlighting
  costs no extra image variants and stays on brand tokens.
- Add `region` coordinates (marker x/y percentage plus highlight shape) to each entry in
  `inspectionCategories` / `evInspectionCategories` in `src/lib/ridecheck.ts`; entries
  without a region render the neutral state.
- All rendering changes stay in `src/components/landing/WhatsIncluded.tsx`, driven by the
  existing `active` state — no new state, no new dependencies.
- EV page reuses the same mechanism with the existing EV diagram as its base.
- Semantic tokens only (signal / ink / card / haze / border).
