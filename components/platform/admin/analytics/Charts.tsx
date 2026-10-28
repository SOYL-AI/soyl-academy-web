'use client';

/**
 * Hand-made inline SVG charts for the super-admin dashboard (D-045; no chart dependency). Every chart:
 * a title, a text summary (aria-label + visible caption), a "Show as table" view with CSV export, a
 * legend for 2+ series plus direct end labels and distinct dash patterns (colour is never the only
 * cue), a crosshair tooltip on pointer and arrow keys, and colours from the dashboard's validated
 * light/dark palette (analytics.module.css).
 */
import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import type { AdminKpi, AdminLabelledCount, AdminSeries } from '@/platform/shared/api-client';
import { Button } from '@/components/platform/ui/kit/Button';
import { barModel, dayLabel, delta, describeSeries, formatCount, formatValue, lineModel, nearestIndex, seriesCsv, toCsv, type CsvCell } from './model';
import s from './analytics.module.css';

const DASHES = ['', '6 4', '2 3', '10 3 2 3'];

function useWidth<T extends HTMLElement>(fallback = 320) {
  const ref = useRef<T | null>(null);
  const [width, setWidth] = useState(fallback);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setWidth(Math.max(240, Math.floor(el.getBoundingClientRect().width)));
    update();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

export function downloadCsv(name: string, csv: string): void {
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function CsvButton({ name, header, rows }: { name: string; header: string[]; rows: CsvCell[][] }) {
  return (
    <Button variant="ghost" size="sm" onClick={() => downloadCsv(name, toCsv(header, rows))}>
      Download CSV
    </Button>
  );
}

export function DataTable({ caption, header, rows, csvName, numeric = [] }: { caption: string; header: string[]; rows: CsvCell[][]; csvName: string; numeric?: number[] }) {
  return (
    <div className={s.tableBlock}>
      {/* Focusable so keyboard users can scroll a wide table at 360 px (axe scrollable-region-focusable). */}
      <div className={s.tableScroll} tabIndex={0} role="region" aria-label={caption}>
        <table className={s.table}>
          <caption className={s.caption}>{caption}</caption>
          <thead>
            <tr>
              {header.map((h, i) => (
                <th key={h} scope="col" className={numeric.includes(i) ? s.num : undefined}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={header.length} className={s.muted}>
                  No data in this range.
                </td>
              </tr>
            )}
            {rows.map((r, ri) => (
              <tr key={ri}>
                {r.map((c, ci) =>
                  ci === 0 ? (
                    <th key={ci} scope="row">
                      {c ?? '–'}
                    </th>
                  ) : (
                    <td key={ci} className={numeric.includes(ci) ? s.num : undefined}>
                      {c ?? '–'}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CsvButton name={csvName} header={header} rows={rows} />
    </div>
  );
}

export function Panel({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  const id = useId();
  return (
    <section className={s.panel} aria-labelledby={id}>
      <div className={s.panelHead}>
        <h3 id={id} className={s.panelTitle}>
          {title}
        </h3>
        {action}
      </div>
      {children}
    </section>
  );
}

export function KpiTile({ kpi, periodLabel }: { kpi: AdminKpi; periodLabel: string }) {
  const d = delta(kpi.value, kpi.previous);
  return (
    <div className={s.kpi} data-testid={`kpi-${kpi.key}`}>
      <p className={s.kpiLabel}>{kpi.label}</p>
      <p className={s.kpiValue}>{formatValue(kpi.value, kpi.unit)}</p>
      {d.direction !== 'none' && (
        <p className={s.kpiDelta} data-direction={d.direction}>
          <span aria-hidden="true">{d.direction === 'up' ? '▲' : d.direction === 'down' ? '▼' : '•'}</span> {d.text}{' '}
          <span className={s.muted}>
            vs previous {periodLabel} ({formatValue(kpi.previous ?? 0, kpi.unit)})
          </span>
        </p>
      )}
    </div>
  );
}

export function LineChart({ title, series, height = 200, csvName, format = formatCount }: { title: string; series: AdminSeries[]; height?: number; csvName: string; format?: (n: number) => string }) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const model = lineModel(series, width, height);
  const summary = describeSeries(series);
  const { header, rows } = seriesCsv(series);
  const tipLeft = hover === null ? 0 : Math.min(Math.max(0, (model.lines[0]?.points[hover]?.x ?? 0) - 80), width - 168);
  const onKey = (e: React.KeyboardEvent) => {
    const n = model.days.length;
    if (!n) return;
    if (e.key === 'ArrowRight') setHover((h) => Math.min(n - 1, (h ?? -1) + 1));
    else if (e.key === 'ArrowLeft') setHover((h) => Math.max(0, (h ?? n) - 1));
    else if (e.key === 'Escape') setHover(null);
    else return;
    e.preventDefault();
  };
  return (
    <figure className={s.figure}>
      <figcaption className={s.figTitle}>{title}</figcaption>
      {series.length > 1 && (
        <ul className={s.legend} aria-label="Legend">
          {series.map((x, i) => (
            <li key={x.key}>
              <svg width="24" height="10" aria-hidden="true">
                <line x1="1" y1="5" x2="23" y2="5" className={s[`c${(i % 4) + 1}`]} strokeWidth="2" strokeDasharray={DASHES[i % 4]} />
              </svg>
              {x.label}
            </li>
          ))}
        </ul>
      )}
      <div
        ref={ref}
        className={s.plot}
        tabIndex={0}
        role="group"
        aria-label={`${title}. ${summary} Use the left and right arrow keys to read each day.`}
        onKeyDown={onKey}
        onBlur={() => setHover(null)}
      >
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          aria-hidden="true"
          onPointerMove={(e) => {
            const box = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
            setHover(nearestIndex(model, e.clientX - box.left));
          }}
          onPointerLeave={() => setHover(null)}
        >
          {model.yTicks.map((t) => (
            <g key={t.value}>
              <line x1={model.pad.left} x2={width - model.pad.right} y1={t.y} y2={t.y} className={s.grid} />
              <text x={model.pad.left - 6} y={t.y + 4} textAnchor="end" className={s.axis}>
                {format(t.value)}
              </text>
            </g>
          ))}
          {model.xTicks.map((t) => (
            <text key={t.day} x={t.x} y={height - 8} textAnchor="middle" className={s.axis}>
              {dayLabel(t.day)}
            </text>
          ))}
          {model.lines.map((l, i) => (
            <path key={l.key} d={l.path} fill="none" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" strokeDasharray={DASHES[i % 4]} className={s[`c${(i % 4) + 1}`]} />
          ))}
          {series.length > 1 &&
            series.length <= 4 &&
            model.lines.map((l, i) => {
              const last = l.points[l.points.length - 1];
              return last ? <circle key={l.key} cx={last.x} cy={last.y} r="4" className={s[`f${(i % 4) + 1}`]} /> : null;
            })}
          {hover !== null && model.lines[0]?.points[hover] && (
            <g>
              <line x1={model.lines[0].points[hover]!.x} x2={model.lines[0].points[hover]!.x} y1={model.pad.top} y2={height - model.pad.bottom} className={s.crosshair} />
              {model.lines.map((l, i) => (
                <circle key={l.key} cx={l.points[hover]!.x} cy={l.points[hover]!.y} r="5" className={`${s[`f${(i % 4) + 1}`]} ${s.ring}`} />
              ))}
            </g>
          )}
        </svg>
        {hover !== null && model.days[hover] && (
          <div className={s.tooltip} style={{ left: tipLeft }} role="status">
            <strong>{dayLabel(model.days[hover]!)}</strong>
            {series.map((x, i) => (
              <span key={x.key} className={s.tipRow}>
                <i className={s[`f${(i % 4) + 1}`]} aria-hidden="true" /> {x.label}: {format(x.points[hover]?.value ?? 0)}
              </span>
            ))}
          </div>
        )}
      </div>
      <p className={s.summary}>{summary}</p>
      <details className={s.details}>
        <summary>Show as table</summary>
        <DataTable caption={title} header={header} rows={rows.map((r) => [r[0], ...r.slice(1).map((v) => format(Number(v)))])} csvName={csvName} numeric={series.map((_, i) => i + 1)} />
      </details>
    </figure>
  );
}

export function BarList({ title, items, csvName, format = formatCount, empty = 'No data in this range.' }: { title: string; items: AdminLabelledCount[]; csvName: string; format?: (n: number) => string; empty?: string }) {
  const bars = barModel(items);
  return (
    <figure className={s.figure}>
      <figcaption className={s.figTitle}>{title}</figcaption>
      {bars.length === 0 || bars.every((b) => b.value === 0) ? (
        <p className={s.muted}>{empty}</p>
      ) : (
        <ul className={s.bars}>
          {bars.map((b) => (
            <li key={b.key} className={s.barRow}>
              <span className={s.barLabel}>{b.label}</span>
              <span className={s.barTrack} aria-hidden="true">
                <span className={s.barFill} style={{ width: `${b.pct}%` }} />
              </span>
              <span className={s.barValue}>{format(b.value)}</span>
            </li>
          ))}
        </ul>
      )}
      <CsvButton name={csvName} header={['key', 'label', 'value']} rows={items.map((i) => [i.key, i.label, i.value])} />
    </figure>
  );
}
