# Implementation Prompt: Hero Section 3-Image Collage Layout

## 1. Goal
Restructure the Hero section layout to match the exact 3-image editorial composition provided in the user's reference image (lower-left image under CTAs, prominent center landscape image, right portrait image with floating service chips beneath it), while strictly preserving all existing copy, fonts (`Fraunces` & `Hanken Grotesk`), brand color tokens, and SEO signals.

## 2. What Was Read
- `AGENTS.md` (Workflow rules, design guardrails, architecture)
- `DESIGN.md` (Color tokens: `--paper`, `--surface`, `--ink`, `--red`, `--blue`, `--line`; typography; radii)
- `PRD.md` (Product summary, hero requirements, single source of truth NAP)
- User's reference screenshot (`media_1789722767916.png`):
  - **Left column**: Top has H1 headline + reassurance paragraph + dual CTAs; bottom has **Image 1** (consultation thumbnail).
  - **Center column**: **Image 2** (large central clinical moment with patient/family).
  - **Right column**: Top has **Image 3** (portrait healthcare specialist/procedure); bottom has the clustered service tag pills (`Pathology`, `Digital X-Ray`, `USG / Ultrasound`, `16 Specialists`, `ECG & Endoscopy`).

## 3. Assumptions & Decisions
- **Preserve Typography & Content**: Keep the exact text: *"Trusted diagnostics in Ghungoor, opposite SMCH."*, the reassurance copy, *"Book a test"*, and *"Call +91 99578 32872"*.
- **Preserve Mobile Behavior**: On small mobile screens (`< 640px`), the Call button in the hero remains hidden (`hidden sm:inline-flex`) as requested earlier, with the primary "Book a test" button and prominent center image displayed cleanly, while on tablet and desktop (`md:` and `lg:`), the full 3-image grid activates.
- **3-Image Collage Structure**:
  - **Image 1 (Lower Left)**: Doctor consultation with patient (`aspect-square` or `aspect-4/3`, rounded-xl border border-line).
  - **Image 2 (Center)**: Primary clinical care & consultation scene (`aspect-4/3` or `aspect-5/4`, rounded-xl border border-line shadow-xs).
  - **Image 3 (Right Top)**: Diagnostic specialist / procedure scene (`aspect-3/4` or `aspect-4/5`, rounded-xl border border-line).
  - **Service Chips (Right Bottom)**: Clustered pill tags directly beneath Image 3 with one highlighted in `--ink` or `--red` just like the reference mockup.
- **Image Optimization**: Use Next.js `<Image />` with optimized Unsplash healthcare imagery and responsive `sizes`.

## 4. Files That Will Change
- `components/hero.tsx` [MODIFY]: Update layout grid and markup to render the 3-image composition on desktop and responsive stack on mobile.

## 5. Implementation Requirements
- 12-column or 3-column CSS grid on desktop (`lg:grid-cols-12` or `lg:grid-cols-3`).
- Clean responsive behavior: On mobile, stacks gracefully; on desktop, forms the asymmetric 3-image layout matching the reference screenshot.
- Keep touch targets ≥48px.
- Zero TypeScript errors.

## 6. Acceptance Criteria
- [ ] Left column features headline, sub-copy, CTAs, and Image 1 anchored at the bottom.
- [ ] Center column features the large primary hero Image 2.
- [ ] Right column features portrait Image 3 with clustered service pill chips directly beneath it.
- [ ] Small screens hide the redundant call button and stack imagery cleanly.
- [ ] `npm run lint` passes with 0 errors.

## 7. Checks to Run
- `npm run lint`
- Inspect layout visually across mobile (375px), tablet (768px), and desktop (1200px).

