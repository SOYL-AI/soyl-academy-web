# repo-cartographer — M0 discovery, guardrails, marketing baseline — 2026-10-25

Status: **done**

Branch: `platform/repo-cartographer/m0` (worktree `C:/Users/Prabhu/soyl-wt/repo-cartographer-m0`), merged with `origin/platform/main` @ `e492fe4` (includes the next 16.4.3 hotfix).

## What changed

- `docs/platform/REPO_MAP.md`: stack, build/deploy (Vercel; existing product app on Azure Container Apps), env vars, all marketing routes (20 pages + 404, metadata routes, feeds, OG, 2 POST-only API routes, 2 server actions), no proxy/middleware, auth/consent/payment findings, root-layout analytics conflict and its resolution, route collisions (none), **allowed paths**, regression docs incl. differential mode, baseline numbers, owner questions.
- `docs/platform/adr/001-repository-integration.md` (**Accepted**): `app/(platform)` route group + `platform/` separate npm workspace; flag-gated `notFound()`; same-domain `/api/platform/*` (BFF route handler recommended, rewrite allowed only via ADR-005); no global CSS/root-layout changes; Vercel Analytics excluded from platform paths; Step 0 shared-file changes recorded.
- `platform/e2e/` (new workspace `@soyl/e2e`): Playwright 1.64.0 + Lighthouse 13.5.0 + chrome-launcher. `marketing/{routes,stabilise}.ts`, `marketing/{visual,status}.spec.ts`, `playwright.config.ts`, `scripts/{lib,marketing,marketing-diff}.mjs`, baseline in `marketing-baseline/` (44 PNGs, 11 MB; `route-status.json`, `lighthouse.json`, `build-output.json`).
- `platform/package-lock.json` (e2e dependencies; re-resolved after merging platform/main's zod 4.6.7 / vitest 5).
- `CLAUDE.md` "## Commands": real, tested commands.

No marketing file changed.

## How to verify

```
# repo root
npm ci && npm run build && npm run lint
git diff --stat platform/main -- app components content lib public package.json package-lock.json next.config.ts   # empty
# platform/
npm ci && npm run browsers:install -w @soyl/e2e
npm run marketing:regression -w @soyl/e2e      # ~10 min; "marketing regression PASSED"
npm run marketing:diff -w @soyl/e2e            # ~3.5 min; "differential marketing regression PASSED"
```

## Acceptance evidence (real output, trimmed)

**Root build and lint** (on next 16.3.4 before the merge, and again on 16.4.3 after it):
```
▲ Next.js 16.3.4 (Turbopack)
✓ Compiled successfully in 10.7s
✓ Generating static pages using 7 workers (34/34) in 1419ms
exit 0
> soyl-academy@0.1.0 lint
> eslint
lint exit 0
```

**Marketing untouched.** On the final head, `git diff --stat platform/main -- app components content lib public package.json package-lock.json next.config.ts` prints nothing. Before the merge, the same diff against the branch point `9955f36` was also empty. (Before the merge, the diff against the moved `platform/main` showed only the Lead's hotfix to `package.json` and the lockfile.)

**Determinism and regression on Next 16.3.4 (the live version), two consecutive full runs against the captured baseline:**
```
run 1:  [marketing] build size: first-load JS unchanged on every route
          48 passed (28.9s)
        [marketing] marketing regression PASSED: no visual diffs, all routes as expected, Lighthouse within 5 points
        real 9m30.949s   exit 0
run 2:  [marketing] build size: first-load JS unchanged on every route
          48 passed (32.3s)
        [marketing] marketing regression PASSED: no visual diffs, all routes as expected, Lighthouse within 5 points
        real 9m6.082s    exit 0
```
(48 tests = 21 pages + first-visit view × 2 viewports, plus 4 status tests. Each run did a fresh `npm run build`.)

**On the final merged head (Next 16.4.3), two consecutive full runs:** both `48 passed`, `marketing regression PASSED`, exit 0 (9m41s, 9m25s).

**Differential mode** (merge-base of `origin/main` = `83f0f09`, the live site on 16.3.4, vs HEAD `95ab827` on 16.4.3):
```
[marketing] differential regression: base 83f0f098fb (merge-base of origin/main) vs HEAD 95ab827e48 + working tree
  44 passed (34.4s)      # base capture
  48 passed (29.9s)      # HEAD compare + status
[marketing] differential marketing regression PASSED: HEAD renders the marketing site identically to its merge-base
real 3m21.034s  exit 0
```

## Hotfix 16.4.3 vs 16.3.4 baseline (evidence for OA-11)

**0 visual diffs (all 44 screenshots) / routes OK (52 checks, 0 failures) / Lighthouse: no category dropped.** This was confirmed twice with the Windows-baseline regression and once with the differential mode against the live `main` commit.

| Preset | Page | perf (baseline → 16.4.3) | a11y / BP / SEO |
|---|---|---|---|
| mobile | `/` | 84 → 91 (+7) | 100 / 100 / 100 unchanged |
| mobile | `/schools` | 91 → 97 (+6) | unchanged |
| mobile | `/students` | 96 → 95 (−1) | unchanged |
| mobile | `/parents` | 94 → 96 (+2) | unchanged |
| mobile | `/future-builders` | 95 → 96 (+1) | unchanged |
| mobile | `/journal` | 96 → 96 (0) | unchanged |
| mobile | `/about` | 95 → 98 (+3) | unchanged |
| mobile | `/contact` | 97 → 98 (+1) | unchanged |
| desktop | all 8 pages | 100 → 100 | unchanged |

The positive mobile deltas are within localhost noise: the 16.3.4 regression runs also measured `/` at 96 and 94. Build size: first-load JS +1.4 to 1.5 KB gzip (+0.7 to 0.8 %) on every page and −0.6 KB on `/contact`, which is the Next runtime change and is informational only. No diff images exist because nothing differed.

## Tests added

- `platform/e2e/marketing/visual.spec.ts`: 22 screenshots × 2 viewports, zero tolerance.
- `platform/e2e/marketing/status.spec.ts`: pages, endpoints, sitemap URLs incl. OG images, and build-manifest completeness.
- Lighthouse gate and build-size report in `scripts/lib.mjs`.
- Differential mode `scripts/marketing-diff.mjs`.

## Known gaps / follow-ups

- **CI wiring (infra-azure, M1):** call `npm run marketing:diff -w @soyl/e2e`. The steps are in REPO_MAP §9.5. Lighthouse is off by default in diff mode (`--lighthouse` turns it on) because shared runners are noisy.
- **Lighthouse noise:** single mobile runs on localhost vary by up to ~12 points (`/schools` measured 85 / 97 / 90). The gate takes a median of 5 runs and re-measures before failing. The committed home mobile baseline (84) sits at the low end of the observed range, which makes that page's gate lenient. Re-baseline only with owner approval.
- **Baselines must be re-captured** (with owner approval) on 1 January (footer year), when real media is added, when a new Future Builders cohort is set, and on Playwright/Next/Tailwind upgrades. See REPO_MAP §9.4.
- Lighthouse uses system Chrome (156), which auto-updates. If an update alone moves scores, re-capture only the Lighthouse baseline.
- `routes.ts` `PLATFORM_PREFIXES` should import the shared constant once web-platform adds it (ADR-001 §8).
- Allowed paths for web-platform are in REPO_MAP §10. These changes need the ADR-001 scope plus a green regression: the nav entry points behind `NEXT_PUBLIC_PLATFORM_ENABLED`, and the analytics exclusion in `ConsentedAnalytics.tsx`.

## Decisions made

- ADR-001 (Accepted). It now references D-013, D-014 and D-016/WEB-2. Because a `next.config.ts` rewrite cannot add the edge-secret header, ADR-001 recommends that ADR-005 choose a route-handler BFF at `app/(platform)/api/platform/[...path]/route.ts`, which needs no shared-file change.
- Baselines cover all pages; there is no key-page subset because the total is 11 MB, under the 30 MB budget.
- Bundled Chromium is used for screenshots, so pixels are pinned. System Chrome is used for Lighthouse, as the brief requires.
- The regression builds with a canonical environment: `NEXT_PUBLIC_*`, `PLATFORM_*` and similar variables are stripped, so platform flags are off.

## Contradictions with ARCHITECTURE.md

- §1/§13 describe a plain rewrite of `/api/platform/*`. D-016/WEB-2 need an injected header, which rewrites cannot do. ADR-001 §5 records this and defers the mechanism to ADR-005. ARCHITECTURE §1 should be updated when ADR-005 lands.
- §3.2 says "no edits to … marketing components", but the analytics exclusion (CONTEXT §12, D-014) can only be done in `components/legal/ConsentedAnalytics.tsx`. ADR-001 §8 authorises that one scoped change.
- §3.2 says to use the "existing site font". The site uses Inter + Instrument Serif via `next/font`. The stale README says Instrument Sans, and also claims GSAP and Lenis, which are not installed.

## Needs from owner

- **OA-08:** the parental-consent integration contract. The consent system is **not** in this repo; only cookie consent and policy text exist.
- **OA-11:** merge `hotfix/next-16.4.3`. The evidence above shows zero visual diffs, all routes OK and no Lighthouse drop.
- **Q-1 to Q-4** in REPO_MAP §12: marketing positioning (Grades 1–10 assignments vs the Classes 7–12 platform); what "Sign in" to the Azure product app means for platform login; the consent contract; Vercel preview deployments of `platform/*` branches on the public repo.
