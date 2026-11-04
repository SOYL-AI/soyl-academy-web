// SVG diagrams for ICSE 9 Biology ch12 The Skin. All new drawings, palette colours only.
import { svgDoc, S } from '../../icse-9-biology-ch01/src/lib.mjs';

const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const YEL = 'var(--diagram-yellow)';
const BROWN = 'var(--diagram-brown)';
const RED = 'var(--diagram-red)';
const MUTED = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';

// ---------------------------------------------------------------- 1. vertical section of human skin (named, and lettered A-E)
function skin(lettered) {
  const p = [];
  const o = lettered ? { size: 15, w: 'bold' } : { size: 11 };
  // layers
  p.push(S.rect(150, 70, 300, 12, { c: YEL, fill: YEL, fop: 0.35, sw: 1.4 }));
  p.push(S.rect(150, 82, 300, 30, { c: BROWN, fill: BROWN, fop: 0.2, sw: 1.4 }));
  for (let i = 0; i < 14; i++) p.push(S.circle(164 + i * 21, 104 + (i % 2) * 2, 2.2, { c: BROWN, fill: BROWN, fop: 0.9, sw: 0.6 }));
  p.push(S.rect(150, 112, 300, 178, { fill: FILL, fop: 1, sw: 1.4 }));
  p.push(S.rect(150, 290, 300, 80, { c: YEL, fill: YEL, fop: 0.18, sw: 1.4 }));
  for (let r = 0; r < 2; r++) for (let i = 0; i < 10; i++) p.push(S.circle(172 + i * 28 + r * 14, 316 + r * 34, 11, { c: YEL, fill: FILL, fop: 1, sw: 1.2 }));
  // hair shaft, follicle and bulb
  p.push(S.line(262, 70, 252, 24, { c: 'currentColor', w: 3 }));
  p.push(S.path('M262 70 C264 130 272 190 284 238', { c: BROWN, w: 11, op: 0.5, cap: 'round' }));
  p.push(S.path('M262 70 C264 130 272 190 284 238', { c: 'currentColor', w: 2.4 }));
  p.push(S.circle(286, 248, 12, { c: BROWN, fill: BROWN, fop: 0.5, sw: 1.4 }));
  // sebaceous gland with its duct to the follicle
  p.push(S.ellipse(232, 178, 12, 17, { c: BROWN, fill: YEL, fop: 0.6, sw: 1.5 }));
  p.push(S.line(243, 174, 267, 168, { c: BROWN, w: 2.4 }));
  // erector muscle
  p.push(S.line(278, 212, 322, 118, { c: RED, w: 5, cap: 'round', op: 0.6 }));
  // blood vessels with a capillary loop
  p.push(S.line(366, 290, 366, 152, { c: RED, w: 3 }), S.line(388, 290, 388, 152, { c: BLUE, w: 3 }));
  p.push(S.path('M366 152 C366 118 388 118 388 152', { c: RED, w: 2.4 }));
  // nerve ending
  p.push(S.line(188, 290, 188, 124, { c: MUTED, w: 2 }), S.ellipse(188, 168, 6, 11, { c: BLUE, fill: BLUE, fop: 0.3, sw: 1.2 }), S.circle(188, 120, 3.5, { c: MUTED, fill: MUTED, fop: 1, sw: 1 }));
  // sweat gland (coil), duct and pore
  p.push(S.ellipse(420, 268, 17, 14, { c: BROWN, fill: YEL, fop: 0.45, sw: 1.6 }));
  p.push(S.path('M410 262 C418 256 426 262 418 268 C410 274 420 280 428 274', { c: BROWN, w: 1.4 }));
  p.push(S.path('M420 254 C428 220 410 180 420 140 C428 112 414 92 418 70', { c: BROWN, w: 3 }));
  p.push(S.circle(418, 70, 3, { c: 'currentColor', fill: FILL, fop: 1, sw: 1.2 }));
  if (!lettered) {
    p.push(S.text(140, 76, 'Horny layer', { a: 'end', ...o }), S.lead(144, 74, 168, 76));
    p.push(S.text(140, 100, 'Malpighian layer', { a: 'end', ...o }), S.lead(144, 98, 168, 98));
    p.push(S.text(140, 140, 'Nerve ending', { a: 'end', ...o }), S.lead(144, 138, 184, 160));
    p.push(S.text(140, 200, 'Sebaceous gland', { a: 'end', ...o }), S.lead(144, 198, 220, 184));
    p.push(S.text(140, 252, 'Dermis', { a: 'end', ...o }), S.lead(144, 250, 170, 250));
    p.push(S.text(140, 344, 'Fat layer', { a: 'end', ...o }), S.lead(144, 342, 168, 330));
    p.push(S.text(468, 34, 'Hair shaft', o), S.lead(464, 32, 256, 34));
    p.push(S.text(468, 62, 'Sweat pore', o), S.lead(464, 61, 422, 68));
    p.push(S.text(468, 134, 'Erector muscle', o), S.lead(464, 132, 312, 140));
    p.push(S.text(468, 214, 'Blood vessels', o), S.lead(464, 212, 392, 214));
    p.push(S.text(468, 244, 'Hair follicle', o), S.lead(464, 242, 290, 220));
    p.push(S.text(468, 286, 'Sweat gland', o), S.lead(464, 284, 436, 272));
    p.push(S.text(150, 388, 'Epidermis: horny layer and Malpighian layer', { size: 11, c: MUTED }), S.text(150, 404, 'Dermis: below the Malpighian layer, down to the fat', { size: 11, c: MUTED }));
  } else {
    p.push(S.text(116, 76, 'A', { a: 'end', ...o }), S.lead(120, 72, 168, 76));
    p.push(S.text(116, 102, 'B', { a: 'end', ...o }), S.lead(120, 98, 168, 98));
    p.push(S.text(116, 204, 'C', { a: 'end', ...o }), S.lead(120, 200, 220, 184));
    p.push(S.text(474, 286, 'D', o), S.lead(470, 282, 436, 272));
    p.push(S.text(474, 214, 'E', o), S.lead(470, 210, 392, 214));
  }
  const name = lettered
    ? 'A vertical section of human skin with parts lettered: A the thin outer layer of dead cells, B the layer below it that makes new cells and holds the dark pigment, C the small oily gland beside a hair, D the coiled gland deep in the skin, E the red and blue tubes carrying blood'
    : 'A vertical section of human skin: epidermis with the horny layer and the Malpighian layer; dermis containing a hair follicle with a hair, a sebaceous gland, an erector muscle, blood vessels, a nerve ending and a coiled sweat gland with a duct and pore; a fat layer below';
  return svgDoc(600, lettered ? 400 : 416, name, p.join(''));
}
export const SKIN = skin(false);
export const SKIN_LETTERED = skin(true);

// ---------------------------------------------------------------- 2. the skin on a hot day and on a cold day (named, and lettered)
function climate(lettered) {
  const p = [];
  const o = lettered ? { size: 15, w: 'bold' } : { size: 11 };
  const panel = (x0, hot) => {
    const w = 270;
    const cx = x0 + w / 2;
    // layers
    p.push(S.rect(x0, 90, w, 24, { c: BROWN, fill: BROWN, fop: 0.2, sw: 1.4 }));
    p.push(S.rect(x0, 114, w, 110, { fill: FILL, fop: 1, sw: 1.4 }));
    p.push(S.rect(x0, 224, w, 34, { c: YEL, fill: YEL, fop: 0.18, sw: 1.4 }));
    // blood vessel: wide on a hot day, narrow on a cold day
    const vx = x0 + 70;
    if (hot) {
      p.push(S.path(`M${vx} 224 L${vx} 124 C${vx} 100 ${vx + 70} 100 ${vx + 70} 124 L${vx + 70} 224`, { c: RED, w: 14, op: 0.55 }));
    } else {
      p.push(S.path(`M${vx + 20} 224 L${vx + 20} 176 C${vx + 20} 164 ${vx + 40} 164 ${vx + 40} 176 L${vx + 40} 224`, { c: RED, w: 3 }));
    }
    // sweat gland, duct, pore
    const gx = x0 + 200;
    p.push(S.ellipse(gx, 196, 13, 11, { c: BROWN, fill: YEL, fop: 0.45, sw: 1.4 }));
    p.push(S.path(`M${gx} 185 C${gx + 8} 160 ${gx - 8} 130 ${gx} 90`, { c: BROWN, w: 2.6 }));
    if (hot) {
      for (const [dx, dy] of [[-10, 78], [4, 74], [-2, 64], [12, 80]]) p.push(S.circle(gx + dx, dy, 3.4, { c: BLUE, fill: BLUE, fop: 0.5, sw: 1 }));
      // heat leaving
      for (const dx of [-40, 0, 40]) p.push(S.arrow(vx + 35 + dx, 84, vx + 35 + dx, 38, { c: RED, size: 7 }));
    } else {
      // hair standing erect
      for (const dx of [-60, -40, -20, 0]) p.push(S.line(vx + 20 + dx, 90, vx + 20 + dx, 56, { c: 'currentColor', w: 2.4 }));
      p.push(S.arrow(vx + 20, 84, vx + 20, 62, { c: RED, size: 6, dash: '3 3' }));
    }
    return cx;
  };
  const c1 = panel(20, true);
  const c2 = panel(340, false);
  if (!lettered) {
    p.push(S.text(c1, 24, 'Hot day', { a: 'middle', size: 13, w: 'bold' }), S.text(c2, 24, 'Cold day', { a: 'middle', size: 13, w: 'bold' }));
    p.push(S.lines(c1, 282, ['Vessels widen: vasodilation', 'More blood near the surface,', 'more heat lost; sweat evaporates'], { a: 'middle', ...o, dy: 14 }));
    p.push(S.lines(c2, 282, ['Vessels narrow: vasoconstriction', 'Less blood near the surface,', 'less heat lost; hair stands erect'], { a: 'middle', ...o, dy: 14 }));
  } else {
    p.push(S.text(c1, 26, 'P', { a: 'middle', size: 16, w: 'bold' }), S.text(c2, 26, 'Q', { a: 'middle', size: 16, w: 'bold' }));
    p.push(S.text(70, 156, 'A', { a: 'end', ...o }), S.lead(74, 152, 100, 156));
    p.push(S.text(262, 70, 'B', { a: 'start', ...o }), S.lead(258, 66, 238, 72));
    p.push(S.text(398, 200, 'C', { a: 'end', ...o }), S.lead(402, 196, 430, 196));
    p.push(S.text(358, 66, 'D', { a: 'end', ...o }), S.lead(362, 62, 372, 68));
  }
  const name = lettered
    ? 'Two sections of skin, P and Q, lettered: in P a wide blood vessel A lies near the surface and drops of sweat B sit on the surface with arrows of heat leaving; in Q a narrow blood vessel C lies deeper and the hairs D stand up, with no sweat'
    : 'The skin on a hot day, with a wide blood vessel near the surface (vasodilation), sweat on the surface and heat leaving, beside the skin on a cold day, with a narrow blood vessel (vasoconstriction), hairs standing erect and no sweat';
  return svgDoc(640, lettered ? 270 : 330, name, p.join(''));
}
export const CLIMATE = climate(false);
export const CLIMATE_LETTERED = climate(true);
