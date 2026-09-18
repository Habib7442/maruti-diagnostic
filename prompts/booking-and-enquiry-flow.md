# Implementation Specification: Booking & Enquiry System (`/booking`, `/contact`, `/api/enquiry`)

## 1. Goal
Build a dedicated, high-converting Patient Booking & Appointment Request page (`/booking`), complete the official Contact & NAP page (`/contact`), and implement the secure backend enquiry submission route (`POST /api/enquiry`) with WhatsApp dispatch, 10-digit phone validation, and honeypot spam protection.

---

## 2. What Was Read
- `AGENTS.md`:
  - §1 Scope: In-scope enquiry/booking form + WhatsApp/phone dispatch; strictly out-of-scope: payment gateways and patient login portals.
  - §4 UI Rules: Brand color tokens, Fraunces headings, Hanken Grotesk body, pill buttons, 10px input radii.
  - §6 Architecture: Thin route handler validating payloads with Zod; silent bot drop on honeypot.
  - §8.1 Exact NAP: Byte-for-byte GBP address matching.
  - §8.3 Test / Service Model (`data/tests.ts`).
  - §10 API Contracts: `POST /api/enquiry`.
- `PRD.md`: §6.5 Contact, §7 Tests catalogue seed list, §8 Local SEO NAP requirements.
- `DESIGN.md`: Form input styling, error state tokens, touch target sizing (≥48px).

---

## 3. Assumptions & Decisions
- **Unified Booking Engine**: Build `components/booking-form.tsx` as a reusable, reactive Client Component that supports deep linking via URL query parameters (`?doctor=...`, `?test=...`, `?type=...`).
- **Two Strategic Landing Surfaces**:
  - `/booking`: Distraction-free, high-converting booking experience with quick specialist/test selector, timing reassurances, and instant WhatsApp dispatch.
  - `/contact`: Full NAP contact hub with interactive Google Maps embed, phone lines, operating hours, and the embedded booking form.
- **Data Catalogues**:
  - Create `data/tests.ts` containing common diagnostic tests (Pathology, Digital X-Ray, USG, ECG, Endoscopy) per `PRD.md` §7.
- **Backend API Contract (`POST /api/enquiry`)**:
  - Strict Zod validation on patient mobile (10-digit Indian mobile `^[6-9]\d{9}$`).
  - Honeypot anti-spam field (`hp`). If filled, silently drops and returns `{ success: true }`.
  - Structured logging for operational audit.
- **Patient Handoff**: After form submission, provide an immediate one-tap button: *"Send to WhatsApp Now"*, pre-filled with their exact booking request details.

---

## 4. Files That Will Change
- `data/tests.ts` [NEW]: Medical test catalogue model and seed data (Pathology, Imaging, Cardiac, Endoscopy).
- `app/api/enquiry/route.ts` [NEW]: Serverless API route handling enquiry submissions with Zod validation and honeypot bot defense.
- `components/booking-form.tsx` [NEW]: Interactive client booking form with tabs (Doctor vs Test), input validations, and WhatsApp dispatch trigger.
- `app/booking/page.tsx` [NEW]: Dedicated appointment booking landing page.
- `app/contact/page.tsx` [NEW]: Official Contact & Location page with exact NAP block, Google Map embed, and booking form.

---

## 5. UI & Styling Specifications (per `DESIGN.md`)
- **Container**: Elevated `--surface` (`#FCFAF7`) card on `--paper` background with `--line` border.
- **Form Controls**:
  - Inputs & selects: `rounded-[10px] bg-paper border border-line p-3 text-sm focus:border-red focus:outline-none`.
  - Mode Switcher: Pill tabs (`rounded-full`) with active state in `--red text-white`.
  - Submit Button: Signature `--red` (`#BC3B2C`), hover `--red-deep` (`#9C2A20`), full pill radius with loading spinner.
- **Feedback & Trust**:
  - Clear success modal/card with reference summary and one-tap WhatsApp deep link.
  - Quick reception notice: *"Tokens distributed daily at counter. Prior call advised for emergency slots."*

---

## 6. Acceptance Criteria
- [ ] Navigating to `/booking` renders the interactive appointment booking form.
- [ ] Navigating to `/contact` renders the contact hub with exact NAP block, interactive Google Map embed, and booking form.
- [ ] Query parameter `?doctor=Dr.+Sridham+Sutradhar` automatically pre-selects Doctor Appointment mode and Dr. Sridham Sutradhar.
- [ ] `POST /api/enquiry` validates name, 10-digit mobile number, and returns `{ success: true }`.
- [ ] Honeypot submission silently returns `{ success: true }` without logging spam.
- [ ] Successful submission presents the user with an option to launch WhatsApp with pre-filled details.
- [ ] `npm run build` completes with 0 errors.

---

## 7. Checks to Run
- `npm run build`
- Verify form submission with valid and invalid data
- Verify mobile viewport layout (375px)

