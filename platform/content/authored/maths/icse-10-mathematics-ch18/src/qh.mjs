// Shared helpers for the ch15 question files: exact-fraction shorthands, the multiple-choice builder (the key letter is
// fixed, the options are re-ordered around it, and the check recomputes the right value and requires exactly one option
// to carry it), and rounding to the precision of a drawing.
import { Fr } from './fr.mjs';
import { steps, ARITH } from './work.mjs';
import { Q, mk } from './lib.mjs';

export const J = (lines) => lines.join('\n\n');
export const A = (lines) => steps(ARITH, lines);
export const W = (ctx, lines) => steps(ctx, lines);
export const fr = (v) => Fr.of(v);
export const rat = (a, b) => fr(a).div(fr(b));
/** Number to a fixed number of decimals, as a string (no trailing zeros dropped). */
export const f1 = (v) => (Math.round(v * 10 + 1e-9) / 10).toFixed(1);
export const f2 = (v) => (Math.round(v * 100 + 1e-9) / 100).toFixed(2);

/**
 * MC(id, { stem, right: {t, v}, wrong: [{t, v}, ...], key, sol, d, c, t, time }, target, more)
 * The right option is placed at the letter `key`; `more(C)` runs extra assertions; the check requires `target` to match
 * exactly one option value (numbers within 1e-9, strings and arrays exactly) and that option to be the key.
 */
export function MC(id, o, target, more = () => {}) {
  const opts = o.wrong.slice();
  opts.splice('abcd'.indexOf(o.key), 0, o.right);
  must4(opts.length === 4, `${id}: four options`);
  Q(id, mk.mcq({ stem: o.stem, opts: opts.map((x) => x.t), key: o.key, sol: o.sol, d: o.d, c: o.c, t: o.t, time: o.time ?? 60 }), (C) => { more(C); C.which(opts.map((x) => x.v), target); });
}
function must4(c, m) { if (!c) throw new Error(m); }
