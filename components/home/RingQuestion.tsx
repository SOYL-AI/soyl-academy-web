'use client';

import { useId, useRef, useState } from 'react';
import { Ring, type RingProgress } from '@/components/ink/Ring';
import { InkButton } from '@/components/ink/Button';
import { cn } from '@/lib/utils';
import { feedbackFor, fmt, hintsFor, label, samePoint, type Pt } from './coordinates';

/**
 * The homepage's playable question, inside the painted ring (plan §3.2, screen 1).
 *
 * Plot a point on a small grid. Every wrong try draws a third of the ring (two thirds at most) and stays on the
 * grid and in the list as a madder mark; the right answer closes the ring and the wash under it blooms. Hints
 * nudge without giving the answer. Pointer: tap or drag. Keyboard: arrow keys move the point, Enter checks.
 * No library; the ring draws with CSS (components/ink/Ring).
 */
const TARGETS: Pt[] = [
  { x: 2, y: -1 },
  { x: -2, y: 1 },
  { x: 1, y: 2 },
  { x: -1, y: -2 },
];
const RANGE = 3; // the grid runs −3..3
const UNIT = 20;
const SIZE = RANGE * 2 * UNIT; // 120
const PAD = 10;
const VIEW = SIZE + PAD * 2;
const toSvg = (p: Pt) => ({ cx: PAD + (p.x + RANGE) * UNIT, cy: PAD + (RANGE - p.y) * UNIT });

const INK = '#1B1A19';
const INDIGO = '#27467E';
const MADDER = '#A3302A';
const LEAF = '#3F6A2A';

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

export function RingQuestion({ sizes }: { sizes: string }) {
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
  const misses = attempts.filter((a) => !a.ok).length;
  const progress = (solved ? 3 : Math.min(2, misses)) as RingProgress;
  const hints = hintsFor(target);

  const place = (p: Pt) => {
    if (solved) return;
    setPoint({ x: Math.max(-RANGE, Math.min(RANGE, p.x)), y: Math.max(-RANGE, Math.min(RANGE, p.y)) });
  };

  const fromEvent = (e: React.PointerEvent<SVGSVGElement>): Pt | null => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    const scale = VIEW / rect.width;
    return { x: Math.round(((e.clientX - rect.left) * scale - PAD) / UNIT) - RANGE, y: RANGE - Math.round(((e.clientY - rect.top) * scale - PAD) / UNIT) };
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
      place(point ? moves[e.key]! : p);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      check();
    }
  };

  const tries = attempts.length;

  return (
    <div>
      <Ring progress={progress} ghost bloom={solved} priority sizes={sizes} className="mx-auto max-w-[540px]">
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
            'block w-full touch-none select-none rounded-full [mask-image:radial-gradient(closest-side,#000_88%,transparent_104%)]',
            solved ? 'cursor-default' : 'cursor-crosshair'
          )}
        >
          {Array.from({ length: RANGE * 2 + 1 }, (_, i) => {
            const v = PAD + i * UNIT;
            return (
              <g key={i} stroke={INDIGO} strokeOpacity={0.22} strokeWidth={0.6}>
                <line x1={PAD} y1={v} x2={PAD + SIZE} y2={v} />
                <line x1={v} y1={PAD} x2={v} y2={PAD + SIZE} />
              </g>
            );
          })}
          <g stroke={INK} strokeWidth={1}>
            <line x1={PAD} y1={PAD + SIZE / 2} x2={PAD + SIZE} y2={PAD + SIZE / 2} />
            <line x1={PAD + SIZE / 2} y1={PAD} x2={PAD + SIZE / 2} y2={PAD + SIZE} />
          </g>
          <g fontSize={7.5} fill="#4A4744" fontFamily="var(--font-switzer), sans-serif">
            {[-2, 2].map((n) => (
              <g key={n}>
                <text x={toSvg({ x: n, y: 0 }).cx} y={PAD + SIZE / 2 + 8.5} textAnchor="middle">
                  {fmt(n)}
                </text>
                <text x={PAD + SIZE / 2 - 3.5} y={toSvg({ x: 0, y: n }).cy + 2.5} textAnchor="end">
                  {fmt(n)}
                </text>
              </g>
            ))}
            <text x={PAD + SIZE - 1} y={PAD + SIZE / 2 - 3} textAnchor="end" fill={INK}>
              x
            </text>
            <text x={PAD + SIZE / 2 + 3.5} y={PAD + 6} fill={INK}>
              y
            </text>
          </g>
          {attempts
            .filter((a) => !a.ok)
            .map((a, i) => {
              const { cx, cy } = toSvg(a.p);
              return (
                <g key={i} stroke={MADDER} strokeWidth={1.4} strokeLinecap="round">
                  <line x1={cx - 3} y1={cy - 3} x2={cx + 3} y2={cy + 3} />
                  <line x1={cx + 3} y1={cy - 3} x2={cx - 3} y2={cy + 3} />
                </g>
              );
            })}
          {point ? (
            <circle {...toSvg(point)} r={4.2} fill={solved ? LEAF : INDIGO} stroke="#FBFAF7" strokeWidth={1.4} style={{ transition: 'cx 120ms ease-out, cy 120ms ease-out, fill 200ms' }} />
          ) : null}
        </svg>
      </Ring>
      <p id={ids.help} className="sr-only">
        Use the arrow keys to move the point and Enter to check your answer, or tap the grid.
      </p>

      <div className="mx-auto mt-2 max-w-[460px]">
        <p className="ink-label">Try one · Coordinates</p>
        <p id={ids.prompt} className="ink-title mt-1.5">
          Plot the point <span className="whitespace-nowrap tabular-nums">{label(target)}</span>.
        </p>

        <ol aria-label="Your tries" className="mt-3 flex min-h-9 flex-wrap gap-1.5">
          {attempts.length === 0 ? <li className="text-[0.9375rem] text-muted">Three tries close the ring. The wrong ones stay in it.</li> : null}
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

        <div aria-live="polite" className="mt-1">
          {solved ? (
            <p className="font-semibold text-leaf">
              You worked it out{' '}
              <span className="font-normal text-graphite tabular-nums">
                · {tries} {tries === 1 ? 'try' : 'tries'} · {hintsUsed} {hintsUsed === 1 ? 'hint' : 'hints'}
              </span>
            </p>
          ) : message ? (
            <p className="text-[0.9375rem] text-ink">{message}</p>
          ) : point ? (
            <p className="text-[0.9375rem] text-muted">
              Your point: <span className="tabular-nums text-ink">{label(point)}</span>
            </p>
          ) : null}
          {hintsUsed > 0 && !solved ? (
            <ul className="mt-2 space-y-1">
              {hints.slice(0, hintsUsed).map((h, i) => (
                <li key={i} className="text-[0.9375rem] text-graphite">
                  <span className="font-semibold text-ink">Hint {i + 1}.</span> {h}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {solved ? (
            <InkButton variant="secondary" onClick={next}>
              Try another
            </InkButton>
          ) : (
            <>
              <InkButton onClick={check} disabled={!point}>
                Check
              </InkButton>
              <InkButton variant="secondary" onClick={() => setHintsUsed((h) => Math.min(h + 1, hints.length))} disabled={hintsUsed >= hints.length}>
                {hintsUsed >= hints.length ? 'No more hints' : 'Hint'}
              </InkButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
