'use client';

/**
 * Today's daily challenge on the learn hub (ADR-021 §2): one question per subject of a board and class,
 * new every IST day (GET /v1/coins/daily-challenge; guests may look). The first right answer of the day
 * pays the challenge coins (at most `awardsPerDay` a day). Members also check in here.
 */
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import type { DailyChallenge, DailyChallengeEntry, PracticeAnswerResult } from '@/platform/shared/api-client';
import { Button } from '@/components/platform/ui/kit/Button';
import { Badge } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { useSession } from '../auth/SessionProvider';
import { api } from '../lib/api-browser';
import { learnPath, type BoardSlug } from '../lib/catalog';
import { CheckIn } from './CheckIn';
import { coinsText, formatSpan } from './coins-format';
import { useNow } from './useNow';
import s from './coins.module.css';

const ChallengeSolver = dynamic(() => import('./ChallengeSolver').then((m) => m.ChallengeSolver), { ssr: false });

export interface DailyChallengeCardProps {
  /** Omit both to use the member's profile (the card hides itself when no class is known). */
  board?: BoardSlug;
  classLevel?: number;
}

export function DailyChallengeCard({ board, classLevel }: DailyChallengeCardProps) {
  const { state, openLogin } = useSession();
  const now = useNow();
  const [data, setData] = useState<DailyChallenge | null>(null);
  const [open, setOpen] = useState<DailyChallengeEntry | null>(null);
  const [solvedNow, setSolvedNow] = useState<Record<string, boolean>>({});
  const [earnedNow, setEarnedNow] = useState(0);
  const member = state.status === 'member';

  useEffect(() => {
    if (state.status === 'loading') return;
    let alive = true;
    api
      .get('/v1/coins/daily-challenge', { query: board && classLevel ? { board, class: classLevel } : {} })
      .then((d) => {
        if (!alive) return;
        setData(d);
        setSolvedNow({});
        setEarnedNow(0);
      })
      .catch(() => alive && setData(null));
    return () => {
      alive = false;
    };
  }, [state.status, board, classLevel]);

  const onAnswered = useCallback((entry: DailyChallengeEntry, r: PracticeAnswerResult) => {
    if (r.correct === true) setSolvedNow((m) => ({ ...m, [entry.question.id]: true }));
    const paid = (r.coinAwards ?? []).filter((a) => a.source === 'daily_challenge').reduce((n, a) => n + a.amount, 0);
    if (paid > 0) setEarnedNow((n) => n + 1);
  }, []);

  if (!data || data.status !== 'ok' || data.challenges.length === 0 || !data.board || !data.classLevel) return null;
  const earned = (data.earnedToday ?? 0) + earnedNow;
  const done = member && earned >= data.awardsPerDay;
  const resetIn = now !== null ? formatSpan(Date.parse(data.resetsAt) - now) : null;
  const dBoard = data.board;
  const dClass = data.classLevel;

  return (
    <section className={s.challenge} aria-labelledby="challenge-title" data-testid="daily-challenge" data-earned={done ? 'true' : 'false'}>
      <div className={s.challengeHead}>
        <h2 id="challenge-title" className={s.challengeTitle}>
          <Icon name="coin" size={22} className={s.coinIcon} /> Daily challenge
        </h2>
        <Badge tone="highlight">+{coinsText(data.coins)}</Badge>
      </div>
      <p className={s.challengeLead} aria-live="polite" data-testid="challenge-status">
        {!member
          ? 'One question per subject, new every day. Log in to earn coins for solving it.'
          : done
            ? 'You earned today’s challenge coins. The others are still good practice.'
            : `Get any one right today for +${coinsText(data.coins)}.`}
        {resetIn ? ` New questions in ${resetIn}.` : ''}
      </p>
      {member ? (
        <CheckIn compact />
      ) : (
        state.status === 'guest' && (
          <Button size="sm" variant="secondary" onClick={() => openLogin({ reason: 'Log in to earn SOYL Coins for the daily challenge. It is free.' })} data-testid="challenge-login">
            Log in to earn coins
          </Button>
        )
      )}
      <ul className={s.challengeList}>
        {data.challenges.map((c) => {
          const solved = solvedNow[c.question.id] === true || c.solved === true;
          return (
            <li key={c.question.id} className={s.challengeItem} data-testid="challenge-item" data-question-type={c.question.type} data-solved={solved ? 'true' : 'false'}>
              <span className={s.challengeMain}>
                <span className={s.challengeSubject}>{c.subjectName}</span>
                <span className={s.small}>{c.chapterTitle}</span>
              </span>
              {solved && (
                <Badge tone="success" icon="check">
                  Solved
                </Badge>
              )}
              <Button size="sm" variant={solved ? 'ghost' : 'primary'} onClick={() => setOpen(c)} aria-label={`${solved ? 'Solve again' : 'Solve'}: ${c.subjectName} daily challenge`}>
                {solved ? 'Again' : 'Solve'}
              </Button>
            </li>
          );
        })}
      </ul>
      {open && (
        <ChallengeSolver
          entry={open}
          practiceHref={`${learnPath(dBoard, dClass, open.subjectId, open.chapterId)}/practice`}
          onClose={() => setOpen(null)}
          onAnswered={(r) => onAnswered(open, r)}
        />
      )}
    </section>
  );
}
