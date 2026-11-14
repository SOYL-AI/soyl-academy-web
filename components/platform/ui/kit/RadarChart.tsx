'use client';

/**
 * RadarChart: a spider chart of 3 or more axes (design-system kit, progress radar 2026-11-14). Hand-written SVG and
 * CSS, no chart library. Used on /me/progress for the player card's attributes and mastery by subject.
 *
 * - Geometry is pure and exported (`radarPoint`, `radarPoints`, `radarFraction`): a 200 × 200 viewBox, centre
 *   (100, 100), radius 100; axis 0 points straight up and the rest follow clockwise. `min` sits at the centre and
 *   each axis's `max` on the outer ring; values outside are clamped.
 * - Grid rings are drawn at `rings` (values, e.g. 60/80/99 on a 40–99 card). A ring at `min` would be a point, so
 *   it is skipped.
 * - Labels are HTML around the plot ("Accuracy 72"), so they wrap instead of clipping: the plot radius shrinks with
 *   the container (a container query unit) until the widest side label fits, and every label's max-width keeps it
 *   inside the chart's box. Tested at 360 px.
 * - Axis `short` replaces the name on the chart only (the table and sentence keep `label`); `note` adds context
 *   ("3 of 15 chapters started") to the sentence and a table column, and `noteShort` (or `note`) a line under the
 *   chart label.
 * - `blank`: the dashed grid and axis names only, no shape and no numbers (unrated; never invent numbers).
 * - `ghost`: an optional earlier shape ("Last month") drawn as a faint dashed outline under the main shape.
 * - Accessibility: the plot is `role="img"` with one sentence naming every value; a `<details>` table repeats the
 *   numbers. Colour comes from tokens (`tone`: accent or a player-card tier), so dark mode follows the theme; the
 *   outline and dots are ≥ 3:1 (tier and accent tokens are contrast-tested in kit.test.tsx).
 * - Motion: the shape grows in once when the chart scrolls into view (IntersectionObserver sets `data-in`); none
 *   under prefers-reduced-motion. No observer (old browsers, jsdom): shown at once.
 */
import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { cx } from '../cx';
import { DataTable, dataTableNum } from './Lists';
import s from './RadarChart.module.css';

export interface RadarAxis {
  /** Stable id (also the `ghost.values` key). */
  key: string;
  /** Full name: the table, the accessible sentence and (unless `short` is set) the chart ("Accuracy", "Science"). */
  label: string;
  value: number;
  /** The value on the outer ring. */
  max: number;
  /** A shorter name for the chart label only ("Mathematics" for "Mathematics (Standard 041 / Basic 241)"). */
  short?: string;
  /** Context for the value, in the sentence and the table ("3 of 15 chapters started"). */
  note?: string;
  /** The note under the chart label where space is tight ("3/15 chapters"; default `note`). */
  noteShort?: string;
}

export type RadarTone = 'accent' | 'bronze' | 'silver' | 'gold' | 'elite';

export interface RadarGhost {
  /** What the outline is ("Last month"). */
  label: string;
  /** Values by axis key; a missing key sits at the centre. */
  values: Readonly<Record<string, number>>;
}

export interface RadarChartProps {
  axes: readonly RadarAxis[];
  /** What the chart shows; starts the accessible sentence and names the table ("Your card attributes"). */
  label: string;
  /** The value at the centre (default 0). */
  min?: number;
  /** Values where grid rings are drawn (default: four even steps from min to the largest max). */
  rings?: readonly number[];
  tone?: RadarTone;
  ghost?: RadarGhost;
  /** Unrated: dashed grid and axis names only. */
  blank?: boolean;
  /** Written after every value ("%"). */
  unit?: string;
  /** Table column headings (default "Axis" / "Value" / "Note"; the note column only when an axis has a note). */
  columns?: { axis: string; value: string; note?: string };
  /** Small text under the chart (what the rings mean, what is missing). */
  caption?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

/** viewBox size; the centre is (C, C) and the radius C. */
export const RADAR_VIEW = 200;
const C = RADAR_VIEW / 2;
const round2 = (x: number) => Math.round(x * 100) / 100 + 0; // + 0 turns -0 into 0
const round3 = (x: number) => Math.round(x * 1000) / 1000 + 0;

/** The angle of axis `i` of `n` (radians; 0 = up, clockwise). */
export function radarAngle(i: number, n: number): number {
  return -Math.PI / 2 + (2 * Math.PI * i) / n;
}

/** Where `value` lies between `min` (0, the centre) and `max` (1, the outer ring), clamped. */
export function radarFraction(value: number, min: number, max: number): number {
  if (!Number.isFinite(value) || !(max > min)) return 0;
  return Math.min(1, Math.max(0, (value - min) / (max - min)));
}

/** The viewBox point of axis `i` of `n` at fraction `t` (2 decimals). */
export function radarPoint(i: number, n: number, t: number): { x: number; y: number } {
  const a = radarAngle(i, n);
  return { x: round2(C + C * t * Math.cos(a)), y: round2(C + C * t * Math.sin(a)) };
}

/** The shape's vertices for `values` (default: each axis's own value). */
export function radarPoints(axes: readonly RadarAxis[], min: number, values: readonly number[] = axes.map((a) => a.value)): { x: number; y: number }[] {
  return axes.map((a, i) => radarPoint(i, axes.length, radarFraction(values[i] ?? min, min, a.max)));
}

const toAttr = (pts: readonly { x: number; y: number }[]) => pts.map((p) => `${p.x},${p.y}`).join(' ');

/** "a, b and c". */
function listText(items: readonly string[]): string {
  return items.length <= 1 ? (items[0] ?? '') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

const fmt = (v: number) => String(Math.round(v));

/** The accessible sentence for the plot (pure; tested). */
export function radarSentence({ axes, label, min = 0, unit = '', blank, ghost }: Pick<RadarChartProps, 'axes' | 'label' | 'min' | 'unit' | 'blank' | 'ghost'>): string {
  if (blank) return `${label}: not rated yet (${listText(axes.map((a) => a.label))}).`;
  const max = Math.max(...axes.map((a) => a.max));
  const main = `${label}, from ${fmt(min)} to ${fmt(max)}${unit}: ${listText(axes.map((a) => `${a.label} ${fmt(a.value)}${unit}${a.note ? ` (${a.note})` : ''}`))}.`;
  if (!ghost) return main;
  return `${main} ${ghost.label}: ${listText(axes.map((a) => `${a.label} ${fmt(ghost.values[a.key] ?? min)}${unit}`))}.`;
}

export function RadarChart({ axes, label, min = 0, rings, tone = 'accent', ghost, blank = false, unit = '', columns, caption, className, 'data-testid': testId }: RadarChartProps) {
  const ref = useRef<HTMLElement>(null);

  // Grow in once on first sight. The attribute is set on the DOM (not React state), so it never re-renders.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.setAttribute('data-in', '');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.setAttribute('data-in', '');
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const n = axes.length;
  if (n < 3) return null;
  const top = Math.max(...axes.map((a) => a.max));
  const ringValues = (rings ?? [1, 2, 3, 4].map((k) => min + ((top - min) * k) / 4)).filter((v) => v > min);
  const outer = Math.max(...ringValues, top);
  const dirs = axes.map((_, i) => ({ x: round3(Math.cos(radarAngle(i, n))), y: round3(Math.sin(radarAngle(i, n))) }));
  const reach = Math.max(...dirs.map((d) => Math.abs(d.x)));
  const plotStyle = { '--reach': reach } as CSSProperties;
  const notes = !blank && axes.some((a) => a.note);

  return (
    <figure ref={ref} className={cx(s.root, className)} data-tone={tone} data-blank={blank || undefined} data-axes={n} data-notes={notes || undefined} data-testid={testId}>
      <div className={s.plot} role="img" aria-label={radarSentence({ axes, label, min, unit, blank, ghost })} style={plotStyle}>
        <svg className={s.svg} viewBox={`0 0 ${RADAR_VIEW} ${RADAR_VIEW}`} aria-hidden="true" focusable="false">
          <g className={s.radarGrid}>
            {ringValues.map((v) => (
              <polygon
                key={v}
                className={v === outer ? s.radarOuter : s.radarRing}
                points={toAttr(axes.map((a, i) => radarPoint(i, n, radarFraction(v, min, a.max))))}
                data-ring={v}
              />
            ))}
            {axes.map((a, i) => {
              const end = radarPoint(i, n, 1);
              return <line key={a.key} className={s.radarSpoke} x1={C} y1={C} x2={end.x} y2={end.y} />;
            })}
          </g>
          {ghost && !blank && <polygon className={s.radarGhost} points={toAttr(radarPoints(axes, min, axes.map((a) => ghost.values[a.key] ?? min)))} data-testid="radar-ghost" />}
          {!blank && (
            <g className={s.radarShape}>
              <polygon className={s.radarArea} points={toAttr(radarPoints(axes, min))} data-testid="radar-shape" />
              {radarPoints(axes, min).map((p, i) => (
                <circle key={axes[i]!.key} className={s.radarDot} cx={p.x} cy={p.y} r={4.5} />
              ))}
            </g>
          )}
        </svg>
        {axes.map((a, i) => {
          const d = dirs[i]!;
          const side = d.x > 0.2 ? 'start' : d.x < -0.2 ? 'end' : 'middle';
          return (
            <span key={a.key} className={s.radarLabel} data-side={side} data-axis={a.key} style={{ '--x': d.x, '--y': d.y, '--ax': Math.abs(d.x) } as CSSProperties}>
              <span className={s.labelName}>{a.short ?? a.label}</span>
              {!blank && (
                <>
                  {' '}
                  <b className={s.labelValue}>
                    {fmt(a.value)}
                    {unit}
                  </b>
                  {(a.noteShort ?? a.note) && <span className={s.labelNote}>{a.noteShort ?? a.note}</span>}
                </>
              )}
            </span>
          );
        })}
      </div>
      {caption && <figcaption className={s.caption}>{caption}</figcaption>}
      {!blank && (
        <details className={s.radarDetails}>
          <summary className={s.summary}>Show as a table</summary>
          <DataTable caption={label} hideCaption dense>
            <thead>
              <tr>
                <th scope="col">{columns?.axis ?? 'Axis'}</th>
                <th scope="col" className={dataTableNum}>
                  {columns?.value ?? 'Value'}
                </th>
                {ghost && (
                  <th scope="col" className={dataTableNum}>
                    {ghost.label}
                  </th>
                )}
                {notes && <th scope="col">{columns?.note ?? 'Note'}</th>}
              </tr>
            </thead>
            <tbody>
              {axes.map((a) => (
                <tr key={a.key}>
                  <th scope="row">{a.label}</th>
                  <td className={dataTableNum}>
                    {fmt(a.value)}
                    {unit}
                  </td>
                  {ghost && (
                    <td className={dataTableNum}>
                      {fmt(ghost.values[a.key] ?? min)}
                      {unit}
                    </td>
                  )}
                  {notes && <td>{a.note ?? ''}</td>}
                </tr>
              ))}
            </tbody>
          </DataTable>
        </details>
      )}
    </figure>
  );
}
