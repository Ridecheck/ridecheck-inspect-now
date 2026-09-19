# Animated trust strip on `/test`

## What changes
- Add the reference-style white trust strip directly below the availability-first header area on `/test` only.
- Match the three statistics: **6+ Years in business**, **5,000+ Inspections completed**, and **350+ 5-star reviews**, with red numbers, thin red separators, gold stars, and the centred “Trusted by Australian car buyers” line.
- Count each number up once when the strip scrolls into view, finishing at 6+, 5,000+, and 350+.
- Stack the statistics cleanly on phones while retaining the three-column reference layout on larger screens.
- Respect reduced-motion preferences by showing final values immediately.

## Scope
- The homepage and all booking, availability, payment, and coverage behaviour remain unchanged.
- The uploaded graphic is used as a visual reference, not embedded as a flat image, so the numbers remain animated and accessible.

## Validation
- Check `/test` at phone and desktop widths.
- Confirm all counters finish at the exact values and do not restart repeatedly.
- Confirm the current preview remains error-free.
