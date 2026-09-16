# Add "Test" to the top menu

The test availability-first page exists at `/test` but is hidden from navigation. Add a "Test" link to the site's top menu.

## Change

In `src/components/landing/SiteHeader.tsx`, add to the `navLinks` array:

```ts
{ to: "/test", label: "Test" },
```

appended after "Contact" (last position) so it doesn't disturb the order of the existing links.

Because desktop and mobile menus both render from `navLinks`, "Test" appears in both automatically — no other edits needed. All existing styling (hover underline, active red highlight) applies as for the other links.

## Out of scope

- No changes to the homepage, Sydney page, `/test` page itself, or any booking/availability logic.
- The page stays `noindex`; adding it to the menu only affects navigation, not search listings.

## Verify

- Playwright at phone and desktop widths: "Test" visible in both menus, navigates to `/test`, active state highlights on that page.
