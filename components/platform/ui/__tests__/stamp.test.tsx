import { render, screen } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Stamp, STAMP_MAX_TILT, stampName, stampTilt } from '../kit/Stamp';

describe('Stamp (ADR-029)', () => {
  it('is one image named by everything it shows; the drawing itself is hidden', () => {
    render(<Stamp value={7} label="day streak" caption="11 Nov 2026" />);
    const stamp = screen.getByRole('img', { name: '7 day streak, 11 Nov 2026' });
    expect(stamp.getAttribute('data-tone')).toBe('madder');
    const svg = stamp.querySelector('svg')!;
    expect(svg.getAttribute('aria-hidden')).toBe('true');
    expect(svg.getAttribute('focusable')).toBe('false');
    const ringText = Array.from(stamp.querySelectorAll('textPath')).map((t) => t.textContent);
    expect(ringText).toEqual(['DAY STREAK', '11 NOV 2026']);
    expect(stamp.querySelector('[data-length]')?.textContent).toBe('7');
  });

  it('takes an explicit name, the solved tone, and can be decorative', () => {
    const { container } = render(
      <>
        <Stamp value="#3" label="weekly rank" ariaLabel="Third in your league this week" />
        <Stamp value={30} label="day streak" tone="solved" decorative />
      </>,
    );
    expect(screen.getByRole('img', { name: 'Third in your league this week' })).toBeTruthy();
    const decorative = container.querySelector('[data-tone="solved"]')!;
    expect(decorative.getAttribute('aria-hidden')).toBe('true');
    expect(decorative.getAttribute('role')).toBeNull();
    expect(decorative.getAttribute('aria-label')).toBeNull();
  });

  it('gives every stamp its own text paths and texture filter', () => {
    const html = renderToStaticMarkup(
      <div>
        <Stamp value={1} label="day streak" caption="Mon" />
        <Stamp value={2} label="day streak" caption="Tue" />
      </div>,
    );
    const host = document.createElement('div');
    host.innerHTML = html;
    const ids = Array.from(host.querySelectorAll('[id]')).map((el) => el.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toHaveLength(6);
    for (const stamp of Array.from(host.querySelectorAll('[role="img"]'))) {
      const own = new Set(Array.from(stamp.querySelectorAll('[id]')).map((el) => el.id));
      for (const ref of Array.from(stamp.querySelectorAll('textPath')).map((t) => t.getAttribute('href')!.slice(1))) expect(own.has(ref)).toBe(true);
      const filterRef = /^url\(#(.+)\)$/.exec(stamp.querySelector('g')!.getAttribute('filter')!)![1];
      expect(own.has(filterRef)).toBe(true);
    }
  });

  it('keeps the tilt within bounds and the size at a readable minimum', () => {
    expect(stampTilt(-40)).toBe(-STAMP_MAX_TILT);
    expect(stampTilt(30)).toBe(STAMP_MAX_TILT);
    expect(stampTilt(5)).toBe(5);
    expect(stampTilt(Number.NaN)).toBe(0);
    render(<Stamp value={12} label="day streak" size={20} tilt={-90} />);
    const stamp = screen.getByRole('img', { name: '12 day streak' });
    expect(stamp.style.getPropertyValue('--stamp-tilt')).toBe('-12deg');
    expect(stamp.style.getPropertyValue('--stamp-size')).toBe('72px');
  });

  it('names what it shows, trimmed', () => {
    expect(stampName(' 7 ', ' day streak ')).toBe('7 day streak');
    expect(stampName('#3', 'weekly rank', ' Gold league ')).toBe('#3 weekly rank, Gold league');
    expect(stampName(5, 'day streak', '  ')).toBe('5 day streak');
  });
});
