'use client';

/**
 * /tests — the test series catalogue (ARCHITECTURE §3.1: public list, login to start). Pick a board and
 * class (defaults: the student's profile), then a subject; plus the custom builder, live mocks and your
 * recent attempts. Subjects come from the public catalog API.
 */
import Link from 'next/link';
import { useEffect, useId, useState } from 'react';
import type { CatalogSubjects, MyAttempt } from '@/platform/shared/api-client';
import { Badge, EmptyState, Skeleton } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { useSession } from '../auth/SessionProvider';
import { api } from '../lib/api-browser';
import { BOARDS, BOARD_NAMES, CLASS_LEVELS, examLabel, subjectSlug, type BoardSlug } from '../lib/catalog';
import { attemptPath, resultPath, scoreText } from './player-model';
import s from './tests.module.css';

export function seriesPath(board: BoardSlug, classLevel: number, subjectId: string): string {
  return `/tests/series/${board}/${classLevel}/${subjectSlug(subjectId)}`;
}

export function TestsHome() {
  const { state } = useSession();
  const boardId = useId();
  const classId = useId();
  const [board, setBoard] = useState<BoardSlug>('cbse');
  const [classLevel, setClassLevel] = useState(10);
  const [subjects, setSubjects] = useState<CatalogSubjects | null>(null);
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState<MyAttempt[] | null>(null);

  const user = state.status === 'member' ? state.user : null;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- default to the student's profile once the session is known
    if (user?.board && (BOARDS as readonly string[]).includes(user.board)) setBoard(user.board as BoardSlug);
    if (user?.classLevel) setClassLevel(user.classLevel);
  }, [user?.board, user?.classLevel]);

  useEffect(() => {
    let alive = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reload when board/class change
    setSubjects(null);
    setError(false);
    api
      .get('/v1/catalog/{board}/{class}/subjects', { params: { board, class: classLevel } })
      .then((r) => alive && setSubjects(r))
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
  }, [board, classLevel]);

  useEffect(() => {
    if (!user) return;
    let alive = true;
    api
      .get('/v1/me/attempts', { query: { limit: 5 } })
      .then((r) => alive && setAttempts(r.attempts))
      .catch(() => alive && setAttempts([]));
    return () => {
      alive = false;
    };
  }, [user]);

  return (
    <div className={s.stack}>
      <ul className={s.cards}>
        <li>
          <Link href="/tests/builder" className={s.linkCard}>
            <span className={s.linkTitle}>
              <Icon name="plus" size={18} /> Build your own test
            </span>
            <span className={s.meta}>Pick chapters and question types. Free.</span>
          </Link>
        </li>
        <li>
          <Link href="/leaderboard" className={s.linkCard}>
            <span className={s.linkTitle}>
              <Icon name="trophy" size={18} /> Leaderboards
            </span>
            <span className={s.meta}>All-India mock ranks and weekly leagues.</span>
          </Link>
        </li>
      </ul>

      {attempts && attempts.length > 0 && (
        <section aria-labelledby="recent-title">
          <h2 id="recent-title" className={s.sectionHeading}>
            Your recent tests
          </h2>
          <ul className={s.cards}>
            {attempts.map((a) => {
              const done = a.status === 'submitted' || a.status === 'auto_submitted';
              return (
                <li key={a.id}>
                  <Link href={done ? resultPath(a.id) : attemptPath(a.id)} className={s.linkCard}>
                    <span className={s.linkTitle}>{a.title}</span>
                    <span className={s.meta}>{done ? `Score ${scoreText(a.score)} / ${scoreText(a.maxScore)}` : 'In progress: continue'}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section aria-labelledby="pick-title">
        <h2 id="pick-title" className={s.sectionHeading}>
          Find your test series
        </h2>
        <div className={s.pickers}>
          <label className={s.field} htmlFor={boardId}>
            Board
            <select id={boardId} className={s.select} value={board} onChange={(e) => setBoard(e.target.value as BoardSlug)}>
              {BOARDS.map((b) => (
                <option key={b} value={b}>
                  {BOARD_NAMES[b]}
                </option>
              ))}
            </select>
          </label>
          <label className={s.field} htmlFor={classId}>
            Class
            <select id={classId} className={s.select} value={classLevel} onChange={(e) => setClassLevel(Number(e.target.value))}>
              {CLASS_LEVELS.map((c) => (
                <option key={c} value={c}>
                  Class {c} ({examLabel(board, c)})
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {error && (
        <EmptyState title="We could not load the subjects" icon="alert" headingLevel="h3">
          Check your connection and try again.
        </EmptyState>
      )}
      {!subjects && !error && (
        <div aria-busy="true" aria-label="Loading subjects" className={s.loading}>
          <Skeleton lines={3} />
        </div>
      )}
      {subjects && subjects.subjects.length === 0 && (
        <EmptyState title="No subjects yet" headingLevel="h3">
          This class is coming soon.
        </EmptyState>
      )}
      {subjects && subjects.subjects.length > 0 && (
        <ul className={s.cards} data-testid="subject-list">
          {subjects.subjects.map((sub) => (
            <li key={sub.id}>
              <Link href={seriesPath(board, classLevel, sub.id)} className={s.linkCard} lang={sub.language === 'hi' ? 'hi' : undefined}>
                <span className={s.linkTitle}>{sub.name}</span>
                <span className={s.meta}>
                  {examLabel(board, classLevel)} Class {classLevel}
                  {sub.wave === 1 && (
                    <>
                      {' '}
                      <Badge tone="accent">Full series</Badge>
                    </>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
