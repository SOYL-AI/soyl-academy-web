// ICSE 10 Geography ch15 diagrams (allow-listed elements, palette colours only). All data here are ILLUSTRATIVE (rounded,
// made-up but realistic values for imagined districts, sites and mills), exported so questions compute every answer from the
// same numbers. SELF_CHECKS (read by build.mjs) confirm that the drawings follow the data.
import { svgDoc, S } from './lib.mjs';

const BLUE = 'var(--diagram-blue)';
const BROWN = 'var(--diagram-brown)';
const GREEN = 'var(--diagram-green)';
const MUT = 'var(--diagram-muted)';
const ACC = 'var(--diagram-accent)';
const YEL = 'var(--diagram-yellow)';
const RED = 'var(--diagram-red)';
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const r2 = (x) => Math.round(x * 100) / 100;
const r1 = (x) => Math.round(x * 10) / 10;

// ---------------------------------------------------------------- ILLUSTRATIVE factories of an imagined district
export const DIST = {
  raw: [
    { k: 'Agro-based', n: 20 },
    { k: 'Mineral-based', n: 12 },
    { k: 'Other (forest, marine)', n: 8 },
  ],
  own: [
    { k: 'Private', n: 28 },
    { k: 'Cooperative', n: 6 },
    { k: 'Public', n: 4 },
    { k: 'Joint', n: 2 },
  ],
};
export const distTotal = DIST.raw.reduce((a, r) => a + r.n, 0);
export const pct = (group, k) => r1((DIST[group].find((r) => r.k === k).n / distTotal) * 100);
export const CLASS_BAR = (() => {
  const X0 = 30;
  const W = 380;
  let s = '';
  const fills = [GREEN, BROWN, BLUE, YEL];
  let ok = DIST.own.reduce((a, r) => a + r.n, 0) === distTotal;
  ['raw', 'own'].forEach((g, gi) => {
    const y = 50 + gi * 80;
    let x = X0;
    s += lab(X0, y - 8, gi === 0 ? 'By raw material' : 'By ownership', { w: 'bold' });
    DIST[g].forEach((r, i) => {
      const w = (r.n / distTotal) * W;
      s += S.rect(x, y, w, 34, { fill: fills[i], fop: 0.5, c: 'currentColor', sw: 1 });
      if (w > 40) s += lab(x + w / 2, y + 15, `${r.n}`, { a: 'middle', w: 'bold' }) + lab(x + w / 2, y + 28, `${pct(g, r.k)}%`, { a: 'middle', size: 10 });
      x += w;
    });
    if (Math.abs(x - (X0 + W)) > 1e-6) ok = false;
  });
  s += lab(X0, 182, 'Raw material: green agro, brown mineral, blue other', { size: 10 });
  s += lab(X0, 196, 'Ownership: green private, brown cooperative, blue public, yellow joint', { size: 10 });
  s += lab(220, 214, `Imagined district, ${distTotal} factories (illustrative)`, { a: 'middle', size: 10, c: MUT });
  check(ok, `district bar: both bars fill the full width and each classification of the ${distTotal} illustrative factories adds up to the same total`);
  return svgDoc(440, 222, `Two bars dividing the ${distTotal} factories of an imagined district, illustrative. By raw material: ${DIST.raw.map((r) => `${r.k} ${r.n}`).join(', ')}. By ownership: ${DIST.own.map((r) => `${r.k} ${r.n}`).join(', ')}.`, s);
})();

// ---------------------------------------------------------------- ILLUSTRATIVE weighted scoring of two sites for a sugar mill
export const FACTORS = [
  { f: 'Raw material', w: 0.35 },
  { f: 'Market', w: 0.2 },
  { f: 'Power', w: 0.15 },
  { f: 'Labour', w: 0.15 },
  { f: 'Transport', w: 0.15 },
];
export const SITES = {
  P: { name: 'Site P (amid cane fields, Kolhapur district)', s: [9, 5, 6, 7, 6] },
  Q: { name: 'Site Q (edge of Pune city)', s: [4, 9, 8, 7, 8] },
};
export const score = (id) => r2(FACTORS.reduce((a, f, i) => a + f.w * SITES[id].s[i], 0));
export const SITE_SCORE = (() => {
  const X0 = 130;
  const K = 22; // px per score point (out of 10)
  let s = '';
  let ok = Math.abs(FACTORS.reduce((a, f) => a + f.w, 0) - 1) < 1e-9;
  FACTORS.forEach((f, i) => {
    const y = 40 + i * 28;
    s += lab(X0 - 8, y + 14, `${f.f} (×${f.w})`, { a: 'end', size: 10 });
    ['P', 'Q'].forEach((id, j) => {
      const v = SITES[id].s[i];
      s += S.rect(X0, y + j * 11, v * K, 10, { fill: j ? BLUE : GREEN, fop: 0.55, c: 'none', sw: 0 });
      s += lab(X0 + v * K + 4, y + j * 11 + 9, String(v), { size: 10 });
      if (Math.abs(v * K - SITES[id].s[i] * K) > 1e-9) ok = false;
    });
  });
  s += S.rect(X0, 190, 12, 10, { fill: GREEN, fop: 0.55, c: 'none', sw: 0 }) + lab(X0 + 16, 199, `P weighted score ${score('P')}`, { size: 10, w: 'bold' });
  s += S.rect(X0 + 170, 190, 12, 10, { fill: BLUE, fop: 0.55, c: 'none', sw: 0 }) + lab(X0 + 186, 199, `Q weighted score ${score('Q')}`, { size: 10, w: 'bold' });
  s += lab(220, 20, 'Scoring two sites for a sugar mill (scores out of 10, illustrative)', { a: 'middle', size: 11, w: 'bold' });
  ok = ok && score('P') === 7 && score('Q') === 6.65;
  check(ok, `site scoring: weights add up to 1 and the weighted scores are P ${score('P')} and Q ${score('Q')}, so the raw-material site wins for a sugar mill`);
  return svgDoc(440, 210, `Paired bars scoring two illustrative sites for a sugar mill on five factors, each out of 10, with weights ${FACTORS.map((f) => `${f.f} ${f.w}`).join(', ')}. Site P near cane fields: ${SITES.P.s.join(', ')}, weighted score ${score('P')}. Site Q at the city edge: ${SITES.Q.s.join(', ')}, weighted score ${score('Q')}.`, s);
})();

// ---------------------------------------------------------------- ILLUSTRATIVE fall in sugar recovery with delay in crushing
export const DELAY = [
  { h: 0, rec: 11.0 },
  { h: 24, rec: 10.5 },
  { h: 48, rec: 9.8 },
  { h: 72, rec: 9.0 },
];
export const sugarFrom = (t, h) => r1((DELAY.find((d) => d.h === h).rec / 100) * t);
export const SUGAR_DELAY = (() => {
  const X0 = 70;
  const Y0 = 180;
  const H = 140;
  const lo = 8;
  const hi = 12;
  const y = (v) => Y0 - ((v - lo) / (hi - lo)) * H;
  const x = (h) => X0 + (h / 72) * 300;
  let s = S.line(X0, Y0, X0 + 310, Y0, { w: 1.2 }) + S.line(X0, Y0, X0, Y0 - H, { w: 1.2 });
  for (let v = lo; v <= hi; v += 1) s += lab(X0 - 6, y(v) + 4, String(v), { a: 'end', size: 10 });
  let ok = true;
  const pts = DELAY.map((d) => [x(d.h), y(d.rec)]);
  s += S.path('M' + pts.map(([a, b]) => `${a.toFixed(1)} ${b.toFixed(1)}`).join(' L'), { c: RED, w: 2 });
  DELAY.forEach((d, i) => {
    s += S.circle(pts[i][0], pts[i][1], 3, { fill: RED, c: RED, sw: 0 }) + lab(pts[i][0], pts[i][1] - 8, `${d.rec}%`, { a: 'middle', size: 10, w: 'bold' });
    s += lab(x(d.h), Y0 + 15, `${d.h} h`, { a: 'middle', size: 10 });
    if (i > 0 && !(d.rec < DELAY[i - 1].rec)) ok = false;
  });
  s += lab(14, 28, 'sugar recovered (% of cane weight)', { size: 10 });
  s += lab(225, 212, 'hours between cutting and crushing (illustrative data)', { a: 'middle', size: 10, c: MUT });
  check(ok, `sugar delay: each point sits at its illustrative recovery (${DELAY.map((d) => `${d.h} h ${d.rec}%`).join(', ')}) and recovery falls with every extra day of delay`);
  return svgDoc(440, 220, `Line graph, illustrative: sugar recovered as a percentage of cane weight falls as the delay between cutting and crushing grows: ${DELAY.map((d) => `${d.h} hours ${d.rec} per cent`).join(', ')}.`, s);
})();

// ---------------------------------------------------------------- silk: life cycle and ILLUSTRATIVE cocoon figures
export const SILK = { cocoonPerKg: 8, cropsKarnataka: 5, cropsCool: 2, cocoonPerCrop: 120 }; // kg cocoons per kg raw silk; rearings a year; kg cocoons per rearing per acre
export const SILK_CYCLE = (() => {
  const cx = 150;
  const cy = 120;
  const R = 75;
  const stages = ['Eggs', 'Silkworms feed on leaves', 'Spin cocoons', 'Moths (a few kept for eggs)'];
  let s = '';
  const pts = stages.map((_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / stages.length;
    return [cx + R * Math.cos(a), cy + R * Math.sin(a)];
  });
  stages.forEach((st, i) => {
    const [x, y] = pts[i];
    s += S.circle(x, y, 7, { fill: [YEL, GREEN, BROWN, MUT][i], fop: 0.7, c: 'currentColor', sw: 1 });
    s += lab(x + (x < cx - 5 ? -12 : x > cx + 5 ? 12 : 0), y + (y < cy ? -12 : y > cy + 5 ? 20 : 4), st, { a: x < cx - 5 ? 'end' : x > cx + 5 ? 'start' : 'middle', size: 10 });
    const [nx, ny] = pts[(i + 1) % stages.length];
    const a1 = Math.atan2(ny - y, nx - x);
    s += S.arrow(x + 10 * Math.cos(a1), y + 10 * Math.sin(a1), nx - 11 * Math.cos(a1), ny - 11 * Math.sin(a1), { c: ACC, w: 1.5, size: 6 });
  });
  // branch: cocoons to reeling
  const [kx, ky] = pts[2];
  s += S.arrow(kx + 10, ky, 300, ky, { c: BLUE, w: 2, size: 7 });
  s += S.rect(305, ky - 22, 120, 44, { fill: BLUE, fop: 0.2, c: BLUE, sw: 1 }) + lab(365, ky - 6, 'Reeling: boil and', { a: 'middle', size: 10 }) + lab(365, ky + 8, 'unwind silk thread', { a: 'middle', size: 10 });
  s += lab(365, ky + 40, `about ${SILK.cocoonPerKg} kg cocoons`, { a: 'middle', size: 10 }) + lab(365, ky + 53, '→ 1 kg raw silk', { a: 'middle', size: 10, w: 'bold' });
  s += lab(220, 14, 'Life cycle of the silkworm (schematic; ratio illustrative)', { a: 'middle', size: 11, w: 'bold' });
  const ok = pts.every(([x, y]) => Math.abs(Math.hypot(x - cx, y - cy) - R) < 1e-9);
  check(ok, 'silk cycle: the four stages are spaced evenly on one circle and each arrow leads to the next stage');
  return svgDoc(440, 250, `Schematic life cycle of the silkworm: eggs hatch into silkworms that feed on leaves (mulberry, castor, oak, arjun or som leaves depending on the silk), the worms spin cocoons, and a few moths are kept to lay eggs. Most cocoons go to reeling, where they are boiled and the silk thread is unwound; about ${SILK.cocoonPerKg} kilograms of cocoons give 1 kilogram of raw silk (illustrative).`, s);
})();
