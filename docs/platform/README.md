# SOYL Academy Learning Platform — handbook

> Start here. As built: **2026-10-28**, `platform/main` @ 49aa8a4. Live site: **www.soylai.com** (SOYL does not own soylacademy.com).
> For the owner and future team: what exists, how it fits together, and what is pending. For engineers and agents: where to look to run, test, deploy and extend it.

## 1. What SOYL Academy is

A learning platform for students in **Classes 7–12** on the **CBSE** and **CISCE (ICSE/ISC)** boards, built inside the SOYL marketing website repository and served from the same domain. Product rules: [CONTEXT.md](CONTEXT.md).

| Principle | Meaning |
|---|---|
| Learning is free | Visual slide lessons, notes, flashcards, practice, chapter tests, test series and All-India mocks are never paywalled (CONTEXT §5). |
| Only AI costs credits | AI tutor, photo doubts, AI evaluation, "papers like my school's" and "explain this slide" use credits: 50 free per day; Plus 100, Pro and Board Exam Pass 150, plus learning bonuses (D-044; 1 credit = ₹0.10 of AI budget; reset 00:00 IST). |
| Plans (AI only) | Plus ₹199/month or ₹1,499/year; Pro ₹299/month or ₹2,499/year; Board Exam Pass ₹499 one-time until 31 Mar 2027. GST-inclusive, in config (`platform/shared/config/plans.ts`). Razorpay only. |
| For whom | Mostly mid/low-end Android phones on patchy data; English-medium with Hinglish; Hindi subjects in Devanagari. Parents pay; parental consent comes from the owner's existing consent system. |
| Beta target | 15 January 2027 (D-003), Wave 1 (Classes 10 and 12) first. |

**How it is built:** a Next.js route group `app/(platform)` in the marketing app (Vercel) talks through a same-domain proxy to a Fastify API and a pg-boss worker on Azure Container Apps in Central India, with PostgreSQL, Redis, Blob, Communication Services email and (later) Azure OpenAI, Speech and Content Safety. Design: [ARCHITECTURE.md](ARCHITECTURE.md) (with "As built" notes per section).

## 2. Where things stand (2026-10-28)

- **Code:** M0–M4 done or built, all tested on local stand-ins and in CI (D-010: "green (stand-in)" means verified against stand-ins, never against staging). M5 content and M6 hardening are in progress. See [STATUS.md](STATUS.md).
- **Content:** CBSE Class 10 core five subjects complete: **99 chapters, 7,534 questions, 198 chapter tests, 41 frozen series papers**, hand-authored (no model endpoint yet). See [content.md](content.md).
- **Production:** the API, worker and database run **dark** in Azure (every `/v1` route 404) since 2026-10-27, behind `platform/main` (41 chapters, migrations 0000–0007). Platform web pages are not on `main` yet, so nobody can reach the platform. See [operations.md](operations.md).
- **Marketing site:** live on Vercel from `main` (editorial redesign + Next.js 16.4.3 security hotfix).
- **Biggest blockers (owner):** consent contract (OA-08), Azure OpenAI/Speech/Content Safety (OA-02/03), Razorpay test keys (OA-04), Google OAuth (OA-05), legal view on children's data (OA-14). See [OWNER_ACTIONS.md](OWNER_ACTIONS.md).
- **Security:** M6 review: 0 critical, **1 high (S6-H01: live-mock keys visible to early submitters; blocks live mocks; fix in progress)**, 11 medium, 13 low. See the [M6 review](handoffs/2026-10-27-security-reviewer-m6.md).

## 3. What is built, by area

Status legend: **Built** = code merged on `platform/main` and tested end to end on stand-ins. **Stand-in only** = works only against a mock until an owner action is done. **Pending owner** = cannot proceed without the owner. **In progress** = an agent is working on it. **Not built** = planned, no code.

| Area | Status | What exists | Pending | Key docs |
|---|---|---|---|---|
| **Auth** | Built; email OTP live-capable in prod (dark) | Email OTP, phone OTP, Google OIDC (PKCE/state/nonce), explicit account linking, sessions list/revoke, sign-out, account deletion with 30-day purge, staff TOTP (AUTH-11), `AUTH_METHODS` switch. Production: email only via ACS from `noreply@soylai.com` (domain verified). | Google client (OA-05); SMS with DLT (OA-06, dropped for now); real-provider e2e on staging | [ADR-002](adr/002-auth-better-auth.md), [ADR-011 staff TOTP](adr/011-staff-totp.md), [API §5–6](api-reference.md#5-auth-13), [M1 report](handoffs/M1-report.md) |
| **Consent** | Stand-in only | `ConsentProvider` interface; `mock` (local), `unavailable` (production: everyone `pending`). Gated features off without consent: AI, uploads, leaderboards/leagues, rank cards, school/city, notifications, purchases (D-014). Learning and tests never gated. | Integration contract for the owner's consent system (OA-08); AUTH-15 purge decision (OA-14) | [D-014](DECISIONS.md), [prod-readiness](handoffs/2026-10-27-prod-readiness.md) |
| **Guest mode** | Built | Guests read, listen and practise with progress in `localStorage` (`soyl_guest_v1`); first sign-in merges lessons and practice once (idempotent, capped XP); the login prompt returns to the original page. | — | [web M1](handoffs/2026-10-27-web-platform-m1.md), [backend-api M1](handoffs/2026-10-26-backend-api-m1.md) |
| **App shell, theme, progress UI** | Built (ADR-023, 2026-10-28) | Platform pages have their own app shell (top bar, mobile tab bar, app footer with legal links and cookie preferences); the marketing header/footer step aside on platform paths. Light / Dark / System theme (cookie, no flash). Khan-style mastery and learning path, LeetCode-style practice list and activity heatmap, FUT-style private player card, weekly league and store rarity (earned only, no randomness). | — | [ADR-023](adr/023-platform-app-shell-and-theme.md), [UI revamp handoff](handoffs/2026-10-28-web-platform-ui-revamp.md) |
| **Catalog** | Built | 767 subjects (CBSE 444, CISCE 323), 644 syllabus files, 7,440 chapters, 26,454 topics, 359 CBSE blueprints; `/learn` board → class → subject → chapter pages; platform sitemap. | ICSE/ISC blueprints (ICSE 10 in progress); unverified syllabus files (OA-16) | [content.md §6](content.md#everything-else), [D-020](DECISIONS.md), [D-027](DECISIONS.md) |
| **Lessons, notes, flashcards, practice** | Built | Chapter hub; slide player (read mode, keys/swipe, resume, check slides; listen mode only with recorded audio); notes (SEO); flashcards; practice for all 15 question types with server grading and self-marking; lesson progress; report a mistake. | Narration audio (OA-03); download deck as PDF (not built) | [ADR-010](adr/010-content-api-caching-and-answer-separation.md), [ADR-017](adr/017-platform-web-learning-core.md), [M2 report](handoffs/M2-report.md) |
| **Content** | Built for CBSE 10 core; in progress elsewhere | Contract v2; hand-authored chapters in git; all gates; frozen series. Pipeline stages 1–9 built on a mock model. | Real generation (OA-02); Class 12, other Class 10 subjects, Classes 7–9/11, all ICSE/ISC content; Hindi A and English series | [content.md](content.md), [ADR-006](adr/006-content-storage.md), [ADR-019](adr/019-frozen-test-series-in-release.md) |
| **Tests, series, live mocks** | Built (stand-in); live mocks blocked | Series catalogue, attempts with autosave + offline grace, auto-submit, grading, results with percentile, self-evaluation, custom builder, live All-India mocks with registration and ranks; web player with IndexedDB queue. Live event detail page API. | S6-H01 fix before any live mock; `live_reserved` items; 5,000-user load run on Azure; rank-card image | [ADR-012 test engine](adr/012-test-engine.md), [ADR-018](adr/018-platform-web-tests-ai-plans.md), [M3 report](handoffs/M3-report.md) |
| **AI gateway and credits** | Stand-in only | 7 actions, SSE tutor (hint first), explain slide, photo doubts, AI evaluation, paper-from-upload; Postgres credit ledger with reserve/charge/refund; fail-closed moderation; retrieval; spend breaker; `/ask`, credits chip, paywall; AI-answer reports. Off in production. | Azure OpenAI (OA-02), Content Safety (OA-03), consent (OA-08), pricing check (OA-18) | [ADR-013](adr/013-ai-gateway.md), [ADR-014](adr/014-tutor-retrieval.md), [ADR-015](adr/015-ai-moderation-fail-closed.md), [M4 report](handoffs/M4-report.md) |
| **Billing and plans** | Stand-in only | Plans from config; subscriptions and Board Exam Pass orders; signed webhooks with re-fetch and exactly-once; entitlements → credit top-up; reconciliation; `/plans` with Razorpay Checkout; `/me` plan and cancel. `BILLING_ENABLED=false` in production. | Razorpay test keys and webhook (OA-04); consent (OA-08); live keys + KYC before launch | [ADR-016](adr/016-billing-razorpay.md), [webhook runbook](runbooks/razorpay-webhook-replay.md), [M4 report](handoffs/M4-report.md) |
| **Gamification** | Built (web league view, player card, heatmap: ADR-023) | XP and levels, IST daily streaks with weekly freeze, badges, live-mock leaderboards, **weekly class leagues** (5 tiers, divisions of 30, promotion/relegation, hourly job; API merged 2026-10-28). All leaderboards consent-gated. | School/city leagues (501); public rank cards (never: the player card is private) | [backend-api M2](handoffs/2026-10-27-backend-api-m2.md), [M5 follow-ups](handoffs/2026-10-27-backend-api-m5-followups.md) |
| **SOYL Coins** | In progress (decided, no code) | D-037: earn-only coins for genuine learning, check-ins and streaks; no purchase, transfer or cash value; digital items and exclusive physical merch; no loot boxes. | Physical redemption needs parent consent (OA-08) and a merch vendor + budget (OA-19) | [D-037](DECISIONS.md), [OA-19](OWNER_ACTIONS.md) |
| **Staff / admin** | Partly built | Staff (reviewer/admin) TOTP enrolment and verification; `/admin` reports queue (content and AI-answer reports); first admin via `db admin bootstrap`. | Inline content editor, config screen, user lookup (not built); staff sign-in needs Google (OA-05) | [ADR-011 staff TOTP](adr/011-staff-totp.md), [API §12](api-reference.md#12-staff-two-step-verification-and-admin-6) |
| **Marketing protection** | Built | Flag-gated route group; flag-off HTML/CSS byte-identical; visual + route + Lighthouse regression; CI differential regression vs `main`; no Vercel builds for `platform/**`. | Re-capture the baseline after the editorial redesign (owner-approved) | [ADR-001](adr/001-repository-integration.md), [REPO_MAP §9](REPO_MAP.md#9-marketing-regression-platforme2e-workspace-soyle2e), [D-028](DECISIONS.md), [D-030](DECISIONS.md) |
| **Infrastructure and CI** | Built; production dark | Bicep for all environments; production deployed by hand (D-031); keyless managed identity everywhere; CI with real Postgres/Redis, gitleaks, audit, Trivy, CodeQL, Bicep validation, image scans. | Dev/staging + CI deploys (OA-01); scale-up before launch; ADR-008; dashboards | [operations.md](operations.md), [runbooks](operations.md#runbooks) |

## 4. Map of the documents

### Product and design

| Document | What it is |
|---|---|
| [CONTEXT.md](CONTEXT.md) | Product rules: users, scope, access model, credits, plans, content standards, test series, privacy. Wins on product questions. |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Technical design with "As built (2026-10-28)" notes per section. Wins on technical questions. |
| [DECISIONS.md](DECISIONS.md) | D-001 … D-037: decisions taken on the owner's behalf or on owner instruction. |
| [adr/README.md](adr/README.md) | Index of architecture decision records (ADR-001 … ADR-019). |
| [PROMPTS.md](PROMPTS.md) | The original planning pack's prompts (historical). |

### As-built references

| Document | What it is |
|---|---|
| [api-reference.md](api-reference.md) | Every API route (81) with roles, CSRF, rate limits, consent, MFA, purpose and source handoff; how to regenerate. |
| [data-model.md](data-model.md) | 69 tables by area, invariants (DB-6 answer separation, credit ledger trigger, roles), migrations 0000–0010, PII summary. |
| [content.md](content.md) | Content contract v2, authoring workflow, pipeline stages, gates, frozen series, competency balance, originality rules, coverage. |
| [operations.md](operations.md) | Environments, Azure production resources, Vercel, CI jobs, content releases, alerts, costs, rollback, runbooks. |
| [REPO_MAP.md](REPO_MAP.md) | Discovery of the marketing app (M0), allowed paths, marketing regression commands. |

### Progress and owners

| Document | What it is |
|---|---|
| [STATUS.md](STATUS.md) | The task board: milestones, tasks, backlog, CI evidence, coverage, production deployment. |
| [OWNER_ACTIONS.md](OWNER_ACTIONS.md) | OA-01 … OA-19: what only the owner can do, and what each unblocks. |
| [handoffs/INDEX.md](handoffs/INDEX.md) | Every handoff note by area and date, and the milestone reports M0–M4. |

### Runbooks

| Runbook | Use |
|---|---|
| [runbooks/prod-first-deploy.md](runbooks/prod-first-deploy.md) | Build production from nothing (dark start); all `az` commands; rollback; scale-up |
| [runbooks/update-dark-backend.md](runbooks/update-dark-backend.md) | Move production to a newer `platform/main` |
| [runbooks/publish-content.md](runbooks/publish-content.md) | Publish merged chapters and frozen series to production |
| [runbooks/deploy-marketing-site.md](runbooks/deploy-marketing-site.md) | Deploy `main` to www.soylai.com (incl. the Vercel Hobby workaround) |
| [runbooks/razorpay-webhook-replay.md](runbooks/razorpay-webhook-replay.md) | Billing incidents |

### Security

| Document | What it is |
|---|---|
| [security/threat-model.md](security/threat-model.md) | Threat model (M0) |
| [security/asvs-l2-checklist.md](security/asvs-l2-checklist.md) | OWASP ASVS L2 checklist |
| [security/requirements-for-m1.md](security/requirements-for-m1.md) | Testable security requirements (AUTH-*, API-*, DB-*, WEB-*, INFRA-*) referenced throughout the code |
| [M6 review](handoffs/2026-10-27-security-reviewer-m6.md) | Current findings register (S6-*) and the prior register's status |

### Package guides (in the code tree)

[`platform/api/README.md`](../../platform/api/README.md) (run, environment, adding a route) · [`platform/db/README.md`](../../platform/db/README.md) and [`PII.md`](../../platform/db/PII.md) · [`platform/content-pipeline/README.md`](../../platform/content-pipeline/README.md) · [`platform/content/README.md`](../../platform/content/README.md) · [`platform/content-templates/README.md`](../../platform/content-templates/README.md) · [`platform/load/README.md`](../../platform/load/README.md) · [`components/platform/ui/README.md`](../../components/platform/ui/README.md). Commands for everything: root [`CLAUDE.md`](../../CLAUDE.md) "Commands"; team process: [`AGENTS.md`](../../AGENTS.md).

## 5. Getting started (engineers and agents)

```
# marketing app + platform web (repo root)
npm ci && npm run build

# platform (from platform/)
npm ci
npm run typecheck && npm test
npm run dev -w @soyl/api          # local API on :8787 with embedded Postgres, all authored content, mock providers
```

Then, at the repo root, set `NEXT_PUBLIC_PLATFORM_ENABLED=true`, `PLATFORM_API_ORIGIN=http://localhost:8787` and `PLATFORM_EDGE_SECRET=<the local dev edge secret from platform/api/README.md>` in `.env.local` and run `npm run dev`; open http://localhost:3000/learn. Test sign-in uses `*@example.com` addresses and `GET /api/platform/v1/dev/otp-outbox?to=…` for the code.

Rules that matter most (CLAUDE.md): never break the marketing site (allowed paths in REPO_MAP §10); config not code; original content only; every model call through the metered client; no secrets in git; prove it works and write a handoff.

## 6. Glossary

| Term | Meaning |
|---|---|
| **Board** | CBSE, or CISCE (ICSE up to Class 10, ISC for 11–12). |
| **Unit** | One board × class × subject × chapter, e.g. `cbse-10-science-ch06`. The unit of content production, publishing and rollback. |
| **Release** | An immutable versioned bundle of one unit's content (`unit@version`: decks, notes, flashcards, questions), stored as JSON in Blob and ingested into Postgres; reads go through the unit's **active** release, and rollback re-activates an older one (ADR-006). |
| **Blueprint** | A machine-readable paper pattern: sections, question types, marks, internal choice, chapter scopes, competency shares, duration. Board papers, chapter tests, unit tests and class defaults live in `platform/catalog`. |
| **Frozen series** | A subject's unit tests, full mocks and May-track papers assembled once from the bank and committed to git (`content/authored/series/<subject>.json`), so published papers only change through a reviewed re-freeze (ADR-019). |
| **Credits** | The student-facing unit of AI usage: 1 credit = ₹0.10 of AI budget; daily grant by plan, reset at 00:00 IST, reserved before an AI action, then charged or refunded. Only AI uses credits. |
| **SOYL Coins** | A planned earn-only reward currency (D-037) for genuine learning and check-ins, redeemable for digital items and exclusive merch; cannot be bought, transferred or exchanged for credits or cash. Not built yet. |
| **Stand-in** | A local or mock replacement for a real service (mock model, Razorpay stub, mock consent, embedded Postgres) used until the owner provides credentials. Results against stand-ins are reported as **green (stand-in)**, never as "green on staging" (D-010). |
| **Dark launch** | Deployed and running, but switched off for users: `PLATFORM_ENABLED=false` (every `/v1` route answers 404) and the web flags unset in Vercel, so nobody can reach the platform. Production has been dark since 2026-10-27 (D-031). |
| **Edge secret** | A shared secret header (`x-soyl-edge-auth`) that only the Vercel proxy adds; the API refuses `/v1` calls without it (D-016). |
| **Wave** | Build order: Wave 1 = Classes 10 and 12; Wave 2 = 9 and 11; Wave 3 = 7 and 8 (CONTEXT §4). |
| **Exemplar** | A hand-authored gold-standard chapter per subject family, used as the template for producers and prompts (`platform/content-templates/exemplars/`). |
| **DB-6** | The rule (and tests) that answers, solutions, marking schemes and rubrics never reach students before they answer: they live only in `question_keys`. |
| **Board-assessed** | Whether a chapter or topic is examined in the board exam; formative-only material (e.g. CBSE 10 Science ch14–15) never appears in series papers. |
