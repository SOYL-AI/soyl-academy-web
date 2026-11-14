// ch21 Alkanes — SVGs. Molecules are drawn from an atoms-and-bonds model (molkit.mjs), every molecular formula is computed from the
// drawing, conformation angles and the energy curve are computed in JS, and reaction equations drawn in text are atom-counted.
import { svgDoc, S } from './lib.mjs';
import { drawMol, formula, skel, mol, benzene, bounds, lab } from './molkit.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const MUTED = 'var(--diagram-muted)';
const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const BROWN = 'var(--diagram-brown)';
const must = (m, want, what) => chk(formula(m) === want, `${what}: formula computed from the drawing is ${formula(m)} (expected ${want})`);
const at = (m, cx, cy) => {
  const b = bounds(m);
  return drawMol(m, { ox: cx - (b.x0 + b.x1) / 2, oy: cy - (b.y0 + b.y1) / 2 });
};
/** Atom count of a simple formula such as C2H6 or H2O (no brackets). */
const atoms = (f) => {
  const o = {};
  for (const [, el, n] of f.matchAll(/([A-Z][a-z]?)(\d*)/g)) o[el] = (o[el] || 0) + (n ? Number(n) : 1);
  return o;
};
const side = (list) => {
  const o = {};
  for (const [k, f] of list) for (const [el, n] of Object.entries(atoms(f))) o[el] = (o[el] || 0) + k * n;
  return JSON.stringify(Object.entries(o).sort());
};
const balanced = (l, rr) => side(l) === side(rr);
const sub = (f) => f.replace(/\d+/g, (d) => d.split('').map((c) => '₀₁₂₃₄₅₆₇₈₉'[Number(c)]).join(''));
const rad = (d) => (d * Math.PI) / 180;
const pol = (cx, cy, d, L) => [cx + L * Math.cos(rad(d)), cy - L * Math.sin(rad(d))];

// ---------------------------------------------------------------- 1. the three isomers of pentane
const BP = { pentane: 309, methylbutane: 301, neopentane: 283 }; // boiling points, K (36.1, 27.8, 9.5 degrees C)
export const PENTANES = (() => {
  const a = skel(5);
  const b = skel(4, [[1, 'C']]);
  const c = mol([{ x: 0, y: 0 }, { x: -26, y: 0 }, { x: 26, y: 0 }, { x: 0, y: -26 }, { x: 0, y: 26 }], [[0, 1], [0, 2], [0, 3], [0, 4]]);
  must(a, 'C5H12', 'pentane');
  must(b, 'C5H12', '2-methylbutane');
  must(c, 'C5H12', '2,2-dimethylpropane');
  chk(BP.pentane > BP.methylbutane && BP.methylbutane > BP.neopentane, 'pentane isomers: boiling point falls with branching (309 K, 301 K, 283 K)');
  const body = [];
  [[a, 'pentane', 'straight chain', BP.pentane], [b, '2-methylbutane', 'one branch', BP.methylbutane], [c, '2,2-dimethylpropane', 'two branches on one carbon', BP.neopentane]].forEach(([m, name, kind, bp], i) => {
    const x = 78 + i * 157;
    body.push(at(m, x, 62));
    body.push(lab(x, 118, name, { a: 'middle', w: 'bold', size: 11 }));
    body.push(lab(x, 134, kind, { a: 'middle', size: 10 }));
    body.push(lab(x, 150, `boiling point ${bp} K`, { a: 'middle', size: 10, c: RED }));
  });
  body.push(lab(235, 14, 'C₅H₁₂: three chain isomers', { a: 'middle', size: 12, w: 'bold', c: BLUE }));
  body.push(lab(235, 176, 'More branching, more compact molecule, lower boiling point.', { a: 'middle', size: 10 }));
  return svgDoc(470, 186, 'The three chain isomers of pentane, C5H12: pentane (boiling point 309 K), 2-methylbutane (301 K) and 2,2-dimethylpropane (283 K).', body.join(''));
})();

// ---------------------------------------------------------------- 2. conformations of ethane: Sawhorse and Newman projections
export const CONFORM = (() => {
  const FRONT = [75, 195, 315];
  const BACK_ST = [15, 135, 255];
  const BACK_EC = FRONT;
  const near = (f, b) => Math.max(...f.map((x) => Math.min(...b.map((y) => Math.min(Math.abs(x - y) % 360, 360 - (Math.abs(x - y) % 360))))));
  chk(near(FRONT, BACK_ST) === 60, 'staggered: every back C–H bond lies 60° from the nearest front C–H bond (computed 60°)');
  chk(near(FRONT, BACK_EC) === 0, 'eclipsed: back C–H bonds lie behind the front C–H bonds (dihedral 0°)');
  chk(new Set([...FRONT, ...BACK_ST].map((x) => x % 60)).size === 1, 'staggered: six bond angles are 60° apart');
  const sawhorse = (cx, cy, back) => {
    const F = [cx - 14, cy + 16];
    const B = [cx + 14, cy - 16];
    const L = 26;
    const out = [S.line(F[0], F[1], B[0], B[1], { w: 2 })];
    for (const d of FRONT) {
      const [x, y] = pol(F[0], F[1], d, L);
      out.push(S.line(F[0], F[1], x, y, { w: 1.6 }));
      const [tx, ty] = pol(F[0], F[1], d, L + 9);
      out.push(lab(tx, ty + 4, 'H', { a: 'middle', size: 11 }));
    }
    for (const d of back) {
      const [x, y] = pol(B[0], B[1], d, L);
      out.push(S.line(B[0], B[1], x, y, { w: 1.6, c: MUTED }));
      const [tx, ty] = pol(B[0], B[1], d, L + 9);
      out.push(lab(tx, ty + 4, 'H', { a: 'middle', size: 11, c: MUTED }));
    }
    out.push(lab(F[0] - 10, F[1] + 13, 'C', { a: 'middle', size: 10, c: BLUE }));
    out.push(lab(B[0] + 11, B[1] - 6, 'C', { a: 'middle', size: 10, c: BLUE }));
    return out.join('');
  };
  const newman = (cx, cy, back, rot = 0) => {
    const R = 21;
    const out = [S.circle(cx, cy, R, { w: 1.8 })];
    const F = [90, 210, 330];
    for (const d of F) {
      const [x, y] = pol(cx, cy, d, R + 17);
      out.push(S.line(cx, cy, x, y, { w: 1.8 }));
      const [tx, ty] = pol(cx, cy, d, R + 26);
      out.push(lab(tx, ty + 4, 'H', { a: 'middle', size: 11 }));
    }
    for (const d0 of back) {
      const d = d0 + rot;
      const [x1, y1] = pol(cx, cy, d, R);
      const [x2, y2] = pol(cx, cy, d, R + 17);
      out.push(S.line(x1, y1, x2, y2, { w: 1.8, c: MUTED }));
      const [tx, ty] = pol(cx, cy, d, R + 26);
      out.push(lab(tx, ty + 4, 'H', { a: 'middle', size: 11, c: MUTED }));
    }
    return out.join('');
  };
  const body = [
    lab(235, 14, 'Ethane, CH₃–CH₃: two extreme conformations', { a: 'middle', size: 12, w: 'bold', c: BLUE }),
    lab(120, 38, 'Staggered', { a: 'middle', size: 12, w: 'bold', c: GREEN }),
    lab(350, 38, 'Eclipsed', { a: 'middle', size: 12, w: 'bold', c: RED }),
    sawhorse(120, 100, BACK_ST),
    sawhorse(350, 100, BACK_EC.map((d) => d + 0)),
    lab(8, 56, 'Sawhorse', { size: 10, w: 'bold' }),
    S.line(20, 148, 450, 148, { c: MUTED, w: 1, dash: '3 3' }),
    newman(120, 222, [270, 30, 150]),
    newman(350, 222, BACK_EC.length ? [90, 210, 330] : [], 16),
    lab(8, 166, 'Newman', { size: 10, w: 'bold' }),
    lab(120, 292, 'dihedral angle 60° (lowest energy)', { a: 'middle', size: 10 }),
    lab(350, 292, 'dihedral angle 0° (highest energy)', { a: 'middle', size: 10 }),
    lab(235, 310, 'Grey bonds: back carbon. Black bonds: front carbon.', { a: 'middle', size: 10 }),
    lab(235, 324, 'In the eclipsed Newman drawing the back bonds are turned slightly so that they can be seen.', { a: 'middle', size: 10 }),
  ];
  return svgDoc(470, 332, 'Sawhorse and Newman projections of the staggered and eclipsed conformations of ethane. In the staggered form the C-H bonds on the two carbons are 60 degrees apart; in the eclipsed form they are directly behind each other.', body.join(''));
})();

// ---------------------------------------------------------------- 3. energy against dihedral angle for ethane
const V0 = 12.5; // torsional barrier, kJ mol-1
const E = (th) => (V0 / 2) * (1 + Math.cos(rad(3 * th)));
export const ENERGY = (() => {
  chk(Math.abs(E(0) - V0) < 1e-9 && Math.abs(E(120) - V0) < 1e-9 && Math.abs(E(240) - V0) < 1e-9 && Math.abs(E(360) - V0) < 1e-9, 'energy curve: maxima 12.5 kJ/mol at 0, 120, 240 and 360 degrees (eclipsed)');
  chk(Math.abs(E(60)) < 1e-9 && Math.abs(E(180)) < 1e-9 && Math.abs(E(300)) < 1e-9, 'energy curve: minima 0 kJ/mol at 60, 180 and 300 degrees (staggered)');
  const x0 = 62;
  const x1 = 440;
  const y0 = 180;
  const y1 = 46;
  const X = (t) => x0 + ((x1 - x0) * t) / 360;
  const Y = (e) => y0 - ((y0 - y1) * e) / V0;
  const pts = [];
  for (let t = 0; t <= 360; t += 5) pts.push(`${(t === 0 ? 'M' : 'L')}${X(t).toFixed(1)} ${Y(E(t)).toFixed(1)}`);
  const body = [
    S.line(x0, y0, x1 + 8, y0, { w: 1.5 }),
    S.line(x0, y0, x0, y1 - 18, { w: 1.5 }),
    S.path(pts.join(' '), { c: BLUE, w: 2.2 }),
    lab(250, 14, 'Torsional energy of ethane during one full rotation', { a: 'middle', size: 12, w: 'bold' }),
    lab(250, 226, 'dihedral angle (degrees)', { a: 'middle', size: 11 }),
    lab(12, 118, 'energy', { size: 11 }),
    lab(12, 132, '(kJ mol⁻¹)', { size: 10 }),
  ];
  for (const t of [0, 60, 120, 180, 240, 300, 360]) {
    body.push(S.line(X(t), y0, X(t), y0 + 4, { w: 1.2 }));
    body.push(lab(X(t), y0 + 17, String(t), { a: 'middle', size: 10 }));
  }
  body.push(S.line(x0 - 4, Y(V0), x0, Y(V0), { w: 1.2 }), lab(x0 - 8, Y(V0) + 4, '12.5', { a: 'end', size: 10 }));
  body.push(S.line(x0 - 4, y0, x0, y0, { w: 1.2 }), lab(x0 - 8, y0 + 4, '0', { a: 'end', size: 10 }));
  body.push(S.line(x0, Y(V0), x1, Y(V0), { c: MUTED, w: 1, dash: '3 3' }));
  for (const t of [0, 120, 240, 360]) body.push(S.circle(X(t), Y(V0), 3.4, { c: RED, fill: 'var(--diagram-red)', sw: 1 }));
  for (const t of [60, 180, 300]) body.push(S.circle(X(t), Y(0), 3.4, { c: GREEN, fill: 'var(--diagram-green)', sw: 1 }));
  body.push(lab(X(120), Y(V0) - 8, 'eclipsed', { a: 'middle', size: 10, c: RED }));
  body.push(lab(X(240), Y(V0) - 8, 'eclipsed', { a: 'middle', size: 10, c: RED }));
  body.push(lab(X(60), Y(0) - 10, 'staggered', { a: 'middle', size: 10, c: GREEN }));
  body.push(lab(X(180), Y(0) - 10, 'staggered', { a: 'middle', size: 10, c: GREEN }));
  body.push(lab(X(300), Y(0) - 10, 'staggered', { a: 'middle', size: 10, c: GREEN }));
  return svgDoc(470, 236, 'Graph of the torsional energy of ethane against dihedral angle: minima of 0 at 60, 180 and 300 degrees (staggered) and maxima of 12.5 kilojoules per mole at 0, 120, 240 and 360 degrees (eclipsed).', body.join(''));
})();

// ---------------------------------------------------------------- 4. boiling points of the first ten unbranched alkanes
export const BPDATA = [-161.5, -88.6, -42.1, -0.5, 36.1, 68.7, 98.4, 125.7, 150.8, 174.1]; // degrees C, CH4 to C10H22
export const BPK = BPDATA.map((t) => Math.round(t + 273)); // kelvin, whole numbers
export const BPLOT = (() => {
  chk(BPDATA.every((v, i) => i === 0 || v > BPDATA[i - 1]), 'boiling points rise with every added CH2 (C1 to C10)');
  const gaps = BPDATA.slice(1).map((v, i) => v - BPDATA[i]);
  chk(gaps.every((g, i) => i === 0 || g < gaps[i - 1]), `successive increments shrink (${gaps.map((g) => g.toFixed(1)).join(', ')} degrees)`);
  const x0 = 64;
  const x1 = 440;
  const y0 = 200;
  const y1 = 40;
  const X = (n) => x0 + ((x1 - x0) * (n - 0.5)) / 10;
  const Y = (t) => y0 - ((y0 - y1) * (t + 180)) / 380;
  const body = [
    S.line(x0, y0, x1, y0, { w: 1.5 }),
    S.line(x0, y0, x0, y1 - 14, { w: 1.5 }),
    lab(250, 14, 'Boiling points of unbranched alkanes CₙH₂ₙ₊₂', { a: 'middle', size: 12, w: 'bold' }),
    lab(250, 244, 'number of carbon atoms, n', { a: 'middle', size: 11 }),
    lab(10, 108, 'boiling', { size: 10 }),
    lab(10, 121, 'point', { size: 10 }),
    lab(10, 134, '(°C)', { size: 10 }),
  ];
  for (const t of [-150, -100, -50, 0, 50, 100, 150]) {
    body.push(S.line(x0 - 4, Y(t), x0, Y(t), { w: 1.2 }), lab(x0 - 7, Y(t) + 4, String(t), { a: 'end', size: 10 }));
    body.push(S.line(x0, Y(t), x1, Y(t), { c: MUTED, w: 0.6, dash: '2 4' }));
  }
  for (let n = 1; n <= 10; n++) body.push(S.line(X(n), y0, X(n), y0 + 4, { w: 1.2 }), lab(X(n), y0 + 17, String(n), { a: 'middle', size: 10 }));
  body.push(S.path(BPDATA.map((t, i) => `${i ? 'L' : 'M'}${X(i + 1).toFixed(1)} ${Y(t).toFixed(1)}`).join(' '), { c: BLUE, w: 2 }));
  BPDATA.forEach((t, i) => body.push(S.circle(X(i + 1), Y(t), 3.4, { c: BLUE, fill: 'var(--diagram-blue)', sw: 1 })));
  body.push(lab(X(2) + 6, Y(BPDATA[0]) + 1, 'CH₄ −161.5', { size: 10 }));
  body.push(lab(X(4) + 8, Y(BPDATA[3]) + 12, 'C₄H₁₀ −0.5', { size: 10 }));
  body.push(lab(X(10) - 6, Y(BPDATA[9]) - 8, 'C₁₀H₂₂ 174.1', { a: 'end', size: 10 }));
  body.push(lab(X(5) + 8, Y(BPDATA[4]) + 14, 'C₅H₁₂ 36.1', { size: 10 }));
  return svgDoc(470, 252, 'Graph of boiling point against number of carbon atoms for the first ten unbranched alkanes, rising from minus 161.5 degrees Celsius for methane to 174.1 degrees Celsius for decane, with the rise getting smaller for each added carbon.', body.join(''));
})();

// ---------------------------------------------------------------- 5. free-radical chlorination of methane
const BDE = { CH: 435, ClCl: 243, CCl: 351, HCl: 431 }; // kJ mol-1
export const CHLOR = (() => {
  const dH1 = BDE.CH - BDE.HCl;
  const dH2 = BDE.ClCl - BDE.CCl;
  chk(dH1 === 4 && dH2 === -108, `propagation enthalpies from bond enthalpies: step 1 ${dH1 >= 0 ? '+' : ''}${dH1}, step 2 ${dH2} kJ/mol`);
  chk(dH1 + dH2 === BDE.CH + BDE.ClCl - BDE.CCl - BDE.HCl, `overall enthalpy change of CH4 + Cl2 -> CH3Cl + HCl is ${dH1 + dH2} kJ/mol`);
  chk(balanced([[1, 'CH4'], [1, 'Cl2']], [[1, 'CH3Cl'], [1, 'HCl']]), 'overall: CH4 + Cl2 -> CH3Cl + HCl balances');
  chk(balanced([[2, 'CH3']], [[1, 'C2H6']]) && balanced([[1, 'CH3'], [1, 'Cl']], [[1, 'CH3Cl']]) && balanced([[2, 'Cl']], [[1, 'Cl2']]), 'termination steps balance');
  const body = [
    lab(235, 14, 'Free-radical chain mechanism: chlorination of methane', { a: 'middle', size: 12, w: 'bold' }),
    lab(12, 36, '1  Initiation', { size: 12, w: 'bold', c: BLUE }),
    lab(120, 36, '(light, hν; a radical is a species with an unpaired electron, shown by a dot)', { size: 10 }),
    lab(60, 74, 'Cl–Cl', { size: 14 }),
    S.path('M79 60 Q70 40 62 56', { c: RED, w: 1.4 }),
    S.line(62, 56, 61, 48, { c: RED, w: 1.4 }),
    S.path('M79 60 Q88 40 96 56', { c: RED, w: 1.4 }),
    S.line(96, 56, 97, 48, { c: RED, w: 1.4 }),
    S.arrow(110, 70, 170, 70, { w: 1.6 }),
    lab(140, 62, 'hν', { a: 'middle', size: 10 }),
    lab(180, 74, 'Cl•  +  •Cl', { size: 14 }),
    lab(290, 74, 'homolytic fission of the Cl–Cl bond', { size: 10, c: MUTED }),
    S.line(12, 92, 458, 92, { c: MUTED, w: 1, dash: '3 3' }),
    lab(12, 112, '2  Propagation', { size: 12, w: 'bold', c: GREEN }),
    lab(120, 112, '(the two steps repeat in a chain)', { size: 10 }),
    lab(12, 136, 'CH₄  +  Cl•', { size: 14 }),
    S.arrow(110, 132, 150, 132, { w: 1.6 }),
    lab(160, 136, '•CH₃  +  HCl', { size: 14 }),
    lab(300, 136, `ΔH ≈ +${dH1} kJ mol⁻¹`, { size: 10 }),
    lab(12, 160, '•CH₃  +  Cl–Cl', { size: 14 }),
    S.arrow(124, 156, 164, 156, { w: 1.6 }),
    lab(174, 160, 'CH₃Cl  +  Cl•', { size: 14 }),
    lab(300, 160, `ΔH ≈ −${-dH2} kJ mol⁻¹`, { size: 10 }),
    lab(12, 178, 'Cl• is regenerated, so one photon can set off thousands of cycles.', { size: 10, c: MUTED }),
    S.line(12, 190, 458, 190, { c: MUTED, w: 1, dash: '3 3' }),
    lab(12, 210, '3  Termination', { size: 12, w: 'bold', c: RED }),
    lab(120, 210, '(two radicals combine; the chain stops)', { size: 10 }),
    lab(12, 234, 'Cl•  +  •Cl  →  Cl₂', { size: 13 }),
    lab(160, 234, '•CH₃  +  •Cl  →  CH₃Cl', { size: 13 }),
    lab(330, 234, '•CH₃  +  •CH₃  →  C₂H₆', { size: 13 }),
    lab(235, 256, 'Overall: CH₄ + Cl₂ → CH₃Cl + HCl (ΔH ≈ −104 kJ mol⁻¹); further steps give CH₂Cl₂, CHCl₃ and CCl₄.', { a: 'middle', size: 10 }),
  ];
  return svgDoc(470, 266, 'Free-radical chain mechanism of the chlorination of methane in three stages: initiation (Cl2 splits into two chlorine radicals in light), propagation (a chlorine radical takes a hydrogen from methane to give a methyl radical, which takes a chlorine atom from Cl2 to give chloromethane and regenerate the chlorine radical) and termination (two radicals combine).', body.join(''));
})();

// ---------------------------------------------------------------- 6. aromatisation of hexane and heptane
export const AROM = (() => {
  const hexane = skel(6);
  const benz = benzene(0, 0);
  const heptane = skel(7);
  const tol = benzene(0, 0, [[0, 'C']]);
  must(hexane, 'C6H14', 'hexane');
  must(benz, 'C6H6', 'benzene');
  must(heptane, 'C7H16', 'heptane');
  must(tol, 'C7H8', 'methylbenzene');
  chk(balanced([[1, 'C6H14']], [[1, 'C6H6'], [4, 'H2']]), 'aromatisation: C6H14 -> C6H6 + 4H2 balances');
  chk(balanced([[1, 'C7H16']], [[1, 'C7H8'], [4, 'H2']]), 'aromatisation: C7H16 -> C7H8 + 4H2 balances');
  chk(balanced([[1, 'C6H14']], [[1, 'C6H12'], [1, 'H2']]) && balanced([[1, 'C6H12']], [[1, 'C6H6'], [3, 'H2']]), 'cyclisation C6H14 -> C6H12 + H2, then C6H12 -> C6H6 + 3H2, balance');
  const row = (y, a, b, ha, hb, cond, name1, name2, gas) => [
    at(a, 92, y),
    S.arrow(170, y, 262, y, { w: 1.8 }),
    lab(216, y - 18, cond[0], { a: 'middle', size: 10 }),
    lab(216, y - 6, cond[1], { a: 'middle', size: 10 }),
    lab(216, y + 20, cond[2], { a: 'middle', size: 10 }),
    at(b, 318, y),
    lab(370, y + 4, `+  ${gas}`, { size: 14 }),
    lab(92, y + 42, name1, { a: 'middle', size: 11, w: 'bold' }),
    lab(318, y + (name2.length > 10 ? 56 : 42), name2, { a: 'middle', size: 11, w: 'bold' }),
  ];
  const body = [
    lab(235, 14, 'Aromatisation: loss of hydrogen with ring closure', { a: 'middle', size: 12, w: 'bold', c: BLUE }),
    ...row(64, hexane, benz, 0, 0, ['Cr₂O₃ / Al₂O₃', '773 K, 10–20 atm', '(or V₂O₅ / Mo₂O₃)'], 'hexane', 'benzene', '4H₂'),
    ...row(156, heptane, tol, 0, 0, ['Cr₂O₃ / Al₂O₃', '773 K, 10–20 atm', 'same conditions'], 'heptane', 'methylbenzene (toluene)', '4H₂'),
    lab(235, 252, 'Cyclisation is the first stage: hexane → cyclohexane + H₂; then cyclohexane → benzene + 3H₂.', { a: 'middle', size: 10 }),
  ];
  return svgDoc(470, 262, 'Aromatisation of hexane to benzene and of heptane to methylbenzene over a chromium(III) oxide and aluminium oxide catalyst at 773 K and 10 to 20 atmospheres, with four molecules of hydrogen released in each case.', body.join(''));
})();

// ---------------------------------------------------------------- 7. Kolbe electrolysis cell
export const KOLBE = (() => {
  chk(balanced([[2, 'C2H3O2'], [0, '']], [[1, 'C2H6'], [2, 'CO2']]), 'anode: 2CH3COO(-) -> C2H6 + 2CO2 + 2e: atoms balance (charge -2 = 2e)');
  chk(balanced([[2, 'CH3COONa'], [2, 'H2O']], [[1, 'C2H6'], [2, 'CO2'], [1, 'H2'], [2, 'NaOH']]), 'overall: 2CH3COONa + 2H2O -> C2H6 + 2CO2 + H2 + 2NaOH balances');
  const body = [
    lab(235, 12, "Kolbe's electrolysis of aqueous sodium ethanoate", { a: 'middle', size: 12, w: 'bold' }),
    S.line(185, 40, 185, 150, { w: 5 }),
    S.line(285, 40, 285, 150, { w: 5 }),
    S.line(185, 40, 185, 30, { w: 1.6 }),
    S.line(185, 30, 220, 30, { w: 1.6 }),
    S.line(250, 30, 285, 30, { w: 1.6 }),
    S.line(285, 40, 285, 30, { w: 1.6 }),
    S.line(220, 22, 220, 38, { w: 2 }),
    S.line(250, 26, 250, 34, { w: 2 }),
    lab(188, 24, '+', { size: 13, w: 'bold', c: RED }),
    lab(272, 24, '–', { size: 13, w: 'bold', c: BLUE }),
    S.path('M150 90 L150 215 Q150 225 160 225 L310 225 Q320 225 320 215 L320 90', { w: 2 }),
    S.rect(151, 112, 168, 111, { c: BLUE, fill: 'var(--diagram-blue)', fop: 0.12, sw: 0.5 }),
    lab(235, 200, 'CH₃COO⁻ Na⁺ (aq)', { a: 'middle', size: 11 }),
    lab(235, 215, 'platinum electrodes', { a: 'middle', size: 10, c: MUTED }),
    lab(185, 166, 'Anode', { a: 'middle', size: 10, w: 'bold', c: RED }),
    lab(285, 166, 'Cathode', { a: 'middle', size: 10, w: 'bold', c: BLUE }),
    ...[[170, 124], [178, 110], [192, 118], [198, 134]].map(([x, y]) => S.circle(x, y, 3, { c: BROWN, sw: 1 })),
    ...[[295, 124], [304, 112], [310, 134]].map(([x, y]) => S.circle(x, y, 3, { c: MUTED, sw: 1 })),
    lab(8, 60, 'Anode (oxidation)', { size: 11, w: 'bold', c: RED }),
    lab(8, 76, '2CH₃COO⁻ → C₂H₆ + 2CO₂ + 2e⁻', { size: 10 }),
    lab(8, 92, 'ethane and carbon dioxide', { size: 10, c: MUTED }),
    lab(326, 60, 'Cathode (reduction)', { size: 11, w: 'bold', c: BLUE }),
    lab(326, 76, '2H₂O + 2e⁻ → H₂ + 2OH⁻', { size: 10 }),
    lab(326, 92, 'hydrogen; solution alkaline', { size: 10, c: MUTED }),
    lab(235, 246, 'Overall: 2CH₃COONa + 2H₂O → C₂H₆ + 2CO₂ + H₂ + 2NaOH', { a: 'middle', size: 10 }),
  ];
  return svgDoc(470, 254, "Electrolysis cell for Kolbe's reaction: aqueous sodium ethanoate between platinum electrodes; ethane and carbon dioxide form at the anode, hydrogen and hydroxide ions at the cathode.", body.join(''));
})();
