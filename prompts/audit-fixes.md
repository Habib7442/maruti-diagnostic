# Audit fixes: doctor data, crawlability, and code quality

## Goal
Make every doctor page easy for Google to find and trust: correct doctor data from the owner's sheets, crawlable links to all doctors, no invented facts, and a clean lint/build.

## What was read
- `AGENTS.md`, `PRD.md` (§6 seed data, §12 dependencies, §13 open questions), `DESIGN.md` rules via AGENTS.md §4
- `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/use-search-params.md` (Prerendering: tree up to nearest Suspense is client-rendered)
- All of `app/`, `components/`, `data/`, `lib/`, `next.config.ts`, `package.json`
- Owner-supplied images (2026-10-03): daily chamber board, "Our Associated Doctor" banner, Dr. Shromona Kar and Dr. Sridham Sutradhar prescription pads
- Built HTML in `.next/server/app/doctors.html` (0 doctor links before this fix)

## Assumptions & decisions
- Owner's sheets are the source of truth. Daily board (9 doctors) gives timings and fees. The 7 associated doctors (incl. Dr. Sridham Sutradhar and Dr. Shromona Kar) have no timings or fees on any sheet, so they become `visiting`, "By appointment", `fee: null`.
- Registration numbers are removed from the model, UI and schema (user instruction; also resolves the duplicate numbers on the board).
- Available days are not on the board, so `availableDays` is removed rather than guessed. No `openingHoursSpecification` is emitted for doctors.
- Stock avatars are removed; the initials monogram is used until real photos arrive.
- Test prices were never supplied (PRD §13 open question): prices removed, UI shows "Enquire for rates", no `Offer` in schema.
- Unconfirmed facts are not shown: Google rating, "8+ years", NABL wording, centre hours. Hours are read from `CENTRE_INFO` and shown only when `verified.hours` is true; otherwise "Call to confirm timings".
- One address string: `CENTRE_INFO.formattedAddress` = `SMC Point, Ghungoor, Opp. SMCH, Behind Maruti Medical, Silchar, Assam 788014`, used everywhere.
- Doctor slugs are unchanged so no URLs break.
- Out of this change: `/api/enquiry` + zod (the WhatsApp flow needs no server yet), reviews section (needs real review data), setting `NEXT_PUBLIC_SITE_URL` (deploy config).

## Files that will change
- `data/doctors.ts`, `data/tests.ts`, `data/centre.ts`, `data/faqs.ts`
- `lib/schema.ts`, `lib/seo.ts`
- `app/doctors/page.tsx`, `app/doctors/[slug]/page.tsx`, `app/tests/[slug]/page.tsx`, `app/contact/page.tsx`, `app/booking/page.tsx`, `app/about/page.tsx`, `app/not-found.tsx` (new)
- `components/doctor-directory.tsx`, `doctor-card.tsx`, `doctor-appointment-card.tsx`, `doctor-preview-section.tsx`, `booking-form.tsx`, `test-card.tsx`, `test-directory.tsx`, `hero.tsx`, `footer.tsx`, `header.tsx`, `location-map-section.tsx`, `services-preview-section.tsx`, `facility-highlights-section.tsx`
- `next.config.ts` (security headers)
- Delete: `components/ui/button.tsx`, `public/avatars/*`; remove `@base-ui/react`, `class-variance-authority` from `package.json`

## Implementation requirements
1. **Crawlable doctor list:** `/doctors` Suspense fallback renders the full server-side grid of `DoctorCard`s so all 16 profile links are in the static HTML. The client directory replaces it after hydration.
2. **Footer doctor index:** the footer lists every doctor by name, linking to their profile, so every page links to every doctor page.
3. **Doctor directory:** department is derived from the URL (no setState-in-effect). Search is local state initialised from `?q=`.
4. **Booking form:** no sync effect; doctor and test are matched by slug (links pass `?doctor=<slug>` / `?test=<slug>`); local-date `min`; neutral placeholder number; `aria-live` error; `aria-pressed` tabs; `fieldset`/`legend` for the category.
5. **Test card:** category-to-icon map at module scope.
6. **Counts:** use `DOCTORS.length` and the daily/visiting split, not a hard-coded 16.
7. **Links:** footer "Tests" goes to `/tests`, About is added; hero "Book a test" goes to `/booking?type=test`; services lists link to `/tests/[slug]` where a page exists.

## UI & styling
- Remove ALL-CAPS labels (`uppercase tracking-wider`) and arrow icons glued to links.
- Sentence case for the headings touched.
- Filter chips, header icon buttons and card "Book" pills at least 48px tall.
- Remove the dead `prose` classes.

## Security & data integrity
- Security headers: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`.
- No invented credentials, prices, ratings or hours.

## SEO & structured data
- `Physician`: no registration identifier, no fabricated hours, `priceRange` only for doctors with a fee, `hasCredential` from the corrected qualifications.
- Doctor bios open with full name, specialty and chamber at Maruti Diagnostic Centre, Ghungoor (AGENTS.md §9). They are factual and unique per doctor.
- `CONTENT_UPDATED` bumped to 2026-10-03.

## Acceptance criteria
- [ ] `.next/server/app/doctors.html` contains 16 unique `/doctors/dr-…` links
- [ ] Every page's footer links to all 16 doctors
- [ ] Qualifications match the owner's sheets; no registration numbers anywhere
- [ ] Associated doctors show "By appointment", no fee
- [ ] No stock avatars, test prices, Google rating, NABL or "8+ years" claims
- [ ] One address string across footer, contact, map section, FAQs, llms.txt
- [ ] `npm run lint` clean, `npx tsc --noEmit` clean, `npm run build` succeeds

## Checks to run
- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`
- `grep -o 'href="/doctors/dr-[^"]*"' .next/server/app/doctors.html | sort -u | wc -l` returns 16
