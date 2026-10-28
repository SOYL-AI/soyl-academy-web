'use client';

/**
 * Shows celebrations requested with `celebrate()` (events.ts), one at a time. Lives in the app shell; the
 * visuals (Celebration.tsx) load only when the first celebration happens, so no page pays for them up front.
 */
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { CELEBRATE_EVENT, type Celebration } from './events';

const CelebrationView = dynamic(() => import('./Celebration').then((m) => m.CelebrationView), { ssr: false });

const SHOW_MS = 2800;

export function CelebrationHost() {
  const [queue, setQueue] = useState<Array<Celebration & { id: number }>>([]);
  useEffect(() => {
    let id = 0;
    const on = (e: Event) => {
      const detail = (e as CustomEvent<Celebration>).detail;
      if (detail) setQueue((q) => [...q.slice(-3), { ...detail, id: ++id }]);
    };
    window.addEventListener(CELEBRATE_EVENT, on);
    return () => window.removeEventListener(CELEBRATE_EVENT, on);
  }, []);
  const current = queue[0];
  useEffect(() => {
    if (!current) return;
    const t = window.setTimeout(() => setQueue((q) => q.slice(1)), SHOW_MS);
    return () => window.clearTimeout(t);
  }, [current]);
  return current ? <CelebrationView key={current.id} celebration={current} /> : null;
}
