## Context

carassure.com.au is a live third-party competitor site — not something built here. I fetched it as a visual reference. The RideCheck page in your preview is the one I built (charcoal + amber, dark, industrial). You want it to look like the CarAssure reference instead.

## Target look (from the reference)

- Light, airy layout: white and very pale blue-grey section bands, generous whitespace
- Deep navy (#0d1b3e-ish) as the primary, bright yellow (#ffc629-ish) as the accent
- Rounded geometric sans headings, heavy weight, large display sizes
- Pill-shaped navy buttons with an arrow, plus a secondary text link beside them
- Split hero: headline + subcopy + CTA pair + review badge cards on the left, product image on the right
- Review badges as small bordered cards with a coloured left edge (Google / other source)
- Pricing cards in three colour treatments: navy filled, white outlined, yellow filled, with a "Popular" pill on the middle card
- Rounded cards everywhere (large radius), soft shadows, no hard industrial edges

## Changes

**1. Design tokens (`src/styles.css`)**
Replace charcoal/amber tokens with the navy + yellow palette; raise base border radius; swap heading font to a rounded geometric sans (Poppins or Outfit) loaded via a `<link>` in `__root.tsx`, body stays a clean neutral sans.

**2. Header (`SiteHeader`)**
Light background, navy text, active-link yellow underline, pill navy "Book Inspection" button on the right.

**3. Hero (`Hero`)**
Two-column on desktop, stacked on mobile. Large navy headline, two short subcopy lines, primary pill CTA + "View sample report"-style secondary link, then a row of two review badge cards (5.0 Google / 130+ reviews). Right column keeps a product image; I'd regenerate the hero asset as a light-background car-with-callouts illustration to match the reference framing rather than the current dark photo.

**4. Packages**
Centered section heading + subline on a pale band. Three cards: Essential (navy filled), the mid/popular one (white outlined with "Popular" pill), Premium $379 (yellow filled). Same inclusions content as now, just re-skinned. No EV tab — that's their product, not yours.

**5. Remaining sections**
Re-skin Why RideCheck, Recently Inspected, How It Works, Reviews, FAQ, Footer and the mobile sticky CTA to the light navy/yellow system: white or pale bands alternating, rounded cards, yellow accent icons, navy footer.

**6. Kept as-is**
All copy, pricing ($299/$379), the "no dealer affiliations" wedge, phone 0424 287 403, booking CTA destination, SEO metadata and JSON-LD.

## Notes

- I'll match the layout patterns and colour system, not copy their images, logo, or copy text.
- Still outstanding from before: a contact email for the footer, and real "recently inspected" vehicles/report links (currently placeholders).
