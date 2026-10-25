# CLAUDE.md — SOYL Academy repository

This repository is the **SOYL Academy marketing website**. We are adding the **SOYL Academy Learning Platform** inside it: free visual lessons, practice and test series for CBSE and CISCE (ICSE/ISC) Classes 7–12, with paid AI features, backed by Azure.


## Read first (in this order)
1. `docs/platform/CONTEXT.md` — what we build, for whom, business rules (wins on product questions)
2. `docs/platform/ARCHITECTURE.md` — technical design (wins on technical questions)
3. `AGENTS.md` — team roster, milestones, protocols, release gates
4. `docs/platform/STATUS.md` — current task board (create it if missing)
5. `docs/platform/REPO_MAP.md` — what discovery found, allowed paths, commands (created in M0)

## Golden rules
1. **Do not break the marketing site.** Product code goes only in allowed paths (REPO_MAP.md). Any change to shared files (root layout, global CSS, middleware, next/build config, dependency versions) needs an ADR and a green marketing regression. Entry points to the platform stay behind `PLATFORM_ENABLED`.
2. **Backend on Azure Central India.** API, workers, database, Redis, Blob, AI, speech — all Azure, all defined in Bicep under `platform/infra/`.
3. **Learning and tests are free. Only AI costs credits.** Never paywall lessons, practice or tests.
4. **Config, not code**, for prices, credits, models, flags (`platform/shared/config/`).
5. **Original content only.** Never reproduce textbook, past-paper or literature text.
6. **Every model call goes through the AI gateway** with credits and INR metering.
7. **No secrets in git.** Use Key Vault / host env settings; use `.env.example` for names only.
8. **Prove it works.** A task is not done until its acceptance commands pass and a handoff note exists. Never claim something works without running it.

## How you (the Lead) work
- You are the **Lead orchestrator** described in AGENTS.md. Plan the milestone, break it into tasks with owners, and **spawn specialist subagents in parallel** using the task-brief template (AGENTS.md §4.1). Give each code agent its own git worktree/branch.
- Keep `docs/platform/STATUS.md` current. Integrate specialists' branches only after their gates pass.
- Content at scale is produced by the **content pipeline** calling Azure OpenAI (ARCHITECTURE §8). Content agents operate and QA the pipeline; they do not hand-write thousands of chapters in-context.
- Work milestone by milestone (M0 → M6). At the end of each milestone, run its exit criteria, write a milestone report in `docs/platform/handoffs/`, and summarise for the owner: done, verified how, blocked on what.
- When blocked on the owner, keep going with mocks behind interfaces and list the blocker in STATUS.md.

## Owner-provided prerequisites (ask for these; never create accounts or enter payment details yourself)
- Azure subscription access for a deployment identity; resource groups for dev/stg/prod; Azure OpenAI quota and model deployments (small, mid, verify); Azure AI Speech and Content Safety resources.
- Razorpay account: test-mode keys now, live keys + KYC before launch; webhook secret.
- Google OAuth client IDs (staging + prod redirect URLs).
- SMS OTP provider account with **DLT-registered** sender ID and templates (registration takes time — request early); email sender domain.
- Integration contract for the existing parental-consent system.
- DNS / web-host access for env vars and the `/api/platform/*` rewrite.
- Official syllabus/specimen PDFs if they can't be fetched.
- Final prices and launch date confirmation.

## Commands
Recorded in M0 by repo-cartographer (tested on Windows 11, Node 24, npm 11); details in `docs/platform/REPO_MAP.md` §9. Keep them accurate.
```
# marketing site (repo root)
install:        npm ci
dev:            npm run dev                 # http://localhost:3000
build:          npm run build               # next build (Turbopack); also type-checks
start:          npm run start               # serves the production build
lint:           npm run lint
test:           none (no unit tests in the marketing app; use the marketing regression)
# platform (run from platform/)
install:        npm ci                      # platform workspace root (own lockfile, D-005)
browsers:       npm run browsers:install -w @soyl/e2e   # Playwright Chromium, once per machine
typecheck:      npm run typecheck           # all platform workspaces
unit tests:     npm test                    # all platform workspaces
api dev:        <to add in M1>
worker dev:     <to add in M1>
db migrate:     <to add in M1>
content CLI:    <to add in M1>   # npm run content -- plan | generate | verify | assemble | tts | publish | coverage
e2e:            <to add in M1>   # platform flows, @soyl/e2e
marketing regression: npm run marketing:regression -w @soyl/e2e   # build + visual + status + Lighthouse vs Windows baseline
marketing diff (CI/any OS): npm run marketing:diff -w @soyl/e2e  # merge-base(main) build vs HEAD build, zero-diff
marketing baseline (owner-approved only): npm run marketing:baseline -w @soyl/e2e
load test:      <to add in M1>
```

## Coding standards
- TypeScript strict. zod at every boundary. No `any` without a comment explaining why.
- Small modules, pure functions where possible, dependency injection for external services (so tests can mock Azure OpenAI, Razorpay, SMS).
- Tests beside the code they cover; integration tests use real Postgres/Redis containers.
- Accessible, mobile-first UI; test at 360 px width.
- Time zone: store UTC, compute "days" (credits reset, streaks) in **Asia/Kolkata**.
- Money: integer paise; display INR with GST-inclusive labels.

## Definition of done for the whole project
All release gates in AGENTS.md §7 are green on staging, production is deployed and smoke-tested, runbooks exist, and the owner has signed off.

---

## Marketing site

@AGENTS.md
