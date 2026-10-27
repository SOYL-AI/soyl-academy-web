'use client';

/** /me/consent body: log-in prompt for guests, else the consent flow with a safe `next` link (AUTH-13). */
import { useEffect, useState } from 'react';
import { Button } from '@/components/platform/ui/kit/Button';
import { EmptyState, Skeleton } from '@/components/platform/ui/kit/Display';
import { useSession } from '../auth/SessionProvider';
import { RETURN_TO_FALLBACK } from '@/platform/shared/config/security';
import { safeReturnTo } from '../lib/return-to';
import { ConsentFlow } from './ConsentFlow';
import c from './consent.module.css';

/** `?next=` as a same-site path, or null (never the generic fallback: no "Continue" to a page they did not come from). */
export function nextFromSearch(search: string): string | null {
  const raw = new URLSearchParams(search).get('next');
  if (!raw) return null;
  const safe = safeReturnTo(raw);
  return safe === RETURN_TO_FALLBACK && raw !== RETURN_TO_FALLBACK ? null : safe;
}

export function ConsentPageClient() {
  const { state, openLogin } = useSession();
  const [next, setNext] = useState<string | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read ?next once on the client (no server dynamic API needed)
    setNext(nextFromSearch(window.location.search));
  }, []);

  if (state.status === 'loading') return <Skeleton variant="text" lines={3} />;
  if (state.status === 'guest') {
    return (
      <EmptyState
        title="Log in first"
        headingLevel="h2"
        action={<Button onClick={() => openLogin({ reason: 'Log in to turn on AI help, photo doubts and leaderboards.' })}>Log in</Button>}
      >
        Approval belongs to your account. Lessons, practice and tests work without it.
      </EmptyState>
    );
  }
  return (
    <div className={c.page}>
      <ConsentFlow next={next} />
    </div>
  );
}
