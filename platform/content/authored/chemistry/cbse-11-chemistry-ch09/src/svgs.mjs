// Hand-drawn SVG schematics for ch09 Hydrocarbons (allow-listed elements, palette colours only).
// Geometry (Newman projections, the torsional energy curve, hexagons, curly arrows) is computed here.
import { svgDoc, S } from './lib.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const rad = (d) => (d * Math.PI) / 180;
function atom(x, y, label, fill = 'var(--diagram-fill)', r = 8, size = 10) {
  return S.circle(x, y, r, { fill }) + S.text(x, y + 3.5, label, { a: 'middle', size });
}
/** Curly arrow: a quadratic curve from (x1, y1) through control (cx, cy) to (x2, y2), with a head. */
function curly(x1, y1, cx, cy, x2, y2, { c = 'var(--diagram-red)', w = 1.8, size = 7 } = {}) {
  const ang = Math.atan2(y2 - cy, x2 - cx);
  const bx = x2 - size * 0.8 * Math.cos(ang);
  const by = y2 - size * 0.8 * Math.sin(ang);
  return S.path(`M${x1} ${y1} Q${cx} ${cy} ${bx.toFixed(1)} ${by.toFixed(1)}`, { c, w }) + S.head(x2, y2, ang, { size, c });
}
const minDist = (pts) => {
  let m = Infinity;
  for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) m = Math.min(m, Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1]));
  return m;
};

// ------------------------------------------------------------------ 1. Newman projections and sawhorse
const FRONT = [-90, 30, 150];
function newman(cx, cy, backAngles, atoms) {
  const out = [S.circle(cx, cy, 28, { sw: 2 })];
  for (const a of FRONT) {
    const x = cx + 52 * Math.cos(rad(a));
    const y = cy + 52 * Math.sin(rad(a));
    out.push(S.line(cx, cy, cx + 44 * Math.cos(rad(a)), cy + 44 * Math.sin(rad(a)), { w: 2 }), atom(x, y, 'H', 'var(--diagram-blue)'));
    atoms.push([x, y]);
  }
  for (const a of backAngles) {
    const x = cx + 52 * Math.cos(rad(a));
    const y = cy + 52 * Math.sin(rad(a));
    out.push(S.line(cx + 28 * Math.cos(rad(a)), cy + 28 * Math.sin(rad(a)), cx + 44 * Math.cos(rad(a)), cy + 44 * Math.sin(rad(a)), { w: 2 }), atom(x, y, 'H', 'var(--diagram-green)'));
    atoms.push([x, y]);
  }
  return out.join('');
}
function sawhorse(x, y, backAngles, atoms) {
  const out = [];
  const bd = rad(-60);
  const bx = x + 46 * Math.cos(bd);
  const by = y + 46 * Math.sin(bd);
  out.push(S.line(x, y, bx, by, { w: 3 }), lab(x - 12, y + 4, 'C', { size: 10, w: 'bold' }), lab(bx + 6, by - 4, 'C', { size: 10, w: 'bold' }));
  for (const a of [100, 220, 340]) {
    const px = x + 26 * Math.cos(rad(a));
    const py = y + 26 * Math.sin(rad(a));
    out.push(S.line(x, y, px, py, { w: 1.8 }), atom(px, py, 'H', 'var(--diagram-blue)', 7));
    atoms.push([px, py]);
  }
  for (const a of backAngles) {
    const px = bx + 24 * Math.cos(rad(a));
    const py = by + 24 * Math.sin(rad(a));
    out.push(S.line(bx, by, px, py, { w: 1.8 }), atom(px, py, 'H', 'var(--diagram-green)', 7));
    atoms.push([px, py]);
  }
  return out.join('');
}
export const NEWMAN = (() => {
  const A1 = [];
  const A2 = [];
  const A3 = [];
  const stag = [90, 210, 330];
  const ecl = FRONT.map((a) => a + 24); // back bonds drawn 24 degrees off the front ones so that they can be seen
  const body = [
    newman(90, 105, stag, A1),
    newman(260, 105, ecl, A2),
    sawhorse(395, 150, [150, 270, 30].map((a) => a), A3),
    lab(90, 20, 'Staggered (Newman)', { a: 'middle', w: 'bold' }),
    lab(260, 20, 'Eclipsed (Newman)', { a: 'middle', w: 'bold' }),
    lab(430, 20, 'Staggered (sawhorse)', { a: 'middle', w: 'bold' }),
    lab(90, 188, 'dihedral angle 60°', { a: 'middle', size: 10 }),
    lab(260, 188, 'dihedral angle 0° (drawn slightly turned)', { a: 'middle', size: 10 }),
    lab(90, 204, 'lowest energy', { a: 'middle', size: 10, c: 'var(--diagram-green)' }),
    lab(260, 204, '12.5 kJ mol⁻¹ above staggered', { a: 'middle', size: 10, c: 'var(--diagram-red)' }),
    lab(430, 192, 'blue H on front C,', { a: 'middle', size: 10 }),
    lab(430, 206, 'green H on back C', { a: 'middle', size: 10 }),
  ].join('');
  chk(minDist(A1) > 16, `staggered Newman: nearest atoms ${minDist(A1).toFixed(1)} px apart`);
  chk(minDist(A2) > 16, `eclipsed Newman: nearest atoms ${minDist(A2).toFixed(1)} px apart`);
  chk(minDist(A3) > 12, `sawhorse: nearest atoms ${minDist(A3).toFixed(1)} px apart`);
  // staggered: every back bond lies exactly midway between two front bonds (60 degrees)
  const dih = [90, 210, 330].map((b) => Math.min(...FRONT.map((f) => { const d = Math.abs(b - f) % 360; return Math.min(d, 360 - d); })));
  chk(dih.every((d) => Math.abs(d - 60) < 1e-9), `staggered nearest dihedral angles ${dih.join(', ')} degrees`);
  return svgDoc(
    540,
    215,
    'Conformations of ethane. Left: Newman projection of the staggered conformation, in which each hydrogen of the back carbon lies midway between two hydrogens of the front carbon, dihedral angle 60 degrees, the lowest energy. Centre: the eclipsed conformation, with back hydrogens directly behind the front ones (drawn slightly turned so that they can be seen), dihedral angle 0 degrees and an energy 12.5 kilojoules per mole higher. Right: the staggered conformation as a sawhorse projection.',
    body,
  );
})();

// ------------------------------------------------------------------ 2. Energy against dihedral angle
const E = (theta) => 6.25 * (1 + Math.cos(rad(3 * theta))); // theta = 0 is eclipsed
export const ENERGY = (() => {
  const x0 = 70;
  const x1 = 430;
  const yb = 190;
  const yt = 38;
  const X = (t) => x0 + ((x1 - x0) * t) / 360;
  const Y = (e) => yb - ((yb - yt) * e) / 14;
  const pts = [];
  let emax = -1;
  let emin = 99;
  for (let t = 0; t <= 360; t += 3) {
    const e = E(t);
    emax = Math.max(emax, e);
    emin = Math.min(emin, e);
    pts.push(`${t === 0 ? 'M' : 'L'}${X(t).toFixed(1)} ${Y(e).toFixed(1)}`);
  }
  chk(Math.abs(emax - 12.5) < 1e-9, `maximum of the torsional curve is ${emax.toFixed(2)} kJ/mol`);
  chk(Math.abs(emin) < 1e-9, `minimum of the torsional curve is ${emin.toFixed(2)} kJ/mol`);
  chk([0, 120, 240, 360].every((t) => Math.abs(E(t) - 12.5) < 1e-9) && [60, 180, 300].every((t) => Math.abs(E(t)) < 1e-9), 'maxima at 0, 120, 240, 360 degrees; minima at 60, 180, 300 degrees');
  const body = [
    S.line(x0, yb, x1 + 6, yb),
    S.line(x0, yb, x0, yt - 8),
    S.line(x0 - 4, Y(12.5), x1, Y(12.5), { c: 'var(--diagram-muted)', w: 1, dash: '5 4' }),
    lab(x0 - 8, Y(12.5) + 4, '12.5', { a: 'end', size: 10 }),
    lab(x0 - 8, yb + 4, '0', { a: 'end', size: 10 }),
    lab(26, 112, 'Energy / kJ mol⁻¹', { size: 10, a: 'middle' }).replace('<text', `<text transform="rotate(-90 26 112)"`),
    S.path(pts.join(' '), { c: 'var(--diagram-accent)', w: 2.5 }),
    ...[0, 60, 120, 180, 240, 300, 360].flatMap((t) => [S.line(X(t), yb, X(t), yb + 5), lab(X(t), yb + 18, `${t}°`, { a: 'middle', size: 10 })]),
    ...[0, 120, 240, 360].map((t) => S.circle(X(t), Y(12.5), 4.5, { fill: 'var(--diagram-red)', c: 'var(--diagram-red)' })),
    ...[60, 180, 300].map((t) => S.circle(X(t), Y(0), 4.5, { fill: 'var(--diagram-green)', c: 'var(--diagram-green)' })),
    lab(X(120), Y(12.5) - 8, 'eclipsed', { a: 'middle', size: 10, c: 'var(--diagram-red)' }),
    lab(X(240), Y(12.5) - 8, 'eclipsed', { a: 'middle', size: 10, c: 'var(--diagram-red)' }),
    lab(X(180), yb + 34, 'staggered', { a: 'middle', size: 10, c: 'var(--diagram-green)' }),
    lab(X(60), yb + 34, 'staggered', { a: 'middle', size: 10, c: 'var(--diagram-green)' }),
    lab(X(300), yb + 34, 'staggered', { a: 'middle', size: 10, c: 'var(--diagram-green)' }),
    lab((x0 + x1) / 2, yb + 52, 'Dihedral angle H–C–C–H (rotation about the C–C bond)', { a: 'middle', size: 10 }),
    lab(X(0) + 8, Y(12.5) - 8, 'barrier = 12.5', { size: 10 }),
  ].join('');
  return svgDoc(
    460,
    262,
    'Potential energy of ethane against the dihedral angle for rotation about the carbon-carbon bond. The curve repeats every 120 degrees. Eclipsed conformations at 0, 120, 240 and 360 degrees are energy maxima, 12.5 kilojoules per mole above the staggered conformations at 60, 180 and 300 degrees, which are the minima.',
    body,
  );
})();

// ------------------------------------------------------------------ 3. Geometric isomers
export const CISTRANS = (() => {
  function alkene(cx, cy, ul, dl, ur, dr, title) {
    const xl = cx - 30;
    const xr = cx + 30;
    const lbl = (x, y, s) => (s === 'CH₃' ? atom(x, y, s, 'var(--diagram-yellow)', 15, 10) : atom(x, y, s, 'var(--diagram-fill)', 10, 10));
    return [
      S.line(xl, cy - 2.5, xr, cy - 2.5, { w: 2 }),
      S.line(xl, cy + 2.5, xr, cy + 2.5, { w: 2 }),
      S.line(xl, cy, xl - 26, cy - 34),
      S.line(xl, cy, xl - 26, cy + 34),
      S.line(xr, cy, xr + 26, cy - 34),
      S.line(xr, cy, xr + 26, cy + 34),
      lbl(xl - 30, cy - 40, ul),
      lbl(xl - 30, cy + 40, dl),
      lbl(xr + 30, cy - 40, ur),
      lbl(xr + 30, cy + 40, dr),
      lab(cx, cy - 78, title, { a: 'middle', w: 'bold' }),
    ].join('');
  }
  const body = [
    alkene(120, 100, 'CH₃', 'H', 'CH₃', 'H', 'cis-but-2-ene'),
    alkene(340, 100, 'CH₃', 'H', 'H', 'CH₃', 'trans-but-2-ene'),
    lab(120, 176, 'both CH₃ on the same side', { a: 'middle', size: 10 }),
    lab(340, 176, 'CH₃ groups on opposite sides', { a: 'middle', size: 10 }),
    lab(120, 192, 'bp 277 K, mp 134 K, polar', { a: 'middle', size: 10, c: 'var(--diagram-red)' }),
    lab(340, 192, 'bp 274 K, mp 168 K, non-polar', { a: 'middle', size: 10, c: 'var(--diagram-blue)' }),
  ].join('');
  return svgDoc(
    460,
    205,
    'Geometric isomers of but-2-ene drawn as planar molecules. In cis-but-2-ene both methyl groups are on the same side of the double bond; in trans-but-2-ene they are on opposite sides. The cis isomer boils slightly higher because it is polar; the trans isomer melts much higher because its symmetrical molecules pack better.',
    body,
  );
})();

// ------------------------------------------------------------------ 4. Markovnikov mechanism with curly arrows
export const MARKOV_MECH = (() => {
  const dbl = (x1, y1, x2, y2) => {
    const dx = y2 - y1;
    const dy = x1 - x2;
    const n = Math.hypot(dx, dy);
    const ox = (dx / n) * 2.5;
    const oy = (dy / n) * 2.5;
    return S.line(x1 + ox, y1 + oy, x2 + ox, y2 + oy, { w: 2 }) + S.line(x1 - ox, y1 - oy, x2 - ox, y2 - oy, { w: 2 });
  };
  const body = [
    lab(14, 18, 'Step 1 (slow): the π bond attacks H⁺ of HBr; the more stable 2° carbocation forms', { w: 'bold', size: 11 }),
    // propene
    S.line(30, 118, 66, 98, { w: 2 }),
    dbl(66, 98, 102, 118),
    lab(30, 138, 'CH₃', { a: 'middle', size: 10 }),
    lab(66, 90, 'CH', { a: 'middle', size: 10 }),
    lab(110, 138, 'CH₂', { a: 'middle', size: 10 }),
    lab(180, 110, '+', { a: 'middle', size: 14 }),
    // HBr
    S.line(230, 96, 262, 80, { w: 2 }),
    lab(222, 106, 'H', { a: 'middle', size: 11, w: 'bold' }),
    lab(276, 78, 'Br', { a: 'middle', size: 11, w: 'bold', c: 'var(--diagram-green)' }),
    curly(86, 108, 130, 70, 217, 98),
    curly(246, 85, 262, 56, 276, 66),
    S.arrow(310, 100, 350, 100, { size: 7, w: 2 }),
    // carbocation
    S.line(380, 118, 410, 100, { w: 2 }),
    S.line(410, 100, 440, 118, { w: 2 }),
    lab(380, 138, 'CH₃', { a: 'middle', size: 10 }),
    lab(440, 138, 'CH₃', { a: 'middle', size: 10 }),
    lab(410, 90, 'C', { a: 'middle', size: 10 }),
    lab(422, 80, '+', { a: 'middle', size: 13, w: 'bold', c: 'var(--diagram-red)' }),
    lab(476, 100, '+', { a: 'middle', size: 14 }),
    lab(512, 104, 'Br⁻', { a: 'middle', size: 11, w: 'bold', c: 'var(--diagram-green)' }),
    lab(410, 158, 'secondary carbocation', { a: 'middle', size: 10, c: 'var(--diagram-red)' }),
    // step 2
    lab(14, 188, 'Step 2 (fast): bromide attacks the carbocation with its lone pair', { w: 'bold', size: 11 }),
    S.line(40, 262, 70, 244, { w: 2 }),
    S.line(70, 244, 100, 262, { w: 2 }),
    lab(40, 282, 'CH₃', { a: 'middle', size: 10 }),
    lab(100, 282, 'CH₃', { a: 'middle', size: 10 }),
    lab(70, 236, 'C', { a: 'middle', size: 10 }),
    lab(82, 226, '+', { a: 'middle', size: 13, w: 'bold', c: 'var(--diagram-red)' }),
    lab(170, 222, 'Br⁻', { a: 'middle', size: 11, w: 'bold', c: 'var(--diagram-green)' }),
    curly(156, 218, 120, 200, 80, 228, { c: 'var(--diagram-blue)' }),
    S.arrow(210, 250, 270, 250, { size: 7, w: 2 }),
    // product
    S.line(310, 262, 340, 244, { w: 2 }),
    S.line(340, 244, 370, 262, { w: 2 }),
    S.line(340, 244, 340, 218, { w: 2 }),
    lab(310, 282, 'CH₃', { a: 'middle', size: 10 }),
    lab(370, 282, 'CH₃', { a: 'middle', size: 10 }),
    lab(340, 236, 'CH', { a: 'middle', size: 10 }).replace('x="340"', 'x="353"'),
    lab(340, 210, 'Br', { a: 'middle', size: 11, w: 'bold', c: 'var(--diagram-green)' }),
    lab(340, 308, '2-bromopropane (Markovnikov product)', { a: 'middle', size: 10 }),
    lab(520, 232, 'Rule: H adds to the', { a: 'end', size: 10 }),
    lab(520, 246, 'carbon with more H;', { a: 'end', size: 10 }),
    lab(520, 260, 'Br goes to the carbon', { a: 'end', size: 10 }),
    lab(520, 274, 'with fewer H.', { a: 'end', size: 10 }),
  ].join('');
  return svgDoc(
    540,
    322,
    'Mechanism of the addition of HBr to propene with curly arrows. Step 1: the pi electrons of the double bond attack the hydrogen of HBr while the H–Br bond breaks and the electrons go to bromine, giving a secondary carbocation and a bromide ion. Step 2: a lone pair of the bromide ion attacks the positively charged carbon to give 2-bromopropane, the Markovnikov product.',
    body,
  );
})();

// ------------------------------------------------------------------ 5. Energy profile: 2° versus 1° carbocation
export const MARKOV_ENERGY = (() => {
  // schematic energies (arbitrary units): [reactants, TS1, carbocation, TS2, product]
  const sec = [40, 96, 70, 82, 8];
  const pri = [40, 130, 112, 124, 12];
  chk(sec[1] < pri[1] && sec[2] < pri[2], 'secondary-carbocation path has the lower transition state and intermediate (schematic energies)');
  const xs = [60, 150, 230, 310, 400];
  const Y = (e) => 210 - e * 1.35;
  const smooth = (en) => {
    const p = en.map((e, i) => [xs[i], Y(e)]);
    let d = `M${p[0][0]} ${p[0][1]} L${p[0][0] + 20} ${p[0][1]}`;
    for (let i = 1; i < p.length; i++) {
      const [x0, y0] = p[i - 1];
      const [x1, y1] = p[i];
      const mx = (x0 + x1) / 2;
      d += ` C${mx + (i === 1 ? 10 : 0)} ${y0} ${mx} ${y1} ${x1} ${y1}`;
    }
    return d + ` L${p[4][0] + 30} ${p[4][1]}`;
  };
  const body = [
    S.line(40, 220, 40, 30),
    S.line(40, 220, 450, 220),
    lab(34, 28, 'Energy', { a: 'end', size: 10 }),
    lab(445, 238, 'Reaction coordinate', { a: 'end', size: 10 }),
    S.path(smooth(pri), { c: 'var(--diagram-red)', w: 2, dash: '6 4' }),
    S.path(smooth(sec), { c: 'var(--diagram-blue)', w: 3 }),
    lab(150, Y(96) - 7, 'TS1 (2° path)', { a: 'middle', size: 10, c: 'var(--diagram-blue)' }),
    lab(150, Y(130) - 7, 'TS1 (1° path)', { a: 'middle', size: 10, c: 'var(--diagram-red)' }),
    lab(230, Y(70) + 16, '2° carbocation', { a: 'middle', size: 10, c: 'var(--diagram-blue)' }),
    lab(230, Y(112) - 6, '1° carbocation', { a: 'middle', size: 10, c: 'var(--diagram-red)' }),
    lab(90, Y(40) + 14, 'propene + HBr', { a: 'middle', size: 10 }),
    lab(430, Y(8) - 8, 'alkyl bromide', { a: 'middle', size: 10 }),
    S.line(150, Y(130), 150, Y(96), { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }),
    lab(60, 262, 'Lower TS1: the 2° route is faster,', { size: 10 }),
    lab(60, 276, 'so the Markovnikov product dominates.', { size: 10 }),
    lab(60, 290, 'Schematic energies, not to scale.', { size: 10, c: 'var(--diagram-muted)' }),
  ].join('');
  return svgDoc(
    470,
    298,
    'Schematic energy profile for the addition of HBr to propene by two routes. The route through the secondary carbocation (solid) has a lower first transition state and a lower intermediate than the route through the primary carbocation (dashed), so it is faster and gives the Markovnikov product 2-bromopropane.',
    body,
  );
})();

// ------------------------------------------------------------------ 6. Benzene: Kekulé structures and hybrid
function ring(cx, cy, R, doubles) {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const a = rad(60 * i - 90);
    pts.push([cx + R * Math.cos(a), cy + R * Math.sin(a)]);
  }
  const out = [];
  for (let i = 0; i < 6; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % 6];
    out.push(S.line(x1, y1, x2, y2, { w: 2 }));
    if (doubles.includes(i)) {
      const mx = cx + ((x1 + x2) / 2 - cx) * 0.8;
      const my = cy + ((y1 + y2) / 2 - cy) * 0.8;
      const dx = (x2 - x1) * 0.3;
      const dy = (y2 - y1) * 0.3;
      out.push(S.line(mx - dx, my - dy, mx + dx, my + dy, { w: 2 }));
    }
  }
  return { svg: out.join(''), pts };
}
export const KEKULE = (() => {
  const a = ring(80, 90, 34, [0, 2, 4]);
  const b = ring(250, 90, 34, [1, 3, 5]);
  const h = ring(420, 90, 34, []);
  chk(Math.abs(Math.hypot(a.pts[0][0] - a.pts[1][0], a.pts[0][1] - a.pts[1][1]) - 34) < 1e-9, 'regular hexagon: side equals circumradius');
  const body = [
    a.svg,
    b.svg,
    h.svg,
    S.circle(420, 90, 20, { c: 'var(--diagram-accent)', sw: 2.5 }),
    S.arrow(130, 90, 200, 90, { size: 7 }),
    S.arrow(200, 90, 130, 90, { size: 7 }),
    S.arrow(300, 90, 360, 90, { size: 7, w: 2, c: 'var(--diagram-accent)' }),
    lab(80, 150, 'Kekulé structure I', { a: 'middle', size: 10 }),
    lab(250, 150, 'Kekulé structure II', { a: 'middle', size: 10 }),
    lab(420, 150, 'Resonance hybrid', { a: 'middle', size: 10, w: 'bold' }),
    lab(165, 70, 'resonance', { a: 'middle', size: 10 }),
    lab(330, 80, 'real', { a: 'middle', size: 10 }),
    lab(420, 22, 'all six C–C bonds', { a: 'middle', size: 10 }),
    lab(420, 36, 'equal: 139 pm', { a: 'middle', size: 10, c: 'var(--diagram-accent)' }),
    lab(80, 170, 'C–C 154 pm and C=C 134 pm alternate: never found', { a: 'start', size: 10, c: 'var(--diagram-muted)' }),
  ].join('');
  return svgDoc(
    500,
    185,
    'Two Kekulé structures of benzene with double-headed resonance arrows between them, and the resonance hybrid drawn as a hexagon with a circle inside. The hybrid has six identical carbon-carbon bonds of 139 picometres, between a single bond of 154 and a double bond of 134 picometres.',
    body,
  );
})();

// ------------------------------------------------------------------ 7. pi cloud of benzene
export const PICLOUD = (() => {
  const body = [];
  // left: edge-on view, six p orbitals
  const xs = [0, 1, 2, 3, 4, 5].map((i) => 38 + i * 36);
  for (const x of xs) {
    body.push(S.ellipse(x, 62, 11, 24, { c: 'var(--diagram-blue)', fill: 'var(--diagram-blue)', fop: 0.25 }));
    body.push(S.ellipse(x, 118, 11, 24, { c: 'var(--diagram-blue)', fill: 'var(--diagram-blue)', fop: 0.25 }));
    body.push(S.circle(x, 90, 4, { fill: 'currentColor' }));
  }
  body.push(S.line(34, 90, 222, 90, { w: 1.5 }));
  body.push(lab(130, 20, 'Six parallel p orbitals', { a: 'middle', w: 'bold' }));
  body.push(lab(130, 34, '(side view of the ring plane)', { a: 'middle', size: 10 }));
  body.push(lab(130, 158, 'sideways overlap of neighbours', { a: 'middle', size: 10 }));
  // right: ring in perspective with two π clouds
  const cx = 390;
  body.push(S.ellipse(cx, 66, 62, 20, { c: 'var(--diagram-blue)', fill: 'var(--diagram-blue)', fop: 0.2, sw: 2 }));
  body.push(S.ellipse(cx, 124, 62, 20, { c: 'var(--diagram-blue)', fill: 'var(--diagram-blue)', fop: 0.2, sw: 2 }));
  const hex = [];
  for (let i = 0; i < 6; i++) {
    const a = rad(60 * i);
    hex.push([cx + 46 * Math.cos(a), 90 + 14 * Math.sin(a)]);
  }
  body.push(S.path(`M${hex.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L')} Z`, { w: 2 }));
  for (const [x, y] of hex) body.push(S.circle(x, y, 3, { fill: 'currentColor' }));
  body.push(lab(cx, 14, 'π cloud (delocalised)', { a: 'middle', w: 'bold' }));
  body.push(lab(cx, 28, 'above the plane', { a: 'middle', size: 10, c: 'var(--diagram-blue)' }));
  body.push(lab(cx, 164, 'below the plane', { a: 'middle', size: 10, c: 'var(--diagram-blue)' }));
  body.push(lab(cx, 94, 'σ framework', { a: 'middle', size: 10 }));
  body.push(lab(cx, 186, 'six π electrons shared by all six carbons', { a: 'middle', size: 10 }));
  return svgDoc(
    480,
    198,
    'Pi bonding in benzene. Left: side view of six parallel p orbitals, one on each carbon, overlapping sideways. Right: the ring in perspective, with the sigma framework in one plane and the delocalised six-electron pi cloud forming a doughnut above and another below the plane.',
    body.join(''),
  );
})();

// ------------------------------------------------------------------ 8. Electrophilic substitution mechanism
export const EAS_MECH = (() => {
  const R = 34;
  const hexPts = (cx, cy) => Array.from({ length: 6 }, (_, i) => [cx + R * Math.cos(rad(60 * i - 90)), cy + R * Math.sin(rad(60 * i - 90))]);
  const hexLines = (pts, skip = []) => pts.map((p, i) => (skip.includes(i) ? '' : S.line(p[0], p[1], pts[(i + 1) % 6][0], pts[(i + 1) % 6][1], { w: 2 }))).join('');
  const c1 = [80, 120];
  const c2 = [290, 120];
  const c3 = [510, 120];
  const p1 = hexPts(...c1);
  const p2 = hexPts(...c2);
  const p3 = hexPts(...c3);
  // arc inside the sigma complex covering the five sp2 carbons (all but the top one)
  const arcR = 17;
  const a0 = rad(-90 + 40);
  const a1 = rad(-90 + 320);
  const arc = S.path(`M${(c2[0] + arcR * Math.cos(a0)).toFixed(1)} ${(c2[1] + arcR * Math.sin(a0)).toFixed(1)} A${arcR} ${arcR} 0 1 1 ${(c2[0] + arcR * Math.cos(a1)).toFixed(1)} ${(c2[1] + arcR * Math.sin(a1)).toFixed(1)}`, { c: 'var(--diagram-accent)', w: 2 });
  const top2 = p2[0];
  const top3 = p3[0];
  const body = [
    lab(14, 18, 'Step 1 (slow): π electrons attack E⁺, giving the arenium ion (σ complex)', { w: 'bold', size: 11 }),
    hexLines(p1),
    S.circle(c1[0], c1[1], 20, { c: 'var(--diagram-accent)', sw: 2 }),
    lab(80, 180, 'benzene', { a: 'middle', size: 10 }),
    lab(160, 110, '+', { a: 'middle', size: 14 }),
    lab(190, 114, 'E⁺', { a: 'middle', size: 12, w: 'bold', c: 'var(--diagram-red)' }),
    curly(c1[0] + 22, c1[1] - 18, 150, 60, 182, 104),
    S.arrow(205, 120, 240, 120, { size: 7, w: 2 }),
    // sigma complex
    hexLines(p2),
    arc,
    lab(c2[0], c2[1] + 4, '+', { a: 'middle', size: 14, w: 'bold', c: 'var(--diagram-red)' }),
    S.line(top2[0], top2[1], top2[0] - 14, top2[1] - 24, { w: 1.5 }),
    S.line(top2[0], top2[1], top2[0] + 14, top2[1] - 24, { w: 1.5 }),
    lab(top2[0] - 20, top2[1] - 30, 'H', { a: 'middle', size: 11, w: 'bold' }),
    lab(top2[0] + 22, top2[1] - 30, 'E', { a: 'middle', size: 11, w: 'bold', c: 'var(--diagram-red)' }),
    lab(290, 180, 'arenium ion: charge shared by ortho and para carbons', { a: 'middle', size: 10 }),
    lab(290, 194, 'ring sp³ carbon bears H and E', { a: 'middle', size: 10 }),
    lab(390, 140, 'Step 2 (fast)', { a: 'middle', size: 10, w: 'bold' }),
    curly(top2[0] - 7, top2[1] - 12, c2[0] - 48, c2[1] - 40, c2[0] - 28, c2[1] - 2, { c: 'var(--diagram-blue)' }),
    S.arrow(340, 120, 440, 120, { size: 7, w: 2 }),
    lab(390, 112, '− H⁺', { a: 'middle', size: 11 }),
    // product
    hexLines(p3),
    S.circle(c3[0], c3[1], 20, { c: 'var(--diagram-accent)', sw: 2 }),
    S.line(top3[0], top3[1], top3[0], top3[1] - 24, { w: 2 }),
    lab(top3[0], top3[1] - 30, 'E', { a: 'middle', size: 12, w: 'bold', c: 'var(--diagram-red)' }),
    lab(510, 180, 'substituted benzene', { a: 'middle', size: 10 }),
    lab(510, 194, 'aromatic ring restored', { a: 'middle', size: 10 }),
  ].join('');
  return svgDoc(
    580,
    205,
    'Electrophilic substitution in benzene with curly arrows. Step 1: a pair of pi electrons from the ring attacks the electrophile E plus, forming a carbocation called the arenium ion or sigma complex, in which one ring carbon bears both H and E and the positive charge is spread over the ortho and para carbons. Step 2: the carbon-hydrogen bond electrons return to the ring as H plus is lost, restoring the aromatic ring with E substituted for H.',
    body,
  );
})();
