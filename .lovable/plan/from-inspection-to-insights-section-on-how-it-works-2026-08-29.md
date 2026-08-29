# "From inspection to insights" section on /how-it-works

Add a new section directly below What's Included on the how-it-works page, inspired by the provided mockup.

## What to build

New component `src/components/landing/SampleReport.tsx`:

**Layout (desktop: split panel; mobile: stacked)**
- Left: dark ink panel
  - "Our Service" eyebrow pill
  - Heading: "From inspection to insights, all in one RideCheck report" (with "RideCheck report" in signal red)
  - Sub: "We inspect the car on site and deliver a clear, same-day report so you can buy with confidence."
  - Three icon bullets (existing data, tweaked copy):
    - **Book your inspection** — Easy online booking. We come to the car.
    - **Qualified local mechanic** — Experienced, licensed and insured.
    - **100% Independent** (replaces "Expert insights") — No dealer affiliations, no referral fees. The report says what the car is.
  - CTAs: "View Sample Report" (ghost outline → SAMPLE_REPORT_URL) and "Book Inspection Now" (red → /book)
- Right: red panel with a phone mockup of the sample report
  - Build the report screen in code (not a static image): vehicle title ("2021 BMW 330i — Inspection Report"), "Overall: Good" pill, and six circular score gauges (Exterior 92%, Interior 88%, Mechanical 90%, Wheels/Tyres 84%, Road Test 92%, History Check 100% Clear) drawn with SVG stroke-dasharray rings, green/amber per score
  - Footer line: "No prior write-off history or finance owing — PPSR / Equifax checked"

**Wiring**
- Add `<SampleReport />` to `src/routes/how-it-works.tsx` between `WhatsIncluded` and `Faq`
- Optionally also offer it on the pricing page later — not in this change

## Technical details

- Reuse `SAMPLE_REPORT_URL`, `BOOKING_URL`/booking link from `src/lib/ridecheck.ts`
- Phone mockup: pure JSX/CSS (rounded-3xl frame, notch bar), gauges as inline SVG — no new assets needed
- Keep semantic tokens (bg-ink, bg-signal), no hardcoded colors
- Mobile: dark panel stacks above phone; gauges stay 2 per row
