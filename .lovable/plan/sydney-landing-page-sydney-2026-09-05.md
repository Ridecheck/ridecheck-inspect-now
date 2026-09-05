# Sydney Landing Page (/sydney)

## Goal
A full Sydney-specific landing page that mirrors the home page layout, with copy, SEO metadata and service-area details localised for Sydney. Packages, pricing, reviews and FAQs stay identical.

## What changes

1. **New route: `src/routes/sydney.tsx`**
   - Same section order as `/`: SiteHeader, Hero, BookingWizard, Packages, HowItWorks, WhatsIncluded, RecentlyInspected, InspectionVideos, Reviews, Faq, ServiceArea, SiteFooter, StickyCta.
   - Its own `head()`: title "Pre-Purchase Car Inspection Sydney | RideCheck", Sydney-focused description, canonical `/sydney`, AutomotiveBusiness JSON-LD with areaServed "Sydney", plus the existing FAQ schema.

2. **City-aware copy via a `city` prop (defaults keep current behaviour)**
   - `Hero`: headline/sub line swap — "Mobile Pre-Purchase Car Inspections **in Sydney**", service line becomes "Across Greater Sydney." Melbourne wording untouched on `/`.
   - `ServiceArea`: option to default the accordion open to New South Wales and highlight Sydney in the copy ("We come to the seller, the dealer or the driveway — across Greater Sydney").
   - Other sections (Packages, HowItWorks, Reviews, Faq, etc.) are already city-neutral — reused as-is.

3. **Booking funnel**
   - "Book Now" CTAs and the wizard on `/sydney` pass `city=sydney` (or the Sydney postcode flow) so the `/book` page prefills Sydney availability — reusing the existing URL-param prefill logic.

4. **Navigation**
   - Add a "Sydney" link in the header nav (and mobile menu). Keep the rest of the nav unchanged.

## Technical notes
- Reuses all existing landing components; no new visual design.
- Components that need copy changes get an optional `city?: "sydney" | "melbourne"` prop with current text as the default, so `/` renders exactly as today.
- No database or backend changes.
