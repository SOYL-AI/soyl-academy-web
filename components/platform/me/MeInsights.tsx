'use client';

/**
 * /me learning profile (ADR-023): the private player card (FUT style, GET /v1/me/card), the activity heatmap
 * with streak and totals (LeetCode style, GET /v1/me/activity, IST days), solved questions per subject
 * (GET /v1/me/progress) and badges (GET /v1/me/badges). Plus the Appearance setting (Light / Dark / System).
 * Every block has its own empty and error state; nothing here is shown to anyone else.
 */
import { useEffect, useState } from 'react';
import type { Schemas } from '@/platform/shared/api-client';

type MyBadges = Schemas['MyBadges'];
import { Card, CardTitle, Skeleton } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { api } from '../lib/api-browser';
import { useLearnerProgress } from '../learn/ProgressProvider';
import { useActivity, usePlayerCard } from '../learn/useInsights';
import { ThemeOptions } from '../shell/ThemeToggle';
import { Heatmap } from './Heatmap';
import { BlankPlayerCard, CardAttributes, PlayerCard } from './PlayerCard';
import shellCss from '../shell/appshell.module.css';
import s from './me.module.css';

export function MeInsights() {
  return (
    <div className={s.insights}>
      <PlayerCardSection />
      <ActivitySection />
      <SolvedSection />
      <BadgesSection />
    </div>
  );
}

function PlayerCardSection() {
  const card = usePlayerCard();
  return (
    <Card as="section" aria-labelledby="card-title" id="card" className={s.cardSection} data-testid="card-section">
      <CardTitle as="h2" id="card-title">
        Your player card
      </CardTitle>
      {card.status === 'loading' ? (
        <Skeleton variant="block" height={300} />
      ) : card.status === 'ready' && card.data.attributes.length > 0 ? (
        <div className={s.cardLayout}>
          <PlayerCard card={card.data} />
          <div className={s.cardSide}>
            <CardAttributes card={card.data} />
            <p className={s.muted}>
              {card.data.provisional ? 'Provisional: keep learning for a few more days to settle your rating. ' : ''}
              Only you can see this card. It is worked out from your own learning, the same way for everyone, and it changes as you learn.
            </p>
          </div>
        </div>
      ) : (
        <div className={s.cardLayout}>
          <BlankPlayerCard title={card.status === 'error' ? 'Your card could not load' : 'Solve 10 practice questions to get your first rating'} />
          <p className={s.muted}>
            Your card rates accuracy, consistency, breadth, mastery and tests from 40 to 99, with bronze, silver, gold and elite frames. Only you can see it.
          </p>
        </div>
      )}
    </Card>
  );
}

function ActivitySection() {
  const activity = useActivity();
  const { progress } = useLearnerProgress();
  const streak = activity.status === 'ready' ? activity.data.streak : progress?.streak;
  return (
    <Card as="section" aria-labelledby="activity-title" id="activity" data-testid="activity-section">
      <CardTitle as="h2" id="activity-title">
        Activity
      </CardTitle>
      <ul className={s.statRow}>
        <li>
          <Icon name="flame" size={20} className={s.flame} />
          <b>{streak?.current ?? 0}</b> day streak
        </li>
        <li>
          <b>{streak?.longest ?? 0}</b> longest
        </li>
        {activity.status === 'ready' && (
          <>
            <li>
              <b>{activity.data.totals.solved}</b> solved
            </li>
            <li>
              <b>{activity.data.totals.lessonsCompleted}</b> lessons
            </li>
            <li>
              <b>{activity.data.totals.testsSubmitted}</b> tests
            </li>
          </>
        )}
      </ul>
      {activity.status === 'ready' ? (
        <Heatmap activity={activity.data} />
      ) : activity.status === 'error' ? (
        <p className={s.muted}>We could not load your activity. Try again later.</p>
      ) : (
        <Skeleton variant="block" height={120} />
      )}
    </Card>
  );
}

function SolvedSection() {
  const { progress, ready } = useLearnerProgress();
  const rows = (progress?.subjects ?? [])
    .map((sub) => ({ id: sub.subjectId, name: sub.name ?? sub.subjectId, solved: sub.chapters.reduce((n, c) => n + c.correct, 0), answered: sub.chapters.reduce((n, c) => n + c.answered, 0) }))
    .filter((r) => r.answered > 0)
    .sort((a, b) => b.solved - a.solved);
  const max = Math.max(1, ...rows.map((r) => r.solved));
  return (
    <Card as="section" aria-labelledby="solved-title" data-testid="solved-section">
      <CardTitle as="h2" id="solved-title">
        Solved by subject
      </CardTitle>
      {!ready ? (
        <Skeleton lines={3} />
      ) : rows.length === 0 ? (
        <p className={s.muted}>Questions you get right in practice are counted here.</p>
      ) : (
        <ul className={s.solvedList}>
          {rows.map((r) => (
            <li key={r.id}>
              <span className={s.solvedHead}>
                <span>{r.name}</span>
                <span>
                  <b>{r.solved}</b> solved · {r.answered} tried
                </span>
              </span>
              <span className={s.solvedTrack} aria-hidden="true">
                <span className={s.solvedFill} style={{ width: `${Math.round((r.solved / max) * 100)}%` }} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function BadgesSection() {
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
        <ul className={s.badgeGrid}>
          {badges.map((b) => (
            <li key={b.key} className={s.badge} data-awarded={b.awarded}>
              <span className={s.badgeIcon} aria-hidden="true">
                <Icon name={b.awarded ? 'trophy' : 'lock'} size={20} />
              </span>
              <span className={s.badgeName}>{b.name}</span>
              <span className={s.badgeDesc}>{b.description}</span>
              <span className="p-visually-hidden">{b.awarded ? 'Earned' : 'Not earned yet'}</span>
            </li>
          ))}
        </ul>
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
