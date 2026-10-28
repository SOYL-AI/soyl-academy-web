/**
 * ADR-023: the LeetCode-style practice list (PracticeApp) with a mocked API: summary counts, status icons,
 * the status filter (client-side), difficulty filter (server-side query) and row selection.
 */
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { PracticePage, StudentQuestion } from '@/platform/shared/api-client';

const h = vi.hoisted(() => ({
  session: { state: { status: 'member', user: { id: 'u1' }, consent: 'granted' } as unknown, openLogin: vi.fn() },
  api: { get: vi.fn(), post: vi.fn(), patch: vi.fn() },
}));
vi.mock('../auth/SessionProvider', () => ({ useSession: () => h.session }));
vi.mock('../lib/api-browser', () => ({ api: h.api }));
vi.mock('../practice/usePracticeAnswer', () => ({
  practiceErrorMessage: () => 'error',
  usePracticeAnswer: () => ({ submit: vi.fn(), selfAssess: undefined, onLogin: vi.fn(), describeError: () => 'error', isMember: true }),
}));
vi.mock('../report/ReportMistake', () => ({ ReportMistake: () => null }));

import { PracticeApp } from '../practice/PracticeApp';

function q(id: string, difficulty: number, stem: string): StudentQuestion {
  return {
    id,
    type: 'mcq',
    objective: true,
    stem_md: stem,
    options: [
      { id: 'a', text_md: 'One' },
      { id: 'b', text_md: 'Two' },
    ],
    match_right: [],
    marks: 1,
    assets: [],
    version: 1,
    difficulty,
    expected_time_sec: 60,
    topic_ids: [],
    children: [],
  } as unknown as StudentQuestion;
}

function page(over: Partial<PracticePage> = {}): PracticePage {
  return {
    chapterId: 'cbse-10-science-ch01',
    total: 3,
    nextCursor: null,
    items: [
      { question: q('q_1', 1, 'What is $2+2$?'), answered: true, lastCorrect: true, difficulty: 'easy', status: 'solved' },
      { question: q('q_2', 3, 'Name the gas given off'), answered: true, lastCorrect: false, difficulty: 'medium', status: 'attempted' },
      { question: q('q_3', 5, 'Balance the equation'), answered: false, lastCorrect: null, difficulty: 'hard', status: 'new' },
    ],
    summary: { total: 3, byDifficulty: { easy: { total: 1, solved: 1 }, medium: { total: 1, solved: 0 }, hard: { total: 1, solved: 0 } }, byStatus: { new: 1, attempted: 1, solved: 1 } },
    ...over,
  } as PracticePage;
}

beforeEach(() => {
  Element.prototype.scrollIntoView = vi.fn();
  h.api.get.mockReset();
  h.api.get.mockResolvedValue(page());
});
afterEach(() => cleanup());

const props = { chapterId: 'cbse-10-science-ch01', total: 3, byType: { mcq: 3 }, byDifficulty: { '1': 1, '3': 1, '5': 1 } };

describe('PracticeApp (problem list)', () => {
  it('shows Solved x/y with per-difficulty counts and a row per question with its status and difficulty', async () => {
    render(<PracticeApp {...props} />);
    await waitFor(() => expect(screen.getAllByTestId('problem-row')).toHaveLength(3));
    expect(screen.getByTestId('solved-count').getAttribute('data-solved')).toBe('1');
    expect(screen.getByTestId('solved-count').textContent).toContain('Solved 1 of 3');
    const rows = screen.getAllByTestId('problem-row');
    expect(rows.map((r) => r.getAttribute('data-status'))).toEqual(['solved', 'attempted', 'new']);
    expect(rows.map((r) => r.getAttribute('data-band'))).toEqual(['easy', 'medium', 'hard']);
    expect(rows[0]!.textContent).toContain('What is 2+2?'); // plain-text preview, no raw LaTeX
    expect(within(rows[0]!).getByText('Solved:')).toBeTruthy(); // status is written for screen readers
    expect(rows[0]!.getAttribute('aria-current')).toBe('true');
    expect(screen.getByTestId('practice-position').textContent).toBe('Question 1 of 3');
  });

  it('status filter is client-side; difficulty filter goes to the server', async () => {
    render(<PracticeApp {...props} />);
    await waitFor(() => expect(screen.getAllByTestId('problem-row')).toHaveLength(3));
    fireEvent.click(screen.getByRole('radio', { name: 'Attempted' }));
    expect(screen.getAllByTestId('problem-row').map((r) => r.getAttribute('data-status'))).toEqual(['attempted']);
    expect(h.api.get).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('radio', { name: 'All' }));
    h.api.get.mockResolvedValueOnce(page({ total: 1, items: [page().items[2]!] }));
    await act(async () => {
      fireEvent.click(screen.getByRole('checkbox', { name: /^Hard/ }));
    });
    await waitFor(() => expect(screen.getAllByTestId('problem-row')).toHaveLength(1));
    expect(h.api.get).toHaveBeenLastCalledWith('/v1/chapters/{id}/practice', expect.objectContaining({ query: expect.objectContaining({ difficulty: 'hard', limit: 25 }) }));
    expect(screen.getByTestId('practice-position').textContent).toBe('Question 1 of 1 (filtered from 3)');
    // Whole-chapter counts stay while a difficulty filter is on.
    expect(screen.getByTestId('solved-count').getAttribute('data-solved')).toBe('1');
  });

  it('selecting a row opens that question; the list toggle opens and closes the list on phones', async () => {
    render(<PracticeApp {...props} />);
    await waitFor(() => expect(screen.getAllByTestId('problem-row')).toHaveLength(3));
    const toggle = screen.getByTestId('list-toggle');
    expect(screen.getByTestId('problem-list').getAttribute('data-open')).toBe('false');
    fireEvent.click(toggle);
    expect(screen.getByTestId('problem-list').getAttribute('data-open')).toBe('true');
    fireEvent.click(screen.getAllByTestId('problem-row')[2]!);
    expect(screen.getAllByTestId('problem-row')[2]!.getAttribute('aria-current')).toBe('true');
    expect(screen.getByTestId('practice-position').textContent).toBe('Question 3 of 3');
    expect(screen.getByTestId('problem-list').getAttribute('data-open')).toBe('false');
  });

  it('J / K move through the list when not typing', async () => {
    render(<PracticeApp {...props} />);
    await waitFor(() => expect(screen.getAllByTestId('problem-row')).toHaveLength(3));
    fireEvent.keyDown(document, { key: 'j' });
    expect(screen.getByTestId('practice-position').textContent).toBe('Question 2 of 3');
    fireEvent.keyDown(document, { key: 'k' });
    expect(screen.getByTestId('practice-position').textContent).toBe('Question 1 of 3');
  });

  it('loads the rest of the list in the background', async () => {
    h.api.get.mockResolvedValueOnce(page({ total: 4, nextCursor: 'c2' })).mockResolvedValueOnce(page({ total: 4, nextCursor: null, items: [{ question: q('q_4', 2, 'Fourth'), answered: false, lastCorrect: null, difficulty: 'easy', status: 'new' }] }));
    render(<PracticeApp {...props} total={4} />);
    await waitFor(() => expect(screen.getAllByTestId('problem-row')).toHaveLength(4));
    expect(h.api.get).toHaveBeenLastCalledWith('/v1/chapters/{id}/practice', expect.objectContaining({ query: expect.objectContaining({ cursor: 'c2' }) }));
  });
});
