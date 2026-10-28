'use client';

/**
 * The signed-in student's own avatar for the app shell (top bar) and pages that show it before their own data
 * arrives. GET /v1/me once per member per page load (the session response has no avatar: API gap noted in the
 * design-system handoff); the picker updates it after a save (`setAvatar`). Guests: null.
 */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { MyAvatar } from '@/platform/shared/api-client';
import { useSession } from '../auth/SessionProvider';
import { api } from '../lib/api-browser';

export interface MyAvatarApi {
  avatar: MyAvatar | null;
  setAvatar: (avatar: MyAvatar) => void;
}

const Ctx = createContext<MyAvatarApi | null>(null);

/** Null outside the provider (tests, galleries) and for guests. */
export function useMyAvatar(): MyAvatarApi | null {
  return useContext(Ctx);
}

export function MyAvatarProvider({ children }: { children: ReactNode }) {
  const { state } = useSession();
  const userId = state.status === 'member' ? state.user.id : null;
  const [mine, setMine] = useState<{ userId: string; avatar: MyAvatar } | null>(null);

  useEffect(() => {
    if (!userId) return;
    let alive = true;
    api
      .get('/v1/me')
      .then((me) => alive && setMine({ userId, avatar: me.avatar }))
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [userId]);

  const value = useMemo<MyAvatarApi>(
    () => ({ avatar: userId && mine?.userId === userId ? mine.avatar : null, setAvatar: (avatar) => userId && setMine({ userId, avatar }) }),
    [mine, userId],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
