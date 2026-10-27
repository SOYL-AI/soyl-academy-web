'use client';

/**
 * Custom test builder (ARCHITECTURE §3.1; backend-api M3 handoff §8; CONTEXT §5: free). Pick a subject and
 * 1–20 chapters, optionally question types, difficulty, number of questions (5–60) and time; the API
 * assembles a paper from the practice bank (POST /v1/tests/custom) and we start it straight away.
 * Also the entry point for "Papers like my school's" (paper-from-upload, AI): Pro and Board Exam Pass only
 * (D-034), so the quote's `allowedForPlan` decides between the upload form and an upgrade prompt.
 */
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useId, useState, type FormEvent } from 'react';
import { isApiError, type AiJobAccepted, type AiQuote, type CatalogChapters, type CatalogSubjects, type CustomTest, type QuestionType } from '@/platform/shared/api-client';
import { Button } from '@/components/platform/ui/kit/Button';
import { Badge, Card, CardTitle, EmptyState, Skeleton } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { QUESTION_TYPE_LABELS } from '@/components/platform/ui/question/model';
import { useSession } from '../auth/SessionProvider';
import { AiNotice, PaywallDialog, QuoteDialog } from '../ai/AiDialogs';
import { useCredits } from '../ai/CreditsProvider';
import { aiBlockFrom, creditsText, newIdempotencyKey, type AiBlock } from '../ai/problems';
import { AI_UPLOADS } from '@/platform/shared/config/ai-actions';
import { prepareFile, uploadForAi, UploadRejected } from '../ai/upload';
import { api } from '../lib/api-browser';
import { BOARDS, BOARD_NAMES, CLASS_LEVELS, examLabel, type BoardSlug } from '../lib/catalog';
import { attemptPath, testProblemMessage } from './player-model';
import s from './tests.module.css';

const TYPES: QuestionType[] = ['mcq', 'multi-select', 'assertion-reason', 'true-false', 'numerical', 'fill-blank', 'match', 'case-based', 'source-based', 'short', 'long'];
export const BUILDER_LIMITS = { minQuestions: 5, maxQuestions: 60, maxChapters: 20, minDuration: 5, maxDuration: 180 } as const;

export function BuilderClient() {
  const { state, openLogin } = useSession();
  if (state.status === 'loading') return <Skeleton lines={3} />;
  if (state.status === 'guest') {
    return (
      <EmptyState title="Log in to build a test" headingLevel="h2" icon="lock" action={<Button onClick={() => openLogin({ reason: 'Log in to build your own tests. It is free.' })}>Log in</Button>}>
        Pick chapters and question types, and we make a paper from our question bank. Free.
      </EmptyState>
    );
  }
  return <Builder initialBoard={(state.user.board as BoardSlug | null) ?? 'cbse'} initialClass={state.user.classLevel ?? 10} />;
}

function Builder({ initialBoard, initialClass }: { initialBoard: BoardSlug; initialClass: number }) {
  const router = useRouter();
  const ids = { board: useId(), cls: useId(), subject: useId(), count: useId(), duration: useId(), title: useId(), dmin: useId(), dmax: useId() };
  const [board, setBoard] = useState<BoardSlug>((BOARDS as readonly string[]).includes(initialBoard) ? initialBoard : 'cbse');
  const [classLevel, setClassLevel] = useState(initialClass);
  const [subjects, setSubjects] = useState<CatalogSubjects | null>(null);
  const [subjectId, setSubjectId] = useState('');
  const [chapters, setChapters] = useState<CatalogChapters | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const [types, setTypes] = useState<QuestionType[]>([]);
  const [count, setCount] = useState('20');
  const [duration, setDuration] = useState('');
  const [dmin, setDmin] = useState('1');
  const [dmax, setDmax] = useState('5');
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [built, setBuilt] = useState<CustomTest | null>(null);

  useEffect(() => {
    let alive = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reload subjects when board/class change
    setSubjects(null);
    api
      .get('/v1/catalog/{board}/{class}/subjects', { params: { board, class: classLevel } })
      .then((r) => {
        if (!alive) return;
        setSubjects(r);
        setSubjectId((cur) => (r.subjects.some((x) => x.id === cur) ? cur : (r.subjects[0]?.id ?? '')));
      })
      .catch(() => alive && setSubjects({ academicYear: '', board, classLevel, subjects: [] }));
    return () => {
      alive = false;
    };
  }, [board, classLevel]);

  useEffect(() => {
    if (!subjectId) return;
    let alive = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reload chapters when the subject changes
    setChapters(null);
    setPicked([]);
    api
      .get('/v1/catalog/subjects/{id}/chapters', { params: { id: subjectId } })
      .then((r) => alive && setChapters(r))
      .catch(() => alive && setChapters(null));
    return () => {
      alive = false;
    };
  }, [subjectId]);

  const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const build = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const n = Number(count);
    if (!picked.length) return setError('Pick at least one chapter.');
    if (picked.length > BUILDER_LIMITS.maxChapters) return setError(`Pick at most ${BUILDER_LIMITS.maxChapters} chapters.`);
    if (!Number.isInteger(n) || n < BUILDER_LIMITS.minQuestions || n > BUILDER_LIMITS.maxQuestions) return setError(`Choose between ${BUILDER_LIMITS.minQuestions} and ${BUILDER_LIMITS.maxQuestions} questions.`);
    const d = duration ? Number(duration) : undefined;
    if (d !== undefined && (!Number.isInteger(d) || d < BUILDER_LIMITS.minDuration || d > BUILDER_LIMITS.maxDuration)) return setError(`Time must be ${BUILDER_LIMITS.minDuration}–${BUILDER_LIMITS.maxDuration} minutes.`);
    const lo = Number(dmin);
    const hi = Number(dmax);
    setBusy(true);
    try {
      const res = await api.post('/v1/tests/custom', {
        body: {
          subjectId,
          chapterIds: picked,
          questionCount: n,
          ...(types.length ? { types } : {}),
          ...(lo > 1 || hi < 5 ? { difficulty: { min: Math.min(lo, hi), max: Math.max(lo, hi) } } : {}),
          ...(d ? { durationMin: d } : {}),
          ...(title.trim() ? { title: title.trim().slice(0, 120) } : {}),
        },
      });
      setBuilt(res);
    } catch (err) {
      setError(testProblemMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const start = async () => {
    if (!built) return;
    setBusy(true);
    try {
      const res = await api.post('/v1/tests/{id}/attempts', { params: { id: built.id }, body: { start: true } });
      router.push(attemptPath(res.attempt.id));
    } catch (err) {
      setError(testProblemMessage(err));
      setBusy(false);
    }
  };

  const chapterName = (id: string) => chapters?.chapters.find((c) => c.id === id)?.title ?? id;

  if (built) {
    return (
      <Card as="section" aria-labelledby="built-title" data-testid="built">
        <CardTitle as="h2" id="built-title">
          Your test is ready
        </CardTitle>
        <p>
          <strong>{built.title}</strong>: {built.questionCount} questions · {built.totalMarks} marks · {built.durationMin} min
        </p>
        {built.skippedChapters.length > 0 && (
          <p className={s.muted} data-testid="skipped">
            No questions matched in: {built.skippedChapters.map(chapterName).join(', ')}.
          </p>
        )}
        {error && (
          <p className={s.error} role="alert">
            {error}
          </p>
        )}
        <div className={s.row}>
          <Button onClick={() => void start()} loading={busy} data-testid="start-custom">
            Start test
          </Button>
          <Button variant="secondary" onClick={() => setBuilt(null)}>
            Change choices
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className={s.stack}>
      <form className={s.form} onSubmit={(e) => void build(e)} noValidate data-testid="builder">
        <fieldset className={s.fieldset}>
          <legend>Subject</legend>
          <div className={s.pickers}>
            <label className={s.field} htmlFor={ids.board}>
              Board
              <select id={ids.board} className={s.select} value={board} onChange={(e) => setBoard(e.target.value as BoardSlug)}>
                {BOARDS.map((b) => (
                  <option key={b} value={b}>
                    {BOARD_NAMES[b]}
                  </option>
                ))}
              </select>
            </label>
            <label className={s.field} htmlFor={ids.cls}>
              Class
              <select id={ids.cls} className={s.select} value={classLevel} onChange={(e) => setClassLevel(Number(e.target.value))}>
                {CLASS_LEVELS.map((c) => (
                  <option key={c} value={c}>
                    Class {c} ({examLabel(board, c)})
                  </option>
                ))}
              </select>
            </label>
            <label className={s.field} htmlFor={ids.subject}>
              Subject
              <select id={ids.subject} className={s.select} value={subjectId} onChange={(e) => setSubjectId(e.target.value)} disabled={!subjects?.subjects.length}>
                {subjects?.subjects.map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </fieldset>

        <fieldset className={s.fieldset}>
          <legend>
            Chapters <span className={s.muted}>({picked.length} chosen, up to {BUILDER_LIMITS.maxChapters})</span>
          </legend>
          {!chapters ? (
            <Skeleton lines={4} />
          ) : (
            <ul className={s.checkList} data-testid="chapter-picker">
              {chapters.chapters.map((c) => (
                <li key={c.id}>
                  <label className={s.check}>
                    <input type="checkbox" checked={picked.includes(c.id)} onChange={() => setPicked((p) => toggle(p, c.id))} value={c.id} />
                    <span>
                      {c.number}. {c.title}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </fieldset>

        <fieldset className={s.fieldset}>
          <legend>Paper</legend>
          <div className={s.pickers}>
            <label className={s.field} htmlFor={ids.count}>
              Questions ({BUILDER_LIMITS.minQuestions}–{BUILDER_LIMITS.maxQuestions})
              <input id={ids.count} className={s.numberInput} inputMode="numeric" value={count} onChange={(e) => setCount(e.target.value.replace(/\D/g, '').slice(0, 2))} />
            </label>
            <label className={s.field} htmlFor={ids.duration}>
              Minutes (optional)
              <input id={ids.duration} className={s.numberInput} inputMode="numeric" value={duration} placeholder="auto" onChange={(e) => setDuration(e.target.value.replace(/\D/g, '').slice(0, 3))} />
            </label>
            <label className={s.field} htmlFor={ids.dmin}>
              Easiest
              <select id={ids.dmin} className={s.select} value={dmin} onChange={(e) => setDmin(e.target.value)}>
                {[1, 2, 3, 4, 5].map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </label>
            <label className={s.field} htmlFor={ids.dmax}>
              Hardest
              <select id={ids.dmax} className={s.select} value={dmax} onChange={(e) => setDmax(e.target.value)}>
                {[1, 2, 3, 4, 5].map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className={s.field} htmlFor={ids.title}>
            Title (optional)
            <input id={ids.title} className={s.select} value={title} maxLength={120} onChange={(e) => setTitle(e.target.value)} />
          </label>
        </fieldset>

        <fieldset className={s.fieldset}>
          <legend>
            Question types <span className={s.muted}>(optional: all types if none)</span>
          </legend>
          <ul className={s.checkList}>
            {TYPES.map((t) => (
              <li key={t}>
                <label className={s.check}>
                  <input type="checkbox" checked={types.includes(t)} onChange={() => setTypes((x) => toggle(x, t))} />
                  <span>{QUESTION_TYPE_LABELS[t]}</span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>

        {error && (
          <p className={s.error} role="alert" data-testid="builder-error">
            <Icon name="alert" size={16} /> {error}
          </p>
        )}
        <Button type="submit" size="lg" loading={busy} disabled={!subjectId} data-testid="build-test">
          Build my test
        </Button>
      </form>

      {subjectId && <PaperFromUpload subjectId={subjectId} />}
    </div>
  );
}

/** "Papers like my school's": Pro / Board Exam Pass (D-034). The quote decides what the student sees. */
function PaperFromUpload({ subjectId }: { subjectId: string }) {
  const router = useRouter();
  const { aiAllowed, setBalance } = useCredits();
  const fileId = useId();
  const [quote, setQuote] = useState<AiQuote | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [stage, setStage] = useState<'idle' | 'uploading' | 'checking' | 'building'>('idle');
  const [block, setBlock] = useState<AiBlock | null>(null);

  useEffect(() => {
    if (!aiAllowed) return;
    let alive = true;
    api
      .get('/v1/ai/quote/{action}', { params: { action: 'paper-from-upload' } })
      .then((q) => alive && setQuote(q))
      .catch((err) => alive && setBlock(aiBlockFrom(err)));
    return () => {
      alive = false;
    };
  }, [aiAllowed]);

  const run = async () => {
    setConfirming(false);
    if (!file) return;
    setBlock(null);
    try {
      const prepared = await prepareFile(file);
      const up = await uploadForAi({ kind: 'sample_paper', blob: prepared.blob, contentType: prepared.contentType, onStage: setStage });
      setStage('building');
      const body = (await api.post('/v1/ai/{action}', {
        params: { action: 'paper-from-upload' },
        body: { uploadId: up.id, subjectId },
        headers: { 'idempotency-key': newIdempotencyKey() },
      })) as unknown as AiJobAccepted;
      if (!body?.jobId) throw new UploadRejected('processing_failed');
      setBalance(body.balance);
      for (let i = 0; i < 120; i++) {
        await new Promise((r) => setTimeout(r, 2000));
        const job = await api.get('/v1/ai/jobs/{id}', { params: { id: body.jobId } });
        if (job.status === 'failed') throw new UploadRejected('processing_failed');
        if (job.status === 'succeeded') {
          const testId = typeof job.result?.testId === 'string' ? job.result.testId : null;
          if (!testId) throw new UploadRejected('processing_failed');
          const attempt = await api.post('/v1/tests/{id}/attempts', { params: { id: testId }, body: { start: false } });
          router.push(attemptPath(attempt.attempt.id));
          return;
        }
      }
      throw new UploadRejected('processing_failed');
    } catch (err) {
      setStage('idle');
      if (err instanceof UploadRejected) setBlock({ kind: 'other', message: err.message });
      else if (isApiError(err)) setBlock(aiBlockFrom(err));
      else setBlock({ kind: 'other', message: 'We could not build a paper from that file. Your credits were refunded.' });
    }
  };

  return (
    <Card as="section" aria-labelledby="pfu-title" data-testid="paper-from-upload">
      <CardTitle as="h2" id="pfu-title">
        Papers like your school’s <Badge tone="accent">Pro</Badge>
      </CardTitle>
      <p className={s.muted}>Upload a sample paper from your school. The AI reads its pattern (sections, marks, chapters) and builds a fresh paper from our question bank. Your school’s questions are never reused.</p>
      {!aiAllowed ? (
        <AiNotice block={{ kind: 'consent' }} feature="Papers like your school’s" />
      ) : !quote ? (
        block ? <AiNotice block={block} /> : <Skeleton lines={1} />
      ) : !quote.allowedForPlan ? (
        <div className={s.row} data-testid="pfu-upgrade">
          <p className={s.muted}>This is part of Pro and the Board Exam Pass ({creditsText(quote.credits)} per paper).</p>
          <Link href="/plans">Upgrade to Pro</Link>
        </div>
      ) : (
        <>
          <label className={s.field} htmlFor={fileId}>
            Sample paper (a photo of the paper, up to 10 MB)
            <input id={fileId} type="file" accept={AI_UPLOADS.contentTypes.join(',')} onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          </label>
          <Button icon="spark" disabled={!file || stage !== 'idle'} loading={stage !== 'idle'} onClick={() => setConfirming(true)}>
            Build a paper ({creditsText(quote.credits)})
          </Button>
          {stage !== 'idle' && <p role="status">{stage === 'building' ? 'Reading the pattern and building your paper…' : 'Uploading…'}</p>}
        </>
      )}
      {block && block.kind !== 'paywall' && block.kind !== 'plan' && quote && <AiNotice block={block} />}
      <QuoteDialog open={confirming} quote={quote} what="a paper like your school’s" onConfirm={() => void run()} onClose={() => setConfirming(false)} />
      <PaywallDialog block={block && (block.kind === 'paywall' || block.kind === 'plan') ? block : null} onClose={() => setBlock(null)} />
    </Card>
  );
}
