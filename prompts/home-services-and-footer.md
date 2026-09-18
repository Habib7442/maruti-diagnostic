# Implementation Specification: Home Page Services Preview, Facility Pillars & Full Footer

## 1. Goal
Complete the Maruti Diagnostic Centre home page (`/`) by adding an authentic **Diagnostic Services Preview**, a genuine **Facility Highlights / Why Maruti** section (strictly NO fake reviews), an **Interactive Location & Map section**, and a comprehensive **Brand Footer** with exact NAP and footer navigation.

---

## 2. What Was Read
- User instruction: *"ok option 1 but dont give any review ok i dont want any fake data ok"* -> **Strictly ZERO invented reviews or fake testimonials.**
- `AGENTS.md`:
  - §4 UI Rules: Background rhythm (`paper` → `clay` → `paper` → `ink`), card radii (`rounded-2xl`), typography (`Fraunces` headings, `Hanken Grotesk` body), dark rhythm footer in `--ink` (`#16293E`).
  - §8.1 Exact NAP: Byte-for-byte GBP address matching.
- `DESIGN.md`: Card styling, hairline borders (`--line`), pill buttons, mobile responsiveness (375px to 1200px).
- `data/centre.ts`: Exact address, phone numbers, WhatsApp, coordinates, and hours.
- `data/tests.ts`: Diagnostic tests and categories.

---

## 3. Assumptions & Decisions
- **No Mock / Fake Reviews**: We will not display any fabricated patient testimonials. Instead, we showcase verified centre facts: 16 daily specialists, NABL-guided automated laboratory, digital X-ray and USG on-site, central location opposite SMCH.
- **Diagnostic Services Preview Component (`components/services-preview-section.tsx`)**:
  - Highlights 4 key diagnostic modalities:
    1. Pathology & Biochemistry (Automated analyzers, same-day reports)
    2. High-Resolution Ultrasound / USG (Abdominal, pelvic & obstetric)
    3. Low-Dose Digital X-Ray (Chest, bone & spine radiography)
    4. 12-Lead ECG & Video Endoscopy (Cardiac rhythm & upper GI diagnostic imaging)
  - Each card provides turnaround reassurance, key investigations, and direct WhatsApp booking trigger.
  - Link to `/booking?type=test`.
- **Facility Pillars / Why Choose Maruti (`components/facility-highlights-section.tsx`)**:
  - 4 authentic clinical reasons patients choose Maruti Diagnostic:
    - 16 Specialists under one roof
    - Direct proximity to SMCH (SMC Point, Ghungoor, behind Maruti Medical)
    - Same-day evening test turnaround
    - Transparent pricing & walk-in token distribution
- **Location & Interactive Map Section (`components/location-map-section.tsx`)**:
  - Exact GBP address, phone numbers (`9957832872`, `6003951660`), operating hours (Mon-Sat 7:30 AM - 8:30 PM, Sun 8:00 AM - 2:00 PM).
  - Interactive Google Maps embed + one-tap directions link.
  - Direct WhatsApp booking button with official icon.
- **Site Footer (`components/footer.tsx`)**:
  - Dark container in `--ink` (`#16293E`).
  - Brand logo + tagline.
  - Links to Doctors, Tests & Services, Book Appointment, and Contact.
  - Exact NAP block.
  - Medical guidance disclaimer and copyright notice.
- **Integration**:
  - Mount components in [`app/page.tsx`](file:///e:/Web%20Dev/maruti-diagnostic/app/page.tsx) following the design rhythm:
    `Hero` (paper) → `DoctorPreviewSection` (clay/20) → `ServicesPreviewSection` (paper) → `FacilityHighlightsSection` (clay/30) → `LocationMapSection` (paper) → `Footer` (ink in layout).

---

## 4. Files That Will Change
- `components/services-preview-section.tsx` [NEW]: Diagnostic modalities preview with test details and booking buttons.
- `components/facility-highlights-section.tsx` [NEW]: Authentic facility strengths and clinical pillars (no fake reviews).
- `components/location-map-section.tsx` [NEW]: Exact NAP block, interactive Google Map embed, and contact triggers.
- `components/footer.tsx` [NEW]: Comprehensive dark brand footer.
- `app/layout.tsx` [MODIFY]: Mount `<Footer />` so it displays across all pages above the mobile sticky bar.
- `app/page.tsx` [MODIFY]: Assemble home sections in natural visual rhythm.

---

## 5. UI & Styling Specifications (per `DESIGN.md`)
- **Tokens**:
  - Cards: `bg-surface border border-line rounded-2xl p-6 sm:p-8`
  - Footer: `bg-ink text-paper border-t border-ink/20`
  - Headings: `font-display font-medium text-ink` in `Fraunces`
  - Body & UI: `font-sans text-ink-soft leading-relaxed` in `Hanken Grotesk`
  - Buttons: Full pill (`rounded-full`) in signature `--red` with `--red-deep` hover.
  - WhatsApp CTA: Official icon from `/social-icons/whatsapp.png`.

---

## 6. Acceptance Criteria
- [ ] Diagnostic services preview section renders on Home page with Pathology, USG, X-Ray, ECG, and Endoscopy.
- [ ] Facility highlights section displays authentic centre capabilities with zero fake reviews.
- [ ] Exact NAP location block matches Google Business Profile byte-for-byte.
- [ ] Interactive Google Map embed loads cleanly with driving directions button.
- [ ] Footer renders on all pages with brand logo, exact NAP, hours, and quick navigation.
- [ ] `npm run build` succeeds with 0 errors.

---

## 7. Checks to Run
- `npm run build`
- Verify responsive layout across mobile (375px) and desktop (1200px)

