'use client';

/**
 * Today's AI credits for the header chip and every AI action (ai-gateway M4 handoff "What web needs" §2):
 * GET /v1/credits once per page load for members whose parent approved AI (D-014); afterwards the
 * balance comes from the SSE `meta`/`done` events and 202 job responses (`setBalance`).
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Credits } from '@/platform/shared/api-client';
import { useSession } from '../auth/SessionProvider';
import { api } from '../lib/api-browser';

export interface CreditsApi {
  credits: Credits | null;
  /** True when the student may use AI at all (member with consent granted). */
  aiAllowed: boolean;
  refresh: () => Promise<Credits | null>;
  setBalance: (balance: number) => void;
}

const CreditsContext = createContext<CreditsApi | null>(null);

export function useCredits(): CreditsApi {
  const ctx = useContext(CreditsContext);
  if (!ctx) throw new Error('useCredits must be used inside <CreditsProvider>');
  return ctx;
}

export function CreditsProvider({ children }: { children: ReactNode }) {
  const { state } = useSession();
  const [credits, setCredits] = useState<Credits | null>(null);
  const aiAllowed = state.status === 'member' && state.consent === 'granted';
  const userId = state.status === 'member' ? state.user.id : null;

  const refresh = useCallback(async () => {
    try {
      const c = await api.get('/v1/credits');
      setCredits(c);
      return c;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (!userId || !aiAllowed) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- forget the balance when the member or consent changes
      setCredits(null);
      return;
    }
    void refresh();
  }, [userId, aiAllowed, refresh]);

  const setBalance = useCallback((balance: number) => {
    if (!Number.isFinite(balance)) return;
    setCredits((c) => (c ? { ...c, balance } : c));
  }, []);

  const value = useMemo(() => ({ credits, aiAllowed, refresh, setBalance }), [credits, aiAllowed, refresh, setBalance]);
  return <CreditsContext.Provider value={value}>{children}</CreditsContext.Provider>;
}
