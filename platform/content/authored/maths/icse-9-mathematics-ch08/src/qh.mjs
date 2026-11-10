// Shared helpers for the ch08 files: working-line shorthands (exact checks) and re-exports of the geometry helpers.
import { steps, ARITH } from './work.mjs';
export { eqctx } from './work.mjs';
export * from './tri.mjs';

export const J = (lines) => lines.join('\n\n');
export const A = (lines, msg = '') => { const s = steps(ARITH, lines); return msg ? s.must(msg) : s; };
export const W = (ctx, lines) => steps(ctx, lines);
export const deg = (n) => `$${n}^\\circ$`;
export const RT = { right: true };
export const ARC = (n) => ({ arcs: n });
export const TK = (n) => ({ ticks: n });
