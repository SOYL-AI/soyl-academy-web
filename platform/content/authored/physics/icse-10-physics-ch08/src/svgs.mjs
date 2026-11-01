// ICSE 10 Physics ch08 diagrams (allow-listed elements, palette colours only). Every circuit is drawn through a small
// netlist kit: wires and parts are registered as they are drawn, joined into electrical nodes (union-find, with
// T-junctions), checked for loose ends, and solved by nodal analysis. SELF_CHECKS (read by build.mjs) assert that each
// ammeter is in series with the source, each voltmeter is across the part it measures, and every reading or equivalent
// resistance printed on a figure equals the value from the textbook formula.
import { svgDoc, S } from './lib.mjs';

const ACC = 'var(--diagram-accent)';
const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
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
const SHORT = 1e-6; // ohms: ideal ammeter, closed key

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
    wire(...pts) {
      for (let i = 0; i + 1 < pts.length; i++) wires.push([pts[i], pts[i + 1]]);
      s += S.path(`M${pts.map((p) => `${p[0]} ${p[1]}`).join(' L')}`, { w: 1.6, join: 'round' });
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
      const src = parts.find((p) => p.kind === 'cell' || p.kind === 'battery');
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
        if (p.kind === 'A' || p.kind === 'key') return 1 / SHORT;
        if (p.kind === 'cell' || p.kind === 'battery') return 1 / (p.r || SHORT);
        return 1 / p.R;
      };
      for (const p of parts) {
        const g = cond(p);
        if (g) stamp(node(p.a), node(p.b), g);
        if (p.kind === 'cell' || p.kind === 'battery') {
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
        if (p.kind === 'cell' || p.kind === 'battery') return (p.E - (V(posOf(p)) - V(negOf(p)))) * cond(p);
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
      return { loose, current, across, sameNodes, srcName: src.name };
    },
  };
  return api;
}

// ---------------------------------------------------------------- 1. Ohm's law verification circuit
// Battery 3 V (two 1.5 V cells), key, rheostat set at 5 ohms, ammeter in series, resistor R = 10 ohms with a voltmeter
// across it: I = 3 / 15 = 0.2 A, V = 0.2 × 10 = 2 V.
export const OHM_VERIFY = (() => {
  const E = 3;
  const R = 10;
  const Rh = 5;
  const c = circuit();
  c.wire([40, 160], [40, 50], [70, 50]).part('battery', 'bat', [70, 50], [150, 50], { E, r: 0, label: 'battery (3 V)', lo: [0, -24, 'middle'] });
  c.wire([150, 50], [180, 50]).part('key', 'K', [180, 50], [240, 50], { label: 'key K' });
  c.wire([240, 50], [270, 50]).part('rheo', 'Rh', [270, 50], [350, 50], { R: Rh, label: 'rheostat Rh', lo: [0, -20, 'middle'] });
  c.wire([350, 50], [380, 50], [380, 160], [320, 160]).part('R', 'R', [220, 160], [320, 160], { R, label: 'resistor R', lo: [0, -14, 'middle'] });
  c.wire([150, 160], [220, 160]).part('A', 'A', [90, 160], [150, 160], { label: 'ammeter (series)', lo: [0, 28, 'middle'], lc: BLUE });
  c.wire([40, 160], [90, 160]);
  c.wire([220, 160], [220, 205]).part('V', 'V', [220, 205], [320, 205], { label: 'voltmeter (parallel)', lo: [0, 28, 'middle'], lc: GREEN }).wire([320, 205], [320, 160]);
  c.dot([220, 160], [320, 160]);
  const sol = c.solve();
  const I = E / (R + Rh);
  const Vr = I * R;
  check(sol.loose.length === 0, `Ohm circuit: no loose wire ends (${sol.loose.join(' ') || 'none'})`);
  check(sol.sameNodes('V', 'R'), 'Ohm circuit: the voltmeter terminals are on the same two nodes as the resistor (parallel)');
  check(close(sol.current('A'), sol.current('bat'), 1e-6), 'Ohm circuit: the ammeter carries the whole battery current (series)');
  check(close(sol.current('A'), I, 1e-4) && close(sol.across('V'), Vr, 1e-4), `Ohm circuit: nodal analysis gives I = ${fmt(sol.current('A'))} A and V = ${fmt(sol.across('V'))} V, as E / (R + Rh) and IR give`);
  c.add(lab(210, 256, `With Rh = 5 Ω: ammeter ${fmt(I)} A, voltmeter ${fmt(Vr)} V, so R = V ÷ I = ${fmt(Vr / I)} Ω`, { a: 'middle', size: 11, c: ACC }));
  return svgDoc(420, 270, `Circuit to verify Ohm's law. A three volt battery, a key and a rheostat are in series with an ammeter and a resistor R. A voltmeter is connected in parallel across R. With the rheostat at five ohms the ammeter reads ${fmt(I)} ampere and the voltmeter reads ${fmt(Vr)} volt, so R is ${fmt(Vr / I)} ohms.`, c.body);
})();

// ---------------------------------------------------------------- 2. factors affecting resistance
// R = rho l / A with rho l / A for the reference wire = 4 ohms; doubling l doubles R; doubling A halves R.
export const WIRE_FACTORS = (() => {
  const rho = 1.0e-6;
  const l = 2;
  const A = 0.5e-6;
  const Rof = (len, area) => (rho * len) / area;
  const rows = [
    { name: 'wire P', len: l, area: A, y: 40, thick: 10 },
    { name: 'wire Q: twice as long', len: 2 * l, area: A, y: 100, thick: 10 },
    { name: 'wire S: twice the area', len: l, area: 2 * A, y: 160, thick: 16 },
  ];
  let s = '';
  for (const w of rows) {
    const px = 60 * w.len; // 60 px per metre
    s += S.rect(30, w.y - w.thick / 2, px, w.thick, { fill: FILL, fop: 0.8, sw: 1.2 });
    s += S.ellipse(30, w.y, 3, w.thick / 2, { fill: MUT, fop: 0.6, sw: 1 });
    s += lab(30, w.y - w.thick / 2 - 6, `${w.name} (${w.len} m)`, { size: 11 });
    s += lab(30 + px + 12, w.y + 4, `R = ${fmt(Rof(w.len, w.area))} Ω`, { size: 12, w: 'bold', c: w.len > l ? RED : w.area > A ? GREEN : BLUE });
  }
  s += lab(30, 205, 'Same material (ρ = 1.0 × 10⁻⁶ Ω m), same temperature', { size: 11, c: MUT });
  s += lab(30, 222, 'R = ρ l ÷ A: R grows with length, falls with area', { size: 11, c: ACC });
  const R0 = Rof(l, A);
  check(close(R0, 4) && close(Rof(2 * l, A), 2 * R0) && close(Rof(l, 2 * A), R0 / 2), 'wire factors: R = rho l / A gives 4 ohms for P, 8 ohms for twice the length and 2 ohms for twice the area');
  return svgDoc(420, 236, 'Three wires of the same material. Wire P, two metres long, has a resistance of four ohms. Wire Q, twice as long with the same area, has eight ohms. Wire S, the same length with twice the area of cross-section, has two ohms.', s);
})();

// ---------------------------------------------------------------- 3. e.m.f. and internal resistance
// E = 3 V, r = 0.5 ohm, R = 2.5 ohms: I = 3 / 3 = 1 A, terminal p.d. = 2.5 V, lost volts = 0.5 V.
export const EMF_CELL = (() => {
  const E = 3;
  const r = 0.5;
  const R = 2.5;
  const c = circuit();
  c.add(S.rect(78, 44, 172, 52, { dash: '5 4', c: MUT, sw: 1.2 }) + lab(164, 112, 'the cell (inside the dashed box)', { a: 'middle', size: 10, c: MUT }));
  c.wire([60, 70], [90, 70]).part('cell', 'cell', [90, 70], [140, 70], { E, r: 0, label: 'E = 3 V', lo: [0, 24, 'middle'] });
  c.wire([140, 70], [155, 70]).part('R', 'r', [155, 70], [225, 70], { R: r, label: 'r = 0.5 Ω', lo: [0, 22, 'middle'], lc: RED });
  c.wire([225, 70], [270, 70], [330, 70], [330, 100]).part('A', 'A', [330, 100], [330, 150], { label: 'ammeter', lo: [18, 4, 'start'], lc: BLUE });
  c.wire([330, 150], [330, 190], [300, 190]).part('R', 'R', [220, 190], [300, 190], { R, label: 'R = 2.5 Ω', lo: [0, -14, 'middle'] });
  c.wire([220, 190], [160, 190]).part('key', 'K', [100, 190], [160, 190], { label: 'K', lo: [0, 22, 'middle'] }).wire([100, 190], [60, 190], [60, 70]);
  c.wire([60, 70], [60, 25], [120, 25]).part('V', 'V', [120, 25], [210, 25], { label: 'voltmeter across the terminals', lo: [52, -12, 'start'], size: 10, lc: GREEN }).wire([210, 25], [270, 25], [270, 70]);
  c.dot([60, 70], [270, 70]);
  c.add(lab(52, 84, 'P', { a: 'end', size: 12, w: 'bold' }) + lab(276, 86, 'Q', { size: 12, w: 'bold' }));
  // The cell part above is ideal (r = 0); its internal resistance is the separate part "r" inside the dashed box.
  const sol = c.solve();
  const I = E / (R + r);
  const Vt = E - I * r;
  check(sol.loose.length === 0, `e.m.f. circuit: no loose wire ends (${sol.loose.join(' ') || 'none'})`);
  check(close(Math.abs(sol.current('A')), I, 1e-4) && close(sol.across('V'), Vt, 1e-4), `e.m.f. circuit: nodal analysis gives I = ${fmt(Math.abs(sol.current('A')))} A and terminal p.d. ${fmt(sol.across('V'))} V, as E / (R + r) and E − Ir give`);
  check(close(sol.across('V'), sol.across('R'), 1e-6), 'e.m.f. circuit: the voltmeter across the terminals P and Q reads the same as the p.d. across the external resistor R');
  c.add(lab(200, 228, `I = E ÷ (R + r) = ${fmt(I)} A; terminal p.d. V = E − Ir = ${fmt(Vt)} V`, { a: 'middle', size: 11, c: ACC }));
  c.add(lab(200, 244, `lost volts Ir = ${fmt(I * r)} V`, { a: 'middle', size: 11, c: RED }));
  return svgDoc(400, 256, `A cell of electromotive force three volts with an internal resistance of half an ohm, shown inside a dashed box, drives current through a key, an ammeter and an external resistor of two and a half ohms. A voltmeter across the terminals P and Q reads the terminal voltage. The current is ${fmt(I)} ampere, the terminal voltage ${fmt(Vt)} volts and the lost volts ${fmt(I * r)} volt.`, c.body);
})();

// ---------------------------------------------------------------- 4. series combination
// 2, 4 and 6 ohms in series across 6 V: Rs = 12 ohms, I = 0.5 A, p.d.s 1, 2 and 3 V.
export const SERIES = (() => {
  const E = 6;
  const Rs = [2, 4, 6];
  const c = circuit();
  const xs = [60, 160, 260, 360];
  c.wire([30, 60], [30, 160], [130, 160]).part('battery', 'bat', [130, 160], [210, 160], { E, r: 0, label: '6 V', lo: [0, -22, 'middle'] }).wire([210, 160], [390, 160], [390, 60], [360, 60]);
  c.wire([30, 60], [60, 60]);
  Rs.forEach((R, i) => {
    c.part('R', `R${i + 1}`, [xs[i] + 15, 60], [xs[i + 1] - 15, 60], { R, label: `R${'₁₂₃'[i]} = ${R} Ω`, lo: [0, -16, 'middle'] });
    c.wire([xs[i], 60], [xs[i] + 15, 60]).wire([xs[i + 1] - 15, 60], [xs[i + 1], 60]);
  });
  const sol = c.solve();
  const Req = Rs.reduce((a, b) => a + b, 0);
  const I = E / Req;
  const vs = Rs.map((R) => I * R);
  const okI = Rs.every((_, i) => close(sol.current(`R${i + 1}`), I, 1e-4));
  check(sol.loose.length === 0, 'series circuit: no loose wire ends');
  check(okI && close(Req, 12), `series circuit: the same current ${fmt(I)} A flows through every resistor, and Rs = R1 + R2 + R3 = ${Req} ohms gives E / Rs`);
  check(close(vs.reduce((a, b) => a + b, 0), E) && Rs.every((_, i) => close(sol.across(`R${i + 1}`), vs[i], 1e-4)), `series circuit: the p.d.s ${vs.map(fmt).join(', ')} V add up to the 6 V supply`);
  Rs.forEach((_, i) => c.add(lab((xs[i] + xs[i + 1]) / 2, 90, `${fmt(vs[i])} V`, { a: 'middle', size: 11, c: GREEN })));
  c.add(lab(210, 114, `same current I = ${fmt(I)} A everywhere`, { a: 'middle', size: 11, c: BLUE }));
  c.add(lab(210, 198, `Rs = 2 + 4 + 6 = ${Req} Ω; I = 6 ÷ ${Req} = ${fmt(I)} A`, { a: 'middle', size: 12, w: 'bold', c: ACC }));
  return svgDoc(420, 212, `Three resistors of two, four and six ohms joined end to end in series across a six volt battery. The same current, ${fmt(I)} ampere, flows through each. The potential differences across them are one, two and three volts, which add up to the battery voltage. The equivalent resistance is ${Req} ohms.`, c.body);
})();

// ---------------------------------------------------------------- 5. parallel combination
// 6, 12 and 4 ohms in parallel across 6 V: 1/Rp = 1/6 + 1/12 + 1/4 = 1/2, Rp = 2 ohms; currents 1, 0.5, 1.5 A (total 3 A).
export const PARALLEL = (() => {
  const E = 6;
  const Rs = [6, 12, 4];
  const ys = [40, 90, 140];
  const c = circuit();
  c.wire([60, 40], [60, 190], [150, 190]).part('battery', 'bat', [150, 190], [230, 190], { E, r: 0, label: '6 V', lo: [0, -20, 'middle'] }).wire([230, 190], [320, 190], [320, 40]);
  Rs.forEach((R, i) => {
    c.wire([60, ys[i]], [140, ys[i]]).part('R', `R${i + 1}`, [140, ys[i]], [240, ys[i]], { R, label: `${R} Ω`, lo: [0, -12, 'middle'] }).wire([240, ys[i]], [320, ys[i]]);
  });
  c.dot([60, 90], [60, 140], [320, 90], [320, 140]);
  const sol = c.solve();
  const Rp = 1 / Rs.reduce((a, R) => a + 1 / R, 0);
  const I = E / Rp;
  const br = Rs.map((R) => E / R);
  check(sol.loose.length === 0, 'parallel circuit: no loose wire ends');
  check(Rs.every((_, i) => close(sol.across(`R${i + 1}`), E, 1e-4)), 'parallel circuit: the same 6 V p.d. appears across every branch');
  check(close(Rp, 2) && close(sol.current('bat'), I, 1e-4) && Rs.every((_, i) => close(sol.current(`R${i + 1}`), br[i], 1e-4)), `parallel circuit: 1/Rp = 1/6 + 1/12 + 1/4 gives Rp = ${fmt(Rp)} ohms; branch currents ${br.map(fmt).join(', ')} A add up to ${fmt(I)} A`);
  Rs.forEach((_, i) => c.add(lab(262, ys[i] - 8, `${fmt(br[i])} A`, { size: 11, c: BLUE })));
  c.add(lab(340, 70, 'same p.d.', { size: 11, c: GREEN }) + lab(340, 84, '6 V across', { size: 11, c: GREEN }) + lab(340, 98, 'each branch', { size: 11, c: GREEN }));
  c.add(lab(210, 232, `1/Rp = 1/6 + 1/12 + 1/4, so Rp = ${fmt(Rp)} Ω; total I = ${fmt(I)} A`, { a: 'middle', size: 12, w: 'bold', c: ACC }));
  return svgDoc(430, 246, `Resistors of six, twelve and four ohms connected side by side in parallel across a six volt battery. Each branch has the full six volts across it and carries one, one half and one and a half amperes. The total current is ${fmt(I)} amperes and the equivalent resistance is ${fmt(Rp)} ohms, less than the smallest resistor.`, c.body);
})();

// ---------------------------------------------------------------- 6. a series–parallel network with internal resistance
// E = 9 V, r = 1 ohm; 2 ohms in series with (6 || 3 = 2 ohms): total 5 ohms, I = 1.8 A; p.d. across the pair 3.6 V;
// branch currents 0.6 A and 1.2 A; terminal p.d. 7.2 V.
export const NETWORK = (() => {
  const E = 9;
  const r = 1;
  const R1 = 2;
  const Ra = 6;
  const Rb = 3;
  const c = circuit();
  c.add(S.rect(28, 168, 160, 46, { dash: '5 4', c: MUT, sw: 1.2 }) + lab(108, 228, 'battery: E = 9 V, r = 1 Ω', { a: 'middle', size: 10, c: MUT }));
  c.wire([40, 60], [40, 190], [50, 190]).part('cell', 'cell', [50, 190], [100, 190], { E, r: 0 }).wire([100, 190], [110, 190]);
  c.part('R', 'r', [110, 190], [170, 190], { R: r, label: 'r', lo: [0, -12, 'middle'], lc: RED }).wire([170, 190], [400, 190], [400, 60], [360, 60]);
  c.wire([40, 60], [70, 60]).part('R', 'R1', [70, 60], [150, 60], { R: R1, label: '2 Ω', lo: [0, -14, 'middle'] }).wire([150, 60], [200, 60]);
  c.wire([200, 60], [200, 30], [230, 30]).part('R', 'Ra', [230, 30], [310, 30], { R: Ra, label: '6 Ω', lo: [0, -12, 'middle'] }).wire([310, 30], [340, 30], [340, 60]);
  c.wire([200, 60], [200, 100], [230, 100]).part('R', 'Rb', [230, 100], [310, 100], { R: Rb, label: '3 Ω', lo: [0, 22, 'middle'] }).wire([310, 100], [340, 100], [340, 60]);
  c.wire([340, 60], [360, 60]);
  c.dot([200, 60], [340, 60]);
  const sol = c.solve();
  const Rp = (Ra * Rb) / (Ra + Rb);
  const I = E / (R1 + Rp + r);
  const Vp = I * Rp;
  check(sol.loose.length === 0, 'network: no loose wire ends');
  check(close(Rp, 2) && close(I, 1.8) && close(sol.current('cell'), I, 1e-4), `network: 6 || 3 = ${fmt(Rp)} ohms, total 2 + 2 + 1 = 5 ohms, I = 9 / 5 = ${fmt(I)} A (nodal analysis agrees)`);
  check(close(sol.current('Ra'), Vp / Ra, 1e-4) && close(sol.current('Rb'), Vp / Rb, 1e-4) && close(Vp / Ra + Vp / Rb, I, 1e-9), `network: ${fmt(Vp)} V across the pair gives ${fmt(Vp / Ra)} A and ${fmt(Vp / Rb)} A, which add up to ${fmt(I)} A`);
  c.add(lab(270, 50, `${fmt(Vp / Ra)} A`, { a: 'middle', size: 10, c: BLUE }) + lab(270, 85, `${fmt(Vp / Rb)} A`, { a: 'middle', size: 10, c: BLUE }));
  c.add(lab(110, 82, `I = ${fmt(I)} A`, { a: 'middle', size: 11, c: BLUE }));
  c.add(lab(290, 150, `${fmt(Vp)} V across the parallel pair`, { a: 'middle', size: 10, c: GREEN }));
  c.add(lab(290, 166, `terminal p.d. = ${fmt(E - I * r)} V`, { a: 'middle', size: 10, c: ACC }));
  return svgDoc(420, 240, `A battery of electromotive force nine volts and internal resistance one ohm drives current through a two ohm resistor in series with a six ohm and a three ohm resistor in parallel. The parallel pair is equivalent to two ohms, the total resistance is five ohms and the current is ${fmt(I)} amperes. It divides into ${fmt(Vp / Ra)} ampere through the six ohm resistor and ${fmt(Vp / Rb)} amperes through the three ohm resistor.`, c.body);
})();
