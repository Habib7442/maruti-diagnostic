# Implementation Specification: Tests & Services Directory (`/tests`) & Key Test Landing Pages (`/tests/[slug]`)

## 1. Goal
Build a comprehensive, category-filterable Diagnostic Tests Directory (`/tests`) and dedicated indexable SEO landing pages (`/tests/[slug]`) for each medical test and imaging scan at Maruti Diagnostic Centre, targeting local search queries (e.g. `"thyroid test Silchar"`, `"USG whole abdomen Silchar"`), with plain-language preparation rules, report turnaround times, `MedicalWebPage` / `DiagnosticProcedure` JSON-LD schema, and direct 1-tap WhatsApp booking to `+91 99578 32872`.

---

## 2. What Was Read
- `AGENTS.md`:
  - §1 Scope: Tests directory & key test pages.
  - §8.3 Test / Service Model (`data/tests.ts`).
  - §9 SEO requirements: Plain-language copy, canonical URLs, structured data, mobile-first responsive UI.
  - §11 Known Pitfalls: Next.js 16 async dynamic route parameters (`params: Promise<{ slug: string }>`).
- `PRD.md`: §6.4 Tests, §7 Test seed data, §8 Technical SEO.
- User rule: No fake data, no paid APIs, no databases — 100% direct client-side WhatsApp deep links.

---

## 3. Assumptions & Decisions
- **Next.js 16 Async Dynamic Route Parameters**: Route props in Next.js 16 App Router are promises (`params: Promise<{ slug: string }>`). We will `await params` before extracting `slug`.
- **Static Site Generation (SSG)**: We will implement `generateStaticParams()` to statically prerender all 14 test landing pages at build time.
- **Dynamic SEO Metadata**: `generateMetadata()` will produce high-ranking metadata tailored for diagnostic search in Silchar and Barak Valley.
- **Direct WhatsApp Booking**: Every test page will include a dedicated booking card with a one-tap WhatsApp button pre-filling the exact test name, price, sample requirements, and date request to `+91 99578 32872`.
- **Searchable & Filterable Directory (`/tests`)**: Category pills (All, Pathology, Ultrasound & X-Ray, Cardiac, Endoscopy) + instant client-side keyword search.

---

## 4. Files That Will Change
- `data/tests.ts` [MODIFY]: Add `getAllTestSlugs()` and `getRelatedTests()` helper functions.
- `components/test-card.tsx` [NEW]: Reusable test preview card showing category badge, turnaround time, sample type, fee, and links to test page and WhatsApp booking.
- `components/test-directory.tsx` [NEW]: Searchable and filterable client directory component.
- `app/tests/page.tsx` [NEW]: Full Tests Directory index page with metadata and structured data.
- `app/tests/[slug]/page.tsx` [NEW]: Dedicated Server Component page with async params, SSG, `DiagnosticProcedure` JSON-LD, plain-language preparation guide, and WhatsApp booking card.

---

## 5. UI & Styling Specifications (per `DESIGN.md`)
- Background: `--paper` (`#F5F1EC`) with elevated `--surface` (`#FCFAF7`) cards and hairline `--line` borders.
- Typography: `Fraunces` headings, `Hanken Grotesk` body (≥17px).
- Badges: Pill badges for categories and turnaround reassurance.
- Icons: `lucide-react` line icons + official WhatsApp icon `/social-icons/whatsapp.png`.
- Preparation Guidelines Box: Styled with warm accent container (`bg-clay/30` or `bg-surface border-line`).

---

## 6. Acceptance Criteria
- [ ] Navigating to `/tests` displays all diagnostic tests grouped/filterable by category with live search.
- [ ] Navigating to `/tests/thyroid-profile-test-silchar` displays Thyroid Profile detail page.
- [ ] Navigating to `/tests/ultrasound-whole-abdomen-silchar` displays USG scan detail page.
- [ ] All 14 test slugs resolve without 404.
- [ ] Invalid slug returns standard Next.js 404 (`notFound()`).
- [ ] Valid `MedicalWebPage` / `DiagnosticProcedure` JSON-LD schema is injected.
- [ ] 1-Tap WhatsApp button launches real WhatsApp to `+91 99578 32872` pre-filled with the test details.
- [ ] `npm run build` passes with 0 errors and all test routes statically prerendered.

---

## 7. Checks to Run
- `npm run build`
- Verify static route generation for all 14 test slugs
- Test responsive layout and WhatsApp deep links

