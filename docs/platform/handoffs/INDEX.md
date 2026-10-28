# Handoff index

Every handoff note in this folder, by area and date. Format of a handoff: AGENTS.md §4.2. Milestone reports summarise them: [M0](M0-report.md), [M1](M1-report.md), [M2](M2-report.md), [M3](M3-report.md), [M4](M4-report.md). Last updated 2026-10-28.

## Milestone reports

| Milestone | Report | Status |
|---|---|---|
| M0 Discovery & guardrails | [M0-report.md](M0-report.md) | done 2026-10-26 |
| M1 Foundations | [M1-report.md](M1-report.md) | done (stand-in) 2026-10-27 |
| M2 Learning core | [M2-report.md](M2-report.md) | done (stand-in, content hand-authored) 2026-10-27 |
| M3 Tests | [M3-report.md](M3-report.md) | built (stand-in) 2026-10-27; Azure load run open |
| M4 AI + billing | [M4-report.md](M4-report.md) | built (stand-in) 2026-10-27 |

## Discovery, platform and operations

| Date | Agent | Milestone | Handoff |
|---|---|---|---|
| 2026-10-25 | repo-cartographer | M0 | [Discovery, guardrails, marketing baseline](2026-10-25-repo-cartographer-m0.md) |
| 2026-10-26 | infra-azure | M1 | [CI + deploy-ready IaC](2026-10-26-infra-azure-m1.md) |
| 2026-10-27 | backend-api + infra-azure | M6 (prod) | [Production readiness for the first Azure deployment (D-031)](2026-10-27-prod-readiness.md) |
| 2026-10-28 | infra-azure + billing-razorpay | M6 (prod) | [Billing go-live: Razorpay wiring behind `billingOn`, billing job, owner runbook (D-038)](2026-10-28-billing-golive.md) |

## Database and API

| Date | Agent | Milestone | Handoff |
|---|---|---|---|
| 2026-10-26 | db-schema | M1 | [Schema, migrations, harness, seeds](2026-10-26-db-schema-m1.md) |
| 2026-10-26 | backend-api | M1 | [API foundation, auth, me, catalog, worker skeleton](2026-10-26-backend-api-m1.md) |
| 2026-10-27 | backend-api | M2 | [Learning core API: content, practice, progress, reports, gamification, staff TOTP](2026-10-27-backend-api-m2.md) |
| 2026-10-27 | backend-api | M3 | [Tests and test series, live mocks, load](2026-10-27-backend-api-m3.md) |
| 2026-10-27 | ai-gateway | M4 | [AI gateway: credits, streaming, moderation, retrieval, uploads, evaluation, spend](2026-10-27-ai-gateway-m4.md) |
| 2026-10-27 | billing-razorpay | M4 | [Razorpay billing: plans, purchases, webhooks, entitlements, reconciliation](2026-10-27-billing-razorpay-m4.md) |
| 2026-10-27 (merged 2026-10-28) | backend-api | M5 | [Follow-ups: weekly leagues, live event detail, formative-only flags, AI answer reports](2026-10-27-backend-api-m5-followups.md) |
| 2026-10-28 | ai-gateway + backend-api + db-schema | M6 | [D-044 credits (new values, feature-gated paper-from-upload, learning bonuses, guide and history) and student avatars (migration 0014)](2026-10-28-ai-gateway-credits-avatars.md) |

## Web and design system

| Date | Agent | Milestone | Handoff |
|---|---|---|---|
| 2026-10-26 | design-system | M1 | [UI kit, content renderers, slide layouts](2026-10-26-design-system-m1.md) |
| 2026-10-27 | web-platform | M1 | [Route group, proxy, login, guest mode, catalog pages, /me](2026-10-27-web-platform-m1.md) |
| 2026-10-27 | web-platform | M2 | [Hub, slide player, notes, flashcards, practice, report, /admin](2026-10-27-web-platform-m2.md) |
| 2026-10-27 | web-platform | M3 + M4 | [Test player, results, builder, live; /ask, credits, paywall, /plans](2026-10-27-web-platform-m3-m4.md) |

## Security

| Date | Agent | Milestone | Handoff |
|---|---|---|---|
| 2026-10-25 | security-reviewer | M0 | [Threat model and M1 security requirements](2026-10-25-security-reviewer-m0.md) |
| 2026-10-27 (merged 2026-10-28) | security-reviewer | M6 | [Security review of M2–M4 code, infra, CI (0 critical, 1 high, 11 medium, 13 low)](2026-10-27-security-reviewer-m6.md) — the current findings register |

## Catalog and curriculum

| Date | Agent | Milestone | Handoff |
|---|---|---|---|
| 2026-10-25 | curriculum-architect (CBSE) | M0 | [Subject catalog and syllabi](2026-10-25-curriculum-cbse-m0.md) |
| 2026-10-25 | curriculum-architect (CISCE) | M0 | [Subject catalog and syllabi](2026-10-25-curriculum-cisce-m0.md) |
| 2026-10-26 | curriculum-architect (CBSE) | M1 | [Blueprints and Wave 1 electives](2026-10-26-curriculum-cbse-blueprints-m1.md) |
| 2026-10-26 | curriculum-architect + hindi-specialist | M1 | [Language syllabi, Classes 9–12](2026-10-26-curriculum-cbse-languages-m1.md) |
| 2026-10-27 | curriculum-architect + content-verifier | M2 | [Catalog QA fixes](2026-10-27-catalog-qa-fixes.md) |

## Pipeline, exemplars and assessment

| Date | Agent | Milestone | Handoff |
|---|---|---|---|
| 2026-10-26 | pipeline-engineer | M1 | [Stages 1–4 and @soyl/ai-core](2026-10-26-pipeline-engineer-m1.md) |
| 2026-10-27 | pipeline-engineer | M2 | [Contract v2 and stages 5–9 with Postgres state](2026-10-27-pipeline-engineer-m2.md) |
| 2026-10-26 | exemplar-author (science) | M1 | [CBSE 10 Science ch01 + science templates](2026-10-26-exemplar-science-m1.md) |
| 2026-10-26 | exemplar-author (maths) | M1 | [CBSE 10 Maths ch06 + maths templates](2026-10-26-exemplar-maths-m1.md) |
| 2026-10-26 | exemplar-author / hindi-specialist | M1 | [CBSE 10 Hindi A ch02, ch10 + Hindi templates](2026-10-26-exemplar-hindi-m1.md) |
| 2026-10-27 | assessment-designer | M3 | [CBSE 10 test series (Science, Maths, SST)](2026-10-27-assessment-designer-cbse10-series.md) |
| 2026-10-27 | assessment-designer | M3 | [CBSE 10 Maths competency balance](2026-10-27-assessment-designer-cbse10-maths-balance.md) |
| 2026-10-27 | assessment-designer | M3 | [Science and SST competency balance, Maths lint band (D-035)](2026-10-27-assessment-designer-science-sst-balance.md) |

## Content production

All hand-authored (D-025/D-026). Coverage totals: [content.md §6](../content.md#6-coverage-2026-10-28-computed-from-the-repo).

| Date | Subject | Chapters | Handoff |
|---|---|---|---|
| 2026-10-26 | CBSE 10 Science | ch02–05 | [science-a](2026-10-26-subject-producer-cbse10-science-a.md) |
| 2026-10-27 | CBSE 10 Science | ch06–09 | [science-b](2026-10-27-subject-producer-cbse10-science-b.md) |
| 2026-10-27 | CBSE 10 Science | ch10–13 | [science-c](2026-10-27-subject-producer-cbse10-science-c.md) |
| 2026-10-27 | CBSE 10 Science | ch14–15 (formative only) | [science-d](2026-10-27-subject-producer-cbse10-science-d.md) |
| 2026-10-27 | CBSE 10 Mathematics | ch01–04 | [maths-a](2026-10-27-subject-producer-cbse10-maths-a.md) |
| 2026-10-27 | CBSE 10 Mathematics | ch05, ch07–09 | [maths-b](2026-10-27-subject-producer-cbse10-maths-b.md) |
| 2026-10-27 | CBSE 10 Mathematics | ch10–14 | [maths-c](2026-10-27-subject-producer-cbse10-maths-c.md) |
| 2026-10-27 | CBSE 10 Social Science | ch01, ch06, ch13, ch18 + templates | [sst-a](2026-10-27-subject-producer-cbse10-sst-a.md) |
| 2026-10-27 | CBSE 10 Social Science | ch02, ch03, ch05, ch07 | [sst-b](2026-10-27-subject-producer-cbse10-sst-b.md) |
| 2026-10-27 | CBSE 10 Social Science | ch08–12 (Geography) | [sst-c](2026-10-27-subject-producer-cbse10-sst-c.md) |
| 2026-10-27 | CBSE 10 Social Science | ch14–17 (Political Science) | [sst-d](2026-10-27-subject-producer-cbse10-sst-d.md) |
| 2026-10-27 | CBSE 10 Social Science | ch04, ch19–21 | **no handoff file**: merged as d06cb0a from `platform/subject-producer/cbse-10-sst-e`; see the merge commit and each chapter's README |
| 2026-10-27 | CBSE 10 Hindi A | ch01, ch18, ch09, ch03 | [hindi-a](2026-10-27-subject-producer-cbse10-hindi-a.md) |
| 2026-10-27 | CBSE 10 Hindi A | ch04, ch05, ch11, ch12 | [hindi-b](2026-10-27-subject-producer-cbse10-hindi-b.md) |
| 2026-10-27 | CBSE 10 Hindi A | ch06–08, ch13 | [hindi-c](2026-10-27-subject-producer-cbse10-hindi-c.md) |
| 2026-10-27 | CBSE 10 Hindi A | ch14–17 | [hindi-d](2026-10-27-subject-producer-cbse10-hindi-d.md) |
| 2026-10-27 | CBSE 10 English | ch02, ch03, ch04, ch13 + templates | [english-a](2026-10-27-subject-producer-cbse10-english-a.md) |
| 2026-10-27 | CBSE 10 English | ch05–08 | [english-b](2026-10-27-subject-producer-cbse10-english-b.md) |
| 2026-10-27 | CBSE 10 English | ch09–12 | [english-c](2026-10-27-subject-producer-cbse10-english-c.md) |
| 2026-10-27 | CBSE 10 English | ch14–17 | [english-d](2026-10-27-subject-producer-cbse10-english-d.md) |
| 2026-10-27 | CBSE 10 English | ch18–22 | [english-e](2026-10-27-subject-producer-cbse10-english-e.md) |
| 2026-10-27 | CBSE 10 English | ch23–26 | [english-f](2026-10-27-subject-producer-cbse10-english-f.md) |
| 2026-10-27 | CBSE 10 English | ch27–30 | [english-g](2026-10-27-subject-producer-cbse10-english-g.md) |
| 2026-10-27 | CBSE 10 English | ch01, ch31 | [english-h](2026-10-27-subject-producer-cbse10-english-h.md) |

The exemplar chapters (Science ch01, Maths ch06, Hindi A ch02 and ch10) are covered by the exemplar handoffs above.
