# Mobile "Check Availability" flow

Add a mobile-only Check Availability tab and bottom-sheet funnel on top of the existing landing page. Nothing on the current page changes: no redesign of sections, copy, branding or the existing "Let's check if this car is worth buying" wizard.

## The sticky tab

A slim tab sits directly above the existing sticky "Book Inspection" bar at the bottom of the phone screen, attached to it as one unit — same width, rounded top corners, no floating card, no large icons. Label: "Check Availability", with a small chevron. Mobile only; nothing appears on desktop.

## The bottom sheet

Tapping the tab slides a sheet up from the bottom. It has a drag handle, a close button, a slim progress indicator, and back navigation between screens.

1. **Check Availability** — suburb or postcode field, vehicle type choice (Car / SUV / Ute / Van / Electric), and a "Check Availability" button. Button stays disabled until a location is entered.
2. **Checking** — a short animated sequence ticking off: checking service coverage, finding nearby inspectors, checking availability. About two seconds total.
3. **Great news** — confirmation that we can inspect the area, the entered suburb shown back, "Mobile inspection available", the line "You're just a few steps away from booking your inspection." and a Continue button.
4. **Choose Your Inspection** — Standard $299 and Premium $379, Premium flagged "Most Popular" and selected by default. Prices and inclusions come from the existing package data so they stay in sync. Continue button.
5. **Booking handoff** — shows the customer is moving into the existing booking system at book.vehicleinspect.com.au, lists back what they already entered (location, vehicle type, chosen package) to make the point that it carries across, and a final button that opens the existing booking flow with those details pre-filled.

## Convergence

Both paths end in the same booking step: the existing "Let's check if this car is worth buying" wizard (vehicle, then location, package, booking) and the new Check Availability funnel (location, success, package, booking). The handoff screen makes that shared destination explicit. The existing wizard is untouched.

## Technical notes

- New `CheckAvailabilitySheet.tsx` under `src/components/landing/`, built on the existing shadcn Sheet/Drawer primitive with `side="bottom"`, animated with CSS transitions already available.
- `StickyCta.tsx` is the only existing file edited: wrap the current bar so the tab renders immediately above it, keeping the current buttons exactly as they are. The `sm:hidden` container keeps it mobile-only.
- Packages read from `packages` in `src/lib/ridecheck.ts`; no duplicated prices.
- Handoff continues to the existing `/book` route with `suburb`, `postcode`, `vehicle` and `pkg` search params, matching how `BookingWizard` already hands off, while the screen displays the `book.vehicleinspect.com.au` destination.
- Local component state only; no backend, no data persistence.

## Not in scope

Landing page changes, desktop version, real coverage lookup, real availability data, payment. This is a click-through prototype.
