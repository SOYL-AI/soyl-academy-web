# ADR-006: Content storage, releases and versioning

Status: **Accepted** (pipeline-engineer, M2, 2026-10-27)
Related: ARCHITECTURE §2, §6, §7.3–7.4, §8; DECISIONS D-010, D-021, D-025, D-026; ADR-004 (Drizzle); db-schema DB-6.

## Context

Content is made by the pipeline (stages 2–8) or written by hand (D-026, `platform/content/authored/`). It has to reach students through the API, with these properties:
- immutable bundles that can be rolled back;
- per-item versions, so a test attempt always shows the exact question versions it was built from (D-023);
- answer keys that are never readable through student-facing queries (DB-6);
- a path that works locally without Azure (no deployment in this phase, D-025) and switches to Azure Blob without code changes.

## Decision

1. **The release is the unit of publication.** One `ChapterRelease` JSON per chapter and version (`platform/shared/content/release.ts`) is written to the BlobStore at `content/releases/<unit>/<version>.json` and ingested into Postgres by `ingestChapterRelease` (`@soyl/db/content-ingest`). Releases are immutable: re-ingesting the same version with different bytes is an error. Exactly one release per unit and academic year is `active`. **Rollback** re-activates an older release (`npm run content -- rollback --unit <id> --to <n>`).
2. **Postgres is the serving store; Blob is the archive.** The API reads `decks`, `notes`, `flashcard_sets`, `questions`/`question_keys` and `tests`/`test_items` rows, not blobs. Blobs hold the release JSON (provenance, audit, re-ingestion) and narration audio. Answers, solutions, marking schemes and writing rubrics live only in `question_keys` (DB-6). Contract v2 fields shown to students (`format`, `word_limit`, `map_id`, `passage_origin`) are in `questions.body`.
3. **Versioning.**
   - An item whose content is unchanged keeps its version. Unchanged means the sha256 of the item at its current version equals the stored `content_hash`.
   - A changed item gets the current version + 1 and becomes `is_current`. The older row stays, so past attempts still resolve.
   - A release whose content hash (`build.checks.content_sha`) equals the active release is not re-published.
   - Tests follow the same rule: an assembled test whose sections changed is stored as a new version, and the previous version is set to `retired`.
4. **BlobStore interface** (`platform/content-pipeline/src/blob.ts`): `put/get/exists/list` over validated relative keys.
   - The local filesystem implementation (`out/blob`) is the stand-in (D-010).
   - The Azure Blob implementation uses the REST API with keyless `DefaultAzureCredential`. It is selected by `CONTENT_BLOB_ACCOUNT_URL`.
5. **Audio is content-addressed:** `audio/<unit>/<deck>/<slide>-<sha256(voice + text)[0:12]>.ogg`.
   - Unchanged narration is never re-synthesised, and a release references audio by key.
   - Mock audio hashes a distinct voice tag, so placeholder silence can never satisfy a real run.
6. **Hand-authored content stays in git** (D-026) as an ingestion source only. `publish --authored` builds releases from it. When Blob and Postgres are deployed, the published releases are the source of truth and the folder is input.
7. **Lifecycle on publish (beta posture, ARCHITECTURE §7.3).**
   - Generated items reach `auto_verified` only through lint + verify. Hand-authored items go draft → published.
   - `needs_review` items never ship.
   - Mock output (`provenance.model = "mock"`) is refused unless `--allow-mock` in a non-production environment. It is recorded in the release (`build.checks.mock`) and never counts toward coverage.

## Consequences

- Rollback is a status flip on `content_releases`. The API must resolve a unit's content through its active release, not only through `is_current` rows; backend-api owns that read path.
- Content edits always create new rows. The tables grow with every published change, which is acceptable at the current scale (~0.3 MB per chapter).
- Pipeline state (`pipeline_*`) and spend (`content_budget_ledger`) are in the same database, so the budget cap is shared across workers (migration 0004).
- Switching to Azure needs only env vars and role assignments: Storage Blob Data Contributor for the pipeline identity, Cognitive Services Speech User for TTS.
