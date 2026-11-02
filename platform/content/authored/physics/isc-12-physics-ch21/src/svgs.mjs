// ISC ch21 diagrams: band diagrams of a conductor, germanium, silicon and diamond to scale; the covalent-bond picture of
// intrinsic, n-type and p-type silicon; donor and acceptor levels; the unbiased p-n junction with its potential barrier;
// forward and reverse bias; two diode circuits for worked examples; the half-wave and centre-tap full-wave rectifiers with
// their computed waveforms; the LED, photodiode and solar cell; and the Zener voltage regulator. The physics helpers
// (band-gap wavelengths, diode-drop circuits, rectifier outputs, the capacitor-filter simulation and the Zener regulator
// solution) are used by the decks and the question bank and re-solved there. Every figure carries SELF_CHECKS read by build.mjs.
// The symbol kit follows the author's ISC ch06 circuit kit (copied, not imported); the figures are new.
import { svgDoc, S } from '../../isc-12-physics-ch01/src/lib.mjs';

const RAY = 'var(--diagram-red)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BLUE = 'var(--diagram-blue)';
const GRN = 'var(--diagram-green)';
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const close = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(a), Math.abs(b));

// ================================================================ constants and physics (values stated in the stems)
export const HC = 1240; // eV nm
export const QE = 1.6e-19; // C
export const GAPS = { diamond: 5.5, ge: 0.7, si: 1.1 }; // eV
export const VSI = 0.7; // forward drop of a silicon diode, V
export const VGE = 0.3; // forward drop of a germanium diode, V
export const VT = 0.0259; // kT/e at 300 K, V
/** Longest wavelength (nm) of a photon able to lift an electron across a gap of Eg eV. */
export const cutoff = (Eg) => HC / Eg;
/** Photon energy (eV) of a wavelength in nm. */
export const photonEv = (nm) => HC / nm;
/** Current (A) in a series loop of emf E, resistance R and one diode with forward drop Vd (zero if not forward biased). */
export const seriesI = (E, R, Vd) => Math.max(0, (E - Vd) / R);
/** Zener regulator (Zener across the load, series resistor Rs): returns currents and output voltage. */
export function zreg({ Vin, Rs, Vz, RL }) {
  const Vth = Vz * (1 + Rs / RL);
  if (Vin >= Vth) {
    const I = (Vin - Vz) / Rs;
    const IL = Vz / RL;
    return { on: true, Vout: Vz, I, IL, Iz: I - IL, Vth };
  }
  const I = Vin / (Rs + RL);
  return { on: false, Vout: I * RL, I, IL: I, Iz: 0, Vth };
}
export const peak = (rms) => rms * Math.SQRT2;
/** Fraction of each cycle for which a half-wave rectifier conducts when the secondary peak is Vm and the diode drops Vd. */
export const hwFrac = (Vm, Vd) => (Math.PI - 2 * Math.asin(Vd / Vm)) / (2 * Math.PI);
/** Output of a half-wave rectifier (secondary voltage vs, diode drop Vd). */
export const hwOut = (vs, Vd = 0) => Math.max(0, vs - Vd);
/** Output of a centre-tap full-wave rectifier (half-secondary voltage vs, drop Vd). */
export const fwOut = (vs, Vd = 0) => Math.max(0, Math.abs(vs) - Vd);
/** Capacitor-input filter (ideal diodes unless Vd): returns time (s), output (V) arrays and the steady-state ripple (V). */
export function filterSim({ Vm, Vd = 0, f = 50, R, C, full = true, tEnd = 0.08, dt = 1e-5 }) {
  const t = [];
  const v = [];
  let vc = 0;
  for (let k = 0; k * dt <= tEnd + 1e-12; k++) {
    const tt = k * dt;
    const s = Vm * Math.sin(2 * Math.PI * f * tt);
    const src = (full ? Math.abs(s) : Math.max(0, s)) - Vd;
    vc = src > vc ? src : vc * Math.exp(-dt / (R * C));
    t.push(tt);
    v.push(vc);
  }
  const T = 1 / (full ? 2 * f : f);
  const last = v.filter((_, i) => t[i] >= tEnd - T);
  return { t, v, ripple: Math.max(...last) - Math.min(...last) };
}

check(close(cutoff(GAPS.si), 1127.3, 1e-4) && close(cutoff(GAPS.diamond), 225.45, 1e-4), `band-gap cut-off wavelengths: Si ${cutoff(GAPS.si).toFixed(0)} nm, Ge ${cutoff(GAPS.ge).toFixed(0)} nm, diamond ${cutoff(GAPS.diamond).toFixed(0)} nm (hc = 1240 eV nm)`);

// ================================================================ symbol kit
const W = (x1, y1, x2, y2) => S.line(x1, y1, x2, y2, { w: 1.6 });
const dot = (x, y) => S.circle(x, y, 2.5, { c: 'currentColor', fill: 'currentColor' });
const RIGHT = 0;
const UP = -Math.PI / 2;
const DOWN = Math.PI / 2;
const LEFT = Math.PI;
function resH(x1, x2, y, label, { ly = -12 } = {}) {
  const n = 6;
  const L = x2 - x1;
  const a = x1 + L * 0.2;
  const b = x2 - L * 0.2;
  let d = `M${x1} ${y} L${a} ${y}`;
  for (let i = 0; i < n; i++) d += ` L${(a + ((i + 0.5) * (b - a)) / n).toFixed(1)} ${y + (i % 2 ? 6 : -6)}`;
  d += ` L${b} ${y} L${x2} ${y}`;
  return S.path(d, { w: 1.6, join: 'round' }) + (label ? S.text((x1 + x2) / 2, y + ly, label, { a: 'middle', size: 11 }) : '');
}
function resV(x, y1, y2, label, { lx = 12, anchor = 'start' } = {}) {
  const n = 6;
  const L = y2 - y1;
  const a = y1 + L * 0.2;
  const b = y2 - L * 0.2;
  let d = `M${x} ${y1} L${x} ${a}`;
  for (let i = 0; i < n; i++) d += ` L${x + (i % 2 ? 6 : -6)} ${(a + ((i + 0.5) * (b - a)) / n).toFixed(1)}`;
  d += ` L${x} ${b} L${x} ${y2}`;
  return S.path(d, { w: 1.6, join: 'round' }) + (label ? S.text(x + lx, (y1 + y2) / 2 + 4, label, { a: anchor, size: 11 }) : '');
}
/** Cell in a vertical wire at (x, y): long plate (+) on top. */
const cellV = (x, y, label, { lx = 16 } = {}) => S.line(x - 12, y - 4, x + 12, y - 4, { w: 2 }) + S.line(x - 6, y + 4, x + 6, y + 4, { w: 3.5 }) + (label ? S.text(x + lx, y + 4, label, { size: 11 }) : '');
/** Cell in a horizontal wire at (x, y): long plate (+) on the left if posLeft, else on the right. */
function cellH(x, y, posLeft) {
  const [xl, xs] = posLeft ? [x - 4, x + 4] : [x + 4, x - 4];
  return S.line(xl, y - 12, xl, y + 12, { w: 2 }) + S.line(xs, y - 6, xs, y + 6, { w: 3.5 });
}
const cur = (x, y, ang, label, { lx = 0, ly = -8, a = 'middle' } = {}) => S.head(x + 5 * Math.cos(ang), y + 5 * Math.sin(ang), ang, { c: ACC, size: 8 }) + (label ? S.text(x + lx, y + ly, label, { a, size: 11, c: ACC }) : '');
/** Diode symbol centred at (cx, cy); `ang` is the direction of forward (conventional) current, anode to cathode. */
function diode(cx, cy, ang, { zener = false, s = 9 } = {}) {
  const ca = Math.cos(ang);
  const sa = Math.sin(ang);
  const P = (u, v) => [cx + u * ca - v * sa, cy + u * sa + v * ca];
  const pts = [P(-s, -s), P(-s, s), P(s, 0)].map(([x, y]) => `${f1(x)},${f1(y)}`).join(' ');
  let svg = `<polygon points="${pts}" fill="${FILL}" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`;
  const bar = (a, b) => S.line(...P(...a), ...P(...b), { w: 2 });
  svg += bar([s, -s], [s, s]);
  if (zener) svg += bar([s - 4, -s], [s, -s]) + bar([s, s], [s + 4, s]);
  return { svg, a: P(-s, 0), k: P(s, 0) };
}
/** Transformer coil: n humps from (x, y0) to (x, y1) bulging right (side +1) or left (−1). */
function coil(x, y0, y1, n, side) {
  const r = (y1 - y0) / (2 * n);
  let d = `M${x} ${y0}`;
  for (let i = 0; i < n; i++) d += ` A${f1(r)} ${f1(r)} 0 0 ${side > 0 ? 1 : 0} ${x} ${f1(y0 + (i + 1) * 2 * r)}`;
  return S.path(d, { w: 1.6 });
}
function acSource(x, y) {
  return S.circle(x, y, 12, { sw: 1.6, fill: FILL }) + S.path(`M${x - 7} ${y} Q${x - 3.5} ${y - 9} ${x} ${y} T${x + 7} ${y}`, { w: 1.4 });
}
const arrowHead = (x, y, ang, c = 'currentColor') => S.head(x, y, ang, { size: 6, c });
/** Sampled trace: phase from 0 to cycles·2π across wPx pixels; value fn(phase) in [-1, 1] scaled by amp about yMid. */
function trace(x0, yMid, wPx, amp, fn, cycles, { c = 'currentColor', w = 1.6, N = 48 } = {}) {
  const pts = [];
  const n = N * cycles;
  for (let i = 0; i <= n; i++) {
    const ph = (i / n) * cycles * 2 * Math.PI;
    pts.push([x0 + (wPx * i) / n, yMid - amp * fn(ph)]);
  }
  return { svg: S.path(pts.map(([x, y], i) => `${i ? 'L' : 'M'}${f1(x)} ${f1(y)}`).join(' '), { c, w, join: 'round' }), pts };
}
const axisX = (x0, y, wPx, label) => S.arrow(x0 - 4, y, x0 + wPx + 10, y, { w: 1, size: 6 }) + lab(x0 + wPx + 12, y + 4, label, { size: 10 });
const axisY = (x, y0, y1) => S.arrow(x, y0, x, y1, { w: 1, size: 6 });

// ================================================================ bands to scale (conductor, Ge, Si, diamond)
export const BANDS = (() => {
  const w = 520;
  const h = 236;
  const k = 14; // px per eV
  const top = 40;
  const bh = 44;
  const panels = [
    { name: 'Conductor', gap: -1 },
    { name: 'Germanium', gap: GAPS.ge, thermal: 2 },
    { name: 'Silicon', gap: GAPS.si, thermal: 1 },
    { name: 'Diamond', gap: GAPS.diamond, thermal: 0 },
  ];
  let s = '';
  const drawn = [];
  panels.forEach((p, i) => {
    const x0 = 10 + i * 128;
    const bx = x0 + 14;
    const bw = 58;
    const vbTop = top + bh + p.gap * k;
    s += S.rect(bx, top, bw, bh, { fill: FILL, fop: 0.9, c: BLUE });
    s += S.rect(bx, vbTop, bw, bh, { fill: FILL, fop: 0.9, c: GRN });
    drawn.push({ name: p.name, gapPx: vbTop - (top + bh), gap: p.gap });
    // electrons: valence band full, conduction band by case
    for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) s += S.circle(bx + 8 + c * 11, vbTop + 10 + r * 12, 2.6, { c: 'none', sw: 0, fill: GRN });
    if (p.gap < 0) {
      for (let r = 0; r < 2; r++) for (let c = 0; c < 5; c++) s += S.circle(bx + 8 + c * 11, top + 10 + r * 10, 2.6, { c: 'none', sw: 0, fill: BLUE });
    } else {
      for (let j = 0; j < p.thermal; j++) s += S.circle(bx + 20 + j * 18, top + 30, 2.6, { c: 'none', sw: 0, fill: BLUE });
      if (p.thermal) s += S.circle(bx + 14, vbTop + 22, 2.8, { sw: 1.2 });
    }
    s += lab(x0 + 43, top - 6, p.name, { a: 'middle', size: 11, w: 'bold' });
    if (p.gap > 0) {
      const gx = bx + bw + 10;
      s += S.arrow(gx, top + bh + 3, gx, vbTop - 3, { w: 1.2, size: 5 }) + S.arrow(gx, vbTop - 3, gx, top + bh + 3, { w: 1.2, size: 5 });
      s += S.lines(gx + 7, top + bh + (vbTop - top - bh) / 2 - 2, [`Eg`, `${p.gap} eV`], { size: 10, dy: 12 });
    } else s += lab(x0 + 43, vbTop + bh + 16, 'overlap: no gap', { a: 'middle', size: 10, c: MUT });
  });
  s += lab(14, 14, 'conduction band (blue), valence band (green)', { size: 10, c: MUT });
  s += lab(w - 8, h - 6, 'energy axis to scale: 1 eV = 14 px; filled dots: electrons', { a: 'end', size: 10, c: MUT });
  check(drawn.filter((d) => d.gap > 0).every((d) => close(d.gapPx, d.gap * k, 1e-9)), `band diagrams to scale: gaps drawn as ${drawn.filter((d) => d.gap > 0).map((d) => (d.gapPx / k).toFixed(2)).join(', ')} eV for Ge, Si, diamond`);
  check(drawn[0].gapPx < 0 && drawn[1].gapPx < drawn[2].gapPx && drawn[2].gapPx < drawn[3].gapPx, 'gap order: conductor (overlap) < Ge < Si < diamond');
  return svgDoc(w, h, 'Energy bands of four solids drawn to scale on one energy axis: in a conductor the valence and conduction bands overlap; germanium has a gap of 0.7 electronvolt, silicon 1.1 and diamond 5.5; the valence band is full of electrons and the conduction band is empty except for a few thermally excited electrons in germanium and silicon, each leaving a hole behind', s);
})();

// ================================================================ covalent bonds: intrinsic, n-type and p-type silicon
export const LATTICE = (() => {
  const w = 540;
  const h = 214;
  const sp = 42;
  const R = 11;
  let s = '';
  // Valence electrons of the central atom; the four neighbours are silicon (4 each) and each shares one electron with the centre.
  const panels = [
    { name: 'Intrinsic silicon', centre: 'Si', v: 4, kind: 'intrinsic' },
    { name: 'n-type: phosphorus donor', centre: 'P', v: 5, kind: 'n' },
    { name: 'p-type: boron acceptor', centre: 'B', v: 3, kind: 'p' },
  ];
  const report = [];
  panels.forEach((p, i) => {
    const cx = 90 + i * 180;
    const cy = 100;
    const at = (dx, dy) => [cx + dx * sp, cy + dy * sp];
    const lines = [];
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
      if (dx < 1) lines.push([[dx, dy], [dx + 1, dy]]);
      if (dy < 1) lines.push([[dx, dy], [dx, dy + 1]]);
    }
    // Bonds of the centre atom: each holds the neighbour's electron plus the centre's own, if the centre has one to give.
    // The centre gives min(v, 4) electrons to its four bonds; a bond left with one electron is a hole (p-type) and, in the
    // intrinsic case, one thermally broken bond has lost an electron to the lattice.
    const given = Math.min(p.v, 4);
    const bondE = 4 + given; // electrons in the four bonds of the centre atom
    const brokenBond = p.kind === 'intrinsic' ? 1 : 0;
    const inBonds = bondE - brokenBond;
    const holes = 8 - inBonds;
    const free = p.v - given + brokenBond;
    report.push({ kind: p.kind, inBonds, holes, free });
    const missing = holes > 0 ? [1, 0] : null; // the bond to the right of the centre is the one short of an electron
    for (const [a, b] of lines) {
      const [x1, y1] = at(...a);
      const [x2, y2] = at(...b);
      s += S.line(x1, y1, x2, y2, { c: MUT, w: 1 });
      const isMissing = missing && ((a[0] === 0 && a[1] === 0 && b[0] === missing[0] && b[1] === missing[1]) || (b[0] === 0 && b[1] === 0 && a[0] === missing[0] && a[1] === missing[1]));
      const ux = (x2 - x1) / sp;
      const uy = (y2 - y1) / sp;
      const m1 = [x1 + ux * 0.38 * sp, y1 + uy * 0.38 * sp];
      const m2 = [x1 + ux * 0.62 * sp, y1 + uy * 0.62 * sp];
      s += S.circle(m1[0], m1[1], 2.4, { c: 'none', sw: 0, fill: 'currentColor' });
      s += isMissing ? S.circle(m2[0], m2[1], 3, { sw: 1.4, c: RAY }) : S.circle(m2[0], m2[1], 2.4, { c: 'none', sw: 0, fill: 'currentColor' });
    }
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
      const [x, y] = at(dx, dy);
      const centre = dx === 0 && dy === 0;
      s += S.circle(x, y, R, { fill: FILL, c: centre && p.kind !== 'intrinsic' ? ACC : 'currentColor', sw: centre ? 2 : 1.4 });
      s += S.text(x, y + 4, centre ? p.centre : 'Si', { a: 'middle', size: 10, w: 'bold' });
    }
    if (free > 0) {
      const [x, y] = at(0.5, -0.5);
      s += S.circle(x, y, 3, { c: 'none', sw: 0, fill: BLUE }) + lab(x + 6, y - 5, 'e⁻', { size: 10, c: BLUE });
    }
    if (holes > 0) {
      const [x, y] = at(0.5, 0.5);
      s += lab(x, y + 4, 'hole', { a: 'middle', size: 10, c: RAY });
    }
    s += lab(cx, 18, p.name, { a: 'middle', size: 11, w: 'bold' });
    s += lab(cx, h - 8, p.kind === 'intrinsic' ? 'one broken bond: electron + hole' : p.kind === 'n' ? '4 shared + 1 extra electron' : '3 shared; one bond short (hole)', { a: 'middle', size: 10, c: MUT });
  });
  const [ri, rn, rp] = report;
  check(rn.free === 1 && rn.holes === 0 && rn.inBonds === 8, 'n-type: phosphorus has 5 valence electrons, 4 fill its bonds (8 electrons in 4 bonds), 1 is free; no bond is short');
  check(rp.holes === 1 && rp.free === 0 && rp.inBonds === 7, 'p-type: boron has 3 valence electrons, so its four bonds hold 7 of 8 electrons: 1 hole, no free electron');
  check(ri.holes === 1 && ri.free === 1 && ri.inBonds === 7, 'intrinsic: breaking one bond frees 1 electron and leaves 1 hole (equal numbers)');
  return svgDoc(w, h, 'Covalent bond pictures of silicon: in intrinsic silicon thermal energy breaks one bond, giving a free electron and a hole; in n-type silicon a phosphorus atom with five valence electrons uses four in bonds and gives one free electron; in p-type silicon a boron atom with three valence electrons leaves one bond short, a hole', s);
})();

// ================================================================ donor and acceptor levels
export const DOPED_BANDS = (() => {
  const w = 480;
  const h = 240;
  const Eg = GAPS.si;
  const k = 60; // px per eV
  const top = 40;
  const bh = 36;
  const exag = 14; // donor/acceptor depth drawn (px), actually about 0.05 eV = 3 px
  const trueDepth = 0.05 * k;
  let s = '';
  const items = [];
  for (const [i, kind] of ['n', 'p'].entries()) {
    const x0 = 44 + i * 236;
    const bw = 150;
    const vbTop = top + bh + Eg * k;
    s += S.rect(x0, top, bw, bh, { fill: FILL, fop: 0.9, c: BLUE }) + S.rect(x0, vbTop, bw, bh, { fill: FILL, fop: 0.9, c: GRN });
    s += lab(x0 + bw / 2, top + 22, 'conduction band', { a: 'middle', size: 10 }) + lab(x0 + bw / 2, vbTop + 22, 'valence band', { a: 'middle', size: 10 });
    const gy = top + bh;
    const lvl = kind === 'n' ? gy + exag : vbTop - exag;
    s += S.line(x0 + 20, lvl, x0 + bw - 20, lvl, { c: ACC, w: 2, dash: '6 3' });
    items.push({ kind, lvl, gy, vbTop });
    if (kind === 'n') {
      s += S.circle(x0 + 60, lvl - 5, 3, { c: 'none', sw: 0, fill: BLUE }) + S.arrow(x0 + 60, lvl - 9, x0 + 60, gy - 14, { c: BLUE, w: 1.3, size: 5 });
      s += lab(x0 + bw / 2, lvl + 15, 'donor level', { a: 'middle', size: 10, c: ACC });
      s += S.lines(x0 + bw / 2, vbTop + bh + 18, ['n-type: donors give electrons', 'to the conduction band;', 'electrons majority, holes minority'], { a: 'middle', size: 10, dy: 13 });
    } else {
      s += S.circle(x0 + 60, vbTop + 8, 3, { sw: 1.3, c: RAY }) + S.arrow(x0 + 60, lvl + 4, x0 + 60, vbTop + 16, { c: RAY, w: 1.3, size: 5 });
      s += lab(x0 + bw / 2, lvl - 6, 'acceptor level', { a: 'middle', size: 10, c: ACC });
      s += S.lines(x0 + bw / 2, vbTop + bh + 18, ['p-type: valence electrons fill the', 'acceptors, leaving holes;', 'holes majority, electrons minority'], { a: 'middle', size: 10, dy: 13 });
    }
    s += S.arrow(x0 - 8, gy + 3, x0 - 8, vbTop - 3, { w: 1, size: 5 }) + S.arrow(x0 - 8, vbTop - 3, x0 - 8, gy + 3, { w: 1, size: 5 }) + lab(x0 - 12, (gy + vbTop) / 2 + 4, 'Eg', { a: 'end', size: 10 });
  }
  s += lab(w / 2, 20, 'Doping levels sit very close to a band edge (about 0.05 eV in silicon); drawn deeper here for clarity', { a: 'middle', size: 10, c: MUT });
  check(items.every((it) => it.lvl > it.gy && it.lvl < it.vbTop) && trueDepth < 0.1 * Eg * k, 'donor and acceptor levels lie inside the gap, each within a tenth of Eg of its band edge (true depth about 3 px, drawn 14 px)');
  check(items[0].lvl - items[0].gy < (items[0].vbTop - items[0].gy) / 2 && items[1].vbTop - items[1].lvl < (items[1].vbTop - items[1].gy) / 2, 'donor level nearer the conduction band; acceptor level nearer the valence band');
  return svgDoc(w, h, 'Band diagrams of doped silicon: in n-type silicon a donor level lies just below the conduction band and its electrons are easily raised into the conduction band, leaving fixed positive ions; in p-type silicon an acceptor level lies just above the valence band and electrons from the valence band fill it, leaving holes', s);
})();

// ================================================================ the unbiased p-n junction and its barrier
export const BARRIER_DATA = { V0: 0.7, width_um: 1.0 };
export const JUNCTION = (() => {
  const w = 480;
  const h = 300;
  const yT = 26;
  const yB = 90;
  const xs = [20, 190, 240, 290, 460];
  let s = S.rect(xs[0], yT, xs[1] - xs[0], yB - yT, { fill: 'none', c: MUT, sw: 1 }) + S.rect(xs[3], yT, xs[4] - xs[3], yB - yT, { fill: 'none', c: MUT, sw: 1 });
  s += S.rect(xs[1], yT, xs[3] - xs[1], yB - yT, { fill: FILL, fop: 0.9, c: ACC, sw: 1.4, dash: '5 3' });
  s += S.line(xs[2], yT - 6, xs[2], yB + 6, { c: MUT, w: 1, dash: '2 3' }) + lab(xs[2], yT - 10, 'junction', { a: 'middle', size: 10, c: MUT });
  const holes = [[36, 40], [70, 62], [104, 38], [138, 66], [170, 44], [52, 78], [122, 82]];
  const elecs = holes.map(([x, y]) => [480 - x, y]);
  for (const [x, y] of holes) s += S.circle(x, y, 4, { sw: 1.4, c: RAY });
  for (const [x, y] of elecs) s += S.circle(x, y, 3.2, { c: 'none', sw: 0, fill: BLUE });
  let neg = 0;
  let pos = 0;
  for (const x of [200, 215, 230]) for (const y of [38, 58, 78]) {
    s += S.circle(x, y, 5.5, { sw: 1.2, c: BLUE }) + S.text(x, y + 4, '−', { a: 'middle', size: 11, w: 'bold' });
    neg++;
  }
  for (const x of [250, 265, 280]) for (const y of [38, 58, 78]) {
    s += S.circle(x, y, 5.5, { sw: 1.2, c: RAY }) + S.text(x, y + 4, '+', { a: 'middle', size: 11, w: 'bold' });
    pos++;
  }
  s += lab(105, yB + 18, 'p-type: holes (majority)', { a: 'middle', size: 11, w: 'bold' }) + lab(375, yB + 18, 'n-type: electrons (majority)', { a: 'middle', size: 11, w: 'bold' });
  s += lab(xs[2], yB + 33, 'depletion region: fixed ions, no mobile carriers', { a: 'middle', size: 10 });
  s += S.arrow(xs[3] - 2, yB + 48, xs[1] + 2, yB + 48, { c: ACC, w: 1.8, size: 7 }) + lab(xs[2], yB + 62, 'built-in electric field E (n side to p side)', { a: 'middle', size: 10, c: ACC });
  // potential across the junction
  const yP0 = 270;
  const yP1 = 188;
  const V0 = BARRIER_DATA.V0;
  const Vf = (u) => (u < 0.5 ? 2 * u * u : 1 - 2 * (1 - u) * (1 - u));
  const pts = [];
  for (let i = 0; i <= 40; i++) {
    const x = xs[0] + ((xs[4] - xs[0]) * i) / 40;
    const u = Math.min(1, Math.max(0, (x - xs[1]) / (xs[3] - xs[1])));
    pts.push([x, yP0 - (yP0 - yP1) * Vf(u), Vf(u)]);
  }
  s += S.arrow(xs[0], yP0 + 8, xs[0], yP1 - 18, { w: 1, size: 6 }) + lab(xs[0] + 6, yP1 - 12, 'potential V', { size: 10 });
  s += S.line(xs[0], yP0, xs[4], yP0, { w: 1, c: MUT });
  s += S.line(xs[1], yP0 + 6, xs[1], yP1 - 6, { c: MUT, w: 1, dash: '3 3' }) + S.line(xs[3], yP0 + 6, xs[3], yP1 - 6, { c: MUT, w: 1, dash: '3 3' });
  s += S.path(pts.map(([x, y], i) => `${i ? 'L' : 'M'}${f1(x)} ${f1(y)}`).join(' '), { c: ACC, w: 2 });
  s += S.line(xs[3], yP1, xs[4], yP1, { c: MUT, w: 1, dash: '3 3' });
  s += S.arrow(xs[4] - 20, yP0 - 3, xs[4] - 20, yP1 + 3, { w: 1.2, size: 5 }) + S.arrow(xs[4] - 20, yP1 + 3, xs[4] - 20, yP0 - 3, { w: 1.2, size: 5 }) + lab(xs[4] - 26, (yP0 + yP1) / 2 + 4, `barrier V₀ ≈ ${V0} V (Si)`, { a: 'end', size: 10 });
  s += lab(xs[0] + 30, yP0 + 18, 'p side lower', { size: 10, c: MUT }) + lab(xs[4] - 70, yP0 + 18, 'n side higher', { size: 10, c: MUT });
  s += lab(w / 2, h - 2, 'Depletion width about 1 μm; drawn much wider. Not to scale.', { a: 'middle', size: 10, c: MUT });
  const mono = pts.every((p, i) => i === 0 || p[1] <= pts[i - 1][1] + 1e-9);
  check(neg === pos, `junction: ${neg} negative acceptor ions on the p side equal ${pos} positive donor ions on the n side (charge neutral)`);
  check(mono && close(Vf(0.5), 0.5) && close(pts[0][2], 0) && close(pts[pts.length - 1][2], 1), 'potential curve rises monotonically from the p side to the n side, by V₀ in all, half-way at the junction');
  check(holes.length === elecs.length && elecs.every(([x]) => x > xs[3]) && holes.every(([x]) => x < xs[1]), 'holes drawn only in the p region, electrons only in the n region, none in the depletion region');
  return svgDoc(w, h, 'An unbiased p-n junction: holes are the majority carriers on the p side and electrons on the n side; at the junction a depletion region holds fixed negative ions on the p side and positive ions on the n side with no mobile carriers, producing a built-in electric field directed from the n side to the p side; the potential rises by the barrier V0, about 0.7 volt for silicon, from the p side to the n side', s);
})();

// ================================================================ forward and reverse bias
export const BIAS = (() => {
  const w = 540;
  const h = 214;
  let s = '';
  const widths = { eq: 40, fwd: 12, rev: 76 };
  const panels = [
    { name: 'Forward bias', x0: 4, posLeft: true, wd: widths.fwd },
    { name: 'Reverse bias', x0: 274, posLeft: false, wd: widths.rev },
  ];
  const res = [];
  for (const p of panels) {
    const { x0 } = p;
    const xl = x0 + 20;
    const xr = x0 + 240;
    const xm = x0 + 130;
    const yT = 40;
    const yB = 90;
    s += lab(x0 + 130, 22, p.name, { a: 'middle', size: 12, w: 'bold' });
    s += S.rect(xl, yT, xr - xl, yB - yT, { c: MUT, sw: 1, fill: 'none' }) + S.rect(xm - p.wd / 2, yT, p.wd, yB - yT, { fill: FILL, fop: 0.9, c: ACC, sw: 1, dash: '4 3' });
    s += lab(xl + 30, yB - 24, 'p', { a: 'middle', size: 14, w: 'bold' }) + lab(xr - 30, yB - 24, 'n', { a: 'middle', size: 14, w: 'bold' });
    s += S.line(xm - p.wd / 2, yB + 14, xm + p.wd / 2, yB + 14, { w: 1.2 }) + S.line(xm - p.wd / 2, yB + 9, xm - p.wd / 2, yB + 19, { w: 1.2 }) + S.line(xm + p.wd / 2, yB + 9, xm + p.wd / 2, yB + 19, { w: 1.2 });
    s += lab(xm, yB + 32, p.posLeft ? 'depletion region narrows' : 'depletion region widens', { a: 'middle', size: 10 });
    // battery below, wires to p (left) and n (right)
    const yBat = 158;
    const xBat = xm;
    s += W(x0 + 50, yB, x0 + 50, yBat) + W(x0 + 50, yBat, xBat - 6, yBat) + cellH(xBat, yBat, p.posLeft) + W(xBat + 6, yBat, x0 + 210, yBat) + W(x0 + 210, yBat, x0 + 210, yB);
    const plusX = p.posLeft ? x0 + 50 : x0 + 210;
    s += lab(p.posLeft ? xBat - 16 : xBat + 16, yBat - 14, '+', { a: 'middle', size: 13, w: 'bold' }) + lab(p.posLeft ? xBat + 16 : xBat - 16, yBat - 14, '−', { a: 'middle', size: 13, w: 'bold' });
    if (p.posLeft) {
      s += cur(x0 + 50, 126, UP, 'I', { lx: -12, ly: 4, a: 'end' }) + cur(x0 + 210, 126, DOWN, '', {});
      s += lab(xm, yBat + 28, 'conventional current: milliamperes', { a: 'middle', size: 10, c: MUT });
    } else s += lab(xm, yBat + 28, 'only a tiny reverse current: microamperes or less', { a: 'middle', size: 10, c: MUT });
    res.push({ ...p, positiveOnP: plusX === x0 + 50 });
  }
  check(res[0].positiveOnP && !res[1].positiveOnP, 'bias: forward when the battery + terminal is joined to the p side, reverse when it is joined to the n side');
  check(widths.fwd < widths.eq && widths.eq < widths.rev, 'depletion region drawn narrower than at equilibrium in forward bias and wider in reverse bias');
  return svgDoc(w, h, 'A p-n junction diode connected to a battery in two ways: in forward bias the positive terminal is joined to the p side, the depletion region narrows and a current flows; in reverse bias the positive terminal is joined to the n side, the depletion region widens and only a very small current flows', s);
})();

// ================================================================ diode circuits for the worked examples
export const CIRC_DATA = { E: 6.0, Ra: 220, R1: 150, R2: 330 };
export const DIODE_CIRCS = (() => {
  const { E, Ra, R1, R2 } = CIRC_DATA;
  const w = 540;
  const h = 224;
  let s = '';
  const Ia = seriesI(E, Ra, VSI);
  const I1 = seriesI(E, R1, VSI);
  // (a) series loop: battery + (top) → diode (forward) → R → back
  s += lab(110, 20, '(a) one diode and a resistor', { a: 'middle', size: 11, w: 'bold' });
  const da = diode(95, 48, RIGHT);
  s += W(36, 48, da.a[0], 48) + da.svg + W(da.k[0], 48, 190, 48) + W(190, 48, 190, 70) + resV(190, 70, 178, '', {}) + W(190, 178, 36, 178) + W(36, 48, 36, 108) + cellV(36, 116, '') + W(36, 124, 36, 178);
  s += lab(204, 128, 'R', { size: 11 }) + lab(18, 118, 'E', { a: 'end', size: 11 }) + lab(95, 70, 'Si', { a: 'middle', size: 10, c: MUT });
  s += cur(145, 48, RIGHT, 'I', { ly: -8 });
  // (b) two branches
  s += lab(400, 20, '(b) two branches from one battery', { a: 'middle', size: 11, w: 'bold' });
  const b1 = diode(360, 82, DOWN);
  const b2 = diode(450, 82, UP);
  s += W(290, 48, 450, 48) + W(290, 48, 290, 108) + cellV(290, 116, '') + W(290, 124, 290, 178) + W(290, 178, 450, 178);
  s += W(360, 48, 360, b1.a[1]) + b1.svg + W(360, b1.k[1], 360, 118) + resV(360, 118, 178, 'R₁', { lx: 10 });
  s += W(450, 48, 450, b2.k[1]) + b2.svg + W(450, b2.a[1], 450, 118) + resV(450, 118, 178, 'R₂', { lx: 10 });
  s += dot(360, 48) + dot(360, 178) + dot(450, 48) + dot(450, 178) + lab(272, 118, 'E', { a: 'end', size: 11 });
  s += cur(360, 62, DOWN, 'I₁', { lx: -12, ly: 4, a: 'end' }) + lab(386, 86, 'D₁', { size: 10 }) + lab(476, 86, 'D₂', { size: 10 });
  s += lab(w - 6, h - 4, 'Diode arrow points the way forward current flows', { a: 'end', size: 10, c: MUT });
  const kcl = close(Ia, 5.3 / 220) && close(I1, 5.3 / 150);
  check(kcl, `diode circuits: (a) I = (6.0 − 0.7)/220 = ${(Ia * 1000).toFixed(2)} mA, (b) D₁ branch ${(I1 * 1000).toFixed(2)} mA`);
  check(b1.a[1] < b1.k[1] && b2.a[1] > b2.k[1] && da.a[0] < da.k[0], 'D₁ has its anode towards the battery + rail (forward); D₂ has its cathode towards it (reverse): no current in branch 2');
  return svgDoc(w, h, 'Two diode circuits: (a) a battery, a silicon diode in the forward direction and a resistor in series; (b) one battery feeding two parallel branches, the first with a forward-biased diode and a resistor, the second with a reverse-biased diode and a resistor, so that only the first branch carries current', s);
})();

// ================================================================ half-wave rectifier with waveforms
export const HW_DATA = { Vm: 10, cycles: 2 };
export const RECT_HW = (() => {
  const w = 570;
  const h = 268;
  let s = '';
  // circuit
  s += acSource(24, 90) + W(24, 50, 24, 78) + W(24, 102, 24, 130) + W(24, 50, 56, 50) + W(24, 130, 56, 130);
  s += coil(56, 50, 130, 4, -1) + S.line(66, 46, 66, 134, { w: 1.6 }) + S.line(72, 46, 72, 134, { w: 1.6 }) + coil(82, 50, 130, 4, 1);
  const d = diode(135, 50, RIGHT);
  s += W(82, 50, d.a[0], 50) + d.svg + W(d.k[0], 50, 200, 50) + resV(200, 50, 130, 'R_L', { lx: 12 }) + W(200, 130, 82, 130);
  s += lab(135, 34, 'D', { a: 'middle', size: 11 }) + lab(24, 152, 'a.c.', { a: 'middle', size: 10 }) + lab(24, 164, 'mains', { a: 'middle', size: 10 }) + lab(84, 152, 'transformer', { a: 'middle', size: 10 });
  s += cur(170, 50, RIGHT, 'I', { ly: -8 });
  s += S.lines(8, 196, ['Transformer: changes the a.c. to a suitable', 'size; diode: lets current pass in one direction;', 'R_L: the load.'], { size: 10, dy: 13, c: MUT });
  // waveforms
  const x0 = 318;
  const wPx = 220;
  const cyc = HW_DATA.cycles;
  const Vm = HW_DATA.Vm;
  const vIn = (ph) => Math.sin(ph);
  const vOut = (ph) => hwOut(Vm * Math.sin(ph)) / Vm;
  const yIn = 62;
  const yOut = 230;
  const A = 36;
  s += axisY(x0, yIn + 44, yIn - 46) + axisX(x0, yIn, wPx, 't') + lab(x0 + 6, yIn - 44, 'input v_s (peak V_m)', { size: 10 });
  const tin = trace(x0, yIn, wPx, A, vIn, cyc, { c: BLUE });
  s += tin.svg;
  s += axisY(x0, yOut + 6, yOut - 52) + axisX(x0, yOut, wPx, 't') + lab(x0 + 6, yOut - 50, 'output across R_L', { size: 10 });
  const tout = trace(x0, yOut, wPx, A, vOut, cyc, { c: RAY });
  s += tout.svg;
  for (let i = 0; i <= 2 * cyc; i++) s += S.line(x0 + (wPx * i) / (2 * cyc), yIn + 40, x0 + (wPx * i) / (2 * cyc), yOut, { c: MUT, w: 0.8, dash: '2 4' });
  s += lab(x0 + wPx / (2 * cyc) / 2, yOut + 16, '+', { a: 'middle', size: 10, c: MUT });
  s += S.line(x0, yIn + 50, x0 + wPx / cyc, yIn + 50, { w: 1.2 }) + S.line(x0, yIn + 45, x0, yIn + 55, { w: 1.2 }) + S.line(x0 + wPx / cyc, yIn + 45, x0 + wPx / cyc, yIn + 55, { w: 1.2 }) + lab(x0 + wPx / cyc / 2, yIn + 66, 'T = 20 ms', { a: 'middle', size: 10 });
  s += lab(x0 + wPx / 2, h - 2, 'output has the same frequency as the input: 50 Hz', { a: 'middle', size: 10, c: MUT });
  // self-checks
  const hump = (pts) => {
    let n = 0;
    let up = false;
    for (const [, y] of pts) {
      const high = y < yOut - 1;
      if (high && !up) n++;
      up = high;
    }
    return n;
  };
  check(tout.pts.every(([, y]) => y <= yOut + 1e-6) && hump(tout.pts) === cyc, `half-wave: output never below zero, ${hump(tout.pts)} humps in ${cyc} cycles (same frequency as the input)`);
  check(d.a[0] < d.k[0] && Math.abs(hwOut(5, 0.7) - 4.3) < 1e-12 && hwOut(-5, 0.7) === 0, 'half-wave circuit: diode anode on the secondary side, conducts in the positive half-cycles, blocks in the negative');
  return svgDoc(w, h, 'Half-wave rectifier: an a.c. source feeds a transformer whose secondary is joined in series through one diode to a load resistor; beside it, the sinusoidal input voltage and the output across the load, which keeps only the positive half-cycles and so has the same frequency as the input, 50 hertz', s);
})();

// ================================================================ centre-tap full-wave rectifier with waveforms
export const FW_DATA = { Vm: 10, cycles: 2 };
export const RECT_FW = (() => {
  const w = 600;
  const h = 330;
  let s = '';
  s += acSource(24, 100) + W(24, 40, 24, 88) + W(24, 112, 24, 160) + W(24, 40, 56, 40) + W(24, 160, 56, 160);
  s += coil(56, 40, 160, 6, -1) + S.line(66, 36, 66, 164, { w: 1.6 }) + S.line(72, 36, 72, 164, { w: 1.6 }) + coil(82, 40, 160, 6, 1);
  const d1 = diode(140, 40, RIGHT);
  const d2 = diode(140, 160, RIGHT);
  s += W(82, 40, d1.a[0], 40) + d1.svg + W(d1.k[0], 40, 240, 40);
  s += W(82, 160, d2.a[0], 160) + d2.svg + W(d2.k[0], 160, 285, 160) + W(285, 160, 285, 40) + W(285, 40, 240, 40);
  s += resV(240, 40, 100, 'R_L', { lx: -8, anchor: 'end' }) + W(82, 100, 240, 100);
  s += dot(240, 40) + dot(82, 100);
  s += lab(76, 32, 'A', { a: 'end', size: 11, w: 'bold' }) + lab(76, 176, 'B', { a: 'end', size: 11, w: 'bold' }) + lab(150, 116, 'centre tap C', { a: 'middle', size: 10 });
  s += lab(140, 24, 'D₁', { a: 'middle', size: 11 }) + lab(140, 144, 'D₂', { a: 'middle', size: 11 });
  s += cur(190, 100, LEFT, 'I', { ly: -8 });
  s += S.lines(8, 206, ['Centre-tap transformer: gives two secondary', 'voltages v_A and v_B, equal and opposite', 'with respect to C. D₁ conducts when A is', 'positive, D₂ when B is positive; the load', 'current always flows down through R_L.'], { size: 10, dy: 13, c: MUT });
  // waveforms
  const x0 = 352;
  const wPx = 220;
  const cyc = FW_DATA.cycles;
  const Vm = FW_DATA.Vm;
  const A = 28;
  const yA = 56;
  const yB = 140;
  const yO = 270;
  s += axisX(x0, yA, wPx, 't') + axisY(x0, yA + 34, yA - 38) + lab(x0 + 6, yA - 36, 'v_A (D₁ conducts when positive)', { size: 10 });
  const tA = trace(x0, yA, wPx, A, (ph) => Math.sin(ph), cyc, { c: BLUE });
  s += tA.svg;
  s += axisX(x0, yB, wPx, 't') + axisY(x0, yB + 34, yB - 38) + lab(x0 + 6, yB - 36, 'v_B = −v_A (D₂ conducts when positive)', { size: 10 });
  const tB = trace(x0, yB, wPx, A, (ph) => -Math.sin(ph), cyc, { c: GRN });
  s += tB.svg;
  s += axisX(x0, yO, wPx, 't') + axisY(x0, yO + 6, yO - 44) + lab(x0 + 6, yO - 42, 'output across R_L', { size: 10 });
  // output drawn hump by hump in the colour of the diode that conducts
  const nHump = 2 * cyc;
  const out1 = [];
  let both = 0;
  let neither = 0;
  for (let hmp = 0; hmp < nHump; hmp++) {
    const pts = [];
    for (let i = 0; i <= 24; i++) {
      const ph = (hmp + i / 24) * Math.PI;
      const vA = Vm * Math.sin(ph);
      const vB = -vA;
      const o = fwOut(vA);
      const c1 = vA > 1e-9;
      const c2 = vB > 1e-9;
      if (c1 && c2) both++;
      if (!c1 && !c2 && i > 0 && i < 24) neither++;
      if (Math.abs(o - Math.max(hwOut(vA), hwOut(vB))) > 1e-9) both++;
      pts.push([x0 + (wPx * (hmp + i / 24)) / nHump, yO - (A * o) / Vm]);
    }
    out1.push(pts);
    s += S.path(pts.map(([x, y], i) => `${i ? 'L' : 'M'}${f1(x)} ${f1(y)}`).join(' '), { c: hmp % 2 === 0 ? BLUE : GRN, w: 1.8, join: 'round' });
  }
  for (let i = 0; i <= nHump; i++) s += S.line(x0 + (wPx * i) / nHump, yA + 30, x0 + (wPx * i) / nHump, yO, { c: MUT, w: 0.8, dash: '2 4' });
  s += lab(x0 + 10, yO + 16, 'blue: D₁ conducting; green: D₂ conducting', { size: 10, c: MUT });
  s += lab(x0 + wPx / 2, h - 2, 'output has twice the input frequency: 100 Hz', { a: 'middle', size: 10, c: MUT });
  check(both === 0 && neither === 0, 'full-wave: at every sample exactly one of D₁, D₂ conducts and the output equals |v_A|');
  check(out1.length === 2 * cyc && out1.every((p) => Math.min(...p.map((q) => q[1])) < yO - A + 1 && p.every(([, y]) => y <= yO + 1e-6)), `full-wave: ${out1.length} humps in ${cyc} input cycles (twice the input frequency), none below zero`);
  check(d1.a[0] < d1.k[0] && d2.a[0] < d2.k[0], 'full-wave circuit: both anodes on the secondary ends, both cathodes joined to the top of R_L; the tap returns the current');
  return svgDoc(w, h, 'Centre-tap full-wave rectifier: a transformer with a centre-tapped secondary; the two ends A and B go to the anodes of diodes D1 and D2, whose cathodes are joined to one end of the load resistor, the centre tap C being joined to the other end; beside it the voltages at A and B, opposite in phase, and the output across the load made of two humps for every input cycle, so its frequency is 100 hertz', s);
})();

// ================================================================ LED
export const LED_FIG = (() => {
  const w = 520;
  const h = 232;
  let s = '';
  s += lab(110, 20, 'LED in a forward-biased circuit', { a: 'middle', size: 11, w: 'bold' });
  const dl = diode(190, 108, DOWN);
  s += W(36, 46, 80, 46) + resH(80, 150, 46, 'R', { ly: -12 }) + W(150, 46, 190, 46) + W(190, 46, 190, dl.a[1]) + dl.svg + W(190, dl.k[1], 190, 190) + W(190, 190, 36, 190) + W(36, 46, 36, 108) + cellV(36, 116, '') + W(36, 124, 36, 190);
  s += lab(18, 118, 'V', { a: 'end', size: 11 }) + lab(50, 40, '+', { a: 'middle', size: 12, w: 'bold' }) + lab(204, 132, 'LED', { size: 11 });
  s += cur(114, 190, LEFT, 'I', { ly: 16 });
  const arrows = [[[203, 90], [236, 62]], [[211, 102], [244, 74]]];
  for (const [[x1, y1], [x2, y2]] of arrows) s += S.arrow(x1, y1, x2, y2, { c: RAY, w: 1.6, size: 7 });
  s += lab(224, 52, 'light', { size: 10, c: RAY });
  // band picture
  const bx = 300;
  const bw = 190;
  s += lab(bx + bw / 2, 20, 'what happens at the junction', { a: 'middle', size: 11, w: 'bold' });
  s += S.rect(bx, 36, bw, 40, { fill: FILL, fop: 0.9, c: BLUE }) + lab(bx + bw / 2, 56, 'conduction band', { a: 'middle', size: 10 });
  s += S.rect(bx, 140, bw, 40, { fill: FILL, fop: 0.9, c: GRN }) + lab(bx + bw / 2, 164, 'valence band', { a: 'middle', size: 10 });
  s += S.circle(bx + 50, 66, 3.5, { c: 'none', sw: 0, fill: BLUE }) + S.circle(bx + 50, 150, 4, { sw: 1.4, c: RAY });
  s += S.arrow(bx + 50, 72, bx + 50, 144, { w: 1.4, size: 6 }) + lab(bx + 58, 104, 'electron falls', { size: 10 }) + lab(bx + 58, 117, 'into a hole', { size: 10 });
  const wv = [];
  for (let i = 0; i <= 8; i++) wv.push(`${i ? 'L' : 'M'}${f1(bx + 112 + i * 9)} ${f1(108 + (i % 2 ? 7 : -7) * (i > 0 && i < 8 ? 1 : 0))}`);
  s += S.path(wv.join(' '), { c: RAY, w: 1.6 }) + S.head(bx + 112 + 8 * 9 + 6, 108, RIGHT, { size: 8, c: RAY }) + lab(bx + 150, 90, 'photon', { a: 'middle', size: 10, c: RAY }) + lab(bx + 150, 134, 'h ν ≈ Eg', { a: 'middle', size: 11, c: RAY });
  s += S.arrow(bx - 8, 78, bx - 8, 138, { w: 1, size: 5 }) + S.arrow(bx - 8, 138, bx - 8, 78, { w: 1, size: 5 }) + lab(bx - 12, 112, 'Eg', { a: 'end', size: 11 });
  s += lab(bx + bw / 2, 206, 'Recombination in the depletion region releases the', { a: 'middle', size: 10, c: MUT }) + lab(bx + bw / 2, 219, 'energy as light: colour set by the band gap.', { a: 'middle', size: 10, c: MUT });
  const away = arrows.every(([[x1, y1], [x2, y2]]) => Math.hypot(x2 - 190, y2 - 108) > Math.hypot(x1 - 190, y1 - 108));
  check(away && dl.a[1] < dl.k[1], 'LED: photon arrows point away from the diode; anode (top) joined to the + rail, so it is forward biased');
  return svgDoc(w, h, 'A light-emitting diode in a circuit with a battery and a series resistor, connected in the forward direction with arrows showing light leaving it; beside it, the energy bands: an electron falls from the conduction band into a hole in the valence band and the energy of about the band gap leaves as a photon', s);
})();

// ================================================================ photodiode
export const PD_FIG = (() => {
  const w = 520;
  const h = 232;
  let s = '';
  s += lab(110, 20, 'photodiode in reverse bias', { a: 'middle', size: 11, w: 'bold' });
  const dp = diode(190, 108, UP);
  s += W(36, 46, 80, 46) + resH(80, 150, 46, 'R', { ly: -12 }) + W(150, 46, 190, 46) + W(190, 46, 190, dp.k[1]) + dp.svg + W(190, dp.a[1], 190, 190) + W(190, 190, 36, 190) + W(36, 46, 36, 108) + cellV(36, 116, '') + W(36, 124, 36, 190);
  s += lab(18, 118, 'V', { a: 'end', size: 11 }) + lab(50, 40, '+', { a: 'middle', size: 12, w: 'bold' }) + lab(204, 132, 'photodiode', { size: 11 });
  s += cur(114, 190, LEFT, 'I', { ly: 16 });
  const arrows = [[[250, 62], [217, 94]], [[258, 76], [225, 108]]];
  for (const [[x1, y1], [x2, y2]] of arrows) s += S.arrow(x1, y1, x2, y2, { c: RAY, w: 1.6, size: 7 });
  s += lab(246, 52, 'light', { size: 10, c: RAY });
  // junction detail
  const x0 = 290;
  const yT = 52;
  const yB = 120;
  const xl = x0;
  const xr = x0 + 210;
  const xm = x0 + 105;
  const wd = 90;
  s += lab(x0 + 105, 20, 'what happens at the junction', { a: 'middle', size: 11, w: 'bold' });
  s += S.rect(xl, yT, xr - xl, yB - yT, { fill: 'none', c: MUT, sw: 1 }) + S.rect(xm - wd / 2, yT, wd, yB - yT, { fill: FILL, fop: 0.9, c: ACC, sw: 1, dash: '4 3' });
  s += lab(xl + 20, yT + 20, 'p', { a: 'middle', size: 14, w: 'bold' }) + lab(xr - 20, yT + 20, 'n', { a: 'middle', size: 14, w: 'bold' });
  s += S.arrow(xm + 38, yT + 12, xm + 12, yT + 12, { c: ACC, w: 1.4, size: 6 }) + lab(xm + 42, yT + 16, 'E', { size: 11, c: ACC });
  // photon creates a pair
  const px = xm;
  const py = 92;
  s += S.path(`M${px - 8} ${yT - 24} L${px - 2} ${yT - 14} L${px - 8} ${yT - 4} L${px - 2} ${py - 22} L${px} ${py - 8}`, { c: RAY, w: 1.4 });
  const e = [px + 4, py];
  const hl = [px - 4, py];
  s += S.circle(e[0], e[1], 3.4, { c: 'none', sw: 0, fill: BLUE }) + S.circle(hl[0], hl[1], 3.8, { sw: 1.4, c: RAY });
  s += S.arrow(e[0] + 4, e[1], xm + wd / 2 + 24, e[1], { c: BLUE, w: 1.4, size: 6 }) + S.arrow(hl[0] - 4, hl[1], xm - wd / 2 - 24, hl[1], { c: RAY, w: 1.4, size: 6 });
  s += lab(xm + wd / 2 + 4, e[1] + 16, 'e⁻ to n side', { size: 10, c: BLUE }) + lab(xm - wd / 2 - 4, hl[1] + 16, 'hole to p side', { a: 'end', size: 10, c: RAY });
  s += S.lines(x0, 160, ['A photon with h ν ≥ Eg makes an', 'electron-hole pair in the depletion', 'region; the field sweeps them apart,', 'so the reverse current rises with light.'], { size: 10, dy: 13, c: MUT });
  const towardsDiode = arrows.every(([[x1, y1], [x2, y2]]) => Math.hypot(x2 - 190, y2 - 108) < Math.hypot(x1 - 190, y1 - 108));
  check(towardsDiode && dp.k[1] < dp.a[1], 'photodiode: light arrows point towards the diode; cathode (top) joined to the + rail, so it is reverse biased');
  check(e[0] > hl[0] && xm + wd / 2 + 24 > e[0] && xm - wd / 2 - 24 < hl[0], 'carriers drift the right way: the electron towards the n side (against E), the hole towards the p side (along E)');
  return svgDoc(w, h, 'A photodiode in a circuit with a battery and a series resistor, connected in reverse bias with light arriving at it; beside it, a photon creating an electron-hole pair in the depletion region, where the built-in field, directed from the n side to the p side, sweeps the electron to the n side and the hole to the p side, increasing the reverse current', s);
})();

// ================================================================ solar cell
export const SOLAR_FIG = (() => {
  const w = 520;
  const h = 250;
  let s = '';
  const xl = 120;
  const xr = 300;
  const yP = [86, 112];
  const yD = [112, 140];
  const yN = [140, 206];
  s += S.rect(xl, yP[0], xr - xl, yP[1] - yP[0], { fill: 'none', c: MUT, sw: 1.2 }) + lab(xl + 8, yP[0] + 17, 'p (thin)', { size: 10 });
  s += S.rect(xl, yD[0], xr - xl, yD[1] - yD[0], { fill: FILL, fop: 0.9, c: ACC, sw: 1.2, dash: '4 3' }) + lab(xl + 8, yD[0] + 18, 'depletion region', { size: 10 });
  s += S.rect(xl, yN[0], xr - xl, yN[1] - yN[0], { fill: 'none', c: MUT, sw: 1.2 }) + lab(xl + 8, yN[0] + 20, 'n', { size: 12, w: 'bold' });
  s += S.line(xl + 10, yP[0] - 3, xr - 10, yP[0] - 3, { c: ACC, w: 3 }) + lab(xl - 8, yP[0] + 1, 'top contact (+)', { a: 'end', size: 10 });
  s += S.line(xl, yN[1] + 3, xr, yN[1] + 3, { c: ACC, w: 3 }) + lab(xl - 8, yN[1] + 7, 'back contact (−)', { a: 'end', size: 10 });
  for (const x of [170, 210, 250]) s += S.arrow(x - 14, 26, x, 76, { c: RAY, w: 1.6, size: 7 });
  s += lab(150, 20, 'sunlight', { size: 10, c: RAY });
  const px = 232;
  const py = 126;
  s += S.circle(px - 7, py, 3.4, { c: 'none', sw: 0, fill: BLUE }) + S.circle(px + 7, py, 3.8, { sw: 1.4, c: RAY });
  s += S.arrow(px - 7, py + 5, px - 7, yN[0] + 44, { c: BLUE, w: 1.4, size: 6 }) + S.arrow(px + 7, py - 5, px + 7, yP[0] + 6, { c: RAY, w: 1.4, size: 6 });
  s += lab(px + 2, yN[0] + 44, 'electrons to n', { size: 10, c: BLUE }) + lab(px + 16, yP[0] + 18, 'holes to p', { size: 10, c: RAY });
  s += S.arrow(xr - 30, yD[1] - 4, xr - 30, yD[0] + 4, { c: ACC, w: 1.4, size: 6 }) + lab(xr - 36, yD[0] + 18, 'E', { a: 'end', size: 10, c: ACC });
  const xw = 350;
  s += W(xr - 10, yP[0] - 3, xw, yP[0] - 3) + W(xw, yP[0] - 3, xw, 120) + resV(xw, 120, 175, 'R', { lx: 12 }) + W(xw, 175, xw, yN[1] + 3) + W(xw, yN[1] + 3, xr, yN[1] + 3);
  s += cur(xw, 104, DOWN, 'I', { lx: 12, ly: 4, a: 'start' });
  s += S.lines(xw + 50, 80, ['external circuit:', 'current flows from', 'the p side to the n side'], { size: 10, dy: 13 });
  s += S.lines(xw + 50, 150, ['No battery is used:', 'the junction field', 'separates the pairs and', 'the cell is the source.'], { size: 10, dy: 13, c: MUT });
  s += lab(xl + 90, h - 6, 'large-area p-n junction in silicon', { a: 'middle', size: 10, c: MUT });
  check(px - 7 < px + 7 && yN[0] + 44 > py && yP[0] + 6 < py, 'solar cell: electron (against the field) goes down to the n side, hole (along the field) goes up to the p side');
  check(yP[0] < yN[0] && yD[0] === yP[1] && yN[0] === yD[1], 'solar cell: the thin p layer is on top, where the light reaches first; the depletion region lies between p and n');
  return svgDoc(w, h, 'A solar cell: sunlight falls on a thin p layer above a depletion region and an n layer; photons make electron-hole pairs near the junction, and the built-in field sends electrons down to the n layer, which becomes the negative terminal, and holes up to the p layer, the positive terminal; a load resistor joined between them carries a current from the p side to the n side with no battery', s);
})();

// ================================================================ Zener voltage regulator
export const ZREG_DATA = { Vin: 8.6, Rs: 100, Vz: 5.6, RL: 560 };
export const ZENER_REG = (() => {
  const { Vin, Rs, Vz, RL } = ZREG_DATA;
  const z = zreg(ZREG_DATA);
  const w = 440;
  const h = 250;
  let s = '';
  const dz = diode(200, 125, UP, { zener: true });
  s += W(40, 50, 70, 50) + resH(70, 150, 50, 'R_s', { ly: -12 }) + W(150, 50, 340, 50);
  s += W(40, 50, 40, 106) + cellV(40, 114, '') + W(40, 122, 40, 200) + W(40, 200, 340, 200);
  s += lab(18, 118, 'V_in', { a: 'end', size: 11 }) + lab(56, 44, '+', { a: 'middle', size: 12, w: 'bold' });
  s += W(200, 50, 200, dz.k[1]) + dz.svg + W(200, dz.a[1], 200, 200) + lab(214, 130, 'Zener', { size: 11 });
  s += resV(290, 50, 200, 'R_L', { lx: 12 }) + dot(200, 50) + dot(200, 200) + dot(290, 50) + dot(290, 200);
  s += W(290, 50, 340, 50) + W(290, 200, 340, 200);
  s += S.arrow(340, 60, 340, 190, { w: 1.2, size: 6 }) + S.arrow(340, 190, 340, 60, { w: 1.2, size: 6 }) + lab(350, 118, 'V_out', { size: 11 }) + lab(350, 132, '= V_Z', { size: 11 });
  s += cur(175, 50, RIGHT, 'I', { ly: -8 }) + cur(200, 80, DOWN, 'I_Z', { lx: -10, ly: 4, a: 'end' }) + cur(290, 66, DOWN, 'I_L', { lx: -10, ly: 4, a: 'end' });
  s += lab(220, h - 8, `${Vin} V in, R_s = ${Rs} Ω, V_Z = ${Vz} V, R_L = ${RL} Ω: I = ${(z.I * 1000).toFixed(0)} mA, I_L = ${(z.IL * 1000).toFixed(0)} mA, I_Z = ${(z.Iz * 1000).toFixed(0)} mA`, { a: 'middle', size: 10, c: MUT });
  check(z.on && close(z.I, z.IL + z.Iz) && close(Vin - z.I * Rs, Vz) && close(z.Vout, Vz) && close(z.I, 0.03) && close(z.IL, 0.01) && close(z.Iz, 0.02), `Zener regulator: I = ${z.I * 1000} mA = I_L ${z.IL * 1000} mA + I_Z ${z.Iz * 1000} mA; V_in − I R_s = V_Z`);
  check(dz.k[1] < dz.a[1], 'Zener drawn with its cathode towards the + rail: reverse biased, so it works in breakdown');
  return svgDoc(w, h, 'Zener diode voltage regulator: an input voltage source feeds a series resistor Rs; a Zener diode connected in reverse, with its cathode to the positive rail, is in parallel with the load resistor RL; the current I through Rs splits into the load current IL and the Zener current IZ, and the output voltage is held at the Zener voltage', s);
})();

export const ALL = { BANDS, LATTICE, DOPED_BANDS, JUNCTION, BIAS, DIODE_CIRCS, RECT_HW, RECT_FW, LED_FIG, PD_FIG, SOLAR_FIG, ZENER_REG };
void arrowHead;
void RAY;
void GRN;
