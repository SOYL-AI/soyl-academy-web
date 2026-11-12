'use client';

/**
 * Data for Home and Progress (private data in the browser, ADR-010). One small hook per request, each with its own
 * loading and error state, so a failing block degrades on its own without breaking the page. Existing API only:
 * GET /v1/me/dashboard, /v1/chapters/{id} (chapter hub), /v1/live-events, /v1/leagues/current,
 * /v1/coins/daily-challenge.
 */
import { useEffect, useState } from 'react';
import type { ChapterHub, DailyChallenge, LiveEvent, MyDashboard, Schemas } from '@/platform/shared/api-client';
import { api } from '../lib/api-browser';
import type { BoardSlug } from '../lib/catalog';
import type { Loadable } from '../learn/useInsights';

export type { Loadable };
type LeagueCurrent = Schemas['LeagueCurrent'];

/**
 * Loads `load()` whenever `key` changes (null = do not load). A reload keeps the previous data on screen until
 * the new response arrives (`stale`), so saving the class does not flash a skeleton.
 */
export function useLoad<T>(key: string | null, load: () => Promise<T>): Loadable<T> & { stale?: boolean } {
  const [result, setResult] = useState<{ key: string; value: Loadable<T> } | null>(null);
  useEffect(() => {
    if (key === null) return;
    let alive = true;
    load()
      .then((data) => alive && setResult({ key, value: { status: 'ready', data } }))
      .catch(() => alive && setResult({ key, value: { status: 'error' } }));
    return () => {
      alive = false;
    };
    // `load` is recreated every render; `key` captures everything it depends on.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  if (key === null || !result) return { status: 'loading' };
  if (result.key === key) return result.value;
  return result.value.status === 'ready' ? { ...result.value, stale: true } : { status: 'loading' };
}

/** GET /v1/me/dashboard for a member; `reload` bumps refetch it (after saving the class). */
export function useMyDashboard(userId: string | null, reload: number): Loadable<MyDashboard> & { stale?: boolean } {
  return useLoad(userId ? `${userId}:${reload}` : null, () => api.get('/v1/me/dashboard'));
}

/** The chapter hub (what the chapter has: lesson parts, notes, flashcards, practice, tests). Public, cached. */
export function useChapterHub(chapterId: string | null): Loadable<ChapterHub> {
  return useLoad(chapterId, () => api.get('/v1/chapters/{id}', { params: { id: chapterId! } }));
}

/** Live mocks for the student's board and class (all when the class is not set). */
export function useLiveEvents(enabled: boolean, board: BoardSlug | null, classLevel: number | null): Loadable<LiveEvent[]> {
  const key = enabled ? `live:${board ?? '-'}:${classLevel ?? '-'}` : null;
  return useLoad(key, () => api.get('/v1/live-events', { query: board && classLevel ? { board, class: classLevel } : {} }).then((r) => r.events));
}

/** The weekly league (consent-gated rules stay with the caller: pass enabled=false to never request it). */
export function useLeague(enabled: boolean, userId: string | null): Loadable<LeagueCurrent> {
  return useLoad(enabled && userId ? `league:${userId}` : null, () => api.get('/v1/leagues/current'));
}

/** Today's daily challenge for a board and class (also the list of subjects that have content). */
export function useDailyChallenge(board: BoardSlug | null, classLevel: number | null, reload = 0): Loadable<DailyChallenge> {
  const key = board && classLevel ? `dc:${board}:${classLevel}:${reload}` : null;
  return useLoad(key, () => api.get('/v1/coins/daily-challenge', { query: { board: board!, class: classLevel! } }));
}
