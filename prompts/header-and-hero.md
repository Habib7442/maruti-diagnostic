# Implementation Prompt: Header and Hero Section

## 1. Goal
Implement a clean, premium, mobile-first Header and Hero section for Maruti Diagnostic Centre inspired by the user's reference layout while strictly honoring the locked brand design system, color tokens, typography, and SEO requirements in `DESIGN.md` and `PRD.md`.

## 2. What Was Read
- `AGENTS.md` (Workflow rules, design guardrails, architecture)
- `DESIGN.md` (Color tokens: `--paper`, `--surface`, `--ink`, `--red`, `--blue`, `--line`; typography: `Fraunces` + `Hanken Grotesk`; component specs)
- `PRD.md` (Product summary, hero requirements, single source of truth NAP)
- User's visual reference image (`media_1789721051019.webp`): Clean balanced navbar, bold editorial serif headline, dual pill CTAs, floating service tags/chips, and human-centered photo composition.
- Existing codebase: `app/layout.tsx`, `app/globals.css`, `package.json`, `components/ui/button.tsx`.

## 3. Assumptions & Decisions
- **Visual Translation**:
  - We translate the clean aesthetic of the reference into Maruti's brand palette: cool porcelain background (`--paper: #F5F1EC`), deep navy ink (`--ink: #16293E`), signature brick red for CTAs (`--red: #BC3B2C`), functional trust blue (`--blue: #1E5FA6`), and warm porcelain surface cards (`--surface: #FCFAF7`).
  - We do *not* copy the reference's yellow-green background (strictly forbidden by `DESIGN.md` guardrails).
- **Typography Integration**:
  - Replace default `Geist` in `app/layout.tsx` with Google Fonts `Fraunces` (weights 400-600 with optical sizing `axes: ["opsz"]`) for display headings, and `Hanken Grotesk` (weights 400-700) for UI/body copy.
- **Single Source of Truth**:
  - Create `data/centre.ts` storing exact NAP matching Google Business Profile byte-for-byte, phone numbers (`9957832872`, `6003951660`), WhatsApp deep links, and hours.
- **Header Component (`components/header.tsx`)**:
  - Left: Clean Maruti Diagnostic Centre brand mark with "Maruti Diagnostic Centre" and subtitle "Ghungoor · Opp. SMCH".
  - Center: Nav links (`Doctors`, `Tests & Services`, `About`, `Contact`).
  - Right: Quick click-to-call link + primary "Book a test" pill button.
  - Mobile: Clean slide-out or collapsible mobile menu with full tap targets (≥48px).
- **Hero Section (`components/hero.tsx`)**:
  - Left Column:
    - Large, confident H1 in `Fraunces`: *"Trusted diagnostics in Ghungoor, opposite SMCH."*
    - Reassurance paragraph in `Hanken Grotesk` (≥17px): *"Daily chamber for 16 medical specialists and high-precision pathology, digital X-ray, ultrasound, ECG, and endoscopy in Silchar."*
    - Dual Action Buttons: Primary solid red pill *"Book a test"* + Secondary outline pill *"Call 99578 32872"*.
    - Trust Strip (per wireframe in `DESIGN.md` §6): *"● 5.0 on Google · ● Same-day reports · ● 16 specialists"*.
  - Right Column (Editorial Composition matching reference):
    - Primary card with warm, authentic medical consultation imagery, framed with a subtle `--line` border and gentle depth.
    - Floating Service Chips / Pills: "Pathology", "Digital X-Ray", "USG / Ultrasound", "ECG", "Endoscopy", "16 Specialists".
    - Landmark trust pill: "Opposite SMCH Main Gate, Behind Maruti Medical".
- **Mobile Sticky Action Bar (`components/mobile-sticky-bar.tsx`)**:
  - Persistent bottom bar for mobile viewports providing 1-tap **Call Now** and **WhatsApp** actions.

## 4. Files That Will Change
- `data/centre.ts` [NEW]: Central source of truth for NAP, contact numbers, hours, and landmark details.
- `app/layout.tsx` [MODIFY]: Load `Fraunces` and `Hanken Grotesk` Google Fonts, apply base styling, embed Header and Mobile Sticky Bar.
- `components/header.tsx` [NEW]: Responsive desktop & mobile sticky header.
- `components/hero.tsx` [NEW]: Clean editorial hero section.
- `components/mobile-sticky-bar.tsx` [NEW]: Mobile bottom bar with 1-tap actions.
- `app/page.tsx` [MODIFY]: Mount the Hero section.

## 5. Implementation Requirements
- 100% TypeScript with explicit interfaces; zero `any`.
- Proper semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<h1>`).
- Accessible tap targets (≥48px) and WCAG AA contrast compliant text.
- No anti-patterns from `DESIGN.md` (no two-tone headlines, no all-caps floating eyebrows, no `→` glued to buttons).

## 6. UI & Styling Specifications
- **Background**: `--paper: #F5F1EC`
- **Surface**: `--surface: #FCFAF7` with `--line: #E6DFD6` border
- **Buttons**:
  - Primary: `bg-red hover:bg-red-deep text-white rounded-full font-semibold px-6 py-3.5`
  - Secondary: `border-1.5 border-ink text-ink hover:bg-clay/40 rounded-full font-semibold px-6 py-3.5`
- **Chips**: `bg-surface border border-line text-ink rounded-full px-3.5 py-1.5 text-sm`

## 7. Security & Boundaries
- All phone and WhatsApp links generated safely without leaking any secrets.
- Server components for layout and hero content; client boundary (`"use client"`) only on mobile menu toggle.

## 8. Acceptance Criteria
- [ ] Google Fonts `Fraunces` and `Hanken Grotesk` load cleanly without hydration mismatch.
- [ ] Sticky Header renders logo, nav links, phone number, and "Book a test" CTA.
- [ ] Mobile navigation drawer opens and closes smoothly.
- [ ] Hero section features editorial H1, reassurance body, dual pill CTAs, floating service tags, and trust indicators.
- [ ] Mobile view displays persistent 1-tap Call and WhatsApp bottom bar.
- [ ] `npm run lint` passes with 0 errors.
- [ ] `npm run build` compiles with 0 errors.

## 9. Checks to Run
- `npm run lint`
- `npm run build`
- Dev server inspection on mobile (375px) and desktop (1200px).

