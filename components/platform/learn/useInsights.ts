'use client';

/**
 * Learning insights for members (backend learning-insights): GET /v1/me/mastery (Khan-style levels),
 * GET /v1/me/activity (heatmap), GET /v1/me/card (private player card). Guests get `guest` and the pages fall
 * back to device progress. Every hook degrades to `error` without breaking the page.
 */
import { useEffect, useState } from 'react';
import type { MyActivity, MyMastery, MyPlayerCard } from '@/platform/shared/api-client';
import { useSession } from '../auth/SessionProvider';
import { api } from '../lib/api-browser';

export type Loadable<T> = { status: 'loading' } | { status: 'guest' } | { status: 'error' } | { status: 'ready'; data: T };

function useMemberData<T>(key: string, load: () => Promise<T>): Loadable<T> {
  const { state } = useSession();
  const userId = state.status === 'member' ? state.user.id : null;
  const [result, setResult] = useState<{ key: string; value: Loadable<T> } | null>(null);
  const fullKey = `${userId ?? state.status}|${key}`;

  useEffect(() => {
    if (!userId) return;
    let alive = true;
    load()
      .then((data) => alive && setResult({ key: fullKey, value: { status: 'ready', data } }))
      .catch(() => alive && setResult({ key: fullKey, value: { status: 'error' } }));
    return () => {
      alive = false;
    };
    // `load` is recreated every render; the key captures everything it depends on.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullKey, userId]);

  if (state.status === 'loading') return { status: 'loading' };
  if (state.status === 'guest') return { status: 'guest' };
  return result?.key === fullKey ? result.value : { status: 'loading' };
}

export function useMastery(subjectId?: string): Loadable<MyMastery> {
  return useMemberData(`mastery:${subjectId ?? '*'}`, () => api.get('/v1/me/mastery', { query: subjectId ? { subjectId } : {} }));
}

export function useActivity(days?: number): Loadable<MyActivity> {
  return useMemberData(`activity:${days ?? 'default'}`, () => api.get('/v1/me/activity', { query: days ? { days } : {} }));
}

export function usePlayerCard(): Loadable<MyPlayerCard> {
  return useMemberData('card', () => api.get('/v1/me/card'));
}
