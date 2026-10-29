'use client';

/**
 * Dashboard "AI credits" tile (D-044; consented members only): today's balance with the bonus credits earned
 * today, progress towards today's practice-goal bonus and the next streak bonus (GET /v1/me/credits/guide), and the
 * way into "What can I do with my credits?".
 */
import { useEffect, useState } from 'react';
import type { CreditGuide } from '@/platform/shared/api-client';
import { Button } from '@/components/platform/ui/kit/Button';
import { ProgressBar, Skeleton } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { useCredits } from '../ai/CreditsProvider';
import { bonusLines, credits as creditsWord } from '../ai/credit-guide-model';
import { api } from '../lib/api-browser';
import s from './dashboard.module.css';

export function CreditsTile() {
  const { credits, openGuide } = useCredits();
  const [guide, setGuide] = useState<CreditGuide | null | 'error'>(null);
  useEffect(() => {
    let alive = true;
    api
      .get('/v1/me/credits/guide')
      .then((g) => alive && setGuide(g))
      .catch(() => alive && setGuide('error'));
    return () => {
      alive = false;
    };
  }, [credits?.balance]);
  const g = guide && guide !== 'error' ? guide : null;
  const balance = credits?.balance ?? g?.balance ?? null;
  const bonusToday = credits?.bonusToday ?? g?.bonusToday ?? 0;
  const lines = g ? bonusLines(g) : [];
  return (
    <section className={s.tile} aria-labelledby="credits-title" data-testid="credits-tile">
      <div className={s.tileHead}>
        <h2 id="credits-title" className={s.tileTitle}>
          AI credits
        </h2>
      </div>
      {balance === null ? (
        <Skeleton lines={2} />
      ) : (
        <p className={s.creditsLine}>
          <Icon name="spark" size={20} className={s.creditsSpark} /> <b className={s.ink}>{creditsWord(balance)}</b> left today
          {bonusToday > 0 && (
            <span className={s.bonusPill} data-testid="dashboard-bonus-today">
              +{bonusToday} bonus today
            </span>
          )}
        </p>
      )}
      {lines.map((b) => (
        <div key={b.key} className={s.bonusRow} data-earned={b.earned}>
          <p className={s.muted}>
            <b className={s.ink}>{b.title}</b>
            <br />
            {b.detail}
          </p>
          <ProgressBar value={b.current} max={b.target} label={b.title} valueText={`${b.current} of ${b.target}`} hideLabel thin tone={b.earned ? 'success' : 'accent'} />
        </div>
      ))}
      <Button variant="secondary" size="sm" onClick={openGuide} data-testid="dashboard-credit-guide">
        What can I do with my credits?
      </Button>
    </section>
  );
}
