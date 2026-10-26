/**
 * Tutor grounding: index and search our own published content (ARCHITECTURE §10; ADR-014).
 *
 * Indexing (worker `ai.index-content`, and on demand in dev): for each chapter, the student-visible
 * rows of its active release (decks per slide, notes per section, flashcards in groups of five,
 * practice-pool question stems — never answers, test or live items) become `content_chunks` scoped by
 * academic year, exam, class and subject. Unchanged items are skipped by content hash; items that left
 * the release are removed. Where pgvector exists and an embedder is configured, chunks get embeddings.
 *
 * Search: vector similarity (pgvector, cosine) when the column exists and the scope has embedded
 * chunks; otherwise — and to fill a short vector result — Postgres full-text search over the
 * generated `search_vector` (simple configuration: English, Hindi and Hinglish all index). The scope
 * filter is applied server-side from the student's profile and request, over published content only;
 * never other students' messages or uploads (AC-14).
 */
import { createHash } from 'node:crypto';
import { and, asc, eq, inArray, sql } from 'drizzle-orm';
import { chapters, contentChunks, decks, flashcardSets, notes, studentQuestions, subjects, type Database } from '@soyl/db';
import type { Embedder } from '@soyl/ai-core';
import { estimateTokens } from '@soyl/ai-core';
import type { Deck } from '@soyl/shared/content/deck';
import type { FlashcardSet, Notes } from '@soyl/shared/content/study';
import { loadChapter, practicePool, studentQuestion, studentQuestionSelect, visible, type ChapterRef } from '../domain/content';

export type ChunkType = 'deck' | 'notes' | 'flashcard_set' | 'question';

export interface ChunkDraft {
  contentType: ChunkType;
  contentId: string;
  chunkIndex: number;
  title: string;
  text: string;
}

const MAX_CHUNK_CHARS = 1_800;
const clip = (s: string) => (s.length > MAX_CHUNK_CHARS ? `${s.slice(0, MAX_CHUNK_CHARS - 1)}…` : s);
const lines = (...parts: (string | undefined | null | false)[]) => parts.filter((p): p is string => !!p && !!p.trim()).join('\n');

/** Chunks of one chapter's visible content (pure: rows in, drafts out). */
export function chunkDeck(id: string, deck: Deck): ChunkDraft[] {
  return (deck.slides ?? []).map((s, i) => ({
    contentType: 'deck' as const,
    contentId: id,
    chunkIndex: i,
    title: `${deck.title} — ${s.heading}`,
    text: clip(lines(s.heading, s.body_md, ...(s.bullets ?? []).map((b) => `- ${b}`), ...(s.columns ?? []), ...(s.math ?? []).map((m) => `$${m}$`), s.narration)),
  }));
}

export function chunkNotes(id: string, n: Notes): ChunkDraft[] {
  const out: ChunkDraft[] = (n.sections ?? []).map((s, i) => ({
    contentType: 'notes' as const,
    contentId: id,
    chunkIndex: i,
    title: `${n.title} — ${s.heading}`,
    text: clip(
      lines(
        s.heading,
        s.body_md,
        ...(s.key_terms ?? []).map((k) => `${k.term}: ${k.definition_md}`),
        ...(s.formulas ?? []).map((f) => `${f.label ? `${f.label}: ` : ''}$${f.latex}$`),
      ),
    ),
  }));
  if (n.exam_tips_md?.trim()) out.push({ contentType: 'notes', contentId: id, chunkIndex: out.length, title: `${n.title} — exam tips`, text: clip(n.exam_tips_md) });
  return out;
}

export function chunkFlashcards(id: string, f: FlashcardSet, chapterTitle: string): ChunkDraft[] {
  const out: ChunkDraft[] = [];
  const cards = f.cards ?? [];
  for (let i = 0; i < cards.length; i += 5) {
    out.push({
      contentType: 'flashcard_set',
      contentId: id,
      chunkIndex: out.length,
      title: `${chapterTitle} — flashcards`,
      text: clip(cards.slice(i, i + 5).map((c) => `Q: ${c.front_md}\nA: ${c.back_md}`).join('\n')),
    });
  }
  return out;
}

export async function chapterChunks(db: Database, chapter: ChapterRef, year: string): Promise<ChunkDraft[]> {
  const out: ChunkDraft[] = [];
  const deckRows = await db
    .select({ id: decks.id, body: decks.body })
    .from(decks)
    .where(and(eq(decks.chapterId, chapter.id), visible(decks, 'deck', chapter, year)))
    .orderBy(sql`coalesce(${decks.part}, 0)`);
  for (const d of deckRows) out.push(...chunkDeck(d.id, d.body as Deck));
  const [n] = await db.select({ id: notes.id, body: notes.body }).from(notes).where(and(eq(notes.chapterId, chapter.id), visible(notes, 'notes', chapter, year)));
  if (n) out.push(...chunkNotes(n.id, n.body as Notes));
  const [f] = await db
    .select({ id: flashcardSets.id, body: flashcardSets.body })
    .from(flashcardSets)
    .where(and(eq(flashcardSets.chapterId, chapter.id), visible(flashcardSets, 'flashcard_set', chapter, year)));
  if (f) out.push(...chunkFlashcards(f.id, f.body as FlashcardSet, chapter.title));
  // Practice-pool stems only (F-006): no answers, no test or live items.
  const qs = await db.select(studentQuestionSelect).from(studentQuestions).where(practicePool(chapter, year)).orderBy(asc(studentQuestions.key));
  for (const row of qs) {
    const q = studentQuestion(row);
    const opts = q.options.map((o) => `(${o.id}) ${o.text_md}`).join(' ');
    const kids = q.children.map((c) => c.stem_md).join('\n');
    out.push({ contentType: 'question', contentId: row.id, chunkIndex: 0, title: `${chapter.title} — practice question`, text: clip(lines(q.passage_md, q.stem_md, opts, kids)) });
  }
  return out;
}

const vectorCache = new WeakMap<object, Promise<boolean>>();

/** True when content_chunks.embedding exists (pgvector installed: Azure, CI). Cached per database. */
export function hasVectorColumn(db: Database): Promise<boolean> {
  let p = vectorCache.get(db);
  if (!p) {
    p = db
      .execute<{ ok: boolean }>(sql`SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'content_chunks' AND column_name = 'embedding') AS ok`)
      .then((r) => !!r.rows[0]?.ok);
    p.catch(() => vectorCache.delete(db));
    vectorCache.set(db, p);
  }
  return p;
}

const hashOf = (items: ChunkDraft[]) => createHash('sha256').update(JSON.stringify(items.map((c) => [c.title, c.text]))).digest('hex').slice(0, 32);

export interface IndexResult {
  chapter: string;
  chunks: number;
  inserted: number;
  removed: number;
  unchangedItems: number;
  embedded: number;
  embeddingCostPaise: number;
}

/** Re-indexes one chapter (idempotent). */
export async function indexChapter(db: Database, chapterKey: string, year: string, embedder: Embedder | null = null): Promise<IndexResult> {
  const chapter = await loadChapter(db, chapterKey, year);
  const drafts = await chapterChunks(db, chapter, year);
  const byItem = new Map<string, ChunkDraft[]>();
  for (const d of drafts) {
    const k = `${d.contentType}|${d.contentId}`;
    byItem.set(k, [...(byItem.get(k) ?? []), d]);
  }
  const existing = await db
    .select({ id: contentChunks.id, contentType: contentChunks.contentType, contentId: contentChunks.contentId, contentHash: contentChunks.contentHash })
    .from(contentChunks)
    .where(eq(contentChunks.chapterId, chapter.id));
  const existingHash = new Map(existing.map((e) => [`${e.contentType}|${e.contentId}`, e.contentHash]));
  const stale = existing.filter((e) => {
    const items = byItem.get(`${e.contentType}|${e.contentId}`);
    return !items || hashOf(items) !== e.contentHash;
  });
  let removed = 0;
  if (stale.length) {
    const ids = stale.map((s) => s.id);
    for (let i = 0; i < ids.length; i += 500) removed += (await db.delete(contentChunks).where(inArray(contentChunks.id, ids.slice(i, i + 500))).returning({ id: contentChunks.id })).length;
  }
  const [subject] = await db.select({ exam: subjects.exam, classLevel: subjects.classLevel, key: subjects.key }).from(subjects).innerJoin(chapters, eq(chapters.subjectId, subjects.id)).where(eq(chapters.id, chapter.id));
  let inserted = 0;
  let unchangedItems = 0;
  const fresh: { id: string; text: string }[] = [];
  for (const [k, items] of byItem) {
    const h = hashOf(items);
    if (existingHash.get(k) === h) {
      unchangedItems++;
      continue;
    }
    const rows = await db
      .insert(contentChunks)
      .values(
        items.map((c) => ({
          contentType: c.contentType,
          contentId: c.contentId,
          unit: chapter.key,
          chapterId: chapter.id,
          academicYear: year,
          exam: subject!.exam,
          classLevel: subject!.classLevel,
          subjectKey: subject!.key,
          chunkIndex: c.chunkIndex,
          text: `${c.title}\n${c.text}`,
          tokens: estimateTokens(c.text),
          contentHash: h,
        })),
      )
      .onConflictDoNothing()
      .returning({ id: contentChunks.id, text: contentChunks.text });
    inserted += rows.length;
    fresh.push(...rows);
  }
  let embedded = 0;
  let embeddingCostPaise = 0;
  if (embedder && fresh.length && (await hasVectorColumn(db))) {
    for (let i = 0; i < fresh.length; i += 64) {
      const batch = fresh.slice(i, i + 64);
      const r = await embedder.embed(batch.map((b) => b.text));
      embeddingCostPaise += r.costPaise;
      for (let j = 0; j < batch.length; j++) {
        await db.execute(sql`UPDATE content_chunks SET embedding = ${`[${r.vectors[j]!.join(',')}]`}::vector, embedding_model = ${embedder.model} WHERE id = ${batch[j]!.id}`);
        embedded++;
      }
    }
  }
  return { chapter: chapter.key, chunks: drafts.length, inserted, removed, unchangedItems, embedded, embeddingCostPaise };
}

/** Chapters whose chunks may be out of date: every chapter with an active release or current content. */
export async function chaptersToIndex(db: Database, year: string): Promise<string[]> {
  const rows = await db.execute<{ key: string }>(sql`
    SELECT DISTINCT c.key FROM chapters c
    WHERE c.academic_year = ${year}
      AND (EXISTS (SELECT 1 FROM decks d WHERE d.chapter_id = c.id AND d.status IN ('published', 'reviewed'))
        OR EXISTS (SELECT 1 FROM notes n WHERE n.chapter_id = c.id AND n.status IN ('published', 'reviewed')))
    ORDER BY c.key`);
  return rows.rows.map((r) => r.key);
}

/* ---------------------------------------------------------------------------------------------- */
/* Search                                                                                          */
/* ---------------------------------------------------------------------------------------------- */

export interface RetrievalScope {
  academicYear: string;
  exam?: string | null;
  classLevel?: number | null;
  subjectKey?: string | null;
  chapterId?: string | null;
}

export interface RetrievedChunk {
  id: string;
  title: string;
  text: string;
  unit: string;
  contentType: ChunkType;
  score: number;
  via: 'vector' | 'fts' | 'chapter';
}

const STOPWORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'to', 'of', 'in', 'on', 'for', 'and', 'or', 'what', 'why', 'how', 'which', 'who', 'when', 'where',
  'does', 'do', 'did', 'can', 'could', 'please', 'explain', 'tell', 'me', 'my', 'i', 'it', 'this', 'that', 'with', 'from', 'by', 'about', 'as', 'at',
  'kya', 'hai', 'hain', 'ka', 'ki', 'ke', 'ko', 'mein', 'me', 'se', 'aur', 'batao', 'samjhao', 'kaise', 'kyu', 'kyun', 'kyon', 'yeh', 'ye', 'hota', 'hoti',
  'है', 'का', 'की', 'के', 'को', 'में', 'से', 'और', 'क्या', 'कैसे', 'क्यों',
]);

/** Query words → an OR tsquery over the `simple` configuration (letters/numbers only: no tsquery syntax injection). */
export function ftsQuery(text: string): string | null {
  const words = [...new Set((text.toLowerCase().match(/[\p{L}\p{N}\p{M}]+/gu) ?? []).filter((w) => w.length > 1 && !STOPWORDS.has(w)))].slice(0, 24);
  return words.length ? words.map((w) => `'${w}'`).join(' | ') : null;
}

function scopeFilter(s: RetrievalScope) {
  return and(
    eq(contentChunks.academicYear, s.academicYear),
    s.exam ? eq(contentChunks.exam, s.exam) : undefined,
    s.classLevel ? eq(contentChunks.classLevel, s.classLevel) : undefined,
    s.subjectKey ? eq(contentChunks.subjectKey, s.subjectKey) : undefined,
    s.chapterId ? eq(contentChunks.chapterId, s.chapterId) : undefined,
  );
}

const chunkColumns = {
  id: contentChunks.id,
  text: contentChunks.text,
  unit: contentChunks.unit,
  contentType: contentChunks.contentType,
};

function toRetrieved(r: { id: string; text: string; unit: string; contentType: string; score: number }, via: RetrievedChunk['via']): RetrievedChunk {
  const nl = r.text.indexOf('\n');
  return { id: r.id, title: nl > 0 ? r.text.slice(0, nl) : r.unit, text: nl > 0 ? r.text.slice(nl + 1) : r.text, unit: r.unit, contentType: r.contentType as ChunkType, score: Number(r.score), via };
}

export interface SearchResult {
  chunks: RetrievedChunk[];
  method: 'vector' | 'fts' | 'hybrid' | 'chapter' | 'none';
  embeddingCostPaise: number;
}

export async function searchContent(db: Database, scope: RetrievalScope, query: string, k: number, embedder: Embedder | null = null): Promise<SearchResult> {
  if (k <= 0) return { chunks: [], method: 'none', embeddingCostPaise: 0 };
  const out: RetrievedChunk[] = [];
  let embeddingCostPaise = 0;
  let usedVector = false;
  if (embedder && (await hasVectorColumn(db))) {
    const e = await embedder.embed([query]);
    embeddingCostPaise += e.costPaise;
    const vec = `[${e.vectors[0]!.join(',')}]`;
    const rows = await db
      .select({ ...chunkColumns, score: sql<number>`1 - (embedding <=> ${vec}::vector)` })
      .from(contentChunks)
      .where(and(scopeFilter(scope), sql`embedding IS NOT NULL`))
      .orderBy(sql`embedding <=> ${vec}::vector`)
      .limit(k);
    out.push(...rows.map((r) => toRetrieved(r, 'vector')));
    usedVector = rows.length > 0;
  }
  if (out.length < k) {
    const q = ftsQuery(query);
    if (q) {
      const tsq = sql`to_tsquery('simple'::regconfig, ${q})`;
      const rows = await db
        .select({ ...chunkColumns, score: sql<number>`ts_rank_cd(search_vector, ${tsq})` })
        .from(contentChunks)
        .where(and(scopeFilter(scope), sql`search_vector @@ ${tsq}`, out.length ? sql`${contentChunks.id} NOT IN (${sql.join(out.map((o) => sql`${o.id}`), sql`, `)})` : undefined))
        .orderBy(sql`ts_rank_cd(search_vector, ${tsq}) DESC`, asc(contentChunks.id))
        .limit(k - out.length);
      out.push(...rows.map((r) => toRetrieved(r, 'fts')));
    }
  }
  if (!out.length && scope.chapterId) {
    // Nothing matched, but the student is on a chapter: ground on its notes/deck opening chunks.
    const rows = await db
      .select({ ...chunkColumns, score: sql<number>`0` })
      .from(contentChunks)
      .where(and(scopeFilter(scope), inArray(contentChunks.contentType, ['notes', 'deck'])))
      .orderBy(sql`CASE ${contentChunks.contentType} WHEN 'notes' THEN 0 ELSE 1 END`, asc(contentChunks.chunkIndex))
      .limit(Math.min(k, 2));
    out.push(...rows.map((r) => toRetrieved(r, 'chapter')));
    return { chunks: out, method: out.length ? 'chapter' : 'none', embeddingCostPaise };
  }
  const anyFts = out.some((c) => c.via === 'fts');
  return { chunks: out, method: usedVector ? (anyFts ? 'hybrid' : 'vector') : anyFts ? 'fts' : 'none', embeddingCostPaise };
}
