// SVG diagrams for ICSE 9 Chemistry ch07 Atomic Structure: Rutherford's scattering experiment (named and lettered),
// the Bohr model of sodium (named and lettered), a row of Bohr shell diagrams, and the isotopes of hydrogen.
import { svgDoc, S } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { config, ISO } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const BLUE = 'var(--diagram-blue)';
const RED = 'var(--diagram-red)';
const MUTED = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const YEL = 'var(--diagram-yellow)';
const L = (x, y, t) => S.text(x, y, t, { size: 15, w: 'bold', c: RED });

/** Bohr atom: nucleus circle with text lines, concentric shells, electrons spread round each shell. */
function bohr(cx, cy, shells, { r0 = 16, gap = 14, nucText = [], nucSize = 10, ecol = BLUE, rot = -90 } = {}) {
  const out = [];
  shells.forEach((n, i) => {
    const rad = r0 + gap * (i + 1);
    out.push(S.circle(cx, cy, rad, { c: MUTED, sw: 1.2 }));
    for (let k = 0; k < n; k++) {
      const ang = ((rot + i * 17 + (360 / n) * k) * Math.PI) / 180;
      out.push(S.circle(cx + rad * Math.cos(ang), cy + rad * Math.sin(ang), 3, { fill: ecol, c: ecol, sw: 1 }));
    }
  });
  out.push(S.circle(cx, cy, r0, { fill: RED, c: RED, fop: 0.2, sw: 1.6 }));
  nucText.forEach((t, i) => out.push(S.text(cx, cy + 4 + (i - (nucText.length - 1) / 2) * 12, t, { a: 'middle', size: nucSize, w: 'bold' })));
  return out.join('');
}

// ---------------------------------------------------------------- 1. Rutherford's scattering experiment
function scattering(lettered) {
  const p = [];
  // source box and beam channel
  p.push(S.rect(14, 92, 52, 76, { fill: FILL, sw: 1.8 }));
  p.push(S.line(66, 105, 100, 105, { w: 1.5 }), S.line(66, 155, 100, 155, { w: 1.5 }));
  // gold foil: a thin column of nuclei
  p.push(S.rect(236, 50, 8, 180, { fill: YEL, c: YEL, fop: 0.35, sw: 1.4 }));
  for (let y = 62; y <= 222; y += 20) p.push(S.circle(240, y, 1.8, { fill: RED, c: RED, sw: 0.5 }));
  // zinc sulphide screen: an arc round the foil
  p.push(S.path('M330 20 Q420 140 330 260', { w: 3, c: MUTED }));
  // paths of alpha particles
  p.push(S.arrow(100, 105, 234, 105, { c: BLUE, w: 2 }), S.arrow(244, 105, 322, 72, { c: BLUE, w: 2 }));
  p.push(S.arrow(100, 130, 234, 130, { c: BLUE, w: 2 }), S.arrow(244, 130, 360, 130, { c: BLUE, w: 2 }));
  p.push(S.arrow(100, 155, 236, 155, { c: BLUE, w: 2 }), S.arrow(238, 155, 170, 225, { c: RED, w: 2 }));
  if (lettered) {
    p.push(L(30, 80, 'A'), S.lead(42, 76, 40, 94));
    p.push(L(236, 40, 'B'), S.lead(240, 44, 240, 50));
    p.push(L(410, 134, 'C'), S.lead(406, 130, 362, 130));
    p.push(L(336, 62, 'D'), S.lead(332, 66, 320, 72));
    p.push(L(158, 238, 'E'), S.lead(164, 232, 172, 226));
    return svgDoc(440, 270, 'Rutherford scattering experiment with five parts lettered A to E. A source of alpha particles sends a narrow beam at a thin gold foil, with a curved screen round the foil. Most particles go straight through, a few are deflected and one rebounds', p.join(''));
  }
  p.push(lab(14, 182, 'Source of', {}), lab(14, 196, 'alpha particles', {}));
  p.push(lab(196, 244, 'Thin gold foil', {}), S.lead(228, 232, 238, 224));
  p.push(lab(262, 150, 'Passes straight', {}));
  p.push(lab(256, 60, 'Deflected', {}), S.lead(300, 64, 304, 80));
  p.push(lab(60, 238, 'Rebounds', { c: RED }), S.lead(120, 232, 168, 224));
  p.push(lab(388, 232, 'Screen', {}), S.lead(396, 224, 380, 190));
  return svgDoc(440, 270, 'Rutherford scattering experiment. Alpha particles from a source pass through a thin gold foil. Most go straight through, a few are deflected and very few rebound towards the source. A curved screen round the foil shows where they land', p.join(''));
}
export const SCATTER = scattering(false);
export const SCATTER_LETTERED = scattering(true);

// ---------------------------------------------------------------- 2. Bohr model of a sodium atom
function sodium(lettered) {
  const p = [];
  const cx = 120;
  const cy = 130;
  p.push(bohr(cx, cy, config(11), { r0: 20, gap: 28, nucText: ['11p', '12n'] }));
  if (lettered) {
    p.push(L(262, 66, 'A'), S.lead(258, 62, cx + 8, cy - 14));
    p.push(L(262, 104, 'B'), S.lead(258, 100, cx + 48 * Math.cos(-0.5), cy + 48 * Math.sin(-0.5)));
    p.push(L(262, 158, 'C'), S.lead(258, 154, cx + 76, cy + 3));
    p.push(L(262, 214, 'D'), S.lead(258, 210, cx + 104 * Math.cos(0.5), cy + 104 * Math.sin(0.5)));
    p.push(L(262, 24, 'E'), S.lead(258, 20, cx + 104 * Math.cos(-0.977) + 2, cy + 104 * Math.sin(-0.977) - 2));
    return svgDoc(320, 270, 'Bohr model of an atom with five parts lettered A to E: the nucleus, the innermost shell, a middle shell, the outermost shell, and one electron in the outermost shell', p.join(''));
  }
  p.push(lab(250, 40, 'Nucleus: 11 protons,', {}), lab(250, 54, '12 neutrons', {}), S.lead(248, 46, cx + 8, cy - 14));
  p.push(lab(250, 104, 'K shell: 2 electrons', {}), S.lead(248, 100, cx + 48 * Math.cos(-0.5), cy + 48 * Math.sin(-0.5)));
  p.push(lab(250, 158, 'L shell: 8 electrons', {}), S.lead(248, 154, cx + 76, cy + 3));
  p.push(lab(250, 214, 'M shell: 1 electron', {}), S.lead(248, 210, cx + 104 * Math.cos(0.5), cy + 104 * Math.sin(0.5)));
  p.push(lab(250, 254, 'Sodium atom: 2, 8, 1', { w: 'bold', size: 12 }));
  return svgDoc(400, 270, 'Bohr model of a sodium atom. The nucleus holds 11 protons and 12 neutrons. Eleven electrons move in three shells: 2 in the K shell, 8 in the L shell and 1 in the M shell', p.join(''));
}
export const SODIUM = sodium(false);
export const SODIUM_LETTERED = sodium(true);

// ---------------------------------------------------------------- 3. a row of Bohr shell diagrams
export const SHELLROW = (() => {
  const p = [];
  const list = [['Li', 3, 'lithium'], ['O', 8, 'oxygen'], ['Ne', 10, 'neon'], ['Mg', 12, 'magnesium'], ['K', 19, 'potassium']];
  const xs = [56, 150, 244, 348, 462];
  list.forEach(([sym, z, name], i) => {
    const sh = config(z);
    p.push(bohr(xs[i], 74, sh, { r0: 10, gap: 11, nucText: [sym], nucSize: 10 }));
    p.push(lab(xs[i], 142, name, { a: 'middle', w: 'bold' }), lab(xs[i], 156, sh.join(', '), { a: 'middle' }));
  });
  p.push(lab(10, 176, 'Each dot is an electron; each ring is a shell, with K nearest the nucleus.', { c: MUTED, size: 10 }));
  return svgDoc(520, 184, 'Bohr shell diagrams: lithium with 2 and 1 electrons, oxygen with 2 and 6, neon with 2 and 8, magnesium with 2, 8 and 2, and potassium with 2, 8, 8 and 1', p.join(''));
})();

// ---------------------------------------------------------------- 4. the isotopes of hydrogen
export const HYDROGEN = (() => {
  const p = [];
  const xs = [80, 210, 340];
  ISO.H.forEach((iso, i) => {
    const cx = xs[i];
    const cy = 78;
    p.push(S.circle(cx, cy, 44, { c: MUTED, sw: 1.2 }), S.circle(cx + 44 * Math.cos(-0.7), cy + 44 * Math.sin(-0.7), 3.4, { fill: BLUE, c: BLUE, sw: 1 }));
    // nucleus: one proton and `n` neutrons
    const parts = [['p', RED], ...Array(iso.n).fill(['n', MUTED])];
    const pos = [[0, 0], [-7, 0], [7, 0]];
    const spots = iso.n === 0 ? [[0, 0]] : iso.n === 1 ? [[-6, 0], [6, 0]] : [[-9, 4], [9, 4], [0, -8]];
    parts.forEach(([kind, col], k) => p.push(S.circle(cx + spots[k][0], cy + spots[k][1], 7.5, { fill: col, c: col, fop: kind === 'p' ? 0.45 : 0.25, sw: 1.4 })));
    void pos;
    p.push(lab(cx, 148, iso.name[0].toUpperCase() + iso.name.slice(1), { a: 'middle', w: 'bold' }));
    p.push(lab(cx, 162, `${iso.p} proton, ${iso.n} ${iso.n === 1 ? 'neutron' : 'neutrons'}`, { a: 'middle' }));
    p.push(lab(cx, 176, `mass number ${iso.a}`, { a: 'middle' }));
  });
  p.push(lab(20, 200, 'Red circle: proton   Grey circle: neutron   Blue dot: electron', { c: MUTED, size: 10 }));
  return svgDoc(420, 208, 'The three isotopes of hydrogen. Protium has one proton and no neutron, deuterium has one proton and one neutron, tritium has one proton and two neutrons. Each has one electron in the K shell', p.join(''));
})();
