'use client';

import { useEffect, useState } from 'react';

/**
 * The current time, set only after mount (server HTML never contains a time, so hydration never
 * disagrees) and refreshed every `everyMs`.
 */
export function useNow(everyMs = 30_000): number | null {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, everyMs);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, [everyMs]);
  return now;
}
