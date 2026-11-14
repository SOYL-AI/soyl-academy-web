import { BrushArt } from '@/components/brush/BrushArt';
import { stages } from '@/content/method';
import { cn } from '@/lib/utils';

/** Stations down a winding path, as fractions of the box (x, y). Build is lit. */
const STOPS: [number, number][] = [
  [0.26, 0.09],
  [0.66, 0.29],
  [0.3, 0.5],
  [0.68, 0.71],
  [0.34, 0.91],
];
const LIT = 1;

/**
 * The mission path (ADR-033): the five stages as places on a hand-painted path, the current one lit.
 * No counter, no percentage: stages are places, not progress. Decorative painting; the labels are real text.
 */
export function MissionPath({ className }: { className?: string }) {
  return (
    <div className={cn('relative mx-auto aspect-[4/5] w-full max-w-[400px]', className)}>
      <BrushArt
        art="path"
        options={{ stops: STOPS, pigments: stages.map((s) => s.ink), lit: LIT }}
        seed={14}
        stepMs={80}
        eager
        className="absolute inset-0"
      />
      <ol aria-label="The five stages of a mission" className="absolute inset-0">
        {stages.map((s, i) => {
          const [x, y] = STOPS[i];
          const right = x < 0.5;
          return (
            <li
              key={s.name}
              className="absolute"
              style={{
                left: `${x * 100}%`,
                top: `${y * 100}%`,
                transform: right ? 'translate(3rem, -50%)' : 'translate(calc(-100% - 3rem), -50%)',
                textAlign: right ? 'left' : 'right',
              }}
              aria-current={i === LIT ? 'step' : undefined}
            >
              <span className={cn('block font-serif leading-none tracking-[-0.015em]', i === LIT ? 'text-[1.9rem]' : 'text-[1.55rem]')}>{s.name}</span>
              <span className="hand block whitespace-nowrap text-[1rem] text-graphite">{s.method}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
