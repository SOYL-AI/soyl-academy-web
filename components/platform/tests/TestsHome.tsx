'use client';

/**
 * /tests — the test series catalogue (ARCHITECTURE §3.1: public list, login to start; design language v3, ADR-032 §10
 * "Tests hub"). The page's header (title, date, Build your own test) is server-rendered; this client part shows:
 * - Upcoming live mocks (GET /v1/live-events, open phases only) as a Timeline in the rail (first on phones; hidden
 *   when there are none);
 * - "Your subjects with tests": pick a board and class (defaults: the student's profile), then a subject card.
 *   Subjects come from the public catalog API. Subjects that really have tests come first, with a pill that says what
 *   is there ("Full series" only with a full mock paper, else the chapter-test count); the rest sit under a collapsed
 *   "More subjects: coming soon" (the class page's rule, Lead review 2026-10-28). "Has tests" = a subject with
 *   learning content (the daily-challenge list, as on the class page) whose GET /v1/test-series has at least one
 *   test. If that cannot be told, every subject is listed without pills.
 * - Recent attempts (members) as a DataTable: resume or see the result.
 * Tests are free: no prices, locks or credits anywhere here.
 */
import Link from 'next/link';
import { useEffect, useId, useState } from 'react';
import type { CatalogSubject, CatalogSubjects, LiveEvent, MyAttempt, TestSeries } from '@/platform/shared/api-client';
import { EmptyState, SkeletonCard } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { DataTable, dataTableNum, StatusPill, Timeline } from '@/components/platform/ui/kit/Lists';
import { CardGrid, PageColumns, PageSection } from '@/components/platform/ui/kit/Page';
import { RailCard } from '@/components/platform/ui/kit/Rail';
import { SubjectCard } from '@/components/platform/ui/kit/Tiles';
import { subjectTint } from '@/components/platform/ui/kit/tints';
import { SubjectGlyph } from '@/components/platform/ui/art/SubjectGlyph';
import { useSession } from '../auth/SessionProvider';
import { fetchContentSubjects } from '../learn/content-subjects';
import { subjectStyle } from '../learn/subject-style';
import { api } from '../lib/api-browser';
import { BOARDS, BOARD_NAMES, CLASS_LEVELS, examLabel, subjectSlug, type BoardSlug } from '../lib/catalog';
import { useStage } from '../shell/StageProvider';
import { liveEventItem, upcomingLive } from './live-timeline';
import { attemptRow } from './player-model';

export { attemptRow };
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

/** The line under a subject's name on the hub: how many tests, and that they are free (pure; tested). */
export function seriesMeta(sum: SeriesSummary | undefined): string {
  if (!sum || sum.total === 0) return 'Coming soon';
  const tests = `${sum.total.toLocaleString('en-IN')} ${sum.total === 1 ? 'test' : 'tests'}`;
  if (sum.fullPapers > 0) return `${tests} · ${sum.fullPapers} full ${sum.fullPapers === 1 ? 'paper' : 'papers'}`;
  return `${tests} · free`;
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

function SubjectCards({
  subjects,
  board,
  classLevel,
  summaries,
  plain,
  soon,
  testId,
  label,
}: {
  subjects: readonly CatalogSubject[];
  board: BoardSlug;
  classLevel: number;
  summaries: ReadonlyMap<string, SeriesSummary> | null;
  plain?: boolean;
  /** The "coming soon" group: no series yet. */
  soon?: boolean;
  testId?: string;
  label: string;
}) {
  return (
    <div data-testid={testId}>
      <CardGrid label={label}>
        {subjects.map((sub) => {
          const sum = summaries?.get(sub.id);
          const badge = seriesBadge(sum);
          const st = subjectStyle(sub.id, sub.name, sub.language);
          return (
            // data-has-tests marks the subjects with a real series (review.spec); the card itself is one link.
            <li key={sub.id} className={s.gridItem} data-has-tests={badge ? 'true' : undefined}>
              <SubjectCard
                listItem={false}
                href={seriesPath(board, classLevel, sub.id)}
                title={sub.name}
                lang={sub.language === 'hi' ? 'hi' : undefined}
                meta={summaries ? seriesMeta(sum) : soon ? 'Coming soon' : `${examLabel(board, classLevel)} Class ${classLevel}`}
                tint={subjectTint(st.hue)}
                art={<SubjectGlyph kind={st.art} size={28} />}
                badge={badge ? <StatusPill tone="success">{badge}</StatusPill> : undefined}
                variant={plain ? 'plain' : 'tinted'}
              />
            </li>
          );
        })}
      </CardGrid>
    </div>
  );
}

function RecentAttempts({ attempts }: { attempts: MyAttempt[] | null }) {
  const { pick } = useStage();
  if (attempts === null) {
    return (
      <div aria-busy="true" aria-label="Loading your attempts">
        <SkeletonCard lines={3} />
      </div>
    );
  }
  if (attempts.length === 0) {
    return (
      <EmptyState title={pick({ junior: 'Nothing here yet', middle: 'No tests yet', senior: 'No attempts yet' })} icon="clock" tint="pink" compact>
        {pick({ junior: 'Your first test will show up here.', middle: 'Your scores appear here.', senior: 'Scores and time taken appear here.' })}
      </EmptyState>
    );
  }
  return (
    <DataTable caption="Recent attempts" hideCaption>
      <thead>
        <tr>
          <th scope="col">Test</th>
          <th scope="col">Date</th>
          <th scope="col" className={dataTableNum}>
            Score
          </th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        {attempts.map((a) => {
          const r = attemptRow(a);
          return (
            <tr key={a.id} data-testid="recent-attempt">
              <th scope="row">
                <Link href={r.href} className={s.tableLink}>
                  {a.title}
                </Link>
              </th>
              <td className={s.nowrap}>{r.date}</td>
              <td className={dataTableNum}>{r.score}</td>
              <td>
                <StatusPill tone={r.tone}>{r.status}</StatusPill>
              </td>
            </tr>
          );
        })}
      </tbody>
    </DataTable>
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
  const [live, setLive] = useState<LiveEvent[] | null>(null);
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

  // Upcoming live mocks (members get their registration); after the session is known so it is fetched once.
  const sessionKnown = state.status !== 'loading';
  useEffect(() => {
    if (!sessionKnown) return;
    let alive = true;
    api
      .get('/v1/live-events')
      .then((r) => alive && setLive(upcomingLive(r.events)))
      .catch(() => alive && setLive([]));
    return () => {
      alive = false;
    };
  }, [sessionKnown, user?.id]);

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

  const rail =
    live && live.length > 0 ? (
      <RailCard id="live-title" title="Upcoming live mocks" action={{ href: '/leaderboard', label: 'Ranks' }} data-testid="hub-live-mocks">
        <p className={s.railNote}>Free All-India mocks in board pattern, ranked when they close.</p>
        <Timeline label="Upcoming live mocks" items={live.map(liveEventItem)} />
      </RailCard>
    ) : undefined;

  return (
    <div className={s.hub}>
      <PageColumns rail={rail} railLabel="Upcoming live mocks" railFirstOnPhones>
        <PageSection
          id="subjects-title"
          title={user ? 'Your subjects with tests' : 'Subjects with tests'}
          description="Chapter tests, unit tests and full papers in board pattern."
          data-testid="hub-subjects"
        >
          <div className={s.pickers} role="group" aria-label="Board and class">
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
                {CLASS_LEVELS.map((cl) => (
                  <option key={cl} value={cl}>
                    Class {cl} ({examLabel(board, cl)})
                  </option>
                ))}
              </select>
            </label>
          </div>

          {error && (
            <EmptyState title="We could not load the subjects" icon="alert" tint="red" compact>
              Check your connection and try again.
            </EmptyState>
          )}
          {(!subjects || summaries === 'loading') && !error && (
            <div aria-busy="true" aria-label="Loading subjects" className={s.skeletonGrid}>
              <SkeletonCard thumb lines={2} />
              <SkeletonCard thumb lines={2} />
              <SkeletonCard thumb lines={2} />
            </div>
          )}
          {subjects && subjects.subjects.length === 0 && (
            <EmptyState title="No subjects yet" icon="book" tint="neutral" compact>
              This class is coming soon.
            </EmptyState>
          )}
          {subjects && summaries !== 'loading' && subjects.subjects.length > 0 && <SubjectGroups subjects={subjects.subjects} board={board} classLevel={classLevel} summaries={summaries} />}
        </PageSection>

        {user && (
          <PageSection id="recent-title" title="Recent attempts" action={attempts && attempts.length > 0 ? { href: '/me#attempts', label: 'See all' } : undefined} data-testid="recent-attempts">
            <RecentAttempts attempts={attempts} />
          </PageSection>
        )}
      </PageColumns>
    </div>
  );
}

function SubjectGroups({ subjects, board, classLevel, summaries }: { subjects: readonly CatalogSubject[]; board: BoardSlug; classLevel: number; summaries: Map<string, SeriesSummary> | null }) {
  const { ready, rest } = splitBySeries(subjects, summaries);
  if (!ready) return <SubjectCards subjects={rest} board={board} classLevel={classLevel} summaries={summaries} testId="subject-list" label="Subjects" plain={rest.length > 8} />;
  return (
    <>
      <SubjectCards subjects={ready} board={board} classLevel={classLevel} summaries={summaries} testId="subject-list" label="Subjects with tests" />
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
            <SubjectCards subjects={rest} board={board} classLevel={classLevel} summaries={null} label="Subjects coming soon" plain soon />
          </div>
        </details>
      )}
    </>
  );
}
