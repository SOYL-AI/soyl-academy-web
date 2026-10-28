'use client';

/**
 * Dashboard charts (D-043): hand-made inline SVG and CSS with the platform tokens, no chart library.
 * Every chart has a text alternative (a summary sentence and, for the score trend, a visually hidden table),
 * never relies on colour alone (each difficulty row and each bar is labelled in text; self-marked bars are
 * hatched as well as lighter), and reads its colours from tokens, so it follows the Light / Dark theme.
 */
import { useEffect, useRef, useState, type RefObject } from 'react';
import type { SolvedByDifficulty } from '@/platform/shared/api-client';
import { ProgressRing } from '@/components/platform/ui/kit/Mastery';
import { dayLabel } from '../me/heatmap-model';
import { difficultyView, fmtPct, trendSummary, type TrendPoint } from './model';
import s from './dashboard.module.css';

/* ── Solved by difficulty: overall ring + Easy / Medium / Hard bars (LeetCode) ─────────────────────── */

export function DifficultyChart({ data }: { data: SolvedByDifficulty }) {
  const v = difficultyView(data);
  return (
    <figure className={s.diff} data-testid="difficulty-chart" data-solved={v.solved}>
      <ProgressRing value={v.percent} size={112} stroke={9} label={v.summary} className={s.diffRing}>
        <span className={s.ringStack}>
          <span className={s.ringBig}>{v.solved.toLocaleString('en-IN')}</span>
          <span className={s.ringSmall}>of {v.total.toLocaleString('en-IN')}</span>
          <span className={s.ringSmall}>solved</span>
        </span>
      </ProgressRing>
      <ul className={s.diffRows}>
        {v.rows.map((r) => (
          <li key={r.band} data-band={r.band}>
            <span className={s.diffHead}>
              <span className={s.diffLabel} data-band={r.band}>
                {r.label}
              </span>
              <span className={s.diffCount}>
                <b>{r.solved.toLocaleString('en-IN')}</b>/{r.total.toLocaleString('en-IN')}
              </span>
            </span>
            <span className={s.diffTrack} aria-hidden="true">
              <span className={s.diffFill} data-band={r.band} style={{ width: `${r.percent}%` }} />
            </span>
          </li>
        ))}
      </ul>
      <figcaption className="p-visually-hidden">{v.summary}</figcaption>
    </figure>
  );
}

/* ── Test score trend: one bar per marked attempt, oldest → newest ─────────────────────────────────── */

/** Width of an element, following resizes (jsdom and first render: the fallback). */
function useWidth<T extends HTMLElement>(fallback: number): [RefObject<T | null>, number] {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(fallback);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver((entries) => {
      const w = Math.floor(entries[0]?.contentRect.width ?? 0);
      if (w > 0) setWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width];
}

const H = 168;
const PAD = { top: 18, right: 4, bottom: 8, left: 34 };

export function ScoreTrendChart({ points }: { points: readonly TrendPoint[] }) {
  const [ref, width] = useWidth<HTMLDivElement>(280);
  const summary = trendSummary(points);
  const plotW = Math.max(40, width - PAD.left - PAD.right);
  const plotH = H - PAD.top - PAD.bottom;
  const n = Math.max(points.length, 1);
  const slot = plotW / n;
  const barW = Math.max(4, Math.min(28, slot - 4));
  const y = (p: number) => PAD.top + plotH - (Math.max(0, Math.min(100, p)) / 100) * plotH;
  const last = points[points.length - 1];
  const hasSelf = points.some((p) => p.marking === 'self');
  return (
    <figure className={s.trend} data-testid="score-trend" data-points={points.length}>
      <div ref={ref} className={s.trendPlot}>
        <svg width={width} height={H} viewBox={`0 0 ${width} ${H}`} role="img" aria-label={`Test scores chart. ${summary}`} focusable="false">
          <defs>
            <pattern id="soyl-self-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="6" height="6" className={s.hatchBg} />
              <line x1="0" y1="0" x2="0" y2="6" className={s.hatchLine} strokeWidth="3" />
            </pattern>
          </defs>
          {[0, 50, 100].map((g) => (
            <g key={g} aria-hidden="true">
              <line x1={PAD.left} x2={width - PAD.right} y1={y(g)} y2={y(g)} className={g === 0 ? s.axis : s.gridLine} />
              <text x={PAD.left - 6} y={y(g)} dy="0.32em" textAnchor="end" className={s.tick}>
                {g}%
              </text>
            </g>
          ))}
          {points.map((p, i) => {
            const x = PAD.left + i * slot + (slot - barW) / 2;
            const top = y(p.percentage);
            const h = Math.max(2, y(0) - top);
            return (
              <rect
                key={p.attemptId}
                x={x}
                y={y(0) - h}
                width={barW}
                height={h}
                rx={Math.min(4, barW / 2)}
                className={p.marking === 'self' ? s.barSelf : s.barAuto}
                fill={p.marking === 'self' ? 'url(#soyl-self-hatch)' : undefined}
                data-marking={p.marking}
              >
                <title>{`${p.title}, ${dayLabel(p.day)}: ${fmtPct(p.percentage)}${p.marking === 'self' ? ' (includes self-marking)' : ''}`}</title>
              </rect>
            );
          })}
          {last && (
            <text x={PAD.left + (points.length - 1) * slot + slot / 2} y={y(last.percentage) - 5} textAnchor="middle" className={s.barLabel} aria-hidden="true">
              {Math.round(last.percentage)}%
            </text>
          )}
        </svg>
      </div>
      <figcaption className={s.trendCaption}>
        <span>{summary}</span>
        <span className={s.trendLegend} aria-hidden="true">
          <span>
            <i className={s.swAuto} /> Auto-marked
          </span>
          {hasSelf && (
            <span>
              <i className={s.swSelf} /> Includes self-marking
            </span>
          )}
        </span>
      </figcaption>
      {/* A table ignores width: 1px, so a wrapper is the visually hidden box that clips it (else it widens a phone layout viewport). */}
      <div className="p-visually-hidden">
        <table>
          <caption>Your marked tests, oldest first</caption>
          <thead>
            <tr>
              <th scope="col">Test</th>
              <th scope="col">Day</th>
              <th scope="col">Score</th>
              <th scope="col">Marking</th>
            </tr>
          </thead>
          <tbody>
            {points.map((p) => (
              <tr key={p.attemptId}>
                <th scope="row">{p.title}</th>
                <td>{dayLabel(p.day)}</td>
                <td>{fmtPct(p.percentage)}</td>
                <td>{p.marking === 'self' ? 'Includes self-marking' : 'Auto-marked'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
