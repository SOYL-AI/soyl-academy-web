/**
 * Celebration visuals (lazy chunk): level up, badge earned, daily goal met, bonus credits. CSS and SVG only, no
 * dependency. Decorative and non-interactive (aria-hidden, pointer-events: none, never focused): the toast that
 * goes with each one says it in words. With reduced motion the card simply appears, without confetti or bounce.
 */
import { BadgeMedal } from '@/components/platform/ui/art/Art';
import { SvgTree } from '@/components/platform/ui/art/SvgTree';
import { circle as C, line as L, path as P } from '@/components/platform/ui/art/svg-tree';
import type { Celebration } from './events';
import s from './celebrate.module.css';

const STAR = P('M32 6l7.6 15.4 17 2.5-12.3 12 2.9 16.9L32 44.8l-15.2 8 2.9-16.9-12.3-12 17-2.5Z', 'var(--p-highlight)');
const TARGET = [C(32, 32, 24, 'var(--p-success)'), C(32, 32, 17, 'var(--p-surface)'), C(32, 32, 10, 'var(--p-success)'), L('M23 33l6 6 13-14', 'var(--p-surface)', 5)];
const SPARK = [C(32, 32, 24, 'var(--p-accent)'), P('M35 12L20 35h10l-3 17 17-24H33Z', 'var(--p-on-accent)')];

/** The headline shown on the card (also used by tests). */
export function celebrationTitle(c: Celebration): string {
  switch (c.kind) {
    case 'level':
      return `Level ${c.level}!`;
    case 'badge':
      return c.name;
    case 'goal':
      return 'Daily goal met!';
    case 'bonus':
      return `+${c.credits} AI credits`;
  }
}

/** 14 confetti pieces at fixed positions (deterministic: nothing random). */
const CONFETTI = Array.from({ length: 14 }, (_, i) => ({ x: (i * 37) % 100, d: (i % 5) * 60, hue: i % 4 }));

export function CelebrationView({ celebration: c }: { celebration: Celebration }) {
  return (
    <div className={s.layer} aria-hidden="true" data-testid="celebration" data-kind={c.kind}>
      <div className={s.confetti}>
        {CONFETTI.map((p, i) => (
          <i key={i} style={{ left: `${p.x}%`, animationDelay: `${p.d}ms` }} data-hue={p.hue} />
        ))}
      </div>
      <div className={s.card}>
        <span className={s.art}>
          {c.kind === 'badge' ? (
            <BadgeMedal badge={c.badge} size={64} decorative />
          ) : (
            <SvgTree nodes={c.kind === 'level' ? [STAR] : c.kind === 'goal' ? TARGET : SPARK} size={56} />
          )}
          {c.kind === 'level' && <b className={s.level}>{c.level}</b>}
        </span>
        <span className={s.text}>
          <span className={s.kicker}>{c.kind === 'badge' ? 'Badge earned' : c.kind === 'level' ? 'Level up' : c.kind === 'goal' ? 'Practice goal' : 'Bonus'}</span>
          <span className={s.title}>{celebrationTitle(c)}</span>
          {c.kind === 'goal' && c.credits > 0 && <span className={s.sub}>+{c.credits} AI credits for today</span>}
        </span>
      </div>
    </div>
  );
}
