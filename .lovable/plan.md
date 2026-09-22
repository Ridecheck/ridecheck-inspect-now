# RideCheck homepage enquiry prototype

## Goal
Add a low-pressure enquiry option for visitors who are not ready to book, matching the supplied reference while using RideCheck’s existing red, white and black visual system. This is a visual prototype only: nothing will be emailed or stored yet.

## Homepage invitation
- Add a full-width enquiry strip on the homepage immediately before the FAQ section, where visitors are most likely to still have an unanswered question.
- Use the reference’s structure, adapted to RideCheck:
  - Small label: “Not ready to book yet?”
  - Heading: “Have a question about an inspection?”
  - Short, direct supporting copy.
  - Red “Ask us a question” button.
  - Three compact reassurance points: expert advice, no obligation and a quick response.
- Match the current site with RideCheck typography, semantic red/ink tokens, restrained rounded corners and soft shadows. Do not copy the reference image or introduce a new visual style.

## Enquiry form
- Open a centred enquiry dialog over a subtle dimmed page when the strip button is selected.
- Keep the form short and mobile-friendly:
  - “What can we help with?” choices: still looking for a car, found a car, choosing an inspection, or something else.
  - Car details field, shown when relevant.
  - Name.
  - Mobile number.
  - Email address.
  - Optional message.
- Use the existing RideCheck inputs and red primary button.
- Include a clear close control, keyboard focus handling and Escape/outside-click dismissal.
- Validate required fields and email/phone formats in the browser, with concise inline messages and sensible character limits.

## Confirmation
- Submitting valid details replaces the form with a compact confirmation state:
  - Green check treatment already used elsewhere on the site.
  - “Thanks for reaching out!” heading.
  - Clear prototype wording that the interaction is a demonstration and no enquiry has actually been sent.
  - Close button returning the visitor to the homepage.
- Reset the form after the dialog closes so it is ready for another demonstration.

## Scope
- Create one focused enquiry component and add it to `src/routes/index.tsx` before FAQs.
- Keep the header, booking flow, Check Availability tab, sticky mobile actions, pricing and all existing business logic unchanged.
- Do not add the reference image as an asset.
- Do not add backend storage, email delivery or notifications in this prototype.

## Verification
- Check the invitation, form, validation, conditional car field, confirmation and close/reset behaviour on phone and desktop widths.
- Confirm keyboard operation, no overlapping sticky controls, no page errors and a clean build.
