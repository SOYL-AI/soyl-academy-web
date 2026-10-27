'use client';

/**
 * A subject's test series (GET /v1/test-series?subject=…; backend-api M3 handoff §2): chapter, unit, term
 * and full mock papers, the second-exam track, and the All-India live mocks. Members see their status per
 * test (attempts, best score, Resume). "Start" shows the paper's sections and instructions first
 * (GET /v1/tests/:id: metadata only, never questions), then POST /v1/tests/:id/attempts.
 */
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import type { TestMeta, TestSeries, TestSeriesTest } from '@/platform/shared/api-client';
import { Button } from '@/components/platform/ui/kit/Button';
import { Dialog } from '@/components/platform/ui/kit/Dialog';
import { Badge, EmptyState, Skeleton } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { useSession } from '../auth/SessionProvider';
import { api } from '../lib/api-browser';
import { attemptPath, LIVE_PHASE_LABELS, marksText, resultPath, scoreText, SERIES_KIND_LABELS, testProblemMessage } from './player-model';
import { durationText, istDateTime } from './timer';
import s from './tests.module.css';

export function SeriesClient({ subjectId, subjectName }: { subjectId: string; subjectName: string }) {
  const { state } = useSession();
  const [data, setData] = useState<TestSeries | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<TestSeriesTest | null>(null);

  const load = useCallback(async () => {
    try {
      setData(await api.get('/v1/test-series', { query: { subject: subjectId } }));
      setError(null);
    } catch (err) {
      setError(testProblemMessage(err));
    }
  }, [subjectId]);

  useEffect(() => {
    if (state.status === 'loading') return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- members get a personal list
    void load();
  }, [load, state.status]);

  if (error) {
    return (
      <EmptyState title="We could not load the tests" icon="alert" headingLevel="h2" action={<Button variant="secondary" onClick={() => void load()}>Try again</Button>}>
        {error}
      </EmptyState>
    );
  }
  if (!data) {
    return (
      <div aria-busy="true" aria-label="Loading tests" className={s.loading}>
        <Skeleton lines={2} />
        <Skeleton variant="block" height={140} />
      </div>
    );
  }
  const groups = data.series.filter((g) => g.tests.length > 0);
  return (
    <div className={s.stack} data-testid="series">
      {data.liveEvents.length > 0 && (
        <section aria-labelledby="live-title">
          <h2 id="live-title" className={s.sectionHeading}>
            All-India live mocks
          </h2>
          <ul className={s.cards}>
            {data.liveEvents.map((ev) => (
              <li key={ev.id}>
                <Link href={`/tests/live/${encodeURIComponent(ev.id)}`} className={s.linkCard} data-testid="live-event-link">
                  <span className={s.linkTitle}>{ev.title}</span>
                  <span className={s.meta}>
                    <Badge tone={ev.phase === 'live' ? 'danger' : ev.phase === 'registration_open' ? 'accent' : 'neutral'}>{LIVE_PHASE_LABELS[ev.phase] ?? ev.phase}</Badge> {istDateTime(ev.startsAt)} ·{' '}
                    {durationText(ev.durationMin)}
                    {ev.me?.registered ? ' · You are registered' : ''}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      {groups.length === 0 && (
        <EmptyState title="Tests for this subject are coming soon" headingLevel="h2" action={<Link href="/tests/builder">Build your own test</Link>}>
          Meanwhile you can build a test from the practice questions of any chapter.
        </EmptyState>
      )}
      {groups.map((g) => (
        <section key={g.id} aria-labelledby={`series-${g.id}`}>
          <h2 id={`series-${g.id}`} className={s.sectionHeading}>
            {g.title || SERIES_KIND_LABELS[g.kind] || 'Tests'}
          </h2>
          <ul className={s.cards}>
            {g.tests.map((t) => (
              <TestCard key={t.id} t={t} onStart={() => setOpen(t)} member={state.status === 'member'} />
            ))}
          </ul>
        </section>
      ))}
      <TestDialog test={open} subjectName={subjectName} onClose={() => setOpen(null)} />
    </div>
  );
}

function TestCard({ t, onStart, member }: { t: TestSeriesTest; onStart: () => void; member: boolean }) {
  const me = t.me;
  return (
    <li id={`test-${t.id}`} className={s.testCard} data-testid="test-card" data-test-id={t.id}>
      <h3 className={s.testTitle}>{t.title}</h3>
      <p className={s.meta}>
        {t.questionCount} questions · {marksText(t.totalMarks)} · {durationText(t.durationMin)}
        {t.chapter ? ` · Chapter ${t.chapter.number}` : ''}
      </p>
      {member && me && me.attempts > 0 && (
        <p className={s.meta}>
          {me.attempts} attempt{me.attempts === 1 ? '' : 's'} · best {scoreText(me.bestScore)} / {scoreText(me.maxScore)}
        </p>
      )}
      <div className={s.row}>
        {me?.activeAttemptId ? (
          <Link href={attemptPath(me.activeAttemptId)} className={s.linkCard} data-testid="resume-test">
            <span className={s.linkTitle}>
              Resume <Icon name="chevronRight" size={16} />
            </span>
          </Link>
        ) : (
          <Button onClick={onStart} data-testid="start-test-open">
            {me && me.attempts > 0 ? 'Take again' : 'Start'}
          </Button>
        )}
        {me?.lastAttemptId && !me.activeAttemptId && (
          <Link href={resultPath(me.lastAttemptId)} className={s.meta}>
            Last result
          </Link>
        )}
      </div>
    </li>
  );
}

function TestDialog({ test, subjectName, onClose }: { test: TestSeriesTest | null; subjectName: string; onClose: () => void }) {
  const { state, openLogin } = useSession();
  const router = useRouter();
  const [meta, setMeta] = useState<TestMeta | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    if (!test) return;
    let alive = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset when another test opens
    setMeta(null);
    setError(null);
    api
      .get('/v1/tests/{id}', { params: { id: test.id } })
      .then((m) => alive && setMeta(m))
      .catch((err) => alive && setError(testProblemMessage(err)));
    return () => {
      alive = false;
    };
  }, [test]);

  const start = async () => {
    if (!test) return;
    if (state.status !== 'member') {
      openLogin({ reason: 'Log in to take tests. They are free, and your results are saved.' });
      return;
    }
    setStarting(true);
    setError(null);
    try {
      const res = await api.post('/v1/tests/{id}/attempts', { params: { id: test.id }, body: { start: true } });
      router.push(attemptPath(res.attempt.id));
    } catch (err) {
      setError(testProblemMessage(err));
      setStarting(false);
    }
  };

  return (
    <Dialog
      open={test !== null}
      onClose={onClose}
      title={test?.title ?? 'Test'}
      description={test ? `${subjectName} · ${test.questionCount} questions · ${marksText(test.totalMarks)} · ${durationText(test.durationMin)}` : undefined}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Not now
          </Button>
          <Button onClick={() => void start()} loading={starting} data-testid="start-test">
            {state.status === 'member' ? 'Start test' : 'Log in to start'}
          </Button>
        </>
      }
    >
      {error && (
        <p className={s.error} role="alert">
          <Icon name="alert" size={16} /> {error}
        </p>
      )}
      {!meta && !error && <Skeleton lines={3} />}
      {meta && (
        <div className={s.stack} data-testid="test-meta">
          <ul className={s.instructions}>
            <li>The timer starts when you press Start. Answers save automatically, even offline.</li>
            {meta.instructions.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
          {meta.sections.length > 0 && (
            <div className={s.tableWrap}>
              <table className={s.table}>
                <caption className="p-visually-hidden">Sections</caption>
                <thead>
                  <tr>
                    <th scope="col">Section</th>
                    <th scope="col" className={s.num}>
                      Questions
                    </th>
                    <th scope="col" className={s.num}>
                      Marks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {meta.sections.map((sec) => (
                    <tr key={sec.id}>
                      <th scope="row">
                        {sec.title}
                        {sec.choiceGroups.length > 0 && <div className={s.meta}>Internal choice in {sec.choiceGroups.length} question{sec.choiceGroups.length === 1 ? '' : 's'}</div>}
                      </th>
                      <td className={s.num}>{sec.questionCount}</td>
                      <td className={s.num}>{sec.maxMarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {meta.autoGradedCount < meta.questionCount && (
            <p className={s.muted}>
              {meta.questionCount - meta.autoGradedCount} written question{meta.questionCount - meta.autoGradedCount === 1 ? '' : 's'}: you mark these yourself with the marking scheme after you submit (free), or ask the AI.
            </p>
          )}
        </div>
      )}
    </Dialog>
  );
}
