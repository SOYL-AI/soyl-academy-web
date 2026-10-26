/**
 * `plot` visual: axes, grid, functions y = f(x) (safe parser, sampled), points and data series,
 * drawn as SVG with currentColor / diagram tokens. Server-renderable, no client JS.
 */
import type { ReactNode } from 'react';
import type { Visual } from '@/platform/shared/content/visual';
import { tryParseExpr } from './expr';
import { fmt, hashId, LABEL_PROPS, niceTicks, round } from './svg-utils';
import s from './visual.module.css';

export type PlotSpec = Extract<Visual, { kind: 'plot' }>['spec'];

const W = 320;
const H = 240;
const M = { l: 34, r: 14, t: 14, b: 28 };
const PW = W - M.l - M.r;
const PH = H - M.t - M.b;
export const PLOT_SAMPLES = 240;

const STYLES = [
  { stroke: 'var(--diagram-accent)', dash: undefined },
  { stroke: 'currentColor', dash: '6 4' },
  { stroke: 'var(--diagram-muted)', dash: '2 4' },
  { stroke: 'var(--diagram-accent)', dash: '10 4 2 4' },
] as const;

export interface LegendItem {
  label: string;
  style: number;
  kind: 'line' | 'point' | 'bar';
}

/** Samples f over [a, b] into path data, breaking at gaps, non-finite values and jumps (asymptotes). */
export function samplePath(f: (x: number) => number, a: number, b: number, sx: (x: number) => number, sy: (y: number) => number, yMin: number, yMax: number, n = PLOT_SAMPLES): string {
  const span = yMax - yMin;
  let d = '';
  let pen = false;
  let prevY: number | null = null;
  for (let i = 0; i <= n; i++) {
    const x = a + ((b - a) * i) / n;
    let y: number;
    try {
      y = f(x);
    } catch {
      y = NaN;
    }
    const far = !Number.isFinite(y) || y > yMax + 4 * span || y < yMin - 4 * span;
    // An asymptote shows up as a jump larger than the visible range between two samples that
    // leave the window on opposite sides (e.g. tan x: +big → −big). Lift the pen there.
    const jump =
      prevY !== null &&
      Number.isFinite(y) &&
      Math.abs(y - prevY) > span &&
      ((prevY > yMax && y < yMin) || (prevY < yMin && y > yMax) || Math.abs(y - prevY) > 3 * span);
    if (far || jump) {
      pen = false;
      prevY = Number.isFinite(y) ? y : null;
      if (far) continue;
    }
    const clampedY = Math.max(yMin - 2 * span, Math.min(yMax + 2 * span, y));
    d += `${pen ? 'L' : 'M'}${round(sx(x))} ${round(sy(clampedY))}`;
    pen = true;
    prevY = y;
  }
  return d;
}

export function PlotVisual({ spec, alt }: { spec: PlotSpec; alt: string }) {
  const { x, y } = spec;
  const valid = Number.isFinite(x.min) && Number.isFinite(x.max) && x.max > x.min && Number.isFinite(y.min) && Number.isFinite(y.max) && y.max > y.min;
  if (!valid) {
    return <p className={s.error}>Graph unavailable: axis ranges are invalid. {alt}</p>;
  }
  const sx = (v: number) => M.l + ((v - x.min) / (x.max - x.min)) * PW;
  const sy = (v: number) => M.t + ((y.max - v) / (y.max - y.min)) * PH;
  const clip = hashId('plot-clip-', spec);
  const xTicks = niceTicks(x.min, x.max, 6);
  const yTicks = niceTicks(y.min, y.max, 5);
  const axisX = y.min <= 0 && y.max >= 0 ? sy(0) : sy(y.min);
  const axisY = x.min <= 0 && x.max >= 0 ? sx(0) : sx(x.min);

  const legend: LegendItem[] = [];
  const errors: string[] = [];
  const marks: ReactNode[] = [];
  let styleIndex = 0;

  (spec.functions ?? []).forEach((fn, i) => {
    const compiled = tryParseExpr(fn.expr);
    const st = styleIndex++ % STYLES.length;
    if (!compiled) {
      errors.push(fn.expr);
      return;
    }
    const a = Math.max(x.min, fn.domain?.[0] ?? x.min);
    const b = Math.min(x.max, fn.domain?.[1] ?? x.max);
    if (!(b > a)) return;
    const d = samplePath(compiled, a, b, sx, sy, y.min, y.max);
    marks.push(<path key={`f${i}`} d={d} fill="none" stroke={STYLES[st].stroke} strokeDasharray={STYLES[st].dash} strokeWidth={2.25} strokeLinejoin="round" strokeLinecap="round" />);
    if (fn.label) legend.push({ label: fn.label, style: st, kind: 'line' });
  });

  (spec.series ?? []).forEach((series, i) => {
    const st = styleIndex++ % STYLES.length;
    const pts = series.points.filter(([px, py]) => Number.isFinite(px) && Number.isFinite(py));
    if (series.kind === 'bar') {
      const bw = Math.max(4, Math.min(28, (PW / Math.max(pts.length, 1)) * 0.6));
      const base = sy(Math.max(y.min, Math.min(y.max, 0)));
      pts.forEach(([px, py], j) => {
        const top = sy(py);
        marks.push(
          <rect key={`b${i}-${j}`} x={round(sx(px) - bw / 2)} y={round(Math.min(top, base))} width={round(bw)} height={round(Math.abs(base - top))} fill={i % 2 ? 'var(--diagram-muted)' : 'var(--diagram-accent)'} fillOpacity={0.85} />,
        );
      });
      legend.push({ label: series.label, style: st, kind: 'bar' });
    } else if (series.kind === 'scatter') {
      pts.forEach(([px, py], j) => marks.push(<circle key={`s${i}-${j}`} cx={round(sx(px))} cy={round(sy(py))} r={3.5} fill={STYLES[st].stroke} />));
      legend.push({ label: series.label, style: st, kind: 'point' });
    } else {
      const d = pts.map(([px, py], j) => `${j ? 'L' : 'M'}${round(sx(px))} ${round(sy(py))}`).join('');
      marks.push(<path key={`l${i}`} d={d} fill="none" stroke={STYLES[st].stroke} strokeDasharray={STYLES[st].dash} strokeWidth={2.25} strokeLinejoin="round" />);
      pts.forEach(([px, py], j) => marks.push(<circle key={`lp${i}-${j}`} cx={round(sx(px))} cy={round(sy(py))} r={2.75} fill={STYLES[st].stroke} />));
      legend.push({ label: series.label, style: st, kind: 'line' });
    }
  });

  return (
    <div className={s.plot}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={alt} className={s.svg} data-visual="plot">
        <defs>
          <clipPath id={clip}>
            <rect x={M.l} y={M.t} width={PW} height={PH} />
          </clipPath>
        </defs>
        {spec.grid !== false && (
          <g stroke="var(--diagram-muted)" strokeOpacity={0.35} strokeWidth={1} aria-hidden="true">
            {xTicks.map((t) => (
              <line key={`gx${t}`} x1={round(sx(t))} x2={round(sx(t))} y1={M.t} y2={M.t + PH} />
            ))}
            {yTicks.map((t) => (
              <line key={`gy${t}`} x1={M.l} x2={M.l + PW} y1={round(sy(t))} y2={round(sy(t))} />
            ))}
          </g>
        )}
        <g stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <line x1={M.l} x2={M.l + PW} y1={round(axisX)} y2={round(axisX)} />
          <line x1={round(axisY)} x2={round(axisY)} y1={M.t} y2={M.t + PH} />
        </g>
        <g fontSize={11} fill="currentColor" aria-hidden="true">
          {xTicks
            .filter((t) => t !== 0 || axisY !== sx(0))
            .map((t) => (
              <text key={`tx${t}`} x={round(sx(t))} y={round(Math.min(axisX + 14, H - 4))} textAnchor="middle">
                {fmt(t)}
              </text>
            ))}
          {yTicks
            .filter((t) => t !== 0 || axisX !== sy(0))
            .map((t) => (
              <text key={`ty${t}`} x={round(Math.max(axisY - 5, 10))} y={round(sy(t) + 4)} textAnchor="end">
                {fmt(t)}
              </text>
            ))}
        </g>
        {x.label && (
          <text {...LABEL_PROPS} x={M.l + PW} y={round(axisX - 6)} textAnchor="end" fontStyle="italic" aria-hidden="true">
            {x.label}
          </text>
        )}
        {y.label && (
          <text {...LABEL_PROPS} x={round(axisY + 6)} y={M.t + 11} textAnchor="start" fontStyle="italic" aria-hidden="true">
            {y.label}
          </text>
        )}
        <g clipPath={`url(#${clip})`} aria-hidden="true">
          {marks}
        </g>
        <g aria-hidden="true">
          {(spec.points ?? []).map((p, i) =>
            Number.isFinite(p.at[0]) && Number.isFinite(p.at[1]) ? (
              <g key={`p${i}`}>
                <circle cx={round(sx(p.at[0]))} cy={round(sy(p.at[1]))} r={4} fill="var(--diagram-accent)" stroke="var(--diagram-paper)" strokeWidth={1.5} />
                {p.label && (
                  <text {...LABEL_PROPS} x={round(sx(p.at[0]) + 7)} y={round(sy(p.at[1]) - 7)}>
                    {p.label}
                  </text>
                )}
              </g>
            ) : null,
          )}
        </g>
      </svg>
      {legend.length > 0 && (
        <ul className={s.legend} aria-label="Legend">
          {legend.map((item, i) => (
            <li key={i}>
              <svg width="26" height="12" viewBox="0 0 26 12" aria-hidden="true">
                {item.kind === 'bar' ? (
                  <rect x="7" y="1" width="12" height="10" fill={STYLES[item.style].stroke} />
                ) : item.kind === 'point' ? (
                  <circle cx="13" cy="6" r="4" fill={STYLES[item.style].stroke} />
                ) : (
                  <line x1="1" x2="25" y1="6" y2="6" stroke={STYLES[item.style].stroke} strokeDasharray={STYLES[item.style].dash} strokeWidth="2.5" />
                )}
              </svg>
              {item.label}
            </li>
          ))}
        </ul>
      )}
      {errors.length > 0 && <p className={s.error}>Could not draw: {errors.join(', ')}</p>}
    </div>
  );
}
