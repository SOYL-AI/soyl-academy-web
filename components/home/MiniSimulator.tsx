'use client';

import { useId, useRef, useState } from 'react';
import { InkButton } from '@/components/ink/Button';
import { Wash } from '@/components/ink/Wash';
import { cn } from '@/lib/utils';
import { feedbackFor, fmt, hintsFor, label, samePoint, type Pt } from './coordinates';

/**
 * A SOYL question played as a pupil (/schools, /teachers): plot a point on a coordinate grid. Unlimited
 * attempts, every wrong try kept on the grid and in the list as a madder mark, hints that nudge without giving
 * the answer, and a line that counts the effort when the pupil gets there. It lies on the painted wash, as a
 * product moment does in Ink and wash.
 *
 * Pointer: tap or drag on the grid. Keyboard: Tab to the grid, arrow keys move the point, Enter or Space
 * checks. No library; the only motion is the point sliding between squares (120 ms).
 */

const TARGETS: Pt[] = [
  { x: 3, y: -2 },
  { x: -4, y: 1 },
  { x: 2, y: 4 },
  { x: -1, y: -3 },
];

const RANGE = 5; // the grid runs −5..5 on both axes
const UNIT = 20; // viewBox units per grid step
const SIZE = RANGE * 2 * UNIT; // 200
const PAD = 14;
const VIEW = SIZE + PAD * 2;

const toSvg = (p: Pt) => ({ cx: PAD + (p.x + RANGE) * UNIT, cy: PAD + (RANGE - p.y) * UNIT });

const INK = '#1B1A19';
const GRAPHITE = '#4A4744';
const INDIGO = '#27467E';
const MADDER = '#A3302A';
const LEAF = '#3F6A2A';
const PAPER = '#FBFAF7';

function Mark({ ok }: { ok: boolean }) {
  return ok ? (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
      <path d="M2 6.5 5 9l5-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" focusable="false">
      <path d="M2 2l6 6M8 2 2 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function MiniSimulator() {
  const [round, setRound] = useState(0);
  const target = TARGETS[round % TARGETS.length]!;
  const [point, setPoint] = useState<Pt | null>(null);
  const [attempts, setAttempts] = useState<{ p: Pt; ok: boolean }[]>([]);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [message, setMessage] = useState('');
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);
  const ids = { prompt: useId(), help: useId() };

  const solved = attempts.some((a) => a.ok);
  const hints = hintsFor(target);
  const tries = attempts.length;

  const place = (p: Pt) => {
    if (solved) return;
    setPoint({ x: Math.max(-RANGE, Math.min(RANGE, p.x)), y: Math.max(-RANGE, Math.min(RANGE, p.y)) });
  };

  const fromEvent = (e: React.PointerEvent<SVGSVGElement>): Pt | null => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    const scale = VIEW / rect.width;
    return {
      x: Math.round(((e.clientX - rect.left) * scale - PAD) / UNIT) - RANGE,
      y: RANGE - Math.round(((e.clientY - rect.top) * scale - PAD) / UNIT),
    };
  };

  const check = () => {
    if (!point || solved) return;
    if (attempts.some((a) => samePoint(a.p, point))) {
      setMessage(`You tried ${label(point)} already. Move the point first.`);
      return;
    }
    const ok = samePoint(point, target);
    setAttempts((a) => [...a, { p: point, ok }]);
    setMessage(ok ? '' : feedbackFor(point, target));
  };

  const next = () => {
    setRound((r) => r + 1);
    setPoint(null);
    setAttempts([]);
    setHintsUsed(0);
    setMessage('');
    // The next question starts on the grid.
    svgRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<SVGSVGElement>) => {
    const p = point ?? { x: 0, y: 0 };
    const moves: Record<string, Pt> = {
      ArrowLeft: { x: p.x - 1, y: p.y },
      ArrowRight: { x: p.x + 1, y: p.y },
      ArrowUp: { x: p.x, y: p.y + 1 },
      ArrowDown: { x: p.x, y: p.y - 1 },
    };
    if (moves[e.key]) {
      e.preventDefault();
      // The first arrow press puts the point on the origin; the next ones move it.
      place(point ? moves[e.key]! : p);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      check();
    }
  };

  return (
    <Wash className="px-4 py-5 sm:p-5">
      <div className="overflow-hidden rounded-[var(--radius-md)] border border-rule bg-paper">
        {/* The question's header, as in the student app */}
        <div className="border-b border-rule px-4 py-3 md:px-6">
          <p className="ink-label">
            <span className="tabular-nums text-ink">Question {(round % TARGETS.length) + 1}</span> · Coordinates · Grade 6
          </p>
        </div>

        <div className="grid gap-6 p-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:p-6 lg:grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
          <div>
            <p id={ids.prompt} className="ink-title mb-4">
              Plot the point <span className="whitespace-nowrap tabular-nums">{label(target)}</span>.
            </p>
            <svg
              ref={svgRef}
              viewBox={`0 0 ${VIEW} ${VIEW}`}
              role="application"
              aria-roledescription="coordinate grid"
              aria-labelledby={ids.prompt}
              aria-describedby={ids.help}
              tabIndex={0}
              onKeyDown={onKeyDown}
              onPointerDown={(e) => {
                dragging.current = true;
                e.currentTarget.setPointerCapture(e.pointerId);
                const p = fromEvent(e);
                if (p) place(p);
              }}
              onPointerMove={(e) => {
                if (!dragging.current) return;
                const p = fromEvent(e);
                if (p) place(p);
              }}
              onPointerUp={() => (dragging.current = false)}
              className={cn(
                'block w-full max-w-[340px] touch-none select-none rounded-[var(--radius-sm)] border border-rule bg-paper',
                solved ? 'cursor-default' : 'cursor-crosshair'
              )}
            >
              {Array.from({ length: RANGE * 2 + 1 }, (_, i) => {
                const v = PAD + i * UNIT;
                return (
                  <g key={i} stroke={INDIGO} strokeOpacity={0.18} strokeWidth={0.6}>
                    <line x1={PAD} y1={v} x2={PAD + SIZE} y2={v} />
                    <line x1={v} y1={PAD} x2={v} y2={PAD + SIZE} />
                  </g>
                );
              })}
              <g stroke={INK} strokeWidth={1.1}>
                <line x1={PAD} y1={PAD + SIZE / 2} x2={PAD + SIZE} y2={PAD + SIZE / 2} />
                <line x1={PAD + SIZE / 2} y1={PAD} x2={PAD + SIZE / 2} y2={PAD + SIZE} />
              </g>
              {/* 11.5 units renders at 13 px or more: the grid is never drawn narrower than about 260 px. */}
              <g fontSize={11.5} fill={GRAPHITE} fontFamily="var(--font-switzer), sans-serif">
                {[-4, -2, 2, 4].map((n) => (
                  <g key={n}>
                    <text x={toSvg({ x: n, y: 0 }).cx} y={PAD + SIZE / 2 + 12} textAnchor="middle">
                      {fmt(n)}
                    </text>
                    <text x={PAD + SIZE / 2 - 5} y={toSvg({ x: 0, y: n }).cy + 3.5} textAnchor="end">
                      {fmt(n)}
                    </text>
                  </g>
                ))}
                <text x={PAD + SIZE - 2} y={PAD + SIZE / 2 - 5} textAnchor="end" fill={INK}>
                  x
                </text>
                <text x={PAD + SIZE / 2 + 6} y={PAD + 8} fill={INK}>
                  y
                </text>
              </g>

              {/* Earlier wrong tries stay on the grid: the trail the teacher sees. */}
              {attempts
                .filter((a) => !a.ok)
                .map((a, i) => {
                  const { cx, cy } = toSvg(a.p);
                  return (
                    <g key={i} stroke={MADDER} strokeWidth={1.6} strokeLinecap="round">
                      <line x1={cx - 4} y1={cy - 4} x2={cx + 4} y2={cy + 4} />
                      <line x1={cx + 4} y1={cy - 4} x2={cx - 4} y2={cy + 4} />
                    </g>
                  );
                })}

              {point ? (
                <circle
                  {...toSvg(point)}
                  r={6}
                  fill={solved ? LEAF : INDIGO}
                  stroke={PAPER}
                  strokeWidth={2}
                  style={{ transition: 'cx 120ms ease-out, cy 120ms ease-out, fill 160ms' }}
                />
              ) : null}
            </svg>
            <p id={ids.help} className="sr-only">
              Use the arrow keys to move the point and Enter to check your answer, or tap the grid.
            </p>
          </div>

          <div className="flex flex-col">
            <p className="ink-label">Your tries</p>
            <ol aria-label="Your tries" className="mt-2 flex min-h-9 flex-wrap gap-1.5">
              {attempts.length === 0 ? <li className="text-[0.9375rem] text-muted">Place a point, then check it.</li> : null}
              {attempts.map((a, i) => (
                <li
                  key={i}
                  className={cn(
                    'inline-flex h-8 items-center gap-1.5 rounded-[var(--radius-sm)] border px-2.5 text-[0.875rem] tabular-nums',
                    a.ok ? 'border-leaf bg-leaf text-paper' : 'border-madder/40 text-madder'
                  )}
                >
                  <Mark ok={a.ok} />
                  <span className="sr-only">{a.ok ? 'Right:' : 'Not yet:'}</span>
                  {label(a.p)}
                </li>
              ))}
            </ol>

            <div aria-live="polite" className="mt-3 min-h-[3.5rem]">
              {solved ? (
                <p className="font-semibold text-leaf">
                  You worked it out{' '}
                  <span className="font-normal tabular-nums text-graphite">
                    · {tries} {tries === 1 ? 'try' : 'tries'} · {hintsUsed} {hintsUsed === 1 ? 'hint' : 'hints'}
                  </span>
                </p>
              ) : message ? (
                <p className="border-l-2 border-madder pl-3 text-[0.9375rem] text-ink">{message}</p>
              ) : point ? (
                <p className="text-[0.9375rem] text-muted">
                  Your point: <span className="tabular-nums text-ink">{label(point)}</span>
                </p>
              ) : null}
              {hintsUsed > 0 && !solved ? (
                <ul className="mt-3 space-y-1.5">
                  {hints.slice(0, hintsUsed).map((h, i) => (
                    <li key={i} className="text-[0.9375rem] text-graphite">
                      <span className="font-semibold text-ink">Hint {i + 1}.</span> {h}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            {/* aria-disabled, not disabled: a button that is pressed stays focusable, so keyboard focus never drops
                to the page when it changes. The first button is one element whose job changes once it is solved. */}
            <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
              <InkButton variant={solved ? 'secondary' : 'primary'} onClick={solved ? next : check} aria-disabled={!solved && !point}>
                {solved ? 'Try another' : 'Check'}
              </InkButton>
              {solved ? null : (
                <InkButton
                  variant="secondary"
                  onClick={() => setHintsUsed((h) => Math.min(h + 1, hints.length))}
                  aria-disabled={hintsUsed >= hints.length}
                >
                  {hintsUsed >= hints.length ? 'No more hints' : 'Hint'}
                </InkButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </Wash>
  );
}
