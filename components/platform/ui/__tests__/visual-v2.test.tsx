/**
 * Visual renderers, contract v2 (M2): geometry lines/rays/ticks/arrows/arcs/highlights, plot reference
 * lines and on_curve points, SVG label formatting (sub/superscripts, primes, TeX subset) and compact
 * tables with inline maths (Punnett squares).
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { render } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Visual as VisualSchema } from '@/platform/shared/content/visual';
import { clipParam, htmlLabel, labelRuns, svgLabel } from '../visual/svg-utils';
import { isCompactTable, Visual } from '../visual/Visual';
import { findProblems } from './inert';

const render1 = (v: unknown) => render(<Visual visual={VisualSchema.parse(v)} />).container;
const geo = (spec: Record<string, unknown>) => render1({ kind: 'geometry', spec: { width: 10, height: 10, ...spec }, alt: 'A geometry figure for tests' });
const plot = (spec: Record<string, unknown>) => render1({ kind: 'plot', spec: { x: { min: -4, max: 4 }, y: { min: -4, max: 4 }, ...spec }, alt: 'A plot for tests' });
const viewBox = (c: Element) => c.querySelector('svg')!.getAttribute('viewBox')!.split(' ').map(Number);
const num = (el: Element, attr: string) => Number(el.getAttribute(attr));
/** Subpath count of a path's d attribute. */
const moves = (el: Element | null) => (el?.getAttribute('d') ?? '').match(/M/g)?.length ?? 0;
/** All numbers in a path's d attribute, as [x, y] pairs. */
const pairs = (el: Element): [number, number][] => {
  const n = (el.getAttribute('d') ?? '').match(/-?\d+(\.\d+)?/g)!.map(Number);
  const out: [number, number][] = [];
  for (let i = 0; i + 1 < n.length; i += 2) out.push([n[i], n[i + 1]]);
  return out;
};

// 10 × 10 canvas: k = 30 px per unit, PAD = 26, viewBox 352 × 352, clip box inset 3 px.
const X = (x: number) => 26 + x * 30;
const Y = (y: number) => 26 + (10 - y) * 30;

describe('label formatter (svg-utils)', () => {
  const flat = (label: string) => labelRuns(label).map((r) => (r.script ? `${r.script}(${r.text})` : r.text)).join('');

  it('subscripts and superscripts, single character or braced', () => {
    expect(labelRuns('x_1')).toEqual([{ text: 'x' }, { text: '1', script: 'sub' }]);
    expect(flat('P_{12}')).toBe('Psub(12)');
    expect(flat('x^2 + y^2')).toBe('xsup(2) + ysup(2)');
    expect(flat('10^{-3} A')).toBe('10sup(-3) A');
    expect(flat('x_1^2')).toBe('xsub(1)sup(2)');
    expect(flat('a\\_b')).toBe('a_b');
    expect(flat('a_ b')).toBe('a_ b');
  });

  it('turns an ASCII prime after a letter into ′ but keeps apostrophes in words', () => {
    expect(flat("A'")).toBe('A′');
    expect(flat("A''")).toBe('A′′');
    expect(flat("A'B'")).toBe('A′B′');
    expect(flat("f'(x)")).toBe('f′(x)');
    expect(flat("x'")).toBe('x′');
    expect(flat('B′')).toBe('B′');
    expect(flat("Snell's law")).toBe("Snell's law");
    expect(flat("P_1'")).toBe('Psub(1)′');
  });

  it('renders the TeX subset used in real labels', () => {
    expect(flat('$3 - \\sqrt2$')).toBe('3 − √2');
    expect(flat('$\\tfrac{2 - \\sqrt{10}}{2}$')).toBe('(2 − √10)/2');
    expect(flat('$-\\tfrac12$')).toBe('−1/2');
    expect(flat('$\\dfrac{x^2}{20}$')).toBe('xsup(2)/20');
    expect(flat('$\\ell_1$')).toBe('ℓsub(1)');
    expect(flat('$60^\\circ$')).toBe('60°');
    expect(flat('$\\angle ABC = 90^{\\circ}$')).toBe('∠ABC = 90°');
    expect(flat('$\\theta$ and $\\pi r^2$')).toBe('θ and πrsup(2)');
    expect(flat('$2 \\times 3 \\le 7$')).toBe('2 × 3 ≤ 7');
    expect(flat('$\\text{m s}^{-1}$')).toBe('m ssup(−1)');
    expect(flat('$\\sin x$')).toBe('sin x');
    expect(flat('\\ce{H2O}')).toBe('Hsub(2)O');
    expect(flat('$\\ce{CO2}$')).toBe('COsub(2)');
  });

  it('keeps literal dollars', () => {
    expect(flat('\\$5')).toBe('$5');
    expect(flat('costs $5')).toBe('costs $5');
  });

  it('svgLabel: plain string when nothing to format, tspans with dy otherwise', () => {
    expect(svgLabel('AB')).toBe('AB');
    const { container } = render(
      <svg>
        <text>{svgLabel('x_1y^2')}</text>
      </svg>,
    );
    const spans = Array.from(container.querySelectorAll('tspan'));
    expect(container.textContent).toBe('x1y2');
    expect(spans.map((t) => [t.getAttribute('data-script'), t.textContent, t.getAttribute('dy'), t.getAttribute('font-size')])).toEqual([
      ['sub', '1', '3.9', '75%'],
      [null, 'y', '-3.9', null],
      ['sup', '2', '-5.46', '75%'],
    ]);
  });

  it('htmlLabel uses <sub>/<sup>', () => {
    const { container } = render(<span>{htmlLabel('v_0^2')}</span>);
    expect(container.querySelector('sub')?.textContent).toBe('0');
    expect(container.querySelector('sup')?.textContent).toBe('2');
  });

  it('clipParam clips lines and rays to a box', () => {
    const box = { x0: 0, y0: 0, x1: 10, y1: 10 };
    expect(clipParam({ x: 5, y: 5 }, { x: 1, y: 0 }, box)).toEqual([-5, 5]);
    expect(clipParam({ x: 5, y: 5 }, { x: 1, y: 0 }, box, 0)).toEqual([0, 5]);
    expect(clipParam({ x: 5, y: 20 }, { x: 1, y: 0 }, box)).toBeNull();
  });
});

describe('geometry: lines and rays', () => {
  it('draws an infinite line through two points, clipped to the canvas, dashed and labelled', () => {
    const c = geo({ points: { A: [2, 2], B: [4, 4] }, lines: [{ through: ['A', 'B'], label: 'ℓ_1', dashed: true }] });
    const [, , vw, vh] = viewBox(c);
    const lines = c.querySelectorAll('line[data-mark="line"]');
    expect(lines).toHaveLength(1);
    const l = lines[0];
    expect(l.getAttribute('stroke-dasharray')).toBe('6 5');
    const ends = [
      [num(l, 'x1'), num(l, 'y1')],
      [num(l, 'x2'), num(l, 'y2')],
    ];
    for (const [x, y] of ends) {
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(vw);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(vh);
    }
    // y = x through the square canvas reaches the clip box corners (inset 3 px).
    expect(ends.flat().sort((a, b) => a - b)).toEqual([3, 3, 349, 349]);
    const label = Array.from(c.querySelectorAll('text')).find((t) => t.textContent === 'ℓ1')!;
    expect(label.querySelector('tspan[data-script="sub"]')?.textContent).toBe('1');
  });

  it('a horizontal line spans the canvas width', () => {
    const c = geo({ points: { A: [3, 5], B: [5, 5] }, lines: [{ through: ['A', 'B'] }] });
    const l = c.querySelector('line[data-mark="line"]')!;
    expect([num(l, 'x1'), num(l, 'x2')].sort((a, b) => a - b)).toEqual([3, 349]);
    expect(num(l, 'y1')).toBe(Y(5));
    expect(l.getAttribute('stroke-dasharray')).toBeNull();
  });

  it('draws a ray from its start point through the second point to the canvas edge, with an arrowhead', () => {
    const c = geo({ points: { O: [1, 1], P: [3, 2] }, rays: [{ from: 'O', through: 'P', label: 'r' }] });
    const ray = c.querySelectorAll('line[data-mark="ray"]');
    expect(ray).toHaveLength(1);
    expect([num(ray[0], 'x1'), num(ray[0], 'y1')]).toEqual([X(1), Y(1)]);
    const head = c.querySelector('path[data-mark="arrowhead"]')!;
    expect(head.getAttribute('d')).toMatch(/Z$/);
    const [tip, w1, w2] = pairs(head);
    // Slope 1/2 from (56, 296): leaves through the right edge (x = 349).
    expect(tip[0]).toBeCloseTo(349, 1);
    expect(tip[1]).toBeCloseTo(296 - (349 - 56) / 2, 1);
    // Arrowhead points away from O: both wings are behind the tip.
    expect(w1[0]).toBeLessThan(tip[0]);
    expect(w2[0]).toBeLessThan(tip[0]);
    // The shaft stops just before the tip.
    expect(num(ray[0], 'x2')).toBeLessThan(tip[0]);
    expect(Array.from(c.querySelectorAll('text')).map((t) => t.textContent)).toContain('r');
  });

  it('dashed rays; unknown or coincident point references are ignored', () => {
    const c = geo({
      points: { A: [1, 1], B: [2, 2] },
      rays: [{ from: 'A', through: 'B', dashed: true }, { from: 'Z', through: 'A' }, { from: 'A', through: 'A' }],
      lines: [{ through: ['A', 'Q'] }, { through: ['B', 'B'] }],
      segments: [{ from: 'A', to: 'Nope', ticks: 2 }],
      angles: [{ at: 'A', from: 'B', to: 'X', arcs: 2 }],
      polygons: [{ vertices: ['A', 'B', 'Z'], highlight: 'accent' }],
    });
    expect(c.querySelectorAll('line[data-mark="ray"]')).toHaveLength(1);
    expect(c.querySelector('line[data-mark="ray"]')!.getAttribute('stroke-dasharray')).toBe('6 5');
    expect(c.querySelectorAll('line[data-mark="line"]')).toHaveLength(0);
    expect(c.querySelectorAll('[data-mark="ticks"], [data-mark="arc"], [data-highlight]')).toHaveLength(0);
  });

  it('a point in the middle of a line gets its label beside the line, not on it', () => {
    const c = geo({ points: { A: [1, 5], B: [9, 5], M: [5, 5] }, lines: [{ through: ['A', 'B'] }] });
    for (const name of ['A', 'B']) {
      const t = Array.from(c.querySelectorAll('text')).find((el) => el.textContent === name)!;
      expect(Math.abs(num(t, 'y') - 4 - Y(5))).toBeGreaterThan(10);
    }
  });

  it('every new mark stays inside the viewBox for steep and reversed lines', () => {
    const c = geo({
      width: 8,
      height: 4,
      points: { A: [7, 0.5], B: [6.9, 3.5], C: [0.5, 3], D: [4, 1] },
      lines: [{ through: ['A', 'B'] }, { through: ['D', 'C'] }],
      rays: [{ from: 'D', through: 'C' }, { from: 'B', through: 'A' }],
    });
    const [, , vw, vh] = viewBox(c);
    for (const l of Array.from(c.querySelectorAll('line[data-mark]'))) {
      for (const [x, y] of [
        [num(l, 'x1'), num(l, 'y1')],
        [num(l, 'x2'), num(l, 'y2')],
      ]) {
        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThanOrEqual(vw);
        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThanOrEqual(vh);
      }
    }
    for (const h of Array.from(c.querySelectorAll('path[data-mark="arrowhead"]'))) {
      for (const [x, y] of pairs(h)) {
        expect(x).toBeGreaterThanOrEqual(-1);
        expect(x).toBeLessThanOrEqual(vw + 1);
        expect(y).toBeGreaterThanOrEqual(-1);
        expect(y).toBeLessThanOrEqual(vh + 1);
      }
    }
    expect(c.querySelectorAll('path[data-mark="arrowhead"]')).toHaveLength(2);
  });
});

describe('geometry: segment marks, angle arcs, polygon highlights', () => {
  it('ticks: 1–3 perpendicular marks of equal length at the midpoint', () => {
    const c = geo({
      points: { A: [1, 1], B: [5, 1], C: [5, 5], D: [1, 5] },
      segments: [
        { from: 'A', to: 'B', ticks: 1 },
        { from: 'B', to: 'C', ticks: 2 },
        { from: 'C', to: 'D', ticks: 3 },
        { from: 'D', to: 'A' },
      ],
    });
    const ticks = Array.from(c.querySelectorAll('path[data-mark="ticks"]'));
    expect(ticks.map(moves)).toEqual([1, 2, 3]);
    // AB is horizontal: its tick is vertical, 10 px long, centred on the midpoint.
    const [p, q] = pairs(ticks[0]);
    expect(p[0]).toBe(q[0]);
    expect(p[0]).toBe((X(1) + X(5)) / 2);
    expect(Math.abs(p[1] - q[1])).toBe(10);
    expect((p[1] + q[1]) / 2).toBe(Y(1));
    // BC is vertical: ticks horizontal, 4 px apart.
    const bc = pairs(ticks[1]);
    expect(bc[0][1]).toBe(bc[1][1]);
    expect(Math.abs(bc[2][1] - bc[0][1])).toBe(4);
  });

  it('arrows: parallel chevrons pointing from → to', () => {
    const c = geo({
      points: { A: [1, 1], B: [5, 1], C: [6, 4], D: [2, 4] },
      segments: [
        { from: 'A', to: 'B', arrows: 1 },
        { from: 'D', to: 'C', arrows: 1 },
        { from: 'B', to: 'C', arrows: 2 },
        { from: 'A', to: 'D', arrows: 3, ticks: 1 },
      ],
    });
    const arrows = Array.from(c.querySelectorAll('path[data-mark="arrows"]'));
    expect(arrows.map(moves)).toEqual([1, 1, 2, 3]);
    // A → B points right: the tip (middle vertex) is right of both wings.
    const [w1, tip, w2] = pairs(arrows[0]);
    expect(tip[0]).toBeGreaterThan(w1[0]);
    expect(tip[0]).toBeGreaterThan(w2[0]);
    expect(c.querySelectorAll('path[data-mark="ticks"]')).toHaveLength(1);
  });

  it('angle arcs: 1–3 concentric arcs; right angles keep the square mark', () => {
    const c = geo({
      points: { A: [1, 1], B: [6, 1], C: [3, 5] },
      angles: [
        { at: 'A', from: 'B', to: 'C' },
        { at: 'B', from: 'C', to: 'A', arcs: 2 },
        { at: 'C', from: 'A', to: 'B', arcs: 3, label: '$\\theta$' },
        { at: 'A', from: 'B', to: 'C', right: true, arcs: 3 },
      ],
    });
    const arcs = Array.from(c.querySelectorAll('path[data-mark="arc"]'));
    expect(arcs).toHaveLength(6);
    const radii = arcs.map((a) => Number(/A(\d+)/.exec(a.getAttribute('d')!)![1]));
    expect(radii).toEqual([20, 20, 24, 20, 24, 28]);
    expect(c.querySelectorAll('path[data-mark="right-angle"]')).toHaveLength(1);
    expect(Array.from(c.querySelectorAll('text')).map((t) => t.textContent)).toContain('θ');
  });

  it('polygon highlights: shade fill, thick accent outline, translucent accent fill', () => {
    const c = geo({
      points: { A: [1, 1], B: [4, 1], C: [1, 4], D: [6, 6], E: [9, 6], F: [9, 9], G: [5, 2], H: [8, 2], I: [8, 4] },
      segments: [{ from: 'D', to: 'E', label: '3 cm' }],
      polygons: [
        { vertices: ['A', 'B', 'C'], highlight: 'shade' },
        { vertices: ['D', 'E', 'F'], highlight: 'outline' },
        { vertices: ['G', 'H', 'I'], highlight: 'accent' },
      ],
    });
    const shade = c.querySelector('path[data-highlight="shade"]')!;
    expect(shade.getAttribute('fill')).toBe('var(--diagram-fill)');
    expect(shade.getAttribute('stroke')).toBe('currentColor');
    const outline = c.querySelectorAll('path[data-highlight="outline"]');
    expect(outline).toHaveLength(2);
    expect(outline[0].getAttribute('fill')).toBe('none');
    expect(outline[1].getAttribute('stroke')).toBe('var(--diagram-accent)');
    expect(outline[1].getAttribute('stroke-width')).toBe('3.25');
    const accent = c.querySelectorAll('path[data-highlight="accent"]');
    expect(accent[0].getAttribute('fill')).toBe('var(--diagram-accent)');
    expect(Number(accent[0].getAttribute('fill-opacity'))).toBeLessThan(0.3);
    expect(accent[1].getAttribute('stroke')).toBe('var(--diagram-accent)');
    // Order: fills under the segment, accent outline above it, every label above all of them.
    const all = Array.from(c.querySelectorAll('svg *'));
    const segment = all.indexOf(c.querySelector('line')!);
    expect(all.indexOf(outline[0])).toBeLessThan(segment);
    expect(all.indexOf(outline[1])).toBeGreaterThan(segment);
    const lastShape = Math.max(...Array.from(c.querySelectorAll('path[data-highlight]')).map((el) => all.indexOf(el)));
    const labels = Array.from(c.querySelectorAll('text')).filter((t) => /^[A-I]$/.test(t.textContent ?? ''));
    expect(labels).toHaveLength(9);
    expect(labels.every((t) => all.indexOf(t) > lastShape)).toBe(true);
  });

  it('point, segment and angle labels use primes and sub/superscripts', () => {
    const c = geo({
      points: { A: { at: [1, 1], label: "A'" }, B: { at: [5, 1], label: 'B′' }, P1: { at: [3, 4], label: 'P_1' } },
      segments: [{ from: 'A', to: 'B', label: 'x^2' }],
    });
    const texts = Array.from(c.querySelectorAll('text'));
    expect(texts.map((t) => t.textContent)).toEqual(expect.arrayContaining(['A′', 'B′', 'P1', 'x2']));
    expect(texts.find((t) => t.textContent === 'P1')!.querySelector('tspan[data-script="sub"]')?.textContent).toBe('1');
    expect(texts.find((t) => t.textContent === 'x2')!.querySelector('tspan[data-script="sup"]')?.textContent).toBe('2');
    // Labels stay inside the aria-hidden group; the accessible name is the alt.
    expect(c.querySelector('svg')!.getAttribute('aria-label')).toBe('A geometry figure for tests');
    expect(texts.every((t) => t.closest('[aria-hidden="true"]'))).toBe(true);
  });
});

describe('plot: reference lines and on_curve points', () => {
  it('draws vlines/hlines across the plot area when in range, dashed when asked, with labels', () => {
    const c = plot({
      functions: [{ expr: '1/x' }],
      vlines: [{ x: 0, label: 'x = 0', dashed: true }, { x: 2.5, label: 'x_1' }, { x: 9, label: 'gone' }, { x: -4 }],
      hlines: [{ y: 1, label: 'y = 1', dashed: true }, { y: -5, label: 'below' }],
    });
    const v = Array.from(c.querySelectorAll('line[data-mark="vline"]'));
    expect(v).toHaveLength(3);
    // x range −4..4 over 272 px from x = 34: x = 0 → 170; the plot area runs y 14..212.
    expect([num(v[0], 'x1'), num(v[0], 'x2'), num(v[0], 'y1'), num(v[0], 'y2')]).toEqual([170, 170, 14, 212]);
    expect(v[0].getAttribute('stroke-dasharray')).toBe('6 4');
    expect(v[1].getAttribute('stroke-dasharray')).toBeNull();
    expect(num(v[2], 'x1')).toBe(34);
    const h = Array.from(c.querySelectorAll('line[data-mark="hline"]'));
    expect(h).toHaveLength(1);
    expect([num(h[0], 'x1'), num(h[0], 'x2')]).toEqual([34, 306]);
    expect(num(h[0], 'y1')).toBeCloseTo(14 + (3 / 8) * 198, 1);
    // Reference lines sit under the curves, inside the clip group.
    expect(v[0].closest('g[clip-path]')).not.toBeNull();
    const texts = Array.from(c.querySelectorAll('svg[data-visual="plot"] text')).map((t) => t.textContent);
    expect(texts).toEqual(expect.arrayContaining(['x = 0', 'x1', 'y = 1']));
    expect(texts).not.toContain('gone');
    expect(texts).not.toContain('below');
    const sub = Array.from(c.querySelectorAll('text')).find((t) => t.textContent === 'x1')!;
    expect(sub.querySelector('tspan[data-script="sub"]')).not.toBeNull();
    expect(sub.getAttribute('stroke')).toBe('var(--diagram-paper)');
  });

  it('no vlines/hlines field: nothing extra is drawn', () => {
    const c = plot({ functions: [{ expr: 'x' }] });
    expect(c.querySelectorAll('[data-mark="vline"], [data-mark="hline"]')).toHaveLength(0);
  });

  it('on_curve: false points render as the same solid marker, marked for styling', () => {
    const c = plot({
      functions: [{ expr: 'x^2 - 2' }],
      points: [
        { at: [0, -2], label: 'V' },
        { at: [1, 3], label: '$\\tfrac{2 - \\sqrt{10}}{2}$', on_curve: false },
      ],
    });
    const off = c.querySelector('g[data-on-curve="false"]')!;
    const on = c.querySelector('g:not([data-on-curve]) > circle[r="4"]')!;
    expect(off.querySelector('circle')!.getAttribute('fill')).toBe(on.getAttribute('fill'));
    expect(off.querySelector('text')!.textContent).toBe('(2 − √10)/2');
    expect(c.querySelectorAll('g[data-on-curve]')).toHaveLength(1);
  });

  it('legend labels: $…$ through KaTeX, x_1 as <sub>', () => {
    const c = plot({ functions: [{ expr: 'x^2', label: '$y = x^2$' }, { expr: 'x', label: 'y_1' }, { expr: '2', label: 'plain' }] });
    const items = Array.from(c.querySelectorAll('ul[aria-label="Legend"] li'));
    expect(items).toHaveLength(3);
    expect(items[0].querySelector('.katex')).not.toBeNull();
    expect(items[0].textContent).not.toContain('$');
    expect(items[1].querySelector('sub')?.textContent).toBe('1');
    expect(items[2].textContent).toBe('plain');
    expect(c.querySelectorAll('g[clip-path] path')).toHaveLength(3);
  });
});

describe('table: inline maths and Punnett squares', () => {
  const punnett = {
    kind: 'table',
    spec: {
      headers: ['', '$T$', '$t$'],
      rows: [
        ['$T$', '$TT$', '$Tt$'],
        ['$t$', '$Tt$', '$tt$'],
      ],
    },
    alt: 'Punnett square for crossing two Tt plants',
    caption: 'Monohybrid cross',
  };

  it('renders KaTeX in every header and cell, the empty corner as a plain cell, row headers in column 1', () => {
    const c = render1(punnett);
    const headRow = c.querySelector('thead tr')!;
    expect(headRow.children).toHaveLength(3);
    const corner = headRow.children[0];
    expect(corner.localName).toBe('td');
    expect(corner.textContent).toBe('');
    expect(corner.className).toContain('tableCorner');
    expect(c.querySelectorAll('th[scope="col"]')).toHaveLength(2);
    expect(c.querySelectorAll('th[scope="row"]')).toHaveLength(2);
    const cells = [...Array.from(c.querySelectorAll('thead th')), ...Array.from(c.querySelectorAll('tbody th, tbody td'))];
    expect(cells).toHaveLength(8);
    for (const cell of cells) expect(cell.querySelector('.katex')).not.toBeNull();
    expect(c.querySelector('table')!.className).toContain('tableCompact');
    expect(c.querySelector('caption')?.textContent).toBe('Monohybrid cross');
    expect(c.textContent).not.toContain('$');
  });

  it('superscripts, \\ce{} and bold in cells', () => {
    const c = render1({
      kind: 'table',
      spec: {
        headers: ['Gametes', '$I^A$', '$i$'],
        rows: [
          ['**X**', '$I^AI^A$', '\\ce{H2O}'],
          ['', '$X^hY$', '$\\ce{CO2}$'],
        ],
      },
      alt: 'Blood group cross with superscript alleles',
    });
    expect(c.querySelector('tbody th strong')?.textContent).toBe('X');
    const body = Array.from(c.querySelectorAll('tbody td'));
    expect(body.every((td) => td.textContent === '' || td.querySelector('.katex'))).toBe(true);
    // An empty first cell in a row is not an unnamed row header.
    expect(c.querySelectorAll('th[scope="row"]')).toHaveLength(1);
    expect(c.querySelectorAll('tbody tr')[1].children[0].localName).toBe('td');
    const host = document.createElement('div');
    host.innerHTML = renderToStaticMarkup(<Visual visual={VisualSchema.parse(punnett)} />);
    expect(findProblems(host, { allowKatexSvg: true })).toEqual([]);
  });

  it('compact only for small grids of short cells', () => {
    expect(isCompactTable({ headers: ['Mother’s egg → / Father’s sperm ↓', 'X', 'X'], rows: [['**X**', 'XX (girl)', 'XX (girl)']] })).toBe(true);
    expect(isCompactTable({ headers: ['Quantity', 'Value'], rows: [['Distance toe to spinal cord', '$0.8\\ \\text{m}$']] })).toBe(false);
    expect(isCompactTable({ headers: ['a', 'b', 'c', 'd', 'e', 'f', 'g'], rows: [['1', '2', '3', '4', '5', '6', '7']] })).toBe(false);
  });

  it('real heredity tables (CBSE 10 Science ch08) render as compact Punnett squares', () => {
    const file = resolve(process.cwd(), 'platform/content/authored/science/cbse-10-science-ch08/release.json');
    const tables = collect(JSON.parse(readFileSync(file, 'utf8'))).filter((v) => v.kind === 'table' && v.spec.headers[0] === 'Gametes');
    expect(tables.length).toBeGreaterThan(0);
    for (const t of tables) {
      const c = render1(t);
      expect(c.querySelector('table')!.className).toContain('tableCompact');
      expect(c.querySelectorAll('tbody th[scope="row"] strong').length).toBe(c.querySelectorAll('tbody tr').length);
    }
  });
});

/** Every visual object (has kind + spec + alt) in a JSON tree. */
function collect(node: unknown, out: VisualSchema[] = []): VisualSchema[] {
  if (Array.isArray(node)) node.forEach((n) => collect(n, out));
  else if (node && typeof node === 'object') {
    const o = node as Record<string, unknown>;
    if (typeof o.kind === 'string' && 'spec' in o && typeof o.alt === 'string') {
      const parsed = VisualSchema.safeParse(o);
      if (parsed.success) out.push(parsed.data);
    }
    Object.values(o).forEach((v) => collect(v, out));
  }
  return out;
}

function releases(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...releases(p));
    else if (name === 'release.json') out.push(p);
  }
  return out;
}

describe('real content: every geometry, plot and table visual renders inert with formatted labels', () => {
  const roots = ['platform/content/authored', 'platform/content-templates/exemplars'].map((r) => resolve(process.cwd(), r));
  const visuals = roots
    .flatMap((r) => {
      try {
        return releases(r);
      } catch {
        return [];
      }
    })
    .flatMap((f) => collect(JSON.parse(readFileSync(f, 'utf8'))))
    .filter((v) => v.kind === 'geometry' || v.kind === 'plot' || v.kind === 'table');

  it('found content to check', () => {
    expect(visuals.length).toBeGreaterThan(0);
  });

  // Hundreds of KaTeX tables: generous timeout for slow CI machines.
  it.each(['geometry', 'plot', 'table'] as const)('%s', (kind) => {
    for (const v of visuals.filter((x) => x.kind === kind)) {
      const host = document.createElement('div');
      host.innerHTML = renderToStaticMarkup(<Visual visual={v} />);
      expect(findProblems(host, { allowKatexSvg: true })).toEqual([]);
      for (const t of Array.from(host.querySelectorAll('svg text'))) {
        // No raw TeX left in SVG labels.
        expect(t.textContent).not.toMatch(/\$|\\[a-z]/);
      }
    }
  }, 120_000);
});
