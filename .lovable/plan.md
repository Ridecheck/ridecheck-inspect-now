# Blueprint car diagram for "What's included"

The silver photo-style BMW clashes with the clean red/ink/white page. Replace it with a technical line-art blueprint car — outlined in ink on white, with the selected area filling in brand red. Hero stays as-is.

## What changes

- Generate a new asset: a side/three-quarter BMW M3 sedan rendered as a clean technical line drawing — thin dark outlines, no shading, no background, transparent PNG.
- Swap the diagram image in the "What's included" section on both the main landing page and the EV page (EV keeps its own vehicle silhouette treatment, same line-art style).
- Replace the red x-ray photo tint with a treatment built for line art:
  - The selected region fills with a translucent red wash plus a soft red glow, so it reads as "this area is being inspected" instead of a colour-shifted photo.
  - The rest of the car stays as quiet ink outlines.
- Keep the interaction added last turn: hotspot circles with a plus icon, which swap to the category icon and a red label chip when active.
- Keep the "Click a hotspot to see what we check in each area." caption under the diagram.
- Re-check the hotspot coordinates against the new drawing so engine/wheels/body/diagnostics/road markers land on the right parts of the car.

## Technical notes

- New asset generated to `src/assets/`, referenced from `src/routes/index.tsx` and `src/routes/ev-inspections.tsx`.
- `src/components/landing/WhatsIncluded.tsx`: drop the duplicated `<img>` x-ray layer and its CSS filter chain; the red region becomes a masked SVG fill/glow over the transparent line art, which is lighter and renders consistently across browsers.
- `regionMap` percentages updated to the new artwork.
- Old `inspection-car-silver.png` removed once nothing references it.
