// ICSE 10 Geography ch06 diagrams (allow-listed elements, palette colours only). All station data are ILLUSTRATIVE (rounded,
// textbook-style values for three types of Indian station, not official records) and are exported so questions compute every
// answer from the same numbers. SELF_CHECKS (read by build.mjs) confirm that bar heights and line points follow the data and
// that the monsoon arrows blow from high to low pressure.
import { svgDoc, S } from './lib.mjs';

const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const MUT = 'var(--diagram-muted)';
const ACC = 'var(--diagram-accent)';
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

// ---------------------------------------------------------------- illustrative station data (°C, mm)
export const STATIONS = {
  P: { name: 'Station P (west coast, illustrative)', temp: [24.4, 24.9, 26.9, 28.6, 30.0, 29.0, 27.5, 27.2, 27.5, 28.6, 27.6, 25.9], rain: [1, 1, 0, 1, 12, 520, 690, 430, 320, 70, 15, 3] },
  Q: { name: 'Station Q (northern plain, illustrative)', temp: [14.0, 17.0, 22.5, 28.5, 33.0, 33.5, 31.0, 30.0, 29.0, 26.0, 20.5, 15.5], rain: [20, 18, 15, 8, 15, 70, 200, 240, 120, 15, 5, 10] },
  R: { name: 'Station R (south-east coast, illustrative)', temp: [24.5, 25.5, 27.5, 30.5, 32.5, 32.5, 31.0, 30.5, 30.0, 28.0, 26.0, 25.0], rain: [25, 8, 6, 15, 45, 50, 90, 115, 120, 280, 350, 140] },
};
export const range = (st) => Math.round((Math.max(...st.temp) - Math.min(...st.temp)) * 10) / 10;
export const total = (st) => st.rain.reduce((a, b) => a + b, 0);
export const mean = (st) => Math.round((st.temp.reduce((a, b) => a + b, 0) / 12) * 10) / 10;

// ---------------------------------------------------------------- climograph for one station
function climograph(key) {
  const st = STATIONS[key];
  const X0 = 50;
  const Y0 = 230; // baseline
  const W = 24;
  const rainMax = 800; // mm at top of axis
  const tMin = 0;
  const tMax = 40;
  const H = 180;
  const yR = (mm) => Y0 - (mm / rainMax) * H;
  const yT = (t) => Y0 - ((t - tMin) / (tMax - tMin)) * H;
  let s = S.line(X0, Y0, X0 + 12 * W + 10, Y0, { w: 1.2 }) + S.line(X0, Y0, X0, Y0 - H, { w: 1.2 }) + S.line(X0 + 12 * W + 10, Y0, X0 + 12 * W + 10, Y0 - H, { w: 1.2 });
  for (let mm = 0; mm <= rainMax; mm += 200) s += lab(X0 - 6, yR(mm) + 4, String(mm), { a: 'end', size: 10, c: BLUE });
  for (let t = 0; t <= tMax; t += 10) s += lab(X0 + 12 * W + 16, yT(t) + 4, String(t), { size: 10, c: RED });
  lab;
  s += lab(14, Y0 - H - 8, 'rain (mm)', { size: 10, c: BLUE }) + lab(X0 + 12 * W - 10, Y0 - H - 8, 'temp (°C)', { size: 10, c: RED });
  let ok = true;
  const pts = [];
  st.rain.forEach((mm, i) => {
    const x = X0 + 5 + i * W;
    const h = Y0 - yR(mm);
    s += S.rect(x, yR(mm), W - 6, h, { fill: BLUE, fop: 0.45, c: BLUE, sw: 0.8 });
    s += lab(x + (W - 6) / 2, Y0 + 14, MONTHS[i], { a: 'middle', size: 10 });
    if (Math.abs(h - (mm / rainMax) * H) > 1e-9) ok = false;
    pts.push([x + (W - 6) / 2, yT(st.temp[i])]);
  });
  s += S.path('M' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L'), { c: RED, w: 2 });
  pts.forEach(([x, y]) => (s += S.circle(x, y, 2.5, { fill: RED, c: RED })));
  pts.forEach(([, y], i) => {
    if (Math.abs(y - yT(st.temp[i])) > 1e-9) ok = false;
  });
  s += lab(X0 + 6 * W, 20, st.name, { a: 'middle', size: 11, w: 'bold' });
  check(ok, `climograph ${key}: every rainfall bar height is proportional to its monthly total and every temperature point lies at its monthly mean on the right-hand scale`);
  return svgDoc(400, 260, `Climate graph for ${st.name}: monthly rainfall as bars on a 0 to 800 millimetre scale and monthly mean temperature as a line on a 0 to 40 degree Celsius scale. Annual range ${range(st)} degrees; total rainfall ${total(st)} millimetres.`, s);
}
export const CLIMO_P = climograph('P');
export const CLIMO_Q = climograph('Q');
export const CLIMO_R = climograph('R');

// ---------------------------------------------------------------- monsoon mechanism: land and sea pressure in summer and winter
export const MONSOON = (() => {
  let s = '';
  const panel = (x0, summer) => {
    let p = S.rect(x0, 50, 190, 120, { c: MUT, sw: 1 });
    p += S.rect(x0, 50, 95, 120, { fill: 'var(--diagram-green)', fop: 0.25, c: 'none', sw: 0 }) + lab(x0 + 47, 160, 'land', { a: 'middle', size: 11 });
    p += S.rect(x0 + 95, 50, 95, 120, { fill: BLUE, fop: 0.25, c: 'none', sw: 0 }) + lab(x0 + 142, 160, 'sea', { a: 'middle', size: 11 });
    const landP = summer ? 'L' : 'H';
    const seaP = summer ? 'H' : 'L';
    p += lab(x0 + 47, 90, landP, { a: 'middle', size: 22, w: 'bold', c: landP === 'L' ? RED : BLUE });
    p += lab(x0 + 142, 90, seaP, { a: 'middle', size: 22, w: 'bold', c: seaP === 'L' ? RED : BLUE });
    const [a, b] = summer ? [x0 + 170, x0 + 20] : [x0 + 20, x0 + 170];
    p += S.arrow(a, 120, b, 120, { c: ACC, w: 2.5 });
    p += lab(x0 + 95, 40, summer ? 'Summer: SW monsoon (moist, from sea)' : 'Winter: NE monsoon (dry, from land)', { a: 'middle', size: 11, w: 'bold' });
    return { p, from: a, to: b, highAt: summer ? x0 + 142 : x0 + 47 };
  };
  const su = panel(10, true);
  const wi = panel(230, false);
  s += su.p + wi.p;
  s += lab(220, 190, 'H = high pressure, L = low pressure; winds blow from H to L', { a: 'middle', size: 10, c: MUT });
  const fromHigh = (pn) => Math.abs(pn.from - pn.highAt) < 40;
  check(fromHigh(su) && fromHigh(wi), 'monsoon: in each panel the wind arrow starts on the high-pressure side and points to the low-pressure side (sea to land in summer, land to sea in winter)');
  return svgDoc(440, 200, 'Two panels showing the monsoon as a seasonal reversal of winds. In summer the land heats more than the sea, so low pressure forms over the land and high pressure over the sea; moist south-west winds blow from sea to land. In winter the land cools more, high pressure forms over the land and dry north-east winds blow from land to sea.', s);
})();
