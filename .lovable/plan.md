## Goal

When a buyer types an electric or plug-in hybrid vehicle (or pastes a listing link for one), the booking flow should switch itself into the EV protocol — EV packages, drivetrain question, and the Aviloo-certified availability gating — instead of relying on the `?type=ev` link from the EV landing page.

## Current state

- `src/routes/book.tsx` sets `serviceType` once, from the URL: `prefill.type === "ev" ? "ev" : "standard"`. It's a constant, so nothing can change it mid-flow.
- `StepBooking` and `StepTiming` already take `serviceType` as a prop and fully handle the EV branch (EV packages, drivetrain selector, certified-day gating, waitlist card). So the detection work is upstream only — the EV machinery already exists.

## Approach: two layers, not one

**Layer 1 — local rules (instant, free, no network).**
A small keyword/model matcher in `src/lib/ev-detect.ts`: Tesla (all), Polestar, BYD, Ioniq 5/6, EV6, Kona Electric, MG4, ID.4, i4/iX/i3, EQ*, e-tron, Leaf, plus `phev`, `plug-in`, `hybrid`, `electric`, `kWh`. Returns `{ drivetrain: "ev" | "phev" | "ice" | "unknown", confidence }`. This catches the large majority of real inputs with zero latency.

**Layer 2 — AI fallback (the "wrapper").**
When the rules return `unknown` and the input looks like a real vehicle (or a listing URL), call a server function that asks a model to classify the vehicle string into `ev | phev | hybrid | ice | unknown`. Debounced, one call per settled input, result cached per string. This runs server-side through Lovable AI so no key is exposed.

Why both: the AI alone would add a delay to every keystroke and cost a call per booking; the rules alone go stale as new models launch. Rules-first with AI as backstop is the right shape.

## UX: suggest, never hijack

Silently switching packages under someone mid-form is disorienting, and a false positive would push a petrol buyer into a gated calendar with almost no dates. So:

- On EV/PHEV detection, show an inline prompt under the vehicle field: "Looks like an EV — EV inspections include an Aviloo battery health test. Switch to EV inspection?" with **Switch** / **No, it's petrol/diesel**.
- Accepting sets `serviceType = "ev"`, swaps the package list to `evPackages`, pre-sets `drivetrain`, and clears any already-chosen standard package.
- Declining sticks a flag so the prompt doesn't reappear for that session.
- Arriving with `?type=ev` still forces EV mode as it does now.
- Reverse case: if the user is in EV mode and the vehicle clearly isn't electric, offer the same prompt back to standard.

## Technical changes

- `src/lib/ev-detect.ts` — rule matcher, pure and unit-testable.
- `src/lib/ev-detect.functions.ts` — `classifyVehicle` server function (Lovable AI, `google/gemini-3.6-flash`, small structured output), called only on rule miss; degrades to `unknown` on error or missing credits so the form is never blocked.
- `src/routes/book.tsx` — `serviceType` becomes state seeded from the URL param, with the switch handler and dismissal flag.
- `src/components/booking/StepBooking.tsx` — render the detection prompt under the vehicle input; no changes to its existing EV branches.
- `src/components/landing/BookingWizard.tsx` — run the same rule check on its vehicle step so the homepage funnel carries `type=ev` through to `/book`.

Listing links: parse the URL text itself for EV hints first; actually fetching and reading the listing page is a bigger job and out of scope here.

## Not included

- No change to the EV availability roster or `evCoverage` — detection only decides which mode you're in, not which days are open.
- No change to EV pricing or packages.
