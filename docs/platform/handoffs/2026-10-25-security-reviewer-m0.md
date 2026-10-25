# security-reviewer — M0 threat model and M1 security requirements — 2026-10-25
Status: partial (findings register delivered to the Lead in the hand-back message, not committed — see Known gaps)

What changed:
- `docs/platform/security/threat-model.md` — assets, actors, trust boundaries + data-flow diagram (mermaid), STRIDE per component, 28 abuse cases (AC-01..AC-28) with mitigations and owners, DPDP/residency/retention, open questions for the owner.
- `docs/platform/security/requirements-for-m1.md` — numbered, testable MUSTs for M1 briefs: GEN-1..6, INFRA-1..19, DB-1..8, API-1..16, API-RL-1..2, AUTH-1..15, WEB-1..12.
- `docs/platform/security/asvs-l2-checklist.md` — OWASP ASVS 5.0.0 L1+L2 items mapped to design, verification method, owner; N/A items grouped; two documented deviations (V3.5.4 shared origin, V6.3.3 single-factor student login).
- No code touched.

How to verify:
- `git diff --stat platform/main...platform/security-reviewer/m0` → only files under `docs/platform/security/` and `docs/platform/handoffs/`.
- Dependency evidence for F-001..F-003: `npm audit --package-lock-only` (repo root) and `cd platform && npm audit --package-lock-only` → root: 1 critical (`next`), 4 high; platform: 2 critical (`vitest`/`tinypool`, dev), 1 high (`zod`), 1 moderate.
- Mermaid diagram renders in GitHub's Markdown preview.

Tests added: none (docs only). Every requirement has a **Test** line for the owning agent; qa-e2e should own the IDOR matrix, header/CSP checks and the "no third-party requests on platform routes" check.

Known gaps / follow-ups:
- `docs/platform/security/findings.md` could not be written: the session's tool guard blocks subagents from writing files named as findings/reports. The full register (F-001..F-030) is in the hand-back message to the Lead; the other docs already link to `findings.md`. **Lead: commit it at that path.**
- F-001 (critical): `next@16.3.4` on the live marketing site is in the range of unauthenticated RCE advisories — owner-approved hotfix to the fixed release (16.4.3 per audit) on `main`, outside platform work.
- ADRs needed before M1 web/API work: ADR-005 (rewrite + edge secret mechanism), CSP ADR (F-010), root-layout/analytics ADR (F-004/F-030), retention ADR (F-015), ADR-008 must document AI data location (F-014), zod version (F-002 vs D-006).
- `auth-pathways.md` to be written by backend-api in M1 (AUTH-1).
- Assumption A1 (Vercel overwrites client IP headers on external rewrites) must be verified in an M1 spike (API-3).
- Re-run the threat model at the end of M1 against the actual code.

Decisions made: none recorded as ADRs (security-reviewer proposes; Lead decides). Proposed decisions are in the findings and requirements.

Needs from owner:
- Approve and schedule the Next.js upgrade on the live site (F-001).
- Consent contract (OA-08) including pre-consent rules and unconsented-account lifetime (API-11, AUTH-15).
- Legal view on DPDP s.9(3) / Fourth Schedule for gamification and personalisation (F-016), retention periods (F-015), and "stored" vs "stored and processed" in India (F-014).
- Free-tier share of the AI budget (F-009) and whether ranked live mocks require a phone-verified account (AC-12).
- Fix or accept the marketing findings F-020..F-023 (Future Builders payment verification, `/api/enroll` validation, `/api/razorpay` fail-open, PII in contact logs).
