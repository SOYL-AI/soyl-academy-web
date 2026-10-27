# security-reviewer — M6 security review (M2–M4 code, infra, CI) — 2026-10-27
Status: done (review); fixes are owned by the agents named per finding

Scope: everything merged to `platform/main` since the M0 review, at `75c6093`: API M2/M3 (content,
practice, attempts, autosave, results, live mocks, builder), the AI gateway (`platform/api/src/ai/**`),
billing (`platform/api/src/billing/**`), the web platform (`app/(platform)/**`, `components/platform/**`,
`proxy.ts`, the `/api/platform` proxy, per-page CSP, IndexedDB answer queue, client image re-encode),
infra as deployed (`platform/infra/**`, Dockerfiles, `migrate-entrypoint.mjs`) and CI (gitleaks, Trivy,
CodeQL, npm audit). Read-only with respect to code: no product file was changed.

## 1. Executive summary

| Severity | New (S6-*) | Prior register still open | Total open |
|---|---|---|---|
| Critical | 0 | 0 | **0** |
| High | 1 | 0 | **1** |
| Medium | 4 | 7 | **11** |
| Low | 12 | 1 | **13** |
| Info / accepted | 3 | 4 accepted | 7 |

Prior register (M0, F-001..F-030): **14 fixed** (F-013 with file-handling follow-ups), **4 accepted**
(documented exceptions or design: F-010, F-024, F-026, F-030), **9 open** (marketing-site items F-002,
F-011, F-020..F-023, where F-002 is tracked inside S6-M04; owner/legal items F-014..F-016),
**3 not traceable** (F-018, F-025, F-029: the register was never committed, OA-13, and the IDs appear
nowhere in the repo, so they cannot be re-verified; the Lead should re-issue them from the M0 hand-back).

The platform's core controls are in good shape and are backed by tests that pass: edge secret and
trusted client IP, exact-Origin CSRF, default-deny route policies, owner-scoped queries on every
attempt/result/job/upload/conversation/subscription read (404 for other users' ids), DB-6 answer
separation, the credit ledger (wallet row lock, one resolution per reservation, sweeper), fail-closed
moderation and AI limits, Razorpay HMAC over the raw body + re-fetch + binding + exactly-once, keyless
Azure (Entra-only Postgres/Redis/AI, user-delegation SAS, Key Vault closed), non-root distroless images.

**One High:** a live-mock participant who submits early gets the full answer key, solutions and marking
scheme of the live paper while the event is still running (proved by PoC-1). Live All-India mocks must
not open until S6-H01 is fixed.

**Launch recommendation:** **No-go for public launch with live mocks or AI uploads until the
"Must-fix before launch" list (section 5) is closed.** The current production deployment is dark
(`PLATFORM_ENABLED=false`, D-031), so nothing here is exploitable in production today. Learning,
practice and ordinary tests could launch once S6-H01 is fixed or live mocks are disabled
(no events scheduled), and S6-M01..M04 have owners and dates.

## 2. How this was verified

```
# platform workspace (Node 24, npm 11, embedded PostgreSQL)
cd platform && npm ci
cd api && npx vitest run test/route-policy.test.ts test/http-pipeline.test.ts test/billing-orders.test.ts \
  test/billing-gates.test.ts test/ai-credits.test.ts test/ai-gateway.test.ts test/ai-uploads.test.ts \
  test/ai-unit.test.ts test/tests-engine.test.ts test/live.test.ts test/content.test.ts test/practice.test.ts
#   -> Test Files 12 passed (12), Tests 196 passed (196)

# proof-of-concept file (scratch only; copied into platform/api/test for one run, then deleted, never committed)
npx vitest run test/zz-secpoc.test.ts      # -> 7 passed: every assertion below demonstrates the issue
#   POC-1 live keys leak during the event (S6-H01)
#   POC-2 PDF active-content and page-count checks bypassed (S6-M01), 4 cases + 1 control
#   POC-3 autosave limit exhausted by another user (S6-L01)

npm audit --package-lock-only              # root:     3 high (zod direct, source-map-js prod-transitive, brace-expansion dev)
cd platform && npm audit --package-lock-only   # platform: 0 high/critical, 4 moderate (drizzle-kit -> esbuild, dev only)
```
Web unit tests for the proxy and CSP: see section 7.

## 3. New findings

### S6-H01 — High — Live-mock answer keys are revealed to early submitters while the event is running
- **Location:** `platform/api/src/domain/tests/results.ts:57-59` (only checks `isFinal(a.status)`),
  `:168-169` (`key` and `parts[].key` with answer, solution, marking scheme); window logic in
  `platform/api/src/domain/tests/live.ts:48-58` (`live` = late-start window, `writing` until
  `closesAt`); web `components/platform/tests/ResultView.tsx` renders the keys.
- **Impact:** AC-11 (High in the threat model): a student starts the live paper at `starts_at`, submits
  a blank paper a minute later and immediately reads every answer via `GET /v1/attempts/:id/result`
  (and, with credits, `POST /v1/attempts/:id/ai-evaluation` feedback for written items). Everyone shares the same items (only the
  order is shuffled), and students may still start for 15 minutes and keep writing for the full
  duration, so the keys can be passed to friends or to the same person's second account (email-only
  auth in production, D-031; ranked mocks do not require a verified phone, AC-12). The All-India ranks
  and percentiles become meaningless, and `live_reserved` items are burned at the first sitting.
- **Evidence:** PoC-1 (`zz-secpoc.test.ts`, scratch): live event with 6 `live_reserved` MCQs; account A
  starts at +1 min and submits blank; at +2 min `livePhase()` is still `live` and A's result carries
  a non-empty `key.answer.option_ids` for all 6 questions; account B starts at +14 min, answers from
  A's keys and scores 6/6. The existing `test/live.test.ts:208` also fetches a live result during the
  event (it only asserts the provisional rank).
- **Fix:** for an attempt with `live_event_id`, withhold `key`, `parts[].key`, `correct`/`status`
  per item, `byDifficulty` and topic mastery from the result (return score + provisional rank only)
  until `livePhase()` is `closed` or `results_published`; refuse AI evaluation of live attempts until
  then (`409 results_after_event`); web shows "Solutions open when the live test closes at HH:MM".
  Add a regression test: result before close has no key fields (`forbiddenKeys(...) === []`), after
  close it has them. Separately (owner, AC-12): require a verified phone or other one-person signal for
  ranked live mocks, or keep ranks labelled beta.
- **Owner:** backend-api (API + test), web-platform (ResultView copy). **Must fix before any live mock
  is scheduled.**
- **Status vs previous register:** new (regression against AC-11; F-006's answer-separation fix covers
  content/practice/delivery but not post-submit results of live attempts).

### S6-M01 — Medium — PDF upload checks are regex-based and bypassable; PDFs reach the model byte-for-byte
- **Location:** `platform/api/src/ai/media.ts:186-204` (`pdfPageCount`, `UNSAFE_PDF`, `checkPdf`),
  `:224-226` (PDF returned unchanged); used by `jobs.ts:381-427` and sent as a file to the model in
  `jobs.ts:328-333`.
- **Impact:** (a) PDF name hex escapes (`/J#61vaScript`), active content inside compressed object
  streams, and actions that are not in the list at all (`/OpenAction`, `/AA`, `/URI`) all pass, so
  ASVS 5.2.x "unsafe content rejected" is not met; (b) page objects and `/Count` inside a compressed
  object stream are invisible, so a long paper is counted as 1 page: the 10-page cap (and therefore the
  priced cost of `paper-from-upload`, already ₹6.10 against ₹6.00 of credits, D-034) can be exceeded
  within the 10 MB limit, amplifying model spend on the global cap. Files are never served back to
  users (no read SAS is issued), which keeps this at Medium.
- **Evidence:** PoC-2, 5 cases: control (`/JavaScript` plain) refused; hex-escaped name accepted;
  `/OpenAction /URI` + `/AA` accepted; JS inside a FlateDecode `/ObjStm` accepted; a 200-page tree in an
  object stream reported as `pages: 1`.
- **Fix:** parse PDFs with a real parser in the worker (pdf.js/pdf-lib or MuPDF in a sandboxed job with
  CPU/memory/time limits): decode object streams, count pages from the resolved page tree, reject on
  parse failure, reject any action dictionary (`/OpenAction`, `/AA`, `/URI`, `/Launch`, `/JavaScript`,
  `/SubmitForm`, …) after name normalisation; better, rasterise to ≤ 10 page images and send images
  only (ADR-013 already lists this as the follow-up). Meter `paper-from-upload` by real pages/tokens.
- **Owner:** ai-gateway. **Status vs previous register:** new; partially re-opens F-013's file-handling
  scope (direct-to-Blob SAS upload itself is fixed).

### S6-M02 — Medium — Account deletion leaves the child's uploaded photos and papers in Blob storage
- **Location:** `platform/api/src/domain/account-deletion.ts:8-9` (gap noted in M1), `:53` (deletes the
  `uploads` rows only); `platform/db/PII.md:15` states the blobs are deleted; `ai/uploads.ts:361-376`
  (`expireDue`) finds blobs only through `uploads` rows, which no longer exist.
- **Impact:** after `DELETE /v1/me` the cleaned photo/paper (`uploads/<userId>/…`) and any quarantine
  copy stay until the storage lifecycle rule deletes them (≤ 30 days after upload). This is children's
  data (D-014, DPDP erasure, AC-25) and contradicts the documented behaviour.
- **Fix:** before deleting the rows, delete `processed_key` (container `uploads`) and `blob_key`
  (`uploads-quarantine`) for each upload, or enqueue a job with the keys; make the purge job delete the
  `uploads/<userId>/` prefix as a backstop; add a test with the memory blob store.
- **Owner:** ai-gateway (blob calls) with backend-api (deletion flow). **Status:** new (gap carried from
  M1, now actionable because the Blob client exists).

### S6-M03 — Medium — Client-IP trust (API-3) is still unverified on a real Vercel deployment
- **Location:** `components/platform/server/api-proxy.ts:171-177` (`x-real-ip`), ADR-005 line 70,
  requirements API-3; open in backend-api M1, web-platform M1 handoffs and M1-report.
- **Impact:** every per-IP limit (OTP send/verify `auth.ip`, `account.create.ip`, practice, reports,
  global `api.ip`) depends on Vercel overwriting `x-real-ip`. If it is client-influenced, the AC-01/AC-02
  controls (OTP brute force, account farming) degrade to per-account limits only. Related hardening:
  `readProxyConfig` accepts `http://` origins (`api-proxy.ts:146`), so a mis-set `PLATFORM_API_ORIGIN`
  would send the edge secret and session cookies in clear text.
- **Fix:** run the API-3 spike on the first Vercel preview/staging that reaches the API (spoofed
  `X-Real-IP`/`X-Forwarded-For` must not change the logged IP); switch to `x-vercel-forwarded-for` if
  needed. Refuse non-https `PLATFORM_API_ORIGIN` unless the host is loopback.
- **Owner:** web-platform (+ qa-e2e for the spike). **Status vs previous register:** F-005 is fixed in
  code; this verification item was part of it and is still open.

### S6-M04 — Medium — Root (marketing) lockfile still has high advisories; root audit is report-only
- **Location:** root `package.json:32` (`zod ^3.25.76`, GHSA-mrhx-c7xc-m3w5, direct, runtime);
  `source-map-js 1.2.1` (prod, transitive, GHSA-68fv-2mgg-jv7q); `brace-expansion` (dev);
  `.github/workflows/platform-ci.yml:251-258` (root audit `continue-on-error: true`; its warning still
  cites F-001, which is fixed).
- **Impact:** the marketing app shares the origin with the platform (AC-28); zod is used on the
  marketing forms (memory exhaustion on oversized constrained collections). The platform web code also
  resolves `zod/v4` from the root install (zod 3.25.76's v4 subpath), though only for trusted API data.
- **Fix:** OA-12(a) (zod ≥ 4.6.6 in the marketing app), `npm audit fix` for source-map-js and
  brace-expansion, then make the root audit blocking and update the warning text.
- **Owner:** Lead / owner (marketing dependency change, OA-12). **Status:** F-002 still open; F-001 fixed.

### S6-L01 — Low — Autosave/submit rate limit is keyed by attempt id before ownership is checked
- **Location:** `platform/api/src/modules/tests.ts:171` and `:187` call `attemptLimit(..., request.params.id)`
  before `saveResponses`/`submitAttempt` check `user_id` (`domain/tests/attempts.ts:43-45`).
- **Impact:** anyone who learns an attempt id (ids are not secrets, F-026; they appear in URLs such as
  `/tests/attempt/<id>`, so in screenshots and shared links) can send 8 requests per 15 s and keep the
  owner's autosave at 429 during a test. PoC-3: victim's next autosave returns 429.
- **Fix:** run the ownership query first, or key the bucket by `userId:attemptId`.
- **Owner:** backend-api. **Status:** new.

### S6-L02 — Low — In-process upload processing cannot write the clean container (role mismatch)
- **Location:** `platform/infra/modules/storage.bicep:209-217` (API: Blob Data **Reader** on `uploads`)
  vs `platform/api/src/ai/jobs.ts:420` (`blob.put(AI_UPLOADS.containers.clean, …)`, run in the API by
  `UploadService.complete` → `startUploadProcessing` → `kick`).
- **Impact:** on Azure every upload's first processing attempt fails with 403, is re-queued for 60 s and
  is finished by the worker's `ai.jobs` sweep (every minute). Photo doubts then take 60–120 s while the
  client gives up after 90 s (`components/platform/ai/upload.ts`, `timeoutMs` 90 000): availability of a
  paid feature, plus noisy error logs. Not a confidentiality issue (least privilege is preserved).
- **Fix:** either grant the API Contributor on `uploads` (and document it) or never process uploads in
  the API (enqueue only, worker processes). Add an infra/app contract test listing the containers each
  identity writes.
- **Owner:** ai-gateway with infra-azure. **Status:** new.

### S6-L03 — Low — Static CSP with `'unsafe-inline'` also covers the payment page and test pages
- **Location:** `components/platform/server/security-headers.ts:20` (nonce list) and `:107-109`
  (static policy, plus `https://checkout.razorpay.com` on `/plans`).
- **Impact:** F-010's exception was meant for ISR `/learn/**`. `/plans` (Razorpay Checkout, purchases)
  and `/tests`, `/tests/series/**` also get `script-src 'self' 'unsafe-inline'`, so any HTML-injection
  bug on those pages becomes script execution next to the payment flow.
- **Fix:** add `/plans` and `/tests` (exact) / `/tests/series` to `NONCE_ROUTE_PREFIXES`
  (`'strict-dynamic'` lets the nonced loader pull Checkout); keep the static policy for `/learn/**` only.
- **Owner:** web-platform. **Status:** extends F-010 (accepted for `/learn/**`).

### S6-L04 — Low — Output-moderation blocks refund the whole reservation after partial output was shown
- **Location:** `platform/api/src/ai/gateway.ts:594-598` (refund on `blocked` regardless of `shown`),
  `:530-559` (each chunk moderated alone).
- **Impact:** a student who can make the model end its answer with blocked text keeps the earlier,
  already-streamed chunks and gets all credits back (credit farming, AC-08). Chunk-by-chunk moderation
  also cannot see harmful content split across two chunks.
- **Fix:** if `shown.length > 0` when the block happens, charge proportionally (or fully) and log;
  moderate a sliding window (previous chunk tail + current chunk).
- **Owner:** ai-gateway. **Status:** new (F-008 settlement rules otherwise verified).

### S6-L05 — Low — AI job reservations can be swept before the job charges; long jobs can run twice
- **Location:** `platform/api/src/ai/jobs.ts:51` (10-min lock), `:177-198` (re-claim after lock expiry,
  up to 3 attempts), `:265-267` (reservation state checked only at job start), `:293-296` (charge).
- **Impact:** a slow or retried evaluation can outlive its reservation TTL (1–2 h); the charge then
  returns `already_refunded` and the evaluations stay saved (free AI). A runner slower than 10 min is
  re-claimed by the worker and both call the model (double spend on the global cap).
- **Fix:** extend `locked_until` while running (heartbeat) and re-check/extend the reservation before
  each model call; on `already_refunded`, re-reserve or mark the evaluation unpaid.
- **Owner:** ai-gateway. **Status:** new.

### S6-L06 — Low — Prompt delimiter neutralisation is easy to sidestep (defence in depth)
- **Location:** `platform/api/src/ai/prompts.ts:123-125`.
- **Impact:** only exact ASCII tags are stripped; full-width `＜/student_message＞`, tags without `>`,
  or other role words are kept. Impact is limited (output is moderated, tutor answers go only to the
  same student, AI marks never count, F-028), so this is hardening for AC-13/AC-14.
- **Fix:** NFKC-normalise before stripping, strip any `<`/`＜` + tag-like word, and run Prompt Shields
  (already used for evaluation) on tutor input too.
- **Owner:** ai-gateway. **Status:** new.

### S6-L07 — Low — Migrator identity is the Postgres Entra admin and is shared by the release job
- **Location:** `platform/infra/modules/postgres.bicep:47,147-152`; `containerApps.bicep:386-411`
  (migrate job) and `:479-504` (release job, same `migratorIdentity`); `migrate-entrypoint.mjs:43-46`
  (`SET ROLE NONE` restores admin rights).
- **Impact:** the content-release job (runs the content CLI over repository content) holds
  `azure_pg_admin`. A bug or supply-chain compromise in the release path is a full database compromise.
- **Fix:** give the release job its own identity with `soyl_app`-level (or a dedicated `soyl_release`)
  grants and Blob Contributor on `content-releases` only; keep the admin identity for the migrate job.
- **Owner:** infra-azure. **Status:** new.

### S6-L08 — Low — Unthrottled `/readyz` and per-request edge-auth logging on the public API ingress
- **Location:** `platform/api/src/modules/health.ts` (`/readyz` runs a DB query and a Redis ping),
  `app.ts:141` (health exempt from edge auth), `app.ts:147` (one warn log per failed edge auth);
  `containerApps.bicep:3` external ingress without IP restrictions.
- **Impact:** anyone can hammer `/readyz` (DB/Redis load) and `/v1/*` without the secret (log volume
  and Log Analytics cost; production has no daily cap, `logDailyCapGb = -1`).
- **Fix:** answer `/readyz` from a cached result (e.g. 5 s), or require the edge secret for it and point
  probes at `/healthz`; sample `edge_auth_failed` logs (count + 1 in N) — the alert already counts them.
- **Owner:** backend-api with infra-azure. **Status:** new.

### S6-L09 — Low — CSP report endpoint reads unbounded bodies and logs without a rate limit
- **Location:** `app/(platform)/api/platform/csp-report/route.ts:20-27`.
- **Impact:** without `content-length` (chunked) the whole body is read before the 16 KB check; the route
  is unauthenticated and unthrottled and writes one log line per report (log flooding on Vercel).
- **Fix:** stream with a byte cap (as the API proxy does) and add a cheap per-IP limit or sampling.
- **Owner:** web-platform. **Status:** new.

### S6-L10 — Low — Consent redirect follows any https URL
- **Location:** `components/platform/auth/ConsentNotice.tsx:33-41`.
- **Impact:** the URL comes from our API, so this is not exploitable today, but once the real consent
  provider (OA-08) is wired any compromise or bug there becomes an open redirect from the platform.
- **Fix:** allowlist the consent provider origin from config.
- **Owner:** web-platform. **Status:** new.

### S6-L11 — Low — Scanner coverage gaps in CI
- **Location:** `.github/workflows/platform-codeql.yml` (paths omit root `proxy.ts`, which is platform
  code), `platform-ci.yml:251-258` (root npm audit report-only), `:298-305` (Checkov report-only).
- **Fix:** add `proxy.ts` to the CodeQL paths; make the root audit blocking after S6-M04; triage Checkov
  and make it blocking before the production hand-over.
- **Owner:** infra-azure. **Status:** new.

### S6-L12 — Low — Quarantine retention and SAS size
- **Location:** `platform/infra/modules/storage.bicep:153-185` (one rule, 30 days, also for
  `uploads-quarantine/`); `ai/blob.ts` SAS `sp=cw` (block blobs can be staged far beyond 10 MB).
- **Impact:** files that were never completed or were rejected-but-not-deleted sit in quarantine for
  30 days; a client can stage multi-GB blobs within the 5-minute SAS (storage cost; the worker refuses
  > 10 MB without reading it all).
- **Fix:** a 1-day lifecycle rule for `uploads-quarantine/`; Defender for Storage malware scanning on
  that container (also closes ASVS 5.4.3 / F-013 item); optionally an Event Grid size check that deletes
  oversize blobs.
- **Owner:** infra-azure. **Status:** new (Defender item carried from F-013/ASVS 5.4.3).

### Informational (no action needed now)
- **S6-I01** `webhook_events.payload` keeps the payer's email/phone for 8 years (PII.md:94) — pending OA-14
  legal retention; consider storing a redacted copy.
- **S6-I02** `docs/platform/STATUS.md:37` says the Next.js hotfix is "ready, not merged"; `origin/main` is
  at `cd33ca7 fix(deps): upgrade next and eslint-config-next to 16.4.3`. Update STATUS/OWNER_ACTIONS (OA-11).
- **S6-I03** IndexedDB answer queue (`components/platform/tests/idb-storage.ts`) keeps a child's written
  answers on the device until submit or logout (cleared in `SessionProvider.tsx:66`); a session that
  simply expires on a shared school device leaves them in place (WEB-10 accepted this).

## 4. Previous register (M0) — re-check

The register text was never committed (OA-13); titles below are reconstructed from references in ADRs,
requirements, OWNER_ACTIONS and code comments.

| ID | Topic | Status now | Evidence |
|---|---|---|---|
| F-001 | Next.js 16.3.4 RCE advisories (live site) | **fixed** | `origin/main` `cd33ca7` and root `package.json:21` = 16.4.3; `npm audit` shows no `next` advisory |
| F-002 | zod memory exhaustion | **open (marketing)** / fixed (platform) | platform `zod 4.6.7` (`platform/api/package.json`); root still 3.25.76 → S6-M04, OA-12(a) |
| F-003 | vitest/tinypool critical (dev) | **fixed** | platform vitest 5.0.5; platform audit 0 high/critical |
| F-004 | Third-party analytics on platform routes | **fixed** | `components/legal/ConsentedAnalytics.tsx:12,35` (`isPlatformPath`, `beforeSend` drop) |
| F-005 | Edge bypass / forged forwarding headers | **fixed (code)**; spike open | `api/src/http/edge.ts`, `app.ts:144-153`, `test/http-pipeline.test.ts`; Vercel check → S6-M03 |
| F-006 | Answer leakage to the browser | **fixed** for content/practice/delivery | `test/content.test.ts` DB-6 contract, `db/test/db6-split.test.ts`, `practice.test.ts:119,242`; live results → S6-H01 |
| F-007 | Offline grace vs server timer | **fixed** | `domain/tests/attempts.ts:302-311`; `test/tests-engine.test.ts:239` |
| F-008 | Credit settlement / refunds | **fixed** (see S6-L04/L05 edge cases) | `ai/credits.ts`; `test/ai-credits.test.ts:73`, `ai-gateway.test.ts:205` |
| F-009 | Free-tier AI budget | **fixed** | `shared/config/credits.ts:37` (`freeTierShare: 0.6`), `test/ai-spend.test.ts` |
| F-010 | CSP `'unsafe-inline'` on ISR routes | **accepted** for `/learn/**` (ADR-011) | `security-headers.ts:107-109`; wider use → S6-L03 |
| F-011 | Marketing site has no security headers; shared origin | **open** | `next.config.ts` / `vercel.json` set no headers; admin still on `www` |
| F-012 | SVG / content-as-code XSS | **fixed** | `shared/content/svg-allowlist.ts`, `ui/render/sanitize-svg.ts`, `ui/__tests__/xss.test.tsx`; KaTeX `trust:false` (`ui/render/math.ts:26`) |
| F-013 | Upload pipeline (no proxy, SAS, cleaning) | **fixed** (transport, SAS, image cleaning); **partial** for files | `ai/uploads.ts`, `ai/blob.ts`, `test/ai-uploads.test.ts`; PDF → S6-M01, malware scan → S6-L12 |
| F-014 | AI data residency (ADR-008) | **open (owner/Lead)** | no `docs/platform/adr/008-*.md` exists |
| F-015 | Retention schedule | **open (owner)** | `platform/db/PII.md:6-7` "pending the owner's sign-off" |
| F-016 | DPDP gamification / behavioural monitoring | **open (owner, OA-14)** | `shared/config/gamification.ts:8` |
| F-017 | Leaderboard PII | **fixed** | `domain/tests/live.ts:149-174`; `test/live.test.ts:201-203` |
| F-018 | (not traceable) | unknown | ID not referenced anywhere in the repo |
| F-019 | Webhook forgery/replay | **fixed** | `billing/razorpay/signature.ts`, `billing/webhooks.ts:154-186` (advisory lock + event row), `billing/sync.ts` re-fetch + bind; `test/billing-orders.test.ts:217` |
| F-020 | Browser-trusted payments | **fixed (platform)** / **open (marketing)** | `billing/routes.ts:54-55` refuses Checkout fields, `test/billing-orders.test.ts:298`; marketing `components/forms/FutureBuildersForm.tsx:148` still records "pay" from the Checkout handler (OA-12b) |
| F-021 | `/api/enroll` validation / rate limit / formula injection | **open (marketing)** | `app/api/enroll/route.ts` forwards raw fields, no limits |
| F-022 | `/api/razorpay` mock order when keys missing | **open (marketing)** | `app/api/razorpay/route.ts:26-30` |
| F-023 | PII in contact logs | **open (marketing)** | `app/contact/actions.ts:54,56` |
| F-024 | Edge secret stored in Vercel | **accepted** | ADR-005 §"Rotation"; D-016 |
| F-025 | (not traceable) | unknown | — |
| F-026 | uuid v7 ids are not secrets | **accepted** (design) | `db/src/ids.ts:6`; one place still leans on id secrecy → S6-L01 |
| F-027 | Moderation / limits fail open | **fixed** | `ai/moderation/types.ts:9`, `ai/routes.ts:70-72`, `test/ai-unit.test.ts:96`, `ai-gateway.test.ts:154,272` |
| F-028 | AI marks feeding scores/ranks | **fixed** | `ai/evaluation.ts:13-14,67-82` (clamp), `test/ai-evaluation.test.ts:93`, `ai-unit.test.ts:164` |
| F-029 | (not traceable) | unknown | — |
| F-030 | Platform inside the marketing root layout | **accepted** (ADR-001/011) | ADR-011 line 23 |

Counted as open in section 1: F-011, F-014, F-015, F-016, F-020, F-021, F-022 (Medium) and F-023
(Low); F-002 is counted once, inside S6-M04. Severities for these are my current rating; the M0
register's own ratings could not be re-read.

## 5. Must-fix before launch
1. **S6-H01** live-mock keys withheld until the event closes (backend-api, web-platform) — or no live
   events scheduled at launch.
2. **S6-M01** real PDF parsing/rasterising for `paper-from-upload`, or keep sample-paper PDFs off
   (images only) at launch (ai-gateway).
3. **S6-M02** delete upload blobs on account deletion (ai-gateway, backend-api).
4. **S6-M03** API-3 spike on the first Vercel deployment that reaches the API; https-only proxy origin
   (web-platform, qa-e2e).
5. **S6-M04 / F-002, F-011, F-020..F-023** marketing-site fixes on the shared origin (owner, OA-12) and a
   blocking root `npm audit`.
6. **F-014, F-015, F-016** owner/legal decisions (ADR-008 data location, retention, DPDP gamification).
7. **S6-L02** upload processing role mismatch (functional, would break photo doubts on Azure).
8. Re-issue F-018/F-025/F-029 from the M0 hand-back and commit the register (OA-13), so the release gate
   "zero open high/critical" can be audited.

## 6. Can follow (track in STATUS.md)
S6-L01 (autosave limit key), S6-L03 (nonce CSP on `/plans`, `/tests`), S6-L04 (partial-output refunds,
windowed moderation), S6-L05 (job heartbeat / reservation extension), S6-L06 (prompt neutralisation),
S6-L07 (separate release identity), S6-L08 (`/readyz`, edge-auth log sampling), S6-L09 (CSP report
endpoint), S6-L10 (consent redirect allowlist), S6-L11 (CodeQL/Checkov coverage), S6-L12 (quarantine
lifecycle, Defender for Storage), S6-I01..I03.

## 7. Web checks
Read: `proxy.ts`, `app/(platform)/api/platform/[...path]/route.ts`, `components/platform/server/api-proxy.ts`
(header allowlist, edge secret set server-side, `redirect: 'manual'`, body cap, SSE `no-transform`,
webhook headers path-scoped, raw body streamed unchanged), `security-headers.ts` (Razorpay origins only on
`/plans`, upload origin only on `/ask` and `/tests/builder`), `ui/render/Markdown.tsx` + `policy.ts`
(no raw HTML, link allowlist, images off for AI text), `lib/return-to.ts` (`safeReturnTo`), IndexedDB
queue, client image re-encode (`ai/upload.ts`: canvas re-encode, `credentials: 'omit'` to Blob).
No `dangerouslySetInnerHTML` outside KaTeX (trust off) and the sanitised SVG renderer.
Web unit run (root): see the appended result line below.

Tests added: none in the repository (PoC tests lived in the session scratch area only).

Known gaps / follow-ups: Azure resources were not inspected live (no portal access in this review);
infra findings are from Bicep and parameters. Staging gates remain "stand-in" (D-008/D-010).

Decisions made: none (security-reviewer proposes; the Lead decides).

Needs from owner: OA-12 (marketing fixes), OA-13 (findings register), OA-14 (DPDP/retention), ADR-008
inputs (OA-02 data location), AC-12 decision on phone-verified ranked live mocks.
