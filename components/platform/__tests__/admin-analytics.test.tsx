/**
 * D-045 super-admin dashboard: chart models and their text alternatives, number/date helpers, CSV,
 * tab gating by role, the interest-counter helper (consent + debounce) and the rendered charts.
 */
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError, type AdminSeries } from '@/platform/shared/api-client';
import { CONSENT_STORAGE_KEY } from '@/components/legal/consent';

const h = vi.hoisted(() => ({
  session: { state: { status: 'guest' } as unknown, openLogin: vi.fn() },
  api: { get: vi.fn(), post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() },
}));
vi.mock('../auth/SessionProvider', () => ({ useSession: () => h.session }));
vi.mock('../lib/api-browser', () => ({ api: h.api }));

import {
  barModel,
  dayLabel,
  delta,
  describeSeries,
  formatInr,
  formatPct,
  heatStep,
  lineModel,
  nearestIndex,
  niceMax,
  presetRange,
  rangeError,
  seriesCsv,
  tabsFor,
  toCsv,
} from '../admin/analytics/model';
import { BarList, KpiTile, LineChart } from '../admin/analytics/Charts';
import { AdminApp } from '../admin/AdminApp';
import { resetInterestForTests, shouldSend, trackInterest, INTEREST_DEBOUNCE_MS } from '../lib/interest';

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  resetInterestForTests();
  vi.useRealTimers();
});

const series = (key: string, values: number[], from = 1): AdminSeries => ({
  key,
  label: key === 'a' ? 'Sign-ups' : 'Active',
  points: values.map((value, i) => ({ date: `2026-09-${String(from + i).padStart(2, '0')}`, value })),
});

describe('chart models', () => {
  it('niceMax rounds up to 1/2/2.5/5 × 10^n; all-zero charts get 1', () => {
    expect([0, 1, 3, 7, 12, 24, 99, 260].map(niceMax)).toEqual([1, 1, 5, 10, 20, 25, 100, 500]);
  });

  it('lineModel maps days to x and values to y inside the padding; ticks never overlap', () => {
    const m = lineModel([series('a', [0, 5, 10]), series('b', [2, 2, 2])], 300, 200);
    expect(m.max).toBe(10);
    expect(m.lines).toHaveLength(2);
    const [p0, p1, p2] = m.lines[0]!.points;
    expect(p0).toMatchObject({ x: m.pad.left, y: 200 - m.pad.bottom, value: 0, date: '2026-09-01' });
    expect(p2!.x).toBe(300 - m.pad.right);
    expect(p2!.y).toBe(m.pad.top);
    expect(p1!.y).toBeCloseTo((m.pad.top + 200 - m.pad.bottom) / 2);
    expect(m.lines[0]!.path.startsWith('M')).toBe(true);
    expect(m.yTicks.map((t) => t.value)).toEqual([0, 5, 10]);
    const wide = lineModel([series('a', Array.from({ length: 30 }, (_, i) => i))], 320, 200);
    const xs = wide.xTicks.map((t) => t.x);
    for (let i = 1; i < xs.length; i++) expect(xs[i]! - xs[i - 1]!).toBeGreaterThanOrEqual(30);
    expect(nearestIndex(m, m.pad.left)).toBe(0);
    expect(nearestIndex(m, 300)).toBe(2);
    expect(nearestIndex(m, -50)).toBe(0);
  });

  it('describeSeries is the text alternative: range, totals and peaks per series', () => {
    expect(describeSeries([series('a', [1, 4, 2]), series('b', [0, 0, 0])])).toBe('1 Sep to 3 Sep. Sign-ups: 7 in total, highest 4 on 2 Sep; Active: none.');
    expect(describeSeries([])).toBe('No data in this range.');
    expect(dayLabel('2026-10-28')).toBe('28 Oct');
  });

  it('bars, heat steps, deltas and formats', () => {
    expect(barModel([{ value: 5 }, { value: 10 }, { value: 0 }]).map((b) => b.pct)).toEqual([50, 100, 0]);
    expect(barModel([{ value: 0 }]).map((b) => b.pct)).toEqual([0]);
    expect([null, 0, 0.05, 0.2, 0.4, 0.9].map(heatStep)).toEqual([null, 0, 1, 2, 3, 4]);
    expect(delta(12, 10)).toEqual({ text: '+20%', direction: 'up' });
    expect(delta(5, 10)).toEqual({ text: '−50%', direction: 'down' });
    expect(delta(3, 0)).toEqual({ text: 'new', direction: 'up' });
    expect(delta(4, 4)).toEqual({ text: 'no change', direction: 'flat' });
    expect(delta(4, null).direction).toBe('none');
    expect(formatInr(29900)).toBe('₹299');
    expect(formatInr(123456789)).toBe('₹12,34,567.89');
    expect(formatPct(0.6667)).toBe('66.7%');
    expect(formatPct(null)).toBe('–');
  });
});

describe('ranges', () => {
  it('presets end today; custom ranges are checked like the API (≤ 180 days, not in the future)', () => {
    expect(presetRange(7, '2026-10-28')).toEqual({ from: '2026-10-22', to: '2026-10-28' });
    expect(presetRange(90, '2026-10-28').from).toBe('2026-07-31');
    expect(rangeError({ from: '2026-10-01', to: '2026-10-28' }, '2026-10-28')).toBeNull();
    expect(rangeError({ from: '2026-10-01', to: '2026-10-29' }, '2026-10-28')).toMatch(/after today/);
    expect(rangeError({ from: '2026-10-10', to: '2026-10-01' }, '2026-10-28')).toMatch(/after the end/);
    expect(rangeError({ from: '2026-01-01', to: '2026-10-28' }, '2026-10-28')).toMatch(/180/);
    expect(rangeError({ from: '', to: '2026-10-28' }, '2026-10-28')).toMatch(/Choose/);
  });
});

describe('CSV', () => {
  it('quotes commas, quotes and newlines; neutralises spreadsheet formulas', () => {
    expect(toCsv(['a', 'b'], [['x,y', 'say "hi"'], ['=1+1', null], [3, 'line\nbreak']])).toBe('a,b\r\n"x,y","say ""hi"""\r\n\'=1+1,\r\n3,"line\nbreak"\r\n');
    expect(toCsv(['n'], [[-5]])).toBe('n\r\n-5\r\n');
    expect(seriesCsv([series('a', [1, 2]), series('b', [3, 4])])).toEqual({ header: ['date', 'a', 'b'], rows: [['2026-09-01', 1, 3], ['2026-09-02', 2, 4]] });
  });
});

describe('tab gating by role', () => {
  it('superadmins get every analytics tab, Users and Reports; other staff only Reports', () => {
    expect(tabsFor({ sections: ['analytics', 'users', 'reports'] }).map((t) => t.id)).toEqual([
      'overview',
      'growth',
      'engagement',
      'retention',
      'ai',
      'revenue',
      'interest',
      'content',
      'users',
      'reports',
    ]);
    expect(tabsFor({ sections: ['reports'] }).map((t) => t.id)).toEqual(['reports']);
    expect(tabsFor(null)).toEqual([]);
  });

  const overview = {
    range: { from: '2026-09-29', to: '2026-10-28', days: 30, previousFrom: '2026-08-30', previousTo: '2026-09-28', timezone: 'Asia/Kolkata', generatedAt: '2026-10-28T10:00:00.000Z' },
    kpis: [{ key: 'signups', label: 'New sign-ups', value: 12, previous: 10, unit: 'count' }],
    signups: series('a', [1, 2, 3]),
    dau: series('b', [4, 5, 6]),
  };

  it('a superadmin sees the dashboard tabs and the Overview KPIs; a reviewer sees only the reports queue', async () => {
    h.session.state = { status: 'member', user: { id: 'u1', role: 'admin', name: 'A' }, consent: null };
    h.api.get.mockImplementation(async (path: string) => {
      if (path === '/v1/admin/me') return { userId: 'u1', role: 'admin', capabilities: ['superadmin'], sections: ['analytics', 'users', 'reports'] };
      if (path === '/v1/admin/analytics/overview') return overview;
      throw new Error(path);
    });
    const { unmount } = render(<AdminApp />);
    const tablist = await screen.findByRole('tablist', { name: 'Admin sections' });
    expect(within(tablist).getAllByRole('tab').map((t) => t.textContent)).toEqual(['Overview', 'Growth', 'Engagement', 'Retention', 'AI and credits', 'Revenue', 'Interest', 'Content', 'Users', 'Reports']);
    const tile = await screen.findByTestId('kpi-signups');
    expect(tile.textContent).toContain('12');
    expect(tile.textContent).toContain('+20%');
    expect(h.api.get).toHaveBeenCalledWith('/v1/admin/analytics/overview', { query: expect.objectContaining({ to: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/) }) });
    unmount();

    h.api.get.mockReset();
    h.session.state = { status: 'member', user: { id: 'u2', role: 'reviewer', name: 'R' }, consent: null };
    h.api.get.mockImplementation(async (path: string) => {
      if (path === '/v1/admin/me') return { userId: 'u2', role: 'reviewer', capabilities: [], sections: ['reports'] };
      if (path === '/v1/admin/reports') return { reports: [], nextCursor: null };
      throw new Error(path);
    });
    render(<AdminApp />);
    expect(await screen.findByText('No open reports.')).toBeTruthy();
    expect(screen.queryByRole('tablist', { name: 'Admin sections' })).toBeNull();
    expect(h.api.get.mock.calls.some(([p]) => String(p).startsWith('/v1/admin/analytics'))).toBe(false);
  });

  it('mfa_required from a section sends the superadmin back to the verify step', async () => {
    h.session.state = { status: 'member', user: { id: 'u1', role: 'admin', name: 'A' }, consent: null };
    h.api.get.mockImplementation(async (path: string) => {
      if (path === '/v1/admin/me') return { userId: 'u1', role: 'admin', capabilities: ['superadmin'], sections: ['analytics', 'users', 'reports'] };
      if (path === '/v1/admin/analytics/overview') throw new ApiError(403, 'mfa_required', null);
      if (path === '/v1/me/mfa') return { enrolled: true, confirmed: true, sessionVerified: false, recoveryCodesRemaining: 10 };
      throw new Error(path);
    });
    render(<AdminApp />);
    expect(await screen.findByTestId('mfa-verify')).toBeTruthy();
  });
});

describe('charts render with text alternatives', () => {
  it('line chart: summary label, legend for 2+ series, table view, keyboard crosshair', () => {
    render(<LineChart title="Sign-ups and actives" series={[series('a', [1, 4, 2]), series('b', [0, 1, 0])]} csvName="x.csv" />);
    const plot = screen.getByRole('group', { name: /^Sign-ups and actives/ });
    expect(plot.getAttribute('aria-label')).toContain('Sign-ups: 7 in total, highest 4 on 2 Sep');
    expect(screen.getByRole('list', { name: 'Legend' }).textContent).toContain('Sign-ups');
    expect(screen.getByText('Show as table')).toBeTruthy();
    const table = screen.getByRole('table');
    expect(within(table).getAllByRole('row')).toHaveLength(4);
    fireEvent.keyDown(plot, { key: 'ArrowRight' });
    fireEvent.keyDown(plot, { key: 'ArrowRight' });
    expect(screen.getByRole('status').textContent).toContain('2 Sep');
    expect(screen.getByRole('status').textContent).toContain('Sign-ups: 4');
    expect(screen.getByRole('button', { name: 'Download CSV' })).toBeTruthy();
  });

  it('a single series has no legend box; bars show labels and values as text', () => {
    render(<LineChart title="Revenue" series={[series('a', [0, 0])]} csvName="r.csv" />);
    expect(screen.queryByRole('list', { name: 'Legend' })).toBeNull();
    cleanup();
    render(<BarList title="Consent" items={[{ key: 'granted', label: 'Parent approved', value: 3 }, { key: 'none', label: 'No consent yet', value: 9 }]} csvName="c.csv" />);
    expect(screen.getByText('Parent approved')).toBeTruthy();
    expect(screen.getByText('9')).toBeTruthy();
    cleanup();
    render(<KpiTile kpi={{ key: 'k', label: 'Revenue', value: 29900, previous: 0, unit: 'paise' }} periodLabel="30 days" />);
    expect(screen.getByTestId('kpi-k').textContent).toContain('₹299');
    expect(screen.getByTestId('kpi-k').textContent).toContain('new');
  });

  it('CSV download builds a file from the table', () => {
    const create = vi.fn(() => 'blob:x');
    const revoke = vi.fn();
    Object.assign(URL, { createObjectURL: create, revokeObjectURL: revoke });
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    render(<BarList title="Boards" items={[{ key: 'cbse', label: 'CBSE', value: 2 }]} csvName="soyl-boards.csv" />);
    fireEvent.click(screen.getByRole('button', { name: 'Download CSV' }));
    expect(create).toHaveBeenCalledTimes(1);
    expect(click).toHaveBeenCalledTimes(1);
  });
});

describe('interest counters (client)', () => {
  beforeEach(() => {
    h.api.post.mockReset();
    h.api.post.mockResolvedValue({ accepted: 1 });
  });

  it('sends nothing without analytics consent', async () => {
    vi.useFakeTimers();
    trackInterest('plans_view');
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ necessary: true, analytics: false, marketing: false, timestamp: 'x' }));
    trackInterest('plans_view');
    await vi.advanceTimersByTimeAsync(5000);
    expect(h.api.post).not.toHaveBeenCalled();
  });

  it('after consent: batches, debounces repeats for 30 minutes, then sends again', async () => {
    vi.useFakeTimers();
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ necessary: true, analytics: true, marketing: false, timestamp: 'x' }));
    trackInterest('plans_view');
    trackInterest('plans_view');
    trackInterest('plan_select', 'pro');
    await vi.advanceTimersByTimeAsync(2000);
    expect(h.api.post).toHaveBeenCalledTimes(1);
    expect(h.api.post.mock.calls[0]![0]).toBe('/v1/events');
    expect(h.api.post.mock.calls[0]![1]).toMatchObject({ body: { events: [{ name: 'plans_view' }, { name: 'plan_select', dimension: 'pro' }] }, keepalive: true });
    expect(shouldSend('x|', 1000)).toBe(true);
    expect(shouldSend('x|', 1000 + INTEREST_DEBOUNCE_MS - 1)).toBe(false);
    expect(shouldSend('x|', 1000 + INTEREST_DEBOUNCE_MS)).toBe(true);
  });

  it('a failed send never throws', async () => {
    vi.useFakeTimers();
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ necessary: true, analytics: true, marketing: false, timestamp: 'x' }));
    h.api.post.mockRejectedValue(new ApiError(429, 'rate_limited', null));
    trackInterest('store_view');
    await vi.advanceTimersByTimeAsync(2000);
    expect(h.api.post).toHaveBeenCalledTimes(1);
  });
});
