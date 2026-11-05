// SVG diagrams for ICSE 9 Chemistry ch13 Atmospheric and Environmental Chemistry: how acid rain forms and where it falls,
// the greenhouse effect, and the ozone layer. Each has a named version and a lettered (A to E) version.
import { svgDoc, S } from '../../icse-9-chemistry-ch01/src/lib.mjs';

const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const YEL = 'var(--diagram-yellow)';
const BROWN = 'var(--diagram-brown)';
const MUTED = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const RED = 'var(--diagram-red)';

/** A label: the name (one or more lines) in the named version, or a bold capital letter in the lettered one. */
const label = (lettered, letter, lines, x, y, anchor = 'start') =>
  lettered ? S.text(x, y + 4, letter, { a: anchor, size: 20, w: 'bold' }) : S.lines(x, y, lines, { a: anchor, size: 11, dy: 13 });

// ---------------------------------------------------------------- 1. acid rain
function acid(lettered) {
  const p = [];
  // ground and soil
  p.push(S.line(0, 250, 720, 250, { w: 2 }));
  p.push(S.rect(220, 250, 190, 36, { fill: BROWN, fop: 0.35, sw: 1.2 }));
  // factory with chimney
  p.push(S.rect(30, 170, 90, 80, { fill: FILL, sw: 2 }), S.rect(96, 112, 20, 58, { fill: FILL, sw: 2 }));
  for (const [x, y] of [[62, 190], [84, 190], [62, 214], [84, 214]]) p.push(S.rect(x, y, 14, 14, { sw: 1.2 }));
  for (const [x, y, rr] of [[110, 98, 7], [126, 86, 9], [146, 76, 11], [170, 70, 12]]) p.push(S.circle(x, y, rr, { fill: MUTED, fop: 0.45, sw: 1 }));
  // vehicle
  p.push(S.rect(140, 226, 60, 18, { fill: FILL, sw: 1.6, rx: 3 }), S.circle(155, 246, 6, { fill: MUTED, fop: 0.6, sw: 1.4 }), S.circle(186, 246, 6, { fill: MUTED, fop: 0.6, sw: 1.4 }));
  p.push(S.circle(206, 238, 4, { fill: MUTED, fop: 0.4, sw: 0.8 }), S.circle(216, 232, 5, { fill: MUTED, fop: 0.4, sw: 0.8 }));
  // cloud
  for (const [x, y, rr] of [[300, 80, 26], [340, 62, 32], [384, 74, 28], [352, 90, 28]]) p.push(S.circle(x, y, rr, { fill: FILL, sw: 1.8 }));
  p.push(S.arrow(190, 68, 262, 72, { c: MUTED, w: 1.6 }));
  // rain
  for (const x of [300, 326, 352, 378, 404]) p.push(S.line(x, 112, x - 10, 168, { c: BLUE, w: 1.8 }), S.line(x - 12, 184, x - 20, 232, { c: BLUE, w: 1.8 }));
  // trees on the soil
  for (const x of [250, 300, 350]) p.push(S.rect(x - 3, 224, 6, 26, { fill: BROWN, fop: 0.6, sw: 0.8 }), S.circle(x, 212, 15, { fill: GREEN, fop: 0.5, sw: 1.2 }));
  // lake with a fish
  p.push(S.rect(450, 236, 230, 50, { fill: BLUE, fop: 0.22, sw: 1.8 }));
  p.push(S.ellipse(540, 262, 20, 9, { fill: YEL, fop: 0.6, sw: 1.4 }), S.path('M560 262 L574 252 L574 272 Z', { fill: YEL, fop: 0.6, w: 1.4 }), S.circle(530, 260, 1.8, { fill: 'currentColor', sw: 0 }));
  for (const x of [470, 600, 640]) p.push(S.path(`M${x} 286 Q${x - 4} 268 ${x} 252`, { c: GREEN, w: 2 }));
  // labels
  p.push(label(lettered, 'A', ['Chimney smoke and', 'exhaust: SO₂ and NO₂'], lettered ? 24 : 20, lettered ? 62 : 58));
  p.push(S.lead(lettered ? 44 : 100, lettered ? 64 : 76, 108, 110));
  p.push(label(lettered, 'B', ['Cloud droplets: gases', 'dissolve to give acids'], lettered ? 436 : 426, lettered ? 44 : 40));
  p.push(S.lead(lettered ? 432 : 424, lettered ? 42 : 38, 400, 62));
  p.push(label(lettered, 'C', ['Acid rain'], lettered ? 430 : 418, 150));
  p.push(S.lead(lettered ? 428 : 424, 146, 400, 146));
  p.push(label(lettered, 'D', ['Soil and trees'], lettered ? 316 : 262, lettered ? 276 : 278, 'middle'));
  p.push(label(lettered, 'E', ['Lake: fish and', 'plants harmed'], 560, lettered ? 226 : 212, 'middle'));
  const alt = lettered
    ? 'Acid rain scene with five parts lettered A to E. A is a factory chimney and a vehicle giving off smoke and exhaust. B is a cloud. C is rain falling from the cloud. D is soil with trees. E is a lake with a fish.'
    : 'Acid rain scene: a factory chimney and a vehicle release sulphur dioxide and nitrogen dioxide, which are carried to a cloud where they dissolve in the droplets to make acids; acid rain falls on soil with trees and on a lake with fish and plants.';
  return svgDoc(720, 318, alt, p.join(''));
}
export const ACID = acid(false);
export const ACID_LETTERED = acid(true);

// ---------------------------------------------------------------- 2. greenhouse effect
function greenhouse(lettered) {
  const p = [];
  // sun
  p.push(S.circle(56, 48, 26, { fill: YEL, fop: 0.8, sw: 1.8 }));
  for (let k = 0; k < 8; k++) {
    const a = (k * Math.PI) / 4;
    p.push(S.line(56 + 31 * Math.cos(a), 48 + 31 * Math.sin(a), 56 + 41 * Math.cos(a), 48 + 41 * Math.sin(a), { c: YEL, w: 2.2 }));
  }
  // layer of greenhouse gases
  p.push(S.rect(30, 116, 540, 40, { fill: FILL, sw: 1.4, dash: '6 4' }));
  for (const [x, y] of [[70, 130], [120, 144], [180, 128], [240, 146], [300, 130], [360, 146], [420, 128], [480, 144], [540, 130]]) p.push(S.circle(x, y, 5.5, { fill: MUTED, fop: 0.45, sw: 1 }));
  // Earth surface
  p.push(S.rect(30, 256, 540, 30, { fill: GREEN, fop: 0.4, sw: 1.8 }));
  // incoming sunlight
  p.push(S.arrow(100, 78, 200, 250, { c: YEL, w: 3.2, size: 9 }), S.arrow(136, 66, 236, 250, { c: YEL, w: 3.2, size: 9 }));
  // infrared leaving the surface: one escapes, one is absorbed and sent back
  p.push(S.arrow(330, 252, 330, 26, { c: RED, w: 2.4, size: 8 }));
  p.push(S.arrow(420, 252, 420, 164, { c: RED, w: 2.4, size: 8 }));
  p.push(S.arrow(450, 160, 450, 248, { c: RED, w: 2.4, size: 8, dash: '5 3' }));
  // labels
  p.push(label(lettered, 'A', ['Sunlight'], lettered ? 252 : 244, lettered ? 88 : 84));
  p.push(S.lead(lettered ? 262 : 262, 92, 200, 172));
  p.push(label(lettered, 'B', ['Earth’s surface'], lettered ? 56 : 40, lettered ? 276 : 274));
  p.push(label(lettered, 'C', ['Infrared radiation', 'from the ground'], lettered ? 352 : 346, lettered ? 66 : 62));
  p.push(S.lead(lettered ? 354 : 360, 70, 332, 70));
  p.push(label(lettered, 'D', ['Layer of greenhouse', 'gases'], lettered ? 584 : 466, lettered ? 108 : 92, lettered ? 'end' : 'start'));
  p.push(label(lettered, 'E', ['Heat sent back', 'to the Earth'], lettered ? 540 : 486, lettered ? 210 : 206, lettered ? 'middle' : 'start'));
  p.push(S.lead(lettered ? 528 : 484, lettered ? 206 : 208, 456, 206));
  const alt = lettered
    ? 'Greenhouse effect with five parts lettered A to E. A is sunlight reaching the Earth. B is the Earth’s surface. C is infrared radiation leaving the ground. D is a layer of greenhouse gases. E is heat sent back down to the Earth by that layer.'
    : 'Greenhouse effect: sunlight passes through a layer of greenhouse gases and warms the Earth’s surface; the ground gives out infrared radiation, some of which escapes to space while some is absorbed by the greenhouse gases and sent back to warm the Earth.';
  return svgDoc(600, 296, alt, p.join(''));
}
export const GREENHOUSE = greenhouse(false);
export const GREENHOUSE_LETTERED = greenhouse(true);

// ---------------------------------------------------------------- 3. ozone layer
function ozone(lettered) {
  const p = [];
  // layers: stratosphere on top, troposphere below, surface at the bottom
  p.push(S.rect(120, 40, 440, 150, { fill: FILL, sw: 1.6 }));
  p.push(S.rect(120, 190, 440, 90, { fill: BLUE, fop: 0.1, sw: 1.6 }));
  p.push(S.rect(120, 280, 440, 18, { fill: GREEN, fop: 0.4, sw: 1.8 }));
  // ozone layer inside the stratosphere
  p.push(S.rect(120, 108, 440, 46, { fill: GREEN, fop: 0.3, sw: 1.6, dash: '6 4' }));
  for (const [x, y] of [[170, 124], [230, 140], [290, 122], [350, 140], [410, 124], [470, 138], [525, 124]]) p.push(S.circle(x, y, 5, { fill: GREEN, fop: 0.6, sw: 1 }));
  // sun
  p.push(S.circle(70, 30, 18, { fill: YEL, fop: 0.8, sw: 1.6 }));
  // ultraviolet absorbed by the ozone layer, visible light passes through
  p.push(S.arrow(84, 42, 210, 108, { c: RED, w: 2.6, size: 8 }), S.arrow(100, 26, 270, 108, { c: RED, w: 2.6, size: 8 }));
  p.push(S.line(210, 114, 222, 102, { c: RED, w: 2.4 }), S.line(222, 114, 210, 102, { c: RED, w: 2.4 }));
  p.push(S.line(270, 114, 282, 102, { c: RED, w: 2.4 }), S.line(282, 114, 270, 102, { c: RED, w: 2.4 }));
  p.push(S.arrow(420, 30, 420, 276, { c: YEL, w: 2.6, size: 8 }));
  // labels (left column)
  p.push(label(lettered, 'A', ['Harmful ultraviolet', 'radiation from the Sun'], lettered ? 300 : 300, lettered ? 62 : 58));
  p.push(S.lead(lettered ? 296 : 296, lettered ? 62 : 62, 250, 76));
  p.push(label(lettered, 'B', ['Ozone layer'], lettered ? 100 : 114, 134, 'end'));
  p.push(label(lettered, 'C', ['Stratosphere'], lettered ? 100 : 114, 74, 'end'));
  p.push(label(lettered, 'D', ['Troposphere', '(where we live)'], lettered ? 100 : 114, lettered ? 238 : 234, 'end'));
  p.push(label(lettered, 'E', ['Earth’s surface'], lettered ? 100 : 114, 294, 'end'));
  p.push(S.text(432, 236, 'visible light reaches the ground', { size: 10, c: MUTED }));
  const alt = lettered
    ? 'Layers of the atmosphere with five parts lettered A to E. A is harmful ultraviolet radiation from the Sun. B is the ozone layer, a band inside the upper layer. C is the stratosphere. D is the troposphere below it. E is the Earth’s surface.'
    : 'Layers of the atmosphere: the stratosphere above and the troposphere below it, over the Earth’s surface. Harmful ultraviolet radiation from the Sun is absorbed by the ozone layer inside the stratosphere, while visible light passes through to the ground.';
  return svgDoc(600, 306, alt, p.join(''));
}
export const OZONE = ozone(false);
export const OZONE_LETTERED = ozone(true);
