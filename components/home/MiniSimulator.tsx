'use client';

import { useId, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * A small, honest taste of a SOYL question: plot a point on a coordinate grid.
 * Unlimited attempts, every attempt kept in a trail, hints that nudge without
 * giving the answer, and a success line that counts the effort.
 *
 * Pointer: tap or drag on the grid. Keyboard: arrow keys move the point,
 * Enter checks. No animation library; transitions are CSS and under 300 ms.
 */

type Pt = { x: number; y: number };

const TARGETS: Pt[] = [
  { x: 3, y: -2 },
  { x: -4, y: 1 },
  { x: 2, y: 4 },
  { x: -1, y: -3 },
];

const RANGE = 5; // grid runs -5..5 on both axes
const UNIT = 20; // viewBox units per grid step
const SIZE = RANGE * 2 * UNIT; // 200
const PAD = 14;

const toSvg = (p: Pt) => ({ cx: PAD + (p.x + RANGE) * UNIT, cy: PAD + (RANGE - p.y) * UNIT });
const fmt = (n: number) => (n < 0 ? `−${Math.abs(n)}` : String(n));
const label = (p: Pt) => `(${fmt(p.x)}, ${fmt(p.y)})`;

/** A nudge about what went wrong — never the answer itself. */
function feedbackFor(guess: Pt, target: Pt): string {
  if (guess.x === target.y && guess.y === target.x && target.x !== target.y) {
    return 'Looks like x and y swapped places. The first number is always x: across before up.';
  }
  if (guess.x === target.x) {
    return guess.y === -target.y
      ? 'Your x is right. Check the sign of y: positive is above the x-axis, negative is below.'
      : 'Your x is right. Now count the y-steps again, up or down from the x-axis.';
  }
  if (guess.y === target.y) {
    return guess.x === -target.x
      ? 'Your y is right. Check the sign of x: positive is to the right, negative to the left.'
      : 'Your y is right. Count the x-steps again along the horizontal axis.';
  }
  return 'Not yet. Start at the origin (0, 0), move along x first, then up or down for y.';
}

const HINTS = (t: Pt) => [
  `Start at the origin, where the two axes cross. That point is (0, 0).`,
  `The first number is x. Move ${Math.abs(t.x)} step${Math.abs(t.x) === 1 ? '' : 's'} ${t.x < 0 ? 'left' : 'right'} along the horizontal axis.`,
];

export function MiniSimulator() {
  const [round, setRound] = useState(0);
  const target = TARGETS[round % TARGETS.length];
  const [point, setPoint] = useState<Pt | null>(null);
  const [attempts, setAttempts] = useState<{ p: Pt; ok: boolean }[]>([]);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [message, setMessage] = useState('');
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);
  const ids = { prompt: useId(), help: useId() };

  const solved = attempts.some((a) => a.ok);

  const place = (p: Pt) => {
    if (solved) return;
    const clamped = {
      x: Math.max(-RANGE, Math.min(RANGE, p.x)),
      y: Math.max(-RANGE, Math.min(RANGE, p.y)),
    };
    setPoint(clamped);
  };

  const pointFromEvent = (e: React.PointerEvent<SVGSVGElement>): Pt | null => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    const scale = (SIZE + PAD * 2) / rect.width;
    const vx = (e.clientX - rect.left) * scale - PAD;
    const vy = (e.clientY - rect.top) * scale - PAD;
    return { x: Math.round(vx / UNIT) - RANGE, y: RANGE - Math.round(vy / UNIT) };
  };

  const check = () => {
    if (!point || solved) return;
    const ok = point.x === target.x && point.y === target.y;
    setAttempts((a) => [...a, { p: point, ok }]);
    setMessage(ok ? '' : feedbackFor(point, target));
  };

  const next = () => {
    setRound((r) => r + 1);
    setPoint(null);
    setAttempts([]);
    setHintsUsed(0);
    setMessage('');
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
      place(point ? moves[e.key] : p);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      check();
    }
  };

  const tries = attempts.length;
  const hints = HINTS(target);

  return (
    <div className="module relative">
      {/* Question header, as in the student app */}
      <div className="flex items-center justify-between gap-4 border-b border-rule px-4 py-3 md:px-5">
        <p className="t-label text-muted">
          <span className="t-num text-ink">Question {(round % TARGETS.length) + 1}</span> · Coordinates · Grade 6
        </p>
        <p className="t-label text-muted">Try it</p>
      </div>

      <div className="grid gap-5 p-4 md:p-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
        <div>
          <p id={ids.prompt} className="t-subtitle mb-3">
            Plot the point <span className="t-num whitespace-nowrap">{label(target)}</span>.
          </p>
          <svg
            ref={svgRef}
            viewBox={`0 0 ${SIZE + PAD * 2} ${SIZE + PAD * 2}`}
            role="application"
            aria-roledescription="coordinate grid"
            aria-labelledby={ids.prompt}
            aria-describedby={ids.help}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={(e) => {
              dragging.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              const p = pointFromEvent(e);
              if (p) place(p);
            }}
            onPointerMove={(e) => {
              if (!dragging.current) return;
              const p = pointFromEvent(e);
              if (p) place(p);
            }}
            onPointerUp={() => (dragging.current = false)}
            className={cn(
              'graph-grid block w-full max-w-[340px] touch-none select-none border border-rule',
              solved ? 'cursor-default' : 'cursor-crosshair'
            )}
          >
            {/* grid lines */}
            {Array.from({ length: RANGE * 2 + 1 }, (_, i) => {
              const v = PAD + i * UNIT;
              return (
                <g key={i} stroke="#3155FF" strokeOpacity={0.16} strokeWidth={0.6}>
                  <line x1={PAD} y1={v} x2={PAD + SIZE} y2={v} />
                  <line x1={v} y1={PAD} x2={v} y2={PAD + SIZE} />
                </g>
              );
            })}
            {/* axes */}
            <g stroke="#171717" strokeWidth={1.1}>
              <line x1={PAD} y1={PAD + SIZE / 2} x2={PAD + SIZE} y2={PAD + SIZE / 2} />
              <line x1={PAD + SIZE / 2} y1={PAD} x2={PAD + SIZE / 2} y2={PAD + SIZE} />
            </g>
            {/* 11.5 units renders at ≥13 px: the grid is never drawn narrower than ~260 px. */}
            <g fontSize={11.5} fill="#5E5E59" fontFamily="var(--font-inter), sans-serif">
              {[-4, -2, 2, 4].map((n) => (
                <g key={n}>
                  <text x={toSvg({ x: n, y: 0 }).cx} y={PAD + SIZE / 2 + 12} textAnchor="middle">{fmt(n)}</text>
                  <text x={PAD + SIZE / 2 - 5} y={toSvg({ x: 0, y: n }).cy + 3.5} textAnchor="end">{fmt(n)}</text>
                </g>
              ))}
              <text x={PAD + SIZE - 2} y={PAD + SIZE / 2 - 5} textAnchor="end" fill="#171717">x</text>
              <text x={PAD + SIZE / 2 + 6} y={PAD + 8} fill="#171717">y</text>
            </g>

            {/* earlier wrong attempts stay visible: the trail */}
            {attempts
              .filter((a) => !a.ok)
              .map((a, i) => {
                const { cx, cy } = toSvg(a.p);
                return (
                  <g key={i} stroke="#D84A3F" strokeWidth={1.6} strokeLinecap="round" opacity={0.8}>
                    <line x1={cx - 4} y1={cy - 4} x2={cx + 4} y2={cy + 4} />
                    <line x1={cx + 4} y1={cy - 4} x2={cx - 4} y2={cy + 4} />
                  </g>
                );
              })}

            {point && (
              <circle
                {...toSvg(point)}
                r={6}
                fill={solved ? '#1E7A4C' : '#3155FF'}
                stroke="#fff"
                strokeWidth={2}
                style={{ transition: 'cx 120ms ease-out, cy 120ms ease-out, fill 200ms' }}
              />
            )}
          </svg>
          <p id={ids.help} className="sr-only">
            Use the arrow keys to move the point and Enter to check your answer, or tap the grid.
          </p>
        </div>

        <div className="flex flex-col">
          {/* Attempt trail */}
          <p className="t-label mb-2 text-muted">Your attempts</p>
          <ol className="mb-4 flex min-h-9 flex-wrap gap-1.5" aria-label="Your attempts">
            {attempts.length === 0 && (
              <li className="t-small text-muted">Place a point, then check it.</li>
            )}
            {attempts.map((a, i) => (
              <li
                key={i}
                className={cn(
                  't-num inline-flex h-8 items-center gap-1 border px-2 text-[14px]',
                  a.ok ? 'border-success bg-success text-white' : 'border-rule-strong bg-white text-ink'
                )}
              >
                <span aria-hidden="true" className={a.ok ? '' : 'text-red-pen'}>
                  {a.ok ? '✓' : '✗'}
                </span>
                <span className="sr-only">{a.ok ? 'Correct:' : 'Not yet:'}</span>
                {label(a.p)}
              </li>
            ))}
          </ol>

          <div aria-live="polite" className="min-h-[3.5rem]">
            {solved ? (
              <p className="sim-pop border-l-2 border-success bg-success/10 px-3 py-2 font-semibold text-success">
                You worked it out
                <span className="t-num font-medium text-ink">
                  {' '}· {tries} {tries === 1 ? 'try' : 'tries'} · {hintsUsed} {hintsUsed === 1 ? 'hint' : 'hints'}
                </span>
              </p>
            ) : message ? (
              <p className="t-small border-l-2 border-red-pen bg-white px-3 py-2 text-ink">{message}</p>
            ) : point ? (
              <p className="t-small text-muted">
                Your point: <span className="t-num text-ink">{label(point)}</span>
              </p>
            ) : null}
          </div>

          {hintsUsed > 0 && !solved && (
            <ul className="mt-3 space-y-1.5">
              {hints.slice(0, hintsUsed).map((h, i) => (
                <li key={i} className="t-small bg-highlighter/40 px-3 py-2 text-ink">
                  <span className="font-semibold">Hint {i + 1}.</span> {h}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
            {solved ? (
              <button
                type="button"
                onClick={next}
                className="press h-11 rounded-[var(--radius-sm)] bg-ink px-5 text-[15px] font-semibold text-white hover:bg-cobalt-deep"
              >
                Try another
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={check}
                  disabled={!point}
                  className="press h-11 rounded-[var(--radius-sm)] bg-cobalt px-5 text-[15px] font-semibold text-white hover:bg-cobalt-deep disabled:cursor-not-allowed disabled:bg-muted"
                >
                  Check
                </button>
                <button
                  type="button"
                  onClick={() => setHintsUsed((h) => Math.min(h + 1, hints.length))}
                  disabled={hintsUsed >= hints.length}
                  className="press h-11 rounded-[var(--radius-sm)] border border-ink px-4 text-[15px] font-semibold text-ink hover:bg-ink hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {hintsUsed >= hints.length ? 'No more hints' : 'Hint'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
