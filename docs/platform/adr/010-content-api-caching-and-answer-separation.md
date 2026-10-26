# ADR-010: Content and practice API — caching, active-release reads, answer separation

- Status: accepted (backend-api M2, 2026-10-27)
- Related: ARCHITECTURE §3.1, §4.1, §7.3; ADR-005 (proxy), ADR-006 (content storage, releases, rollback); DB-6, API-4, API-9; threat model F-006

## Context

The chapter hub, lesson player, notes and flashcards are public (CONTEXT §5: guests read everything) and form the platform's highest-traffic reads. They must be cheap to serve and cacheable at the edge. Signed-in students also need their own progress on the same pages. Practice must check answers on the server: answers, worked solutions, marking schemes and rubrics may not reach the browser before the student answers (F-006). Test-pool and live-reserved items may not be reachable at all. ADR-006 makes the release the unit of publication, with rollback by re-activating an older release.

## Decision

1. **Split public content from personal progress.** `GET /v1/chapters/:id` (hub), `/deck?part=`, `/notes` and `/flashcards` return the same body for every caller. Nothing personal goes in them. Personal state has its own member-only endpoints: `GET /v1/me/progress/chapters/:id` (the hub's private half), `GET /v1/me/progress`, `PUT /v1/me/lesson-progress`, `GET /v1/me/badges`. The web loads the public part through ISR/CDN and the private part client-side.
2. **Caching.** Content reads send a strong ETag (sha-256 of the body) and answer `If-None-Match` with 304. Guests get `Cache-Control: public, max-age=120, s-maxage=600, stale-while-revalidate=3600`, so a fixed mistake reaches readers within about an hour, inside the 24-hour "Report a mistake" SLA. Signed-in readers get the same body with `private, max-age=60, stale-while-revalidate=600`. A response that also refreshes the session cookie (`Set-Cookie`) is always `no-store`, so a shared cache can never store a cookie. Routes opt in with `config.cache = 'content'`; everything else stays `no-store` for signed-in callers (API-4, unchanged). The guest practice list is public too. A member's practice list carries answered flags, so it is `no-store`.
3. **Reads go through the active release (ADR-006).** `content_release_items` (migration 0006) records which exact item rows each release contains; `ingestChapterRelease` writes it. For a chapter with an active release, the API serves exactly that release's decks, notes, flashcards and questions, so a rollback serves the older versions, including items a newer release dropped. A chapter with no release (rows written outside the publish stage) falls back to `is_current`. Either way, only `published`/`reviewed` rows are visible (§7.3).
4. **Answer separation is enforced three times.** (a) In storage: `questions.body` is student-safe and keys live in `question_keys` (DB-6). Internal-choice alternatives are now covered too (fix in this milestone). (b) In code: every student DTO is built from an allowlist; no stored body is spread into a response. (c) In serialisation: zod response schemas have no field for key-side data, and a contract test scans every content and practice GET response for every authored chapter, by key name and by the key-side text itself.
5. **Practice.** Questions come from the `student_questions` view (embargo rule) restricted to the `practice` pool, so test and live items are neither listed nor checked. `POST /v1/practice/answers` grades on the server and only then returns the answer, solution and marking scheme. Grading uses shared helpers for code-output and ordering. Guests are checked but not stored (CONTEXT §5). Members' answers go to `practice_answers`. Written types return the model answer and marking scheme; the student self-assesses with `PATCH /v1/practice/answers/:id`, which accepts only their own answers (API-7). Ordering items are shuffled deterministically when served, because they are stored in answer order.

## Consequences

- The web must not expect progress inside content responses; it calls `/v1/me/progress/chapters/:id` when signed in.
- After a republish or rollback, edge caches serve the old body for at most `s-maxage` + SWR (about 70 minutes). Purging on publish can come with the deployment agent's CDN set-up.
- Answer checking is an oracle for practice-pool answers. That is inherent to practice and acceptable. Test and live items are out of reach, and checks are rate-limited (practice.answer.ip / .user).
