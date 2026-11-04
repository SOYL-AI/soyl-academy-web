// Hand-drawn SVG schematics for ch04 Chemical Bonding and Molecular Structure (allow-listed elements, palette colours only).
// VSEPR geometries and MO energy diagrams are computed from vectors and electron counts; SELF_CHECKS lists what was asserted.
import { svgDoc, S } from './lib.mjs';
import { SPECIES, mo } from './data.mjs';

export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 10, ...o });

// ---------------------------------------------------------------- VSEPR
const nrm = (v) => {
  const m = Math.hypot(...v);
  return v.map((x) => x / m);
};
const deg = (a, b) => (Math.acos(Math.max(-1, Math.min(1, a.reduce((s, x, i) => s + x * b[i], 0)))) * 180) / Math.PI;
const TET = [[0, 1, 0], [0.943, -0.333, 0], [-0.471, -0.333, 0.816], [-0.471, -0.333, -0.816]].map(nrm);
const TRIG = [[1, 0, 0], [-0.5, 0.866, 0], [-0.5, -0.866, 0]];
const TBP = [[0, 1, 0], [0, -1, 0], [1, 0, 0], [-0.5, 0, 0.866], [-0.5, 0, -0.866]]; // 0,1 axial; 2,3,4 equatorial
const OCT = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
const LIN = [[1, 0, 0], [-1, 0, 0]];

const anglesOf = (vs) => {
  const set = new Set();
  for (let i = 0; i < vs.length; i++) for (let j = i + 1; j < vs.length; j++) set.add(Math.round(deg(vs[i], vs[j])));
  return [...set].sort((a, b) => a - b);
};
// View: rotate about the vertical axis (yaw), then tilt towards the viewer, and project orthographically.
// For each shape the smallest yaw and tilt (deterministic grid search) are chosen so that no bonded atom or lone
// pair hides behind the central atom or another atom; z < -0.3 after rotation is drawn as a dashed (behind) bond.
const rot = (v, yaw, tilt) => {
  const [x0, y0, z0] = v;
  const x1 = x0 * Math.cos(yaw) + z0 * Math.sin(yaw);
  const z1 = -x0 * Math.sin(yaw) + z0 * Math.cos(yaw);
  return [x1, y0 * Math.cos(tilt) + z1 * Math.sin(tilt), -y0 * Math.sin(tilt) + z1 * Math.cos(tilt)];
};
function bestView(vecs, lps, s) {
  let best = null;
  for (let yd = -60; yd <= 60; yd += 5)
    for (let td = 0; td <= 35; td += 5) {
      const yaw = (yd * Math.PI) / 180;
      const tilt = (td * Math.PI) / 180;
      const pts = vecs.map((v, i) => {
        const r = rot(v, yaw, tilt);
        const k = lps.includes(i) ? 0.62 : 1;
        return { x: s * k * r[0], y: s * k * r[1], lp: lps.includes(i) };
      });
      let m = Infinity;
      for (const p of pts) m = Math.min(m, Math.hypot(p.x, p.y) - (p.lp ? 12.5 : 15));
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) m = Math.min(m, Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y) - (pts[i].lp || pts[j].lp ? 11.5 : 14));
      // smallest turn away from the textbook orientation that keeps every item clear (margin 2 px); else the clearest view
      const score = m >= 2 ? 1000 - Math.abs(yd) - td : m;
      if (!best || score > best.score + 1e-9) best = { m, yaw, tilt, score };
    }
  return best;
}

function shape(cx, cy, s, vecs, lps, title, sub) {
  const out = [];
  const view = bestView(vecs, lps, s);
  const P = (v, k = 1) => {
    const r = rot(v, view.yaw, view.tilt);
    return [cx + s * k * r[0], cy - s * k * r[1], r[2]];
  };
  const bonds = vecs.filter((_, i) => !lps.includes(i));
  const items = vecs.map((v, i) => ({ v, lp: lps.includes(i), p: P(v, lps.includes(i) ? 0.62 : 1) })).sort((a, b) => a.p[2] - b.p[2]);
  for (const it of items) if (!it.lp) out.push(S.line(cx, cy, it.p[0], it.p[1], { w: 2, dash: it.p[2] < -0.3 ? '4 3' : undefined }));
  const front = [];
  for (const it of items) {
    const el = it.lp ? S.ellipse(it.p[0], it.p[1], 7, 4.5, { fill: 'var(--diagram-yellow)', fop: 0.7, sw: 1 }) : S.circle(it.p[0], it.p[1], 7, { fill: 'var(--diagram-green)', fop: 0.6 });
    (it.p[2] < 0 ? out : front).push(el);
  }
  out.push(S.circle(cx, cy, 8, { fill: 'var(--diagram-blue)', fop: 0.6 }));
  out.push(...front);
  out.push(lab(cx, cy + s + 24, title, { a: 'middle', size: 11, w: 'bold' }));
  out.push(lab(cx, cy + s + 38, sub, { a: 'middle' }));
  check(view.m >= 0, `VSEPR drawing ${title}: every atom and lone pair is clear of the central atom and of each other (margin ${view.m.toFixed(1)} px)`);
  return { svg: out.join(''), bonds };
}
const legend = (x, y) =>
  S.circle(x, y, 6, { fill: 'var(--diagram-blue)', fop: 0.6 }) + lab(x + 10, y + 4, 'central atom', {}) +
  S.circle(x + 100, y, 6, { fill: 'var(--diagram-green)', fop: 0.6 }) + lab(x + 110, y + 4, 'bonded atom', {}) +
  S.ellipse(x + 205, y, 7, 4.5, { fill: 'var(--diagram-yellow)', fop: 0.7, sw: 1 }) + lab(x + 216, y + 4, 'lone pair', {});

const P5 = [
  ['AB₂', 'linear, 180°', LIN, []],
  ['AB₃', 'trigonal planar, 120°', TRIG, []],
  ['AB₄', 'tetrahedral, 109.5°', TET, []],
  ['AB₅', 'trigonal bipyramidal', TBP, []],
  ['AB₆', 'octahedral, 90°', OCT, []],
];
export const SHAPES5 = (() => {
  const body = [];
  const want = [[180], [120], [109], [90, 120, 180], [90, 180]];
  P5.forEach(([t, sub, vs, lp], i) => {
    const cx = i < 3 ? 62 + i * 118 : 120 + (i - 3) * 118;
    const cy = i < 3 ? 52 : 168;
    const sh = shape(cx, cy, 30, vs, lp, t, sub);
    body.push(sh.svg);
    const got = anglesOf(sh.bonds);
    check(JSON.stringify(got) === JSON.stringify(want[i]), `VSEPR no lone pairs ${t}: bond angles ${got.join(', ')}`);
  });
  body.push(legend(40, 278));
  return svgDoc(360, 292, 'Five ideal VSEPR shapes with no lone pairs on the central atom: AB2 linear with 180 degrees, AB3 trigonal planar with 120 degrees, AB4 tetrahedral with 109.5 degrees, AB5 trigonal bipyramidal with 90 and 120 degrees, and AB6 octahedral with 90 degrees.', body.join(''));
})();

const LPA = [
  ['NH₃', 'trigonal pyramidal', TET, [0], SPECIES.NH3],
  ['H₂O', 'bent (V-shaped)', TET, [0, 1], SPECIES.H2O],
  ['SO₂', 'bent', TRIG, [0], { bp: 2, lp: 1, shape: 'bent' }],
];
export const SHAPES_LP_A = (() => {
  const body = [];
  LPA.forEach(([t, sub, vs, lp, sp], i) => {
    const sh = shape(62 + i * 118, 48, 30, vs, lp, t, sub);
    body.push(sh.svg);
    check(sh.bonds.length === sp.bp && lp.length === sp.lp, `VSEPR ${t}: ${sh.bonds.length} bond pairs and ${lp.length} lone pair(s) match the electron count`);
  });
  const a = anglesOf(LPA[0][2].filter((_, i) => i !== 0));
  check(a.length === 1 && a[0] === 109, 'VSEPR NH₃ parent: ideal angle 109° before lone-pair compression');
  body.push(legend(40, 134));
  return svgDoc(360, 148, 'Three shapes with lone pairs on a tetrahedral or trigonal planar arrangement: ammonia is trigonal pyramidal with one lone pair, water is bent with two lone pairs, and sulfur dioxide is bent with one lone pair.', body.join(''));
})();

const LPB = [
  ['SF₄', 'see-saw', TBP, [2], SPECIES.SF4, [90, 120, 180]],
  ['ClF₃', 'T-shaped', TBP, [3, 4], SPECIES.ClF3, [90, 180]],
  ['XeF₂', 'linear', TBP, [2, 3, 4], SPECIES.XeF2, [180]],
  ['BrF₅', 'square pyramidal', OCT, [2], SPECIES.BrF5, [90, 180]],
  ['XeF₄', 'square planar', OCT, [2, 3], SPECIES.XeF4, [90, 180]],
];
export const SHAPES_LP_B = (() => {
  const body = [];
  LPB.forEach(([t, sub, vs, lp, sp, want], i) => {
    const cx = i < 3 ? 62 + i * 118 : 120 + (i - 3) * 118;
    const sh = shape(cx, i < 3 ? 52 : 168, 30, vs, lp, t, sub);
    body.push(sh.svg);
    const got = anglesOf(sh.bonds);
    check(JSON.stringify(got) === JSON.stringify(want) && sh.bonds.length === sp.bp && lp.length === sp.lp, `VSEPR ${t}: ${sh.bonds.length} bond pairs, ${lp.length} lone pairs, angles ${got.join(', ')} (${sp.shape})`);
  });
  body.push(legend(40, 278));
  return svgDoc(360, 292, 'Five shapes derived from the trigonal bipyramid and the octahedron by placing lone pairs: sulfur tetrafluoride see-saw with one equatorial lone pair, chlorine trifluoride T-shaped with two equatorial lone pairs, xenon difluoride linear with three equatorial lone pairs, bromine pentafluoride square pyramidal with one lone pair, and xenon tetrafluoride square planar with two lone pairs opposite each other.', body.join(''));
})();

// ---------------------------------------------------------------- orbital overlap
export const OVERLAP = (() => {
  const body = [];
  const blue = { fill: 'var(--diagram-blue)', fop: 0.45, sw: 1 };
  const red = { fill: 'var(--diagram-red)', fop: 0.45, sw: 1 };
  // 1. s-s
  let cx = 90;
  let cy = 52;
  body.push(S.circle(cx - 14, cy, 22, blue), S.circle(cx + 14, cy, 22, blue));
  const ss = 2 * 22 - 28;
  body.push(S.line(cx - 44, cy, cx + 44, cy, { c: 'var(--diagram-muted)', w: 0.8, dash: '3 3' }));
  body.push(lab(cx, 100, 's–s overlap: σ bond (H₂)', { a: 'middle' }));
  // 2. s-p
  cx = 270;
  body.push(S.circle(cx - 28, cy, 18, blue));
  body.push(S.ellipse(cx - 2, cy, 20, 11, blue), S.ellipse(cx + 38, cy, 20, 11, red));
  const sp = Math.min(cx - 28 + 18, cx - 2 + 20) - Math.max(cx - 28 - 18, cx - 2 - 20);
  body.push(S.line(cx - 50, cy, cx + 62, cy, { c: 'var(--diagram-muted)', w: 0.8, dash: '3 3' }));
  body.push(lab(cx, 100, 's–p overlap: σ bond (HF)', { a: 'middle' }));
  // 3. p-p head-on
  cx = 90;
  cy = 150;
  const nA = cx - 30;
  const nB = cx + 30;
  body.push(S.ellipse(nA - 20, cy, 20, 11, red), S.ellipse(nA + 20, cy, 20, 11, blue), S.ellipse(nB - 20, cy, 20, 11, blue), S.ellipse(nB + 20, cy, 20, 11, red));
  const pp = Math.min(nA + 40, nB - 0) - Math.max(nA, nB - 40);
  body.push(S.line(cx - 76, cy, cx + 76, cy, { c: 'var(--diagram-muted)', w: 0.8, dash: '3 3' }));
  body.push(lab(cx, 198, 'p–p head-on: σ bond (F₂)', { a: 'middle' }));
  // 4. p-p sideways
  cx = 270;
  const xA = cx - 11;
  const xB = cx + 11;
  body.push(S.ellipse(xA, cy - 18, 14, 17, blue), S.ellipse(xA, cy + 18, 14, 17, red), S.ellipse(xB, cy - 18, 14, 17, blue), S.ellipse(xB, cy + 18, 14, 17, red));
  const pi = 2 * 14 - (xB - xA);
  body.push(S.line(cx - 50, cy, cx + 50, cy, { c: 'var(--diagram-muted)', w: 0.8, dash: '3 3' }));
  body.push(lab(cx, 198, 'p–p sideways: π bond (O₂, N₂)', { a: 'middle' }));
  body.push(lab(180, 216, 'Dashed line = internuclear axis. π overlap lies above and below it.', { a: 'middle' }));
  check(ss > 0 && sp > 0 && pp > 0 && pi > 0, `overlap diagram: overlap widths s–s ${ss}, s–p ${sp}, p–p head-on ${pp}, p–p sideways ${pi} (all positive)`);
  return svgDoc(360, 228, 'Four ways orbitals overlap. Top left: two s orbitals overlap end to end along the bond axis to make a sigma bond. Top right: an s orbital overlaps one lobe of a p orbital along the axis, a sigma bond. Bottom left: two p orbitals overlap head on along the axis, a sigma bond. Bottom right: two parallel p orbitals overlap sideways above and below the axis, a pi bond.', body.join(''));
})();

// ---------------------------------------------------------------- MO energy diagrams computed from electron counts
function moDiagram(nElectrons, mixing, title, molecule) {
  const m = mo(nElectrons, mixing);
  const body = [];
  const y = (i) => 232 - i * 34;
  const cx = 180;
  body.push(lab(180, 16, title, { a: 'middle', size: 12, w: 'bold' }));
  body.push(S.arrow(20, 240, 20, 28, { w: 1.5, c: 'var(--diagram-muted)' }));
  body.push(lab(26, 40, 'energy', { size: 10 }));
  // atomic orbitals left and right
  const ao = (x, side) => {
    const s2 = (y(0) + y(1)) / 2;
    const p2 = (y(2) + y(5)) / 2;
    body.push(S.line(x, s2, x + 36, s2, { w: 1.5 }), lab(side === 'L' ? x - 4 : x + 40, s2 + 4, '2s', { a: side === 'L' ? 'end' : 'start' }));
    for (let k = 0; k < 3; k++) body.push(S.line(x + (k - 1) * 0 + 0, p2 + (k - 1) * 8, x + 36, p2 + (k - 1) * 8, { w: 1.5 }));
    body.push(lab(side === 'L' ? x - 4 : x + 40, p2 + 4, '2p', { a: side === 'L' ? 'end' : 'start' }));
    return [s2, p2];
  };
  const [s2, p2] = ao(70, 'L');
  ao(254, 'R');
  m.levels.forEach((l, i) => {
    const yy = y(i);
    const w = 28;
    const xs = l.deg === 1 ? [cx - w / 2] : [cx - w - 6, cx + 6];
    l.orbs.forEach(([u, d], k) => {
      const x0 = xs[k];
      body.push(S.line(x0, yy, x0 + w, yy, { w: 2, c: l.anti ? 'var(--diagram-red)' : 'var(--diagram-blue)' }));
      if (u) body.push(S.text(x0 + w / 2 - 7, yy - 4, '↑', { size: 12, a: 'middle' }));
      if (d) body.push(S.text(x0 + w / 2 + 1, yy - 4, '↓', { size: 12, a: 'middle' }));
    });
    body.push(lab(cx + (l.deg === 1 ? 22 : 40), yy + 4, l.name, { size: 11 }));
    // connectors to AOs
    const from = l.name.endsWith('2s') ? s2 : p2;
    body.push(S.line(106, from, l.deg === 1 ? cx - 14 : cx - 34, yy, { c: 'var(--diagram-muted)', w: 0.6, dash: '3 3' }));
    body.push(S.line(254, from, l.deg === 1 ? cx + 14 : cx + 34, yy, { c: 'var(--diagram-muted)', w: 0.6, dash: '3 3' }));
  });
  body.push(lab(180, 262, `${molecule}: bond order (${m.bonding} − ${m.anti})/2 = ${m.bo}; ${m.unpaired} unpaired`, { a: 'middle', size: 10 }));
  return { svg: body.join(''), m };
}
const mn = moDiagram(10, true, 'N₂ (s–p mixing: π2p below σ2p)', 'N₂');
const mx = moDiagram(12, false, 'O₂ (no mixing: σ2p below π2p)', 'O₂');
check(mn.m.bo === 3 && mn.m.unpaired === 0 && mn.m.levels[2].n === 4 && mn.m.levels[3].n === 2, 'MO diagram N₂: bond order 3, no unpaired electrons, π2p holds 4 and σ2p holds 2 (mixing order)');
check(mx.m.bo === 2 && mx.m.unpaired === 2 && mx.m.levels[4].n === 2 && mx.m.levels[4].orbs.every(([u, d]) => u === 1 && d === 0), 'MO diagram O₂: bond order 2, two unpaired electrons, one each in the two π*2p orbitals (Hund)');
export const MO_N2 = svgDoc(360, 272, 'Molecular orbital energy diagram of the nitrogen molecule with ten valence electrons. Because of s-p mixing the pi 2p orbitals lie below the sigma 2p orbital. The sigma 2s, sigma star 2s, two pi 2p and sigma 2p orbitals are filled, giving bond order three and no unpaired electrons, so nitrogen is diamagnetic.', mn.svg);
export const MO_O2 = svgDoc(360, 272, 'Molecular orbital energy diagram of the oxygen molecule with twelve valence electrons. The sigma 2p orbital lies below the pi 2p orbitals. The two pi star 2p orbitals each hold one electron with parallel spins, giving bond order two and two unpaired electrons, so oxygen is paramagnetic.', mx.svg);
