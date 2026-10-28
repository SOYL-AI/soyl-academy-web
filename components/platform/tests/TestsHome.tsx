'use client';

/**
 * /tests — the test series catalogue (ARCHITECTURE §3.1: public list, login to start). Pick a board and
 * class (defaults: the student's profile), then a subject; plus the custom builder, live mocks and your
 * recent attempts. Subjects come from the public catalog API. Subjects that really have tests come first, with
 * a badge that says what is there ("Full series" only with a full mock paper, else the chapter-test count); the
 * rest sit under a collapsed "More subjects: coming soon" (the class page's rule, Lead review 2026-10-28).
 * "Has tests" = a subject with learning content (the daily-challenge list, as on the class page) whose
 * GET /v1/test-series has at least one test. If that cannot be told, every subject is listed without badges.
 */
import Link from 'next/link';
import { useEffect, useId, useState } from 'react';
import type { CatalogSubject, CatalogSubjects, MyAttempt, TestSeries } from '@/platform/shared/api-client';
import { Badge, EmptyState, Skeleton } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { useSession } from '../auth/SessionProvider';
import { fetchContentSubjects } from '../learn/content-subjects';
import { api } from '../lib/api-browser';
import { BOARDS, BOARD_NAMES, CLASS_LEVELS, examLabel, subjectSlug, type BoardSlug } from '../lib/catalog';
import { attemptPath, resultPath, scoreText } from './player-model';
import s from './tests.module.css';
import c from '../learn/course.module.css';

export function seriesPath(board: BoardSlug, classLevel: number, subjectId: string): string {
  return `/tests/series/${board}/${classLevel}/${subjectSlug(subjectId)}`;
}

export interface SeriesSummary {
  total: number;
  chapterTests: number;
  fullPapers: number;
}

/** What a subject's series really holds. */
export function seriesSummary(data: Pick<TestSeries, 'series'>): SeriesSummary {
  let total = 0;
  let chapterTests = 0;
  let fullPapers = 0;
  for (const g of data.series) {
    total += g.tests.length;
    if (g.kind === 'chapter') chapterTests += g.tests.length;
    if (g.kind === 'full') fullPapers += g.tests.length;
  }
  return { total, chapterTests, fullPapers };
}

/** The badge a subject card may carry: only what is true. */
export function seriesBadge(sum: SeriesSummary | undefined): string | null {
  if (!sum || sum.total === 0) return null;
  if (sum.fullPapers > 0) return 'Full series';
  if (sum.chapterTests > 0) return `${sum.chapterTests} chapter ${sum.chapterTests === 1 ? 'test' : 'tests'}`;
  return `${sum.total} ${sum.total === 1 ? 'test' : 'tests'}`;
}

/** Subjects with tests (in catalog order) and the rest; `ready` is null when it cannot be told. */
export function splitBySeries(subjects: readonly CatalogSubject[], summaries: ReadonlyMap<string, SeriesSummary> | null): { ready: CatalogSubject[] | null; rest: CatalogSubject[] } {
  if (!summaries) return { ready: null, rest: [...subjects] };
  const ready = subjects.filter((x) => (summaries.get(x.id)?.total ?? 0) > 0);
  if (ready.length === 0) return { ready: null, rest: [...subjects] };
  return { ready, rest: subjects.filter((x) => !ready.includes(x)) };
}

function useSeriesSummaries(board: BoardSlug, classLevel: number): Map<string, SeriesSummary> | null | 'loading' {
  const key = `${board}-${classLevel}`;
  const [result, setResult] = useState<{ key: string; value: Map<string, SeriesSummary> | null } | null>(null);
  useEffect(() => {
    let alive = true;
    void (async () => {
      const content = await fetchContentSubjects(board, classLevel);
      if (content.length === 0) {
        if (alive) setResult({ key, value: null });
        return;
      }
      const entries = await Promise.all(
        content.map(async (x) => {
          try {
            return [x.subjectId, seriesSummary(await api.get('/v1/test-series', { query: { subject: x.subjectId } }))] as const;
          } catch {
            return null;
          }
        }),
      );
      if (alive) setResult({ key, value: new Map(entries.filter((e): e is readonly [string, SeriesSummary] => e !== null)) });
    })();
    return () => {
      alive = false;
    };
  }, [board, classLevel, key]);
  return result?.key === key ? result.value : 'loading';
}

function SubjectCards({ subjects, board, classLevel, summaries, testId }: { subjects: readonly CatalogSubject[]; board: BoardSlug; classLevel: number; summaries: ReadonlyMap<string, SeriesSummary> | null; testId?: string }) {
  return (
    <ul className={s.cards} data-testid={testId}>
      {subjects.map((sub) => {
        const badge = seriesBadge(summaries?.get(sub.id));
        return (
          <li key={sub.id}>
            <Link href={seriesPath(board, classLevel, sub.id)} className={s.linkCard} lang={sub.language === 'hi' ? 'hi' : undefined} data-has-tests={badge ? 'true' : undefined}>
              <span className={s.linkTitle}>{sub.name}</span>
              <span className={s.meta}>
                {examLabel(board, classLevel)} Class {classLevel}
                {badge && (
                  <>
                    {' '}
                    <Badge tone="accent">{badge}</Badge>
                  </>
                )}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
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
  const summaries = useSeriesSummaries(board, classLevel);

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
      {(!subjects || summaries === 'loading') && !error && (
        <div aria-busy="true" aria-label="Loading subjects" className={s.loading}>
          <Skeleton lines={3} />
        </div>
      )}
      {subjects && subjects.subjects.length === 0 && (
        <EmptyState title="No subjects yet" headingLevel="h3">
          This class is coming soon.
        </EmptyState>
      )}
      {subjects && summaries !== 'loading' && subjects.subjects.length > 0 && <SubjectGroups subjects={subjects.subjects} board={board} classLevel={classLevel} summaries={summaries} />}
    </div>
  );
}

function SubjectGroups({ subjects, board, classLevel, summaries }: { subjects: readonly CatalogSubject[]; board: BoardSlug; classLevel: number; summaries: Map<string, SeriesSummary> | null }) {
  const { ready, rest } = splitBySeries(subjects, summaries);
  if (!ready) return <SubjectCards subjects={rest} board={board} classLevel={classLevel} summaries={summaries} testId="subject-list" />;
  return (
    <>
      <section aria-labelledby="ready-tests-title">
        <h2 id="ready-tests-title" className={s.sectionHeading}>
          Ready to take <span className={s.countNote}>{ready.length}</span>
        </h2>
        <SubjectCards subjects={ready} board={board} classLevel={classLevel} summaries={summaries} testId="subject-list" />
      </section>
      {rest.length > 0 && (
        <details className={c.moreSubjects} data-testid="more-subjects">
          <summary>
            <span>
              More subjects: coming soon <span className={s.countNote}>{rest.length}</span>
            </span>
            <Icon name="chevronDown" size={20} className={c.moreChevron} />
          </summary>
          <div className={c.moreBody}>
            <p className={c.soonNote}>We are writing tests for these subjects. Their series pages show what is planned.</p>
            <SubjectCards subjects={rest} board={board} classLevel={classLevel} summaries={null} />
          </div>
        </details>
      )}
    </>
  );
}
