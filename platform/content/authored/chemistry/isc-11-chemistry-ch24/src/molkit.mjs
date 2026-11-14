// Molecule drawing kit (atoms + bonds graph, formula computed from the drawing, wedge/dash). Adapted from the CBSE 11 Chemistry ch08 SVG helpers.
import { S } from './lib.mjs';
export const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const f = (n) => Math.round(n * 10) / 10;
// ---------------------------------------------------------------- molecule model
export const VAL = { C: 4, N: 3, O: 2, S: 2, H: 1, F: 1, Cl: 1, Br: 1, I: 1 };
const SUB = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
const sub = (n) => String(n).split('').map((d) => SUB[Number(d)]).join('');

/** atoms: [{x, y, el = 'C', show, label, group}], bonds: [i, j, order = 1, style ('w' wedge, 'd' dash)]. Implicit H fill the valence. */
export function mol(atoms, bonds) {
  const A = atoms.map((a) => ({ el: 'C', ...a }));
  const used = A.map(() => 0);
  for (const [i, j, o = 1] of bonds) {
    used[i] += o;
    used[j] += o;
  }
  A.forEach((a, i) => {
    a.H = a.el === 'H' || a.group ? 0 : Math.max(0, VAL[a.el] - used[i]);
    a.over = !a.group && a.el !== 'H' && used[i] > VAL[a.el];
  });
  return { A, bonds };
}
/** Hill-order molecular formula of a drawing (a group atom, label only, contributes its cnt element counts). */
export function formula(m) {
  const cnt = {};
  for (const a of m.A) {
    if (a.group) {
      for (const [k, v] of Object.entries(a.cnt ?? {})) cnt[k] = (cnt[k] || 0) + v;
      continue;
    }
    cnt[a.el] = (cnt[a.el] || 0) + 1;
    if (a.H) cnt.H = (cnt.H || 0) + a.H;
  }
  const keys = Object.keys(cnt).sort((a, b) => (a === 'C' ? -1 : b === 'C' ? 1 : a === 'H' ? -1 : b === 'H' ? 1 : a.localeCompare(b)));
  return keys.map((k) => k + (cnt[k] > 1 ? cnt[k] : '')).join('');
}
export const labelOf = (a) => a.label ?? (a.el === 'C' && !a.show ? null : a.el + (a.H ? 'H' + (a.H > 1 ? sub(a.H) : '') : ''));
const cutOf = (a) => (labelOf(a) ? (a.group ? 3.4 * (labelOf(a) ?? '').length + 3 : (labelOf(a) ?? '').length > 2 ? 12 : 8) : 0);

/** Draws a molecule as bond-line / wedge-dash SVG fragment. */
export function drawMol(m, { sw = 1.6, ox = 0, oy = 0 } = {}) {
  const out = [];
  for (const [i, j, o = 1, st] of m.bonds) {
    const a = m.A[i];
    const b = m.A[j];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const L = Math.hypot(dx, dy);
    const ux = dx / L;
    const uy = dy / L;
    const px = -uy;
    const py = ux;
    const x1 = a.x + ox + ux * cutOf(a);
    const y1 = a.y + oy + uy * cutOf(a);
    const x2 = b.x + ox - ux * cutOf(b);
    const y2 = b.y + oy - uy * cutOf(b);
    if (st === 'w') {
      out.push(`<polygon points="${f(x1)},${f(y1)} ${f(x2 + px * 3.4)},${f(y2 + py * 3.4)} ${f(x2 - px * 3.4)},${f(y2 - py * 3.4)}" fill="currentColor" stroke="none"/>`);
    } else if (st === 'd') {
      for (let k = 1; k <= 6; k++) {
        const t = k / 6.5;
        const cx = x1 + (x2 - x1) * t;
        const cy = y1 + (y2 - y1) * t;
        const hw = 0.6 + t * 3;
        out.push(S.line(cx - px * hw, cy - py * hw, cx + px * hw, cy + py * hw, { w: 1.3 }));
      }
    } else {
      const offs = o === 1 ? [0] : o === 2 ? [-2.2, 2.2] : [-3.2, 0, 3.2];
      for (const off of offs) out.push(S.line(x1 + px * off, y1 + py * off, x2 + px * off, y2 + py * off, { w: sw }));
    }
  }
  for (const a of m.A) {
    const t = labelOf(a);
    if (t) out.push(lab(a.x + ox, a.y + oy + 4, t, { a: 'middle', size: 12 }));
  }
  return out.join('');
}
/** Zigzag chain of n atoms, bond length L, starting low (first atom lower than second). */
export const zig = (n, L = 26, x0 = 0, y0 = 0) => Array.from({ length: n }, (_, i) => ({ x: x0 + i * L * Math.cos(Math.PI / 6), y: y0 + (i % 2 === 0 ? L * Math.sin(Math.PI / 6) : 0) }));
export const chain = (n) => Array.from({ length: n - 1 }, (_, i) => [i, i + 1]);
export const hexagon = (cx, cy, r, start = -90) => Array.from({ length: 6 }, (_, k) => ({ x: cx + r * Math.cos(((start + 60 * k) * Math.PI) / 180), y: cy + r * Math.sin(((start + 60 * k) * Math.PI) / 180) }));
export const T = (pts, dx, dy) => pts.map((p) => ({ ...p, x: p.x + dx, y: p.y + dy }));

// curved arrows (quadratic Bézier), full or fish-hook (half head)
function curved(x1, y1, cx, cy, x2, y2, { c = 'currentColor', w = 1.5, half = false } = {}) {
  const ang = Math.atan2(y2 - cy, x2 - cx);
  const head = half
    ? S.line(x2, y2, x2 + 7 * Math.cos(ang + Math.PI - 0.5), y2 + 7 * Math.sin(ang + Math.PI - 0.5), { c, w })
    : S.head(x2, y2, ang, { size: 7, c });
  return S.path(`M${f(x1)} ${f(y1)} Q${f(cx)} ${f(cy)} ${f(x2)} ${f(y2)}`, { c, w }) + head;
}
const dot = (x, y, r = 2.2) => S.circle(x, y, r, { fill: 'currentColor', sw: 0.5 });

// ---------------------------------------------------------------- skeleton builders
const DX = 26 * Math.cos(Math.PI / 6);
const DY = 13;
/** Position of virtual chain atom k (may be -1 or n) for a zigzag with bond length 26 starting low. */
export const zpos = (k, x0, y0) => ({ x: x0 + k * DX, y: y0 + (k % 2 === 0 ? DY : 0) });
const asAtom = (spec, x, y) => (typeof spec === 'string' ? { x, y, el: spec } : { x, y, ...spec });
/**
 * Zigzag chain of n carbons with substituents. orders: {i: 2|3} = order of the bond between chain atoms i and i+1.
 * subs: [k, spec | [spec...], where, order] where 'p' (perpendicular, default), 't' (tail: beyond the last atom), 'h' (head: before atom 0);
 * spec is an element string or an atom object ({el, group, label, cnt}); an array continues the chain zigzag from the first atom.
 * The chain carbons are atoms 0..n-1.
 */
export function skel(n, subs = [], { orders = {}, x0 = 0, y0 = 0, chainEls = {} } = {}) {
  const atoms = zig(n, 26, x0, y0).map((p, i) => ({ ...p, ...(chainEls[i] ? { el: chainEls[i] } : {}) }));
  const bonds = chain(n).map(([i, j]) => [i, j, orders[i] ?? 1]);
  for (const [k, spec, where = 'p', order = 1] of subs) {
    const list = Array.isArray(spec) ? spec : [spec];
    let prev = k;
    let px;
    let py;
    if (where === 't') ({ x: px, y: py } = zpos(k + 1, x0, y0));
    else if (where === 'h') ({ x: px, y: py } = zpos(k - 1, x0, y0));
    else {
      const base = zpos(k, x0, y0);
      px = base.x;
      py = base.y + (k % 2 === 0 ? 26 : -26);
    }
    const down = where === 'p' ? k % 2 === 0 : where === 't' ? (k + 1) % 2 === 0 : (k - 1) % 2 === 0;
    list.forEach((sp, idx) => {
      atoms.push(asAtom(sp, px, py));
      bonds.push([prev, atoms.length - 1, idx === 0 ? order : 1]);
      prev = atoms.length - 1;
      px += DX;
      py += down ? DY : -DY;
    });
  }
  return mol(atoms, bonds);
}
/** Regular polygon ring of `sides` carbons (first at the top) with radial substituents: subs [k, spec | [spec...], order]. dbl: ring bonds k-(k+1) drawn double. */
export function ring(cx, cy, rad, sides, subs = [], { dbl = [], ringEls = {}, start = -90 } = {}) {
  const atoms = Array.from({ length: sides }, (_, k) => {
    const a = ((start + (360 / sides) * k) * Math.PI) / 180;
    return { x: cx + rad * Math.cos(a), y: cy + rad * Math.sin(a), ...(ringEls[k] ? { el: ringEls[k] } : {}) };
  });
  const bonds = atoms.map((_, k) => [k, (k + 1) % sides, dbl.includes(k) ? 2 : 1]);
  for (const [k, spec, order = 1] of subs) {
    const list = Array.isArray(spec) ? spec : [spec];
    let dir = ((start + (360 / sides) * k) * Math.PI) / 180;
    let px = atoms[k].x;
    let py = atoms[k].y;
    let prev = k;
    list.forEach((sp, idx) => {
      px += 26 * Math.cos(dir);
      py += 26 * Math.sin(dir);
      atoms.push(asAtom(sp, px, py));
      bonds.push([prev, atoms.length - 1, idx === 0 ? order : 1]);
      prev = atoms.length - 1;
      dir += (idx % 2 === 0 ? 1 : -1) * (Math.PI / 3);
    });
  }
  return mol(atoms, bonds);
}
export const benzene = (cx, cy, subs = [], rad = 26) => ring(cx, cy, rad, 6, subs, { dbl: [0, 2, 4] });
/** Number of carbons in the longest carbon-carbon chain (carbon atoms only, any bond order). */
export function longestChain(m) {
  const isC = (i) => m.A[i].el === 'C' && !m.A[i].group;
  const adj = m.A.map(() => []);
  for (const [i, j] of m.bonds) {
    if (isC(i) && isC(j)) {
      adj[i].push(j);
      adj[j].push(i);
    }
  }
  let best = 0;
  const go = (v, seen) => {
    best = Math.max(best, seen.size);
    for (const w of adj[v]) {
      if (!seen.has(w)) {
        seen.add(w);
        go(w, seen);
        seen.delete(w);
      }
    }
  };
  m.A.forEach((_, i) => isC(i) && go(i, new Set([i])));
  return best;
}
/** Small red locant numbers beside atoms: marks [[atomIndex, text, dx, dy]]. */
export const nums = (m, marks) => marks.map(([i, t, dx = 0, dy = 0]) => S.text(m.A[i].x + dx, m.A[i].y + dy, t, { size: 10, a: 'middle', c: 'var(--diagram-red)' })).join('');
export const bounds = (m) => ({ x0: Math.min(...m.A.map((a) => a.x)), x1: Math.max(...m.A.map((a) => a.x)), y0: Math.min(...m.A.map((a) => a.y)), y1: Math.max(...m.A.map((a) => a.y)) });
