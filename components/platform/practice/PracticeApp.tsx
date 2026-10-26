'use client';

/**
 * Practice: filters by type and difficulty, cursor paging (GET /v1/chapters/:id/practice), one question at
 * a time, server-checked answers with the solution and marking scheme revealed afterwards; written answers
 * show the model answer + marking scheme, and members self-mark them. Guest progress stays on the device.
 *
 * Questions arrive as data, so their Markdown/KaTeX is rendered here: the renderer (slots.tsx → Markdown,
 * KaTeX, visuals) is a separate chunk loaded when the page starts, not part of the route's first-load JS.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PracticePage, QuestionType, StudentQuestion } from '@/platform/shared/api-client';
import { cx } from '@/components/platform/ui/cx';
import { Button } from '@/components/platform/ui/kit/Button';
import { Badge, EmptyState, Skeleton } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { QUESTION_TYPE_LABELS } from '@/components/platform/ui/question/model';
import { QuestionCard } from '@/components/platform/ui/question/QuestionCard';
import type { QuestionSlots } from '@/components/platform/ui/question/slots';
import { useSession } from '../auth/SessionProvider';
import { api } from '../lib/api-browser';
import { guestAnswersFor, readGuestProgress } from '../lib/guest-storage';
import { ReportMistake } from '../report/ReportMistake';
import { practiceErrorMessage, usePracticeAnswer } from './usePracticeAnswer';
import s from './practice.module.css';

type SlotsModule = typeof import('@/components/platform/ui/question/slots');

export const PAGE_SIZE = 10;
const DIFFICULTY_LABELS: Record<string, string> = { '1': 'Very easy', '2': 'Easy', '3': 'Medium', '4': 'Hard', '5': 'Very hard' };

interface Item {
  question: StudentQuestion;
  answered: boolean | null;
  lastCorrect: boolean | null;
}

export interface PracticeAppProps {
  chapterId: string;
  lang?: string;
  total: number;
  byType: Record<string, number>;
  byDifficulty: Record<string, number>;
}

function toggle(list: string[], v: string): string[] {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
}

export function PracticeApp({ chapterId, lang, total, byType, byDifficulty }: PracticeAppProps) {
  const { state: session } = useSession();
  const practice = usePracticeAnswer(chapterId);
  const [types, setTypes] = useState<string[]>([]);
  const [difficulties, setDifficulties] = useState<string[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [filteredTotal, setFilteredTotal] = useState<number | null>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [pos, setPos] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slotsModule, setSlotsModule] = useState<SlotsModule | null>(null);
  const [guestAnswers, setGuestAnswers] = useState<Map<string, boolean>>(new Map());
  const [answeredNow, setAnsweredNow] = useState<Record<string, boolean | null>>({});
  const request = useRef(0);
  const cardTop = useRef<HTMLDivElement>(null);

  // The renderer chunk (Markdown, KaTeX, visuals) for question content.
  useEffect(() => {
    let alive = true;
    import('@/components/platform/ui/question/slots').then((m) => alive && setSlotsModule(m));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable after mount
    setGuestAnswers(guestAnswersFor(readGuestProgress(), chapterId));
  }, [chapterId, answeredNow]);

  const load = useCallback(
    async (reset: boolean, after: string | null) => {
      const id = ++request.current;
      setLoading(true);
      setError(null);
      try {
        const page: PracticePage = await api.get('/v1/chapters/{id}/practice', {
          params: { id: chapterId },
          query: {
            limit: PAGE_SIZE,
            ...(after ? { cursor: after } : {}),
            ...(types.length ? { type: types.join(',') } : {}),
            ...(difficulties.length ? { difficulty: difficulties.join(',') } : {}),
          },
        });
        if (id !== request.current) return;
        setItems((prev) => (reset ? page.items : [...prev, ...page.items.filter((it) => !prev.some((p) => p.question.id === it.question.id))]));
        setCursor(page.nextCursor);
        setFilteredTotal(page.total);
        if (reset) setPos(0);
      } catch (err) {
        if (id === request.current) setError(practiceErrorMessage(err));
      } finally {
        if (id === request.current) setLoading(false);
      }
    },
    [chapterId, types, difficulties],
  );

  // (Re)load when filters change or the session settles (members get a personal list).
  useEffect(() => {
    if (session.status === 'loading') return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- data fetch on filter change
    void load(true, null);
  }, [load, session.status]);

  const item = items[pos];
  const slots: QuestionSlots | null = useMemo(() => (item && slotsModule ? slotsModule.buildQuestionSlots(item.question, lang) : null), [item, slotsModule, lang]);

  const goTo = async (next: number) => {
    if (next >= items.length && cursor) await load(false, cursor);
    setPos(next);
    cardTop.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    cardTop.current?.focus({ preventScroll: true });
  };

  const status = (it: Item): 'correct' | 'wrong' | 'answered' | null => {
    const now = answeredNow[it.question.id];
    if (now !== undefined) return now === true ? 'correct' : now === false ? 'wrong' : 'answered';
    if (session.status === 'member') return it.answered ? (it.lastCorrect === true ? 'correct' : it.lastCorrect === false ? 'wrong' : 'answered') : null;
    const g = guestAnswers.get(it.question.id);
    return g === undefined ? null : g ? 'correct' : 'wrong';
  };

  const typeKeys = Object.keys(byType).sort((a, b) => byType[b]! - byType[a]!);
  const diffKeys = Object.keys(byDifficulty).sort();
  const answeredCount = items.filter((it) => status(it) !== null).length;
  const lastIndex = (filteredTotal ?? items.length) - 1;

  return (
    <div className={s.app} data-testid="practice">
      <details className={s.filters} open={types.length + difficulties.length > 0 || undefined}>
        <summary className={s.filtersSummary}>
          <Icon name="search" size={18} /> Filter questions
          {types.length + difficulties.length > 0 && <Badge tone="accent">{types.length + difficulties.length}</Badge>}
        </summary>
        <fieldset className={s.chipGroup}>
          <legend className={s.legend}>Question type</legend>
          {typeKeys.map((t) => (
            <label key={t} className={cx(s.chip, types.includes(t) && s.chipOn)}>
              <input type="checkbox" checked={types.includes(t)} onChange={() => setTypes((x) => toggle(x, t))} />
              {QUESTION_TYPE_LABELS[t as QuestionType] ?? t} <span className={s.chipCount}>{byType[t]}</span>
            </label>
          ))}
        </fieldset>
        <fieldset className={s.chipGroup}>
          <legend className={s.legend}>Difficulty</legend>
          {diffKeys.map((d) => (
            <label key={d} className={cx(s.chip, difficulties.includes(d) && s.chipOn)}>
              <input type="checkbox" checked={difficulties.includes(d)} onChange={() => setDifficulties((x) => toggle(x, d))} />
              {DIFFICULTY_LABELS[d] ?? `Level ${d}`} <span className={s.chipCount}>{byDifficulty[d]}</span>
            </label>
          ))}
        </fieldset>
        {types.length + difficulties.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setTypes([]);
              setDifficulties([]);
            }}
          >
            Clear filters
          </Button>
        )}
      </details>

      <div className={s.status} aria-live="polite">
        {filteredTotal !== null && filteredTotal > 0 && (
          <span data-testid="practice-position">
            Question {Math.min(pos + 1, filteredTotal)} of {filteredTotal}
            {filteredTotal !== total ? ` (filtered from ${total})` : ''}
          </span>
        )}
        {answeredCount > 0 && <span>{answeredCount} answered here</span>}
        {session.status === 'guest' && <span className={s.deviceNote}>Progress is saved on this device.</span>}
      </div>

      <div ref={cardTop} tabIndex={-1} className={s.cardAnchor}>
        {error && (
          <div className={s.error} role="alert">
            <Icon name="alert" size={18} /> {error}{' '}
            <Button size="sm" variant="secondary" onClick={() => void load(items.length === 0, items.length ? cursor : null)}>
              Try again
            </Button>
          </div>
        )}
        {!error && filteredTotal === 0 && (
          <EmptyState title="No questions match" headingLevel="h2">
            Try fewer filters.
          </EmptyState>
        )}
        {item && slots ? (
          <QuestionCard
            key={item.question.id}
            question={item.question}
            slots={slots}
            number={pos + 1}
            lang={lang}
            submit={(response) => practice.submit(item.question, response)}
            onAnswered={(r) => setAnsweredNow((a) => ({ ...a, [item.question.id]: r.correct }))}
            selfAssess={practice.selfAssess}
            onLogin={practice.onLogin}
            describeError={practice.describeError}
            actions={<ReportMistake target={{ chapterId, contentType: 'question', questionId: item.question.id }} what="this question" />}
          />
        ) : (
          (loading || !slotsModule) &&
          !error && (
            <div className={s.skeleton} aria-busy="true" aria-label="Loading questions">
              <Skeleton lines={3} />
              <Skeleton variant="block" height={160} />
            </div>
          )
        )}
      </div>

      {item && (
        <nav className={s.nav} aria-label="Questions">
          <Button variant="secondary" icon="chevronLeft" onClick={() => void goTo(pos - 1)} disabled={pos === 0}>
            Previous
          </Button>
          <Button onClick={() => void goTo(pos + 1)} disabled={pos >= lastIndex || (pos >= items.length - 1 && !cursor)} loading={loading} data-testid="next-question">
            Next question <Icon name="chevronRight" size={18} />
          </Button>
        </nav>
      )}

      {items.length > 1 && (
        <details className={s.listBox}>
          <summary>All loaded questions ({items.length})</summary>
          <ol className={s.list}>
            {items.map((it, i) => {
              const st = status(it);
              return (
                <li key={it.question.id}>
                  <button type="button" className={cx(s.listItem, i === pos && s.listCurrent)} onClick={() => void goTo(i)} aria-current={i === pos ? 'true' : undefined}>
                    <span>Q{i + 1}</span>
                    <span className={s.listType}>{QUESTION_TYPE_LABELS[it.question.type]}</span>
                    {st && <span className={cx(s.listStatus, st === 'correct' && s.good, st === 'wrong' && s.bad)}>{st === 'correct' ? 'Correct' : st === 'wrong' ? 'Try again' : 'Answered'}</span>}
                  </button>
                </li>
              );
            })}
          </ol>
          {cursor && (
            <Button variant="ghost" size="sm" onClick={() => void load(false, cursor)} loading={loading}>
              Load more
            </Button>
          )}
        </details>
      )}
    </div>
  );
}
