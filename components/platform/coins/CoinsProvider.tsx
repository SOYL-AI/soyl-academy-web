'use client';

/**
 * SOYL Coins for the header chip and every page that earns or spends (ADR-020): GET /v1/coins once per
 * page load for members (guests have no coins), then kept current from the responses that carry a balance
 * (check-in, redeem, cancel) or an award (practice answers, test submits: `addEarned`).
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { CoinsSummary } from '@/platform/shared/api-client';
import { useSession } from '../auth/SessionProvider';
import { api } from '../lib/api-browser';

export interface CoinsApi {
  /** Null for guests, while loading, or when the API could not be reached. */
  summary: CoinsSummary | null;
  balance: number | null;
  refresh: () => Promise<CoinsSummary | null>;
  /** Set the balance from a response that carries it (check-in, redeem, cancel). */
  setBalance: (balance: number) => void;
  /** Add coins an event just paid (practice answer, test submit) and refresh today's numbers quietly. */
  addEarned: (coins: number) => void;
}

const CoinsContext = createContext<CoinsApi | null>(null);

export function useCoins(): CoinsApi {
  const ctx = useContext(CoinsContext);
  if (!ctx) throw new Error('useCoins must be used inside <CoinsProvider>');
  return ctx;
}

/** For components that also render outside the platform layout (tests, galleries): null when absent. */
export function useOptionalCoins(): CoinsApi | null {
  return useContext(CoinsContext);
}

export function CoinsProvider({ children }: { children: ReactNode }) {
  const { state } = useSession();
  const [summary, setSummary] = useState<CoinsSummary | null>(null);
  const userId = state.status === 'member' ? state.user.id : null;

  const refresh = useCallback(async () => {
    try {
      const c = await api.get('/v1/coins');
      setSummary(c);
      return c;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (!userId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- forget the coins when the member changes
      setSummary(null);
      return;
    }
    void refresh();
  }, [userId, refresh]);

  const setBalance = useCallback((balance: number) => {
    if (!Number.isFinite(balance)) return;
    setSummary((c) => (c ? { ...c, balance } : c));
  }, []);

  const addEarned = useCallback(
    (coins: number) => {
      if (!Number.isFinite(coins) || coins <= 0) return;
      setSummary((c) => (c ? { ...c, balance: c.balance + coins, lifetimeEarned: c.lifetimeEarned + coins } : c));
      void refresh();
    },
    [refresh],
  );

  const value = useMemo(() => ({ summary, balance: summary?.balance ?? null, refresh, setBalance, addEarned }), [summary, refresh, setBalance, addEarned]);
  return <CoinsContext.Provider value={value}>{children}</CoinsContext.Provider>;
}
