# DESIGN.md — Maruti Diagnostic Centre

Design system for the Maruti Diagnostic Centre website (Silchar, Assam).
Read this before building any page. Every choice here is deliberate — do not
swap in the "default" version of anything.

---

## 0. What we're designing

- **Subject:** A trusted neighbourhood diagnostic centre — blood tests, pathology,
  X-ray, ECG, ultrasound, endoscopy — that is also the daily chamber for ~16 local
  specialists, opposite Silchar Medical College (SMCH), Ghungoor.
- **Audience:** Local Silchar patients — families, elderly, working people — plus
  people searching a specific doctor's name. Many are on mobile, not all are
  fluent in English, some have weaker eyesight.
- **The one job:** Make it effortless to (1) find a doctor or test, (2) trust the
  place, and (3) call / get directions / book. And rank #1 when someone searches a
  doctor's name (see §11).
- **Tone:** Premium, calm, confident, warm. Not "clinical corporate", not "cheap
  local flyer".

---

## 1. Design principles

1. **Red is the brand, not blue.** The signature colour is Maruti's own brick red.
   Every competitor is blue/teal/white; our red is the differentiator. Spend the
   boldness here and keep everything else quiet.
2. **Warm & light, but not cream.** The base is a cool-leaning porcelain, not the
   yellow-cream everyone reaches for. Light theme only — no dark mode as default.
3. **Trust is earned with real things.** Real photos of the real building, real
   staff, real machines, real reviews, real doctor credentials. No stock-photo
   models, no invented buildings, no fake stats.
4. **Legibility over cleverness.** Elderly patients use this. Generous type, high
   contrast, big tap targets, plain words.
5. **The doctor directory is the spine, not a footer link.** Because doctor-name
   search is the whole point, doctors get first-class design and their own pages.

### Guardrails — do NOT do these (they read as templated / AI-generated)
- No warm-cream (#F4F1EA) + serif + terracotta/gold look. Ever.
- No accenting a single word of a headline in a different colour or italic.
- No ALL-CAPS eyebrow label floating above every section heading.
- No `Word — fragment` labels with spaced em-dashes as decoration.
- No `→` glued onto every button/link.
- No `01 / 02 / 03` number markers unless the content is genuinely a sequence.
- No identical rounded card with the same grey shadow repeated down the page.
- No fade-up-on-scroll on every section and hover-lift on every card.

---

## 2. Colour system

Light theme. Red is the accent; ink-navy grounds; porcelain is the paper; blue is
a *restrained, functional* trust cue (badges, links, lab/report motifs) — never the
star.

| Token            | Hex        | Role |
|------------------|------------|------|
| `--paper`        | `#F5F1EC`  | Page background — warm porcelain, faint rose-greige (NOT yellow cream) |
| `--surface`      | `#FCFAF7`  | Cards / raised surfaces on the paper |
| `--ink`          | `#16293E`  | Primary text; dark "confidence" sections & footer (brand-derived navy) |
| `--ink-soft`     | `#4C5B6B`  | Secondary text, captions |
| `--red`          | `#BC3B2C`  | **Signature.** CTAs, key emphasis, doctor-name highlight, active states |
| `--red-deep`     | `#9C2A20`  | Red hover/pressed, and red text on light when small |
| `--blue`         | `#1E5FA6`  | Functional only: verified/accredited badges, links, lab motifs |
| `--clay`         | `#EAD9D0`  | Soft warm block behind featured content (the "breathing room" tint) |
| `--line`         | `#E6DFD6`  | Hairline borders / dividers |

**Usage rules**
- Big flat colour blocks: `--ink` (dark section) or `--clay` (soft warm section).
  Alternate paper → clay → paper → ink down the page for rhythm.
- Red is for *action and emphasis only*. If half the page is red, it's wrong.
- Blue never competes with red. Think of blue as the "lab coat" — quiet, credible,
  used on trust signals (NABL/accreditation, "verified reports", inline links).
- Cards sit on `--paper` as near-white `--surface` with a `--line` border. Prefer a
  hairline border + a tint change over a drop shadow to separate layers.

**Contrast notes (WCAG AA)**
- Body text = `--ink` on `--paper`/`--surface`: very high contrast. Always fine.
- White text on `--red` buttons: passes AA for bold/large button labels. Keep button
  text ≥16px and semibold.
- Small red *text* on light: use `--red-deep`, not `--red`, to stay ≥4.5:1.
- `--ink-soft` only for text ≥16px; don't use it for tiny print.

---

## 3. Typography

Two families, clearly distinct. Both on Google Fonts.

- **Display / headings — `Fraunces`** (soft, premium serif; optical sizing on).
  Used *only* for the hero headline and section titles. This gives the "premium"
  feel and separates us from every sans-only medical site. Weight 400–600, never
  ultra-thin. We dodge the cream-serif cliché by pairing it with cool porcelain +
  brick red instead of cream + terracotta.
- **Body / UI — `Hanken Grotesk`** (clean, warm, very legible modern grotesque).
  Everything else: paragraphs, buttons, nav, labels, doctor cards, tables.

> Bengali/Assamese later? Add `Noto Serif Bengali` (display) + `Noto Sans Bengali`
> (body) as language fallbacks so a bilingual toggle stays on-brand.
>
> If you ever want a warmer, less-editorial feel, the sanctioned alternative is
> display `Bricolage Grotesque` + body `Hanken Grotesk`. Do not fall back to
> Poppins / Montserrat / Open Sans — those are the generic-medical tell.

**Type scale** (base 17px, ~1.2 ratio; clamp for fluid mobile→desktop)

| Use              | Size (desktop) | Font / weight | Notes |
|------------------|----------------|---------------|-------|
| Hero H1          | 52–68px        | Fraunces 500  | Line-height 1.05, tight |
| Section H2       | 34–42px        | Fraunces 500  | |
| Card / sub H3    | 20–24px        | Hanken 600    | |
| Body             | 17–19px        | Hanken 400    | Line-height 1.6 |
| Small / caption  | 14–15px        | Hanken 500    | `--ink-soft` |
| Button / nav     | 16–17px        | Hanken 600    | Sentence case |

**Rules**
- Sentence case everywhere. No ALL-CAPS headings or labels.
- Body line length < 72 characters. Serif (Fraunces) blocks can go slightly wider
  and want a touch more line-height.
- Headline personality comes from *size, weight and spacing* — not from colouring
  one word.

---

## 4. Layout, spacing, shape

- **Grid:** 12-col, max content width ~1200px, gutters 24px. Comfortable margins;
  let the page breathe — whitespace is a premium signal.
- **Alignment:** Primary content **left-aligned** (matches the references and reads
  editorial). Centre-align only short trust strips or the final CTA band.
- **Spacing scale (px):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Section vertical
  padding 96–128 desktop / 56–72 mobile.
- **Radii (use a scale, not one value):**
  - Buttons / chips: full pill
  - Inputs: 10px
  - Cards: 16px
  - Images: 12px
  - Large feature blocks: 24px
- **Shadows:** minimal. One soft, warm-tinted shadow reserved for the *one* floating
  element (e.g. hero photo or a lifted CTA). Everything else separates with `--line`
  borders and tint changes. Never the same grey shadow under every card.

---

## 5. Components

**Buttons**
- Primary: solid `--red`, white label, pill, semibold. Hover → `--red-deep`. No `→`.
  Labels say the action: "Book a test", "Call now", "Get directions".
- Secondary: transparent, `--ink` label, 1.5px `--ink` border, pill.
- Tertiary/link: `--blue` text, underline on hover.

**Chips / pills** (services and specialties — like the reference tag rows)
- `--surface` fill, `--line` border, `--ink` label. Active/selected → `--red` fill,
  white label. Used for filtering tests and specialties.

**Doctor card** (the most important component — see wireframe §6)
- Photo (or clean initial monogram if no photo), name in Hanken 600 `--ink`,
  specialty in `--red`, qualifications in `--ink-soft`, chamber timing + fee,
  and a "See profile" link to the doctor's own page. Border `--line`, radius 16.

**Trust badge**
- Small `--blue` pill with a check icon: "Reports verified", "Accredited",
  "5.0 ★ on Google". Blue lives here, not everywhere.

**Stat / proof strip**
- 3–4 real numbers (years serving Silchar, tests offered, specialists, Google
  rating). Big number in Fraunces, tiny label in Hanken. Only if the numbers are real.

**CTA band**
- Full-width `--ink` navy section, porcelain text, one `--red` button. Used once,
  near the bottom: "Need a test done? Walk in or call 99578 32872."

**Forms (booking / enquiry)**
- Large inputs (min 48px tall), clear labels above fields, `--red` submit.
- Errors explain what to fix in plain words, in the interface's voice — never a vague
  "something went wrong".

**Footer**
- `--ink` navy. NAP (name, address, phone) in the *exact* format used on Google &
  every directory. Map embed, hours, doctor links, WhatsApp. Consistency here feeds
  local SEO.

---

## 6. Hero concept + wireframes

The hero opens with the most characteristic thing about Maruti: a real, warm photo
of the centre (signboard / reception) + a plain trust statement + the two actions
patients actually want. A quiet "find a doctor" entry sits in the hero because that
search is the site's reason to exist.

**Home hero**
```
┌───────────────────────────────────────────────────────────────┐
│  [logo] Maruti Diagnostic Centre      Doctors  Tests  Contact  │
│                                             [ Book a test ]     │
├───────────────────────────────────────────────────────────────┤
│                                                                 │
│  Trusted diagnostics in            ┌───────────────────────┐    │
│  Ghungoor, opposite SMCH.          │                       │    │
│  (Fraunces, large, left)           │   REAL PHOTO of the   │    │
│                                    │   centre / reception  │    │
│  One line of plain reassurance     │   (soft shadow — the  │    │
│  in Hanken body.                   │   one floating elem.) │    │
│                                    │                       │    │
│  [ Book a test ]  [ Call now ]     └───────────────────────┘    │
│                                                                 │
│  ● 5.0 on Google   ● Reports on time   ● 16 specialists  (blue) │
└───────────────────────────────────────────────────────────────┘
```

**Doctor card**
```
┌──────────────────────────┐
│ ┌────┐  Dr. Sridham Sutradhar     │   name: Hanken 600 --ink
│ │photo│ Neurosurgeon              │   specialty: --red
│ └────┘  MBBS, MS, MCh             │   quals: --ink-soft
│         Timing 4–5 pm · ₹500      │
│         See profile               │   link → own SEO page
└──────────────────────────┘
```

**Doctor detail page** (this is the SEO landing page — §11)
```
┌───────────────────────────────────────────────┐
│ H1: Dr. Sridham Sutradhar — Neurosurgeon,      │  ← name in H1
│     Silchar                                     │
│ [photo]  MBBS, MS, MCh (Neurosurgery)           │
│          Reg. No. ACMR-21736                    │
│          Chamber: Maruti Diagnostic Centre      │
│          Timing · Fee · [ Book / Call ]         │
├───────────────────────────────────────────────┤
│ About / specialties / conditions treated (text) │  ← real, indexable copy
│ Map + address (same NAP)                        │
│ Other specialists at Maruti (internal links)    │
└───────────────────────────────────────────────┘
```

---

## 7. Imagery & icons

- **Photography:** real, warm, well-lit. Priority shots: raised signboard, exterior
  with SMCH landmark, reception, machines (X-ray/USG/lab), staff at work. Authentic
  beats polished. **Never generate a fake exterior of the building.**
- Optional cohesion treatment: a subtle red/ink duotone on secondary photos — use
  sparingly, keep hero photos natural.
- **Icons:** one thin line-icon set (e.g. Lucide), consistent stroke. Icons support
  labels, they don't replace them.

---

## 8. Motion

- One orchestrated hero reveal on load (photo settles, headline fades in) — that's it
  for automatic motion.
- Otherwise motion only answers a user action: menu open, filter select, accordion
  expand, form submit.
- Respect `prefers-reduced-motion`. No per-section scroll fades, no per-card hover lift.

---

## 9. Voice & copy

- Plain, warm, patient-first. No medical jargon in patient-facing copy (the audience
  is local business owners and families, not clinicians).
- Sentence case. Active voice. Buttons name the exact action and keep that name
  through the flow ("Book a test" → confirmation says "Test booked").
- Bilingual-ready: keep sentences short and translatable for a future
  Assamese/Bengali toggle.
- Empty/error states give direction, not mood ("No doctor found — try a specialty
  like ENT or Medicine").

---

## 10. Accessibility (non-negotiable, elderly users)

- Body text ≥ 17px; never below 14px anywhere.
- Contrast AA minimum; small red text uses `--red-deep`.
- Tap targets ≥ 48px. Visible keyboard focus ring (use `--blue`).
- Every image has alt text (also good for SEO). Forms have real `<label>`s.
- Works fully on a small, mid-range Android phone on a slow connection.

---

## 11. Page & URL structure + SEO hooks

Design and structure are one job here, because ranking for doctor names is the goal.

**Routes**
```
/                         Home
/doctors                  Full directory (filter by specialty)
/doctors/[slug]           One page PER doctor  ← ranks for the name
/tests                    All tests & services
/tests/[slug]             One page per key test (thyroid-profile, x-ray, usg…)
/about                    About + accreditation
/contact                  Map, hours, NAP, WhatsApp
```

**Doctor page slug pattern** (name + specialty + city):
`/doctors/dr-sridham-sutradhar-neurosurgeon-silchar`

**Each doctor page must have**
- The doctor's name in the `<title>`, the `<h1>`, and the first line of body copy.
- Real, unique paragraph(s) about the doctor / conditions treated — not one shared
  template sentence.
- `MedicalClinic` + `Physician` schema (JSON-LD) with name, specialty, address, phone.
- The exact NAP matching Google Business Profile and every directory.
- Internal links to the centre and to related specialists.

Keep the NAP block byte-for-byte identical across the site, GBP, and directories —
that consistency is a real ranking factor.

---

## 12. Build notes (Next.js + Tailwind)

Map the tokens once, use them everywhere.

```css
:root{
  --paper:#F5F1EC; --surface:#FCFAF7;
  --ink:#16293E; --ink-soft:#4C5B6B;
  --red:#BC3B2C; --red-deep:#9C2A20;
  --blue:#1E5FA6; --clay:#EAD9D0; --line:#E6DFD6;
}
```
```js
// tailwind.config — theme.extend.colors
paper:'#F5F1EC', surface:'#FCFAF7',
ink:'#16293E', 'ink-soft':'#4C5B6B',
red:'#BC3B2C', 'red-deep':'#9C2A20',
blue:'#1E5FA6', clay:'#EAD9D0', line:'#E6DFD6',
// fontFamily: display:['Fraunces',...serif], sans:['Hanken Grotesk',...]
```

Fonts via `next/font/google`: Fraunces (opsz, wght 400–600), Hanken Grotesk
(wght 400–700). Watch CSS specificity on section padding so `.section` and element
selectors don't cancel each other out.

---

*Spend the boldness on the red. Keep everything else quiet and disciplined.
Before shipping a page, look at it and remove one decoration.*