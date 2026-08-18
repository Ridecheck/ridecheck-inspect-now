# "What's included" section replaces "Why RideCheck"

Swap the four-card "Why RideCheck" block on the homepage and the EV page for a tabbed
inspection-coverage section: category tabs across the top, and below them a two-column
panel with the selected category's checklist on the left and the car diagram on the right.

## Layout

```text
WHAT'S INCLUDED
Every RideCheck inspection is thorough. And it shows.
[ Engine & Mechanical ] [ Wheels & Brakes ] [ Body & Exterior ] [ Diagnostics ] ...
+---------------------------------------------------------------+
|  Engine & Mechanical            |                              |
|  short blurb                    |        car diagram           |
|  check-list in 2 columns        |                              |
+---------------------------------------------------------------+
   100+ points  |  90+ photos  |  Written report  |  Same-day
                    [ Book Your Inspection -> ]
```

- Tabs: horizontally scrollable pill/tab row on mobile (snap scroll), full row on desktop,
  each with an icon, category name and point count. Active tab uses the red brand accent.
- Panel: checklist in two columns with red check icons on desktop, single column on mobile.
- Diagram: reuse the existing hero inspection image on the homepage, and the EV diagram on
  the EV page. Static image, no interactive hotspots.
- Footer strip of four small stat items, then a single red "Book Your Inspection" CTA
  linking into the booking flow (EV page passes `type=ev`).

## Content

Standard categories (homepage): Engine & Mechanical, Wheels/Brakes/Suspension,
Body & Exterior, Diagnostics & Electronics, Road Test & Drivetrain, History & Documentation.

EV categories (EV page): Battery & State of Health, High-Voltage System, Charging & Ports,
Drive Motor & Inverter, Body/Brakes/Suspension, Diagnostics & History.

Each category gets a one-line blurb and 10-16 inspection points.

## Technical

- Add `inspectionCategories` and `evInspectionCategories` arrays to `src/lib/ridecheck.ts`.
- New `src/components/landing/WhatsIncluded.tsx` taking `categories`, `image`, and booking
  search params as props; local `useState` for the active tab, no new dependencies.
- Replace `<WhyRideCheck />` with `<WhatsIncluded ... />` in `src/routes/index.tsx` and
  `src/routes/ev-inspections.tsx`; delete `src/components/landing/WhyRideCheck.tsx`.
- Existing semantic tokens only (signal/ink/card/haze) — no hardcoded colours.
