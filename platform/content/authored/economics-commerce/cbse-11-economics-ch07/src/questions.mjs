// CBSE 11 Economics, ch07 Introduction to Index Numbers: question bank. Every household, bakery, stationer, canteen, juice bar,
// factory and mill colony is imagined and written for this chapter; no real statistics are used. Every index, relative, product
// sum, inflation rate and real wage below is computed with stats.mjs (or plain code) from the imagined data and pinned with check().
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from '../../cbse-11-economics-ch01/src/lib.mjs';
import { sum, mean, rnd, check, indexAggregative, indexRelatives, indexLaspeyres, indexPaasche, indexWeightedRelatives, inflation } from '../../cbse-11-economics-ch01/src/stats.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
export const S = (x) => String(rnd(x, 2));
export const J = (xs) => xs.join(', ');
const dot = (a, b) => sum(a.map((x, i) => x * b[i]));

/** Everything a weighted-aggregative worked example needs, computed from prices and quantities. */
export function agg(p0, p1, q0, q1) {
  const r = {
    p0, p1, q0, q1,
    sp0: sum(p0), sp1: sum(p1),
    rel: p0.map((p, i) => rnd((p1[i] / p) * 100, 6)),
    aggI: indexAggregative(p0, p1),
    relI: indexRelatives(p0, p1),
  };
  if (q0) {
    r.p1q0 = dot(p1, q0); r.p0q0 = dot(p0, q0);
    r.L = indexLaspeyres(p0, p1, q0);
    assert.ok(Math.abs(r.L - (r.p1q0 / r.p0q0) * 100) < 1e-9, 'Laspeyres equals the ratio of the sums');
  }
  if (q1) {
    r.p1q1 = dot(p1, q1); r.p0q1 = dot(p0, q1);
    r.P = indexPaasche(p0, p1, q1);
    assert.ok(Math.abs(r.P - (r.p1q1 / r.p0q1) * 100) < 1e-9, 'Paasche equals the ratio of the sums');
  }
  return r;
}
const same = (a, b, what) => assert.ok(Math.abs(a - b) < 1e-9, `${what}: ${a} differs from ${b}`);

// ---------------------------------------------------------------- imagined data (computed)
// 1. Household of Bhavnagar Colony: five items, prices (Rs per unit) and monthly quantities (units).
export const HH_N = ['wheat flour (kg)', 'pulses (kg)', 'milk (litre)', 'cooking oil (litre)', 'tea (pack)'];
export const HH = agg([40, 100, 60, 120, 80], [50, 120, 75, 150, 105], [6, 2, 3, 4, 5], [3, 4, 2, 4, 1]);
check(HH.sp0, 400, 0, 'household base prices total');
check(HH.sp1, 500, 0, 'household current prices total');
check(HH.aggI, 125, 2, 'household simple aggregative');
assert.deepEqual(HH.rel, [125, 120, 125, 125, 131.25]);
check(HH.relI, 125.25, 2, 'household relatives mean');
check(HH.p1q0, 1890, 0, 'household sum p1q0');
check(HH.p0q0, 1500, 0, 'household sum p0q0');
check(HH.L, 126, 2, 'household Laspeyres');
check(HH.p1q1, 1485, 0, 'household sum p1q1');
check(HH.p0q1, 1200, 0, 'household sum p0q1');
check(HH.P, 123.75, 2, 'household Paasche');
export const hhList = (a, b) => HH_N.map((n, i) => `${n} Rs ${a[i]} then Rs ${b[i]}`).join('; ');

// 2. Sunrise Bakery: input prices (Rs per unit). Butter per kg and eggs per dozen; then butter per 100 g and eggs per piece.
export const BK_N = ['flour (kg)', 'sugar (kg)', 'butter (kg)', 'eggs (dozen)'];
export const BK = agg([40, 40, 400, 60], [44, 46, 480, 78]);
check(BK.sp0, 540, 0, 'bakery base total');
check(BK.sp1, 648, 0, 'bakery current total');
check(BK.aggI, 120, 2, 'bakery simple aggregative');
assert.deepEqual(BK.rel, [110, 115, 120, 130]);
check(BK.relI, 118.75, 2, 'bakery relatives mean');
export const BKU_N = ['flour (kg)', 'sugar (kg)', 'butter (100 g)', 'eggs (piece)'];
export const BKU = agg([40, 40, 400 / 10, 60 / 12], [44, 46, 480 / 10, 78 / 12]);
assert.deepEqual(BKU.p0, [40, 40, 40, 5]);
assert.deepEqual(BKU.p1, [44, 46, 48, 6.5]);
check(BKU.sp0, 125, 0, 'bakery other-unit base total');
check(BKU.sp1, 144.5, 1, 'bakery other-unit current total');
check(BKU.aggI, 115.6, 2, 'bakery other-unit aggregative');
same(BKU.relI, BK.relI, 'relatives do not depend on units');

// 3. Pinecrest Stationers: notebook, pen, geometry box, file folder; units sold in two terms.
export const ST_N = ['notebook', 'pen', 'geometry box', 'file folder'];
export const ST = agg([20, 10, 50, 5], [25, 12, 60, 6], [16, 2, 3, 2], [12, 3, 13, 16]);
check(ST.p1q0, 616, 0, 'stationers sum p1q0');
check(ST.p0q0, 500, 0, 'stationers sum p0q0');
check(ST.L, 123.2, 2, 'stationers Laspeyres');
check(ST.p1q1, 1212, 0, 'stationers sum p1q1');
check(ST.p0q1, 1000, 0, 'stationers sum p0q1');
check(ST.P, 121.2, 2, 'stationers Paasche');

// 4. Shanti Canteen: three items, plates sold a day.
export const CN_N = ['meal plate', 'sandwich', 'fruit juice'];
export const CN = agg([50, 30, 20], [60, 36, 28], [16, 5, 15], [8, 4, 6]);
check(CN.p1q0, 1560, 0, 'canteen sum p1q0');
check(CN.p0q0, 1250, 0, 'canteen sum p0q0');
check(CN.L, 124.8, 2, 'canteen Laspeyres');
check(CN.p1q1, 792, 0, 'canteen sum p1q1');
check(CN.p0q1, 640, 0, 'canteen sum p0q1');
check(CN.P, 123.75, 2, 'canteen Paasche');

// 5. Tulsi Juice Bar: three juices, glasses sold in a week.
export const JB_N = ['lemon', 'mango', 'sugarcane'];
export const JB = agg([8, 15, 25], [10, 18, 30], [20, 6, 6], [15, 14, 6]);
check(JB.p1q0, 488, 0, 'juice bar sum p1q0');
check(JB.p0q0, 400, 0, 'juice bar sum p0q0');
check(JB.L, 122, 2, 'juice bar Laspeyres');
check(JB.p1q1, 582, 0, 'juice bar sum p1q1');
check(JB.p0q1, 480, 0, 'juice bar sum p0q1');
check(JB.P, 121.25, 2, 'juice bar Paasche');
assert.deepEqual(JB.rel, [125, 120, 120]);

// 6. Family budget of an imagined household of Bhavnagar Colony: price relatives with budget weights (CPI method).
export const FB_N = ['wheat flour (kg)', 'cooking oil (litre)', 'milk (litre)', 'gas cylinder', 'bus fare (trip)', 'school notebooks (set)'];
export const FB_P0 = [30, 80, 40, 800, 20, 40];
export const FB_P1 = [36, 100, 46, 880, 30, 44];
export const FB_W = [30, 10, 20, 15, 10, 15];
export const FB_R = FB_P0.map((p, i) => rnd((FB_P1[i] / p) * 100, 6));
assert.deepEqual(FB_R, [120, 125, 115, 110, 150, 110]);
export const FB_RW = FB_R.map((r, i) => r * FB_W[i]);
assert.deepEqual(FB_RW, [3600, 1250, 2300, 1650, 1500, 1650]);
export const fbCPI = indexWeightedRelatives(FB_P0, FB_P1, FB_W);
check(sum(FB_W), 100, 0, 'family budget weights total');
check(sum(FB_RW), 11950, 0, 'family budget sum RW');
check(fbCPI, 119.5, 2, 'family budget CPI');

// 7. Madhupur Mill Colony: five groups; weights are base-year monthly spending (Rs) of a worker family.
export const ML_N = ['food', 'housing', 'clothing', 'fuel and light', 'other items'];
export const ML_R = [130, 110, 120, 150, 100];
export const ML_W = [5000, 2500, 1000, 1000, 500];
export const ML_RW = ML_R.map((r, i) => r * ML_W[i]);
export const mlCPI = sum(ML_RW) / sum(ML_W);
check(sum(ML_W), 10000, 0, 'mill colony weights total');
check(sum(ML_RW), 1245000, 0, 'mill colony sum RW');
check(mlCPI, 124.5, 2, 'mill colony CPI');

// 8. Rani Farm Cooperative: three groups, weights 2, 3, 5.
export const RF_R = [140, 120, 110];
export const RF_W = [2, 3, 5];
export const rfCPI = sum(RF_R.map((r, i) => r * RF_W[i])) / sum(RF_W);
check(rfCPI, 119, 2, 'farm cooperative index');

// 9. Rivergate Industrial Estate: output index (IIP method): quantities and weights.
export const IP_N = ['mining', 'manufacturing', 'electricity'];
export const IP_Q0 = [400, 500, 250];
export const IP_Q1 = [420, 600, 350];
export const IP_W = [20, 60, 20];
export const IP_R = IP_Q0.map((q, i) => rnd((IP_Q1[i] / q) * 100, 6));
assert.deepEqual(IP_R, [105, 120, 140]);
export const ipI = sum(IP_R.map((r, i) => r * IP_W[i])) / sum(IP_W);
check(sum(IP_R.map((r, i) => r * IP_W[i])), 12100, 0, 'estate sum RW');
check(ipI, 121, 2, 'estate output index');

// 10. Consumer price index of the imagined Bhavnagar Colony over six years (Year 0 is the base, 100) and inflation.
export const YR = [0, 1, 2, 3, 4, 5];
export const CP = [100, 125, 130, 143, 150, 165];
export const INF = CP.slice(1).map((v, i) => inflation(CP[i], v));
check(INF[0], 25, 2, 'inflation year 1');
check(INF[1], 4, 2, 'inflation year 2');
check(INF[2], 10, 2, 'inflation year 3');
check(INF[3], 4.9, 2, 'inflation year 4');
check(INF[4], 10, 2, 'inflation year 5');
// Rani's money wage and real wage (Rs a month) in years 1 to 3.
export const WG = [15000, 16900, 17160];
export const RW = WG.map((w, i) => rnd((w / CP[i + 1]) * 100, 6));
assert.deepEqual(RW, [12000, 13000, 12000]);
// A wage that keeps the Year 1 real wage in Year 5: 12000 * 165 / 100.
export const wageY5 = (RW[0] * CP[5]) / 100;
check(wageY5, 19800, 0, 'wage that keeps the real wage in year 5');
// Dearness: salary Rs 24000 when the index is 125; index rises to 150.
export const DA = { w: 24000, i0: 125, i1: 150 };
DA.new = (DA.w * DA.i1) / DA.i0;
check(DA.new, 28800, 0, 'adjusted salary');
// Kaushal Printers: sales (Rs lakh) in years 1 to 3, nominal and real (Year 1..3 index 125, 130, 143).
export const KP = [250, 286, 343.2];
export const KPr = KP.map((v, i) => (v / CP[i + 1]) * 100);
check(KPr[0], 200, 2, 'real sales year 1');
check(KPr[1], 220, 2, 'real sales year 2');
check(KPr[2], 240, 2, 'real sales year 3');
export const kpNom = ((KP[2] - KP[0]) / KP[0]) * 100;
export const kpReal = ((KPr[2] - KPr[0]) / KPr[0]) * 100;
check(kpNom, 37.28, 2, 'nominal growth');
check(kpReal, 20, 2, 'real growth');
// Purchasing power of Rs 100 when the index is 125 (base-year rupees).
export const PP = (100 / 125) * 100;
check(PP, 80, 2, 'purchasing power of Rs 100');
// Missing values.
export const MS = { sp0: 250, idx: 128 };
MS.sp1 = (MS.sp0 * MS.idx) / 100;
check(MS.sp1, 320, 2, 'missing current price total');
export const LP = { base: 2400, idx: 125 };
LP.now = (LP.base * LP.idx) / 100;
check(LP.now, 3000, 2, 'cost of the base basket now');
export const IN = { prev: 130, rate: 10 };
IN.next = IN.prev * (1 + IN.rate / 100);
check(IN.next, 143, 2, 'index after 10 per cent inflation');
export const FALL = { sp0: 500, sp1: 475 };
FALL.idx = (FALL.sp1 / FALL.sp0) * 100;
check(FALL.idx, 95, 2, 'index below 100');
export const PR = { p0: 60, p1: 81 };
PR.rel = (PR.p1 / PR.p0) * 100;
check(PR.rel, 135, 2, 'single price relative');
export const GS = { n: 3, relSum: 330 };
GS.idx = GS.relSum / GS.n;
check(GS.idx, 110, 2, 'mean of relatives from a given total');
export const DIFF = ST.L - ST.P;
check(DIFF, 2, 2, 'Laspeyres minus Paasche for the stationers');
// Ashoka Mess (imagined): wage rises 8 per cent while the index rises from 125 to 150.
export const AM = { w0: 20000, w1: 21600, i0: 125, i1: 150 };
AM.r0 = (AM.w0 / AM.i0) * 100;
AM.r1 = (AM.w1 / AM.i1) * 100;
check(AM.r0, 16000, 0, 'mess real wage before');
check(AM.r1, 14400, 0, 'mess real wage after');
export const amFall = ((AM.r0 - AM.r1) / AM.r0) * 100;
check(amFall, 10, 2, 'fall in the real wage');

// ================================================================ t01 Types: WPI, CPI and IIP
Q('m_index_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which statement best defines an index number?',
  opts: ['A statistical device that measures the relative change in a variable or a group of related variables over time, compared with a base period', 'The simple arithmetic average of all the prices in an economy', 'The total value of all goods produced in a year', 'The difference between the highest and the lowest price in a market'],
  sol: 'An index number shows how a variable, or a group of related variables, has changed relative to a base period. It is not a plain average, a total of output value or a range of prices.',
}));
Q('m_base', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In the usual convention, the value of an index number in its base period is taken as',
  opts: ['100', '0', '1', '1000'],
  sol: 'The base period is the reference point, and its index is set at 100, so that a later value above 100 shows a rise and a value below 100 shows a fall.',
}));
Q('m_base_choice', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The statistician of the imagined Bhavnagar Colony Welfare Society must choose a base year for the colony\'s consumer price index. Which choice is most sensible?',
  opts: ['A normal year, free of unusual events such as a long shortage or a flood', 'The year in which prices were highest, so that every later index is below 100', 'A year chosen at random from the last century', 'The year with the most unusual events, to show how prices react'],
  sol: 'A base year should be a normal one, so that the comparison is not distorted by an abnormal event. A year of extreme prices or of unusual events would make every later comparison misleading.',
}));
Q('m_wpi', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The wholesale price index measures the change in',
  opts: ['the general price level of goods traded in bulk', 'the retail prices paid by a family of industrial workers', 'the volume of industrial output', 'the share prices of thirty companies'],
  sol: 'The wholesale price index follows the prices of goods traded in bulk. Retail prices belong to the consumer price index, output volume to the index of industrial production and share prices to the Sensex.',
}));
Q('m_cpi_what', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The consumer price index differs from the wholesale price index mainly because it',
  opts: ['tracks retail prices of a fixed basket of goods and services consumed by a defined group', 'tracks only the prices of machines and raw materials', 'measures the quantity of goods produced by factories', 'measures the number of people employed'],
  sol: 'The consumer price index follows retail prices of a fixed basket bought by a defined group of consumers, so it reflects the cost of living of that group. The other options describe quantities or capital goods, not retail prices.',
}));
Q('m_cpi_kinds', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which of these is commonly named as a kind of consumer price index?',
  opts: ['The index for agricultural labourers', 'The index for share brokers', 'The index of coal output', 'The index of retail shops opened'],
  sol: 'As commonly taught, consumer price indices are compiled for industrial workers, for agricultural labourers, and for rural, urban and combined populations. A share-broker index, a coal output index or a shop-count index is not a consumer price index.',
}));
Q('m_cpi_use', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The imagined Sundaram Textile Works revises the dearness allowance of its employees each half year. Which index would it most naturally use?',
  opts: ['The consumer price index', 'The index of industrial production', 'The Sensex', 'The index of mining output'],
  sol: 'Dearness allowance is meant to protect the purchasing power of wages against a rise in the cost of living, which the consumer price index measures. Output indices and a share index say nothing of what workers pay for goods.',
}));
Q('m_iip', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The index of industrial production measures the change in',
  opts: ['the volume of industrial output, such as mining, manufacturing and electricity', 'the retail price of manufactured goods', 'the wages of factory workers', 'the profits of listed companies'],
  sol: 'The index of industrial production follows the physical volume of output of industries such as mining, manufacturing and electricity. It is a quantity index, not a price index.',
}));
Q('m_iip_vs', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'A planner at the imagined Rivergate Industrial Estate wants to know whether the quantity of goods made there has risen over three years, whatever has happened to prices. The best index is',
  opts: ['an index of industrial production, which measures volume', 'a wholesale price index, which measures bulk prices', 'a consumer price index, which measures retail prices', 'the Sensex, which measures share prices'],
  sol: 'The question is about the quantity produced, so a volume index of production is needed. The other three are price indices and would change even if output stayed the same.',
}));
Q('m_pick_wage', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A trade union of the imagined Bhavnagar Colony Cooperative Society wants to show that its members\' cost of living has risen faster than their pay. Which index is the most relevant evidence?',
  opts: ['The consumer price index of the group of workers concerned', 'The index of industrial production', 'The wholesale price index of raw materials', 'The Sensex'],
  sol: 'The union is concerned with what its members pay in shops, which the consumer price index for the relevant group measures. The other indices describe output, bulk prices or share prices.',
}));
Q('m_uses', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of these is NOT a use of index numbers?',
  opts: ['Fixing the exact price of every good in a shop', 'Measuring the rate of inflation', 'Deflating money values to real terms', 'Adjusting wages and allowances'],
  sol: 'Index numbers show changes over time; they do not fix the price of any good. Measuring inflation, deflating money values and adjusting wages are standard uses.',
}));
Q('m_weights', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'In the imagined Madhupur Mill Colony, a family spends far more on food than on tea. If the consumer price index gave both items the same importance, the index would',
  opts: ['misrepresent the cost of living, because a change in the price of food matters more to the family', 'be exact, because every item is equally important to every family', 'stay at 100 whatever the prices', 'measure output and not prices'],
  sol: 'Items matter in proportion to their share in the family\'s spending, so weights are needed. Equal importance would let a change in the price of tea count as much as a change in the price of food, which distorts the cost of living.',
}));
Q('m_index_125', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'The retail price index of the imagined Bhavnagar Colony is 125 when the base year is 100. This shows that retail prices in the colony are, on average,',
  opts: ['25 per cent higher than in the base year', '125 per cent higher than in the base year', '25 per cent lower than in the base year', 'the same as in the base year'],
  sol: `An index of 125 against a base of 100 means a rise of ${S(125 - 100)} points on 100, that is ${S(((125 - 100) / 100) * 100)} per cent. It is not 125 per cent higher, and prices are not lower or unchanged.`,
}));
Q('m_below100', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The imagined Palsana Dairy Union finds that the total of the current prices of its inputs is Rs ${FALL.sp1} against Rs ${FALL.sp0} in the base year. Its simple aggregative price index is`,
  opts: [`${S(FALL.idx)}, which shows that prices have fallen by ${S(100 - FALL.idx)} per cent`, `${S(FALL.idx)}, which shows that prices have risen by ${S(100 - FALL.idx)} per cent`, `${S(100 - FALL.idx)}, which shows that prices have fallen`, '100, which shows no change'],
  sol: `Index = ${FALL.sp1} ÷ ${FALL.sp0} × 100 = ${S(FALL.idx)}. A value below 100 shows a fall of ${S(100 - FALL.idx)} per cent. The other options misread either the value or its direction.`,
}));

// ================================================================ t02 Methods and inflation
Q('m_agg_formula', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The simple aggregative price index for the current year is found by',
  opts: ['dividing the total of the current prices by the total of the base-year prices and multiplying by 100', 'multiplying the total of the current prices by the total of the base-year prices', 'subtracting the base-year prices from the current prices and dividing by 100', 'adding the quantities bought and dividing by the number of items'],
  sol: 'The formula is the total of current prices divided by the total of base-year prices, times 100. The other options do not give a ratio of price totals.',
}));
Q('m_unit_flaw', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The main limitation of the simple aggregative method is that',
  opts: ['the index depends on the units in which the prices of the items are quoted', 'it cannot be worked out when prices rise', 'it always gives a value of 100', 'it needs the quantities of every item'],
  sol: 'The method adds up prices, so quoting one item per dozen or per piece changes the total and the index. It works for rising prices, does not always give 100 and needs no quantities.',
}));
Q('m_laspeyres', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In the Laspeyres method the weights are',
  opts: ['the quantities of the base year', 'the quantities of the current year', 'the prices of the current year', 'equal for all items'],
  sol: 'The Laspeyres index prices the base-year basket at current and at base-year prices, so base-year quantities are its weights. Current-year quantities belong to the Paasche method.',
}));
Q('m_paasche', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The Paasche price index asks what',
  opts: ['the current-year basket costs at current prices compared with its cost at base-year prices', 'the base-year basket costs at current prices compared with its cost at base-year prices', 'the average of the price relatives is', 'the difference between the highest and the lowest price is'],
  sol: 'The Paasche index compares the cost of the current-year quantities at current prices with their cost at base-year prices. Using the base-year basket is the Laspeyres idea.',
}));
Q('m_cpi_method', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'As commonly taught, the consumer price index is computed as',
  opts: ['a weighted average of price relatives, with weights from the family budget', 'a simple total of prices', 'the total of quantities produced', 'the highest price relative'],
  sol: 'Price relatives are multiplied by family-budget weights, added, and divided by the total weight. A simple total of prices would ignore how much each item matters to the family.',
}));
Q('m_relative', mcq({
  t: 2, d: 2, c: 'application',
  stem: `At an imagined Bhavnagar Colony fair, the price of a shirt was Rs ${PR.p0} in the base year and Rs ${PR.p1} this year. Its price relative is`,
  opts: [S(PR.rel), S(100 - PR.rel), S(PR.p1 - PR.p0), S((PR.p0 / PR.p1) * 100)],
  sol: `Price relative = current price ÷ base price × 100 = ${PR.p1} ÷ ${PR.p0} × 100 = ${S(PR.rel)}. Dividing the other way round, or taking a difference, does not give a relative.`,
}));
Q('m_infl', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Inflation is best described as',
  opts: ['a sustained rise in the general price level', 'a single rise in the price of one good', 'a fall in the general price level', 'a rise in the volume of production'],
  sol: 'Inflation is a sustained rise in the general price level, not a single change in one price. A fall in the general level is deflation, and output volume is a different matter.',
}));
Q('m_infl_formula', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The rate of inflation between two years, from a price index, is',
  opts: ['the change in the index divided by the earlier index, multiplied by 100', 'the later index divided by 100', 'the sum of the two indices', 'the earlier index divided by the later index'],
  sol: 'Rate of inflation = (later index − earlier index) ÷ earlier index × 100. The other expressions do not measure a percentage change.',
}));
Q('m_real_wage', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In the imagined Lakshmi Weaving Cooperative, the money wage of a weaver rises by 6 per cent in a year while the consumer price index rises by 9 per cent. The real wage',
  opts: ['falls, because prices rose faster than the wage', 'rises, because the money wage rose', 'stays the same, because both rose', 'cannot be judged without the price of cloth'],
  sol: 'When prices rise faster than the money wage, the wage buys less, so the real wage falls. A rise in money wage does not raise the real wage unless it outpaces prices.',
}));
Q('m_purch', mcq({
  t: 2, d: 3, c: 'application',
  stem: `The consumer price index of the imagined Bhavnagar Colony stands at 125 against a base of 100. Measured in base-year rupees, the purchasing power of Rs 100 is about`,
  opts: [`Rs ${S(PP)}`, 'Rs 125', 'Rs 25', 'Rs 100'],
  sol: `Purchasing power = 100 ÷ index × 100 = 100 ÷ 125 × 100 = Rs ${S(PP)}. When prices are higher than in the base year, a rupee buys less.`,
}));
Q('m_lp_gap', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: `For the imagined Pinecrest Stationers, the Laspeyres index is ${S(ST.L)} and the Paasche index is ${S(ST.P)}. A sensible reason for the Laspeyres value being higher is that`,
  opts: ['in the current year buyers bought less of the items whose prices rose most, which the base-year weights do not show', 'the Paasche method always ignores prices', 'the Laspeyres method uses current-year quantities', 'prices did not change'],
  sol: `Base-year weights keep the earlier buying pattern, while current-year weights reflect the shift away from items that became dearer. In the data the quantity of the notebook fell from ${ST.q0[0]} to ${ST.q1[0]}. The Paasche method does use prices, Laspeyres uses base-year quantities, and prices did change.`,
}));

// ---- assertion-reason
Q('ar_base', ar({
  t: 1, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: 'The index number of the base period is taken as 100.',
  r: 'The base period is the reference with which the other periods are compared.',
  sol: 'Both are true and R explains A. Since every other period is compared with the base, its own index is set at the convenient value of 100.',
}));
Q('ar_units', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The simple aggregative index changes if the unit of one item is changed from a dozen to a piece.',
  r: 'The method adds prices that are quoted in different units.',
  sol: 'Both are true and R explains A. A change of unit alters the price of that item and so the total, which is why the method is sensitive to units.',
}));
Q('ar_iip', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'The index of industrial production measures the change in the prices of industrial goods.',
  r: 'It covers industries such as mining, manufacturing and electricity.',
  sol: 'A is false: the index measures the volume of output, not prices. R is true: those industries are covered.',
}));
Q('ar_cpi_wpi', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The consumer price index tracks the retail prices of a basket bought by a defined group.',
  r: 'The wholesale price index tracks the prices of goods traded in bulk.',
  sol: 'Both statements are true, but the second does not explain the first. They describe two different indices.',
}));
Q('ar_zero', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'An index of 110 against a base of 100 shows that prices have risen by 10 per cent.',
  r: 'The base period of an index number is always taken as 0.',
  sol: 'A is true: 110 is 10 per cent above 100. R is false, since the base period is taken as 100, not 0.',
}));

// ---- true-false
Q('tf_wpi_retail', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The wholesale price index records the retail prices paid by a family at the corner shop of the imagined Bhavnagar Colony.',
  sol: 'The wholesale price index records the prices of goods traded in bulk. Retail prices belong to the consumer price index.',
}));
Q('tf_slow', tf({
  t: 2, d: 3, c: 'analysis', ans: false,
  stem: `True or false? In the imagined Bhavnagar Colony the index rises from ${CP[3]} to ${CP[4]}, so the rate of inflation is ${S(INF[3])} per cent, lower than the ${S(INF[2])} per cent of the previous year. This shows that prices are now falling.`,
  sol: 'A lower rate of inflation means prices are still rising, only more slowly. Prices fall only when the index itself falls.',
}));
Q('tf_paasche', tf({
  t: 2, d: 1, c: 'recall', ans: true,
  stem: 'True or false? The Paasche index uses the quantities of the current year as weights.',
  sol: 'In the Paasche method the weights are current-year quantities; Laspeyres uses base-year quantities.',
}));

// ---- fill in the blanks
Q('fb_relative', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'A price relative is the price of the current year divided by the price of the ___ year, multiplied by 100.',
  acc: [['base', 'base period']],
  sol: 'A price relative compares the current price with the base-year price.',
}));
Q('fb_real_wage', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'Real wage is the money wage divided by the ___ and multiplied by 100.',
  acc: [['consumer price index', 'cpi', 'price index', 'index']],
  sol: 'Dividing the money wage by the consumer price index and multiplying by 100 gives the real wage.',
}));

// ---- match
Q('mt_indices', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each index with what it measures.',
  pairs: [
    ['Wholesale price index', 'Change in the general price level of goods traded in bulk'],
    ['Consumer price index', 'Change in retail prices of a basket consumed by a defined group'],
    ['Index of industrial production', 'Change in the volume of output of mining, manufacturing and electricity'],
    ['Sensex', 'Movement of the share prices of thirty companies of the Bombay Stock Exchange'],
  ],
  sol: 'Each index has its own subject: bulk prices, retail prices of a basket, volume of industrial output, and share prices.',
}));
Q('mt_methods', match({
  t: 2, d: 2, c: 'understanding',
  stem: 'Match each method of constructing a price index with its description.',
  pairs: [
    ['Simple aggregative method', 'Total of current prices divided by total of base-year prices, times 100'],
    ['Simple average of price relatives', 'Mean of the price relatives of the items'],
    ['Laspeyres method', 'Weights are the quantities of the base year'],
    ['Paasche method', 'Weights are the quantities of the current year'],
  ],
  sol: 'The first two methods are unweighted, and the last two are weighted aggregative methods that differ in the year whose quantities are used.',
}));

// ---- ordering
Q('ord_cpi', ord({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Arrange the steps of constructing a consumer price index by the weighted average of price relatives for the imagined Madhupur Mill Colony.',
  items: [
    'Find the price relative of each item or group',
    'Multiply each relative by its weight from the family budget',
    'Add the products to get the total of relatives times weights',
    'Divide the total by the sum of the weights',
  ],
  sol: 'The relatives come first, then they are weighted, the weighted figures are added, and the division by the total weight comes last.',
}));
Q('ord_laspeyres', ord({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: 'Arrange the steps of working out a Laspeyres index for the imagined Shanti Canteen in a sensible order.',
  items: [
    'Write down the base-year quantities as weights',
    'Find the cost of the base-year quantities at current prices and at base-year prices',
    'Divide the cost at current prices by the cost at base-year prices',
    'Multiply the ratio by 100',
  ],
  sol: 'The weights are fixed first, the two costs are found, the ratio of costs is formed and finally scaled by 100.',
}));

// ---- numerical
Q('n_bakery_agg', num({
  t: 2, d: 2, c: 'application', value: rnd(BK.aggI, 2), unit: null, tol: 0.01,
  stem: `The imagined Sunrise Bakery noted the prices of four inputs in the base year and this year: ${BK_N.map((n, i) => `${n} Rs ${BK.p0[i]} then Rs ${BK.p1[i]}`).join('; ')}. Find the simple aggregative price index for this year.`,
  sol: `Step 1: Σp0 = ${J(BK.p0)} added = ${BK.sp0}; Σp1 = ${J(BK.p1)} added = ${BK.sp1}.\nStep 2: Index = ${BK.sp1} ÷ ${BK.sp0} × 100 = ${S(BK.aggI)}.`,
}));
Q('n_bakery_rel', num({
  t: 2, d: 3, c: 'application', value: rnd(BK.relI, 2), unit: null, tol: 0.01,
  stem: `For the Sunrise Bakery inputs, ${BK_N.map((n, i) => `${n} Rs ${BK.p0[i]} then Rs ${BK.p1[i]}`).join('; ')}, find the index by the simple average of price relatives.`,
  sol: `Step 1: The relatives are ${J(BK.rel)}.\nStep 2: Their sum is ${sum(BK.rel)}.\nStep 3: Index = ${sum(BK.rel)} ÷ ${BK.rel.length} = ${S(BK.relI)}.`,
}));
Q('n_hh_rel', num({
  t: 2, d: 3, c: 'application', value: rnd(HH.relI, 2), unit: null, tol: 0.01,
  stem: `An imagined household of Bhavnagar Colony noted its prices (Rs, base year then current year): ${hhList(HH.p0, HH.p1)}. Find the price index by the simple average of price relatives, correct to two decimals.`,
  sol: `Step 1: Relatives are ${J(HH.rel)}.\nStep 2: Sum = ${S(sum(HH.rel))}.\nStep 3: Index = ${S(sum(HH.rel))} ÷ ${HH.rel.length} = ${S(HH.relI)}.`,
}));
Q('n_stat_L', num({
  t: 2, d: 3, c: 'application', value: rnd(ST.L, 2), unit: null, tol: 0.01,
  stem: `The imagined Pinecrest Stationers sold ${J(ST.q0)} units of ${J(ST_N)} respectively in the base term, at base prices of Rs ${J(ST.p0)}; the current prices are Rs ${J(ST.p1)}. Find the Laspeyres price index.`,
  sol: `Step 1: Σp0q0 = ${ST.p0.map((p, i) => `${p}×${ST.q0[i]}`).join(' + ')} = ${ST.p0q0}.\nStep 2: Σp1q0 = ${ST.p1.map((p, i) => `${p}×${ST.q0[i]}`).join(' + ')} = ${ST.p1q0}.\nStep 3: Index = ${ST.p1q0} ÷ ${ST.p0q0} × 100 = ${S(ST.L)}.`,
}));
Q('n_stat_P', num({
  t: 2, d: 3, c: 'application', value: rnd(ST.P, 2), unit: null, tol: 0.01,
  stem: `In the current term the imagined Pinecrest Stationers sold ${J(ST.q1)} units of ${J(ST_N)} respectively. The base prices are Rs ${J(ST.p0)} and the current prices are Rs ${J(ST.p1)}. Find the Paasche price index.`,
  sol: `Step 1: Σp0q1 = ${ST.p0.map((p, i) => `${p}×${ST.q1[i]}`).join(' + ')} = ${ST.p0q1}.\nStep 2: Σp1q1 = ${ST.p1.map((p, i) => `${p}×${ST.q1[i]}`).join(' + ')} = ${ST.p1q1}.\nStep 3: Index = ${ST.p1q1} ÷ ${ST.p0q1} × 100 = ${S(ST.P)}.`,
}));
Q('n_canteen_L', num({
  t: 2, d: 3, c: 'application', value: rnd(CN.L, 2), unit: null, tol: 0.01,
  stem: `At the imagined Shanti Canteen the base-year prices of a meal plate, a sandwich and a fruit juice were Rs ${J(CN.p0)} and the current prices are Rs ${J(CN.p1)}. The base-year sales were ${J(CN.q0)} units a day. Find the Laspeyres index.`,
  sol: `Step 1: Σp0q0 = ${CN.p0.map((p, i) => `${p}×${CN.q0[i]}`).join(' + ')} = ${CN.p0q0}.\nStep 2: Σp1q0 = ${CN.p1.map((p, i) => `${p}×${CN.q0[i]}`).join(' + ')} = ${CN.p1q0}.\nStep 3: Index = ${CN.p1q0} ÷ ${CN.p0q0} × 100 = ${S(CN.L)}.`,
}));
Q('n_cpi_fb', num({
  t: 2, d: 4, c: 'application', value: rnd(fbCPI, 2), unit: null, tol: 0.01,
  stem: `An imagined family of Bhavnagar Colony has these budget weights and prices (base year then current year): ${FB_N.map((n, i) => `${n}, weight ${FB_W[i]}, Rs ${FB_P0[i]} then Rs ${FB_P1[i]}`).join('; ')}. Find the consumer price index by the weighted average of price relatives.`,
  sol: `Step 1: Relatives R = ${J(FB_R)}.\nStep 2: RW = ${J(FB_RW)}, so ΣRW = ${sum(FB_RW)}.\nStep 3: ΣW = ${sum(FB_W)}.\nStep 4: Index = ${sum(FB_RW)} ÷ ${sum(FB_W)} = ${S(fbCPI)}.`,
}));
Q('n_iip', num({
  t: 1, d: 3, c: 'application', value: rnd(ipI, 2), unit: null, tol: 0.01,
  stem: `The imagined Rivergate Industrial Estate produced ${J(IP_Q0)} units of mining, manufacturing and electricity output in the base year and ${J(IP_Q1)} units this year, with weights ${J(IP_W)}. Find the output index as the weighted average of the output relatives.`,
  sol: `Step 1: Relatives = ${J(IP_R)}.\nStep 2: ΣRW = ${IP_R.map((r, i) => `${r}×${IP_W[i]}`).join(' + ')} = ${sum(IP_R.map((r, i) => r * IP_W[i]))}.\nStep 3: Index = ${sum(IP_R.map((r, i) => r * IP_W[i]))} ÷ ${sum(IP_W)} = ${S(ipI)}.`,
}));
Q('n_infl_y3', num({
  t: 2, d: 2, c: 'application', value: rnd(INF[2], 2), unit: 'per cent', tol: 0.01,
  stem: `The consumer price index of the imagined Bhavnagar Colony was ${CP[2]} in Year 2 and ${CP[3]} in Year 3. Find the rate of inflation in Year 3.`,
  sol: `Step 1: Change in the index = ${CP[3]} − ${CP[2]} = ${CP[3] - CP[2]}.\nStep 2: Rate = ${CP[3] - CP[2]} ÷ ${CP[2]} × 100 = ${S(INF[2])} per cent.`,
}));
Q('n_infl_y4', num({
  t: 2, d: 3, c: 'application', value: rnd(INF[3], 2), unit: 'per cent', tol: 0.01,
  stem: `The price index of the imagined Bhavnagar Colony was ${CP[3]} in Year 3 and ${CP[4]} in Year 4. Find the rate of inflation in Year 4, correct to two decimals.`,
  sol: `Step 1: Change in the index = ${CP[4]} − ${CP[3]} = ${CP[4] - CP[3]}.\nStep 2: Rate = ${CP[4] - CP[3]} ÷ ${CP[3]} × 100 = ${S(INF[3])} per cent.`,
}));
Q('n_real_wage', num({
  t: 2, d: 3, c: 'application', value: rnd(RW[1], 2), unit: 'rupees', tol: 0.01,
  stem: `An imagined clerk of the Bhavnagar Colony Cooperative Society earned Rs ${WG[1]} a month in Year 2, when the consumer price index was ${CP[2]}. Find the real wage.`,
  sol: `Step 1: Real wage = money wage ÷ index × 100.\nStep 2: ${WG[1]} ÷ ${CP[2]} × 100 = ${S(RW[1])} rupees.`,
}));
Q('n_da', num({
  t: 2, d: 3, c: 'application', value: rnd(DA.new, 2), unit: 'rupees', tol: 0.01,
  stem: `An imagined employee of the Sundaram Textile Works earns Rs ${DA.w} a month when the consumer price index is ${DA.i0}. The index rises to ${DA.i1}. What monthly pay would keep the real wage unchanged?`,
  sol: `Step 1: Real wage now = ${DA.w} ÷ ${DA.i0} × 100 = ${S((DA.w / DA.i0) * 100)}.\nStep 2: Pay needed = ${S((DA.w / DA.i0) * 100)} × ${DA.i1} ÷ 100 = ${S(DA.new)} rupees.`,
}));
Q('n_deflate', num({
  t: 1, d: 4, c: 'application', value: rnd(KPr[1], 2), unit: 'Rs lakh', tol: 0.01,
  stem: `The imagined Kaushal Printers had sales of Rs ${KP[1]} lakh in Year 2, when the consumer price index of its town was ${CP[2]}. Express the sales in terms of base-year prices (real sales).`,
  sol: `Step 1: Real value = money value ÷ index × 100.\nStep 2: ${KP[1]} ÷ ${CP[2]} × 100 = ${S(KPr[1])} Rs lakh.`,
}));
Q('n_missing', num({
  t: 2, d: 4, c: 'application', value: rnd(MS.sp1, 2), unit: 'rupees', tol: 0.01,
  stem: `The imagined Palsana Dairy Union paid Rs ${MS.sp0} for a set of inputs in the base year. Its simple aggregative price index is now ${MS.idx}. Find the total of the current prices of the same set.`,
  sol: `Step 1: Index = Σp1 ÷ Σp0 × 100, so Σp1 = index × Σp0 ÷ 100.\nStep 2: Σp1 = ${MS.idx} × ${MS.sp0} ÷ 100 = ${S(MS.sp1)} rupees.`,
}));

// ---- short, 2 marks
Q('s2_def', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Define an index number and say what is meant by the base period.',
  model: 'An **index number** is a statistical device that measures the relative change in a variable or a group of related variables over time. The **base period** is the period with which other periods are compared; its index is taken as **100**.',
  sol: 'Definition; base period.',
  scheme: [['Definition of an index number', 1], ['Base period and its value of 100', 1]],
}));
Q('s2_wpi', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What does the wholesale price index measure, and which office compiles it, as commonly taught?',
  model: 'This index tracks how the **general price level of goods sold in bulk** changes over time. The compiler, as commonly taught, is the **Office of the Economic Adviser** in the Ministry of Commerce and Industry.',
  sol: 'What it measures; who compiles it.',
  scheme: [['Change in the general price level of goods traded in bulk', 1], ['Office of the Economic Adviser, Ministry of Commerce and Industry', 1]],
}));
Q('s2_cpi_use', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two uses of the consumer price index.',
  model: 'The consumer price index is used to **measure the cost of living and inflation** faced by a group of consumers, and to **adjust wages and dearness allowance** so that workers keep their purchasing power.',
  sol: 'Any two uses.',
  scheme: [['First use', 1], ['Second use', 1]],
}));
Q('s2_iip_diff', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'How does the index of industrial production differ from the consumer price index in what it measures?',
  model: 'The index of industrial production measures the change in the **volume of output** of mining, manufacturing and electricity, so it is a **quantity** index. The consumer price index measures the change in the **retail prices** paid by consumers, so it is a **price** index.',
  sol: 'Volume against retail price.',
  scheme: [['Industrial production: volume of output', 1], ['Consumer price index: retail prices', 1]],
}));
Q('s2_sensex', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'What is the Sensex? Name the body whose shares it follows.',
  model: 'It is the **share-market index** of the **Bombay Stock Exchange**. It is built on the share prices of **thirty companies** listed there, and so shows the general movement of the market.',
  sol: 'Sensex as the Bombay Stock Exchange index of thirty companies.',
  scheme: [['Stock market index', 1], ['Bombay Stock Exchange, thirty companies', 1]],
}));
Q('s2_base', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why should the base year of a price index be a normal year? Illustrate with an imagined case from Bhavnagar Colony.',
  model: 'A base year is the yardstick for every later comparison, so an abnormal year would distort it. If the imagined colony chose a year of acute shortage, when prices were unusually high, every later index would look **lower** than the real change in prices.',
  sol: 'Base as yardstick; distortion by an abnormal year.',
  scheme: [['Base is the yardstick for comparison', 1], ['Illustration of distortion', 1]],
}));
Q('s2_unit', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'State one limitation of the simple aggregative method and one way of overcoming it.',
  model: 'The simple aggregative index depends on the **units** in which prices are quoted, for example per dozen or per piece. It is overcome by using **price relatives**, which are pure numbers, or by using **weights**.',
  sol: 'Unit dependence; relatives or weights.',
  scheme: [['Limitation: depends on units', 1], ['A remedy', 1]],
}));
Q('s2_infl', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Define inflation and write the formula for its rate from a price index.',
  model: '**Inflation** is a sustained rise in the general price level, not a one-time rise in a single price. Its rate between two years is **(later index − earlier index) ÷ earlier index × 100**, expressed as a per cent.',
  sol: 'Definition and formula.',
  scheme: [['Definition of inflation', 1], ['Formula for the rate', 1]],
}));
Q('s2_real', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why can a rise in the money wage still leave a worker worse off? Name the measure that corrects for this.',
  model: 'If the consumer price index rises faster than the money wage, the wage buys less, so the **purchasing power** falls. The measure that corrects for this is the **real wage**, equal to the money wage divided by the consumer price index and multiplied by 100.',
  sol: 'Prices outpacing wages; real wage.',
  scheme: [['Prices rising faster than the wage lowers purchasing power', 1], ['Real wage named and defined', 1]],
}));
Q('s2_relative', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `A kilogram of rice in the imagined Mahuva market cost Rs ${PR.p0} in the base year and costs Rs ${PR.p1} now. Find its price relative and say what it shows.`,
  model: `Price relative = ${PR.p1} ÷ ${PR.p0} × 100 = **${S(PR.rel)}**. It shows that the price is ${S(PR.rel - 100)} per cent higher than in the base year.`,
  sol: `Relative ${S(PR.rel)}; a rise of ${S(PR.rel - 100)} per cent.`,
  scheme: [[`Relative ${S(PR.rel)}`, 1], ['Interpretation as a rise over the base', 1]],
}));

// ---- short, 3 marks
Q('s3_issues', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'State any three issues to be considered in constructing an index number.',
  model: 'First, the **purpose** of the index decides what is measured and for whom. Second, the **base year** should be normal. Third, the **items** and their **price quotations**, wholesale or retail, must suit the purpose. Weights and the choice of the formula are also settled before the index is built.',
  sol: 'Any three of purpose, base year, items, price quotations, weights and formula.',
  scheme: [['First issue explained', 1], ['Second issue explained', 1], ['Third issue explained', 1]],
}));
Q('s3_lp', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Distinguish the Laspeyres index from the Paasche index.',
  model: 'The **Laspeyres** index uses the **base-year quantities** as weights: it compares the cost of the base-year basket at current and at base prices. The **Paasche** index uses the **current-year quantities**: it compares the cost of the current basket at current and at base prices. Laspeyres needs quantities only once, while Paasche needs fresh quantities every year.',
  sol: 'Weights, the basket compared, data needed.',
  scheme: [['Laspeyres: base-year quantities', 1], ['Paasche: current-year quantities', 1], ['One point of contrast', 1]],
}));
Q('s3_cpi_steps', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe the steps in constructing a consumer price index from a family budget.',
  model: 'First find the **price relative** of each item as current price over base price times 100. Then multiply each relative by its **weight**, taken from the family budget, and add the products. Finally divide by the **total of the weights** to get the index.',
  sol: 'Relatives; weighting and adding; division by the total weight.',
  scheme: [['Price relatives', 1], ['Multiply by weights and add', 1], ['Divide by total weight', 1]],
}));
Q('s3_units_demo', short({
  t: 2, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: `Prices of the imagined Sunrise Bakery were ${BK_N.map((n, i) => `${n} Rs ${BK.p0[i]} then Rs ${BK.p1[i]}`).join('; ')}. The same prices are now quoted per 100 g of butter and per piece of eggs: ${BKU_N.map((n, i) => `${n} Rs ${S(BKU.p0[i])} then Rs ${S(BKU.p1[i])}`).join('; ')}. Find the simple aggregative index for both and say what the difference shows.`,
  model: `First set (butter per kg, eggs per dozen): Σp0 = ${BK.sp0} and Σp1 = ${BK.sp1}, so the index is ${BK.sp1} ÷ ${BK.sp0} × 100 = **${S(BK.aggI)}**. Second set (butter per 100 g, eggs per piece): Σp0 = ${S(BKU.sp0)} and Σp1 = ${S(BKU.sp1)}, so the index is ${S(BKU.sp1)} ÷ ${S(BKU.sp0)} × 100 = **${S(BKU.aggI)}**. The price movements are identical, yet the indices differ, so the simple aggregative method depends on the units in which prices are quoted.`,
  sol: `${S(BK.aggI)} and ${S(BKU.aggI)}: dependence on units.`,
  scheme: [[`Index ${S(BK.aggI)}`, 1], [`Index ${S(BKU.aggI)}`, 1], ['Conclusion about units', 1]],
}));
Q('s3_mill', short({
  t: 2, d: 4, c: 'application', marks: 3, wl: S3,
  stem: `The price relatives of five groups for a worker family of the imagined Madhupur Mill Colony are ${ML_N.map((n, i) => `${n} ${ML_R[i]}`).join(', ')}, with base-year monthly spending (Rs) ${J(ML_W)} used as weights. Find the consumer price index.`,
  model: `Step 1: multiply each relative by its weight to get RW: ${ML_R.map((r, i) => `${r}×${ML_W[i]} = ${ML_RW[i]}`).join('; ')}. Step 2: add them, so ΣRW = ${sum(ML_RW)}, and add the weights, so ΣW = ${sum(ML_W)}. Step 3: Index = ${sum(ML_RW)} ÷ ${sum(ML_W)} = **${S(mlCPI)}**. The cost of living of these families is ${S(mlCPI - 100)} per cent above the base year.`,
  sol: `Index ${S(mlCPI)}.`,
  scheme: [['Products RW and their sum', 1], ['Sum of weights', 1], [`Index ${S(mlCPI)}`, 1]],
}));
Q('s3_real', short({
  t: 2, d: 4, c: 'application', marks: 3, wl: S3,
  stem: `A worker of the imagined Ashoka Mess earned Rs ${AM.w0} a month when the consumer price index was ${AM.i0}, and Rs ${AM.w1} when it was ${AM.i1}. Find the real wage each time and the percentage change in it.`,
  model: `The real wage is the money wage divided by the index, times 100. Before: ${AM.w0} ÷ ${AM.i0} × 100 = **${S(AM.r0)}** rupees. After: ${AM.w1} ÷ ${AM.i1} × 100 = **${S(AM.r1)}** rupees. The fall is ${S(AM.r0)} − ${S(AM.r1)} = ${S(AM.r0 - AM.r1)} rupees, which is ${S(AM.r0 - AM.r1)} ÷ ${S(AM.r0)} × 100 = **${S(amFall)} per cent**. The worker is worse off in real terms although the money wage rose.`,
  sol: `Real wages ${S(AM.r0)} and ${S(AM.r1)}; fall of ${S(amFall)} per cent.`,
  scheme: [['Real wage before', 1], ['Real wage after', 1], ['Percentage fall', 1]],
}));

// ---- long, 5 marks
Q('l_types', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the wholesale price index, the consumer price index and the index of industrial production, saying what each measures.',
  model: 'The **wholesale price index** measures the change in the general price level of goods traded in bulk, and is compiled by the Office of the Economic Adviser, Ministry of Commerce and Industry. The **consumer price index**, or cost-of-living index, measures the change in the retail prices of a fixed basket of goods and services consumed by a defined group, such as industrial workers, agricultural labourers, or rural and urban households; it is used to adjust wages and dearness allowance. The **index of industrial production** measures the change in the volume of output of mining, manufacturing and electricity, so it is a quantity index and not a price index.',
  sol: 'Meaning, coverage and use of each of the three indices.',
  scheme: [['Wholesale price index: bulk prices', 1], ['Compiler of the wholesale price index', 1], ['Consumer price index: retail prices of a fixed basket', 1], ['Kinds or use of the consumer price index', 1], ['Industrial production: volume of output', 1]],
}));
Q('l_uses', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the main uses of index numbers, with an imagined illustration for each.',
  model: 'Index numbers **measure inflation**: a rise in the consumer price index of the imagined Bhavnagar Colony shows how fast prices rise. They **adjust wages and allowances**, as when an employer revises dearness allowance. They **deflate money values to real terms**, so that sales of a firm can be compared at base-year prices. They guide **policy-making**, since planners watch price and output indices. They also **compare performance over time**, as an output index shows whether a factory grows.',
  sol: 'Five uses with illustrations.',
  scheme: [['Measuring inflation', 1], ['Adjusting wages and allowances', 1], ['Deflating to real terms', 1], ['Policy-making', 1], ['Comparing performance over time', 1]],
}));
Q('l_issues', long({
  t: 1, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Discuss the issues that arise in constructing a consumer price index for the workers of the imagined Madhupur Mill Colony.',
  model: 'The **purpose** decides the group and what is to be measured: here the cost of living of mill workers. The **base year** should be normal, not one of shortage. The **items** must be those the workers actually buy. **Price quotations** must be retail prices, since workers buy at shops, not wholesale. **Weights** from the workers\' family budget show the importance of each item, and a suitable **formula**, such as the weighted average of price relatives, must be chosen.',
  sol: 'Purpose, base year, items, price quotations, weights and formula applied to the mill colony.',
  scheme: [['Purpose', 1], ['Base year', 1], ['Choice of items', 1], ['Price quotations and weights', 1], ['Choice of formula', 1]],
}));
Q('l_methods', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Compare the simple aggregative method, the simple average of price relatives, and the weighted aggregative methods of constructing a price index.',
  model: 'The **simple aggregative** index divides the total of current prices by the total of base prices; it is easy but depends on the units of the items. The **simple average of price relatives** is free of units because each relative is a ratio, but it treats every item as equally important. The **weighted aggregative** methods use quantities as weights: **Laspeyres** takes the base-year quantities and **Paasche** the current-year quantities. They show the importance of each item, though they need quantity data.',
  sol: 'Features and limits of the four methods.',
  scheme: [['Simple aggregative described', 1], ['Its limitation of units', 1], ['Simple average of relatives described', 1], ['Its limitation of equal importance', 1], ['Laspeyres and Paasche compared', 1]],
}));
Q('l_juice', long({
  t: 2, d: 4, c: 'application', marks: 5, wl: L5,
  stem: `The imagined Tulsi Juice Bar sold ${J(JB.q0)} glasses of ${J(JB_N)} juice in the base week and ${J(JB.q1)} glasses in the current week. Prices (Rs a glass) were ${J(JB.p0)} in the base week and ${J(JB.p1)} now. Find the Laspeyres and the Paasche price indices.`,
  model: `Laspeyres uses the base-week glasses as weights: Σp0q0 = ${JB.p0.map((p, i) => `${p}×${JB.q0[i]}`).join(' + ')} = ${JB.p0q0}, and Σp1q0 = ${JB.p1.map((p, i) => `${p}×${JB.q0[i]}`).join(' + ')} = ${JB.p1q0}. Index = Σp1q0 ÷ Σp0q0 × 100 = ${JB.p1q0} ÷ ${JB.p0q0} × 100 = **${S(JB.L)}**. Paasche uses the current-week glasses: Σp0q1 = ${JB.p0.map((p, i) => `${p}×${JB.q1[i]}`).join(' + ')} = ${JB.p0q1}, and Σp1q1 = ${JB.p1.map((p, i) => `${p}×${JB.q1[i]}`).join(' + ')} = ${JB.p1q1}. Index = ${JB.p1q1} ÷ ${JB.p0q1} × 100 = **${S(JB.P)}**. The Laspeyres value is higher because buyers shifted toward lemon, the cheapest juice.`,
  sol: `Laspeyres ${S(JB.L)}; Paasche ${S(JB.P)}.`,
  scheme: [['Σp0q0 and Σp1q0', 1], [`Laspeyres ${S(JB.L)}`, 1], ['Σp0q1 and Σp1q1', 1], [`Paasche ${S(JB.P)}`, 1], ['Formulas written before substituting', 1]],
}));
Q('l_cpi', long({
  t: 2, d: 5, c: 'application', marks: 5, wl: L5,
  stem: `An imagined family of Bhavnagar Colony has budget weights ${J(FB_W)} for ${FB_N.join(', ')}, with base and current prices (Rs) ${FB_N.map((n, i) => `${FB_P0[i]} and ${FB_P1[i]}`).join('; ')}. Find the consumer price index. If it was ${S(fbCPI)} in the current year and rises to 131.45 in the next, find the rate of inflation for the next year.`,
  model: `Step 1: the price relatives are ${J(FB_R)}. Step 2: multiplying each by its weight gives RW = ${J(FB_RW)}, so ΣRW = ${sum(FB_RW)}, while ΣW = ${sum(FB_W)}. Step 3: Index = ΣRW ÷ ΣW = ${sum(FB_RW)} ÷ ${sum(FB_W)} = **${S(fbCPI)}**. Step 4: the rate of inflation is (later index − earlier index) ÷ earlier index × 100 = (131.45 − ${S(fbCPI)}) ÷ ${S(fbCPI)} × 100 = **${S(inflation(fbCPI, 131.45))} per cent**. Prices of the family's basket are therefore rising by this rate in the next year.`,
  sol: `Index ${S(fbCPI)}; inflation ${S(inflation(fbCPI, 131.45))} per cent.`,
  scheme: [['Price relatives', 1], ['Products RW and their sum', 1], [`Index ${S(fbCPI)}`, 1], ['Inflation formula', 1], [`Rate ${S(inflation(fbCPI, 131.45))} per cent`, 1]],
}));
check(inflation(fbCPI, 131.45), 10, 2, 'next-year inflation for the family budget');

// ---- case-based
Q('cb_hh', caseQ({
  t: 2, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined household basket in Bhavnagar Colony**\n\nAn imagined household of Bhavnagar Colony buys five items each month. The prices (Rs) in the base year and now, and the monthly quantities in the base year, are: ${HH_N.map((n, i) => `${n}: Rs ${HH.p0[i]} then Rs ${HH.p1[i]}, quantity ${HH.q0[i]}`).join('; ')}.`,
  parts: [
    child('a', short({ t: 2, d: 2, c: 'understanding', marks: 1, stem: 'Which formula uses the base-year quantities as weights?', model: 'The **Laspeyres** index.', sol: 'Laspeyres.', scheme: [['Laspeyres', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Find Σp0q0 for the basket.', model: `Σp0q0 = ${HH.p0.map((p, i) => `${p}×${HH.q0[i]}`).join(' + ')} = **${HH.p0q0}**.`, sol: `Σp0q0 = ${HH.p0q0}.`, scheme: [['Correct total', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'application', marks: 2, stem: '**Either** (i): Find the Laspeyres price index for the household.', model: `Σp1q0 = ${HH.p1.map((p, i) => `${p}×${HH.q0[i]}`).join(' + ')} = ${HH.p1q0}. Index = ${HH.p1q0} ÷ ${HH.p0q0} × 100 = **${S(HH.L)}**.`, sol: `Laspeyres index ${S(HH.L)}.`, scheme: [['Σp1q0', 1], [`Index ${S(HH.L)}`, 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): The household's simple average of price relatives is ${S(HH.relI)} but its Laspeyres index is ${S(HH.L)}. Explain why the two differ.`, model: `The simple average of relatives gives **equal importance** to every item, while the Laspeyres index weights each item by its **base-year spending**. Tea, with the highest relative, takes a larger share of base-year spending than one fifth (${HH.p0[4] * HH.q0[4]} out of ${HH.p0q0}), so it counts for more in the weighted index.`, sol: 'Equal importance against spending weights.', scheme: [['Simple average treats items equally', 1], ['Laspeyres weights by base-year spending', 1]] }),
    ]),
  ],
}));
check(HH.relI, 125.25, 2, 'household relatives mean quoted in the case');
check(HH.L, 126, 2, 'household Laspeyres quoted in the case');
assert.ok((HH.p0[4] * HH.q0[4]) / HH.p0q0 > 0.2, 'tea takes more than one fifth of base-year spending');
Q('cb_factory', caseQ({
  t: 1, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined output index of Rivergate Industrial Estate**\n\nThe imagined estate has three kinds of output: mining, manufacturing and electricity, with weights ${J(IP_W)}. In the base year the output was ${J(IP_Q0)} units and this year it is ${J(IP_Q1)} units respectively. A student works out an index of industrial production for the estate.`,
  parts: [
    child('a', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'Does this index measure prices or the volume of output?', model: 'It measures the **volume of output**.', sol: 'Volume.', scheme: [['Volume of output', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Find the output relative of manufacturing.', model: `${IP_Q1[1]} ÷ ${IP_Q0[1]} × 100 = **${S(IP_R[1])}**.`, sol: `Relative ${S(IP_R[1])}.`, scheme: [['Correct relative', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'application', marks: 2, stem: '**Either** (i): Find the output index of the estate by the weighted average of relatives.', model: `ΣRW = ${IP_R.map((r, i) => `${r}×${IP_W[i]}`).join(' + ')} = ${sum(IP_R.map((r, i) => r * IP_W[i]))}. Index = ${sum(IP_R.map((r, i) => r * IP_W[i]))} ÷ ${sum(IP_W)} = **${S(ipI)}**.`, sol: `Index ${S(ipI)}.`, scheme: [['ΣRW', 1], [`Index ${S(ipI)}`, 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Why are weights used in this index, and why would a simple average of the three relatives be a poor measure?', model: 'The three kinds of output are **not equally important**, and manufacturing has the largest weight. A simple average would give mining and electricity as much influence as manufacturing and so **misstate** the change in production.', sol: 'Unequal importance of outputs.', scheme: [['Outputs are not equally important', 1], ['Simple average would misstate change', 1]] }),
    ]),
  ],
}));
Q('cb_wage', caseQ({
  t: 2, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined wages and prices in Bhavnagar Colony**\n\nThe consumer price index of the imagined Bhavnagar Colony (Year 0 = 100) was ${CP[1]} in Year 1, ${CP[2]} in Year 2 and ${CP[3]} in Year 3. A clerk of the Bhavnagar Colony Cooperative Society earned Rs ${WG[0]} a month in Year 1, Rs ${WG[1]} in Year 2 and Rs ${WG[2]} in Year 3.`,
  parts: [
    child('a', short({ t: 2, d: 2, c: 'understanding', marks: 1, stem: 'State the formula for the real wage.', model: 'Real wage = **money wage ÷ consumer price index × 100**.', sol: 'Real wage formula.', scheme: [['Formula', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Find the real wage in Year 1.', model: `${WG[0]} ÷ ${CP[1]} × 100 = **Rs ${S(RW[0])}**.`, sol: `Real wage Rs ${S(RW[0])}.`, scheme: [['Correct real wage', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Find the real wage in Year 3 and say whether the clerk is better off than in Year 1.', model: `Year 3 real wage = ${WG[2]} ÷ ${CP[3]} × 100 = **Rs ${S(RW[2])}**, the same as in Year 1, so the clerk is **no better off** in real terms although the money wage rose.`, sol: `Real wage Rs ${S(RW[2])}; unchanged.`, scheme: [[`Real wage ${S(RW[2])}`, 1], ['Conclusion on being no better off', 1]] }), [
      short({ t: 2, d: 4, c: 'application', marks: 2, stem: '**Or** (ii): Find the rate of inflation in Year 3.', model: `Rate = (${CP[3]} − ${CP[2]}) ÷ ${CP[2]} × 100 = **${S(INF[2])} per cent**.`, sol: `Inflation ${S(INF[2])} per cent.`, scheme: [['Change over the earlier index', 1], [`Rate ${S(INF[2])} per cent`, 1]] }),
    ]),
  ],
}));
Q('cb_mill', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined cost-of-living index of Madhupur Mill Colony**\n\nThe imagined Madhupur Mill Colony prepares an index for its worker families. The price relatives of five groups are ${ML_N.map((n, i) => `${n} ${ML_R[i]}`).join(', ')}. The weights, taken from the base-year monthly spending (Rs) of a typical family, are ${J(ML_W)} respectively.`,
  parts: [
    child('a', short({ t: 2, d: 2, c: 'understanding', marks: 1, stem: 'From where are the weights of a consumer price index taken?', model: 'From the **family budget**, which shows how families spend their income.', sol: 'Family budget.', scheme: [['Family budget', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Find ΣW, the total of the weights.', model: `ΣW = ${J(ML_W)} added = **${sum(ML_W)}**.`, sol: `ΣW = ${sum(ML_W)}.`, scheme: [['Correct total', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'application', marks: 2, stem: '**Either** (i): Find the consumer price index of the colony.', model: `ΣRW = ${sum(ML_RW)}. Index = ${sum(ML_RW)} ÷ ${sum(ML_W)} = **${S(mlCPI)}**.`, sol: `Index ${S(mlCPI)}.`, scheme: [['ΣRW', 1], [`Index ${S(mlCPI)}`, 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): The mill wants to use this index to revise dearness allowance. Explain how the index helps.', model: 'The index shows how far the **cost of living** of worker families has risen over the base year. The mill can raise the allowance in proportion, so that the workers\' **real wage** and purchasing power are protected.', sol: 'Index shows cost-of-living rise; allowance protects the real wage.', scheme: [['Index shows the rise in cost of living', 1], ['Allowance protects real wage', 1]] }),
    ]),
  ],
}));
