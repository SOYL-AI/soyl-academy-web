'use client';

import './teachers.css';
import { useState, type CSSProperties } from 'react';

/**
 * Monday 8:10 am (/teachers): thirty pupils, painted as dabs, scattered across the field; as the scene scrolls they
 * sort themselves into groups by what they think (`--t`, derived from the scene's `--p` in teachers.css). Picking a
 * group (or hovering it) fades the others back. Under reduced motion the class is already grouped. An example.
 */

type G = 'a' | 'b' | 'c' | 'd';

export const GROUPS: { g: G; count: number; name: string; move: string; colour: string; ox: number; oy: number }[] = [
  { g: 'a', count: 9, name: 'Mixes up power and energy', move: 'A 10-minute simulator demo, then one check question.', colour: 'var(--color-vermilion)', ox: 4, oy: 4 },
  { g: 'b', count: 5, name: 'Thinks current is used up in a bulb', move: 'A short Fix mission on series circuits.', colour: 'var(--color-ultramarine)', ox: 53, oy: 4 },
  { g: 'c', count: 2, name: 'Needs you', move: 'Stuck after three tries. Ten minutes with you.', colour: 'var(--color-ochre)', ox: 4, oy: 54 },
  { g: 'd', count: 14, name: 'Secure on every outcome', move: 'Nothing to fix. A harder case if they want one.', colour: 'var(--color-sap)', ox: 53, oy: 54 },
];

/** A small seeded random, so the scatter is the same on the server and in the browser. */
function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const DOTS = (() => {
  const r = rand(20261114);
  const out: { g: G; sx: number; sy: number; gx: number; gy: number; rot: number }[] = [];
  for (const grp of GROUPS) {
    for (let i = 0; i < grp.count; i++) {
      const col = i % 5;
      const row = Math.floor(i / 5);
      out.push({
        g: grp.g,
        sx: 3 + r() * 90,
        sy: 4 + r() * 86,
        gx: grp.ox + 1 + col * 7,
        gy: grp.oy + 20 + row * 8.5,
        rot: Math.round(r() * 90),
      });
    }
  }
  return out;
})();

export function MondayField() {
  const [pick, setPick] = useState<G | null>(null);

  return (
    <div className="mon-field h-full w-full" data-pick={pick ?? undefined}>
      {DOTS.map((d, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="mon-dot"
          data-g={d.g}
          style={
            {
              '--sx': d.sx,
              '--sy': d.sy,
              '--gx': d.gx,
              '--gy': d.gy,
              '--r': `${d.rot}deg`,
              '--c': GROUPS.find((g) => g.g === d.g)!.colour,
            } as CSSProperties
          }
        />
      ))}

      {GROUPS.map((g) => (
        <button
          key={g.g}
          type="button"
          data-at="2"
          data-g={g.g}
          aria-pressed={pick === g.g}
          onClick={() => setPick(pick === g.g ? null : g.g)}
          className="mon-label rounded-[8px] px-2 py-1.5 text-left transition-colors hover:bg-white/70 md:px-2.5"
          style={{ '--ox': g.ox, '--oy': g.oy } as CSSProperties}
        >
          <span className="flex items-baseline gap-2">
            <span className="t-num shrink-0 font-serif text-[1.2rem] italic leading-none md:text-[1.6rem]" style={{ color: g.g === 'c' ? '#8a6410' : g.g === 'd' ? 'var(--color-sap)' : g.g === 'a' ? 'var(--color-vermilion-ink)' : 'var(--color-ultramarine)' }}>
              {g.count}
            </span>
            <span className="text-[0.8rem] font-semibold leading-tight md:text-[0.95rem]">{g.name}</span>
          </span>
          <span className="mt-1 hidden text-[0.85rem] leading-snug text-graphite md:block">{g.move}</span>
        </button>
      ))}
    </div>
  );
}
