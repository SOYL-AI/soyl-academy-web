// CBSE 11 Economics, ch12 Market Equilibrium: question bank. Every market (mangoes of Ratnapuri, cement of Sagarpur, cooking gas
// cylinders of Chandanpur, millet of Dhanpur, weavers' wages of Kareempur, tomatoes of Meghgaon, candles of Deepgaon) is imagined and
// written for this chapter; no real prices or schemes are used. Every equilibrium, excess demand or supply, shifted equilibrium, shortage and
// surplus is computed from the imagined demand and supply functions or schedules with plain code, the laws of shifts are asserted, and every
// figure written in prose is pinned with check().
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from '../../cbse-11-economics-ch01/src/lib.mjs';
import { rnd, check } from '../../cbse-11-economics-ch01/src/stats.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
export const J = (a) => a.join(', ');
export const inr = (x) => `Rs ${x.toLocaleString('en-IN')}`;
const same = (a, b) => rnd(a - b, 9) === 0;

// ---------------------------------------------------------------- linear markets: qd = a - b p, qs = c + d p
export function market(a, b, c, d, what) {
  const qd = (p) => a - b * p;
  const qs = (p) => c + d * p;
  const pe = (a - c) / (b + d);
  const qe = qd(pe);
  if (!same(qs(pe), qe)) throw new Error(`${what}: qd and qs differ at the equilibrium price`);
  if (!(pe > 0 && qe > 0)) throw new Error(`${what}: equilibrium not positive`);
  return { a, b, c, d, what, qd, qs, pe, qe, ex: (p) => qd(p) - qs(p), dInv: (q) => (a - q) / b, sInv: (q) => (q - c) / d };
}
/** Market after the demand curve shifts by da (units at every price) and the supply curve by dc; the laws of shifts are asserted. */
export function shifted(m, da, dc, what) {
  const n = market(m.a + da, m.b, m.c + dc, m.d, what);
  const dp = rnd(n.pe - m.pe, 9);
  const dq = rnd(n.qe - m.qe, 9);
  if (Math.sign(dp) !== Math.sign(da - dc)) throw new Error(`${what}: price change has the wrong sign`);
  if (Math.sign(dq) !== Math.sign(m.d * da + m.b * dc)) throw new Error(`${what}: quantity change has the wrong sign`);
  return { ...n, da, dc, dp, dq, from: m };
}
/** Price ceiling (pc below equilibrium) or price floor (pc above), the quantity at the controlled price and the gap. */
export function ceiling(m, pc, what) {
  if (!(pc < m.pe)) throw new Error(`${what}: ceiling must be below equilibrium`);
  const qd = m.qd(pc), qs = m.qs(pc);
  if (!(qd > qs)) throw new Error(`${what}: no shortage`);
  return { pc, qd, qs, shortage: qd - qs, traded: qs, bm: m.dInv(qs) };
}
export function floor(m, pf, what) {
  if (!(pf > m.pe)) throw new Error(`${what}: floor must be above equilibrium`);
  const qd = m.qd(pf), qs = m.qs(pf);
  if (!(qs > qd)) throw new Error(`${what}: no surplus`);
  return { pf, qd, qs, surplus: qs - qd, traded: qd };
}
/** Market schedule: price list p, quantity demanded qd and supplied qs. */
export function schedule(p, qd, qs, what) {
  const ex = qd.map((x, i) => x - qs[i]);
  for (let i = 1; i < p.length; i++) if (!(qd[i] < qd[i - 1] && qs[i] > qs[i - 1])) throw new Error(`${what}: demand must fall and supply rise with price`);
  const at = ex.map((e, i) => (e === 0 ? i : -1)).filter((i) => i >= 0);
  if (at.length !== 1) throw new Error(`${what}: need exactly one equilibrium row`);
  ex.forEach((e, i) => { if (i < at[0] && !(e > 0)) throw new Error(`${what}: excess demand expected below equilibrium`); if (i > at[0] && !(e < 0)) throw new Error(`${what}: excess supply expected above equilibrium`); });
  return { p, qd, qs, ex, i: at[0], pe: p[at[0]], qe: qd[at[0]] };
}
const dTxt = (m) => `qd = ${m.a} − ${m.b}p`;
const sTxt = (m) => (m.c === 0 ? `qs = ${m.d}p` : m.c > 0 ? `qs = ${m.c} + ${m.d}p` : `qs = −${-m.c} + ${m.d}p`);

// 1. Mango market of Ratnapuri (imagined): price p in Rs per kg, quantities in quintals a day, fixed number of sellers.
export const M1 = market(200, 5, 20, 4, 'Ratnapuri mangoes');
check(M1.pe, 20, 6, 'Ratnapuri equilibrium price');
check(M1.qe, 100, 6, 'Ratnapuri equilibrium quantity');
export const P_LO = 10, P_HI = 30;
check(M1.qd(P_LO), 150, 6, 'Ratnapuri qd at 10');
check(M1.qs(P_LO), 60, 6, 'Ratnapuri qs at 10');
check(M1.ex(P_LO), 90, 6, 'Ratnapuri excess demand at 10');
check(M1.ex(P_HI), -90, 6, 'Ratnapuri excess supply at 30');
export const M1d = shifted(M1, 45, 0, 'Ratnapuri demand up');
export const M1dn = shifted(M1, -45, 0, 'Ratnapuri demand down');
export const M1s = shifted(M1, 0, 45, 'Ratnapuri supply up');
export const M1sn = shifted(M1, 0, -45, 'Ratnapuri supply down');
export const M1b = shifted(M1, 45, 45, 'Ratnapuri both up equally');
export const M1c = shifted(M1, 90, 45, 'Ratnapuri demand shifts more');
export const M1e = shifted(M1, 45, 90, 'Ratnapuri supply shifts more');
export const M1q = shifted(M1, 50, -40, 'Ratnapuri demand up, supply down');
export const M1f = shifted(M1, -45, 45, 'Ratnapuri demand down, supply up');
check(M1d.pe, 25, 6, 'demand up price');
check(M1d.qe, 120, 6, 'demand up quantity');
check(M1dn.pe, 15, 6, 'demand down price');
check(M1dn.qe, 80, 6, 'demand down quantity');
check(M1s.pe, 15, 6, 'supply up price');
check(M1s.qe, 125, 6, 'supply up quantity');
check(M1sn.pe, 25, 6, 'supply down price');
check(M1sn.qe, 75, 6, 'supply down quantity');
check(M1b.pe, 20, 6, 'both up equally price');
check(M1b.qe, 145, 6, 'both up equally quantity');
check(M1c.pe, 25, 6, 'demand shifts more price');
check(M1c.qe, 165, 6, 'demand shifts more quantity');
check(M1e.pe, 15, 6, 'supply shifts more price');
check(M1e.qe, 170, 6, 'supply shifts more quantity');
check(M1q.pe, 30, 6, 'quantity unchanged: price');
check(M1q.qe, 100, 6, 'quantity unchanged: quantity');
check(M1f.pe, 10, 6, 'demand down supply up price');
check(M1f.qe, 105, 6, 'demand down supply up quantity');
if (!(M1q.dq === 0 && M1b.dp === 0)) throw new Error('chosen shifts must leave quantity (M1q) and price (M1b) unchanged');

// 2. Cement market of Sagarpur (imagined): price in Rs per bag, quantities in thousand bags a month; the number of cement firms is fixed.
export const M2 = market(1800, 3, -200, 2, 'Sagarpur cement');
export const M2d = shifted(M2, 300, 0, 'Sagarpur demand up');
export const M2dn = shifted(M2, -300, 0, 'Sagarpur demand down');
export const M2s = shifted(M2, 0, 300, 'Sagarpur supply up');
export const M2sn = shifted(M2, 0, -300, 'Sagarpur supply down');
check(M2.pe, 400, 6, 'cement equilibrium price');
check(M2.qe, 600, 6, 'cement equilibrium quantity');
check(M2d.pe, 460, 6, 'cement demand up price');
check(M2d.qe, 720, 6, 'cement demand up quantity');
check(M2dn.pe, 340, 6, 'cement demand down price');
check(M2dn.qe, 480, 6, 'cement demand down quantity');
check(M2s.pe, 340, 6, 'cement supply up price');
check(M2s.qe, 780, 6, 'cement supply up quantity');
check(M2sn.pe, 460, 6, 'cement supply down price');
check(M2sn.qe, 420, 6, 'cement supply down quantity');

// 3. Cooking gas cylinders of Chandanpur (imagined): price in Rs per cylinder, quantities in cylinders a week.
export const M3 = market(1200, 1, 0, 0.5, 'Chandanpur gas');
check(M3.pe, 800, 6, 'gas equilibrium price');
check(M3.qe, 400, 6, 'gas equilibrium quantity');
export const C1 = ceiling(M3, 600, 'gas ceiling 600');
export const C2 = ceiling(M3, 700, 'gas ceiling 700');
check(C1.qd, 600, 6, 'gas demand at ceiling 600');
check(C1.qs, 300, 6, 'gas supply at ceiling 600');
check(C1.shortage, 300, 6, 'gas shortage at ceiling 600');
check(C1.bm, 900, 6, 'gas black-market price');
check(C2.qd, 500, 6, 'gas demand at ceiling 700');
check(C2.qs, 350, 6, 'gas supply at ceiling 700');
check(C2.shortage, 150, 6, 'gas shortage at ceiling 700');
export const GAS_ABOVE = 900;
check(M3.qd(GAS_ABOVE), 300, 6, 'gas demand at 900');
check(M3.qs(GAS_ABOVE), 450, 6, 'gas supply at 900');

// 4. Millet market of Dhanpur (imagined): price in Rs per kg, quantities in thousand kg a month.
export const M4 = market(500, 4, 100, 6, 'Dhanpur millet');
check(M4.pe, 40, 6, 'millet equilibrium price');
check(M4.qe, 340, 6, 'millet equilibrium quantity');
export const F1 = floor(M4, 50, 'millet floor 50');
export const F2 = floor(M4, 60, 'millet floor 60');
check(F1.qd, 300, 6, 'millet demand at floor 50');
check(F1.qs, 400, 6, 'millet supply at floor 50');
check(F1.surplus, 100, 6, 'millet surplus at floor 50');
check(F2.surplus, 200, 6, 'millet surplus at floor 60');
export const F1cost = F1.surplus * F1.pf; // Rs thousand
check(F1cost, 5000, 6, 'cost of buying the millet surplus at 50');
export const MILLET_BELOW = 30;
check(M4.qd(MILLET_BELOW), 380, 6, 'millet demand at 30');
check(M4.qs(MILLET_BELOW), 280, 6, 'millet supply at 30');

// 5. Weavers' wage market of Kareempur (imagined): wage w in Rs per day, quantities in weavers; ld = 600 − 2w, ls = −150 + 3w.
export const M5 = market(600, 2, -150, 3, 'Kareempur weavers');
check(M5.pe, 150, 6, 'weavers equilibrium wage');
check(M5.qe, 300, 6, 'weavers equilibrium employment');
export const F5 = floor(M5, 180, 'weavers wage floor 180');
check(F5.qd, 240, 6, 'weavers demanded at 180');
check(F5.qs, 390, 6, 'weavers offering at 180');
check(F5.surplus, 150, 6, 'weavers unemployed at wage floor 180');
check(F5.traded, 240, 6, 'weavers employed at wage floor 180');

// 6. Tomato market of Meghgaon (imagined schedule): price in Rs per kg, quantities in quintals a day.
export const M6 = schedule([8, 10, 12, 14, 16, 18], [260, 230, 200, 170, 140, 110], [80, 110, 140, 170, 200, 230], 'Meghgaon tomatoes');
check(M6.pe, 14, 6, 'tomato equilibrium price');
check(M6.qe, 170, 6, 'tomato equilibrium quantity');
export const M6n = schedule(M6.p, M6.qd.map((x) => x + 60), M6.qs, 'Meghgaon tomatoes after demand rises by 60');
check(M6n.pe, 16, 6, 'tomato new equilibrium price');
check(M6n.qe, 200, 6, 'tomato new equilibrium quantity');
check(M6.ex[1], 120, 6, 'tomato excess demand at 10');
check(M6.ex[5], -120, 6, 'tomato excess supply at 18');

// 7. Candle market of Deepgaon (imagined schedule): price in Rs per candle, quantities in hundreds of candles a week.
export const M7 = schedule([2, 4, 6, 8, 10], [90, 70, 50, 30, 10], [10, 30, 50, 70, 90], 'Deepgaon candles');
export const M7n = schedule(M7.p, M7.qd.map((x) => x + 40), M7.qs, 'Deepgaon candles after demand rises by 40');
check(M7.pe, 6, 6, 'candle equilibrium price');
check(M7.qe, 50, 6, 'candle equilibrium quantity');
check(M7n.pe, 8, 6, 'candle new equilibrium price');
check(M7n.qe, 70, 6, 'candle new equilibrium quantity');

export const RAT = `In the imagined mango market of Ratnapuri (price p in Rs per kg, quantities in quintals a day) buyers demand ${dTxt(M1)} and sellers supply ${sTxt(M1)}`;
export const SAG = `In the imagined cement market of Sagarpur (price p in Rs per bag, quantities in thousand bags a month; the number of firms is fixed) buyers demand ${dTxt(M2)} and the firms supply ${sTxt(M2)}`;
export const CHA = `In the imagined district of Chandanpur (price p in Rs per cylinder, quantities in cylinders a week) households demand ${dTxt(M3)} and dealers supply ${sTxt(M3)}`;
export const DHA = `In the imagined millet market of Dhanpur (price p in Rs per kg, quantities in thousand kg a month) buyers demand ${dTxt(M4)} and farmers supply ${sTxt(M4)}`;
export const KAR = `In the imagined weaving cluster of Kareempur (wage w in Rs per day, quantities in numbers of weavers) employers demand ${M5.a} − ${M5.b}w weavers and weavers offer −${-M5.c} + ${M5.d}w`;
export const sched6 = `the imagined tomato market of Meghgaon (price in Rs per kg: ${J(M6.p)}; quantity demanded in quintals a day: ${J(M6.qd)}; quantity supplied: ${J(M6.qs)})`;
export const sched7 = `the imagined candle market of Deepgaon (price in Rs per candle: ${J(M7.p)}; quantity demanded in hundreds of candles a week: ${J(M7.qd)}; quantity supplied: ${J(M7.qs)})`;

// ---------------------------------------------------------------- multiple-choice (opts[0] is correct)
Q('m_eq_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In the imagined mango market of Ratnapuri the price at which the quantity buyers wish to purchase exactly matches the quantity sellers wish to sell is called the',
  opts: ['equilibrium price', 'ceiling price', 'floor price', 'marginal price'],
  sol: 'The price that clears the market, with quantity demanded equal to quantity supplied, is the equilibrium price. A ceiling and a floor are government-fixed limits, and no such thing as a marginal price is used for this meaning.',
}));
Q('m_eq_calc', mcq({
  t: 1, d: 2, c: 'application',
  stem: `A trader studies mango sales in Ratnapuri, where p is the price in Rs per kg and quantities are in quintals a day: demand is ${dTxt(M1)} and supply is ${sTxt(M1)}. The price at which this market clears is`,
  opts: [`${inr(M1.pe)} per kg`, `${inr(M1.qe)} per kg`, `${inr(M1d.pe)} per kg`, `${inr(M1s.pe)} per kg`],
  sol: `Setting ${M1.a} − ${M1.b}p equal to ${M1.c} + ${M1.d}p gives ${M1.a - M1.c} = ${M1.b + M1.d}p, so p = ${M1.pe}. The figure ${M1.qe} is the equilibrium quantity, not a price, while ${M1d.pe} and ${M1s.pe} are prices after shifts of the curves.`,
}));
Q('m_ed_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'At some price in the imagined candle market of Deepgaon, buyers want more candles than sellers are willing to offer. This situation is called',
  opts: ['excess demand', 'excess supply', 'equilibrium', 'a price ceiling'],
  sol: 'When quantity demanded exceeds quantity supplied at a price, there is excess demand. Excess supply is the opposite, equilibrium has the two equal, and a ceiling is a legal limit on price rather than a market situation.',
}));
Q('m_ed_price', mcq({
  t: 1, d: 2, c: 'application',
  stem: `At a price of ${inr(P_LO)} per kg buyers in Ratnapuri want ${M1.qd(P_LO)} quintals of mangoes a day while sellers offer ${M1.qs(P_LO)}. The price is most likely to`,
  opts: [`rise, because there is excess demand of ${M1.ex(P_LO)} quintals`, `fall, because there is excess demand of ${M1.ex(P_LO)} quintals`, `rise, because there is excess supply of ${M1.ex(P_LO)} quintals`, 'stay unchanged, because sellers set prices alone'],
  sol: `Buyers are short of mangoes by ${M1.qd(P_LO)} − ${M1.qs(P_LO)} = ${M1.ex(P_LO)} quintals, and competing for them they bid the price up. Excess demand never pushes a price down, there is no excess supply at this price, and in a competitive market no single seller fixes the price.`,
}));
Q('m_es_price', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Mango sellers in Ratnapuri ask ${inr(P_HI)} per kg, and at that price buyers want ${M1.qd(P_HI)} quintals while sellers bring ${M1.qs(P_HI)}. What happens next?`,
  opts: ['Unsold mangoes make sellers cut the price, which moves towards equilibrium', 'Buyers bid the price up, which moves towards equilibrium', 'The price stays at this level indefinitely', 'Quantity supplied falls to zero immediately'],
  sol: `Sellers are left with ${-M1.ex(P_HI)} quintals unsold, so they lower the price, and as it falls buyers buy more and sellers supply less until the two match. Bidding up is the response to excess demand. The market has no reason to rest at a price with unsold stock, and supply falls gradually, not to zero at once.`,
}));
Q('m_inv_hand', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Economists say that in a competitive market the price moves towards equilibrium as if guided by an invisible hand. This phrase refers to the fact that',
  opts: ['price adjusts through the independent decisions of many buyers and sellers, without any one of them directing it', 'a government office sets each price every morning', 'a single large firm decides the price for all others', 'prices never change in a competitive market'],
  sol: 'Each buyer and seller acts for himself or herself, yet competition for scarce goods or for buyers moves price to the level where the market clears, with no central direction. A government office or one dominant firm setting price would not be a competitive market, and price clearly does change when there is excess demand or supply.',
}));
Q('m_d_up', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A burst of house building increases the demand for cement in Sagarpur at every price, while the number of cement firms stays the same. In the new equilibrium',
  opts: ['both price and quantity are higher', 'price is higher but quantity is lower', 'price is lower but quantity is higher', 'both price and quantity are lower'],
  sol: 'The demand curve shifts right, creating excess demand at the old price. The price rises, which draws out more supply along the unchanged supply curve, so quantity also rises. A higher price with lower quantity would need a fall in supply, and the other options need a fall in demand or a rise in supply.',
}));
Q('m_d_down', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'With the supply curve unchanged, a fall in the demand for mangoes in Ratnapuri at every price leads to',
  opts: ['a lower equilibrium price and a smaller equilibrium quantity', 'a higher equilibrium price and a smaller quantity', 'a lower equilibrium price and a larger quantity', 'no change in either price or quantity'],
  sol: 'A leftward shift of demand leaves excess supply at the old price. The price falls, and sellers move down their supply curve to a smaller quantity. The remaining options cannot follow from a shift of demand alone, since supply is unchanged.',
}));
Q('m_s_up', mcq({
  t: 1, d: 2, c: 'application',
  stem: `A good harvest increases the supply of mangoes in Ratnapuri by ${M1s.dc} quintals at every price, with demand unchanged. The equilibrium price moves from ${inr(M1.pe)} to`,
  opts: [`${inr(M1s.pe)} per kg and quantity rises to ${M1s.qe} quintals`, `${inr(M1d.pe)} per kg and quantity rises to ${M1d.qe} quintals`, `${inr(M1s.pe)} per kg and quantity falls to ${M1sn.qe} quintals`, `${inr(M1.pe)} per kg and quantity rises to ${M1b.qe} quintals`],
  sol: `The new supply is ${M1s.c} + ${M1s.d}p; equating it with ${M1.a} − ${M1.b}p gives p = ${M1s.pe} and q = ${M1s.qe}. The price falls and the quantity rises. The second option describes a rise in demand, the third gets the quantity wrong, and the last would need demand to rise as well.`,
}));
Q('m_s_down', mcq({
  t: 1, d: 3, c: 'application',
  stem: `A strike at the plants cuts the supply of cement in Sagarpur by ${-M2sn.dc} thousand bags at every price. If demand does not change, the equilibrium price becomes ${inr(M2sn.pe)} per bag. What happens to the quantity traded?`,
  opts: [`It falls to ${M2sn.qe} thousand bags from ${M2.qe}`, `It rises to ${M2d.qe} thousand bags from ${M2.qe}`, `It stays at ${M2.qe} thousand bags`, `It falls to ${M2dn.qe} thousand bags, the result of a fall in demand`],
  sol: `Along the demand curve, quantity at the new price is ${M2.a} − ${M2.b} × ${M2sn.pe} = ${M2sn.qe}, a fall. A fall in supply cannot raise quantity, and quantity changes because the market moves along the demand curve. The figure ${M2dn.qe} belongs to a fall in demand, not supply.`,
}));
Q('m_both_equal', mcq({
  t: 1, d: 3, c: 'application',
  stem: `In Ratnapuri the demand for mangoes rises by ${M1b.da} quintals at every price and the supply also rises by ${M1b.dc} quintals at every price. The new equilibrium price and quantity are`,
  opts: [`${inr(M1b.pe)} per kg and ${M1b.qe} quintals`, `${inr(M1d.pe)} per kg and ${M1d.qe} quintals`, `${inr(M1s.pe)} per kg and ${M1s.qe} quintals`, `${inr(M1b.pe)} per kg and ${M1.qe} quintals`],
  sol: `The new demand is ${M1b.a} − ${M1b.b}p and the new supply is ${M1b.c} + ${M1b.d}p, so ${M1b.a - M1b.c} = ${M1b.b + M1b.d}p and p = ${M1b.pe}, q = ${M1b.qe}. The second option is the result of a rise in demand alone, the third of a rise in supply alone, and the last forgets that quantity rises.`,
}));
Q('m_demand_bigger', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: `Both the demand and the supply of mangoes in Ratnapuri rise, demand by ${M1c.da} quintals and supply by ${M1c.dc} quintals at every price. Compared with ${inr(M1.pe)} per kg, the equilibrium price`,
  opts: [`rises to ${inr(M1c.pe)}, because the rise in demand is larger than the rise in supply`, `falls, because supply has also risen`, `is unchanged, because both curves have shifted`, `falls to ${inr(M1e.pe)}, because the rise in demand is larger`],
  sol: `When both curves shift right, the price rises if demand shifts more, and here the equilibrium is ${inr(M1c.pe)}. A rise in supply on its own lowers the price, but it is outweighed here. The price stays unchanged only if the two shifts are equal, and ${inr(M1e.pe)} is the result if supply shifts more.`,
}));
Q('m_quantity_same', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: `The demand for mangoes in Ratnapuri rises by ${M1q.da} quintals at every price while a pest cuts supply by ${-M1q.dc} quintals at every price. Starting from ${inr(M1.pe)} per kg and ${M1.qe} quintals, the new equilibrium has`,
  opts: [`price ${inr(M1q.pe)} per kg and the same quantity of ${M1q.qe} quintals`, `price ${inr(M1.pe)} per kg and the same quantity`, `price ${inr(M1q.pe)} per kg and quantity ${M1b.qe} quintals`, `price ${inr(M1sn.pe)} per kg and quantity ${M1sn.qe} quintals`],
  sol: `The new curves are ${M1q.a} − ${M1q.b}p and ${M1q.c} + ${M1q.d}p; they meet at p = ${M1q.pe}, where the quantity is ${M1q.a} − ${M1q.b} × ${M1q.pe} = ${M1q.qe}. The rise in demand lifts quantity and the fall in supply lowers it by the same amount, so quantity stays, while both shifts push price up. The other options mix up the cases.`,
}));
Q('m_shift_or_move', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of the following causes the demand curve for mangoes in Ratnapuri to shift to the right?',
  opts: ['A rise in the incomes of Ratnapuri households, with mango a normal good', 'A fall in the price of mangoes', 'A rise in the price of mangoes', 'An increase in the number of mango sellers'],
  sol: 'A change in income, tastes or the prices of related goods shifts the demand curve. A change in the good’s own price is a movement along the same curve, and more sellers would shift the supply curve instead.',
}));
Q('m_wage', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In the imagined weaving cluster of Kareempur, the wage per day settles at the level at which',
  opts: ['the demand for weavers equals the supply of weavers', 'every weaver is paid the same as the owner', 'the demand for weavers is double the supply', 'employers pay as little as the law permits'],
  sol: 'A wage is the price of labour, and in a competitive labour market it is determined where labour demand equals labour supply. The other statements describe no equilibrium condition.',
}));
Q('m_long_run', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Suppose firms can enter and leave the cement industry of Sagarpur freely. In the long run, price in a perfectly competitive market tends to be equal to the',
  opts: ['minimum average cost of a firm', 'maximum price buyers once paid', 'highest marginal cost of any firm', 'total fixed cost of the industry'],
  sol: 'With free entry and exit, profits attract new firms and losses drive firms out, until price settles at the lowest point of the average cost curve. The other quantities have no such role.',
}));
Q('m_ceiling_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'In the imagined district of Chandanpur the administration fixes the highest price at which a cooking gas cylinder may be sold. Such a legal maximum is called a',
  opts: ['price ceiling', 'price floor', 'support price', 'equilibrium price'],
  sol: 'A price ceiling is a maximum price set by the government, normally below the equilibrium price. A floor is a minimum price, a support price is a kind of floor, and the equilibrium price emerges from the market rather than from a legal limit.',
}));
Q('m_ceiling_eff', mcq({
  t: 2, d: 3, c: 'application',
  stem: `${CHA}. The administration fixes a ceiling of ${inr(C1.pc)} per cylinder. At this ceiling there is`,
  opts: [`a shortage of ${C1.shortage} cylinders a week`, `a surplus of ${C1.shortage} cylinders a week`, `a shortage of ${M3.qe - C1.qs} cylinders a week measured from equilibrium`, 'neither shortage nor surplus'],
  sol: `At ${inr(C1.pc)} households demand ${M3.a} − ${C1.pc} = ${C1.qd} cylinders, while dealers supply ${M3.d} × ${C1.pc} = ${C1.qs}, so demand exceeds supply by ${C1.shortage}. The gap is measured between demand and supply at the ceiling, which is what the third option gets wrong, and a ceiling below equilibrium cannot create a surplus.`,
}));
Q('m_ceiling_above', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: `The administration of Chandanpur, where the free market price of a cylinder is ${inr(M3.pe)}, announces a ceiling of ${inr(GAS_ABOVE)}. The most likely result is that the ceiling`,
  opts: ['has no effect, because the market price is already below it', `creates a shortage of ${C2.shortage} cylinders`, `creates a surplus of ${C2.shortage} cylinders`, 'forces the price up to the ceiling'],
  sol: `A ceiling binds only when it is below the equilibrium price. At ${inr(GAS_ABOVE)} demand is ${M3.qd(GAS_ABOVE)} and supply is ${M3.qs(GAS_ABOVE)}, so the market would drive price down to ${inr(M3.pe)} and the limit is never reached. Therefore it causes no shortage, and a ceiling cannot compel a rise in price.`,
}));
Q('m_ration', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'When the supply of cooking gas cylinders in Chandanpur falls short of demand at a ceiling price, the administration may issue ration cards allowing each household a fixed number of cylinders. The purpose of rationing is to',
  opts: ['share the limited supply among households when price cannot do so', 'raise the price above the ceiling', 'increase the quantity supplied beyond what dealers wish to sell', 'remove the shortage by reducing demand to zero'],
  sol: 'With price held down, it cannot ration the scarce good, so quotas and cards distribute it. Rationing does not raise the price or make dealers supply more, and it does not remove demand; the gap remains.',
}));
Q('m_blackmarket', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'After a ceiling is imposed on cooking gas cylinders in Chandanpur, a shortage persists. Which development is a possible consequence?',
  opts: ['Some cylinders are sold illegally above the ceiling to households willing to pay more', 'The legal price automatically rises above the ceiling', 'All households receive as many cylinders as they want', 'Dealers begin to supply more cylinders than before'],
  sol: 'Where legal supply is less than the quantity demanded, some buyers may pay more than the ceiling, which gives rise to a black market. The legal price cannot move above the ceiling, the shortage means not all demand is met, and a lower price does not draw out greater supply.',
}));
Q('m_floor_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The government of the imagined district of Dhanpur announces a minimum price at which it will buy millet from farmers, set above the free market price. This is an example of a',
  opts: ['price floor', 'price ceiling', 'rationing scheme', 'tax on farmers'],
  sol: 'A price floor is a minimum price set by the government above the equilibrium price. A ceiling is a maximum price, a ration scheme limits quantities for buyers, and the announcement taxes nobody.',
}));
Q('m_floor_eff', mcq({
  t: 2, d: 3, c: 'application',
  stem: `${DHA}. A floor of ${inr(F1.pf)} per kg is announced. At the floor price there is`,
  opts: [`a surplus of ${F1.surplus} thousand kg a month`, `a shortage of ${F1.surplus} thousand kg a month`, `a surplus of ${M4.qe - F1.qd} thousand kg a month measured from the equilibrium quantity`, 'no surplus, because farmers will not sell'],
  sol: `At ${inr(F1.pf)} buyers demand ${M4.a} − ${M4.b} × ${F1.pf} = ${F1.qd}, while farmers supply ${M4.c} + ${M4.d} × ${F1.pf} = ${F1.qs}, an excess supply of ${F1.surplus}. A floor above equilibrium cannot produce a shortage, and the gap is read between supply and demand at the floor, not from the free-market quantity.`,
}));
Q('m_floor_below', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: `In the Dhanpur millet market, where the free market price is ${inr(M4.pe)} per kg, the government sets a minimum price of ${inr(MILLET_BELOW)} per kg. The effect of this floor is`,
  opts: ['none, because the market price is already above it', `a surplus of ${M4.qd(MILLET_BELOW) - M4.qs(MILLET_BELOW)} thousand kg`, 'a surplus because supply exceeds demand at the floor', 'a fall in the market price to the floor'],
  sol: `A floor matters only when it is above equilibrium. At ${inr(MILLET_BELOW)} demand is ${M4.qd(MILLET_BELOW)} and supply only ${M4.qs(MILLET_BELOW)}, so excess demand lifts the price back to ${inr(M4.pe)}, which is above the floor, and the floor is never reached. Hence a floor set so low produces no surplus.`,
}));
Q('m_buffer', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The Dhanpur government buys the surplus of millet created by its minimum price and stores it. Grain held in this way by the government as a reserve is known as a',
  opts: ['buffer stock', 'ration card', 'black market', 'price ceiling'],
  sol: 'A buffer stock is a reserve of the good that the government accumulates, here by buying the surplus at the floor price. A ration card is a coupon for buyers, a black market is illegal trade above a ceiling, and a ceiling is a maximum price.',
}));
Q('m_minwage', mcq({
  t: 2, d: 3, c: 'application',
  stem: `${KAR}. A minimum wage of ${inr(F5.pf)} a day is enforced. At this wage`,
  opts: [`${F5.surplus} more weavers offer their labour than employers wish to hire`, `employers wish to hire ${F5.surplus} more weavers than are available`, `${F5.qs} weavers are employed`, 'the number of weavers employed is unchanged'],
  sol: `Employers demand ${M5.a} − ${M5.b} × ${F5.pf} = ${F5.qd} weavers while ${F5.qs} offer to work, so ${F5.surplus} more weavers are willing to work than are hired. Employment is the smaller number, ${F5.traded}, not ${F5.qs}, and it falls from ${M5.qe}, so it is not unchanged.`,
}));

// ---------------------------------------------------------------- assertion-reason
Q('ar_eq_stable', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'If the price in the Ratnapuri mango market is above the equilibrium price, the price tends to fall.',
  r: 'At a price above equilibrium the quantity supplied exceeds the quantity demanded, and sellers with unsold mangoes compete by lowering the price.',
  sol: 'Both are true and R explains A. Excess supply leaves sellers with unsold stock, and underbidding by sellers drives the price down towards equilibrium.',
}));
Q('ar_s_up', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-not-explains',
  a: 'An increase in the supply of mangoes in Ratnapuri, with demand unchanged, lowers the equilibrium price.',
  r: 'Mangoes are a seasonal fruit.',
  sol: 'Both statements are true, but R does not explain A. The price falls because a rightward shift of supply creates excess supply at the old price; whether the fruit is seasonal plays no part in that argument.',
}));
Q('ar_both', ar({
  t: 1, d: 4, c: 'analysis', verdict: 'A-false-R-true',
  a: 'If the demand and the supply of cement in Sagarpur both increase, the equilibrium price must rise.',
  r: 'An increase in demand alone raises the equilibrium price.',
  sol: 'A is false and R is true. With both curves shifting, the price may rise, fall or stay the same, depending on which shift is larger, so it does not have to rise.',
}));
Q('ar_ceiling', ar({
  t: 2, d: 3, c: 'understanding', verdict: 'A-true-R-false',
  a: 'A price ceiling fixed below the equilibrium price creates a shortage in the market.',
  r: 'At a price below the equilibrium price the quantity supplied exceeds the quantity demanded.',
  sol: 'A is true and R is false. Below equilibrium it is the quantity demanded that exceeds the quantity supplied, which is why a binding ceiling produces a shortage.',
}));
Q('ar_floor', ar({
  t: 2, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'A minimum price for millet fixed above the equilibrium price leaves farmers with unsold output unless the government buys it.',
  r: 'At the minimum price the quantity supplied is greater than the quantity demanded.',
  sol: 'Both are true and R explains A. The excess supply at the floor is exactly the output that buyers do not take, and it remains unsold unless bought by the government.',
}));

// ---------------------------------------------------------------- true-false, fill-blank, match, ordering
Q('tf_ed_price', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: `In the Deepgaon candle market, at a price of Rs ${M7.p[0]} buyers demand ${M7.qd[0]} hundred candles and sellers supply ${M7.qs[0]}. There is excess supply at this price.`,
  sol: `Demand is larger than supply, so there is excess demand of ${M7.ex[0]} hundred candles, and the price will tend to rise.`,
}));
Q('tf_floor_low', tf({
  t: 2, d: 3, c: 'understanding', ans: true,
  stem: 'A minimum price fixed below the equilibrium price has no effect on the quantity traded in a competitive market.',
  sol: 'The market price is already above the floor, so the floor does not bind and nothing changes.',
}));
Q('fb_eq', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'At the equilibrium price the quantity demanded is equal to the quantity ___.',
  acc: [['supplied']],
  sol: 'Equilibrium has quantity demanded equal to quantity supplied.',
}));
Q('fb_floor', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'A minimum price fixed by the government above the equilibrium price is called a price ___, and it creates excess ___.',
  acc: [['floor'], ['supply']],
  sol: 'A price floor above equilibrium leaves quantity supplied larger than quantity demanded, which is excess supply.',
}));
Q('mt_terms', match({
  t: 1, d: 2, c: 'recall',
  stem: 'Match each term of market equilibrium with its meaning.',
  pairs: [
    ['Equilibrium price', 'The price at which quantity demanded equals quantity supplied'],
    ['Excess demand', 'Quantity demanded exceeds quantity supplied at a price'],
    ['Excess supply', 'Quantity supplied exceeds quantity demanded at a price'],
    ['Equilibrium quantity', 'The quantity bought and sold at the equilibrium price'],
  ],
  sol: 'The equilibrium price clears the market; excess demand and excess supply are the two kinds of gap away from it; the equilibrium quantity is the amount traded at the clearing price.',
}));
Q('mt_effects', match({
  t: 2, d: 3, c: 'understanding',
  stem: 'Match each event in an imagined market with its effect.',
  pairs: [
    ['Demand rises, number of firms fixed', 'Equilibrium price and quantity both rise'],
    ['Supply rises, demand unchanged', 'Equilibrium price falls and quantity rises'],
    ['Binding price ceiling', 'Shortage at the controlled price'],
    ['Binding price floor', 'Surplus at the controlled price'],
  ],
  sol: 'A shift of demand to the right moves price and quantity together; a shift of supply to the right moves them in opposite directions; a ceiling opens a gap in favour of buyers and a floor opens one in favour of sellers.',
}));
Q('ord_adjust', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange the steps by which the Ratnapuri mango market moves to equilibrium when the price starts below the equilibrium price.',
  items: [
    'The price is below the equilibrium price',
    'Quantity demanded exceeds quantity supplied: excess demand',
    'Buyers compete for scarce mangoes and the price rises',
    'Excess demand shrinks until quantity demanded equals quantity supplied',
  ],
  sol: 'The sequence begins with a low price, which causes excess demand, which causes competition to raise the price, which narrows the gap until the market clears.',
}));
Q('ord_shift', ord({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'Arrange the steps through which a rise in the demand for cement in Sagarpur, with the number of firms fixed, leads to a new equilibrium.',
  items: [
    'The demand curve shifts to the right',
    'At the old price there is excess demand',
    'The price rises and the quantity supplied rises along the supply curve',
    'A new equilibrium is reached at a higher price and a larger quantity',
  ],
  sol: 'The shift of demand opens a gap at the old price, price rises to close it, and the market settles at a new equilibrium.',
}));

// ---------------------------------------------------------------- numericals (values computed, never typed)
Q('n_m1_qe', num({
  t: 1, d: 2, c: 'application', value: M1.qe, unit: 'quintals', tol: 0,
  stem: `${RAT}. Find the equilibrium quantity of mangoes.`,
  sol: `Equate demand and supply: ${M1.a} − ${M1.b}p = ${M1.c} + ${M1.d}p, so p = ${M1.pe}. Then q = ${M1.a} − ${M1.b} × ${M1.pe} = **${M1.qe}** quintals, and supply gives the same, ${M1.c} + ${M1.d} × ${M1.pe}.`,
}));
Q('n_m1_ex10', num({
  t: 1, d: 1, c: 'application', value: M1.ex(P_LO), unit: 'quintals', tol: 0,
  stem: `${RAT}. Find the excess demand for mangoes at a price of ${inr(P_LO)} per kg.`,
  sol: `At ${inr(P_LO)} quantity demanded is ${M1.a} − ${M1.b} × ${P_LO} = ${M1.qd(P_LO)} and quantity supplied is ${M1.c} + ${M1.d} × ${P_LO} = ${M1.qs(P_LO)}. Excess demand = ${M1.qd(P_LO)} − ${M1.qs(P_LO)} = **${M1.ex(P_LO)}** quintals.`,
}));
Q('n_m2_es', num({
  t: 1, d: 2, c: 'application', value: -M2.ex(500), unit: 'thousand bags', tol: 0,
  stem: `${SAG}. Find the excess supply of cement at a price of Rs 500 per bag.`,
  sol: `At Rs 500 demand is ${M2.a} − ${M2.b} × 500 = ${M2.qd(500)} and supply is ${M2.c} + ${M2.d} × 500 = ${M2.qs(500)}. Excess supply = ${M2.qs(500)} − ${M2.qd(500)} = **${-M2.ex(500)}** thousand bags.`,
}));
Q('n_m6_pe', num({
  t: 1, d: 2, c: 'application', value: M6.pe, unit: 'Rs per kg', tol: 0,
  stem: `Here is ${sched6}. Find the equilibrium price.`,
  sol: `Quantity demanded equals quantity supplied, ${M6.qd[M6.i]} quintals each, only at the price of **Rs ${M6.pe}** per kg. At lower prices demand is larger and at higher prices supply is larger.`,
}));
Q('n_m6_shift', num({
  t: 1, d: 3, c: 'application', value: M6n.pe, unit: 'Rs per kg', tol: 0,
  stem: `In ${sched6}, a festival raises the quantity demanded by 60 quintals at every price, with supply unchanged. Find the new equilibrium price.`,
  sol: `New quantities demanded: ${J(M6n.qd)}. Compared with the supply ${J(M6n.qs)}, the two are equal at Rs ${M6n.pe}, where both are ${M6n.qe} quintals. The new equilibrium price is **Rs ${M6n.pe}** per kg.`,
}));
Q('n_m7_q', num({
  t: 1, d: 3, c: 'application', value: M7n.qe, unit: 'hundred candles', tol: 0,
  stem: `In ${sched7}, a wedding season raises the quantity demanded by 40 hundred candles at every price while supply is unchanged. Find the new equilibrium quantity.`,
  sol: `The new demands are ${J(M7n.qd)}. They match the supplies ${J(M7n.qs)} at Rs ${M7n.pe}, where the quantity is **${M7n.qe}** hundred candles, up from ${M7.qe}.`,
}));
Q('n_m1_dup', num({
  t: 1, d: 3, c: 'application', value: M1d.pe, unit: 'Rs per kg', tol: 0,
  stem: `${RAT}. A rise in incomes adds ${M1d.da} quintals to the quantity demanded at every price. Find the new equilibrium price.`,
  sol: `New demand: ${M1d.a} − ${M1d.b}p. Equate with ${M1d.c} + ${M1d.d}p: ${M1d.a - M1d.c} = ${M1d.b + M1d.d}p, so p = **${M1d.pe}**. The price rises from ${M1.pe} by ${M1d.dp}.`,
}));
Q('n_m1_sq', num({
  t: 1, d: 3, c: 'application', value: M1s.qe, unit: 'quintals', tol: 0,
  stem: `${RAT}. A better harvest adds ${M1s.dc} quintals to the quantity supplied at every price. Find the new equilibrium quantity.`,
  sol: `New supply: ${M1s.c} + ${M1s.d}p. Equating with ${M1s.a} − ${M1s.b}p gives p = ${M1s.pe}. Quantity = ${M1s.a} − ${M1s.b} × ${M1s.pe} = **${M1s.qe}** quintals, up from ${M1.qe}.`,
}));
Q('n_m2_dup', num({
  t: 1, d: 4, c: 'application', value: M2d.pe, unit: 'Rs per bag', tol: 0,
  stem: `${SAG}. Demand rises by ${M2d.da} thousand bags at every price, the firms being unable to alter their number. Find the new equilibrium price.`,
  sol: `New demand: ${M2d.a} − ${M2d.b}p. Equate with supply, −${-M2.c} + ${M2.d}p: ${M2d.a - M2d.c} = ${M2d.b + M2d.d}p, so p = **${M2d.pe}**. The quantity is ${M2d.qe}.`,
}));
Q('n_m1_both', num({
  t: 1, d: 4, c: 'application', value: M1b.qe, unit: 'quintals', tol: 0,
  stem: `${RAT}. Demand and supply each increase by ${M1b.da} quintals at every price. Find the new equilibrium quantity.`,
  sol: `New curves: ${M1b.a} − ${M1b.b}p and ${M1b.c} + ${M1b.d}p, so ${M1b.a - M1b.c} = ${M1b.b + M1b.d}p and p = ${M1b.pe} (unchanged). Quantity = ${M1b.a} − ${M1b.b} × ${M1b.pe} = **${M1b.qe}** quintals.`,
}));
Q('n_find_shift', num({
  t: 1, d: 4, c: 'analysis', value: M1b.dc, unit: 'quintals', tol: 0,
  stem: `${RAT}. A rise in incomes adds ${M1b.da} quintals to the quantity demanded at every price. By how many quintals must supply increase at every price so that the equilibrium price stays at ${inr(M1.pe)} per kg?`,
  sol: `With demand ${M1.a + M1b.da} − ${M1.b}p and supply ${M1.c} + x + ${M1.d}p, the price is ${M1.pe} only if ${M1.a + M1b.da} − ${M1.b * M1.pe} = ${M1.c} + x + ${M1.d * M1.pe}. At ${inr(M1.pe)} demand is ${M1b.qd(M1.pe)} and supply was ${M1.qs(M1.pe)}, so the supply must rise by **${M1b.dc}** quintals, equal to the rise in demand.`,
}));
Q('n_m3_short', num({
  t: 2, d: 2, c: 'application', value: C1.shortage, unit: 'cylinders', tol: 0,
  stem: `${CHA}. A ceiling of ${inr(C1.pc)} per cylinder is imposed. Find the shortage at the ceiling.`,
  sol: `Demand at ${C1.pc} = ${M3.a} − ${C1.pc} = ${C1.qd}; supply = ${M3.d} × ${C1.pc} = ${C1.qs}. Shortage = ${C1.qd} − ${C1.qs} = **${C1.shortage}** cylinders a week.`,
}));
Q('n_m3_bm', num({
  t: 2, d: 4, c: 'analysis', value: C1.bm, unit: 'Rs per cylinder', tol: 0,
  stem: `${CHA}. Only ${C1.qs} cylinders a week reach the market under a ceiling of ${inr(C1.pc)}. The highest price per cylinder that buyers would be willing to pay for exactly this quantity is found from the demand function. Find it.`,
  sol: `Households would buy ${C1.qs} cylinders when ${M3.a} − p = ${C1.qs}, that is p = **${C1.bm}**. The figure is above the ceiling of ${C1.pc}, which is why buyers may be tempted to pay more illegally.`,
}));
Q('n_m4_sur', num({
  t: 2, d: 2, c: 'application', value: F1.surplus, unit: 'thousand kg', tol: 0,
  stem: `${DHA}. A floor of ${inr(F1.pf)} per kg is fixed. Find the excess supply at the floor.`,
  sol: `Supply at ${F1.pf} = ${M4.c} + ${M4.d} × ${F1.pf} = ${F1.qs}; demand = ${M4.a} − ${M4.b} × ${F1.pf} = ${F1.qd}. Excess supply = ${F1.qs} − ${F1.qd} = **${F1.surplus}** thousand kg a month.`,
}));
Q('n_m4_cost', num({
  t: 2, d: 4, c: 'application', value: F1cost, unit: 'Rs thousand', tol: 0,
  stem: `${DHA}. The government keeps its floor of ${inr(F1.pf)} per kg by buying the whole surplus at that price. Find its monthly spending on the purchase, in Rs thousand (quantities are in thousand kg).`,
  sol: `Surplus at the floor = ${F1.qs} − ${F1.qd} = ${F1.surplus} thousand kg. Spending = ${F1.surplus} × ${F1.pf} = **${F1cost}** Rs thousand a month.`,
}));
Q('n_m5_sur', num({
  t: 2, d: 3, c: 'application', value: F5.surplus, unit: 'weavers', tol: 0,
  stem: `${KAR}. A minimum wage of ${inr(F5.pf)} a day is enforced. Find the number of weavers who want work but are not employed.`,
  sol: `At ${F5.pf} employers demand ${M5.a} − ${M5.b} × ${F5.pf} = ${F5.qd} weavers and ${F5.qs} weavers offer to work, so the number without work is ${F5.qs} − ${F5.qd} = **${F5.surplus}**.`,
}));

// ---------------------------------------------------------------- short answers, 2 marks
Q('s2_eq_def', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Define equilibrium price and equilibrium quantity, using the Ratnapuri mango market in your answer.',
  model: `The equilibrium price is the price at which the quantity demanded equals the quantity supplied, so the market clears. The equilibrium quantity is the amount bought and sold at that price. In Ratnapuri both are fixed by ${M1.a} − ${M1.b}p = ${M1.c} + ${M1.d}p, giving Rs ${M1.pe} per kg and ${M1.qe} quintals.`,
  sol: 'Both definitions, with the example.',
  scheme: [['Equilibrium price defined', 1], ['Equilibrium quantity defined, with the example', 1]],
}));
Q('s2_ed', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Explain why a price of ${inr(P_LO)} per kg cannot last in the Ratnapuri mango market.`,
  model: `At Rs ${P_LO} buyers want ${M1.qd(P_LO)} quintals but sellers offer only ${M1.qs(P_LO)}, so there is excess demand of ${M1.ex(P_LO)}. Disappointed buyers offer more, the price rises, and the gap closes at Rs ${M1.pe}.`,
  sol: 'Excess demand pushes the price up.',
  scheme: [['Excess demand found with figures', 1], ['Price rises until the market clears', 1]],
}));
Q('s2_es', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'In Sagarpur the cement price is Rs 500 per bag, above equilibrium. Explain what happens to the price and why.',
  model: `At Rs 500 firms supply ${M2.qs(500)} thousand bags but buyers want only ${M2.qd(500)}, an excess supply of ${-M2.ex(500)}. Firms with unsold cement cut their price, and quantity supplied falls and quantity demanded rises until the price reaches Rs ${M2.pe}.`,
  sol: 'Excess supply pushes the price down.',
  scheme: [['Excess supply shown with figures', 1], ['Price falls until the market clears', 1]],
}));
Q('s2_inv', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by the invisible hand in the adjustment of price to equilibrium? Use the mango market of Ratnapuri as an example.',
  model: 'The invisible hand is the idea that price moves to the market-clearing level through the separate choices of many buyers and sellers, with no authority directing them. In Ratnapuri, buyers bidding for scarce mangoes raise the price, and sellers with unsold mangoes lower it, until the two sides balance.',
  sol: 'Price adjusts without central direction.',
  scheme: [['Idea explained: no central direction', 1], ['Illustrated with the mango market', 1]],
}));
Q('s2_dshift', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `The demand for cement in Sagarpur rises by ${M2d.da} thousand bags at every price while the number of firms is fixed. State the effect on equilibrium price and quantity, with the figures.`,
  model: `The price rises from Rs ${M2.pe} to Rs ${M2d.pe} per bag, and the quantity rises from ${M2.qe} to ${M2d.qe} thousand bags. Excess demand at the old price raises the price, and firms respond by supplying more along their supply curve.`,
  sol: 'Both price and quantity rise.',
  scheme: [['New price and quantity', 1], ['Reason through excess demand', 1]],
}));
Q('s2_sshift', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `A pest reduces the supply of mangoes in Ratnapuri by ${-M1sn.dc} quintals at every price. State the effect on equilibrium price and quantity, with the figures.`,
  model: `The price rises from Rs ${M1.pe} to Rs ${M1sn.pe} per kg and the quantity falls from ${M1.qe} to ${M1sn.qe} quintals. The shortage at the old price pushes the price up, and buyers move up their demand curve to buy less.`,
  sol: 'Price up, quantity down.',
  scheme: [['New price and quantity', 1], ['Reason through the shortage and demand curve', 1]],
}));
Q('s2_ceiling_def', short({
  t: 2, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Define a price ceiling and give one imagined example, from the district of Chandanpur.',
  model: `A price ceiling is a maximum price, fixed by the government, at which a good may be sold; it is meant to bind when it is below the equilibrium price. For example, Chandanpur fixes Rs ${C1.pc} for a cooking gas cylinder when the free price would be Rs ${M3.pe}.`,
  sol: 'Definition and example.',
  scheme: [['Ceiling defined', 1], ['Example with the figures', 1]],
}));
Q('s2_floor_def', short({
  t: 2, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Define a price floor and give one imagined example from the millet market of Dhanpur.',
  model: `A price floor is a minimum price fixed by the government, below which a good may not be sold; it is meant to bind when set above the equilibrium price. For example, Dhanpur fixes Rs ${F1.pf} per kg for millet when the free price would be Rs ${M4.pe}.`,
  sol: 'Definition and example.',
  scheme: [['Floor defined', 1], ['Example with the figures', 1]],
}));
Q('s2_ceiling_ok', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: `Why does a ceiling of ${inr(GAS_ABOVE)} on a cylinder have no effect in Chandanpur, where the free market price is ${inr(M3.pe)}?`,
  model: `The ceiling is above the equilibrium price. At Rs ${GAS_ABOVE} demand is ${M3.qd(GAS_ABOVE)} cylinders and supply ${M3.qs(GAS_ABOVE)}, so the price falls to Rs ${M3.pe} on its own and never reaches the limit. A ceiling matters only when it is below equilibrium.`,
  sol: 'The ceiling does not bind.',
  scheme: [['Ceiling above equilibrium, with figures', 1], ['Price settles below the limit: no effect', 1]],
}));

// ---------------------------------------------------------------- short answers, 3 marks
Q('s3_shift_demand', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `${SAG}. Demand then falls by ${-M2dn.da} thousand bags at every price. Find the new equilibrium and explain the adjustment from the old equilibrium.`,
  model: `The new demand is ${M2dn.a} − ${M2dn.b}p, which meets supply at Rs ${M2dn.pe} per bag and ${M2dn.qe} thousand bags. At the old price of Rs ${M2.pe}, demand is now ${M2dn.qd(M2.pe)} against supply ${M2dn.qs(M2.pe)}, so firms face excess supply, cut the price, and quantity falls along the supply curve.`,
  sol: 'New equilibrium, and the adjustment through excess supply.',
  scheme: [['New price', 1], ['New quantity', 1], ['Adjustment through excess supply at the old price', 1]],
}));
Q('s3_both', short({
  t: 1, d: 4, c: 'application', marks: 3, wl: S3,
  stem: `In Ratnapuri, demand and supply of mangoes each rise by ${M1b.da} quintals at every price. Find the new equilibrium price and quantity and explain why the price stays unchanged.`,
  model: `The new curves, ${M1b.a} − ${M1b.b}p and ${M1b.c} + ${M1b.d}p, meet at Rs ${M1b.pe} per kg, with ${M1b.qe} quintals. At the old price the excess demand caused by the rise in demand is exactly offset by the extra supply, so there is no pressure on price, while quantity rises by ${M1b.dq}.`,
  sol: 'Equal shifts leave price unchanged and raise quantity.',
  scheme: [['New price', 1], ['New quantity', 1], ['Reason: shifts offset each other at the old price', 1]],
}));
Q('s3_quantity_same', short({
  t: 1, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: `The demand for mangoes in Ratnapuri rises by ${M1q.da} quintals and the supply falls by ${-M1q.dc} quintals at every price. Show that the quantity traded is unchanged but the price changes.`,
  model: `The new curves, ${M1q.a} − ${M1q.b}p and ${M1q.c} + ${M1q.d}p, meet at Rs ${M1q.pe}, where quantity is ${M1q.qe} quintals, the same as before. The rise in demand alone would lift quantity and the fall in supply alone would lower it by the same amount, so the two cancel, while both push the price up from Rs ${M1.pe}.`,
  sol: 'Offsetting effects on quantity; price rises.',
  scheme: [['New equilibrium found', 1], ['Quantity unchanged, with the figure', 1], ['Price rises, reason', 1]],
}));
Q('s3_ceiling_effects', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Describe three consequences of a ceiling of ${inr(C1.pc)} on cooking gas cylinders in Chandanpur, where the free price is ${inr(M3.pe)}.`,
  model: `First, a shortage of ${C1.shortage} cylinders a week appears, since demand is ${C1.qd} and supply ${C1.qs}. Second, the scarce cylinders have to be shared by rationing, such as ration cards, or by queues. Third, a black market may arise, with some cylinders sold above the ceiling, and sellers may cut quality or service.`,
  sol: 'Shortage, rationing and queues, black market and quality.',
  scheme: [['Shortage with figure', 1], ['Rationing and queues', 1], ['Black market or quality', 1]],
}));
Q('s3_floor_effects', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Describe three consequences of a floor of ${inr(F1.pf)} per kg in the millet market of Dhanpur, where the free price is ${inr(M4.pe)}.`,
  model: `First, a surplus of ${F1.surplus} thousand kg a month appears, since supply is ${F1.qs} and demand ${F1.qd}. Second, if the government buys the surplus, it must pay for it and store it as a buffer stock. Third, farmers gain a higher and more certain price, but buyers face a higher price and buy less than at equilibrium.`,
  sol: 'Surplus, purchase and storage, gainers and losers.',
  scheme: [['Surplus with figure', 1], ['Government purchase and buffer stock', 1], ['Effects on farmers and buyers', 1]],
}));
Q('s3_why_controls', short({
  t: 2, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Why might a government fix a ceiling on essential goods or a floor on farm produce, and what problems may follow? Use imagined examples.',
  model: 'A ceiling on a necessity, such as cooking gas in Chandanpur, aims to keep it affordable for poorer households. A floor on millet in Dhanpur aims to protect farmers’ incomes. The problems are a shortage with queues and possible black markets under a ceiling, and a surplus that must be bought and stored under a floor.',
  sol: 'Aims of each control and the problem that follows.',
  scheme: [['Aim of a ceiling', 1], ['Aim of a floor', 1], ['Problem of each: shortage, surplus', 1]],
}));

// ---------------------------------------------------------------- long answers, 5 marks
Q('l_eq_adjust', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: `Using ${sched6}, explain how the market reaches equilibrium from a price of Rs ${M6.p[1]} and from a price of Rs ${M6.p[5]}.`,
  model: `Equilibrium is at Rs ${M6.pe}, where demand and supply are both ${M6.qe} quintals. At Rs ${M6.p[1]} buyers want ${M6.qd[1]} but sellers offer ${M6.qs[1]}, so excess demand of ${M6.ex[1]} makes buyers compete and the price rises; as it does, demand falls and supply rises. At Rs ${M6.p[5]} sellers offer ${M6.qs[5]} against demand of ${M6.qd[5]}, so excess supply of ${-M6.ex[5]} leads sellers to cut the price, with supply falling and demand rising, until the market clears at Rs ${M6.pe}.`,
  sol: 'Equilibrium, excess demand with figures, excess supply with figures.',
  scheme: [['Equilibrium price and quantity', 1], ['Excess demand at the low price, with figures', 1.5], ['Price rises, quantities adjust', 0.5], ['Excess supply at the high price, with figures', 1.5], ['Price falls to equilibrium', 0.5]],
}));
Q('l_dshift', long({
  t: 1, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `${SAG}. Explain, with figures, what happens to the equilibrium when (i) demand rises by ${M2d.da} thousand bags and (ii) supply rises by ${M2s.dc} thousand bags at every price, taking each change separately.`,
  model: `The first equilibrium is Rs ${M2.pe} and ${M2.qe} thousand bags. (i) A rise in demand creates excess demand at Rs ${M2.pe}; the price rises to Rs ${M2d.pe} and quantity rises to ${M2d.qe}. (ii) A rise in supply creates excess supply at Rs ${M2.pe}; the price falls to Rs ${M2s.pe} and quantity rises to ${M2s.qe}. Quantity rises in both cases, but the price moves in opposite directions, since a shift of demand moves price and quantity together while a shift of supply moves them apart.`,
  sol: 'Two separate shifts with figures and the contrast.',
  scheme: [['Initial equilibrium', 0.5], ['Demand rise with figures and reason', 1.5], ['Supply rise with figures and reason', 1.5], ['Contrast of the two cases', 1.5]],
}));
Q('l_simul', long({
  t: 1, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `Starting from Rs ${M1.pe} per kg and ${M1.qe} quintals in the Ratnapuri mango market, demand and supply both rise. Find the new price and quantity when (i) both rise by ${M1b.da}, (ii) demand rises by ${M1c.da} and supply by ${M1c.dc}, (iii) demand rises by ${M1e.da} and supply by ${M1e.dc}, and state the general rule.`,
  model: `Case (i): Rs ${M1b.pe} and ${M1b.qe} quintals, so the price is unchanged. Case (ii): Rs ${M1c.pe} and ${M1c.qe}, so the price rises. Case (iii): Rs ${M1e.pe} and ${M1e.qe}, so the price falls. In every case the larger quantity is supplied and bought, because both curves have moved to the right. When both curves shift right, quantity rises; the price rises, stays or falls according as the shift of demand is larger than, equal to or smaller than the shift of supply.`,
  sol: 'Three computed cases and the rule.',
  scheme: [['Case (i)', 1], ['Case (ii)', 1], ['Case (iii)', 1], ['Rule for the price', 1.5], ['Quantity rises in all three', 0.5]],
}));
Q('l_ceiling', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `${CHA}. The administration imposes a ceiling of ${inr(C1.pc)} per cylinder. Find the shortage and explain the effects of the ceiling.`,
  model: `The free equilibrium is Rs ${M3.pe} and ${M3.qe} cylinders. At the ceiling, demand is ${C1.qd} and supply ${C1.qs}, so the shortage is ${C1.shortage} cylinders. Only ${C1.traded} cylinders are sold, fewer than before. They must be shared by ration cards or queues. Some buyers would pay up to Rs ${C1.bm} for the scarce cylinders, so a black market may arise. Households that get a cylinder gain, while those without lose; dealers may also cut quality or service.`,
  sol: 'Shortage computed; rationing, queues, black market, quality.',
  scheme: [['Shortage computed', 1.5], ['Quantity traded falls', 0.5], ['Rationing and queues', 1], ['Black market, with the price buyers would pay', 1], ['Quality and who gains or loses', 1]],
}));
Q('l_floor', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `${DHA}. The government fixes a floor of ${inr(F1.pf)} per kg. Find the surplus and explain the effects of the floor.`,
  model: `The free equilibrium is Rs ${M4.pe} and ${M4.qe} thousand kg. At the floor, supply is ${F1.qs} and demand ${F1.qd}, so the surplus is ${F1.surplus} thousand kg. Buyers purchase only ${F1.traded}. Unless the government buys the surplus, farmers cannot sell it; if it does, it spends Rs ${F1cost} thousand a month and must store the grain as a buffer stock. Farmers who sell gain a higher price, while buyers pay more and consume less.`,
  sol: 'Surplus computed; purchase, storage, gainers and losers.',
  scheme: [['Surplus computed', 1.5], ['Quantity bought by consumers falls', 0.5], ['Government purchase, cost and buffer stock', 1.5], ['Gainers and losers', 1.5]],
}));
Q('l_wage', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `${KAR}. Find the equilibrium wage and employment, then the effect of a minimum wage of ${inr(F5.pf)} a day, and comment on who gains and who loses.`,
  model: `The wage is where ${M5.a} − ${M5.b}w = −${-M5.c} + ${M5.d}w, which is Rs ${M5.pe} a day, with ${M5.qe} weavers employed. At Rs ${F5.pf} employers demand ${F5.qd} weavers while ${F5.qs} offer to work, so ${F5.surplus} weavers are without work. Employment falls from ${M5.qe} to ${F5.traded}. The ${F5.traded} who keep jobs gain a higher wage, while those who lose them, and employers paying more, lose.`,
  sol: 'Equilibrium wage; floor effect with figures; gainers and losers.',
  scheme: [['Equilibrium wage and employment', 1.5], ['Surplus of weavers at the floor', 1.5], ['Employment falls', 0.5], ['Gainers and losers', 1.5]],
}));

// ---------------------------------------------------------------- case-based (imagined passages)
Q('cb_mango', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined tomato market of Meghgaon**\n\nIn the market of Meghgaon, price is in Rs per kg and quantities are in quintals a day. The quantity demanded at prices of ${J(M6.p)} is ${J(M6.qd)}, and the quantity supplied is ${J(M6.qs)}.`,
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Find the equilibrium price and quantity.', model: `Demand equals supply at **Rs ${M6.pe}** per kg, where both are **${M6.qe}** quintals.`, sol: `Equilibrium ${M6.pe}, ${M6.qe}.`, scheme: [['Correct price and quantity', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: `Find the excess demand at a price of Rs ${M6.p[0]}.`, model: `${M6.qd[0]} − ${M6.qs[0]} = **${M6.ex[0]}** quintals.`, sol: `Excess demand ${M6.ex[0]}.`, scheme: [['Correct excess demand', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: `**Either** (i): A festival raises the quantity demanded by 60 quintals at every price. Find the new equilibrium and say what happens to the price.`, model: `The new demands are ${J(M6n.qd)}, which equal supply at Rs ${M6n.pe}, with ${M6n.qe} quintals. The price rises from ${M6.pe} to ${M6n.pe}, because the extra demand creates excess demand at the old price.`, sol: 'New equilibrium; price rises.', scheme: [['New equilibrium found', 1], ['Price effect explained', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): At a price of Rs ${M6.p[5]}, state whether there is excess demand or excess supply, its size, and what will happen to the price.`, model: `Supply of ${M6.qs[5]} exceeds demand of ${M6.qd[5]}, so there is excess supply of ${-M6.ex[5]} quintals. Sellers with unsold tomatoes will cut the price, towards Rs ${M6.pe}.`, sol: 'Excess supply; price falls.', scheme: [['Excess supply with size', 1], ['Price falls towards equilibrium', 1]] }),
    ]),
  ],
}));
Q('cb_gas', caseQ({
  t: 2, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined cooking gas market of Chandanpur**\n\n${CHA}. The district administration, concerned about affordability, fixes a ceiling of ${inr(C2.pc)} per cylinder.`,
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Find the equilibrium price of a cylinder.', model: `${M3.a} − p = ${M3.d}p gives p = **Rs ${M3.pe}**.`, sol: `Equilibrium ${M3.pe}.`, scheme: [['Correct equilibrium price', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Find the shortage at the ceiling.', model: `Demand ${C2.qd} − supply ${C2.qs} = **${C2.shortage}** cylinders a week.`, sol: `Shortage ${C2.shortage}.`, scheme: [['Correct shortage', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): State two ways in which the limited cylinders could be shared among households, and one problem that may arise.', model: 'They may be shared by ration cards fixing a quota for each household, or by queues in which buyers wait. One problem is that a black market may arise, with some cylinders sold above the ceiling.', sol: 'Rationing, queues; black market.', scheme: [['Two ways of sharing', 1], ['One problem', 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): Explain how the shortage would change if the ceiling were Rs ${C1.pc} instead of Rs ${C2.pc}.`, model: `At Rs ${C1.pc} demand is ${C1.qd} and supply ${C1.qs}, a shortage of ${C1.shortage}, larger than ${C2.shortage}. A ceiling further below the equilibrium price raises demand and lowers supply, so the shortage widens.`, sol: 'Shortage widens as the ceiling falls.', scheme: [['New shortage compared', 1], ['Reason: demand rises, supply falls', 1]] }),
    ]),
  ],
}));
Q('cb_millet', caseQ({
  t: 2, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined millet market of Dhanpur**\n\n${DHA}. To protect farm incomes, the government announces a floor of ${inr(F1.pf)} per kg and offers to buy any millet that buyers do not take.`,
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Find the quantity demanded at the floor price.', model: `${M4.a} − ${M4.b} × ${F1.pf} = **${F1.qd}** thousand kg.`, sol: `Demand ${F1.qd}.`, scheme: [['Correct quantity demanded', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Find the quantity the government must buy.', model: `Supply ${F1.qs} − demand ${F1.qd} = **${F1.surplus}** thousand kg.`, sol: `Surplus ${F1.surplus}.`, scheme: [['Correct surplus', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Find the government’s spending on the purchase and name the stock it builds.', model: `Spending is ${F1.surplus} × ${F1.pf} = Rs ${F1cost} thousand a month. The grain it stores is a buffer stock.`, sol: 'Spending computed; buffer stock.', scheme: [['Spending computed', 1], ['Buffer stock named', 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): Who gains and who loses when the floor is raised from Rs ${F1.pf} to Rs ${F2.pf}? Support your answer with the surplus at each floor.`, model: `The surplus rises from ${F1.surplus} to ${F2.surplus} thousand kg. Farmers who sell at the higher price gain, but buyers pay more and buy less, and the government must buy and store more.`, sol: 'Surplus widens; farmers gain; buyers and government bear cost.', scheme: [['Surplus at each floor', 1], ['Gainers and losers', 1]] }),
    ]),
  ],
}));
Q('cb_cement', caseQ({
  t: 1, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined cement market of Sagarpur**\n\n${SAG}.`,
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Find the equilibrium price and quantity.', model: `${M2.a} − ${M2.b}p = ${M2.c} + ${M2.d}p gives **Rs ${M2.pe}** per bag and **${M2.qe}** thousand bags.`, sol: `Equilibrium ${M2.pe}, ${M2.qe}.`, scheme: [['Correct price and quantity', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: `Find the excess supply at a price of Rs 500 per bag.`, model: `Supply ${M2.qs(500)} − demand ${M2.qd(500)} = **${-M2.ex(500)}** thousand bags.`, sol: `Excess supply ${-M2.ex(500)}.`, scheme: [['Correct excess supply', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: `**Either** (i): A strike lowers supply by ${-M2sn.dc} thousand bags at every price. Find the new price and quantity and state the direction of each change.`, model: `The new price is Rs ${M2sn.pe} and the quantity ${M2sn.qe} thousand bags. The price rises from ${M2.pe} and the quantity falls from ${M2.qe}.`, sol: 'Price up, quantity down.', scheme: [['New price and quantity', 1], ['Directions of change', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): Demand rises by ${M2d.da} thousand bags at every price. Find the new price and quantity and state the direction of each change.`, model: `The new price is Rs ${M2d.pe} and the quantity ${M2d.qe} thousand bags. Both rise from ${M2.pe} and ${M2.qe}.`, sol: 'Both rise.', scheme: [['New price and quantity', 1], ['Directions of change', 1]] }),
    ]),
  ],
}));
