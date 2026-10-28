/**
 * LeetCode-style practice list model (ADR-023). Pure (tested): per-question status from every source we have,
 * the status filter, the "Solved x/y" header counts and a plain-text preview of a stem.
 */
import type { DifficultyBand, PracticeStatus, PracticeSummary } from '@/platform/shared/api-client';
import { difficultyBand } from '@/platform/shared/learning/mastery';

export type { DifficultyBand, PracticeStatus };
export const BANDS: readonly DifficultyBand[] = ['easy', 'medium', 'hard'];
export const STATUSES: readonly PracticeStatus[] = ['new', 'attempted', 'solved'];
export const STATUS_LABELS: Record<PracticeStatus, string> = { new: 'New', attempted: 'Attempted', solved: 'Solved' };
export const BAND_LABELS: Record<DifficultyBand, string> = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };

export interface ListItem {
  id: string;
  difficulty: number;
  band?: DifficultyBand;
  /** API status (members), null for guests. */
  status: PracticeStatus | null;
  answered: boolean | null;
  lastCorrect: boolean | null;
}

/**
 * Solved once = solved for good (LeetCode). Sources, strongest first: an answer in this visit (true → solved,
 * false/null → attempted), the API's status (members), the device (guests: last answer right → solved).
 */
export function itemStatus(it: ListItem, now: boolean | null | undefined, device: boolean | undefined): PracticeStatus {
  const api: PracticeStatus | null = it.status ?? (it.answered ? (it.lastCorrect ? 'solved' : 'attempted') : it.answered === false ? 'new' : null);
  const fromDevice: PracticeStatus | null = device === undefined ? null : device ? 'solved' : 'attempted';
  const fromNow: PracticeStatus | null = now === undefined ? null : now === true ? 'solved' : 'attempted';
  const all = [fromNow, api, fromDevice];
  if (all.includes('solved')) return 'solved';
  if (all.includes('attempted')) return 'attempted';
  return 'new';
}

export function bandOf(it: Pick<ListItem, 'band' | 'difficulty'>): DifficultyBand {
  return it.band ?? difficultyBand(it.difficulty);
}

export interface Counts {
  total: number;
  solved: number;
  attempted: number;
  byBand: Record<DifficultyBand, { total: number; solved: number }>;
}

/**
 * Header counts. Totals come from the API's whole-chapter summary when present (filters ignored); solved counts
 * from the summary for members, otherwise from the statuses we computed for the loaded questions (guests: the
 * whole list is loaded, so this is exact).
 */
export function headerCounts(items: readonly ListItem[], statusOf: (it: ListItem) => PracticeStatus, summary: PracticeSummary | null, chapterTotal: number): Counts {
  const byBand = { easy: { total: 0, solved: 0 }, medium: { total: 0, solved: 0 }, hard: { total: 0, solved: 0 } };
  let solved = 0;
  let attempted = 0;
  for (const it of items) {
    const b = bandOf(it);
    const st = statusOf(it);
    byBand[b].total += 1;
    if (st === 'solved') {
      byBand[b].solved += 1;
      solved += 1;
    } else if (st === 'attempted') attempted += 1;
  }
  if (summary) {
    for (const b of BANDS) {
      byBand[b].total = summary.byDifficulty[b].total;
      // A member's solved count from the API can lag an answer given in this visit: take the larger.
      byBand[b].solved = Math.max(byBand[b].solved, summary.byDifficulty[b].solved ?? 0);
    }
    if (summary.byStatus) {
      solved = Math.max(solved, summary.byStatus.solved);
      attempted = Math.max(attempted, summary.byStatus.attempted);
    }
  }
  return { total: summary?.total ?? chapterTotal, solved: Math.min(solved, summary?.total ?? chapterTotal), attempted, byBand };
}

/** Plain-text preview of a Markdown/LaTeX stem for the list (never rendered as HTML). */
export function stemPreview(md: string, max = 90): string {
  const text = md
    .replace(/```[\s\S]*?```/g, ' [code] ')
    .replace(/_{3,}/g, '……')
    .replace(/<->|->|=>/g, (m) => (m === '<->' ? '⇌' : '→'))
    .replace(/\$\$([\s\S]*?)\$\$/g, '$1')
    .replace(/\$([^$]*)\$/g, '$1')
    .replace(/\\ce\{([^}]*)\}/g, '$1')
    .replace(/\\(?:text|mathrm|mathbf)\{([^}]*)\}/g, '$1')
    .replace(/\\(?:times)/g, '×')
    .replace(/\\(?:frac)\{([^}]*)\}\{([^}]*)\}/g, '$1/$2')
    .replace(/\\[,;:! ]/g, ' ')
    .replace(/\\[a-zA-Z]+/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`#>|{}^]/g, '')
    .replace(/\+\+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

/** Keyboard shortcuts apply only when the student is not typing. */
export function isTypingTarget(el: Element | null): boolean {
  if (!el) return false;
  const tag = el.tagName;
  if (tag === 'TEXTAREA' || tag === 'SELECT') return true;
  if (tag === 'INPUT') {
    const type = (el as HTMLInputElement).type;
    return !['radio', 'checkbox', 'button', 'submit'].includes(type);
  }
  return (el as HTMLElement).isContentEditable === true;
}
