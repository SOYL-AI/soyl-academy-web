'use client';

/**
 * Session state for platform pages (ARCHITECTURE §5, backend handoff "How web-platform should call auth").
 *
 * - State comes from GET /v1/session; the session itself is only the HttpOnly cookie (WEB-5).
 * - `openLogin()` shows the login sheet; after sign-in the student returns exactly where they were
 *   (CONTEXT §5) through `safeReturnTo` (AUTH-13, WEB-8).
 * - Guest progress (`soyl_guest_v1`) is merged once after sign-in (POST /v1/me/merge-guest, idempotent).
 * - Logout (WEB-9): API sign-out, in-memory state cleared, platform caches deleted; guest data untouched.
 * - Google sign-in returns with `?authError=` / `?linked=`; they are read once and removed from the URL.
 */
import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { ConsentState, SessionUser, SignInResponse } from '@/platform/shared/api-client';
import { useToast } from '@/components/platform/ui/kit/Toast';
import { api } from '../lib/api-browser';
import { afterMerge, hasMergeableProgress, readGuestProgress, writeGuestProgress } from '../lib/guest-storage';
import { googleErrorMessage } from '../lib/problems';
import { currentReturnTo, safeReturnTo, takeAuthResult } from '../lib/return-to';

const LoginSheet = dynamic(() => import('./LoginSheet').then((m) => m.LoginSheet), { ssr: false });

export type SessionState =
  | { status: 'loading' }
  | { status: 'guest' }
  | { status: 'member'; user: SessionUser; consent: ConsentState | null };

export interface LoginRequest {
  /** One line on why logging in helps here ("Log in to take this test"). */
  reason?: string;
  /** Where to come back to; defaults to the current page. Always passed through safeReturnTo. */
  returnTo?: string;
  /** An error to show when the sheet opens (e.g. from a Google redirect). */
  error?: string;
}

export interface SessionApi {
  state: SessionState;
  refresh: () => Promise<SessionState>;
  openLogin: (req?: LoginRequest) => void;
  signOut: () => Promise<void>;
  /** Called by the login forms after a successful OTP verify. */
  completeSignIn: (res: SignInResponse, returnTo: string) => Promise<void>;
  /** Replace the user after a profile edit. */
  updateUser: (user: Partial<SessionUser>) => void;
  /** Forget the session locally (after account deletion). */
  clearLocal: () => void;
}

const SessionContext = createContext<SessionApi | null>(null);

export function useSession(): SessionApi {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used inside <SessionProvider>');
  return ctx;
}

/** Pages that make no sense without an account; logout leaves them for /learn. */
const MEMBER_ONLY_PREFIXES = ['/me', '/tests/attempt', '/tests/result', '/tests/builder', '/admin'];

async function clearPlatformCaches(): Promise<void> {
  // WEB-10: the test player's offline answer queues (IndexedDB) leave the device at logout.
  try {
    await (await import('../tests/idb-storage')).clearAllTestQueues();
  } catch {
    // nothing stored
  }
  try {
    if (typeof caches === 'undefined') return;
    for (const key of await caches.keys()) if (key.startsWith('soyl')) await caches.delete(key);
  } catch {
    // Cache Storage unavailable: nothing cached.
  }
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SessionState>({ status: 'loading' });
  const [login, setLogin] = useState<(LoginRequest & { open: boolean; key: number }) | null>(null);
  const loginKey = useRef(0);
  const router = useRouter();
  const pathname = usePathname();
  const toast = useToast();
  const merging = useRef<string | null>(null);

  const mergeGuest = useCallback(async (userId: string) => {
    if (merging.current === userId) return;
    const progress = readGuestProgress();
    if (!hasMergeableProgress(progress)) return;
    merging.current = userId;
    try {
      const res = await api.post('/v1/me/merge-guest', { body: progress });
      if (res.merged || res.alreadyMerged) {
        writeGuestProgress(afterMerge(readGuestProgress()));
        if (res.merged && res.lessonsCompleted + res.practiceCorrect > 0) {
          toast.show({ title: 'Your progress is saved', description: 'What you did before logging in is now in your account.', tone: 'success' });
        }
      }
    } catch {
      // Keep the guest data and try again next time (merge is idempotent on the server).
      merging.current = null;
    }
  }, [toast]);

  const refresh = useCallback(async (): Promise<SessionState> => {
    try {
      const res = await api.get('/v1/session');
      const next: SessionState = res.authenticated && res.user ? { status: 'member', user: res.user, consent: res.consent } : { status: 'guest' };
      setState(next);
      if (next.status === 'member') void mergeGuest(next.user.id);
      return next;
    } catch {
      const next: SessionState = { status: 'guest' };
      setState(next);
      return next;
    }
  }, [mergeGuest]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch of GET /v1/session; state is set after the response
    void refresh();
  }, [refresh]);

  const openLogin = useCallback((req: LoginRequest = {}) => {
    setLogin({ ...req, key: ++loginKey.current, returnTo: safeReturnTo(req.returnTo ?? currentReturnTo()), open: true });
  }, []);

  // Google sign-in comes back to the original page with ?authError= or ?linked= (backend handoff).
  useEffect(() => {
    const { authError, linked, cleaned } = takeAuthResult(window.location.href);
    if (cleaned === null) return;
    window.history.replaceState(window.history.state, '', cleaned);
    if (authError) {
      setLogin({ open: true, key: ++loginKey.current, returnTo: currentReturnTo(), error: googleErrorMessage(authError) });
    } else if (linked) {
      toast.show({ title: 'Google is connected to your account', tone: 'success' });
    }
  }, [toast]);

  const completeSignIn = useCallback(
    async (res: SignInResponse, returnTo: string) => {
      setState({ status: 'member', user: res.user, consent: res.consent });
      setLogin(null);
      await mergeGuest(res.user.id);
      toast.show({ title: res.isNewUser ? 'Welcome to SOYL Academy!' : 'You are logged in', tone: 'success' });
      const target = safeReturnTo(res.returnTo || returnTo);
      const here = `${window.location.pathname}${window.location.search}`;
      if (target === here) router.refresh();
      else router.push(target);
    },
    [mergeGuest, router, toast],
  );

  const clearLocal = useCallback(() => {
    merging.current = null;
    setState({ status: 'guest' });
  }, []);

  const signOut = useCallback(async () => {
    try {
      await api.post('/v1/auth/sign-out');
    } catch {
      // The server clears the cookie when it can; locally we forget the session either way.
    }
    clearLocal();
    await clearPlatformCaches();
    toast.show({ title: 'You are logged out' });
    if (MEMBER_ONLY_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) router.push('/learn');
    else router.refresh();
  }, [clearLocal, pathname, router, toast]);

  const updateUser = useCallback((patch: Partial<SessionUser>) => {
    setState((s) => (s.status === 'member' ? { ...s, user: { ...s.user, ...patch } } : s));
  }, []);

  const value = useMemo<SessionApi>(
    () => ({ state, refresh, openLogin, signOut, completeSignIn, updateUser, clearLocal }),
    [state, refresh, openLogin, signOut, completeSignIn, updateUser, clearLocal],
  );

  return (
    <SessionContext.Provider value={value}>
      {children}
      {login && (
        <LoginSheet
          key={login.key}
          open={login.open}
          reason={login.reason}
          initialError={login.error}
          returnTo={login.returnTo ?? '/learn'}
          onClose={() => setLogin(null)}
          onSignedIn={completeSignIn}
        />
      )}
    </SessionContext.Provider>
  );
}
