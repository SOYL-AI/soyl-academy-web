import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Deck, SLIDE_LAYOUTS } from '@/platform/shared/content/deck';
import { Visual as VisualSchema } from '@/platform/shared/content/visual';
import { SAMPLE_DECK, SAMPLE_DECK_HI } from '../__fixtures__/sample-deck';
import { renderSlide } from '../slides/layouts';
import { ReadAlong } from '../slides/ReadAlong';
import { layoutFlow } from '../visual/flow-layout';
import { niceTicks } from '../visual/svg-utils';
import { Visual } from '../visual/Visual';
import { findProblems } from './inert';

const deck = Deck.parse(SAMPLE_DECK);
const deckHi = Deck.parse(SAMPLE_DECK_HI);

describe('fixtures', () => {
  it('validate against the shared Deck schema and cover every layout and visual kind', () => {
    expect(new Set(deck.slides.map((s) => s.layout))).toEqual(new Set(SLIDE_LAYOUTS));
    const kinds = new Set(deck.slides.flatMap((s) => (s.visual ? [s.visual.kind] : [])));
    expect(kinds).toEqual(new Set(['svg', 'plot', 'geometry', 'chem', 'table', 'flow']));
    const chem = deck.slides.flatMap((s) => (s.visual?.kind === 'chem' ? [s.visual.spec] : []));
    expect(chem.some((c) => 'smiles' in c)).toBe(true);
    expect(chem.some((c) => 'equation' in c)).toBe(true);
    expect(deckHi.language).toBe('hi');
  });
});

describe('renderSlide', () => {
  it.each(deck.slides.map((s) => [s.layout, s.id]))('server-renders %s (%s) with slide semantics', (_layout, id) => {
    const slide = deck.slides.find((s) => s.id === id)!;
    const html = renderToStaticMarkup(<>{renderSlide(slide, { index: 1, total: deck.slides.length, goals: deck.goals })}</>);
    const host = document.createElement('div');
    host.innerHTML = html;
    const article = host.querySelector('article')!;
    expect(article.getAttribute('aria-roledescription')).toBe('slide');
    expect(article.getAttribute('data-layout')).toBe(slide.layout);
    expect(host.querySelector(`#${article.getAttribute('aria-labelledby')}`)?.textContent).toBe(slide.heading);
    expect(findProblems(host)).toEqual([]);
  });

  it('sets lang="hi" for Hindi decks and renders Devanagari text', () => {
    const { container } = render(<>{renderSlide(deckHi.slides[0], { lang: 'hi' })}</>);
    expect(container.querySelector('article')?.getAttribute('lang')).toBe('hi');
    expect(container.textContent).toContain('संज्ञा');
  });

  it('shows narration with word/sentence highlight in listen mode only', () => {
    const slide = deck.slides[1];
    const listen = render(<>{renderSlide(slide, { mode: 'listen', highlight: { word: 3 } })}</>);
    expect(listen.container.querySelector('[data-word="3"]')?.className).toMatch(/wordActive/);
    expect(listen.container.querySelector('[data-sentence="0"]')?.className).toMatch(/sentenceActive/);
    listen.unmount();
    const read = render(<>{renderSlide(slide, { mode: 'read' })}</>);
    expect(read.container.querySelector('[data-word]')).toBeNull();
  });

  it('renders the check slot through renderCheck', () => {
    const slide = deck.slides.find((s) => s.layout === 'check')!;
    const { getByText } = render(<>{renderSlide(slide, { renderCheck: (id) => <p>Question {id}</p> })}</>);
    expect(getByText(`Question ${slide.check_question_id}`)).toBeTruthy();
  });

  it('ReadAlong keeps every word', () => {
    const { container } = render(<ReadAlong text="One two. Three." />);
    expect(container.textContent?.replace(/\s+/g, ' ').trim()).toBe('One two. Three.');
  });
});

describe('visual renderers', () => {
  const render1 = (v: unknown) => {
    const parsed = VisualSchema.parse(v);
    return render(<Visual visual={parsed} />).container;
  };

  it('plot: draws each function, legend and accessible name', () => {
    const v = deck.slides.find((s) => s.visual?.kind === 'plot')!.visual!;
    const c = render1(v);
    const svg = c.querySelector('svg[data-visual="plot"]')!;
    expect(svg.getAttribute('role')).toBe('img');
    expect(svg.getAttribute('aria-label')).toBe(v.alt);
    const paths = Array.from(svg.querySelectorAll('g[clip-path] path'));
    expect(paths).toHaveLength(3);
    expect(paths.every((p) => (p.getAttribute('d') ?? '').startsWith('M'))).toBe(true);
    expect(c.querySelectorAll('ul[aria-label="Legend"] li')).toHaveLength(3);
  });

  it('plot: breaks the curve at asymptotes and reports bad expressions', () => {
    const c = render1({
      kind: 'plot',
      spec: { x: { min: -3, max: 3 }, y: { min: -5, max: 5 }, functions: [{ expr: 'tan(x)' }, { expr: 'alert(1)' }] },
      alt: 'tan x between -3 and 3',
    });
    const d = c.querySelector('g[clip-path] path')!.getAttribute('d')!;
    expect(d.match(/M/g)!.length).toBeGreaterThanOrEqual(3);
    expect(c.textContent).toContain('Could not draw: alert(1)');
  });

  it('geometry: draws points, labels, right-angle mark and polygon fill', () => {
    const v = deck.slides.find((s) => s.visual?.kind === 'geometry')!.visual!;
    const c = render1(v);
    expect(c.querySelector('svg')!.getAttribute('aria-label')).toBe(v.alt);
    const texts = Array.from(c.querySelectorAll('text')).map((t) => t.textContent);
    expect(texts).toEqual(expect.arrayContaining(['A', 'B', 'C', '3 cm', '4 cm', '5 cm', 'θ']));
    expect(c.querySelector('path[fill="var(--diagram-fill)"]')).not.toBeNull();
  });

  it('geometry: ignores references to unknown points', () => {
    const c = render1({ kind: 'geometry', spec: { points: { A: [0, 0] }, segments: [{ from: 'A', to: 'Z' }] }, alt: 'A lone point A' });
    expect(c.querySelectorAll('line')).toHaveLength(0);
  });

  it('flow: deterministic layout, wide and narrow variants for long flows', () => {
    const v = deck.slides.find((s) => s.visual?.kind === 'flow')!.visual!;
    if (v.kind !== 'flow') throw new Error('fixture');
    expect(layoutFlow(v.spec, 'LR')).toEqual(layoutFlow(v.spec, 'LR'));
    const c = render1(v);
    expect(c.querySelectorAll('svg[data-visual="flow"]')).toHaveLength(2);
    expect(layoutFlow(v.spec, 'LR').ranks).toBe(4);
  });

  it('flow: survives cycles', () => {
    const l = layoutFlow({ nodes: [{ id: 'a', label: 'Evaporation' }, { id: 'b', label: 'Condensation' }, { id: 'c', label: 'Rain' }], edges: [{ from: 'a', to: 'b' }, { from: 'b', to: 'c' }, { from: 'c', to: 'a' }] }, 'LR');
    expect(l.ranks).toBe(3);
    expect(l.edges.filter((e) => e.back)).toHaveLength(1);
  });

  it('table: caption, header scopes and focusable scroll region', () => {
    const v = deck.slides.find((s) => s.visual?.kind === 'table')!.visual!;
    const c = render1(v);
    const region = c.querySelector('[role="region"]')!;
    expect(region.getAttribute('aria-label')).toBe(v.alt);
    expect(region.getAttribute('tabindex')).toBe('0');
    expect(c.querySelectorAll('th[scope="col"]')).toHaveLength(3);
    expect(c.querySelector('caption')?.textContent).toBe('Atom count after balancing');
  });

  it('chem equation renders mhchem through KaTeX; smiles renders a client placeholder', () => {
    const eq = render1({ kind: 'chem', spec: { equation: '2H2 + O2 -> 2H2O' }, alt: 'Water formation' });
    expect(eq.querySelector('[role="group"][aria-label="Water formation"] .katex')).not.toBeNull();
    const sm = render1({ kind: 'chem', spec: { smiles: 'CCO', name: 'Ethanol' }, alt: 'Ethanol structure' });
    expect(sm.querySelector('[role="img"][aria-label="Ethanol structure"]')).not.toBeNull();
    const bad = render1({ kind: 'chem', spec: { smiles: '<script>' }, alt: 'Bad structure' });
    expect(bad.querySelector('[data-state="error"]')).not.toBeNull();
  });

  it('nice ticks', () => {
    expect(niceTicks(-4, 4, 6)).toEqual([-4, -3, -2, -1, 0, 1, 2, 3, 4]);
    expect(niceTicks(0, 1, 5)).toEqual([0, 0.2, 0.4, 0.6, 0.8, 1]);
  });
});

describe.each(['science/cbse-10-science-ch01', 'maths/cbse-10-mathematics-ch06'])('exemplar %s (real content) renders inert', (path) => {
  const release = JSON.parse(readFileSync(resolve(process.cwd(), 'platform/content-templates/exemplars', path, 'release.json'), 'utf8')) as { decks: unknown[] };
  const decks = release.decks.map((d) => Deck.parse(d));
  it.each(decks.flatMap((d) => d.slides.map((s) => [`part ${d.part} ${s.id}`, s] as const)))('%s', (_name, slide) => {
    const html = renderToStaticMarkup(<>{renderSlide(slide, { idPrefix: 'ex' })}</>);
    const host = document.createElement('div');
    host.innerHTML = html;
    expect(findProblems(host)).toEqual([]);
  });
});
