// CBSE 11 Economics, ch08 Introduction to Microeconomics: question bank. Every economy, firm, farmer, town and statement is
// imagined and written for this chapter; no real statistics are used. Every schedule value (opportunity cost, marginal rate of
// transformation, idle capacity, gain from growth) is computed from the imagined schedules with stats.mjs or plain code and
// pinned with check() wherever it is written in prose.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from '../../cbse-11-economics-ch01/src/lib.mjs';
import { sum, rnd, check, marginal } from '../../cbse-11-economics-ch01/src/stats.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
export const J = (a) => a.join(', ');
export const LET = 'ABCDEFG';

// ---------------------------------------------------------------- imagined schedules (computed)
/** A production possibility schedule: X on the horizontal axis, Y on the vertical axis. MRT = units of Y given up per extra unit of X. */
export function sched(X, Y) {
  const dX = marginal(X);
  const give = marginal(Y).map((d) => -d);
  const mrt = give.map((g, i) => g / dX[i]);
  return { X, Y, dX, give, mrt, rising: mrt.every((m, i) => i === 0 || m > mrt[i - 1]), constant: mrt.every((m) => m === mrt[0]) };
}
/** Elliptical-style PPF y = ymax (1 - (x / xmax)^2), used for plotting and for the shifted curves. */
export const ppfFn = (xmax, ymax) => (x) => rnd(ymax * (1 - (x * x) / (xmax * xmax)), 6);
const mustRise = (s, what) => { if (!s.rising) throw new Error(`${what}: marginal rate of transformation does not rise`); };

// 1. Tarvania: wheat (lakh tonnes, horizontal) and cloth (thousand metres, vertical).
export const f1 = ppfFn(4, 160);
export const P1 = sched([0, 1, 2, 3, 4], [0, 1, 2, 3, 4].map(f1));
mustRise(P1, 'Tarvania');
check(sum(P1.Y), 500, 0, 'Tarvania cloth column total');
check(J(P1.Y) === '160, 150, 120, 70, 0' ? 1 : 0, 1, 0, 'Tarvania cloth column');
check(J(P1.mrt) === '10, 30, 50, 70' ? 1 : 0, 1, 0, 'Tarvania MRT');
export const tvAvg = P1.Y[0] / P1.X[4]; // average MRT from A to E
check(tvAvg, 40, 6, 'Tarvania average MRT from A to E');
export const tvBD = P1.Y[1] - P1.Y[3]; // cloth given up from B to D
check(tvBD, 80, 6, 'Tarvania cloth given up from B to D');
check(sum(P1.give), 160, 6, 'Tarvania total cloth given up from A to E');
// points off the curve
export const UX = 2, UY = 90; // inside
export const OX = 3, OY = 100; // outside
export const idle = f1(UX) - UY;
export const over = OY - f1(OX);
check(idle, 30, 6, 'Tarvania idle cloth capacity at the inside point');
check(over, 30, 6, 'Tarvania cloth beyond the curve at the outside point');
// shifted curves
export const OUTX = 5;
export const fOut = ppfFn(OUTX, 200); // growth of resources / better technology in both goods
export const fIn = ppfFn(3, 120); // earthquake
export const fRotC = ppfFn(4, 200); // better technology in cloth only
export const fRotW = ppfFn(5, 160); // better technology in wheat only
export const gainOut = fOut(UX) - f1(UX);
check(gainOut, 48, 6, 'extra cloth at 2 lakh tonnes of wheat after growth');
export const gainRot = fRotC(UX) - f1(UX);
check(gainRot, 30, 6, 'extra cloth at 2 lakh tonnes of wheat after cloth technology');
export const pctCloth = ((200 - 160) / 160) * 100;
check(pctCloth, 25, 6, 'percentage rise in maximum cloth');
check(fRotC(4), 0, 6, 'rotation keeps the wheat intercept');
check(fRotW(0), 160, 6, 'rotation keeps the cloth intercept');
check(fIn(0), 120, 6, 'earthquake cloth intercept');

// 2. Belmora: rice (thousand tonnes) and steel (thousand tonnes).
export const P2 = sched([0, 2, 4, 6, 8], [60, 56, 48, 36, 20]);
mustRise(P2, 'Belmora');
check(J(P2.mrt) === '2, 4, 6, 8' ? 1 : 0, 1, 0, 'Belmora MRT');
export const blRecip = 1 / P2.mrt[0];
check(blRecip, 0.5, 6, 'Belmora rice forgone per tonne of steel gained');

// 3. Kelvaria: apples (hundred tonnes) and tablets (thousand units).
export const P3 = sched([0, 5, 10, 15, 20], [100, 95, 85, 70, 50]);
mustRise(P3, 'Kelvaria');
check(J(P3.mrt) === '1, 2, 3, 4' ? 1 : 0, 1, 0, 'Kelvaria MRT');
export const kvAvg = (P3.Y[1] - P3.Y[3]) / (P3.X[3] - P3.X[1]); // 5 to 15 apples
check(kvAvg, 2.5, 6, 'Kelvaria average MRT from B to D');

// 4. Dorvik: a straight-line frontier (equally efficient resources).
export const P4 = sched([0, 10, 20, 30], [60, 40, 20, 0]);
if (!P4.constant) throw new Error('Dorvik MRT must be constant');
check(P4.mrt[0], 2, 6, 'Dorvik constant MRT');

// 5. Lumeria: bicycles (thousand) and sewing machines (thousand).
export const P5 = sched([0, 2, 4, 6, 8], [50, 48, 42, 32, 18]);
mustRise(P5, 'Lumeria');
check(J(P5.mrt) === '1, 3, 5, 7' ? 1 : 0, 1, 0, 'Lumeria MRT');
check(P5.Y[0] - P5.Y[4], 32, 6, 'Lumeria total machines given up');

// 6. Dilbag of Bhavpur: land use and technique.
export const FARM = [['sugarcane', 60000], ['paddy', 52000], ['vegetables', 48000]];
export const farmChosen = FARM[0][1];
export const farmOC = Math.max(...FARM.slice(1).map((f) => f[1]));
check(farmOC, 52000, 0, 'Dilbag opportunity cost of sugarcane');
export const LAB_N = 40, LAB_D = 5, LAB_W = 400, HV_D = 2, HV_R = 30000;
export const labCost = LAB_N * LAB_D * LAB_W;
export const hvCost = HV_D * HV_R;
export const techDiff = labCost - hvCost;
check(labCost, 80000, 0, 'labour-intensive harvest cost');
check(hvCost, 60000, 0, 'capital-intensive harvest cost');
check(techDiff, 20000, 0, 'saving by the harvester');
export const inr = (x) => `Rs ${x.toLocaleString('en-IN')}`;
const sched2 = (s, xName, yName) => s.X.map((x, i) => `${LET[i]}: ${x} ${xName}, ${s.Y[i]} ${yName}`).join('; ');
export const sTv = sched2(P1, 'lakh tonnes of wheat', 'thousand metres of cloth');
export const sBl = sched2(P2, 'thousand tonnes of rice', 'thousand tonnes of steel');
export const sKv = sched2(P3, 'hundred tonnes of apples', 'thousand tablets');
export const sDv = P4.X.map((x, i) => `${LET[i]}: ${x} thousand bags of wheat, ${P4.Y[i]} thousand bags of rice`).join('; ');
export const sLm = sched2(P5, 'thousand bicycles', 'thousand sewing machines');
const mrtText = (s) => s.mrt.map((m, i) => `${LET[i]} to ${LET[i + 1]}: ${s.give[i]} ÷ ${s.dX[i]} = ${m}`).join('; ');

// ---------------------------------------------------------------- multiple-choice (opts[0] is correct)
Q('m_econ_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which statement best defines economics as studied in the imagined country of Tarvania and everywhere else?',
  opts: ['The study of how society allocates scarce resources among alternative uses to satisfy wants', 'The study of how to earn the largest possible profit in a business', 'The study of money, banks and the stock market alone', 'The study of how the government collects taxes'],
  sol: 'Economics is concerned with the choices that arise because resources are limited while wants are many and the resources have alternative uses. Profit, money and banking, and taxation are only parts of what economics deals with.',
}));
Q('m_scarcity', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The citizens of the imagined town of Halsey want more parks, schools and roads than the town can build. In economics this situation is called',
  opts: ['scarcity, because resources are limited relative to wants', 'plenty, because every want can be met', 'inflation, because prices have risen', 'unemployment, because workers are idle'],
  sol: 'Scarcity means that the resources available are limited compared with the wants to be satisfied. Plenty is the opposite situation, and inflation and unemployment describe prices and jobs, not the gap between wants and resources.',
}));
Q('m_choice_arises', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why does the imagined island economy of Marrow have to make choices?',
  opts: ['Its resources are limited, they have alternative uses and wants are many', 'Its government has decided to restrict production', 'Its people do not want any goods', 'Its resources can be used for only one purpose'],
  sol: 'Choice is forced by scarcity combined with alternative uses of resources: using a resource in one way means not using it in another. Where resources have only one use, or people want nothing, no choice would arise, and a government order is not the root cause.',
}));
Q('m_micro_ex', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Which of the following is a topic of microeconomics in the imagined economy of Kelvaria?',
  opts: ['How the price of tablets is fixed in one market', 'The total employment in the whole of Kelvaria', 'The general price level of Kelvaria', 'The national income of Kelvaria'],
  sol: 'Microeconomics studies individual units such as a consumer, a producer or a single market, so the price of one product in one market is a micro topic. Total employment, the general price level and national income describe the economy as a whole and belong to macroeconomics.',
}));
Q('m_macro_ex', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Which of the following is a topic of macroeconomics in the imagined economy of Belmora?',
  opts: ['The general level of prices of all goods in Belmora', 'The weekly demand of one household for rice', 'The output decision of one steel factory', 'The price of one brand of tea in a village shop'],
  sol: 'Macroeconomics deals with aggregates such as the general price level. A household, a single factory and one brand in one shop are individual units, so they belong to microeconomics.',
}));
Q('m_pos_class', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Which of these imagined statements is a positive statement?',
  opts: ['Apple output in Kelvaria fell last year after a severe frost', 'Kelvaria should give free tablets to every school', 'It is unfair that rich households own most of the orchards', 'The rich of Kelvaria ought to pay a higher tax'],
  sol: 'A positive statement describes what is and can be checked against facts, such as the fall of apple output after a frost. The others contain words such as should, unfair and ought, which are value judgements and therefore normative.',
}));
Q('m_norm_class', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Which of these imagined statements is a normative statement?',
  opts: ['Tarvania ought to spend more on public libraries', 'The number of libraries in Tarvania rose last year', 'The price of cloth in Tarvania is lower than the price of wheat per kilogram', 'Cloth output in Tarvania is larger than steel output'],
  sol: 'Ought to expresses a value judgement about what should be done, so the first statement is normative. The other three can be tested with data and are therefore positive, whether they turn out true or false.',
}));
Q('m_pos_norm_diff', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Which pair correctly describes positive and normative economics?',
  opts: ['Positive deals with what is and can be tested; normative deals with what ought to be and rests on value judgements', 'Positive deals with what ought to be; normative deals with what is', 'Positive deals with the whole economy; normative deals with one firm', 'Positive is always true; normative is always false'],
  sol: 'The first option states the standard distinction. The second reverses it, the third confuses it with the micro and macro divide, and a positive statement can also be false while a normative statement is neither true nor false by facts alone.',
}));
Q('m_planned', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'In the imagined economy of Orlin a central authority decides what, how and for whom to produce, and most resources are owned by the state. Orlin is best described as',
  opts: ['a centrally planned economy', 'a market economy', 'a mixed economy', 'a closed economy'],
  sol: 'When the government makes the central decisions through a plan, the economy is centrally planned. A market economy leaves decisions to markets and prices, and a mixed economy combines the two.',
}));
Q('m_market', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'In the imagined economy of Quillon, producers decide what to make by watching prices and profits, and consumers decide what to buy with their incomes. This is the main feature of',
  opts: ['a market economy', 'a centrally planned economy', 'a subsistence economy', 'a command economy'],
  sol: 'In a market economy decisions are made by buyers and sellers through markets and prices. A central plan, a command system and a subsistence economy do not describe decisions guided by prices and profit.',
}));
Q('m_mixed', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'In the imagined economy of Dunmere, private firms produce most consumer goods while the government runs railways and provides basic schooling. Dunmere is an example of',
  opts: ['a mixed economy', 'a centrally planned economy', 'a pure market economy', 'a barter economy'],
  sol: 'A mixed economy has both a private sector working through markets and a public sector that the government runs. A planned economy would leave nothing to private firms, and a pure market economy would have no state role.',
}));
Q('m_what', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The government of the imagined country of Kelvaria must decide whether to use its farmland for apples or for tablet factories and how much of each to make. This is the central problem of',
  opts: ['what to produce and in what quantities', 'how to produce', 'for whom to produce', 'how to reduce prices'],
  sol: 'Choosing which goods and how much of each to produce is the problem of what to produce. How to produce concerns the technique, and for whom concerns the distribution of output among people.',
}));
Q('m_how', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Farmer Dilbag of the imagined village of Bhavpur must decide whether to harvest his wheat with forty hired workers or with a rented harvesting machine. This is the central problem of',
  opts: ['how to produce, the choice of technique', 'what to produce', 'for whom to produce', 'whom to employ for life'],
  sol: 'Choosing between a labour-intensive and a capital-intensive method is the choice of technique, which is the problem of how to produce. What to produce is about the product, and for whom is about who receives the output.',
}));
Q('m_forwhom', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In the imagined economy of Belmora, steel and rice are produced. The question of how this output will be shared among households is the problem of',
  opts: ['for whom to produce, the distribution of output', 'what to produce', 'how to produce', 'how to import goods'],
  sol: 'Sharing the output among the members of society is the problem of for whom to produce. What to produce and how to produce deal with the choice of goods and of technique.',
}));
Q('m_ppf_def', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'A production possibility frontier shows',
  opts: ['the combinations of two goods an economy can produce with given resources and technology when they are fully and efficiently used', 'the combinations of two goods that consumers prefer', 'the price at which two goods are sold in a market', 'the growth of national income over several years'],
  sol: 'The frontier is a boundary of what can be produced with given resources and technology. It is not about consumer preference, market prices or growth over time, although a shift of the frontier is used to show growth.',
}));
Q('m_ppf_assump', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Which of the following is NOT an assumption behind the production possibility frontier of an imagined economy?',
  opts: ['Resources and technology keep changing every year', 'Resources are fully and efficiently used', 'Technology is given', 'Resources are not equally efficient in producing both goods'],
  sol: 'The frontier is drawn for fixed resources and a given technology, so constant change in them is not an assumption; if they change, the frontier shifts. The other three are assumptions of the usual PPF.',
}));
Q('m_inside', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Tarvania produces wheat and cloth and its frontier passes through ${P1.X[UX]} lakh tonnes of wheat and ${P1.Y[UX]} thousand metres of cloth. The economy is producing ${UX} lakh tonnes of wheat and ${UY} thousand metres of cloth. This combination`,
  opts: ['lies inside the frontier, showing that resources are not fully or efficiently used', 'lies on the frontier, showing full and efficient use', 'lies outside the frontier and cannot be produced', 'lies on the wheat axis'],
  sol: `At ${UX} lakh tonnes of wheat the frontier gives ${P1.Y[UX]} thousand metres of cloth, which is ${idle} more than ${UY}. So the point is below the frontier: it is attainable but some resources are idle or badly used. A point on the frontier would show ${P1.Y[UX]}, and a point outside would show more than ${P1.Y[UX]}.`,
}));
Q('m_outside', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Tarvania can produce at most ${f1(OX)} thousand metres of cloth when it makes ${OX} lakh tonnes of wheat. A plan to produce ${OX} lakh tonnes of wheat and ${OY} thousand metres of cloth would be`,
  opts: ['unattainable with the present resources and technology', 'attainable by moving inside the frontier', 'efficient and attainable', 'possible only in a centrally planned economy'],
  sol: `The frontier gives ${f1(OX)} thousand metres at ${OX} lakh tonnes of wheat, and ${OY} exceeds it by ${over}. A point outside the frontier cannot be reached with given resources and technology, whatever the type of economy.`,
}));
Q('m_concave', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'The production possibility curve of an imagined economy is concave to the origin because',
  opts: ['the marginal opportunity cost rises as more of a good is produced', 'the marginal opportunity cost falls as more of a good is produced', 'the marginal opportunity cost is the same at every point', 'the economy always uses its resources fully'],
  sol: 'Resources are not equally efficient in all uses, so the first units of a good use the resources best suited to it and later units need less suitable resources, which raises the opportunity cost. Constant cost gives a straight line and falling cost a curve bowed toward the origin; full use of resources is an assumption, not the reason for the shape.',
}));
Q('m_oc_farmer', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Farmer Dilbag can use his two hectares for sugarcane (income ${inr(FARM[0][1])}), paddy (${inr(FARM[1][1])}) or vegetables (${inr(FARM[2][1])}). He plants sugarcane. His opportunity cost is`,
  opts: [`${inr(farmOC)}, the income from the next best alternative, paddy`, `${inr(FARM[0][1])}, the income from sugarcane`, `${inr(FARM[1][1] + FARM[2][1])}, the income from both other crops`, `${inr(FARM[2][1])}, the income from the least valuable use`],
  sol: `Opportunity cost is the value of the next best alternative given up, which is paddy at ${inr(farmOC)}. The income from sugarcane is what he gains, not what he gives up; adding both alternatives, or using the lowest, does not measure the next best use.`,
}));
Q('m_mrt_def', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'The marginal rate of transformation between two goods X and Y, with X on the horizontal axis, is',
  opts: ['the units of Y given up to produce one more unit of X, that is ΔY / ΔX', 'the units of X given up to produce one more unit of Y only', 'the total output of X and Y together', 'the price of X divided by the price of Y'],
  sol: 'MRT, also called marginal opportunity cost, is the loss of one good per unit gained of the other, ΔY ÷ ΔX. It is not a total output and is not a ratio of prices.',
}));
Q('m_shift_out', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The production possibility frontier of the imagined economy of Lumeria shifts to the right when',
  opts: ['its resources increase or its technology improves', 'a flood destroys many factories', 'it moves from a point on the frontier to a point inside it', 'its people start to want different goods'],
  sol: 'More resources or better technology raise what the economy can produce, so the frontier moves outward. A flood shifts it inward, a move to an inside point is not a shift, and a change in wants does not alter productive capacity.',
}));
Q('m_shift_in', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A severe earthquake destroys many factories and farms of the imagined economy of Orlin. The production possibility frontier of Orlin will',
  opts: ['shift to the left', 'shift to the right', 'rotate with one intercept unchanged', 'remain unchanged'],
  sol: 'Destruction of resources lowers the maximum output of both goods, so the whole frontier shifts inward, to the left. The frontier shifts right with growth, rotates when technology improves for one good only, and cannot stay unchanged when capacity is destroyed.',
}));
Q('m_rotation', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Better technology is introduced only in the cloth industry of Tarvania, while wheat technology does not change. The frontier of wheat and cloth',
  opts: ['rotates outward, the cloth intercept rising and the wheat intercept unchanged', 'shifts inward in parallel', 'rotates inward on the cloth axis', 'shifts outward in parallel at both axes'],
  sol: 'The maximum output of cloth rises while the maximum output of wheat stays the same, so the curve swings out on the cloth axis only. An inward shift needs lower capacity, and a parallel outward shift needs improvement in both goods.',
}));
Q('m_mrt_rise', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Kelvaria gives up tablets as it moves along its frontier: ${sKv}. Which statement about the marginal rate of transformation is correct?`,
  opts: [`It rises from ${P3.mrt[0]} to ${P3.mrt[3]} thousand tablets per hundred tonnes of apples`, `It stays at ${P3.mrt[0]} at every step`, `It falls from ${P3.mrt[3]} to ${P3.mrt[0]}`, `It is zero at point A`],
  sol: `Between consecutive points the tablets given up are ${J(P3.give)} for ${P3.dX[0]} hundred tonnes of apples each, so the marginal rate is ${J(P3.mrt)}: it rises. It is neither constant nor falling.`,
}));
Q('m_linear', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: `The imagined economy of Dorvik produces wheat and rice with the schedule ${sDv}. Its frontier is a straight line. This means that`,
  opts: [`the marginal opportunity cost is constant at ${P4.mrt[0]} thousand bags of rice per thousand bags of wheat, as if resources were equally efficient in both uses`, 'the marginal opportunity cost rises at every step', 'the economy has unemployed resources', 'the frontier is concave to the origin'],
  sol: `Each step of ${P4.dX[0]} thousand bags of wheat costs ${P4.give[0]} thousand bags of rice, so the rate is ${P4.mrt[0]} throughout. This is the case only when resources are equally efficient in both goods. Idle resources would put the economy inside the line, and a concave curve needs rising cost.`,
}));

// ---------------------------------------------------------------- assertion-reason
Q('ar_concave', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The production possibility curve of an economy that makes steel and rice is concave to the origin.',
  r: 'Resources are not equally efficient in producing steel and rice, so giving up more rice is needed to obtain each extra unit of steel.',
  sol: 'Both are true and R explains A. Because resources differ in how well they suit each good, the opportunity cost rises along the frontier, which gives the concave shape.',
}));
Q('ar_shift', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'An improvement in technology shifts the production possibility frontier of an economy outward.',
  r: 'The production possibility frontier is concave to the origin.',
  sol: 'Both statements are true, but R does not explain A. Better technology raises the maximum output and moves the frontier out; the concave shape is the effect of increasing marginal opportunity cost and has nothing to do with the shift.',
}));
Q('ar_mrt', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'A-true-R-false',
  a: 'Along the frontier of a typical economy, the marginal rate of transformation rises as more of one good is produced.',
  r: 'Resources are equally efficient in the production of both goods.',
  sol: 'A is true. R is false: it is because resources are not equally efficient in both goods that the marginal opportunity cost rises. Equal efficiency would give a constant rate and a straight-line frontier.',
}));
Q('ar_inside', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'A point inside the production possibility frontier shows that resources are fully and efficiently used.',
  r: 'A point inside the frontier can be produced with the given resources and technology.',
  sol: 'A is false: an inside point means that some resources are unemployed or used inefficiently. R is true, because inside points are attainable, but this does not make them efficient.',
}));
Q('ar_positive', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'A positive statement of economics must always be true.',
  r: 'A positive statement is one that can be tested against facts.',
  sol: 'A is false: a positive statement can be false, as when a claim about prices is checked and found wrong. R is true, since testability against facts is what makes a statement positive, whether it turns out true or false.',
}));

// ---------------------------------------------------------------- true-false, fill-blank, match, ordering
Q('tf_single_firm', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The output decision of a single steel factory in the imagined economy of Belmora is a topic of macroeconomics.',
  sol: 'The decision of one producer is a micro topic; macroeconomics deals with aggregates such as national income and total employment.',
}));
Q('tf_normative_test', tf({
  t: 1, d: 3, c: 'understanding', ans: false,
  stem: 'True or false? A normative statement, such as the claim that Quillon should reduce its inequality, can be proved right or wrong by facts alone.',
  sol: 'A normative statement contains a value judgement about what ought to be. Facts can inform the debate but cannot settle it alone.',
}));
Q('tf_outside', tf({
  t: 2, d: 3, c: 'understanding', ans: false,
  stem: 'True or false? Tarvania can reach a point outside its present frontier by using its existing resources and technology more efficiently.',
  sol: 'Efficient use of resources only takes the economy to the frontier. A point outside needs more resources or better technology.',
}));
Q('fb_how', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'The choice between a labour-intensive and a capital-intensive method of production is the central problem of ___ to produce.',
  acc: [['how']],
  sol: 'The choice of technique belongs to the problem of how to produce.',
}));
Q('fb_mrt', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'The marginal rate of transformation is the units of one good given up to produce one more unit of the ___ good.',
  acc: [['other', 'second']],
  sol: 'MRT measures the loss of one good per extra unit of the other good.',
}));
Q('mt_economy', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each term with the description that fits it.',
  pairs: [
    ['Centrally planned economy', 'The government decides what, how and for whom to produce'],
    ['Market economy', 'Decisions are taken by buyers and sellers through markets and prices'],
    ['Mixed economy', 'Private firms and the government both play a role in production'],
    ['Scarcity', 'Resources are limited compared with the wants to be satisfied'],
  ],
  sol: 'Each term is matched with its standard description.',
}));
Q('mt_shift', match({
  t: 2, d: 3, c: 'application',
  stem: 'Match each imagined event with its effect on the production possibility frontier of the economy concerned.',
  pairs: [
    ['Better technology is found for both goods', 'The frontier shifts outward'],
    ['A flood destroys factories and farms', 'The frontier shifts inward'],
    ['Better technology is found for one good only', 'The frontier rotates, one intercept unchanged'],
    ['Many workers become unemployed', 'The economy moves to a point inside the frontier'],
  ],
  sol: 'Growth moves the frontier out, destruction moves it in, one-sided technology rotates it, and unemployment moves the economy inside it without moving the frontier.',
}));
Q('ord_chain', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these steps in the order in which the problem of choice arises for the imagined town of Halsey.',
  items: [
    'Resources such as land, labour and funds are limited',
    'The resources can be used in more than one way',
    'The town must choose which use to follow',
    'The best use given up becomes the opportunity cost of the choice',
  ],
  sol: 'Scarcity and alternative uses force a choice, and the best alternative forgone is the opportunity cost.',
}));
Q('ord_mrt', ord({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Arrange the steps of finding the marginal rate of transformation between two combinations on the frontier of the imagined economy of Lumeria.',
  items: [
    'Read the output of both goods at the two combinations',
    'Find the fall in the output of the good on the vertical axis',
    'Find the rise in the output of the good on the horizontal axis',
    'Divide the fall by the rise',
  ],
  sol: 'The fall in the vertical good is divided by the rise in the horizontal good.',
}));

// ---------------------------------------------------------------- numericals on PPF schedules
Q('n_p1_mrt_bc', num({
  t: 2, d: 2, c: 'application', value: P1.mrt[1], unit: 'thousand metres of cloth per lakh tonnes of wheat', tol: 0,
  stem: `The imagined economy of Tarvania can produce the following combinations of wheat and cloth: ${sTv}. Find the marginal rate of transformation when the economy moves from B to C.`,
  sol: `Step 1: Wheat rises from ${P1.X[1]} to ${P1.X[2]}, so ΔX = ${P1.dX[1]} lakh tonnes.\nStep 2: Cloth falls from ${P1.Y[1]} to ${P1.Y[2]}, so ΔY = ${P1.give[1]} thousand metres.\nStep 3: MRT = ${P1.give[1]} ÷ ${P1.dX[1]} = ${P1.mrt[1]}.`,
}));
Q('n_p1_oc_de', num({
  t: 2, d: 2, c: 'application', value: P1.give[3], unit: 'thousand metres of cloth', tol: 0,
  stem: `Using the Tarvania schedule ${sTv}, how many thousand metres of cloth must be given up to raise wheat output from ${P1.X[3]} to ${P1.X[4]} lakh tonnes (D to E)?`,
  sol: `Step 1: Cloth at D is ${P1.Y[3]} and at E is ${P1.Y[4]}.\nStep 2: The cloth given up is ${P1.Y[3]} − ${P1.Y[4]} = ${P1.give[3]} thousand metres, which is the opportunity cost of the fourth lakh tonne of wheat.`,
}));
Q('n_p1_bd', num({
  t: 2, d: 3, c: 'application', value: tvBD, unit: 'thousand metres of cloth', tol: 0,
  stem: `With the Tarvania schedule ${sTv}, how much cloth is given up in all when the economy moves from combination B to combination D?`,
  sol: `Step 1: Cloth at B is ${P1.Y[1]} and at D is ${P1.Y[3]}.\nStep 2: Cloth given up = ${P1.Y[1]} − ${P1.Y[3]} = ${tvBD} thousand metres. As a check, the two marginal losses ${P1.give[1]} and ${P1.give[2]} add to ${P1.give[1] + P1.give[2]}.`,
}));
Q('n_p1_avg', num({
  t: 2, d: 3, c: 'application', value: tvAvg, unit: 'thousand metres of cloth per lakh tonnes of wheat', tol: 0,
  stem: `The Tarvania schedule is ${sTv}. Find the average cost, in cloth, of each lakh tonne of wheat when the economy moves from A (all cloth) to E (all wheat).`,
  sol: `Step 1: Cloth given up from A to E = ${P1.Y[0]} − ${P1.Y[4]} = ${sum(P1.give)}.\nStep 2: Wheat gained = ${P1.X[4]} − ${P1.X[0]} = ${P1.X[4]} lakh tonnes.\nStep 3: Average cost = ${sum(P1.give)} ÷ ${P1.X[4]} = ${tvAvg}. This is below the last marginal rate, ${P1.mrt[3]}, because the marginal rate rises.`,
}));
Q('n_p2_mrt', num({
  t: 2, d: 3, c: 'application', value: P2.mrt[2], unit: 'thousand tonnes of steel per thousand tonnes of rice', tol: 0,
  stem: `The imagined economy of Belmora has the combinations of rice and steel ${sBl}. Find the marginal rate of transformation between C and D.`,
  sol: `Step 1: ΔX = ${P2.X[3]} − ${P2.X[2]} = ${P2.dX[2]} thousand tonnes of rice.\nStep 2: ΔY = ${P2.Y[2]} − ${P2.Y[3]} = ${P2.give[2]} thousand tonnes of steel.\nStep 3: MRT = ${P2.give[2]} ÷ ${P2.dX[2]} = ${P2.mrt[2]}.`,
}));
Q('n_p2_recip', num({
  t: 2, d: 4, c: 'application', value: blRecip, unit: 'thousand tonnes of rice per thousand tonnes of steel', tol: 0,
  stem: `For the Belmora schedule ${sBl}, the economy moves from A to B. How many thousand tonnes of rice must be given up for each extra thousand tonnes of steel when the move is made in the opposite direction, from B back to A?`,
  sol: `Step 1: From A to B, ${P2.dX[0]} thousand tonnes of rice cost ${P2.give[0]} thousand tonnes of steel, so MRT = ${P2.give[0]} ÷ ${P2.dX[0]} = ${P2.mrt[0]}.\nStep 2: Going back, ${P2.give[0]} thousand tonnes of steel are gained for ${P2.dX[0]} thousand tonnes of rice, so each thousand tonnes of steel costs ${P2.dX[0]} ÷ ${P2.give[0]} = ${blRecip} thousand tonnes of rice.`,
}));
Q('n_p3_mrt', num({
  t: 2, d: 2, c: 'application', value: P3.mrt[1], unit: 'thousand tablets per hundred tonnes of apples', tol: 0,
  stem: `Kelvaria produces apples and tablets as follows: ${sKv}. Find the marginal rate of transformation between B and C.`,
  sol: `Step 1: ΔX = ${P3.X[2]} − ${P3.X[1]} = ${P3.dX[1]} hundred tonnes of apples.\nStep 2: ΔY = ${P3.Y[1]} − ${P3.Y[2]} = ${P3.give[1]} thousand tablets.\nStep 3: MRT = ${P3.give[1]} ÷ ${P3.dX[1]} = ${P3.mrt[1]}.`,
}));
Q('n_p3_avg', num({
  t: 2, d: 4, c: 'application', value: kvAvg, unit: 'thousand tablets per hundred tonnes of apples', tol: 0,
  stem: `Using the Kelvaria schedule ${sKv}, find the average number of thousand tablets given up per hundred tonnes of apples when apple output rises from B to D.`,
  sol: `Step 1: Tablets given up = ${P3.Y[1]} − ${P3.Y[3]} = ${P3.Y[1] - P3.Y[3]} thousand.\nStep 2: Apples gained = ${P3.X[3]} − ${P3.X[1]} = ${P3.X[3] - P3.X[1]} hundred tonnes.\nStep 3: Average = ${P3.Y[1] - P3.Y[3]} ÷ ${P3.X[3] - P3.X[1]} = ${kvAvg}. The two marginal rates, ${P3.mrt[1]} and ${P3.mrt[2]}, average ${(P3.mrt[1] + P3.mrt[2]) / 2} for equal steps.`,
}));
Q('n_idle', num({
  t: 2, d: 3, c: 'application', value: idle, unit: 'thousand metres of cloth', tol: 0,
  stem: `Tarvania's frontier is ${sTv}, with cloth falling smoothly as wheat rises. During a slump the economy produces ${UX} lakh tonnes of wheat and ${UY} thousand metres of cloth. How many more thousand metres of cloth could it produce, with no loss of wheat, if all resources were fully and efficiently used?`,
  sol: `Step 1: On the frontier, ${UX} lakh tonnes of wheat go with ${P1.Y[UX]} thousand metres of cloth.\nStep 2: Idle capacity = ${P1.Y[UX]} − ${UY} = ${idle} thousand metres of cloth.`,
}));
Q('n_growth', num({
  t: 2, d: 4, c: 'application', value: gainOut, unit: 'thousand metres of cloth', tol: 0,
  stem: `Tarvania's frontier gives ${P1.Y[UX]} thousand metres of cloth at ${UX} lakh tonnes of wheat. After a rise in resources and better technology the new frontier gives the maximum of ${fOut(0)} thousand metres of cloth with no wheat and ${OUTX} lakh tonnes of wheat with no cloth, and passes through ${fOut(UX)} thousand metres of cloth at ${UX} lakh tonnes of wheat. By how many thousand metres of cloth has the economy's capacity grown at ${UX} lakh tonnes of wheat?`,
  sol: `Step 1: New cloth at ${UX} lakh tonnes of wheat = ${fOut(UX)}.\nStep 2: Old cloth at the same wheat = ${f1(UX)}.\nStep 3: Gain = ${fOut(UX)} − ${f1(UX)} = ${gainOut} thousand metres.`,
}));
Q('n_pct_cloth', num({
  t: 2, d: 3, c: 'application', value: pctCloth, unit: 'per cent', tol: 0,
  stem: `The maximum cloth Tarvania can produce rises from ${f1(0)} to ${fOut(0)} thousand metres after growth. By what per cent has the maximum output of cloth risen?`,
  sol: `Step 1: Rise = ${fOut(0)} − ${f1(0)} = ${fOut(0) - f1(0)} thousand metres.\nStep 2: Per cent rise = ${fOut(0) - f1(0)} ÷ ${f1(0)} × 100 = ${pctCloth}.`,
}));
Q('n_farm_oc', num({
  t: 2, d: 2, c: 'application', value: farmOC, unit: 'rupees', tol: 0,
  stem: `Farmer Dilbag of Bhavpur earns ${inr(FARM[0][1])} from sugarcane, ${inr(FARM[1][1])} from paddy or ${inr(FARM[2][1])} from vegetables on his two hectares. He chooses sugarcane. Find the opportunity cost of his choice in rupees.`,
  sol: `Step 1: The alternatives given up are paddy (${inr(FARM[1][1])}) and vegetables (${inr(FARM[2][1])}).\nStep 2: The next best alternative is paddy, so the opportunity cost is ${inr(farmOC)}.`,
}));
Q('n_tech_diff', num({
  t: 2, d: 3, c: 'application', value: techDiff, unit: 'rupees', tol: 0,
  stem: `Dilbag can harvest his field with ${LAB_N} workers for ${LAB_D} days at ${inr(LAB_W)} per worker per day, or hire a harvesting machine for ${HV_D} days at ${inr(HV_R)} per day. By how many rupees is the capital-intensive method cheaper?`,
  sol: `Step 1: Labour cost = ${LAB_N} × ${LAB_D} × ${LAB_W} = ${inr(labCost)}.\nStep 2: Machine cost = ${HV_D} × ${HV_R} = ${inr(hvCost)}.\nStep 3: Difference = ${labCost} − ${hvCost} = ${inr(techDiff)}.`,
}));

// ---------------------------------------------------------------- short answers, 2 marks
Q('s2_scarcity', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is scarcity? Why does it make choice unavoidable for the imagined island economy of Marrow?',
  model: 'Scarcity means that the resources available are limited compared with the wants to be satisfied. Marrow cannot meet all its wants, and since its land, labour and funds have alternative uses, using them for one purpose means giving up another. This forces it to choose.',
  sol: 'Scarcity: limited resources, many wants; alternative uses force choice.',
  scheme: [['Scarcity defined', 1], ['Link with alternative uses and choice', 1]],
}));
Q('s2_mm', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish microeconomics from macroeconomics, giving one imagined example of each from the economy of Kelvaria.',
  model: 'Microeconomics studies individual units such as a consumer, a producer or a single market, for example how the price of tablets is set in one market. Macroeconomics studies the economy as a whole, for example the general price level or total employment of Kelvaria.',
  sol: 'Micro: individual units; macro: the whole economy; with examples.',
  scheme: [['Micro and macro distinguished', 1], ['One example of each', 1]],
}));
Q('s2_pos_norm', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Classify as positive or normative, with a reason: (i) "Cloth output in Tarvania rose last year." (ii) "Tarvania should tax luxury cloth heavily."',
  model: 'Statement (i) is positive because it describes what is and can be checked against data on cloth output. Statement (ii) is normative because the word should expresses a value judgement about what ought to be done, which facts alone cannot settle.',
  sol: '(i) positive, testable; (ii) normative, value judgement.',
  scheme: [['Statement (i) positive with reason', 1], ['Statement (ii) normative with reason', 1]],
}));
Q('s2_oc', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Define opportunity cost. What is the opportunity cost for Dilbag of Bhavpur of growing sugarcane (${inr(FARM[0][1])}) when paddy would bring ${inr(FARM[1][1])} and vegetables ${inr(FARM[2][1])}?`,
  model: `Opportunity cost means the worth of the best alternative given up when one option is chosen. For Dilbag the next best use of the land is paddy, so the opportunity cost of growing sugarcane is ${inr(farmOC)}.`,
  sol: `Definition; next best alternative paddy, ${inr(farmOC)}.`,
  scheme: [['Opportunity cost defined', 1], [`Correct figure ${inr(farmOC)} with reason`, 1]],
}));
Q('s2_ppf_def', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Define the production possibility frontier of the imagined economy of Belmora, which makes rice and steel.',
  model: 'The production possibility frontier of Belmora shows the different combinations of rice and steel that the economy can produce with its given resources and technology when the resources are fully and efficiently used. Every point on the curve is an efficient combination.',
  sol: 'Combinations of two goods, given resources and technology, full and efficient use.',
  scheme: [['Combinations of two goods', 1], ['Given resources and technology, full and efficient use', 1]],
}));
Q('s2_assump', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'State any four assumptions behind the production possibility frontier of an imagined two-good economy.',
  model: 'The frontier assumes that the resources of the economy are fixed, that technology is given, that the resources are fully and efficiently used, and that the resources are not equally efficient in producing both goods. If any of these changes, the frontier changes.',
  sol: 'Fixed resources, given technology, full and efficient use, not equally efficient resources.',
  scheme: [['Any two assumptions', 1], ['Any other two assumptions', 1]],
}));
Q('s2_inside_outside', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'What does it mean when the imagined economy of Lumeria is producing at a point inside its frontier, and why can it not produce at a point outside it?',
  model: 'A point inside the frontier means that some resources are unemployed or used inefficiently, so the output of at least one good could be raised. A point outside is beyond what the given resources and technology can produce, so it is unattainable.',
  sol: 'Inside: underuse of resources; outside: unattainable.',
  scheme: [['Inside: unemployment or inefficiency', 1], ['Outside: unattainable with given resources and technology', 1]],
}));
Q('s2_mrt', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `State the formula for the marginal rate of transformation and find it between A and B for Lumeria's schedule ${sLm}.`,
  model: `MRT = ΔY ÷ ΔX, the units of one good given up per extra unit of the other. From A to B, ${P5.give[0]} thousand sewing machines are given up for ${P5.dX[0]} thousand bicycles, so MRT = ${P5.give[0]} ÷ ${P5.dX[0]} = ${P5.mrt[0]}.`,
  sol: `MRT between A and B is ${P5.mrt[0]}.`,
  scheme: [['Formula', 1], ['Computation', 1]],
}));
Q('s2_how', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `Explain the problem of how to produce, using Dilbag's choice between ${LAB_N} hired workers for ${LAB_D} days and a machine hired for ${HV_D} days.`,
  model: `How to produce is the choice of technique. Dilbag may use a labour-intensive method, costing ${inr(labCost)}, or a capital-intensive method, costing ${inr(hvCost)}. He compares the costs and the output and selects the technique that suits him better.`,
  sol: `Technique choice; labour ${inr(labCost)} versus machine ${inr(hvCost)}.`,
  scheme: [['Problem identified as choice of technique', 1], ['Labour-intensive versus capital-intensive illustrated', 1]],
}));
Q('s2_forwhom', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain the problem of for whom to produce, with the imagined economy of Dunmere in mind.',
  model: 'For whom to produce is the problem of distributing the output among the members of the economy. Dunmere must decide who will receive the goods and services it produces, for example the share going to workers, owners and the needy, since people with more income can buy more.',
  sol: 'Distribution of output among people.',
  scheme: [['Distribution of output stated', 1], ['Link with income or share of groups', 1]],
}));

// ---------------------------------------------------------------- short answers, 3 marks
Q('s3_types', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Distinguish a centrally planned economy from a market economy by describing who takes the central decisions in each. Name the third type and describe it briefly.',
  model: 'In a centrally planned economy a central authority takes the decisions on what, how and for whom to produce, following a plan. In a market economy buyers and sellers take them through markets and prices. A mixed economy combines both, with private firms working through markets and the government playing a role in production and regulation.',
  sol: 'Planned: authority decides; market: prices decide; mixed: both.',
  scheme: [['Centrally planned economy described', 1], ['Market economy described', 1], ['Mixed economy named and described', 1]],
}));
Q('s3_central', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Explain the three central problems of an economy by taking the imagined economy of Kelvaria, which can produce apples and tablets.',
  model: 'What to produce: Kelvaria must choose how many apples and how many tablets to make. How to produce: it must choose between labour-intensive and capital-intensive techniques for each. For whom to produce: it must decide how the apples and tablets will be shared among its households. These problems arise from scarcity and alternative uses.',
  sol: 'What, how, for whom, applied to Kelvaria.',
  scheme: [['What to produce', 1], ['How to produce', 1], ['For whom to produce', 1]],
}));
Q('s3_concave', short({
  t: 2, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: `The frontier of Kelvaria's apples and tablets is concave to the origin, with marginal rates ${J(P3.mrt)} along ${sKv}. Explain why.`,
  model: `The marginal rate rises from ${P3.mrt[0]} to ${P3.mrt[3]}, so each extra hundred tonnes of apples costs more tablets. Resources are not equally efficient in both goods: the best orchard land and workers are used first for apples, later ones are less suited and are taken from tablet making. So the opportunity cost rises and the curve is concave.`,
  sol: 'Increasing marginal opportunity cost because resources are not equally efficient.',
  scheme: [['Rising marginal rate with the figures', 1], ['Resources not equally efficient in both goods', 1], ['Increasing opportunity cost gives concavity', 1]],
}));
Q('s3_mrt_calc', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `The imagined economy of Lumeria has the schedule ${sLm}. Find the marginal rate of transformation for each move and state whether it rises.`,
  model: `${mrtText(P5)}. The marginal rates ${J(P5.mrt)} rise at every step, so the opportunity cost of bicycles increases and the frontier is concave to the origin.`,
  sol: `MRT: ${J(P5.mrt)}; it rises.`,
  scheme: [['Method ΔY ÷ ΔX shown', 1], ['All four rates correct', 1], ['Rise stated with meaning', 1]],
}));
Q('s3_shift', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'State two causes of a rightward shift and one cause of a leftward shift of the production possibility frontier of the imagined economy of Orlin, and explain what each shows.',
  model: 'A rightward shift occurs when Orlin\'s resources increase, such as new labour or capital, or when its technology improves; both raise the maximum possible output, which shows economic growth. A leftward shift occurs when resources are destroyed, for example by an earthquake or flood, lowering what Orlin can produce.',
  sol: 'Right: more resources, better technology; left: destruction.',
  scheme: [['Two causes of a rightward shift', 1], ['Meaning of growth', 1], ['Cause of a leftward shift', 1]],
}));
Q('s3_scarcity_oc', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain how scarcity, choice and opportunity cost are connected, using the imagined town of Halsey that has one empty plot and wishes to build either a school or a hospital.',
  model: 'Halsey has one plot, a scarce resource, with two possible uses, so it must choose. If it builds the school, the hospital cannot be built on that plot. The hospital forgone is the opportunity cost of the school. Without scarcity, both could be built and no choice or cost would arise.',
  sol: 'Scarcity forces choice; the forgone use is the opportunity cost.',
  scheme: [['Scarcity with two alternative uses', 1], ['Choice made', 1], ['Forgone alternative as opportunity cost', 1]],
}));

// ---------------------------------------------------------------- long answers, 5 marks
Q('l_mm', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the difference between microeconomics and macroeconomics, and between positive and normative economics, giving one imagined example of each from the economy of Quillon.',
  model: 'Microeconomics studies individual units, such as a household, a firm or a single market; the price of tea in one Quillon market is an example. Macroeconomics studies the economy as a whole, such as national income, total employment and the general price level; the total employment of Quillon is an example. Positive economics deals with what is, through statements that can be tested with facts, for example that tea output rose last year. Normative economics deals with what ought to be and rests on value judgements, for example that Quillon should subsidise tea growers.',
  sol: 'Micro versus macro and positive versus normative, with examples.',
  scheme: [['Microeconomics with example', 1], ['Macroeconomics with example', 1], ['Positive economics with example', 1.5], ['Normative economics with example', 1.5]],
}));
Q('l_ppf', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `The imagined economy of Lumeria can produce the combinations ${sLm}. Find the marginal rate of transformation for each move, state what happens to it, and explain the shape of the frontier.`,
  model: `For each move MRT = ΔY ÷ ΔX: ${P5.mrt.map((m, i) => `${LET[i]} to ${LET[i + 1]}, ${P5.give[i]} ÷ ${P5.dX[i]} = ${m}`).join('; ')}. The marginal rate rises at every step, so each extra thousand bicycles costs more sewing machines. This happens because resources are not equally efficient in both goods. Rising marginal opportunity cost makes the frontier concave to the origin.`,
  sol: `MRT ${J(P5.mrt)}; rising; concave.`,
  scheme: [['Formula ΔY ÷ ΔX', 1], ['Four correct rates', 2], ['Rise noted', 1], ['Reason: resources not equally efficient, concave frontier', 1]],
}));
Q('l_shifts', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain, with reference to the imagined economy of Tarvania, how the production possibility frontier shifts or rotates when resources and technology change.',
  model: 'If Tarvania\'s resources grow or its technology improves for both wheat and cloth, the whole frontier shifts to the right, showing growth. If an earthquake or flood destroys resources, the frontier shifts to the left. If technology improves for one good only, say cloth, the frontier rotates: the cloth intercept rises while the wheat intercept stays the same. In each case the economy can produce a different set of combinations from before.',
  sol: 'Right, left, rotation, with causes.',
  scheme: [['Rightward shift with causes', 2], ['Leftward shift with cause', 1.5], ['Rotation with example', 1.5]],
}));
Q('l_central', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the three central problems of an economy with the imagined economy of Dunmere in mind, and say how the production possibility frontier helps to illustrate them.',
  model: 'Dunmere must decide what to produce and in what quantities, because its resources are scarce and have alternative uses. It must decide how to produce, choosing a labour-intensive or capital-intensive technique. It must decide for whom to produce, that is how output is distributed among its people. The frontier shows the first problem as a choice of one point among many on the curve, and shows how resources can be wasted when the economy is inside the curve. A shift of the frontier shows growth.',
  sol: 'What, how, for whom; the frontier shows choice, inefficiency and growth.',
  scheme: [['What to produce', 1], ['How to produce', 1], ['For whom to produce', 1], ['Choice of a point on the frontier', 1], ['Inside point and shift illustrated', 1]],
}));
Q('l_econ_types', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Describe the three types of economy, centrally planned, market and mixed, in terms of how each solves the central problems, using the imagined economies of Orlin, Quillon and Dunmere.',
  model: 'In Orlin, a centrally planned economy, the government decides what, how and for whom to produce and owns most resources. In Quillon, a market economy, buyers and sellers decide through markets and prices, producers following profit and consumers their incomes. In Dunmere, a mixed economy, private firms and the government both take part: markets guide much of the production while the state provides services and regulates. Each type answers the same three problems, but by a different decision maker.',
  sol: 'Planned: authority; market: prices; mixed: both.',
  scheme: [['Planned economy described', 1.5], ['Market economy described', 1.5], ['Mixed economy described', 1.5], ['Link with the three central problems', 0.5]],
}));
Q('l_ppf_points', long({
  t: 2, d: 4, c: 'application', marks: 5, wl: L5,
  stem: `Tarvania's frontier passes through ${sTv}. Explain what the points (${UX} lakh tonnes of wheat, ${UY} thousand metres of cloth) and (${OX}, ${OY}) show, and what the first point says about unemployment.`,
  model: `At ${UX} lakh tonnes of wheat the frontier gives ${P1.Y[UX]} thousand metres of cloth, so ${UY} lies inside the frontier by ${idle}: the point is attainable but resources are unemployed or inefficiently used, and ${idle} more cloth could be made with no loss of wheat. At ${OX} lakh tonnes of wheat the frontier gives ${P1.Y[OX]}, so ${OY} is ${over} beyond it and is unattainable with present resources and technology. Moving to the frontier removes unemployment; reaching beyond needs growth.`,
  sol: `Inside point: ${idle} idle; outside point: ${over} beyond the frontier.`,
  scheme: [['Frontier values at the two wheat levels', 1], ['Inside point: underuse, idle amount', 2], ['Outside point: unattainable, amount', 1], ['Remedies: move to the frontier; growth needed', 1]],
}));

// ---------------------------------------------------------------- case-based (imagined passages)
Q('cb_kelvaria', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined passage and answer the questions that follow.',
  passage: '**Imagined statements heard at a meeting in Kelvaria**\n\nA citizens\' meeting of the imagined country of Kelvaria hears four statements. (1) "The general price level of Kelvaria rose last year." (2) "The price of tablets in the Marlow market should be fixed by the government." (3) "Tablet output of Kelvaria fell after the factory fire." (4) "The government ought to give every school a tablet."',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which two of the four statements are positive?', model: 'Statements (1) and (3), which describe what happened and can be checked with data.', sol: 'Statements 1 and 3.', scheme: [['Both positive statements', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which statement deals with macroeconomics and why?', model: 'Statement (1), because the general price level concerns the whole economy.', sol: 'Statement 1: whole economy.', scheme: [['Statement and reason', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain why statements (2) and (4) are normative and say whether facts alone can settle them.', model: 'Statements (2) and (4) use should and ought, which express value judgements about what ought to be done. Facts can inform the debate, for example the cost of tablets, but cannot alone settle what should be done.', sol: 'Value judgements.', scheme: [['Normative with reason', 1], ['Facts alone cannot settle', 1]] }), [
      short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Write one positive and one normative statement of your own about the tablet industry of Kelvaria and justify each.', model: 'Positive: tablet output of Kelvaria rose last year; it can be tested with output figures. Normative: tablet makers should be taxed less; it is a judgement about what ought to be done.', sol: 'Own examples.', scheme: [['Positive example with reason', 1], ['Normative example with reason', 1]] }),
    ]),
  ],
}));
Q('cb_lumeria', caseQ({
  t: 2, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined production schedule of Lumeria**\n\nThe imagined economy of Lumeria uses all its resources fully and efficiently to produce bicycles and sewing machines: ${sLm}.`,
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Find the marginal rate of transformation when Lumeria moves from A to B.', model: `${P5.give[0]} ÷ ${P5.dX[0]} = **${P5.mrt[0]}** thousand sewing machines per thousand bicycles.`, sol: `MRT ${P5.mrt[0]}.`, scheme: [['Correct MRT', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Find the marginal rate of transformation when Lumeria moves from D to E.', model: `${P5.give[3]} ÷ ${P5.dX[3]} = **${P5.mrt[3]}** thousand sewing machines per thousand bicycles.`, sol: `MRT ${P5.mrt[3]}.`, scheme: [['Correct MRT', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): What do the two answers show about the opportunity cost of bicycles, and why does it behave so?', model: `The cost rises from ${P5.mrt[0]} to ${P5.mrt[3]}. Resources are not equally efficient in both goods, so later bicycles need resources less suited to them. This makes the frontier concave to the origin.`, sol: 'Rising cost; concave.', scheme: [['Opportunity cost rises', 1], ['Reason', 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Lumeria improves its technology in sewing machines only. How does the frontier change?', model: 'The frontier rotates: the sewing-machine intercept moves out, while the maximum number of bicycles stays the same, because technology has improved for one good only.', sol: 'Rotation.', scheme: [['Rotation of the frontier', 1], ['Intercept change explained', 1]] }),
    ]),
  ],
}));
Q('cb_bhavpur', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined passage and answer the questions that follow.',
  passage: `**Imagined choices of farmer Dilbag of Bhavpur**\n\nDilbag has two hectares and can grow sugarcane (income ${inr(FARM[0][1])}), paddy (${inr(FARM[1][1])}) or vegetables (${inr(FARM[2][1])}). He chooses sugarcane. For the harvest he can hire ${LAB_N} workers for ${LAB_D} days at ${inr(LAB_W)} per worker per day or a machine for ${HV_D} days at ${inr(HV_R)} per day.`,
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'What is the opportunity cost of Dilbag\'s choice of sugarcane?', model: `The next best alternative, paddy: **${inr(farmOC)}**.`, sol: `${inr(farmOC)}.`, scheme: [['Correct opportunity cost', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Which harvest technique is cheaper, and by how much?', model: `The machine, ${inr(hvCost)} against ${inr(labCost)}: cheaper by **${inr(techDiff)}**.`, sol: `Machine cheaper by ${inr(techDiff)}.`, scheme: [['Technique and difference', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Which central problems are illustrated by Dilbag\'s choices of crop and of harvest method?', model: 'The choice of crop is the problem of what to produce, and the choice between workers and machine is the problem of how to produce, the choice of technique.', sol: 'What and how.', scheme: [['Crop: what to produce', 1], ['Harvest method: how to produce', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): In what way is Dilbag\'s choice of technique affected by the cost of labour and machines?', model: `He compares the costs of the two methods, ${inr(labCost)} and ${inr(hvCost)}. A rise in wages would make the labour-intensive method dearer and favour the machine, while a rise in machine hire would favour workers.`, sol: 'Relative costs decide technique.', scheme: [['Comparison of costs', 1], ['Effect of changes in wages or hire charges', 1]] }),
    ]),
  ],
}));
Q('cb_tarvania', caseQ({
  t: 2, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined slump in Tarvania**\n\nTarvania's frontier of wheat and cloth passes through ${sTv}. During a slump the economy produces ${UX} lakh tonnes of wheat and ${UY} thousand metres of cloth.`,
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Does the slump point lie on, inside or outside the frontier?', model: `**Inside**, since the frontier gives ${P1.Y[UX]} thousand metres of cloth at ${UX} lakh tonnes of wheat and the economy makes only ${UY}.`, sol: 'Inside.', scheme: [['Inside with reason', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'How much more cloth could be made with no loss of wheat?', model: `${P1.Y[UX]} − ${UY} = **${idle} thousand metres**.`, sol: `${idle}.`, scheme: [['Correct amount', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): What does the slump show about resource use, and what would move the economy to the frontier?', model: 'It shows that some resources are unemployed or used inefficiently. Employing them fully and efficiently would move the economy up to the frontier without any new resources.', sol: 'Underuse; move to the frontier.', scheme: [['Underuse of resources', 1], ['Full and efficient use moves it to the frontier', 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): An earthquake then destroys many factories. How would the frontier change and what would happen to the highest possible output?', model: 'The frontier would shift inward, to the left, since resources are destroyed. The maximum possible output of both wheat and cloth would fall.', sol: 'Leftward shift.', scheme: [['Inward shift', 1], ['Lower maximum output', 1]] }),
    ]),
  ],
}));
