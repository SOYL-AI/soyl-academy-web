'use client';

/**
 * The learner's progress for the whole platform shell (streak in the top bar, dashboard, mastery on course
 * pages): members → GET /v1/me/progress (fetched once per member, refreshed when the tab comes back into
 * view and on demand); guests → soyl_guest_v1 on this device (re-read on every route change).
 */
import { usePathname } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useSession } from '../auth/SessionProvider';
import { api } from '../lib/api-browser';
import { readGuestProgress } from '../lib/guest-storage';
import { fromGuestProgress, fromMemberProgress, type LearnerProgress } from '../lib/learner';

export interface ProgressApi {
  progress: LearnerProgress | null;
  /** loading until the session settles and the first read finished. */
  ready: boolean;
  refresh: () => void;
}

const ProgressCtx = createContext<ProgressApi>({ progress: null, ready: false, refresh: () => undefined });

export function useLearnerProgress(): ProgressApi {
  return useContext(ProgressCtx);
}

const STALE_MS = 60_000;

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { state } = useSession();
  const pathname = usePathname();
  const [progress, setProgress] = useState<LearnerProgress | null>(null);
  const [ready, setReady] = useState(false);
  const [tick, setTick] = useState(0);
  const lastFetch = useRef(0);
  const lastUser = useRef<string | null>(null);
  const userId = state.status === 'member' ? state.user.id : null;

  const refresh = useCallback(() => {
    lastFetch.current = 0;
    setTick((t) => t + 1);
  }, []);

  useEffect(() => {
    if (state.status === 'loading') return;
    if (state.status === 'guest') {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable after mount
      setProgress(fromGuestProgress(readGuestProgress()));
      setReady(true);
      return;
    }
    if (lastUser.current === userId && Date.now() - lastFetch.current < STALE_MS) return;
    lastUser.current = userId;
    lastFetch.current = Date.now();
    let alive = true;
    api
      .get('/v1/me/progress')
      .then((p) => alive && setProgress(fromMemberProgress(p)))
      .catch(() => alive && setProgress(null))
      .finally(() => alive && setReady(true));
    return () => {
      alive = false;
    };
  }, [state.status, userId, pathname, tick]);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === 'visible' && Date.now() - lastFetch.current > STALE_MS) setTick((t) => t + 1);
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, []);

  const value = useMemo(() => ({ progress, ready, refresh }), [progress, ready, refresh]);
  return <ProgressCtx.Provider value={value}>{children}</ProgressCtx.Provider>;
}
