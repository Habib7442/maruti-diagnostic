# Implementation Prompt: Doctor Data Model & Home Doctor Preview Grid

## 1. Goal
Establish the typed single source of truth for Maruti Diagnostic Centre's 16 consulting medical specialists (`data/doctors.ts`), and build an interactive, filterable Doctor Preview section on the Home page featuring quick specialty chips and accessible doctor cards matching `DESIGN.md` specifications.

## 2. What Was Read
- `AGENTS.md` (Data model contract §8.2, UI rules §4, SEO rules §9, pitfalls §11)
- `DESIGN.md` (Doctor card wireframe §6, component rules §5, color tokens §2, typography §3)
- `PRD.md` (Product summary §1, doctor directory requirements §6.2, seed data table §7)
- Existing workspace files: `data/centre.ts`, `app/globals.css`, `app/layout.tsx`, `components/hero.tsx`.

## 3. Assumptions & Decisions
- **Registration Number Safety**: Per `PRD.md` §12 and `AGENTS.md` §11, duplicate registration numbers in seed data (Dr. Bashab Bijoy Roy, Dr. Sujit Nath Choudhury, Dr. Fakrul Islam Mozumder) and visiting specialists without verified numbers are marked as `"Verification pending"`. Fake registration numbers will never be invented.
- **Doctor Slug Convention**: Strictly follow `/doctors/dr-[name]-[specialty]-silchar` (e.g. `dr-sridham-sutradhar-neurosurgeon-silchar`).
- **Interactive Specialty Filter**:
  - Client component (`"use client"`) for instant, client-side filtering by medical department (All, Medicine, Gynaecology, ENT, Orthopaedics, Paediatrics, Dermatology, Neurosurgery, Surgery, Psychiatry).
  - Selected chip styled with solid `--red` (or `--ink`) and white text; unselected styled with `--surface` background and `--line` border.
- **Doctor Card Component**:
  - Elevated card with `--surface` background, `--line` 1px border, 16px radius.
  - Displays doctor's name in `Hanken 600` `--ink`, specialty in `--red`, qualifications in `--ink-soft`, daily chamber timing, consultation fee (₹500 / ₹600), and link to `/doctors/[slug]`.
  - Fallback monogram avatar with warm background when high-res portrait is unavailable.
- **Section Rhythm**:
  - Uses soft warm background (`bg-clay/20` or `--paper` with crisp divider) providing clean editorial rhythm directly beneath the Hero section.

## 4. Files That Will Change
- `data/doctors.ts` [NEW]: Complete typed records for all 16 consulting specialists (daily chamber & visiting).
- `components/doctor-card.tsx` [NEW]: Reusable doctor card component matching `DESIGN.md` §5 and §6.
- `components/doctor-preview-section.tsx` [NEW]: Interactive filterable section with specialty chips and doctor card grid.
- `app/page.tsx` [MODIFY]: Mount the Doctor Preview Section beneath the Hero.

## 5. Implementation Requirements
- Strong TypeScript typing with `Doctor` interface exported from `data/doctors.ts`.
- Zero `any` types.
- Semantic HTML (`<section>`, `<h2>`, `<article>`, `<h3>`).
- Accessible tap targets (≥48px for filter chips and buttons).
- Plain-language empty state ("No doctors found in this specialty — view all specialists or call our reception").

## 6. UI & Styling Specifications
- **Section Heading**: `Fraunces` H2 ("Consulting Specialists at Maruti", sentence case, `--ink`).
- **Subheading**: `Hanken Grotesk` ("Daily chambers for 16 leading specialists in Silchar. Walk in or reserve your slot.").
- **Cards**: `--surface: #FCFAF7`, border `--line: #E6DFD6`, radius 16px (`rounded-2xl`).
- **Specialty Label**: `--red: #BC3B2C` font-medium.
- **Action Links**: Clean "View profile & timings" button/link.

## 7. Security & Boundaries
- Static client-safe doctor data; no sensitive clinician private phone numbers exposed (all call links direct to reception `9957832872`).

## 8. Acceptance Criteria
- [ ] `data/doctors.ts` contains structured, typed records for all 16 doctors from `PRD.md` §7.
- [ ] Slugs adhere to `/doctors/dr-[name]-[specialty]-silchar`.
- [ ] Specialty filter chips allow instant filtering by department without page reload.
- [ ] Doctor cards display name, specialty, qualifications, timings, fee, and profile link.
- [ ] Section mounts cleanly on the Home page (`/`) below the Hero.
- [ ] `npm run lint` and `npm run build` pass with 0 errors.

## 9. Checks to Run
- `npm run lint`
- `npm run build`

