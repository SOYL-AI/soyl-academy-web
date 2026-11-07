// SVG diagrams for ICSE 9 Physics ch08 Reflection of Light at Plane Mirrors. All geometry is computed in JS and every drawn ray
// is checked against the law of reflection (angle of incidence = angle of reflection, both ray and normal in one plane); the
// images in parallel and inclined mirrors come from calc.mjs. Palette colours only; every font size is at least 10.
import { svgDoc, S } from '../../icse-9-physics-ch01/src/lib.mjs';
import { LAW_I, PIN_I, bounce, inclinedImages, reflectOrigin, PAR, PAR_IM } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 12, ...o });
const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const RED = 'var(--diagram-red)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BROWN = 'var(--diagram-brown)';
const rad = (d) => (d * Math.PI) / 180;
const ray = (p, q, o = {}) => S.line(p[0], p[1], q[0], q[1], { c: o.c ?? RED, w: o.w ?? 2.2, dash: o.dash }) + (o.head === false ? '' : S.midHead(p[0], p[1], q[0], q[1], { c: o.c ?? RED, size: 8, at: o.at ?? 0.5 }));
const check = (cond, msg) => {
  if (!cond) throw new Error(`svgs: ${msg}`);
};
const near = (a, b, t = 1e-6) => Math.abs(a - b) <= t;
/** Short hatching on the back of a mirror line from (x1, y1) to (x2, y2); `side` is the unit vector of the back. */
function hatch(x1, y1, x2, y2, side, n = 14, len = 9) {
  let s = S.line(x1, y1, x2, y2, { w: 3 });
  const dx = (x2 - x1) / n;
  const dy = (y2 - y1) / n;
  for (let k = 1; k <= n; k++) {
    const x = x1 + dx * k;
    const y = y1 + dy * k;
    s += S.line(x, y, x + side[0] * len - dx * 0.8, y + side[1] * len - dy * 0.8, { c: MUT, w: 1 });
  }
  return s;
}
/** Arc of radius rr about (cx, cy) from screen angle a1 to a2 (radians, y down). */
const arc = (cx, cy, rr, a1, a2, c = MUT) => S.path(`M ${(cx + rr * Math.cos(a1)).toFixed(1)} ${(cy + rr * Math.sin(a1)).toFixed(1)} A ${rr} ${rr} 0 0 ${a2 > a1 ? 1 : 0} ${(cx + rr * Math.cos(a2)).toFixed(1)} ${(cy + rr * Math.sin(a2)).toFixed(1)}`, { c, w: 1.5 });

// ---------------------------------------------------------------- 1. laws of reflection
function laws(lettered) {
  const p = [];
  const ox = 220;
  const oy = 215;
  const L = 160;
  const i = LAW_I;
  const o = [ox - L * Math.sin(rad(i)), oy - L * Math.cos(rad(i))];
  const b = bounce(o, ox, oy, L);
  check(near(b.i, i, 1e-6) && near(b.r, i, 1e-6), 'law diagram: i = r');
  p.push(hatch(50, oy, 390, oy, [0, 1], 24, 9));
  p.push(S.line(ox, 40, ox, oy, { c: MUT, w: 1.4, dash: '6 4' }));
  p.push(ray(o, [ox, oy], { c: RED }), ray([ox, oy], b.out, { c: BLUE }));
  p.push(S.circle(ox, oy, 3.5, { fill: 'currentColor' }));
  const ai = Math.PI / 2 + rad(i); // screen angle of the incident ray from O, measured from +x (pointing up-left)
  const nAng = -Math.PI / 2;
  p.push(arc(ox, oy, 62, nAng - rad(i), nAng), arc(ox, oy, 62, nAng, nAng + rad(i)));
  void ai;
  if (lettered) {
    p.push(lab(o[0] - 18, o[1] + 10, 'A', { size: 16, w: 'bold' }), lab(b.out[0] + 8, b.out[1] + 10, 'B', { size: 16, w: 'bold' }), lab(ox + 8, 56, 'C', { size: 16, w: 'bold' }));
    p.push(lab(70, oy + 30, 'D', { size: 16, w: 'bold' }), lab(ox + 10, oy + 26, 'E', { size: 16, w: 'bold' }));
  } else {
    p.push(lab(o[0] - 10, o[1] - 8, 'incident ray', { a: 'end', w: 'bold', c: RED }), lab(b.out[0] + 8, b.out[1] - 6, 'reflected ray', { w: 'bold', c: BLUE }), lab(ox + 6, 52, 'normal', { c: MUT }));
    p.push(lab(60, oy + 32, 'plane mirror', {}), lab(ox - 6, oy + 24, 'point of incidence', { a: 'middle' }));
    p.push(lab(ox - 44, oy - 74, 'i', { size: 14, w: 'bold', it: true, a: 'middle' }), lab(ox + 44, oy - 74, 'r', { size: 14, w: 'bold', it: true, a: 'middle' }));
  }
  const alt = lettered
    ? 'A ray of light reflected at a plane mirror, with parts lettered A to E: A is the incident ray, B the reflected ray, C the normal, D the plane mirror and E the point of incidence. The angles are not marked and the labels are letters only'
    : 'A ray of light reflected at a plane mirror: the incident ray and the reflected ray make equal angles, i and r, with the normal at the point of incidence';
  return svgDoc(440, 262, alt, p.join(''));
}
export const LAWS = laws(false);
export const LAWS_LETTERED = laws(true);

// ---------------------------------------------------------------- 2. the pin experiment (top view)
export const PINS = (() => {
  const p = [];
  const ox = 230;
  const oy = 140;
  const i = PIN_I[2];
  const dirL = [-Math.sin(rad(i)), -Math.cos(rad(i))];
  const dirR = [Math.sin(rad(i)), -Math.cos(rad(i))];
  p.push(S.rect(30, 16, 400, 244, { c: MUT, sw: 1, fill: FILL, fop: 0.5 }));
  p.push(hatch(60, oy, 400, oy, [0, 1], 24, 9), S.line(ox, 28, ox, oy, { c: MUT, w: 1.4, dash: '6 4' }));
  const P = (d, sgn) => [ox + (sgn < 0 ? dirL[0] : dirR[0]) * d, oy + (sgn < 0 ? dirL[1] : dirR[1]) * d];
  const [p1, p2, p3, p4] = [P(115, -1), P(60, -1), P(60, 1), P(115, 1)];
  const b = bounce(p1, ox, oy, 115);
  check(near(b.out[0], p4[0], 1e-6) && near(b.out[1], p4[1], 1e-6) && near(b.i, i, 1e-9), 'pin geometry: P3 and P4 on the reflected ray');
  p.push(S.line(p1[0], p1[1], ox, oy, { c: RED, w: 1.6 }), S.line(ox, oy, p4[0], p4[1], { c: BLUE, w: 1.6 }));
  // the images of P1 and P2 behind the mirror lie on the line through P3 and P4, produced backwards
  for (const [q, nm] of [[p1, 'P1'], [p2, 'P2']]) {
    const im = [q[0], 2 * oy - q[1]];
    p.push(S.circle(im[0], im[1], 4, { c: MUT, dash: '3 2', sw: 1.2 }), lab(im[0] - 22, im[1] + 14, `${nm}′`, { size: 11, c: MUT }));
  }
  p.push(S.line(ox, oy, p1[0], 2 * oy - p1[1], { c: MUT, w: 1, dash: '3 3' }));
  for (const [q, nm] of [[p1, 'P1'], [p2, 'P2'], [p3, 'P3'], [p4, 'P4']]) {
    p.push(S.circle(q[0], q[1], 5, { fill: GREEN, c: GREEN, sw: 1 }), lab(q[0] + (q[0] < ox ? -12 : 10), q[1] + 4, nm, { a: q[0] < ox ? 'end' : 'start', size: 12, w: 'bold' }));
  }
  p.push(S.circle(ox, oy, 3.5, { fill: 'currentColor' }), lab(ox + 8, oy + 18, 'O', { w: 'bold' }), lab(ox + 6, 40, 'normal', { c: MUT }), lab(66, oy + 28, 'mirror', {}));
  p.push(lab(30, 280, 'Pins P1 and P2 mark the incident ray; pins P3 and P4 are set in line', { size: 11, c: MUT }), lab(30, 295, 'with the images P1′ and P2′ seen in the mirror.', { size: 11, c: MUT }));
  return svgDoc(460, 306, 'Top view of the pin experiment on a sheet of paper: a plane mirror along a line, a normal drawn at the point O, pins P1 and P2 along the incident ray and pins P3 and P4 placed so that they line up with the images of P1 and P2 seen in the mirror. The angles of incidence and reflection are measured from the normal', p.join(''));
})();

// ---------------------------------------------------------------- 3. image of a point in a plane mirror
export const IMAGE = (() => {
  const p = [];
  const mx = 270;
  const O = [120, 140];
  const I = [2 * mx - O[0], O[1]];
  p.push(hatch(mx, 24, mx, 262, [1, 0], 17, 9));
  p.push(S.line(O[0], O[1], I[0], I[1], { c: MUT, w: 1.2, dash: '5 4' }));
  for (const hy of [76, 204]) {
    const hit = [mx, hy];
    const dir = [hit[0] - I[0], hit[1] - I[1]];
    const n = Math.hypot(...dir);
    const out = [hit[0] + (dir[0] / n) * 170, hit[1] + (dir[1] / n) * 170];
    const ai = Math.atan2(Math.abs(hit[1] - O[1]), Math.abs(hit[0] - O[0]));
    const ar = Math.atan2(Math.abs(out[1] - hit[1]), Math.abs(out[0] - hit[0]));
    check(near(ai, ar, 1e-9), 'image diagram: law of reflection');
    p.push(ray(O, hit, { c: RED }), ray(hit, out, { c: BLUE }), S.line(hit[0], hit[1], I[0], I[1], { c: MUT, w: 1.2, dash: '5 4' }));
  }
  p.push(S.circle(O[0], O[1], 5, { fill: GREEN, c: GREEN }), lab(O[0] - 4, O[1] - 12, 'object O', { a: 'middle', w: 'bold', c: GREEN }));
  p.push(S.circle(I[0], I[1], 5, { c: GREEN, dash: '3 2' }), lab(I[0] + 4, I[1] - 12, 'image I', { a: 'middle', w: 'bold', c: GREEN }));
  p.push(S.line(mx - 10, O[1] - 10, mx, O[1] - 10, { c: MUT, w: 1 }), S.line(mx - 10, O[1] - 10, mx - 10, O[1], { c: MUT, w: 1 }));
  p.push(lab((O[0] + mx) / 2, O[1] + 20, 'u', { a: 'middle', it: true, size: 13 }), lab((mx + I[0]) / 2, O[1] + 20, 'v = u', { a: 'middle', it: true, size: 13 }));
  p.push(lab(56, 250, 'eye', { c: BLUE, w: 'bold' }), lab(mx + 14, 256, 'plane mirror', { size: 12 }));
  return svgDoc(440, 276, 'Image of a point object O in a plane mirror. Two rays from O are reflected by the mirror; the reflected rays, produced backwards as dotted lines, meet behind the mirror at the image I. The image is as far behind the mirror as the object is in front, on the line through O perpendicular to the mirror', p.join(''));
})();

// ---------------------------------------------------------------- 4. lateral inversion
export const LATERAL = (() => {
  const p = [];
  const mx = 240;
  p.push(hatch(mx, 24, mx, 190, [1, 0], 12, 9));
  p.push(S.text(100, 120, 'F', { size: 76, w: 'bold', c: GREEN }));
  p.push(`<g transform="translate(${2 * mx},0) scale(-1,1)">${S.text(100, 120, 'F', { size: 76, w: 'bold', c: GREEN })}</g>`);
  p.push(S.line(mx - 130, 128, mx + 130, 128, { c: MUT, w: 1, dash: '4 4' }));
  p.push(lab(105, 168, 'object', { c: GREEN, w: 'bold' }), lab(mx + 40, 168, 'image', { c: GREEN, w: 'bold' }));
  p.push(S.arrow(mx - 70, 38, mx - 110, 38, { w: 1.5, size: 6, c: RED }), lab(mx - 74, 30, 'left', { a: 'middle', size: 11, c: RED }));
  p.push(S.arrow(mx + 70, 38, mx + 110, 38, { w: 1.5, size: 6, c: RED }), lab(mx + 74, 30, 'right', { a: 'middle', size: 11, c: RED }));
  p.push(lab(14, 206, 'Left and right are interchanged: the letter appears laterally inverted.', { size: 12, c: MUT }));
  return svgDoc(480, 220, 'The letter F placed in front of a plane mirror and its image behind the mirror. The image is the same size and the same distance away, but it is turned left to right, which is lateral inversion', p.join(''));
})();

// ---------------------------------------------------------------- 5. two parallel mirrors
function parallel({ withImages }) {
  const p = [];
  const sc = 2.6;
  const X = (cm) => (cm + 90) * sc + 30;
  const y0 = 150;
  const m1 = X(0);
  const m2 = X(PAR.d);
  const top = 36;
  const bot = 200;
  p.push(hatch(m1, top, m1, bot, [-1, 0], 12, 9), hatch(m2, top, m2, bot, [1, 0], 12, 9));
  p.push(S.line(X(-95), y0 + 36, X(100), y0 + 36, { c: MUT, w: 0.8, dash: '3 4' }));
  const arrow = (cm, c, op, name, filled) => S.arrow(X(cm), y0 + 30, X(cm), y0 - 30, { c, w: 2.4, size: 8, dash: filled ? undefined : '4 3' }) + (name ? lab(X(cm), y0 + 52, name, { a: 'middle', size: 11, c }) : '');
  p.push(arrow(PAR.x0, GREEN, 1, 'O', true));
  if (withImages) {
    const a = PAR_IM.chainA;
    const b = PAR_IM.chainB;
    // behind M1 (x < 0): -10 (M1), -70 (from M2 image), -90, -150; behind M2: 70, 90, 150, 170
    const shown = [[a[0], 'I1', 0.95], [b[0], 'I2', 0.95], [b[1], 'I3', 0.6], [a[1], 'I4', 0.6]];
    shown.forEach(([cm, nm, op]) => p.push('<g opacity="' + op + '">' + arrow(cm, BLUE, 1, nm, false) + '</g>'));
    p.push(lab(m1, top - 8, 'M1', { a: 'middle', w: 'bold' }), lab(m2, top - 8, 'M2', { a: 'middle', w: 'bold' }));
    p.push(lab(14, 232, 'Later images are fainter. Further images (not drawn) continue on both sides without end.', { size: 11, c: MUT }));
  } else {
    p.push(lab(m1, top - 8, 'M1', { a: 'middle', w: 'bold' }), lab(m2, top - 8, 'M2', { a: 'middle', w: 'bold' }));
    p.push(S.arrow(X(0), y0 + 70, X(PAR.x0), y0 + 70, { w: 1.2, size: 6 }), S.arrow(X(PAR.x0), y0 + 70, X(0), y0 + 70, { w: 1.2, size: 6 }), lab((X(0) + X(PAR.x0)) / 2, y0 + 70 - 6, '10 cm', { a: 'middle', size: 11 }));
    p.push(S.arrow(X(PAR.x0), y0 + 100, X(PAR.d), y0 + 100, { w: 1.2, size: 6 }), S.arrow(X(PAR.d), y0 + 100, X(PAR.x0), y0 + 100, { w: 1.2, size: 6 }), lab((X(PAR.x0) + X(PAR.d)) / 2, y0 + 100 - 6, '30 cm', { a: 'middle', size: 11 }));
    p.push(lab(14, 278, 'Object O between two parallel plane mirrors M1 and M2, 40 cm apart.', { size: 11, c: MUT }));
  }
  const alt = withImages
    ? 'An object O between two parallel plane mirrors M1 and M2, with the images formed on each side drawn as dotted arrows getting fainter: I1 and I3 behind M1, I2 and I4 behind M2, and further images beyond'
    : 'An object O between two parallel plane mirrors M1 and M2 that are 40 centimetres apart; O is 10 centimetres from M1 and 30 centimetres from M2';
  return svgDoc(560, 290, alt, p.join(''));
}
export const PARALLEL_IMAGES = parallel({ withImages: true });
export const PARALLEL_PLAIN = parallel({ withImages: false });

// ---------------------------------------------------------------- 6. two inclined mirrors
function inclined({ theta, alpha, names }) {
  const p = [];
  const cx = 240;
  const cy = 204;
  const R = 74;
  const sx = (v) => cx + v[0] * R;
  const sy = (v) => cy - v[1] * R;
  const len = 150;
  const t = rad(theta);
  const e1 = [len, 0];
  const e2 = [len * Math.cos(t), len * Math.sin(t)];
  // mirrors (reflecting side inside the wedge), with the back hatched
  p.push(hatch(cx, cy, cx + e1[0], cy - e1[1], [0, 1], 16, 9));
  p.push(hatch(cx, cy, cx + e2[0], cy - e2[1], [-Math.sin(t), -Math.cos(t)], 16, 9));
  p.push(S.circle(cx, cy, R, { c: MUT, w: 1.2, dash: '4 4' }));
  const imgs = inclinedImages(theta, alpha);
  const obj = [Math.cos(rad(alpha)), Math.sin(rad(alpha))];
  p.push(S.circle(sx(obj), sy(obj), 5.5, { fill: GREEN, c: GREEN }), lab(sx(obj) + 8, sy(obj) - 8, 'O', { w: 'bold', c: GREEN }));
  imgs.forEach((im, k) => {
    const q = names[k];
    p.push(S.circle(sx(im.p), sy(im.p), 5, { c: BLUE, w: 1.8, dash: '3 2' }));
    const ox2 = sx(im.p) - cx;
    const oy2 = sy(im.p) - cy;
    const nn = Math.hypot(ox2, oy2) || 1;
    p.push(lab(sx(im.p) + (ox2 / nn) * 16 - 6, sy(im.p) + (oy2 / nn) * 16 + 5, q, { w: 'bold', c: BLUE, size: names[0].length > 1 ? 13 : 16 }));
  });
  p.push(lab(cx + len - 16, cy + 24, 'M1', { w: 'bold' }), lab(cx + e2[0] - 30, cy - e2[1] - 6, 'M2', { w: 'bold' }));
  p.push(arc(cx, cy, 40, 0, -t, MUT), lab(cx + 46, cy - 12, `${theta}°`, { size: 12, w: 'bold' }));
  void reflectOrigin;
  return { svg: p.join(''), n: imgs.length, imgs };
}
function inclinedDoc(theta, alpha, names, alt, h = 352) {
  const r0 = inclined({ theta, alpha, names });
  check(r0.n === names.length, `inclined ${theta}: ${r0.n} images`);
  return svgDoc(480, h, alt, r0.svg);
}
{
  // order of the 90 degree images: I1 in M1 (order 1, mirror 1), I2 in M2, I3 by two reflections
  const im = inclinedImages(90, 35);
  check(im.map((x) => x.order).join('') === '112', '90 degree images: two single and one double reflection');
}
export const INCL90 = inclinedDoc(90, 35, ['I1', 'I2', 'I3'], 'Two plane mirrors M1 and M2 at right angles with an object O between them. Three images are formed, I1 in M1, I2 in M2 and I3 formed by two reflections. The object and all the images lie on a circle drawn dotted about the point where the mirrors meet', 352);
export const INCL60 = inclinedDoc(60, 20, ['I1', 'I2', 'I3', 'I4', 'I5'], 'Two plane mirrors M1 and M2 inclined at 60 degrees with an object O between them. Five images I1 to I5 are formed and, with the object, all lie on a circle drawn dotted about the point where the mirrors meet', 352);
{
  // lettered version of the right-angle case: the image formed by two reflections is given a letter that is not the last
  const im = inclinedImages(90, 35);
  const letters = { 1: 'P', 2: 'R', 3: 'Q' };
  void letters;
  const names = im.map((x) => (x.order === 2 ? 'Q' : x.mirror === 1 ? 'R' : 'P'));
  check(names.join('').length === 3 && new Set(names).size === 3, 'lettered names distinct');
  var lettered = inclinedDoc(90, 35, names, 'Two plane mirrors M1 and M2 at right angles with an object O between them. Three images, lettered P, Q and R, are formed; the question asks which of them is formed by two reflections', 352);
  var DBL = names[im.findIndex((x) => x.order === 2)];
}
export const INCL90_LETTERED = lettered;
export const INCL90_DOUBLE = DBL;
export const INCL90_MIRROR1 = (() => {
  const im = inclinedImages(90, 35);
  return im.map((x) => (x.order === 2 ? 'Q' : x.mirror === 1 ? 'R' : 'P'))[im.findIndex((x) => x.mirror === 1 && x.order === 1)];
})();

// ---------------------------------------------------------------- 7. periscope
function periscope(lettered) {
  const p = [];
  const tx = 190; // tube axis
  const yTop = 70;
  const yBot = 230;
  p.push(S.rect(tx - 40, yTop - 40, 80, yBot - yTop + 80, { fill: FILL, fop: 0.5, sw: 2.2, rx: 4 }));
  // openings: left window at the top, right window at the bottom
  // each mirror is a segment perpendicular to the bisector of the incoming (reversed) and outgoing directions
  const mirrorLine = (inDir, outDir) => {
    const n = [outDir[0] - inDir[0], outDir[1] - inDir[1]];
    const nl = Math.hypot(...n);
    const nn = [n[0] / nl, n[1] / nl];
    return [-nn[1], nn[0]];
  };
  const m1 = mirrorLine([1, 0], [0, 1]);
  const m2 = mirrorLine([0, 1], [1, 0]);
  check(near(Math.abs(m1[0]), Math.SQRT1_2) && near(Math.abs(m1[1]), Math.SQRT1_2), 'periscope mirror at 45 degrees');
  const seg = (cx, cy, d, h) => [[cx - d[0] * h, cy - d[1] * h], [cx + d[0] * h, cy + d[1] * h]];
  const [a1, a2] = seg(tx, yTop, m1, 30);
  const [b1, b2] = seg(tx, yBot, m2, 30);
  p.push(S.line(a1[0], a1[1], a2[0], a2[1], { w: 4, c: BLUE }), S.line(b1[0], b1[1], b2[0], b2[1], { w: 4, c: BLUE }));
  // the ray: from the object (left) horizontally to the top mirror, down the tube, then out to the right to the eye
  const objX = 30;
  p.push(ray([objX, yTop], [tx, yTop], { c: RED, at: 0.45 }), ray([tx, yTop], [tx, yBot], { c: RED, at: 0.5 }), ray([tx, yBot], [tx + 150, yBot], { c: RED, at: 0.55 }));
  p.push(S.circle(objX - 8, yTop, 5, { fill: GREEN, c: GREEN }), S.circle(tx + 160, yBot, 7, { c: BLUE, sw: 1.8 }), S.circle(tx + 160, yBot, 2.5, { fill: BLUE, c: BLUE }));
  // 45 degree marks
  p.push(arc(tx, yTop, 24, Math.PI, Math.PI * 1.25, MUT));
  if (lettered) {
    p.push(lab(tx - 54, yTop - 34, 'A', { size: 16, w: 'bold' }), lab(tx - 54, yBot + 40, 'B', { size: 16, w: 'bold' }), lab(80, yTop - 10, 'C', { size: 16, w: 'bold' }));
    p.push(lab(tx + 8, 150, 'D', { size: 16, w: 'bold' }), lab(tx + 90, yBot - 10, 'E', { size: 16, w: 'bold' }));
  } else {
    p.push(lab(tx - 52, yTop - 36, 'top mirror', { a: 'end', size: 12 }), lab(tx - 52, yBot + 44, 'bottom mirror', { a: 'end', size: 12 }), lab(objX - 18, yTop - 14, 'object', { size: 12, c: GREEN, w: 'bold' }));
    p.push(lab(tx + 46, 150, 'ray along the tube', { size: 12 }), lab(tx + 160, yBot + 28, 'eye', { a: 'middle', size: 12, c: BLUE, w: 'bold' }));
  }
  const alt = lettered
    ? 'A periscope, a tube with two plane mirrors set at 45 degrees. A is the top mirror, B the bottom mirror, C the ray from the object, D the ray travelling along the tube and E the ray reaching the eye. The labels are letters only'
    : 'A periscope: a tube with two parallel plane mirrors, each at 45 degrees to the tube. A ray from the object is turned through a right angle by the top mirror, travels down the tube and is turned again by the bottom mirror towards the eye';
  return svgDoc(420, 300, alt, p.join(''));
}
export const PERI = periscope(false);
export const PERI_LETTERED = periscope(true);
