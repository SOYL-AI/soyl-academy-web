/**
 * Public chapter content for server-rendered pages (ADR-010 §1: the same body for everyone, no progress):
 * hub, lesson deck, notes, flashcards. Read straight from the API origin with the edge secret, cached by
 * Next (ISR data cache) for CONTENT_REVALIDATE_SECONDS, which matches the API's `s-maxage` so a fixed
 * mistake reaches readers within the "Report a mistake" SLA (ADR-010 §2: about 70 minutes worst case).
 *
 * Personal state (progress, answered flags) is never fetched here: the browser asks
 * GET /v1/me/progress/chapters/:id itself (ADR-010 §1).
 *
 * Server only (reads PLATFORM_EDGE_SECRET). Never import from a client component.
 */
import { cache } from 'react';
import { isApiError, type ChapterFlashcards, type ChapterHub, type ChapterNotes, type LessonDeck } from '@/platform/shared/api-client';
import { serverApi } from './catalog';

export const CONTENT_REVALIDATE_SECONDS = 600;

function notFoundToNull<T>(p: Promise<T>): Promise<T | null> {
  return p.catch((err: unknown) => {
    if (isApiError(err) && (err.status === 404 || err.status === 400)) return null;
    throw err;
  });
}

const contentApi = () => serverApi({ revalidate: CONTENT_REVALIDATE_SECONDS, tags: ['platform-content'] });

/** Hub summary (chapter, topics, which views exist). null → the chapter does not exist. Deduplicated per request. */
export const getHub = cache((chapterId: string): Promise<ChapterHub | null> => notFoundToNull(contentApi().get('/v1/chapters/{id}', { params: { id: chapterId } })));

/** One deck part (`part` from the hub; 0 = single deck; undefined = the first part). */
export const getDeck = cache((chapterId: string, part?: number): Promise<LessonDeck | null> =>
  notFoundToNull(contentApi().get('/v1/chapters/{id}/deck', { params: { id: chapterId }, query: part === undefined ? undefined : { part } })),
);

export const getNotes = cache((chapterId: string): Promise<ChapterNotes | null> => notFoundToNull(contentApi().get('/v1/chapters/{id}/notes', { params: { id: chapterId } })));

export const getFlashcards = cache((chapterId: string): Promise<ChapterFlashcards | null> =>
  notFoundToNull(contentApi().get('/v1/chapters/{id}/flashcards', { params: { id: chapterId } })),
);
