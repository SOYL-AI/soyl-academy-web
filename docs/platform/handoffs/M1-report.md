# M1 report — Foundations

**Status: exit criteria met as green (stand-in) (2026-10-27).** Everything runs against local stand-ins and GitHub Actions; no owner credentials exist and deployment is deferred to a later phase by the owner (D-025). Real-provider and staging checks are listed under "Not yet verified".

## Exit criteria

| Criterion (AGENTS.md §3) | Result | Evidence |
|---|---|---|
| Login works end-to-end with Google, phone OTP and email OTP | **green (stand-in)** — mock Google OIDC provider, mock SMS and email outboxes, real Postgres | web e2e `npm run test:platform-web -w @soyl/e2e`: flag ON 31 passed, flag OFF 13 passed (real local API + `next start`); API `npm test -w @soyl/api` 265 passed (98% lines) incl. OTP limits, lockouts, PKCE/state/nonce and ID-token signature checks |
| Guest progress merges on first login; login prompt returns to the original page | **green (stand-in)** | same web e2e suite; API merge idempotency tests |
| Marketing regression green | **green** for visuals and routes; Lighthouse **within machine noise** (see D-028) | `marketing:regression -- --skip-lighthouse`: 48 passed, zero visual diffs; flag-off proof: identical HTML/CSS/DOM on all 21 marketing pages; CI `marketing · differential regression vs main` green on every platform/main push |
| CI/CD to staging | **CI green**; CD deferred (D-025) | GitHub Actions `platform-ci` (real Postgres+pgvector, Redis, gitleaks, audit, Trivy, CodeQL, image builds); `platform-deploy` is a guarded no-op until `AZURE_DEPLOY_ENABLED` |

## What was built in M1 (all on `platform/main`)

| Area | Summary | Tests |
|---|---|---|
| Database (`@soyl/db`) | 60+ tables, reversible migrations 0000–0006, embedded-Postgres test harness, catalog/content seeds, PII inventory | 100 (+1 CI-only pgvector) |
| API (`@soyl/api`) | Fastify, route-policy framework, edge auth, rate limits, problem+json, OpenAPI; auth (Google, phone OTP, email OTP), me, catalog; M2 content/practice/progress/reports/XP/staff TOTP already merged | 265 |
| Worker (`@soyl/worker`) | pg-boss, purge/sweeper jobs, health | 44 |
| Web (`app/(platform)`) | flag-gated route group, same-domain API proxy (ADR-005), security headers/CSP (ADR-011), login sheet, guest mode + merge, `/learn` catalog pages for 767 subjects, `/me`, platform sitemap | 94 unit + 44 e2e |
| UI kit (`components/platform/ui`) | scoped tokens, components, safe renderers (Markdown, KaTeX/mhchem, SVG sanitiser, plot, geometry, chem, table, flow), slide layouts | 422 incl. XSS corpus; axe at 360/1280 px |
| Content pipeline | 9 stages (catalog → publish), mock + Azure OpenAI providers, budget ledger, test assembler, TTS, coverage | 233 + 26 (ai-core) |
| Content contract | v2: 15 question types, decks, notes, flashcards, visuals, blueprints, tests, releases | 66 |
| Catalog | 767 subjects, 644 syllabus files, 7,440 chapters, 26,454 topics, 359 blueprints | validated by `npm run content -- catalog` |
| Content | 20 hand-authored chapters (CBSE 10 Science ch01–13, Maths ch01–04 + ch06, Hindi A ch02 + ch10), 1,538 questions, 40 chapter tests | gate 141/141, lint 0 errors |

## Decisions taken in M1
D-020 … D-028 in [DECISIONS.md](../DECISIONS.md); ADRs 002–012 in [adr/](../adr/).

## Issues found and fixed at integration
- Shared-contract change broke the geometry renderer's typecheck → fixed; root build now runs after every merge touching `platform/shared`.
- Authored content was not linted (CRLF edit miss) → fixed and verified.
- CI: images shipped dev tooling with HIGH/CRITICAL CVEs → images now ship only the self-contained bundle (proven by running bundles without node_modules); gitleaks scanned unmerged branches → scans HEAD history; two reviewed placeholder findings in `.gitleaksignore`.
- Redis KV expired on wall-clock time while tests use an injected clock → fixed with contract tests on memory, ioredis-mock and real Redis.
- DB-6: answers of case-question alternatives were stored in the student-visible body → fixed with a deep-scan regression test.
- Seed skipped class-default blueprints → fixed (359 load).

## Not yet verified (needs owner credentials or deployment — OWNER_ACTIONS)
Real Google OAuth (OA-05), DLT SMS (OA-06), email sender (OA-07), parental-consent provider (OA-08 — production refuses to start with the mock, by design), staging/`__Host-` cookies over HTTPS, Vercel `x-real-ip` spoofing check (API-3), Azure deployment (OA-01, deferred).

## Open items carried into M2+
- Lighthouse absolute baseline cannot be reproduced on this machine (D-028).
- A local API dev server started by the web agent (PID 3200, port 8787) is still running; the agent's attempt to stop it was denied by the permission system and the Lead has not overridden that. It also locks the `web-platform-m1` worktree folder.
- Security findings register file (OA-13) and the live-site Next.js hotfix merge (OA-11) await the owner.
