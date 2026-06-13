# Claude Code — Lumo Learning Engineering Standards

This file applies to every session in this repository. All feature work, bug
fixes, refactors, and reviews must follow these quality standards.

---

## Mandatory Engineering Process

### Before implementing any feature or fix

1. **Select the relevant ECC skills** and load them before writing code:
   - New UI component → `/ecc:frontend-patterns`
   - New page / route → `/ecc:frontend-patterns` + `/ecc:api-design`
   - Bug fix with side effects → `/ecc:error-handling`
   - Any new code → `/ecc:coding-standards`
   - Security-sensitive change (token storage, API key handling) → `/ecc:security-review`

2. **Type-check before declaring done**:
   ```bash
   npm run typecheck
   ```

3. **Lint before every commit**:
   ```bash
   npm run lint
   ```

4. **Build before pushing**:
   ```bash
   npm run build
   ```

---

## Architecture Rules (enforced every session)

### Framework & Structure
- **Next.js 15 App Router** — all routes live under `src/app/`.
- Route groups: `(app)` for the authenticated shell (TabBar), `(onboarding)` for setup flows.
- Server Components by default; add `'use client'` only when the component needs
  browser APIs, event handlers, or Zustand stores.

### Types & Data
- All shared API types live in `src/lib/api/types.ts`. Never redefine `User`,
  `Lesson`, `VocabEntry`, etc. in component files.
- Mock data lives in `src/lib/mock-data.ts`. When the real API is wired up,
  replace mock imports with SWR hooks — no other refactor needed.

### State Management
- **Zustand** (with `persist`) for cross-page state: `src/lib/store/auth.ts`,
  `src/lib/store/settings.ts`.
- Do not put server-fetched data in Zustand; use **SWR** for that.
- `useEffect` dependencies must be complete — never `// eslint-disable` stale
  closure warnings; use `useRef` instead.

### Styling
- Design tokens only: `var(--accent)`, `var(--ink)`, `var(--surface)`, etc.
  (defined in `src/app/globals.css`). **No raw hex or RGB values in component files.**
- Class helpers: `.lumo-card`, `.lumo-btn`, `.lumo-chip`, `.lumo-tabbar`,
  `.eyebrow`, `.grad-text`, `.cjk`. Prefer these over inline one-offs.
- Light / Dark switching is handled by `data-theme` on `<html>` — never hard-code
  a color for one theme.

### Components
- Components that render inside a render function must be defined **outside** that
  function (ESLint `react-hooks/static-components` rule is enforced).
- Loading / busy states are required for all async user actions (disable button,
  show spinner).
- Wrap async flows in try/catch and show user-visible error states.

### AI Token Security
- The OpenAI API key is stored only in **Zustand `persist`** (localStorage).
  It is **never** sent to our backend or logged anywhere.
- Never include the key in URLs, query strings, or console output.

### Bilingual (i18n)
- All user-facing content that comes from the API is typed as `I18n = { en: string; zh: string }`.
- The active language is driven by `useSettings().appLanguage`.
  Use `lesson.title[lang]` — never hard-code `lesson.title.en`.

---

## ECC Skill Reference

Skills are provided via the `ecc` plugin and invokable as `/ecc:skill-name`:

| Skill | When to invoke |
|-------|---------------|
| `/ecc:coding-standards` | Any new file or significant refactor |
| `/ecc:error-handling` | Exception paths, retries, fallbacks |
| `/ecc:frontend-patterns` | React components, hooks, state |
| `/ecc:api-design` | New API endpoint shapes or SWR hooks |
| `/ecc:tdd-workflow` | All feature work |
| `/ecc:security-review` | Token storage, key handling, auth |

**If in doubt, apply `/ecc:coding-standards` + the domain-specific skill.**

---

## CI Gates (all must pass before merge)

| Check | Command | Blocks merge? |
|-------|---------|--------------|
| Type Check | `npm run typecheck` | ✅ yes (via build) |
| Lint | `npm run lint` | ✅ yes |
| Build | `npm run build` | ✅ yes |
| Security audit | `npm audit --audit-level=high --omit=dev` | ✅ yes |
| **CI gate** | `ci` job in Actions | ✅ branch protection watches this |

Branch protection rules:
- No direct push to `main`
- PR requires passing `ci` check + 1 CODEOWNERS approval
- Stale approvals dismissed on new commits
- Squash merge only
