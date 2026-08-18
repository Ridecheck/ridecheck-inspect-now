# Polished "Compare all features" table

Structure only from the screenshots — RideCheck styling (red signal, ink, haze, Poppins, rounded cards) stays as-is.

## 1. PPSR line

The Standard card's PPSR item already reads "Free PPSR report confirming the car isn't encumbered" with no dollar amount, so nothing to strip. If any value tag reappears in the data it gets removed.

## 2. New comparison section

A new collapsible block sits directly under the two pricing cards on the home page, closed by default behind a "Compare all features" toggle button with a rotating chevron.

**Grouped rows** — three labeled groups, each with a small uppercase subheading row:

- Inspection scope: full mechanical inspection; diagnostic scan and road test; road test drivetrain notes; mechanic phone call.
- Photos & documentation: photo coverage (19+ vs 35+ 360 degree); instant digital report; free PPSR report.
- Premium-only checks: paint depth readings on all panels; odometer tamper check; valuation guide.

**Marks** — instead of plain ticks: a filled red circle with a white check for included, a light grey circle with a dash for not included. Rows where the value differs (text values like "19+" vs "35+") show the text in place of the icon.

**Upgrade highlighting** — any row Premium has and Standard doesn't gets a very subtle red-tinted row background.

**Sticky header** — the Feature / Standard / Premium header row stays pinned at the top of the scrolling table.

**Animation** — expand/collapse slides and fades open rather than snapping.

**Mobile** — narrow screens get a stacked per-feature layout: feature name on its own line with two small labeled Standard / Premium chips beneath, so nothing is cramped and no horizontal scrolling is needed. The table layout kicks in from `sm` upwards.

Pricing card copy, prices, badges and CTAs are untouched.

## Technical notes

- Add a `comparisonGroups` data structure to `src/lib/ridecheck.ts`: groups of `{ label, rows: { feature, standard, premium }[] }` where each value is `true | false | string`.
- New `src/components/landing/FeatureComparison.tsx` rendering the toggle, grouped table (desktop) and stacked cards (mobile), with sticky `thead`.
- Expand/collapse via a grid-rows / max-height transition plus opacity — no library.
- Rendered from `src/components/landing/Packages.tsx` below the cards, above the surcharge disclaimer.
- Colours only via existing tokens (`signal`, `ink`, `haze`, `muted-foreground`); no hardcoded hex.
