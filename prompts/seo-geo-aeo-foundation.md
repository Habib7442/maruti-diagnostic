# Implementation Specification: SEO / GEO / AEO Foundation

## 1. Goal
Build one centralised, data-driven SEO layer (`lib/seo.ts`, `lib/schema.ts`, `data/faqs.ts`, `sitemap.ts`, `robots.ts`, `llms.txt`) so every page ships correct metadata, canonical URLs, Open Graph/Twitter cards and valid JSON-LD, is ready for Google Search Console, and is easy for AI answer engines to quote, with the top KPI being `"<doctor name> Silchar"`.

Terminology used here:
- **SEO**: classic Google ranking (titles, canonicals, sitemap, robots, schema).
- **Local/geo**: Silchar / Ghungoor / opp. SMCH signals (NAP, geo, `areaServed`, `hasMap`, landmark copy).
- **AEO** (answer engine optimisation): answer-first copy plus visible FAQ blocks with matching `FAQPage` schema.
- **GEO** (generative engine optimisation): allow AI crawlers, ship `llms.txt`, keep one consistent entity graph so ChatGPT / Perplexity / Gemini / Google AI Overviews can cite the centre and each doctor accurately.

---

## 2. What Was Read
- `AGENTS.md`, `PRD.md` (§7 NAP, §8 SEO, §12 blockers), `DESIGN.md` (§9 voice, §11 URLs/SEO hooks).
- Next.js 16 docs: `01-app/02-guides/json-ld.md`, `03-file-conventions/01-metadata/sitemap.md`, `robots.md` (also `generate-metadata.md` / `manifest.md` referenced).
- Code: `app/layout.tsx`, `app/page.tsx`, `app/doctors/[slug]/page.tsx`, `app/tests/[slug]/page.tsx`, `data/centre.ts`, `data/doctors.ts`, `data/tests.ts`, `public/site.webmanifest`, `public/maruti-og-image.png` (1731x909).
- `git status`: `app/doctors/page.tsx` and `components/doctor-directory.tsx` have uncommitted user edits. **They will not be touched** except for swapping metadata/JSON-LD in `app/doctors/page.tsx` (see §4), and that edit will be applied on top of the current working copy.

### Problems found in the current code (fixed by this work)
1. **Duplicate title suffix bug.** Root layout has `template: "%s | Maruti Diagnostic Centre"`, but doctor and test `generateMetadata` already end titles with `| Maruti Diagnostic Centre`, so the rendered title becomes `... | Maruti Diagnostic Centre | Maruti Diagnostic Centre`.
2. **Domain hard-coded** in ~10 places (`https://marutidiagnostic.com`), while PRD §12 says the domain is unconfirmed.
3. **No `sitemap.xml`, no `robots.txt`, no `llms.txt`, no Twitter card, no `BreadcrumbList`, no `WebSite`/entity graph, no FAQ.**
4. **Unsafe JSON-LD serialisation**: `JSON.stringify` without escaping `<` (Next docs say to escape).
5. **Unverified facts published in schema**: `aggregateRating` (5.0 / 48) is hard-coded; opening hours are flagged "TBD" in PRD §12; `geo` coordinates are commented "To be verified"; WhatsApp number is unconfirmed.
6. **Doubtful schema on Physician**: `availableService` is filled with `MedicalProcedure` items that are really *conditions*, and `priceRange` is a raw string. Doctors with "Verification pending" registration must never emit an identifier.
7. Every page repeats its own full clinic object, so the NAP can drift.

---

## 3. Assumptions & Decisions
| # | Decision | Why |
|---|----------|-----|
| D1 | `SITE_URL` comes from `NEXT_PUBLIC_SITE_URL`, falling back to `https://marutidiagnostic.com`. All absolute URLs go through `absoluteUrl()`. | Domain unconfirmed (PRD §12.3); changing it later is a one-line env change. |
| D2 | **Remove `aggregateRating` from JSON-LD.** Keep the visible "5.0 on Google" trust strip. Add `verified.aggregateRating = false` gate in `centre.ts`; the builder emits it only when true. | Google ignores/penalises self-serving review markup on the business's own entity, and PRD says "real Google reviews only". A wrong rating in schema is a manual-action risk. |
| D3 | **Gate hours and geo in schema** behind `CENTRE_INFO.verified.hours` / `verified.geo` (both `false` today). When false, `openingHoursSpecification` and `geo` are omitted from JSON-LD; the visible page is unchanged. | Placeholder hours/coordinates in Google's data hurt local ranking and mislead patients. Client supplies the real values, then we flip two booleans. |
| D4 | Structured hours added to `centre.ts` (`openingHours[]` in 24h form) so schema is generated from data, not a string. | Single source of truth. |
| D5 | One **entity graph** with stable `@id`s: `${SITE_URL}/#clinic`, `/#website`, `/doctors/<slug>#physician`. Emitted site-wide from `app/layout.tsx`. Page-level schemas reference these by `@id` **and** embed a minimal inline `{@type,name,url,address}` so parsers that don't resolve cross-block refs still work. | Consistent NAP, less duplication, better entity understanding by Google and LLMs. |
| D6 | Clinic typed as `["MedicalClinic", "DiagnosticLab"]`. | Matches what it is (pathology and imaging lab plus doctor chambers). Both are valid schema.org `MedicalBusiness` subtypes. |
| D7 | Physician `medicalSpecialty` uses schema.org enum URLs via a mapping table (`Neurosurgery`, `Gynecologic`, `Otolaryngologic`, `Pediatric`, `Dermatology`, `Psychiatric`, `Musculoskeletal`/`Orthopedic`, `Gastroenterologic`, `Surgical`, `Endocrine`, `CommunityHealth` fallback...). Original text kept in `description`/`jobTitle`. | Google and LLMs read the enum better than free text. |
| D8 | Physician conditions go in `knowsAbout` (array of strings), not `availableService`. | `MedicalProcedure` was semantically wrong. |
| D9 | Physician `identifier` (registration) is emitted **only** when `registrationNo` is not "Verification pending" (helper `hasVerifiedRegistration()`). | AGENTS.md pitfall #1. |
| D10 | Physician chamber timing parsed to `openingHoursSpecification` (`opens`/`closes`, `dayOfWeek` from `availableDays`). | Answers "what time does Dr X sit" in rich results and AI answers. If parsing fails, the field is omitted (never guessed). |
| D11 | Test pages emit `MedicalWebPage` -> `about: MedicalTest`, plus `Service` (provider = clinic, `areaServed` Silchar, `Offer` only if `price` set). Replaces `DiagnosticProcedure`. | `MedicalTest` fits lab/imaging tests better, and `Offer` on `Service` is the valid place for price. |
| D12 | **FAQ**: visible `<FaqSection>` (native `<details>`, server component, no JS) plus matching `FAQPage` JSON-LD. Copy is generated only from real data fields (timing, fee, location, prep, turnaround) or from a small reviewed static list. **No invented claims** (no home collection, no NABL, no "cheapest"). | Google requires FAQ markup to match visible text. Note: Google restricts FAQ *rich results* to authoritative health/government sites, so the clinic may not get the visual snippet, but the markup and text still feed AI answers and People-Also-Ask style matching. |
| D13 | `robots.ts`: allow all; disallow `/api/`; point to sitemap; **explicitly allow AI crawlers** (`GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-SearchBot`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`). Kept as one editable constant. | Visibility in AI answers is the goal. Easy to flip if the client objects. |
| D14 | `app/llms.txt/route.ts` generates `/llms.txt` (markdown: centre summary, NAP, hours only if verified, doctor list with links and timings, tests list with links). Static, cached. | GEO. Cheap, machine-readable summary from the same data. |
| D15 | Sitemap `lastModified` uses a manually bumped `CONTENT_UPDATED` constant (not `new Date()` on every build). `changeFrequency`/`priority` omitted (Google ignores them). Doctor entries include `images` when `photoUrl` exists. | Google discards `lastmod` that always equals "now". |
| D16 | Per-page dynamic OG images (`opengraph-image.tsx`) are **out of scope**. Use `/maruti-og-image.png` (1731x909) as default and the doctor photo for doctor pages. | Keep small. Can be added later. |
| D17 | Search Console: `verification.google` / `verification.other["msvalidate.01"]` come from env vars `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` / `NEXT_PUBLIC_BING_SITE_VERIFICATION`, omitted if unset. | Client can verify via meta tag without a code change. DNS-based Domain property is still the recommended route (see §10 checklist). |
| D18 | `/booking` stays indexable and in the sitemap (no decision from the user to hide it). | Avoid unrequested behaviour changes. |
| D19 | No new dependencies. JSON-LD is typed with small local TS types (no `schema-dts`). | Keep it small. |

**Questions for the client (do not block the build):** confirm domain, real opening hours, exact GBP pin lat/long, Google Business Profile URL (for `sameAs`/`hasMap`), social profile URLs, which number has WhatsApp.

---

## 4. Files That Will Change

**New**
- `lib/seo.ts` — `SITE_URL`, `absoluteUrl()`, `SEO` constants (default title/description/OG image, locale `en_IN`, twitter handle none), `CONTENT_UPDATED`, `AI_CRAWLERS`, `buildMetadata()` (title/description/canonical/OG/Twitter/robots in one call), `doctorMetadata(doctor)`, `testMetadata(test)`, `verificationMeta()`.
- `lib/schema.ts` — pure JSON-LD builders: `clinicSchema()`, `websiteSchema()`, `breadcrumbSchema(items)`, `physicianSchema(doctor)`, `medicalTestPageSchema(test)`, `collectionPageSchema()`, `itemListSchema()`, `faqSchema(faqs)`, `aboutPageSchema()`, `contactPageSchema()`, plus `SPECIALTY_MAP` and `parseChamberTiming()`.
- `components/json-ld.tsx` — server component: `<JsonLd data={...} />`, escapes `<` as `<`, accepts one object or an array.
- `components/faq-section.tsx` — server component rendering `<details>` accordion per DESIGN.md (surface card, `--line` border, 48px min tap target, `--blue` focus ring, sentence case, no arrows glued to labels), and emits `FAQPage` JSON-LD from the same array.
- `data/faqs.ts` — `HOME_FAQS`, `CONTACT_FAQS`, `getDoctorFaqs(doctor)`, `getTestFaqs(test)`, all derived from real data fields.
- `app/sitemap.ts`, `app/robots.ts`, `app/llms.txt/route.ts`.

**Modify**
- `app/layout.tsx` — metadata via `lib/seo.ts` (fixes title duplication and adds Twitter card and verification), inject site-wide `clinic` + `website` graph, `metadataBase` from `SITE_URL`.
- `data/centre.ts` — add `verified: { hours, geo, whatsapp, aggregateRating }` (all `false`), `openingHours[]`, `sameAs: string[]` (empty until provided), `mapsPlaceUrl?` (optional). Existing fields and strings unchanged (NAP byte-for-byte).
- `data/doctors.ts` — add `hasVerifiedRegistration(doctor)` helper only.
- `app/page.tsx` — remove inline clinic JSON-LD (moved to layout); add `HOME_FAQS` `<FaqSection>` near the bottom (before the map section), `WebPage` metadata via builder.
- `app/doctors/page.tsx` — metadata builder plus `CollectionPage` + `ItemList` + `BreadcrumbList` (edit applied on top of the current uncommitted working copy; no other change).
- `app/doctors/[slug]/page.tsx` — `doctorMetadata()`, `physicianSchema()` + `breadcrumbSchema()` + `faqSchema()`, `<FaqSection>` under the bio. UI otherwise untouched.
- `app/tests/page.tsx`, `app/tests/[slug]/page.tsx` — same treatment; test page gets `medicalTestPageSchema()`, breadcrumbs and FAQ.
- `app/about/page.tsx`, `app/contact/page.tsx`, `app/booking/page.tsx` — metadata via builder; `AboutPage` / `ContactPage` schema and breadcrumbs; contact gets `CONTACT_FAQS`.
- `.env.example` — **new**, documents `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION`. No secrets.

**Not touched**: `components/doctor-directory.tsx` (has the user's uncommitted edits), design tokens, hero/header/footer.

---

## 5. Implementation Requirements

### 5.1 `lib/seo.ts`
- `buildMetadata({ title, description, path, image?, type?, noindex? }): Metadata`
  - Title is passed **without** the brand suffix; layout template appends it. For long doctor/test titles use `{ absolute }` when the composed length would exceed ~60 chars.
  - `alternates.canonical = absoluteUrl(path)` (always set per page; the root layout does NOT set a canonical because it would be inherited wrongly).
  - `openGraph`: `type`, `url`, `siteName`, `locale: en_IN`, `images` (absolute, with width/height/alt). `twitter`: `summary_large_image`.
  - Meta `keywords` dropped except a short natural list on the home page (Google ignores them; avoids stuffing).
- `doctorMetadata(d)`:
  - Title: `Dr. X — Specialty in Silchar` (name in title, per PRD/AGENTS).
  - Description (<=155 chars): first sentence names doctor, specialty, chamber at Maruti Diagnostic Centre, Ghungoor, then timing, fee (if present) and phone.
  - OG type `profile`, image = doctor photo else default OG image.
- `testMetadata(t)`: `<Test name> in Silchar — Price, Preparation, Report Time`, description from `shortDescription`, prep and turnaround, price only if set ("Enquire for rates" otherwise).

### 5.2 `lib/schema.ts` (all values sourced from `CENTRE_INFO`/data, never literals)
- `clinicSchema()`: `@id`, `@type: ["MedicalClinic","DiagnosticLab"]`, name, legalName, url, logo (`ImageObject`), image, description, `address`, `telephone` (E.164 `+919957832872`), second number in `contactPoint[]` (`contactType: "customer service"`, `areaServed: "IN"`, `availableLanguage: ["English","Bengali","Assamese"]` **only if** confirmed, so omitted by default), `areaServed` (Silchar, Cachar, Barak Valley as `City`/`AdministrativeArea`), `hasMap`, `sameAs` (if any), `medicalSpecialty` list from doctors, `hasOfferCatalog` listing test categories, `knowsAbout`. `geo` and `openingHoursSpecification` only when verified. `aggregateRating` only when verified. `currenciesAccepted: "INR"`.
- `physicianSchema(d)`: `@id`, `@type: "Physician"`, name, `url`, `image`, `jobTitle`, `medicalSpecialty` (enum URL), `description` (bio), `knowsAbout` (conditions), `identifier` (verified regs only, as `PropertyValue` "Medical registration no."), `memberOf` and `worksFor` -> clinic (@id + minimal inline), `address`/`telephone` from centre, `openingHoursSpecification` (if parsed), `priceRange` only if fee (`"INR 500"`), `isAcceptingNewPatients` **omitted** (unknown), `mainEntityOfPage` -> page URL.
- `breadcrumbSchema(items)`: `Home > Doctors > Dr. X` with absolute URLs; also used by visible breadcrumb data so both stay identical.
- `faqSchema(faqs)`: `FAQPage` with `Question`/`Answer`; text is plain (no HTML).
- Listing pages: `CollectionPage` + `ItemList` (`ListItem` position/url/name).

### 5.3 `components/json-ld.tsx`
```tsx
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
```
Undefined fields vanish via `JSON.stringify`; builders must not emit empty strings/arrays.

### 5.4 `app/sitemap.ts`
- Routes: `/`, `/doctors`, every doctor slug, `/tests`, every test slug, `/about`, `/contact`, `/booking`.
- URLs from `absoluteUrl()`; `lastModified: CONTENT_UPDATED`; doctor entries carry `images`.
- Auto-updates when `data/*.ts` grows (uses `getAllDoctorSlugs()` / `getAllTestSlugs()`).

### 5.5 `app/robots.ts`
```
User-Agent: *            Allow: /   Disallow: /api/
User-Agent: <AI bots>    Allow: /   Disallow: /api/
Sitemap: <SITE_URL>/sitemap.xml
Host: <SITE_URL>
```

### 5.6 `app/llms.txt/route.ts`
`GET` returns `text/plain; charset=utf-8` markdown: `# Maruti Diagnostic Centre`, blockquote summary, NAP, phone(s), "Doctors" list (`- [Dr. X](url): specialty, timing`), "Tests" list, "Pages" list. Hours line only when verified. `export const dynamic = "force-static"`.

### 5.7 AEO copy rules
- First paragraph on every doctor/test page already names entity + place; FAQ answers are direct, first sentence answers the question (<=40 words), then detail.
- Home/contact FAQs (static, reviewed, factual only): where is the centre / landmark, phone and WhatsApp, which tests are done, how many specialists consult daily, do I need an appointment (**only** wording supported by PRD: "walk in or call"). Hours question included **only** when `verified.hours`.
- No medical claims beyond existing `clinicalImportance` text.

---

## 6. UI & Styling Specifications
Only `<FaqSection>` is new UI:
- Section on `--paper` or `--clay` (alternating per rhythm), max width 1200px, left-aligned.
- Heading `Fraunces` 500 (`text-3xl md:text-4xl`), sentence case, **no eyebrow label**, no accented word.
- Each item: `--surface`, 1px `--line`, radius 16px, `<summary>` min-height 48px, Hanken 600, 17-18px; answer Hanken 400, `leading-relaxed`, `--ink-soft` only at >=16px. Marker is a Lucide `Plus`/`Minus` swapped by CSS `group-open`; no arrows in labels; no hover lift, no scroll fade.
- Focus ring `--blue`. Works with no JS. Mobile 375px: full-width stack, 16px side padding.

---

## 7. Security & Data Integrity Requirements
- JSON-LD escapes `<` (Next.js guidance) to prevent script-breakout XSS.
- Env vars are `NEXT_PUBLIC_*` public verification/site values only; no secrets.
- No fabricated data: unverified registration numbers, hours, geo, rating and WhatsApp are gated (D2, D3, D9); FAQ text uses only existing data.
- `/api/` disallowed for crawlers (`POST /api/enquiry` will live there).
- Phone numbers in schema formatted E.164; NAP strings reused from `CENTRE_INFO` verbatim.

---

## 8. SEO & Structured Data Requirements (summary)
| Page | Title pattern | Schema on page |
|------|---------------|----------------|
| all | layout | `MedicalClinic/DiagnosticLab` + `WebSite` (graph) |
| `/` | default title | + `WebPage`, `FAQPage` |
| `/doctors` | `Doctors in Silchar — Specialists at Maruti Diagnostic Centre` | `CollectionPage`, `ItemList`, `BreadcrumbList` |
| `/doctors/[slug]` | `Dr. X — Specialty in Silchar` (+ suffix via template) | `Physician`, `BreadcrumbList`, `FAQPage` |
| `/tests` | `Diagnostic Tests in Silchar — Pathology, X-ray, USG, ECG` | `CollectionPage`, `ItemList`, `BreadcrumbList` |
| `/tests/[slug]` | `<Test> in Silchar — Price, Preparation, Report Time` | `MedicalWebPage` + `MedicalTest`, `Service`, `BreadcrumbList`, `FAQPage` |
| `/about` | `About Maruti Diagnostic Centre, Ghungoor Silchar` | `AboutPage`, `BreadcrumbList` |
| `/contact` | `Contact & Directions — Opposite SMCH, Ghungoor` | `ContactPage`, `BreadcrumbList`, `FAQPage` |
| `/booking` | `Book a Test or Doctor Appointment in Silchar` | `WebPage`, `BreadcrumbList` |

Canonical on every page; one `<h1>` per page (verify, don't change); `alt` text checked on touched images.

---

## 9. Acceptance Criteria
- [ ] `npm run lint` and `npm run build` pass with no errors or warnings introduced.
- [ ] `/sitemap.xml` lists every static route + all doctor + all test URLs, absolute URLs, no duplicates.
- [ ] `/robots.txt` shows `Allow: /`, `Disallow: /api/`, AI crawler rules, sitemap line.
- [ ] `/llms.txt` returns plain text with valid links; no hours line while `verified.hours` is false.
- [ ] Rendered `<title>` on doctor/test pages has the brand exactly once.
- [ ] Every page has a self-referencing canonical, OG tags, Twitter card, and one JSON-LD graph; view-source shows valid JSON with no raw `<`.
- [ ] Doctor page for a "Verification pending" doctor has **no** `identifier`; verified doctors have it.
- [ ] Clinic schema has **no** `aggregateRating`, `geo`, `openingHoursSpecification` while gates are false; flipping the gates in `centre.ts` adds them.
- [ ] FAQ answers on the page and in JSON-LD are identical text.
- [ ] Setting `NEXT_PUBLIC_SITE_URL=http://localhost:3000` changes every absolute URL (canonical, sitemap, schema, llms.txt).
- [ ] `git diff` shows `components/doctor-directory.tsx` unchanged by this task.
- [ ] Schema validates in schema.org validator with no errors (warnings acceptable for optional fields).

---

## 10. Checks to Run
```bash
npm run lint
npm run build
npm run start   # then:
curl -s localhost:3000/sitemap.xml | head -40
curl -s localhost:3000/robots.txt
curl -s localhost:3000/llms.txt
curl -s localhost:3000/doctors/dr-sridham-sutradhar-neurosurgeon-silchar | grep -o '<title>[^<]*</title>'
```
Browser: view-source a doctor page, a test page, home; paste the JSON-LD into validator.schema.org and Google Rich Results Test (needs a public URL; documented for post-deploy). Check 375px width for the FAQ accordion tap targets.

### Post-deploy Google Search Console checklist (for the client/user, not code)
1. Add a **Domain property** (DNS TXT) or URL-prefix property with the meta tag via `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
2. Submit `https://<domain>/sitemap.xml`.
3. URL Inspection -> Request indexing for `/`, `/doctors`, and the top doctor pages.
4. Link the live domain in the Google Business Profile; keep NAP identical to `data/centre.ts`.
5. Add the same NAP to Justdial / Practo / Sulekha and add those URLs to `CENTRE_INFO.sameAs`.
6. Watch Enhancements (Breadcrumbs, FAQ) and Page Indexing reports after ~1 week.
7. Set up Bing Webmaster Tools (import from GSC) — feeds ChatGPT search and Copilot.

---

## 11. Out of Scope (deliberately)
Dynamic OG image generation, GA4 event tracking, i18n `hreflang` (single language at v1), blog/article schema, review ingestion from Google, individual practitioner GBP listings, hosting-level redirects (www to apex).
