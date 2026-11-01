// ICSE 10 Physics ch09 diagrams (allow-listed elements, palette colours only). Circuits are drawn through the same small
// netlist kit as ch08 (wires and parts registered as drawn, joined into nodes, checked for loose ends, solved by nodal
// analysis; the 220 V mains is treated as a steady source of its r.m.s. value for power calculations). SELF_CHECKS (read
// by build.mjs) assert the printed currents, powers and fault currents, that the switch and fuse sit in the live wire (the
// appliance is at 0 V when switched off), the two-way switch truth table, the plug pin sizes and the ring-main geometry.
import { svgDoc, S } from './lib.mjs';

const ACC = 'var(--diagram-accent)';
const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const BROWN = 'var(--diagram-brown)';
const GREEN = 'var(--diagram-green)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const close = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(a), Math.abs(b));
const fmt = (x) => String(Number(x.toPrecision(3)));

// ---------------------------------------------------------------- circuit kit
const pk = (p) => `${Math.round(p[0] * 10) / 10},${Math.round(p[1] * 10) / 10}`;
const SHORT = 1e-6; // ohms: ideal ammeter, closed key, fuse
const SRC = new Set(['cell', 'battery', 'ac']);

/** Draws one part between terminals a and b (axis-aligned); returns the SVG fragment. */
function drawPart(kind, a, b, o) {
  const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const u = [(b[0] - a[0]) / L, (b[1] - a[1]) / L];
  const n = [-u[1], u[0]];
  const P = (s, t) => [a[0] + u[0] * s + n[0] * t, a[1] + u[1] * s + n[1] * t];
  const seg = (s1, t1, s2, t2, opt = {}) => S.line(...P(s1, t1), ...P(s2, t2), { w: 1.6, ...opt });
  const poly = (pts, opt) => S.path(`M${pts.map((p) => P(...p).map((v) => Math.round(v * 10) / 10).join(' ')).join(' L')} Z`, opt);
  const m = L / 2;
  const c = P(m, 0);
  let s = '';
  if (kind === 'R' || kind === 'rheo') {
    s += seg(0, 0, m - 20, 0) + seg(m + 20, 0, L, 0) + poly([[m - 20, -7], [m + 20, -7], [m + 20, 7], [m - 20, 7]], { fill: FILL, fop: 0.7, w: 1.5 });
    if (kind === 'rheo') {
      const p1 = P(m - 24, 13);
      const p2 = P(m + 24, -13);
      s += S.arrow(p1[0], p1[1], p2[0], p2[1], { c: ACC, w: 1.4, size: 6 });
    }
  } else if (kind === 'cell' || kind === 'battery') {
    const plates = kind === 'cell' ? [-4] : [-12, 4];
    const lo = m + plates[0];
    const hi = m + plates[plates.length - 1] + 8;
    s += seg(0, 0, lo, 0) + seg(hi, 0, L, 0);
    for (const p of plates) s += seg(m + p, -14, m + p, 14, { w: 1.6 }) + seg(m + p + 8, -7, m + p + 8, 7, { w: 3.6 });
    if (kind === 'battery') s += seg(m - 4, 0, m + 4, 0, { w: 1.2, dash: '2 2' });
    const plus = P(lo - 7, -16);
    s += S.text(plus[0], plus[1], '+', { a: 'middle', size: 12, w: 'bold', c: RED });
  } else if (kind === 'A' || kind === 'V') {
    s += seg(0, 0, m - 12, 0) + seg(m + 12, 0, L, 0) + S.circle(c[0], c[1], 12, { fill: FILL, fop: 0.5, sw: 1.6, c: kind === 'A' ? BLUE : GREEN });
    s += S.text(c[0], c[1] + 4.5, kind, { a: 'middle', size: 13, w: 'bold', c: kind === 'A' ? BLUE : GREEN });
  } else if (kind === 'key') {
    const t1 = P(m - 12, 0);
    const t2 = P(m + 12, 0);
    const tip = o.open ? P(m + 10, -12) : P(m + 12, -2.5);
    s += seg(0, 0, m - 12, 0) + seg(m + 12, 0, L, 0) + S.line(t1[0], t1[1], tip[0], tip[1], { w: 1.8 });
    s += S.circle(t1[0], t1[1], 2.6, { fill: 'currentColor', sw: 0 }) + S.circle(t2[0], t2[1], 2.6, { fill: 'currentColor', sw: 0 });
  } else if (kind === 'ac') {
    s += seg(0, 0, m - 13, 0) + seg(m + 13, 0, L, 0) + S.circle(c[0], c[1], 13, { fill: FILL, fop: 0.5, sw: 1.6 });
    const w0 = P(m, -8);
    const w1 = P(m, 8);
    const mid = P(m, 0);
    s += S.path(`M${w0[0] - 7} ${mid[1]} Q ${mid[0] - 3.5} ${mid[1] - 9} ${mid[0]} ${mid[1]} T ${mid[0] + 7} ${mid[1]}`, { w: 1.5 });
    void w1;
  } else if (kind === 'fuse') {
    s += seg(0, 0, m - 14, 0) + seg(m + 14, 0, L, 0) + poly([[m - 14, -5], [m + 14, -5], [m + 14, 5], [m - 14, 5]], { fill: FILL, fop: 0.8, w: 1.4 }) + seg(m - 14, 0, m + 14, 0, { w: 1 });
  } else if (kind === 'lamp') {
    const d = 10 / Math.SQRT2;
    s += seg(0, 0, m - 10, 0) + seg(m + 10, 0, L, 0) + S.circle(c[0], c[1], 10, { fill: 'var(--diagram-yellow)', fop: o.lit ? 0.6 : 0, sw: 1.5 });
    s += S.line(c[0] - d, c[1] - d, c[0] + d, c[1] + d, { w: 1.2 }) + S.line(c[0] - d, c[1] + d, c[0] + d, c[1] - d, { w: 1.2 });
  } else throw new Error(`unknown part ${kind}`);
  if (o.label) {
    const [dx, dy, anchor] = o.lo ?? (Math.abs(u[0]) > 0.5 ? [0, -18, 'middle'] : [18, 4, 'start']);
    s += lab(c[0] + dx, c[1] + dy, o.label, { a: anchor, size: o.size ?? 11, c: o.lc ?? 'currentColor' });
  }
  return s;
}

/** Gaussian elimination with partial pivoting (small dense systems). */
function solveLinear(A, bvec) {
  const n = bvec.length;
  const M = A.map((row, i) => [...row, bvec[i]]);
  for (let k = 0; k < n; k++) {
    let p = k;
    for (let i = k + 1; i < n; i++) if (Math.abs(M[i][k]) > Math.abs(M[p][k])) p = i;
    [M[k], M[p]] = [M[p], M[k]];
    for (let i = k + 1; i < n; i++) {
      const f = M[i][k] / M[k][k];
      for (let j = k; j <= n; j++) M[i][j] -= f * M[k][j];
    }
  }
  const x = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let s = M[i][n];
    for (let j = i + 1; j < n; j++) s -= M[i][j] * x[j];
    x[i] = s / M[i][i];
  }
  return x;
}

function circuit() {
  const wires = [];
  const parts = [];
  let s = '';
  const api = {
    wire(...args) {
      const col = typeof args[0] === 'string' ? args.shift() : 'currentColor';
      const pts = args;
      for (let i = 0; i + 1 < pts.length; i++) wires.push([pts[i], pts[i + 1]]);
      s += S.path(`M${pts.map((p) => `${p[0]} ${p[1]}`).join(' L')}`, { w: 1.6, join: 'round', c: col });
      return api;
    },
    part(kind, name, a, b, o = {}) {
      const p = { kind, name, a, b, ...o };
      parts.push(p);
      s += drawPart(kind, a, b, o);
      return api;
    },
    dot(...ps) {
      for (const p of ps) s += S.circle(p[0], p[1], 2.8, { fill: 'currentColor', sw: 0 });
      return api;
    },
    add(frag) {
      s += frag;
      return api;
    },
    get body() {
      return s;
    },
    /** Topology + nodal analysis. Returns helpers for self-checks. */
    solve() {
      const pts = new Map();
      const uses = new Map();
      const reg = (p) => {
        pts.set(pk(p), p);
        uses.set(pk(p), (uses.get(pk(p)) ?? 0) + 1);
      };
      for (const [p, q] of wires) reg(p), reg(q);
      for (const p of parts) reg(p.a), reg(p.b);
      const parent = new Map([...pts.keys()].map((k) => [k, k]));
      const find = (k) => {
        while (parent.get(k) !== k) k = parent.get(k);
        return k;
      };
      const union = (a, b) => parent.set(find(a), find(b));
      const interior = (p, [a, b]) => {
        const cross = (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]);
        const dot = (p[0] - a[0]) * (b[0] - a[0]) + (p[1] - a[1]) * (b[1] - a[1]);
        const len2 = (b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2;
        return Math.abs(cross) < 1e-6 && dot > 1e-6 && dot < len2 - 1e-6;
      };
      for (const w of wires) {
        union(pk(w[0]), pk(w[1]));
        for (const [k, p] of pts) if (interior(p, w)) union(k, pk(w[0]));
      }
      const loose = [...pts].filter(([k, p]) => uses.get(k) < 2 && !wires.some((w) => interior(p, w))).map(([k]) => k);
      const node = (p) => find(pk(p));
      // Nodal analysis: voltmeters are open circuits; ammeters and closed keys are near-zero resistances; a cell is a
      // Norton source (E / r into its + terminal, in parallel with r).
      const src = parts.find((p) => SRC.has(p.kind));
      const posOf = (p) => (p.flip ? p.b : p.a);
      const negOf = (p) => (p.flip ? p.a : p.b);
      const ground = node(negOf(src));
      const ids = [...new Set(parts.flatMap((p) => [node(p.a), node(p.b)]))].filter((k) => k !== ground);
      const idx = new Map(ids.map((k, i) => [k, i]));
      const G = ids.map(() => ids.map(() => 0));
      const I = ids.map(() => 0);
      const stamp = (a, b, g) => {
        const i = idx.get(a);
        const j = idx.get(b);
        if (i !== undefined) G[i][i] += g;
        if (j !== undefined) G[j][j] += g;
        if (i !== undefined && j !== undefined) {
          G[i][j] -= g;
          G[j][i] -= g;
        }
      };
      const cond = (p) => {
        if (p.kind === 'V' || (p.kind === 'key' && p.open)) return 0;
        if (p.kind === 'A' || p.kind === 'key' || p.kind === 'fuse') return 1 / SHORT;
        if (SRC.has(p.kind)) return 1 / (p.r || SHORT);
        return 1 / p.R;
      };
      for (const p of parts) {
        const g = cond(p);
        if (g) stamp(node(p.a), node(p.b), g);
        if (SRC.has(p.kind)) {
          const is = p.E * g;
          const ip = idx.get(node(posOf(p)));
          const iq = idx.get(node(negOf(p)));
          if (ip !== undefined) I[ip] += is;
          if (iq !== undefined) I[iq] -= is;
        }
      }
      const x = solveLinear(G, I);
      const V = (p) => (node(p) === ground ? 0 : x[idx.get(node(p))]);
      const byName = (nm) => parts.find((p) => p.name === nm);
      const current = (nm) => {
        const p = byName(nm);
        if (SRC.has(p.kind)) return (p.E - (V(posOf(p)) - V(negOf(p)))) * cond(p);
        return (V(p.a) - V(p.b)) * cond(p);
      };
      const across = (nm) => {
        const p = byName(nm);
        return Math.abs(V(p.a) - V(p.b));
      };
      const sameNodes = (n1, n2) => {
        const p = byName(n1);
        const q = byName(n2);
        const A = [node(p.a), node(p.b)].sort().join('|');
        const B = [node(q.a), node(q.b)].sort().join('|');
        return A === B;
      };
      return { loose, current, across, sameNodes, volt: V, srcName: src.name };
    },
  };
  return api;
}


// ---------------------------------------------------------------- 1. from the pole to the circuits of a house
export const HOUSE = (() => {
  const yL = 60;
  const yN = 100;
  const yE = 150;
  let s = '';
  s += S.line(62, yL, 300, yL, { c: BROWN, w: 2.2 }) + S.line(62, yN, 300, yN, { c: BLUE, w: 2.2 });
  s += S.rect(14, 34, 46, 92, { fill: FILL, fop: 1, rx: 4 }) + lab(37, 140, 'pole', { a: 'middle', size: 10 }) + lab(37, 154, '220 V, 50 Hz', { a: 'middle', size: 10 });
  const fuse = { x: 76, y: yL - 7, w: 40, h: 14 };
  s += S.rect(fuse.x, fuse.y, fuse.w, fuse.h, { fill: FILL, fop: 1 }) + S.line(fuse.x, yL, fuse.x + fuse.w, yL, { w: 1 });
  s += lab(96, 40, 'company fuse', { a: 'middle', size: 10 }) + lab(96, 84, '(live only)', { a: 'middle', size: 10, c: MUT });
  const meter = { x: 134, y: 42, w: 58, h: 76 };
  s += S.rect(meter.x, meter.y, meter.w, meter.h, { fill: FILL, fop: 1, rx: 4 }) + lab(163, 78, 'kWh', { a: 'middle', size: 11, w: 'bold' }) + lab(163, 92, 'meter', { a: 'middle', size: 10 });
  const sw = { x: 208, y: 42, w: 62, h: 76 };
  s += S.rect(sw.x, sw.y, sw.w, sw.h, { fill: FILL, fop: 1, rx: 4 });
  for (const y of [yL, yN]) s += S.line(sw.x, y, sw.x + 18, y, { w: 1.6 }) + S.line(sw.x + 18, y, sw.x + 40, y - 9, { w: 1.6 }) + S.line(sw.x + 44, y, sw.x + sw.w, y, { w: 1.6 }) + S.circle(sw.x + 18, y, 2.4, { fill: 'currentColor', sw: 0 }) + S.circle(sw.x + 44, y, 2.4, { fill: 'currentColor', sw: 0 });
  s += lab(239, 34, 'main switch', { a: 'middle', size: 10 }) + lab(239, 132, '(double pole)', { a: 'middle', size: 10, c: MUT });
  const board = { x: 300, y: 36, w: 62, h: 128 };
  s += S.rect(board.x, board.y, board.w, board.h, { fill: FILL, fop: 1, rx: 4 }) + lab(331, 90, 'distri-', { a: 'middle', size: 10 }) + lab(331, 103, 'bution', { a: 'middle', size: 10 }) + lab(331, 116, 'board', { a: 'middle', size: 10 });
  s += S.line(331, yE + 14, 331, 200, { c: GREEN, w: 2.2 }) + S.rect(306, 200, 50, 8, { fill: GREEN, fop: 0.4, c: GREEN }) + lab(366, 210, 'earth plate (buried)', { size: 10, c: GREEN });
  const outs = [['lighting circuit: 5 A fuse or MCB', 62], ['power circuit: 15 A fuse or MCB', 100], ['ring main: 30 A fuse or MCB', 138]];
  outs.forEach(([t, y], i) => (s += S.arrow(board.x + board.w, y, board.x + board.w + 22, y, { size: 6 }) + lab(board.x + board.w + 28, y + 4, `circuit ${i + 1}`, { size: 10 }) + lab(14, 196 + i * 14, `${i + 1}. ${t}`, { size: 10 })));
  s += lab(14, 14, 'L live (brown)', { size: 10, c: BROWN }) + lab(110, 14, 'N neutral (light blue)', { size: 10, c: BLUE }) + lab(250, 14, 'E earth (green)', { size: 10, c: GREEN });
  const fuseOnLiveOnly = fuse.y < yL && fuse.y + fuse.h > yL && !(fuse.y < yN && fuse.y + fuse.h > yN);
  const switchBreaksBoth = sw.y < yL && sw.y + sw.h > yN;
  check(fuseOnLiveOnly && switchBreaksBoth, 'house wiring: the company fuse box sits across the live line only, and the main switch box spans both the live and the neutral lines (double pole)');
  return svgDoc(460, 244, 'Supply from the pole to a house. The live and neutral wires pass through the company fuse, which is in the live wire only, then the kilowatt hour meter, then a double pole main switch that breaks both wires, and reach the distribution board. The board is earthed to a buried earth plate and feeds a five ampere lighting circuit, a fifteen ampere power circuit and a thirty ampere ring main.', s);
})();

// ---------------------------------------------------------------- 2. switch and fuse in the live wire
// 880 W toaster on 220 V: R = 220² / 880 = 55 ohms, I = 4 A; fuse 5 A.
const TOASTER = { P: 880, V: 220 };
const Rt = TOASTER.V ** 2 / TOASTER.P;
function toasterCircuit({ open = false, switchInNeutral = false } = {}) {
  const c = circuit();
  c.part('ac', 'mains', [40, 60], [40, 180], { E: TOASTER.V, label: 'mains 220 V', lo: [0, 78, 'middle'] });
  if (!switchInNeutral) {
    c.wire(BROWN, [40, 60], [80, 60]).part('fuse', 'F', [80, 60], [140, 60], { label: 'fuse (5 A)', lo: [0, -14, 'middle'] }).wire(BROWN, [140, 60], [170, 60]);
    c.part('key', 'S', [170, 60], [230, 60], { open, label: open ? 'switch (off)' : 'switch (on)', lo: [0, -16, 'middle'] }).wire(BROWN, [230, 60], [300, 60], [300, 90]);
    c.part('R', 'T', [300, 90], [300, 150], { R: Rt, label: 'element 55 Ω', lo: [-36, 4, 'end'] }).wire(BLUE, [300, 150], [300, 180], [40, 180]);
  } else {
    c.wire(BROWN, [40, 60], [80, 60]).part('fuse', 'F', [80, 60], [140, 60], {}).wire(BROWN, [140, 60], [300, 60], [300, 90]);
    c.part('R', 'T', [300, 90], [300, 150], { R: Rt }).wire(BLUE, [300, 150], [300, 180], [230, 180]).part('key', 'S', [170, 180], [230, 180], { open }).wire(BLUE, [170, 180], [40, 180]);
  }
  return c;
}
export const SWITCH_FUSE = (() => {
  const on = toasterCircuit().solve();
  const off = toasterCircuit({ open: true }).solve();
  const wrong = toasterCircuit({ open: true, switchInNeutral: true }).solve();
  const I = TOASTER.P / TOASTER.V;
  check(on.loose.length === 0 && off.loose.length === 0 && wrong.loose.length === 0, 'switch and fuse: no loose wire ends in any of the three wirings');
  check(close(Rt, 55) && close(on.current('T'), I, 1e-4) && close(on.current('T') ** 2 * Rt, TOASTER.P, 1e-3), `switch and fuse: R = V²/P = ${fmt(Rt)} ohms; nodal analysis gives I = ${fmt(on.current('T'))} A and P = I²R = 880 W`);
  const vOff = Math.max(Math.abs(off.volt([300, 90])), Math.abs(off.volt([300, 150])));
  const vWrong = Math.min(Math.abs(wrong.volt([300, 90])), Math.abs(wrong.volt([300, 150])));
  check(vOff < 1e-6 && close(vWrong, 220, 1e-4), `switch and fuse: switched off with the switch in the live wire the element is at ${fmt(vOff + 0)} V; with the switch in the neutral it would stay at ${fmt(vWrong)} V`);
  check(I < 5, 'switch and fuse: the normal current 4 A is just below the 5 A fuse rating');
  const c = toasterCircuit();
  c.add(S.rect(270, 76, 60, 88, { dash: '4 3', c: MUT, sw: 1.2 }) + lab(336, 82, 'metal body', { size: 10, c: MUT }));
  c.add(S.line(330, 120, 380, 120, { c: GREEN, w: 2, dash: '6 3' }) + S.line(380, 120, 380, 200, { c: GREEN, w: 2, dash: '6 3' }) + S.rect(360, 200, 40, 7, { fill: GREEN, fop: 0.4, c: GREEN }) + lab(386, 160, 'earth', { size: 10, c: GREEN }));
  c.add(lab(240, 52, 'L live (brown)', { size: 10, c: BROWN }) + lab(170, 198, 'N neutral (light blue)', { a: 'middle', size: 10, c: BLUE }));
  c.add(lab(210, 226, `880 W toaster: I = 880 ÷ 220 = ${fmt(I)} A; switch off: element at 0 V`, { a: 'middle', size: 11, c: ACC }));
  return svgDoc(420, 240, 'A toaster connected to the two hundred and twenty volt mains. A five ampere fuse and the switch are both in the live wire, before the heating element of fifty five ohms; the neutral wire returns from the element. The metal body is joined to the earth wire. The toaster draws four amperes, and when the switch is off the element is cut off from the live wire.', c.body);
})();

// ---------------------------------------------------------------- 3. ring main
export const RING_MAIN = (() => {
  const ring = [[90, 100], [130, 100], [130, 30], [410, 30], [410, 200], [130, 200], [130, 136], [90, 136]];
  const onRing = (p) => ring.slice(1).some((q, i) => {
    const a = ring[i];
    const cross = (q[0] - a[0]) * (p[1] - a[1]) - (q[1] - a[1]) * (p[0] - a[0]);
    const inside = Math.min(a[0], q[0]) - 1e-9 <= p[0] && p[0] <= Math.max(a[0], q[0]) + 1e-9 && Math.min(a[1], q[1]) - 1e-9 <= p[1] && p[1] <= Math.max(a[1], q[1]) + 1e-9;
    return Math.abs(cross) < 1e-6 && inside;
  });
  let s = S.path(`M${ring.map((p) => p.join(' ')).join(' L')}`, { c: BROWN, w: 3, join: 'round' });
  s += S.rect(14, 80, 76, 76, { fill: FILL, fop: 1, rx: 4 }) + lab(52, 104, 'distribution', { a: 'middle', size: 10 }) + lab(52, 117, 'board', { a: 'middle', size: 10 }) + lab(52, 138, '30 A fuse', { a: 'middle', size: 10, c: RED }) + lab(52, 150, 'or MCB', { a: 'middle', size: 10, c: RED });
  const sockets = [{ at: [200, 30], dir: [0, 1] }, { at: [320, 30], dir: [0, 1] }, { at: [410, 115], dir: [-1, 0] }, { at: [320, 200], dir: [0, -1] }, { at: [200, 200], dir: [0, -1] }];
  for (const k of sockets) {
    const end = [k.at[0] + 18 * k.dir[0], k.at[1] + 18 * k.dir[1]];
    const cx = end[0] + 11 * k.dir[0];
    const cy = end[1] + 9 * k.dir[1];
    s += S.line(k.at[0], k.at[1], end[0], end[1], { w: 1.6 }) + S.circle(k.at[0], k.at[1], 3, { fill: 'currentColor', sw: 0 });
    s += S.rect(cx - 12, cy - 10, 24, 20, { fill: FILL, fop: 1, rx: 3 }) + S.circle(cx, cy - 4, 2, { fill: 'currentColor', sw: 0 }) + S.circle(cx - 5, cy + 4, 1.6, { fill: 'currentColor', sw: 0 }) + S.circle(cx + 5, cy + 4, 1.6, { fill: 'currentColor', sw: 0 });
  }
  s += S.arrow(150, 22, 196, 22, { c: GREEN, size: 6 }) + S.arrow(392, 192, 336, 192, { c: GREEN, size: 6 });
  s += lab(270, 100, 'socket outlets in parallel,', { a: 'middle', size: 11 }) + lab(270, 115, 'each fed from both ends', { a: 'middle', size: 11 }) + lab(270, 130, 'of the ring (two paths)', { a: 'middle', size: 11 });
  s += lab(270, 228, 'ring cable: live, neutral and earth run round the loop', { a: 'middle', size: 10, c: MUT });
  check(sockets.every((k) => onRing(k.at)) && onRing([90, 100]) && onRing([90, 136]), 'ring main: every socket is tapped from a point on the ring, and the ring starts and ends at the distribution board');
  return svgDoc(440, 240, 'A ring main circuit. A cable loop carrying live, neutral and earth starts at the distribution board, runs round the house and returns to the board, protected by a thirty ampere fuse or circuit breaker. Five socket outlets are connected in parallel at points on the ring, so current reaches each socket along two paths.', s);
})();

// ---------------------------------------------------------------- 4. two-way (staircase) switch
export const TWO_WAY = (() => {
  const C1 = [90, 90];
  const A1 = [140, 62];
  const B1 = [140, 118];
  const A2 = [300, 62];
  const B2 = [300, 118];
  const C2 = [350, 90];
  // lamp is on when the two levers rest on the same strap wire
  const lampOn = (s1, s2) => {
    const edges = [['L', 'C1'], ['C1', s1 === 'up' ? 'A1' : 'B1'], ['A1', 'A2'], ['B1', 'B2'], ['C2', s2 === 'up' ? 'A2' : 'B2'], ['C2', 'lamp']];
    const seen = new Set(['L']);
    let grew = true;
    while (grew) {
      grew = false;
      for (const [a, b] of edges)
        for (const [x, y] of [[a, b], [b, a]])
          if (seen.has(x) && !seen.has(y)) {
            seen.add(y);
            grew = true;
          }
    }
    return seen.has('lamp');
  };
  const states = [['up', 'up'], ['up', 'down'], ['down', 'up'], ['down', 'down']];
  const table = states.map(([a, b]) => lampOn(a, b));
  const toggles = states.every(([a, b]) => lampOn(a, b) !== lampOn(a === 'up' ? 'down' : 'up', b) && lampOn(a, b) !== lampOn(a, b === 'up' ? 'down' : 'up'));
  check(table.join() === 'true,false,false,true' && toggles, 'two-way switch: the lamp is on only when both levers rest on the same strap wire, and flipping either switch always changes the lamp');
  let s = S.line(30, 90, C1[0], C1[1], { c: BROWN, w: 2 }) + lab(24, 94, 'L', { a: 'end', size: 12, w: 'bold', c: BROWN });
  s += S.path(`M${A1[0]} ${A1[1]} L${A2[0]} ${A2[1]}`, { w: 1.8 }) + S.path(`M${B1[0]} ${B1[1]} L${B2[0]} ${B2[1]}`, { w: 1.8 });
  for (const p of [C1, A1, B1, A2, B2, C2]) s += S.circle(p[0], p[1], 3, { fill: 'currentColor', sw: 0 });
  s += S.line(C1[0], C1[1], A1[0] - 3, A1[1] + 2, { w: 2.4, c: ACC }) + S.line(C2[0], C2[1], A2[0] + 3, A2[1] + 2, { w: 2.4, c: ACC });
  s += S.line(C2[0], C2[1], 380, 90, { w: 1.8 }) + S.circle(392, 90, 12, { fill: 'var(--diagram-yellow)', fop: 0.6, sw: 1.5 });
  s += S.line(383.5, 81.5, 400.5, 98.5, { w: 1.2 }) + S.line(383.5, 98.5, 400.5, 81.5, { w: 1.2 }) + S.line(404, 90, 430, 90, { c: BLUE, w: 2 }) + lab(434, 94, 'N', { size: 12, w: 'bold', c: BLUE });
  s += lab(108, 140, 'S1 (bottom of stairs)', { a: 'middle', size: 10 }) + lab(330, 140, 'S2 (top of stairs)', { a: 'middle', size: 10 });
  s += lab(220, 56, 'strap wire a', { a: 'middle', size: 10, c: MUT }) + lab(220, 112, 'strap wire b', { a: 'middle', size: 10, c: MUT });
  s += lab(392, 70, 'lamp', { a: 'middle', size: 10 });
  const word = (b) => (b ? 'ON' : 'off');
  s += lab(20, 168, 'Lever positions (S1, S2) → lamp:', { size: 10, w: 'bold' });
  states.forEach(([a, b], i) => (s += lab(20 + (i % 2) * 210, 184 + Math.floor(i / 2) * 14, `S1 ${a}, S2 ${b} → ${word(table[i])}`, { size: 10, c: table[i] ? ACC : MUT })));
  return svgDoc(450, 218, 'A staircase circuit with two two-way switches. The live wire goes to the common terminal of switch S1 at the bottom of the stairs. Two strap wires join the matching contacts of S1 and S2. The common terminal of S2 at the top goes to the lamp and then to neutral. Both levers are up, on the same strap wire, so the lamp is on. Flipping either switch turns it off.', s);
})();

// ---------------------------------------------------------------- 5. three-pin socket and plug
export const PLUG = (() => {
  const pins = { E: { len: 58, thick: 10, y: 74, col: GREEN }, L: { len: 44, thick: 6, y: 100, col: BROWN }, N: { len: 44, thick: 6, y: 118, col: BLUE } };
  let s = S.rect(20, 34, 150, 136, { fill: FILL, fop: 0.8, rx: 10 }) + lab(95, 186, 'socket (front view)', { a: 'middle', size: 10 });
  s += S.rect(88, 52, 14, 26, { fill: 'currentColor', fop: 0.85, c: GREEN, sw: 1.5 }) + lab(110, 70, 'E', { size: 12, w: 'bold', c: GREEN });
  s += S.rect(124, 112, 9, 20, { fill: 'currentColor', fop: 0.85, c: BROWN, sw: 1.5 }) + lab(140, 128, 'L', { size: 12, w: 'bold', c: BROWN });
  s += S.rect(57, 112, 9, 20, { fill: 'currentColor', fop: 0.85, c: BLUE, sw: 1.5 }) + lab(40, 128, 'N', { size: 12, w: 'bold', c: BLUE });
  s += S.rect(220, 60, 60, 80, { fill: FILL, fop: 0.9, rx: 6 }) + lab(250, 156, 'plug (side view)', { a: 'middle', size: 10 });
  for (const [name, p] of Object.entries(pins)) s += S.rect(280, p.y - p.thick / 2, p.len, p.thick, { fill: p.col, fop: 0.6, c: p.col }) + lab(284 + p.len + 6, p.y + 4, name, { size: 11, w: 'bold', c: p.col });
  s += lab(220, 30, 'earth pin: longer — makes contact first,', { size: 10, c: GREEN }) + lab(220, 43, 'breaks contact last', { size: 10, c: GREEN });
  s += lab(220, 176, 'thicker — cannot enter the L or N hole', { size: 10, c: GREEN });
  s += lab(220, 192, 'fuse and switch of the socket: in L', { size: 10, c: BROWN });
  const ok = pins.E.len > pins.L.len && pins.E.len > pins.N.len && pins.E.thick > pins.L.thick && pins.E.thick > pins.N.thick;
  check(ok, 'plug: the earth pin is drawn longer (58 vs 44) and thicker (10 vs 6) than the live and neutral pins');
  return svgDoc(420, 204, 'Left, the front of a three-pin socket: a larger earth hole at the top and the live and neutral holes below it. Right, the side view of a three-pin plug: the earth pin is longer and thicker than the live and neutral pins, so it makes contact first and breaks contact last, and it cannot be pushed into the live or neutral hole.', s);
})();

// ---------------------------------------------------------------- 6. earthing during a fault
// Fault path: live wiring 0.5 ohm + earth path 1.5 ohm, so I = 220 / 2 = 110 A, far above a 15 A fuse: the fuse melts.
export const EARTHING = (() => {
  const V = 220;
  const Rw = 0.5;
  const Re = 1.5;
  const fuseA = 15;
  const If = V / (Rw + Re);
  let s = S.rect(200, 40, 140, 110, { fill: FILL, fop: 0.6, sw: 2.4, rx: 6 }) + lab(270, 34, 'geyser: metal body', { a: 'middle', size: 10 });
  s += S.line(20, 70, 70, 70, { c: BROWN, w: 2 }) + S.rect(70, 63, 40, 14, { fill: FILL, fop: 1 }) + lab(90, 56, '15 A fuse', { a: 'middle', size: 10 }) + S.line(110, 70, 250, 70, { c: BROWN, w: 2 });
  s += S.rect(250, 60, 50, 70, { fill: 'var(--diagram-fill)', fop: 1, sw: 1.2 }) + lab(275, 98, 'element', { a: 'middle', size: 10 });
  s += S.line(250, 120, 20, 120, { c: BLUE, w: 2 }) + lab(14, 74, 'L', { a: 'end', size: 12, w: 'bold', c: BROWN }) + lab(14, 124, 'N', { a: 'end', size: 12, w: 'bold', c: BLUE });
  s += S.path('M220 70 L214 80 L226 86 L212 96 L222 102 L204 112', { c: RED, w: 2 }) + lab(120, 100, 'fault: live wire', { size: 10, c: RED }) + lab(120, 112, 'touches the body', { size: 10, c: RED });
  s += S.line(320, 150, 320, 196, { c: GREEN, w: 2.4 }) + S.rect(296, 196, 48, 8, { fill: GREEN, fop: 0.4, c: GREEN });
  for (let x = 300; x <= 340; x += 10) s += S.line(x, 204, x - 6, 212, { c: GREEN, w: 1 });
  s += lab(350, 180, 'earth wire', { size: 10, c: GREEN }) + lab(350, 202, 'earth plate', { size: 10, c: GREEN });
  s += S.arrow(150, 64, 190, 64, { c: RED, size: 6 }) + S.arrow(312, 160, 312, 190, { c: RED, size: 6 });
  s += lab(20, 232, `fault current = 220 ÷ (0.5 + 1.5) = ${fmt(If)} A, far above 15 A: the fuse melts`, { size: 11, c: ACC });
  check(close(If, 110) && If > fuseA, `earthing: fault current ${fmt(If)} A through the low-resistance earth path exceeds the ${fuseA} A fuse rating, so the fuse melts and cuts off the live wire`);
  return svgDoc(440, 244, `An earthed geyser with a fault. The live wire, protected by a fifteen ampere fuse, has touched the metal body. A thick earth wire joins the body to a buried earth plate, so a very large current, about ${fmt(If)} amperes, flows from the live wire through the body to earth. The fuse melts at once and disconnects the live supply.`, s);
})();
