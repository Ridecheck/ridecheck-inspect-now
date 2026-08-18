# Inspection & EV packages — comparison cards

Rebuild both package sections to match the two mockups: two side-by-side cards where the cheaper option shows struck-through greyed items it does *not* include, and the flagship shows red ticks. Perceived value comes from that visible gap, not from dollar-value stacking.

## Standard vs Premium (home page)

- Heading: "Choose your inspection".
- Left card (white, thin border): "Standard Inspection" with "45-60 minutes" underneath, "$299" in large red on the right of the same row.
  - Ticks: "Full mechanical inspection - engine, exterior, interior, wheels and underside"; "Diagnostic scan and road test"; "19+ high-quality photos".
  - Greyed crosses, struck through: "Paint depth readings on every panel"; "Odometer tamper check"; "35+ photos + valuation guide".
- Right card (soft red tint, red border): red "MOST POPULAR" pill top-left, "$379" large red top-right, "Premium Inspection" with "70-90 minutes".
  - Ticks: "360 degree photo coverage - 35+ photos from every angle: exterior, interior, engine bay and underside"; "Paint & repair check - paint depth readings across all panels to help spot signs of previous repairs, resprays or panel damage"; "Odometer check - we look for signs of tampering and compare the reading against any records available on the day".
- Under the cards: red underlined link with arrow - "Buying a used EV or plug-in hybrid? View EV packages".
- No CarHistory report and no "$41.95" value claim anywhere; remove that inclusion from the Premium data.

## EV packages (EV page)

Same card treatment, heading "Choose your EV package".

- Left: "EV Battery Health Test", "15-20 minutes", "$250".
  - Ticks: "Certified Aviloo battery test - State of Health (SoH %) measured, not estimated"; "Remaining usable capacity analysis"; "Degradation benchmark - compared against the same model and age".
  - Struck-through: "Full vehicle inspection & road test"; "Charging system and cable check"; "Free PPSR check".
- Right: red "BEST VALUE" pill, "$489", "EV Inspection + Aviloo Battery Test", "90-120 minutes".
  - Ticks: "Full EV pre-purchase inspection - exterior, interior, brakes, suspension and tyres"; "Road test - drivetrain, regen braking and ride quality"; "Full system fault scan - current and stored codes".
- Below the cards, a soft red notice bar with an info icon: "Aviloo battery testing runs on limited days - we'll confirm your slot by SMS."

## Technical notes

- `src/lib/ridecheck.ts`: add `excluded?: string[]` and optional `badge?: string` to `Pkg`; rewrite `packages` and `evPackages` inclusion/exclusion copy to the wording above; drop the CarHistory line. Keep prices, names and durations aligned with the mockups (EV Battery Health Test duration becomes 15-20 minutes).
- New shared `PackageCards` presentation component used by both `src/components/landing/Packages.tsx` and `src/routes/ev-inspections.tsx` so the two sections stay identical in style.
- Keep existing `Link to="/book"` CTAs and the surcharge disclaimer under the home-page cards.
- Colours via existing tokens (`signal`, `ink`, `muted-foreground`); no hardcoded hex.
