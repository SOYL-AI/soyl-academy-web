# Architecture decision records

Format and rules: AGENTS.md §4.4 (context, options, decision, consequences). An ADR is required for any change to shared or marketing files, new infrastructure, a new dependency with a runtime footprint, or a deviation from [ARCHITECTURE.md](../ARCHITECTURE.md). Smaller decisions are in [DECISIONS.md](../DECISIONS.md) (D-001 to D-037). Last updated 2026-10-28.

| # | Title | Status | Date | Area |
|---|---|---|---|---|
| [001](001-repository-integration.md) | Repository integration: route group + separate platform workspace | Accepted (D-017) | 2026-10-25 | Repo, marketing protection |
| [002](002-auth-better-auth.md) | Authentication: Better Auth as the identity core, explicit Fastify auth routes | Accepted | 2026-10-26 | Auth |
| [003](003-queue-pg-boss.md) | Background jobs on pg-boss (same PostgreSQL, own schema) | Accepted | 2026-10-26 | Worker |
| [004](004-orm-drizzle.md) | ORM, migrations and the local database (Drizzle, hand-written downs, embedded PostgreSQL) | Accepted | 2026-10-26 | Database |
| [005](005-same-domain-proxy.md) | Same-domain API proxy and edge-to-origin authentication | Accepted | 2026-10-26 | API, web |
| [006](006-content-storage.md) | Content storage, releases and versioning | Accepted | 2026-10-27 | Content |
| [007](007-diagram-rendering.md) | Diagram rendering: specs as code, validated at stage 4, rendered by our components | Accepted | 2026-10-26 | Content, UI |
| 008 | Azure OpenAI deployment type and region | **Not written** (descoped with deployment, D-025; needed before OA-02). Interim decision encoded in Bicep: regional Standard in Central India for interactive AI, Global Batch for content generation with no personal data | — | AI, infra |
| [009](009-platform-web-dependencies-and-test-tooling.md) | Platform web dependencies and test tooling | Accepted | 2026-10-26 | Web |
| [010](010-content-api-caching-and-answer-separation.md) | Content and practice API: caching, active-release reads, answer separation | Accepted | 2026-10-27 | API |
| [011 (web)](011-platform-web-security-headers-and-proxy.md) | Platform web security headers, CSP and the API proxy route | Proposed in the file; implemented and merged with web-platform M1 (d96acbc) | 2026-10-27 | Web, security |
| [011 (staff TOTP)](011-staff-totp.md) | Staff second factor: TOTP (AUTH-11) | Accepted | 2026-10-27 | Auth |
| [012 (web)](012-platform-web-api-client-and-tests.md) | Typed API client generation and platform web test tooling | Proposed in the file; implemented and merged with web-platform M1 (d96acbc) | 2026-10-27 | Web |
| [012 (test engine)](012-test-engine.md) | Test engine: attempts, autosave protocol, offline grace, grading, ranks | Accepted | 2026-10-27 | Tests |
| [013](013-ai-gateway.md) | AI gateway: credits ledger, streaming, settlement, spend breaker, jobs, uploads | Accepted | 2026-10-27 | AI |
| [014](014-tutor-retrieval.md) | Tutor retrieval: pgvector with a full-text-search fallback | Accepted | 2026-10-27 | AI |
| [015](015-ai-moderation-fail-closed.md) | AI moderation: Content Safety in and out, local stand-in, fail closed | Accepted | 2026-10-27 | AI, safety |
| [016](016-billing-razorpay.md) | Billing with Razorpay: purchases, webhooks, entitlements, reconciliation, consent | Accepted | 2026-10-27 | Billing |
| [017](017-platform-web-learning-core.md) | Platform web learning core: lesson URLs, listen mode, where content renders, QR dependency | Accepted | 2026-10-27 | Web |
| [018](018-platform-web-tests-ai-plans.md) | Platform web tests, AI and plans: offline answer queue, proxy headers, page CSPs, uploads, e2e stand-ins (amended 2026-10-28, S6-L03: nonce CSP on /plans and /tests) | Accepted | 2026-10-27 | Web |
| [019](019-frozen-test-series-in-release.md) | Frozen test series, published by the release step (with the competency-balance addendum) | Accepted | 2026-10-27 | Content, tests |
| [020](020-images-only-uploads-at-launch.md) | Images only for AI uploads at launch: PDF uploads off until the worker parses and rasterises them (S6-M01) | Accepted | 2026-10-28 | AI, security |
| [021](021-soyl-coins.md) | SOYL Coins: earn-only append-only ledger with a balance guard, check-in and daily challenge, store and merch redemption behind switches (off at launch, D-038) | Accepted | 2026-10-28 | gamification, data, privacy |
| [022](022-interim-builtin-consent-provider.md) | Interim built-in consent provider: age band, parent approval code by email, withdraw link, AI data deletion (D-039) | Accepted | 2026-10-28 | Consent, privacy |

## Housekeeping notes

- **Duplicate numbers.** 011 and 012 were each used twice because agents numbered in parallel branches. Both pairs are kept as they are, since other documents link to the file names. Cite them with their topic, for example "ADR-011 (staff TOTP)". The next free number is **023** (022 is reserved by consent-interim).
- **Status lines not updated.** The two web ADRs from M1 (011 web, 012 web) still say "Proposed" although they were merged and are in force. The Lead should mark them Accepted.
- **Other ADRs never written:** ACR placement, Redis tier and Front Door. These decisions are encoded in Bicep and described in the [infra-azure M1 handoff](../handoffs/2026-10-26-infra-azure-m1.md).
