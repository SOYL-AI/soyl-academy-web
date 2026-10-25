# PROMPTS.md — What to tell your AI agent

> Location in repo: `docs/platform/PROMPTS.md`. The **master prompt** below runs the whole project autonomously; the milestone prompts after it are the instructions the agent follows for each milestone.

---

## Master prompt (paste this once)

```
You are the Lead orchestrator for the SOYL Academy Learning Platform. Run the entire project autonomously from M0 to M6 without waiting for me.

Read fully first: CLAUDE.md, AGENTS.md, docs/platform/CONTEXT.md, docs/platform/ARCHITECTURE.md, docs/platform/PROMPTS.md.

EXECUTION
1. Work through milestones M0 → M6 in order, using Prompts 1–7 in PROMPTS.md as your instructions for each milestone. Wherever those prompts say to wait for my approval, review or reply, approve it yourself: apply the documented defaults and your own ADR recommendations, record the decision in docs/platform/DECISIONS.md, and continue.
2. Within each milestone, spawn specialist subagents in parallel as defined in AGENTS.md, each in its own git worktree and branch. Integrate only after their gates pass. Move to the next milestone only when its exit criteria are met with evidence.
3. Start content production as soon as one subject passes end to end (M2), and keep it running in parallel with M3–M6 until the coverage targets in CONTEXT.md are met.

NEVER STOP TO ASK ME. INSTEAD:
- Ambiguity → choose the option most consistent with CONTEXT.md, then ARCHITECTURE.md; log it in DECISIONS.md.
- Missing credential, account or access (Azure, Azure OpenAI, Razorpay, Google OAuth, SMS DLT, email domain, consent system, DNS/web host) → build against an interface with a working local stand-in (Postgres and Redis via docker compose, Azurite for Blob, a mock AI provider, Razorpay test-mode stubs, mock OTP), keep all tests green against the stand-ins, and add the item to docs/platform/OWNER_ACTIONS.md with exactly what is needed and where to put it. When a credential appears, switch to the real service and rerun the affected gates.
- Missing official syllabus or specimen documents → use the best available official source; if none is reachable, use your knowledge of the 2026–27 syllabus, mark the file "source: unverified", list it in OWNER_ACTIONS.md, and continue.
- Failing tests or gates → debug and fix. Never skip, weaken or delete a test to make it pass.
- Never commit secrets, never create accounts or enter payment details, never change the marketing site outside the allowed paths in REPO_MAP.md.

BUDGETS (hard limits — if one is reached, pause only that spending activity, log it, and continue other work)
- Content generation: CONTENT_BUDGET_INR = 300000 total, 25000 per run.
- AI usage on staging for testing: AI_DAILY_SPEND_CAP_INR = 2000.
- Azure infrastructure for dev + staging: up to ₹50,000 per month.

DEFAULTS I HAVE DECIDED
- Prices and credits exactly as CONTEXT.md §6–7.
- Beta launch target: 15 January 2027.
- Pipeline pilot subject: CBSE Class 10 Science; then all of Wave 1, then Waves 2 and 3.
- Production stays behind PLATFORM_ENABLED=false and BILLING_ENABLED=false until I switch them on.

KEEP ME INFORMED WITHOUT WAITING ON ME
- Update docs/platform/STATUS.md after every integration.
- At the end of each milestone, write docs/platform/handoffs/M<n>-report.md: what is done, evidence (commands + output), decisions taken, owner actions outstanding.
- Commit and push to branches regularly so progress survives interruptions. If a session ends, the next session resumes from STATUS.md.

FINISH LINE
Every release gate in AGENTS.md §7 is green on staging (using real services for every credential I have provided, with any remaining stand-ins clearly listed); production infrastructure is deployed via Bicep with both flags off; the production smoke test passes; runbooks are written; and docs/platform/LAUNCH_REPORT.md lists every gate with its evidence plus any remaining OWNER_ACTIONS. Then stop.
```

**If a session ends before the finish line,** paste: `Resume the master prompt in docs/platform/PROMPTS.md from where docs/platform/STATUS.md says you are.`

---

## Milestone prompts (the agent follows these; you don't need to paste them)

---

## Step 0 — Put the files in place (5 minutes)

In the marketing website repository:

```
/CLAUDE.md                          ← from this pack (merge if one already exists)
/AGENTS.md                          ← from this pack (merge if one already exists)
/docs/platform/CONTEXT.md           ← from this pack
/docs/platform/ARCHITECTURE.md      ← from this pack
/docs/platform/PROMPTS.md           ← this file
```

Commit them on a new branch, e.g. `platform/bootstrap`. Start your agent (e.g. Claude Code) from the repository root so it reads `CLAUDE.md` automatically.

Meanwhile, start the slow owner tasks today (they block launch, not building):
- [ ] Azure: deployment identity + resource groups for dev, stg, prod; request Azure OpenAI quota for the small, mid and verify models
- [ ] Razorpay: test keys now; start KYC for live keys
- [ ] SMS OTP provider: begin **DLT registration** for sender ID and OTP templates
- [ ] Google OAuth client for staging and production
- [ ] Write down how your existing parental-consent system is called (API, SDK or redirect)

---

## Prompt 1 — Kick off M0 (discovery and guardrails)

```
Read CLAUDE.md, AGENTS.md, docs/platform/CONTEXT.md and docs/platform/ARCHITECTURE.md fully.

You are the Lead orchestrator. Start milestone M0 only.

1. Spawn repo-cartographer: map this repo (framework, router, styling, package manager, build/deploy setup, existing auth/consent code, env usage), list every marketing route, write docs/platform/REPO_MAP.md with the allowed-paths list, capture the marketing baseline (Playwright screenshots at 360px and 1280px, Lighthouse, build output), fill in the Commands section of CLAUDE.md, and draft ADR-001 (how the platform integrates: route group in the existing app vs separate app on the same domain).
2. In parallel, spawn curriculum-architect: build platform/catalog/subjects.yaml for CBSE and CISCE (ICSE 7–10, ISC 11–12), Classes 7–12, every subject including Hindi and all electives, from official 2026–27 documents, with sources.md. Then start syllabus files for Wave 1 (Classes 10 and 12).
3. In parallel, spawn security-reviewer: draft the threat model in docs/platform/security/.
4. Create docs/platform/STATUS.md with all milestones and tasks from AGENTS.md.

Do not change any marketing file in M0. When M0 is done, report: what the repo is, ADR-001 recommendation, anything that contradicts ARCHITECTURE.md, the subject count per board and class, and the list of things you need from me.
```

**Your job after Prompt 1:** read REPO_MAP.md and ADR-001; answer the questions it raises.

---

## Prompt 2 — Approve M0, start M1 (foundations)

```
ADR-001 approved [or: approved with these changes: ...].
Here is what I can give you now: [Azure access / Razorpay test keys / Google OAuth / consent integration details / none yet].

Start M1. Spawn in parallel, each in its own worktree and branch, using the task-brief template in AGENTS.md §4.1:
infra-azure, db-schema, backend-api (auth, me, catalog modules), web-platform (route group, platform layout, login and guest mode), design-system, pipeline-engineer (content schemas and pipeline stages 1–4), exemplar-author (start with Class 10 Maths, Class 10 Science and Class 10 Hindi).
Curriculum-architect continues: finish Wave 1 syllabus files and blueprints, then Waves 2 and 3.

Use mocks behind interfaces for any credential I haven't provided and list them in STATUS.md.
M1 exit: login works end-to-end on staging with Google, phone OTP and email OTP; guest merge works; marketing regression is green; CI/CD deploys to staging. Prove each with the commands you ran and their output.
```

---

## Prompt 3 — M2 (learning core + content pipeline end-to-end)

```
Start M2. Build the chapter hub, slide player (read and listen modes), notes, flashcards and practice on the web; content and practice endpoints on the API; pipeline stages 5–9 (verify, originality, assemble, TTS, publish).

Before generating any content at scale: run the pipeline end-to-end for ONE subject (CBSE Class 10 Science), show me the dry-run INR estimate, then publish it to staging. Give me the staging link and 5 sample chapters to look at.

After I approve that subject, start subject-producers on Wave 1 (Classes 10 and 12, all subjects, both boards), 6–10 in parallel, within CONTENT_BUDGET_INR = ₹[amount] per run. Content-verifier samples every unit. Hindi-specialist owns Hindi units.
```

**Your job:** look at the 5 sample chapters on your phone. Reply with what to change in tone, slide density or visuals before the bulk run.

---

## Prompt 4 — M3 (tests and test series)

```
Start M3. Build the test engine (blueprints, assembly, attempts with autosave and server timer, auto-grading, self-evaluation, results analytics), the test player, results page, custom test builder and live All-India mocks with ranks.
Assessment-designer builds Wave 1 test series per CONTEXT.md §10 (≥6 full mocks per subject, chapter and unit tests, 2 live mocks, CBSE Class 10 second-exam track).
Exit: test series playable end-to-end on staging for every Wave 1 subject; attempt survives refresh and 2 minutes offline; 1,000-user load test green. Then raise load to 5,000 concurrent.
```

---

## Prompt 5 — M4 (AI features, credits and Razorpay)

```
Start M4. Spawn ai-gateway and billing-razorpay in parallel, plus web-platform for /ask, /plans and the credits UI.
Implement credits exactly as CONTEXT.md §6 and plans as §7 (all values in config). Razorpay test mode only.
Exit: free user sees 25 credits/day; cost is shown before each AI action; reserve/charge/refund verified including failures and concurrency; paywall on exhaustion; monthly, yearly and Board Exam Pass purchases grant entitlement within 60 seconds via webhooks; duplicate webhooks are ignored; the AI spend circuit-breaker trips and recovers. Show the test output.
```

---

## Prompt 6 — M5 (remaining content waves)

```
Wave 1 status: [paste coverage numbers or ask the agent].
Continue M5: finish Wave 1 gaps, then Wave 2 (Classes 9 and 11) and Wave 3 (Classes 7 and 8), all subjects, both boards. Keep 6–10 subject-producers running in parallel within budget. Report the coverage table (board × class × subject × asset) every time a wave completes, plus content-verifier defect rates.
```

---

## Prompt 7 — M6 (hardening and launch)

```
Start M6. Run every release gate in AGENTS.md §7 on staging. Spawn qa-e2e and security-reviewer; route their findings to the owning agents and fix until all gates are green.
Prepare production: prod infra via Bicep, live Razorpay keys (I will add them to Key Vault), prod Azure OpenAI quota, alerts, runbooks, backup restore drill.
Then give me a launch checklist with each gate, its evidence (command + result), and the exact steps to deploy to production and roll back.
```

After you approve: `Deploy to production, run the production smoke test, and report results. Do not enable PLATFORM_ENABLED on the marketing nav until I say so.`

Final switch: `Enable PLATFORM_ENABLED and BILLING_ENABLED in production.`

---

## Prompts you'll use any time

**Status check**
```
Read docs/platform/STATUS.md and the latest handoffs. Tell me: done since last check, verified how, in progress, blocked on me, and the next 3 actions.
```

**Resume after a break**
```
Resume as Lead. Re-read CLAUDE.md, AGENTS.md and docs/platform/STATUS.md, check each in-progress branch, and continue the current milestone.
```

**Prove it**
```
Don't summarise — run the acceptance commands for [feature] now and paste the actual output. If anything fails, fix it and run again.
```

**A student reported a content mistake**
```
Content report: [link or chapter + question]. Fix it through the admin content editor flow, republish, and check whether the same template produced similar errors elsewhere in that subject.
```

**Change a price or credit cost**
```
Change [plan/action] to [value] in platform/shared/config, run billing sync-plans in test mode, and confirm the UI and webhooks still pass their tests.
```

**Marketing site safety check**
```
Run the marketing regression against the M0 baseline and show me any diffs, failing routes or Lighthouse drops.
```

---

## Tips
- Let one milestone finish before starting the next; parallelism happens **inside** each milestone.
- Always ask for evidence (commands + output), not summaries.
- Set the content budget before the first bulk run; generating every chapter for Classes 7–12 on both boards is thousands of units.
- Look at sample content on a real low-end phone before approving bulk generation.
