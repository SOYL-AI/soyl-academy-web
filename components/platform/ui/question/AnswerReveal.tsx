'use client';

/**
 * What the student sees after the server checked an answer (POST /v1/practice/answers): verdict, marks,
 * the correct answer where the inputs cannot show it, the worked solution, the marking scheme, and for
 * written answers the model answer and rubric. All of it comes from the response (F-006: nothing is in the
 * page before answering). Markdown is rendered by the lazily loaded RichText chunk.
 */
import { useId, useState } from 'react';
import type { AnswerKey } from '@/platform/shared/api-client';
import { cx } from '../cx';
import { Button } from '../kit/Button';
import { Icon } from '../kit/Icon';
import { selfMarkSteps } from './model';
import { RichText } from './RichText';
import s from './question.module.css';

/** The content-contract Answer shapes (platform/shared/content/question.ts), as the API returns them. */
export type KeyAnswer =
  | { option_ids: string[] }
  | { value: number; tolerance?: number; unit?: string | null }
  | { blanks: { accepted: string[] }[] }
  | { pairs: { left_id: string; right_id: string }[] }
  | { model_answer_md: string }
  | { order: string[] }
  | { output: string }
  | { places: { id: string; name: string; accepted?: string[]; kind?: string }[] };

export function keyAnswer(key: AnswerKey | undefined | null): KeyAnswer | null {
  const a = key?.answer;
  return a && typeof a === 'object' ? (a as KeyAnswer) : null;
}

export function correctOptionIds(key: AnswerKey | undefined | null): string[] {
  const a = keyAnswer(key);
  return a && 'option_ids' in a && Array.isArray(a.option_ids) ? a.option_ids : [];
}

export function correctPairs(key: AnswerKey | undefined | null): Record<string, string> | null {
  const a = keyAnswer(key);
  return a && 'pairs' in a && Array.isArray(a.pairs) ? Object.fromEntries(a.pairs.map((p) => [p.left_id, p.right_id])) : null;
}

export function correctOrder(key: AnswerKey | undefined | null): string[] | null {
  const a = keyAnswer(key);
  return a && 'order' in a && Array.isArray(a.order) ? a.order : null;
}

function formatNumber(v: number): string {
  return Number.isInteger(v) ? String(v) : String(Math.round(v * 1e6) / 1e6);
}

export interface PartVerdict {
  correct: boolean | null;
  marksAwarded: number | null;
  maxMarks: number;
  grading: 'auto' | 'self';
}

export function Verdict({ v, compact }: { v: PartVerdict; compact?: boolean }) {
  const tone = v.correct === true ? 'good' : v.correct === false ? (v.marksAwarded ? 'partial' : 'bad') : 'self';
  const title =
    v.correct === true ? 'Correct' : v.correct === false ? (v.marksAwarded ? 'Partly correct' : 'Not quite') : 'Check it yourself';
  return (
    <div className={cx(s.verdict, s[`verdict-${tone}`], compact && s.verdictCompact)} data-verdict={tone} role="status">
      <Icon name={tone === 'good' ? 'check' : tone === 'self' ? 'info' : 'close'} size={20} />
      <span className={s.verdictTitle}>{title}</span>
      <span className={s.verdictMarks}>
        {v.marksAwarded !== null ? `${formatNumber(v.marksAwarded)} / ${formatNumber(v.maxMarks)} ${v.maxMarks === 1 ? 'mark' : 'marks'}` : `${formatNumber(v.maxMarks)} ${v.maxMarks === 1 ? 'mark' : 'marks'}: compare with the model answer`}
      </span>
    </div>
  );
}

/** Correct answers the inputs cannot show themselves (numbers, blanks, code output, places). */
function CorrectAnswer({ answer, lang }: { answer: KeyAnswer | null; lang?: string }) {
  if (!answer) return null;
  if ('value' in answer) {
    const tol = answer.tolerance ? ` (±${formatNumber(answer.tolerance)})` : '';
    return (
      <p className={s.keyLine}>
        <strong>Answer:</strong> {formatNumber(answer.value)}
        {answer.unit ? ` ${answer.unit}` : ''}
        {tol}
      </p>
    );
  }
  if ('blanks' in answer) {
    return (
      <div className={s.keyLine}>
        <strong>Answers:</strong>
        <ol className={s.keyList} lang={lang}>
          {answer.blanks.map((b, i) => (
            <li key={i}>
              ({i + 1}) {b.accepted[0]}
              {b.accepted.length > 1 && <span className={s.fieldNote}> · also accepted: {b.accepted.slice(1).join(', ')}</span>}
            </li>
          ))}
        </ol>
      </div>
    );
  }
  if ('output' in answer) {
    return (
      <div className={s.keyLine}>
        <strong>Expected output:</strong>
        <pre className={s.codeOutput} tabIndex={0}>
          {answer.output}
        </pre>
      </div>
    );
  }
  if ('places' in answer) {
    return (
      <div className={s.keyLine}>
        <strong>Places:</strong>
        <ul className={s.keyList} lang={lang}>
          {answer.places.map((p) => (
            <li key={p.id}>
              {p.id}: {p.name}
              {p.accepted && p.accepted.length > 0 && <span className={s.fieldNote}> · also: {p.accepted.join(', ')}</span>}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
}

/** Solution, model answer, marking scheme and rubric for one part. */
export function KeyDetails({ answerKey, lang, headingLevel = 'h4' }: { answerKey: AnswerKey; lang?: string; headingLevel?: 'h3' | 'h4' | 'h5' }) {
  const H = headingLevel;
  const answer = keyAnswer(answerKey);
  const model = answer && 'model_answer_md' in answer ? answer.model_answer_md : null;
  return (
    <div className={s.keyDetails} data-testid="answer-key">
      <CorrectAnswer answer={answer} lang={lang} />
      {model && (
        <section className={s.keySection}>
          <H className={s.keyHeading}>Model answer</H>
          <RichText lang={lang} headingOffset={4}>
            {model}
          </RichText>
        </section>
      )}
      {answerKey.solution_md && (
        <section className={s.keySection}>
          <H className={s.keyHeading}>Solution</H>
          <RichText lang={lang} headingOffset={4}>
            {answerKey.solution_md}
          </RichText>
        </section>
      )}
      {answerKey.marking_scheme.length > 0 && (
        <section className={s.keySection}>
          <H className={s.keyHeading}>Marking scheme</H>
          <ol className={s.scheme}>
            {answerKey.marking_scheme.map((step, i) => (
              <li key={i}>
                <span>
                  <RichText inline lang={lang} allowImages={false}>
                    {step.step}
                  </RichText>
                </span>
                <span className={s.schemeMarks}>
                  {formatNumber(step.marks)} {step.marks === 1 ? 'mark' : 'marks'}
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}
      {answerKey.rubric && answerKey.rubric.length > 0 && (
        <section className={s.keySection}>
          <H className={s.keyHeading}>Rubric</H>
          <div className={s.tableWrap} role="region" aria-label="Rubric" tabIndex={0}>
            <table className={s.rubric}>
              <thead>
                <tr>
                  <th scope="col">Criterion</th>
                  <th scope="col">Marks</th>
                  <th scope="col">What earns them</th>
                </tr>
              </thead>
              <tbody>
                {answerKey.rubric.map((r, i) => (
                  <tr key={i}>
                    <th scope="row">{r.criterion}</th>
                    <td>{formatNumber(r.marks)}</td>
                    <td>
                      {r.descriptor_md ? (
                        <RichText inline lang={lang} allowImages={false}>
                          {r.descriptor_md}
                        </RichText>
                      ) : (
                        '—'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}

/**
 * Self-assessment of written answers against the marking scheme (members: PATCH /v1/practice/answers/:id;
 * guests are invited to log in, CONTEXT §5).
 */
export function SelfMark({
  max,
  onSave,
  onLogin,
}: {
  max: number;
  onSave?: (marks: number) => Promise<void>;
  onLogin?: () => void;
}) {
  const id = useId();
  const [marks, setMarks] = useState<string>('');
  const [state, setState] = useState<{ status: 'idle' | 'saving' | 'saved' | 'error'; message?: string }>({ status: 'idle' });
  if (!onSave) {
    return (
      <div className={s.selfMark} data-testid="self-mark-guest">
        <p>Compare your answer with the model answer and marking scheme, and give yourself marks out of {max}.</p>
        {onLogin && (
          <Button size="sm" variant="secondary" onClick={onLogin}>
            Log in to save your marks
          </Button>
        )}
      </div>
    );
  }
  if (state.status === 'saved') {
    return (
      <p className={cx(s.selfMark, s.good)} role="status" data-testid="self-mark-saved">
        <Icon name="check" size={18} /> Saved: {marks} / {max} marks.
      </p>
    );
  }
  return (
    <form
      className={s.selfMark}
      data-testid="self-mark"
      onSubmit={async (e) => {
        e.preventDefault();
        if (marks === '') return;
        setState({ status: 'saving' });
        try {
          await onSave(Number(marks));
          setState({ status: 'saved' });
        } catch (err) {
          setState({ status: 'error', message: err instanceof Error && err.message ? 'Could not save your marks. Please try again.' : 'Could not save your marks.' });
        }
      }}
    >
      <label htmlFor={id} className={s.fieldLabel}>
        Mark your answer (out of {max})
      </label>
      <span className={s.inputRow}>
        <select id={id} className={s.select} value={marks} onChange={(e) => setMarks(e.target.value)}>
          <option value="">Choose…</option>
          {selfMarkSteps(max).map((m) => (
            <option key={m} value={String(m)}>
              {m}
            </option>
          ))}
        </select>
        <Button type="submit" size="sm" loading={state.status === 'saving'} disabled={marks === ''}>
          Save marks
        </Button>
      </span>
      {state.status === 'error' && (
        <p className={s.error} role="alert">
          {state.message}
        </p>
      )}
    </form>
  );
}
