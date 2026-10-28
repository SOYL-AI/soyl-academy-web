'use client';

/**
 * Test result (ARCHITECTURE §9 "Results"; backend-api M3 handoff §7; ai-gateway M4 handoff §9):
 * - score (auto + self-marked, labelled), sections, topic mastery, accuracy by difficulty, time per
 *   question, percentile only when ≥ 50 students (else how many so far), live rank (beta) when present;
 * - every question with the student's answer, the correct answer, solution, marking scheme and rubric;
 * - written answers: self-evaluation per marking-scheme step (or per written part / total marks);
 * - AI evaluation: quoted first, run as a job and polled; AI marks are shown apart from the score with
 *   their label ("AI-graded" / "AI-graded — check with your teacher"): they never change scores,
 *   percentiles or ranks (F-028).
 */
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  isApiError,
  type AiEvaluation,
  type AiQuote,
  type AttemptResult,
  type AttemptResultItem,
  type PracticeAnswerResult,
} from '@/platform/shared/api-client';
import { cx } from '@/components/platform/ui/cx';
import { Button } from '@/components/platform/ui/kit/Button';
import { Badge, Card, CardTitle, EmptyState, ProgressBar, Skeleton } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { useToast } from '@/components/platform/ui/kit/Toast';
import { fromResponse, isWritten, selfMarkSteps } from '@/components/platform/ui/question/model';
import { QuestionCard } from '@/components/platform/ui/question/QuestionCard';
import type { QuestionSlots } from '@/components/platform/ui/question/slots';
import { useSession } from '../auth/SessionProvider';
import { AiNotice } from '../ai/AiNotice';
import { useCredits } from '../ai/CreditsProvider';
import { aiBlockFrom, newIdempotencyKey, type AiBlock } from '../ai/problems';
import { api } from '../lib/api-browser';
import { attemptPath, DIFFICULTY_NAMES, marksText, scoreText, testProblemMessage } from './player-model';
import { durationText, formatClock, istDateTime } from './timer';
import s from './tests.module.css';

// The AI quote and paywall dialogs load after the page (JS budget: this page sits at the 200 KB limit).
const QuoteDialog = dynamic(() => import('../ai/AiDialogs').then((m) => m.QuoteDialog), { ssr: false });
const PaywallDialog = dynamic(() => import('../ai/AiDialogs').then((m) => m.PaywallDialog), { ssr: false });

type SlotsModule = typeof import('@/components/platform/ui/question/slots');
type Filter = 'all' | 'wrong' | 'unanswered' | 'written';

const STATUS_TEXT: Record<AttemptResultItem['status'], { label: string; tone: 'success' | 'warning' | 'danger' | 'neutral' | 'accent' }> = {
  correct: { label: 'Correct', tone: 'success' },
  partial: { label: 'Partly correct', tone: 'warning' },
  wrong: { label: 'Wrong', tone: 'danger' },
  unanswered: { label: 'Not answered', tone: 'neutral' },
  pending_self: { label: 'Mark it yourself', tone: 'accent' },
  evaluated: { label: 'Self-marked', tone: 'accent' },
};

function langFor(subjectId: string): string | undefined {
  return /-hindi(?:-|$)/.test(subjectId) ? 'hi' : undefined;
}

/** Items with a written part the student marks (self) or the AI can evaluate. */
export function hasWrittenPart(item: AttemptResultItem): boolean {
  return isWritten(item.question.type) || item.parts.some((p) => p.grading === 'self');
}

/** The result item as the shared card's "answered" state (reveal the key in review mode). */
export function toReveal(item: AttemptResultItem): PracticeAnswerResult | null {
  if (!item.key) return null;
  const pending = item.status === 'pending_self';
  return {
    questionId: item.question.id,
    version: item.question.version,
    type: item.question.type,
    correct: item.correct,
    marksAwarded: pending ? null : item.autoMarks + (item.selfMarks ?? 0),
    maxMarks: item.marks,
    grading: item.question.objective ? 'auto' : 'self',
    key: item.key,
    parts: item.parts.map((p) => ({ id: p.id, alternative: p.alternative, type: p.type, correct: p.correct, marksAwarded: p.marksAwarded, maxMarks: p.maxMarks, grading: p.grading, key: p.key })),
    selfAssessmentPending: false,
    selfMaxMarks: 0,
    stored: true,
    answerId: null,
    xpAwarded: 0,
    badgesAwarded: [],
    streak: null,
    coinsAwarded: 0,
    coinAwards: [],
    creditBonuses: [],
  };
}

export function ResultView({ attemptId }: { attemptId: string }) {
  const { state, openLogin } = useSession();
  const [result, setResult] = useState<AttemptResult | null>(null);
  const [error, setError] = useState<{ message: string; notSubmitted?: boolean } | null>(null);
  const [late, setLate] = useState(0);

  const load = useCallback(async () => {
    try {
      setResult(await api.get('/v1/attempts/{id}/result', { params: { id: attemptId } }));
      setError(null);
    } catch (err) {
      setError({ message: testProblemMessage(err), notSubmitted: isApiError(err, 'conflict') });
    }
  }, [attemptId]);

  const memberId = state.status === 'member' ? state.user.id : null;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch the result once the member is known
    if (memberId) void load();
  }, [memberId, load]);

  useEffect(() => {
    const n = Number(new URLSearchParams(window.location.search).get('late'));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read once from the URL after mount
    if (Number.isInteger(n) && n > 0 && n < 1000) setLate(n);
  }, []);

  if (state.status === 'guest') {
    return (
      <EmptyState title="Log in to see your result" headingLevel="h1" icon="lock" action={<Button onClick={() => openLogin()}>Log in</Button>}>
        Your results are saved to your account.
      </EmptyState>
    );
  }
  if (error) {
    return (
      <EmptyState
        title={error.notSubmitted ? 'This test is not submitted yet' : 'We could not load this result'}
        headingLevel="h1"
        icon="alert"
        action={
          error.notSubmitted ? (
            <Link href={attemptPath(attemptId)}>Continue the test</Link>
          ) : (
            <Button variant="secondary" onClick={() => void load()}>
              Try again
            </Button>
          )
        }
      >
        {error.notSubmitted ? 'Finish and submit it to see your result.' : error.message}
      </EmptyState>
    );
  }
  if (!result) {
    return (
      <div aria-busy="true" aria-label="Loading your result" className={s.loading}>
        <Skeleton lines={2} />
        <Skeleton variant="block" height={180} />
      </div>
    );
  }
  return <Result result={result} onChange={setResult} late={late} />;
}

function Result({ result, onChange, late }: { result: AttemptResult; onChange: (r: AttemptResult) => void; late: number }) {
  const { score, percentile, live } = result;
  const [ai, setAi] = useState<AiEvaluation | null>(null);
  const written = result.items.filter(hasWrittenPart);
  const lang = langFor(result.test.subject.id);

  return (
    <div className={s.stack} data-testid="result">
      <header className={s.scoreHero}>
        <h1 className={s.startTitle}>{result.test.title}</h1>
        <p className={s.scoreBig} data-testid="score">
          {scoreText(score.total)} <span className={s.muted}>/ {scoreText(score.max)}</span>
        </p>
        <div className={s.scoreParts}>
          <Badge tone="success">Auto-graded: {scoreText(score.auto)}</Badge>
          {score.self > 0 && <Badge tone="accent">Self-marked: {scoreText(score.self)}</Badge>}
          {score.percentage !== null && <Badge>{Math.round(score.percentage)}%</Badge>}
          {result.attempt.status === 'auto_submitted' && <Badge tone="warning">Submitted when time ran out</Badge>}
        </div>
        {score.pendingSelfEvaluation.items > 0 && result.review?.status !== 'after_event' && (
          <p className={s.muted} data-testid="pending-self">
            {score.pendingSelfEvaluation.items} written answer{score.pendingSelfEvaluation.items === 1 ? '' : 's'} ({marksText(score.pendingSelfEvaluation.marks)}) to mark yourself below.
          </p>
        )}
      </header>

      {late > 0 && (
        <div className={s.warn} role="alert">
          <Icon name="alert" size={20} />
          <p>
            {late === 1 ? 'One answer' : `${late} answers`} made offline after time ran out reached us too late, so {late === 1 ? 'it was' : 'they were'} not counted.
          </p>
        </div>
      )}

      <dl className={s.statGrid}>
        <div>
          <dt>Answered</dt>
          <dd>
            {score.answered} / {score.questions}
          </dd>
        </div>
        <div>
          <dt>Time taken</dt>
          <dd>{formatClock(result.time.totalSec * 1000)}</dd>
        </div>
        <div>
          <dt>Per question</dt>
          <dd>{Math.round(result.time.averagePerQuestionSec)} s</dd>
        </div>
        <div data-testid="percentile">
          <dt>Percentile</dt>
          <dd>{percentile.value !== null ? Math.round(percentile.value) : '–'}</dd>
        </div>
      </dl>
      {percentile.value === null && (
        <p className={s.muted}>
          Your percentile appears once {percentile.minAttempts} students have taken this test ({percentile.attempts} so far).
        </p>
      )}
      {live && (
        <Card as="section" aria-labelledby="live-rank">
          <CardTitle as="h2" id="live-rank">
            All-India rank <Badge tone="warning">Beta</Badge> {live.status === 'provisional' && <Badge>Provisional</Badge>}
          </CardTitle>
          <p className={s.muted}>
            {live.rank !== null ? `Rank ${live.rank} of ${live.total}` : 'Your rank appears soon.'}
            {live.percentile !== null ? ` · percentile ${Math.round(live.percentile)}` : ''}. Ranks use auto-graded marks only.
          </p>
          <Link href={`/tests/live/${encodeURIComponent(live.eventId)}`}>See the leaderboard</Link>
        </Card>
      )}

      {result.review?.status === 'after_event' ? (
        // S6-H01: a live mock's solutions open only after everyone has finished.
        <Card as="section" aria-labelledby="review-later" data-testid="review-after-event">
          <CardTitle as="h2" id="review-later">
            Solutions open after the live test
          </CardTitle>
          <p className={s.muted}>
            Answers, solutions and marking open when the live test closes{result.review.opensAt ? ` at ${istDateTime(result.review.opensAt)}` : ''}. Come back then to review every question.
          </p>
        </Card>
      ) : (
        <>
          <Analysis result={result} />

          {written.length > 0 && <AiEvaluationPanel result={result} written={written} ai={ai} onAi={setAi} />}

          <ReviewList result={result} lang={lang} ai={ai} onChange={onChange} onAi={setAi} />
        </>
      )}

      <p>
        <Link href="/tests">Back to tests</Link>
      </p>
    </div>
  );
}

function Analysis({ result }: { result: AttemptResult }) {
  return (
    <>
      {result.sections.length > 1 && (
        <section aria-labelledby="sections-title">
          <h2 id="sections-title" className={s.sectionHeading}>
            Sections
          </h2>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th scope="col">Section</th>
                  <th scope="col" className={s.num}>
                    Score
                  </th>
                  <th scope="col" className={s.num}>
                    Out of
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.sections.map((sec) => (
                  <tr key={sec.id}>
                    <th scope="row">{sec.title}</th>
                    <td className={s.num}>{scoreText(sec.score)}</td>
                    <td className={s.num}>{scoreText(sec.maxScore)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
      {result.topics.length > 0 && (
        <section aria-labelledby="topics-title">
          <h2 id="topics-title" className={s.sectionHeading}>
            Topic mastery
          </h2>
          <ul className={s.mastery} data-testid="topics">
            {result.topics.map((t) => (
              <li key={t.id}>
                <ProgressBar
                  value={t.mastery === null ? 0 : Math.round(t.mastery * 100)}
                  max={100}
                  label={t.title}
                  valueText={t.mastery === null ? 'not graded yet' : `${Math.round(t.mastery * 100)}% (${scoreText(t.earned)}/${scoreText(t.max)})`}
                  tone={t.mastery !== null && t.mastery >= 0.75 ? 'success' : 'accent'}
                />
              </li>
            ))}
          </ul>
        </section>
      )}
      {result.byDifficulty.length > 0 && (
        <section aria-labelledby="difficulty-title">
          <h2 id="difficulty-title" className={s.sectionHeading}>
            Accuracy by difficulty
          </h2>
          <div className={s.tableWrap}>
            <table className={s.table} data-testid="difficulty">
              <thead>
                <tr>
                  <th scope="col">Difficulty</th>
                  <th scope="col" className={s.num}>
                    Attempted
                  </th>
                  <th scope="col" className={s.num}>
                    Correct
                  </th>
                  <th scope="col" className={s.num}>
                    Accuracy
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.byDifficulty.map((d) => (
                  <tr key={d.difficulty}>
                    <th scope="row">{DIFFICULTY_NAMES[d.difficulty] ?? `Level ${d.difficulty}`}</th>
                    <td className={s.num}>
                      {d.attempted}/{d.total}
                    </td>
                    <td className={s.num}>{d.correct}</td>
                    <td className={s.num}>{d.accuracy === null ? '–' : `${Math.round(d.accuracy * 100)}%`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
}

/* ── AI evaluation ─────────────────────────────────────────────────────────────────────────────── */

function useAiEvaluation(attemptId: string, onAi: (e: AiEvaluation) => void) {
  const { setBalance } = useCredits();
  const toast = useToast();
  const [quote, setQuote] = useState<{ quote: AiQuote; itemIds?: string[]; what: string } | null>(null);
  const [running, setRunning] = useState(false);
  const [block, setBlock] = useState<AiBlock | null>(null);

  const ask = async (itemIds?: string[]) => {
    setBlock(null);
    try {
      const q = itemIds?.length === 1
        ? await api.get('/v1/ai/quote/{action}', { params: { action: 'evaluate-answer' } })
        : await api.get('/v1/ai/quote/{action}', { params: { action: 'evaluate-paper' }, query: { attemptId } });
      if (q.status === 'paused') return setBlock({ kind: 'paused', retryAfterSeconds: q.resetInSeconds });
      if (!q.allowedForPlan) return setBlock({ kind: 'plan', plan: null, plansUrl: '/plans' });
      setQuote({ quote: q, itemIds, what: itemIds?.length === 1 ? 'this answer' : 'your written answers' });
    } catch (err) {
      setBlock(aiBlockFrom(err));
    }
  };

  const run = async () => {
    const q = quote;
    setQuote(null);
    if (!q) return;
    setRunning(true);
    try {
      const accepted = await api.post('/v1/attempts/{id}/ai-evaluation', {
        params: { id: attemptId },
        body: q.itemIds ? { itemIds: q.itemIds } : {},
        headers: { 'idempotency-key': newIdempotencyKey() },
      });
      setBalance(accepted.balance);
      for (let i = 0; i < 90; i++) {
        await new Promise((r) => setTimeout(r, i < 5 ? 1000 : 2000));
        const job = await api.get('/v1/ai/jobs/{id}', { params: { id: accepted.jobId } });
        if (job.status === 'succeeded' || job.status === 'failed') {
          if (job.status === 'failed') toast.show({ title: 'The AI could not mark your answers', description: 'Your credits were refunded.', tone: 'danger' });
          break;
        }
      }
      onAi(await api.get('/v1/attempts/{id}/ai-evaluation', { params: { id: attemptId } }));
    } catch (err) {
      setBlock(aiBlockFrom(err));
    } finally {
      setRunning(false);
    }
  };

  return { quote, running, block, setBlock, ask, run, cancel: () => setQuote(null) };
}

function AiEvaluationPanel({ result, written, ai, onAi }: { result: AttemptResult; written: AttemptResultItem[]; ai: AiEvaluation | null; onAi: (e: AiEvaluation) => void }) {
  const { aiAllowed } = useCredits();
  const evalApi = useAiEvaluation(result.attempt.id, onAi);
  const answered = written.filter((i) => i.response !== null).length;

  // Earlier AI marks for this attempt, if any.
  useEffect(() => {
    if (!aiAllowed) return;
    let alive = true;
    api
      .get('/v1/attempts/{id}/ai-evaluation', { params: { id: result.attempt.id } })
      .then((e) => alive && e.items.length > 0 && onAi(e))
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [aiAllowed, result.attempt.id, onAi]);

  return (
    <Card as="section" aria-labelledby="ai-eval-title" data-testid="ai-evaluation">
      <CardTitle as="h2" id="ai-eval-title">
        AI marks for written answers <Badge tone="accent">Optional</Badge>
      </CardTitle>
      {!aiAllowed ? (
        <AiNotice block={{ kind: 'consent' }} feature="AI marking" />
      ) : (
        <>
          <p className={s.muted}>
            The AI marks your written answers against the marking scheme, step by step. AI marks are a second opinion: they never change your score, percentile or rank.
          </p>
          {ai && ai.items.length > 0 && (
            <p data-testid="ai-total">
              <strong>
                AI marks: {scoreText(ai.totalMarks)} / {scoreText(ai.maxMarks)}
              </strong>{' '}
              <span className={s.muted}>(not part of your score)</span>
            </p>
          )}
          <div className={s.row}>
            <Button icon="spark" onClick={() => void evalApi.ask()} loading={evalApi.running} disabled={answered === 0} data-testid="ai-evaluate-all">
              {ai && ai.items.length > 0 ? 'Mark the rest with AI' : 'Get AI marks'}
            </Button>
            {evalApi.running && <span role="status">The AI is marking your answers…</span>}
          </div>
          {answered === 0 && <p className={s.muted}>Answer a written question next time to get AI marks.</p>}
        </>
      )}
      {evalApi.block && evalApi.block.kind !== 'paywall' && evalApi.block.kind !== 'plan' && <AiNotice block={evalApi.block} />}
      <QuoteDialog open={evalApi.quote !== null} quote={evalApi.quote?.quote ?? null} what={evalApi.quote?.what ?? ''} onConfirm={() => void evalApi.run()} onClose={evalApi.cancel} />
      <PaywallDialog block={evalApi.block && (evalApi.block.kind === 'paywall' || evalApi.block.kind === 'plan') ? evalApi.block : null} onClose={() => evalApi.setBlock(null)} />
    </Card>
  );
}

function AiMarks({ item }: { item: AiEvaluation['items'][number] }) {
  return (
    <div className={s.aiBox} data-testid="ai-marks">
      <h4>
        <Icon name="spark" size={16} /> AI marks: {scoreText(item.marks)} / {scoreText(item.maxMarks)} <Badge tone={item.lowConfidence ? 'warning' : 'accent'}>{item.label}</Badge>
      </h4>
      <p className={s.muted}>Not part of your score.</p>
      {item.steps.length > 0 && (
        <ol className={s.aiSteps}>
          {item.steps.map((st, i) => (
            <li key={i}>
              {st.step}: {scoreText(st.awarded)}/{scoreText(st.max)}
              {st.reason ? ` — ${st.reason}` : ''}
            </li>
          ))}
        </ol>
      )}
      {item.feedback && <p>{item.feedback}</p>}
    </div>
  );
}

/* ── Question review and self-evaluation ───────────────────────────────────────────────────────── */

function ReviewList({ result, lang, ai, onChange, onAi }: { result: AttemptResult; lang?: string; ai: AiEvaluation | null; onChange: (r: AttemptResult) => void; onAi: (e: AiEvaluation) => void }) {
  const [filter, setFilter] = useState<Filter>('all');
  const [slotsModule, setSlotsModule] = useState<SlotsModule | null>(null);
  const { aiAllowed } = useCredits();
  const evalApi = useAiEvaluation(result.attempt.id, onAi);

  useEffect(() => {
    let alive = true;
    import('@/components/platform/ui/question/slots').then((m) => alive && setSlotsModule(m));
    return () => {
      alive = false;
    };
  }, []);

  const order = useMemo(() => result.sectionsLayout.flatMap((sec) => sec.itemIds), [result.sectionsLayout]);
  const items = useMemo(() => {
    const byId = new Map(result.items.map((i) => [i.itemId, i]));
    return order.map((id) => byId.get(id)).filter((i): i is AttemptResultItem => !!i);
  }, [order, result.items]);
  const shown = items.filter((i) =>
    filter === 'all' ? true : filter === 'wrong' ? i.status === 'wrong' || i.status === 'partial' : filter === 'unanswered' ? i.status === 'unanswered' : hasWrittenPart(i),
  );
  const slots = useMemo(() => {
    const m = new Map<string, QuestionSlots>();
    if (slotsModule) for (const i of items) m.set(i.itemId, slotsModule.buildQuestionSlots(i.question, lang));
    return m;
  }, [slotsModule, items, lang]);
  const aiFor = (id: string) => ai?.items.find((x) => x.itemId === id);

  const counts = {
    all: items.length,
    wrong: items.filter((i) => i.status === 'wrong' || i.status === 'partial').length,
    unanswered: items.filter((i) => i.status === 'unanswered').length,
    written: items.filter(hasWrittenPart).length,
  };

  return (
    <section aria-labelledby="review-title">
      <h2 id="review-title" className={s.sectionHeading}>
        Questions and solutions
      </h2>
      <div className={s.filterRow} role="group" aria-label="Show">
        {(['all', 'wrong', 'unanswered', 'written'] as const).map((f) => (
          <Button key={f} size="sm" variant={filter === f ? 'primary' : 'secondary'} aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f === 'all' ? 'All' : f === 'wrong' ? 'Wrong' : f === 'unanswered' ? 'Not answered' : 'Written'} ({counts[f]})
          </Button>
        ))}
      </div>
      {!slotsModule && <Skeleton variant="block" height={160} />}
      <ol className={s.reviewList} data-testid="review-list">
        {slotsModule &&
          shown.map((item) => {
            const sl = slots.get(item.itemId);
            if (!sl) return null;
            const st = STATUS_TEXT[item.status];
            const aiItem = aiFor(item.itemId);
            return (
              <li key={item.itemId} data-item-id={item.itemId} data-status={item.status}>
                <p className={s.reviewMeta}>
                  <Badge tone={st.tone}>{st.label}</Badge>
                  {!item.counted && <Badge>Not counted (choice)</Badge>}
                  {item.markedForReview && <Badge icon="flag">Marked</Badge>}
                  <span>Time: {item.timeSpentSec >= 60 ? durationText(Math.round(item.timeSpentSec / 60)) : `${item.timeSpentSec} s`}</span>
                </p>
                <QuestionCard
                  mode="review"
                  question={item.question}
                  slots={sl}
                  number={item.number}
                  lang={lang}
                  headingLevel="h3"
                  draft={fromResponse(item.question, item.response)}
                  initialResult={toReveal(item)}
                />
                {hasWrittenPart(item) && item.response !== null && <SelfEvaluation item={item} attemptId={result.attempt.id} onChange={onChange} />}
                {aiItem && <AiMarks item={aiItem} />}
                {hasWrittenPart(item) && item.response !== null && aiAllowed && !aiItem && (
                  <Button size="sm" variant="ghost" icon="spark" onClick={() => void evalApi.ask([item.itemId])} loading={evalApi.running}>
                    Ask AI to mark this answer
                  </Button>
                )}
              </li>
            );
          })}
      </ol>
      <QuoteDialog open={evalApi.quote !== null} quote={evalApi.quote?.quote ?? null} what={evalApi.quote?.what ?? ''} onConfirm={() => void evalApi.run()} onClose={evalApi.cancel} />
      <PaywallDialog block={evalApi.block && (evalApi.block.kind === 'paywall' || evalApi.block.kind === 'plan') ? evalApi.block : null} onClose={() => evalApi.setBlock(null)} />
      {evalApi.block && evalApi.block.kind !== 'paywall' && evalApi.block.kind !== 'plan' && <AiNotice block={evalApi.block} />}
    </section>
  );
}

function SelfEvaluation({ item, attemptId, onChange }: { item: AttemptResultItem; attemptId: string; onChange: (r: AttemptResult) => void }) {
  const selfParts = item.parts.filter((p) => p.grading === 'self');
  const steps = selfParts.length === 0 ? (item.key?.marking_scheme ?? []) : [];
  const [values, setValues] = useState<string[]>(() => (selfParts.length ? selfParts.map(() => '') : steps.length ? steps.map(() => '') : ['']));
  const [state, setState] = useState<'idle' | 'saving' | 'error'>('idle');
  const done = item.selfMarks !== null;

  const save = async () => {
    const nums = values.map(Number);
    let body: { itemId: string; marks?: number; steps?: number[]; parts?: { id: string; marks: number }[] };
    if (selfParts.length) body = { itemId: item.itemId, parts: selfParts.map((p, i) => ({ id: p.id, marks: nums[i]! })) };
    else if (steps.length) body = { itemId: item.itemId, steps: nums };
    else body = { itemId: item.itemId, marks: nums[0]! };
    setState('saving');
    try {
      onChange(await api.post('/v1/attempts/{id}/self-evaluation', { params: { id: attemptId }, body: { items: [body] } }));
      setState('idle');
    } catch {
      setState('error');
    }
  };

  const rows = selfParts.length
    ? selfParts.map((p, i) => ({ label: `Part ${i + 1}`, max: p.maxMarks }))
    : steps.length
      ? steps.map((st, i) => ({ label: `Step ${i + 1}: ${st.step.replace(/[*_`$\\]/g, '').slice(0, 120)}`, max: st.marks }))
      : [{ label: 'Your marks', max: item.selfMax || item.marks }];
  const ready = values.every((v) => v !== '');

  return (
    <form
      className={s.selfEval}
      data-testid="self-eval"
      onSubmit={(e) => {
        e.preventDefault();
        if (ready) void save();
      }}
    >
      <h4>{done ? `Self-marked: ${scoreText(item.selfMarks)} / ${scoreText(item.selfMax)}` : 'Mark your answer'}</h4>
      <p className={s.muted}>Compare your answer with the model answer and marking scheme. Self-marks count in your total, not in ranks or percentiles.</p>
      {rows.map((r, i) => (
        <div className={s.stepRow} key={i}>
          <label htmlFor={`${item.itemId}-step-${i}`}>{r.label}</label>
          <select
            id={`${item.itemId}-step-${i}`}
            className={s.select}
            value={values[i]}
            onChange={(e) => setValues((v) => v.map((x, k) => (k === i ? e.target.value : x)))}
          >
            <option value="">Marks…</option>
            {selfMarkSteps(r.max).map((m) => (
              <option key={m} value={String(m)}>
                {m} / {r.max}
              </option>
            ))}
          </select>
        </div>
      ))}
      <div className={s.row}>
        <Button type="submit" size="sm" loading={state === 'saving'} disabled={!ready}>
          {done ? 'Update my marks' : 'Save my marks'}
        </Button>
        {state === 'error' && (
          <span className={cx(s.error)} role="alert">
            Could not save. Please try again.
          </span>
        )}
      </div>
    </form>
  );
}
