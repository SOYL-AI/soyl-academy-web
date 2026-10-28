/**
 * Pure models for the super-admin dashboard (D-045): chart geometry, text alternatives, number
 * formatting, CSV, date ranges and tab gating. No React, no DOM: unit-tested in
 * components/platform/__tests__/admin-analytics.test.ts.
 */
import type { AdminMe, AdminSeries } from '@/platform/shared/api-client';

/* ---- tabs ---------------------------------------------------------------------------------------- */

export const ANALYTICS_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'growth', label: 'Growth' },
  { id: 'engagement', label: 'Engagement' },
  { id: 'retention', label: 'Retention' },
  { id: 'ai', label: 'AI and credits' },
  { id: 'revenue', label: 'Revenue' },
  { id: 'interest', label: 'Interest' },
  { id: 'content', label: 'Content' },
] as const;
export type AnalyticsTabId = (typeof ANALYTICS_TABS)[number]['id'];
export type AdminTabId = AnalyticsTabId | 'users' | 'reports';

/** The tabs an account may open: superadmins see everything, other staff only Reports. */
export function tabsFor(me: Pick<AdminMe, 'sections'> | null): { id: AdminTabId; label: string }[] {
  if (!me) return [];
  const out: { id: AdminTabId; label: string }[] = [];
  if (me.sections.includes('analytics')) out.push(...ANALYTICS_TABS);
  if (me.sections.includes('users')) out.push({ id: 'users', label: 'Users' });
  if (me.sections.includes('reports')) out.push({ id: 'reports', label: 'Reports' });
  return out;
}

/* ---- ranges -------------------------------------------------------------------------------------- */

export const RANGE_PRESETS = [7, 30, 90] as const;
export const MAX_RANGE_DAYS = 180;
const DAY_MS = 86_400_000;

/** Today's IST calendar day (YYYY-MM-DD). */
export function istToday(now: number = Date.now()): string {
  return new Date(now + 330 * 60_000).toISOString().slice(0, 10);
}
export const shiftDay = (day: string, n: number) => new Date(Date.parse(`${day}T00:00:00Z`) + n * DAY_MS).toISOString().slice(0, 10);
export const daySpan = (from: string, to: string) => Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / DAY_MS) + 1;

export interface DateRange {
  from: string;
  to: string;
}

export function presetRange(days: number, today: string): DateRange {
  return { from: shiftDay(today, -(days - 1)), to: today };
}

/** Null when valid, otherwise a message for the custom range form (the API checks again). */
export function rangeError(r: DateRange, today: string): string | null {
  const re = /^\d{4}-\d{2}-\d{2}$/;
  if (!re.test(r.from) || !re.test(r.to)) return 'Choose a start and an end date.';
  if (r.to > today) return 'The range cannot end after today.';
  if (r.from > r.to) return 'The start date is after the end date.';
  if (daySpan(r.from, r.to) > MAX_RANGE_DAYS) return `Choose at most ${MAX_RANGE_DAYS} days.`;
  return null;
}

/* ---- numbers ------------------------------------------------------------------------------------- */

const IN = new Intl.NumberFormat('en-IN');
export const formatCount = (n: number) => IN.format(Math.round(n * 10) / 10);
/** Paise → "₹1,234.50" (GST-inclusive amounts as stored). */
export function formatInr(paise: number): string {
  const rupees = paise / 100;
  return `₹${new Intl.NumberFormat('en-IN', { minimumFractionDigits: Number.isInteger(rupees) ? 0 : 2, maximumFractionDigits: 2 }).format(rupees)}`;
}
export const formatPct = (ratio: number | null) => (ratio === null ? '–' : `${Math.round(ratio * 1000) / 10}%`);
export function formatValue(value: number, unit: 'count' | 'paise' | 'ratio'): string {
  return unit === 'paise' ? formatInr(value) : unit === 'ratio' ? formatPct(value) : formatCount(value);
}

/** Change vs the previous period: { text, direction } ("+12%", "−3", "new", "no change"). */
export function delta(value: number, previous: number | null): { text: string; direction: 'up' | 'down' | 'flat' | 'none' } {
  if (previous === null) return { text: '', direction: 'none' };
  if (value === previous) return { text: 'no change', direction: 'flat' };
  if (previous === 0) return { text: 'new', direction: 'up' };
  const pct = Math.round(((value - previous) / Math.abs(previous)) * 100);
  return { text: `${pct > 0 ? '+' : '−'}${Math.abs(pct)}%`, direction: value > previous ? 'up' : 'down' };
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** Short day label: "1 Sep" (fixed names, not the ICU data of the browser). */
export function dayLabel(day: string): string {
  return `${Number(day.slice(8, 10))} ${MONTHS[Number(day.slice(5, 7)) - 1] ?? ''}`;
}

/* ---- chart geometry ------------------------------------------------------------------------------ */

/** A "nice" axis maximum (1, 2, 2.5, 5 × 10^n) at or above `max`; 1 for an all-zero chart. */
export function niceMax(max: number): number {
  if (!(max > 0)) return 1;
  const exp = Math.floor(Math.log10(max));
  const base = 10 ** exp;
  for (const m of [1, 2, 2.5, 5, 10]) if (m * base >= max) return m * base;
  return 10 * base;
}

export interface LineModel {
  width: number;
  height: number;
  pad: { top: number; right: number; bottom: number; left: number };
  max: number;
  yTicks: { value: number; y: number }[];
  /** `anchor`: the first and last labels align to the plot edges so they are never clipped. */
  xTicks: { day: string; x: number; anchor: 'start' | 'middle' | 'end' }[];
  lines: { key: string; label: string; path: string; points: { x: number; y: number; value: number; date: string }[] }[];
  days: string[];
}

/** Line chart geometry for daily series that share the same days. */
export function lineModel(series: AdminSeries[], width: number, height: number): LineModel {
  const pad = { top: 12, right: 12, bottom: 28, left: 44 };
  const days = series[0]?.points.map((p) => p.date) ?? [];
  // At least 2, so a count axis never shows a half (0, 1, 2).
  const max = Math.max(2, niceMax(Math.max(0, ...series.flatMap((s) => s.points.map((p) => p.value)))));
  const iw = Math.max(1, width - pad.left - pad.right);
  const ih = Math.max(1, height - pad.top - pad.bottom);
  const x = (i: number) => pad.left + (days.length <= 1 ? iw / 2 : (i / (days.length - 1)) * iw);
  const y = (v: number) => pad.top + ih - (v / max) * ih;
  const yTicks = (Number.isInteger(max / 2) ? [0, 0.5, 1] : [0, 1]).map((f) => ({ value: max * f, y: y(max * f) }));
  const step = Math.max(1, Math.ceil(days.length / Math.max(2, Math.floor(iw / 72))));
  const tickIdx = days.map((_, i) => i).filter((i) => i % step === 0);
  const lastIdx = days.length - 1;
  if (lastIdx > 0 && !tickIdx.includes(lastIdx) && lastIdx - tickIdx[tickIdx.length - 1]! >= step / 2) tickIdx.push(lastIdx);
  const xTicks = tickIdx.map((i) => ({ day: days[i]!, x: x(i), anchor: (i === 0 && days.length > 1 ? 'start' : i === lastIdx && lastIdx > 0 ? 'end' : 'middle') as 'start' | 'middle' | 'end' }));
  const lines = series.map((s) => {
    const points = s.points.map((p, i) => ({ x: x(i), y: y(p.value), value: p.value, date: p.date }));
    const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    return { key: s.key, label: s.label, path, points };
  });
  return { width, height, pad, max, yTicks, xTicks, lines, days };
}

/** Index of the day nearest to an x position (crosshair). */
export function nearestIndex(model: Pick<LineModel, 'pad' | 'width' | 'days'>, px: number): number {
  const n = model.days.length;
  if (n <= 1) return 0;
  const iw = model.width - model.pad.left - model.pad.right;
  const i = Math.round(((px - model.pad.left) / iw) * (n - 1));
  return Math.min(n - 1, Math.max(0, i));
}

/** Text alternative for a line chart: totals, peak and the latest value per series. */
export function describeSeries(series: AdminSeries[]): string {
  if (!series.length || !series[0]!.points.length) return 'No data in this range.';
  const first = series[0]!.points[0]!.date;
  const last = series[0]!.points[series[0]!.points.length - 1]!.date;
  const parts = series.map((s) => {
    const total = s.points.reduce((a, p) => a + p.value, 0);
    const peak = s.points.reduce((best, p) => (p.value > best.value ? p : best), s.points[0]!);
    return total === 0 ? `${s.label}: none` : `${s.label}: ${formatCount(total)} in total, highest ${formatCount(peak.value)} on ${dayLabel(peak.date)}`;
  });
  return `${dayLabel(first)} to ${dayLabel(last)}. ${parts.join('; ')}.`;
}

/** Bar widths (percent of the largest value) for a labelled list. */
export function barModel<T extends { value: number }>(items: T[]): (T & { pct: number })[] {
  const max = Math.max(0, ...items.map((i) => i.value));
  return items.map((i) => ({ ...i, pct: max > 0 ? Math.round((i.value / max) * 1000) / 10 : 0 }));
}

/** Retention heat step 0..4 for a rate (null = not reached yet). */
export function heatStep(rate: number | null): number | null {
  if (rate === null) return null;
  if (rate <= 0) return 0;
  if (rate < 0.1) return 1;
  if (rate < 0.25) return 2;
  if (rate < 0.5) return 3;
  return 4;
}

/* ---- CSV ----------------------------------------------------------------------------------------- */

export type CsvCell = string | number | null | undefined;

/** RFC 4180 CSV; cells that start with = + - @ are prefixed with ' so spreadsheets never run them. */
export function toCsv(header: string[], rows: CsvCell[][]): string {
  const cell = (v: CsvCell) => {
    if (v === null || v === undefined) return '';
    let s = String(v);
    if (typeof v === 'string' && /^[=+\-@\t\r]/.test(s)) s = `'${s}`;
    return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [header, ...rows].map((r) => r.map(cell).join(',')).join('\r\n') + '\r\n';
}

/** Daily series → CSV rows (date + one column per series). */
export function seriesCsv(series: AdminSeries[]): { header: string[]; rows: CsvCell[][] } {
  const days = series[0]?.points.map((p) => p.date) ?? [];
  return { header: ['date', ...series.map((s) => s.key)], rows: days.map((d, i) => [d, ...series.map((s) => s.points[i]?.value ?? 0)]) };
}

export function csvFileName(name: string, range: DateRange): string {
  return `soyl-${name}-${range.from}-to-${range.to}.csv`;
}
