# Out-of-area flow: match the reference screens

Only the outside-coverage path inside the mobile Check Availability sheet changes. The landing page, the covered "Great news!" path, dates, packages and booking handoff stay exactly as they are.

## Result screen ("We might be able to help.")

- Reword the body to match the reference: no local inspector in {suburb}, we may still be able to assist, the area may require a travel fee depending on location. Second line: leave your details and we'll get in touch with options and a quote.
- Details card becomes two rows, each with its own icon and an EDIT link:
  - Location row (pin icon) — suburb
  - Contact row (mail icon) — email or mobile entered earlier
- Keep the optional "Anything we should know?" note field, with the reference placeholder ("e.g. where the car is, when you need it, or any other details…").
- Primary button becomes "Send enquiry".
- Keep "Try a different suburb" below it.

## Confirmation screen ("Thanks!")

Replaces the current small thank-you block with a full screen:

- Large soft-green circle with a green tick.
- "Thanks!" heading, "We've received your enquiry." subline.
- Info card: "We'll be in touch soon" — our team will review your request and get back to you with availability and any applicable travel fees.
- Three small reassurance items in a row: Usually within a few hours / We'll confirm availability / Transparent pricing.
- Secondary "Back to home" button that closes the sheet.

## Checking screen wording

While the checks run, the heading follows the steps rather than staying static: "Checking service coverage…" then, once all three steps are ticked, "Just a moment…" with "We're finalising your result." Existing card animation, step list and timings are unchanged.

## Technical notes

- All edits are in `src/components/landing/CheckAvailabilitySheet.tsx` (screen 1 heading text, screen 2 uncovered branch, `leadSent` confirmation view).
- Reuse existing `--protected` green tokens and lucide icons (MapPin, Mail, Check, MessageCircle, Clock, DollarSign). No new colours, no hardcoded hex.
- Enquiry remains prototype-only: nothing is stored or emailed yet.
- Verify on a phone-sized screen: suburb "test" → checks → result screen → Send enquiry → confirmation → Back to home closes the sheet; a covered suburb still shows the unchanged success celebration.
