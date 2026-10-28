'use client';

/**
 * Practice (ADR-023, LeetCode style): a problem list (status solved / attempted / new, Easy / Medium / Hard tags,
 * filters by status, difficulty and type, "Solved x/y" with per-difficulty counts) beside a focused question
 * workspace (split view on desktop, stacked on phones) with keyboard shortcuts, instant server checks and the
 * solution revealed after answering. Guest progress stays on the device.
 *
 * Data: GET /v1/chapters/:id/practice, paged (25 a page) and loaded in the background up to LOAD_CAP so the list
 * and its counts are complete; type and difficulty filter on the server, status on the client (it combines the
 * API's status, this device and answers given in this visit). Questions arrive as data, so their Markdown/KaTeX
 * renders through the lazily loaded renderer chunk (slots.tsx), not the route's first-load JS.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PracticePage, PracticeSummary, QuestionType } from '@/platform/shared/api-client';
import { cx } from '@/components/platform/ui/cx';
import { Button } from '@/components/platform/ui/kit/Button';
import { Badge, EmptyState, Skeleton } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { DifficultyTag, ProgressRing } from '@/components/platform/ui/kit/Mastery';
import { QUESTION_TYPE_LABELS } from '@/components/platform/ui/question/model';
import { QuestionCard } from '@/components/platform/ui/question/QuestionCard';
import type { QuestionSlots } from '@/components/platform/ui/question/slots';
import { useSession } from '../auth/SessionProvider';
import { api } from '../lib/api-browser';
import { guestAnswersFor, readGuestProgress } from '../lib/guest-storage';
import { ReportMistake } from '../report/ReportMistake';
import { BAND_LABELS, BANDS, bandOf, headerCounts, isTypingTarget, itemStatus, STATUS_LABELS, STATUSES, stemPreview, type DifficultyBand, type ListItem, type PracticeStatus } from './practice-list';
import { practiceErrorMessage, usePracticeAnswer } from './usePracticeAnswer';
import s from './practice.module.css';

type SlotsModule = typeof import('@/components/platform/ui/question/slots');

export const PAGE_SIZE = 25;
/** At most this many questions are listed (8 pages); chapters have about 60–80. */
export const LOAD_CAP = 200;

type Item = PracticePage['items'][number];
type StatusFilter = 'all' | PracticeStatus;

export interface PracticeAppProps {
  chapterId: string;
  lang?: string;
  total: number;
  byType: Record<string, number>;
  /** Content difficulty 1–5 → count (hub summary); grouped into bands here. */
  byDifficulty: Record<string, number>;
}

function toggle<T>(list: T[], v: T): T[] {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
}

function toListItem(it: Item): ListItem {
  return { id: it.question.id, difficulty: it.question.difficulty, band: it.difficulty, status: it.status ?? null, answered: it.answered, lastCorrect: it.lastCorrect };
}

const STATUS_ICON: Record<PracticeStatus, 'checkCircle' | 'halfCircle' | 'circle'> = { solved: 'checkCircle', attempted: 'halfCircle', new: 'circle' };

export function PracticeApp({ chapterId, lang, total, byType, byDifficulty }: PracticeAppProps) {
  const { state: session } = useSession();
  const practice = usePracticeAnswer(chapterId);
  const [types, setTypes] = useState<string[]>([]);
  const [bands, setBands] = useState<DifficultyBand[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [items, setItems] = useState<Item[]>([]);
  const [whole, setWhole] = useState<Item[]>([]);
  const [summary, setSummary] = useState<PracticeSummary | null>(null);
  const [filteredTotal, setFilteredTotal] = useState<number | null>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slotsModule, setSlotsModule] = useState<SlotsModule | null>(null);
  const [guestAnswers, setGuestAnswers] = useState<Map<string, boolean>>(new Map());
  const [answeredNow, setAnsweredNow] = useState<Record<string, boolean | null>>({});
  const [listOpen, setListOpen] = useState(false);
  const request = useRef(0);
  const workspace = useRef<HTMLDivElement>(null);

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
      const id = reset ? ++request.current : request.current;
      setLoading(true);
      setError(null);
      try {
        const page: PracticePage = await api.get('/v1/chapters/{id}/practice', {
          params: { id: chapterId },
          query: {
            limit: PAGE_SIZE,
            ...(after ? { cursor: after } : {}),
            ...(types.length ? { type: types.join(',') } : {}),
            ...(bands.length ? { difficulty: bands.join(',') } : {}),
          },
        });
        if (id !== request.current) return;
        const merge = (prev: Item[]) => (reset ? page.items : [...prev, ...page.items.filter((it) => !prev.some((p) => p.question.id === it.question.id))]);
        setItems(merge);
        if (types.length === 0 && bands.length === 0) setWhole(merge);
        setCursor(page.nextCursor);
        setFilteredTotal(page.total);
        if (page.summary) setSummary(page.summary);
        if (reset) setCurrentId(null);
      } catch (err) {
        if (id === request.current) setError(practiceErrorMessage(err));
      } finally {
        if (id === request.current) setLoading(false);
      }
    },
    [chapterId, types, bands],
  );

  // (Re)load when filters change or the session settles (members get a personal list).
  useEffect(() => {
    if (session.status === 'loading') return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- data fetch on filter change
    void load(true, null);
  }, [load, session.status]);

  // Keep loading the rest of the list in the background (complete counts and status filter).
  useEffect(() => {
    if (!cursor || loading || error || items.length >= LOAD_CAP) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- next page of the list, fetched after the previous one
    void load(false, cursor);
  }, [cursor, loading, error, items.length, load]);

  const statusOf = useCallback((it: ListItem) => itemStatus(it, answeredNow[it.id], session.status === 'member' ? undefined : guestAnswers.get(it.id)), [answeredNow, guestAnswers, session.status]);
  const listItems = useMemo(() => items.map(toListItem), [items]);
  // The open question stays listed after answering it, even if it no longer matches the status filter.
  const visible = useMemo(
    () => items.filter((it, i) => statusFilter === 'all' || it.question.id === currentId || statusOf(listItems[i]!) === statusFilter),
    [items, listItems, statusFilter, statusOf, currentId],
  );
  // Per-difficulty counts need the whole chapter: `whole` is the list as loaded without type/difficulty filters.
  const counts = useMemo(() => headerCounts(whole.map(toListItem), statusOf, summary, total), [whole, statusOf, summary, total]);
  const pos = Math.max(0, currentId ? visible.findIndex((it) => it.question.id === currentId) : 0);
  const item = visible[pos];
  const slots: QuestionSlots | null = useMemo(() => (item && slotsModule ? slotsModule.buildQuestionSlots(item.question, lang) : null), [item, slotsModule, lang]);
  const complete = !cursor || items.length >= LOAD_CAP;
  const shownTotal = statusFilter === 'all' ? (filteredTotal ?? visible.length) : visible.length;

  const goTo = useCallback(
    (next: number, focus = true) => {
      const target = visible[next];
      if (!target) return;
      setCurrentId(target.question.id);
      setListOpen(false);
      if (focus) {
        workspace.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
        workspace.current?.focus({ preventScroll: true });
      }
    },
    [visible],
  );

  // Keyboard: J / K next / previous question, Ctrl/⌘ + Enter checks the answer (also while typing).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const form = workspace.current?.querySelector<HTMLFormElement>('article form');
        const button = form?.querySelector<HTMLButtonElement>('button[type="submit"]');
        if (form && button && !button.disabled) {
          e.preventDefault();
          form.requestSubmit(button);
        }
        return;
      }
      if (e.altKey || e.ctrlKey || e.metaKey || isTypingTarget(document.activeElement)) return;
      if (document.querySelector('dialog[open]')) return;
      if (e.key === 'j' || e.key === 'J') {
        e.preventDefault();
        goTo(pos + 1, false);
      } else if (e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        goTo(pos - 1, false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [goTo, pos]);

  const typeKeys = Object.keys(byType).sort((a, b) => byType[b]! - byType[a]!);
  const bandTotals = useMemo(() => {
    const out: Record<DifficultyBand, number> = { easy: 0, medium: 0, hard: 0 };
    if (summary) for (const b of BANDS) out[b] = summary.byDifficulty[b].total;
    else for (const [d, n] of Object.entries(byDifficulty)) out[bandOf({ difficulty: Number(d) })] += n;
    return out;
  }, [summary, byDifficulty]);
  const filterCount = types.length + bands.length + (statusFilter === 'all' ? 0 : 1);
  const solvedPct = counts.total ? (counts.solved / counts.total) * 100 : 0;

  return (
    <div className={s.app} data-testid="practice">
      <section className={s.summary} aria-label="Your progress in this chapter" data-testid="practice-summary">
        <ProgressRing value={solvedPct} size={76} stroke={7} label={`Solved ${counts.solved} of ${counts.total} questions`} level={solvedPct >= 100 ? 'mastered' : undefined}>
          <span className={s.ringText}>
            <b>{counts.solved}</b>
            <span>/{counts.total}</span>
          </span>
        </ProgressRing>
        <div className={s.summaryBody}>
          <p className={s.summaryTitle} data-testid="solved-count" data-solved={counts.solved}>
            Solved <b>{counts.solved}</b> of {counts.total}
            {counts.attempted > 0 && <span className={s.summaryMuted}> · {counts.attempted} attempted</span>}
          </p>
          <ul className={s.bandCounts}>
            {BANDS.map((b) => (
              <li key={b} data-band={b}>
                <span className={s.bandName}>{BAND_LABELS[b]}</span>
                <span className={s.bandNum}>
                  {counts.byBand[b].solved}
                  <span>/{counts.byBand[b].total || bandTotals[b]}</span>
                </span>
              </li>
            ))}
          </ul>
          {session.status === 'guest' && <p className={s.deviceNote}>Progress is saved on this device. Log in to keep it.</p>}
        </div>
      </section>

      <div className={s.split}>
        <aside className={s.listPane} aria-label="Question list">
          <div className={s.filterBar}>
            <fieldset className={s.segmented}>
              <legend className="p-visually-hidden">Show</legend>
              {(['all', ...STATUSES] as StatusFilter[]).map((st) => (
                <label key={st} className={cx(s.segment, statusFilter === st && s.segmentOn)}>
                  <input type="radio" name={`status-${chapterId}`} value={st} checked={statusFilter === st} onChange={() => setStatusFilter(st)} />
                  {st === 'all' ? 'All' : STATUS_LABELS[st]}
                </label>
              ))}
            </fieldset>
            <fieldset className={s.bandChips}>
              <legend className="p-visually-hidden">Difficulty</legend>
              {BANDS.map((b) => (
                <label key={b} className={cx(s.bandChip, bands.includes(b) && s.bandChipOn)} data-band={b}>
                  <input type="checkbox" checked={bands.includes(b)} onChange={() => setBands((x) => toggle(x, b))} />
                  {BAND_LABELS[b]} <span className={s.chipCount}>{bandTotals[b]}</span>
                </label>
              ))}
            </fieldset>
            <details className={s.filters} open={types.length > 0 || undefined}>
              <summary className={s.filtersSummary}>
                <Icon name="search" size={18} /> Filter questions
                {types.length > 0 && <Badge tone="accent">{types.length}</Badge>}
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
            </details>
            {filterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setTypes([]);
                  setBands([]);
                  setStatusFilter('all');
                }}
              >
                Clear filters
              </Button>
            )}
          </div>

          <div className={s.status} aria-live="polite">
            {shownTotal > 0 && (
              <span data-testid="practice-position">
                Question {Math.min(pos + 1, shownTotal)} of {shownTotal}
                {shownTotal !== total ? ` (filtered from ${total})` : ''}
              </span>
            )}
            {!complete && <span className={s.summaryMuted}>Loading the list…</span>}
          </div>

          <button type="button" className={s.listToggle} aria-expanded={listOpen} onClick={() => setListOpen((v) => !v)} data-testid="list-toggle">
            <Icon name="list" size={18} />
            {listOpen ? 'Hide question list' : `Question list (${visible.length})`}
            <Icon name="chevronDown" size={18} className={s.toggleChevron} />
          </button>
          <ol className={s.problemList} data-open={listOpen} data-testid="problem-list">
            {visible.map((it, i) => {
              const li = toListItem(it);
              const st = statusOf(li);
              const band = bandOf(li);
              return (
                <li key={it.question.id}>
                  <button
                    type="button"
                    className={cx(s.problem, i === pos && s.problemOn)}
                    onClick={() => goTo(i)}
                    aria-current={i === pos ? 'true' : undefined}
                    data-status={st}
                    data-band={band}
                    data-testid="problem-row"
                  >
                    <span className={s.problemStatus} data-status={st}>
                      <Icon name={STATUS_ICON[st]} size={18} />
                      <span className="p-visually-hidden">{STATUS_LABELS[st]}: </span>
                    </span>
                    <span className={s.problemMain}>
                      <span className={s.problemTitle} lang={lang}>
                        <span className={s.problemNum}>{i + 1}.</span> {stemPreview(it.question.stem_md, 72) || QUESTION_TYPE_LABELS[it.question.type]}
                      </span>
                      <span className={s.problemMeta}>
                        {QUESTION_TYPE_LABELS[it.question.type]} · {it.question.marks} {it.question.marks === 1 ? 'mark' : 'marks'}
                      </span>
                    </span>
                    <DifficultyTag band={band} />
                  </button>
                </li>
              );
            })}
          </ol>
          {!complete && cursor && !loading && (
            <Button variant="ghost" size="sm" onClick={() => void load(false, cursor)}>
              Load more
            </Button>
          )}
        </aside>

        <section className={s.workspace} aria-label="Question" ref={workspace} tabIndex={-1}>
          {error && (
            <div className={s.error} role="alert">
              <Icon name="alert" size={18} /> {error}{' '}
              <Button size="sm" variant="secondary" onClick={() => void load(items.length === 0, items.length ? cursor : null)}>
                Try again
              </Button>
            </div>
          )}
          {!error && filteredTotal !== null && visible.length === 0 && complete && (
            <EmptyState title="No questions match" headingLevel="h2" action={<Button variant="secondary" onClick={() => setStatusFilter('all')}>Show all</Button>}>
              {statusFilter === 'solved' ? 'Nothing solved here yet. Pick a question and give it a go.' : 'Try fewer filters.'}
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
              onAnswered={(r) => {
                setCurrentId(item.question.id);
                setAnsweredNow((a) => ({ ...a, [item.question.id]: r.correct }));
              }}
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

          {item && (
            <nav className={s.nav} aria-label="Questions">
              <Button variant="secondary" icon="chevronLeft" onClick={() => goTo(pos - 1)} disabled={pos === 0}>
                Previous
              </Button>
              <Button onClick={() => goTo(pos + 1)} disabled={pos >= visible.length - 1} loading={loading && pos >= visible.length - 1} data-testid="next-question">
                Next question <Icon name="chevronRight" size={18} />
              </Button>
            </nav>
          )}
          {item && (
            <p className={s.keysHint}>
              <Icon name="keyboard" size={16} /> <kbd>J</kbd> next · <kbd>K</kbd> previous · <kbd>Ctrl</kbd>+<kbd>Enter</kbd> check answer
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
