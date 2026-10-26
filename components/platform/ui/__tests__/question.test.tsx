import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import type { PracticeAnswerResult, PracticeResponse, StudentQuestion } from '@/platform/shared/api-client';
import { UNDERLINE_RE } from '@/platform/shared/content/common';
import { key, Q, result } from '../__fixtures__/questions';
import { MARKDOWN_XSS } from '../__fixtures__/xss-corpus';
import { Markdown } from '../render/Markdown';
import { UNDERLINE_SOURCE } from '../render/remark-soyl';
import { KeyDetails } from '../question/AnswerReveal';
import { formatMapText, matchLabel, parseMapText } from '../question/inputs';
import { mapLabelsFromStem } from '../question/map-places';
import {
  blankCount,
  initialDraft,
  moveItem,
  numberBlanks,
  parseNumber,
  selfMarkSteps,
  shuffled,
  submitBlocker,
  toResponse,
  wordCount,
  type Draft,
} from '../question/model';
import { QuestionCard, type QuestionCardProps } from '../question/QuestionCard';
import { buildQuestionSlots } from '../question/slots';
import { findProblems } from './inert';

function setup(question: StudentQuestion, res: PracticeAnswerResult | ((r: PracticeResponse) => PracticeAnswerResult), extra: Partial<QuestionCardProps> = {}) {
  const submit = vi.fn(async (r: PracticeResponse) => (typeof res === 'function' ? res(r) : res));
  const utils = render(<QuestionCard question={question} slots={buildQuestionSlots(question)} submit={submit} number={1} {...extra} />);
  return { submit, ...utils };
}

const check = () => fireEvent.click(screen.getByRole('button', { name: 'Check answer' }));

describe('question model', () => {
  it('parses numbers students type, refuses units', () => {
    expect(parseNumber('4.0')).toBe(4);
    expect(parseNumber(' −3.5 ')).toBe(-3.5);
    expect(parseNumber('1,200')).toBe(1200);
    expect(parseNumber('.5')).toBe(0.5);
    expect(parseNumber('4 g')).toBeNull();
    expect(parseNumber('abc')).toBeNull();
    expect(parseNumber('')).toBeNull();
  });
  it('counts and numbers blanks', () => {
    expect(blankCount('a ___ b _____ c __ d')).toBe(2);
    expect(numberBlanks('a ___ b ___')).toBe('a **(1)** \\_\\_\\_\\_\\_ b **(2)** \\_\\_\\_\\_\\_');
  });
  it('counts words like the content contract', () => {
    expect(wordCount('  one two\nthree ')).toBe(3);
    expect(wordCount('')).toBe(0);
    expect(wordCount('यह एक वाक्य है')).toBe(4);
  });
  it('builds every response shape of PracticeResponse', () => {
    const cases: [Draft, PracticeResponse][] = [
      [{ kind: 'choice', ids: ['b'] }, { option_ids: ['b'] }],
      [{ kind: 'value', text: '4.0' }, { value: 4 }],
      [{ kind: 'blanks', values: [' cathode ', 'anode'] }, { blanks: ['cathode', 'anode'] }],
      [{ kind: 'pairs', pairs: { '1': 'q', '2': '' } }, { pairs: [{ left_id: '1', right_id: 'q' }] }],
      [{ kind: 'order', ids: ['b', 'a', 'c'] }, { order: ['b', 'a', 'c'] }],
      [{ kind: 'output', text: '0\n1\n' }, { output: '0\n1\n' }],
      [{ kind: 'text', text: '  my answer ' }, { text: 'my answer' }],
      [
        { kind: 'parts', parts: { c1: { draft: { kind: 'choice', ids: ['b'] } }, c2: { alternative: 'c2b', draft: { kind: 'text', text: 'CaO' } }, c3: { draft: { kind: 'text', text: '' } } } },
        { parts: [{ id: 'c1', response: { option_ids: ['b'] } }, { id: 'c2', alternative: 'c2b', response: { text: 'CaO' } }] },
      ],
    ];
    for (const [draft, want] of cases) expect(toResponse(draft)).toEqual(want);
  });
  it('blocks incomplete answers with a friendly reason', () => {
    expect(submitBlocker(Q.mcq, initialDraft(Q.mcq))).toBe('Choose an option.');
    expect(submitBlocker(Q.multi, initialDraft(Q.multi))).toBe('Select at least one option.');
    expect(submitBlocker(Q.numerical, { kind: 'value', text: '4 g' })).toMatch(/number only/);
    expect(submitBlocker(Q.fill, { kind: 'blanks', values: ['x', ''] })).toBe('Fill in every blank.');
    expect(submitBlocker(Q.match, { kind: 'pairs', pairs: { '1': 'q' } })).toBe('Match every item.');
    expect(submitBlocker(Q.ordering, initialDraft(Q.ordering))).toBeNull();
    expect(submitBlocker(Q.caseBased, initialDraft(Q.caseBased))).toBe('Answer at least one part.');
  });
  it('starts ordering in the served (shuffled) order and moves items', () => {
    expect(initialDraft(Q.ordering)).toEqual({ kind: 'order', ids: ['a', 'b', 'c'] });
    expect(moveItem(['a', 'b', 'c'], 2, 0)).toEqual(['c', 'a', 'b']);
    expect(moveItem(['a', 'b', 'c'], 0, 9)).toEqual(['b', 'c', 'a']);
  });
  it('shuffles deterministically with an injected random source and keeps every item', () => {
    let seed = 1;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const out = shuffled([1, 2, 3, 4, 5], rnd);
    expect([...out].sort()).toEqual([1, 2, 3, 4, 5]);
  });
  it('self-mark steps are 0.5 apart up to the maximum', () => {
    expect(selfMarkSteps(2)).toEqual([0, 0.5, 1, 1.5, 2]);
  });
  it('map labels come from the stem', () => {
    expect(mapLabelsFromStem('Identify the places marked A, B and C.')).toEqual(['A', 'B', 'C']);
    expect(mapLabelsFromStem('Locate:\n(A) a port\n(B) a dam')).toEqual(['A', 'B']);
    expect(mapLabelsFromStem('Locate a port.')).toEqual(['A', 'B', 'C']);
    expect(parseMapText(formatMapText(['A', 'B'], { A: 'Kerala', B: 'Goa' }), ['A', 'B'])).toEqual({ A: 'Kerala', B: 'Goa' });
  });
});

describe('QuestionCard: objective types', () => {
  it('mcq: choose, check on the server, reveal correct/wrong without holding the key before', async () => {
    const { submit, container } = setup(Q.mcq, result(Q.mcq, { correct: false, marksAwarded: 0, key: key({ option_ids: ['b'] }) }));
    expect(container.textContent).not.toMatch(/Step 1: think/);
    check();
    expect((await screen.findByRole('alert')).textContent).toContain('Choose an option.');
    expect(submit).not.toHaveBeenCalled();
    fireEvent.click(within(container.querySelector('[data-option-id="a"]')!).getByRole('radio'));
    check();
    await screen.findByTestId('question-result');
    expect(submit).toHaveBeenCalledWith({ option_ids: ['a'] });
    expect(container.querySelector('[data-option-id="b"]')!.getAttribute('data-state')).toBe('correct');
    expect(container.querySelector('[data-option-id="a"]')!.getAttribute('data-state')).toBe('wrong');
    expect(screen.getByText('Not quite')).toBeTruthy();
    expect(await screen.findByText(/Step 1: think/)).toBeTruthy();
    expect(screen.getByText('Correct idea')).toBeTruthy();
  });

  it('multi-select sends every chosen id', async () => {
    const { submit, container } = setup(Q.multi, result(Q.multi, { key: key({ option_ids: ['a', 'b', 'd'] }) }));
    for (const id of ['a', 'd', 'b']) fireEvent.click(within(container.querySelector(`[data-option-id="${id}"]`)!).getByRole('checkbox'));
    check();
    await screen.findByTestId('question-result');
    expect(submit).toHaveBeenCalledWith({ option_ids: ['a', 'd', 'b'] });
    expect(screen.getByText('Correct')).toBeTruthy();
  });

  it.each([
    ['assertion-reason', Q.ar],
    ['true-false', Q.tf],
  ])('%s uses single choice', async (_t, question) => {
    const { submit, container } = setup(question, result(question, { key: key({ option_ids: ['a'] }) }));
    fireEvent.click(within(container.querySelector('[data-option-id="a"]')!).getByRole('radio'));
    check();
    await screen.findByTestId('question-result');
    expect(submit).toHaveBeenCalledWith({ option_ids: ['a'] });
  });

  it('numerical: number only, then shows the key value and unit', async () => {
    const { submit } = setup(Q.numerical, result(Q.numerical, { correct: false, marksAwarded: 0, key: key({ value: 4, tolerance: 0.05, unit: 'g' }) }));
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '4 g' } });
    check();
    expect((await screen.findByRole('alert')).textContent).toMatch(/number only/);
    fireEvent.change(input, { target: { value: '3.9' } });
    check();
    await screen.findByTestId('question-result');
    expect(submit).toHaveBeenCalledWith({ value: 3.9 });
    expect(screen.getByTestId('answer-key').textContent).toContain('Answer: 4 g (±0.05)');
  });

  it('fill-blank: one labelled field per blank, per-blank feedback', async () => {
    const { submit } = setup(
      Q.fill,
      result(Q.fill, { correct: false, marksAwarded: 0.5, key: key({ blanks: [{ accepted: ['cathode'] }, { accepted: ['anode', 'positive electrode'] }] }), feedback: { blanksCorrect: [true, false] } }),
    );
    fireEvent.change(screen.getByLabelText('Blank (1)'), { target: { value: 'cathode' } });
    fireEvent.change(screen.getByLabelText('Blank (2)'), { target: { value: 'top' } });
    check();
    await screen.findByTestId('question-result');
    expect(submit).toHaveBeenCalledWith({ blanks: ['cathode', 'top'] });
    expect(screen.getByText('Partly correct')).toBeTruthy();
    expect(screen.getAllByText('Not correct')).toHaveLength(1);
    expect(screen.getByTestId('answer-key').textContent).toContain('also accepted: positive electrode');
  });

  it('match: a labelled select per left item; marks each pair after checking', async () => {
    const { submit, container } = setup(Q.match, result(Q.match, { correct: false, marksAwarded: 1, key: key({ pairs: [{ left_id: '1', right_id: 'q' }, { left_id: '2', right_id: 'p' }] }), feedback: { pairsCorrect: 1 } }));
    const selects = container.querySelectorAll('select');
    expect(selects).toHaveLength(2);
    fireEvent.change(selects[0]!, { target: { value: 'q' } });
    fireEvent.change(selects[1]!, { target: { value: 'q' } });
    check();
    await screen.findByTestId('question-result');
    expect(submit).toHaveBeenCalledWith({ pairs: [{ left_id: '1', right_id: 'q' }, { left_id: '2', right_id: 'q' }] });
    expect(container.textContent).toContain('Answer: P');
    expect(matchLabel('p', 'A')).toBe('P');
    expect(matchLabel('ii', 'B')).toBe('ii');
    expect(matchLabel('long-id', 'C')).toBe('C');
  });

  it('ordering: buttons and keyboard move items, then the order is sent', async () => {
    const { submit, container } = setup(Q.ordering, result(Q.ordering, { key: key({ order: ['b', 'a', 'c'] }), feedback: { positionsCorrect: 3 } }));
    const ids = () => [...container.querySelectorAll('[data-order-row]')].map((r) => r.getAttribute('data-option-id'));
    fireEvent.click(screen.getByRole('button', { name: 'Move Item B up' }));
    expect(ids()).toEqual(['b', 'a', 'c']);
    // Keyboard: pick up C, move up twice, drop.
    const handleC = screen.getByRole('button', { name: /Item C, position 3 of 3/ });
    fireEvent.keyDown(handleC, { key: ' ' });
    expect(container.querySelector('[aria-live="polite"]')!.textContent).toMatch(/picked up/);
    fireEvent.keyDown(handleC, { key: 'ArrowUp' });
    expect(ids()).toEqual(['b', 'c', 'a']);
    fireEvent.keyDown(screen.getByRole('button', { name: /Item C, position 2 of 3/ }), { key: 'ArrowDown' });
    expect(ids()).toEqual(['b', 'a', 'c']);
    fireEvent.keyDown(screen.getByRole('button', { name: /Item C, position 3 of 3/ }), { key: 'Escape' });
    check();
    await screen.findByTestId('question-result');
    expect(submit).toHaveBeenCalledWith({ order: ['b', 'a', 'c'] });
    expect(container.textContent).toContain('3 of 3 items are in the right place.');
  });

  it('code-output: the code block renders and the answer is sent verbatim', async () => {
    const { submit, container } = setup(Q.code, result(Q.code, { correct: false, marksAwarded: 0, key: key({ output: '0\n1' }) }));
    expect(container.querySelector('pre code')!.textContent).toContain('print(i)');
    const box = screen.getByLabelText(/exact output/);
    expect(box.className).toMatch(/mono/);
    fireEvent.change(box, { target: { value: '0\n1\n' } });
    check();
    await screen.findByTestId('question-result');
    expect(submit).toHaveBeenCalledWith({ output: '0\n1\n' });
    expect(screen.getByTestId('answer-key').querySelector('pre')!.textContent).toBe('0\n1');
  });
});

describe('QuestionCard: written types', () => {
  const written = (question: StudentQuestion, max: number) =>
    result(question, { correct: null, marksAwarded: null, grading: 'self', selfAssessmentPending: true, selfMaxMarks: max, stored: true, answerId: '7b3e0a6e-1c62-4c4e-9e57-1d1f0c1c7a11', key: key({ model_answer_md: 'Model **answer**.' }, { rubric: [{ criterion: 'Format', marks: 1, descriptor_md: 'Notice box' }] }) });

  it('short: word-limit counter, underline marker, model answer and member self-mark', async () => {
    const selfAssess = vi.fn(async () => {});
    const { submit, container } = setup(Q.short, written(Q.short, 2), { selfAssess });
    expect(container.querySelector('ins')!.textContent).toBe('respiration');
    expect(screen.getByText('30–50 words')).toBeTruthy();
    const box = screen.getByLabelText(/^Your answer/);
    fireEvent.change(box, { target: { value: 'Energy is released when glucose is oxidised' } });
    expect(container.querySelector('[data-words]')!.getAttribute('data-words')).toBe('7');
    expect(container.querySelector('[data-words]')!.getAttribute('data-status')).toBe('under');
    check();
    await screen.findByTestId('question-result');
    expect(submit).toHaveBeenCalledWith({ text: 'Energy is released when glucose is oxidised' });
    expect(screen.getByText('Check it yourself')).toBeTruthy();
    expect(await screen.findByText('answer')).toBeTruthy();
    const form = screen.getByTestId('self-mark');
    fireEvent.change(within(form).getByRole('combobox'), { target: { value: '1.5' } });
    fireEvent.click(within(form).getByRole('button', { name: 'Save marks' }));
    await screen.findByTestId('self-mark-saved');
    expect(selfAssess).toHaveBeenCalledWith('7b3e0a6e-1c62-4c4e-9e57-1d1f0c1c7a11', 1.5);
  });

  it('guests are invited to log in instead of self-marking', async () => {
    const onLogin = vi.fn();
    setup(Q.long, { ...written(Q.long, 5), stored: false, answerId: null }, { onLogin });
    fireEvent.change(screen.getByLabelText(/^Your answer/), { target: { value: 'Rusting is…' } });
    check();
    fireEvent.click(await screen.findByRole('button', { name: 'Log in to save your marks' }));
    expect(onLogin).toHaveBeenCalled();
  });

  it('writing: format badge, word limit, rubric after submit', async () => {
    const { container } = setup(Q.writing, written(Q.writing, 5));
    expect(screen.getByTestId('format-badge').textContent).toBe('Notice');
    expect(container.textContent).toContain('answer in 50–80 words');
    expect(container.textContent).not.toContain('Notice box');
    fireEvent.change(screen.getByLabelText(/^Your answer/), { target: { value: 'NOTICE …' } });
    check();
    await screen.findByTestId('question-result');
    expect(screen.getByRole('table')).toBeTruthy();
    expect(await screen.findByText('Notice box')).toBeTruthy();
  });

  it('map: a labelled field per place with suggestions and a printed-map note', async () => {
    const { submit, container } = setup(Q.map, { ...written(Q.map, 3), key: key({ places: [{ id: 'A', name: 'Kerala', accepted: ['Keralam'] }] }) });
    expect(container.querySelector('[data-input="map"]')!.getAttribute('data-map-id')).toBe('india-political');
    expect(container.textContent).toMatch(/printed outline map/);
    expect(container.querySelectorAll('datalist option').length).toBeGreaterThan(30);
    fireEvent.change(screen.getByLabelText('Place A'), { target: { value: 'Kerala' } });
    fireEvent.change(screen.getByLabelText('Place C'), { target: { value: 'Goa' } });
    check();
    await screen.findByTestId('question-result');
    expect(submit).toHaveBeenCalledWith({ text: 'A: Kerala\nC: Goa' });
    expect(screen.getByTestId('answer-key').textContent).toContain('A: Kerala · also: Keralam');
  });
});

describe('QuestionCard: case/source-based', () => {
  it('passage with origin label, parts, internal choice, per-part results', async () => {
    const res = result(Q.caseBased, {
      correct: null,
      marksAwarded: 1,
      grading: 'self',
      selfAssessmentPending: true,
      selfMaxMarks: 3,
      key: key({ model_answer_md: 'See parts' }, { solution_md: '', marking_scheme: [] }),
      parts: [
        { id: 'c1', alternative: null, type: 'mcq', correct: true, marksAwarded: 1, maxMarks: 1, grading: 'auto', key: key({ option_ids: ['b'] }) },
        { id: 'c2', alternative: 'c2b', type: 'short', correct: null, marksAwarded: null, maxMarks: 3, grading: 'self', key: key({ model_answer_md: '$\\ce{CaO + H2O -> Ca(OH)2}$' }) },
      ],
    });
    const { submit, container } = setup(Q.caseBased, res);
    expect(screen.getByTestId('passage-origin').textContent).toContain('SOYL commentary — not from the textbook');
    expect(container.querySelector('[aria-label="Passage"] strong')!.textContent).toBe('quicklime');
    const c1 = container.querySelector('[data-part-id="c1"]')!;
    fireEvent.click(within(c1 as HTMLElement).getAllByRole('radio')[1]!);
    const c2 = container.querySelector('[data-part-id="c2"]') as HTMLElement;
    fireEvent.click(within(c2).getByLabelText('Or option 2'));
    expect(c2.textContent).toContain('Write the balanced equation.');
    fireEvent.change(within(c2).getByLabelText(/^Your answer/), { target: { value: 'CaO + H2O → Ca(OH)2' } });
    check();
    await screen.findByTestId('question-result');
    expect(submit).toHaveBeenCalledWith({ parts: [{ id: 'c1', response: { option_ids: ['b'] } }, { id: 'c2', alternative: 'c2b', response: { text: 'CaO + H2O → Ca(OH)2' } }] });
    expect(c1.querySelector('[data-option-id="b"]')!.getAttribute('data-state')).toBe('correct');
    await waitFor(() => expect(c2.querySelector('.katex')).not.toBeNull());
  });
});

describe('errors and retries', () => {
  it('shows describeError for a failed check and lets the student retry', async () => {
    const submit = vi.fn().mockRejectedValueOnce(new Error('429')).mockResolvedValueOnce(result(Q.tf, { key: key({ option_ids: ['a'] }) }));
    const { container } = render(<QuestionCard question={Q.tf} slots={buildQuestionSlots(Q.tf)} submit={submit} describeError={() => 'Please wait a minute.'} />);
    fireEvent.click(within(container.querySelector('[data-option-id="a"]')!).getByRole('radio'));
    check();
    expect((await screen.findByRole('alert')).textContent).toContain('Please wait a minute.');
    check();
    await screen.findByTestId('question-result');
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(container.querySelector('[data-phase="answering"]')).not.toBeNull();
  });
});

describe('XSS: question content and revealed keys render inert (WEB-7)', () => {
  it.each(MARKDOWN_XSS.map((p, i) => [i, p]))('stem/options/passage payload %i (server render)', (_i, payload) => {
    const question = { ...Q.caseBased, stem_md: payload as string, passage_md: payload as string, children: [{ ...Q.caseBased.children[0]!, stem_md: payload as string, options: [{ id: 'a', text_md: payload as string }] }] };
    const slots = buildQuestionSlots(question as StudentQuestion);
    const html = renderToStaticMarkup(
      <>
        {slots.passage}
        {Object.values(slots.parts).map((p, i) => (
          <div key={i}>
            {p.stem}
            {Object.values(p.options)}
          </div>
        ))}
      </>,
    );
    const host = document.createElement('div');
    host.innerHTML = html;
    expect(findProblems(host)).toEqual([]);
  });

  it.each(MARKDOWN_XSS.slice(0, 12).map((p, i) => [i, p]))('revealed solution/model answer payload %i (client RichText)', async (_i, payload) => {
    const { container } = render(<KeyDetails answerKey={key({ model_answer_md: payload as string }, { solution_md: payload as string, marking_scheme: [{ step: payload as string, marks: 1 }] })} />);
    await act(async () => {
      await import('../render/Markdown');
    });
    expect(findProblems(container)).toEqual([]);
    expect((window as unknown as { __xss?: number }).__xss).toBeUndefined();
  });
});

describe('underline marker ++text++ (contract v2)', () => {
  it('the renderer regex equals the shared contract regex', () => {
    expect(UNDERLINE_SOURCE).toBe(UNDERLINE_RE.source);
  });
  it.each([
    ['Find the ++adverb++ here.', ['adverb']],
    ['Two: ++रेखांकित++ और ++पद++।', ['रेखांकित', 'पद']],
    ['Bold inside: ++**very**++ good', ['very']],
    ['C++ and C++ are languages', []],
    ['Code `++x++` stays', []],
    ['Maths $a ++b++ c$ stays', []],
    ['Open ++ only', []],
  ])('%s', (md, spans) => {
    const html = renderToStaticMarkup(<Markdown>{md}</Markdown>);
    const host = document.createElement('div');
    host.innerHTML = html;
    expect([...host.querySelectorAll('ins')].map((e) => e.textContent)).toEqual(spans);
  });
});
