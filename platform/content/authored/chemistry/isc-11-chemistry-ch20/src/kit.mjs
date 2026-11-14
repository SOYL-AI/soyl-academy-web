// ch20 drawing kit: labels, bonds, curly arrows (full and half-headed), lone-pair dots, energy-profile curves, and the shared self-check list.
import { S } from './lib.mjs';

export const SELF_CHECKS = [];
export const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
export const MUTED = 'var(--diagram-muted)';
export const RED = 'var(--diagram-red)';
export const BLUE = 'var(--diagram-blue)';
export const GREEN = 'var(--diagram-green)';
export const YEL = 'var(--diagram-yellow)';
export const BRN = 'var(--diagram-brown)';
export const ACC = 'var(--diagram-accent)';
export const FILL = 'var(--diagram-fill)';
const f1 = (n) => Math.round(n * 10) / 10;

export const t = (x, y, s, o) => S.text(x, y, s, { size: 12, ...o });
export const sm = (x, y, s, o) => S.text(x, y, s, { size: 10, ...o });
export const bond = (x1, y1, x2, y2, o = {}) => S.line(x1, y1, x2, y2, { w: 1.5, ...o });
/** Two small dots (a lone pair or a bonding pair). */
export const pair = (x, y, c = 'currentColor', horiz = true) => {
  const d = horiz ? [[-2.5, 0], [2.5, 0]] : [[0, -2.5], [0, 2.5]];
  return d.map(([dx, dy]) => S.circle(x + dx, y + dy, 1.4, { c, fill: c, sw: 0 })).join('');
};
export const dot = (x, y, c = 'currentColor') => S.circle(x, y, 1.6, { c, fill: c, sw: 0 });
/** Curly arrow: quadratic curve from (x1,y1) via control (cx,cy) to (x2,y2). half = single-barbed fish-hook head (one electron). */
export function curly(x1, y1, cx, cy, x2, y2, { c = BLUE, w = 1.4, half = false, size = 6, side = 1 } = {}) {
  const ang = Math.atan2(y2 - cy, x2 - cx);
  const path = S.path(`M${f1(x1)} ${f1(y1)} Q${f1(cx)} ${f1(cy)} ${f1(x2)} ${f1(y2)}`, { c, w });
  if (!half) return path + S.head(x2, y2, ang, { size, c });
  const a = ang + Math.PI - 0.55 * side;
  return path + S.line(x2, y2, x2 + size * 1.2 * Math.cos(a), y2 + size * 1.2 * Math.sin(a), { c, w });
}
/** Energy-profile polyline through points, smoothed with quadratic segments at the midpoints. */
export function smooth(pts, { c = 'currentColor', w = 2 } = {}) {
  let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2;
    const my = (pts[i][1] + pts[i + 1][1]) / 2;
    d += ` Q${f1(pts[i][0])} ${f1(pts[i][1])} ${f1(mx)} ${f1(my)}`;
  }
  const last = pts[pts.length - 1];
  d += ` L${f1(last[0])} ${f1(last[1])}`;
  return S.path(d, { c, w });
}
/** Laid-out row of coloured tokens (no spaces inside a token); returns { svg, end }. Width is estimated at 0.6 x font size per character. */
export function tokens(x, y, toks, { size = 12, gap = 7 } = {}) {
  let cx = x;
  const out = [];
  for (const [s, c, tight] of toks) {
    out.push(S.text(cx, y, s, { size, c: c ?? 'currentColor' }));
    cx += s.length * size * 0.6 + (tight ? 0 : gap);
  }
  return { svg: out.join(''), end: cx - gap };
}
