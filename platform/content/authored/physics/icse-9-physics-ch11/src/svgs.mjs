// SVG diagrams for ICSE 9 Physics ch11 Current Electricity: circuit symbols (named and lettered), a simple circuit with the
// direction of current and of electron flow, open and closed circuits, the Ohm's law circuit, free electrons in a metal,
// and the V-I graph. Circuit geometry is computed and self-checked.
import { svgDoc, S } from '../../icse-9-physics-ch01/src/lib.mjs';
import { READ, READ_V } from './calc.mjs';

const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const RED = 'var(--diagram-red)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const YEL = 'var(--diagram-yellow)';
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const bold = (x, y, s, o) => S.text(x, y, s, { size: 14, w: 'bold', c: RED, ...o });

// ---------------------------------------------------------------- circuit symbols
// Each symbol is drawn about the centre (x, y) with the wire running along `u`. `h`: u is the x direction; `v`: u is the y direction (downwards).
// Standard symbols: cell (long thin plate positive, short thick plate negative), battery (two cells), key (two terminals; closed joins them),
// bulb (circle with a cross), resistor (rectangle), rheostat (rectangle with an arrow through it), ammeter (A in a circle), voltmeter (V in a circle).
const HALF = { cell: 14, battery: 20, 'key-open': 22, 'key-closed': 22, bulb: 14, resistor: 20, rheostat: 22, ammeter: 14, voltmeter: 14 };
export function symbol(type, x, y, o = 'h') {
  const P = (u, v) => (o === 'h' ? [x + u, y + v] : [x + v, y + u]);
  const ln = (u1, v1, u2, v2, opt) => {
    const [a, b] = P(u1, v1);
    const [c, d] = P(u2, v2);
    return S.line(a, b, c, d, opt);
  };
  const h = HALF[type];
  const p = [];
  const lead = (a, b) => p.push(ln(-h, 0, a, 0), ln(b, 0, h, 0));
  if (type === 'cell') {
    lead(-3, 3);
    p.push(ln(-3, -11, -3, 11, { w: 1.8 }), ln(3, -6, 3, 6, { w: 4 }));
  } else if (type === 'battery') {
    lead(-9, 9);
    p.push(ln(-9, -11, -9, 11, { w: 1.8 }), ln(-3, -6, -3, 6, { w: 4 }), ln(3, -11, 3, 11, { w: 1.8 }), ln(9, -6, 9, 6, { w: 4 }));
    p.push(ln(-3, 0, 3, 0, { w: 1, dash: '2 2', c: MUT }));
  } else if (type === 'key-open' || type === 'key-closed') {
    lead(-10, 10);
    for (const u of [-10, 10]) {
      const [a, b] = P(u, 0);
      p.push(S.circle(a, b, 3, { fill: type === 'key-closed' ? 'currentColor' : 'none', sw: 1.6 }));
    }
    if (type === 'key-closed') p.push(ln(-10, 0, 10, 0, { w: 2.4 }));
  } else if (type === 'bulb') {
    lead(-11, 11);
    const [a, b] = P(0, 0);
    p.push(S.circle(a, b, 11, { sw: 1.8 }), ln(-7.8, -7.8, 7.8, 7.8, { w: 1.5 }), ln(-7.8, 7.8, 7.8, -7.8, { w: 1.5 }));
  } else if (type === 'resistor' || type === 'rheostat') {
    const w = type === 'resistor' ? 16 : 18;
    lead(-w, w);
    const pts = [P(-w, -6), P(w, -6), P(w, 6), P(-w, 6)];
    p.push(`<polygon points="${pts.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(' ')}" fill="none" stroke="currentColor" stroke-width="1.8"/>`);
    if (type === 'rheostat') {
      const [a1, b1] = P(-10, 12);
      const [a2, b2] = P(10, -12);
      p.push(S.arrow(a1, b1, a2, b2, { w: 1.6, size: 6 }));
    }
  } else {
    lead(-11, 11);
    const [a, b] = P(0, 0);
    p.push(S.circle(a, b, 11, { sw: 1.8 }), S.text(a, b + 4.5, type === 'ammeter' ? 'A' : 'V', { a: 'middle', size: 13, w: 'bold' }));
  }
  return p.join('');
}
const NAMES = {
  cell: 'cell',
  battery: 'battery',
  'key-open': 'key (open)',
  'key-closed': 'key (closed)',
  bulb: 'bulb',
  resistor: 'resistor',
  rheostat: 'rheostat',
  ammeter: 'ammeter',
  voltmeter: 'voltmeter',
};

function symbolSheet({ lettered }) {
  const kinds = lettered ? ['cell', 'key-closed', 'bulb', 'resistor', 'rheostat', 'ammeter'] : ['cell', 'battery', 'key-open', 'key-closed', 'bulb', 'resistor', 'rheostat', 'ammeter', 'voltmeter'];
  const cols = lettered ? 3 : 3;
  const cw = 150;
  const rh = 70;
  const p = [];
  kinds.forEach((k, i) => {
    const cx = 20 + (i % cols) * cw + 60;
    const cy = 36 + Math.floor(i / cols) * rh;
    p.push(symbol(k, cx, cy, 'h'));
    p.push(lettered ? bold(cx, cy + 36, 'ABCDEF'[i], { a: 'middle' }) : lab(cx, cy + 36, NAMES[k], { a: 'middle', size: 12 }));
  });
  if (!lettered) p.push(lab(23, 36 + 3 * rh - 4, 'cell: long thin plate is positive, short thick plate is negative', { size: 11, c: MUT }));
  const H = 36 + Math.ceil(kinds.length / cols) * rh + (lettered ? -8 : 14);
  return svgDoc(20 + cols * cw, H, lettered ? 'Six circuit symbols lettered A to F: A a cell, B a closed key, C a bulb, D a resistor, E a rheostat and F an ammeter' : 'Standard circuit symbols: cell, battery, open key, closed key, bulb, resistor, rheostat, ammeter and voltmeter', p.join(''));
}
export const SYMBOLS = symbolSheet({ lettered: false });
export const SYMBOLS_LET = symbolSheet({ lettered: true });

// ---------------------------------------------------------------- a rectangular circuit loop with components on its sides
/** side(x1, y1, x2, y2, comps): wire from (x1, y1) to (x2, y2), with components {t: fraction along the side, type} cut into it. */
function side(x1, y1, x2, y2, comps) {
  const horiz = Math.abs(y2 - y1) < 1e-9;
  const len = Math.hypot(x2 - x1, y2 - y1);
  const ux = (x2 - x1) / len;
  const uy = (y2 - y1) / len;
  const items = [...comps].sort((a, b) => a.t - b.t);
  const p = [];
  let cursor = 0;
  for (const c of items) {
    const centre = c.t * len;
    const half = HALF[c.type];
    if (centre - half < cursor - 1e-9) throw new Error(`components overlap on a side (${c.type})`);
    p.push(S.line(x1 + ux * cursor, y1 + uy * cursor, x1 + ux * (centre - half), y1 + uy * (centre - half)));
    p.push(symbol(c.type, x1 + ux * centre, y1 + uy * centre, horiz ? 'h' : 'v'));
    cursor = centre + half;
  }
  p.push(S.line(x1 + ux * cursor, y1 + uy * cursor, x2, y2));
  return p.join('');
}
/** Clockwise loop: top (left to right), right (down), bottom (right to left), left (up). `comps.<side>` positions run along that direction. */
function loop(L, T, R, B, comps) {
  return [side(L, T, R, T, comps.top ?? []), side(R, T, R, B, comps.right ?? []), side(R, B, L, B, comps.bottom ?? []), side(L, B, L, T, comps.left ?? [])].join('');
}

// ---------------------------------------------------------------- a simple circuit with the direction of current and of electron flow
function simpleCircuit({ lettered }) {
  const W = 440;
  const H = 270;
  const L = 80;
  const R = 360;
  const T = 70;
  const B = 200;
  const p = [];
  // clockwise: top left to right, right down, bottom right to left, left up. The cell sits on the left side with its long (positive) plate at the bottom end
  // of that side's travel direction (up), so the conventional current leaves the positive plate going up and round clockwise.
  p.push(loop(L, T, R, B, { top: [{ t: 0.5, type: 'key-closed' }], right: [{ t: 0.5, type: 'bulb' }], bottom: [{ t: 0.5, type: 'ammeter' }], left: [{ t: 0.5, type: 'cell' }] }));
  // the left side runs upwards (u points up), so symbol 'cell' u axis is up the wire: its first plate (long, positive) is the lower one.
  const names = [['cell', L + 14, (T + B) / 2 + 4, 'start'], ['key', (L + R) / 2, T - 16, 'middle'], ['bulb', R + 20, (T + B) / 2 + 4, 'start'], ['ammeter', (L + R) / 2, B + 30, 'middle']];
  if (lettered) {
    const letters = ['A', 'B', 'C', 'D'];
    names.forEach(([, x, y, a], i) => p.push(bold(x, y, letters[i], { a })));
  } else {
    for (const [n, x, y, a] of names) p.push(lab(x, y, n, { a, size: 12 }));
    // conventional current (red) clockwise outside the loop, electron flow (blue) anticlockwise inside the loop
    const mid = (L + R) / 2;
    p.push(S.arrow(mid - 70, T - 22, mid - 30, T - 22, { c: RED, w: 1.8, size: 7 }));
    p.push(S.arrow(R + 24, 100, R + 24, 130, { c: RED, w: 1.8, size: 7 }));
    p.push(S.arrow(mid + 70, B + 20, mid + 30, B + 20, { c: RED, w: 1.8, size: 7 }));
    p.push(S.arrow(L - 44, 160, L - 44, 120, { c: RED, w: 1.8, size: 7 }));
    p.push(lab(mid - 74, T - 28, 'conventional current', { a: 'end', size: 11, c: RED }));
    p.push(S.arrow(mid + 30, T + 22, mid - 30, T + 22, { c: BLUE, w: 1.8, size: 7, dash: '5 3' }));
    p.push(S.arrow(mid - 30, B - 22, mid + 30, B - 22, { c: BLUE, w: 1.8, size: 7, dash: '5 3' }));
    p.push(lab(mid, T + 40, 'electron flow', { a: 'middle', size: 11, c: BLUE }));
    p.push(lab(L - 14, (T + B) / 2 - 14, '+', { a: 'end', size: 14, w: 'bold' }), lab(L - 14, (T + B) / 2 + 26, '−', { a: 'end', size: 14, w: 'bold' }));
  }
  check(L < R && T < B, 'simple circuit: a closed rectangular loop with four components');
  return svgDoc(W, H, lettered ? 'A simple circuit with four components lettered: A a cell on the left side, B a closed key on the top, C a bulb on the right side and D an ammeter on the bottom' : 'A simple circuit: a cell, a closed key, a bulb and an ammeter in a loop. Red arrows show the conventional current going clockwise from the positive plate of the cell; blue dashed arrows show the electron flow the opposite way', p.join(''));
}
export const CIRCUIT = simpleCircuit({ lettered: false });
export const CIRCUIT_LET = simpleCircuit({ lettered: true });

// ---------------------------------------------------------------- open and closed circuits side by side
export const OPEN_CLOSED = (() => {
  const p = [];
  const panel = (ox, closed) => {
    const L = ox;
    const R = ox + 170;
    const T = 70;
    const B = 150;
    p.push(loop(L, T, R, B, { top: [{ t: 0.5, type: closed ? 'key-closed' : 'key-open' }], right: [{ t: 0.5, type: 'bulb' }], left: [{ t: 0.5, type: 'cell' }] }));
    if (closed) {
      const cx = R;
      const cy = (T + B) / 2;
      for (let k = 0; k < 8; k++) {
        const a = (k * Math.PI) / 4 + Math.PI / 8;
        p.push(S.line(cx + 16 * Math.cos(a), cy + 16 * Math.sin(a), cx + 25 * Math.cos(a), cy + 25 * Math.sin(a), { c: YEL, w: 2 }));
      }
      p.push(lab((L + R) / 2, B + 34, 'closed circuit: current flows, bulb glows', { a: 'middle', size: 12, w: 'bold' }));
      p.push(S.arrow((L + R) / 2 - 20, T - 20, (L + R) / 2 + 20, T - 20, { c: RED, w: 1.8, size: 7 }));
    } else {
      p.push(lab((L + R) / 2, B + 34, 'open circuit: no current, bulb off', { a: 'middle', size: 12, w: 'bold' }));
      p.push(lab((L + R) / 2, T - 18, 'gap in the key', { a: 'middle', size: 11, c: MUT }));
    }
  };
  panel(40, false);
  panel(300, true);
  check(true, 'open and closed circuits: same loop, key open in one and closed in the other');
  return svgDoc(540, 200, 'Two circuits with a cell, a key and a bulb. On the left the key is open, so the circuit is broken, there is no current and the bulb is off. On the right the key is closed, the circuit is complete, a current flows and the bulb glows', p.join(''));
})();

// ---------------------------------------------------------------- the Ohm's law circuit: battery, key, rheostat, ammeter, resistor with a voltmeter across it
export const OHM_CIRCUIT = (() => {
  const W = 500;
  const H = 260;
  const L = 60;
  const R = 340;
  const T = 70;
  const B = 190;
  const p = [];
  p.push(loop(L, T, R, B, { top: [{ t: 0.28, type: 'key-closed' }, { t: 0.72, type: 'rheostat' }], right: [{ t: 0.5, type: 'resistor' }], bottom: [{ t: 0.5, type: 'ammeter' }], left: [{ t: 0.5, type: 'battery' }] }));
  // voltmeter in parallel with the resistor: leads from both ends of the resistor (R, 130 +/- 16 ... ) round to a voltmeter on the right
  const cy = (T + B) / 2;
  const top = cy - 20;
  const bot = cy + 20;
  const vx = 430;
  p.push(S.line(R, top, vx, top), S.line(vx, top, vx, cy - 14), symbol('voltmeter', vx, cy, 'v'), S.line(vx, cy + 14, vx, bot), S.line(vx, bot, R, bot));
  p.push(S.circle(R, top, 2.6, { fill: 'currentColor' }), S.circle(R, bot, 2.6, { fill: 'currentColor' }));
  p.push(lab(L - 18, cy + 4, 'battery', { a: 'end', size: 12 }), lab(100 + 40, T - 18, 'key', { a: 'middle', size: 12 }), lab(L + (R - L) * 0.72, T - 18, 'rheostat', { a: 'middle', size: 12 }));
  p.push(lab((L + R) / 2, B + 30, 'ammeter (in series)', { a: 'middle', size: 12 }), lab(R - 12, cy + 4, 'R', { a: 'end', size: 13, w: 'bold' }), lab(vx + 20, cy + 4, 'voltmeter (across R)', { size: 12 }));
  check(vx > R && top < bot, "Ohm's law circuit: the voltmeter branch joins both ends of the resistor");
  return svgDoc(W + 70, H, "The circuit for verifying Ohm's law: a battery, a key and a rheostat in series with an ammeter and the resistor R, with a voltmeter joined across the resistor", p.join(''));
})();

// ---------------------------------------------------------------- free electrons in a metal: random motion, then drift when a battery is joined
function metalPanel(ox, drift, seed) {
  const p = [];
  let s = seed;
  const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32);
  const gx = 36;
  const gy = 34;
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) p.push(S.circle(ox + 24 + c * gx, 36 + r * gy, 9, { fill: FILL, sw: 1.4 }), lab(ox + 24 + c * gx, 36 + r * gy + 4, '+', { a: 'middle', size: 12, c: RED }));
  const n = 14;
  for (let i = 0; i < n; i++) {
    const x = ox + 14 + rnd() * 215;
    const y = 20 + rnd() * 120;
    const pts = [[x, y]];
    let a = rnd() * 2 * Math.PI;
    for (let k = 0; k < 3; k++) {
      a += (rnd() - 0.5) * 2.2;
      const step = 8 + rnd() * 8;
      const drift_x = drift ? 6 : 0;
      const [px, py] = pts[pts.length - 1];
      pts.push([Math.min(ox + 236, Math.max(ox + 8, px + step * Math.cos(a) + drift_x)), Math.min(150, Math.max(14, py + step * Math.sin(a)))]);
    }
    p.push(S.path(`M${pts.map(([a2, b]) => `${a2.toFixed(1)} ${b.toFixed(1)}`).join(' L')}`, { c: BLUE, w: 1, op: 0.7 }));
    p.push(S.circle(pts[0][0], pts[0][1], 2.8, { fill: BLUE, c: BLUE }));
  }
  if (drift) {
    p.push(S.arrow(ox + 30, 166, ox + 200, 166, { c: BLUE, w: 2, size: 7 }));
    p.push(lab(ox + 115, 182, 'net drift of electrons', { a: 'middle', size: 11, c: BLUE }));
    p.push(lab(ox + 22, 160, '−', { a: 'middle', size: 14, w: 'bold' }), lab(ox + 218, 160, '+', { a: 'middle', size: 14, w: 'bold' }));
  } else p.push(lab(ox + 120, 170, 'random motion, no net flow', { a: 'middle', size: 11, c: MUT }));
  return p.join('');
}
export const METAL = (() => {
  const p = [metalPanel(0, false, 11), metalPanel(270, true, 23)];
  p.push(lab(120, 12, 'no battery connected', { a: 'middle', size: 12, w: 'bold' }), lab(390, 12, 'battery connected', { a: 'middle', size: 12, w: 'bold' }));
  check(true, 'free electrons: fixed positive ions in a grid with moving electrons, random without a battery and drifting with one');
  return svgDoc(530, 190, 'Two pictures of a metal: fixed positive ions in rows with free electrons moving among them. With no battery the electrons move at random. With a battery connected they still move at random but also drift slowly towards the positive end', p.join(''));
})();

// ---------------------------------------------------------------- V-I graph for the coil of resistance 12 ohm (straight line through the origin)
function viGraph({ lettered }) {
  const W = 440;
  const H = 290;
  const L = 60;
  const R = 20;
  const T = 24;
  const B = 46;
  const pw = W - L - R;
  const ph = H - T - B;
  const xMax = 0.6;
  const yMax = 7;
  const x = (v) => L + (v / xMax) * pw;
  const y = (v) => T + ph - (v / yMax) * ph;
  const p = [];
  for (let v = 0; v <= xMax + 1e-9; v += 0.1) p.push(S.line(x(v), T, x(v), T + ph, { c: MUT, w: 0.5, dash: '2 3' }), lab(x(v), T + ph + 15, v.toFixed(1), { a: 'middle' }));
  for (let v = 0; v <= yMax; v += 1) p.push(S.line(L, y(v), L + pw, y(v), { c: MUT, w: 0.5, dash: '2 3' }), lab(L - 6, y(v) + 4, String(v), { a: 'end' }));
  p.push(S.arrow(L, T + ph, L + pw + 8, T + ph, { w: 1.6, size: 6 }), S.arrow(L, T + ph, L, T - 10, { w: 1.6, size: 6 }));
  p.push(lab(L + pw / 2, H - 6, 'current I (A)', { a: 'middle', size: 12, w: 'bold' }), lab(L + 4, 12, 'p.d. V (V)', { size: 12, w: 'bold' }));
  p.push(S.path(`M${x(0)} ${y(0)} L${x(0.58)} ${y(0.58 * READ.r)}`, { c: BLUE, w: 2.4 }));
  const names = ['P', 'Q', 'R', 'S', 'T'];
  READ.i.forEach((i, k) => {
    p.push(S.circle(x(i), y(READ_V[k]), 3.6, { fill: RED, c: RED }));
    if (lettered) p.push(bold(x(i) - 14, y(READ_V[k]) - 6, names[k], { a: 'end' }));
  });
  check(Math.abs(READ_V[2] / READ.i[2] - READ.r) < 1e-9 && READ_V.every((v, k) => Math.abs(v / READ.i[k] - READ.r) < 1e-9), 'V-I graph: every plotted point lies on the straight line through the origin of slope 12');
  return svgDoc(W, H, `p.d. in volts against current in amperes for a coil: five points at 0.1 A and 1.2 V, 0.2 A and 2.4 V, 0.3 A and 3.6 V, 0.4 A and 4.8 V, 0.5 A and 6.0 V lie on a straight line through the origin${lettered ? ', lettered P to T' : ''}`, p.join(''));
}
export const VI_GRAPH = viGraph({ lettered: false });
export const VI_GRAPH_LET = viGraph({ lettered: true });
