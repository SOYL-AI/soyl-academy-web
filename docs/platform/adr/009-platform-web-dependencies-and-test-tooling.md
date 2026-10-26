# ADR-009: Platform web dependencies and test tooling

- **Status:** Proposed (design-system, M1); for Lead approval with the branch merge
- **Date:** 2026-10-26
- **Author:** design-system
- **Related:** ADR-001 §7 and §9 (root dependencies must be additive, need an ADR and a green marketing regression); ADR-007 (diagram rendering, pipeline-engineer); ARCHITECTURE §3.2, §16; security requirements WEB-1, WEB-3, WEB-6, WEB-7, GEN-5; threat model AC-19, AC-22; finding F-012; DECISIONS D-012

## Context

Platform pages are compiled by the marketing app's Next.js build, so any library they import must be in the
**root** `package.json` (ADR-001 §9). The design-system M1 deliverables need:

- Markdown for every `*_md` content field, without raw HTML (WEB-7);
- KaTeX for maths and mhchem for chemistry (CONTEXT §8, ARCHITECTURE §3.2);
- an allow-list SVG sanitiser for raw SVG diagrams (WEB-7, F-012);
- a client-side SMILES renderer, lazy-loaded (ARCHITECTURE §3.2);
- unit/component tests with an XSS corpus (WEB-7 test line), and Playwright + axe for the gallery (AGENTS §6 web gates).

The marketing app has no test runner. Its dependency versions must not change (CLAUDE.md golden rule 1).

## Options considered

| Need | Chosen | Alternatives and why not |
|---|---|---|
| Markdown | **react-markdown 10.1.0 + remark-gfm 4.0.1 + remark-math 6.0.0** (unified/micromark, MIT) | markdown-it (HTML string out: would need a second sanitiser and `innerHTML` everywhere); hand-written parser (CommonMark edge cases are a security surface). react-markdown renders React elements, has no raw-HTML path without `rehype-raw`, and runs in Server Components. |
| Maths | **katex 0.19.0** (+ bundled `contrib/mhchem`), MIT | MathJax (much larger, slower SSR). KaTeX renders to a string on the server: zero client JS. |
| SVG sanitiser | **dompurify 3.4.17** (MPL-2.0 OR Apache-2.0) | sanitize-html (HTML-oriented, weak SVG namespace handling); own sanitiser (DOMPurify has years of mXSS hardening). Configured from `svg-allowlist.ts`, see `components/platform/ui/render/sanitize-svg.ts`. |
| SMILES | **smiles-drawer 2.4.1** (MIT; depends on chroma-js 2.6, BSD) | RDKit.js / OpenChemLib (multi-MB WASM/JS). smiles-drawer draws SVG with DOM APIs, ~58 KB gz, loaded only when a structure is on screen. |
| Unit tests | **vitest 4.1.12, jsdom 30.1.2, @testing-library/react 16.3.3, @testing-library/dom 10.4.2, vite 8.3.3** (dev) | vitest 5 (used in `platform/`, D-012) declares `peerOptional @types/node ^22 || >=24`; the root pins `@types/node ^20` (a marketing dev dependency we may not change), so npm refuses it. 4.1.12 is the maintained 4.x line released the same day as 5.0.5 and has no advisories. **vite is pinned to 8.3.3** only because vite ≥ 8.3.4 requires postcss ≥ 8.5.29, which would make npm re-hoist `postcss`/`nanoid`/`source-map-js` and change versions the marketing build uses. |
| E2E a11y | **@axe-core/playwright 4.13.0** (dev, in `platform/e2e`, MPL-2.0) | Lighthouse a11y only (coarser, slower). Lives in the platform workspace, not the root. |

Version policy: exact pins (no `^`), each release at least two weeks old on 2026-10-26 except where noted
(DOMPurify 3.4.17 is exactly 14 days old and is the latest security line; vitest 4.1.12 is 11 days old and
matches the line the platform already audited). `katex` 0.19.1 (3 days old) was skipped.

## Decision

Add, **additively**, to the root `package.json` (exact versions):

| Package | Type | Version | Licence | Size on disk | Client cost |
|---|---|---|---|---|---|
| react-markdown | dependency | 10.1.0 | MIT | 75 KB (+ unified/micromark deps) | 0 when server-rendered |
| remark-gfm | dependency | 4.0.1 | MIT | small | 0 when server-rendered |
| remark-math | dependency | 6.0.0 | MIT | small | 0 when server-rendered |
| katex | dependency | 0.19.0 | MIT | 4.5 MB (fonts, all builds) | 0 JS when server-rendered; CSS 3.4 KB gz on routes that render maths; fonts on demand |
| dompurify | dependency | 3.4.17 | MPL-2.0 / Apache-2.0 | 1.6 MB | 11.4 KB gz, lazy (first raw SVG) |
| smiles-drawer | dependency | 2.4.1 | MIT | 6.9 MB (+ chroma-js 0.5 MB) | 55.1 KB gz with chroma-js, lazy (first SMILES) |
| vitest | devDependency | 4.1.12 | MIT | — | none |
| vite | devDependency | 8.3.3 | MIT | — | none |
| jsdom | devDependency | 30.1.2 | MIT | — | none |
| @testing-library/react | devDependency | 16.3.3 | MIT | — | none |
| @testing-library/dom | devDependency | 10.4.2 | MIT | — | none |

Plus `"overrides": { "micromark-extension-math": { "katex": "$katex" } }`: remark-math's dependency would
otherwise install a second, older KaTeX (0.16.47, advisory GHSA-238p-pmpm-9mq7, low) that we never call.
The override makes it share the pinned 0.19.0.

Root script (additive): `"test:platform-ui": "vitest run --config components/platform/ui/vitest.config.mts"`.

In `platform/` (separate workspace): `@axe-core/playwright` 4.13.0 as a devDependency of `@soyl/e2e`, and the
script `test:design-system` there (a Playwright config under `platform/e2e/tests/platform/design-system/` that
starts `next dev` with `NEXT_PUBLIC_PLATFORM_ENABLED=true`, because the gallery 404s in production builds).

### Why marketing bundles do not change

1. **No existing version changes.** The root lockfile diff adds 215 packages and changes **0** existing
   entries (checked by comparing every `packages` entry against `platform/main`; `postcss`, `nanoid` and
   `source-map-js` were explicitly held at their previous versions, see vite above).
2. **Nothing marketing imports them.** They are imported only from `components/platform/ui/**` and
   `app/(platform)/**`. Next splits client JS per route, so marketing routes' chunk graphs are unchanged.
3. **No global CSS.** Platform styles are CSS Modules plus `tokens.css` (every selector under
   `.soyl-platform`) and KaTeX's CSS, imported only by platform modules. `app/globals.css`, the root layout,
   `next.config.ts`, `tsconfig.json` and `postcss.config.mjs` are untouched.
4. **Proof:** marketing regression (visual zero-diff at 360 and 1280, route status, Lighthouse) is green on
   this branch; output in the design-system M1 handoff.

### Audit

`npm audit` at the root after the change: the same 3 high advisories as before (`brace-expansion` via
eslint, `source-map-js` 1.2.1, `zod` 3.25.76: all pre-existing, OA-12), **0 advisories in the added packages**.
`platform/` audit: 0 vulnerabilities.

## Consequences

- Platform routes can render Markdown, maths, chemistry and every diagram kind, server-first. The slide
  player (M2) should receive server-rendered slides; if it renders slides on the client it must be
  lazy-loaded, because KaTeX (74 KB gz) and react-markdown would join its chunk.
- `react/no-danger` (WEB-6) needs an exception only for `components/platform/ui/render/**` (WEB-6 text says
  `components/platform/render/**`; the reviewed renderers live under `ui/render/` because design-system owns `ui/`).
- CSP (WEB-3): KaTeX emits inline `style` attributes, so `style-src` keeps `'unsafe-inline'`; KaTeX fonts
  load from `/_next/static/media` (`font-src 'self'`); DOMPurify and smiles-drawer need no CSP exceptions.
- Every future upgrade of these packages re-runs `npm run test:platform-ui` (XSS corpus) and the marketing
  regression. DOMPurify and KaTeX advisories must be patched within the INFRA-19 SLA.
- vitest at the root stays on 4.x until the marketing app moves to `@types/node` ≥ 22 (owner decision,
  bundle with OA-12).
