// Shared helpers for the ch16 files: working-line shorthands and a helper for sides produced to meet.
import { steps, ARITH } from './work.mjs';
import { cfg, must, near, lerp, meet, dist, onC } from './cyc.mjs';

export const J = (lines) => lines.join('\n\n');
export const A = (lines) => steps(ARITH, lines);
export const W = (ctx, lines) => steps(ctx, lines);
export { cfg, must, near, lerp, meet, dist, onC };

/** E, the meeting point of lines A1B1 and D1C1, which must lie beyond B1 and beyond C1 (parameter > 1 from A1 and from D1). */
export function producedMeet(g, A1, B1, D1, C1) {
  const E = meet(g.W[A1], g.W[B1], g.W[D1], g.W[C1]);
  const t = (P, Q) => ((E[0] - g.W[P][0]) * (g.W[Q][0] - g.W[P][0]) + (E[1] - g.W[P][1]) * (g.W[Q][1] - g.W[P][1])) / (dist(g.W[P], g.W[Q]) ** 2);
  must(t(A1, B1) > 1 && t(D1, C1) > 1, 'the sides meet beyond B and C');
  return E;
}
