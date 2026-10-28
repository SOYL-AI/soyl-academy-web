/**
 * Activity heatmap model (LeetCode style): GET /v1/me/activity → week columns of IST days, Monday first.
 * Pure (tested). Dates are 'YYYY-MM-DD' IST calendar days from the API; we never use the browser's zone.
 */
export interface HeatDay {
  date: string;
  total: number;
  /** 0 = nothing, 1–4 = more activity. */
  level: 0 | 1 | 2 | 3 | 4;
  /** False for padding cells before the window's first day or after today. */
  inRange: boolean;
}

export interface HeatWeek {
  /** Month label to show above this column ('Jan' …) when a month starts in it. */
  month: string | null;
  days: HeatDay[];
}

/** Activity count → intensity. Fixed thresholds so a quiet week never looks busy. */
export const HEAT_THRESHOLDS = [1, 4, 10, 20] as const;

export function heatLevel(total: number): HeatDay['level'] {
  if (!(total >= HEAT_THRESHOLDS[0])) return 0;
  if (total < HEAT_THRESHOLDS[1]) return 1;
  if (total < HEAT_THRESHOLDS[2]) return 2;
  if (total < HEAT_THRESHOLDS[3]) return 3;
  return 4;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parse(d: string): number {
  const [y, m, day] = d.split('-').map(Number);
  return Date.UTC(y!, m! - 1, day!);
}
function fmt(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}
const DAY = 86_400_000;

/** Monday = 0 … Sunday = 6. */
export function weekday(date: string): number {
  return (new Date(parse(date)).getUTCDay() + 6) % 7;
}

export function heatmapWeeks(calendar: readonly { date: string; total: number }[], from: string, to: string): HeatWeek[] {
  const totals = new Map(calendar.map((d) => [d.date, d.total]));
  const start = parse(from) - weekday(from) * DAY;
  const end = parse(to) + (6 - weekday(to)) * DAY;
  const fromMs = parse(from);
  const toMs = parse(to);
  const weeks: HeatWeek[] = [];
  let lastMonth = -1;
  for (let w = start; w <= end; w += 7 * DAY) {
    const days: HeatDay[] = [];
    let month: string | null = null;
    for (let i = 0; i < 7; i++) {
      const ms = w + i * DAY;
      const date = fmt(ms);
      const inRange = ms >= fromMs && ms <= toMs;
      const total = inRange ? (totals.get(date) ?? 0) : 0;
      days.push({ date, total, level: heatLevel(total), inRange });
      const m = new Date(ms).getUTCMonth();
      if (inRange && m !== lastMonth && new Date(ms).getUTCDate() <= 7) {
        month = MONTHS[m]!;
        lastMonth = m;
      }
    }
    weeks.push({ month, days });
  }
  return weeks;
}

/** "12 Oct 2026" from an IST day. */
export function dayLabel(date: string): string {
  const ms = parse(date);
  const d = new Date(ms);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** First day of a window of `days` IST days ending on `to` (never later than `from`), at least `minDays` long. */
export function windowStart(from: string, to: string, days: number, minDays = 112): string {
  const span = Math.max(days, minDays, 1);
  const start = fmt(parse(to) - (span - 1) * DAY);
  return start < from ? start : from;
}
