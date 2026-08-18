# Inspection Packages — comparison cards with perceived value

Rework the Packages section to match the reference: two side-by-side cards where Standard visibly shows what it *doesn't* include (struck-through, grey) and Premium shows only its added value in red checks.

## Layout

- Section heading changes to "Choose your inspection".
- Two cards, equal height, side by side on desktop, stacked on mobile.
- Standard: plain white card, thin border. Name and duration on the left, large red price on the right (same row).
- Premium: soft red-tinted card with a red border, red "MOST POPULAR" pill top-left, price top-right.
- Below each header, the feature list:
  - Included items: red tick + normal text.
  - Excluded items (Standard only): grey cross + struck-through grey text, so buyers see exactly what they lose.
- EV link stays directly under the cards as a red underlined text link with an arrow: "Buying a used EV or plug-in hybrid? View EV packages".

## Perceived value

Add value framing without changing the prices:

- Each card gets a "value stack" line under the price: itemised inclusions with dollar values (e.g. PPSR report $X, CarHistory report $41.95, paint depth report, video walkthrough) totalling to a "total value" figure, then "you pay $299 / $379".
- Premium gets a highlighted savings chip, e.g. "Save $X vs booking separately".
- Keep the Afterpay/Zip line ("or 4 payments of $…").
- Add a short reassurance line under the buttons: instant digital report, mechanic call included.

## Content

Standard's excluded list is derived from Premium's extras: paint depth readings on every panel, odometer tamper check, 35+ photos, video walkthrough, CarHistory report.

## Technical notes

- `src/lib/ridecheck.ts`: extend the `Pkg` type with `excluded: string[]`, `valueItems: { label: string; value: number }[]`, and `totalValue`. Fill both packages.
- `src/components/landing/Packages.tsx`: rebuild the card markup per above; keep the existing `Link to="/book"` CTAs and the trailing surcharge disclaimer. Replace the boxed EV panel with the inline red text link.
- All colours via existing tokens (`signal`, `ink`, `muted-foreground`, `haze`); no hardcoded hex.
