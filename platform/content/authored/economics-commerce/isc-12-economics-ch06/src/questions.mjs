// ISC 12 Economics, ch06 Market Mechanism: Equilibrium Price and its Applications — question bank. Every market,
// town, schedule and policy case is imagined by SOYL; no textbook example, exercise, specimen-paper or past-paper
// item is reused (D-036; the ISC 2027 specimen's app-cab ceiling item is deliberately not used). Every number in a
// stem, key or solution is computed here from linear demand and supply equations, so they cannot drift apart.
// Style follows the ISC 2027 Economics specimen (sources/cisce.md isc-2027-specimen-856-economics).
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from '../../isc-12-economics-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const S4 = [70, 110];
const L5 = [100, 150];
const L8 = [150, 220];

const assert = (cond, msg) => { if (!cond) throw new Error(`questions.mjs: ${msg}`); };

// ---------------------------------------------------------------- equilibrium helper
// Demand Qd = a − bP, supply Qs = c + dP (c may be negative). Equilibrium where a − bP = c + dP.
export const qd = ([a, b], p) => a - b * p;
export const qs = ([c, d], p) => c + d * p;
export function eq(D, S) {
  const p = (D[0] - S[0]) / (D[1] + S[1]);
  const q = qd(D, p);
  assert(Math.abs(q - qs(S, p)) < 1e-9, 'equilibrium check');
  return { p, q };
}
const md = (rows, head) => `| ${head.join(' | ')} |\n|${head.map(() => '---').join('|')}|\n${rows.map((r) => `| ${r.join(' | ')} |`).join('\n')}`;

// Jaggery market in an imagined Kolhapur mandi: P in ₹ per kg, Q in tonnes a week.
export const JD = [120, 2];
export const JS = [-30, 3];
export const JE = eq(JD, JS);
assert(JE.p === 30 && JE.q === 60, 'jaggery equilibrium');
export const J_ROWS = [20, 25, 30, 35, 40].map((p) => [p, qd(JD, p), qs(JS, p)]);
// Excess demand at ₹20, excess supply at ₹40.
export const ED20 = qd(JD, 20) - qs(JS, 20);
export const ES40 = qs(JS, 40) - qd(JD, 40);
assert(ED20 === 50 && ES40 === 50, 'excess');
// Shifts (each by 25 tonnes at every price).
export const JD_UP = [145, 2];
export const JD_DOWN = [95, 2];
export const JS_UP = [-5, 3];
export const JS_DOWN = [-55, 3];
export const E_DUP = eq(JD_UP, JS);
export const E_DDOWN = eq(JD_DOWN, JS);
export const E_SUP = eq(JD, JS_UP);
export const E_SDOWN = eq(JD, JS_DOWN);
export const E_BOTH = eq(JD_UP, JS_UP);
assert(E_DUP.p === 35 && E_DUP.q === 75, 'demand up');
assert(E_DDOWN.p === 25 && E_DDOWN.q === 45, 'demand down');
assert(E_SUP.p === 25 && E_SUP.q === 70, 'supply up');
assert(E_SDOWN.p === 35 && E_SDOWN.q === 50, 'supply down');
assert(E_BOTH.p === 30 && E_BOTH.q === 85, 'equal increases');

// Atta (wheat flour) in an imagined hill district during a supply disruption: P in ₹ per kg, Q in tonnes a week.
export const AD = [200, 4];
export const AS = [-100, 6];
export const AE = eq(AD, AS);
assert(AE.p === 30 && AE.q === 80, 'atta equilibrium');
export const CEIL = 25;
export const SHORT25 = qd(AD, CEIL) - qs(AS, CEIL);
assert(qd(AD, CEIL) === 100 && qs(AS, CEIL) === 50 && SHORT25 === 50, 'ceiling shortage');

// Masoor dal (lentils) in an imagined Madhya Pradesh district: P in ₹ hundred per quintal, Q in thousand quintals.
export const MD = [500, 5];
export const MS = [-100, 5];
export const ME = eq(MD, MS);
assert(ME.p === 60 && ME.q === 200, 'lentil equilibrium');
export const FLOOR = 70;
export const SURPLUS70 = qs(MS, FLOOR) - qd(MD, FLOOR);
assert(qd(MD, FLOOR) === 150 && qs(MS, FLOOR) === 250 && SURPLUS70 === 100, 'floor surplus');

// Mango-pulp market in an imagined Ratnagiri cooperative (for numericals): Qd = 90 − 3P, Qs = 2P − 10.
export const PD = [90, 3];
export const PS = [-10, 2];
export const PE = eq(PD, PS);
assert(PE.p === 20 && PE.q === 30, 'pulp equilibrium');

// Kite-string market in an imagined Ahmedabad lane before Uttarayan: schedule only.
export const KITE = [[40, 900, 300], [50, 750, 450], [60, 600, 600], [70, 450, 750]];
assert(KITE.find((r) => r[1] === r[2])[0] === 60, 'kite equilibrium');

// ================================================================ t01 Market equilibrium and disequilibrium
Q('m_eq_meaning', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In a competitive market, the equilibrium price of a commodity is the price at which',
  opts: [
    'the quantity buyers wish to buy equals the quantity sellers wish to sell',
    'sellers earn the highest possible profit',
    'the government says the good should be sold',
    'buyers spend the largest possible amount on the good',
  ],
  sol: 'Equilibrium means market demand equals market supply, so there is no pressure on the price to change. Profit, government decisions and total spending do not define it.',
}));
Q('m_jaggery_read', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `A weekly schedule for jaggery in an imagined Kolhapur mandi reads: at ₹25 a kg, ${qd(JD, 25)} tonnes demanded and ${qs(JS, 25)} supplied; at ₹30, ${qd(JD, 30)} and ${qs(JS, 30)}; at ₹35, ${qd(JD, 35)} and ${qs(JS, 35)}. The equilibrium price and quantity are`,
  opts: [`₹30 and ${JE.q} tonnes`, `₹25 and ${qd(JD, 25)} tonnes`, `₹35 and ${qs(JS, 35)} tonnes`, `₹30 and ${JE.q * 2} tonnes`],
  sol: `Only at ₹30 is the quantity demanded (${qd(JD, 30)}) equal to the quantity supplied (${qs(JS, 30)}). At ₹25 demand exceeds supply; at ₹35 supply exceeds demand; and equilibrium quantity is not the sum of both sides.`,
}));
Q('m_excess_demand_def', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'At a price below equilibrium in the market for school notebooks in an imagined Patna bazaar, which situation arises, and how does the price respond?',
  opts: [
    'Excess demand arises and competition among buyers pushes the price up',
    'Excess supply arises and sellers cut the price',
    'Excess demand arises and the price falls further',
    'The market is in equilibrium, so the price does not change',
  ],
  sol: 'Below equilibrium more is demanded than supplied: excess demand. Unsatisfied buyers bid the price up until demand and supply match again.',
}));
Q('m_excess_supply_tomato', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Tomato traders in an imagined Kolar market fix a morning price at which they find heaps of unsold tomatoes by noon. What does this tell us about the morning price?',
  opts: [
    'It was above equilibrium, creating excess supply, so the price will tend to fall',
    'It was below equilibrium, creating excess demand, so the price will tend to rise',
    'It was the equilibrium price, because some tomatoes were sold',
    'It was a price floor fixed by the government',
  ],
  sol: 'Unsold stock means quantity supplied exceeded quantity demanded: excess supply at a price above equilibrium. Sellers then cut the price to clear the stock.',
}));
Q('m_adjust_signal', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: `In the imagined Kolhapur jaggery market (Qd = 120 − 2P, Qs = 3P − 30), the price is ₹40 a kg this week. Which statement correctly predicts the next movements?`,
  opts: [
    `There is an excess supply of ${ES40} tonnes, so the price falls; as it falls, quantity demanded extends and quantity supplied contracts until ₹${JE.p}`,
    `There is an excess demand of ${ES40} tonnes, so the price rises towards ₹${JE.p}`,
    `Both curves shift until a new equilibrium forms at ₹40`,
    `Quantity demanded and quantity supplied both rise as the price falls to ₹${JE.p}`,
  ],
  sol: `At ₹40, Qs = ${qs(JS, 40)} and Qd = ${qd(JD, 40)}: an excess supply of ${ES40}. The falling price moves buyers down the demand curve (extension) and sellers down the supply curve (contraction) until both equal ${JE.q} at ₹${JE.p}. No curve shifts.`,
}));
Q('m_eq_where_not', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of the following is NOT true of a market that is in equilibrium?',
  opts: [
    'There is a shortage that rationing must solve',
    'Every buyer willing to pay the market price can buy',
    'Every seller willing to sell at the market price can sell',
    'There is no tendency for the price to change',
  ],
  sol: 'A shortage exists only when the price is held below equilibrium. At equilibrium the market clears: buyers and sellers at that price are both satisfied, and there is no pressure on the price.',
}));
Q('ar_eq_stable', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'In a free market, a price above equilibrium does not last.',
  r: 'At such a price, quantity supplied exceeds quantity demanded, and sellers with unsold stock lower their price.',
  sol: 'Both are true. The excess supply at a high price is exactly what makes sellers cut prices, so R explains why the high price does not last.',
}));
Q('tf_eq_shortage', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? At the equilibrium price of fresh fish in an imagined Mangaluru market, some buyers who are willing to pay that price go home without fish.',
  sol: 'False. At equilibrium, quantity demanded equals quantity supplied, so everyone willing to pay the equilibrium price can buy. Unsatisfied buyers appear only below equilibrium.',
}));
Q('fb_excess_word', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'When quantity supplied is greater than quantity demanded at the ruling price, the market has excess ___.',
  acc: [['supply']],
  sol: 'More offered than wanted at the ruling price is excess supply; it pushes the price down.',
}));
Q('n_pulp_eq', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: PE.p, unit: '₹ per kg',
  stem: 'A mango-pulp cooperative in an imagined Ratnagiri village faces demand Qd = 90 − 3P and supply Qs = 2P − 10 (P in ₹ per kg, Q in tonnes). Find the equilibrium price.',
  sol: `Step 1: Set Qd = Qs: 90 − 3P = 2P − 10.\nStep 2: 100 = 5P, so P = ${PE.p}. The equilibrium price is ₹${PE.p} a kg (quantity ${PE.q} tonnes).`,
}));
Q('n_jaggery_ed', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: ED20, unit: 'tonnes',
  stem: 'In the imagined Kolhapur jaggery mandi, Qd = 120 − 2P and Qs = 3P − 30 (P in ₹ per kg, Q in tonnes a week). Calculate the excess demand at a price of ₹20.',
  sol: `Step 1: Qd = 120 − 40 = ${qd(JD, 20)}; Qs = 60 − 30 = ${qs(JS, 20)}.\nStep 2: Excess demand = ${qd(JD, 20)} − ${qs(JS, 20)} = ${ED20} tonnes.`,
}));
Q('mt_terms_t01', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each feature of the imagined Ahmedabad kite-string market with the correct term.',
  pairs: [
    ['Buyers want 900 spools but sellers offer only 300 at ₹40', 'Excess demand'],
    ['Sellers offer 750 spools but buyers want only 450 at ₹70', 'Excess supply'],
    ['Both sides want 600 spools at ₹60', 'Equilibrium'],
    ['Unsold spools make sellers lower their asking price', 'Downward price adjustment'],
  ],
  sol: 'Demand above supply is excess demand; supply above demand is excess supply; equality is equilibrium; unsold stock leads to a fall in price.',
}));
Q('ord_adjust', ord({
  t: 1, d: 2, c: 'understanding', marks: 1,
  stem: 'A seller of woollen shawls in an imagined Shimla market fixes a price below equilibrium at the start of winter. Arrange the events that follow in order.',
  items: [
    'Buyers want more shawls than the seller has at that price',
    'Some buyers offer more than the ruling price to get a shawl',
    'The seller raises the price; quantity demanded contracts and quantity supplied extends',
    'The price settles where quantity demanded equals quantity supplied',
  ],
  sol: 'A low price creates excess demand, buyers compete by offering more, the price rises (moving along both curves) and finally the market clears at equilibrium.',
}));
Q('s_kite_schedule', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: `The imagined Ahmedabad kite-string market before Uttarayan has this schedule (price ₹ per spool: quantity demanded, quantity supplied): ${KITE.map((r) => `₹${r[0]}: ${r[1]}, ${r[2]}`).join('; ')}. Identify the equilibrium and explain what happens at ₹50.`,
  model: `**Equilibrium:** ₹60 a spool, with **600 spools** bought and sold, because demand equals supply there.\nAt **₹50**, demand (750) exceeds supply (450): an **excess demand of 300 spools**, so buyers bid the price **up** towards ₹60.`,
  sol: 'Equilibrium where the columns match; excess demand below it.',
  scheme: [['Equilibrium price and quantity', 1], ['Excess demand at ₹50 and upward pressure', 1]],
}));
Q('s_why_clears', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why is the equilibrium price sometimes called the market-clearing price? Use an imagined vegetable market to explain.',
  model: 'At the equilibrium price the quantity that vendors bring equals the quantity that families wish to buy, so the market is **cleared**: there is **no unsold stock** (no excess supply) and **no unmet demand** (no excess demand) at the end of the day.',
  sol: 'Link equality of demand and supply to no surplus and no shortage.',
  scheme: [['Quantity demanded equals quantity supplied', 1], ['No surplus or shortage, so the market clears', 1]],
}));
Q('s3_pulp_full', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `For the imagined Ratnagiri mango-pulp market, Qd = 90 − 3P and Qs = 2P − 10. (i) Find the equilibrium price and quantity. (ii) State the excess at a price of ₹25 and the direction in which the price will move.`,
  model: `(i) 90 − 3P = 2P − 10 gives 5P = 100, so **P = ₹${PE.p}** and **Q = ${PE.q} tonnes**.\n(ii) At ₹25: Qd = 90 − 75 = ${qd(PD, 25)} and Qs = 50 − 10 = ${qs(PS, 25)}. There is an **excess supply of ${qs(PS, 25) - qd(PD, 25)} tonnes**, so the price will **fall** towards ₹${PE.p}.`,
  sol: 'Solve the two equations, then compare the two quantities at ₹25.',
  scheme: [['Equilibrium price', 1], ['Equilibrium quantity', 1], ['Excess supply at ₹25 and falling price', 1]],
}));
Q('s3_disequilibrium', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain, with a described diagram, how a free market for cotton bales in an imagined Rajkot yard moves back to equilibrium when the ruling price is above the equilibrium price.',
  model: 'Draw DD sloping down and SS sloping up, crossing at E (P*, Q*). At a higher price P₁, the supply curve shows a **larger quantity** than the demand curve: the gap is **excess supply**.\nSellers with unsold bales **lower the price**. As it falls, buyers move **down DD** (extension) and sellers move **down SS** (contraction).\nThe gap narrows until the price returns to **P*** where the curves meet.',
  sol: 'Excess supply at P₁, price cut, movements along both curves to E.',
  scheme: [['Diagram with excess supply at P₁', 1], ['Sellers cut the price', 1], ['Movements along both curves back to E', 1]],
}));
Q('l_eq_adjust', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'For the imagined Kolhapur jaggery mandi with Qd = 120 − 2P and Qs = 3P − 30: (a) find the equilibrium price and quantity [2]; (b) explain, with figures and a described diagram, what happens if the price is ₹20 and if it is ₹40 [3].',
  model: `(a) 120 − 2P = 3P − 30 gives 5P = 150, so **P = ₹${JE.p}** and **Q = ${JE.q} tonnes**.\n(b) At **₹20**: Qd = ${qd(JD, 20)}, Qs = ${qs(JS, 20)}, an **excess demand of ${ED20} tonnes**; buyers compete, the price **rises**, demand contracts and supply extends.\nAt **₹40**: Qd = ${qd(JD, 40)}, Qs = ${qs(JS, 40)}, an **excess supply of ${ES40} tonnes**; sellers cut the price, demand extends and supply contracts.\nIn the diagram both gaps close at E (₹${JE.p}, ${JE.q}), where DD and SS meet.`,
  sol: 'Solve, then read the two disequilibrium prices and the adjustment to E.',
  scheme: [['Equilibrium price', 1], ['Equilibrium quantity', 1], ['Excess demand at ₹20 and price rise', 1], ['Excess supply at ₹40 and price fall', 1], ['Diagram with return to E', 1]],
}));

// ================================================================ t02 Changes in demand
Q('m_demand_up', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A popular doctor in an imagined Indore town recommends daily millet porridge, and families want more millet at every price. With supply unchanged, the equilibrium price and quantity of millet will',
  opts: ['both rise', 'both fall', 'rise and fall respectively', 'fall and rise respectively'],
  sol: 'An increase in demand shifts DD to the right along an unchanged SS: the new intersection is higher and further right, so price and quantity both rise.',
}));
Q('m_demand_down_umbrella', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'An unusually dry monsoon in an imagined Konkan town reduces the demand for umbrellas at every price. With supply unchanged,',
  opts: ['price and quantity of umbrellas both fall', 'price rises and quantity falls', 'price falls and quantity rises', 'price and quantity both rise'],
  sol: 'A decrease in demand shifts DD left along an unchanged SS, so the new equilibrium has a lower price and a lower quantity.',
}));
Q('m_dshift_numbers', mcq({
  t: 2, d: 3, c: 'application',
  stem: `In the imagined Kolhapur jaggery mandi (Qs = 3P − 30), festival buying raises demand from Qd = 120 − 2P to Qd = 145 − 2P. The new equilibrium is`,
  opts: [`₹${E_DUP.p} and ${E_DUP.q} tonnes`, `₹${JE.p} and ${JE.q + 25} tonnes`, `₹${E_SUP.p} and ${E_SUP.q} tonnes`, `₹${E_DDOWN.p} and ${E_DDOWN.q} tonnes`],
  sol: `145 − 2P = 3P − 30 gives 5P = 175, P = ${E_DUP.p}, Q = 145 − 70 = ${E_DUP.q}. The price rises by ₹5 and quantity by ${E_DUP.q - JE.q} tonnes, less than the 25-tonne shift, because the higher price also contracts demand.`,
}));
Q('m_dshift_cause', mcq({
  t: 2, d: 2, c: 'analysis',
  stem: 'Which of these events, in an imagined Chennai market for filter coffee powder, would lower its equilibrium price with supply unchanged?',
  opts: ['A big fall in the price of tea, a substitute', 'A rise in household incomes, coffee being a normal good', 'A sharp rise in the price of tea, a substitute', 'A festival season that increases coffee drinking'],
  sol: 'Cheaper tea draws buyers away, decreasing demand for coffee powder and lowering its price. Higher incomes, dearer tea and a festival all increase demand for coffee powder and would raise its price.',
}));
Q('ar_demand_price', ar({
  t: 2, d: 3, c: 'analysis', key: 'c',
  a: 'When the demand for a good increases with supply unchanged, its equilibrium quantity rises.',
  r: 'A rise in the price of a good reduces the quantity of it that sellers offer.',
  sol: 'A is true: the demand curve moves right along an upward-sloping supply curve, so more is bought and sold. R is false: by the law of supply, a higher price makes sellers offer more, which is why the quantity traded can rise.',
}));
Q('n_ddown_price', num({
  t: 2, d: 3, c: 'application', marks: 1, value: E_DDOWN.p, unit: '₹ per kg',
  stem: 'A health campaign in the imagined Kolhapur jaggery mandi lowers demand from Qd = 120 − 2P to Qd = 95 − 2P while supply stays Qs = 3P − 30. Find the new equilibrium price.',
  sol: `Step 1: 95 − 2P = 3P − 30.\nStep 2: 125 = 5P, so P = ${E_DDOWN.p}. The new price is ₹${E_DDOWN.p} a kg (quantity ${E_DDOWN.q} tonnes).`,
}));
Q('s_dincrease_diag', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'With a described diagram, show the effect of an increase in demand for raincoats in an imagined Cherrapunji market when supply is unchanged.',
  model: 'Draw SS and DD meeting at E (P, Q). Wetter weather shifts demand **right to D₁D₁**, which meets SS at **E₁**, higher up the supply curve. So the **price rises (P to P₁)** and the **quantity rises (Q to Q₁)**.',
  sol: 'Rightward shift of demand along a fixed supply curve.',
  scheme: [['Rightward shift of DD with new point E₁', 1], ['Both price and quantity rise', 1]],
}));
Q('s_dfall_reason', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Demand for air coolers in an imagined Bhopal market falls after a cool summer, yet the price falls only a little. What does this suggest about supply, and why?',
  model: 'Supply is probably **fairly elastic** (a flat supply curve): sellers cut the quantity they offer a lot for a small fall in price. So when demand shifts left, most of the adjustment is in **quantity**, and the **price falls only slightly**.',
  sol: 'Link the small price change to an elastic (flat) supply curve.',
  scheme: [['Elastic or flat supply curve', 1], ['Adjustment mainly in quantity, small price fall', 1]],
}));
Q('s3_dup_numbers', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'In the imagined Kolhapur jaggery mandi, supply is Qs = 3P − 30 and demand rises from Qd = 120 − 2P to Qd = 145 − 2P during the festival season. Find the old and new equilibria and comment on the change.',
  model: `Old: 120 − 2P = 3P − 30, so **P = ₹${JE.p}, Q = ${JE.q} t**.\nNew: 145 − 2P = 3P − 30, so **P = ₹${E_DUP.p}, Q = ${E_DUP.q} t**.\nAn **increase in demand** with supply unchanged **raises both** price (by ₹${E_DUP.p - JE.p}) and quantity (by ${E_DUP.q - JE.q} t).`,
  sol: 'Two equilibria, then the direction of change.',
  scheme: [['Old equilibrium', 1], ['New equilibrium', 1], ['Comment: both rise', 1]],
}));
Q('s3_two_demand_events', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Explain the effect on the equilibrium price and quantity of bicycles in an imagined Ludhiana market in each case, supply being unchanged: (i) incomes of families rise; (ii) the price of bus passes falls sharply; (iii) a school makes cycling to class compulsory.',
  model: '(i) Bicycles are a normal good: **demand increases**, so price and quantity both **rise**.\n(ii) Bus passes are a substitute: cheaper passes **decrease demand** for bicycles, so price and quantity both **fall**.\n(iii) A new requirement raises the desire to buy at every price: **demand increases**, so price and quantity both **rise**.',
  sol: 'Identify the demand shift in each case, then its effect.',
  scheme: [['(i) increase; both rise', 1], ['(ii) decrease; both fall', 1], ['(iii) increase; both rise', 1]],
}));
Q('l_demand_shifts', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Using the imagined Kolhapur jaggery mandi (Qs = 3P − 30, original Qd = 120 − 2P), explain with figures and described diagrams the effect on equilibrium of (a) an increase in demand to Qd = 145 − 2P [3] and (b) a decrease in demand to Qd = 95 − 2P [2].',
  model: `Original equilibrium: ₹${JE.p} and ${JE.q} tonnes.\n(a) **Increase:** DD shifts right to D₁D₁. At the old price there is excess demand of 25 t, so the price rises; the new equilibrium is **₹${E_DUP.p} and ${E_DUP.q} t**. The diagram shows E₁ above and to the right of E on SS.\n(b) **Decrease:** DD shifts left to D₂D₂; excess supply at ₹${JE.p} pushes the price down to **₹${E_DDOWN.p}**, with **${E_DDOWN.q} t**. E₂ lies below and to the left of E on SS.`,
  sol: 'Each shift: the excess at the old price, the new equilibrium and the diagram.',
  scheme: [['Original equilibrium', 1], ['Increase: excess demand and new equilibrium', 1], ['Increase: diagram', 1], ['Decrease: new equilibrium', 1], ['Decrease: diagram', 1]],
}));

// ================================================================ t03 Changes in supply; simultaneous changes
Q('m_supply_up', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A bumper onion harvest in an imagined Nashik district raises supply at every price, while demand is unchanged. What happens to the equilibrium price and quantity of onions?',
  opts: ['Price falls and quantity rises', 'Price rises and quantity falls', 'Both rise', 'Both fall'],
  sol: 'An increase in supply shifts SS right along an unchanged DD; the new intersection is lower and further right, so price falls and quantity rises.',
}));
Q('m_supply_down', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A rise in the price of diesel raises the cost of running fishing boats in an imagined Kochi harbour, so supply of fish falls at every price. With demand unchanged,',
  opts: ['the price of fish rises and the quantity sold falls', 'the price of fish falls and the quantity sold rises', 'both the price and the quantity of fish rise', 'both the price and the quantity of fish fall'],
  sol: 'A decrease in supply shifts SS left along DD, so the price rises and the equilibrium quantity falls.',
}));
Q('m_sshift_numbers', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'New storage sheds in the imagined Kolhapur jaggery mandi raise supply from Qs = 3P − 30 to Qs = 3P − 5, while demand stays Qd = 120 − 2P. The new equilibrium is',
  opts: [`₹${E_SUP.p} and ${E_SUP.q} tonnes`, `₹${E_SDOWN.p} and ${E_SDOWN.q} tonnes`, `₹${JE.p} and ${JE.q + 25} tonnes`, `₹${E_DUP.p} and ${E_DUP.q} tonnes`],
  sol: `120 − 2P = 3P − 5 gives 5P = 125, P = ${E_SUP.p}, Q = 120 − 50 = ${E_SUP.q}: the price falls and the quantity rises.`,
}));
Q('m_both_equal', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'In an imagined Surat textile market, demand for cotton shirts and the supply of cotton shirts both increase by exactly the same amount at every price. The equilibrium price will',
  opts: ['stay the same while the quantity rises', 'rise while the quantity stays the same', 'fall while the quantity rises', 'stay the same while the quantity falls'],
  sol: 'Equal rightward shifts of DD and SS leave the excess at the old price at zero, so the price is unchanged; both shifts add to the quantity, which rises.',
}));
Q('m_both_opposite', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: 'In an imagined Darjeeling tea market, demand rises (a health trend) while supply falls (a frost). What can be said with certainty about the new equilibrium?',
  opts: ['The price rises, but the change in quantity depends on the sizes of the two shifts', 'The quantity rises, but the change in price is uncertain', 'Both price and quantity rise', 'The price falls and the quantity rises'],
  sol: 'Both shifts push the price up, so it certainly rises. The demand increase raises quantity while the supply decrease lowers it, so the net change in quantity depends on which shift is larger.',
}));
Q('ar_supply_up', ar({
  t: 3, d: 2, c: 'analysis', key: 'a',
  a: 'A good harvest of potatoes lowers their equilibrium price when demand is unchanged.',
  r: 'A good harvest increases supply, creating an excess supply at the old price.',
  sol: 'Both are true, and the excess supply at the old price created by the larger harvest is exactly why sellers cut the price, so R explains A.',
}));
Q('tf_equal_shifts', tf({
  t: 3, d: 3, c: 'application', ans: true,
  stem: `True or false? In the imagined Kolhapur jaggery mandi, if demand rises to Qd = 145 − 2P and supply rises to Qs = 3P − 5 at the same time, the price stays at ₹${JE.p} but the quantity rises to ${E_BOTH.q} tonnes.`,
  sol: `True. 145 − 2P = 3P − 5 gives P = ${E_BOTH.p}, the old price, and Q = 145 − 60 = ${E_BOTH.q} tonnes.`,
}));
Q('n_sdown_q', num({
  t: 3, d: 3, c: 'application', marks: 1, value: E_SDOWN.q, unit: 'tonnes',
  stem: 'Unseasonal rain cuts jaggery output in the imagined Kolhapur mandi, so supply falls from Qs = 3P − 30 to Qs = 3P − 55, with demand Qd = 120 − 2P. Find the new equilibrium quantity.',
  sol: `Step 1: 120 − 2P = 3P − 55, so 5P = 175 and P = ${E_SDOWN.p}.\nStep 2: Q = 120 − 2 × ${E_SDOWN.p} = ${E_SDOWN.q} tonnes.`,
}));
Q('s_supply_diag', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'With a described diagram, show the effect on the market for LED bulbs in an imagined Noida market when a cheaper technology raises supply at every price.',
  model: 'Draw DD and SS meeting at E. Cheaper technology shifts supply **right to S₁S₁**, which meets DD at **E₁**, lower and further right. So the **price falls (P to P₁)** and the **quantity rises (Q to Q₁)**.',
  sol: 'Rightward supply shift along fixed demand.',
  scheme: [['Rightward shift of SS with E₁', 1], ['Price falls, quantity rises', 1]],
}));
Q('s_opp_quantity', short({
  t: 3, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Demand for solar lanterns in an imagined Jharkhand district falls while their supply rises. Explain the certain and the uncertain effects on equilibrium.',
  model: 'Both changes push the **price down** (less demand, more supply), so the price **certainly falls**. The fall in demand lowers quantity while the rise in supply raises it, so the **change in quantity is uncertain**: it depends on which shift is larger.',
  sol: 'Same direction for price, opposite for quantity.',
  scheme: [['Price certainly falls', 1], ['Quantity uncertain, depends on sizes of shifts', 1]],
}));
Q('s3_supply_numbers', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'For the imagined Kolhapur jaggery mandi with demand Qd = 120 − 2P, compare the equilibrium when supply is Qs = 3P − 30 with the equilibrium after storage sheds raise supply to Qs = 3P − 5.',
  model: `Before: 120 − 2P = 3P − 30, so **₹${JE.p} and ${JE.q} t**.\nAfter: 120 − 2P = 3P − 5, so **₹${E_SUP.p} and ${E_SUP.q} t**.\nAn **increase in supply** with demand unchanged makes the price **fall** by ₹${JE.p - E_SUP.p} and the quantity **rise** by ${E_SUP.q - JE.q} t.`,
  sol: 'Two equilibria and the direction of change.',
  scheme: [['Old equilibrium', 1], ['New equilibrium', 1], ['Comment on price and quantity', 1]],
}));
Q('s3_four_cases', short({
  t: 3, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'State the effect on equilibrium price and quantity when demand and supply both increase in an imagined Jaipur handicraft fair, if (i) demand rises more than supply; (ii) supply rises more than demand; (iii) both rise equally.',
  model: 'In every case both curves move right, so the **quantity traded rises**; the price depends on which shift is larger.\n(i) Demand rises more: at the old price there is **excess demand**, so the **price rises** as well.\n(ii) Supply rises more: at the old price there is **excess supply**, so the **price falls**.\n(iii) Equal shifts: the extra demand and extra supply **cancel at the old price**, so the **price is unchanged**.',
  sol: 'Quantity always rises; price follows the larger shift.',
  scheme: [['(i)', 1], ['(ii)', 1], ['(iii)', 1]],
}));
Q('s3_supply_fall_case', short({
  t: 3, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'A strike by truck drivers cuts deliveries of apples to an imagined Kanpur market for a week, while buyers\' wishes do not change. Explain with a described diagram what happens to the price and quantity of apples, and why.',
  model: 'Fewer deliveries mean **less supplied at every price**: SS shifts **left** to S₁S₁. At the old price there is **excess demand**, so buyers bid the price up. The new equilibrium E₁ shows a **higher price** and a **smaller quantity** than E on the unchanged DD.',
  sol: 'Leftward supply shift, excess demand, higher price and lower quantity.',
  scheme: [['Leftward shift of supply', 1], ['Excess demand at the old price', 1], ['Higher price and lower quantity with diagram', 1]],
}));
Q('l_simultaneous', long({
  t: 3, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain with described diagrams the effect on equilibrium when (a) demand and supply of cotton yarn in an imagined Tiruppur market increase in the same proportion [2], and (b) demand increases but supply decreases [3]. Use the imagined Kolhapur jaggery figures (Qd = 145 − 2P with Qs = 3P − 5) to illustrate part (a).',
  model: `(a) Both curves shift right equally. At the old price the extra demand and the extra supply match, so the **price is unchanged** while **quantity rises**. In the jaggery figures, 145 − 2P = 3P − 5 gives **₹${E_BOTH.p}** (unchanged) and **${E_BOTH.q} t** (up from ${JE.q}).\n(b) DD shifts right and SS shifts left. Both create excess demand at the old price, so the **price certainly rises**. Quantity rises if the demand shift is larger, falls if the supply shift is larger, and is unchanged if they are equal. The diagram shows E₁ directly above, above-right or above-left of E.`,
  sol: 'Equal shifts leave price unchanged; opposite shifts fix price and leave quantity uncertain.',
  scheme: [['(a) price unchanged, quantity rises', 1], ['(a) jaggery figures', 1], ['(b) price certainly rises', 1], ['(b) quantity depends on relative shifts', 1], ['(b) diagram described', 1]],
}));

// ================================================================ t04 Price ceiling, rationing and black markets
Q('m_ceiling_meaning', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'A price ceiling is a legal maximum price that is effective only when it is set',
  opts: ['below the equilibrium price', 'above the equilibrium price', 'exactly at the equilibrium price', 'at the cost of production'],
  sol: 'A maximum price matters only if it is lower than the market price; above equilibrium it would not bind.',
}));
Q('m_ceiling_shortage', mcq({
  t: 4, d: 2, c: 'application',
  stem: `During a supply disruption, an imagined hill district caps the price of atta at ₹${CEIL} a kg, below the market-clearing ₹${AE.p}. With Qd = 200 − 4P and Qs = 6P − 100, the result is`,
  opts: [`a shortage of ${SHORT25} tonnes a week`, `a surplus of ${SHORT25} tonnes a week`, `a shortage of ${qd(AD, CEIL)} tonnes a week`, 'no change in the quantity traded'],
  sol: `At ₹${CEIL}, Qd = ${qd(AD, CEIL)} and Qs = ${qs(AS, CEIL)}, so buyers want ${SHORT25} tonnes more than is supplied. The quantity traded falls to ${qs(AS, CEIL)} tonnes, the amount sellers offer.`,
}));
Q('m_black_market', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'When a ceiling on cooking-gas cylinders in an imagined town leaves many buyers unserved, some cylinders are resold secretly at much higher prices. This illegal trade is called',
  opts: ['a black market', 'a price floor', 'buffer stocking', 'excess supply'],
  sol: 'Selling a controlled good above the legal maximum, in secret, is black marketing; it arises from the shortage created by the ceiling.',
}));
Q('m_rationing_why', mcq({
  t: 4, d: 3, c: 'understanding',
  stem: 'Why does a government that fixes a price ceiling on an essential grain usually also introduce ration cards?',
  opts: [
    'To share the limited quantity supplied fairly among the many buyers at the low price',
    'To raise the market price back to equilibrium',
    'To encourage farmers to grow more by paying them the ceiling price',
    'To remove the shortage by reducing the quantity demanded to zero',
  ],
  sol: 'A ceiling creates a shortage; rationing allocates the smaller supply by quota instead of by willingness to pay. It does not change the price or end the shortage.',
}));
Q('ar_ceiling_bm', ar({
  t: 4, d: 3, c: 'analysis', key: 'a',
  a: 'A price ceiling fixed below equilibrium can give rise to a black market.',
  r: 'At the ceiling price, quantity demanded exceeds quantity supplied, so some buyers are willing to pay more than the legal price.',
  sol: 'Both are true. The unmet demand at the controlled price means some buyers will pay above the legal limit, which is what creates black-market trade, so R explains A.',
}));
Q('fb_ceiling_word', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'A maximum price fixed by the government below the equilibrium price is called a price ___.',
  acc: [['ceiling']],
  sol: 'A legal maximum is a price ceiling; set below equilibrium it causes a shortage.',
}));
Q('n_ceiling_supply', num({
  t: 4, d: 2, c: 'understanding', marks: 1, value: qs(AS, CEIL), unit: 'tonnes',
  stem: `In the imagined hill district, atta supply is Qs = 6P − 100 (P in ₹ per kg, Q in tonnes a week). If the price is capped at ₹${CEIL} a kg, how many tonnes will sellers offer?`,
  sol: `Qs = 6 × ${CEIL} − 100 = ${qs(AS, CEIL)} tonnes.`,
}));
Q('s_ceiling_aim', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two reasons why a government may fix a maximum price on an essential good such as rice during a shortage.',
  model: '1. To keep the good **affordable for poor households**, who would otherwise be priced out.\n2. To **prevent hoarding and profiteering** by sellers who could exploit the shortage.',
  sol: 'Two distinct aims of a ceiling.',
  scheme: [['Affordability for the poor', 1], ['Curbing profiteering or hoarding', 1]],
}));
Q('s3_ceiling_diag', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain, with a described diagram, the effects of a price ceiling on kerosene set below its equilibrium price in an imagined rural block.',
  model: 'Draw DD and SS meeting at E (P*, Q*). A horizontal line at the **ceiling Pc below P*** meets SS at Qs and DD at Qd, with **Qd greater than Qs**: the gap is a **shortage**.\nOnly Qs is sold, so some buyers go without; the government may use **rationing**, and some buyers may pay above Pc in a **black market**.',
  sol: 'Diagram with the gap, then the two consequences.',
  scheme: [['Diagram: ceiling below E with Qd and Qs', 1], ['Shortage explained', 1], ['Rationing and black market', 1]],
}));
Q('s3_ceiling_numbers', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `For atta in an imagined hill district, Qd = 200 − 4P and Qs = 6P − 100. (i) Find the free-market equilibrium. (ii) Calculate the shortage if the price is capped at ₹${CEIL} a kg.`,
  model: `(i) 200 − 4P = 6P − 100 gives 10P = 300, so **P = ₹${AE.p}** and **Q = ${AE.q} t**.\n(ii) At ₹${CEIL}: Qd = 200 − 100 = **${qd(AD, CEIL)} t**, Qs = 150 − 100 = **${qs(AS, CEIL)} t**, so the **shortage is ${SHORT25} t** a week.`,
  sol: 'Solve, then substitute the ceiling into both equations.',
  scheme: [['Equilibrium price and quantity', 1], ['Quantities at the ceiling', 1], ['Shortage', 1]],
}));
Q('l_ceiling_full', long({
  t: 4, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `Answer in parts about atta in an imagined hill district (Qd = 200 − 4P, Qs = 6P − 100). (a) Calculate the shortage at a ceiling of ₹${CEIL} [2]. (b) Explain, with a described diagram, why rationing and black markets may follow [2]. (c) Suggest one way the government could reduce the shortage without removing the ceiling [1].`,
  model: `(a) Qd = ${qd(AD, CEIL)} t and Qs = ${qs(AS, CEIL)} t at ₹${CEIL}, so the **shortage is ${SHORT25} t**.\n(b) In the diagram the ceiling line lies below E, with **Qd to the right of Qs**. With demand unmet at the legal price, the government shares the ${qs(AS, CEIL)} t by **ration cards**; buyers who get none may pay above ₹${CEIL} to sellers who divert stock, a **black market**.\n(c) **Release grain from public stocks** or subsidise transport into the district, which **increases supply** at every price and narrows the gap.`,
  sol: 'Calculation, consequences with the diagram, and a supply-side remedy.',
  scheme: [['Quantities at the ceiling', 1], ['Shortage', 1], ['Rationing explained', 1], ['Black market explained', 1], ['A valid supply-raising remedy', 1]],
}));

// ================================================================ t05 Price floor (minimum support price)
Q('m_floor_meaning', mcq({
  t: 5, d: 1, c: 'recall',
  stem: 'A minimum support price for a crop works as a price floor, which is effective only when it is set',
  opts: ['above the equilibrium price', 'below the equilibrium price', 'at zero', 'equal to the retail price'],
  sol: 'A legal minimum matters only if it is above the market price; below equilibrium the market price would be paid anyway.',
}));
Q('m_floor_surplus', mcq({
  t: 5, d: 2, c: 'application',
  stem: `Lentil buyers and growers in an imagined Madhya Pradesh district have Qd = 500 − 5P and Qs = 5P − 100 (P in ₹ hundred per quintal, Q in thousand quintals). If a support price of ${FLOOR} is guaranteed, there will be`,
  opts: [`a surplus of ${SURPLUS70} thousand quintals`, `a shortage of ${SURPLUS70} thousand quintals`, `a surplus of ${qs(MS, FLOOR)} thousand quintals`, 'no surplus, because the market clears at the support price'],
  sol: `At ${FLOOR}, Qs = ${qs(MS, FLOOR)} and Qd = ${qd(MD, FLOOR)}, so ${SURPLUS70} thousand quintals are offered but not bought by the market.`,
}));
Q('m_msp_who', mcq({
  t: 5, d: 2, c: 'recall',
  stem: 'In India, minimum support prices for notified crops are announced by the Government of India on the recommendation of',
  opts: ['the Commission for Agricultural Costs and Prices (CACP)', 'the Reserve Bank of India', 'the Competition Commission of India', 'each district collector'],
  sol: 'The CACP recommends MSPs for notified crops, and the Government of India announces them.',
}));
Q('m_surplus_use', mcq({
  t: 5, d: 3, c: 'understanding',
  stem: 'When a support price leaves farmers with grain that the market will not buy, what does the government usually do with the surplus it procures?',
  opts: ['Holds it as buffer stock and distributes some through ration shops', 'Burns it to keep prices high', 'Exports all of it at a loss every year', 'Returns it to farmers after paying them'],
  sol: 'Procured grain is stored as buffer stock and used for the public distribution system and to calm prices in bad years. The other options are not the usual use.',
}));
Q('ar_floor_surplus', ar({
  t: 5, d: 3, c: 'analysis', key: 'c',
  a: 'A minimum support price fixed above the equilibrium price creates a surplus of the crop.',
  r: 'At a price above equilibrium, farmers grow less and buyers want more.',
  sol: 'A is true. R is false: above equilibrium, farmers offer **more** (supply extends) and buyers want **less** (demand contracts), which is why a surplus appears.',
}));
Q('tf_floor_burden', tf({
  t: 5, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? To keep a support price effective, the government must stand ready to buy the surplus that the market does not take at that price.',
  sol: 'True. Without procurement, unsold stock would push the market price below the support level; buying the surplus keeps the floor in force.',
}));
Q('n_floor_qs', num({
  t: 5, d: 2, c: 'understanding', marks: 1, value: qd(MD, FLOOR), unit: 'thousand quintals',
  stem: `In the imagined lentil market, demand is Qd = 500 − 5P (P in ₹ hundred per quintal). How much will private buyers purchase at the support price of ${FLOOR}?`,
  sol: `Qd = 500 − 5 × ${FLOOR} = ${qd(MD, FLOOR)} thousand quintals.`,
}));
Q('s_msp_aims', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two aims of announcing minimum support prices for crops such as wheat and paddy.',
  model: '1. To **protect farmers\' incomes** from a sharp fall in prices after a good harvest.\n2. To **encourage production** of crops the country needs and to build **buffer stocks** for food security.',
  sol: 'Two aims of MSP.',
  scheme: [['Protecting farm incomes', 1], ['Encouraging output / buffer stocks', 1]],
}));
Q('s3_floor_diag', short({
  t: 5, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain, with a described diagram, the effect of a support price fixed above the equilibrium price of maize in an imagined Bihar district.',
  model: 'Draw DD and SS meeting at E (P*, Q*). A horizontal line at the **floor Pf above P*** meets DD at Qd and SS at Qs, with **Qs greater than Qd**: the gap is a **surplus**.\nFarmers grow more and buyers buy less; to keep the floor, the government **procures the surplus** and stores it as **buffer stock**.',
  sol: 'Diagram with the surplus, then procurement.',
  scheme: [['Diagram with floor above E', 1], ['Surplus explained', 1], ['Government procurement and buffer stock', 1]],
}));
Q('s3_floor_cost', short({
  t: 5, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: `In the imagined lentil market (Qd = 500 − 5P, Qs = 5P − 100), the support price is ${FLOOR}. Find the surplus and give one benefit and one cost of this policy.`,
  model: `At ${FLOOR}: Qs = **${qs(MS, FLOOR)}**, Qd = **${qd(MD, FLOOR)}**, so the **surplus is ${SURPLUS70} thousand quintals**, which the government must buy.\n**Benefit:** farmers get an assured, higher income.\n**Cost:** public money is spent on buying and **storing** the surplus, and consumers pay more than the free-market price of ${ME.p}.`,
  sol: 'Surplus calculation, then one benefit and one cost.',
  scheme: [['Surplus', 1], ['Benefit', 1], ['Cost', 1]],
}));
Q('l_floor_full', long({
  t: 5, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `For lentils in an imagined Madhya Pradesh district (Qd = 500 − 5P, Qs = 5P − 100; P in ₹ hundred per quintal, Q in thousand quintals): (a) find the free-market equilibrium [1]; (b) find the surplus at a support price of ${FLOOR} and explain it with a described diagram [3]; (c) evaluate whether such a support price helps the economy [1].`,
  model: `(a) 500 − 5P = 5P − 100 gives **P = ${ME.p}**, **Q = ${ME.q}** thousand quintals.\n(b) At ${FLOOR}: Qs = ${qs(MS, FLOOR)}, Qd = ${qd(MD, FLOOR)}, **surplus ${SURPLUS70}**. In the diagram the floor line lies above E; supply extends to Qs and demand contracts to Qd, and the gap is bought by the government as **buffer stock**.\n(c) It **protects farmers** and builds food reserves, but it **costs public money** for procurement and storage and can encourage over-production of one crop; it helps most when used with care.`,
  sol: 'Equilibrium, surplus with diagram, balanced evaluation.',
  scheme: [['Equilibrium', 1], ['Quantities at the floor', 1], ['Surplus', 1], ['Diagram and procurement', 1], ['Balanced evaluation', 1]],
}));
Q('l_ceiling_floor', long({
  t: [4, 5], d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Compare a price ceiling and a price floor under these heads, with an imagined Indian example of each: (a) position relative to equilibrium; (b) market result; (c) government action needed to support it; (d) who gains; (e) one problem it may cause.',
  model: '(a) **Position:** a **ceiling** is a legal maximum set **below** the equilibrium price; a **floor** is a legal minimum set **above** it. On the wrong side of equilibrium either control has no effect.\n(b) **Result:** a ceiling makes quantity demanded exceed quantity supplied, a **shortage**; a floor makes quantity supplied exceed quantity demanded, a **surplus**.\n(c) **Support needed:** a ceiling needs **rationing** of the limited supply; a floor needs government **procurement** of the unsold surplus.\n(d) **Who gains:** a ceiling helps **consumers**, for example poor households buying kerosene in an imagined district; a floor helps **producers**, for example wheat farmers receiving a support price.\n(e) **Problem:** a ceiling can lead to **black markets**; a floor can lead to **storage costs and wastage** of procured grain.',
  sol: 'Five contrasts with examples.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1], ['(d) with examples', 1], ['(e)', 1]],
}));

// ================================================================ ISC paper-style 4-mark and 8-mark items (bank only)
Q('q4_saffron', short({
  t: [3, 2], d: 3, c: 'application', marks: 4, wl: S4,
  stem: 'Answer both parts about saffron in an imagined Pampore market. [2 + 2]\n\n(i) Early snowfall damages the crop, while a wedding season raises demand. With a described diagram, explain the certain effect on the price of saffron.\n(ii) A trader says the quantity of saffron sold "must fall". Is the trader right? Justify.',
  model: '(i) Supply shifts **left** and demand shifts **right**. Both create **excess demand** at the old price, so the **price certainly rises**; in the diagram E₁ lies above E.\n(ii) **Not necessarily.** The fall in supply reduces quantity but the rise in demand increases it, so quantity **falls only if the supply shift is larger**; it could rise or stay the same.',
  sol: 'Certain price rise; uncertain quantity.',
  scheme: [['(i) both shifts identified', 1], ['(i) price certainly rises with diagram', 1], ['(ii) trader not necessarily right', 1], ['(ii) depends on relative shifts', 1]],
}));
Q('q4_lpg_cap', short({
  t: [4, 1], d: 3, c: 'analysis', marks: 4, wl: S4,
  stem: 'Answer both parts. [2 + 2]\n\n(i) An imagined state caps the price of refill cylinders for a small cooking stove below the market-clearing level. Explain the immediate effect on the market with a described diagram.\n(ii) A year later the cap is removed. Explain how the market moves back to equilibrium.',
  model: '(i) At the cap, **quantity demanded exceeds quantity supplied**: a **shortage**, shown as the gap between DD and SS along the cap line below E. Queues, rationing or black-market sales follow.\n(ii) Without the cap, unsatisfied buyers **bid the price up**; demand **contracts** and supply **extends** until the price reaches the **equilibrium**, where the shortage disappears.',
  sol: 'Shortage under the cap; upward adjustment after removal.',
  scheme: [['(i) shortage identified', 1], ['(i) diagram described', 1], ['(ii) price rises', 1], ['(ii) movements along both curves to E', 1]],
}));
Q('l8_jaggery_story', long({
  t: [1, 2, 3], d: 4, c: 'analysis', marks: 8, wl: L8,
  stem: 'Answer both parts about the imagined Kolhapur jaggery mandi, where Qd = 120 − 2P and Qs = 3P − 30 (P in ₹ per kg, Q in tonnes a week). [4 + 4]\n\n(i) Find the equilibrium and explain, with figures, the excess demand at ₹20 and the excess supply at ₹40.\n(ii) Demand later rises to Qd = 145 − 2P while new storage raises supply to Qs = 3P − 5. Find the new equilibrium and explain why the price does not change.',
  model: `(i) Setting demand equal to supply, 120 − 2P = 3P − 30, so 5P = 150. The equilibrium is **₹${JE.p} a kg** and **${JE.q} tonnes** a week, where the two curves cross at E.\nAt ₹20, buyers want ${qd(JD, 20)} t but sellers offer only ${qs(JS, 20)} t: an **excess demand of ${ED20} t**. Buyers who cannot get jaggery offer more, so the price **rises**; demand contracts and supply extends.\nAt ₹40, sellers offer ${qs(JS, 40)} t but buyers want only ${qd(JD, 40)} t: an **excess supply of ${ES40} t**. Sellers with unsold stock cut the price, so it **falls**; demand extends and supply contracts. In both cases the market returns to E without any curve shifting.\n(ii) The new pair 145 − 2P = 3P − 5 gives 5P = 150, so the price is **₹${E_BOTH.p}** and the quantity **${E_BOTH.q} t**. Each curve moved right by **25 tonnes at every price**. At the old price of ₹${JE.p}, buyers now want 25 t more and sellers offer 25 t more, so no excess demand or excess supply arises. With no pressure on the price, it **stays at ₹${E_BOTH.p}**, while the quantity traded **rises by ${E_BOTH.q - JE.q} t**.`,
  sol: 'Equilibrium and disequilibria, then equal shifts.',
  scheme: [['Equilibrium', 1], ['Excess demand at ₹20', 1], ['Excess supply at ₹40', 1], ['Adjustment explained', 1], ['New equilibrium price', 1], ['New equilibrium quantity', 1], ['Equal shifts at the old price', 1], ['Conclusion: price unchanged, quantity up', 1]],
}));
Q('l8_controls', long({
  t: [4, 5], d: 4, c: 'evaluation', marks: 8, wl: L8,
  stem: `Answer both parts. [4 + 4]\n\n(i) For atta in an imagined hill district (Qd = 200 − 4P, Qs = 6P − 100), calculate the shortage at a ceiling of ₹${CEIL} and explain two consequences of the ceiling.\n(ii) For lentils in an imagined district (Qd = 500 − 5P, Qs = 5P − 100), calculate the surplus at a support price of ${FLOOR} and evaluate the support price as a policy.`,
  model: `(i) At the ceiling of ₹${CEIL}, quantity demanded is 200 − 100 = **${qd(AD, CEIL)} t** and quantity supplied is 150 − 100 = **${qs(AS, CEIL)} t**, so there is a **shortage of ${SHORT25} t** a week (the free market would clear at ₹${AE.p} and ${AE.q} t).\n**Consequence 1 — rationing:** because buyers want twice what is available, the administration shares the ${qs(AS, CEIL)} t through **ration cards and fair-price shops**, so each family gets a fixed quota.\n**Consequence 2 — black market:** families left without atta are willing to pay more, so some sellers divert stock and sell it secretly **above ₹${CEIL}**.\n(ii) At the support price of ${FLOOR}, quantity supplied is **${qs(MS, FLOOR)}** and quantity demanded is **${qd(MD, FLOOR)}**, so there is a **surplus of ${SURPLUS70}** thousand quintals, which public agencies must buy and hold as **buffer stock**.\n**Evaluation:** the policy **protects farm incomes** from price crashes and builds **food reserves** for lean years and ration shops. But it **costs public money** for procurement and storage, risks **wastage**, and makes consumers pay more than the free-market price of ${ME.p}. On balance it is useful when it is targeted at needy farmers and the stocks are well managed.`,
  sol: 'Shortage and two consequences; surplus and a balanced evaluation.',
  scheme: [['Quantities at the ceiling', 1], ['Shortage', 1], ['Rationing', 1], ['Black market', 1], ['Quantities at the floor', 1], ['Surplus and procurement', 1], ['Benefit', 1], ['Cost and judgement', 1]],
}));

// ================================================================ case-based
Q('cb_onion_week', caseQ({
  t: [1, 3], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined market report from a Lasalgaon-like onion yard and answer the questions that follow. *(Imagined yard, traders and figures, written by SOYL for practice.)*',
  passage: '**Weekly onion report, Godavari Valley yard (imagined)**\n\nMonday: Arrivals were normal and the price settled at ₹22 a kg, with all stocks sold. Wednesday: Heavy rain upstream stopped trucks from three villages; arrivals fell sharply and the price climbed. Friday: Rain stopped and a bumper harvest from new fields arrived. Traders found unsold heaps at the earlier high price and began cutting rates. Buyers from city markets, whose demand did not change through the week, bought more as rates fell.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'understanding', marks: 1, stem: 'What evidence shows the market was in equilibrium on Monday?', model: 'The price **settled at ₹22** and **all stocks were sold**, so quantity demanded equalled quantity supplied.', sol: 'Settled price with no unsold stock.', scheme: [['Settled price and cleared stock', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Which curve shifted on Wednesday, and in which direction?', model: 'The **supply curve shifted left**: fewer onions reached the yard at every price.', sol: 'Reduced arrivals mean a decrease in supply.', scheme: [['Supply shifted left', 1]] })),
    child('c', short({ t: [1, 3], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain the Friday events using excess supply and the movement towards a new equilibrium.', model: 'The bumper harvest **shifted supply right**, so at the high Wednesday price there was **excess supply** (unsold heaps). Traders **cut rates**; buyers moved down their unchanged demand curve and bought more, until a new, lower equilibrium price was reached.', sol: 'Supply increase, excess supply, falling price, extension of demand.', scheme: [['Excess supply after the supply increase', 1], ['Price falls to a new equilibrium; demand extends', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Compare the Wednesday and Friday changes in the yard and their effects on the price and quantity of onions.', model: 'Wednesday: a **decrease in supply** raised the **price** and lowered the **quantity** traded. Friday: an **increase in supply** lowered the **price** and raised the **quantity**. In both cases demand was unchanged, so only supply moved.', sol: 'Opposite supply shifts with opposite price effects.', scheme: [['Wednesday: higher price, lower quantity', 1], ['Friday: lower price, higher quantity', 1]] }),
    ]),
  ],
}));
Q('cb_ration_scheme', caseQ({
  t: [4, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the imagined extract from a district food officer\'s notes in a hill district and answer the questions that follow. *(Written by SOYL for practice; the district and figures are imagined.)*',
  passage: `**Notes of the district food officer (imagined), monsoon season**\n\nRoad blockages cut the supply of atta. In the open market, demand is Qd = 200 − 4P and supply Qs = 6P − 100 (P in ₹ per kg, Q in tonnes a week). The state has capped the price at ₹${CEIL} a kg. Long queues have formed at shops, and there are reports of atta being sold at ₹40 a kg in back lanes. Meanwhile, wheat procured at the support price from the plains is lying in central godowns.`,
  parts: [
    child('a', num({ t: 4, d: 2, c: 'application', marks: 1, value: SHORT25, unit: 'tonnes', stem: `What is the weekly shortage at the capped price of ₹${CEIL}?`, sol: `Qd = 200 − 100 = ${qd(AD, CEIL)}; Qs = 150 − 100 = ${qs(AS, CEIL)}; shortage = ${qd(AD, CEIL)} − ${qs(AS, CEIL)} = ${SHORT25} tonnes.` })),
    child('b', short({ t: 4, d: 2, c: 'understanding', marks: 1, stem: 'Name the problem described by "sold at ₹40 a kg in back lanes".', model: 'A **black market**: the controlled good is sold illegally above the ceiling price.', sol: 'Illegal sale above the cap.', scheme: [['Black market', 1]] })),
    child('c', short({ t: [4, 5], d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): Suggest how the stock in the godowns could reduce the shortage, and explain its effect on the market.', model: 'Releasing the procured wheat (as atta) through **ration shops** adds to supply in the district, **shifting supply right**; the gap between demand and supply at ₹25 narrows, so queues and black-market sales fall.', sol: 'Use buffer stock to raise supply.', scheme: [['Release of buffer stock through ration shops', 1], ['Supply rises, shortage narrows', 1]] }), [
      short({ t: 5, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Why does the government have wheat in its godowns at all? Link your answer to the support price.', model: 'Wheat bought at a **support price above equilibrium** created a **surplus** in the plains; the government **procured** it and holds it as **buffer stock**, which can now be used in shortages.', sol: 'Floor creates surplus, procured as buffer stock.', scheme: [['Support price above equilibrium creates surplus', 1], ['Procurement into buffer stock', 1]] }),
    ]),
  ],
}));
