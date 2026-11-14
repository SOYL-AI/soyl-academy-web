/**
 * RadarChart (kit, progress radar 2026-11-14): geometry for known values, rings, the accessible sentence and the data
 * table, the blank (unrated) state, the ghost outline, fewer than 3 axes, and the grow-in trigger without an observer.
 */
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { radarAngle, RadarChart, radarFraction, radarPoint, radarPoints, radarSentence, type RadarAxis } from '../kit/RadarChart';

const card: RadarAxis[] = [
  { key: 'ACC', label: 'Accuracy', value: 72, max: 99 },
  { key: 'CON', label: 'Consistency', value: 58, max: 99 },
  { key: 'SPD', label: 'Speed', value: 99, max: 99 },
  { key: 'BRE', label: 'Breadth', value: 40, max: 99 },
  { key: 'MAS', label: 'Mastery', value: 50, max: 99 },
  { key: 'TST', label: 'Tests', value: 61, max: 99 },
];

describe('radar geometry', () => {
  it('axis 0 points up, then clockwise; values map from min (centre) to max (outer ring), clamped', () => {
    expect(radarAngle(0, 6)).toBeCloseTo(-Math.PI / 2);
    expect(radarPoint(0, 6, 1)).toEqual({ x: 100, y: 0 });
    expect(radarPoint(1, 6, 1)).toEqual({ x: 186.6, y: 50 });
    expect(radarPoint(3, 6, 0.5)).toEqual({ x: 100, y: 150 });
    expect(radarPoint(2, 4, 0)).toEqual({ x: 100, y: 100 });
    expect(radarFraction(40, 40, 99)).toBe(0);
    expect(radarFraction(99, 40, 99)).toBe(1);
    expect(radarFraction(69.5, 40, 99)).toBeCloseTo(0.5);
    expect(radarFraction(120, 40, 99)).toBe(1);
    expect(radarFraction(10, 40, 99)).toBe(0);
    expect(radarFraction(Number.NaN, 0, 100)).toBe(0);
    expect(radarFraction(5, 10, 10)).toBe(0);
  });

  it('points for known values', () => {
    const square: RadarAxis[] = [
      { key: 'a', label: 'A', value: 100, max: 100 },
      { key: 'b', label: 'B', value: 50, max: 100 },
      { key: 'c', label: 'C', value: 0, max: 100 },
      { key: 'd', label: 'D', value: 25, max: 100 },
    ];
    expect(radarPoints(square, 0)).toEqual([
      { x: 100, y: 0 },
      { x: 150, y: 100 },
      { x: 100, y: 100 },
      { x: 75, y: 100 },
    ]);
    // The card: Speed 99 on the outer ring (axis 2 of 6, lower right), Breadth 40 at the centre.
    const pts = radarPoints(card, 40);
    expect(pts[2]).toEqual({ x: 186.6, y: 150 });
    expect(pts[3]).toEqual({ x: 100, y: 100 });
  });
});

describe('RadarChart', () => {
  it('draws the shape, rings above min only, labels with values, one sentence and a table', () => {
    render(<RadarChart axes={card} label="Your card attributes" min={40} rings={[40, 60, 80, 99]} tone="gold" columns={{ axis: 'Attribute', value: 'Rating' }} caption="The centre is 40." data-testid="r" />);
    const root = screen.getByTestId('r');
    expect(root.tagName).toBe('FIGURE');
    expect(root.getAttribute('data-tone')).toBe('gold');
    expect(root.getAttribute('data-axes')).toBe('6');
    // No IntersectionObserver in jsdom: shown at once.
    expect(root.hasAttribute('data-in')).toBe(true);
    expect(screen.getByTestId('radar-shape').getAttribute('points')).toBe(
      radarPoints(card, 40)
        .map((p) => `${p.x},${p.y}`)
        .join(' '),
    );
    expect([...root.querySelectorAll('[data-ring]')].map((r) => r.getAttribute('data-ring'))).toEqual(['60', '80', '99']);
    expect(root.querySelectorAll('circle')).toHaveLength(6);
    const img = within(root).getByRole('img');
    expect(img.getAttribute('aria-label')).toBe('Your card attributes, from 40 to 99: Accuracy 72, Consistency 58, Speed 99, Breadth 40, Mastery 50 and Tests 61.');
    const labels = [...root.querySelectorAll('[data-axis]')];
    expect(labels.map((l) => l.textContent)).toEqual(['Accuracy 72', 'Consistency 58', 'Speed 99', 'Breadth 40', 'Mastery 50', 'Tests 61']);
    expect(labels.map((l) => l.getAttribute('data-side'))).toEqual(['middle', 'start', 'start', 'middle', 'end', 'end']);
    expect(screen.getByText('The centre is 40.').tagName).toBe('FIGCAPTION');
    // The numbers again as a table (in a <details>).
    const table = within(root).getByRole('table');
    expect(table.closest('details')).toBeTruthy();
    expect(within(table).getAllByRole('columnheader').map((h) => h.textContent)).toEqual(['Attribute', 'Rating']);
    expect(within(table).getAllByRole('row').slice(1).map((r) => r.textContent)).toEqual(['Accuracy72', 'Consistency58', 'Speed99', 'Breadth40', 'Mastery50', 'Tests61']);
    expect(within(root).getByRole('region', { name: 'Your card attributes' })).toBeTruthy();
  });

  it('default rings: four even steps; units after every value', () => {
    const subjects: RadarAxis[] = [
      { key: 's', label: 'Science', value: 34, max: 100 },
      { key: 'm', label: 'Mathematics', value: 12.4, max: 100 },
      { key: 'e', label: 'English', value: 5, max: 100 },
    ];
    render(<RadarChart axes={subjects} label="Subject mastery" unit="%" data-testid="r" />);
    const root = screen.getByTestId('r');
    expect([...root.querySelectorAll('[data-ring]')].map((r) => r.getAttribute('data-ring'))).toEqual(['25', '50', '75', '100']);
    expect(within(root).getByRole('img').getAttribute('aria-label')).toBe('Subject mastery, from 0 to 100%: Science 34%, Mathematics 12% and English 5%.');
    expect(root.querySelector('[data-axis="m"]')!.textContent).toBe('Mathematics 12%');
    expect(within(root).getAllByRole('columnheader').map((h) => h.textContent)).toEqual(['Axis', 'Value']);
  });

  it('blank (unrated): dashed grid and names only; no shape, no numbers, no table', () => {
    render(<RadarChart axes={card} label="Your card attributes" min={40} rings={[40, 60, 80, 99]} blank data-testid="r" />);
    const root = screen.getByTestId('r');
    expect(root.hasAttribute('data-blank')).toBe(true);
    expect(screen.queryByTestId('radar-shape')).toBeNull();
    expect(root.querySelectorAll('circle')).toHaveLength(0);
    expect(root.querySelectorAll('[data-ring]')).toHaveLength(3);
    expect(root.textContent).not.toMatch(/\d/);
    expect(within(root).queryByRole('table')).toBeNull();
    expect(within(root).getByRole('img').getAttribute('aria-label')).toBe('Your card attributes: not rated yet (Accuracy, Consistency, Speed, Breadth, Mastery and Tests).');
    expect(radarSentence({ axes: card, label: 'X', blank: true })).not.toMatch(/\d/);
  });

  it('ghost: a faint outline under the shape, in the sentence and as a table column', () => {
    const axes = card.slice(0, 3);
    render(<RadarChart axes={axes} label="Card" min={40} ghost={{ label: 'Last month', values: { ACC: 60, CON: 50 } }} data-testid="r" />);
    const root = screen.getByTestId('r');
    expect(screen.getByTestId('radar-ghost').getAttribute('points')).toBe(
      radarPoints(axes, 40, [60, 50, 40])
        .map((p) => `${p.x},${p.y}`)
        .join(' '),
    );
    expect(within(root).getByRole('img').getAttribute('aria-label')).toBe('Card, from 40 to 99: Accuracy 72, Consistency 58 and Speed 99. Last month: Accuracy 60, Consistency 50 and Speed 40.');
    expect(within(root).getAllByRole('columnheader').map((h) => h.textContent)).toEqual(['Axis', 'Value', 'Last month']);
  });

  it('short names on the chart only; notes under the labels, in the sentence and as a table column', () => {
    const axes: RadarAxis[] = [
      { key: 'm', label: 'Mathematics (Standard 041 / Basic 241)', short: 'Mathematics', value: 61, max: 100, note: '3 of 14 chapters started', noteShort: '3/14 chapters' },
      { key: 's', label: 'Science', value: 40, max: 100, note: '2 of 15 chapters started' },
      { key: 'e', label: 'English', value: 20, max: 100 },
    ];
    render(<RadarChart axes={axes} label="Subject mastery" unit="%" columns={{ axis: 'Subject', value: 'Mastery', note: 'Chapters' }} data-testid="r" />);
    const root = screen.getByTestId('r');
    expect(root.hasAttribute('data-notes')).toBe(true);
    expect(root.querySelector('[data-axis="m"]')!.textContent).toBe('Mathematics 61%3/14 chapters');
    expect(root.querySelector('[data-axis="s"]')!.textContent).toBe('Science 40%2 of 15 chapters started');
    expect(root.querySelector('[data-axis="e"]')!.textContent).toBe('English 20%');
    expect(within(root).getByRole('img').getAttribute('aria-label')).toBe(
      'Subject mastery, from 0 to 100%: Mathematics (Standard 041 / Basic 241) 61% (3 of 14 chapters started), Science 40% (2 of 15 chapters started) and English 20%.',
    );
    const table = within(root).getByRole('table');
    expect(within(table).getAllByRole('columnheader').map((h) => h.textContent)).toEqual(['Subject', 'Mastery', 'Chapters']);
    expect(within(table).getAllByRole('row').slice(1).map((r) => r.textContent)).toEqual(['Mathematics (Standard 041 / Basic 241)61%3 of 14 chapters started', 'Science40%2 of 15 chapters started', 'English20%']);
    // No notes: no note column and no extra label room.
    render(<RadarChart axes={card.slice(0, 3)} label="Card" min={40} data-testid="plain" />);
    expect(screen.getByTestId('plain').hasAttribute('data-notes')).toBe(false);
    expect(within(screen.getByTestId('plain')).getAllByRole('columnheader')).toHaveLength(2);
  });

  it('fewer than 3 axes: nothing (the page shows a list instead)', () => {
    const { container } = render(<RadarChart axes={card.slice(0, 2)} label="Two" />);
    expect(container.innerHTML).toBe('');
  });
});
