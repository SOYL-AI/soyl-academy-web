// SVG diagrams for ICSE 9 Biology ch07 Diversity in the Animal Kingdom. All drawn with the S helpers and palette colours only.
import { svgDoc, S } from '../../icse-9-biology-ch01/src/lib.mjs';

/** Label with a muted leader. side 'l' text ends at (x, y); 'r' starts at (x, y); 'c' centred above target; 'b' centred below target. */
function label(parts, text, x, y, tx, ty, side, o = {}) {
  const gap = side === 'l' ? 4 : side === 'r' ? -4 : 0;
  parts.push(S.lead(x + gap, y - (side === 'c' ? -4 : side === 'b' ? 14 : 4), tx, ty));
  parts.push(S.text(x, y, text, { a: side === 'l' ? 'end' : side === 'r' ? 'start' : 'middle', size: o.size ?? 11, w: o.w }));
}
const head = (parts, x, y, t) => parts.push(S.text(x, y, t, { a: 'middle', size: 12, w: 'bold' }));
const box = (parts, x, y, w, h, t, { fill = 'var(--diagram-fill)', size = 11, bold = false } = {}) => {
  parts.push(S.rect(x, y, w, h, { fill, fop: fill === 'var(--diagram-fill)' ? 1 : 0.25, sw: 1.3, rx: 5 }));
  parts.push(S.text(x + w / 2, y + h / 2 + 4, t, { a: 'middle', size, w: bold ? 'bold' : undefined }));
};

// ---------------------------------------------------------------- 1. the animal kingdom in two groups
export const TREE = (() => {
  const p = [];
  box(p, 220, 10, 200, 30, 'Kingdom Animalia', { fill: 'var(--diagram-accent)', bold: true, size: 13 });
  p.push(S.line(320, 40, 320, 56, {}), S.line(150, 56, 490, 56, {}), S.line(150, 56, 150, 72, {}), S.line(490, 56, 490, 72, {}));
  box(p, 40, 72, 220, 34, 'Non-chordates: no notochord', { fill: 'var(--diagram-blue)', bold: true });
  box(p, 380, 72, 220, 34, 'Chordates: notochord present', { fill: 'var(--diagram-green)', bold: true });
  const left = ['Porifera', 'Coelenterata', 'Platyhelminthes', 'Nemathelminthes', 'Annelida', 'Arthropoda', 'Mollusca', 'Echinodermata'];
  left.forEach((t, i) => {
    box(p, 36 + (i % 2) * 118, 124 + Math.floor(i / 2) * 36, 112, 28, t, { size: 10.5 });
  });
  p.push(S.line(150, 106, 150, 124, { c: 'var(--diagram-muted)', w: 1 }));
  const right = ['Pisces', 'Amphibia', 'Reptilia', 'Aves', 'Mammalia'];
  right.forEach((t, i) => {
    box(p, 376 + (i % 2) * 118, 124 + Math.floor(i / 2) * 36, 112, 28, t, { size: 11 });
  });
  p.push(S.line(490, 106, 490, 124, { c: 'var(--diagram-muted)', w: 1 }));
  p.push(S.text(320, 290, 'Eight non-chordate phyla and five classes of chordates (vertebrates)', { a: 'middle', size: 11, c: 'var(--diagram-muted)' }));
  return svgDoc(640, 302, 'The animal kingdom divided into non-chordates, with eight phyla named, and chordates, with five classes named: Pisces, Amphibia, Reptilia, Aves and Mammalia', p.join(''));
})();

// ---------------------------------------------------------------- 2. three kinds of body cavity (cross-sections of a worm)
export const COELOM = (() => {
  const p = [];
  const cy = 120;
  const R = 62;
  const panel = (cx, kind, title, sub) => {
    if (kind === 'a') p.push(S.circle(cx, cy, R, { fill: 'var(--diagram-brown)', fop: 0.3, sw: 2 }));
    else p.push(S.circle(cx, cy, R, { fill: 'var(--diagram-fill)', fop: 0.6, sw: 2 }));
    if (kind === 'c') {
      p.push(S.circle(cx, cy, R - 7, { c: 'var(--diagram-green)', sw: 2.2 }));
      p.push(S.circle(cx, cy, 30, { c: 'var(--diagram-green)', sw: 2.2 }));
    }
    p.push(S.circle(cx, cy, 20, { fill: 'var(--diagram-yellow)', fop: 0.6, sw: 1.6 }));
    head(p, cx, 212, title);
    p.push(S.text(cx, 228, sub, { a: 'middle', size: 11, c: 'var(--diagram-muted)' }));
  };
  panel(110, 'a', 'No body cavity', 'solid tissue around the gut');
  panel(320, 'b', 'False body cavity', 'cavity, gut not lined');
  panel(530, 'c', 'True body cavity (coelom)', 'cavity lined all round');
  label(p, 'Body wall', 16, 36, 70, 82, 'r');
  label(p, 'Gut', 70, 190, 104, 128, 'r');
  label(p, 'Cavity', 346, 36, 340, 94, 'r');
  label(p, 'Gut', 270, 190, 312, 128, 'r');
  label(p, 'Lining of the cavity', 490, 36, 505, 66, 'c');
  label(p, 'Gut', 590, 190, 540, 128, 'r');
  p.push(S.text(110, 250, 'Platyhelminthes', { a: 'middle', size: 11 }), S.text(320, 250, 'Nemathelminthes', { a: 'middle', size: 11 }), S.text(530, 250, 'Annelida and others', { a: 'middle', size: 11 }));
  return svgDoc(640, 262, 'Three round cross-sections of worms: in the first the gut is surrounded by solid tissue and there is no body cavity; in the second there is a cavity between body wall and gut but it is not fully lined; in the third a true cavity, the coelom, is lined all round and surrounds the gut', p.join(''));
})();

// ---------------------------------------------------------------- 3. a sponge and a Hydra
export const SPONGE_HYDRA = (() => {
  const p = [];
  head(p, 140, 18, 'A sponge (Porifera)');
  head(p, 480, 18, 'Hydra (Coelenterata)');
  // sponge
  p.push(S.path('M100 250 C88 200 84 150 102 112 L178 112 C196 150 192 200 180 250 Z', { fill: 'var(--diagram-yellow)', fop: 0.25, sw: 2 }));
  p.push(S.ellipse(140, 112, 38, 9, { fill: 'var(--diagram-fill)', sw: 2 }));
  p.push(S.ellipse(140, 184, 20, 64, { fill: 'var(--diagram-fill)', fop: 0.8, sw: 1.2 }));
  for (const [x, y] of [[96, 150], [95, 190], [101, 226], [184, 150], [186, 190], [180, 226]]) p.push(S.circle(x, y, 3.2, { fill: 'var(--diagram-brown)', sw: 0 }));
  for (const [x1, y1, x2, y2] of [[110, 160, 118, 172], [166, 200, 160, 212], [112, 214, 120, 222], [168, 138, 162, 148]]) p.push(S.line(x1, y1, x2, y2, { c: 'var(--diagram-brown)', w: 1.8 }));
  label(p, 'Osculum', 230, 84, 160, 110, 'r');
  label(p, 'Pore', 40, 150, 94, 150, 'l');
  label(p, 'Central cavity', 232, 184, 156, 184, 'r');
  label(p, 'Spicule', 40, 226, 110, 218, 'l');
  p.push(S.text(140, 282, 'Fixed to a rock; water enters by pores', { a: 'middle', size: 11, c: 'var(--diagram-muted)' }));
  // hydra
  p.push(S.rect(458, 100, 44, 130, { fill: 'var(--diagram-green)', fop: 0.2, sw: 2, rx: 14 }));
  p.push(S.rect(466, 108, 28, 114, { c: 'var(--diagram-muted)', sw: 1, fill: 'var(--diagram-fill)', fop: 0.7, rx: 9 }));
  p.push(S.ellipse(480, 94, 10, 7, { fill: 'var(--diagram-red)', fop: 0.4, sw: 1.6 }));
  for (const [dx, c1, c2] of [[-1, 40, 60], [-1, 26, 24], [-1, 12, 60], [1, 12, 60], [1, 26, 24], [1, 40, 60]]) {
    p.push(S.path(`M${480 + dx * 6} 90 C${480 + dx * c1} ${90 - 28} ${480 + dx * (c1 + 8)} ${90 - 8} ${480 + dx * c2} ${52 + (c2 % 3) * 6}`, { c: 'var(--diagram-green)', w: 2.4 }));
  }
  p.push(S.ellipse(480, 238, 28, 7, { fill: 'var(--diagram-brown)', fop: 0.35, sw: 1.6 }));
  p.push(S.ellipse(508, 168, 10, 14, { fill: 'var(--diagram-green)', fop: 0.3, sw: 1.5 }));
  label(p, 'Tentacle', 400, 50, 440, 62, 'l');
  label(p, 'Mouth', 400, 100, 470, 94, 'l');
  label(p, 'Two cell layers in the body wall', 410, 150, 460, 150, 'l');
  label(p, 'Basal disc', 400, 236, 454, 238, 'l');
  label(p, 'Bud', 560, 190, 518, 172, 'r');
  // cnidoblast enlargement
  p.push(S.circle(590, 70, 24, { fill: 'var(--diagram-yellow)', fop: 0.2, sw: 1.6 }));
  p.push(S.path('M590 86 C576 80 604 74 580 68 C600 62 578 56 592 52', { c: 'var(--diagram-red)', w: 1.8 }));
  p.push(S.line(540, 56, 566, 66, { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }));
  p.push(S.text(590, 112, 'Cnidoblast', { a: 'middle', size: 11 }), S.text(590, 125, '(stinging cell)', { a: 'middle', size: 10.5, c: 'var(--diagram-muted)' }));
  p.push(S.text(480, 282, 'One opening is both mouth and anus', { a: 'middle', size: 11, c: 'var(--diagram-muted)' }));
  return svgDoc(640, 292, 'A vase-shaped sponge with pores in its wall, a large opening called the osculum at the top, a central cavity and spicules; and a Hydra with a tube-like body, a mouth ringed by tentacles, a basal disc, a bud, and an enlarged stinging cell called a cnidoblast', p.join(''));
})();

// ---------------------------------------------------------------- 4. an insect (named and lettered)
function insect(lettered) {
  const p = [];
  const L = lettered ? { head: 'A', ant: 'B', thorax: 'C', abd: 'D', wing: 'E' } : { head: 'Head', ant: 'Antenna', thorax: 'Thorax', abd: 'Abdomen', wing: 'Wing' };
  const o = lettered ? { size: 14, w: 'bold' } : {};
  p.push(S.path('M268 130 C280 80 360 60 410 84 C380 110 320 130 290 136 Z', { fill: 'var(--diagram-blue)', fop: 0.18, sw: 1.6 }));
  for (const [x0, x1, kx] of [[240, 214, 222], [268, 262, 262], [296, 322, 316]]) p.push(S.path(`M${x0} 170 L${kx} 205 L${x1} 244`, { c: 'var(--diagram-brown)', w: 2.4 }));
  p.push(S.ellipse(398, 150, 76, 28, { fill: 'var(--diagram-yellow)', fop: 0.3, sw: 1.8 }));
  for (const x of [358, 388, 418, 448]) p.push(S.line(x, 124, x, 176, { c: 'var(--diagram-muted)', w: 1 }));
  p.push(S.ellipse(268, 150, 40, 26, { fill: 'var(--diagram-green)', fop: 0.28, sw: 1.8 }));
  p.push(S.circle(190, 150, 27, { fill: 'var(--diagram-red)', fop: 0.22, sw: 1.8 }));
  p.push(S.circle(180, 142, 6, { fill: 'var(--diagram-brown)', sw: 0 }));
  p.push(S.path('M178 126 C168 104 150 92 132 94', { c: 'var(--diagram-brown)', w: 1.8 }));
  p.push(S.path('M190 124 C192 100 180 84 166 76', { c: 'var(--diagram-brown)', w: 1.8 }));
  label(p, L.head, 90, 170, 164, 158, 'l', o);
  label(p, L.ant, 110, 70, 140, 94, 'l', o);
  label(p, L.thorax, 236, 56, 252, 126, 'c', o);
  label(p, L.abd, 440, 232, 420, 176, 'c', o);
  label(p, L.wing, 350, 40, 340, 80, 'c', o);
  if (!lettered) {
    label(p, 'Compound eye', 110, 128, 176, 140, 'l');
    label(p, 'Jointed leg', 190, 268, 216, 238, 'l');
    p.push(S.text(450, 262, 'Segmented body in three regions', { a: 'middle', size: 11, c: 'var(--diagram-muted)' }));
  }
  const name = lettered
    ? 'An insect with parts lettered A to E: A, the small round front region bearing a large eye; B, a thin feeler on the front region; C, the middle region that carries the legs and the wing; D, the long rear region ringed with segments; E, a flat membranous structure on the middle region'
    : 'An insect in side view: a head with compound eye and antennae, a thorax bearing three pairs of jointed legs and a wing, and a segmented abdomen';
  return svgDoc(640, 282, name, p.join(''));
}
export const INSECT = insect(false);
export const INSECT_LETTERED = insect(true);

// ---------------------------------------------------------------- 5. the heart in the five classes of vertebrates
export const HEARTS = (() => {
  const p = [];
  const cols = [['Pisces', 1, 1, 'fish'], ['Amphibia', 2, 1, 'frog'], ['Reptilia', 2, 1, 'lizard'], ['Aves', 2, 2, 'bird'], ['Mammalia', 2, 2, 'rabbit']];
  cols.forEach(([name, at, vt, ex], i) => {
    const x = 20 + i * 122;
    head(p, x + 55, 22, name);
    p.push(S.text(x + 55, 38, ex, { a: 'middle', size: 11, c: 'var(--diagram-muted)', it: true }));
    for (let k = 0; k < at; k++) p.push(S.rect(x + k * 58, 54, at === 2 ? 52 : 110, 44, { fill: 'var(--diagram-blue)', fop: 0.25, sw: 1.6, rx: 8 }));
    for (let k = 0; k < vt; k++) p.push(S.rect(x + k * 58, 106, vt === 2 ? 52 : 110, 70, { fill: 'var(--diagram-red)', fop: 0.25, sw: 1.6, rx: 8 }));
    if (name === 'Reptilia') p.push(S.line(x + 55, 108, x + 55, 142, { c: 'var(--diagram-red)', w: 1.5, dash: '4 3' }));
    p.push(S.text(x + 55, 198, `${at + vt} chambers`, { a: 'middle', size: 12, w: 'bold' }));
  });
  p.push(S.rect(20, 220, 14, 12, { fill: 'var(--diagram-blue)', fop: 0.25, sw: 1.4 }), S.text(40, 231, 'Atrium (receives blood)', { size: 11 }));
  p.push(S.rect(210, 220, 14, 12, { fill: 'var(--diagram-red)', fop: 0.25, sw: 1.4 }), S.text(230, 231, 'Ventricle (pumps blood out)', { size: 11 }));
  p.push(S.text(410, 231, 'Dashed line: ventricle only partly divided', { size: 11, c: 'var(--diagram-muted)' }));
  return svgDoc(640, 246, 'Chambers of the heart in five classes of vertebrates drawn as blocks: fish have one atrium and one ventricle, amphibians and reptiles have two atria and one ventricle with the reptile ventricle partly divided, birds and mammals have two atria and two ventricles', p.join(''));
})();

// ---------------------------------------------------------------- 6. a starfish and a snail
export const STAR_SNAIL = (() => {
  const p = [];
  head(p, 150, 18, 'Starfish (Echinodermata)');
  head(p, 480, 18, 'Snail (Mollusca)');
  const cx = 150;
  const cy = 150;
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const rr = i % 2 === 0 ? 108 : 34;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    pts.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)]);
  }
  p.push(S.path('M' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L') + ' Z', { fill: 'var(--diagram-red)', fop: 0.2, sw: 2, join: 'round' }));
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    for (let k = 1; k <= 4; k++) {
      const d = 22 + k * 15;
      p.push(S.circle(cx + d * Math.cos(a), cy + d * Math.sin(a), 2.6, { fill: 'var(--diagram-brown)', sw: 0 }));
    }
  }
  p.push(S.circle(cx, cy, 10, { fill: 'var(--diagram-yellow)', fop: 0.6, sw: 1.6 }));
  label(p, 'Arm', 262, 100, 236, 120, 'r');
  label(p, 'Tube feet', 262, 150, 186, 150, 'r');
  label(p, 'Mouth (underside)', 30, 268, 142, 155, 'r');
  p.push(S.text(150, 288, 'Five arms; spiny skin', { a: 'middle', size: 11, c: 'var(--diagram-muted)' }));
  // snail
  p.push(S.path('M392 232 C392 218 500 218 560 224 C588 226 590 240 560 242 L396 244 C390 244 392 238 392 232 Z', { fill: 'var(--diagram-green)', fop: 0.3, sw: 1.8 }));
  p.push(S.circle(470, 168, 52, { fill: 'var(--diagram-brown)', fop: 0.22, sw: 2 }));
  p.push(S.path('M470 168 C478 168 480 158 470 156 C456 154 450 170 462 180 C478 192 498 176 492 158 C486 138 456 136 446 154', { c: 'var(--diagram-brown)', w: 1.8 }));
  p.push(S.path('M552 224 C566 208 568 192 560 182', { c: 'var(--diagram-green)', w: 2.4 }));
  p.push(S.line(566, 186, 580, 166, { c: 'var(--diagram-green)', w: 2 }), S.circle(582, 163, 3, { fill: 'var(--diagram-brown)', sw: 0 }));
  p.push(S.line(560, 186, 546, 168, { c: 'var(--diagram-green)', w: 2 }), S.circle(545, 165, 3, { fill: 'var(--diagram-brown)', sw: 0 }));
  label(p, 'Shell', 392, 118, 438, 142, 'l');
  label(p, 'Tentacle', 596, 128, 584, 160, 'c');
  label(p, 'Muscular foot', 420, 272, 450, 240, 'b');
  p.push(S.text(500, 288, 'Soft body, usually with a shell', { a: 'middle', size: 11, c: 'var(--diagram-muted)' }));
  return svgDoc(640, 298, 'A starfish seen from above with five arms bearing rows of tube feet and a spiny skin, and a snail with a coiled shell, a soft body, tentacles and a muscular foot', p.join(''));
})();
