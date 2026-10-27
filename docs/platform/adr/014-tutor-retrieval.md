# ADR-014: Tutor retrieval — pgvector with a full-text-search fallback

- Status: accepted (ai-gateway M4, 2026-10-27)
- Related: ARCHITECTURE §6 (`content_chunks`), §10 ("grounded in our own content"); ADR-004 (pgvector column only where available), ADR-006/010 (active-release reads), ADR-013; threat model AC-14, F-006; DECISIONS D-008

## Context

The tutor must answer from our own published lessons for the student's board, class and chapter.
pgvector exists on Azure Database for PostgreSQL and in CI's Postgres image, but not in the embedded
Postgres used for local development (ADR-004 adds `content_chunks.embedding` conditionally). Embeddings
need a model deployment (`AZURE_OPENAI_DEPLOYMENT_EMBEDDING`), which does not exist yet (OA-02). Content
is English, Hindi (Devanagari) and Hinglish. Retrieval must never expose answer keys or test/live items.

## Decision

1. **What is indexed**: the student-visible rows of each chapter's active release (decks per slide,
   notes per section plus exam tips, flashcards in groups of five, practice-pool question stems and
   options). Never answers, solutions, marking schemes, `test` or `live_reserved` items (F-006), and
   never students' messages or uploads (AC-14). Each chunk carries academic year, exam, class, subject
   and chapter for server-side scope filters.
2. **Index maintenance**: `indexChapter` hashes each item's chunk texts; unchanged items are skipped,
   changed or removed items are replaced. The worker's hourly `ai.index-content` job indexes every
   chapter with published content (rollbacks re-sync automatically). Inserts name their columns
   explicitly because `embedding` may not exist.
3. **Full-text search everywhere**: migration 0008 adds `content_chunks.search_vector` as a generated
   `to_tsvector('simple', text)` column with a GIN index. The `simple` configuration does not stem or
   drop stop words, so Devanagari and Hinglish index as well as English; the query side removes a small
   English/Hinglish/Hindi stop-word list and ORs the remaining words (`ts_rank_cd` ordering). Query
   words are reduced to letters/digits/marks, so no tsquery syntax can be injected.
4. **Vector search where possible**: when the `embedding` column exists and an embedder is configured,
   chunks are embedded at index time and the query is embedded at request time (metered into the
   request's cost); results are ordered by cosine distance (HNSW index from 0002). If fewer than k
   chunks come back, FTS fills the rest ("hybrid"). If nothing matches and the student is on a
   chapter, the chapter's first notes/deck chunks ground the answer.
5. **Tests**: FTS runs in every local test; the pgvector path runs in CI where the extension exists,
   with the deterministic `MockEmbedder` (hashed bag-of-words, unit vectors), and is skipped locally.

## Consequences

- Grounding works today on every environment; quality improves without code changes once the
  embedding deployment exists (set `AI_EMBEDDINGS=azure` and the deployment env var; the next
  `ai.index-content` run embeds every chunk, ≈ ₹1.76 per million tokens).
- FTS recall is word-based: synonyms and paraphrases are weaker than with embeddings.
- Changing the embedding model or dimension needs a migration (ADR-004) and a full re-embed.
