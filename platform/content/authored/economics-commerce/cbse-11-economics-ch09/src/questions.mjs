// CBSE 11 Economics, ch09 Theory of Consumer Behaviour: question bank. Every student, stall, shop, village and buyer is imagined
// and written for this chapter; no real statistics are used. Every schedule value (marginal utility, equilibrium quantity,
// budget-line intercept and slope, marginal rate of substitution, tangency bundle, market demand, shift, elasticity) is computed
// from the imagined data with stats.mjs or plain code and pinned with check() wherever it is written in prose.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from '../../cbse-11-economics-ch01/src/lib.mjs';
import { sum, rnd, check, marginal, elasticity, expenditureVerdict } from '../../cbse-11-economics-ch01/src/stats.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
export const J = (a) => a.join(', ');
export const inr = (x) => `Rs ${x.toLocaleString('en-IN')}`;
const same = (arr, text, what) => check(J(arr) === text ? 1 : 0, 1, 0, what);
export const pc = (a, b) => rnd(((b - a) / a) * 100, 6);

// ---------------------------------------------------------------- t01: utility (imagined student Meera and her samosas)
export const NQ = [0, 1, 2, 3, 4, 5, 6];
export const TU = [0, 40, 70, 90, 100, 100, 90]; // total utility (utils) from 0 to 6 samosas
export const MU = marginal(TU);
same(MU, '40, 30, 20, 10, 0, -10', 'samosa marginal utility');
check(Math.max(...TU), 100, 0, 'maximum total utility');
check(MU.every((m, i) => i === 0 || m < MU[i - 1]) ? 1 : 0, 1, 0, 'marginal utility falls at every step');
export const PS = 4; // price of a samosa (Rs)
export const MUM = 5; // utils per rupee (marginal utility of money, taken as constant)
export const ratioS = MU.map((m) => m / PS);
same(ratioS, '10, 7.5, 5, 2.5, 0, -2.5', 'samosa MU per rupee spent at Rs 4');
export const eqQ = MU.findIndex((m) => m / PS === MUM) + 1;
check(eqQ, 3, 0, 'samosa equilibrium quantity at Rs 4');
export const PS2 = 2;
export const eqQ2 = MU.findIndex((m) => m / PS2 === MUM) + 1;
check(eqQ2, 4, 0, 'samosa equilibrium quantity at Rs 2');
export const worth = MU.map((m) => m / MUM); // rupee value of each unit
same(worth, '8, 6, 4, 2, 0, -2', 'rupee worth of each samosa');
check(MU[eqQ - 1], PS * MUM, 0, 'MU at equilibrium equals price times MU of a rupee');
export const NSAM = `for 0, 1, 2, 3, 4, 5 and 6 samosas her total utility is ${J(TU)} utils`;

// two commodities: samosas (Rs 4) and juice (Rs 6), income Rs 24
export const PX = 4, PY = 6, INC = 24;
export const MX = [24, 20, 16, 12, 8, 4]; // marginal utility of the 1st to 6th samosa
export const MY = [30, 24, 18, 12, 6, 0]; // marginal utility of the 1st to 6th glass of juice
export const rX = MX.map((m) => m / PX);
export const rY = MY.map((m) => m / PY);
same(rX, '6, 5, 4, 3, 2, 1', 'samosa MU per rupee');
same(rY, '5, 4, 3, 2, 1, 0', 'juice MU per rupee');
export const utilOf = (x, y) => sum(MX.slice(0, x)) + sum(MY.slice(0, y));
export const best = (() => {
  let b = null;
  for (let x = 0; x <= 6; x++) for (let y = 0; y <= 6; y++) if (PX * x + PY * y <= INC && (!b || utilOf(x, y) > b.u)) b = { x, y, u: utilOf(x, y) };
  return b;
})();
check(best.x, 3, 0, 'best samosas');
check(best.y, 2, 0, 'best juice');
export const eqRatio = rX[best.x - 1];
check(eqRatio, 4, 0, 'equal MU per rupee at equilibrium');
check(rY[best.y - 1], 4, 0, 'juice MU per rupee at equilibrium');
check(PX * best.x + PY * best.y, 24, 0, 'equilibrium bundle exhausts the income');
export const uBest = utilOf(best.x, best.y);
check(uBest, 114, 0, 'total utility at the equilibrium bundle');
export const BAD1 = [4, 1]; // too many samosas
export const BAD2 = [1, 3]; // too many glasses of juice... too few samosas
check(PX * BAD1[0] + PY * BAD1[1], 22, 0, 'cost of 4 samosas and 1 juice');
check(rX[BAD1[0] - 1], 3, 0, 'samosa ratio at 4 samosas');
check(rY[BAD1[1] - 1], 5, 0, 'juice ratio at 1 glass');
export const uBad1 = utilOf(...BAD1);
check(uBad1, 102, 0, 'utility at 4 samosas and 1 juice');
check(uBest - uBad1, 12, 0, 'gain from moving to equilibrium');
check(rX[BAD2[0] - 1], 6, 0, 'samosa ratio at 1 samosa');
check(rY[BAD2[1] - 1], 3, 0, 'juice ratio at 3 glasses');
export const bundleText = (x, y) => `${x} samosas and ${y} glass${y === 1 ? '' : 'es'} of juice`;
export const mxText = `${J(MX)} utils for the 1st to the 6th samosa`;
export const myText = `${J(MY)} utils for the 1st to the 6th glass of juice`;

// ---------------------------------------------------------------- t02: budget line and indifference curves
export const bl = (M, P1, P2) => ({ M, P1, P2, a: M / P1, b: M / P2, slope: P1 / P2 });
export const M0 = 120, P1_0 = 20, P2_0 = 10;
export const B0 = bl(M0, P1_0, P2_0);
check(B0.a, 6, 0, 'mango intercept');
check(B0.b, 12, 0, 'guava intercept');
check(B0.slope, 2, 0, 'budget slope');
export const B_inc = bl(160, P1_0, P2_0);
check(B_inc.a, 8, 0, 'income rise: mango intercept');
check(B_inc.b, 16, 0, 'income rise: guava intercept');
export const B_dec = bl(80, P1_0, P2_0);
check(B_dec.a, 4, 0, 'income fall: mango intercept');
check(B_dec.b, 8, 0, 'income fall: guava intercept');
export const B_p1 = bl(M0, 30, P2_0);
check(B_p1.a, 4, 0, 'mango price rise: intercept');
check(B_p1.b, 12, 0, 'mango price rise: guava intercept unchanged');
check(B_p1.slope, 3, 0, 'mango price rise: slope');
export const B_p2 = bl(M0, P1_0, 20);
check(B_p2.a, 6, 0, 'guava price rise: mango intercept unchanged');
check(B_p2.b, 6, 0, 'guava price rise: guava intercept');
check(B_p2.slope, 1, 0, 'guava price rise: slope');
export const B_p1d = bl(M0, 15, P2_0);
check(B_p1d.a, 8, 0, 'mango price fall: intercept');
check(B_p1d.slope, 1.5, 6, 'mango price fall: slope');
export const nBundles = (() => { let n = 0; for (let x = 0; x <= B0.a; x++) for (let y = 0; y <= B0.b; y++) if (P1_0 * x + P2_0 * y <= M0) n++; return n; })();
check(nBundles, 49, 0, 'whole-kilogram bundles in the budget set');
export const onLine = (B, x, y) => B.P1 * x + B.P2 * y === B.M;
check(onLine(B0, 2, 8) ? 1 : 0, 1, 0, 'bundle (2, 8) on the budget line');
check(onLine(B0, 4, 4) ? 1 : 0, 1, 0, 'bundle (4, 4) on the budget line');
check(P1_0 * 2 + P2_0 * 4, 80, 0, 'cost of (2, 4)');
export const icF = (k) => (x) => k / x; // indifference curve x times y equals k
export const U = (x, y) => x * y;
// Meera's equilibrium when her satisfaction is the product of the two quantities
export const eqX = M0 / (2 * P1_0);
export const eqY = M0 / (2 * P2_0);
check(eqX, 3, 0, 'tangency mango kg');
check(eqY, 6, 0, 'tangency guava kg');
check(U(eqX, eqY), 18, 0, 'highest attainable satisfaction level');
export const mrsAt = (x, y) => y / x;
check(mrsAt(eqX, eqY), B0.slope, 6, 'MRS equals the price ratio at the tangency');
check(18 / (eqX * eqX), B0.slope, 6, 'indifference slope at the tangency equals the budget slope');
export const scan = (() => { let b = { u: 0 }; for (let i = 0; i <= 600; i++) { const x = (B0.a * i) / 600; const y = (M0 - P1_0 * x) / P2_0; if (x * y > b.u) b = { u: x * y, x, y }; } return b; })();
check(scan.u, 18, 3, 'scan along the budget line finds the same maximum');
check(U(2, 8), 16, 0, 'satisfaction at (2, 8)');
check(U(4, 4), 16, 0, 'satisfaction at (4, 4)');
check(U(2, 4), 8, 0, 'satisfaction at (2, 4)');
check(M0 - (P1_0 * 2 + P2_0 * 4), 40, 0, 'money left unspent at (2, 4)');
check(mrsAt(2, 8), 4, 0, 'MRS at (2, 8)');
export const K = [8, 18, 32];
// the highest curve cannot be reached: no point of the budget line has product 32
check(Math.max(...Array.from({ length: 601 }, (_, i) => { const x = (B0.a * i) / 600; return x * ((M0 - P1_0 * x) / P2_0); })) < 32 ? 1 : 0, 1, 0, 'k = 32 is out of reach');

// an indifference schedule x times y = 12
export const IX = [1, 2, 3, 4, 6];
export const IY = IX.map((x) => 12 / x);
same(IY, '12, 6, 4, 3, 2', 'indifference schedule');
export const IDX = marginal(IX);
export const IGIVE = marginal(IY).map((d) => -d);
export const MRS = IGIVE.map((g, i) => g / IDX[i]);
same(MRS, '6, 2, 1, 0.5', 'MRS falls along the curve');
export const mrsBD = (IY[1] - IY[3]) / (IX[3] - IX[1]);
check(mrsBD, 1.5, 6, 'MRS between B and D');
const LET = 'ABCDE';
export const sInd = IX.map((x, i) => `${LET[i]}: ${x} kg of pencils and ${IY[i]} kg of erasers`).join('; ');
const sIndNo = IX.map((x, i) => `${LET[i]}: (${x}, ${IY[i]})`).join('; ');
export { sIndNo };
// Rohan: notebooks (good 1, Rs 25) and pens (good 2, Rs 10), income Rs 200, satisfaction the product of the two quantities
export const BR = bl(200, 25, 10);
check(BR.a, 8, 0, 'Rohan notebook intercept');
check(BR.b, 20, 0, 'Rohan pen intercept');
check(BR.slope, 2.5, 6, 'Rohan slope');
export const rohanX = BR.M / (2 * BR.P1);
export const rohanY = (BR.slope * rohanX);
check(rohanX, 4, 0, 'Rohan notebooks');
check(rohanY, 10, 0, 'Rohan pens');
check(BR.P1 * rohanX + BR.P2 * rohanY, 200, 0, 'Rohan spends the whole income');
check(U(rohanX, rohanY), 40, 0, 'Rohan satisfaction');
// Neha: income Rs 180, notebooks Rs 15, pens Rs 12
export const BN = bl(180, 15, 12);
check(BN.a, 12, 0, 'Neha notebook intercept');
check(BN.b, 15, 0, 'Neha pen intercept');
check(BN.slope, 1.25, 6, 'Neha slope');
export const BN2 = bl(180, 15, 18);
check(BN2.b, 10, 0, 'Neha after pen price rise: pen intercept');
check(BN2.a, 12, 0, 'Neha after pen price rise: notebook intercept');

// ---------------------------------------------------------------- t03: demand (imagined tea stall, three buyers)
export const PR = [10, 8, 6, 4, 2];
export const DA = [2, 3, 4, 5, 6]; // Anil
export const DB = [0, 2, 4, 6, 8]; // Bela
export const DC = [1, 2, 3, 4, 5]; // Charu
export const DM = PR.map((_, i) => DA[i] + DB[i] + DC[i]);
same(DM, '3, 7, 11, 15, 19', 'market demand');
check(DM.every((q, i) => i === 0 || q > DM[i - 1]) ? 1 : 0, 1, 0, 'quantity rises as price falls');
export const SA = 1, SB = 2, SC = 1; // extra cups each buyer takes at every price after incomes rise
export const SH = SA + SB + SC;
check(SH, 4, 0, 'market shift in cups');
export const DM1 = DM.map((q) => q + SH);
same(DM1, '7, 11, 15, 19, 23', 'demand after incomes rise');
export const SUBS = 3; // cups added at every price when coffee becomes dearer
export const DMS = DM.map((q) => q + SUBS);
same(DMS, '6, 10, 14, 18, 22', 'demand after a substitute becomes dearer');
export const COMP = -3; // cups lost at every price when sugar becomes dearer
export const DMC = DM.map((q) => q + COMP);
same(DMC, '0, 4, 8, 12, 16', 'demand after a complement becomes dearer');
check(DM[2], 11, 0, 'market demand at Rs 6');
check(DM[1], 7, 0, 'market demand at Rs 8');
check(DM1[2], 15, 0, 'market demand at Rs 6 after incomes rise');
check(DM[3], 15, 0, 'market demand at Rs 4');
check(DM[2] - DM[1], 4, 0, 'movement from Rs 8 to Rs 6');
check(DM1[2] - DM[2], 4, 0, 'shift at Rs 6');
export const sellers = (arr) => PR.map((p, i) => `Rs ${p}: ${arr[i]}`).join('; ');
export const tDem = (arr) => `At the prices of Rs ${J(PR)} per cup the quantities are ${J(arr)} cups`;
export const bunch = `Anil ${J(DA)}, Bela ${J(DB)} and Charu ${J(DC)} cups at the prices of Rs ${J(PR)} per cup`;

// ---------------------------------------------------------------- t04: price elasticity of demand
export const edCase = (p0, q0, p1, q1) => ({ p0, q0, p1, q1, dp: pc(p0, p1), dq: pc(q0, q1), ed: rnd(elasticity(p0, q0, p1, q1), 6), e0: p0 * q0, e1: p1 * q1, v: expenditureVerdict(p0, q0, p1, q1) });
export const EA = edCase(50, 100, 60, 70); // apples
check(EA.dp, 20, 0, 'apples price change per cent');
check(EA.dq, -30, 0, 'apples quantity change per cent');
check(EA.ed, 1.5, 6, 'apples elasticity');
check(EA.e0, 5000, 0, 'apples expenditure before');
check(EA.e1, 4200, 0, 'apples expenditure after');
check(EA.v === 'greater than one' ? 1 : 0, 1, 0, 'apples verdict');
export const ES = edCase(20, 200, 24, 190); // salt
check(ES.dp, 20, 0, 'salt price change per cent');
check(ES.dq, -5, 0, 'salt quantity change per cent');
check(ES.ed, 0.25, 6, 'salt elasticity');
check(ES.e0, 4000, 0, 'salt expenditure before');
check(ES.e1, 4560, 0, 'salt expenditure after');
check(ES.v === 'less than one' ? 1 : 0, 1, 0, 'salt verdict');
export const ET = edCase(10, 50, 8, 70); // tea
check(ET.dp, -20, 0, 'tea price change per cent');
check(ET.dq, 40, 0, 'tea quantity change per cent');
check(ET.ed, 2, 6, 'tea elasticity');
check(ET.e0, 500, 0, 'tea expenditure before');
check(ET.e1, 560, 0, 'tea expenditure after');
check(ET.v === 'greater than one' ? 1 : 0, 1, 0, 'tea verdict');
export const EF = edCase(50, 100, 40, 110); // fish
check(EF.dp, -20, 0, 'fish price change per cent');
check(EF.dq, 10, 0, 'fish quantity change per cent');
check(EF.ed, 0.5, 6, 'fish elasticity');
check(EF.e0, 5000, 0, 'fish expenditure before');
check(EF.e1, 4400, 0, 'fish expenditure after');
check(EF.v === 'less than one' ? 1 : 0, 1, 0, 'fish verdict');
export const EN = edCase(40, 50, 36, 55); // notebooks: the two percentages are equal
check(EN.dp, -10, 0, 'notebook price change per cent');
check(EN.dq, 10, 0, 'notebook quantity change per cent');
check(EN.ed, 1, 6, 'notebook elasticity');
export const EP = edCase(20, 100, 25, 80); // bus pass: expenditure unchanged
check(EP.e0, 2000, 0, 'pass expenditure before');
check(EP.e1, 2000, 0, 'pass expenditure after');
check(EP.v === 'equal to one' ? 1 : 0, 1, 0, 'pass verdict');
export const ED2 = 2, DPQ = -5, Q0Q = 400;
export const dqQ = ED2 * Math.abs(DPQ); // per cent rise in quantity
export const q1Q = Q0Q * (1 + dqQ / 100);
check(dqQ, 10, 0, 'per cent rise in quantity');
check(q1Q, 440, 0, 'new quantity');
export const CASES = [
  ['Perfectly elastic', 'infinity', 'horizontal line'],
  ['Greater than one', 'more than 1', 'flat'],
  ['Unitary', '1', 'rectangular hyperbola'],
  ['Less than one', 'between 0 and 1', 'steep'],
  ['Perfectly inelastic', '0', 'vertical line'],
];

// ---------------------------------------------------------------- multiple-choice (opts[0] is correct)
Q('m_utility_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'When Meera, an imagined student, enjoys a samosa in her college canteen, the satisfaction she gets from it is called',
  opts: ['utility', 'income', 'demand', 'opportunity cost'],
  sol: 'Utility is the satisfaction a consumer derives from consuming a good or service. Income is what she earns, demand is the quantity she is willing and able to buy, and opportunity cost is the value of the next best alternative given up.',
}));
Q('m_mu_def', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Meera's total utility rises from ${TU[2]} utils to ${TU[3]} utils when she eats her third samosa. The ${MU[2]} utils gained are the`,
  opts: ['marginal utility of the third samosa', 'total utility of the third samosa', `average utility of three samosas (${TU[3] / 3} utils)`, 'utility of the first samosa'],
  sol: `Marginal utility is the change in total utility from one more unit, ${TU[3]} − ${TU[2]} = ${MU[2]} utils. Total utility is the whole ${TU[3]}, and the average over three samosas is ${TU[3] / 3} utils.`,
}));
Q('m_dmu', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'At one sitting Meera finds that each further samosa gives her less extra satisfaction than the one before. This tendency is described by the law of',
  opts: ['diminishing marginal utility', 'demand', 'equi-marginal utility', 'increasing opportunity cost'],
  sol: 'The law of diminishing marginal utility says that, other things unchanged, the marginal utility of a good falls as more of it is consumed. The law of demand links price and quantity, the equi-marginal law is about spending across two goods, and increasing opportunity cost belongs to the production possibility frontier.',
}));
Q('m_mu_zero', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Meera's total utility ${NSAM}. The marginal utility of her fifth samosa is`,
  opts: [`zero, because total utility stops rising at ${TU[5]} utils`, `${TU[5]} utils, the same as total utility`, `${MU[3]} utils, as for the fourth samosa`, `negative, because total utility has fallen`],
  sol: `MU of the fifth samosa = ${TU[5]} − ${TU[4]} = ${MU[4]}. Total utility is at its maximum of ${TU[5]} utils, so the fifth samosa adds nothing. It becomes negative only for the sixth samosa (${TU[6]} − ${TU[5]} = ${MU[5]}).`,
}));
Q('m_neg_mu', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Meera's friends press a sixth samosa on her and her total utility falls from ${TU[5]} to ${TU[6]} utils. The marginal utility of the sixth samosa is`,
  opts: [`negative (${MU[5]} utils): the extra samosa reduces her satisfaction`, `positive but smaller than for the fifth`, `zero, because she has stopped eating`, `${TU[6]} utils, equal to the new total utility`],
  sol: `Marginal utility = ${TU[6]} − ${TU[5]} = ${MU[5]} utils. A fall in total utility means that the extra unit gave dissatisfaction, so the marginal utility is negative.`,
}));
Q('m_eq_one', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Meera buys only samosas, at Rs ${PS} each, and treats the marginal utility of a rupee as constant. She is in equilibrium when`,
  opts: ['the marginal utility of the last samosa, divided by its price, equals the marginal utility of a rupee', 'her total utility is zero', 'the marginal utility of the samosa is at its highest', 'the price of a samosa is zero'],
  sol: 'A single-good buyer is in equilibrium where MUx/Px equals the marginal utility of money, so that the last rupee spent on the good brings the same satisfaction as a rupee kept. Total utility need not be zero, marginal utility is highest for the first unit, and a zero price would make her buy until marginal utility is zero.',
}));
Q('m_eq_two', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Meera has Rs ${INC} for samosas (Rs ${PX} each) and juice (Rs ${PY} a glass). Marginal utilities are ${mxText}, and ${myText}. At ${bundleText(...BAD1)} she should`,
  opts: [`buy fewer samosas and more juice, because MUy/Py is ${rY[0]} but MUx/Px is only ${rX[3]}`, `buy more samosas and less juice, because MUx/Px is higher`, `stay where she is, because she has spent most of her money`, `buy only juice from now on`],
  sol: `At this bundle MUx/Px = ${MX[3]} ÷ ${PX} = ${rX[3]} and MUy/Py = ${MY[0]} ÷ ${PY} = ${rY[0]}. A rupee spent on juice gives more satisfaction than a rupee spent on samosas, so she should shift spending toward juice until the ratios are equal, which happens at ${bundleText(best.x, best.y)}.`,
}));
Q('m_budget_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: `Meera has Rs ${M0} for mangoes at Rs ${P1_0} a kilogram and guavas at Rs ${P2_0} a kilogram. Her budget line shows`,
  opts: [`all the bundles of the two fruits that cost exactly Rs ${M0}`, 'all the bundles that give her the same satisfaction', 'only the bundle she likes best', 'the quantity of each fruit available in the market'],
  sol: 'The budget line is made of the bundles that exhaust the whole income at the given prices. Bundles of equal satisfaction lie on an indifference curve, and the favourite bundle is the equilibrium, not the whole line.',
}));
Q('m_budget_set', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `Meera's budget set, with Rs ${M0} to spend on mangoes and guavas, consists of`,
  opts: ['all the bundles on and below the budget line, which she can afford', 'only the bundles on the budget line', 'all the bundles above the budget line', 'the bundles on the highest indifference curve'],
  sol: 'The budget set is the collection of bundles that cost no more than the income. Bundles above the line cost more than she has, and indifference curves are not part of the budget set.',
}));
Q('m_inc_shift', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Meera's pocket money rises from Rs ${M0} to Rs ${B_inc.M} while mangoes stay at Rs ${P1_0} and guavas at Rs ${P2_0} a kilogram. Her budget line`,
  opts: [`shifts outward, parallel to the old line, with intercepts ${B_inc.a} kg and ${B_inc.b} kg`, `rotates about the guava intercept`, `shifts inward, parallel to the old line`, `becomes steeper, with slope ${B_p1.slope}`],
  sol: `Intercepts M/P1 and M/P2 both rise, ${B_inc.M}/${P1_0} = ${B_inc.a} and ${B_inc.M}/${P2_0} = ${B_inc.b}, while the slope P1/P2 = ${B_inc.slope} is unchanged, so the line shifts outward and stays parallel. A rotation needs a change in one price.`,
}));
Q('m_price_rot', mcq({
  t: 2, d: 3, c: 'application',
  stem: `The price of mangoes alone rises from Rs ${P1_0} to Rs ${B_p1.P1} a kilogram; Meera's income of Rs ${M0} and the guava price are unchanged. Her budget line`,
  opts: [`rotates inward about the guava intercept, which stays at ${B_p1.b} kg, while the mango intercept falls to ${B_p1.a} kg`, `shifts in parallel with both intercepts falling`, `rotates about the mango intercept`, `does not change`],
  sol: `The guava intercept M/P2 = ${B_p1.b} does not depend on the mango price and stays put. The mango intercept falls from ${B0.a} to ${B_p1.a}, and the slope P1/P2 rises from ${B0.slope} to ${B_p1.slope}, so the line is steeper.`,
}));
Q('m_ic_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'An indifference curve of Meera, drawn for mangoes and guavas, joins',
  opts: ['the bundles of the two goods that give her the same satisfaction', 'the bundles that cost the same amount', 'the bundles she can just afford', 'the prices at which she buys the two goods'],
  sol: 'Every bundle on one indifference curve gives the consumer equal satisfaction. Bundles of equal cost lie on a budget line, which is a different curve.',
}));
Q('m_mrs_dim', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: `Moving along an imagined indifference curve, Meera's marginal rate of substitution of pencils for erasers is ${J(MRS.slice(0, 3))} at successive steps. Because it keeps falling, the curve is`,
  opts: ['convex to the origin', 'concave to the origin', 'a straight line', 'upward sloping'],
  sol: `Diminishing MRS means that she gives up fewer erasers for each extra pencil as she has more pencils, so the curve flattens as it goes right: it is convex to the origin. A straight line would have a constant MRS (${MRS[0]} throughout), and an indifference curve with monotonic preferences never slopes upward.`,
}));
Q('m_ic_prop', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which of the following is NOT a property of the indifference curves of a consumer with monotonic preferences?',
  opts: ['Two indifference curves of the consumer may cut each other', 'An indifference curve slopes downward', 'A higher indifference curve shows a higher level of satisfaction', 'An indifference curve is convex to the origin'],
  sol: 'Two curves cannot intersect: the common bundle would give two different satisfaction levels, which contradicts monotonic preferences. The other three statements are standard properties.',
}));
Q('m_tangency', mcq({
  t: 2, d: 4, c: 'application',
  stem: `Meera, with Rs ${M0} and prices of Rs ${P1_0} (mangoes) and Rs ${P2_0} (guavas) a kilogram, buys 2 kg of mangoes and 8 kg of guavas. At this bundle her MRS is ${mrsAt(2, 8)} kg of guavas per kg of mangoes. She should`,
  opts: [`buy more mangoes and fewer guavas, because she would give up ${mrsAt(2, 8)} kg of guavas for a kilogram of mangoes but the market asks only ${B0.slope} kg`, `buy more guavas and fewer mangoes, because the MRS is higher than one`, `stay, because the bundle is on her budget line`, `buy neither, because her MRS is not equal to one`],
  sol: `The bundle is on the budget line (${P1_0}×2 + ${P2_0}×8 = ${M0}), but MRS = ${mrsAt(2, 8)} is above the price ratio ${B0.slope}. She values mangoes more than the market requires, so a swap of guavas for mangoes raises satisfaction until MRS = P1/P2 = ${B0.slope}, which happens at ${eqX} kg of mangoes and ${eqY} kg of guavas.`,
}));
Q('m_demand_def', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'The demand of Anil, a regular at an imagined tea stall, for cups of tea means',
  opts: ['the quantities he is willing and able to buy at different prices in a given period', 'the quantity he wishes to buy without the money to pay for it', 'the quantity the stall owner would like to sell', 'the quantity of tea left unsold at the end of the day'],
  sol: 'Demand needs both willingness and ability to pay, and it is a schedule of quantities against prices over a period. A wish without purchasing power is not demand, and the seller side and unsold stock concern supply.',
}));
Q('m_law_reason', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Anil buys more cups of tea when the price of a cup falls. Which of the following is a reason for this behaviour?',
  opts: ['Tea becomes cheaper relative to substitutes, so he switches toward tea', 'The tea stall finds tea cheaper to make', 'Anil develops a taste for tea', 'Anil receives a higher salary'],
  sol: 'The substitution effect is one reason for the law of demand: a fall in its own price makes the good relatively cheaper. Cheaper production concerns supply, and a change in taste or income is a change in another determinant, which shifts the curve instead of moving along it.',
}));
Q('m_shift_vs_move', mcq({
  t: 3, d: 3, c: 'application',
  stem: `The incomes of the buyers at the imagined tea stall rise. At the unchanged price of Rs ${PR[2]} a cup, the market now demands ${DM1[2]} cups instead of ${DM[2]}. This is`,
  opts: ['a rightward shift of the demand curve', 'a movement down along the same demand curve', 'an extension of demand caused by a price fall', 'a leftward shift of the demand curve'],
  sol: `The price is unchanged, so the change in quantity (${DM[2]} to ${DM1[2]}) comes from a change in income, another determinant. That moves the whole curve to the right. A movement along the curve needs a change in the good's own price.`,
}));
Q('m_inferior', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'When the monthly income of a household in the imagined village of Sarangpur rises from Rs 8,000 to Rs 12,000, it buys 22 kg of coarse millet flour a month instead of 30 kg at the same price. Millet flour is for this household',
  opts: ['an inferior good', 'a normal good', 'a complement of wheat flour', 'a good whose price has fallen'],
  sol: `Demand for an inferior good falls as income rises (30 − 22 = ${30 - 22} kg less here), because buyers switch to better alternatives. For a normal good demand would rise with income, and no price change has been mentioned.`,
}));
Q('m_substitute', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: `Coffee at the imagined tea stall becomes dearer, and the demand for tea at every price rises by ${SUBS} cups. Tea and coffee are`,
  opts: ['substitutes', 'complements', 'both inferior goods', 'unrelated goods'],
  sol: `When the price of one good rises and demand for the other rises, the two goods are substitutes. For complements, such as tea and sugar, the demand for tea would fall (${J(DMC)} cups here instead of ${J(DM)}).`,
}));
Q('m_market_dem', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `At Rs ${PR[3]} a cup, Anil buys ${DA[3]}, Bela ${DB[3]} and Charu ${DC[3]} cups. The market demand at this price is obtained by`,
  opts: [`adding the three quantities, ${DA[3]} + ${DB[3]} + ${DC[3]} = ${DM[3]} cups (horizontal summation)`, `adding the three prices`, `taking the average of the three quantities, ${rnd(DM[3] / 3, 2)} cups`, `taking the quantity of the largest buyer only`],
  sol: `Market demand is the horizontal sum of individual demands at each price: ${DA[3]} + ${DB[3]} + ${DC[3]} = ${DM[3]} cups. Prices are not added, and an average would not describe the whole market.`,
}));
Q('m_ed_formula', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'By the percentage method, the price elasticity of demand of the apples at an imagined fruit stall is',
  opts: ['percentage change in quantity demanded divided by percentage change in price', 'change in price divided by change in quantity demanded', 'percentage change in income divided by percentage change in price', 'total expenditure divided by quantity demanded'],
  sol: 'Elasticity compares the percentage response of quantity demanded to a percentage change in own price. Absolute changes, income changes and expenditure per unit are different measures.',
}));
Q('m_ed_cases', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: `The price of notebooks at an imagined shop falls by ${Math.abs(EN.dp)} per cent and the quantity demanded rises by the same ${EN.dq} per cent. The price elasticity of demand is`,
  opts: [`unitary, equal to ${EN.ed}`, 'greater than one', 'less than one', 'zero'],
  sol: `Elasticity = ${EN.dq} ÷ ${Math.abs(EN.dp)} = ${EN.ed} when the two percentage changes are equal in size, so demand is unitary elastic.`,
}));
Q('m_exp_method', mcq({
  t: 4, d: 3, c: 'application',
  stem: `At Kiran's imagined tea stall a fall in the price of tea from Rs ${ET.p0} to Rs ${ET.p1} a cup raises total expenditure on tea from Rs ${ET.e0} to Rs ${ET.e1}. By the total expenditure method, the elasticity of demand is`,
  opts: ['greater than one, because expenditure moves opposite to price', 'less than one, because expenditure moves with price', 'equal to one, because expenditure has changed', 'zero, because quantity has changed'],
  sol: `Price fell while expenditure rose from ${ET.e0} to ${ET.e1}: they moved in opposite directions, which means elasticity is greater than one. Expenditure moving with price would mean less than one, and no change in expenditure would mean one.`,
}));
Q('m_determinant', mcq({
  t: 4, d: 3, c: 'understanding',
  stem: 'At an imagined fruit stall, the demand is likely to be LEAST elastic for',
  opts: ['common salt packets, a necessity with no close substitute that takes a tiny share of income', 'imported cherries, a luxury with many substitutes', 'a particular brand of biscuits when other brands cost the same', 'a costly fruit basket bought as a gift'],
  sol: 'Demand is less elastic for necessities, goods with few close substitutes and goods that take a small share of income. Luxuries, brands with close rivals and costly items usually have more elastic demand.',
}));
Q('m_ed_class', mcq({
  t: 4, d: 3, c: 'application',
  stem: `At the imagined fruit stall the price of salt rises from Rs ${ES.p0} to Rs ${ES.p1} a packet and daily sales fall from ${ES.q0} to ${ES.q1} packets, an elasticity of ${ES.ed}. Demand for salt is`,
  opts: ['inelastic, because quantity changes by a smaller percentage than price', 'elastic, because quantity falls when price rises', 'unitary, because both quantity and price change', 'perfectly inelastic, because quantity falls only a little'],
  sol: `The price rose by ${ES.dp} per cent and quantity fell by ${Math.abs(ES.dq)} per cent, so elasticity = ${Math.abs(ES.dq)} ÷ ${ES.dp} = ${ES.ed}, below one. Perfectly inelastic means no change at all in quantity, which is not the case here.`,
}));

// ---------------------------------------------------------------- assertion-reason
Q('ar_dmu', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Meera is willing to pay less for her fourth samosa of the day than for her first.',
  r: 'The marginal utility of a good falls as the consumer has more of it.',
  sol: 'Both are true and R explains A. The most she is willing to pay for a unit is measured by its marginal utility, and that falls as she eats more samosas.',
}));
Q('ar_ic_cross', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Two indifference curves of the same consumer cannot intersect.',
  r: 'Indifference curves are convex to the origin.',
  sol: 'Both statements are true but R does not explain A. Curves cannot cross because a common bundle would carry two different satisfaction levels; convexity comes from a diminishing marginal rate of substitution and says nothing about intersection.',
}));
Q('ar_move_shift', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'A fall in the price of tea shifts the demand curve for tea to the right.',
  r: 'A fall in the price of tea raises the quantity of tea demanded along the same demand curve.',
  sol: 'A is false: a change in the good\'s own price causes a movement along the curve, not a shift. R is true and describes that movement. Shifts come from other determinants such as income, tastes or prices of related goods.',
}));
Q('ar_eq_two', ar({
  t: 1, d: 4, c: 'analysis', verdict: 'A-true-R-false',
  a: 'A consumer who buys two goods is in equilibrium when the marginal utility per rupee is the same for both goods.',
  r: 'A consumer is in equilibrium only when the whole income is spent on the cheaper good.',
  sol: 'A is true: the equi-marginal condition MUx/Px = MUy/Py = marginal utility of money holds at the best bundle. R is false: the equilibrium bundle usually contains both goods, and the cheaper good alone would leave the ratios unequal.',
}));
Q('ar_ed', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'When the price of tea falls and demand is elastic, the total expenditure of buyers on tea rises.',
  r: 'With elastic demand, the percentage rise in quantity demanded is larger than the percentage fall in price.',
  sol: 'Both are true and R explains A. Quantity rises proportionately more than price falls, so price times quantity grows. The tea case with price down 20 per cent and quantity up 40 per cent shows expenditure rising from 500 to 560.',
}));

// ---------------------------------------------------------------- true-false, fill-blank, match, ordering
Q('tf_mu_zero', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? When the marginal utility of Meera\'s samosas is zero, her total utility from samosas is also zero.',
  sol: `When marginal utility is zero, total utility is at its maximum (${Math.max(...TU)} utils in the imagined schedule), not zero.`,
}));
Q('tf_higher_ic', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? For a consumer who prefers more of a good to less, an indifference curve that lies farther from the origin shows a higher level of satisfaction.',
  sol: 'A higher curve contains bundles with more of at least one good, so the consumer prefers them.',
}));
Q('tf_complement', tf({
  t: 3, d: 3, c: 'understanding', ans: true,
  stem: `True or false? If sugar becomes dearer, the demand curve for tea at the imagined stall shifts to the left (${J(DMC)} cups at Rs ${J(PR)} instead of ${J(DM)}), because tea and sugar are complements.`,
  sol: 'Complements are used together, so a rise in the price of one lowers the demand for the other at every price.',
}));
Q('fb_mu_max', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'When marginal utility is zero, total utility is at its ___.',
  acc: [['maximum', 'highest', 'peak']],
  sol: 'Total utility stops rising when the extra unit adds nothing, so it is at its maximum.',
}));
Q('fb_ed_exp', fb({
  t: 4, d: 3, c: 'understanding',
  stem: 'If a rise in the price of a good lowers the total expenditure on it, the price elasticity of demand is ___ than one.',
  acc: [['greater', 'more', 'higher']],
  sol: 'Expenditure moving opposite to price means that elasticity is greater than one.',
}));
Q('mt_ed_cases', match({
  t: 4, d: 2, c: 'understanding',
  stem: 'Match each case of price elasticity of demand with its description.',
  pairs: [
    ['Perfectly elastic demand', 'A horizontal demand curve; a tiny price rise reduces demand to zero'],
    ['Perfectly inelastic demand', 'A vertical demand curve; quantity does not respond to price'],
    ['Unitary elastic demand', 'Quantity changes by the same percentage as price'],
    ['Elasticity greater than one', 'Total expenditure moves opposite to price'],
  ],
  sol: 'Each case is paired with its standard description.',
}));
Q('mt_changes', match({
  t: 3, d: 3, c: 'understanding',
  stem: 'Match each imagined event at the tea stall with its effect on the demand for tea.',
  pairs: [
    ['The price of tea falls', 'Movement down along the same demand curve'],
    ['Buyers\' incomes rise (tea is a normal good)', 'Demand curve shifts to the right'],
    ['Sugar, a complement, becomes dearer', 'Demand curve shifts to the left'],
    ['Coffee, a substitute, becomes dearer', 'Demand curve shifts to the right because buyers switch to tea'],
  ],
  sol: 'An own-price change moves along the curve. Changes in income or in the prices of related goods shift it, in the direction that each effect implies.',
}));
Q('ord_eq', ord({
  t: 1, d: 3, c: 'understanding', marks: 2,
  stem: 'Arrange the steps of finding how many samosas Meera buys when the price and the marginal utility of a rupee are given.',
  items: [
    'List the marginal utility of each successive samosa',
    'Divide each marginal utility by the price of a samosa',
    'Compare each result with the marginal utility of a rupee',
    'Stop at the unit where the two are equal and read the quantity',
  ],
  sol: 'The marginal utility per rupee spent is compared with the marginal utility of money, and equality gives the equilibrium quantity.',
}));
Q('ord_ed', ord({
  t: 4, d: 3, c: 'understanding', marks: 2,
  stem: 'Arrange the steps of finding the price elasticity of demand by the percentage method from an old and a new price and quantity.',
  items: [
    'Find the change in quantity and express it as a percentage of the old quantity',
    'Find the change in price and express it as a percentage of the old price',
    'Divide the percentage change in quantity by the percentage change in price',
    'Compare the result with one and name the case',
  ],
  sol: 'Both percentage changes are computed from the old values, divided, and the size of the result is compared with one.',
}));

// ---------------------------------------------------------------- numericals
Q('n_mu3', num({
  t: 1, d: 2, c: 'application', value: MU[2], unit: 'utils', tol: 0,
  stem: `Meera's total utility from samosas ${NSAM}. Find the marginal utility of the third samosa.`,
  sol: `Step 1: TU after three samosas is ${TU[3]} and after two is ${TU[2]}.\nStep 2: MU of the third = ${TU[3]} − ${TU[2]} = ${MU[2]} utils.`,
}));
Q('n_ratio_juice', num({
  t: 1, d: 2, c: 'application', value: rY[1], unit: 'utils per rupee', tol: 0,
  stem: `Meera gets ${MY[1]} utils of marginal utility from her second glass of juice, which costs Rs ${PY}. Find the marginal utility per rupee spent on that glass.`,
  sol: `MU per rupee = MUy ÷ Py = ${MY[1]} ÷ ${PY} = ${rY[1]} utils per rupee.`,
}));
Q('n_eq_q', num({
  t: 1, d: 3, c: 'application', value: eqQ, unit: 'samosas', tol: 0,
  stem: `Meera's marginal utility of the 1st to 6th samosa is ${J(MU.slice(0, 4))} and then ${J(MU.slice(4))} utils. A samosa costs Rs ${PS} and a rupee is worth ${MUM} utils to her. How many samosas does she buy in equilibrium?`,
  sol: `Step 1: In equilibrium MU of the last samosa = price × MU of a rupee = ${PS} × ${MUM} = ${PS * MUM} utils.\nStep 2: The third samosa has MU ${MU[2]}, so she buys ${eqQ} samosas. (The second gives ${MU[1]}, worth more than ${PS * MUM}, and the fourth gives ${MU[3]}, worth less.)`,
}));
Q('n_eq_q_fall', num({
  t: 1, d: 4, c: 'application', value: eqQ2, unit: 'samosas', tol: 0,
  stem: `Meera's marginal utilities for the 1st to 6th samosa are ${J(MU.slice(0, 4))} and then ${J(MU.slice(4))} utils, and a rupee is worth ${MUM} utils to her. The canteen cuts the price of a samosa from Rs ${PS} to Rs ${PS2}. How many samosas does she now buy in equilibrium?`,
  sol: `Step 1: Required MU = ${PS2} × ${MUM} = ${PS2 * MUM} utils.\nStep 2: The fourth samosa has MU ${MU[3]}, so she buys ${eqQ2} samosas, one more than the ${eqQ} bought at Rs ${PS}.`,
}));
Q('n_intercept', num({
  t: 2, d: 2, c: 'application', value: BN.a, unit: 'notebooks', tol: 0,
  stem: `Neha has Rs ${BN.M} to spend on notebooks at Rs ${BN.P1} each and pens at Rs ${BN.P2} each. What is the horizontal intercept of her budget line, with notebooks on the horizontal axis?`,
  sol: `Step 1: Horizontal intercept = M ÷ P1.\nStep 2: ${BN.M} ÷ ${BN.P1} = ${BN.a} notebooks (the vertical intercept is ${BN.M} ÷ ${BN.P2} = ${BN.b} pens).`,
}));
Q('n_slope', num({
  t: 2, d: 3, c: 'application', value: BR.slope, unit: 'pens per notebook', tol: 0,
  stem: `Rohan has Rs ${BR.M}, notebooks cost Rs ${BR.P1} each and pens Rs ${BR.P2} each. Find the magnitude of the slope of his budget line, with notebooks on the horizontal axis.`,
  sol: `Step 1: Slope = P1 ÷ P2 in magnitude.\nStep 2: ${BR.P1} ÷ ${BR.P2} = ${BR.slope} pens per notebook (intercepts: ${BR.a} notebooks and ${BR.b} pens).`,
}));
Q('n_mrs', num({
  t: 2, d: 3, c: 'application', value: mrsBD, unit: 'kg of erasers per kg of pencils', tol: 0,
  stem: `Meera is equally satisfied by ${sInd}. Find her marginal rate of substitution when she moves from B to D.`,
  sol: `Step 1: Erasers given up = ${IY[1]} − ${IY[3]} = ${IY[1] - IY[3]} kg.\nStep 2: Extra pencils = ${IX[3]} − ${IX[1]} = ${IX[3] - IX[1]} kg.\nStep 3: MRS = ${IY[1] - IY[3]} ÷ ${IX[3] - IX[1]} = ${mrsBD}.`,
}));
Q('n_tangency', num({
  t: 2, d: 4, c: 'application', value: rohanX, unit: 'notebooks', tol: 0,
  stem: `Rohan has Rs ${BR.M} and buys notebooks at Rs ${BR.P1} each and pens at Rs ${BR.P2} each. His satisfaction is the product of the two quantities, for which MRS = y ÷ x (pens per notebook). How many notebooks does he buy in equilibrium?`,
  sol: `Step 1: In equilibrium MRS = P1 ÷ P2 = ${BR.P1} ÷ ${BR.P2} = ${BR.slope}, so y = ${BR.slope}x.\nStep 2: The budget line gives ${BR.P1}x + ${BR.P2}y = ${BR.M}, so ${BR.P1}x + ${BR.P2}×${BR.slope}x = ${BR.P1 + BR.P2 * BR.slope}x = ${BR.M}.\nStep 3: x = ${rohanX} notebooks (and y = ${rohanY} pens).`,
}));
Q('n_market_q', num({
  t: 3, d: 2, c: 'application', value: DM[3], unit: 'cups', tol: 0,
  stem: `At the imagined tea stall, ${bunch}. How many cups does the market demand per day at Rs ${PR[3]}? The quantities listed are in the order of the prices ${J(PR)}.`,
  sol: `Step 1: At Rs ${PR[3]} Anil buys ${DA[3]}, Bela ${DB[3]} and Charu ${DC[3]}.\nStep 2: Market demand = ${DA[3]} + ${DB[3]} + ${DC[3]} = ${DM[3]} cups.`,
}));
Q('n_shift_q', num({
  t: 3, d: 3, c: 'application', value: DM1[2], unit: 'cups', tol: 0,
  stem: `At Rs ${PR[2]} a cup the three buyers of the imagined tea stall take ${DA[2]}, ${DB[2]} and ${DC[2]} cups. After a rise in their incomes, Anil buys ${SA} more cup, Bela ${SB} more and Charu ${SC} more at every price. What is the market demand at Rs ${PR[2]} now?`,
  sol: `Step 1: Before the rise, market demand = ${DA[2]} + ${DB[2]} + ${DC[2]} = ${DM[2]} cups.\nStep 2: The shift adds ${SA} + ${SB} + ${SC} = ${SH} cups at every price.\nStep 3: New demand = ${DM[2]} + ${SH} = ${DM1[2]} cups.`,
}));
Q('n_ed_apples', num({
  t: 4, d: 3, c: 'application', value: EA.ed, unit: null, tol: 0,
  stem: `Meera's imagined fruit stall raises the price of apples from Rs ${EA.p0} to Rs ${EA.p1} a kilogram, and daily sales fall from ${EA.q0} kg to ${EA.q1} kg. Find the price elasticity of demand by the percentage method, ignoring the minus sign.`,
  sol: `Step 1: Change in quantity = (${EA.q1} − ${EA.q0}) ÷ ${EA.q0} × 100 = ${EA.dq} per cent.\nStep 2: Change in price = (${EA.p1} − ${EA.p0}) ÷ ${EA.p0} × 100 = ${EA.dp} per cent.\nStep 3: Elasticity = ${Math.abs(EA.dq)} ÷ ${EA.dp} = ${EA.ed}.`,
}));
Q('n_ed_salt', num({
  t: 4, d: 3, c: 'application', value: ES.ed, unit: null, tol: 0,
  stem: `At the imagined fruit stall the price of a packet of salt rises from Rs ${ES.p0} to Rs ${ES.p1} and daily sales fall from ${ES.q0} to ${ES.q1} packets. Find the price elasticity of demand by the percentage method, ignoring the sign.`,
  sol: `Step 1: Change in quantity = (${ES.q1} − ${ES.q0}) ÷ ${ES.q0} × 100 = ${ES.dq} per cent.\nStep 2: Change in price = (${ES.p1} − ${ES.p0}) ÷ ${ES.p0} × 100 = ${ES.dp} per cent.\nStep 3: Elasticity = ${Math.abs(ES.dq)} ÷ ${ES.dp} = ${ES.ed}.`,
}));
Q('n_qty_ed', num({
  t: 4, d: 4, c: 'application', value: q1Q, unit: 'kg', tol: 0,
  stem: `A stall sells ${Q0Q} kg of mangoes a day. The price elasticity of demand for mangoes is ${ED2}. If the price falls by ${Math.abs(DPQ)} per cent, how many kilograms will be sold a day afterwards?`,
  sol: `Step 1: Percentage change in quantity = elasticity × percentage change in price = ${ED2} × ${Math.abs(DPQ)} = ${dqQ} per cent rise.\nStep 2: Rise = ${Q0Q} × ${dqQ} ÷ 100 = ${Q0Q * dqQ / 100} kg.\nStep 3: New quantity = ${Q0Q} + ${Q0Q * dqQ / 100} = ${q1Q} kg.`,
}));

// ---------------------------------------------------------------- short answers, 2 marks
Q('s2_tu_mu', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain total utility and marginal utility, using Meera and her samosas as the example, and state how the two are related.',
  model: `Total utility is the whole satisfaction Meera gets from all the samosas she eats; marginal utility is the extra satisfaction from one more samosa. Marginal utility is the change in total utility, so MU of the third samosa is ${TU[3]} − ${TU[2]} = ${MU[2]} utils.`,
  sol: 'TU: whole satisfaction; MU: change in TU per extra unit.',
  scheme: [['Total utility and marginal utility defined', 1], ['Relation MU = change in TU, with the figure', 1]],
}));
Q('s2_dmu', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `State the law of diminishing marginal utility. Using Meera's marginal utilities of ${J(MU.slice(0, 4))} utils for her first four samosas, show how the law operates.`,
  model: `The law says that as a consumer takes more units of a good, the marginal utility from each additional unit falls, other things unchanged. For Meera it falls ${J(MU.slice(0, 4))}: every extra samosa adds less than the one before, until it reaches ${MU[4]}.`,
  sol: 'Statement and illustration.',
  scheme: [['Law stated', 1], ['Illustrated with the falling figures', 1]],
}));
Q('s2_budget', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Define a budget line. For income Rs ${M0} and prices Rs ${P1_0} and Rs ${P2_0} for goods 1 and 2, state its intercepts and slope.`,
  model: `A budget line shows all the bundles of two goods that the consumer can buy by spending the whole income at the given prices: P1x1 + P2x2 = M. Here the intercepts are ${M0}/${P1_0} = ${B0.a} units of good 1 and ${M0}/${P2_0} = ${B0.b} of good 2, and the slope is −${P1_0}/${P2_0} = −${B0.slope}.`,
  sol: 'Definition, intercepts, slope.',
  scheme: [['Budget line defined with the equation', 1], ['Intercepts and slope computed', 1]],
}));
Q('s2_mrs', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Define the marginal rate of substitution and state what happens to it as a consumer moves down an indifference curve.',
  model: 'The marginal rate of substitution is the amount of good 2 a consumer will give up for one more unit of good 1 while staying on the same indifference curve. It diminishes down the curve: the more of good 1 she has, the less of good 2 she gives up for it.',
  sol: 'MRS defined; diminishing.',
  scheme: [['MRS defined', 1], ['Diminishing MRS stated with reason', 1]],
}));
Q('s2_ic_prop', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'State any two properties of indifference curves of Meera, who prefers more of a good to less, and give the reason for one of them.',
  model: 'Her indifference curves slope downward, because taking more of one good must be matched by giving up some of the other to stay equally satisfied. A higher curve shows higher satisfaction, since it contains bundles with more of at least one good. They are also convex and never cut one another.',
  sol: 'Any two properties with a reason.',
  scheme: [['Two properties named', 1], ['A reason given', 1]],
}));
Q('s2_demand_func', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'List the main determinants of the demand for tea at an imagined tea stall, and say which of them lies behind a movement along the demand curve.',
  model: 'Demand depends on the price of tea itself, the prices of related goods (substitutes such as coffee and complements such as sugar), buyers\' income, their tastes and preferences, and their expectations. The own price alone causes a movement along the curve; the others shift it.',
  sol: 'Own price, related goods, income, tastes, expectations; own price moves along.',
  scheme: [['Determinants listed', 1], ['Own price identified as the cause of movement', 1]],
}));
Q('s2_move_shift', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `At the imagined tea stall the market demand at Rs ${PR[1]} is ${DM[1]} cups and at Rs ${PR[2]} is ${DM[2]} cups. Is this a movement along the curve or a shift? Explain.`,
  model: `It is a movement along the demand curve. The price of tea itself changed from Rs ${PR[1]} to Rs ${PR[2]}, and the quantity demanded rose from ${DM[1]} to ${DM[2]} cups. A shift would show a different quantity at the same price because another determinant has changed.`,
  sol: 'Own price changed: movement.',
  scheme: [['Movement along the curve identified', 1], ['Reason: own price changed, not another determinant', 1]],
}));
Q('s2_ed_def', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Define the price elasticity of demand and state its sign convention, using the demand for apples at Meera\'s imagined stall.',
  model: 'Price elasticity of demand measures how responsive the quantity demanded of apples is to a change in their price: the percentage change in quantity demanded divided by the percentage change in price. Because the two changes have opposite signs, the number is negative; it is usually quoted without the sign.',
  sol: 'Definition and sign.',
  scheme: [['Definition with the percentage formula', 1], ['Sign convention', 1]],
}));
Q('s2_determ', short({
  t: 4, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'State any two determinants of the price elasticity of demand and explain how each affects it, with an imagined example from a fruit stall.',
  model: 'Availability of substitutes: demand for a particular brand of juice is elastic because other brands can replace it. Nature of the good: salt, a necessity with a tiny share of the budget, has inelastic demand. Time period and share of income also matter.',
  sol: 'Any two determinants with effects.',
  scheme: [['First determinant with effect', 1], ['Second determinant with effect', 1]],
}));

// ---------------------------------------------------------------- short answers, 3 marks
Q('s3_eq_one', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Meera buys samosas at Rs ${PS} and a rupee is worth ${MUM} utils to her. Using the marginal utilities ${J(MU.slice(0, 4))} for the first four samosas, show why she buys ${eqQ} samosas and not ${eqQ + 1}.`,
  model: `She buys until MU of the last unit divided by the price equals the marginal utility of money, so MU must be ${PS} × ${MUM} = ${PS * MUM} utils. The third samosa gives ${MU[2]}, so MU/P = ${ratioS[2]} = ${MUM}. The fourth gives only ${MU[3]}, so MU/P = ${ratioS[3]} is below ${MUM}: a rupee spent on it brings less than a rupee kept.`,
  sol: 'Equilibrium at the third samosa.',
  scheme: [['Condition MU/P = MU of money', 1], ['Third samosa satisfies it with figures', 1], ['Fourth samosa fails it', 1]],
}));
Q('s3_eq_two', short({
  t: 1, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: `Meera has Rs ${INC}. Samosas cost Rs ${PX} and juice Rs ${PY}; marginal utilities are ${mxText}, and ${myText}. Show that ${bundleText(...BAD1)} is not an equilibrium and say what she should do.`,
  model: `At ${bundleText(...BAD1)} she spends ${PX}×${BAD1[0]} + ${PY}×${BAD1[1]} = ${PX * BAD1[0] + PY * BAD1[1]} rupees. MUx/Px = ${MX[3]}/${PX} = ${rX[3]} but MUy/Py = ${MY[0]}/${PY} = ${rY[0]}. Since juice gives more satisfaction per rupee, she should buy less of samosas and more juice, moving toward ${bundleText(best.x, best.y)} where both ratios are ${eqRatio}.`,
  sol: 'Unequal ratios; shift to juice.',
  scheme: [['Both ratios computed', 1], ['Inequality identified', 1], ['Direction of change and equilibrium bundle', 1]],
}));
Q('s3_budget_shift', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Meera's budget line has income Rs ${M0}, mango price Rs ${P1_0} and guava price Rs ${P2_0}. Find the intercepts after (i) her income rises to Rs ${B_inc.M}, and (ii) the guava price rises to Rs ${B_p2.P2}, and describe each change.`,
  model: `(i) Both intercepts rise to ${B_inc.M}/${P1_0} = ${B_inc.a} kg and ${B_inc.M}/${P2_0} = ${B_inc.b} kg; the line shifts outward in parallel, with slope ${B_inc.slope} unchanged. (ii) The mango intercept stays ${B_p2.a} kg while the guava intercept falls to ${M0}/${B_p2.P2} = ${B_p2.b} kg; the line rotates inward about the mango intercept and its slope falls to ${B_p2.slope}.`,
  sol: 'Parallel shift; rotation.',
  scheme: [['Case (i) intercepts', 1], ['Case (ii) intercepts', 1], ['Parallel shift and rotation named', 1]],
}));
Q('s3_law_demand', short({
  t: 3, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'State the law of demand and explain any two reasons for it, with an imagined case of Anil buying tea.',
  model: 'Other things unchanged, a fall in the price of a good raises the quantity demanded, and a rise lowers it. Substitution effect: cheaper tea tempts Anil away from coffee. Income effect: a lower price raises his real income, so he can buy more tea. Diminishing marginal utility also makes him willing to buy more only at a lower price.',
  sol: 'Law and two reasons.',
  scheme: [['Law stated with other things unchanged', 1], ['Substitution effect', 1], ['Income effect or diminishing marginal utility', 1]],
}));
Q('s3_market', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `At Rs ${PR[1]} a cup Anil, Bela and Charu buy ${DA[1]}, ${DB[1]} and ${DC[1]} cups, and at Rs ${PR[3]} they buy ${DA[3]}, ${DB[3]} and ${DC[3]} cups. Find the market demand at each price and say how the market demand curve is obtained.`,
  model: `At Rs ${PR[1]}: ${DA[1]} + ${DB[1]} + ${DC[1]} = ${DM[1]} cups. At Rs ${PR[3]}: ${DA[3]} + ${DB[3]} + ${DC[3]} = ${DM[3]} cups. The market demand curve is the horizontal sum of the individual demand curves: at every price the quantities of all buyers are added.`,
  sol: `${DM[1]} and ${DM[3]} cups; horizontal summation.`,
  scheme: [['Market demand at the first price', 1], ['Market demand at the second price', 1], ['Horizontal summation stated', 1]],
}));
Q('s3_exp_method', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `At an imagined shop, the price of a bus pass rises from Rs ${EP.p0} to Rs ${EP.p1} and sales fall from ${EP.q0} to ${EP.q1} passes. Use the total expenditure method to state the elasticity, and give the rule for the other two cases.`,
  model: `Expenditure before = ${EP.p0} × ${EP.q0} = Rs ${EP.e0}; after = ${EP.p1} × ${EP.q1} = Rs ${EP.e1}. It is unchanged, so elasticity is equal to one. If expenditure moves opposite to price, elasticity is greater than one; if it moves in the same direction as price, elasticity is less than one.`,
  sol: 'Expenditure unchanged: unitary.',
  scheme: [['Both expenditures computed', 1], ['Verdict equal to one', 1], ['Rule for the other two cases', 1]],
}));

// ---------------------------------------------------------------- long answers, 5 marks
Q('l_dmu', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: `Meera's marginal utility of samosas is ${J(MU.slice(0, 4))} utils for the first four, then ${J(MU.slice(4))}. State the law of diminishing marginal utility, show it from these figures, and explain how she decides how many samosas to buy at Rs ${PS} when a rupee is worth ${MUM} utils.`,
  model: `The law states that, other things unchanged, marginal utility falls as more of a good is consumed. Meera's figures fall from ${MU[0]} to ${MU[3]}, then ${MU[4]} and ${MU[5]}, when total utility is at its maximum and then declines. She compares each unit's MU divided by the price with the marginal utility of money: ${ratioS[1]} exceeds ${MUM} for the second samosa, it equals ${MUM} for the third, and it falls to ${ratioS[3]} for the fourth. So she stops at ${eqQ} samosas, where MUx/Px = ${MUM}.`,
  sol: 'Law, figures, equilibrium at three samosas.',
  scheme: [['Law stated', 1], ['Falling figures used', 1], ['Condition MU/P equals MU of money', 1], ['Ratios for second to fourth samosa', 1], ['Quantity three', 1]],
}));
Q('l_eq_two', long({
  t: 1, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `Meera has Rs ${INC} for samosas at Rs ${PX} and juice at Rs ${PY} a glass. The marginal utilities are ${mxText}, and ${myText}. Find her equilibrium bundle using the law of equi-marginal utility and verify that it exhausts her income.`,
  model: `MU per rupee for samosas is ${J(rX)} and for juice ${J(rY)}. The ratios are equal at ${eqRatio} for the third samosa and the second glass: MUx/Px = MUy/Py = ${eqRatio}. The cost is ${PX}×${best.x} + ${PY}×${best.y} = ${PX * best.x + PY * best.y}, the whole income. Her equilibrium is ${bundleText(best.x, best.y)}, with a total utility of ${uBest} utils. Any other affordable bundle gives less.`,
  sol: 'Equilibrium bundle (3, 2).',
  scheme: [['MU per rupee for samosas', 1], ['MU per rupee for juice', 1], ['Equal ratios identified', 1], ['Budget check', 1], ['Bundle and total utility', 1]],
}));
Q('l_ic_eq', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `Meera has Rs ${M0} for mangoes at Rs ${P1_0} and guavas at Rs ${P2_0} a kilogram, and her satisfaction is the product of the two quantities. Explain, with the equilibrium condition, why her best bundle is ${eqX} kg of mangoes and ${eqY} kg of guavas.`,
  model: `The best bundle lies on the budget line and on the highest indifference curve she can reach, where the budget line touches a curve: MRS = P1/P2 = ${B0.slope}. At (${eqX}, ${eqY}) the product is ${U(eqX, eqY)} and the MRS ${eqY}/${eqX} = ${mrsAt(eqX, eqY)}. The bundle (2, 8) is also affordable but gives only ${U(2, 8)}, and any curve above ${U(eqX, eqY)}, such as ${K[2]}, cannot be reached. So her equilibrium is at the tangency.`,
  sol: 'Tangency, MRS = price ratio.',
  scheme: [['Highest attainable curve touches the budget line', 1], ['MRS = P1/P2 stated', 1], ['MRS computed at the bundle', 1], ['Comparison with another affordable bundle', 1], ['Unattainable higher curve', 1]],
}));
Q('l_budget', long({
  t: 2, d: 3, c: 'application', marks: 5, wl: L5,
  stem: `Meera has Rs ${M0} for mangoes (Rs ${P1_0} a kg) and guavas (Rs ${P2_0} a kg). Write the equation of her budget line, find its intercepts and slope, and show the effect on the line of a rise in her income to Rs ${B_inc.M} and of a rise in the mango price to Rs ${B_p1.P1}.`,
  model: `The budget line is ${P1_0}x1 + ${P2_0}x2 = ${M0}, with intercepts ${B0.a} kg of mangoes and ${B0.b} kg of guavas and slope −${B0.slope}. A rise in income to Rs ${B_inc.M} shifts it out in parallel: intercepts ${B_inc.a} and ${B_inc.b}, slope unchanged. A rise in the mango price rotates it inward about the guava intercept ${B_p1.b}: the mango intercept falls to ${B_p1.a} and the slope becomes −${B_p1.slope}.`,
  sol: 'Equation, intercepts, slope, shift, rotation.',
  scheme: [['Equation', 1], ['Intercepts and slope', 1], ['Income rise: parallel shift with figures', 1.5], ['Mango price rise: rotation with figures', 1.5]],
}));
Q('l_demand_shift', long({
  t: 3, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `The imagined tea stall's market demand is ${J(DM)} cups at prices of Rs ${J(PR)}. Explain the difference between a movement along the demand curve and a shift of the curve, using (i) a fall in price from Rs ${PR[1]} to Rs ${PR[2]} and (ii) a rise in buyers' incomes that adds ${SH} cups at every price.`,
  model: `A movement along the curve is caused only by a change in the good's own price: when the price falls from Rs ${PR[1]} to Rs ${PR[2]}, quantity rises from ${DM[1]} to ${DM[2]} cups on the same curve. A shift is caused by another determinant, such as income. A rise in incomes adds ${SH} cups at every price, so at Rs ${PR[2]} demand becomes ${DM1[2]} cups and the whole curve moves right, from ${J(DM)} to ${J(DM1)}.`,
  sol: 'Movement versus shift with figures.',
  scheme: [['Movement defined with cause', 1], ['Movement figures', 1], ['Shift defined with cause', 1], ['Shift figures', 1], ['Distinction clearly stated', 1]],
}));
Q('l_ed', long({
  t: 4, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `Meera's imagined stall sells apples (price Rs ${EA.p0} to Rs ${EA.p1}, quantity ${EA.q0} kg to ${EA.q1} kg) and fish (price Rs ${EF.p0} to Rs ${EF.p1}, quantity ${EF.q0} kg to ${EF.q1} kg). Find the elasticity of each by the percentage method and confirm each result by the total expenditure method.`,
  model: `Elasticity by the percentage method is the percentage change in quantity divided by the percentage change in price, taken without the sign. Apples: quantity falls ${Math.abs(EA.dq)} per cent while price rises ${EA.dp} per cent, so elasticity = ${Math.abs(EA.dq)} ÷ ${EA.dp} = ${EA.ed}, above one. Expenditure falls from ${EA.e0} to ${EA.e1} as price rises, which confirms it. Fish: quantity rises ${EF.dq} per cent while price falls ${Math.abs(EF.dp)} per cent, so elasticity = ${EF.dq} ÷ ${Math.abs(EF.dp)} = ${EF.ed}, below one. Expenditure falls from ${EF.e0} to ${EF.e1} together with price, which confirms it.`,
  sol: `Apples ${EA.ed}; fish ${EF.ed}.`,
  scheme: [['Apples percentage changes', 1], ['Apples elasticity and expenditure check', 1.5], ['Fish percentage changes', 1], ['Fish elasticity and expenditure check', 1.5]],
}));

// ---------------------------------------------------------------- case-based (imagined passages and data)
Q('cb_samosa', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined samosa schedule of Meera**\n\nMeera, an imagined student, visits her college canteen where a samosa costs Rs ${PS}. Her total utility from samosas is ${J(TU)} utils for 0, 1, 2, 3, 4, 5 and 6 samosas. She treats a rupee as worth ${MUM} utils.`,
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Find the marginal utility of the fourth samosa.', model: `${TU[4]} − ${TU[3]} = **${MU[3]} utils**.`, sol: `MU ${MU[3]}.`, scheme: [['Correct MU', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'How many samosas does she buy in equilibrium?', model: `She buys until MU = ${PS} × ${MUM} = ${PS * MUM} utils, which is the third samosa: **${eqQ} samosas**.`, sol: `${eqQ} samosas.`, scheme: [['Correct quantity', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Explain why she does not buy a fourth samosa, using marginal utility per rupee.', model: `For the fourth samosa MU/P = ${MU[3]} ÷ ${PS} = ${ratioS[3]}, which is below the ${MUM} utils a rupee is worth to her. Spending Rs ${PS} on it gives less satisfaction than the rupees kept.`, sol: 'Ratio below MU of money.', scheme: [['Ratio computed', 1], ['Compared with MU of money', 1]] }), [
      short({ t: 1, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): At which quantity is her total utility at its maximum, and what is the marginal utility there?', model: `Total utility is at its maximum of ${Math.max(...TU)} utils at ${TU.indexOf(Math.max(...TU))} samosas; the marginal utility of the fifth samosa is ${MU[4]}, and it is negative after that.`, sol: 'Maximum at zero MU.', scheme: [['Maximum identified', 1], ['MU zero then negative', 1]] }),
    ]),
  ],
}));
Q('cb_budget_ic', caseQ({
  t: 2, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined choices of Meera at a fruit stall**\n\nMeera has Rs ${M0} to spend on mangoes at Rs ${P1_0} a kilogram and guavas at Rs ${P2_0} a kilogram. Her satisfaction is the product of the two quantities. She buys ${eqX} kg of mangoes and ${eqY} kg of guavas, a bundle that gives ${U(eqX, eqY)} units of satisfaction.`,
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Find the two intercepts of her budget line.', model: `${M0} ÷ ${P1_0} = **${B0.a} kg** of mangoes and ${M0} ÷ ${P2_0} = **${B0.b} kg** of guavas.`, sol: `${B0.a} and ${B0.b}.`, scheme: [['Both intercepts', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'What is the value of her MRS at the chosen bundle?', model: `At equilibrium MRS equals the price ratio: ${P1_0} ÷ ${P2_0} = **${B0.slope}**.`, sol: `MRS ${B0.slope}.`, scheme: [['Correct MRS', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: `**Either** (i): The bundle (4, 4) is on her budget line. Why does she not choose it?`, model: `It costs ${P1_0}×4 + ${P2_0}×4 = ${P1_0 * 4 + P2_0 * 4}, so it is affordable, but it gives only ${U(4, 4)} against ${U(eqX, eqY)}. It lies on a lower indifference curve, and her MRS there (${mrsAt(4, 4)}) is not equal to ${B0.slope}.`, sol: 'Lower curve.', scheme: [['Lower satisfaction compared', 1], ['MRS not equal to price ratio', 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): The mango price rises to Rs ${B_p1.P1}. State the new intercepts and the slope.`, model: `Mango intercept ${M0} ÷ ${B_p1.P1} = ${B_p1.a} kg, guava intercept unchanged at ${B_p1.b} kg, slope ${B_p1.slope}: an inward rotation about the guava intercept.`, sol: 'Rotation.', scheme: [['New intercepts', 1], ['Slope and rotation', 1]] }),
    ]),
  ],
}));
Q('cb_tea', caseQ({
  t: 3, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined demand at Kiran's tea stall**\n\nKiran runs a tea stall frequented by three regular buyers. The quantities they buy per day at prices of Rs ${J(PR)} per cup are: Anil ${J(DA)}; Bela ${J(DB)}; Charu ${J(DC)}.`,
  parts: [
    child('a', short({ t: 3, d: 2, c: 'application', marks: 1, stem: `Find the market demand at Rs ${PR[2]}.`, model: `${DA[2]} + ${DB[2]} + ${DC[2]} = **${DM[2]} cups**.`, sol: `${DM[2]}.`, scheme: [['Correct sum', 1]] })),
    child('b', short({ t: 3, d: 3, c: 'application', marks: 1, stem: 'Does the market demand obey the law of demand? Give a reason.', model: `Yes. As the price falls from Rs ${PR[0]} to Rs ${PR[4]} the market quantity rises from ${DM[0]} to ${DM[4]} cups.`, sol: 'Yes: rises as price falls.', scheme: [['Yes with reason', 1]] })),
    child('c', short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: `**Either** (i): The price of coffee at a nearby stall rises and Kiran's demand rises by ${SUBS} cups at each price. Name the relation and describe the change in the curve.`, model: `Tea and coffee are substitutes. Demand rises at every price, for example from ${DM[2]} to ${DMS[2]} cups at Rs ${PR[2]}, so the demand curve shifts to the right.`, sol: 'Substitutes; rightward shift.', scheme: [['Substitutes named', 1], ['Rightward shift with figure', 1]] }), [
      short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): The price of tea falls from Rs ${PR[1]} to Rs ${PR[2]}. Is this a shift or a movement? State the change in quantity demanded.`, model: `It is a movement along the same market demand curve, because only the own price has changed. Quantity demanded rises from ${DM[1]} to ${DM[2]} cups, a rise of ${DM[2] - DM[1]} cups.`, sol: 'Movement; 4 cups.', scheme: [['Movement identified with reason', 1], ['Change in quantity', 1]] }),
    ]),
  ],
}));
Q('cb_fruit', caseQ({
  t: 4, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined price changes at Meera's fruit stall**\n\nMeera raises the price of apples from Rs ${EA.p0} to Rs ${EA.p1} a kilogram and sales fall from ${EA.q0} kg to ${EA.q1} kg a day. For salt she raises the price of a packet from Rs ${ES.p0} to Rs ${ES.p1} and sales fall from ${ES.q0} to ${ES.q1} packets.`,
  parts: [
    child('a', short({ t: 4, d: 3, c: 'application', marks: 1, stem: 'Find the price elasticity of demand for apples.', model: `${Math.abs(EA.dq)} per cent ÷ ${EA.dp} per cent = **${EA.ed}**.`, sol: `${EA.ed}.`, scheme: [['Correct elasticity', 1]] })),
    child('b', short({ t: 4, d: 3, c: 'application', marks: 1, stem: 'By the total expenditure method, is demand for salt elastic or inelastic? Give the figures.', model: `Expenditure rises with price, from Rs ${ES.e0} to Rs ${ES.e1}, so elasticity is **less than one**: inelastic.`, sol: 'Inelastic.', scheme: [['Verdict with figures', 1]] })),
    child('c', short({ t: 4, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Why is the demand for salt less elastic than that for apples?', model: 'Salt is a necessity with no close substitute and takes a very small share of income, so buyers do not cut purchases much when the price rises. Apples can be replaced by other fruits.', sol: 'Necessity, substitutes, share.', scheme: [['Necessity or share of income', 1], ['Availability of substitutes', 1]] }), [
      short({ t: 4, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Meera wants more revenue. Should she raise the price of apples or of salt, and why?', model: `Salt: the quantity falls proportionately less than the price rises, so her revenue rises (${ES.e0} to ${ES.e1}). For apples revenue fell from ${EA.e0} to ${EA.e1}, so raising the price of apples would lower revenue.`, sol: 'Salt.', scheme: [['Salt chosen with the figures', 1], ['Apples revenue falls', 1]] }),
    ]),
  ],
}));
