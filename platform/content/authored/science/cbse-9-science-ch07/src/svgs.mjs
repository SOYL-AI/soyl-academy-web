// Hand-drawn SVG schematics for ch07 Structure of an Atom (allow-listed elements, palette colours only).
// Geometry is computed in JS (electron positions from the computed shell distributions) and self-checked.
import { svgDoc, S, near } from './lib.mjs';
import { shells, dist, valency, bySym, count } from './data.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const small = (x, y, s, o) => S.text(x, y, s, { size: 10, ...o });
const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const MUTED = 'var(--diagram-muted)';
const dist2 = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

// ------------------------------------------------------------------ 1. discharge tube: cathode rays and canal rays
const tubeA = { x: 60, y: 30, w: 450, h: 120, yc: 90 };
const plateTop = 62;
const plateBot = 118;
const rayStart = [82, tubeA.yc];
const rayBendStart = [250, tubeA.yc];
const rayBendEnd = [390, 76];
const slope = (rayBendEnd[1] - 90) / (rayBendEnd[0] - 320); // tangent of the Bezier at its end: control point (320, 90)
const rayEndX = 496;
const rayEnd = [rayEndX, rayBendEnd[1] + slope * (rayEndX - rayBendEnd[0])];
chk(rayEnd[1] < tubeA.yc && rayEnd[1] > tubeA.y && rayEnd[1] > plateTop - 10, `discharge tube: the beam ends at y = ${rayEnd[1].toFixed(1)}, above the centre line (towards the positive plate) and still inside the tube`);
chk(plateTop < tubeA.yc && plateBot > tubeA.yc && rayBendEnd[1] > plateTop, 'discharge tube: the beam stays between the two plates while it bends');
const holeGaps = [[247, 259], [281, 293]];
const canalY = holeGaps.map(([a, b]) => (a + b) / 2);
chk(canalY.every((y, i) => y > holeGaps[i][0] && y < holeGaps[i][1]), 'discharge tube: each canal ray passes through a hole in the cathode');
const tube = (x, y, w, h) => S.rect(x, y, w, h, { rx: 14, c: 'currentColor', sw: 2, fill: 'var(--diagram-fill)', fop: 0.5 });
export const TUBE = svgDoc(
  640,
  350,
  'Two discharge-tube schematics. Top: cathode rays leave the cathode, pass through a slit in the anode and bend towards the positive plate between two charged plates, so they carry negative charge; they are a beam of electrons. Bottom: a tube with a perforated cathode; positive canal rays pass through the holes and travel the other way, behind the cathode.',
  [
    lab(20, 18, 'Cathode rays: the beam bends towards the positive plate', { w: 'bold' }),
    tube(tubeA.x, tubeA.y, tubeA.w, tubeA.h),
    S.rect(72, 62, 8, 56, { fill: MUTED, fop: 0.6, c: MUTED }),
    S.rect(150, 36, 6, 40, { fill: RED, fop: 0.4, c: RED }),
    S.rect(150, 104, 6, 40, { fill: RED, fop: 0.4, c: RED }),
    S.rect(250, plateTop - 6, 140, 6, { fill: RED, fop: 0.45, c: RED }),
    S.rect(250, plateBot, 140, 6, { fill: BLUE, fop: 0.45, c: BLUE }),
    S.rect(498, 40, 6, 100, { fill: 'var(--diagram-yellow)', fop: 0.5, c: 'var(--diagram-yellow)' }),
    S.line(rayStart[0], rayStart[1], rayBendStart[0], rayBendStart[1], { c: BLUE, w: 2.5 }),
    S.path(`M${rayBendStart[0]} ${rayBendStart[1]} Q320 ${tubeA.yc} ${rayBendEnd[0]} ${rayBendEnd[1]}`, { c: BLUE, w: 2.5 }),
    S.line(rayBendEnd[0], rayBendEnd[1], rayEnd[0], rayEnd[1], { c: BLUE, w: 2.5 }),
    S.midHead(rayStart[0], rayStart[1], rayBendStart[0], rayBendStart[1], { c: BLUE, size: 8, at: 0.5 }),
    S.head(rayEnd[0], rayEnd[1], Math.atan2(rayEnd[1] - rayBendEnd[1], rayEnd[0] - rayBendEnd[0]), { c: BLUE, size: 8 }),
    lab(320, plateTop - 12, '+ plate', { a: 'middle', c: RED }),
    lab(320, plateBot + 20, '− plate', { a: 'middle', c: BLUE }),
    lab(66, 170, 'Cathode (−)', { a: 'middle' }),
    lab(185, 170, 'Anode (+) with slit', { a: 'middle' }),
    lab(500, 170, 'Glowing screen', { a: 'middle' }),
    lab(20, 198, 'Canal rays: positive rays pass through holes in the cathode', { w: 'bold' }),
    tube(60, 214, 450, 124),
    S.rect(296, 218, 8, 29, { fill: MUTED, fop: 0.6, c: MUTED }),
    S.rect(296, 259, 8, 22, { fill: MUTED, fop: 0.6, c: MUTED }),
    S.rect(296, 293, 8, 41, { fill: MUTED, fop: 0.6, c: MUTED }),
    S.rect(440, 250, 6, 50, { fill: RED, fop: 0.4, c: RED }),
    ...canalY.map((y) => S.arrow(292, y, 100, y, { c: RED, w: 2.5, size: 8 })),
    ...[[330, 253], [380, 275], [345, 296], [395, 318]].map(([x, y]) => S.circle(x, y, 4, { fill: RED, fop: 0.5, c: RED, sw: 1 })),
    lab(190, 330, 'Cathode (−), perforated', { a: 'middle' }),
    lab(443, 330, 'Anode (+)', { a: 'middle' }),
    lab(130, 244, 'canal rays (positive)', { a: 'middle', c: RED }),
  ].join(''),
);

// ------------------------------------------------------------------ 2. Thomson model
const th = { cx: 150, cy: 130, R: 100 };
const thElectrons = [[th.cx, th.cy], ...[...Array(6)].map((_, i) => [th.cx + 58 * Math.cos((Math.PI / 3) * i + 0.3), th.cy + 58 * Math.sin((Math.PI / 3) * i + 0.3)])];
chk(thElectrons.every((p) => dist2(p, [th.cx, th.cy]) + 8 < th.R) && thElectrons.length === 7, 'Thomson model: all 7 electrons drawn lie inside the positive sphere');
chk(thElectrons.every((p, i) => thElectrons.every((q, j) => i === j || dist2(p, q) > 16)), 'Thomson model: no two electrons overlap');
export const THOMSON = svgDoc(
  520,
  260,
  'Thomson model of the atom. A large sphere of positive charge, spread evenly, has small negative electrons embedded in it like plums in a pudding or seeds in a watermelon. The total positive charge equals the total negative charge, so the atom is neutral.',
  [
    S.circle(th.cx, th.cy, th.R, { fill: RED, fop: 0.2, c: RED, sw: 2 }),
    ...thElectrons.map(([x, y]) => S.circle(x, y, 8, { fill: BLUE, fop: 0.5, c: BLUE, sw: 1.2 }) + S.text(x, y + 4, '−', { a: 'middle', size: 12, w: 'bold' })),
    S.lead(th.cx + 70, th.cy - 70, 275, 54),
    lab(280, 50, 'Positive charge spread', {}),
    lab(280, 64, 'evenly through the sphere', {}),
    S.lead(thElectrons[1][0] + 8, thElectrons[1][1], 275, 130),
    lab(280, 126, 'Electron (−) embedded', {}),
    lab(280, 140, 'in the sphere like a plum', {}),
    lab(280, 154, 'in a pudding', {}),
    lab(280, 196, 'Total + charge = total − charge,', { w: 'bold' }),
    lab(280, 210, 'so the atom is neutral.', { w: 'bold' }),
    small(280, 244, 'Schematic, not to scale.', {}),
  ].join(''),
);

// ------------------------------------------------------------------ 3. Rutherford scattering
const foil = { x: 315, w: 30, top: 40, bot: 300 };
const nucleiYs = [...Array(11)].map((_, i) => 52 + 25 * i); // 52 .. 302
const nuclei = [];
for (const x of [323, 330, 337]) for (const y of nucleiYs.slice(0, 10)) nuclei.push([x, y]);
const straight = [140, 190, 240];
const smallDef = { y0: 90, deg: 8 };
const smallEnd = [560, smallDef.y0 - (560 - 345) * Math.tan((smallDef.deg * Math.PI) / 180)];
const bounce = { y0: 283, pts: [[300, 283], [300, 308], [130, 332]] };
const closest = (y) => Math.min(...nucleiYs.slice(0, 10).map((ny) => Math.abs(ny - y)));
chk(straight.every((y) => closest(y) >= 10) && closest(smallDef.y0) >= 10, 'Rutherford scattering: straight and slightly deflected paths run between nuclei (at least 10 units clear)');
const bAng = (Math.atan2(bounce.pts[2][1] - bounce.pts[1][1], bounce.pts[2][0] - bounce.pts[1][0]) * 180) / Math.PI;
chk(bAng > 90 && smallDef.deg < 10 && bounce.pts[2][0] < bounce.pts[0][0], `Rutherford scattering: the rebounding particle turns back by about ${bAng.toFixed(0)} degrees, the small deflection is ${smallDef.deg} degrees`);
chk(closest(bounce.y0) < 12, 'Rutherford scattering: the particle that rebounds passes close to a nucleus');
const sx = 65;
const stray = (y) => S.line(sx, y, 560, y, { c: BLUE, w: 2 }) + S.midHead(sx, y, 560, y, { c: BLUE, size: 8, at: 0.25 }) + S.head(560, y, 0, { c: BLUE, size: 8 });
export const RUTHERFORD = svgDoc(
  720,
  356,
  'Rutherford alpha-particle scattering. Alpha particles from a source on the left strike a thin gold foil. Most go straight through, a few are deflected through small angles, and very few, roughly one in many thousands, bounce back. The gold atoms are therefore mostly empty space with a tiny, dense, positive nucleus.',
  [
    S.rect(15, 80, 45, 215, { fill: MUTED, fop: 0.25, c: MUTED }),
    lab(37, 183, 'alpha', { a: 'middle' }),
    lab(37, 197, 'source', { a: 'middle' }),
    S.rect(foil.x, foil.top, foil.w, foil.bot - foil.top, { fill: 'var(--diagram-yellow)', fop: 0.25, c: 'var(--diagram-yellow)' }),
    lab(330, 28, 'thin gold foil', { a: 'middle', w: 'bold' }),
    ...nuclei.map(([x, y]) => S.circle(x, y, 2.5, { fill: RED, fop: 0.8, c: RED, sw: 0.5 })),
    ...straight.map(stray),
    S.line(sx, smallDef.y0, 345, smallDef.y0, { c: BLUE, w: 2 }),
    S.line(345, smallDef.y0, smallEnd[0], smallEnd[1], { c: BLUE, w: 2 }),
    S.midHead(sx, smallDef.y0, 345, smallDef.y0, { c: BLUE, size: 8, at: 0.25 }),
    S.head(smallEnd[0], smallEnd[1], (-smallDef.deg * Math.PI) / 180, { c: BLUE, size: 8 }),
    S.line(sx, bounce.y0, bounce.pts[0][0], bounce.y0, { c: BLUE, w: 2 }),
    S.midHead(sx, bounce.y0, bounce.pts[0][0], bounce.y0, { c: BLUE, size: 8, at: 0.25 }),
    S.path(`M${bounce.pts[0][0]} ${bounce.y0} Q${bounce.pts[0][0] + 22} ${bounce.y0} ${bounce.pts[1][0]} ${bounce.pts[1][1]}`, { c: BLUE, w: 2 }),
    S.line(bounce.pts[1][0], bounce.pts[1][1], bounce.pts[2][0], bounce.pts[2][1], { c: BLUE, w: 2 }),
    S.head(bounce.pts[2][0], bounce.pts[2][1], Math.atan2(bounce.pts[2][1] - bounce.pts[1][1], bounce.pts[2][0] - bounce.pts[1][0]), { c: BLUE, size: 8 }),
    lab(570, 144, 'most go straight through', {}),
    lab(570, 58, 'a few: small deflection', {}),
    lab(30, 350, 'very few (one in many thousands) bounce back', {}),
    S.circle(440, 304, 3.5, { fill: RED, fop: 0.8, c: RED, sw: 0.5 }),
    small(450, 308, 'gold nucleus (+)', {}),
    S.arrow(425, 326, 438, 326, { c: BLUE, w: 2, size: 7 }),
    small(450, 330, 'alpha particle (2+)', {}),
    small(715, 350, 'Schematic: nuclei are far smaller and further apart than drawn.', { a: 'end' }),
  ].join(''),
);

// ------------------------------------------------------------------ 4. Bohr shells with jumps
const bo = { cx: 160, cy: 150, radii: [30, 58, 86] };
chk(bo.radii.every((rr, i) => i === 0 || rr > bo.radii[i - 1]) && bo.radii.length === 3, 'Bohr model: shells K, L and M have increasing radii');
const polar = (rr, deg) => [bo.cx + rr * Math.cos((deg * Math.PI) / 180), bo.cy + rr * Math.sin((deg * Math.PI) / 180)];
const up = [polar(bo.radii[1], -55), polar(bo.radii[2], -55)];
const down = [polar(bo.radii[2], 35), polar(bo.radii[1], 35)];
chk(near(dist2(up[0], [bo.cx, bo.cy]), 58, 1e-9) && near(dist2(up[1], [bo.cx, bo.cy]), 86, 1e-9) && near(dist2(down[0], [bo.cx, bo.cy]), 86, 1e-9) && near(dist2(down[1], [bo.cx, bo.cy]), 58, 1e-9), 'Bohr model: the jump arrows start and end exactly on the L and M shells');
const elec = (p, ghost) => S.circle(p[0], p[1], 6, ghost ? { c: BLUE, sw: 1.2, dash: '3 2' } : { fill: BLUE, fop: 0.6, c: BLUE, sw: 1.2 });
export const BOHR = svgDoc(
  560,
  300,
  'Bohr model. Electrons move in fixed circular paths called shells, K, L and M, around a small central nucleus with n equal to 1, 2 and 3. An electron does not radiate energy while it stays in one shell. It absorbs energy when it jumps to a higher shell and gives out energy when it falls to a lower shell.',
  [
    ...bo.radii.map((rr) => S.circle(bo.cx, bo.cy, rr, { c: MUTED, sw: 1.5 })),
    S.circle(bo.cx, bo.cy, 9, { fill: RED, fop: 0.6, c: RED }),
    S.text(bo.cx, bo.cy + 4, '+', { a: 'middle', size: 12, w: 'bold' }),
    lab(bo.cx + 3, bo.cy - bo.radii[0] + 12, 'K', { c: 'currentColor', w: 'bold' }),
    lab(bo.cx + 3, bo.cy - bo.radii[1] + 12, 'L', { w: 'bold' }),
    lab(bo.cx + 3, bo.cy - bo.radii[2] + 12, 'M', { w: 'bold' }),
    elec(up[0], false),
    elec(up[1], true),
    S.arrow(up[0][0] + 2, up[0][1] - 4, up[1][0] - 1, up[1][1] + 6, { c: RED, w: 2, size: 8 }),
    elec(down[0], false),
    elec(down[1], true),
    S.arrow(down[0][0] - 3, down[0][1] - 5, down[1][0] + 2, down[1][1] + 6, { c: BLUE, w: 2, size: 8 }),
    lab(330, 44, 'Centre (+): the nucleus,', { w: 'bold' }),
    lab(330, 58, 'with protons and neutrons', { w: 'bold' }),
    lab(330, 92, 'Shells (orbits): n = 1 (K), 2 (L), 3 (M)', { w: 'bold' }),
    lab(330, 108, 'Electrons stay in a shell without', {}),
    lab(330, 122, 'radiating energy.', {}),
    lab(330, 164, 'Jump up (red arrow): energy absorbed', { c: RED, w: 'bold' }),
    lab(330, 190, 'Fall down (blue arrow): energy emitted', { c: BLUE, w: 'bold' }),
    lab(330, 232, 'Solid dot: electron before the jump.', {}),
    lab(330, 246, 'Dashed circle: where it lands.', {}),
    small(330, 288, 'Schematic, not to scale.', {}),
  ].join(''),
);

// ------------------------------------------------------------------ 5. shell diagrams computed from the distribution
function atomPanel(cx, cy, z) {
  const sym = bySym(['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca'][z - 1]);
  const d = shells(z);
  const parts = [];
  let drawn = 0;
  const radii = d.map((_, i) => 19 + 13 * i);
  chk(d.reduce((s, x) => s + x, 0) === z, `shell diagram: ${sym.name} (Z = ${z}) is drawn with ${dist(z)} electrons, which sum to ${z}`);
  d.forEach((k, i) => {
    parts.push(S.circle(cx, cy, radii[i], { c: MUTED, sw: 1.2 }));
    for (let j = 0; j < k; j++) {
      const ang = (2 * Math.PI * j) / k - Math.PI / 2 + i * 0.35;
      parts.push(S.circle(cx + radii[i] * Math.cos(ang), cy + radii[i] * Math.sin(ang), 3.2, { fill: BLUE, fop: 0.75, c: BLUE, sw: 0.8 }));
      drawn++;
    }
  });
  chk(drawn === z, `shell diagram: ${sym.name} shows ${drawn} electron dots for atomic number ${z}`);
  parts.push(S.circle(cx, cy, 11, { fill: RED, fop: 0.6, c: RED, sw: 1 }));
  parts.push(S.text(cx, cy + 3.5, `${z}+`, { a: 'middle', size: 10, w: 'bold' }));
  parts.push(lab(cx, cy + 74, `${sym.name} (${sym.sym})`, { a: 'middle', w: 'bold' }));
  parts.push(small(cx, cy + 90, `Z = ${z}, ${dist(z).replace(/, /g, ',')}`, { a: 'middle' }));
  parts.push(small(cx, cy + 105, `valency ${valency(z)}`, { a: 'middle' }));
  return parts.join('');
}
const panel = (zs, label) => svgDoc(640, 230, label, [...zs.map((z, i) => atomPanel(80 + i * 160, 70, z)), small(630, 224, 'Schematic, not to scale.', { a: 'end' })].join(''));
export const SHELLS_A = panel([3, 6, 8, 10], 'Electron shell diagrams. Lithium, atomic number 3, has 2 and 1 electrons in its K and L shells, valency 1. Carbon, atomic number 6, has 2 and 4, valency 4. Oxygen, atomic number 8, has 2 and 6, valency 2. Neon, atomic number 10, has 2 and 8, a full outer shell, valency 0.');
export const SHELLS_B = panel([11, 13, 17, 20], 'Electron shell diagrams. Sodium, atomic number 11, has 2, 8 and 1 electrons in its K, L and M shells, valency 1. Aluminium, atomic number 13, has 2, 8, 3, valency 3. Chlorine, atomic number 17, has 2, 8, 7, valency 1. Calcium, atomic number 20, has 2, 8, 8, 2 in the K, L, M and N shells, valency 2.');
chk(dist(11) === '2, 8, 1' && dist(17) === '2, 8, 7' && dist(20) === '2, 8, 8, 2' && valency(17) === 1 && valency(20) === 2 && valency(10) === 0, 'shell diagrams: Na 2,8,1; Cl 2,8,7 (valency 1); Ca 2,8,8,2 (valency 2); Ne valency 0 computed by the rules');

// ------------------------------------------------------------------ 6. isotopes of hydrogen
const iso = [
  { name: 'Hydrogen-1', alt: 'protium', a: 1, cx: 110 },
  { name: 'Hydrogen-2', alt: 'deuterium', a: 2, cx: 320 },
  { name: 'Hydrogen-3', alt: 'tritium', a: 3, cx: 530 },
];
const nucleonPos = (n, cx, cy) => (n === 1 ? [[cx, cy]] : [...Array(n)].map((_, i) => [cx + 6.2 * Math.cos((2 * Math.PI * i) / n - Math.PI / 2 + (n === 2 ? Math.PI / 2 : 0)), cy + 6.2 * Math.sin((2 * Math.PI * i) / n - Math.PI / 2 + (n === 2 ? Math.PI / 2 : 0))]));
export const ISOTOPES = svgDoc(
  640,
  280,
  'Three isotopes of hydrogen. Hydrogen-1 has 1 proton, 0 neutrons and 1 electron. Hydrogen-2, deuterium, has 1 proton, 1 neutron and 1 electron. Hydrogen-3, tritium, has 1 proton, 2 neutrons and 1 electron. All have atomic number 1 and differ only in the number of neutrons, so their mass numbers are 1, 2 and 3.',
  [
    ...iso.flatMap((t) => {
      const c = count(1, t.a);
      const pos = nucleonPos(t.a, t.cx, 85);
      chk(c.p === 1 && c.e === 1 && c.n === t.a - 1 && pos.length === c.p + c.n, `isotope diagram: ${t.name} is drawn with ${c.p} proton, ${c.n} neutrons (${pos.length} nucleons) and ${c.e} electron`);
      chk(pos.every((p, i) => pos.every((q, j) => i === j || dist2(p, q) >= 9.9)), `isotope diagram: nucleons in ${t.name} do not overlap`);
      const ep = [t.cx + 40 * Math.cos(-0.7), 85 + 40 * Math.sin(-0.7)];
      return [
        S.circle(t.cx, 85, 40, { c: MUTED, sw: 1.2 }),
        S.circle(ep[0], ep[1], 4, { fill: BLUE, fop: 0.75, c: BLUE, sw: 0.8 }),
        ...pos.map(([x, y], i) => S.circle(x, y, 5, i === 0 ? { fill: RED, fop: 0.6, c: RED, sw: 1 } : { fill: MUTED, fop: 0.5, c: MUTED, sw: 1 })),
        lab(t.cx, 150, `${t.name} (${t.alt})`, { a: 'middle', w: 'bold' }),
        lab(t.cx, 168, `${c.p} proton, ${c.n} ${c.n === 1 ? 'neutron' : 'neutrons'}, ${c.e} electron`, { a: 'middle' }),
        lab(t.cx, 186, `Z = 1, A = ${t.a}`, { a: 'middle' }),
      ];
    }),
    S.rect(60, 204, 520, 34, { fill: 'var(--diagram-green)', fop: 0.18, c: 'var(--diagram-green)', rx: 6 }),
    lab(320, 225, 'Same atomic number, different mass numbers: only the neutrons differ.', { a: 'middle', w: 'bold' }),
    S.circle(180, 262, 5, { fill: RED, fop: 0.6, c: RED, sw: 1 }),
    small(190, 266, 'proton', {}),
    S.circle(260, 262, 5, { fill: MUTED, fop: 0.5, c: MUTED, sw: 1 }),
    small(270, 266, 'neutron', {}),
    S.circle(350, 262, 4, { fill: BLUE, fop: 0.75, c: BLUE, sw: 0.8 }),
    small(360, 266, 'electron', {}),
    small(630, 274, 'Schematic, not to scale.', { a: 'end' }),
  ].join(''),
);
