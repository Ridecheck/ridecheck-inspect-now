I pulled the live content from vehicleinspect.com.au. Real details I'll use: package inclusions, testimonials (with names), FAQ answers, the 5.0 Google rating / 130+ reviews, the sample report link, and the phone number 0424 287 403.

One conflict to flag: the pricing cards on the current site show Standard $299 / Premium $349, but the booking form charges Standard $299 / Premium $379. Your brief says $379, so I'll use $299 / $379.

## Page: rewrite `src/routes/index.tsx` (single scrolling landing page)

### 1. Hero
- H1: "Pre-Purchase Car Inspection in Melbourne & Sydney"
- Subhead: we come to the car, inspect on-site, same-day detailed report with 90+ photos and video, plus free PPSR.
- Trust strip: 5.0 Google rating · 130+ reviews · No Dealer Associations · 48-Hour Turnaround Guaranteed
- Primary CTA "Book & Pay Online" (full payment at booking, instant confirmation), secondary "View sample report" → the live sample report URL.
- Hero image generated to match the direction (clean vehicle/inspection shot).

### 2. Packages
- Standard $299 · 45–60 min: visual condition assessment (engine, underbody, exterior, interior, wheels), 19+ photos, diagnostic scan of engine management, road test, free PPSR, instant digital report, phone call with the inspecting mechanic.
- Premium $379 · 70–90 min, badged "Most Popular": everything in Standard plus 35+ photos, interior/exterior/engine-running video, full body condition report with paint depth readings and prior damage detection, free CarHistory report (valued $41.95 — odometer, damages, stolen/written-off, valuation, registration, prior sale).
- Afterpay/Zip split line under each price (calculated from the price, 4 instalments), "Book Now" button, and a small note that travel surcharges may apply outside standard suburbs.

### 3. Why RideCheck (4 cards)
No dealer affiliations (fully independent) · 90+ photos and video walkthrough · Written technician summary plus a direct phone call · Free PPSR with accident and odometer checks.

### 4. Recently inspected strip
3 sample vehicles with make/model, condition score, "View Report". These will be placeholders (e.g. 2015 Ford Falcon XR6) pointing to the existing sample report until you give me real ones.

### 5. How it works
Book & pay online → Our expert connects with you → On-site inspection → Same-day report emailed (2–3 hrs), using the copy from your current site, tightened.

### 6. Reviews
Four real Google reviews verbatim (trimmed): J K, Eleonora Adam, Alex, Beccacino — plus the 5.0 / 130+ reviews badge and a link to your Google listing.

### 7. FAQ accordion (shadcn Accordion)
How long it takes (60–90 min) · Same-day report (2–3 hrs, plus follow-up call) · Mechanic qualifications · How mobile booking works · What the inspection covers.

### 8. Footer
Service areas Melbourne & Sydney (Adelaide coming soon), phone 0424 287 403 (tap-to-call) and WhatsApp, terms link, final "Book & Pay Online" CTA.

Plus a sticky mobile bottom bar with "Book & Pay Online" so the CTA is always reachable on a phone.

## Technical
- Single route at `/` (replaces the placeholder), sections split into components under `src/components/landing/`.
- Tailwind v4 tokens in `src/styles.css`: a confident, industrial palette (deep charcoal + a single high-contrast signal accent), no purple gradients, no emojis. Typography via `<link>` in `__root.tsx`.
- shadcn Button, Card, Accordion, Badge.
- Mobile-first, skimmable; restrained motion only.
- SEO head() on the index route: title/description/og/twitter targeting "pre-purchase car inspection Melbourne & Sydney", plus LocalBusiness + FAQPage JSON-LD.
- "Book & Pay Online" points to your existing booking form (`vehicleinspect.com.au/our-packages/#inspectionForm`) unless you want an on-page form instead.

## Still needed from you
- A contact email for the footer.
- Whether the booking CTA should link to the existing form or be rebuilt on-page.
- Real "recently inspected" vehicles and report links, if you want them non-placeholder.
