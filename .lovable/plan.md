## Goal

Let you see exactly what the customer booking confirmation email looks like, before any real sending is switched on.

## What I'll build

**1. The confirmation email design**

A branded RideCheck email (white background, red accent, Poppins-style stack, wordmark at top) containing:

- Heading: "Your inspection is booked"
- Short line: we're matching you with an inspector; you'll get an SMS with their name and ETA.
- Booking summary block:
  - Reference number (e.g. RC-4821)
  - Vehicle (year / make / model)
  - Location (suburb, state)
  - Timing — either "ASAP — next available" or the chosen day + Morning/Afternoon window
  - Package (Standard / Premium / EV) with price
  - Any add-ons (Video Walkthrough $50)
  - Total paid
- "What happens next" — 3 short steps (inspector assigned → on-site inspection → report within a few hours)
- Contact strip: 0424 287 403, reply-to email
- Footer: RideCheck, independent, no dealer affiliations.

**2. A preview page you can open**

A `/email-preview` route in the app that renders the email inside a phone-width frame with realistic sample data, plus a toggle between two sample bookings (ASAP standard vs. scheduled EV + add-on) so you can see both states. This is dev-only viewing — nothing gets sent.

**3. Internal job alert (second tab on the same preview page)**

A plain, scannable version for your ops team: reference, customer name + phone, vehicle, suburb, timing window, package, add-ons, amount paid, and any notes.

## Technical notes

- Templates written as React Email components in `src/lib/email-templates/` so they drop straight into the real send flow later with no rewrite.
- The preview route renders the same components — what you see is what would send.
- Actual sending stays off until your sender domain is verified; once it is, I wire these to fire after a successful payment in `src/routes/book.tsx`.
