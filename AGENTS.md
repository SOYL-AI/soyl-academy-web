# AGENTS.md — How the agent team builds the SOYL Academy Learning Platform

> Location in repo: root (`/AGENTS.md`). Any coding agent working in this repo reads this file.
> Product rules: `docs/platform/CONTEXT.md` · Technical design: `docs/platform/ARCHITECTURE.md` · Operating rules: `CLAUDE.md`.

---

## 1. Team shape

One **Lead (orchestrator)** plans, delegates, integrates and enforces quality gates. It spawns **specialist agents** for well-bounded tasks, many in parallel. Specialists never merge their own work to `main`; the Lead integrates after the gates pass.

```
Lead (orchestrator)
├── Engineering
│   ├── repo-cartographer      (discovery, guardrails, baselines)
│   ├── infra-azure            (Bicep, CI/CD, environments)
│   ├── db-schema              (Drizzle schema, migrations, seeds)
│   ├── backend-api            (Fastify modules, auth, tests engine, gamification)
│   ├── ai-gateway             (actions, credits, moderation, tutor, evaluation, uploads)
│   ├── billing-razorpay       (plans sync, checkout, webhooks, entitlements, reconciliation)
│   ├── web-platform           (route group, slide player, test player, guest mode, pages)
│   ├── design-system          (scoped UI kit, slide templates, mobile-first patterns)
│   ├── qa-e2e                 (Playwright, contract tests, k6 load, a11y, marketing regression)
│   └── security-reviewer      (read-only audits, threat model, findings)
└── Content
    ├── curriculum-architect   (syllabus graph + blueprints from official sources)
    ├── pipeline-engineer      (content-pipeline CLIs, schemas, validators, ingestion, TTS)
    ├── exemplar-author        (gold-standard chapters per subject family → templates)
    ├── subject-producer ×N    (runs the pipeline per board × class × subject, fixes failures)
    ├── assessment-designer    (test series, blueprints, live mocks, paper QA)
    ├── hindi-specialist       (Hindi and other language subjects, Devanagari quality)
    └── content-verifier       (independent QA sampling; never verifies its own output)
```

## 2. Roster — responsibilities, owned paths, done criteria

| Agent | Owns (may write) | Must not touch | Done when |
|---|---|---|---|
| **repo-cartographer** | `docs/platform/REPO_MAP.md`, `platform/e2e/marketing-baseline/`, ADR-001 | anything else | Stack identified, marketing routes listed, allowed-paths list written, baseline screenshots + Lighthouse captured, consent system located (or question raised to owner), build/test commands recorded in CLAUDE.md |
| **infra-azure** | `platform/infra/`, `.github/workflows/platform-*.yml`, `platform/api/Dockerfile`, `platform/worker/Dockerfile` | marketing workflows | `dev` and `stg` deploy from CI; `prod` templates ready; budgets + alerts; runbook for deploy/rollback |
| **db-schema** | `platform/db/` | — | Schema per ARCHITECTURE §6, migrations apply cleanly up and down on a fresh DB, seed script for catalog + test users |
| **backend-api** | `platform/api/src/**` except `ai/` and `billing/` | web code | Endpoints per ARCHITECTURE §4 with zod schemas, OpenAPI, per-route auth policy, ≥ 80% line coverage on services, integration tests against a real Postgres (Testcontainers or docker compose) |
| **ai-gateway** | `platform/api/src/ai/**`, `platform/shared/config/ai-actions.ts`, `models.ts`, `credits.ts` | billing | Reserve/charge/refund proven by tests incl. failure and concurrency; moderation; streaming; spend circuit-breaker; tutor + evaluation + upload reader working on staging |
| **billing-razorpay** | `platform/api/src/billing/**`, `platform/shared/config/plans.ts`, billing scripts | credits internals | Test-mode purchase → entitlement within 60 s; webhook signature + idempotency tests; cancel/fail/halt paths; nightly reconciliation |
| **web-platform** | `app/(platform)/**`, `components/platform/**`, `platform/shared/api-client/**` | marketing pages, global CSS, root layout (ADR needed) | All routes in ARCHITECTURE §3.1 working on staging with real API; guest mode + merge; slide player; test player resilience; Lighthouse budgets met |
| **design-system** | `components/platform/ui/**`, slide layout components | marketing components | Scoped tokens, 360 px layouts, Devanagari typography, dark-mode safe, a11y AA |
| **qa-e2e** | `platform/e2e/**`, `platform/load/**` | product code (files bugs instead) | Release-gate suite (§7) automated and green on staging |
| **security-reviewer** | `docs/platform/security/**` | all code (read-only) | Threat model, ASVS L2 checklist, findings filed with severity; zero open high/critical at launch |
| **curriculum-architect** | `platform/catalog/**` | — | `subjects.yaml` complete for every board × class (7–12) incl. Hindi and all electives; syllabus files for every subject; blueprints for every paper type; `sources.md` cites official documents |
| **pipeline-engineer** | `platform/content-pipeline/**`, `platform/shared/content/**` | — | All 9 stages (ARCHITECTURE §8) runnable, resumable, budget-capped; coverage report; one subject end-to-end on staging |
| **exemplar-author** | `platform/content-templates/**` | — | One gold-standard chapter per subject family (maths, physics, chemistry, biology, history/civics/geography, economics/commerce, English language, English literature, Hindi language, Hindi literature, computer science, others) approved by Lead; prompt templates tuned until pipeline output matches exemplars |
| **subject-producer** (many) | pipeline runs for its assigned units; fixes to templates via PR to exemplar-author | other units | Its units reach coverage targets with all automated gates passed; failure log empty or escalated |
| **assessment-designer** | blueprints in `platform/catalog/**/blueprints/`, test-series definitions | — | Test series per CONTEXT §10 assembled and validated for every subject; live-mock schedule seeded |
| **hindi-specialist** | Hindi templates/exemplars; review of Hindi units | — | Hindi (and other language) subjects meet standards: correct Devanagari, grammar, board pattern, no reproduced literature |
| **content-verifier** | `docs/platform/content-qa/**` | content it generated | Random sample ≥ 5% of items per unit checked; defect rate reported; units with > 3% critical defects sent back |

## 3. Milestones and parallelism

| Milestone | Runs in parallel | Exit criteria (Lead verifies) |
|---|---|---|
| **M0 Discovery & guardrails** | repo-cartographer; curriculum-architect starts catalog; security-reviewer drafts threat model | REPO_MAP + baselines + ADR-001 approved by owner |
| **M1 Foundations** | infra-azure, db-schema, backend-api (auth, me, catalog), web-platform (route group, layout, login, guest), design-system, pipeline-engineer (schemas, stages 1–4), exemplar-author | Login works end-to-end on staging (Google, phone OTP, email OTP); marketing regression green; CI/CD to staging |
| **M2 Learning core** | web-platform (chapter hub, slide player, notes, flashcards, practice), backend-api (content, practice), pipeline-engineer (stages 5–9), subject-producers start **Wave 1** | One full subject live on staging, generated by the pipeline |
| **M3 Tests** | backend-api (tests, attempts, live), web-platform (test player, results, builder), assessment-designer | Test series for Wave 1 subjects playable end-to-end; 1,000-user load test green |
| **M4 AI + billing** | ai-gateway, billing-razorpay, web-platform (`/ask`, `/plans`, credits UI) | Credits + paywall + test-mode subscription working end-to-end |
| **M5 Content waves** | subject-producers ×N (Waves 1 → 2 → 3), hindi-specialist, content-verifier, assessment-designer | Coverage report meets CONTEXT §4 and §10 targets |
| **M6 Hardening & launch** | qa-e2e, security-reviewer, infra-azure (prod), all owners fix findings | Release gates (§7) all green on staging, then prod smoke |

Content production (M5) starts as soon as the pipeline can run one subject (end of M2) and continues in parallel with M3–M6.

### Parallel execution mechanics
- Spawn independent code agents in **separate git worktrees/branches** (`platform/<agent>/<task>`), so parallel agents never edit the same checkout.
- Fan out content by **board × class × subject**: each subject-producer gets 1–3 subjects. Run 6–10 producers at a time; respect Azure OpenAI quota and `CONTENT_BUDGET_INR`.
- Two agents never own the same path at the same time; the Lead records ownership in `docs/platform/STATUS.md`.
- Integration order for code: shared schemas/config → db → api → web → e2e.

## 4. Protocols

### 4.1 Task brief (what the Lead passes to every spawned agent)
```
ROLE: <agent name from roster>
GOAL: <one sentence outcome>
CONTEXT TO READ: CLAUDE.md, docs/platform/CONTEXT.md §<n>, docs/platform/ARCHITECTURE.md §<n>, <files>
INPUTS: <files, APIs, prior handoffs>
OWNED PATHS: <paths you may write>
DO NOT TOUCH: <paths>
DELIVERABLES: <files/endpoints/tests>
ACCEPTANCE: <commands that must pass + observable behaviour>
CONSTRAINTS: no marketing changes; no secrets in code; config not code; mock external services if creds missing
REPORT BACK: handoff note at docs/platform/handoffs/<date>-<agent>-<task>.md
```

### 4.2 Handoff note (every agent, every task)
```
# <agent> — <task> — <date>
Status: done | partial | blocked
What changed: <files, endpoints, migrations>
How to verify: <exact commands + expected output>
Tests added: <list>
Known gaps / follow-ups: <list>
Decisions made: <ADR links>
Needs from owner: <list or none>
```

### 4.3 STATUS.md
`docs/platform/STATUS.md` is the single task board: milestone, task, owner agent, branch, status, blocker. The Lead updates it after every integration. The owner reads it to see progress.

### 4.4 ADRs
`docs/platform/adr/NNN-title.md`: context, options, decision, consequences. Required for any change to shared/marketing files, new infrastructure, new dependency with runtime footprint, or deviation from ARCHITECTURE.md.

### 4.5 Commits and PRs
- Conventional commits with scope: `feat(platform-api): ...`, `fix(platform-web): ...`, `content(cbse-10-science): ...`.
- PR checklist: typecheck, lint, tests, marketing regression, no secrets, migrations reversible, docs updated, handoff written.

### 4.6 When to stop and ask the owner
- Anything requiring accounts, credentials, payments, DNS or legal decisions (see CLAUDE.md "Owner-provided prerequisites").
- Any change that would alter the marketing site's behaviour or appearance.
- Spending above `CONTENT_BUDGET_INR` or `AI_DAILY_SPEND_CAP_INR`.
- Product-rule ambiguity not answered by CONTEXT.md.
Until answered: continue with mocks/stubs behind interfaces and mark the dependency in STATUS.md.

## 5. Content agent playbooks

### 5.1 curriculum-architect
1. From official 2026–27 CBSE curriculum documents and CISCE syllabus documents, list every subject per class (7–12) → `subjects.yaml` with `board, class, code, name, language, tier (core|language|elective), wave`.
2. For each subject, write `syllabus.yaml`: chapters in board order, topics, learning outcomes, removed topics, literature texts by title only.
3. From official sample/specimen papers and marking schemes, write blueprints (board paper, chapter test, unit test, term paper).
4. Record every source with URL and fetch date in `sources.md`. If a document can't be fetched, request it from the owner and continue with others.
5. Never copy questions from official papers; they define pattern only.

### 5.2 exemplar-author
- For each subject family, hand-author one complete gold-standard chapter (deck, notes, flashcards, 60 questions, 2 chapter tests) following CONTEXT §8.
- Turn the exemplar into prompt templates + few-shot examples; iterate until pipeline output on 3 other chapters matches exemplar quality (Lead + content-verifier sign off).

### 5.3 subject-producer
1. `content plan` for assigned units → check the dry-run INR estimate.
2. `content generate` → `verify` → fix or regenerate failures (max 2 automatic retries; then flag for review).
3. `assemble` tests per blueprint → `tts` → `publish` to staging.
4. Spot-check 10 items per chapter in the staging UI (render, diagrams, maths, Hindi fonts).
5. Write handoff with coverage numbers and open flags.

### 5.4 content-verifier
- Sample ≥ 5% of items per unit, stratified by type and difficulty. Check correctness, alignment, pattern, originality, rendering, age-appropriateness.
- Severity: critical (wrong answer/unsafe/copied text), major (misaligned/marks wrong), minor (style).
- Units with > 3% critical defects go back to the producer; template-level issues go to exemplar-author.

### 5.5 hindi-specialist
- Owns quality for Hindi (and other language) subjects: grammar (व्याकरण), writing tasks (पत्र, अनुच्छेद, सूचना, विज्ञापन per board pattern), literature analysis without reproducing texts, correct Devanagari rendering and fonts, Hindi TTS voice.

## 6. Quality gates per change type

| Change | Automated gates |
|---|---|
| Any code | typecheck, lint, unit tests, build, marketing regression |
| API | + integration tests on real Postgres/Redis, route auth policy test, OpenAPI diff reviewed |
| Web | + Playwright flows touched, Lighthouse budget, axe a11y |
| DB | + migration up/down on fresh and seeded DB |
| Billing/credits | + webhook replay tests, concurrency tests, ledger invariants (balance never negative, every reserve resolved) |
| Content | schema valid, render check, verify stage pass, originality check, coverage delta |

## 7. Release gates (all must be green on staging before production)

**Marketing protection**
- [ ] Zero visual diffs on baseline marketing pages (mobile + desktop)
- [ ] Every marketing route returns 200; Lighthouse not regressed by > 5 points

**Auth and accounts**
- [ ] Sign up + login + logout with Google, phone OTP, email OTP (real providers, test numbers)
- [ ] Session refresh, account linking, account deletion
- [ ] Guest progress merges on first login; login prompt returns to the original page
- [ ] Integration with the existing parental-consent system behaves per its rules

**Learning**
- [ ] Every board × class × subject has a catalog; every chapter has deck, notes, flashcards, practice (coverage report)
- [ ] Slide player: read and listen modes, narration plays, diagrams/maths/Hindi render on a 360 px Android viewport

**Tests**
- [ ] Wave 1 test series complete per CONTEXT §10; Waves 2–3 chapter/unit/term tests complete
- [ ] Attempt survives refresh and 2 minutes offline; auto-submit at deadline; results correct
- [ ] Live mock with 5,000 simulated concurrent users: p95 < 500 ms, errors < 0.5%

**AI and billing**
- [ ] Free user gets 25 credits/day; costs shown before action; reserve/charge/refund correct; reset at 00:00 IST
- [ ] Paywall on exhaustion; Razorpay test-mode monthly, yearly and Board Exam Pass purchases grant entitlement within 60 s
- [ ] Webhook signature rejection, duplicate-event idempotency, failed/halted/cancelled flows
- [ ] Global AI spend circuit-breaker trips and recovers

**Platform**
- [ ] Security: zero open high/critical findings; dependency + secret scans clean
- [ ] Observability dashboards and alerts live; runbooks written; backup restore drill done
- [ ] Production smoke test after deploy (login, lesson, test, AI action, purchase with a ₹1 test plan or Razorpay test flow as the owner decides)

---

## Marketing site

The instructions below predate the platform and still apply to all web code in this repo (marketing and `app/(platform)/`).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
