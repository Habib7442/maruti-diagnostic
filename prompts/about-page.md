# Implementation Specification: About Page (`/about`)

## 1. Goal
Build the official About Page (`/about`) for Maruti Diagnostic Centre, articulating the facility's founding background in Ghungoor opposite SMCH, its role as the chamber hub for 16 local medical specialists, clinical laboratory quality protocols, diagnostic equipment capabilities, and patient care commitments.

---

## 2. What Was Read
- `AGENTS.md`:
  - §1 Scope: About page (centre background, quality protocols, lab equipment overview, team/leadership).
  - §4 UI Rules: Brand color tokens, Fraunces headings, Hanken Grotesk body, pill buttons, exact NAP.
- `PRD.md`: §1 Summary & Core Problem, §9 Non-functional requirements (trust & compliance, plain-language copy, zero misleading claims).
- User rule: No fake data or fake reviews.

---

## 3. Assumptions & Decisions
- **Authentic Narrative**: Emphasize Maruti Diagnostic Centre's strategic position at SMC Point, Ghungoor, opposite Silchar Medical College & Hospital (behind Maruti Medical), bridging the gap between clinical consultations and reliable diagnostic testing.
- **Core Content Pillars on `/about`**:
  1. **Facility Overview & Founding Mission**: Serving families across Silchar, Hailakandi, Karimganj, and the Barak Valley with accessible, accurate diagnostics and specialist chambers.
  2. **The 16-Specialist Chamber Hub**: How Maruti serves as a daily consulting facility for top practitioners across 9 medical specialties.
  3. **Quality Standards & Quality Control**: Automated analyzers, daily calibration routines, single-use vacuum phlebotomy tubes, and physician report validation.
  4. **Diagnostic Equipment & Department Overview**: Pathology, high-resolution sonography (USG), low-dose digital X-ray, and cardiology leads.
  5. **Centre Values**: Patient dignity, punctuality, fair and transparent pricing, and prompt report delivery.
- **Structured Data**: Injects `AboutPage` and `MedicalClinic` JSON-LD schema with exact NAP, operating hours, and telephone assistance.
- **Direct Action**: Sticky/prominent CTAs to view doctors (`/doctors`), explore tests (`/tests`), and book an appointment via WhatsApp (`+91 99578 32872`).

---

## 4. Files That Will Change
- `app/about/page.tsx` [NEW]: Server Component About Page with semantic structure, editorial typography, and structured data.

---

## 5. UI & Styling Specifications (per `DESIGN.md`)
- Container: 12-column grid max-width 1240px.
- Typography: `Fraunces` for display headers (`font-display font-medium text-ink`), `Hanken Grotesk` for body copy (`text-base sm:text-lg text-ink-soft leading-relaxed`).
- Layout:
  - Hero Header with breadcrumbs and key facility statistics (16 Specialists, 8+ Years of Service, 4 Core Diagnostic Departments, Opp. SMCH Landmark).
  - Mission & Story section (`bg-surface border-line rounded-2xl sm:rounded-3xl p-8 sm:p-12`).
  - Quality Protocols 4-Card Grid (Daily Controls, Sterile Phlebotomy, Rapid Turnaround, Physician Oversight).
  - Diagnostic Capabilities Strip (Pathology, USG, Digital X-Ray, ECG).
  - Bottom CTA block linking to doctor directory and WhatsApp booking.

---

## 6. Acceptance Criteria
- [ ] Navigating to `/about` displays the complete About page.
- [ ] Narrative accurately describes Maruti Diagnostic Centre, SMC Point, Ghungoor, opposite SMCH, behind Maruti Medical.
- [ ] No fake reviews or fabricated patient testimonials exist.
- [ ] SEO metadata includes canonical URL and OpenGraph data.
- [ ] `MedicalClinic` / `AboutPage` JSON-LD schema is present.
- [ ] All internal links (`/doctors`, `/tests`, `/booking`, `/contact`) and WhatsApp buttons work.
- [ ] `npm run build` succeeds with 0 errors.

---

## 7. Checks to Run
- `npm run build`
- Verify responsive layout across mobile and desktop

