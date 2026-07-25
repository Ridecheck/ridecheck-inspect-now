## What changes

Swap the navy/yellow "CarAssure-style" skin for your own RideCheck brand identity from vehicleinspect.com.au.

## Logos

Pull these from your live site and store them as CDN assets in the project:

- `cropped-vh-rc-logo242.png` — the main RideCheck wordmark (red "Q" mark + "RideCheck", dark text, with the vehicleinspect.com.au sub-line). Used in the header.
- `footer-logo.webp` — the white/reversed version. Used in the dark footer.
- The mark also becomes the site favicon, replacing the default Lovable icon.

## Colour system (`src/styles.css`)

Rebuild the tokens around your actual palette:

- Primary / signal: RideCheck red (the accent used on your headings, ticks, price pills and CTAs)
- Ink: near-black for headings and the footer band
- Background: white, with a light grey band (`haze`) for alternating sections
- Keep radii moderate — your site uses softly rounded cards, not full pill shapes

Headings switch from Outfit to a tighter geometric sans matching your site's look; body stays a neutral sans.

## Section re-skins

- **Header** — real logo image on the left, black nav links with a red hover state, phone number, red "Book Inspection" button.
- **Hero** — headline in red with the second half in black (your two-tone heading style), "Starting from just $299" line, the trust bullets as a compact two-column tick list, black CTA button. Keeps the existing hero image.
- **Packages** — white cards with a light border (Premium card gets a red border), red package name, price in a red rounded pill, red tick list, black "Book Inspection" button, "Popular" tag on Premium.
- **Why RideCheck / How it works / Recently inspected / Reviews / FAQ** — white and light-grey alternating bands, red section-heading accents, red icons, subtle bordered cards.
- **Footer** — near-black band, white logo, red accent labels.
- **Sticky mobile CTA** — red button.

## Unchanged

Pricing ($299 / $379), all copy, the no-dealer-affiliations wedge, phone 0424 287 403, booking CTA links, SEO metadata and JSON-LD.

## Notes

Your live site shows $349 for Premium while the brief and booking form say $379 — the page keeps $379. Say the word if that should flip.

Still outstanding: a contact email for the footer, and real recently-inspected vehicles/report links (currently placeholders).
