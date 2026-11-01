// SVG diagrams for ICSE 10 Biology ch11 Sense Organs: Eye and Ear. All new drawings.
// Ray diagrams are drawn only for myopia and hypermetropia (removed topic: ray diagrams of other defects).
import { svgDoc, S } from '../../icse-10-biology-ch01/src/lib.mjs';
import { FIELD } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const f = (n) => Math.round(n * 10) / 10;
const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const MUTED = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const YELLOW = 'var(--diagram-yellow)';
const BROWN = 'var(--diagram-brown)';
const GREEN = 'var(--diagram-green)';
const ACCENT = 'var(--diagram-accent)';
const deg = (d) => (d * Math.PI) / 180;

// ---------------------------------------------------------------- 1. vertical section of the eye (named and lettered)
function eye(lettered) {
  const p = [];
  const cx = 380, cy = 190, rx = 125, ry = 118;
  const P = (a, k = 1) => [cx + rx * k * Math.cos(deg(a)), cy + ry * k * Math.sin(deg(a))];
  const arc = (a0, a1, k) => {
    const [x1, y1] = P(a0, k);
    const [x2, y2] = P(a1, k);
    return `M${f(x1)} ${f(y1)} A${f(rx * k)} ${f(ry * k)} 0 1 1 ${f(x2)} ${f(y2)}`;
  };
  p.push(S.ellipse(cx, cy, rx * 0.9, ry * 0.9, { c: 'none', fill: BLUE, fop: 0.05, sw: 0 }));
  // optic nerve leaving near the back, below the yellow spot
  const [bx, by] = P(22, 0.9);
  p.push(S.path(`M${f(bx)} ${f(by)} L600 262`, { c: YELLOW, w: 18, op: 0.55, cap: 'butt' }));
  p.push(S.path(arc(-140, 140, 1), { w: 2.2 }));
  p.push(S.path(arc(-138, 138, 0.95), { c: BROWN, w: 4, op: 0.6 }));
  p.push(S.path(arc(-135, 135, 0.9), { c: RED, w: 2.5 }));
  // cornea with the aqueous humour behind it, and conjunctiva over the front
  const [c1x, c1y] = P(-140), [c2x, c2y] = P(140);
  p.push(S.path(`M${f(c1x)} ${f(c1y)} Q199 ${cy} ${f(c2x)} ${f(c2y)} Z`, { c: BLUE, fill: BLUE, fop: 0.12, w: 2 }));
  const [j1x, j1y] = P(-150), [j2x, j2y] = P(150);
  p.push(S.path(`M${f(j1x)} ${f(j1y)} Q186 ${cy} ${f(j2x)} ${f(j2y)}`, { c: MUTED, w: 1, dash: '3 2' }));
  // iris, pupil and lens with ciliary body and suspensory ligaments
  p.push(S.line(286, cy - 74, 286, cy - 24, { c: BROWN, w: 6 }), S.line(286, cy + 24, 286, cy + 74, { c: BROWN, w: 6 }));
  p.push(S.ellipse(306, cy, 15, 44, { c: BLUE, fill: BLUE, fop: 0.3, sw: 1.5 }));
  for (const s of [-1, 1]) {
    p.push(S.path(`M288 ${cy + s * 80} L302 ${cy + s * 86} L306 ${cy + s * 66} Z`, { c: RED, fill: RED, fop: 0.45, w: 1 }));
    for (const dx of [0, 6]) p.push(S.line(300 + dx, cy + s * 70, 304 + dx * 0.5, cy + s * 44, { c: MUTED, w: 1 }));
  }
  // yellow spot and blind spot
  const [yx, yy] = P(0, 0.9);
  p.push(S.ellipse(yx, yy, 4, 8, { c: YELLOW, fill: YELLOW, fop: 0.9, sw: 1 }));
  p.push(S.circle(bx, by, 5, { fill: 'currentColor', fop: 0.7, sw: 0 }));
  const o = lettered ? { size: 14, w: 'bold' } : {};
  const L = (x1, y1, tx, ty, s, side) => p.push(S.lead(x1, y1, side === 'L' ? tx + 4 : tx - 4, ty - 4), lab(tx, ty, s, { a: side === 'L' ? 'end' : 'start', ...o }));
  if (lettered) {
    L(245, 167, 190, 135, 'A', 'L');
    L(286, 240, 190, 240, 'B', 'L');
    L(306, 215, 190, 290, 'C', 'L');
    L(296, 108, 190, 40, 'D', 'L');
    L(bx, by, 560, 232, 'E', 'R');
  } else {
    L(296, 108, 190, 40, 'Ciliary body', 'L');
    L(304, 136, 190, 70, 'Suspensory ligament', 'L');
    L(240, 160, 190, 100, 'Conjunctiva', 'L');
    L(245, 167, 190, 135, 'Cornea', 'L');
    L(268, 186, 190, 168, 'Aqueous humour', 'L');
    L(287, 200, 190, 205, 'Pupil', 'L');
    L(286, 240, 190, 240, 'Iris', 'L');
    L(306, 215, 190, 290, 'Lens', 'L');
    const [sx, sy] = P(-60), [chx, chy] = P(-45, 0.95), [rx2, ry2] = P(-30, 0.9);
    L(sx, sy, 560, 40, 'Sclera', 'R');
    L(chx, chy, 560, 72, 'Choroid', 'R');
    L(rx2, ry2, 560, 104, 'Retina', 'R');
    L(420, 160, 560, 150, 'Vitreous humour', 'R');
    L(yx, yy, 560, 192, 'Yellow spot', 'R');
    L(bx, by, 560, 232, 'Blind spot', 'R');
    L(580, 256, 600, 300, 'Optic nerve', 'R');
  }
  const label = lettered
    ? 'Vertical section of the human eye, front on the left, with five parts lettered: A, the clear bulging front layer; B, the coloured ring of muscle in front of the lens with a gap at its centre; C, the transparent biconvex structure behind the gap; D, the small muscular body at the edge, joined to C by fine ligaments; E, the point at the back where the nerve leaves the eye'
    : 'Vertical section of the human eye, front on the left. From outside: the conjunctiva over the front, the transparent cornea, the aqueous humour behind it, the iris with the pupil at its centre, and the biconvex lens held by suspensory ligaments from the ciliary body. The wall has three layers: the white sclera, the dark choroid and the light-sensitive retina. The vitreous humour fills the main cavity. At the back are the yellow spot and, just below it, the blind spot where the optic nerve leaves';
  return svgDoc(720, 380, label, p.join(''));
}
export const EYE = eye(false);
export const EYE_LETTERED = eye(true);

// ---------------------------------------------------------------- 2. accommodation
export const ACCOM = (() => {
  const p = [];
  const panel = (cx, thick, near, title, cap) => {
    const ex = cx + 40, rr = 70;
    p.push(S.text(cx + 10, 22, title, { a: 'middle', size: 12, w: 'bold' }));
    p.push(S.circle(ex, 130, rr, { sw: 1.6 }), S.path(`M${ex - rr * 0.94} ${130 - rr * 0.34} A${rr} ${rr} 0 0 1 ${ex - rr * 0.94} ${130 + rr * 0.34}`, { c: RED, w: 2.5 }));
    const lx = ex - 52;
    p.push(S.ellipse(lx, 130, thick, 30, { c: BLUE, fill: BLUE, fop: 0.3, sw: 1.4 }));
    for (const s of [-1, 1]) p.push(S.rect(lx - 8, 130 + s * 46 - 6, 16, 12, { rx: 3, c: RED, fill: RED, fop: near ? 0.7 : 0.3, sw: 1 }), S.line(lx, 130 + s * 40, lx, 130 + s * 30, { c: MUTED, w: near ? 1 : 1.8, dash: near ? '2 2' : undefined }));
    const focus = [ex + rr, 130];
    for (const dy of [-18, 0, 18]) {
      const start = near ? [cx - 110, 130] : [cx - 110, 130 + dy];
      p.push(S.line(start[0], start[1], lx, 130 + dy, { c: ACCENT, w: 1.4 }), S.line(lx, 130 + dy, focus[0], focus[1], { c: ACCENT, w: 1.4 }));
    }
    if (near) p.push(S.line(cx - 110, 112, cx - 110, 148, { w: 2 }), S.head(cx - 110, 108, -Math.PI / 2, { size: 7 }), lab(cx - 130, 168, 'near object'));
    else p.push(lab(cx - 110, 52, 'parallel rays from a far object'));
    cap.forEach((s, i) => p.push(S.text(cx + 10, 228 + i * 14, s, { a: 'middle', size: 11 })));
  };
  panel(150, 7, false, 'Looking at a distant object', ['Ciliary muscles relax; ligaments pulled tight;', 'lens thin and flatter (longer focal length)']);
  panel(470, 16, true, 'Looking at a near object', ['Ciliary muscles contract; ligaments slacken;', 'lens thicker and more convex (shorter focal length)']);
  p.push(lab(10, 262, 'Red blocks: ciliary muscles. In both cases a sharp image falls on the retina.', { c: MUTED }));
  return svgDoc(640, 270, 'Accommodation. Left: for a distant object, parallel rays enter; the ciliary muscles relax, the suspensory ligaments are pulled tight and the lens is thin, focusing the rays on the retina. Right: for a near object, diverging rays enter; the ciliary muscles contract, the ligaments slacken and the lens becomes thicker and more convex, again focusing the rays on the retina', p.join(''));
})();

// ---------------------------------------------------------------- 3 and 4. ray diagrams for myopia and hypermetropia
const concave = (x, h = 40) => S.path(`M${x - 8} ${120 - h} L${x + 8} ${120 - h} Q${x + 1} 120 ${x + 8} ${120 + h} L${x - 8} ${120 + h} Q${x - 1} 120 ${x - 8} ${120 - h} Z`, { c: BLUE, fill: BLUE, fop: 0.25, w: 1.4 });
const convex = (x, h = 40) => S.ellipse(x, 120, 9, h, { c: BLUE, fill: BLUE, fop: 0.25, sw: 1.4 });
const eyeball = (cx, rx) => S.ellipse(cx, 120, rx, 70, { sw: 1.6 }) + S.path(`M${cx + rx * 0.6} ${120 - 70 * 0.8} A${rx} 70 0 0 1 ${cx + rx * 0.6} ${120 + 70 * 0.8}`, { c: RED, w: 2.5 });
const ray = (pts, o = {}) => S.path(`M${pts.map(([x, y]) => `${f(x)} ${f(y)}`).join(' L')}`, { c: ACCENT, w: 1.4, ...o });

export const MYOPIA = (() => {
  const p = [];
  // (a) myopic eye: long eyeball, image in front of the retina
  const e1 = 165, r1 = 95, lens1 = e1 - 75, ret1 = e1 + r1;
  p.push(S.text(150, 22, '(a) Myopic eye', { a: 'middle', size: 12, w: 'bold' }), eyeball(e1, r1), convex(lens1, 30));
  const F1 = [ret1 - 40, 120];
  for (const dy of [-20, 0, 20]) {
    const t = (ret1 - lens1) / (F1[0] - lens1);
    p.push(ray([[10, 120 + dy], [lens1, 120 + dy], [ret1, 120 + dy - dy * t]]));
  }
  p.push(S.circle(F1[0], F1[1], 3, { fill: ACCENT, sw: 0 }), lab(F1[0] - 30, 214, 'image in front of retina'), S.lead(F1[0], 124, F1[0] - 6, 202));
  p.push(lab(10, 236, 'Parallel rays from a distant object', { c: MUTED }));
  // (b) corrected with a concave lens
  const e2 = 520, r2 = 95, lens2 = e2 - 75, ret2 = e2 + r2, cl = 345;
  p.push(S.text(490, 22, '(b) Corrected with a concave lens', { a: 'middle', size: 12, w: 'bold' }), eyeball(e2, r2), convex(lens2, 30), concave(cl));
  for (const dy of [-20, 0, 20]) {
    const y2 = 120 + dy * 1.6;
    p.push(ray([[285, 120 + dy], [cl, 120 + dy], [lens2, y2], [ret2, 120]]));
  }
  p.push(S.circle(ret2, 120, 3, { fill: ACCENT, sw: 0 }), lab(ret2 - 70, 214, 'image on the retina'), S.lead(ret2, 124, ret2 - 30, 202));
  p.push(lab(cl - 24, 182, 'concave lens'));
  return svgDoc(640, 246, 'Myopia (short-sightedness). (a) In a myopic eye the eyeball is too long, so parallel rays from a distant object meet in front of the retina and a blurred image forms. (b) A concave lens in front of the eye spreads the rays out a little so that the eye lens brings them to a focus on the retina', p.join(''));
})();

export const HYPER = (() => {
  const p = [];
  // (a) hypermetropic eye: short eyeball, image behind the retina
  const e1 = 175, r1 = 62, lens1 = e1 - 45, ret1 = e1 + r1, src = 30;
  const F1 = [ret1 + 46, 120];
  p.push(S.text(150, 22, '(a) Hypermetropic eye', { a: 'middle', size: 12, w: 'bold' }), eyeball(e1, r1), convex(lens1, 28));
  p.push(S.line(src, 104, src, 136, { w: 2 }), S.head(src, 100, -Math.PI / 2, { size: 7 }), lab(src - 14, 156, 'near object'));
  for (const dy of [-18, 0, 18]) {
    const t = (ret1 - lens1) / (F1[0] - lens1);
    const yr = 120 + dy - dy * t;
    p.push(ray([[src, 120], [lens1, 120 + dy], [ret1, yr]]), ray([[ret1, yr], F1], { dash: '3 3' }));
  }
  p.push(S.circle(F1[0], F1[1], 3, { fill: ACCENT, sw: 0 }), lab(F1[0] - 60, 214, 'image would form behind retina'), S.lead(F1[0], 124, F1[0] - 10, 202));
  // (b) corrected with a convex lens
  const e2 = 535, r2 = 62, lens2 = e2 - 45, ret2 = e2 + r2, cl = 400, src2 = 330;
  p.push(S.text(490, 22, '(b) Corrected with a convex lens', { a: 'middle', size: 12, w: 'bold' }), eyeball(e2, r2), convex(lens2, 28), convex(cl, 40));
  p.push(S.line(src2, 104, src2, 136, { w: 2 }), S.head(src2, 100, -Math.PI / 2, { size: 7 }));
  for (const dy of [-18, 0, 18]) p.push(ray([[src2, 120], [cl, 120 + dy * 1.3], [lens2, 120 + dy * 1.15], [ret2, 120]]));
  p.push(S.circle(ret2, 120, 3, { fill: ACCENT, sw: 0 }), lab(ret2 - 70, 214, 'image on the retina'), S.lead(ret2, 124, ret2 - 30, 202), lab(cl - 22, 182, 'convex lens'));
  return svgDoc(640, 236, 'Hypermetropia (long-sightedness). (a) In a hypermetropic eye the eyeball is too short, so rays from a near object would meet behind the retina, and the image on the retina is blurred. (b) A convex lens in front of the eye bends the rays inwards so that they meet on the retina', p.join(''));
})();

// ---------------------------------------------------------------- 5. internal structure of the ear (named and lettered)
function ear(lettered) {
  const p = [];
  // pinna and auditory canal
  p.push(S.path('M70 40 C20 50 18 150 40 210 C52 250 80 268 96 240 C104 222 86 210 84 190 L92 176 L92 144 C110 120 112 60 70 40 Z', { c: BROWN, fill: BROWN, fop: 0.2, w: 1.6 }));
  p.push(S.path('M92 144 C140 140 190 132 226 128', { w: 1.6 }), S.path('M92 176 C140 176 190 184 230 190', { w: 1.6 }));
  for (const x of [120, 150, 180]) p.push(S.circle(x, 146, 2, { fill: YELLOW, sw: 0 }));
  // tympanum
  p.push(S.line(226, 124, 236, 196, { c: RED, w: 3.5 }));
  // middle ear cavity and ossicles
  p.push(S.path('M236 110 L330 110 L330 214 L300 214 L236 200 Z', { c: MUTED, w: 1, fill: FILL, fop: 0.6 }));
  p.push(S.path('M234 160 L246 132 L262 126', { w: 5, cap: 'round', join: 'round' }), S.circle(264, 126, 6, { fill: 'currentColor', fop: 0.8, sw: 0 }));
  p.push(S.path('M268 124 L290 128 L282 156', { w: 5, cap: 'round', join: 'round' }));
  p.push(S.path('M284 156 L300 150 M300 150 L318 140 L330 150 L318 160 L300 150', { w: 3, join: 'round' }));
  // Eustachian tube
  p.push(S.path('M300 214 C312 250 330 280 370 318', { c: GREEN, w: 12, op: 0.35, cap: 'round' }), S.path('M300 214 C312 250 330 280 370 318', { c: GREEN, w: 1.2 }));
  // inner ear: vestibule, semicircular canals, cochlea
  p.push(S.ellipse(352, 150, 24, 18, { c: BLUE, fill: BLUE, fop: 0.2, sw: 1.5 }));
  p.push(S.path('M340 136 C320 70 380 40 392 100 C396 120 380 132 368 138', { c: BLUE, w: 7, op: 0.35 }));
  p.push(S.path('M356 134 C372 60 452 66 430 120 C420 140 392 146 374 146', { c: BLUE, w: 7, op: 0.35 }));
  p.push(S.path('M370 156 C430 150 456 112 420 96 C392 86 366 118 360 136', { c: BLUE, w: 7, op: 0.35 }));
  let d = 'M366 166';
  for (let t = 0; t <= 4.6 * Math.PI; t += 0.2) {
    const rr = 36 - t * 2.3;
    d += ` L${f(395 + rr * Math.cos(t))} ${f(210 + rr * Math.sin(t))}`;
  }
  p.push(S.path(d, { c: BLUE, w: 8, op: 0.35, join: 'round' }), S.path(d, { c: BLUE, w: 1.2, join: 'round' }));
  // auditory nerve
  p.push(S.path('M420 186 C460 180 500 176 560 176', { c: YELLOW, w: 7, op: 0.6 }), S.path('M410 140 C450 150 480 170 500 176', { c: YELLOW, w: 4, op: 0.6 }));
  const o = lettered ? { size: 14, w: 'bold' } : {};
  const L = (x1, y1, x2, y2, tx, ty, s, a = 'start') => p.push(S.lead(x1, y1, x2, y2), lab(tx, ty, s, { a, ...o }));
  if (lettered) {
    L(232, 170, 200, 260, 196, 274, 'A', 'middle');
    L(282, 140, 280, 60, 280, 52, 'B', 'middle');
    L(330, 290, 260, 318, 252, 322, 'C', 'end');
    L(410, 70, 470, 40, 474, 44, 'D');
    L(400, 230, 480, 260, 484, 264, 'E');
  } else {
    L(40, 120, 20, 290, 20, 302, 'Pinna', 'middle');
    L(150, 160, 150, 300, 150, 312, 'Auditory canal', 'middle');
    L(232, 170, 236, 270, 236, 282, 'Tympanum (ear drum)', 'middle');
    L(246, 134, 210, 70, 206, 66, 'Malleus', 'end');
    L(280, 128, 280, 60, 280, 52, 'Incus', 'middle');
    L(318, 150, 330, 30, 330, 22, 'Stapes', 'middle');
    L(330, 290, 260, 330, 256, 334, 'Eustachian tube (to throat)', 'end');
    L(410, 70, 470, 40, 474, 44, 'Semicircular canals');
    L(372, 152, 480, 110, 484, 114, 'Vestibule');
    L(400, 230, 480, 260, 484, 264, 'Cochlea');
    L(520, 176, 540, 210, 544, 222, 'Auditory nerve');
  }
  const label = lettered
    ? 'Internal structure of the human ear with five parts lettered: A, the thin membrane at the inner end of the canal from the outer ear; B, the chain of three tiny bones in the air-filled middle ear; C, the tube running down from the middle ear; D, the three looped tubes of the inner ear; E, the coiled, snail-shaped tube of the inner ear'
    : 'Internal structure of the human ear. The outer ear is the pinna and the auditory canal, which ends at the tympanum (ear drum). The air-filled middle ear contains three ossicles, the malleus, incus and stapes, and is joined to the throat by the Eustachian tube. The inner ear has the vestibule, three semicircular canals and the coiled cochlea, from which the auditory nerve runs to the brain';
  return svgDoc(640, 345, label, p.join(''));
}
export const EAR = ear(false);
export const EAR_LETTERED = ear(true);

// ---------------------------------------------------------------- 6. pupil in bright and dim light
export const PUPIL = (() => {
  const p = [];
  const one = (cx, pr, title, cap) => {
    p.push(S.text(cx, 22, title, { a: 'middle', size: 12, w: 'bold' }));
    p.push(S.ellipse(cx, 100, 90, 52, { sw: 1.5 }), S.circle(cx, 100, 46, { c: BROWN, fill: BROWN, fop: 0.35, sw: 1.2 }));
    for (let i = 0; i < 16; i++) {
      const a = (i * Math.PI) / 8;
      p.push(S.line(cx + (pr + 3) * Math.cos(a), 100 + (pr + 3) * Math.sin(a), cx + 44 * Math.cos(a), 100 + 44 * Math.sin(a), { c: BROWN, w: 0.8 }));
    }
    p.push(S.circle(cx, 100, pr, { fill: 'currentColor', fop: 0.9, sw: 0 }));
    cap.forEach((s, i) => p.push(S.text(cx, 178 + i * 14, s, { a: 'middle', size: 11 })));
  };
  one(130, 9, 'Bright light', ['Circular muscles of the iris contract:', 'pupil becomes small']);
  one(390, 27, 'Dim light', ['Radial muscles of the iris contract:', 'pupil becomes large']);
  return svgDoc(520, 214, 'The pupil adjusts to light. In bright light the circular muscles of the iris contract and the pupil becomes small, letting in less light. In dim light the radial muscles of the iris contract and the pupil becomes large, letting in more light', p.join(''));
})();

// ---------------------------------------------------------------- 7. fields of view and stereoscopic vision
export const FIELDS = (() => {
  const p = [];
  const hx = 260, hy = 250, R = 190;
  const toXY = (ox, a) => [ox + R * Math.sin(deg(a)), hy - 34 - R * Math.cos(deg(a))];
  const wedge = (ox, a0, a1, col) => {
    const [x0, y0] = toXY(ox, a0);
    const [x1, y1] = toXY(ox, a1);
    return S.path(`M${ox} ${hy - 34} L${f(x0)} ${f(y0)} A${R} ${R} 0 0 1 ${f(x1)} ${f(y1)} Z`, { c: col, fill: col, fop: 0.15, w: 1 });
  };
  p.push(wedge(hx - 16, FIELD.leftFrom, FIELD.leftTo, BLUE), wedge(hx + 16, FIELD.rightFrom, FIELD.rightTo, GREEN));
  p.push(S.circle(hx, hy, 40, { fill: FILL, fop: 1, sw: 1.6 }), S.circle(hx - 16, hy - 34, 6, { fill: 'currentColor', sw: 0 }), S.circle(hx + 16, hy - 34, 6, { fill: 'currentColor', sw: 0 }));
  p.push(S.text(hx, 120, `Seen by both eyes: ${FIELD.overlap}°`, { a: 'middle', size: 12, w: 'bold' }), S.text(hx, 136, '(stereoscopic vision)', { a: 'middle', size: 11 }));
  p.push(lab(14, 200, 'Left eye only', { c: BLUE }), S.text(506, 200, 'Right eye only', { a: 'end', size: 11, c: GREEN }));
  p.push(lab(14, 322, `Each eye sees about ${FIELD.each}°; together about ${FIELD.total}°.`, { c: MUTED }));
  return svgDoc(520, 332, `Top view of a human head with two forward-facing eyes. Each eye has a field of view of about ${FIELD.each} degrees; together they cover about ${FIELD.total} degrees. The two fields overlap over about ${FIELD.overlap} degrees in front, where both eyes see the same scene from slightly different angles, giving stereoscopic vision`, p.join(''));
})();
