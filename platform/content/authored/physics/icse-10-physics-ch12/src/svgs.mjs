// ICSE 10 Physics ch12 diagrams (allow-listed elements, palette colours only). SELF_CHECKS (read by build.mjs) confirm that in
// the electric field the positive alpha particles bend towards the negative plate, the negative beta particles bend towards the
// positive plate more strongly, gamma rays go straight, and that each radiation stops at the absorber stated.
import { svgDoc, S } from './lib.mjs';

const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const ACC = 'var(--diagram-accent)';
const MUT = 'var(--diagram-muted)';
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// ---------------------------------------------------------------- deflection in an electric field (plates: + at top, − at bottom)
export const DEFLECTION = (() => {
  const src = [40, 120];
  const plateTop = 50; // positive
  const plateBot = 190; // negative
  let s = S.rect(20, 105, 30, 30, { fill: MUT, fop: 0.4 }) + lab(35, 150, 'source', { a: 'middle', size: 10 });
  s += S.line(110, plateTop, 330, plateTop, { w: 4, c: RED }) + lab(340, plateTop + 4, '+ plate', { size: 11, c: RED });
  s += S.line(110, plateBot, 330, plateBot, { w: 4, c: BLUE }) + lab(340, plateBot + 4, '− plate', { size: 11, c: BLUE });
  // paths: alpha bends gently down (towards −), beta bends sharply up (towards +), gamma straight
  const ends = { alpha: [380, 160], beta: [250, 60], gamma: [400, 120] };
  s += S.path(`M${src[0] + 10} ${src[1]} L110 120 Q 250 125 ${ends.alpha[0]} ${ends.alpha[1]}`, { c: ACC, w: 2 }) + lab(ends.alpha[0] - 20, ends.alpha[1] + 18, 'α (+2e, heavy)', { size: 10, c: ACC });
  s += S.path(`M110 120 Q 170 118 ${ends.beta[0]} ${ends.beta[1]}`, { c: GREEN, w: 2 }) + lab(ends.beta[0] + 6, ends.beta[1] + 6, 'β (−e, light)', { size: 10, c: GREEN });
  s += S.line(110, 120, ends.gamma[0], ends.gamma[1], { c: 'currentColor', w: 1.5, dash: '6 3' }) + lab(ends.gamma[0] - 70, ends.gamma[1] - 6, 'γ (no charge)', { size: 10 });
  const alphaToNeg = ends.alpha[1] > 120;
  const betaToPos = ends.beta[1] < 120;
  const betaMore = Math.abs(ends.beta[1] - 120) / (ends.beta[0] - 110) > Math.abs(ends.alpha[1] - 120) / (ends.alpha[0] - 110);
  const gammaStraight = ends.gamma[1] === 120;
  check(alphaToNeg && betaToPos && betaMore && gammaStraight, 'deflection: α bends towards the negative plate, β bends more sharply towards the positive plate, γ is undeflected');
  return svgDoc(420, 215, 'Radiations from a source pass between two charged plates, positive at the top and negative at the bottom. Alpha particles, positively charged and heavy, bend slightly towards the negative plate. Beta particles, negatively charged and very light, bend sharply towards the positive plate. Gamma rays carry no charge and go straight through.', s);
})();

// ---------------------------------------------------------------- penetrating power
export const PENETRATION = (() => {
  const rows = [
    { name: 'α', y: 50, stop: 'paper', c: ACC },
    { name: 'β', y: 100, stop: 'aluminium', c: GREEN },
    { name: 'γ', y: 150, stop: 'lead', c: 'currentColor' },
  ];
  const barrier = { paper: 120, aluminium: 220, lead: 320 };
  let s = '';
  s += S.rect(115, 25, 6, 150, { fill: MUT, fop: 0.3, c: MUT }) + lab(118, 192, 'paper', { a: 'middle', size: 10 });
  s += S.rect(210, 25, 18, 150, { fill: BLUE, fop: 0.3, c: BLUE }) + lab(219, 192, 'few mm Al', { a: 'middle', size: 10 });
  s += S.rect(310, 25, 40, 150, { fill: 'currentColor', fop: 0.25 }) + lab(330, 192, 'several cm Pb', { a: 'middle', size: 10 });
  let ok = true;
  for (const r of rows) {
    const stopX = barrier[r.stop];
    s += lab(20, r.y + 4, r.name, { size: 14, w: 'bold', c: r.c });
    s += S.arrow(40, r.y, stopX - 3, r.y, { c: r.c, w: 2 });
    const order = ['paper', 'aluminium', 'lead'];
    if (order.indexOf(r.stop) !== rows.indexOf(r)) ok = false;
  }
  check(ok, 'penetration: α stops at paper, β at a few millimetres of aluminium, γ is only reduced by several centimetres of lead (increasing penetrating power)');
  return svgDoc(380, 205, 'Penetrating power of the three radiations. Alpha particles are stopped by a sheet of paper. Beta particles pass through paper but are stopped by a few millimetres of aluminium. Gamma rays pass through both and are only greatly reduced by several centimetres of lead.', s);
})();
