# PRD.md — Maruti Diagnostic Centre Website

Product Requirements Document. Pairs with `DESIGN.md` (visual system) — this file
covers scope, features, content, SEO, and build. Read both before starting.

---

## 1. Summary

An SEO-first marketing website for **Maruti Diagnostic Centre**, Ghungoor / SMC Point,
Silchar-14 (opposite SMCH, behind Maruti Medical). The centre offers pathology, X-ray,
ECG, ultrasound and endoscopy, and is the daily chamber for ~16 local specialists.

The single biggest goal: **when someone searches a doctor's name who consults here,
Maruti should rank at the top** — via a dedicated, indexable page per doctor plus a
correctly optimised Google Business Profile. The site also drives calls, WhatsApp
enquiries and test bookings from local search.

---

## 2. Goals & success metrics

**Primary**
- Rank on page 1 (ideally #1) for `"<doctor name> Silchar"` for the centre's doctors.
- Appear in the Google local pack for "diagnostic centre Silchar / Ghungoor",
  "blood test near me", "ultrasound Silchar", etc.

**Secondary**
- Increase GBP actions: calls, direction requests, website clicks.
- Website conversions: click-to-call, WhatsApp taps, booking/enquiry form submits.
- Organic impressions for test-name and specialty queries.

**Health / quality**
- Core Web Vitals: all "Good" on mobile.
- Fully usable on a mid-range Android on a slow connection.

> Track these in Google Search Console + GBP Insights + GA4. Set baselines at launch;
> don't invent target numbers before we have data.

---

## 3. Non-goals (out of scope for v1)

- Online payments / e-commerce.
- Patient login, report download portal, EHR.
- Online real-time slot booking with a calendar backend (v1 booking = enquiry form +
  call/WhatsApp; real scheduling is a later phase if the client wants it).
- Blog/articles (optional Phase 2 for SEO depth).
- Multi-language UI at launch (built to be added later — see §9).

---

## 4. Users & primary journeys

| User | Goal | Journey |
|------|------|---------|
| Patient searching a doctor's name | Find that doctor & how to visit | Google → doctor page → call / timing / directions |
| Patient needing a test | Know if Maruti does it + how to book | Google/home → Tests → test page → book / call |
| Local resident | Trust & basics (hours, location, reviews) | Home → contact / map / reviews |
| Referred patient (from SMCH) | Confirm it's nearby & open | Home → hours + directions |
| Elderly / low-vision user | Just call | Any page → big click-to-call always visible |

Design for mobile-first; most traffic will be phones.

---

## 5. Information architecture

Per `DESIGN.md` §11:

```
/                     Home
/doctors              Doctor directory (filter by specialty)
/doctors/[slug]       One page per doctor   ← ranks for the name
/tests                Tests & services (filter by type)
/tests/[slug]         One page per key test
/about                About + accreditation + team
/contact              Map, hours, NAP, WhatsApp, enquiry form
```

Persistent: sticky header (logo, Doctors, Tests, Contact, "Book a test"), and a
mobile sticky **Call / WhatsApp** bar.

---

## 6. Functional requirements

### 6.1 Home
- Hero: real photo, plain trust line, `Book a test` + `Call now`, trust strip
  (Google rating, "reports on time", "16 specialists").
- Sections: quick specialty finder → featured/all services → why Maruti (trust) →
  meet the doctors (preview grid → link to /doctors) → reviews (pulled/curated from
  Google) → location + hours + map → CTA band.

### 6.2 Doctor directory `/doctors`
- Grid of doctor cards (see DESIGN.md component).
- Filter/search by specialty (chips: Medicine, Gynaecology, ENT, Orthopaedics,
  Paediatrics, Dermatology, Neurosurgery, Neuro-psychiatry, Surgery…).
- Each card links to the doctor's page.

### 6.3 Doctor page `/doctors/[slug]` — **most important**
- H1 = `Dr. <Name> — <Specialty>, Silchar`.
- Photo (or clean monogram), qualifications, registration no., chamber timing, fee.
- Unique intro paragraph naming the doctor + conditions/services (real, not templated).
- Sticky/visible `Call` + `Book` actions.
- Map + address (identical NAP).
- Internal links to related specialists + back to directory.
- `Physician` + `MedicalClinic` JSON-LD (see §8).

### 6.4 Tests `/tests` and `/tests/[slug]`
- `/tests`: grouped/filterable list (Pathology, Imaging, Cardiac, Endoscopy).
- Key tests get their own page (thyroid profile, X-ray, USG, CBC, HbA1c, etc.) with
  plain-language "what it is / why it's done / how to book" + schema.

### 6.5 Contact `/contact`
- NAP block (exact), Google Map embed, hours, both phone numbers (click-to-call),
  WhatsApp link, and an enquiry/booking form.
- Form fields: name, phone, test or doctor (optional), preferred date, message.
  Submits to email + WhatsApp; simple, no login. Spam protection (honeypot/hCaptcha).

### 6.6 Global
- Click-to-call and WhatsApp reachable from every page.
- 404 and empty states give direction, not mood (DESIGN.md §9).

---

## 7. Content model

### Doctor
```
name, slug, specialty, qualifications[], registrationNo, photo?,
chamberTiming, fee?, type ("daily" | "visiting"), bio (unique paragraph),
conditionsTreated[], displayOrder
```

**Seed data (verify ⚠ before publishing — see §12):**

*Daily chamber*
| Name | Specialty | Reg. No. | Timing · Fee |
|------|-----------|----------|--------------|
| Dr. Surajit Kr. Sen | Neuro-Psychiatrist | 4043 (AMC) | 3–4 pm · ₹600 |
| Dr. Rajsekhar Chakraborty | Medicine / Physician | 21469 (AMC) | 4–5 pm · ₹500 |
| Dr. Rieona Saha | Gynaecologist | 24142 (AMC) | 4–5 pm · ₹500 |
| Dr. Saleha Choudhury | ENT | 23977 (AMC) | 4–5 pm · ₹500 |
| Dr. Bashab Bijoy Roy | Laparoscopic Surgeon | ⚠ 23977 (dup) | 4–5 pm · ₹500 |
| Dr. Sourav Nath | Consultant Physician | 21524 (AMC) | 4–5 pm · ₹500 |
| Dr. N. Hrangchal | Orthopaedics | 22501 (AMC) | 4–5 pm · ₹500 |
| Dr. Sujit Nath Choudhury | Paediatrician | ⚠ 22501 (dup) | 4–5 pm · ₹500 |
| Dr. Fakrul Islam Mozumder | ENT | ⚠ 22501 (dup) | 4–5 pm · ₹500 |

*Visiting / associated*
| Name | Specialty | Reg. No. |
|------|-----------|----------|
| Dr. Ayan Purkayastha | Medicine & Diabetes | — |
| Dr. Sauradeep Sarkar | General & Laparoscopic Surgeon | — |
| Dr. Bagdatta Paul | ENT Surgeon | — |
| Dr. Siddhartha K. Dutta | Medicine & Gastroenterology | — |
| Dr. Mina Mazumder | Paediatrics | — |
| Dr. Shromona Kar | Dermatologist | 24482 (AMC) |
| Dr. Sridham Sutradhar | Neurosurgeon | ACMR-21736 |

### Test / Service
```
name, slug, category ("Pathology" | "Imaging" | "Cardiac" | "Endoscopy"),
shortDesc (plain language), price?, prepInstructions?
```
Seed: CBC, LFT, KFT, Lipid Profile, Blood Sugar (FBS/PPBS/RBS), HbA1c, Thyroid
Profile (T3 T4 TSH / FT3 FT4 TSH / TSH), Vitamin D3, Vitamin B12, Anti-CCP, IgE, ASO,
RF, CRP, Urine R/E, Bilirubin, SGPT, Creatinine, Uric Acid, Digital X-ray (Chest PA),
Ultrasound / USG (Whole Abdomen), ECG, UGI Endoscopy.

### Location / NAP (single source of truth — used site-wide + must match GBP)
```
name:  Maruti Diagnostic Centre
addr:  SMC Point, Ghungoor, Opp. SMCH, Behind Maruti Medical, Silchar, Cachar,
       Assam 788014
phone: 9957832872 (primary), 6003951660
hours: ⚠ TBD (see §12)
```

---

## 8. SEO requirements (core)

**Doctor-name ranking**
- One indexable page per doctor; name in `<title>`, `<h1>`, first sentence, URL slug
  (`/doctors/dr-sridham-sutradhar-neurosurgeon-silchar`).
- Unique body copy per doctor (no shared boilerplate).
- `Physician` JSON-LD (name, medicalSpecialty, memberOf → the clinic) +
  `MedicalClinic`/`MedicalBusiness` JSON-LD on the site.

**Local SEO**
- **NAP identical** across website, Google Business Profile, and every directory
  (Justdial, Practo, Sulekha, etc.) — byte-for-byte.
- `LocalBusiness` schema with geo, hours, phone, sameAs (GBP + social).
- Link the live domain in the GBP once it's live.
- Location/landmark keywords used naturally (Ghungoor, SMC Point, opposite SMCH).

**Technical SEO**
- SSG/ISR (static HTML for crawlers), clean semantic HTML, one `<h1>` per page.
- `sitemap.xml`, `robots.txt`, canonical URLs, Open Graph + Twitter cards.
- `next/image` (optimised, lazy), descriptive `alt` text on every image.
- Fast: Core Web Vitals "Good" on mobile.
- `FAQPage` schema on relevant pages; `AggregateRating`/`Review` from real Google
  reviews only.

**Content SEO**
- Test pages target test-name + "Silchar" queries.
- Plain-language copy (see §9) — also helps featured snippets.

---

## 9. Non-functional requirements

- **Mobile-first & responsive**; usable on small mid-range Android.
- **Accessibility:** WCAG AA — ≥17px body, AA contrast, ≥48px tap targets, visible
  focus, labelled forms, reduced-motion respected (DESIGN.md §10).
- **Performance:** LCP < 2.5s on 4G mobile; minimal JS; static-first.
- **Voice:** all patient-facing copy is plain, warm, non-technical — no jargon (the
  audience is families and local patients).
- **i18n-ready:** structure content so an Assamese/Bengali toggle can be added later
  without a rebuild (fonts noted in DESIGN.md §3).
- **Privacy:** enquiry form collects only what's needed; a short privacy note; no
  patient medical data stored.
- **Trust/compliance:** publish only verified registration numbers and real
  accreditations; no misleading claims.

---

## 10. Tech stack & architecture

- **Framework:** Next.js (App Router), SSG + ISR for SEO.
- **Styling:** Tailwind, tokens mapped from DESIGN.md §12.
- **Fonts:** `next/font/google` — Fraunces + Hanken Grotesk.
- **Content (v1):** typed JSON/MDX in-repo for doctors & tests (~16 + ~25 items —
  a CMS is overkill for launch). Add a lightweight CMS (e.g. Sanity) later *only if*
  the client needs to self-edit.
- **Forms:** serverless route → email (Resend) + WhatsApp deep link; spam protection.
- **Hosting:** Vercel. Custom domain once confirmed (see §12).
- **Analytics:** GA4 + Google Search Console + GBP Insights. Event tracking on
  call / WhatsApp / form / directions clicks.

---

## 11. Roadmap / phasing

- **Phase 0 (done / in progress):** Google Business Profile — claimed, verifying,
  details corrected.
- **Phase 1 (MVP site):** Home, /doctors + doctor pages, /tests + key test pages,
  /contact, schema, sitemap, GBP linked. **Ship this first — it's what ranks.**
- **Phase 2:** FAQ pages, reviews automation, blog/health articles, more test pages.
- **Phase 3 (optional):** bilingual toggle, real appointment scheduling, report portal.

---

## 12. Dependencies — needed from client (blockers flagged)

1. ⚠ **Centre opening hours + weekly off** — blocks GBP hours and Contact page.
2. ⚠ **Correct registration numbers** for the duplicated ones (Dr. Bashab Bijoy Roy,
   Dr. Sujit Nath Choudhury, Dr. Fakrul Islam Mozumder) — do **not** publish wrong
   medical reg numbers.
3. ⚠ **Domain**: is `marutidiagnostic.com` actually registered? Confirm/register
   before wiring it into GBP and site.
4. ⚠ **Which number has WhatsApp** (9957832872 vs 6003951660) — for the WhatsApp link.
5. Photos: real signboard, exterior, reception, machines, staff, logo (clean crop).
6. Per-doctor: photo (optional) + one-line bio / conditions treated.
7. Accreditations (NABL etc.), test price list (if to be shown), any home-collection
   service.
8. Confirm the pre-existing GBP reviews genuinely belong to this centre.

---

## 13. Open questions

- Show test prices publicly, or "call for rates"?
- Individual practitioner GBP listings for the marquee doctors (neurosurgeon,
  dermatologist, gold-medalist surgeons) — do now or Phase 2?
- Is there an email address for enquiry-form delivery?
- Any existing social profiles (Facebook/Instagram) to link via `sameAs`?