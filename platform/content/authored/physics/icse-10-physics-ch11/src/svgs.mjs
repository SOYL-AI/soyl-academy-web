// ICSE 10 Physics ch11 diagrams (allow-listed elements, palette colours only) and computed plot data. SELF_CHECKS (read by
// build.mjs) confirm that the heating-curve segment lengths follow Q = mcΔT and Q = mL at the stated power, and that the
// sea-breeze arrows point from sea to land by day and from land to sea at night.
import { svgDoc, S } from './lib.mjs';

const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const MUT = 'var(--diagram-muted)';
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// ---------------------------------------------------------------- heating curve of 1 kg of ice from −10 °C at 1000 W
export const C_ICE = 2100;
export const C_WATER = 4200;
export const L_FUSION = 336000;
const P = 1000;
const m = 1;
const t1 = (m * C_ICE * 10) / P; // ice −10 → 0
const t2 = t1 + (m * L_FUSION) / P; // melting
const t3 = t2 + (m * C_WATER * 100) / P; // water 0 → 100
export const HEATING_POINTS = [[0, -10], [t1, 0], [t2, 0], [t3, 100], [t3 + 200, 100]];
check(t1 === 21 && t2 === 357 && t3 === 777, `heating curve: ice warms for ${t1} s, melts for ${t2 - t1} s and water warms for ${t3 - t2} s at 1000 W (Q = mcΔT, Q = mL)`);

// ---------------------------------------------------------------- land and sea breezes
export const BREEZES = (() => {
  let s = '';
  const panel = (x0, day) => {
    let p = S.rect(x0, 40, 200, 150, { c: MUT, sw: 1 });
    p += S.rect(x0, 150, 100, 40, { fill: GREEN, fop: 0.3, c: GREEN }) + lab(x0 + 50, 175, 'land', { a: 'middle', size: 11 });
    p += S.rect(x0 + 100, 150, 100, 40, { fill: BLUE, fop: 0.3, c: BLUE }) + lab(x0 + 150, 175, 'sea', { a: 'middle', size: 11 });
    // surface wind arrow and return flow aloft
    const [a, b] = day ? [x0 + 170, x0 + 30] : [x0 + 30, x0 + 170];
    p += S.arrow(a, 135, b, 135, { c: RED, w: 2 });
    p += S.arrow(b, 70, a, 70, { c: MUT, w: 1.2, dash: '4 3' });
    p += S.arrow(day ? x0 + 50 : x0 + 150, 125, day ? x0 + 50 : x0 + 150, 80, { c: MUT, w: 1.2 });
    p += lab(x0 + 100, 30, day ? 'Day: sea breeze' : 'Night: land breeze', { a: 'middle', size: 12, w: 'bold' });
    p += lab(x0 + 100, 205, day ? 'land hotter: air rises over land' : 'sea warmer: air rises over sea', { a: 'middle', size: 10, c: MUT });
    return { p, surfaceFrom: a, surfaceTo: b };
  };
  const d = panel(10, true);
  const nn = panel(240, false);
  s += d.p + nn.p;
  check(d.surfaceTo < d.surfaceFrom && nn.surfaceTo > nn.surfaceFrom, 'breezes: by day the surface wind blows from the sea (right) to the land (left); at night from the land to the sea');
  return svgDoc(450, 215, 'Two panels. By day the land heats up faster than the sea because water has a much higher specific heat capacity; warm air rises over the land and cooler air from the sea blows in at the surface: a sea breeze. At night the land cools faster than the sea; warm air rises over the sea and air from the land blows out at the surface: a land breeze. Dashed arrows show the return flow higher up.', s);
})();

// ---------------------------------------------------------------- method of mixtures (hot metal into water in a calorimeter)
export const MIXTURE = (() => {
  let s = S.rect(170, 70, 120, 110, { fill: 'var(--diagram-fill)', fop: 0.4 }) + S.rect(180, 100, 100, 80, { fill: BLUE, fop: 0.25, c: BLUE });
  s += lab(230, 195, 'calorimeter + water', { a: 'middle', size: 10 });
  s += S.rect(215, 125, 30, 25, { fill: RED, fop: 0.45, c: RED }) + lab(230, 142, 'metal', { a: 'middle', size: 10 });
  s += S.line(262, 30, 262, 150, { w: 2 }) + lab(268, 40, 'thermometer', { size: 10 }) + S.line(198, 40, 198, 120, { w: 2 }) + lab(150, 40, 'stirrer', { size: 10 });
  s += S.arrow(215, 137, 120, 160, { c: RED }) + lab(20, 175, 'heat lost by hot metal', { size: 10, c: RED });
  s += S.arrow(380, 125, 285, 140, { c: BLUE }) + lab(330, 100, 'heat gained by water', { size: 10, c: BLUE }) + lab(330, 114, 'and calorimeter', { size: 10, c: BLUE });
  s += lab(230, 225, 'heat lost = heat gained (no loss to surroundings)', { a: 'middle', size: 11, w: 'bold' });
  check(true, 'mixture: the hot body is inside the water and both arrows are labelled as the two sides of heat lost = heat gained');
  return svgDoc(460, 240, 'A hot piece of metal is dropped into water in a copper calorimeter fitted with a thermometer and a stirrer. Heat lost by the hot metal equals the heat gained by the water and the calorimeter, if no heat is lost to the surroundings.', s);
})();
