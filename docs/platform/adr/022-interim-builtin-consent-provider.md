# ADR-022: Interim built-in consent provider (parent approval code by email)

Status: accepted (backend-api + web-platform, 2026-10-28)
Related: D-039 (children's data without the owner's consent system), D-014 (children's-data defaults), D-031 (`CONSENT_PROVIDER=unavailable`), D-037/D-038 (SOYL Coins), OA-08 (owner's consent system), OA-14 (legal view), CONTEXT §12, ARCHITECTURE §5 (`ConsentProvider`), `platform/db/PII.md`.

Numbering: ADR-020 is used twice on parallel branches (images-only uploads, SOYL Coins) and 021 is the likely renumber, so this takes 022.

## Context

Production runs `CONSENT_PROVIDER=unavailable`: every account is `pending`, so AI help, photo uploads, leaderboards/leagues and consent-gated coin rewards are off for everyone. The owner wants to launch without integrating their external consent system (OA-08). D-039 resolves this with data minimisation plus an interim built-in provider behind the existing `ConsentProvider` interface (`getStatus`, `startFlow`), so the owner's system can replace it later without touching the gate.

What the provider must do: the account holder declares an age band (18 or older / under 18). 18+ consents for themselves (with an audit record). Under 18, a parent or guardian approves. Approval must be revocable by the parent. Lessons, practice and tests never depend on it (D-014).

## Options for the parent's approval

1. **Signed approval link.** The parent clicks a link in the email and the account is approved.
   - Email security scanners (Microsoft Defender Safe Links, Gmail, school gateways) open links in emails automatically. A link that approves on GET would be approved by a robot, without the parent. A confirm page with a button fixes that, but then the parent lands on an unauthenticated page that can switch a child's features **on**: a state-changing, unauthenticated endpoint whose only protection is the secrecy of a long-lived link that may be forwarded, logged by proxies or left in browser history.
   - Needs a link lifetime, single-use tracking and a public "approve" page; more moving parts.
2. **One-time approval code.** The email carries a 6-digit code; the parent gives it to the child, who enters it in their signed-in session.
   - The grant happens only inside the student's authenticated session (CSRF-checked, rate-limited, per-route policy). No unauthenticated endpoint can grant anything.
   - Link scanners cannot approve: there is nothing to click.
   - Reuses the OTP pattern already reviewed for sign-in (AUTH-2/3/4): keyed hash at rest, increment-then-compare attempt cap, expiry, single use, constant-time compare.
   - The parent's act of handing the code over is the affirmative step.
   - Weakness shared with option 1: a child can type an address they control. Neither option proves the recipient is the parent; see "Residual risks".

## Decision

Option 2, the code. The **withdraw** link is the only unauthenticated action, and it can only switch features **off**.

### Flow and state machine (`consent_records`, migration 0011)

```
(none) ──declare 18+ (agree: true)───▶ granted   (method self_declared, audit row)
(none) ──declare under 18────────────▶ required  (age band minor)
minor: required|revoked ──parent email──▶ pending  (6-digit code emailed; 48 h; 5 tries)
minor: pending ──parent email again──▶ pending   (new code; old code dead; a new address bumps the link generation)
minor: pending ──right code──────────▶ granted   (method parent_email_code)
granted|pending ──student withdraws──▶ revoked   (revoked_by account_holder)
minor: granted|pending ──parent link + button─▶ revoked (revoked_by parent; "decline" while pending)
adult: granted ──declare under 18────▶ required  (grant withdrawn)
minor ──declare 18+──────────────────▶ 409 age_band_locked
```

- Each transition rewrites the gate's `consent_status` cache immediately (no 15-minute wait), so the gate, leagues, live ranks and coin awards (which read `consent_status`) all see it at once. The provider is authoritative: a stale cache is re-read from `consent_records`, never trusted.
- Leaving `granted` deletes the AI data PII.md lists for deletion: `ai_conversations` (cascading `ai_messages`) and `uploads` with both blobs. Learning records stay.
- Every transition writes an `audit_log` row with ids and states only (status, age band, method, policy version, who revoked). No email, no hash.
- Idempotent: repeating a declaration, verifying after approval, withdrawing twice, or a parent clicking twice return the current state without new rows or emails.

### Storage (data minimisation)

- Age band only, never a date of birth.
- The parent's address is used once to send the email and never stored: `parent_email_hash` = HMAC(key, normalised address) for rate limits and for noticing a change of parent, plus a masked hint (`p•••@gmail.com`) shown to the student.
- The code is stored as HMAC(key, record id + code); 48-hour expiry, 5 tries per code, 10 wrong entries per account per day.
- `policy_version` (`BUILTIN_CONSENT.policyVersion`, now `2026-10-28`) is recorded with every consent.
- Keys are derived from `OTP_PEPPER` with separate labels (`soyl/consent/builtin/v1`, then `code`, `parent-email`, `withdraw`), so no new secret is needed.

### The withdraw link

`{PUBLIC_BASE_URL}/me/consent/parent#t=<record id>.<generation>.<HMAC>`. The token is in the URL **fragment**, so it never reaches a server, proxy log or Referer; the page reads it, removes it from the address bar and does nothing until the parent presses "Withdraw approval" (`POST /v1/consent/parent/withdraw`, no session, CSRF Origin check, 20/hour per IP, fail-closed). It has no expiry (parents may withdraw any time) and stops working when the student moves the request to another address (generation bump). The response says nothing about the student.

### Rate limits

| What | Limit |
|---|---|
| Code sends per student account | 1/min, 3/h, 5/day |
| Code sends per parent address (across students) | 3/h, 5/day |
| Code sends per IP | 10/h, 30/day |
| Wrong codes per account | 5 per code; 10/day across codes (then `otp_locked`) |
| Writes per account (`consent.write.user`) | 30/h |
| Parent withdraw per IP (`consent.parent.ip`) | 20/h |

All in `platform/shared/config/security.ts` (`BUILTIN_CONSENT`, `RATE_LIMITS`), owner-tunable.

### The email

Sent through the existing ACS sender (`EMAIL_FROM`, `noreply@soylai.com`), engagement tracking off. Plain words: the code, the masked student account, what approving switches on (AI tutor, photo doubts, leaderboards and rewards), that lessons/practice/tests are free regardless, what data that uses and for how long, privacy and terms links, the withdraw/decline link. No images, no tracking.

### Interface

`ConsentProvider` is unchanged. `BuiltinConsentProvider` implements it (reads `consent_records`); the interactive operations live in `BuiltinConsentFlow`, which exists only when `CONSENT_PROVIDER=builtin`. With any other provider the new routes answer 409 `consent_flow_unavailable`, and `GET /v1/me/consent` reports `flow: none | external` so the web shows the right UI. Replacing this with the owner's system (OA-08) means adding a fourth provider value; existing `consent_records` can be migrated or retired then.

### Worker

The AUTH-15 purge of never-consented accounts stays off under `UNCONSENTED_PURGE=auto` with `builtin` (as with `unavailable`): consent is only asked when a gated feature is first used, so "never consented" is a normal state for a student who only learns.

## Consequences

- Production can turn AI, uploads, leaderboards and coin rewards on with `CONSENT_PROVIDER=builtin` (API and worker), no new secret and no infra change beyond that app setting.
- New table `consent_records` and column `profiles.public_name_seed` (migration 0011, hand-written down).
- New endpoints: `GET /v1/me/consent`, `POST /v1/me/consent/{age-band,parent,verify,withdraw}`, `POST /v1/consent/parent/withdraw`, `POST /v1/me/public-name`. New pages: `/me/consent`, `/me/consent/parent`.

## Residual risks (for OA-14)

1. **Verifiability.** Neither a code nor a link proves the address belongs to a parent. A child can enter a second address they control. Mitigations: the address must differ from the account's own; per-address limits; the email is written for a parent; the withdraw link works forever. DPDP s.9 asks for *verifiable* consent; whether an email-code check is enough is a legal question.
2. **Self-declared age.** An under-18 can declare 18+. Mitigation: the band is locked once declared under 18; the 18+ path requires an explicit statement. No identity or age verification is done.
3. **Retention of consent evidence.** Consent records are deleted with the account (PII.md); the `audit_log` rows (ids and states only) remain for 2 years. Whether more evidence must be kept, and for how long, is for counsel.
4. **Email deliverability.** Parents' providers may filter the mail; the student sees "send again" (rate-limited).
5. **Policy version.** A notice change is recorded but does not yet force re-consent; bumping `policyVersion` only affects new consents.
