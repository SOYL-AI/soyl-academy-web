'use client';

/**
 * Learning profile blocks for /me (ADR-023, design language v3 §10): `ActivitySummary` (streak, totals and the
 * player card's rating, with a link to Progress; GET /v1/me/activity, /v1/me/card), `BadgesSection`
 * (GET /v1/me/badges) and the Appearance setting (Light / Dark / System). Every block has its own empty and error
 * state; nothing here is shown to anyone else. The full analytics, the heatmap and the player card with its radar
 * live on /me/progress (components/platform/progress/, card section anchor `/me/progress#card`).
 */
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Schemas } from '@/platform/shared/api-client';

type MyBadges = Schemas['MyBadges'];
import { ButtonLink } from '@/components/platform/ui/kit/ButtonLink';
import { Card, CardTitle, Skeleton } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { RailCard } from '@/components/platform/ui/kit/Rail';
import { api } from '../lib/api-browser';
import { useLearnerProgress } from '../learn/ProgressProvider';
import { useActivity, usePlayerCard } from '../learn/useInsights';
import { isRatedCard } from '../progress/progress-model';
import { ThemeOptions } from '../shell/ThemeToggle';
import shellCss from '../shell/appshell.module.css';
import s from './me.module.css';

// Medal art for the 12 badges loads after the page (it is below the fold on phones).
const BadgeGrid = dynamic(() => import('./BadgeGrid').then((m) => m.BadgeGrid), { ssr: false, loading: () => <Skeleton lines={2} /> });

export interface ActivityFigures {
  streak: number;
  longest: number;
  solved: number | null;
  lessons: number | null;
  tests: number | null;
}

/** The /me summary's figures: only what is known (null = still loading or not available; pure; tested). */
export function activityFigures(streak: { current?: number; longest?: number } | null | undefined, totals: { solved: number; lessonsCompleted: number; testsSubmitted: number } | null): ActivityFigures {
  return {
    streak: streak?.current ?? 0,
    longest: streak?.longest ?? 0,
    solved: totals ? totals.solved : null,
    lessons: totals ? totals.lessonsCompleted : null,
    tests: totals ? totals.testsSubmitted : null,
  };
}

/**
 * /me "Your learning" (anchor #activity): streak, totals and the player card's rating in a few numbers, and the way to
 * /me/progress, where the heatmap, the card and the per-subject charts live (DESIGN-LANGUAGE §10 "Progress").
 */
export function ActivitySummary() {
  const activity = useActivity();
  const card = usePlayerCard();
  const { progress } = useLearnerProgress();
  const streak = activity.status === 'ready' ? activity.data.streak : progress?.streak;
  const f = activityFigures(streak, activity.status === 'ready' ? activity.data.totals : null);
  const rated = card.status === 'ready' && isRatedCard(card.data) ? card.data : null;
  const cell = (value: number | null) => (value === null ? '–' : value.toLocaleString('en-IN'));
  return (
    <RailCard id="activity" title="Your learning" data-testid="activity-section">
      <p className={s.streakLine}>
        <Icon name="flame" size={22} className={s.flame} />
        <span>
          <b>{f.streak}</b> day streak{f.longest > f.streak ? ` · best ${f.longest}` : ''}
        </span>
      </p>
      <dl className={s.figures}>
        <div>
          <dt>Solved</dt>
          <dd>{cell(f.solved)}</dd>
        </div>
        <div>
          <dt>Lessons</dt>
          <dd>{cell(f.lessons)}</dd>
        </div>
        <div>
          <dt>Tests</dt>
          <dd>{cell(f.tests)}</dd>
        </div>
      </dl>
      {activity.status === 'error' && <p className={s.muted}>We could not load your activity. Try again later.</p>}
      {card.status === 'ready' && (
        <p className={s.muted} data-testid="card-rating">
          {rated ? (
            <>
              Player card: <b className={s.ink}>{rated.overall}</b> overall.{' '}
            </>
          ) : (
            'Your player card is not rated yet. '
          )}
          <Link href="/me/progress#card" prefetch={false} className={s.textLink} data-testid="card-link">
            See your card
          </Link>
        </p>
      )}
      {/* prefetch off like the shell's PROGRESS_NAV: a prefetched /me/progress kept members' pages from going network-idle before that page existed (design-system v3 handoff). */}
      <ButtonLink href="/me/progress" variant="soft" icon="chart" block data-testid="progress-link">
        See all your progress
      </ButtonLink>
    </RailCard>
  );
}

export function BadgesSection() {
  const [badges, setBadges] = useState<MyBadges['badges'] | null | 'error'>(null);
  useEffect(() => {
    let alive = true;
    api
      .get('/v1/me/badges')
      .then((b) => alive && setBadges(b.badges))
      .catch(() => alive && setBadges('error'));
    return () => {
      alive = false;
    };
  }, []);
  const earned = Array.isArray(badges) ? badges.filter((b) => b.awarded).length : 0;
  return (
    <Card as="section" aria-labelledby="badges-title" id="badges" data-testid="badges-section">
      <CardTitle as="h2" id="badges-title">
        Badges {Array.isArray(badges) && <span className={s.countNote}>{earned} of {badges.length}</span>}
      </CardTitle>
      {badges === null ? (
        <Skeleton lines={2} />
      ) : badges === 'error' || badges.length === 0 ? (
        <p className={s.muted}>Badges you earn by learning show here.</p>
      ) : (
        <BadgeGrid badges={badges} />
      )}
    </Card>
  );
}

export function AppearanceCard() {
  return (
    <Card as="section" aria-labelledby="appearance-title" data-testid="appearance">
      <CardTitle as="h2" id="appearance-title">
        Appearance
      </CardTitle>
      <p className={s.muted}>System follows your phone or computer. Saved on this device.</p>
      <ThemeOptions legend="Theme" className={shellCss.themeInline} />
    </Card>
  );
}
