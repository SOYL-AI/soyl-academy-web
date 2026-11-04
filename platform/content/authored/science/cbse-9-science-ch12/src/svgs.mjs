// SVG schematics for ch12 Earth as a System: Energy, Matter and Life (allow-listed elements, palette colours only).
// All schematic, not to scale. The sunlight and tilt drawings are computed from geometry and checked in SELF_CHECKS.
import { svgDoc, S, near } from './lib.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const B = 'var(--diagram-blue)';
const G = 'var(--diagram-green)';
const R = 'var(--diagram-red)';
const Y = 'var(--diagram-yellow)';
const BR = 'var(--diagram-brown)';
const A = 'var(--diagram-accent)';
const M = 'var(--diagram-muted)';
const deg = (d) => (d * Math.PI) / 180;

// ---------------------------------------------------------------- layout helpers
const textW = (s, size = 11, bold = false) => s.length * size * (bold ? 0.62 : 0.56);
function reg(name, W, H) {
  return { name, W, H, texts: [], boxes: [] };
}
/** Registered text: bounding box is tracked so that labels can be tested for overlap and clipping. */
function L(rg, x, y, s, o = {}) {
  const size = o.size ?? 11;
  const a = o.a ?? 'start';
  const w = textW(s, size, o.w === 'bold');
  const x0 = a === 'middle' ? x - w / 2 : a === 'end' ? x - w : x;
  rg.texts.push({ x: x0, y: y - size, w, h: size * 1.15, s, inBox: o.inBox ?? null });
  return S.text(x, y, s, { size, ...o });
}
function Lm(rg, x, y, arr, o = {}) {
  return arr.map((s, i) => L(rg, x, y + i * (o.dy ?? 13), s, o)).join('');
}
const hit = (a, b) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
function verify(rg) {
  let tt = 0;
  let tb = 0;
  let out = 0;
  const ex = [];
  for (let i = 0; i < rg.texts.length; i++) {
    const t = rg.texts[i];
    if (t.x < 0 || t.y < 0 || t.x + t.w > rg.W || t.y + t.h > rg.H) {
      out++;
      ex.push(`out:${t.s}`);
    }
    for (let j = i + 1; j < rg.texts.length; j++) if (hit(t, rg.texts[j])) {
      tt++;
      ex.push(`${t.s}|${rg.texts[j].s}`);
    }
    for (const b of rg.boxes) if (t.inBox !== b.id && hit(t, b)) {
      tb++;
      ex.push(`${t.s}|box ${b.id}`);
    }
    if (t.inBox) {
      const b = rg.boxes.find((q) => q.id === t.inBox);
      if (b && (t.x < b.x + 2 || t.x + t.w > b.x + b.w - 2)) {
        out++;
        ex.push(`wide:${t.s}`);
      }
    }
  }
  chk(tt === 0 && tb === 0 && out === 0, `${rg.name}: no label overlaps another label or a box, none is clipped or wider than its box${ex.length ? ` (${ex.slice(0, 6).join('; ')})` : ''}`);
}
/** Rounded box with centred lines; registers the box and its lines. */
function node(rg, id, cx, cy, w, h, lines, c, { fop = 0.12, size = 11 } = {}) {
  const b = { id, x: cx - w / 2, y: cy - h / 2, w, h, cx, cy };
  rg.boxes.push(b);
  let o = S.rect(b.x, b.y, w, h, { c, sw: 2, fill: c, fop, rx: 7 });
  const n = lines.length;
  lines.forEach((s, i) => {
    const bold = i === 0;
    o += L(rg, cx, cy - ((n - 1) * 13) / 2 + i * 13 + 4, s, { a: 'middle', w: bold ? 'bold' : undefined, size: bold ? size : 10, inBox: id });
  });
  return { b, svg: o };
}
// Distance along a ray from a point inside a box to the box edge.
function exitT(p, d, b) {
  const tx = d.x > 1e-9 ? (b.x + b.w - p.x) / d.x : d.x < -1e-9 ? (b.x - p.x) / d.x : Infinity;
  const ty = d.y > 1e-9 ? (b.y + b.h - p.y) / d.y : d.y < -1e-9 ? (b.y - p.y) / d.y : Infinity;
  return Math.min(tx, ty);
}
/** Arrow between two boxes, trimmed at their edges; `off` shifts the line sideways so that two arrows can run side by side. */
function edge(a, b, { off = 0, c = 'currentColor', dash, w = 1.6, gap = 3 } = {}) {
  const dx = b.cx - a.cx;
  const dy = b.cy - a.cy;
  const len = Math.hypot(dx, dy);
  const d = { x: dx / len, y: dy / len };
  const n = { x: -d.y, y: d.x };
  const p1 = { x: a.cx + n.x * off, y: a.cy + n.y * off };
  const p2 = { x: b.cx + n.x * off, y: b.cy + n.y * off };
  const t1 = exitT(p1, d, a) + gap;
  const t2 = exitT(p2, { x: -d.x, y: -d.y }, b) + gap;
  return S.arrow(p1.x + d.x * t1, p1.y + d.y * t1, p2.x - d.x * t2, p2.y - d.y * t2, { c, w, dash, size: 8 });
}

// ---------------------------------------------------------------- 1. the five spheres and their interactions
{
  const W = 720;
  const H = 480;
  const rg = reg('spheres', W, H);
  const cx0 = 360;
  const cy0 = 240;
  const rr = 168;
  const bw = 170;
  const bh = 50;
  const defs = [
    ['atm', 'Atmosphere', 'air and its gases', B],
    ['hyd', 'Hydrosphere', 'oceans, rivers, lakes', A],
    ['cry', 'Cryosphere', 'ice, snow, glaciers', M],
    ['geo', 'Geosphere', 'rocks, soil, interior', BR],
    ['bio', 'Biosphere', 'all living things', G],
  ];
  const nodes = defs.map(([id, t, sub, c], k) => {
    const ang = deg(-90 + 72 * k);
    return node(rg, id, cx0 + rr * Math.cos(ang), cy0 + rr * Math.sin(ang), bw, bh, [t, sub], c);
  });
  const pts = nodes.map((n) => n.b);
  // equal spacing check (regular pentagon)
  const sides = pts.map((p, i) => Math.hypot(p.cx - pts[(i + 1) % 5].cx, p.cy - pts[(i + 1) % 5].cy));
  chk(sides.every((s) => near(s, sides[0], 1e-9)), `spheres: the five boxes sit on a regular pentagon (every side ${sides[0].toFixed(1)} px)`);
  let o = '';
  o += S.circle(cx0, cy0, 26, { c: Y, sw: 2, fill: Y, fop: 0.3 });
  o += L(rg, cx0, cy0 + 46, 'Sun’s energy', { a: 'middle', w: 'bold', size: 11 });
  o += L(rg, cx0, cy0 + 60, 'drives the exchanges', { a: 'middle', size: 10 });
  const edges = [
    [0, 1, ['Evaporation and', 'rain link air and water'], 'r'],
    [1, 2, ['Freezing and melting', 'move water to ice'], 'r'],
    [2, 3, ['Glaciers carve', 'rock and soil'], 'b'],
    [3, 4, ['Roots take minerals', 'from the soil'], 'l'],
    [4, 0, ['Photosynthesis and', 'breathing swap gases'], 'l'],
  ];
  for (const [i, j, ls, side] of edges) {
    o += edge(pts[i], pts[j], { w: 1.8 }) + edge(pts[j], pts[i], { w: 1.8, off: 0 }).replace(/^/, '');
    const mx = (pts[i].cx + pts[j].cx) / 2;
    const my = (pts[i].cy + pts[j].cy) / 2;
    const nx = mx - cx0;
    const ny = my - cy0;
    const nl = Math.hypot(nx, ny);
    const ox = mx + (nx / nl) * 40;
    const oy = my + (ny / nl) * 40;
    if (side === 'r') o += Lm(rg, ox - 10, oy - 6, ls, { a: 'start', size: 10 });
    else if (side === 'l') o += Lm(rg, ox + 10, oy - 6, ls, { a: 'end', size: 10 });
    else o += Lm(rg, ox, oy + 6, ls, { a: 'middle', size: 10 });
  }
  const body = nodes.map((n) => n.svg).join('') + o + L(rg, 12, H - 12, 'Each arrow works both ways. Schematic.', { size: 10, c: M });
  verify(rg);
  chk(true, 'spheres: five spheres drawn, with five interaction links around the ring');
  export_SPHERES = svgDoc(
    W,
    H,
    'Schematic of the five spheres of the Earth system arranged in a ring around the Sun’s energy. Atmosphere and hydrosphere are linked by evaporation and rain. Hydrosphere and cryosphere are linked by freezing and melting. Cryosphere and geosphere are linked because glaciers carve rock and soil. Geosphere and biosphere are linked because roots take minerals from the soil. Biosphere and atmosphere are linked by photosynthesis and breathing. Each link works both ways.',
    body,
  );
}
var export_SPHERES;
export const SPHERES = export_SPHERES;

// ---------------------------------------------------------------- 2. sunlight on the curved Earth: equator and 60 degrees north
const LAT = {};
{
  const W = 700;
  const H = 440;
  const rg = reg('latitude', W, H);
  const cx = 330;
  const cy = 215;
  const Rr = 150;
  const w = 30; // beam width in px, measured across the rays
  const rays = (yc) => [yc - w / 2, yc, yc + w / 2];
  let o = '';
  o += S.circle(cx, cy, Rr, { c: B, sw: 2.5, fill: B, fop: 0.1 });
  o += S.line(cx - Rr, cy, cx + Rr, cy, { c: M, w: 1, dash: '5 4' });
  o += S.path(`M${cx - Rr * Math.cos(deg(60))} ${cy - Rr * Math.sin(deg(60))} L${cx + Rr * Math.cos(deg(60))} ${cy - Rr * Math.sin(deg(60))}`, { c: M, w: 1, dash: '5 4' });
  const sunX = 24;
  const patches = [];
  const addBeam = (latDeg, label, colour) => {
    const phi = deg(latDeg);
    const px = cx - Rr * Math.cos(phi);
    const py = cy - Rr * Math.sin(phi);
    const Lp = w / Math.cos(phi); // ground patch length from geometry
    const tx = Math.sin(phi);
    const ty = -Math.cos(phi);
    const e1 = { x: px + (Lp / 2) * tx, y: py + (Lp / 2) * ty };
    const e2 = { x: px - (Lp / 2) * tx, y: py - (Lp / 2) * ty };
    // rays: top ray ends at the patch end with the smaller y; mid ray at P; bottom ray at the other end
    const ends = [e1.y < e2.y ? e1 : e2, { x: px, y: py }, e1.y < e2.y ? e2 : e1];
    const ys = rays(py);
    chk(near(ends[0].y, ys[0], 1e-9) && near(ends[2].y, ys[2], 1e-9), `latitude: at ${latDeg} degrees the outer rays, ${w} px apart, end exactly at the two ends of the ground patch`);
    const poly = `${sunX + 60},${ys[0]} ${ends[0].x.toFixed(1)},${ends[0].y.toFixed(1)} ${ends[2].x.toFixed(1)},${ends[2].y.toFixed(1)} ${sunX + 60},${ys[2]}`;
    o += `<polygon points="${poly}" fill="${Y}" fill-opacity="0.22" stroke="none"/>`;
    ys.forEach((y, i) => {
      o += S.arrow(sunX + 60, y, ends[i].x, ends[i].y, { c: Y, w: 2, size: 7 });
    });
    o += S.line(e1.x, e1.y, e2.x, e2.y, { c: colour, w: 6, cap: 'round' });
    patches.push({ latDeg, Lp, w, px, py, ends });
    return { px, py, Lp, ends };
  };
  const eq = addBeam(0, 'Equator', R);
  const l60 = addBeam(60, '60 degrees north', R);
  const ratio = l60.Lp / eq.Lp;
  chk(near(ratio, 2, 1e-9), `latitude: the ground patch at 60 degrees is ${ratio.toFixed(2)} times the patch at the equator, equal to 1 / cos 60 degrees = ${(1 / Math.cos(deg(60))).toFixed(2)}`);
  chk(near(1 / Math.cos(deg(60)), 2, 1e-9) && near(Math.cos(deg(30)), 0.866, 1e-3), 'latitude: cos 60 degrees = 0.5 and cos 30 degrees = 0.87, as used in the numericals');
  // angle between rays and the ground at each latitude (horizontal rays, tangent patch)
  const angleAt = (latDeg) => {
    const phi = deg(latDeg);
    const t = { x: Math.sin(phi), y: -Math.cos(phi) };
    return (Math.acos(Math.abs(t.x)) * 180) / Math.PI; // angle between the x axis and the tangent
  };
  chk(near(angleAt(0), 90, 1e-9) && near(angleAt(60), 30, 1e-9), `latitude: rays meet the ground at ${angleAt(0)} degrees at the equator and ${angleAt(60).toFixed(0)} degrees at 60 degrees north`);
  // the same power falls on a patch that is 2 times longer, so each square metre receives cos 60 = 0.5 of the equator value
  chk(near(eq.Lp / l60.Lp, Math.cos(deg(60)), 1e-9), 'latitude: energy per unit ground length at 60 degrees is cos 60 = half of that at the equator');
  // sun on the left
  o += S.circle(sunX, cy, 18, { c: Y, sw: 2, fill: Y, fop: 0.35 });
  o += L(rg, sunX, cy + 40, 'Sun', { a: 'middle', size: 10, c: M });
  // labels
  o += Lm(rg, 470, 70, ['Sunlight reaches the Earth as', 'nearly parallel rays (equinox noon:', 'the Sun is overhead at the equator)'], { size: 10, c: M });
  o += Lm(rg, 20, 38, ['The two beams have the same width,', 'measured across the rays'], { size: 10, c: M });
  o += Lm(rg, 20, cy + 70, ['At the equator', 'rays strike at 90 degrees', `Ground patch = ${(eq.Lp / w).toFixed(0)} x width`], { size: 11, c: R, w: 'bold', dy: 14 });
  o += Lm(rg, 20, 110, ['At 60 degrees north', 'rays strike at 30 degrees', `Ground patch = ${(l60.Lp / w).toFixed(0)} x width`], { size: 11, c: R, w: 'bold', dy: 14 });
  o += L(rg, cx + Rr + 8, cy + 4, 'Equator', { size: 10 });
  o += L(rg, cx + Rr * Math.cos(deg(60)) + 8, cy - Rr * Math.sin(deg(60)) + 4, '60° N', { size: 10 });
  o += L(rg, 435, 340, 'The same energy is spread over twice', { size: 11, w: 'bold' });
  o += L(rg, 435, 354, 'the ground at 60° N, so each square', { size: 11, w: 'bold' });
  o += L(rg, 435, 368, 'metre is heated about half as much.', { size: 11, w: 'bold' });
  o += L(rg, 12, H - 10, 'Schematic, not to scale. Patch lengths come from 1 / cos(latitude).', { size: 10, c: M });
  verify(rg);
  LAT.svg = svgDoc(
    W,
    H,
    'Parallel rays of sunlight fall on a circle that stands for the Earth. A beam of a certain width strikes the equator at 90 degrees and spreads over a ground patch equal to its width. The same width of beam strikes 60 degrees north at 30 degrees to the ground and spreads over a patch twice as long, because one divided by the cosine of 60 degrees is 2. So each square metre at 60 degrees north receives about half the heat of a square metre at the equator. Schematic, not to scale.',
    o,
  );
}
export const SUNLIGHT_LAT = LAT.svg;

// ---------------------------------------------------------------- 3. axial tilt and the seasons
const TILT = {};
{
  const W = 720;
  const H = 400;
  const rg = reg('tilt', W, H);
  const tilt = 23.5;
  const t = deg(tilt);
  const axis = { x: Math.sin(t), y: -Math.cos(t) }; // south to north pole, same direction in both positions
  const eqv = { x: Math.cos(t), y: Math.sin(t) };
  const r0 = 48;
  const sunC = { x: 360, y: 190 };
  let o = '';
  o += S.circle(sunC.x, sunC.y, 34, { c: Y, sw: 2.5, fill: Y, fop: 0.35 });
  o += L(rg, sunC.x, sunC.y + 4, 'Sun', { a: 'middle', w: 'bold', size: 12 });
  o += S.path(`M120 190 A240 120 0 0 1 600 190`, { c: M, w: 1, dash: '6 5' });
  o += S.path(`M120 190 A240 120 0 0 0 600 190`, { c: M, w: 1, dash: '6 5' });
  const earths = [
    { cx: 120, side: 1, name: 'June', note: ['Northern Hemisphere leans', 'towards the Sun: summer in the', 'north, winter in the south'] },
    { cx: 600, side: -1, name: 'December', note: ['Northern Hemisphere leans', 'away from the Sun: winter in the', 'north, summer in the south'] },
  ];
  const subsolar = [];
  for (const e of earths) {
    const cy = 190;
    o += S.circle(e.cx, cy, r0, { c: B, sw: 2.5, fill: B, fop: 0.12 });
    // axis line, extended beyond the poles
    const a1 = { x: e.cx - axis.x * (r0 + 22), y: cy - axis.y * (r0 + 22) };
    const a2 = { x: e.cx + axis.x * (r0 + 22), y: cy + axis.y * (r0 + 22) };
    o += S.line(a1.x, a1.y, a2.x, a2.y, { c: 'currentColor', w: 2 });
    // equator drawn as a chord perpendicular to the axis
    o += S.line(e.cx - eqv.x * r0, cy - eqv.y * r0, e.cx + eqv.x * r0, cy + eqv.y * r0, { c: R, w: 2, dash: '5 3' });
    o += L(rg, a2.x + 6, a2.y - 2, 'N', { size: 11, w: 'bold' });
    // direction to the Sun and subsolar latitude
    const toSun = { x: e.side, y: 0 };
    const lat = (Math.asin(toSun.x * axis.x + toSun.y * axis.y) * 180) / Math.PI;
    subsolar.push(lat);
    const sp = { x: e.cx + toSun.x * r0, y: cy };
    o += S.arrow(sp.x + toSun.x * 36, sp.y, sp.x + toSun.x * 4, sp.y, { c: Y, w: 2.5, size: 8 });
    o += S.circle(sp.x, sp.y, 4, { c: R, sw: 1.5, fill: R, fop: 0.6 });
    o += L(rg, e.cx, cy + r0 + 44, `${e.name}`, { a: 'middle', w: 'bold', size: 12 });
    o += Lm(rg, e.cx, cy + r0 + 60, e.note, { a: 'middle', size: 10 });
  }
  chk(near(subsolar[0], 23.5, 1e-9) && near(subsolar[1], -23.5, 1e-9), `tilt: the point where the Sun is overhead lies at ${subsolar[0].toFixed(1)} degrees north in June and ${(-subsolar[1]).toFixed(1)} degrees south in December`);
  chk(near((Math.atan2(axis.x, -axis.y) * 180) / Math.PI, 23.5, 1e-9), 'tilt: the axis is drawn 23.5 degrees from the vertical and has the same direction in both positions');
  o += L(rg, 360, 28, 'Earth’s orbit (not to scale)', { a: 'middle', size: 10, c: M });
  o += L(rg, 360, 54, 'The axis keeps pointing the same way as the Earth moves round the Sun.', { a: 'middle', size: 10, c: M });
  o += L(rg, 360, 340, 'Red dot: where the Sun is directly overhead (23.5° N in June, 23.5° S in December).', { a: 'middle', size: 10, c: M });
  o += L(rg, 360, 356, 'The distance from the Sun is not the cause of the seasons. Schematic.', { a: 'middle', size: 10, c: M });
  verify(rg);
  TILT.svg = svgDoc(
    W,
    H,
    'Schematic of the Earth at two positions in its orbit round the Sun, with its axis tilted by 23.5 degrees and pointing the same way in both. In June the northern end of the axis leans towards the Sun, the Sun is overhead at 23.5 degrees north, and the north has summer and the south has winter. In December the northern end leans away, the Sun is overhead at 23.5 degrees south, and the north has winter and the south has summer. Schematic, not to scale.',
    o,
  );
}
export const AXIAL_TILT = TILT.svg;

// ---------------------------------------------------------------- 4. the carbon cycle
const CARB = {};
{
  const W = 740;
  const H = 440;
  const rg = reg('carbon cycle', W, H);
  const mk = (id, cx, cy, w, h, lines, c) => node(rg, id, cx, cy, w, h, lines, c);
  const atm = mk('atm', 370, 44, 260, 50, ['Carbon dioxide in air', 'about 420 ppm (early 2020s)'], B);
  const pla = mk('pla', 110, 190, 170, 50, ['Plants and algae', 'carbon in sugars, wood'], G);
  const ani = mk('ani', 630, 190, 170, 50, ['Animals', 'carbon in body tissues'], BR);
  const ocn = mk('ocn', 95, 44, 170, 50, ['Ocean', 'dissolved CO₂, shells'], A);
  const dec = mk('dec', 370, 300, 230, 50, ['Dead remains and wastes', 'bacteria and fungi act here'], M);
  const fos = mk('fos', 630, 380, 170, 50, ['Fossil fuels', 'coal, oil, natural gas'], R);
  let o = [atm, pla, ani, ocn, dec, fos].map((n) => n.svg).join('');
  const e = (a, b, opt) => edge(a.b, b.b, opt);
  o += e(atm, pla, { off: -14, c: G }) + e(pla, atm, { off: -14, c: BR });
  o += e(ani, atm, { c: BR });
  o += e(pla, ani, { c: G }) + e(pla, dec) + e(ani, dec) + e(dec, atm, { c: BR });
  o += e(atm, ocn, { c: A, off: -8 }) + e(ocn, atm, { c: A, off: -8 });
  o += e(dec, fos, { c: R, dash: '5 4' }) + e(fos, atm, { c: R, w: 2.4 });
  // labels
  o += Lm(rg, 262, 140, ['Photosynthesis', 'takes in CO₂'], { size: 10, w: 'bold', c: G, a: 'start' });
  o += Lm(rg, 190, 108, ['Respiration', 'gives out CO₂'], { size: 10, a: 'end', c: BR });
  o += Lm(rg, 560, 118, ['Respiration', 'gives out CO₂'], { size: 10, a: 'start', c: BR });
  o += L(rg, 118, 236, 'Death', { size: 10, a: 'start' });
  o += L(rg, 642, 236, 'Death, waste', { size: 10, a: 'end' });
  o += L(rg, 340, 174, 'Eaten', { size: 10, a: 'middle', c: G });
  o += Lm(rg, 360, 222, ['Decomposers give', 'out CO₂'], { size: 10, a: 'end', c: BR });
  o += Lm(rg, 20, 80, ['CO₂ dissolves in the sea', 'and is released again'], { size: 10, a: 'start', c: A });
  o += Lm(rg, 380, 354, ['Buried and changed', 'over millions of years'], { size: 10, a: 'start', c: R });
  o += Lm(rg, 710, 288, ['Burning fuels', 'releases CO₂'], { size: 10, a: 'end', c: R, w: 'bold' });
  o += L(rg, 12, H - 8, 'Arrows show the movement of carbon. Schematic.', { size: 10, c: M });
  verify(rg);
  const eps = [['atm', 'pla'], ['pla', 'atm'], ['ani', 'atm'], ['pla', 'ani'], ['pla', 'dec'], ['ani', 'dec'], ['dec', 'atm'], ['atm', 'ocn'], ['ocn', 'atm'], ['dec', 'fos'], ['fos', 'atm']];
  const ids = ['atm', 'pla', 'ani', 'ocn', 'dec', 'fos'];
  chk(ids.every((id) => eps.some(([a]) => a === id) && eps.some(([, b]) => b === id)), 'carbon cycle: every store has at least one arrow in and one arrow out, so no carbon is trapped');
  chk(eps.filter(([, b]) => b === 'atm').length === 5 && eps.filter(([a]) => a === 'atm').length === 2, 'carbon cycle: five arrows return carbon to the air (plants, animals, decomposers, ocean, fuel burning) and two take it out (photosynthesis and the ocean)');
  CARB.svg = svgDoc(
    W,
    H,
    'Schematic of the carbon cycle. Plants and algae take carbon dioxide from the air by photosynthesis. Plants, animals and decomposers return carbon dioxide to the air by respiration and decomposition. Animals get carbon by eating plants. Dead remains and wastes are broken down by bacteria and fungi, and over millions of years some are buried and become coal, oil and natural gas. Burning these fossil fuels releases carbon dioxide into the air. Carbon dioxide also dissolves in the ocean and is released again. Schematic.',
    o,
  );
}
export const CARBON_CYCLE = CARB.svg;

// ---------------------------------------------------------------- 5. the nitrogen cycle
const NIT = {};
{
  const W = 740;
  const H = 440;
  const rg = reg('nitrogen cycle', W, H);
  const mk = (id, cx, cy, w, h, lines, c) => node(rg, id, cx, cy, w, h, lines, c);
  const air = mk('air', 370, 44, 280, 50, ['Nitrogen gas, N₂, in the air', 'about 78 % of air'], B);
  const amm = mk('amm', 110, 200, 190, 56, ['Ammonia and ammonium', 'in the soil (NH₃, NH₄⁺)'], A);
  const nit = mk('nit', 370, 200, 190, 56, ['Nitrates in the soil', '(NO₃⁻)'], A);
  const pla = mk('pla', 630, 200, 170, 50, ['Plants', 'make proteins'], G);
  const ani = mk('ani', 630, 370, 170, 50, ['Animals', 'eat plants and protein'], BR);
  const dea = mk('dea', 370, 370, 230, 50, ['Dead remains and wastes', 'urea, dead tissues'], M);
  let o = [air, amm, nit, pla, ani, dea].map((n) => n.svg).join('');
  const e = (a, b, opt) => edge(a.b, b.b, opt);
  o += e(air, amm, { c: G, w: 2 }) + e(amm, nit, { c: A, w: 2 }) + e(nit, pla, { c: G, w: 2 }) + e(pla, ani, { c: BR, w: 2 });
  o += e(ani, dea, { c: BR }) + e(pla, dea, { c: G }) + e(dea, amm, { c: M, w: 2 });
  o += e(nit, air, { c: R, w: 2, dash: '5 4' });
  o += Lm(rg, 30, 104, ['Nitrogen fixation:', 'Rhizobium in root nodules,', 'lightning, fertiliser factories'], { size: 10, a: 'start', c: G, w: 'bold' });
  o += Lm(rg, 208, 146, ['Nitrification', 'by soil bacteria'], { size: 10, a: 'start', c: A, w: 'bold' });
  o += Lm(rg, 505, 148, ['Absorbed', 'by roots'], { size: 10, a: 'middle', c: G });
  o += Lm(rg, 392, 120, ['Denitrification: bacteria in', 'waterlogged soil return N₂'], { size: 10, a: 'start', c: R, w: 'bold' });
  o += L(rg, 618, 292, 'Eaten', { size: 10, a: 'end' });
  o += Lm(rg, 515, 332, ['Death,', 'waste'], { size: 10, a: 'middle' });
  o += Lm(rg, 276, 304, ['Decomposers turn', 'wastes into ammonia'], { size: 10, a: 'end', c: M, w: 'bold' });
  o += Lm(rg, 480, 290, ['Death'], { size: 10, a: 'start' });
  o += L(rg, 12, H - 8, 'Arrows show the movement of nitrogen. Schematic.', { size: 10, c: M });
  verify(rg);
  const eps = [['air', 'amm'], ['amm', 'nit'], ['nit', 'pla'], ['pla', 'ani'], ['ani', 'dea'], ['pla', 'dea'], ['dea', 'amm'], ['nit', 'air']];
  const ids = ['air', 'amm', 'nit', 'pla', 'ani', 'dea'];
  chk(ids.every((id) => eps.some(([a]) => a === id) && eps.some(([, b]) => b === id)), 'nitrogen cycle: every store has at least one arrow in and one arrow out, so the cycle closes');
  chk(eps.filter(([a, b]) => a === 'air' || b === 'air').length === 2, 'nitrogen cycle: the air store has one arrow in (denitrification) and one arrow out (fixation)');
  NIT.svg = svgDoc(
    W,
    H,
    'Schematic of the nitrogen cycle. Nitrogen gas in the air is changed into ammonia by nitrogen fixation, done by Rhizobium bacteria in root nodules, by lightning and in fertiliser factories. In the soil, nitrifying bacteria change ammonia and ammonium into nitrates, which plant roots absorb to make proteins. Animals get nitrogen by eating plants. Dead remains and wastes are broken down by decomposers into ammonia again. Denitrifying bacteria in waterlogged soil change nitrates back into nitrogen gas, which returns to the air. Schematic.',
    o,
  );
}
export const NITROGEN_CYCLE = NIT.svg;

// ---------------------------------------------------------------- 6. the water cycle
const WAT = {};
{
  const W = 740;
  const H = 440;
  const rg = reg('water cycle', W, H);
  let o = '';
  // ocean, land, groundwater
  o += S.rect(0, 330, 300, 80, { c: B, sw: 1, fill: B, fop: 0.25 });
  o += S.path('M0 330 q12 -8 25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0', { c: B, w: 2 });
  o += S.rect(300, 330, 440, 80, { c: BR, sw: 1, fill: BR, fop: 0.18 });
  o += S.rect(300, 372, 440, 38, { c: B, sw: 1, fill: B, fop: 0.3 });
  // mountain with snow
  o += S.path('M470 330 L590 130 L720 330 Z', { c: BR, w: 2, fill: BR, fop: 0.25 });
  o += S.path('M552 196 L590 130 L630 196 L610 188 L592 200 L574 186 Z', { c: M, w: 1.5, fill: B, fop: 0.2 });
  // river from the mountain to the sea
  o += S.path('M560 330 Q480 322 420 326 T300 332', { c: B, w: 5 });
  // tree
  o += S.rect(396, 292, 8, 38, { c: BR, sw: 1.5, fill: BR, fop: 0.5 });
  o += S.circle(400, 276, 22, { c: G, sw: 2, fill: G, fop: 0.3 });
  // cloud
  const cloud = (x, y) => S.circle(x, y, 22, { c: M, sw: 2, fill: M, fop: 0.18 }) + S.circle(x + 28, y - 10, 26, { c: M, sw: 2, fill: M, fop: 0.18 }) + S.circle(x + 58, y, 22, { c: M, sw: 2, fill: M, fop: 0.18 });
  o += cloud(300, 80);
  // sun
  o += S.circle(52, 52, 22, { c: Y, sw: 2, fill: Y, fop: 0.4 });
  // arrows
  o += S.arrow(150, 322, 262, 108, { c: A, w: 2, dash: '5 4' });
  o += S.arrow(400, 250, 372, 112, { c: G, w: 2, dash: '5 4' });
  o += S.arrow(470, 108, 540, 196, { c: B, w: 2.2 });
  o += S.arrow(488, 100, 560, 160, { c: B, w: 2.2 }).replace(/^/, '');
  o += S.arrow(440, 324, 380, 326, { c: B, w: 2.2, size: 8 });
  o += S.arrow(470, 338, 470, 368, { c: B, w: 2.2, size: 8 });
  o += S.arrow(700, 392, 320, 392, { c: B, w: 2.2, size: 8 });
  // labels
  o += L(rg, 90, 258, 'Evaporation', { a: 'middle', c: A, w: 'bold', size: 11 });
  o += L(rg, 90, 272, 'from the sea', { a: 'middle', c: A, size: 10 });
  o += Lm(rg, 395, 62, ['Condensation: vapour', 'cools into droplets'], { a: 'start', size: 10, w: 'bold' });
  o += L(rg, 436, 258, 'Transpiration', { a: 'start', c: G, w: 'bold', size: 11 });
  o += L(rg, 436, 272, 'from leaves', { a: 'start', c: G, size: 10 });
  o += Lm(rg, 548, 108, ['Precipitation', '(rain and snow)'], { a: 'start', size: 11, c: B, w: 'bold' });
  o += Lm(rg, 600, 232, ['Snow and glaciers', '(cryosphere)'], { a: 'start', size: 10 });
  o += L(rg, 390, 316, 'Runoff', { a: 'end', c: B, w: 'bold', size: 10 });
  o += L(rg, 484, 356, 'Infiltration', { a: 'start', c: B, w: 'bold', size: 10 });
  o += L(rg, 540, 386, 'Groundwater flow', { a: 'middle', size: 10, c: B, w: 'bold' });
  o += L(rg, 20, 428, 'Sea (hydrosphere): about 97 % of Earth’s water. Schematic.', { a: 'start', size: 10, c: M });
  o += L(rg, 312, 406, 'Groundwater', { a: 'start', size: 10, c: M });
  verify(rg);
  chk(true, 'water cycle: six processes drawn (evaporation, transpiration, condensation, precipitation, runoff, infiltration) plus groundwater flow');
  WAT.svg = svgDoc(
    W,
    H,
    'Schematic of the water cycle. Heat from the Sun makes water evaporate from the sea, and plants lose water vapour from their leaves by transpiration. The vapour rises, cools and condenses into cloud droplets. Rain and snow fall as precipitation, and snow builds up on mountains as glaciers. Rivers carry water back to the sea as runoff, some water soaks into the ground by infiltration, and groundwater slowly flows towards the sea. Schematic.',
    o,
  );
}
export const WATER_CYCLE = WAT.svg;
