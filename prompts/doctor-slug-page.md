# Implementation Specification: Dedicated Doctor SEO Pages (`/doctors/[slug]`)

## 1. Goal
Build high-performance, indexable, SEO-first dedicated landing pages for each of the 16 medical specialists consulting at Maruti Diagnostic Centre (`/doctors/[slug]`), targeting #1 Google ranking for `"<doctor name> Silchar"`, featuring rich `Physician` JSON-LD structured data, authentic biographical copy, OPD schedules, fees, conditions treated, and direct 1-tap Call/WhatsApp booking actions.

---

## 2. What Was Read
- `AGENTS.md`: Vibe engineering workflow, design guardrails, Next.js 16 async dynamic route params rule, duplicate registration number safeguards.
- `DESIGN.md`: Color tokens (`--paper`, `--surface`, `--ink`, `--red`, `--clay`, `--line`), typography (`Fraunces` for display, `Hanken Grotesk` for UI/body), card styling, pill buttons, touch target sizing.
- `PRD.md`: Section 7 (Doctor Model), Section 8 (SEO requirements, slug formats, JSON-LD), Section 12 (verified data constraints).
- `data/doctors.ts`: All 16 doctor records, departments, and timings.
- `data/centre.ts`: Exact NAP, phones (`9957832872`, `6003951660`), WhatsApp deep links, and clinic coordinates.

---

## 3. Assumptions & Decisions
- **Next.js 16 Async Dynamic Route Parameters**: Route props in Next.js 16 App Router are promises (`params: Promise<{ slug: string }>`). We will `await params` before extracting `slug`.
- **Static Site Generation (SSG)**: We will implement `generateStaticParams()` to statically prerender all 16 doctor profile pages at build time for instant mobile loading and optimal search crawler indexing.
- **Dynamic SEO Metadata**: `generateMetadata()` will produce custom, title-cased metadata with title, meta description, and OpenGraph data targeting `"<doctor name> Silchar"`.
- **Structured Data**: Every profile page will inject a valid `Physician` JSON-LD schema referencing `Maruti Diagnostic Centre` via `memberOf` / `MedicalClinic`.
- **Registration Number Safety**: Doctors with pending registration verification (e.g. Dr. Bashab Bijoy Roy, Dr. Fakrul Islam Mozumder, Dr. Sujit Nath Choudhury) will display "Verification pending" without rendering fabricated numbers.
- **WhatsApp Deep Link**: Prefilled with: `Hello Maruti Diagnostic, I would like to book an appointment with Dr. [Doctor Name] at your Ghungoor chamber.`

---

## 4. Files That Will Change
- `data/doctors.ts` [MODIFY]: Add helper functions `getDoctorBySlug(slug: string)` and `getAllDoctorSlugs()`.
- `app/doctors/[slug]/page.tsx` [NEW]: Dedicated Server Component page with async params, `generateStaticParams`, `generateMetadata`, JSON-LD schema, and complete profile UI.
- `components/doctor-appointment-card.tsx` [NEW]: Dedicated sticky/action booking card component for chamber fee, timing, available days, and click-to-call / WhatsApp links.
- `app/doctors/page.tsx` [NEW]: Full searchable/filterable Doctor Directory index page allowing visitors to discover all 16 specialists by department.

---

## 5. UI & Styling Specifications (per `DESIGN.md`)
- **Background Rhythm**: Base `--paper` (`#F5F1EC`) with elevated `--surface` (`#FCFAF7`) for cards and containers; hairline borders in `--line` (`#E6DFD6`).
- **Typography**:
  - H1 headline in `Fraunces` (`font-display font-medium text-ink`).
  - Doctor specialty in `--red` (`#BC3B2C font-semibold`).
  - Section subheadings in `Fraunces` (`font-display text-2xl text-ink`).
  - Body copy in `Hanken Grotesk` (`font-sans text-ink leading-relaxed`, base ≥17px).
- **Layout**:
  - Breadcrumb: `Home / Doctors / [Doctor Name]`.
  - 2-Column Desktop Grid (8 cols main bio & conditions, 4 cols sticky appointment & timing card).
  - Stacked Mobile Layout with high-priority timing & Call/WhatsApp actions visible above the fold.
  - "Conditions Treated" rendered as clean chips/tags in `bg-surface border border-line rounded-lg`.
  - "Patient Guidance" card explaining token collection, OPD arrival time, and location opposite SMCH Ghungoor.
  - "Other Specialists in [Department]" preview grid at the bottom.

---

## 6. Security & Data Integrity Requirements
- Static telephone and WhatsApp URLs (`tel:9957832872`, `https://wa.me/919957832872?...`).
- Safe parameter encoding using `encodeURIComponent` for doctor names in deep links.
- Verified or neutral registration numbers only.

---

## 7. Acceptance Criteria
- [ ] Navigating to `/doctors/dr-sridham-sutradhar-neurosurgeon-silchar` displays Dr. Sridham Sutradhar's full profile.
- [ ] All 16 doctor slugs resolve without 404.
- [ ] Invalid slug returns standard Next.js 404 (`notFound()`).
- [ ] Dynamic `<title>` matches format: `Dr. [Name] — [Specialty] in Silchar | Maruti Diagnostic Centre`.
- [ ] Valid `Physician` JSON-LD schema tag is present in HTML `<head>` / page body.
- [ ] Direct Call links point to `tel:9957832872` and `tel:6003951660`.
- [ ] WhatsApp button opens WhatsApp with pre-filled message mentioning the specific doctor's name.
- [ ] `npm run build` passes with all 16 doctor routes statically prerendered.

---

## 8. Checks to Run
- `npm run build`
- Verify static route generation for all 16 doctor paths
- Verify responsive layout and JSON-LD schema syntax

