'use client';

/**
 * Home "AI credits" rail card (D-044; every member since D-052): today's balance with the bonus credits earned
 * today, progress towards today's practice-goal bonus and the next streak bonus (GET /v1/me/credits/guide), and the
 * way into "What can I do with my credits?". Credits only appear where AI is concerned (design language v3 §1.7):
 * the card says what they are for, and that learning and tests stay free.
 */
import { useEffect, useState } from 'react';
import type { CreditGuide } from '@/platform/shared/api-client';
import { Button } from '@/components/platform/ui/kit/Button';
import { ProgressBar, Skeleton } from '@/components/platform/ui/kit/Display';
import { StatusPill } from '@/components/platform/ui/kit/Lists';
import { RailCard } from '@/components/platform/ui/kit/Rail';
import { IconTile } from '@/components/platform/ui/kit/Tiles';
import { useCredits } from '../ai/CreditsProvider';
import { bonusLines, credits as creditsWord } from '../ai/credit-guide-model';
import { api } from '../lib/api-browser';
import s from './home.module.css';

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
    <RailCard id="credits-title" title="AI credits" data-testid="credits-tile">
      {balance === null ? (
        <Skeleton lines={2} />
      ) : (
        <div className={s.creditsTop}>
          <IconTile icon="sparkles" tint="violet" size="md" />
          <p className={s.creditsLine}>
            <span>
              <b>{creditsWord(balance)}</b> left today
            </span>
            <span className={s.creditsNote}>For Ask AI and Explain. Learning and tests are free.</span>
          </p>
          {bonusToday > 0 && (
            <span className={s.creditsBonus} data-testid="dashboard-bonus-today">
              <StatusPill tone="success">+{bonusToday} bonus today</StatusPill>
            </span>
          )}
        </div>
      )}
      {lines.length > 0 && (
        <ul className={s.bonusList}>
          {lines.map((b) => (
            <li key={b.key} className={s.bonusRow} data-earned={b.earned}>
              <p className={s.bonusTitle}>{b.title}</p>
              <p className={s.bonusDetail}>{b.detail}</p>
              <ProgressBar value={b.current} max={b.target} label={b.title} valueText={`${b.current} of ${b.target}`} hideLabel thin tone={b.earned ? 'success' : 'accent'} />
            </li>
          ))}
        </ul>
      )}
      <Button variant="soft" size="sm" block onClick={openGuide} data-testid="dashboard-credit-guide">
        What can I do with my credits?
      </Button>
    </RailCard>
  );
}
