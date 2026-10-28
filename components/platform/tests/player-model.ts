/**
 * Pure helpers for the test player and result pages: palette states, choice groups, section order,
 * friendly problem text for the test-engine codes (backend-api M3 handoff §10).
 */
import { isApiError, type AttemptState, type PracticeResponse } from '@/platform/shared/api-client';

export interface ItemUiState {
  response: PracticeResponse | null;
  markedForReview: boolean;
  visited: boolean;
  timeSpentSec: number;
}

export type PaletteState = 'answered' | 'answered-marked' | 'marked' | 'visited' | 'not-visited';

export function paletteState(s: ItemUiState | undefined): PaletteState {
  if (!s) return 'not-visited';
  const answered = s.response !== null;
  if (answered && s.markedForReview) return 'answered-marked';
  if (answered) return 'answered';
  if (s.markedForReview) return 'marked';
  return s.visited ? 'visited' : 'not-visited';
}

export const PALETTE_LABELS: Record<PaletteState, string> = {
  answered: 'answered',
  'answered-marked': 'answered, marked for review',
  marked: 'marked for review, not answered',
  visited: 'seen, not answered',
  'not-visited': 'not visited',
};

export interface PaletteSummary {
  answered: number;
  notAnswered: number;
  marked: number;
  notVisited: number;
  total: number;
}

export function summarise(itemIds: readonly string[], states: Record<string, ItemUiState>): PaletteSummary {
  const out: PaletteSummary = { answered: 0, notAnswered: 0, marked: 0, notVisited: 0, total: itemIds.length };
  for (const id of itemIds) {
    const s = states[id];
    if (s?.response) out.answered += 1;
    else out.notAnswered += 1;
    if (s?.markedForReview) out.marked += 1;
    if (!s?.visited && !s?.response) out.notVisited += 1;
  }
  return out;
}

/** Item ids in paper order (sections in order, each section's itemIds in order). Never sorted by id. */
export function paperOrder(state: Pick<AttemptState, 'sections'>): string[] {
  return state.sections.flatMap((s) => s.itemIds);
}

export interface GroupInfo {
  attempt: number;
  of: number;
  /** 0-based position of this item inside its choice group. */
  index: number;
  itemIds: string[];
}

/** "Attempt any `attempt` of these": items sharing a choice group (they also share a number). */
export function choiceGroupOf(state: Pick<AttemptState, 'sections'>, itemId: string): GroupInfo | null {
  for (const section of state.sections) {
    for (const g of section.choiceGroups) {
      const index = g.itemIds.indexOf(itemId);
      if (index >= 0) return { attempt: g.attempt, of: g.of, index, itemIds: g.itemIds };
    }
  }
  return null;
}

/** Initial UI state from the server's saved responses. */
export function statesFromServer(state: Pick<AttemptState, 'items' | 'responses'>): Record<string, ItemUiState> {
  const out: Record<string, ItemUiState> = {};
  for (const item of state.items) out[item.itemId] = { response: null, markedForReview: false, visited: false, timeSpentSec: 0 };
  for (const r of state.responses) {
    if (!out[r.itemId]) continue;
    out[r.itemId] = { response: r.response, markedForReview: r.markedForReview, visited: true, timeSpentSec: r.timeSpentSec };
  }
  return out;
}

export function marksText(m: number): string {
  const n = Number.isInteger(m) ? String(m) : String(Math.round(m * 10) / 10);
  return `${n} ${m === 1 ? 'mark' : 'marks'}`;
}

export function scoreText(n: number | null | undefined): string {
  if (n === null || n === undefined) return '–';
  return Number.isInteger(n) ? String(n) : (Math.round(n * 10) / 10).toFixed(1);
}

/** Student-facing text for test-engine problems. Never shows server text except the API's own `detail` for live/bank errors. */
export function testProblemMessage(err: unknown): string {
  if (!isApiError(err)) return 'Something went wrong. Please try again.';
  switch (err.code) {
    case 'attempt_closed':
      return 'This test has already been submitted.';
    case 'live_not_open':
      return err.problem?.detail ? `This live test is not open: ${err.problem.detail}` : 'This live test is not open right now.';
    case 'test_unavailable':
      return 'This test is not available yet. Please try again later.';
    case 'results_after_event':
      return 'Solutions and marking open when the live test closes. Please come back then.';
    case 'bank_too_small':
      return err.problem?.detail ? `Not enough questions: ${err.problem.detail}` : 'There are not enough questions for these choices. Pick more chapters or fewer questions.';
    case 'not_found':
      return 'We could not find this test.';
    case 'conflict':
      return 'That is not possible right now. Reload the page and try again.';
    case 'rate_limited':
      return 'You are going a bit fast. Please wait a moment and try again.';
    case 'validation_failed':
      return 'Please check what you entered.';
    case 'consent_required':
      return 'A parent needs to approve your account first.';
    case 'unauthenticated':
      return 'Please log in again.';
    case 'network_error':
    case 'upstream_unavailable':
    case 'upstream_timeout':
    case 'service_unavailable':
      return 'We could not reach SOYL Academy. Check your connection and try again.';
    default:
      return err.status >= 500 ? 'SOYL Academy is having trouble. Please try again in a minute.' : 'Something went wrong. Please try again.';
  }
}

export const DIFFICULTY_NAMES: Record<number, string> = { 1: 'Very easy', 2: 'Easy', 3: 'Medium', 4: 'Hard', 5: 'Very hard' };

export const SERIES_KIND_LABELS: Record<string, string> = {
  chapter: 'Chapter tests',
  unit: 'Unit tests',
  term: 'Term papers',
  full: 'Full mock papers',
  second_exam: 'Second exam (May) track',
  live: 'All-India live mocks',
};

export const LIVE_PHASE_LABELS: Record<string, string> = {
  cancelled: 'Cancelled',
  upcoming: 'Coming up',
  registration_open: 'Registration open',
  live: 'Live now',
  writing: 'In progress',
  closed: 'Results soon',
  results_published: 'Results out',
};

export function attemptPath(id: string): string {
  return `/tests/attempt/${encodeURIComponent(id)}`;
}
export function resultPath(id: string): string {
  return `/tests/result/${encodeURIComponent(id)}`;
}
