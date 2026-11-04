// Build CBSE 11 Economics ch12 Market Equilibrium. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-economics-ch12/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-economics-ch01/src/lib.mjs';
import { check } from '../../cbse-11-economics-ch01/src/stats.mjs';

setUnit('cbse-11-economics-ch12', 'economics-commerce');
const Qs = await import('./questions.mjs');
const { J, inr, M1, M1d, M1dn, M1s, M1sn, M1b, M1c, M1e, M1q, M2, M2d, M3, C1, C2, M4, F1, F2, F1cost, M5, F5, M6, M6n, M7, GAS_ABOVE, P_LO, P_HI } = Qs;
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sg = (x) => (x > 0 ? `+${x}` : x < 0 ? `−${-x}` : '0');

// ---------------------------------------------------------------- figures pinned
check(M1.pe, 20, 6, 'Ratnapuri equilibrium price');
check(M1d.pe, 25, 6, 'Ratnapuri price after demand rises');
check(M1b.qe, 145, 6, 'Ratnapuri quantity after equal rises');
check(M1q.pe, 30, 6, 'Ratnapuri price when quantity unchanged');
check(C1.shortage, 300, 6, 'gas shortage at 600');
check(F1.surplus, 100, 6, 'millet surplus at 50');
check(F5.surplus, 150, 6, 'weavers without work at 180');

// ---------------------------------------------------------------- SVG helpers
const demandCurve = (c, m, x1, y1, o) => c.fn((q) => m.dInv(q), Math.max(0, m.a - m.b * y1), Math.min(x1, m.a), o);
const supplyCurve = (c, m, x1, y1, o) => c.fn((q) => m.sInv(q), Math.max(0, m.c), Math.min(x1, m.c + m.d * y1), o);
const DARK = { sw: 2.8 };
const NEW = { sw: 2.4, dash: true };

function frame(s, left, top, width, height, x1, y1, xLabel, yLabel) {
  return s.chart({ x0: 0, x1, y0: 0, y1, left, top, width, height, xLabel, yLabel });
}

// ---------------------------------------------------------------- SVG: equilibrium with excess demand and excess supply
const vEq = (() => {
  const s = new Svg(640, 440);
  const c = frame(s, 70, 40, 440, 320, 210, 44, 'Mangoes (quintals a day)', 'Price (Rs per kg)');
  demandCurve(c, M1, 210, 44, { color: 'accent', ...DARK });
  supplyCurve(c, M1, 210, 44, { color: 'blue', ...DARK });
  c.label([14, M1.dInv(14)], 'D', { color: 'accent', bold: true, dx: 14, dy: -10 });
  c.label([176, M1.sInv(176)], 'S', { color: 'blue', bold: true, dx: 14, dy: -6 });
  c.drop([M1.qe, M1.pe]).dot([M1.qe, M1.pe]).label([M1.qe, M1.pe], 'E', { bold: true, dx: 14, dy: -12 });
  c.xTick(M1.qe, String(M1.qe));
  c.yTick(M1.pe, String(M1.pe));
  c.seg([M1.qs(P_LO), P_LO], [M1.qd(P_LO), P_LO], { color: 'red', sw: 5 });
  c.dot([M1.qs(P_LO), P_LO], 'red').dot([M1.qd(P_LO), P_LO], 'red');
  c.yTick(P_LO, String(P_LO));
  c.label([(M1.qs(P_LO) + M1.qd(P_LO)) / 2, P_LO], `Excess demand ${M1.ex(P_LO)}`, { dy: 20, size: 13 });
  c.seg([M1.qd(P_HI), P_HI], [M1.qs(P_HI), P_HI], { color: 'red', sw: 5 });
  c.dot([M1.qd(P_HI), P_HI], 'red').dot([M1.qs(P_HI), P_HI], 'red');
  c.yTick(P_HI, String(P_HI));
  c.label([(M1.qd(P_HI) + M1.qs(P_HI)) / 2, P_HI], `Excess supply ${-M1.ex(P_HI)}`, { dy: -18, size: 13 });
  return s.visual(
    `Demand curve D and supply curve S for mangoes in Ratnapuri meet at E, price ${M1.pe} rupees per kg and ${M1.qe} quintals; at ${P_LO} rupees the horizontal gap between supply at ${M1.qs(P_LO)} and demand at ${M1.qd(P_LO)} is an excess demand of ${M1.ex(P_LO)}; at ${P_HI} rupees the gap between demand at ${M1.qd(P_HI)} and supply at ${M1.qs(P_HI)} is an excess supply of ${-M1.ex(P_HI)}`,
    `Imagined Ratnapuri mango market: demand qd = ${M1.a} − ${M1.b}p, supply qs = ${M1.c} + ${M1.d}p.`,
  );
})();

// ---------------------------------------------------------------- SVG: two panels, demand rises and supply rises
const vShifts = (() => {
  const s = new Svg(700, 400);
  const X1 = 260, Y1 = 50;
  const a = frame(s, 55, 50, 250, 270, X1, Y1, 'Quantity (quintals)', 'Price (Rs per kg)');
  demandCurve(a, M1, X1, Y1, { color: 'accent', ...DARK });
  supplyCurve(a, M1, X1, Y1, { color: 'blue', ...DARK });
  demandCurve(a, M1d, X1, Y1, { color: 'accent', ...NEW });
  a.label([14, M1.dInv(14)], 'D', { color: 'accent', bold: true, dx: 16, dy: -8 });
  a.label([60, M1d.dInv(60)], 'D1', { color: 'accent', bold: true, dx: 20, dy: -8 });
  a.label([200, M1.sInv(200)], 'S', { color: 'blue', bold: true, dx: 12, dy: -4 });
  a.drop([M1.qe, M1.pe]).dot([M1.qe, M1.pe]).label([M1.qe, M1.pe], 'E0', { bold: true, dx: -14, dy: 14, size: 12 });
  a.drop([M1d.qe, M1d.pe]).dot([M1d.qe, M1d.pe]).label([M1d.qe, M1d.pe], 'E1', { bold: true, dx: 16, dy: -12, size: 12 });
  a.yTick(M1.pe, String(M1.pe));
  a.yTick(M1d.pe, String(M1d.pe));
  s.text(180, 22, 'Demand rises', { bold: true, size: 15 });
  const b = frame(s, 395, 50, 250, 270, X1, Y1, 'Quantity (quintals)', 'Price (Rs per kg)');
  demandCurve(b, M1, X1, Y1, { color: 'accent', ...DARK });
  supplyCurve(b, M1, X1, Y1, { color: 'blue', ...DARK });
  supplyCurve(b, M1s, X1, Y1, { color: 'blue', ...NEW });
  b.label([14, M1.dInv(14)], 'D', { color: 'accent', bold: true, dx: 16, dy: -8 });
  b.label([200, M1.sInv(200)], 'S', { color: 'blue', bold: true, dx: 12, dy: -4 });
  b.label([170, M1s.sInv(170)], 'S1', { color: 'blue', bold: true, dx: -20, dy: 8 });
  b.drop([M1.qe, M1.pe]).dot([M1.qe, M1.pe]).label([M1.qe, M1.pe], 'E0', { bold: true, dx: 16, dy: -12, size: 12 });
  b.drop([M1s.qe, M1s.pe]).dot([M1s.qe, M1s.pe]).label([M1s.qe, M1s.pe], 'E1', { bold: true, dx: 16, dy: 12, size: 12 });
  b.yTick(M1.pe, String(M1.pe));
  b.yTick(M1s.pe, String(M1s.pe));
  s.text(520, 22, 'Supply rises', { bold: true, size: 15 });
  return s.visual(
    `Two panels of the Ratnapuri mango market: on the left the demand curve shifts right from D to D1 and the equilibrium moves from ${M1.pe} rupees and ${M1.qe} quintals to ${M1d.pe} rupees and ${M1d.qe} quintals; on the right the supply curve shifts right from S to S1 and the equilibrium moves to ${M1s.pe} rupees and ${M1s.qe} quintals`,
    `Imagined Ratnapuri market. Demand rises by ${M1d.da}: price ${M1.pe} to ${M1d.pe}, quantity ${M1.qe} to ${M1d.qe}. Supply rises by ${M1s.dc}: price ${M1.pe} to ${M1s.pe}, quantity ${M1.qe} to ${M1s.qe}.`,
  );
})();

// ---------------------------------------------------------------- SVG: simultaneous shifts
function simul(mNew, name, label, dxE1) {
  const s = new Svg(640, 440);
  const X1 = 260, Y1 = 50;
  const c = frame(s, 70, 40, 440, 320, X1, Y1, 'Quantity (quintals)', 'Price (Rs per kg)');
  demandCurve(c, M1, X1, Y1, { color: 'accent', ...DARK });
  supplyCurve(c, M1, X1, Y1, { color: 'blue', ...DARK });
  demandCurve(c, mNew, X1, Y1, { color: 'accent', ...NEW });
  supplyCurve(c, mNew, X1, Y1, { color: 'blue', ...NEW });
  c.label([14, M1.dInv(14)], 'D', { color: 'accent', bold: true, dx: 14, dy: -10 });
  c.label([30, mNew.dInv(30)], 'D1', { color: 'accent', bold: true, dx: 22, dy: -10 });
  c.label([200, M1.sInv(200)], 'S', { color: 'blue', bold: true, dx: 12, dy: 8 });
  c.label([215, mNew.sInv(215)], 'S1', { color: 'blue', bold: true, dx: 16, dy: 6 });
  c.drop([M1.qe, M1.pe]).dot([M1.qe, M1.pe]).label([M1.qe, M1.pe], 'E0', { bold: true, dx: -14, dy: 14, size: 12 });
  c.drop([mNew.qe, mNew.pe]).dot([mNew.qe, mNew.pe]).label([mNew.qe, mNew.pe], 'E1', { bold: true, dx: dxE1, dy: 14, size: 12 });
  c.yTick(M1.pe, String(M1.pe));
  if (mNew.pe !== M1.pe) c.yTick(mNew.pe, String(mNew.pe));
  c.xTick(M1.qe, String(M1.qe));
  if (mNew.qe !== M1.qe) c.xTick(mNew.qe, String(mNew.qe));
  return s.visual(name, label);
}
const vBothEq = simul(M1b, `Mango market of Ratnapuri with both curves shifting right by the same amount: demand from D to D1 and supply from S to S1 meet at E1 at the same price of ${M1b.pe} rupees as E0 but at a larger quantity of ${M1b.qe} quintals`, `Imagined Ratnapuri market. Demand and supply each rise by ${M1b.da}: price stays at ${M1b.pe}, quantity rises from ${M1.qe} to ${M1b.qe}.`, 18);
const vQtySame = (() => {
  // demand rises by 50 and supply falls by 40: price rises, quantity unchanged
  const s = new Svg(640, 440);
  const X1 = 260, Y1 = 50;
  const c = frame(s, 70, 40, 440, 320, X1, Y1, 'Quantity (quintals)', 'Price (Rs per kg)');
  demandCurve(c, M1, X1, Y1, { color: 'accent', ...DARK });
  supplyCurve(c, M1, X1, Y1, { color: 'blue', ...DARK });
  demandCurve(c, M1q, X1, Y1, { color: 'accent', ...NEW });
  supplyCurve(c, M1q, X1, Y1, { color: 'blue', ...NEW });
  c.label([14, M1.dInv(14)], 'D', { color: 'accent', bold: true, dx: 14, dy: -10 });
  c.label([30, M1q.dInv(30)], 'D1', { color: 'accent', bold: true, dx: 22, dy: -10 });
  c.label([160, M1.sInv(160)], 'S', { color: 'blue', bold: true, dx: 14, dy: 8 });
  c.label([130, M1q.sInv(130)], 'S1', { color: 'blue', bold: true, dx: -20, dy: -10 });
  c.drop([M1.qe, M1.pe]).dot([M1.qe, M1.pe]).label([M1.qe, M1.pe], 'E0', { bold: true, dx: 16, dy: 14, size: 12 });
  c.drop([M1q.qe, M1q.pe]).dot([M1q.qe, M1q.pe]).label([M1q.qe, M1q.pe], 'E1', { bold: true, dx: 18, dy: -12, size: 12 });
  c.yTick(M1.pe, String(M1.pe));
  c.yTick(M1q.pe, String(M1q.pe));
  c.xTick(M1.qe, String(M1.qe));
  return s.visual(
    `Mango market of Ratnapuri: demand shifts right from D to D1 by ${M1q.da} and supply shifts left from S to S1 by ${-M1q.dc}; the new equilibrium E1 is at the higher price of ${M1q.pe} rupees but at the same quantity of ${M1q.qe} quintals as E0`,
    `Imagined Ratnapuri market. Demand rises by ${M1q.da} and supply falls by ${-M1q.dc}: price ${M1.pe} to ${M1q.pe}, quantity unchanged at ${M1q.qe}.`,
  );
})();

// ---------------------------------------------------------------- SVG: price ceiling and price floor
const vCeiling = (() => {
  const s = new Svg(680, 470);
  const X1 = 1250, Y1 = 1300;
  const c = frame(s, 80, 40, 520, 340, X1, Y1, 'Cylinders a week', 'Price (Rs per cylinder)');
  demandCurve(c, M3, X1, Y1, { color: 'accent', ...DARK });
  supplyCurve(c, M3, X1, Y1, { color: 'blue', ...DARK });
  c.label([60, M3.dInv(60)], 'D', { color: 'accent', bold: true, dx: 16, dy: -10 });
  c.label([600, M3.sInv(600)], 'S', { color: 'blue', bold: true, dx: 16, dy: -4 });
  c.drop([M3.qe, M3.pe]).dot([M3.qe, M3.pe]).label([M3.qe, M3.pe], 'E', { bold: true, dx: 14, dy: -12 });
  c.xTick(M3.qe, String(M3.qe));
  c.yTick(M3.pe, String(M3.pe));
  c.seg([0, C1.pc], [1100, C1.pc], { color: 'green', sw: 2.4, dash: true });
  c.label([1100, C1.pc], `Ceiling ${C1.pc}`, { anchor: 'end', dy: -14, size: 13 });
  c.yTick(C1.pc, String(C1.pc));
  c.seg([C1.qs, C1.pc], [C1.qd, C1.pc], { color: 'red', sw: 5 });
  c.dot([C1.qs, C1.pc], 'red').dot([C1.qd, C1.pc], 'red');
  c.xTick(C1.qs, String(C1.qs));
  c.xTick(C1.qd, String(C1.qd));
  c.label([(C1.qs + C1.qd) / 2, C1.pc], `Shortage ${C1.shortage}`, { dy: 22, size: 13 });
  return s.visual(
    `Demand curve D and supply curve S for cooking gas cylinders in Chandanpur meet at E, price ${M3.pe} rupees and ${M3.qe} cylinders; a price ceiling of ${C1.pc} rupees below the equilibrium price leaves supply at ${C1.qs} cylinders and demand at ${C1.qd}, a shortage of ${C1.shortage} cylinders marked on the ceiling line`,
    `Imagined Chandanpur market: demand qd = ${M3.a} − p, supply qs = ${M3.d}p. Ceiling ${C1.pc}: supply ${C1.qs}, demand ${C1.qd}, shortage ${C1.shortage}.`,
  );
})();
const vFloor = (() => {
  const s = new Svg(680, 470);
  const X1 = 560, Y1 = 100;
  const c = frame(s, 80, 40, 520, 340, X1, Y1, 'Millet (thousand kg a month)', 'Price (Rs per kg)');
  demandCurve(c, M4, X1, Y1, { color: 'accent', ...DARK });
  supplyCurve(c, M4, X1, Y1, { color: 'blue', ...DARK });
  c.label([120, M4.dInv(120)], 'D', { color: 'accent', bold: true, dx: 16, dy: -10 });
  c.label([520, M4.sInv(520)], 'S', { color: 'blue', bold: true, dx: 12, dy: 10 });
  c.drop([M4.qe, M4.pe]).dot([M4.qe, M4.pe]).label([M4.qe, M4.pe], 'E', { bold: true, dx: 14, dy: 12 });
  c.yTick(M4.pe, String(M4.pe));
  c.seg([0, F1.pf], [520, F1.pf], { color: 'green', sw: 2.4, dash: true });
  c.label([520, F1.pf], `Floor ${F1.pf}`, { anchor: 'end', dy: -26, size: 13 });
  c.yTick(F1.pf, String(F1.pf));
  c.seg([F1.qd, F1.pf], [F1.qs, F1.pf], { color: 'red', sw: 5 });
  c.dot([F1.qd, F1.pf], 'red').dot([F1.qs, F1.pf], 'red');
  c.xTick(F1.qd, String(F1.qd));
  c.xTick(F1.qs, String(F1.qs));
  c.label([(F1.qd + F1.qs) / 2, F1.pf], `Surplus ${F1.surplus}`, { dy: -14, size: 13 });
  return s.visual(
    `Demand curve D and supply curve S for millet in Dhanpur meet at E, price ${M4.pe} rupees and ${M4.qe} thousand kg; a price floor of ${F1.pf} rupees above the equilibrium price leaves demand at ${F1.qd} and supply at ${F1.qs}, a surplus of ${F1.surplus} thousand kg marked on the floor line`,
    `Imagined Dhanpur market: demand qd = ${M4.a} − ${M4.b}p, supply qs = ${M4.c} + ${M4.d}p. Floor ${F1.pf}: demand ${F1.qd}, supply ${F1.qs}, surplus ${F1.surplus}.`,
  );
})();

// ---------------------------------------------------------------- flows and tables, deck 1
const vRoute1 = flow('LR', ['Market equilibrium', 'Excess demand and excess supply', 'The invisible hand', 'Shifts of demand and supply'], 'Route map of part 1: market equilibrium, excess demand and excess supply, the invisible hand, shifts of demand and supply', 'Part 1 at a glance');
const tDefs = table(
  ['Term', 'Meaning'],
  [
    ['Equilibrium price', 'The price at which quantity demanded equals quantity supplied'],
    ['Equilibrium quantity', 'The quantity bought and sold at the equilibrium price'],
    ['Market clearing', 'No buyer who wishes to buy at that price is turned away, and no seller is left with unsold stock'],
    ['Setting of this part', 'A perfectly competitive market with a fixed number of firms'],
  ],
  'Table of definitions: equilibrium price, equilibrium quantity, market clearing and the setting of a fixed number of firms',
  'Market equilibrium.',
);
const pr = [10, 15, 20, 25, 30];
const pressure = (e) => (e > 0 ? 'Price rises' : e < 0 ? 'Price falls' : '**None: equilibrium**');
const tSched1 = table(
  ['Price (Rs per kg)', 'Quantity demanded', 'Quantity supplied', 'Excess demand (+) or supply (−)', 'Pressure on price'],
  pr.map((p) => [String(p), String(M1.qd(p)), String(M1.qs(p)), sg(M1.ex(p)), pressure(M1.ex(p))]),
  `Table of the imagined Ratnapuri mango market for prices ${J(pr)} rupees: quantity demanded ${J(pr.map(M1.qd))}, quantity supplied ${J(pr.map(M1.qs))}, so the gap is ${J(pr.map((p) => sg(M1.ex(p))))} and the market clears at ${M1.pe} rupees`,
  `Imagined Ratnapuri mangoes (quintals a day): qd = ${M1.a} − ${M1.b}p, qs = ${M1.c} + ${M1.d}p.`,
);
const tEx1 = table(
  ['Step', 'Working', 'Result'],
  [
    ['Set demand equal to supply', `${M1.a} − ${M1.b}p = ${M1.c} + ${M1.d}p`, ''],
    ['Collect terms', `${M1.a - M1.c} = ${M1.b + M1.d}p`, `p = **${M1.pe}**`],
    ['Put the price into demand', `${M1.a} − ${M1.b} × ${M1.pe}`, `q = **${M1.qe}**`],
    ['Check with supply', `${M1.c} + ${M1.d} × ${M1.pe}`, `**${M1.qs(M1.pe)}**`],
  ],
  `Worked table: equating demand and supply gives a price of ${M1.pe} rupees per kg and a quantity of ${M1.qe} quintals, confirmed by supply`,
  'Imagined Ratnapuri mangoes.',
);
const tLow = table(
  ['At Rs 10 per kg', 'Quintals a day'],
  [['Quantity demanded', String(M1.qd(P_LO))], ['Quantity supplied', String(M1.qs(P_LO))], ['Gap', `${M1.ex(P_LO)} (excess demand)`]],
  `Table of the Ratnapuri mango market at ${P_LO} rupees: quantity demanded ${M1.qd(P_LO)}, quantity supplied ${M1.qs(P_LO)}, excess demand ${M1.ex(P_LO)}`,
  'Imagined Ratnapuri mangoes.',
);
const vED = flow('LR', ['Price below equilibrium', 'Quantity demanded exceeds quantity supplied', 'Buyers compete and bid the price up', 'Price rises; the gap narrows to zero'], 'Flow from a price below equilibrium to excess demand, to buyers bidding the price up, to a rising price and a narrowing gap', 'Excess demand');
const vES = flow('LR', ['Price above equilibrium', 'Quantity supplied exceeds quantity demanded', 'Sellers with unsold stock cut the price', 'Price falls; the gap narrows to zero'], 'Flow from a price above equilibrium to excess supply, to sellers cutting the price, to a falling price and a narrowing gap', 'Excess supply');
const tSides = table(
  ['Price compared with equilibrium', 'Situation', 'Movement of price'],
  [
    ['Below', 'Excess demand: quantity demanded exceeds quantity supplied', 'Rises'],
    ['Equal', 'Quantity demanded equals quantity supplied', 'No tendency to change'],
    ['Above', 'Excess supply: quantity supplied exceeds quantity demanded', 'Falls'],
  ],
  'Table of the three cases: price below equilibrium gives excess demand and a rising price, price at equilibrium gives no change, price above gives excess supply and a falling price',
  'Out of equilibrium.',
);
const vHand = flow('LR', ['Many buyers choose for themselves', 'Many sellers choose for themselves', 'Competition moves the price', 'Market clears with no central planner'], 'Flow of the invisible hand: many buyers and sellers choose for themselves, competition moves the price, and the market clears without a central planner', 'The invisible hand');
const tM6 = table(
  ['Price (Rs per kg)', 'Quantity demanded', 'Quantity supplied', 'Excess (+ demand, − supply)'],
  M6.p.map((p, i) => [String(p), String(M6.qd[i]), String(M6.qs[i]), sg(M6.ex[i])]),
  `Table of the imagined Meghgaon tomato market: equilibrium at ${M6.pe} rupees where demand and supply are both ${M6.qe}; excess ${J(M6.ex.map(sg))} across the prices ${J(M6.p)}`,
  'Imagined Meghgaon tomatoes (quintals a day).',
);
const tFirms = table(
  ['Period', 'Number of firms', 'What adjusts'],
  [
    ['Short run (this chapter)', 'Fixed', 'Price and quantity, as demand and supply shift'],
    ['Long run, free entry and exit', 'Can change', 'Price tends to the minimum average cost'],
  ],
  'Table comparing the short run with a fixed number of firms, in which price and quantity adjust, and the long run with free entry and exit, in which price tends to the minimum average cost',
  'Fixed number of firms.',
);
const dRows = [15, 20, 25, 30];
const tDup = table(
  ['Price (Rs per kg)', 'Supply', 'Old demand', `New demand (+${M1d.da})`, 'Excess at new demand'],
  dRows.map((p) => [String(p), String(M1.qs(p)), String(M1.qd(p)), String(M1d.qd(p)), sg(M1d.qd(p) - M1d.qs(p))]),
  `Table of the Ratnapuri mango market after demand rises by ${M1d.da}: at ${J(dRows)} rupees new demand is ${J(dRows.map(M1d.qd))} against supply ${J(dRows.map(M1.qs))}, so the market clears at ${M1d.pe} rupees`,
  'Imagined Ratnapuri mangoes (quintals a day).',
);
const tEx3 = table(
  ['Step', 'Working', 'Result'],
  [
    ['New demand', `${M2.a} + ${M2d.da} − ${M2.b}p`, `${M2d.a} − ${M2d.b}p`],
    ['Equate with supply', `${M2d.a} − ${M2d.b}p = −${-M2.c} + ${M2.d}p`, `${M2d.a - M2d.c} = ${M2d.b + M2d.d}p`],
    ['New price', `${M2d.a - M2d.c} ÷ ${M2d.b + M2d.d}`, `**${M2d.pe}**`],
    ['New quantity', `${M2d.a} − ${M2d.b} × ${M2d.pe}`, `**${M2d.qe}**`],
  ],
  `Worked table for Sagarpur cement: demand rises by ${M2d.da}, the new price is ${M2d.pe} rupees and the new quantity is ${M2d.qe} thousand bags, against ${M2.pe} and ${M2.qe} before`,
  `Imagined Sagarpur cement; before: Rs ${M2.pe}, ${M2.qe} thousand bags.`,
);
const tM7 = table(
  ['Price (Rs per candle)', 'Quantity demanded', 'Quantity supplied'],
  M7.p.map((p, i) => [String(p), String(M7.qd[i]), String(M7.qs[i])]),
  `Table of the imagined Deepgaon candle market for prices ${J(M7.p)} rupees: quantity demanded ${J(M7.qd)} and quantity supplied ${J(M7.qs)} hundred candles`,
  'Imagined Deepgaon candles (hundreds a week).',
);
const tSingle = table(
  ['Change (number of firms fixed)', 'Price', 'Quantity'],
  [
    [`Demand rises by ${M1d.da}`, `${M1.pe} → ${M1d.pe} (rises)`, `${M1.qe} → ${M1d.qe} (rises)`],
    [`Demand falls by ${-M1dn.da}`, `${M1.pe} → ${M1dn.pe} (falls)`, `${M1.qe} → ${M1dn.qe} (falls)`],
    [`Supply rises by ${M1s.dc}`, `${M1.pe} → ${M1s.pe} (falls)`, `${M1.qe} → ${M1s.qe} (rises)`],
    [`Supply falls by ${-M1sn.dc}`, `${M1.pe} → ${M1sn.pe} (rises)`, `${M1.qe} → ${M1sn.qe} (falls)`],
  ],
  `Table of the four single shifts in the Ratnapuri mango market: demand rising gives ${M1d.pe} and ${M1d.qe}, demand falling gives ${M1dn.pe} and ${M1dn.qe}, supply rising gives ${M1s.pe} and ${M1s.qe}, supply falling gives ${M1sn.pe} and ${M1sn.qe}`,
  `Imagined Ratnapuri mangoes; starting point Rs ${M1.pe}, ${M1.qe} quintals.`,
);
const tSum1 = table(
  ['Idea', 'Remember'],
  [
    ['Equilibrium', 'Quantity demanded equals quantity supplied'],
    ['Excess demand', 'Price below equilibrium; price rises'],
    ['Excess supply', 'Price above equilibrium; price falls'],
    ['Demand shifts right', 'Price and quantity both rise'],
    ['Supply shifts right', 'Price falls, quantity rises'],
    ['Fixed firms', 'Short-run setting of the chapter'],
  ],
  'Summary table of part 1: equilibrium, excess demand, excess supply, effects of a rise in demand and a rise in supply, and the fixed number of firms',
);

// ---------------------------------------------------------------- flows and tables, deck 2
const vRoute2 = flow('LR', ['Both curves shift', 'Why governments control prices', 'Price ceiling', 'Price floor', 'Minimum wage'], 'Route map of part 2: both curves shifting, why governments control prices, price ceiling, price floor and minimum wage', 'Part 2 at a glance');
const tRule = table(
  ['Shift of demand compared with shift of supply (both rising)', 'Price', 'Quantity'],
  [
    ['Demand shifts more', 'Rises', 'Rises'],
    ['Equal shifts', '**Unchanged**', 'Rises'],
    ['Supply shifts more', 'Falls', 'Rises'],
  ],
  'Table of the rule when demand and supply both rise: if demand shifts more the price rises, if the shifts are equal the price is unchanged, if supply shifts more the price falls, and quantity rises in every case',
  'Both curves shift to the right.',
);
const cases = [[M1b, 'Equal'], [M1c, 'Demand more'], [M1e, 'Supply more']];
const tCases = table(
  ['Case', 'Rise in demand', 'Rise in supply', 'New price', 'New quantity'],
  cases.map(([m, name]) => [name, String(m.da), String(m.dc), String(m.pe), String(m.qe)]),
  `Table of three cases in the Ratnapuri mango market: equal rises of ${M1b.da} give ${M1b.pe} rupees and ${M1b.qe} quintals; demand ${M1c.da} and supply ${M1c.dc} give ${M1c.pe} and ${M1c.qe}; demand ${M1e.da} and supply ${M1e.dc} give ${M1e.pe} and ${M1e.qe}`,
  `Imagined Ratnapuri mangoes; before: Rs ${M1.pe}, ${M1.qe} quintals.`,
);
const tWage = table(
  ['Wage (Rs a day)', 'Weavers demanded', 'Weavers offered', 'Gap'],
  [120, 150, 180].map((w) => [String(w), String(M5.qd(w)), String(M5.qs(w)), sg(M5.ex(w))]),
  `Table of the imagined weaving cluster of Kareempur: at ${M5.pe} rupees a day employers demand ${M5.qd(M5.pe)} weavers and ${M5.qs(M5.pe)} offer to work, the wage that clears the labour market; at 180 rupees ${F5.surplus} weavers are without work`,
  'Imagined Kareempur weavers: wage per day, number of weavers.',
);
const vWhy = flow('LR', ['Price of a necessity seems too high for poorer households', 'Government sets a maximum price: a ceiling', 'Farm price seems too low for farmers', 'Government sets a minimum price: a floor'], 'Flow of the aims of price controls: a ceiling to keep a necessity affordable and a floor to support farmers', 'Why governments control prices');
const tCeilDef = table(
  ['Term', 'Meaning', 'Imagined example'],
  [
    ['Price ceiling', 'A maximum price fixed by the government, normally below the equilibrium price', `Chandanpur fixes Rs ${C1.pc} for a gas cylinder; free price Rs ${M3.pe}`],
    ['Binding ceiling', 'A ceiling below equilibrium, which changes what happens in the market', `Rs ${C1.pc} is below Rs ${M3.pe}`],
    ['Non-binding ceiling', 'A ceiling above equilibrium, which has no effect', `Rs ${GAS_ABOVE} is above Rs ${M3.pe}`],
  ],
  'Table of the price ceiling, a binding ceiling and a non-binding ceiling with imagined Chandanpur cooking gas examples',
  'Price ceiling.',
);
const tEx2 = table(
  ['Ceiling (Rs)', 'Demand', 'Supply', 'Shortage', 'Highest price buyers would pay for the supply'],
  [C1, C2].map((c) => [String(c.pc), String(c.qd), String(c.qs), `**${c.shortage}**`, String(c.bm)]),
  `Worked table for Chandanpur gas: at a ceiling of ${C1.pc} demand is ${C1.qd}, supply ${C1.qs}, shortage ${C1.shortage}; at ${C2.pc} demand is ${C2.qd}, supply ${C2.qs}, shortage ${C2.shortage}`,
  `Imagined Chandanpur gas cylinders; free price Rs ${M3.pe}.`,
);
const vCeilEff = flow('LR', ['Ceiling below equilibrium', 'Shortage: demand exceeds supply', 'Rationing, ration cards and queues', 'Possible black market and lower quality'], 'Flow from a ceiling below equilibrium to a shortage, then to rationing and queues, then to a possible black market and lower quality', 'Effects of a ceiling');
const tFloorDef = table(
  ['Term', 'Meaning', 'Imagined example'],
  [
    ['Price floor', 'A minimum price fixed by the government, normally above the equilibrium price', `Dhanpur fixes Rs ${F1.pf} for millet; free price Rs ${M4.pe}`],
    ['Binding floor', 'A floor above equilibrium, which changes what happens in the market', `Rs ${F1.pf} is above Rs ${M4.pe}`],
    ['Minimum wage', 'A floor on the wage, the price of labour', 'A lowest daily wage for weavers'],
  ],
  'Table of the price floor, a binding floor and a minimum wage with imagined Dhanpur millet examples',
  'Price floor.',
);
const tEx4 = table(
  ['Floor (Rs per kg)', 'Demand', 'Supply', 'Surplus', 'Government spending to buy it (Rs thousand)'],
  [F1, F2].map((f) => [String(f.pf), String(f.qd), String(f.qs), `**${f.surplus}**`, String(f.surplus * f.pf)]),
  `Worked table for Dhanpur millet: at a floor of ${F1.pf} demand is ${F1.qd}, supply ${F1.qs}, surplus ${F1.surplus}; at ${F2.pf} demand is ${F2.qd}, supply ${F2.qs}, surplus ${F2.surplus}`,
  `Imagined Dhanpur millet (thousand kg a month); free price Rs ${M4.pe}.`,
);
const vFloorEff = flow('LR', ['Floor above equilibrium', 'Surplus: supply exceeds demand', 'Government may buy the surplus', 'Buffer stock held; cost of purchase and storage'], 'Flow from a floor above equilibrium to a surplus, then to government purchase, then to a buffer stock with costs of purchase and storage', 'Effects of a floor');
const tFloorFb = table(
  ['Floor (Rs per kg)', 'Surplus (thousand kg)'],
  [[String(F1.pf), String(F1.surplus)], [String(F2.pf), String(F2.surplus)]],
  `Table showing the surplus of Dhanpur millet: ${F1.surplus} at a floor of ${F1.pf} rupees and ${F2.surplus} at ${F2.pf} rupees`,
  'Imagined Dhanpur millet.',
);
const tAllEff = table(
  ['Event', 'Effect'],
  [
    ['Demand rises, firms fixed', 'Price and quantity both rise'],
    ['Supply rises', 'Price falls, quantity rises'],
    ['Binding ceiling', 'Shortage, rationing, queues'],
    ['Binding floor', 'Surplus, government purchase, buffer stock'],
  ],
  'Table of events and effects: demand rising raises price and quantity, supply rising lowers price and raises quantity, a binding ceiling gives a shortage, a binding floor gives a surplus',
  'Effects at a glance.',
);
const tMin = table(
  ['At a minimum wage of Rs 180', 'Weavers'],
  [['Demanded by employers', String(F5.qd)], ['Offered by weavers', String(F5.qs)], ['Without work', `**${F5.surplus}**`], ['Employed, against the free-market figure', `${F5.traded}, against ${M5.qe}`]],
  `Table for the Kareempur minimum wage of ${F5.pf} rupees: ${F5.qd} weavers demanded, ${F5.qs} offered, ${F5.surplus} without work, employment ${F5.traded} against ${M5.qe}`,
  'Imagined Kareempur weavers.',
);
const tSum2 = table(
  ['Idea', 'Remember'],
  [
    ['Both curves shift right', 'Quantity rises; price rises, stays or falls by the sizes of the shifts'],
    ['Price ceiling', 'Maximum price below equilibrium: shortage'],
    ['Price floor', 'Minimum price above equilibrium: surplus'],
    ['Non-binding control', 'A ceiling above or a floor below equilibrium has no effect'],
    ['Rationing, buffer stock', 'Ways of sharing a shortage, of holding a surplus'],
    ['Minimum wage', 'A floor on the wage: more weavers offer work than are hired'],
  ],
  'Summary table of part 2: shifts of both curves, price ceiling, price floor, non-binding controls, rationing and buffer stock, minimum wage',
);

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'Market Equilibrium — Part 1: Equilibrium and Single Shifts',
  goals: [
    'Define equilibrium price and equilibrium quantity',
    'Explain how excess demand and excess supply move the price to equilibrium',
    'Describe the invisible hand in general terms',
    'Find the effect of a shift of demand or of supply on equilibrium, with a fixed number of firms',
  ],
  slides: [
    sl('title', 'Market Equilibrium: Where Demand Meets Supply', {
      b: 'Part 1 — equilibrium, the gaps away from it, and the effect of a **shift** of demand or supply.',
      v: vRoute1,
      n: 'In a market, buyers and sellers decide together how much is bought and at what price. This part defines the balance point of a market, shows how excess demand and excess supply push the price towards it, and studies what happens when the demand or the supply changes, with the number of firms fixed.',
    }),
    sl('concept', 'Market equilibrium', {
      b: 'The **equilibrium price** is the price at which **quantity demanded equals quantity supplied**. The quantity traded at that price is the **equilibrium quantity**.',
      v: tDefs,
      n: 'Equilibrium is the price at which the quantity buyers wish to buy is exactly the quantity sellers wish to sell. The market clears: nobody who wants to buy at that price is turned away and no seller is left with unsold stock. This chapter studies perfect competition with a fixed number of firms.',
    }),
    sl('concept', 'The mango market of Ratnapuri', {
      b: 'Compare quantity demanded and quantity supplied at each price. The gap shows which way the price will move.',
      v: tSched1,
      n: `The table shows an imagined mango market. At ten rupees buyers want ${M1.qd(10)} quintals and sellers offer ${M1.qs(10)}. At twenty rupees both are ${M1.qe}. At thirty rupees buyers want ${M1.qd(30)} and sellers offer ${M1.qs(30)}. Only one price balances the two sides, and that price is the equilibrium price.`,
    }),
    sl('concept', 'Equilibrium on a graph', {
      b: 'Demand slopes down, supply slopes up, and they cross at **E**. Below E the horizontal gap is **excess demand**; above it, **excess supply**.',
      v: vEq,
      n: `On the graph the demand curve falls and the supply curve rises. They cross at the equilibrium, price ${M1.pe} rupees and quantity ${M1.qe} quintals. At ten rupees the supply curve lies to the left of the demand curve, so there is excess demand of ${M1.ex(10)}. At thirty rupees the demand curve is on the left, so there is excess supply of ${-M1.ex(30)}.`,
    }),
    sl('example', 'Worked example 1: finding the equilibrium', {
      b: `Buyers demand **qd = ${M1.a} − ${M1.b}p**; sellers supply **qs = ${M1.c} + ${M1.d}p**.`,
      bl: [
        `Step 1 — Set qd = qs: ${M1.a} − ${M1.b}p = ${M1.c} + ${M1.d}p.`,
        `Step 2 — Collect terms: ${M1.a - M1.c} = ${M1.b + M1.d}p, so **p = ${M1.pe}**.`,
        `Step 3 — Put p into demand: q = ${M1.a} − ${M1.b} × ${M1.pe} = **${M1.qe}**, and supply gives the same.`,
      ],
      v: tEx1,
      n: `To find equilibrium, set quantity demanded equal to quantity supplied. Here ${M1.a} minus ${M1.b} times the price equals ${M1.c} plus ${M1.d} times the price. Collecting terms gives ${M1.a - M1.c} equals ${M1.b + M1.d} times the price, so the price is ${M1.pe}. Putting it into demand gives ${M1.qe} quintals, and supply agrees.`,
    }),
    sl('check', 'Quick check: price below equilibrium', {
      b: 'Decide what the price will do.',
      v: tLow,
      chk: 'm_ed_price',
      n: 'Look at the figures at ten rupees. Compare how much buyers want with how much sellers offer. Ask which side is short, and then what that side will do to the price. Pick the option that gives both the direction and the correct size of the gap.',
    }),
    sl('concept', 'Excess demand: a price below equilibrium', {
      b: 'When **quantity demanded > quantity supplied**, buyers cannot all be served, so the price **rises**.',
      v: vED,
      n: 'If the price is below equilibrium, buyers want more than sellers offer. This is excess demand. Buyers who cannot get the good are ready to pay more, and sellers see that they can ask for more. The price therefore rises. As it rises, buyers want less and sellers offer more, so the gap narrows until it disappears.',
    }),
    sl('concept', 'Excess supply: a price above equilibrium', {
      b: 'When **quantity supplied > quantity demanded**, sellers are left with unsold stock, so the price **falls**.',
      v: vES,
      n: 'If the price is above equilibrium, sellers offer more than buyers want. This is excess supply. Sellers with unsold goods compete for buyers by cutting the price. As the price falls, buyers want more and sellers offer less, so the gap narrows until the market clears at the equilibrium price.',
    }),
    sl('check', 'Quick check: the steps of adjustment', {
      b: 'Arrange the steps from a low price to equilibrium.',
      v: tSides,
      chk: 'ord_adjust',
      n: 'Start from a price below equilibrium. Ask what gap opens up at that price, then what the buyers do about it, and finally what happens to the gap as the price changes. Put the four steps in the order in which they occur.',
    }),
    sl('concept', 'The invisible hand', {
      b: 'Price moves to equilibrium through the **separate decisions of many buyers and sellers**, with no authority directing it.',
      v: vHand,
      n: 'Economists describe this adjustment with the image of an invisible hand. No single person sets the market clearing price. Each buyer and each seller decides for himself or herself, and competition for scarce goods or for customers moves the price to the level at which the market clears.',
    }),
    sl('example', 'Worked example 2: the tomato market of Meghgaon', {
      b: 'Find the equilibrium from the schedule and the pressure on price at the other prices.',
      bl: [
        `Step 1 — Scan for the row where demand equals supply: **Rs ${M6.pe}**, both **${M6.qe}** quintals.`,
        `Step 2 — At Rs ${M6.p[1]}: ${M6.qd[1]} − ${M6.qs[1]} = **${M6.ex[1]}** excess demand, so the price rises.`,
        `Step 3 — At Rs ${M6.p[5]}: ${M6.qs[5]} − ${M6.qd[5]} = **${-M6.ex[5]}** excess supply, so the price falls.`,
      ],
      v: tM6,
      n: `Read down the schedule until the two quantities are equal. That is at ${M6.pe} rupees, where both are ${M6.qe} quintals. At ${M6.p[1]} rupees demand exceeds supply by ${M6.ex[1]}, so the price will rise. At ${M6.p[5]} rupees supply exceeds demand by ${-M6.ex[5]}, so the price will fall.`,
    }),
    sl('check', 'Quick check: excess demand', {
      b: 'Compute the excess demand at Rs 10 per kg.',
      v: tSched1,
      chk: 'n_m1_ex10',
      n: 'Work out the quantity demanded and the quantity supplied at the given price from the two functions. Subtract supply from demand. The answer is the excess demand, in quintals. You can check it against the table.',
    }),
    sl('concept', 'A fixed number of firms', {
      b: 'In this chapter the **number of firms is fixed**, so supply responds only through the price. With free entry and exit, price tends to the minimum average cost in the long run.',
      v: tFirms,
      n: 'We study the short run, in which the number of firms cannot change. Price and quantity then adjust only as demand and supply shift. In the long run, if firms can enter and leave freely, the price tends towards the lowest point of average cost, but that story belongs to a later study.',
    }),
    sl('concept', 'A rise in demand', {
      b: `If demand rises by **${M1d.da}** at every price, there is excess demand at the old price of ${M1.pe}, so the price rises.`,
      v: tDup,
      n: `Suppose a rise in incomes adds ${M1d.da} quintals to demand at every price. At the old price of ${M1.pe} rupees, demand is now ${M1d.qd(M1.pe)} against supply of ${M1.qs(M1.pe)}. The price rises. It settles at ${M1d.pe} rupees, where demand and supply are both ${M1d.qe} quintals.`,
    }),
    sl('concept', 'A rise in demand and a rise in supply', {
      b: 'Rise in demand: price **up**, quantity **up**. Rise in supply: price **down**, quantity **up**.',
      v: vShifts,
      n: `On the left the demand curve shifts right. The equilibrium moves up along the supply curve, to a higher price and a larger quantity. On the right the supply curve shifts right. The equilibrium moves down along the demand curve, to a lower price of ${M1s.pe} rupees and a larger quantity of ${M1s.qe} quintals.`,
    }),
    sl('example', 'Worked example 3: cement demand rises', {
      b: `Sagarpur cement: **qd = ${M2.a} − ${M2.b}p**, **qs = −${-M2.c} + ${M2.d}p**; demand then rises by ${M2d.da}.`,
      bl: [
        `Step 1 — New demand: ${M2d.a} − ${M2d.b}p.`,
        `Step 2 — Equate with supply: ${M2d.a - M2d.c} = ${M2d.b + M2d.d}p, so **p = ${M2d.pe}**.`,
        `Step 3 — Quantity: ${M2d.a} − ${M2d.b} × ${M2d.pe} = **${M2d.qe}**; the price and quantity both rise.`,
      ],
      v: tEx3,
      n: `The old equilibrium is ${M2.pe} rupees and ${M2.qe} thousand bags. Demand now rises by ${M2d.da} thousand bags at every price. The new demand curve meets the same supply curve at ${M2d.pe} rupees and ${M2d.qe} thousand bags. Both price and quantity are higher, as expected when only demand has risen.`,
    }),
    sl('check', 'Quick check: reading a schedule', {
      b: 'True or false: at the lowest price in the table there is excess supply.',
      v: tM7,
      chk: 'tf_ed_price',
      n: 'Look at the first row of the candle table. Compare the quantity demanded with the quantity supplied at that price. If buyers want more than sellers offer, there is excess demand. If sellers offer more, there is excess supply. Then decide whether the statement is true or false.',
    }),
    sl('concept', 'All four single shifts', {
      b: 'A shift of **demand** moves price and quantity in the **same** direction; a shift of **supply** moves them in **opposite** directions.',
      v: tSingle,
      n: `Look at the four cases together. A rise in demand raises both price and quantity. A fall in demand lowers both. A rise in supply lowers the price but raises the quantity. A fall in supply raises the price but lowers the quantity. In each case the equilibrium moves along the curve that has not shifted.`,
    }),
    sl('summary', 'Summary of Part 1', {
      v: tSum1,
      n: 'To recap. Equilibrium is the price at which quantity demanded equals quantity supplied. A price below it causes excess demand and the price rises; a price above it causes excess supply and the price falls. This adjustment is the invisible hand. With a fixed number of firms, a rise in demand raises price and quantity, and a rise in supply lowers price and raises quantity.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Define **equilibrium price** and **equilibrium quantity** in standard words.',
        'Find equilibrium by setting **qd = qs** and showing every step.',
        'State **excess demand** or **excess supply** with its size at the given price.',
        'For a shift, say which curve moves, then give the new price and quantity.',
        'Say that the **number of firms is fixed** in this chapter.',
      ],
      n: 'Some tips. Define the equilibrium price and quantity carefully. When you solve for equilibrium, set quantity demanded equal to quantity supplied and show each step. State whether there is excess demand or excess supply and give its size. For a shift, say which curve moves, and then give the new price and quantity with figures.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'Market Equilibrium — Part 2: Shifts of Both Curves, Price Ceilings and Floors',
  goals: [
    'Find the effect of simultaneous shifts of demand and supply',
    'Define a price ceiling and compute the shortage',
    'Define a price floor and compute the surplus',
    'Describe why governments use these controls and what problems arise',
  ],
  slides: [
    sl('title', 'When Both Curves Shift, and When Prices Are Controlled', {
      b: 'Part 2 — **simultaneous shifts**, the **price ceiling** and the **price floor**.',
      v: vRoute2,
      n: 'This part has two halves. First, what happens to the equilibrium when demand and supply change together. Then, two common government interventions: a maximum price, called a ceiling, and a minimum price, called a floor. We compute the shortage under a ceiling and the surplus under a floor, in imagined markets.',
    }),
    sl('concept', 'When both curves shift', {
      b: 'If demand and supply both rise, **quantity rises**; the effect on **price** depends on which shift is larger.',
      v: tRule,
      n: 'When both curves shift in the same direction, the two effects on quantity add up, so the quantity rises if both rise. The two effects on price pull in opposite directions. A rise in demand pushes the price up and a rise in supply pushes it down. So the result depends on which shift is larger.',
    }),
    sl('concept', 'Equal shifts: price unchanged', {
      b: `Demand and supply each rise by **${M1b.da}**: price stays at **${M1b.pe}**; quantity rises from ${M1.qe} to **${M1b.qe}**.`,
      v: vBothEq,
      n: `In the graph, both curves move right by the same horizontal distance. At the old price the extra demand is matched exactly by the extra supply, so there is no pressure on price. The new equilibrium is at the same price of ${M1b.pe} rupees, but the quantity has risen from ${M1.qe} to ${M1b.qe} quintals.`,
    }),
    sl('example', 'Worked example 1: three cases', {
      b: 'Compare equal shifts, a larger shift of demand and a larger shift of supply.',
      bl: [
        `Step 1 — Equal rises of ${M1b.da}: ${M1b.a - M1b.c} = ${M1b.b + M1b.d}p gives **p = ${M1b.pe}**, q = **${M1b.qe}**.`,
        `Step 2 — Demand ${M1c.da}, supply ${M1c.dc}: p = **${M1c.pe}**, q = **${M1c.qe}**; the price rises.`,
        `Step 3 — Demand ${M1e.da}, supply ${M1e.dc}: p = **${M1e.pe}**, q = **${M1e.qe}**; the price falls.`,
      ],
      v: tCases,
      n: `We start from ${M1.pe} rupees and ${M1.qe} quintals. With equal rises the price stays at ${M1b.pe}. When demand rises by ${M1c.da} and supply by ${M1c.dc}, the larger shift of demand raises the price to ${M1c.pe}. When supply rises by ${M1e.dc} and demand by ${M1e.da}, the price falls to ${M1e.pe}. In every case quantity rises.`,
    }),
    sl('concept', 'Quantity unchanged', {
      b: `Demand rises by ${M1q.da} while supply falls by ${-M1q.dc}: price rises to **${M1q.pe}**, quantity stays at **${M1q.qe}**.`,
      v: vQtySame,
      n: `Now demand rises and supply falls. Both shifts push the price up, so the price rises to ${M1q.pe} rupees. The rise in demand tends to raise quantity and the fall in supply tends to lower it. Here the two effects cancel exactly, so the quantity stays at ${M1q.qe} quintals. Other sizes of shift would change it.`,
    }),
    sl('check', 'Quick check: offsetting shifts', {
      b: 'By how much must supply rise to keep the price unchanged?',
      v: tRule,
      chk: 'n_find_shift',
      n: 'The price stays unchanged only if the shift of supply exactly offsets the shift of demand at the old price. Think about the rule for equal shifts, then give the number of quintals by which supply must increase at every price.',
    }),
    sl('concept', 'Why governments control prices', {
      b: 'A **ceiling** aims to keep a necessity affordable; a **floor** aims to support producers. Each can cause a different problem.',
      v: vWhy,
      n: 'Governments sometimes believe that the market price is unfair to one side. If a necessity is too dear for poorer households, a maximum price may be fixed. If farmers receive too little, a minimum price may be fixed. Both aims are understandable, but each control creates a gap between demand and supply, as the next slides show.',
    }),
    sl('concept', 'Price ceiling', {
      b: 'A **price ceiling** is a legal maximum price. It matters only if it is **below** the equilibrium price.',
      v: tCeilDef,
      n: 'A price ceiling is a maximum price fixed by the government. It does something only when it is below the equilibrium price. A ceiling set above the equilibrium price is never reached, because the market price is already lower. In the imagined district of Chandanpur, a ceiling on cooking gas cylinders is set below the free price.',
    }),
    sl('check', 'Quick check: naming the control', {
      b: 'Choose the correct name for a legal maximum price.',
      v: tCeilDef,
      chk: 'm_ceiling_def',
      n: 'Read the description in the question. Is the legal limit a maximum or a minimum on the price? Choose the term that matches a legal maximum, and avoid the terms that describe a minimum or a price found by the market itself.',
    }),
    sl('concept', 'A ceiling on the graph', {
      b: `At the ceiling of ${C1.pc}, supply is **${C1.qs}** and demand is **${C1.qd}**: a **shortage** of ${C1.shortage}.`,
      v: vCeiling,
      n: `On the graph the free equilibrium is at ${M3.pe} rupees and ${M3.qe} cylinders. The ceiling line at ${C1.pc} rupees cuts the supply curve at ${C1.qs} cylinders and the demand curve at ${C1.qd}. The horizontal gap between the two curves along the ceiling is the shortage, ${C1.shortage} cylinders. Only ${C1.traded} cylinders are actually sold.`,
    }),
    sl('example', 'Worked example 2: the shortage under two ceilings', {
      b: `Chandanpur: **qd = ${M3.a} − p**, **qs = ${M3.d}p**. Find the shortage at ceilings of ${C1.pc} and ${C2.pc}.`,
      bl: [
        `Step 1 — At ${C1.pc}: demand ${M3.a} − ${C1.pc} = ${C1.qd}; supply ${M3.d} × ${C1.pc} = ${C1.qs}; shortage **${C1.shortage}**.`,
        `Step 2 — At ${C2.pc}: demand ${C2.qd}; supply ${C2.qs}; shortage **${C2.shortage}**.`,
        `Step 3 — A ceiling further below ${M3.pe} gives a larger shortage.`,
      ],
      v: tEx2,
      n: `At a ceiling of ${C1.pc} rupees, demand is ${C1.qd} cylinders and supply is ${C1.qs}, so the shortage is ${C1.shortage}. At ${C2.pc} rupees the shortage is only ${C2.shortage}. The further the ceiling is below the equilibrium price, the larger the shortage. The last column shows what buyers would be willing to pay for the cylinders that are actually available.`,
    }),
    sl('check', 'Quick check: the shortage', {
      b: 'Compute the shortage at the ceiling.',
      v: tEx2,
      chk: 'n_m3_short',
      n: 'At the ceiling price, work out the quantity demanded and the quantity supplied from the two functions. Subtract supply from demand. The result is the shortage, in cylinders a week. You can compare it with the table before you answer.',
    }),
    sl('concept', 'Consequences of a ceiling', {
      b: 'A binding ceiling leads to a **shortage**, which must be shared by **rationing** or **queues**; a **black market** and lower **quality** are possible.',
      v: vCeilEff,
      n: 'With the price held below the market level, price can no longer ration the scarce good. Authorities may issue ration cards, or buyers may queue. Some buyers, who would pay more than the ceiling, may turn to an illegal black market. Sellers may also cut quality or service, because they cannot raise the price.',
    }),
    sl('concept', 'Price floor', {
      b: 'A **price floor** is a legal minimum price. It matters only if it is **above** the equilibrium price.',
      v: tFloorDef,
      n: 'A price floor is a minimum price fixed by the government. It does something only when it is above the equilibrium price. A floor set below the equilibrium price is never reached, because the market price is already higher. A support price for a crop and a minimum wage are examples of a floor.',
    }),
    sl('concept', 'A floor on the graph', {
      b: `At the floor of ${F1.pf}, supply is **${F1.qs}** and demand is **${F1.qd}**: a **surplus** of ${F1.surplus}.`,
      v: vFloor,
      n: `On the graph the free equilibrium is at ${M4.pe} rupees and ${M4.qe} thousand kilograms of millet. The floor line at ${F1.pf} rupees cuts the demand curve at ${F1.qd} and the supply curve at ${F1.qs}. The horizontal gap between them along the floor is the surplus, ${F1.surplus} thousand kilograms. Buyers take only ${F1.traded}.`,
    }),
    sl('example', 'Worked example 3: the surplus under two floors', {
      b: `Dhanpur: **qd = ${M4.a} − ${M4.b}p**, **qs = ${M4.c} + ${M4.d}p**. Find the surplus at floors of ${F1.pf} and ${F2.pf}.`,
      bl: [
        `Step 1 — At ${F1.pf}: demand ${F1.qd}; supply ${F1.qs}; surplus **${F1.surplus}**.`,
        `Step 2 — At ${F2.pf}: demand ${F2.qd}; supply ${F2.qs}; surplus **${F2.surplus}**.`,
        `Step 3 — Buying the first surplus costs ${F1.surplus} × ${F1.pf} = **${F1cost}** Rs thousand.`,
      ],
      v: tEx4,
      n: `At a floor of ${F1.pf} rupees, demand is ${F1.qd} and supply is ${F1.qs}, a surplus of ${F1.surplus} thousand kilograms. At ${F2.pf} rupees the surplus is ${F2.surplus}. If the government buys the surplus at the floor price, it spends the surplus times the floor price. For the first floor that is ${F1cost} thousand rupees.`,
    }),
    sl('concept', 'Consequences of a floor', {
      b: 'A binding floor leads to a **surplus**. The government may **buy** it and hold a **buffer stock**, at a cost of purchase and storage.',
      v: vFloorEff,
      n: 'With the price held above the market level, some output cannot be sold to buyers. If the government buys the surplus, it holds the grain as a buffer stock, which costs money to buy and to store. Farmers who sell at the higher price gain, while buyers pay more and buy less.',
    }),
    sl('check', 'Quick check: floor and surplus', {
      b: 'Complete the sentence on the floor.',
      v: tFloorFb,
      chk: 'fb_floor',
      n: 'A minimum price set above the market price has a name. Complete the first blank with that name. Then think about which side of the market is larger at that price, and complete the second blank with the matching word, excess followed by the right word.',
    }),
    sl('concept', 'A minimum wage for weavers', {
      b: `The wage clears the labour market where demand for weavers equals supply (Rs ${M5.pe}). A minimum wage of ${F5.pf} leaves **${F5.surplus}** weavers without work.`,
      v: tMin,
      n: `The wage is the price of labour. In the imagined weaving cluster it settles at ${M5.pe} rupees a day, where employers want ${M5.qe} weavers and ${M5.qe} offer to work. A minimum wage of ${F5.pf} rupees is a floor. Employers now want ${F5.qd} weavers, but ${F5.qs} offer to work, so ${F5.surplus} are without work.`,
    }),
    sl('check', 'Quick check: matching events and effects', {
      b: 'Match each event with its effect.',
      v: tAllEff,
      chk: 'mt_effects',
      n: 'For each event in the left column, decide which curve shifts or which control applies. Then choose the effect that follows. Remember that a binding ceiling opens a gap in favour of buyers, and a binding floor opens a gap in favour of sellers.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: tSum2,
      n: 'To recap. When demand and supply both rise, quantity rises, and the price rises, stays or falls according to which shift is larger. A price ceiling below equilibrium causes a shortage, which may lead to rationing, queues and a black market. A price floor above equilibrium causes a surplus, which the government may buy and hold as a buffer stock. A minimum wage is a floor on the wage.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'For two shifts, compare their **sizes** before stating the effect on **price**.',
        'A ceiling or floor matters only if it is **below** or **above** equilibrium, respectively.',
        'Compute **demand and supply at the controlled price**, then subtract for the gap.',
        'Name the **shortage** under a ceiling and the **surplus** under a floor.',
        'Give aims and problems of controls in balanced, neutral words.',
      ],
      n: 'Some tips. When both curves shift, compare the sizes of the shifts before stating what happens to the price. Remember that a ceiling matters only when it is below equilibrium and a floor only when it is above. Compute demand and supply at the controlled price, subtract to find the gap, and name it as a shortage or a surplus. Give both the aims and the problems of the controls.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Market Equilibrium — Notes',
  sections: [
    {
      h: '1. Market equilibrium',
      t: 1,
      b: `In a perfectly competitive market with a **fixed number of firms**, the **equilibrium price** is the price at which quantity demanded equals quantity supplied (qd = qs); the **equilibrium quantity** is the quantity bought and sold at that price. Both are found by setting demand equal to supply.\n\nExample (imagined Ratnapuri mangoes): qd = ${M1.a} − ${M1.b}p and qs = ${M1.c} + ${M1.d}p give ${M1.a - M1.c} = ${M1.b + M1.d}p, so p = ${M1.pe} and q = ${M1.qe}.`,
      terms: [
        ['Equilibrium price', 'The price at which the quantity demanded equals the quantity supplied.'],
        ['Equilibrium quantity', 'The quantity bought and sold at the equilibrium price.'],
        ['Market clearing', 'A situation in which every buyer who wants to buy at the price can do so, and no seller is left with unsold stock.'],
      ],
      v: vEq,
      vs: [tSched1],
    },
    {
      h: '2. Excess demand, excess supply and the invisible hand',
      t: 1,
      b: `At a price **below** equilibrium, quantity demanded exceeds quantity supplied: there is **excess demand** (${M1.ex(P_LO)} quintals at Rs ${P_LO}), and competition among buyers raises the price. At a price **above** equilibrium, quantity supplied exceeds quantity demanded: there is **excess supply** (${-M1.ex(P_HI)} quintals at Rs ${P_HI}), and sellers with unsold stock cut the price. In both cases the price moves towards equilibrium.\n\nThis movement, produced by the separate decisions of many buyers and sellers without central direction, is described as the work of an **invisible hand**.`,
      terms: [
        ['Excess demand', 'The excess of quantity demanded over quantity supplied at a price below equilibrium.'],
        ['Excess supply', 'The excess of quantity supplied over quantity demanded at a price above equilibrium.'],
        ['Invisible hand', 'The idea that competition among many buyers and sellers moves price to its market-clearing level without anyone directing it.'],
      ],
      v: tSides,
      vs: [vED, vES],
    },
    {
      h: '3. Shifts of demand or supply, with a fixed number of firms',
      t: 1,
      b: `- **Demand rises** (curve shifts right): price rises and quantity rises (${M1.pe} to ${M1d.pe} and ${M1.qe} to ${M1d.qe} in Ratnapuri). **Demand falls:** both fall.\n- **Supply rises:** price falls and quantity rises (${M1s.pe} and ${M1s.qe}). **Supply falls:** price rises and quantity falls.\n\nA change in the good's own price is a movement along a curve; a change in income, tastes, input prices or other conditions shifts the curve.\n\nWith free entry and exit, price tends to the minimum average cost in the long run; this chapter keeps the number of firms fixed.`,
      terms: [
        ['Shift of a curve', 'A change in the quantity demanded or supplied at every price, caused by a change in a condition other than the good’s own price.'],
      ],
      v: vShifts,
      vs: [tSingle],
    },
    {
      h: '4. Simultaneous shifts',
      t: 1,
      b: `When demand and supply both shift, the outcome depends on the relative size of the shifts.\n\n- Both rise by the same amount: price unchanged (${M1b.pe}), quantity rises (${M1b.qe}).\n- Demand rises more than supply: price rises (${M1c.pe}), quantity rises (${M1c.qe}).\n- Supply rises more than demand: price falls (${M1e.pe}), quantity rises (${M1e.qe}).\n- Demand rises by ${M1q.da} and supply falls by ${-M1q.dc}: price rises to ${M1q.pe}, quantity unchanged (${M1q.qe}).\n\nThe wage of labour is determined in the same way, where labour demand equals labour supply.`,
      terms: [],
      v: vBothEq,
      vs: [vQtySame, tCases],
    },
    {
      h: '5. Price ceiling',
      t: 2,
      b: `A **price ceiling** is a maximum price set by the government. It has an effect only if it is **below** the equilibrium price, where it creates **excess demand, a shortage**. Governments use ceilings on essential goods to keep them affordable. Consequences: rationing (for example by ration cards), queues, the possibility of a black market and lower quality.\n\nImagined Chandanpur gas cylinders: free price Rs ${M3.pe}, ${M3.qe} cylinders. At a ceiling of Rs ${C1.pc}: demand ${C1.qd}, supply ${C1.qs}, shortage ${C1.shortage}. A ceiling above ${M3.pe} (for example Rs ${GAS_ABOVE}) has no effect.`,
      terms: [
        ['Price ceiling', 'A maximum price fixed by the government at which a good may be sold, normally below the equilibrium price.'],
        ['Shortage', 'The excess of quantity demanded over quantity supplied at a controlled price.'],
        ['Rationing', 'Sharing a limited supply among buyers by a rule such as a quota or ration card instead of by price.'],
      ],
      v: vCeiling,
      vs: [tEx2],
    },
    {
      h: '6. Price floor',
      t: 2,
      b: `A **price floor** is a minimum price set by the government. It has an effect only if it is **above** the equilibrium price, where it creates **excess supply, a surplus**. Governments use floors to support producers, for example a support price for a crop or a minimum wage. If the government buys the surplus it holds a **buffer stock**, which costs money to buy and store.\n\nImagined Dhanpur millet: free price Rs ${M4.pe}, ${M4.qe} thousand kg. At a floor of Rs ${F1.pf}: demand ${F1.qd}, supply ${F1.qs}, surplus ${F1.surplus} thousand kg, costing Rs ${F1cost} thousand to buy. A floor below Rs ${M4.pe} has no effect.`,
      terms: [
        ['Price floor', 'A minimum price fixed by the government below which a good may not be sold, normally above the equilibrium price.'],
        ['Surplus', 'The excess of quantity supplied over quantity demanded at a controlled price.'],
        ['Buffer stock', 'A reserve of a good held by the government, for example grain bought as the surplus under a floor price.'],
      ],
      v: vFloor,
      vs: [tEx4],
    },
    {
      h: '7. Minimum wage: a floor on labour',
      t: 2,
      b: `A **minimum wage** is a floor on the price of labour. In the imagined Kareempur weaving cluster the wage that clears the market is Rs ${M5.pe} a day, with ${M5.qe} weavers employed. A minimum wage of Rs ${F5.pf} gives labour demand of ${F5.qd} and labour supply of ${F5.qs}, so ${F5.surplus} weavers who would like to work are not employed. Weavers who keep their jobs gain; those who lose them, and employers paying more, lose.\n\nControls help some people and burden others, so their effects are weighed on both sides.`,
      terms: [
        ['Minimum wage', 'A legal minimum on the wage that may be paid, a price floor in the labour market.'],
      ],
      v: tMin,
      vs: [tWage],
    },
  ],
  tips: '- Define **equilibrium price**, **excess demand**, **excess supply**, **price ceiling** and **price floor** in standard words.\n- Solve equilibrium by setting **qd = qs** and show each step.\n- Excess demand = **qd − qs** below equilibrium; excess supply = **qs − qd** above it.\n- Demand shifts move price and quantity the **same** way; supply shifts move them **oppositely**.\n- For two shifts, compare the **sizes** before stating the price effect.\n- A control binds only if the ceiling is **below** or the floor **above** equilibrium; compute the gap at the controlled price.\n- Present controls neutrally: the aim, then the problem.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Equilibrium price**', 'The price at which quantity demanded equals quantity supplied.', 'definition', 1],
  ['**Equilibrium quantity**', 'The quantity bought and sold at the equilibrium price.', 'definition', 1],
  ['How do you **find equilibrium** from functions?', 'Set quantity demanded equal to quantity supplied and solve for the price.', 'formula', 1],
  ['**Market clearing**', 'Every buyer who wants to buy at the price can do so, and no seller has unsold stock.', 'definition', 1],
  ['**Excess demand**', 'Quantity demanded exceeds quantity supplied at a price below equilibrium.', 'definition', 1],
  ['**Excess supply**', 'Quantity supplied exceeds quantity demanded at a price above equilibrium.', 'definition', 1],
  ['What happens to price under **excess demand**?', 'It rises, as buyers compete for the scarce good.', 'concept', 1],
  ['What happens to price under **excess supply**?', 'It falls, as sellers with unsold stock compete for buyers.', 'concept', 1],
  ['**Invisible hand**', 'Competition among many buyers and sellers moves price to equilibrium without central direction.', 'definition', 1],
  ['Setting of the chapter', 'Perfect competition with a fixed number of firms.', 'concept', 1],
  ['Long run with free entry and exit', 'Price tends to the minimum average cost.', 'concept', 1],
  ['**Demand rises**, firms fixed', 'Equilibrium price and quantity both rise.', 'concept', 1],
  ['**Demand falls**, firms fixed', 'Equilibrium price and quantity both fall.', 'concept', 1],
  ['**Supply rises**', 'Equilibrium price falls and quantity rises.', 'concept', 1],
  ['**Supply falls**', 'Equilibrium price rises and quantity falls.', 'concept', 1],
  ['Shift or movement?', 'A change in the good’s own price is a movement along a curve; other changes shift the curve.', 'concept', 1],
  ['Both demand and supply rise equally', 'Price is unchanged and quantity rises.', 'concept', 1],
  ['Both rise, demand more', 'Price rises and quantity rises.', 'concept', 1],
  ['Both rise, supply more', 'Price falls and quantity rises.', 'concept', 1],
  ['Demand rises, supply falls', 'Price rises; the effect on quantity depends on the sizes of the shifts.', 'concept', 1],
  ['How is the **wage** determined?', 'Where the demand for labour equals the supply of labour.', 'concept', 1],
  ['**Price ceiling**', 'A maximum price fixed by the government, normally below equilibrium.', 'definition', 2],
  ['Effect of a **binding ceiling**', 'Excess demand: a shortage at the ceiling price.', 'concept', 2],
  ['Consequences of a ceiling', 'Rationing, ration cards, queues, possible black market and lower quality.', 'concept', 2],
  ['Ceiling **above** equilibrium', 'No effect; the market price is already below it.', 'concept', 2],
  ['**Price floor**', 'A minimum price fixed by the government, normally above equilibrium.', 'definition', 2],
  ['Effect of a **binding floor**', 'Excess supply: a surplus at the floor price.', 'concept', 2],
  ['Floor **below** equilibrium', 'No effect; the market price is already above it.', 'concept', 2],
  ['**Buffer stock**', 'A reserve of the good held by the government, for example grain bought as the surplus.', 'definition', 2],
  ['**Minimum wage**', 'A price floor on the wage; more workers offer labour than are hired.', 'concept', 2],
  ['**Shortage** at a ceiling', 'Quantity demanded minus quantity supplied, both found at the ceiling price.', 'formula', 2],
  ['**Surplus** at a floor', 'Quantity supplied minus quantity demanded, both found at the floor price.', 'formula', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short) — Market Equilibrium',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_d_up', 'm_ceiling_eff', 'm_floor_eff', 'ar_eq_stable'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s2_eq_def', 's2_ceiling_def', 's3_shift_demand'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_eq_adjust', 'l_ceiling'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the data and answer all parts. Part (c) has an internal choice.', items: ['cb_mango'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long) — Market Equilibrium',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_eq_def', 'm_ed_def', 'm_s_up', 'm_both_equal', 'm_quantity_same', 'm_wage', 'm_buffer', 'm_floor_below', 'ar_both', 'ar_ceiling'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s2_ed', 's2_es', { attempt: 1, keys: ['s2_dshift', 's2_sshift'] }, 's3_both', { attempt: 1, keys: ['s3_ceiling_effects', 's3_floor_effects'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_simul', { attempt: 1, keys: ['l_floor', 'l_wage'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['cb_gas', 'cb_millet'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t02 of cbse-11-economics-ch12 only (equilibrium, excess demand and supply, the invisible hand, shifts of demand and supply with a fixed number of firms, simultaneous shifts, price ceiling, price floor)',
    originality: 'every market (mangoes, cement, cooking gas, millet, weavers, tomatoes, candles) is imagined and written for this chapter; no NCERT text, example, table, data set or exercise and no board or sample-paper item reused',
    data: 'all equilibria, excess demands and supplies, shifted equilibria, shortages and surpluses are computed from the imagined linear functions or schedules and asserted: signs of the price and quantity changes follow the laws of shifts; every SVG is drawn from the same functions',
    facts: 'only stable textbook ideas are stated: equilibrium price and quantity, excess demand and supply, invisible hand, effects of shifts with a fixed number of firms, price ceiling, price floor, buffer stock, minimum wage',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
