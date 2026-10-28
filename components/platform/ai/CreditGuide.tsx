'use client';

/**
 * "What can I do with my credits?" (D-044): every AI action with its price, whether the student's plan has it and
 * about how many are left today, the two learning bonuses with today's progress, and the daily credits of each plan.
 * GET /v1/me/credits/guide (members with consent). Loaded lazily: the header credit chip, the paywall and quote
 * dialogs and /me open it (CreditsProvider.openGuide).
 */
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { CreditGuide as Guide } from '@/platform/shared/api-client';
import { Button } from '@/components/platform/ui/kit/Button';
import { formatCountdown } from '@/components/platform/ui/kit/CreditChip';
import { Dialog } from '@/components/platform/ui/kit/Dialog';
import { ProgressBar, Skeleton } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { api } from '../lib/api-browser';
import { balanceLine, bonusLines, guideRows } from './credit-guide-model';
import s from './credits.module.css';

export function useCreditGuide(enabled = true): Guide | null | 'error' {
  const [guide, setGuide] = useState<Guide | null | 'error'>(null);
  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    api
      .get('/v1/me/credits/guide')
      .then((g) => alive && setGuide(g))
      .catch(() => alive && setGuide('error'));
    return () => {
      alive = false;
    };
  }, [enabled]);
  return guide;
}

export function CreditGuidePanel({ guide, headingLevel: H = 'h3' }: { guide: Guide; headingLevel?: 'h2' | 'h3' }) {
  const rows = guideRows(guide);
  const bonuses = bonusLines(guide);
  return (
    <div className={s.guide} data-testid="credit-guide">
      <p className={s.balance}>
        <Icon name="spark" size={18} className={s.spark} /> <strong>{balanceLine(guide)}</strong> Resets in {formatCountdown(guide.resetInSeconds * 1000)} (00:00 IST). 1 credit is ₹{(guide.creditValuePaise / 100).toFixed(2)} of AI.
      </p>
      <ul className={s.actions} aria-label="AI actions and their prices">
        {rows.map((r) => (
          <li key={r.action} className={s.action} data-allowed={r.allowed} data-action={r.action}>
            <span className={s.actionHead}>
              <span className={s.actionName}>{r.label}</span>
              <span className={s.price}>{r.price}</span>
            </span>
            <span className={s.actionGuide}>{r.guide}</span>
            <span className={s.left} data-testid={`guide-left-${r.action}`}>
              {!r.allowed && <Icon name="lock" size={14} />} {r.left}
            </span>
          </li>
        ))}
      </ul>
      {bonuses.length > 0 && (
        <section aria-labelledby="bonus-title" className={s.bonuses} data-testid="credit-bonuses">
          <H id="bonus-title" className={s.subTitle}>
            Bonus credits for learning
          </H>
          <ul className={s.bonusList}>
            {bonuses.map((b) => (
              <li key={b.key} data-earned={b.earned}>
                <span className={s.bonusTitle}>
                  {b.earned && <Icon name="checkCircle" size={16} className={s.earned} />} {b.title}
                </span>
                <span className={s.muted}>{b.detail}</span>
                <ProgressBar value={b.current} max={b.target} label={b.title} valueText={`${b.current} of ${b.target}`} hideLabel thin tone={b.earned ? 'success' : 'accent'} />
              </li>
            ))}
          </ul>
          <p className={s.muted}>Bonus credits are for that day only and reset at midnight with the rest. SOYL Coins never turn into credits.</p>
        </section>
      )}
      <section aria-labelledby="plans-title">
        <H id="plans-title" className={s.subTitle}>
          Daily AI credits by plan
        </H>
        <ul className={s.planList}>
          {guide.plans.map((p) => (
            <li key={p.id} data-current={p.id === guide.plan || undefined}>
              <span>{p.name}</span> <strong>{p.creditsPerDay}</strong>
              {p.id === guide.plan && <span className={s.you}> your plan</span>}
            </li>
          ))}
        </ul>
        <p className={s.muted}>Lessons, practice and tests are always free; credits are only for AI help.</p>
      </section>
    </div>
  );
}

export function CreditGuideDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const guide = useCreditGuide(open);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="What can I do with my credits?"
      footer={
        <>
          <Link href="/me#credits" className={s.footerLink} onClick={onClose}>
            Your usage, day by day
          </Link>
          <Link href="/plans" className={s.footerLink} onClick={onClose}>
            See plans
          </Link>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </>
      }
    >
      {guide === null ? (
        <div aria-busy="true">
          <Skeleton lines={5} />
        </div>
      ) : guide === 'error' ? (
        <p className={s.muted}>We could not load your credits. Check your connection and try again.</p>
      ) : (
        <CreditGuidePanel guide={guide} />
      )}
    </Dialog>
  );
}
