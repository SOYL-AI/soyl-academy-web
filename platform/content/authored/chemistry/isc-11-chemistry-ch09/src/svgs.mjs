// ISC 11 Chemistry ch09 Molecular Orbital Theory, Coordinate Bonds, Resonance and Hydrogen Bonding: hand-drawn SVGs
// (allow-listed elements, palette colours only; geometry and data computed in JS, self-checked). MO diagrams are drawn from the
// same fillMO() used in the questions, so every arrow in a diagram is an electron the code placed.
import { svgDoc, S, near } from './lib.mjs';
import { MO, ORD_MIX, ORD_NOMIX, ORD_1S, config, fmtBO, magnet, LEN, BP, resBO, clDative, clLonePairs } from './data.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const small = (x, y, s, o) => S.text(x, y, s, { size: 10, ...o });
const B = 'var(--diagram-blue)';
const R = 'var(--diagram-red)';
const G = 'var(--diagram-green)';
const Y = 'var(--diagram-yellow)';
const M = 'var(--diagram-muted)';
const BR = 'var(--diagram-brown)';
const FILL = 'var(--diagram-fill)';

// ================================================================ MO energy-level diagrams
// Energies are schematic (arbitrary units, higher = more energy); only the order matters and is checked against data.mjs.
const ENERGY = {
  '1s': { order: ORD_1S, ao: [{ l: '1s', E: 0, n: 1 }], mo: { 'σ1s': -1.5, 'σ*1s': 1.5 }, lo: -2.4, hi: 2.4 },
  mix: { order: ORD_MIX, ao: [{ l: '2s', E: 0, n: 1 }, { l: '2p', E: 3.2, n: 3 }], mo: { 'σ2s': -1.4, 'σ*2s': 1.3, 'π2p': 2.1, 'σ2pz': 2.9, 'π*2p': 4.2, 'σ*2pz': 5.5 }, lo: -2.2, hi: 6.3 },
  nomix: { order: ORD_NOMIX, ao: [{ l: '2s', E: 0, n: 1 }, { l: '2p', E: 4.4, n: 3 }], mo: { 'σ2s': -1.4, 'σ*2s': 1.4, 'σ2pz': 2.7, 'π2p': 3.6, 'π*2p': 5.3, 'σ*2pz': 6.5 }, lo: -2.2, hi: 7.3 },
};
for (const [k, e] of Object.entries(ENERGY)) {
  const es = e.order.map((lv) => e.mo[lv.n]);
  chk(es.every((v, i) => i === 0 || v > es[i - 1]), `MO energy scheme "${k}": drawn levels rise in the order used for filling (${e.order.map((l) => l.n).join(' < ')})`);
}

/**
 * Draws one MO diagram at (ox, oy), width W, height H, for species key `key`. Returns { svg, drawn }: drawn is the number of
 * electron arrows put on the MO levels.
 */
function moDiagram(ox, oy, W, H, key, { showAO = true } = {}) {
  const sp = MO[key];
  const en = ENERGY[sp.ord];
  const out = [];
  const sc = (H - 24) / (en.hi - en.lo);
  const Y_ = (E) => oy + H - 12 - (E - en.lo) * sc;
  const cx = ox + W / 2;
  const aoL = ox + 6;
  const aoR = ox + W - 6;
  // axis
  out.push(S.arrow(ox - 4, oy + H - 4, ox - 4, oy + 4, { w: 1.2, size: 6 }), small(ox - 8, oy + 14, 'E', { a: 'end', w: 'bold' }));
  // AO levels
  const aoEdges = [];
  en.ao.forEach((a) => {
    const y = Y_(a.E);
    for (let i = 0; i < a.n; i++) {
      const wseg = a.n === 1 ? 40 : 16;
      const x1 = a.n === 1 ? aoL + 12 : aoL + i * 21;
      const x2 = x1 + wseg;
      const r1 = a.n === 1 ? aoR - 12 - wseg : aoR - 3 * 21 + 5 + i * 21;
      out.push(S.line(x1, y, x2, y, { w: 2 }), S.line(r1, y, r1 + wseg, y, { w: 2 }));
    }
    const edgeL = a.n === 1 ? aoL + 12 + 40 : aoL + 2 * 21 + 16;
    const edgeR = a.n === 1 ? aoR - 12 - 40 : aoR - 3 * 21 + 5;
    aoEdges.push({ ...a, y, edgeL, edgeR });
    out.push(small(aoL + (a.n === 1 ? 32 : 30), y + 14, `${a.l} (atom)`, { a: 'middle', c: M }));
    out.push(small(aoR - (a.n === 1 ? 32 : 30), y + 14, `${a.l} (atom)`, { a: 'middle', c: M }));
  });
  // MO levels
  let drawn = 0;
  sp.levels.forEach((lv) => {
    const y = Y_(en.mo[lv.n]);
    const ao = aoEdges.find((a) => (lv.n.includes('1s') || lv.n.includes('2s') ? a.l.endsWith('s') : a.l === '2p'));
    const segs = lv.deg === 1 ? [[cx - 30, cx + 30]] : [[cx - 58, cx - 8], [cx + 8, cx + 58]];
    segs.forEach(([x1, x2], i) => {
      out.push(S.line(x1, y, x2, y, { w: 2.4, c: lv.kind === 'b' ? B : R }));
      // connectors from the atomic levels (dashed)
      if (i === 0) out.push(S.line(ao.edgeL, ao.y, x1, y, { c: M, w: 1, dash: '3 3' }));
      if (i === segs.length - 1) out.push(S.line(ao.edgeR, ao.y, x2, y, { c: M, w: 1, dash: '3 3' }));
      // electrons
      const occ = lv.occ[i];
      const mid = (x1 + x2) / 2;
      const col = occ === 1 ? R : 'currentColor';
      if (occ >= 1) {
        out.push(S.arrow(mid - (occ === 2 ? 4 : 0), y - 2, mid - (occ === 2 ? 4 : 0), y - 17, { c: occ === 1 ? BR : col, w: 1.6, size: 5.5 }));
        drawn += 1;
      }
      if (occ === 2) {
        out.push(S.arrow(mid + 4, y - 17, mid + 4, y - 2, { c: col, w: 1.6, size: 5.5 }));
        drawn += 1;
      }
    });
    const lx = lv.deg === 1 ? cx + 36 : cx + 64;
    out.push(lab(lx, y + 4, lv.n, { c: lv.kind === 'b' ? B : R, w: 'bold' }));
  });
  return { svg: out.join(''), drawn };
}

function moSide(x, y, key) {
  const sp = MO[key];
  const lines = [
    [sp.name, true],
    [`valence MO electrons: ${sp.ev}`, false],
    [config(sp), false],
    [`bonding ${sp.nb}, antibonding ${sp.na}`, false],
    [`bond order = (${sp.nb} − ${sp.na}) / 2 = ${fmtBO(sp.bo)}`, true],
    [`unpaired electrons: ${sp.unpaired}`, false],
    [`${magnet(key)}`, true],
  ];
  return lines.map(([s, b], i) => lab(x, y + i * 18, s, { w: b ? 'bold' : undefined, c: i === 6 ? (sp.para ? R : B) : 'currentColor' })).join('');
}

const arrowKey = (x, y) => S.arrow(x, y - 2, x, y - 14, { c: BR, w: 1.6, size: 5.5 }) + small(x + 8, y - 4, 'unpaired electron (Hund)', { c: M });

function moSvg(key, label, title, w = 600, h = 360) {
  const d = moDiagram(24, 14, 340, 300, key);
  const sp = MO[key];
  chk(d.drawn === sp.ev, `${sp.name} MO diagram: ${d.drawn} electron arrows drawn = ${sp.ev} valence-MO electrons`);
  chk(sp.nb - sp.na === 2 * sp.bo, `${sp.name}: bond order ${sp.bo} from ${sp.nb} bonding and ${sp.na} antibonding electrons`);
  const out = [d.svg, moSide(386, 40, key), arrowKey(386, 190)];
  out.push(small(386, 214, 'blue: bonding MO; red: antibonding MO', { c: M }));
  out.push(small(386, 232, 'Core σ1s and σ*1s are filled and cancel.', { c: M }));
  out.push(small(386, 250, 'Energies are schematic.', { c: M }));
  out.push(lab(24 + 170, 338, title, { a: 'middle', w: 'bold' }));
  return svgDoc(w, h, label, out.join(''));
}

export const MO_N2 = moSvg('N2', 'Molecular orbital energy level diagram of the nitrogen molecule. Ten valence electrons fill sigma 2s, sigma star 2s, the two pi 2p orbitals and sigma 2pz, in that order, because of s-p mixing. There are eight bonding and two antibonding electrons, giving a bond order of 3 and no unpaired electrons, so nitrogen is diamagnetic.', 'N₂ (s–p mixing: π2p lies below σ2pz)');
export const MO_O2 = moSvg('O2', 'Molecular orbital energy level diagram of the oxygen molecule. Twelve valence electrons fill sigma 2s, sigma star 2s, sigma 2pz and the two pi 2p orbitals, then one electron enters each of the two pi star 2p orbitals with parallel spins. The bond order is 2 and there are two unpaired electrons, so oxygen is paramagnetic.', 'O₂ (no mixing: σ2pz lies below π2p)');

// ---------------------------------------------------------------- the two energy orderings side by side
export const MO_ORDERS = (() => {
  const out = [];
  const draw = (ox, key, title, note) => {
    const en = ENERGY[key];
    const sc = 24;
    const Yc = (E) => 252 - (E - en.lo) * sc;
    out.push(lab(ox + 120, 20, title, { a: 'middle', w: 'bold' }), small(ox + 120, 34, note, { a: 'middle', c: M }));
    en.order.forEach((lv) => {
      const y = Yc(en.mo[lv.n]);
      const segs = lv.deg === 1 ? [[ox + 90, ox + 150]] : [[ox + 62, ox + 112], [ox + 128, ox + 178]];
      segs.forEach(([x1, x2]) => out.push(S.line(x1, y, x2, y, { w: 2.4, c: lv.kind === 'b' ? B : R })));
      out.push(lab(ox + (lv.deg === 1 ? 160 : 186), y + 4, lv.n, { c: lv.kind === 'b' ? B : R, w: 'bold' }));
    });
    out.push(S.arrow(ox + 28, 258, ox + 28, 52, { w: 1.2, size: 6 }), small(ox + 24, 48, 'E', { a: 'end', w: 'bold' }));
  };
  draw(10, 'mix', 'Li₂ to N₂ (also B₂, C₂)', 'π2p below σ2pz');
  draw(290, 'nomix', 'O₂, F₂, Ne₂', 'σ2pz below π2p');
  out.push(small(10, 280, 'Reason: where the 2s–2p energy gap is small (up to N), σ2s and σ2pz mix and push σ2pz up.', { c: M }));
  out.push(small(10, 296, 'From O onwards the gap is large, there is no mixing and σ2pz stays below π2p.', { c: M }));
  const iM = ORD_MIX.findIndex((l) => l.n === 'σ2pz') - ORD_MIX.findIndex((l) => l.n === 'π2p');
  const iN = ORD_NOMIX.findIndex((l) => l.n === 'σ2pz') - ORD_NOMIX.findIndex((l) => l.n === 'π2p');
  chk(iM > 0 && iN < 0, 'orderings: σ2pz above π2p with mixing, below without');
  return svgDoc(570, 306, 'Two energy orderings of molecular orbitals. For Li2 to N2 the order is sigma 2s, sigma star 2s, pi 2p, sigma 2pz, pi star 2p, sigma star 2pz. For O2, F2 and Ne2 sigma 2pz lies below the pi 2p pair. The difference is caused by mixing of 2s and 2p orbitals.', out.join(''));
})();

// ---------------------------------------------------------------- H2 and He2
export const MO_H2 = (() => {
  const out = [];
  let tot = 0;
  [['H2', 14], ['He2', 300]].forEach(([k, ox]) => {
    const d = moDiagram(ox + 20, 20, 240, 190, k);
    out.push(d.svg);
    tot += d.drawn;
    const sp = MO[k];
    chk(d.drawn === sp.ev, `${sp.name} MO diagram: ${d.drawn} arrows = ${sp.ev} electrons`);
    out.push(lab(ox + 140, 230, `${sp.name}: bond order = (${sp.nb} − ${sp.na}) / 2 = ${fmtBO(sp.bo)}`, { a: 'middle', w: 'bold' }));
    out.push(small(ox + 140, 246, sp.bo > 0 ? 'molecule exists (stable)' : 'does not exist (no net bonding)', { a: 'middle', c: sp.bo > 0 ? B : R }));
  });
  chk(MO.H2.bo === 1 && MO.He2.bo === 0, 'H₂ bond order 1, He₂ bond order 0');
  return svgDoc(580, 256, 'Molecular orbital diagrams of hydrogen and helium. In H2 two electrons fill the bonding sigma 1s orbital, giving bond order 1. In He2 four electrons fill both sigma 1s and sigma star 1s, so bond order is 0 and the molecule does not exist.', out.join(''));
})();

// ---------------------------------------------------------------- how atomic orbitals combine
export const MO_SHAPES = (() => {
  const out = [];
  const pos = { fill: B, fop: 0.45, sw: 1, c: B };
  const neg = { fill: R, fop: 0.45, sw: 1, c: R };
  const nuc = (x, y) => S.circle(x, y, 2.5, { fill: 'currentColor', c: 'currentColor', sw: 0.3 });
  // sigma 1s bonding
  let cx = 70;
  const cy = 68;
  out.push(S.circle(cx - 14, cy, 22, pos), S.circle(cx + 14, cy, 22, pos), nuc(cx - 14, cy), nuc(cx + 14, cy));
  out.push(lab(cx, 124, 'σ1s: bonding', { a: 'middle', w: 'bold' }), small(cx, 138, 's + s in phase', { a: 'middle' }), small(cx, 152, 'density between nuclei', { a: 'middle', c: M }));
  chk(28 < 44, 'σ1s: the two s orbitals (radius 22) overlap (centres 28 apart)');
  // sigma* 1s antibonding
  cx = 210;
  out.push(S.circle(cx - 26, cy, 22, pos), S.circle(cx + 26, cy, 22, neg), nuc(cx - 26, cy), nuc(cx + 26, cy), S.line(cx, cy - 34, cx, cy + 34, { c: M, w: 1, dash: '3 3' }));
  out.push(lab(cx, 124, 'σ*1s: antibonding', { a: 'middle', w: 'bold' }), small(cx, 138, 's − s out of phase', { a: 'middle' }), small(cx, 152, 'node between nuclei', { a: 'middle', c: M }));
  chk(52 > 44, 'σ*1s: the two lobes (radius 22) are separated by a node (centres 52 apart)');
  // pi 2p bonding
  cx = 350;
  const lobe = (x, y, st) => S.ellipse(x, y, 11, 19, st);
  out.push(lobe(cx - 13, cy - 22, pos), lobe(cx + 13, cy - 22, pos), lobe(cx - 13, cy + 22, neg), lobe(cx + 13, cy + 22, neg), nuc(cx - 13, cy), nuc(cx + 13, cy), S.line(cx - 40, cy, cx + 40, cy, { c: M, w: 1, dash: '3 3' }));
  out.push(lab(cx, 124, 'π2p: bonding', { a: 'middle', w: 'bold' }), small(cx, 138, 'p + p sideways, in phase', { a: 'middle' }), small(cx, 152, 'density above and below axis', { a: 'middle', c: M }));
  // pi* 2p antibonding
  cx = 490;
  out.push(lobe(cx - 17, cy - 22, pos), lobe(cx + 17, cy - 22, neg), lobe(cx - 17, cy + 22, neg), lobe(cx + 17, cy + 22, pos), nuc(cx - 17, cy), nuc(cx + 17, cy), S.line(cx, cy - 46, cx, cy + 46, { c: M, w: 1, dash: '3 3' }));
  out.push(lab(cx, 124, 'π*2p: antibonding', { a: 'middle', w: 'bold' }), small(cx, 138, 'p − p, out of phase', { a: 'middle' }), small(cx, 152, 'node between nuclei', { a: 'middle', c: M }));
  out.push(S.circle(16, 176, 5, { ...pos }), small(26, 180, 'positive phase'), S.circle(116, 176, 5, { ...neg }), small(126, 180, 'negative phase'), small(226, 180, 'Dotted line: node (zero electron density).', { c: M }));
  return svgDoc(570, 192, 'How atomic orbitals combine. Two 1s orbitals in phase give a bonding sigma orbital with electron density between the nuclei; out of phase they give an antibonding sigma star orbital with a node between the nuclei. Two parallel 2p orbitals in phase give a bonding pi orbital above and below the axis; out of phase they give an antibonding pi star orbital with a node.', out.join(''));
})();

// ---------------------------------------------------------------- bond order bar chart for the oxygen and nitrogen species
export const MO_SERIES = (() => {
  const out = [];
  const groups = [
    ['Oxygen species', 20, ['O2+', 'O2', 'O2-', 'O2 2-']],
    ['Nitrogen species', 290, ['N2', 'N2+', 'N2-', 'N2 2-']],
  ];
  const u = 38; // px per unit of bond order
  groups.forEach(([title, ox, keys]) => {
    out.push(lab(ox, 20, title, { w: 'bold' }));
    keys.forEach((k, i) => {
      const y = 36 + i * 46;
      const sp = MO[k];
      out.push(lab(ox, y + 15, sp.name, { w: 'bold', size: 12 }));
      out.push(S.rect(ox + 50, y, sp.bo * u, 24, { fill: sp.para ? R : B, fop: 0.5, c: sp.para ? R : B, sw: 1 }));
      out.push(lab(ox + 56 + sp.bo * u, y + 16, `${fmtBO(sp.bo)}`, { w: 'bold' }));
      out.push(small(ox + 50, y + 36, `${sp.para ? 'paramagnetic' : 'diamagnetic'}, ${sp.unpaired} unpaired${LEN[k] ? `, ${LEN[k]} pm` : ''}`, { c: M }));
    });
    out.push(S.line(ox + 50, 30, ox + 50, 214, { w: 1.2 }));
  });
  out.push(S.rect(20, 236, 12, 10, { fill: B, fop: 0.5, c: B, sw: 1 }), small(38, 245, 'diamagnetic'), S.rect(120, 236, 12, 10, { fill: R, fop: 0.5, c: R, sw: 1 }), small(138, 245, 'paramagnetic'), small(238, 245, 'Bar length = bond order, computed from the filled MOs.', { c: M }));
  const bs = (ks) => ks.map((k) => MO[k].bo);
  chk(JSON.stringify(bs(['O2+', 'O2', 'O2-', 'O2 2-'])) === '[2.5,2,1.5,1]', 'oxygen species bond orders 2.5, 2, 1.5, 1');
  chk(JSON.stringify(bs(['N2', 'N2+', 'N2-', 'N2 2-'])) === '[3,2.5,2.5,2]', 'nitrogen species bond orders 3, 2.5, 2.5, 2');
  chk(LEN['O2+'] < LEN.O2 && LEN.O2 < LEN['O2-'] && LEN['O2-'] < LEN['O2 2-'], 'O–O bond length rises as bond order falls');
  return svgDoc(570, 256, 'Bond orders from molecular orbital theory: O2 plus 2.5, O2 2, O2 minus 1.5, O2 2 minus 1; N2 3, N2 plus 2.5, N2 minus 2.5, N2 2 minus 2. Species with unpaired electrons are paramagnetic.', out.join(''));
})();

// ================================================================ line structures with lone pairs and dative bonds
const angDiff = (a, b) => {
  let d = Math.abs(a - b) % (2 * Math.PI);
  if (d > Math.PI) d = 2 * Math.PI - d;
  return d;
};
function lpAngles(bondAng, n) {
  const placed = [...bondAng];
  const res = [];
  for (let k = 0; k < n; k++) {
    let best = null;
    for (let d = 0; d < 360; d += 5) {
      const a = (d * Math.PI) / 180;
      const m = placed.length ? Math.min(...placed.map((p) => angDiff(a, p))) : Math.PI;
      if (!best || m > best.m + 1e-9) best = { a, m };
    }
    placed.push(best.a);
    res.push(best.a);
  }
  return res;
}
const dot = (x, y, col = 'currentColor') => S.circle(x, y, 1.9, { fill: col, c: col, sw: 0.3 });
const pairAt = (x, y, perp, col) => dot(x + 2.7 * Math.cos(perp), y + 2.7 * Math.sin(perp), col) + dot(x - 2.7 * Math.cos(perp), y - 2.7 * Math.sin(perp), col);
/**
 * atoms: [{ s, x, y, lp, fc }]; bonds: [i, j, k] with k = 1, 2, 3 (covalent), 'd' (dative arrow i to j), 'h' (hydrogen bond, dotted),
 * 'r' (resonance hybrid: solid line plus dashed line, order shown by `ord`). Returns { svg, el } where el counts the valence
 * electrons shown (2 per covalent order and per dative bond, 2 per lone pair; hydrogen bonds and hybrids' dashes are not counted).
 */
function struct(ox, oy, atoms, bonds) {
  const out = [];
  const pos = atoms.map((a) => ({ ...a, X: ox + a.x, Y: oy + a.y, r: a.ring ? 4 : 9 }));
  const bAng = atoms.map(() => []);
  let el = 0;
  bonds.forEach(([i, j, k, ord]) => {
    const A = pos[i];
    const Bp = pos[j];
    const dx = Bp.X - A.X;
    const dy = Bp.Y - A.Y;
    const Ln = Math.hypot(dx, dy);
    const a = Math.atan2(dy, dx);
    bAng[i].push(a);
    bAng[j].push(a + Math.PI);
    const s0 = A.r + 2;
    const s1 = Ln - Bp.r - 2;
    const P = (f, off = 0) => [A.X + f * Math.cos(a) - off * Math.sin(a), A.Y + f * Math.sin(a) + off * Math.cos(a)];
    if (k === 'd') {
      const [x1, y1] = P(s0);
      const [x2, y2] = P(s1 + 1);
      out.push(S.arrow(x1, y1, x2, y2, { c: B, w: 2, size: 8 }));
      el += 2;
    } else if (k === 'h') {
      const [x1, y1] = P(s0 - 1);
      const [x2, y2] = P(s1 + 1);
      out.push(S.line(x1, y1, x2, y2, { c: G, w: 2.2, dash: '2 4', cap: 'round' }));
    } else if (k === 'r') {
      const [x1, y1] = P(s0);
      const [x2, y2] = P(s1);
      out.push(S.line(x1, y1, x2, y2, { w: 1.8 }));
      const [x3, y3] = P(s0, 4);
      const [x4, y4] = P(s1, 4);
      out.push(S.line(x3, y3, x4, y4, { w: 1.6, dash: '4 3', c: R }));
    } else {
      for (let t = 0; t < k; t++) {
        const off = (t - (k - 1) / 2) * 4.2;
        const [x1, y1] = P(s0, off);
        const [x2, y2] = P(s1, off);
        out.push(S.line(x1, y1, x2, y2, { w: 1.8 }));
      }
      el += 2 * k;
    }
  });
  pos.forEach((a, i) => {
    if (!a.ring) out.push(S.text(a.X, a.Y + 5, a.s, { a: 'middle', size: 13, w: 'bold', c: a.col ?? 'currentColor' }));
    const n = a.lp ?? 0;
    lpAngles(bAng[i], n).forEach((t) => out.push(pairAt(a.X + (a.r + 7) * Math.cos(t), a.Y + (a.r + 7) * Math.sin(t), t + Math.PI / 2, 'currentColor')));
    el += 2 * n;
    if (a.fc) {
      const sx = bAng[i].reduce((t, g) => t + Math.cos(g), 0);
      const sy = bAng[i].reduce((t, g) => t + Math.sin(g), 0);
      const g0 = bAng[i].length && Math.hypot(sx, sy) > 0.2 ? Math.atan2(-sy, -sx) : -Math.PI / 4;
      out.push(S.text(a.X + (a.r + 9) * Math.cos(g0 - 0.5), a.Y + (a.r + 9) * Math.sin(g0 - 0.5) + 4, a.fc, { a: 'middle', size: 13, w: 'bold', c: a.fc.includes('+') ? B : R }));
    }
  });
  return { svg: out.join(''), el };
}
const totalFor = (...vals) => vals.reduce((s, v) => s + v, 0);

// ---------------------------------------------------------------- NH4+ and H3O+
export const DATIVE_IONS = (() => {
  const out = [];
  const L = 44;
  // row 1: NH3 + H+ -> NH4+
  const nh3 = struct(70, 76, [{ s: 'N', x: 0, y: 0, lp: 1 }, { s: 'H', x: -L, y: 0 }, { s: 'H', x: L, y: 0 }, { s: 'H', x: 0, y: L }], [[0, 1, 1], [0, 2, 1], [0, 3, 1]]);
  chk(nh3.el === totalFor(5, 3), 'NH₃ structure shows 8 valence electrons');
  out.push(nh3.svg, lab(70, 150, 'NH₃: lone pair on N', { a: 'middle', size: 11 }));
  out.push(lab(150, 80, '+', { a: 'middle', size: 16, w: 'bold' }), lab(180, 80, 'H⁺', { a: 'middle', size: 14, w: 'bold' }), small(180, 96, 'vacant 1s orbital', { a: 'middle', c: M }));
  out.push(S.arrow(214, 76, 256, 76, { w: 2, size: 8 }));
  const nh4 = struct(340, 76, [{ s: 'N', x: 0, y: 0 }, { s: 'H', x: -L, y: 0 }, { s: 'H', x: 0, y: -L }, { s: 'H', x: 0, y: L }, { s: 'H', x: L, y: 0 }], [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 'd']]);
  chk(nh4.el === 8 && 5 + 4 - 1 === 8, 'NH₄⁺ structure shows 8 valence electrons (5 + 4 − 1): four N–H pairs, no lone pair');
  out.push(nh4.svg, lab(340, 150, 'NH₄⁺: N → H dative bond', { a: 'middle', size: 11 }));
  out.push(S.path('M 288 22 L 280 22 L 280 130 L 288 130', { w: 1.5 }), S.path('M 392 22 L 400 22 L 400 130 L 392 130', { w: 1.5 }), lab(406, 30, '+', { size: 16, w: 'bold', c: B }));
  // row 2: H2O + H+ -> H3O+
  const h2o = struct(70, 214, [{ s: 'O', x: 0, y: 0, lp: 2 }, { s: 'H', x: -L, y: 0 }, { s: 'H', x: L, y: 0 }], [[0, 1, 1], [0, 2, 1]]);
  chk(h2o.el === 6 + 2, 'H₂O structure shows 8 valence electrons');
  out.push(h2o.svg, lab(70, 292, 'H₂O: two lone pairs on O', { a: 'middle' }));
  out.push(lab(150, 218, '+', { a: 'middle', size: 16, w: 'bold' }), lab(180, 218, 'H⁺', { a: 'middle', size: 14, w: 'bold' }), small(180, 234, 'vacant 1s orbital', { a: 'middle', c: M }));
  out.push(S.arrow(214, 214, 256, 214, { w: 2, size: 8 }));
  const h3o = struct(340, 214, [{ s: 'O', x: 0, y: 0, lp: 1 }, { s: 'H', x: -L, y: 0 }, { s: 'H', x: L, y: 0 }, { s: 'H', x: 0, y: L }], [[0, 1, 1], [0, 2, 1], [0, 3, 'd']]);
  chk(h3o.el === 6 + 3 - 1, 'H₃O⁺ structure shows 8 valence electrons (6 + 3 − 1): three O–H pairs and one lone pair');
  out.push(h3o.svg, lab(340, 292, 'H₃O⁺: O → H dative bond', { a: 'middle' }));
  out.push(S.path('M 288 160 L 280 160 L 280 268 L 288 268', { w: 1.5 }), S.path('M 392 160 L 400 160 L 400 268 L 392 268', { w: 1.5 }), lab(406, 168, '+', { size: 16, w: 'bold', c: B }));
  out.push(small(440, 80, 'Blue arrow: pair donated', { c: B }), small(440, 94, 'by the donor atom.', { c: B }), small(440, 120, 'Once formed, all four N–H', { c: M }), small(440, 134, 'bonds are identical.', { c: M }));
  return svgDoc(570, 304, 'Formation of coordinate bonds. In NH3 the nitrogen lone pair is donated to an H plus ion, which has a vacant 1s orbital, forming NH4 plus with a dative bond shown by an arrow from N to H. In water an oxygen lone pair is donated to H plus to form H3O plus. After formation all the N-H bonds of ammonium, or the O-H bonds of hydronium, are identical.', out.join(''));
})();

// ---------------------------------------------------------------- oxyacids of chlorine
export const CL_OXY = (() => {
  const out = [];
  const L = 40;
  const defs = [
    { n: 1, name: 'HOCl', title: 'hypochlorous acid', cx: 130, cy: 80 },
    { n: 2, name: 'HOClO', title: 'chlorous acid', cx: 400, cy: 80 },
    { n: 3, name: 'HOClO₂', title: 'chloric acid', cx: 130, cy: 244 },
    { n: 4, name: 'HOClO₃', title: 'perchloric acid', cx: 400, cy: 244 },
  ];
  defs.forEach((d) => {
    const nd = clDative(d.n);
    const atoms = [{ s: 'Cl', x: 0, y: 0, lp: clLonePairs(d.n), ring: false }, { s: 'O', x: -L, y: 0, lp: 2 }, { s: 'H', x: -2 * L + 4, y: 0 }];
    const bonds = [[0, 1, 1], [1, 2, 1]];
    const spots = [[0, -L], [L, 0], [0, L]];
    for (let k = 0; k < nd; k++) {
      atoms.push({ s: 'O', x: spots[k][0], y: spots[k][1], lp: 3 });
      bonds.push([0, atoms.length - 1, 'd']);
    }
    const st = struct(d.cx, d.cy, atoms, bonds);
    const ev = 1 + 7 + 6 * (1 + nd);
    chk(st.el === ev, `HClO${d.n === 1 ? '' : d.n}: structure shows ${ev} valence electrons (${nd} dative bonds, ${clLonePairs(d.n)} lone pairs on Cl)`);
    out.push(st.svg);
    const ty = d.cy + 74;
    out.push(lab(d.cx - 24, ty, `${d.name}`, { a: 'middle', w: 'bold' }), small(d.cx - 24, ty + 14, `${d.title}: ${nd} dative bond${nd === 1 ? '' : 's'}`, { a: 'middle', c: M }));
  });
  return svgDoc(570, 350, 'Structures of the oxyacids of chlorine with coordinate bonds shown as arrows from chlorine to oxygen: hypochlorous acid HOCl has none, chlorous acid HOClO has one, chloric acid HOClO2 has two and perchloric acid HOClO3 has three. The lone pairs left on chlorine fall from three to zero.', out.join(''));
})();

// ---------------------------------------------------------------- HNO3 and O3
export const HNO3_O3 = (() => {
  const out = [];
  const L = 42;
  // HNO3: H-O-N(=O)->O ; N at centre, OH left, =O top, ->O right
  const hno = struct(130, 100, [{ s: 'N', x: 0, y: 0 }, { s: 'O', x: -L, y: 0, lp: 2 }, { s: 'H', x: -2 * L + 4, y: 0 }, { s: 'O', x: 0, y: -L, lp: 2 }, { s: 'O', x: L, y: 0, lp: 3 }], [[0, 1, 1], [1, 2, 1], [0, 3, 2], [0, 4, 'd']]);
  chk(hno.el === 1 + 5 + 18, 'HNO₃ structure shows 24 valence electrons: N=O, N–OH and one N → O dative bond');
  out.push(hno.svg, lab(110, 168, 'HNO₃', { a: 'middle', w: 'bold' }), small(110, 182, 'N has no lone pair left: it donates one pair', { a: 'middle', c: M }), small(110, 196, 'to the third oxygen', { a: 'middle', c: M }));
  // O3: O=O->O bent
  const a = (117 / 2) * (Math.PI / 180);
  const b = 44;
  const o3 = struct(410, 108, [{ s: 'O', x: 0, y: -14, lp: 1 }, { s: 'O', x: -b * Math.sin(a), y: -14 + b * Math.cos(a), lp: 2 }, { s: 'O', x: b * Math.sin(a), y: -14 + b * Math.cos(a), lp: 3 }], [[0, 1, 2], [0, 2, 'd']]);
  chk(o3.el === 18, 'O₃ structure shows 18 valence electrons: O=O, O → O dative bond, six lone pairs');
  out.push(o3.svg, lab(410, 168, 'O₃', { a: 'middle', w: 'bold' }), small(410, 182, 'central O: 1 lone pair, 1 double bond,', { a: 'middle', c: M }), small(410, 196, '1 dative bond (117° bond angle)', { a: 'middle', c: M }));
  out.push(small(20, 236, 'Blue arrow: pair donated by the atom at its tail. O₃ has a second, equivalent structure (resonance).', { c: M }));
  chk(Math.abs(2 * a * 180 / Math.PI - 117) < 1e-9, 'O₃ drawn with a 117° bond angle');
  return svgDoc(570, 248, 'Structures with coordinate bonds. In nitric acid, nitrogen is joined to the OH group by a single bond, to one oxygen by a double bond and to the third oxygen by a dative bond shown as an arrow. In ozone the central oxygen has a double bond to one oxygen and a dative bond to the other, with a bond angle of 117 degrees.', out.join(''));
})();

// ---------------------------------------------------------------- resonance in O3 and CO2
const dbl = (x1, x2, y) => S.arrow(x1, y, x2, y, { w: 1.6, size: 6 }) + S.head(x1, y, Math.PI, { size: 6 });
export const RESON_A = (() => {
  const out = [];
  const a = (117 / 2) * (Math.PI / 180);
  const b = 44;
  const o3 = (ox, oy, dblSide) => {
    const dy = -12;
    const atoms = [{ s: 'O', x: 0, y: dy, lp: 1, fc: '+' }, { s: 'O', x: -b * Math.sin(a), y: dy + b * Math.cos(a), lp: dblSide === 'L' ? 2 : 3, fc: dblSide === 'L' ? null : '−' }, { s: 'O', x: b * Math.sin(a), y: dy + b * Math.cos(a), lp: dblSide === 'R' ? 2 : 3, fc: dblSide === 'R' ? null : '−' }];
    return struct(ox, oy, atoms, [[0, 1, dblSide === 'L' ? 2 : 1], [0, 2, dblSide === 'R' ? 2 : 1]]);
  };
  const s1 = o3(80, 58, 'L');
  const s2 = o3(260, 58, 'R');
  chk(s1.el === 18 && s2.el === 18, 'O₃: both resonance structures show 18 valence electrons');
  out.push(s1.svg, s2.svg, dbl(142, 198, 54));
  // hybrid
  const h = struct(450, 58, [{ s: 'O', x: 0, y: -12, lp: 1, fc: '+' }, { s: 'O', x: -b * Math.sin(a), y: -12 + b * Math.cos(a), lp: 2 }, { s: 'O', x: b * Math.sin(a), y: -12 + b * Math.cos(a), lp: 2 }], [[0, 1, 'r'], [0, 2, 'r']]);
  out.push(h.svg);
  out.push(lab(450, 138, 'hybrid: both O–O bonds equal', { a: 'middle' }), small(450, 152, `bond order ${resBO('O3')}, each end ${'−½'}`, { a: 'middle', c: M }));
  out.push(lab(80, 138, 'O₃ structure I', { a: 'middle' }), lab(260, 138, 'O₃ structure II', { a: 'middle' }));
  out.push(small(170, 44, 'resonance', { a: 'middle', c: M }));
  // CO2
  const co2 = (ox, oy, left, right) => {
    const atoms = [{ s: 'C', x: 0, y: 0 }, { s: 'O', x: -50, y: 0, lp: left.lp, fc: left.fc }, { s: 'O', x: 50, y: 0, lp: right.lp, fc: right.fc }];
    return struct(ox, oy, atoms, [[0, 1, left.k], [0, 2, right.k]]);
  };
  const c1 = co2(80, 236, { k: 2, lp: 2 }, { k: 2, lp: 2 });
  const c2 = co2(260, 236, { k: 1, lp: 3, fc: '−' }, { k: 3, lp: 1, fc: '+' });
  const c3 = co2(440, 236, { k: 3, lp: 1, fc: '+' }, { k: 1, lp: 3, fc: '−' });
  chk([c1, c2, c3].every((s) => s.el === 16), 'CO₂: the three resonance structures each show 16 valence electrons');
  out.push(c1.svg, c2.svg, c3.svg, dbl(150, 190, 226), dbl(330, 370, 226));
  out.push(lab(80, 276, 'O=C=O (main)', { a: 'middle' }), lab(260, 276, '⁻O–C≡O⁺', { a: 'middle' }), lab(440, 276, '⁺O≡C–O⁻', { a: 'middle' }));
  out.push(small(260, 292, 'minor contributors; C–O is 116 pm, shorter than a typical C=O (122 pm)', { a: 'middle', c: M }));
  out.push(S.line(14, 186, 556, 186, { c: M, w: 0.8, dash: '3 3' }));
  chk(resBO('O3') === 1.5 && resBO('CO2') === 2, 'O₃ hybrid bond order 1.5; CO₂ main structure bond order 2');
  return svgDoc(570, 304, 'Resonance. Ozone has two equivalent structures, each with one O=O double bond and one O-O single bond, joined by a double headed arrow; the hybrid has two equal O-O bonds of bond order 1.5. Carbon dioxide has the main structure O=C=O and two minor structures, one with a triple bond to either oxygen.', out.join(''));
})();

// ---------------------------------------------------------------- resonance in CO32- and NO3-
export const RESON_B = (() => {
  const out = [];
  const rad = 44;
  const ang = [-90, 30, 150].map((d) => (d * Math.PI) / 180);
  const planar = (ox, oy, centre, dblIdx, fcCentre) => {
    const atoms = [{ s: centre, x: 0, y: 0, fc: fcCentre }];
    for (let i = 0; i < 3; i++) atoms.push({ s: 'O', x: rad * Math.cos(ang[i]), y: rad * Math.sin(ang[i]), lp: i === dblIdx ? 2 : 3, fc: i === dblIdx ? null : '−' });
    return struct(ox, oy, atoms, [0, 1, 2].map((i) => [0, i + 1, i === dblIdx ? 2 : 1]));
  };
  const rows = [
    { c: 'C', fcC: null, y: 100, name: 'CO₃²⁻', key: 'CO3', tot: 4 + 18 + 2, note: 'each C–O: bond order 4/3, charge −2/3 on each O' },
    { c: 'N', fcC: '+', y: 270, name: 'NO₃⁻', key: 'NO3', tot: 5 + 18 + 1, note: 'each N–O: bond order 4/3, charge −1/3 on each O' },
  ];
  rows.forEach((row) => {
    const xs = [70, 200, 330];
    xs.forEach((x, i) => {
      const st = planar(x, row.y, row.c, i, row.fcC);
      chk(st.el === row.tot, `${row.name}: resonance structure ${i + 1} shows ${row.tot} valence electrons`);
      out.push(st.svg);
    });
    out.push(dbl(122, 150, row.y - 14), dbl(252, 280, row.y - 14));
    // hybrid
    const atoms = [{ s: row.c, x: 0, y: 0 }];
    for (let i = 0; i < 3; i++) atoms.push({ s: 'O', x: rad * Math.cos(ang[i]), y: rad * Math.sin(ang[i]), lp: 3 });
    const h = struct(465, row.y, atoms, [0, 1, 2].map((i) => [0, i + 1, 'r']));
    out.push(h.svg);
    out.push(S.arrow(380, row.y, 412, row.y, { w: 1.6, size: 6 }));
    out.push(lab(465, row.y + 70, `${row.name} hybrid`, { a: 'middle', w: 'bold' }), small(465, row.y + 84, row.note.split(',')[0], { a: 'middle', c: M }));
    out.push(small(200, row.y + 70, row.note.split(', ')[1] ?? '', { a: 'middle', c: M }));
    chk(resBO(row.key) === 4 / 3, `${row.name}: hybrid bond order ${resBO(row.key).toFixed(2)} = 4/3`);
  });
  out.push(S.line(14, 200, 556, 200, { c: M, w: 0.8, dash: '3 3' }));
  out.push(small(14, 14, 'Three equivalent structures: the double bond takes each position in turn.', { c: M }));
  return svgDoc(570, 366, 'Resonance in the carbonate ion and the nitrate ion. Each ion has three equivalent structures with one double bond and two single bonds to oxygen, the double bond occupying each position in turn. The resonance hybrid has three equal bonds of bond order 4 over 3 and the negative charge spread over three oxygen atoms.', out.join(''));
})();

// ================================================================ hydrogen bonding
const hAtom = (x, y) => S.circle(x, y, 8, { fill: FILL, c: M, sw: 1 }) + S.text(x, y + 4, 'H', { a: 'middle', size: 10, w: 'bold' });
const oAtom = (x, y, s = 'O') => S.circle(x, y, 11, { fill: FILL, c: R, sw: 1.4 }) + S.text(x, y + 5, s, { a: 'middle', size: 12, w: 'bold', c: R });
const fAtom = (x, y) => S.circle(x, y, 11, { fill: FILL, c: G, sw: 1.4 }) + S.text(x, y + 5, 'F', { a: 'middle', size: 12, w: 'bold', c: G });
const hb = (x1, y1, x2, y2) => S.line(x1, y1, x2, y2, { c: G, w: 2.4, dash: '2 4', cap: 'round' });
const unit = (x1, y1, x2, y2) => {
  const L = Math.hypot(x2 - x1, y2 - y1);
  return [(x2 - x1) / L, (y2 - y1) / L];
};

export const HBOND_HF_WATER = (() => {
  const out = [];
  // HF zigzag chain
  const pts = [];
  for (let i = 0; i < 3; i++) pts.push([[40 + i * 100, 70 + (i % 2 ? 24 : 0)]]);
  const seq = [];
  const hf = [[30, 60], [92, 60]]; // first molecule H, F
  const mols = [];
  for (let i = 0; i < 3; i++) {
    const y0 = 70 + (i % 2 ? 36 : 0);
    const x0 = 24 + i * 78;
    mols.push({ h: [x0, y0], f: [x0 + 44, y0 - (i % 2 ? 18 : -18) * 0 + (i % 2 ? -16 : 16) * 0] });
  }
  // lay the chain: F of molecule i at (x, y), H of molecule i+1 at the next vertex
  const verts = [];
  const step = 52;
  for (let i = 0; i < 7; i++) verts.push([30 + i * step * 0.95, 88 + (i % 2 ? -22 : 22)]);
  // molecule k uses verts[2k] = H, verts[2k+1] = F
  for (let k = 0; k < 3; k++) {
    const [hx, hy] = verts[2 * k];
    const [fx, fy] = verts[2 * k + 1];
    const [ux, uy] = unit(hx, hy, fx, fy);
    out.push(S.line(hx + 8 * ux, hy + 8 * uy, fx - 11 * ux, fy - 11 * uy, { w: 2 }));
    if (2 * k + 2 < verts.length) {
      const [nx, ny] = verts[2 * k + 2];
      const [vx, vy] = unit(fx, fy, nx, ny);
      out.push(hb(fx + 12 * vx, fy + 12 * vy, nx - 9 * vx, ny - 9 * vy));
    }
  }
  for (let k = 0; k < 3; k++) {
    out.push(hAtom(...verts[2 * k]), fAtom(...verts[2 * k + 1]));
  }
  out.push(lab(150, 150, '(HF)ₙ zigzag chains', { a: 'middle', w: 'bold' }), small(150, 166, 'solid: H–F bond; dotted: H···F bond', { a: 'middle', c: M }));
  // water: central molecule with four neighbours
  const cx = 420;
  const cy = 86;
  const nb = [[-72, -52], [72, -52], [-72, 52], [72, 52]];
  const Hs = [[-34, -24], [34, -24]]; // central molecule donates to the two upper neighbours? use lower for acceptors
  out.push(oAtom(cx, cy));
  // central O donates two H toward upper neighbours
  const dH = [[-24, -20], [24, -20]];
  dH.forEach(([dx, dy], i) => {
    const hx = cx + dx;
    const hy = cy + dy;
    out.push(S.line(cx + (i ? 7 : -7), cy - 8, hx, hy, { w: 2 }));
    const [nx, ny] = nb[i];
    out.push(hb(hx + (i ? 6 : -6), hy - 5, cx + nx + (i ? -8 : 8), cy + ny + 9));
  });
  // upper neighbours (acceptors of the central H): O atoms
  [0, 1].forEach((i) => out.push(oAtom(cx + nb[i][0], cy + nb[i][1])));
  // lower neighbours donate their H to the central O
  [2, 3].forEach((i) => {
    const nx = cx + nb[i][0];
    const ny = cy + nb[i][1];
    out.push(oAtom(nx, ny));
    const hx = cx + (i === 2 ? -24 : 24);
    const hy = cy + 30;
    const [ux, uy] = unit(nx, ny, hx, hy);
    out.push(S.line(nx + 11 * ux, ny + 11 * uy, hx - 7 * ux, hy - 7 * uy, { w: 2 }));
    const [vx, vy] = unit(hx, hy, cx, cy);
    out.push(hb(hx + 8 * vx, hy + 8 * vy, cx - 12 * vx, cy - 12 * vy));
    out.push(hAtom(hx, hy));
  });
  dH.forEach(([dx, dy]) => out.push(hAtom(cx + dx, cy + dy)));
  out.push(lab(cx + 10, 168, 'water: up to four H-bonds each', { a: 'middle', w: 'bold' }), small(cx + 10, 184, 'two via its H atoms, two via lone pairs', { a: 'middle', c: M }));
  chk(true, 'HF chain and water cluster drawn (covalent solid, hydrogen bonds dotted)');
  return svgDoc(570, 198, 'Hydrogen bonding in hydrogen fluoride and water. In HF each molecule joins the next in a zigzag chain, with the covalent H-F bond solid and the hydrogen bond between H and the F of the next molecule dotted. In water a central molecule is joined to four neighbours, donating two hydrogen bonds through its H atoms and accepting two through the lone pairs on oxygen.', out.join(''));
})();

// ---------------------------------------------------------------- ice: hexagonal ring
export const ICE_RING = (() => {
  const out = [];
  const cx = 190;
  const cy = 140;
  const rad = 80;
  const verts = [];
  for (let k = 0; k < 6; k++) {
    const t = ((k * 60 - 90) * Math.PI) / 180;
    verts.push([cx + rad * Math.cos(t), cy + rad * Math.sin(t), t]);
  }
  for (let k = 0; k < 6; k++) {
    const [x1, y1, t1] = verts[k];
    const [x2, y2] = verts[(k + 1) % 6];
    const [ux, uy] = unit(x1, y1, x2, y2);
    const hx = x1 + 42 * ux;
    const hy = y1 + 42 * uy;
    out.push(S.line(x1 + 11 * ux, y1 + 11 * uy, hx - 8 * ux, hy - 8 * uy, { w: 2 }));
    out.push(hb(hx + 8 * ux, hy + 8 * uy, x2 - 12 * ux, y2 - 12 * uy));
    // second (outward) H of each O points above or below the ring
    const ox = Math.cos(t1);
    const oy = Math.sin(t1);
    out.push(S.line(x1 + 11 * ox, y1 + 11 * oy, x1 + 30 * ox, y1 + 30 * oy, { w: 1.6, dash: '3 2' }));
    out.push(hAtom(x1 + 38 * ox, y1 + 38 * oy), hAtom(hx, hy));
  }
  verts.forEach(([x, y]) => out.push(oAtom(x, y)));
  out.push(lab(190, 290, 'Ice: open hexagonal rings of six H₂O', { a: 'middle', w: 'bold' }));
  out.push(small(190, 304, 'dashed spoke: second H bonds to the next layer', { a: 'middle', c: M }));
  // density comparison
  const x0 = 360;
  const dens = [['ice at 0 °C', 0.92, R], ['water at 4 °C', 1.0, B]];
  out.push(lab(x0, 40, 'Density (g cm⁻³)', { w: 'bold' }));
  dens.forEach(([n, d, col], i) => {
    const y = 56 + i * 54;
    out.push(S.rect(x0, y, d * 160, 30, { fill: col, fop: 0.45, c: col, sw: 1 }), lab(x0 + 8, y + 20, n, { w: 'bold' }), lab(x0 + d * 160 + 8, y + 20, d.toFixed(2), { w: 'bold' }));
  });
  out.push(small(x0, 176, 'Hydrogen bonds hold ice in an open', { c: M }), small(x0, 190, 'cage with empty space, so ice is less', { c: M }), small(x0, 204, 'dense and floats on water.', { c: M }));
  chk(0.92 < 1.0, 'ice (0.92 g/cm³) is less dense than water at 4 °C (1.00 g/cm³)');
  chk(Math.abs(Math.hypot(verts[0][0] - verts[1][0], verts[0][1] - verts[1][1]) - rad) < 1e-6, 'ice ring is a regular hexagon');
  return svgDoc(570, 314, 'Structure of ice. Six water molecules form an open hexagonal ring, each oxygen joined to the next through an O-H bond and a dotted hydrogen bond. The open structure gives ice a density of 0.92 grams per cubic centimetre, lower than water at 4 degrees Celsius, 1.00, so ice floats.', out.join(''));
})();

// ---------------------------------------------------------------- organic: ethanol, o- and p-nitrophenol
export const HBOND_ORG = (() => {
  const out = [];
  const hex = (cx, cy, r, a0) => {
    const v = [];
    for (let k = 0; k < 6; k++) {
      const t = ((a0 + k * 60) * Math.PI) / 180;
      v.push([cx + r * Math.cos(t), cy + r * Math.sin(t)]);
    }
    out.push(S.path(`M ${v.map((p) => p.map((n) => n.toFixed(1)).join(' ')).join(' L ')} Z`, { w: 1.8 }), S.circle(cx, cy, r * 0.58, { c: M, w: 1 }));
    return v;
  };
  const seg = (p, q, r1, r2) => {
    const [ux, uy] = unit(p[0], p[1], q[0], q[1]);
    return S.line(p[0] + r1 * ux, p[1] + r1 * uy, q[0] - r2 * ux, q[1] - r2 * uy, { w: 2 });
  };
  const hseg = (p, q, r1, r2) => {
    const [ux, uy] = unit(p[0], p[1], q[0], q[1]);
    return hb(p[0] + r1 * ux, p[1] + r1 * uy, q[0] - r2 * ux, q[1] - r2 * uy);
  };
  // ---- ethanol
  out.push(lab(10, 18, 'Intermolecular: ethanol', { w: 'bold' }));
  out.push(S.line(31, 66, 51, 56, { w: 2 }), S.line(73, 57, 93, 67, { w: 2 }));
  out.push(S.text(20, 75, 'CH₃', { a: 'middle', size: 11, w: 'bold' }), S.text(62, 47, 'CH₂', { a: 'middle', size: 11, w: 'bold' }));
  out.push(oAtom(112, 72), S.line(120, 76, 138, 86, { w: 2 }), hAtom(146, 90), hb(154, 94, 181, 106), oAtom(192, 110));
  out.push(S.line(200, 114, 218, 124, { w: 2 }), hAtom(226, 128), S.line(190, 122, 190, 150, { w: 2 }), S.text(190, 166, 'C₂H₅', { a: 'middle', size: 11, w: 'bold' }));
  out.push(small(10, 192, 'O–H···O links the molecules into chains.', { c: M }), small(10, 206, 'Ethanol (C₂H₆O) boils at 351 K; its isomer', { c: M }), small(10, 220, 'CH₃OCH₃ (no O–H) boils at 249 K.', { c: M }));
  // ---- o-nitrophenol: benzene ring plus a six-membered chelate ring built on the C4-C5 edge
  out.push(lab(300, 18, 'Intramolecular: o-nitrophenol', { w: 'bold' }));
  const bc = [430, 168];
  const rr = 34;
  const v = hex(bc[0], bc[1], rr, -30);
  const ca = v[4];
  const cb = v[5];
  const mid = [(ca[0] + cb[0]) / 2, (ca[1] + cb[1]) / 2];
  const [nx, ny] = unit(bc[0], bc[1], mid[0], mid[1]);
  const hc = [mid[0] + (nx * rr * Math.sqrt(3)) / 2, mid[1] + (ny * rr * Math.sqrt(3)) / 2];
  // chelate ring vertices round hc: Cb, N, O2, H, O1, Ca going away from Ca
  const angB = Math.atan2(cb[1] - hc[1], cb[0] - hc[0]);
  const angA = Math.atan2(ca[1] - hc[1], ca[0] - hc[0]);
  const stepSign = Math.sin(angB - angA) > 0 ? 1 : -1;
  const ringV = (k) => [hc[0] + rr * Math.cos(angB + (stepSign * k * Math.PI) / 3), hc[1] + rr * Math.sin(angB + (stepSign * k * Math.PI) / 3)];
  const N = ringV(1);
  const O2 = ringV(2);
  const Hh = ringV(3);
  const O1 = ringV(4);
  chk(Math.abs(Math.hypot(O1[0] - ca[0], O1[1] - ca[1]) - rr) < 1e-6, 'o-nitrophenol: chelate ring closes (O–C distance equals the ring side)');
  out.push(seg(cb, N, 0, 8), seg(N, O2, 8, 11), hseg(O2, Hh, 12, 9), seg(Hh, O1, 9, 11), seg(O1, ca, 11, 0));
  const [ex, ey] = unit(hc[0], hc[1], N[0], N[1]);
  const O3 = [N[0] + 30 * ex, N[1] + 30 * ey];
  out.push(seg(N, O3, 8, 11), oAtom(O3[0], O3[1]), S.text(N[0], N[1] + 5, 'N', { a: 'middle', size: 13, w: 'bold' }), oAtom(O2[0], O2[1]), hAtom(Hh[0], Hh[1]), oAtom(O1[0], O1[1]));
  out.push(small(300, 226, 'six-membered ring closed by the O–H···O bond', { c: M }), small(300, 240, '(chelation): lower melting point, steam volatile', { c: M }));
  // ---- p-nitrophenol: two molecules, flat-top rings
  out.push(lab(10, 262, 'Intermolecular: p-nitrophenol', { w: 'bold' }));
  const py = 306;
  const rings = [90, 330].map((cx) => hex(cx, py, 26, 0));
  const mol = (v6) => {
    const left = v6[3];
    const right = v6[0];
    const oL = [left[0] - 26, py];
    const hL = [oL[0] - 20, py - 14];
    const nR = [right[0] + 24, py];
    const oR1 = [nR[0] + 20, py - 14];
    const oR2 = [nR[0] + 20, py + 14];
    out.push(seg(left, oL, 0, 11), seg(oL, hL, 11, 8), seg(right, nR, 0, 8), seg(nR, oR1, 8, 11), seg(nR, oR2, 8, 11));
    out.push(S.text(nR[0], nR[1] + 5, 'N', { a: 'middle', size: 13, w: 'bold' }), oAtom(oL[0], oL[1]), hAtom(hL[0], hL[1]), oAtom(oR1[0], oR1[1]), oAtom(oR2[0], oR2[1]));
    return { hL, oR1 };
  };
  const mB = mol(rings[0]);
  const mA = mol(rings[1]);
  out.push(hseg(mA.hL, mB.oR1, 9, 12));
  out.push(small(10, 352, 'Molecules join end to end through O–H···O: higher melting point, less volatile.', { c: M }));
  chk(mA.hL[0] > mB.oR1[0], 'p-nitrophenol: the H of one molecule points at an O of the nitro group of the next');
  return svgDoc(570, 364, 'Hydrogen bonds in organic molecules. In ethanol, O-H of one molecule bonds to the oxygen of the next, forming chains. In ortho-nitrophenol the hydroxyl hydrogen bonds to an oxygen of the neighbouring nitro group inside the same molecule, closing a six-membered ring. In para-nitrophenol the groups are too far apart, so hydrogen bonds form between molecules.', out.join(''));
})();

// ---------------------------------------------------------------- boiling points of the hydrides
export const BP_HYDRIDES = (() => {
  const out = [];
  const x0 = 70;
  const y0 = 24;
  const W = 330;
  const H = 210;
  const ymin = 100;
  const ymax = 400;
  const X = (p) => x0 + 70 + ((p - 2) / 3) * (W - 70);
  const Yv = (T) => y0 + ((ymax - T) / (ymax - ymin)) * H;
  out.push(S.line(x0, y0, x0, y0 + H, { w: 1.5 }), S.line(x0, y0 + H, x0 + W + 10, y0 + H, { w: 1.5 }));
  for (const T of [100, 200, 300, 400]) {
    out.push(S.line(x0 - 3, Yv(T), x0, Yv(T)), small(x0 - 6, Yv(T) + 4, String(T), { a: 'end' }), S.line(x0, Yv(T), x0 + W + 10, Yv(T), { c: M, w: 0.4 }));
  }
  [2, 3, 4, 5].forEach((p) => out.push(small(X(p), y0 + H + 14, `period ${p}`, { a: 'middle' })));
  out.push(small(x0 + W / 2, y0 + H + 32, 'period of the element bonded to hydrogen', { a: 'middle' }), lab(10, 14, 'Boiling point (K)', { w: 'bold' }));
  const style = { 14: [M, 'Group 14 (CH₄ …)'], 15: [G, 'Group 15 (NH₃ …)'], 16: [B, 'Group 16 (H₂O …)'], 17: [R, 'Group 17 (HF …)'] };
  Object.entries(BP).forEach(([g, pts]) => {
    const [col] = style[g];
    out.push(S.path(pts.map(([, T], i) => `${i ? 'L' : 'M'} ${X(i + 2).toFixed(1)} ${Yv(T).toFixed(1)}`).join(' '), { c: col, w: 2.2 }));
    pts.forEach(([n, T], i) => out.push(S.circle(X(i + 2), Yv(T), 3.5, { fill: col, c: col })));
    out.push(small(X(2) - 8, Yv(pts[0][1]) + 4, `${pts[0][0]} ${pts[0][1]}`, { a: 'end', c: col, w: 'bold' }));
  });
  // legend
  Object.entries(style).forEach(([g, [col, t]], i) => {
    out.push(S.line(420, 50 + i * 20, 446, 50 + i * 20, { c: col, w: 2.4 }), small(452, 54 + i * 20, t, {}));
  });
  out.push(small(420, 150, 'NH₃, H₂O and HF break the trend:', { c: M }), small(420, 164, 'hydrogen bonding raises their', { c: M }), small(420, 178, 'boiling points.', { c: M }));
  const mono = (g) => BP[g].every(([, T], i) => i === 0 || T > BP[g][i - 1][1]);
  chk(mono(14), 'group 14 boiling points rise steadily down the group');
  chk([15, 16, 17].every((g) => BP[g][0][1] > BP[g][1][1]), 'NH₃, H₂O and HF boil higher than the period 3 hydrides');
  chk([15, 16, 17].every((g) => BP[g].slice(1).every(([, T], i, a) => i === 0 || T > a[i - 1][1])), 'period 3 to 5 hydrides of groups 15 to 17 rise down the group');
  return svgDoc(570, 274, 'Boiling points of the hydrides of groups 14 to 17 against the period of the element. Group 14 rises steadily from methane at 112 K. For groups 15, 16 and 17 the period 2 hydrides, ammonia 240 K, water 373 K and hydrogen fluoride 293 K, boil much higher than the period 3 hydrides because of hydrogen bonding; the later hydrides then rise down each group.', out.join(''));
})();
