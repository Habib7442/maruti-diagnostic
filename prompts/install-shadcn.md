# Implementation Prompt: Install and Configure shadcn/ui

## 1. Goal
Install and initialize shadcn/ui for Next.js 16 and Tailwind CSS v4, wiring the `cn` utility and configuring shadcn's theme tokens to strictly map to our brand design tokens defined in `DESIGN.md`.

## 2. What Was Read
- `AGENTS.md` (Workflow rules, design guardrails, architecture)
- `DESIGN.md` (Color tokens: `--paper`, `--surface`, `--ink`, `--red`, `--blue`, `--line`; typography; radii)
- `PRD.md` (Tech stack constraints)
- `https://ui.shadcn.com/docs/installation/next` (via Context7 documentation query)
- Existing workspace configuration: `package.json`, `tsconfig.json`, `app/globals.css`

## 3. Assumptions & Decisions
- **Tailwind CSS v4 Compatibility**: shadcn CLI now natively supports Tailwind v4 (`@import "tailwindcss"`).
- **Brand Token Preservation**: Default shadcn setup generates generic slate/zinc grey variables. We will customize `components.json` and configure `app/globals.css` so shadcn's semantic variables (`--background`, `--foreground`, `--card`, `--primary`, `--border`, etc.) seamlessly resolve to our locked brand tokens:
  - `--background`: maps to `--paper` (`#F5F1EC`)
  - `--card` / `--popover`: maps to `--surface` (`#FCFAF7`)
  - `--foreground` / `--card-foreground`: maps to `--ink` (`#16293E`)
  - `--muted-foreground`: maps to `--ink-soft` (`#4C5B6B`)
  - `--primary`: maps to `--red` (`#BC3B2C`)
  - `--primary-foreground`: `#FFFFFF`
  - `--border` / `--input`: maps to `--line` (`#E6DFD6`)
  - `--ring`: maps to `--blue` (`#1E5FA6`)
- **Icon Library**: Ensure `lucide-react` is used for icons across all shadcn components.
- **Path Aliases**: Maintain `@/*` path aliases configured in `tsconfig.json` (`@/components`, `@/lib/utils`).

## 4. Files That Will Change
- `package.json` (Adds `clsx`, `tailwind-merge`, `lucide-react`, and any Radix UI primitives)
- `components.json` (New - shadcn configuration file)
- `lib/utils.ts` (New - `cn` helper combining `clsx` and `tailwind-merge`)
- `app/globals.css` (Updated - Integrates shadcn CSS variables aligned with `DESIGN.md` brand tokens)

## 5. Implementation Requirements
1. Run `npx shadcn@latest init -d` (or non-interactive equivalent) to generate `components.json` and `lib/utils.ts`.
2. Inspect and adapt `components.json` for path aliases (`@/components/ui`, `@/lib/utils`, etc.).
3. Audit `app/globals.css` to guarantee:
   - All brand tokens from `DESIGN.md` (`--paper`, `--surface`, `--ink`, `--ink-soft`, `--red`, `--red-deep`, `--blue`, `--clay`, `--line`) are preserved in `:root`.
   - Shadcn CSS tokens correctly align with brand tokens without any yellow-cream or generic slate leakage.
4. Ensure `lucide-react` is installed as the primary icon set.

## 6. UI & Styling Specifications
- **Theme**: Light-mode primary (`--paper: #F5F1EC`).
- **Primary Accent**: `--red: #BC3B2C`, hover `--red-deep: #9C2A20`.
- **Borders**: `--line: #E6DFD6` 1px hairlines.
- **Radii**: Matching `DESIGN.md` scale (Pill for buttons, 10px for inputs, 16px for cards).

## 7. Security & Boundaries
- All utilities and client wrappers remain in `@/lib` or `@/components/ui`.
- No client component exposure of secrets.

## 8. Acceptance Criteria
- [ ] `npx shadcn@latest init` executes cleanly.
- [ ] `components.json` is properly configured.
- [ ] `lib/utils.ts` exports standard `cn` helper function.
- [ ] `app/globals.css` preserves all custom brand tokens and maps shadcn tokens to brand colors.
- [ ] `npm run build` passes with zero TypeScript or PostCSS errors.

## 9. Checks to Run
- `npm run lint`
- `npm run build`

