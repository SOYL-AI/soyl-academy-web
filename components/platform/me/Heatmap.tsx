/**
 * Activity heatmap (LeetCode style; GET /v1/me/activity). Columns are weeks (Monday first), cells are IST days.
 * Screen readers get one summary sentence; sighted users also get a title per cell. The grid scrolls inside
 * its card on narrow screens (never the page) and starts scrolled to today.
 */
'use client';

import { useEffect, useRef } from 'react';
import type { MyActivity } from '@/platform/shared/api-client';
import { cx } from '@/components/platform/ui/cx';
import { dayLabel, heatmapWeeks, windowStart } from './heatmap-model';
import s from './insights.module.css';

const ROW_LABELS = ['Mon', '', 'Wed', '', 'Fri', '', ''];

export function Heatmap({ activity, className }: { activity: MyActivity; className?: string }) {
  // At least 16 weeks, so a new student sees a calendar to fill rather than a single cell.
  const weeks = heatmapWeeks(activity.calendar, windowStart(activity.from, activity.to, activity.days), activity.to);
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [activity.to]);
  const busiest = [...activity.calendar].sort((a, b) => b.total - a.total)[0];
  const summary =
    `${activity.totals.activeDays} active day${activity.totals.activeDays === 1 ? '' : 's'} in the last ${activity.days} days` +
    (busiest && busiest.total > 0 ? `; busiest day ${dayLabel(busiest.date)} with ${busiest.total} activities` : '');
  return (
    <figure className={cx(s.heat, className)} data-testid="heatmap">
      <div className={s.heatScroll} ref={scroller} tabIndex={0} role="img" aria-label={`Activity heatmap: ${summary}`}>
        <div className={s.heatGrid} style={{ gridTemplateColumns: `28px repeat(${weeks.length}, 12px)` }} aria-hidden="true">
          <span />
          {weeks.map((w, i) => (
            <span key={`m${i}`} className={s.heatMonth}>
              {w.month ?? ''}
            </span>
          ))}
          {ROW_LABELS.map((label, row) => (
            <HeatRow key={row} label={label} cells={weeks.map((w) => w.days[row]!)} />
          ))}
        </div>
      </div>
      <figcaption className={s.heatCaption}>
        <span>{summary}.</span>
        <span className={s.heatLegend} aria-hidden="true">
          Less
          {[0, 1, 2, 3, 4].map((l) => (
            <span key={l} className={s.heatCell} data-level={l} />
          ))}
          More
        </span>
      </figcaption>
    </figure>
  );
}

function HeatRow({ label, cells }: { label: string; cells: { date: string; total: number; level: number; inRange: boolean }[] }) {
  return (
    <>
      <span className={s.heatRowLabel}>{label}</span>
      {cells.map((c) =>
        c.inRange ? (
          <span key={c.date} className={s.heatCell} data-level={c.level} title={`${dayLabel(c.date)}: ${c.total === 0 ? 'no activity' : `${c.total} ${c.total === 1 ? 'activity' : 'activities'}`}`} />
        ) : (
          <span key={c.date} />
        ),
      )}
    </>
  );
}
