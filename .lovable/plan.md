## Plan

Move the full `HowItWorks` section on the homepage so it appears immediately after the `Packages` section and before `WhyRideCheck`. Update any header/footer anchor links that point to `#how-it-works` so the in-page navigation still lands on the right section.

### Current order
Hero → BookingWizard → Packages → WhyRideCheck → ServiceArea → RecentlyInspected → InspectionVideos → HowItWorks → Reviews → Faq

### New order
Hero → BookingWizard → Packages → HowItWorks → WhyRideCheck → ServiceArea → RecentlyInspected → InspectionVideos → Reviews → Faq

### Files to change
- `src/routes/index.tsx` — reorder the component imports and JSX so `<HowItWorks />` follows `<Packages />`.
- `src/components/landing/SiteHeader.tsx` — verify the "How It Works" nav link still points to `#how-it-works`; no change needed if it already does.
- `src/components/landing/SiteFooter.tsx` — verify footer links still point to the correct anchors.

### No changes to
- The `HowItWorks` component itself (visuals, sticky rail, photo mosaic, copy).
- The `Packages` component.
- Any other section content or styling.

### Verification
- Run typecheck/build to confirm imports and JSX remain valid.
- Screenshot the homepage mid-scroll to confirm Packages → How It Works → Why RideCheck order.