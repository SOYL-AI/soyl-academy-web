'use client';

/**
 * One question, answered and checked on the server. Used by practice, lesson check slides and (M3) the
 * test player (which passes its own `submit` and hides the reveal until the result page).
 *
 * - Content arrives pre-rendered as `slots` (stem, options, passage, visuals; see slots.tsx), so this
 *   component ships no Markdown/KaTeX. Answer-key text after checking renders through the lazy RichText.
 * - Every type in contract v2: mcq, multi-select, assertion-reason, true-false, numerical, fill-blank,
 *   match, ordering, code-output, short, long, writing, map, and case/source-based (parts, internal choice
 *   `alternatives`, `passage_origin` label).
 * - F-006: the page never holds answers. `submit` returns the graded result with the key.
 */
import { useId, useState, type ReactNode } from 'react';
import type { PracticeAnswerResult, PracticeResponse, StudentQuestion } from '@/platform/shared/api-client';
import { cx } from '../cx';
import { Badge } from '../kit/Display';
import { Button } from '../kit/Button';
import { Icon } from '../kit/Icon';
import { correctOptionIds, correctOrder, correctPairs, KeyDetails, SelfMark, Verdict } from './AnswerReveal';
import { BlanksInput, ChoiceInput, MapInput, MatchInput, NumericalInput, TextAnswerInput } from './inputs';
import {
  chosenPart,
  initialDraft,
  isCaseType,
  partKey,
  PASSAGE_ORIGIN_LABELS,
  QUESTION_TYPE_LABELS,
  roman,
  submitBlocker,
  toResponse,
  WRITING_FORMAT_LABELS,
  type Draft,
  type QuestionPart,
} from './model';
import { OrderingInput } from './OrderingInput';
import { preloadRichText } from './RichText';
// Types only: slots.tsx imports the Markdown/KaTeX renderers, which must stay out of this client chunk.
import type { PartSlots, QuestionSlots } from './slots';
import s from './question.module.css';

type PartResult = PracticeAnswerResult['parts'][number];

export interface QuestionCardProps {
  question: StudentQuestion;
  slots: QuestionSlots;
  /**
   * - `check` (default): practice and check slides: "Check answer" → `submit` → reveal.
   * - `test` (M3 test player): controlled `draft`/`onDraftChange`, no Check button and no reveal (the key
   *   only exists after the attempt is submitted).
   * - `review` (M3 result page): the student's answer (`draft`) locked, with `initialResult` revealed; no
   *   "Try again", no practice self-mark (the result page self-evaluates per step).
   */
  mode?: 'check' | 'test' | 'review';
  /** Controlled draft (test and review modes). */
  draft?: Draft;
  onDraftChange?: (draft: Draft) => void;
  /** Server check (practice: POST /v1/practice/answers). Throw to show `describeError(err)`. Required in check mode. */
  submit?: (response: PracticeResponse) => Promise<PracticeAnswerResult>;
  /** Members: save a self-mark for written answers. Omit for guests. */
  selfAssess?: (answerId: string, marks: number) => Promise<void>;
  /** Guests: open the login sheet (self-marks need an account). */
  onLogin?: () => void;
  onAnswered?: (result: PracticeAnswerResult) => void;
  describeError?: (err: unknown) => string;
  /** "Question 3 of 18" style number. */
  number?: number;
  lang?: string;
  headingLevel?: 'h2' | 'h3';
  /** Smaller frame inside a slide. */
  compact?: boolean;
  /** Extra actions (Report a mistake, Next question). */
  actions?: ReactNode;
  /** Earlier result to show immediately (e.g. after returning to a check slide). */
  initialResult?: PracticeAnswerResult | null;
  className?: string;
}

function marksText(m: number): string {
  return `${m} ${m === 1 ? 'mark' : 'marks'}`;
}

interface PartEditorProps {
  part: QuestionPart;
  slots: PartSlots | undefined;
  draft: Draft;
  onChange: (d: Draft) => void;
  disabled: boolean;
  label: string;
  lang?: string;
  result: PartResult | PracticeAnswerResult | null;
}

/** The right input for a part's type, with the post-check marks shown in place. */
function PartEditor({ part, slots, draft, onChange, disabled, label, lang, result }: PartEditorProps) {
  const sl: PartSlots = slots ?? { stem: null, options: {}, right: {}, assets: null };
  const common = { part, slots: sl, disabled, label, lang };
  switch (draft.kind) {
    case 'choice':
      return <ChoiceInput {...common} draft={draft} onChange={onChange} reveal={result ? { correctIds: correctOptionIds(result.key) } : null} />;
    case 'value':
      return <NumericalInput {...common} draft={draft} onChange={onChange} />;
    case 'blanks':
      return <BlanksInput {...common} draft={draft} onChange={onChange} blanksCorrect={result?.feedback?.blanksCorrect ?? null} />;
    case 'pairs':
      return <MatchInput {...common} draft={draft} onChange={onChange} correctPairs={result ? correctPairs(result.key) : null} />;
    case 'order':
      return (
        <OrderingInput
          {...common}
          draft={draft}
          onChange={onChange}
          positionsCorrect={result?.feedback?.positionsCorrect ?? null}
          correctOrder={result ? correctOrder(result.key) : null}
        />
      );
    case 'output':
      return <TextAnswerInput {...common} draft={draft} onChange={onChange} mono />;
    case 'text':
      return part.type === 'map' ? <MapInput {...common} draft={draft} onChange={onChange} /> : <TextAnswerInput {...common} draft={draft} onChange={onChange} />;
    default:
      return null;
  }
}

function PartHeader({ part }: { part: QuestionPart }) {
  return (
    <div className={s.partBadges}>
      {part.type === 'writing' && part.format && (
        <Badge tone="accent" data-testid="format-badge">
          {WRITING_FORMAT_LABELS[part.format] ?? part.format}
        </Badge>
      )}
      {part.word_limit && (
        <Badge>
          {part.word_limit.min}–{part.word_limit.max} words
        </Badge>
      )}
    </div>
  );
}

export function QuestionCard({
  question: q,
  slots,
  submit,
  selfAssess,
  onLogin,
  onAnswered,
  describeError,
  number,
  lang,
  headingLevel: H = 'h2',
  compact,
  actions,
  initialResult = null,
  className,
  mode = 'check',
  draft: draftProp,
  onDraftChange,
}: QuestionCardProps) {
  const idBase = useId();
  const [localDraft, setDraft] = useState<Draft>(() => draftProp ?? initialDraft(q));
  const draft = draftProp ?? localDraft;
  const testMode = mode === 'test';
  const review = mode === 'review';
  const [phase, setPhase] = useState<'answering' | 'submitting' | 'answered'>(initialResult ? 'answered' : 'answering');
  const [result, setResult] = useState<PracticeAnswerResult | null>(initialResult);
  const [error, setError] = useState<string | null>(null);
  const answered = phase === 'answered' && result !== null;
  const headingId = `${idBase}-heading`;
  const isCase = isCaseType(q.type);

  const change = (d: Draft) => {
    if (draftProp === undefined) setDraft(d);
    onDraftChange?.(d);
    setError(null);
    if (!testMode) preloadRichText();
  };

  const onSubmit = async () => {
    const blocker = submitBlocker(q, draft);
    if (blocker) {
      setError(blocker);
      return;
    }
    if (!submit) return;
    setPhase('submitting');
    setError(null);
    try {
      const res = await submit(toResponse(draft));
      setResult(res);
      setPhase('answered');
      onAnswered?.(res);
    } catch (err) {
      setPhase('answering');
      setError(describeError ? describeError(err) : 'Could not check your answer. Please try again.');
    }
  };

  const tryAgain = () => {
    setDraft(initialDraft(q));
    setResult(null);
    setPhase('answering');
  };

  return (
    <article
      className={cx(s.card, compact && s.cardCompact, className)}
      aria-labelledby={headingId}
      data-question-id={q.id}
      data-question-type={q.type}
      data-phase={phase}
      lang={lang}
    >
      <header className={s.cardHeader}>
        <H id={headingId} className={s.cardTitle}>
          {number !== undefined ? `Question ${number}` : 'Question'}
          <span className="p-visually-hidden">: {QUESTION_TYPE_LABELS[q.type]}</span>
        </H>
        <div className={s.cardMeta} lang="en">
          <Badge>{QUESTION_TYPE_LABELS[q.type]}</Badge>
          <span>{marksText(q.marks)}</span>
        </div>
      </header>

      {isCase && q.passage_md !== undefined && (
        <section className={s.passage} aria-label="Passage">
          {q.passage_origin && (
            <p className={s.passageOrigin} lang="en" data-testid="passage-origin">
              <Icon name="info" size={16} /> {PASSAGE_ORIGIN_LABELS[q.passage_origin] ?? q.passage_origin}
            </p>
          )}
          {slots.passage}
        </section>
      )}

      <div className={s.stem}>{slots.parts['']?.stem}</div>
      {slots.parts['']?.assets}
      {!isCase && <PartHeader part={q} />}

      <form
        className={s.answerForm}
        onSubmit={(e) => {
          e.preventDefault();
          if (mode === 'check') void onSubmit();
        }}
        noValidate
      >
        {isCase && draft.kind === 'parts' ? (
          <ol className={s.parts}>
            {q.children.map((child, i) => {
              const pd = draft.parts[child.id] ?? { draft: initialDraft(child) };
              const active = chosenPart(child, pd.alternative);
              const key = partKey(child.id, pd.alternative);
              const partResult = result?.parts.find((p) => p.id === child.id) ?? null;
              const setPart = (next: typeof pd) => change({ kind: 'parts', parts: { ...draft.parts, [child.id]: next } });
              return (
                <li key={child.id} className={s.part} data-part-id={child.id}>
                  <div className={s.partHead}>
                    <span className={s.partNumber}>({roman(i)})</span>
                    <span className={s.fieldNote}>{marksText(child.marks)}</span>
                  </div>
                  {child.alternatives.length > 0 && (
                    <fieldset className={s.choiceOfPart} disabled={answered || review}>
                      <legend className={s.fieldLabel}>Internal choice: answer one</legend>
                      {[child, ...child.alternatives].map((opt, k) => (
                        <label key={opt.id} className={s.inlineRadio}>
                          <input
                            type="radio"
                            name={`${idBase}-${child.id}-alt`}
                            checked={(pd.alternative ?? child.id) === opt.id}
                            onChange={() => setPart({ alternative: k === 0 ? undefined : opt.id, draft: initialDraft(opt) })}
                          />
                          {k === 0 ? 'This part' : `Or option ${k + 1}`}
                        </label>
                      ))}
                    </fieldset>
                  )}
                  <div className={s.stem}>{slots.parts[key]?.stem}</div>
                  {slots.parts[key]?.assets}
                  <PartHeader part={active} />
                  <PartEditor
                    part={active}
                    slots={slots.parts[key]}
                    draft={pd.draft}
                    onChange={(d) => setPart({ ...pd, draft: d })}
                    disabled={answered || review || phase === 'submitting'}
                    label={`Answer for part (${roman(i)})`}
                    lang={lang}
                    result={partResult}
                  />
                  {partResult && (
                    <div className={s.reveal}>
                      <Verdict v={partResult} compact />
                      <KeyDetails answerKey={partResult.key} lang={lang} headingLevel={H === 'h2' ? 'h4' : 'h5'} />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        ) : (
          <PartEditor
            part={q}
            slots={slots.parts['']}
            draft={draft}
            onChange={change}
            disabled={answered || review || phase === 'submitting'}
            label={number !== undefined ? `Answer for question ${number}` : 'Your answer'}
            lang={lang}
            result={answered ? result : null}
          />
        )}

        {error && (
          <p className={s.error} role="alert">
            <Icon name="alert" size={16} /> {error}
          </p>
        )}

        {!answered && !testMode && (
          <div className={s.actions}>
            <Button type="submit" loading={phase === 'submitting'}>
              Check answer
            </Button>
            {actions}
          </div>
        )}
        {testMode && actions && <div className={s.actions}>{actions}</div>}
      </form>

      {answered && result && (
        <div className={s.reveal} data-testid="question-result">
          <Verdict v={result} />
          {!isCase && <KeyDetails answerKey={result.key} lang={lang} headingLevel={H === 'h2' ? 'h3' : 'h4'} />}
          {isCase && result.key.solution_md && <KeyDetails answerKey={{ ...result.key, marking_scheme: [] }} lang={lang} headingLevel={H === 'h2' ? 'h3' : 'h4'} />}
          {!review && result.selfAssessmentPending && result.selfMaxMarks > 0 && (
            <SelfMark
              max={result.selfMaxMarks}
              onSave={selfAssess && result.answerId ? (m) => selfAssess(result.answerId!, m) : undefined}
              onLogin={selfAssess ? undefined : onLogin}
            />
          )}
          {(result.xpAwarded > 0 || result.badgesAwarded.length > 0) && (
            <p className={s.xp} role="status">
              <Icon name="spark" size={16} /> +{result.xpAwarded} XP
              {result.badgesAwarded.length > 0 ? ` · New badge: ${result.badgesAwarded.join(', ')}` : ''}
            </p>
          )}
          {review ? (
            actions && <div className={s.actions}>{actions}</div>
          ) : (
            <div className={s.actions}>
              <Button variant="secondary" size="sm" icon="rotate" onClick={tryAgain}>
                Try again
              </Button>
              {actions}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
