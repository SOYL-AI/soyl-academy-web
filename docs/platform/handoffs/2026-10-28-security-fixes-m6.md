# backend-api + ai-gateway — M6 security fixes (S6-H01, M01, M02, L01, L02, L03; L07 documented) — 2026-10-28
Status: done (S6-L07 documented as a follow-up)
Branch: `platform/backend-api/security-fixes-m6` (merged with `origin/platform/main` incl. backend-api M5 follow-ups)
Source: `docs/platform/handoffs/2026-10-27-security-reviewer-m6.md`

## Per finding

| Finding | Status | Fix | Regression test (fails before, passes after) | Commit |
|---|---|---|---|---|
| **S6-H01** High: live keys to early submitters | **fixed** | New `domain/tests/live-review.ts`: a live attempt's review opens at `closesAt(ev)` (deadline cap + live grace) or when the event is `results_published` (cancelled events: at `closesAt`). Before that `GET /v1/attempts/:id/result` returns score, time, percentile and the provisional rank only, with `review: {status: 'after_event', opensAt}`; `sections`, `topics`, `byDifficulty`, `sectionsLayout`, `items` are empty (no key, solution, marking scheme, rubric, per-item status/correctness). `POST …/self-evaluation`, `POST …/ai-evaluation`, `GET /v1/ai/quote/evaluate-paper?attemptId=`, the evaluation job run (`evaluationUnits`) and `GET …/ai-evaluation` answer **409 `results_after_event`** (extension `opensAt`). Web: `ResultView` shows "Solutions open after the live test … at <IST time>" and hides analysis/AI/review; `testProblemMessage` maps the new code. | `api/test/live-review.test.ts` (PoC-1: A submits blank at +2 min, `forbiddenKeys(result) == []`, self/AI/quote/job refused, B starts at +14 min; still closed at `closesAt − 1 ms`, full review at `closesAt`; results_published opens early; ordinary tests always open). Web: `m34-components.test.tsx` "S6-H01 …". | `01e1c6d` |
| S6-H01 other paths checked | no change needed | `GET /v1/attempts/:id` returns only the student-safe paper + own responses; `GET /v1/tests/:id` metadata only; practice and check slides serve/check only the `practice` pool (`live_reserved` never); the custom builder draws only practice-pool items; content reports allow `live_reserved` only after the embargo and return no key; `allowPracticePool` live papers are refused in production; tutor retrieval does not read keys; the M5 `GET /v1/live-events/:id` returns no item data. Residual (owner, AC-12): the score itself is public via the leaderboard, so several accounts could probe one answer per account — ranks stay labelled beta; a one-person signal for ranked mocks remains the reviewer's AC-12 recommendation. | — | — |
| **S6-M01** Medium: PDF checks bypassable | **fixed (option b)**, ADR-020 | `AI_UPLOADS.contentTypes` = JPEG/PNG/WebP (config; new `UPLOAD_MEDIA_TYPES` for sniffing). API refuses PDFs at create (400 `validation_failed`, both kinds). `validateAndClean` refuses any sniffed PDF **regardless of config** (`unsupported_type`), so re-adding PDF to config alone cannot revive the regex path; `checkPdf` is documented as not a boundary. Page-count bypass: `readyUpload` refuses a processed type that is no longer accepted (422 `upload_rejected`, nothing reserved) and the paper job refuses it (`upload_type_disabled`, refunded); the model only receives images. Web `prepareFile` refuses PDFs before upload; the sample-paper input accepts `AI_UPLOADS.contentTypes`. Option (a) (real parser + rasterise in the worker) is the follow-up before PDFs return. | `ai-uploads.test.ts`: PDFs refused at create for both kinds; every PoC-2 variant (page bomb, `/OpenAction`, `/J#61vaScript` + `/AA /URI`, ObjStm) refused in processing; "S6-M01: a PDF processed before…" (422, no charge). `ai-unit.test.ts` (`validateAndClean` refuses PDFs), `shared/config/ai-actions.test.ts`, web `m4-ai-logic.test.ts`. | `a2690d8` |
| **S6-M02** Medium: deletion leaves upload blobs | **fixed** | `DELETE /v1/me` marks the user's uploads `deleted` in its transaction (unusable at once), then `UploadService.purgeDeleted` deletes each quarantine original (`uploads-quarantine/<blob_key>`) and cleaned copy (`uploads/<processed_key>`), then the row, and writes one `audit_log` row per user (`account.uploads_purged`, ids + counts only). A Blob failure never blocks deletion; rows stay `deleted` and the new worker job **`uploads.purge-deleted`** (every 5 min, SWEEP retries; throws when nothing moved so pg-boss retries/alerts) finishes them. Upload processing never resurrects a deleted upload (conditional status updates; a derivative written during deletion is removed). `PII.md` updated. | `ai-uploads.test.ts` "S6-M02: account deletion deletes every upload blob…" and "…when Blob storage is down…" (memory Blob stand-in, `failing`); worker `ai-jobs.test.ts` "S6-M02 uploads.purge-deleted…". | `7c6b822`, `9292c3d`, `c73cb78` |
| **S6-L01** Low: autosave limit keyed by attempt | **fixed** | `attempt.autosave` / `attempt.submit` buckets keyed `userId:attemptId`. | `tests-engine.test.ts` "S6-L01: another user hammering an attempt id…" | `e02df32` |
| **S6-L02** Low: API cannot write `uploads` | **fixed (infra)** | `storage.bicep`: API gets Storage Blob Data **Contributor** on the `uploads` container only (was Reader); in-process processing and S6-M02 deletes need it. `validate.mjs` now checks the Blob write contract per identity (api: uploads + uploads-quarantine; worker: 4 containers; migrator: content-releases; frontdoor: none). | `node platform/infra/validate.mjs`: with the old Reader grant → "S6-L02 blob writes apiPrincipalId: uploads-quarantine -- expected uploads, uploads-quarantine", 1 error; now 0 errors (`--strict` too). | `0ed1882` |
| **S6-L03** Low: static CSP on /plans, /tests | **fixed** | `NONCE_ROUTE_PREFIXES` = `/me`, `/tests` (all `/tests/**`), `/plans`, `/ask`, `/leaderboard`, `/admin`; `/plans`, `/tests` and the series page call `connection()` (series page drops ISR). Nonce policy on `/plans` keeps the Razorpay frame/connect/img origins and lists `checkout.razorpay.com` as the CSP2 fallback (`'strict-dynamic'` trusts the nonced loader). Static policy = `/learn/**` only. ADR-018 amended. | `m3m4-server.test.ts` (updated: `/plans` nonce without `'unsafe-inline'`; `/tests`, series, `/plans` use the nonce), e2e `plans.spec.ts` updated (not run here). | `1d03046` |
| **S6-L07** Low: release job shares the admin identity | **documented, follow-up** | Not simple: needs a new `id-soyl-release-<env>` identity, a Postgres principal + a `soyl_release` role with DML grants on catalog/content tables (created by the migrator's bootstrap), `migrate-entrypoint.mjs release` running without bootstrap/`SET ROLE NONE`, ACR pull + Blob Contributor on `content-releases` moved to it, and the release job switched. Owner: infra-azure + db-schema. | — | — |

Not in scope (Lead): S6-M03 (x-real-ip on a real deployment), S6-M04 / OA-12 (marketing deps).

## How to verify
```
cd platform && npm ci
npm run typecheck
npm test -w @soyl/api        # after merging platform/main: 34 files, 536 passed | 1 skipped
npm test -w @soyl/db         # after merge: 15 files, 114 passed | 1 skipped
npm test -w @soyl/worker     # after merge: 11 files, 65 passed (health.test 'working pool' timed out once under machine load, passed on rerun)
npm test -w @soyl/shared     # 7 files, 80 passed
BICEP_BIN=<bicep> node infra/validate.mjs --strict   # 0 errors, 0 warnings; S6-L02 contract lines
cd .. && npm ci && npm run lint && npm run build
npm run test:platform-web -- --maxWorkers=2   # 10 files, 173 passed
npm run test:platform-ui -- --maxWorkers=2    # 6 files, 548 passed
```
(`--maxWorkers=2`: on this shared machine vitest's worker start timed out under load with the default pool size; no test failed.)

## Deploy steps for the Lead (nothing was deployed)
1. Infra: redeploy the environment Bicep (`main.bicep`) for dev/stg/prod. It creates a new role assignment
   (Storage Blob Data Contributor, API identity, scope `…/blobServices/default/containers/uploads`). The old
   Reader assignment (`guid(cUploads.id, apiPrincipalId, blobDataReader)`) is left by an incremental deployment;
   it is harmless (subset) — remove it if you want a clean state:
   `az role assignment delete --assignee <api principalId> --role "Storage Blob Data Reader" --scope <uploads container id>`.
2. API + worker images from this branch: the worker registers `uploads.purge-deleted` (*/5) on start (pg-boss
   schedule, no migration). No DB migration in this change.
3. Web (Vercel): `/plans` and `/tests/**` become dynamic (nonce CSP). Smoke: `/plans` CSP has `'nonce-…' 'strict-dynamic'`
   and no `'unsafe-inline'` in `script-src`; Buy still opens Razorpay test Checkout.
4. Any PDF uploads created before the deploy are refused in processing / at use (by design, ADR-020).

## Tests added
`api/test/live-review.test.ts` (2), `tests-engine.test.ts` (S6-L01), `ai-uploads.test.ts` (S6-M02 ×2, S6-M01 legacy PDF, PDF corpus rewritten for images-only), `ai-unit.test.ts` (PDF refusal), `worker/test/ai-jobs.test.ts` (purge job), `shared/config/ai-actions.test.ts`, web `m34-components.test.tsx`, `m4-ai-logic.test.ts`; `infra/validate.mjs` contract check.

## Known gaps / follow-ups
- ADR-020 option (a): real PDF parser + rasteriser in the worker, multi-page sample papers.
- S6-L07 (above). AC-12 one-person signal for ranked live mocks (owner).
- `UploadService.expireDue` still swallows Blob delete errors (rows become `expired`); S6-M02's pattern (keep the row until both deletes succeed) could be applied there too.
- API client and OpenAPI regenerated; the route-policy snapshot did not change.

## Decisions made
ADR-020 (images-only uploads at launch); ADR-018 amendment (nonce CSP on /plans and /tests).

## Needs from owner
None new (AC-12 decision stays open).
