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
import { ButtonLink } from '@/components/platform/ui/kit/ButtonLink';
import { Dialog } from '@/components/platform/ui/kit/Dialog';
import { EmptyState, Skeleton, SkeletonCard } from '@/components/platform/ui/kit/Display';
import { Icon, type IconName } from '@/components/platform/ui/kit/Icon';
import { DataTable, dataTableNum, List, StatusPill, Timeline, type StatusTone } from '@/components/platform/ui/kit/Lists';
import { PageSection } from '@/components/platform/ui/kit/Page';
import { IconTile } from '@/components/platform/ui/kit/Tiles';
import type { Tint } from '@/components/platform/ui/kit/tints';
import { useSession } from '../auth/SessionProvider';
import { api } from '../lib/api-browser';
import { useStage } from '../shell/StageProvider';
import { liveEventItem } from './live-timeline';
import { attemptPath, marksText, resultPath, scoreText, SERIES_KIND_LABELS, testProblemMessage } from './player-model';
import { durationText } from './timer';
import s from './tests.module.css';

/** The status a series row writes for a member (pure; tested): not started, in progress, or the best score so far. */
export function testStatus(me: TestSeriesTest['me'] | null | undefined): { key: 'not-started' | 'in-progress' | 'done'; label: string; tone: StatusTone } {
  if (me?.activeAttemptId) return { key: 'in-progress', label: 'In progress', tone: 'info' };
  if (me && me.attempts > 0) return { key: 'done', label: `Best ${scoreText(me.bestScore)}/${scoreText(me.maxScore)}`, tone: 'success' };
  return { key: 'not-started', label: 'Not started', tone: 'neutral' };
}

/** The icon and tint of a series group's rows: tests are pink (STUDY_MODES.tests); full papers get the paper icon. */
export function seriesLook(kind: string): { icon: IconName; tint: Tint } {
  if (kind === 'full' || kind === 'term' || kind === 'second_exam') return { icon: 'list', tint: 'violet' };
  if (kind === 'unit') return { icon: 'layers', tint: 'pink' };
  return { icon: 'clock', tint: 'pink' };
}

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
      <EmptyState title="We could not load the tests" icon="alert" tint="red" headingLevel="h2" action={<Button variant="secondary" onClick={() => void load()}>Try again</Button>}>
        {error}
      </EmptyState>
    );
  }
  if (!data) {
    return (
      <div aria-busy="true" aria-label="Loading tests" className={s.loading}>
        <SkeletonCard lines={2} />
        <SkeletonCard lines={3} />
      </div>
    );
  }
  const groups = data.series.filter((g) => g.tests.length > 0);
  const member = state.status === 'member';
  return (
    <div className={s.stack} data-testid="series">
      {data.liveEvents.length > 0 && (
        <PageSection id="live-title" title="All-India live mocks" count={data.liveEvents.length} description="Free, at the same time for everyone, with an All-India rank.">
          <Timeline label="All-India live mocks" items={data.liveEvents.map(liveEventItem)} />
        </PageSection>
      )}
      {groups.length === 0 && (
        <EmptyState
          title="Tests for this subject are coming soon"
          icon="clock"
          tint="pink"
          headingLevel="h2"
          action={
            <ButtonLink href="/tests/builder" icon="plus">
              Build your own test
            </ButtonLink>
          }
        >
          Meanwhile you can build a test from the practice questions of any chapter.
        </EmptyState>
      )}
      {groups.map((g) => {
        const look = seriesLook(g.kind);
        const name = g.title || SERIES_KIND_LABELS[g.kind] || 'Tests';
        return (
          <PageSection key={g.id} id={`series-${g.id}`} title={name} count={g.tests.length}>
            <List label={name}>
              {g.tests.map((t) => (
                <TestRow key={t.id} t={t} icon={look.icon} tint={look.tint} onStart={() => setOpen(t)} member={member} />
              ))}
            </List>
          </PageSection>
        );
      })}
      <TestDialog test={open} subjectName={subjectName} onClose={() => setOpen(null)} />
    </div>
  );
}

function TestRow({ t, icon, tint, onStart, member }: { t: TestSeriesTest; icon: IconName; tint: Tint; onStart: () => void; member: boolean }) {
  const { pick } = useStage();
  const me = t.me;
  const status = testStatus(me);
  const again = !!me && me.attempts > 0;
  return (
    <li id={`test-${t.id}`} className={s.testRow} data-testid="test-card" data-test-id={t.id} data-status={member ? status.key : undefined}>
      <IconTile icon={icon} tint={tint} size="md" />
      <div className={s.testText}>
        <h3 className={s.testTitle}>{t.title}</h3>
        <p className={s.meta}>
          {t.questionCount} questions · {marksText(t.totalMarks)} · {durationText(t.durationMin)}
          {t.chapter ? ` · Chapter ${t.chapter.number}` : ''}
        </p>
        {member && me && me.attempts > 0 && (
          <p className={s.meta}>
            {me.attempts} attempt{me.attempts === 1 ? '' : 's'}
            {me.lastAttemptId && !me.activeAttemptId && (
              <>
                {' · '}
                <Link href={resultPath(me.lastAttemptId)} className={s.inlineLink}>
                  Last result
                </Link>
              </>
            )}
          </p>
        )}
      </div>
      <div className={s.testActions}>
        {member && <StatusPill tone={status.tone}>{status.label}</StatusPill>}
        {me?.activeAttemptId ? (
          <ButtonLink href={attemptPath(me.activeAttemptId)} icon="play" data-testid="resume-test">
            Resume
          </ButtonLink>
        ) : (
          <Button variant={again ? 'secondary' : 'soft'} onClick={onStart} data-testid="start-test-open">
            {again ? 'Take again' : pick({ junior: "Let's go", middle: 'Start', senior: 'Start' })}
          </Button>
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
            <DataTable caption="Sections" hideCaption dense>
              <thead>
                <tr>
                  <th scope="col">Section</th>
                  <th scope="col" className={dataTableNum}>
                    Questions
                  </th>
                  <th scope="col" className={dataTableNum}>
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
                    <td className={dataTableNum}>{sec.questionCount}</td>
                    <td className={dataTableNum}>{sec.maxMarks}</td>
                  </tr>
                ))}
              </tbody>
            </DataTable>
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
