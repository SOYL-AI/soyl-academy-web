'use client';

/**
 * Credit usage per IST day (D-044; GET /v1/me/credits/history?days=14): a small bar chart (received = daily grant
 * plus bonus, stacked; used beside it) with a written summary as its accessible name, a `<title>` on every bar
 * and the same numbers as a table one tap away. Hand-made SVG with theme tokens, no chart dependency.
 */
import { useEffect, useState } from 'react';
import type { CreditHistory as History } from '@/platform/shared/api-client';
import { Skeleton } from '@/components/platform/ui/kit/Display';
import { api } from '../lib/api-browser';
import { historyRows, historySummary, type HistoryRow } from './credit-guide-model';
import s from './credits.module.css';

export function CreditHistoryChart({ rows }: { rows: readonly HistoryRow[] }) {
  const max = Math.max(1, ...rows.map((r) => Math.max(r.received, r.spent)));
  const H = 96;
  const step = 22;
  const bar = 8;
  const width = rows.length * step + 8;
  const y = (v: number) => (v / max) * H;
  return (
    <figure className={s.chart} data-testid="credit-history">
      <svg viewBox={`0 0 ${width} ${H + 18}`} className={s.chartSvg} role="img" aria-label={historySummary(rows)}>
        <line x1={0} x2={width} y1={H + 0.5} y2={H + 0.5} className={s.axis} />
        {rows.map((r, i) => {
          const x = 4 + i * step;
          return (
            <g key={r.day}>
              <rect x={x} y={H - y(r.granted)} width={bar} height={y(r.granted)} className={s.barGrant}>
                <title>{`${r.label}: ${r.granted} daily credits${r.bonus ? `, ${r.bonus} bonus` : ''}`}</title>
              </rect>
              {r.bonus > 0 && (
                <rect x={x} y={H - y(r.received)} width={bar} height={y(r.bonus)} className={s.barBonus}>
                  <title>{`${r.label}: ${r.bonus} bonus credits`}</title>
                </rect>
              )}
              <rect x={x + bar + 1} y={H - y(r.spent)} width={bar} height={Math.max(r.spent ? 1 : 0, y(r.spent))} className={s.barSpent}>
                <title>{`${r.label}: ${r.spent} used${r.refunded ? `, ${r.refunded} refunded` : ''}`}</title>
              </rect>
              {(i % 2 === rows.length % 2 || i === rows.length - 1) && (
                <text x={x + bar} y={H + 13} textAnchor="middle" className={s.tick}>
                  {r.short}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <figcaption className={s.legend}>
        <span>
          <i className={s.keyGrant} /> Daily credits
        </span>
        <span>
          <i className={s.keyBonus} /> Bonus
        </span>
        <span>
          <i className={s.keySpent} /> Used
        </span>
      </figcaption>
      <p className={s.muted}>{historySummary(rows)}</p>
      <details className={s.tableToggle}>
        <summary>Show as a table</summary>
        <div className={s.tableWrap}>
          <table className={s.table} data-testid="credit-history-table">
            <caption className="p-visually-hidden">AI credits per day (India time)</caption>
            <thead>
              <tr>
                <th scope="col">Day</th>
                <th scope="col">Daily</th>
                <th scope="col">Bonus</th>
                <th scope="col">Used</th>
                <th scope="col">Refunded</th>
              </tr>
            </thead>
            <tbody>
              {[...rows].reverse().map((r) => (
                <tr key={r.day}>
                  <th scope="row">{r.label}</th>
                  <td>{r.granted}</td>
                  <td>{r.bonus}</td>
                  <td>{r.spent}</td>
                  <td>{r.refunded}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}

export function CreditHistorySection() {
  const [history, setHistory] = useState<History | null | 'error'>(null);
  useEffect(() => {
    let alive = true;
    api
      .get('/v1/me/credits/history', { query: { days: 14 } })
      .then((h) => alive && setHistory(h))
      .catch(() => alive && setHistory('error'));
    return () => {
      alive = false;
    };
  }, []);
  if (history === null) return <Skeleton variant="block" height={140} />;
  if (history === 'error') return <p className={s.muted}>Your credit history could not load. Try again later.</p>;
  return <CreditHistoryChart rows={historyRows(history)} />;
}
