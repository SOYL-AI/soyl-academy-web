/**
 * Content (ARCHITECTURE §4.1): chapter hub, lesson deck, notes and flashcards. Public (guests read
 * everything, CONTEXT §5), published/reviewed only (§7.3), student-safe (DB-6, F-006), and strongly
 * cacheable: strong ETag + `Cache-Control: public` for guests, `private` for signed-in readers
 * (ADR-010). Nothing personal is in these bodies; progress is under /v1/me/progress.
 *
 *   GET /v1/chapters/:id                  hub: chapter, subject, available assets with counts
 *   GET /v1/chapters/:id/deck?part=       slides of one deck part + check-slide question stems
 *   GET /v1/chapters/:id/notes            notes
 *   GET /v1/chapters/:id/flashcards       flashcards
 */
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { policies } from '../policy';
import { withProblems } from '../schemas';
import type { AppDeps } from '../services';
import { cachedContent } from '../http/cache';
import { loadChapter, loadDeck, loadFlashcards, loadHub, loadNotes } from '../domain/content';
import { ChapterHubResponse, ChapterParams, DeckResponse, FlashcardsResponse, NotesResponse } from './content-schemas';

export function registerContentRoutes(appIn: FastifyInstance, deps: AppDeps): void {
  const app = appIn.withTypeProvider<ZodTypeProvider>();
  const { db, config } = deps;
  const year = config.academicYear;
  const route = { policy: policies.publicRead(), cache: 'content' as const };

  app.get('/v1/chapters/:id', {
    config: route,
    schema: {
      tags: ['content'],
      summary: 'Chapter hub: chapter, subject and the published lesson, notes, flashcards, practice and tests with counts',
      params: ChapterParams,
      response: withProblems({ 200: ChapterHubResponse, 304: z.null() }),
    },
    handler: async (request, reply) => {
      const chapter = await loadChapter(db, request.params.id, year);
      return cachedContent(request, reply, await loadHub(db, chapter, year));
    },
  });

  app.get('/v1/chapters/:id/deck', {
    config: route,
    schema: {
      tags: ['content'],
      summary: 'Lesson slides for one deck part (default: the first). Check-slide questions come without answers.',
      params: ChapterParams,
      querystring: z.strictObject({ part: z.coerce.number().int().min(0).max(20).optional() }),
      response: withProblems({ 200: DeckResponse, 304: z.null() }),
    },
    handler: async (request, reply) => {
      const chapter = await loadChapter(db, request.params.id, year);
      return cachedContent(request, reply, await loadDeck(db, chapter, year, request.query.part));
    },
  });

  app.get('/v1/chapters/:id/notes', {
    config: route,
    schema: { tags: ['content'], summary: 'Chapter notes', params: ChapterParams, response: withProblems({ 200: NotesResponse, 304: z.null() }) },
    handler: async (request, reply) => {
      const chapter = await loadChapter(db, request.params.id, year);
      return cachedContent(request, reply, await loadNotes(db, chapter, year));
    },
  });

  app.get('/v1/chapters/:id/flashcards', {
    config: route,
    schema: { tags: ['content'], summary: 'Chapter flashcards', params: ChapterParams, response: withProblems({ 200: FlashcardsResponse, 304: z.null() }) },
    handler: async (request, reply) => {
      const chapter = await loadChapter(db, request.params.id, year);
      return cachedContent(request, reply, await loadFlashcards(db, chapter, year));
    },
  });
}
