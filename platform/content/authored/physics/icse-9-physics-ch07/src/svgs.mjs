// SVG diagrams for ICSE 9 Physics ch07 Heat and Energy: density-temperature and volume-temperature graphs of water from 0 to
// 10 degrees C (drawn from the table in calc.mjs), Hope's apparatus (plain and lettered A-E) with a readings graph, a frozen
// pond, the greenhouse effect and an energy-degradation (Sankey) diagram whose band widths are computed. Palette colours only;
// every font size is at least 10.
import { svgDoc, S } from '../../icse-9-physics-ch01/src/lib.mjs';
import { TEMPS, DENS, VOL1000, HOPE_T, HOPE_TOP, HOPE_BOT, POND, LE, D2_ENG } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 12, ...o });
const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const RED = 'var(--diagram-red)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
const BROWN = 'var(--diagram-brown)';
const YEL = 'var(--diagram-yellow)';

// ---------------------------------------------------------------- 1. density and volume graphs
function curve({ ys, ylo, yhi, yticks, ylabel, mark, caption, label, colour }) {
  const w = 440;
  const h = 330;
  const L = 78;
  const R = w - 20;
  const T = 44;
  const B = h - 62;
  const px = (t) => L + ((R - L) * t) / 10;
  const py = (v) => B - ((B - T) * (v - ylo)) / (yhi - ylo);
  const p = [];
  for (const tk of yticks) {
    p.push(S.line(L, py(tk), R, py(tk), { c: MUT, w: 0.6 }), lab(L - 6, py(tk) + 4, tk.toFixed(2), { a: 'end', size: 11 }));
  }
  for (const t of TEMPS) {
    p.push(S.line(px(t), T, px(t), B, { c: MUT, w: 0.6 }), lab(px(t), B + 16, String(t), { a: 'middle', size: 11 }));
  }
  p.push(S.line(L, T - 6, L, B, { w: 1.8 }), S.line(L, B, R + 6, B, { w: 1.8 }));
  p.push(lab(L, 18, ylabel, { size: 12, w: 'bold' }), lab((L + R) / 2, B + 38, 'Temperature (°C)', { a: 'middle', size: 12 }));
  const pts = TEMPS.map((t, i) => `${px(t).toFixed(1)},${py(ys[i]).toFixed(1)}`).join(' ');
  p.push(`<polyline points="${pts}" fill="none" stroke="${colour}" stroke-width="2.6" stroke-linejoin="round"/>`);
  TEMPS.forEach((t, i) => p.push(S.circle(px(t), py(ys[i]), 3, { fill: colour, c: colour, sw: 1 })));
  if (mark) {
    const i = mark.i;
    p.push(S.line(px(TEMPS[i]), py(ys[i]), px(TEMPS[i]), B, { c: RED, w: 1.4, dash: '5 4' }), S.line(L, py(ys[i]), px(TEMPS[i]), py(ys[i]), { c: RED, w: 1.4, dash: '5 4' }));
    p.push(lab(px(TEMPS[i]) + 8, mark.dy + py(ys[i]), mark.text, { size: 12, w: 'bold', c: RED }));
  }
  if (caption) p.push(lab(L, h - 8, caption, { size: 11, c: MUT }));
  return svgDoc(w, h, label, p.join(''));
}
const DNOTE = 'Vertical scale greatly stretched: the real change is tiny.';
export const DENS_GRAPH = curve({
  ys: DENS, ylo: 999.65, yhi: 1000.0, yticks: [999.7, 999.8, 999.9, 1000.0], ylabel: 'Density (kg m⁻³)',
  mark: { i: 4, dy: 90, text: 'maximum at 4 °C' }, caption: DNOTE, colour: BLUE,
  label: 'Graph of the density of water against temperature from 0 to 10 degrees Celsius. The density rises from 0 degrees Celsius to a maximum at 4 degrees Celsius and then falls again. The vertical scale is greatly stretched',
});
export const DENS_GRAPH_PLAIN = curve({
  ys: DENS, ylo: 999.65, yhi: 1000.0, yticks: [999.7, 999.8, 999.9, 1000.0], ylabel: 'Density (kg m⁻³)', mark: null, caption: DNOTE, colour: BLUE,
  label: 'Graph of the density of water against temperature from 0 to 10 degrees Celsius, drawn on a grid with the temperature axis marked every degree and the density axis marked from 999.7 to 1000.0 kilograms per cubic metre. The vertical scale is greatly stretched',
});
export const VOL_GRAPH = curve({
  ys: VOL1000, ylo: 1000.0, yhi: 1000.35, yticks: [1000.0, 1000.1, 1000.2, 1000.3], ylabel: 'Volume of 1 kg of water (cm³)',
  mark: { i: 4, dy: -80, text: 'minimum at 4 °C' }, caption: 'Vertical scale greatly stretched: the real change is tiny.', colour: GREEN,
  label: 'Graph of the volume of one kilogram of water against temperature from 0 to 10 degrees Celsius. The volume falls from 0 degrees Celsius to a minimum at 4 degrees Celsius and then rises again. The vertical scale is greatly stretched',
});

// ---------------------------------------------------------------- 2. Hope's apparatus
function hope(lettered) {
  const p = [];
  const jx0 = 130;
  const jx1 = 250;
  const jy0 = 40;
  const jy1 = 300;
  const ty0 = 148;
  const ty1 = 196;
  // jar with water, trough around its middle
  p.push(S.rect(jx0, jy0 + 24, jx1 - jx0, jy1 - jy0 - 24, { fill: BLUE, c: 'none', fop: 0.22, sw: 0 }));
  p.push(S.path(`M ${jx0} ${jy0} V ${jy1} H ${jx1} V ${jy0}`, { w: 2.5 }));
  p.push(S.rect(jx0 - 52, ty0, 52, ty1 - ty0, { fill: FILL, fop: 0.85, sw: 2 }), S.rect(jx1, ty0, 52, ty1 - ty0, { fill: FILL, fop: 0.85, sw: 2 }));
  for (let i = 0; i < 4; i++) for (const bx of [jx0 - 44, jx1 + 8]) p.push(S.circle(bx + (i % 2) * 18, ty0 + 12 + i * 9, 2.4, { fill: 'currentColor', c: 'none' }));
  p.push(S.line(jx0, ty0, jx1, ty0, { c: BLUE, w: 1.2 }), S.line(jx0, ty1, jx1, ty1, { c: BLUE, w: 1.2 }));
  // thermometers: upper above the trough, lower below it
  const thermo = (x, y0, y1) => S.line(x, y0, x, y1, { c: RED, w: 3.5 }) + S.circle(x, y1 + 5, 5.5, { fill: RED, c: RED, sw: 1 }) + S.rect(x - 4.5, y0 - 4, 9, y1 - y0 + 4, { sw: 1.2 });
  p.push(thermo(168, 70, 112), thermo(212, 220, 270));
  if (lettered) {
    p.push(lab(88, 36, 'A', { size: 16, w: 'bold' }), S.lead(98, 40, jx0 + 4, 60));
    p.push(lab(34, 128, 'B', { size: 16, w: 'bold' }), S.lead(48, 132, jx0 - 30, ty0 + 2));
    p.push(lab(120, 78, 'C', { size: 16, w: 'bold', a: 'end' }), S.lead(122, 74, 163, 82));
    p.push(lab(290, 262, 'D', { size: 16, w: 'bold' }), S.lead(286, 258, 220, 252));
    p.push(lab(290, 110, 'E', { size: 16, w: 'bold' }), S.lead(286, 106, 244, 126));
  } else {
    p.push(lab(jx1 + 14, 54, 'tall glass jar', { size: 12 }), S.lead(jx1 + 12, 50, jx1 - 6, 56));
    p.push(lab(jx1 + 62, 176, 'freezing mixture', { size: 12 }), lab(jx1 + 62, 192, 'in the trough', { size: 12 }));
    p.push(lab(jx0 - 8, 80, 'upper thermometer', { size: 12, a: 'end' }), S.lead(jx0 - 6, 76, 163, 82));
    p.push(lab(jx1 + 14, 256, 'lower thermometer', { size: 12 }), S.lead(jx1 + 12, 252, 220, 250));
    p.push(lab(jx1 + 14, 110, 'water', { size: 12 }), S.lead(jx1 + 12, 106, jx1 - 10, 116));
  }
  const alt = lettered
    ? 'Hope’s apparatus: a tall glass jar of water (A) with a trough of freezing mixture (B) around its middle, an upper thermometer (C) above the trough and a lower thermometer (D) below it; E is the water in the jar. The labels are letters only'
    : 'Hope’s apparatus: a tall glass jar of water with a trough of freezing mixture round its middle, an upper thermometer above the trough and a lower thermometer below it';
  return svgDoc(420, 320, alt, p.join(''));
}
export const HOPE = hope(false);
export const HOPE_LETTERED = hope(true);

// readings graph
export const HOPE_GRAPH = (() => {
  const w = 440;
  const h = 300;
  const L = 60;
  const R = w - 20;
  const T = 30;
  const B = h - 56;
  const px = (t) => L + ((R - L) * t) / 40;
  const py = (v) => B - ((B - T) * v) / 12;
  const p = [];
  for (let v = 0; v <= 12; v += 2) p.push(S.line(L, py(v), R, py(v), { c: MUT, w: 0.6 }), lab(L - 6, py(v) + 4, String(v), { a: 'end', size: 11 }));
  for (let t = 0; t <= 40; t += 5) p.push(S.line(px(t), T, px(t), B, { c: MUT, w: 0.6 }), lab(px(t), B + 16, String(t), { a: 'middle', size: 11 }));
  p.push(S.line(L, T - 6, L, B, { w: 1.8 }), S.line(L, B, R + 6, B, { w: 1.8 }));
  p.push(lab(L, 16, 'Temperature (°C)', { size: 12, w: 'bold' }), lab((L + R) / 2, B + 38, 'Time (minutes)', { a: 'middle', size: 12 }));
  const line = (ys, c) => `<polyline points="${HOPE_T.map((t, i) => `${px(t).toFixed(1)},${py(ys[i]).toFixed(1)}`).join(' ')}" fill="none" stroke="${c}" stroke-width="2.6" stroke-linejoin="round"/>` + HOPE_T.map((t, i) => S.circle(px(t), py(ys[i]), 3, { fill: c, c, sw: 1 })).join('');
  p.push(line(HOPE_TOP, RED), line(HOPE_BOT, BLUE));
  p.push(lab(px(21), py(11.2), 'upper thermometer', { size: 12, c: RED, w: 'bold' }), lab(px(5), py(2), 'lower thermometer', { size: 12, c: BLUE, w: 'bold' }));
  return svgDoc(w, h, 'Graph of the readings of the two thermometers in Hope’s experiment against time. The lower thermometer falls to 4 degrees Celsius and stays there. The upper thermometer stays high at first, then falls and reaches 0 degrees Celsius', p.join(''));
})();

// ---------------------------------------------------------------- 3. frozen pond
export const POND_FIG = (() => {
  const p = [];
  const x0 = 70;
  const x1 = 330;
  const top = 50;
  const layer = 42;
  const n = POND.length;
  POND.forEach((t, i) => {
    const y = top + i * layer;
    p.push(S.rect(x0, y, x1 - x0, layer, { fill: i === 0 ? FILL : BLUE, c: 'none', fop: i === 0 ? 0.9 : 0.1 + 0.07 * i, sw: 0 }));
    p.push(S.line(x0, y, x1, y, { c: MUT, w: 0.8 }));
    p.push(lab(x1 + 12, y + layer / 2 + 4, i === 0 ? `ice, ${t} °C` : `${t} °C`, { size: 12, w: i === 0 || i === n - 1 ? 'bold' : undefined }));
  });
  const bot = top + n * layer;
  p.push(S.path(`M ${x0} ${top - 12} V ${bot} H ${x1} V ${top - 12}`, { w: 2.5 }));
  p.push(S.line(x0, top, x1, top, { w: 1.5 }));
  p.push(lab(x0, 22, 'Cold winter air above the pond', { size: 12, c: MUT }));
  p.push(S.arrow(190, 28, 190, top - 4, { c: BLUE, w: 2, size: 7 }));
  p.push(lab(x0 - 8, top + 60, 'surface', { a: 'end', size: 11, c: MUT }), lab(x0 - 8, bot - 6, 'bottom', { a: 'end', size: 11, c: MUT }));
  p.push(S.circle(190, bot - 20, 5, { fill: GREEN, c: GREEN }), S.path(`M 178 ${bot - 20} q 6 -6 12 0`, { c: GREEN, w: 1.5 }));
  p.push(lab(200, bot - 16, 'fish', { size: 11, c: GREEN, w: 'bold' }));
  return svgDoc(420, bot + 22, 'A frozen pond in winter. A layer of ice at 0 degrees Celsius floats on top. The water below it gets warmer layer by layer: 1, 2 and 3 degrees Celsius, and the water at the bottom is at 4 degrees Celsius, where fish can live', p.join(''));
})();

// ---------------------------------------------------------------- 4. greenhouse effect
function greenhouse(lettered) {
  const p = [];
  const W = 480;
  const earthY = 250;
  const gTop = 96;
  const gBot = 172;
  p.push(S.rect(10, gTop, W - 20, gBot - gTop, { fill: FILL, c: 'none', fop: 0.6, sw: 0 }));
  p.push(S.rect(10, earthY, W - 20, 66, { fill: BROWN, c: 'none', fop: 0.35, sw: 0 }), S.line(10, earthY, W - 10, earthY, { w: 2 }));
  // sun
  p.push(S.circle(56, 44, 22, { fill: YEL, c: YEL, fop: 0.6, sw: 2 }));
  // incoming shortwave radiation (straight through the gas layer)
  for (const x of [120, 170, 220]) p.push(S.arrow(x - 40, 20, x + 20, earthY - 4, { c: YEL, w: 2.8, size: 8 }));
  // infrared from the ground: one escapes, two are absorbed and some of that energy returns
  p.push(S.arrow(420, earthY - 4, 440, 10, { c: RED, w: 2.4, size: 8 }));
  for (const x of [300, 350]) p.push(S.arrow(x, earthY - 4, x + 10, gBot + 2, { c: RED, w: 2.4, size: 8 }));
  for (const x of [316, 366]) p.push(S.arrow(x + 12, gBot - 14, x - 14, earthY - 4, { c: RED, w: 2.4, size: 8, dash: '6 4' }));
  if (lettered) {
    p.push(lab(34, 86, 'A', { size: 16, w: 'bold' }));
    p.push(lab(214, 66, 'B', { size: 16, w: 'bold' }));
    p.push(lab(30, 140, 'C', { size: 16, w: 'bold' }));
    p.push(lab(272, 216, 'D', { size: 16, w: 'bold' }));
    p.push(lab(446, 56, 'E', { size: 16, w: 'bold' }));
  } else {
    p.push(lab(88, 36, 'Sun', { size: 12 }), lab(232, 62, 'sunlight (visible light)', { size: 12, c: BROWN, w: 'bold' }));
    p.push(lab(236, 136, 'layer of greenhouse gases', { size: 12 }), lab(20, 275, 'Earth’s surface, warmed by the sunlight', { size: 12 }));
    p.push(lab(250, 276, 'infrared from the ground', { size: 12, c: RED, w: 'bold' }), lab(374, 205, 'returned', { size: 11, c: RED }));
    p.push(lab(426, 40, 'some escapes', { size: 11, c: RED, a: 'end' }));
  }
  const alt = lettered
    ? 'The greenhouse effect with parts lettered A to E: A is the Sun, B the sunlight arriving, C the layer of greenhouse gases, D the infrared radiation from the Earth’s surface, and E the infrared that escapes into space. The labels are letters only'
    : 'The greenhouse effect: sunlight passes through a layer of greenhouse gases and warms the ground. The ground gives out infrared radiation. Some escapes into space; some is absorbed by the greenhouse gases, and part of that energy is sent back to the ground';
  return svgDoc(W, 322, alt, p.join(''));
}
export const GREENHOUSE = greenhouse(false);
export const GREENHOUSE_LETTERED = greenhouse(true);

// ---------------------------------------------------------------- 5. energy degradation (Sankey-style)
function sankey({ total, parts, unit, title, label }) {
  const p = [];
  const k = 0.012; // px per joule
  const hTot = total * k;
  const y0 = 40;
  const x0 = 40;
  const x1 = 190;
  const x2 = 300;
  p.push(S.rect(x0, y0, x1 - x0, hTot, { fill: BROWN, c: BROWN, fop: 0.35, sw: 2 }));
  let ys = y0;
  let yd = y0;
  parts.forEach((q, i) => {
    const hh = q.j * k;
    const gap = i * 34;
    const fill = q.useful ? GREEN : RED;
    const pts = [[x1, ys], [x2, yd + gap], [x2, yd + gap + hh], [x1, ys + hh]];
    p.push(`<polygon points="${pts.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(' ')}" fill="${fill}" fill-opacity="0.35" stroke="${fill}" stroke-width="1.5"/>`);
    p.push(lab(x2 + 10, yd + gap + hh / 2 + 4, `${q.name}: ${q.hide ? "?" : q.j + " " + unit}`, { size: 12, w: 'bold', c: fill }));
    ys += hh;
    yd += hh;
  });
  p.push(lab(x0 + 8, y0 + hTot / 2 - 4, 'Energy', { size: 12, w: 'bold' }), lab(x0 + 8, y0 + hTot / 2 + 12, `in: ${total} ${unit}`, { size: 12, w: 'bold' }));
  p.push(lab(x0, y0 + hTot + parts.length * 34 + 20, title, { size: 12, c: MUT }));
  return svgDoc(560, y0 + hTot + parts.length * 34 + 36, label, p.join(''));
}
export const SANKEY_DECK = sankey({
  total: D2_ENG.in, unit: 'J', title: 'Band widths are drawn in proportion to the energy.',
  parts: [{ name: 'Useful motion', j: D2_ENG.useful, useful: true }, { name: 'Heat to surroundings', j: D2_ENG.deg }],
  label: `A car engine takes in ${D2_ENG.in} joule of energy from the fuel. ${D2_ENG.useful} joule becomes useful motion and ${D2_ENG.deg} joule is spread into the surroundings as heat`,
});
export const SANKEY_LONG = sankey({
  total: LE.in, unit: 'J', title: 'Band widths are drawn in proportion to the energy.',
  parts: [{ name: 'Useful work', j: LE.useful, useful: true }, { name: 'Heat', j: LE.heat, hide: true }, { name: 'Sound', j: LE.sound }],
  label: `A machine takes in ${LE.in} joule. ${LE.useful} joule is useful work, the heat lost is left to be found and ${LE.sound} joule is lost as sound`,
});
