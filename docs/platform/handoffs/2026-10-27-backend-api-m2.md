# backend-api — M2 learning core API (content, practice, progress, reports, gamification, staff TOTP) — 2026-10-27

Status: **done**, green (stand-in) per D-010. Everything ran against real PostgreSQL (embedded, from `@soyl/db`) with the in-memory KV, and again on the Redis store over ioredis-mock. Content tests use the real authored and exemplar releases. Nothing was deployed (D-025).

Branch: `platform/backend-api/m2` (worktree `C:/Users/Prabhu/soyl-wt/backend-api-m2`). It includes `origin/platform/main` up to 053d4ef (pipeline M2 merged), so migrations 0003/0004 come before mine (0005, 0006).

## What changed

| Path | What |
|---|---|
| `platform/db/schema/progress.ts`, `migrations/0005_learning_progress*` | `lesson_progress`, `practice_answers`, `user_mfa`, `sessions.mfa_verified_at` (up/down, tests). |
| `platform/db/schema/release-items.ts`, `migrations/0006_release_items*` | `content_release_items`: which item rows each release contains (ADR-006 rollback read path). The migration backfills existing releases. |
| `platform/db/src/student-questions.ts`, `content-ingest.ts` | **DB-6 fix**: keys of internal-choice `alternatives` were stored in `questions.body` (finding below). The split now covers children and alternatives (`childKeys[].alternatives`), and `joinQuestion` restores them exactly. Re-ingest re-applies the split to existing rows (`repaired.questions`). Ingest also records release membership. New: `findKeySideFields`, `canonicalJson`. |
| `platform/db/src/seed/test-users.ts`, `PII.md`, `README.md` | Seed imports `TEST_PHONE_PREFIX` from `shared/config/security.ts` (re-exported). PII rows added for every new column. `verifications.identifier` description corrected. |
| `platform/shared/config/gamification.ts` (new), `security.ts` | XP values, level thresholds, streak freeze, badge catalogue; rate-limit buckets `practice.answer.*`, `progress.write.user`, `mfa.user`; `MFA`, `CONTENT_REPORTS`. |
| `platform/api/src/domain/{content,grading,practice,progress,gamification,reports}.ts`, `guest-merge.ts` | Student-safe reads through the active release, server grading, progress, XP/streaks/badges, reports; merge stores positions and answers. |
| `platform/api/src/modules/{content,content-schemas,practice,progress,reports,mfa,admin}.ts` | Routes, each with a policy, zod schemas and OpenAPI. |
| `platform/api/src/auth/mfa.ts`, `src/config.ts` | AUTH-11 TOTP; `MFA_ENCRYPTION_KEY`. Every `DEV_DEFAULTS` line is marked `// gitleaks:allow`. Google dev values are now refused outside local/test as well. |
| `platform/api/src/kv/redis.ts` | **CI fix**: values and windows now follow the caller's clock, as in the memory store (below). |
| `platform/api/src/http/cache.ts`, `app.ts` | ETag/Cache-Control for content; `config.cache='content'` lets signed-in readers get a `private` copy (`no-store` when the response sets a cookie). The MFA gate replaces the M1 fail-closed stub. |
| `platform/api/scripts/dev-content.ts`, `dev.ts`, `src/index.ts` | `npm run dev` publishes every authored/exemplar chapter through the pipeline's publish stage at start-up. |
| `platform/api/openapi.json`, `test/__snapshots__/route-policy.test.ts.snap` | Regenerated and reviewed. |
| `docs/platform/adr/010-…`, `011-…` | ADR-010 (content caching, active-release reads, answer separation), ADR-011 (staff TOTP). |

## Endpoints added (browser path = `/api/platform` + path; JSON; errors RFC 7807)

| Method | Path | Who | Notes |
|---|---|---|---|
| GET | `/v1/chapters/:id` | anyone | Hub: chapter + topics, subject, assets: lesson parts (`part` 1-based, **0 = single-deck chapter**, `slideCount`, `hasAudio`, `reviewStatus` `beta`/`reviewed`), notes (sections), flashcards (count), practice (count, byType, byDifficulty), chapter tests (id, title, kind, duration, marks, questionCount). **No personal data.** |
| GET | `/v1/chapters/:id/deck?part=` | anyone | Slides of one part (default: the first), `parts`, `goals`, `checkQuestions` (stems/options only). |
| GET | `/v1/chapters/:id/notes` | anyone | Notes sections, key terms, formulas, visuals, exam tips. |
| GET | `/v1/chapters/:id/flashcards` | anyone | Cards `{id, front_md, back_md, tag, topic_id}`. |
| GET | `/v1/chapters/:id/practice?cursor=&type=&difficulty=&limit=` | anyone | `type`/`difficulty` are comma lists; `limit` ≤ 25. Members: unanswered questions first, plus `answered`/`lastCorrect` (null for guests). `nextCursor` is opaque. |
| POST | `/v1/practice/answers` | anyone | `{questionId, version?, response}` → `correct`, `marksAwarded`, `maxMarks`, `grading`, `key {answer, solution_md, marking_scheme, rubric?}`, `parts[]` (case/source), `feedback`, `selfAssessmentPending`, `selfMaxMarks`, `stored`, `answerId`, `xpAwarded`, `badgesAwarded`, `streak`. Guests: `stored:false`, nothing saved. |
| PATCH | `/v1/practice/answers/:id` | member (own) | `{marks}` (0.5 steps, ≤ `selfMaxMarks`) for written parts; anyone else's id → 404. |
| PUT | `/v1/me/lesson-progress` | member | `{chapterId, part?, slide, mode: read\|listen, completed?}`. Idempotent. Reaching the last slide completes the part (XP once). `completed:true` is only valid on the last slide. |
| GET | `/v1/me/progress` | member | Totals (xp, level, next level, streak, lessonsCompleted, practiceAttempts, practiceAccuracy) and chapters with activity, grouped by subject. |
| GET | `/v1/me/progress/chapters/:id` | member | The hub's private half: per-part `slide/mode/completedAt`, practice stats, `answeredQuestionIds`, `correctQuestionIds`. |
| GET | `/v1/me/badges` | member | Badge catalogue with `awarded`/`awardedAt`. |
| POST | `/v1/content-reports` | anyone | `{chapterId, contentType: deck\|notes\|flashcard_set\|question, part?, questionId?, itemRef?, reason, comment? ≤ 1000}` → 201 `{id, status:'open'}`. Limits: 20/day per user, 50/day per IP. |
| GET | `/v1/me/mfa` | reviewer/admin | `{enrolled, confirmed, sessionVerified, recoveryCodesRemaining}`. |
| POST | `/v1/me/mfa/totp/enroll` | staff, fresh | `{secret, otpauthUri, digits, periodSeconds, algorithm, expiresInSeconds}`; 409 when already set up. |
| POST | `/v1/me/mfa/totp/confirm` | staff | `{code}` → `{recoveryCodes[10]}` (shown once); this session is verified. |
| POST | `/v1/me/mfa/verify` | staff | `{code}` or `{recoveryCode}` → `{verified, method, recoveryCodesRemaining}`. |
| POST | `/v1/me/mfa/totp/disable` | staff, fresh + verified | `{code}` → 204; every session loses its mark. |
| GET | `/v1/admin/reports?status=&cursor=&limit=` | staff + **MFA** | Report queue (first `policy.mfa` route). `comment` is plain text: render it as text. |

New problem codes used: `conflict` (409, MFA state; self-assessing an auto-graded answer), `otp_invalid` / `otp_expired` / `otp_locked` (MFA), `mfa_required`. `validation_failed` also covers a response whose shape doesn't match the question type.

## Schema changes (migrations 0005, 0006; both reversible)

- `lesson_progress (user, chapter, unit, part smallint 0..20 [0 = single deck], slide_position 0..1000, mode read|listen, completed_at, source app|guest_merge; UNIQUE(user, chapter, part))`.
- `practice_answers (user, question_id + question_key + question_version, chapter, response jsonb, correct bool|null, marks_awarded, max_marks, grading auto|self|none, answered_at, source app|guest_merge)`. Index on (user, chapter, answered_at); partial UNIQUE (user, question_key) WHERE source='guest_merge'.
- `user_mfa (user UNIQUE, totp_secret_enc, confirmed_at, recovery_code_hashes text[], last_used_step)`, plus `sessions.mfa_verified_at`.
- `content_release_items (release_id → content_releases CASCADE, item_type, item_id; UNIQUE(release, type, item))`.
- 60 → 64 tables. PII.md is updated, and account deletion step 1 now deletes `user_mfa`.

## What web-platform M2 needs

1. **Regenerate the client** from `platform/api/openapi.json`. Schemas: `ChapterHub`, `LessonDeck`, `ChapterNotes`, `ChapterFlashcards`, `StudentQuestion`, `PracticePage`, `PracticeAnswerRequest`/`Result`, `PracticeResponse`, `LessonProgress*`, `MyProgress`, `MyChapterProgress`, `MyBadges`, `Streak`, `ContentReport*`, `Mfa*`.
2. **Hub = two calls**: the public `GET /v1/chapters/:id` (ISR/edge-cacheable) and, when signed in, the client-side `GET /v1/me/progress/chapters/:id`. Content bodies never contain progress (ADR-010). Send `If-None-Match` and handle 304.
3. **Parts**: use `assets.lesson.parts[].part` as is. `0` means the chapter is one deck; pass it back as `?part=0` and in lesson-progress.
4. **Lesson player**: `PUT /v1/me/lesson-progress` on slide change (debounced; limit 120/min) with `mode`. Completion comes from reaching the last slide. Show `xpAwarded`/`badgesAwarded`/`streak` from the response.
5. **Practice**: response shapes per type (`PracticeResponse`): option_ids, value, blanks (in stem order), pairs, order (all ids), output, text. Case/source items use `{parts:[{id, alternative?, response}]}`. **Ordering options arrive shuffled**; send back the ids in the order the student chose. For written types, show `key.answer.model_answer_md` and the marking scheme, then `PATCH` the self-mark (members). Guests: keep progress in `soyl_guest_v1` as before.
6. **Guest contract (backward compatible)**: `GuestLesson` now accepts optional `part` and `mode`; please send them. `MergeGuestResponse` adds `lessonsStored` and `practiceStored`; `ignored.positionsNotStored` is always 0. **After a successful merge, positions are stored, so clear the whole `soyl_guest_v1`.**
7. **"Report a mistake"**: `POST /v1/content-reports` from every content page. `itemRef` = slide id / card id / notes section index / child part id.
8. **Staff (/admin)**: when a call returns `mfa_required`, read `GET /v1/me/mfa`. If not confirmed, enrol (show a QR of `otpauthUri` plus the secret, confirm with a code, show the recovery codes once). Otherwise prompt for a code or recovery code (`/verify`). Enrol and disable need a fresh sign-in (`fresh_session_required`).
9. **Local dev**: `npm run dev -w @soyl/api` now starts with 12 published chapters (CBSE 10 Science ch01–05, Maths ch01–04 + ch06, Hindi A ch02 + ch10; 906 questions, 24 tests). The first start takes about 1.5 min. `DEV_CONTENT=off` skips publishing.

## Security finding (new, for findings.md; OA-13 pending)

**F-new (backend-api M2): answer keys of internal-choice alternatives stored in the student-safe question body.** `splitQuestion` stripped key fields from children but not from `children[].alternatives[]`. Each alternative's `answer`, `solution_md` and `marking_scheme` landed in `questions.body` and therefore in the `student_questions` view: 5 alternatives in each of maths ch01–04 and 6 in each of science ch02–05. No API had served them yet (M1 had no content routes, and M2 builds every DTO from an allowlist). **Fixed** in `@soyl/db` (621f6dc): the split covers alternatives, keys are in `childKeys[].alternatives`, re-ingest repairs old rows, and grading reads alternative keys from `question_keys`. Regression tests: `db/test/db6-split.test.ts` ingests every real release, deep-scans `questions.body` and the view, and checks an exact split→join round trip. `api/test/content.test.ts` scans every content/practice GET response for key names and for key-side text. Severity: medium (latent; no exposure path existed).

## CI fix: Redis KV clock semantics

`phone-otp.test.ts` "10 failures lock the number for an hour" failed on CI redis:7. `RedisKv` expired values with Redis's own real-time TTL, while the memory store and the tests expire against the injected clock, so after `clock.advance(1h)` the lockout key was still alive in Redis. Values are now stored as `<expiresAt>|<value>` and expired against `now`; the Redis TTL is only for cleanup. Windows count only hits in (now − window, now], to match the memory store when a test sets the clock backwards. Each harness app has its own random key namespace. The KV contract (with these clock cases) runs on memory, on ioredis-mock (Lua scripts included) and on real Redis in CI. `TEST_KV=redis-mock npm test -w @soyl/api` runs the whole suite on the Redis store locally: 264 passed at the time of the fix.

## Deviations / decisions

1. **Reads go through the active release** (ADR-006/010) via a new membership table, not `is_current`. A chapter without a release (hand-inserted rows) falls back to `is_current`.
2. **Badges are evaluated by the API** after learning events (ARCHITECTURE §12 says worker). The set is small and cheap; move it to the worker when heavier criteria arrive.
3. **Streak days** count a stored practice answer or a lesson completion. Simply viewing slides does not count.
4. **XP**: 10 per first completion of a deck part, 2 per first correct answer to a question. Guest-merged correct answers don't earn in-app XP again. Self-assessed marks earn no XP (it could be farmed).
5. **Practice answers with an explicit `version`** are graded against that exact visible version (the one the student saw, D-023), even if a newer release is active.
6. **`GET /v1/admin/reports`** added early (read-only) as the first MFA-gated route.
7. Shared grading helpers cover only code-output/ordering; the other objective types are graded in `api/src/domain/grading.ts` (shared/content is pipeline-owned). Moving them to `shared/content/grading.ts` would let the web do the same, but the web must not grade before answering anyway (F-006).

## How to verify (from `platform/`, 2026-10-27, after merging origin/platform/main 053d4ef)

```
npm run typecheck                          → ai-core, api, content-pipeline, db, e2e, shared, worker: exit 0
npm test -w @soyl/api -w @soyl/worker -w @soyl/db
  api     Test Files 16 passed (16) · Tests 265 passed | 1 skipped (Redis contract, CI only)
  worker  Test Files 6 passed (6)   · Tests 44 passed
  db      Test Files 12 passed (12) · Tests 100 passed | 1 skipped
          (the first combined run had one native worker crash, 0xC0000409, in the untouched
           constraints.test.ts; that file 18/18 and the full db suite passed on rerun)
TEST_KV=redis-mock npm test -w @soyl/api   → 16 files, 264 passed (before the last test was added)
api coverage (npx vitest run --coverage)   → Lines 98.06%, Statements 95.97%, Branches 86.8%, Functions 96.68%
                                             new domain files ≥ 95% lines (content/mfa/guest-merge/progress 100%)
npm run openapi -w @soyl/api               → regenerated, no diff after the last route change
npm run db -w @soyl/db -- migrate up / down --to 4 / status / up / status
                                           → 0004–0006 rolled back and re-applied, "7 applied, 0 pending"
                                             (db/test/migrations.test.ts also asserts an identical schema after up→down 0→up)
npm audit                                  → 4 moderate (dev-only drizzle-kit → esbuild), 0 high, 0 critical
npm run dev -w @soyl/api (PORT=8791)       → "[dev-content] 12 chapter(s) published (906 questions, 24 tests) in 29 s",
                                             hub/deck/practice/answers answered correctly via curl
git diff --stat origin/platform/main -- app components content lib public package.json package-lock.json next.config.ts → empty
```

## Tests added

API: `content` (hub, parts, deck/notes/flashcards, §7.3 visibility, caching public/private/set-cookie, **DB-6 contract scan of every chapter**, alternatives as stems, ordering shuffle, **v2 publish → rollback to v1**), `grading` (every objective type, written, case/source, alternatives), `practice` (paging/filters/cursor, unanswered-first, every type through the endpoint, guest not stored, case items with alternatives, self-assessment + IDOR, F-006 pools/embargo/draft, version pinning, API-8, rate limit), `progress` (lesson progress idempotency/XP once/validation, chapter + summary progress, IDOR, IST streaks with freeze and week boundaries, badges, M2 merge incl. idempotency and no double XP), `reports-mfa` (reports guest/member, sanitising, validation, both rate limits; RFC 6238 vectors, AES-GCM AAD, enrol/confirm/verify/replay/recovery/lockout/expiry/disable/fresh), KV contract on memory + ioredis-mock, a production `DEV_DEFAULTS` test, updated route-policy snapshot and guest-merge expectations.
DB: `db6-split` (unit + every real release + repair + membership), `progress` (constraints, idempotency indexes, cascades).

## Known gaps / follow-ups

- **CDN purge on publish/rollback** is not wired (deployment agent). Until it is, edge copies age out within about 70 minutes.
- **Admin MFA reset** for a staff user who loses the authenticator and the recovery codes is a manual DB operation for now.
- `question_stats` are not updated from practice answers yet (worker job, M3).
- Lesson audio keys (`slides[].audio.key`) are returned as is; the web needs the public-assets base URL once TTS runs (no authored deck has audio yet).
- Leaderboards/leagues: M3+, consent-gated (D-014).
- One native vitest worker crash on Windows (0xC0000409) in `db/test/constraints.test.ts`, not reproducible. Watch CI.

## Decisions made

ADR-010, ADR-011.

## Needs from owner

None new. When deploying: `MFA_ENCRYPTION_KEY` (32 random bytes, base64) in Key Vault for API stg/prod.
