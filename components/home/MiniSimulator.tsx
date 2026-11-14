'use client';

import { useId, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * A small, honest taste of a moment inside a mission (ADR-033): plot a point on a
 * coordinate grid in a notebook. Unlimited tries, every try kept as a pencil trail,
 * nudges from the guide that never give the answer, and a line that counts the
 * effort. No question number, no red crosses or green ticks (spec §02, §14).
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
    <div className="leaf tape relative" style={{ '--tape': 'var(--color-ultramarine)' } as React.CSSProperties}>
      {/* A maths moment as it sits inside a mission: no question number, no "live" badge. */}
      <div className="flex items-baseline justify-between gap-4 border-b border-ink/10 px-5 pb-3 pt-6 md:px-7">
        <p className="hand text-[1.25rem] text-ultramarine">A maths moment · coordinates</p>
        <p className="t-eyebrow shrink-0 whitespace-nowrap text-graphite">Try it</p>
      </div>

      <div className="grid gap-6 p-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:p-7 lg:grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
        <div>
          <p id={ids.prompt} className="mb-3 font-serif text-[1.45rem] leading-tight">
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
              'block w-full max-w-[340px] touch-none select-none rounded-[4px] border border-ink/15 bg-[#FFFDF8]',
              solved ? 'cursor-default' : 'cursor-crosshair'
            )}
          >
            {/* graph-paper lines */}
            {Array.from({ length: RANGE * 2 + 1 }, (_, i) => {
              const v = PAD + i * UNIT;
              return (
                <g key={i} stroke="#2B48C8" strokeOpacity={0.14} strokeWidth={0.6}>
                  <line x1={PAD} y1={v} x2={PAD + SIZE} y2={v} />
                  <line x1={v} y1={PAD} x2={v} y2={PAD + SIZE} />
                </g>
              );
            })}
            {/* axes, drawn by hand */}
            <g stroke="#1F1C19" strokeWidth={1.3} strokeLinecap="round" fill="none">
              <path d={`M${PAD} ${PAD + SIZE / 2 + 0.4} C ${PAD + SIZE * 0.3} ${PAD + SIZE / 2 - 0.6}, ${PAD + SIZE * 0.7} ${PAD + SIZE / 2 + 0.7}, ${PAD + SIZE} ${PAD + SIZE / 2}`} />
              <path d={`M${PAD + SIZE / 2 - 0.4} ${PAD} C ${PAD + SIZE / 2 + 0.6} ${PAD + SIZE * 0.3}, ${PAD + SIZE / 2 - 0.6} ${PAD + SIZE * 0.7}, ${PAD + SIZE / 2 + 0.3} ${PAD + SIZE}`} />
            </g>
            {/* 11.5 units renders at ≥13 px: the grid is never drawn narrower than ~260 px. */}
            <g fontSize={11.5} fill="#4A4640" fontFamily="var(--font-inter), sans-serif">
              {[-4, -2, 2, 4].map((n) => (
                <g key={n}>
                  <text x={toSvg({ x: n, y: 0 }).cx} y={PAD + SIZE / 2 + 12} textAnchor="middle">{fmt(n)}</text>
                  <text x={PAD + SIZE / 2 - 5} y={toSvg({ x: 0, y: n }).cy + 3.5} textAnchor="end">{fmt(n)}</text>
                </g>
              ))}
              <text x={PAD + SIZE - 2} y={PAD + SIZE / 2 - 5} textAnchor="end" fill="#1F1C19">x</text>
              <text x={PAD + SIZE / 2 + 6} y={PAD + 8} fill="#1F1C19">y</text>
            </g>

            {/* earlier tries stay on the page, in pencil: the trail */}
            {attempts
              .filter((a) => !a.ok)
              .map((a, i) => {
                const { cx, cy } = toSvg(a.p);
                return <circle key={i} cx={cx} cy={cy} r={4.5} fill="none" stroke="#4A4640" strokeWidth={1.4} strokeDasharray="2 2" opacity={0.85} />;
              })}

            {point && (
              <circle
                {...toSvg(point)}
                r={6}
                fill={solved ? '#3F7A55' : '#2B48C8'}
                stroke="#FFFDF8"
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
          {/* Every try is kept; none is marked wrong in red. */}
          <p className="mb-2 text-[0.85rem] font-semibold text-graphite">Your tries</p>
          <ol className="mb-4 flex min-h-9 flex-wrap gap-1.5" aria-label="Your tries">
            {attempts.length === 0 && <li className="text-[0.92rem] text-graphite">Place a point, then check it.</li>}
            {attempts.map((a, i) => (
              <li
                key={i}
                className={cn(
                  't-num inline-flex h-8 items-center rounded-full border px-2.5 text-[14px]',
                  a.ok ? 'border-sap bg-sap-soft font-semibold text-ink' : 'border-ink/20 bg-sheet text-graphite'
                )}
              >
                <span className="sr-only">{a.ok ? 'Got there:' : 'Not yet:'}</span>
                {label(a.p)}
              </li>
            ))}
          </ol>

          <div aria-live="polite" className="min-h-[3.5rem]">
            {solved ? (
              <p className="sim-pop">
                <span className="hand block text-[1.45rem] leading-tight text-sap">You worked it out.</span>
                <span className="t-num text-[0.92rem] text-graphite">
                  {tries} {tries === 1 ? 'try' : 'tries'} · {hintsUsed} {hintsUsed === 1 ? 'nudge' : 'nudges'}
                </span>
              </p>
            ) : message ? (
              <GuideSays>{message}</GuideSays>
            ) : point ? (
              <p className="text-[0.92rem] text-graphite">
                Your point: <span className="t-num text-ink">{label(point)}</span>
              </p>
            ) : null}
          </div>

          {hintsUsed > 0 && !solved && (
            <ul className="mt-3 space-y-2">
              {hints.slice(0, hintsUsed).map((h, i) => (
                <li key={i}>
                  <GuideSays>{h}</GuideSays>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
            {solved ? (
              <button type="button" onClick={next} className="press btn-brush h-11 bg-ink px-5 text-[15px] font-semibold text-sheet hover:bg-ultramarine">
                Try another
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={check}
                  disabled={!point}
                  className="press btn-brush h-11 bg-ink px-5 text-[15px] font-semibold text-sheet hover:bg-ultramarine disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Check
                </button>
                <button
                  type="button"
                  onClick={() => setHintsUsed((h) => Math.min(h + 1, hints.length))}
                  disabled={hintsUsed >= hints.length}
                  className="press btn-brush h-11 border-2 border-ink px-5 text-[15px] font-semibold text-ink hover:bg-ochre-soft disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {hintsUsed >= hints.length ? 'No more nudges' : 'A nudge'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** The guide's voice: a short handwritten bubble. It nudges; it never gives the answer. */
function GuideSays({ children }: { children: React.ReactNode }) {
  return (
    <p className="sketch-soft bg-sheet px-3.5 py-2.5">
      <span className="sr-only">The guide says: </span>
      <span className="hand text-[1.1rem] leading-snug">{children}</span>
    </p>
  );
}
