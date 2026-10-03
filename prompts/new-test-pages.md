# New test pages: Color Doppler, Anomaly scan, EEG, NCV

## Goal
Add indexable pages for the four facilities on the centre's visiting card that the site does not yet cover, so patients searching for them in Silchar find Maruti Diagnostic Centre.

## What was read
- Centre visiting card (2026-10-03): "Ultra Sonography, Color Doppler, Anomaly, Computerised Pathology, Digital X-Ray, ECG, EEG, NCV"
- `data/tests.ts`, `lib/schema.ts`, `components/test-card.tsx`, `components/test-directory.tsx`, `components/services-preview-section.tsx`, `data/faqs.ts`
- AGENTS.md §8.3 test model, §9 SEO rules

## Assumptions & decisions
- Report times were not supplied: `reportTurnaround` is "Call to confirm report time" (user approved).
- No prices (site-wide decision): pages show "Call to book test".
- EEG and NCV get a new `Neurology` category; Color Doppler and Anomaly scan go under `Imaging`.
- Anomaly scan copy states the sex of the baby is not disclosed (PCPNDT Act), which is a legal requirement for ultrasound centres in India.
- Preparation copy is standard patient guidance and tells patients to follow their doctor's advice.
- Slugs follow the existing `<test>-silchar` pattern.

## Files that will change
- `data/tests.ts`: 4 new tests, `Neurology` category and filter chip
- `components/test-card.tsx`: icon for `Neurology`
- `lib/schema.ts`: `Neurology` → schema.org `Neurologic`
- `data/faqs.ts`: report-time FAQ wording when the time is not fixed
- `components/services-preview-section.tsx`: list and link the new tests on the home page
- `components/hero.tsx`: EEG and NCV chips

## Implementation requirements
- Each new test renders through the existing `/tests/[slug]` route: preparation, why it is done, "Call to book test", FAQs, `MedicalTest` + `Service` JSON-LD.
- New pages appear in `/tests`, the sitemap, `llms.txt` and the booking form automatically from `TESTS`.

## UI & styling
No new components. Existing test card and page layouts, existing tokens.

## Security & data integrity
No invented report times, prices or equipment claims.

## SEO & structured data
- Titles: "<Test> in Silchar — Preparation & Report Time | Maruti Diagnostic Centre"
- `relevantSpecialty`: Radiography for imaging, Neurologic for EEG/NCV

## Acceptance criteria
- [ ] 4 new pages build statically and appear in `/sitemap.xml`
- [ ] `/tests` filter shows a Neurology chip with EEG and NCV
- [ ] Anomaly scan page states the PCPNDT notice
- [ ] Lint, typecheck and build pass

## Checks to run
- `npm run lint`, `npx tsc --noEmit`, `npm run build`
- Count `<loc>` entries in the built sitemap: 40
