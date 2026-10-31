// ISC 12 Economics, ch07 Production Function and Law of Variable Proportions — question bank. Every firm, farm,
// town and figure is imagined by SOYL; no textbook example, exercise, specimen-paper or past-paper item is reused
// (D-036) — in particular the ISC 2027 specimen's "returns to scale or returns to a factor" image item is not reused.
// Every number in a stem, key or worked solution is computed here and asserted.
// Removed topics honoured: no question asks the student to read the three stages off a Law of Variable Proportions
// schedule (schedules are for understanding only); returns to scale is taught and tested as meaning only.
// Stage convention used in this chapter: Stage I ends where AP is at its maximum (AP = MP); Stage II ends where TP is
// at its maximum (MP = 0); Stage III follows (MP negative). No item depends on where Stage I ends.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from '../../isc-12-economics-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const S4 = [70, 110];
const L5 = [100, 150];
const L8 = [150, 220];

export const r3 = (x) => Math.round(x * 1000) / 1000;
const assert = (cond, msg) => { if (!cond) throw new Error(`questions.mjs: ${msg}`); };
/** MP schedule from a TP schedule (TP of 0 units = 0). */
export const mpOf = (tp) => tp.map((t, i) => t - (i ? tp[i - 1] : 0));
/** AP schedule from a TP schedule (units 1, 2, 3 …). */
export const apOf = (tp) => tp.map((t, i) => r3(t / (i + 1)));
/** TP schedule from an MP schedule. */
export const tpOf = (mp) => mp.reduce((a, m) => [...a, (a.length ? a[a.length - 1] : 0) + m], []);

// ---------------------------------------------------------------- the smooth production function used in the decks
// TP = 9L^2 − L^3 (quintals of output, L workers on a fixed plot): MP = 18L − 3L^2, AP = 9L − L^2.
export const TP = (L) => 9 * L * L - L * L * L;
export const MP = (L) => 18 * L - 3 * L * L;
export const AP = (L) => 9 * L - L * L;
export const L_INFLEX = 3; // MP maximum
export const L_APMAX = 4.5; // AP maximum, MP = AP
export const L_TPMAX = 6; // TP maximum, MP = 0
assert(MP(L_INFLEX) === 27 && TP(L_INFLEX) === 54, 'inflexion');
assert(AP(L_APMAX) === MP(L_APMAX) && AP(L_APMAX) === 20.25 && TP(L_APMAX) === 91.125, 'AP max');
assert(MP(L_TPMAX) === 0 && TP(L_TPMAX) === 108 && AP(L_TPMAX) === 18, 'TP max');
assert(MP(7) === -21 && TP(7) === 98 && AP(7) === 14, 'stage III point');
// numerical check that L_APMAX really is the AP maximum and L_TPMAX the TP maximum
for (const d of [-0.1, 0.1]) assert(AP(L_APMAX + d) < AP(L_APMAX) && TP(L_TPMAX + d) < TP(L_TPMAX) && MP(L_INFLEX + d) < MP(L_INFLEX), 'maxima');

// ---------------------------------------------------------------- imagined schedules (all asserted)
// Orange-packing unit in an imagined Nagpur cooperative: one packing shed (fixed), workers variable. Crates a day.
export const NAG = { tp: [12, 30, 51, 68, 80, 84, 84, 80] };
export const NAG_MP = mpOf(NAG.tp);
export const NAG_AP = apOf(NAG.tp);
assert(NAG_MP.join() === '12,18,21,17,12,4,0,-4', 'nagpur MP');
assert(NAG_AP.join() === '12,15,17,17,16,14,12,10', 'nagpur AP');

// Rice-transplanting crew on an imagined two-acre plot near Thanjavur: MP of each extra labourer (rows a day).
export const THAN = { mp: [6, 10, 13, 9, 5, 2, 0, -3] };
export const THAN_TP = tpOf(THAN.mp);
assert(THAN_TP.join() === '6,16,29,38,43,45,45,42', 'thanjavur TP');

// Bakery in an imagined Shillong lane: TP of loaves with 4 and 5 bakers.
export const BAKE = { l0: 4, tp0: 160, l1: 5, tp1: 185 };
export const BAKE_MP = BAKE.tp1 - BAKE.tp0;
export const BAKE_AP1 = BAKE.tp1 / BAKE.l1;
assert(BAKE_MP === 25 && BAKE_AP1 === 37, 'bakery');

// Tailoring unit in an imagined Tiruppur lane: AP of 8 shirts with 6 tailors; 7th tailor's MP is 1.
export const TAIL = { l: 6, ap: 8, mp7: 1 };
export const TAIL_TP6 = TAIL.l * TAIL.ap;
export const TAIL_TP7 = TAIL_TP6 + TAIL.mp7;
export const TAIL_AP7 = r3(TAIL_TP7 / 7);
assert(TAIL_TP6 === 48 && TAIL_TP7 === 49 && TAIL_AP7 === 7, 'tailors');

// Bandhani workshop in an imagined Jodhpur lane: MP of four dyers (dupattas a day), one dyeing vat.
export const JOD = { mp: [5, 9, 7, 3] };
export const JOD_TP = tpOf(JOD.mp);
export const JOD_AP = apOf(JOD_TP);
assert(JOD_TP.join() === '5,14,21,24' && JOD_AP.join() === '5,7,7,6', 'jodhpur');

// Returns to scale for three imagined factories when every input is doubled.
export const RTS = [
  { firm: 'Kolhapur sugar mill', before: 400, after: 960, kind: 'Increasing returns to scale' },
  { firm: 'Ankleshwar paint plant', before: 250, after: 500, kind: 'Constant returns to scale' },
  { firm: 'Ludhiana cycle-parts unit', before: 300, after: 480, kind: 'Diminishing returns to scale' },
];
export const rtsPct = (x) => r3(((x.after - x.before) / x.before) * 100);
assert(rtsPct(RTS[0]) === 140 && rtsPct(RTS[1]) === 100 && rtsPct(RTS[2]) === 60, 'rts');

const md = (rows, head) => `| ${head.join(' | ')} |\n|${head.map(() => '---').join('|')}|\n${rows.map((r) => `| ${r.join(' | ')} |`).join('\n')}`;
export const nagTable = (cols = ['tp']) => md(NAG.tp.map((t, i) => [String(i + 1), ...(cols.includes('tp') ? [String(t)] : []), ...(cols.includes('mp') ? [String(NAG_MP[i])] : []), ...(cols.includes('ap') ? [String(NAG_AP[i])] : [])]), ['Workers', ...(cols.includes('tp') ? ['TP (crates)'] : []), ...(cols.includes('mp') ? ['MP'] : []), ...(cols.includes('ap') ? ['AP'] : [])]);

// ================================================================ t01 Production function; short run and long run
Q('m_pf_meaning', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'For a firm, the production function shows the',
  opts: [
    'technical relationship between the physical quantities of inputs used and the maximum physical output obtained',
    'relationship between the price of a good and the quantity of it produced',
    'money cost of producing each level of output',
    'relationship between output and the profit the firm earns',
  ],
  sol: 'A production function is a purely technical, physical relation: given technology, it states the most output a set of inputs can produce. Prices, costs and profit are not part of it.',
}));
Q('m_fixed_factor', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'An imagined Sangli turmeric-grinding unit can hire extra helpers within a day but needs eighteen months to install a second grinding mill. In the short run, which input is the fixed factor?',
  opts: ['The grinding mill', 'The helpers', 'The raw turmeric', 'The electricity used each day'],
  sol: 'A fixed factor is one whose quantity cannot be changed in the period considered. The mill cannot be added for eighteen months; helpers, turmeric and power can be varied quickly, so they are variable factors.',
}));
Q('m_long_run', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The long run, in the theory of production, is a period in which',
  opts: [
    'all factors of production can be varied',
    'at least one factor of production stays fixed',
    'only labour can be changed',
    'the firm cannot change its output at all',
  ],
  sol: 'In the long run every input, including plant and machinery, can be changed. A period with at least one fixed factor is the short run.',
}));
Q('m_sr_function', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'A Kanpur leather unit (imagined) studies how its daily output of bags changes as it adds cutters to its six fixed cutting tables. Which relationship is it studying?',
  opts: [
    'A short-run production function, which leads to returns to a factor',
    'A long-run production function, which leads to returns to scale',
    'A cost function, which leads to average cost',
    'A demand function, which leads to the law of demand',
  ],
  sol: 'Only one input (cutters) varies while the tables stay fixed: that is the short-run production function, whose behaviour is described by returns to a factor (the Law of Variable Proportions). Returns to scale need all inputs to vary.',
}));
Q('tf_pf_physical', tf({
  t: 1, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? A production function is stated in physical units of inputs and output, not in rupees.',
  sol: 'It links quantities of inputs (workers, machine-hours, kilograms of raw material) with a quantity of output; money values belong to cost and revenue analysis.',
}));
Q('fb_variable_factor', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'A factor whose quantity can be changed in the short run as output changes is called a ___ factor.',
  acc: [['variable']],
  sol: 'Labour and raw materials are usually variable factors; buildings and heavy machinery are fixed in the short run.',
}));
Q('s_sr_lr', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between the short-run and the long-run production function, using an imagined Indian brick kiln.',
  model: 'In the **short-run** production function at least one factor is **fixed**: the kiln and its chimney stay the same while the owner adds **moulders**, so output changes only through the variable factor. In the **long-run** function **all factors can vary**: the owner can build a second kiln and change every input together.',
  sol: 'One factor fixed versus all factors variable, with the kiln example.',
  scheme: [['Short run: at least one fixed factor', 1], ['Long run: all factors variable', 1]],
}));
Q('s_fixed_var', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'For an imagined Bhagalpur silk-weaving shed, classify the looms, the shed, the weavers and the silk yarn as fixed or variable factors in the short run, with a reason.',
  model: 'The **looms** and the **shed** are **fixed**: they cannot be increased quickly. The **weavers** and the **silk yarn** are **variable**: the owner can hire more weavers or buy more yarn within days as output changes.',
  sol: 'Two fixed and two variable inputs, with the time-to-change reason.',
  scheme: [['Looms and shed fixed with reason', 1], ['Weavers and yarn variable with reason', 1]],
}));

// ================================================================ t02 TP, AP and MP and their relationships
Q('m_mp_meaning', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Marginal physical product of labour is the',
  opts: [
    'change in total product when one more unit of labour is employed',
    'total product divided by the number of workers',
    'total output produced by all the workers together',
    'output of the most efficient worker in the firm',
  ],
  sol: 'MP = TPn − TPn−1, the addition to total product from one more unit of the variable factor. TP ÷ L is average product.',
}));
Q('m_bake_mp', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `A bakery in an imagined Shillong lane makes ${BAKE.tp0} loaves a day with ${BAKE.l0} bakers and ${BAKE.tp1} loaves with ${BAKE.l1} bakers, with the same oven. What is the marginal product of the fifth baker?`,
  opts: [String(BAKE_MP), String(BAKE_AP1), String(BAKE.tp1), String(BAKE.tp0 / BAKE.l0)],
  sol: `MP of the fifth baker = ${BAKE.tp1} − ${BAKE.tp0} = ${BAKE_MP} loaves. ${BAKE_AP1} is the average product with five bakers and ${BAKE.tp0 / BAKE.l0} the average with four.`,
}));
Q('m_tp_max', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Total physical product of a variable factor reaches its maximum when the marginal product of that factor is',
  opts: ['zero', 'at its maximum', 'equal to average product', 'negative'],
  sol: 'TP keeps rising while MP is positive; it stops rising when the extra unit adds nothing (MP = 0) and falls once MP turns negative. So TP is at its maximum where MP is zero.',
}));
Q('m_ap_max', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Average product of a variable factor is at its maximum where',
  opts: ['marginal product equals average product', 'marginal product is zero', 'total product is at its maximum', 'marginal product is at its maximum'],
  sol: 'When MP exceeds AP it pulls AP up; when MP is below AP it pulls AP down. AP therefore peaks where MP = AP: the MP curve cuts the AP curve at the top of AP.',
}));
Q('m_tp_rising_slowly', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Between the eighth and twelfth workers at an imagined Tirupur dyeing unit, total product keeps rising but each extra worker adds less than the one before. What is happening to marginal product?',
  opts: ['It is falling but still positive', 'It is rising', 'It is zero', 'It is negative'],
  sol: 'TP rising at a diminishing rate means each addition (MP) is smaller than the last but still adds output: MP is falling and positive. A negative MP would make TP fall.',
}));
Q('m_ap_negative', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which of these statements about a firm producing positive output is correct?',
  opts: [
    'Marginal product can become negative, but average product cannot',
    'Average product can become negative, but marginal product cannot',
    'Both can become negative at the same time',
    'Neither can ever fall',
  ],
  sol: 'AP = TP ÷ L stays positive as long as TP is positive. MP is the change in TP and turns negative when an extra worker reduces total output, for example through overcrowding.',
}));
Q('m_mp_above_ap', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'At an imagined Moradabad brass unit, the marginal product of the next artisan is 14 vases while the average product so far is 11 vases. What happens to average product when this artisan joins?',
  opts: ['It rises', 'It falls', 'It stays the same', 'It becomes zero'],
  sol: 'An addition above the current average raises the average. Since MP (14) exceeds AP (11), AP rises.',
}));
Q('m_nag_ap', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `The imagined Nagpur orange-packing shed packs ${NAG.tp[4]} crates a day with 5 workers. What is the average product per worker at this level?`,
  opts: [String(NAG_AP[4]), String(NAG_MP[4]), String(NAG.tp[4]), String(NAG_AP[3])],
  sol: `AP = TP ÷ L = ${NAG.tp[4]} ÷ 5 = ${NAG_AP[4]} crates. ${NAG_MP[4]} would be the marginal product of the fifth worker.`,
}));
Q('ar_mp_zero', ar({
  t: 2, d: 2, c: 'analysis', key: 'a',
  a: 'When the sixth worker on an imagined Coorg coffee estate adds nothing to the day\'s picking, total product is at its maximum.',
  r: 'Total product rises as long as marginal product is positive and falls when marginal product is negative.',
  sol: 'Both are true, and R explains A: since TP rises while MP is positive and falls once it is negative, the point where MP is zero is where TP stops rising, its maximum.',
}));
Q('ar_ap_mp', ar({
  t: 2, d: 3, c: 'analysis', key: 'c',
  a: 'At an imagined Hubli handloom unit, average product of weavers can keep rising for a while even after marginal product has started to fall.',
  r: 'Average product rises only while marginal product is itself rising.',
  sol: 'A is true: after MP peaks it falls but can still be above AP, and while MP exceeds AP the average keeps rising. R is false: what makes AP rise is MP being greater than AP, not MP rising.',
}));
Q('num_nag_mp', num({
  t: 2, d: 2, c: 'understanding', marks: 1, value: NAG_MP[3], unit: 'crates',
  stem: `The imagined Nagpur shed packs ${NAG.tp[2]} crates a day with 3 workers and ${NAG.tp[3]} with 4. Calculate the marginal product of the fourth worker.`,
  sol: `MP = ${NAG.tp[3]} − ${NAG.tp[2]} = ${NAG_MP[3]} crates.`,
}));
Q('num_than_tp', num({
  t: 2, d: 2, c: 'application', marks: 1, value: THAN_TP[4], unit: 'rows',
  stem: `On an imagined Thanjavur paddy plot the first five transplanting labourers add ${THAN.mp.slice(0, 5).join(', ')} rows a day respectively. Find total product with five labourers.`,
  sol: `TP is the sum of the MPs: ${THAN.mp.slice(0, 5).join(' + ')} = ${THAN_TP[4]} rows.`,
}));
Q('num_tail_ap', num({
  t: 2, d: 3, c: 'application', marks: 2, value: TAIL_AP7, unit: 'shirts',
  stem: `An imagined Tiruppur tailoring unit has an average product of ${TAIL.ap} shirts a day with ${TAIL.l} tailors. The seventh tailor's marginal product is ${TAIL.mp7} shirt. Find the average product with seven tailors.`,
  sol: `TP with 6 tailors = 6 × ${TAIL.ap} = ${TAIL_TP6}. TP with 7 = ${TAIL_TP6} + ${TAIL.mp7} = ${TAIL_TP7}. AP = ${TAIL_TP7} ÷ 7 = ${TAIL_AP7} shirts.`,
  scheme: [['TP with six and seven tailors', 1], [`AP = ${TAIL_AP7}`, 1]],
}));
Q('num_bake_ap', num({
  t: 2, d: 1, c: 'understanding', marks: 1, value: BAKE.tp0 / BAKE.l0, unit: 'loaves',
  stem: `The imagined Shillong bakery makes ${BAKE.tp0} loaves a day with ${BAKE.l0} bakers. What is the average product per baker?`,
  sol: `AP = ${BAKE.tp0} ÷ ${BAKE.l0} = ${BAKE.tp0 / BAKE.l0} loaves.`,
}));
Q('tf_mp_cuts_ap', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? The marginal product curve cuts the average product curve at the highest point of the average product curve.',
  sol: 'AP rises while MP is above it and falls once MP is below it, so the two meet where AP is at its peak.',
}));
Q('tf_tp_falls', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Total product starts falling as soon as marginal product starts falling.',
  sol: 'A falling but positive MP still adds to TP; TP only falls once MP becomes negative. MP falling first makes TP rise at a diminishing rate.',
}));
Q('mt_mp_tp', match({
  t: 2, d: 2, c: 'understanding',
  stem: 'Match each behaviour of marginal product with what happens to total product at the imagined Nagpur packing shed.',
  pairs: [
    ['MP rising', 'TP rises at an increasing rate'],
    ['MP falling but positive', 'TP rises at a diminishing rate'],
    ['MP equal to zero', 'TP is at its maximum'],
    ['MP negative', 'TP falls'],
  ],
  sol: 'TP changes by the amount of MP each time, so the size and sign of MP decide how TP moves.',
}));
Q('s_mp_ap_calc', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: `A floriculture farm near imagined Hosur produces ${NAG.tp[0] * 10} bouquets a week with one helper and ${NAG.tp[1] * 10} with two, with the same greenhouse. Calculate the marginal product and the average product of labour when two helpers are employed.`,
  model: `**MP of the second helper** = ${NAG.tp[1] * 10} − ${NAG.tp[0] * 10} = **${NAG_MP[1] * 10} bouquets**. **AP with two helpers** = ${NAG.tp[1] * 10} ÷ 2 = **${NAG_AP[1] * 10} bouquets** per helper.`,
  sol: 'MP from the change in TP; AP from TP divided by workers.',
  scheme: [['MP calculated', 1], ['AP calculated', 1]],
}));
Q('s_tp_mp_link', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State the relationship between total product and marginal product when marginal product is (i) positive but falling and (ii) negative.',
  model: '(i) When MP is **positive but falling**, TP **still rises**, but at a **diminishing rate**. (ii) When MP is **negative**, the extra unit reduces output, so TP **falls**.',
  sol: 'Two cases of the TP–MP link.',
  scheme: [['Positive falling MP', 1], ['Negative MP', 1]],
}));
Q('s3_nag_schedule', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `The total product of an imagined Nagpur orange-packing shed (one shed, workers variable) is given below. Calculate the marginal and average product for the first four workers and say how AP behaves while MP is above it.\n\n${md(NAG.tp.slice(0, 4).map((t, i) => [String(i + 1), String(t)]), ['Workers', 'TP (crates a day)'])}`,
  model: `MP: **${NAG_MP.slice(0, 4).join(', ')}**. AP: **${NAG_AP.slice(0, 4).join(', ')}**. For the second and third workers MP (${NAG_MP[1]}, ${NAG_MP[2]}) is **above** AP, and AP **rises** (to ${NAG_AP[1]} and ${NAG_AP[2]}); with the fourth worker MP (${NAG_MP[3]}) is equal to AP (${NAG_AP[3]}) and AP stops rising.`,
  sol: 'MP = change in TP; AP = TP ÷ workers; AP rises while MP > AP.',
  scheme: [['MP column', 1], ['AP column', 1], ['Behaviour of AP explained', 1]],
}));
Q('s3_ap_mp_rel', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain three points of the relationship between average product and marginal product of a variable factor, with reference to a described diagram.',
  model: '1. When **MP > AP**, AP **rises**: the MP curve lies **above** the AP curve.\n2. When **MP = AP**, AP is at its **maximum**: MP cuts AP at the top of AP.\n3. When **MP < AP**, AP **falls**; MP can even become **negative** while AP stays positive.',
  sol: 'Three relationship points with the diagram.',
  scheme: [['MP above AP: AP rises', 1], ['MP = AP: AP maximum', 1], ['MP below AP: AP falls', 1]],
}));
Q('s3_than_tp', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `The marginal products of eight successive labourers transplanting paddy on an imagined Thanjavur plot are ${THAN.mp.join(', ')} rows a day. Find total product at each level and identify where total product is at its maximum and where it falls.`,
  model: `TP: **${THAN_TP.join(', ')}**. TP is **at its maximum (45 rows)** with the **sixth and seventh** labourers, where the seventh adds **zero**; with the **eighth** labourer MP is **negative (−3)** and TP **falls** to 42.`,
  sol: 'Cumulative sum of MP; maximum where MP is zero; fall where MP is negative.',
  scheme: [['TP schedule', 1], ['Maximum identified with MP = 0', 1], ['Fall identified with negative MP', 1]],
}));

Q('s3_ap_from_mp', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `At an imagined Jodhpur bandhani (tie-dye) workshop with one dyeing vat, the marginal products of the first four dyers are ${JOD.mp.join(', ')} dupattas a day. Find total and average product for each number of dyers and state what happens to average product when the fourth dyer joins, with the reason.`,
  model: `Total product is the running sum of marginal products, so TP with one to four dyers is **${JOD_TP.join(', ')}** dupattas. Average product is TP divided by the number of dyers: **${JOD_AP.join(', ')}**. When the fourth dyer joins, **AP falls** from ${JOD_AP[2]} to ${JOD_AP[3]}, because his **MP (${JOD.mp[3]}) is below the existing AP (${JOD_AP[2]})**: an addition below the average always pulls the average down.`,
  sol: 'TP is the running sum of MP; AP = TP ÷ dyers; MP below AP pulls AP down.',
  scheme: [['TP schedule', 1], ['AP schedule', 1], ['AP falls because MP < AP', 1]],
}));

// ================================================================ t03 Law of Variable Proportions
Q('m_lvp_statement', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'The Law of Variable Proportions states that, as more units of a variable factor are combined with a fixed factor,',
  opts: [
    'the marginal product of the variable factor may rise at first but must eventually diminish',
    'output always rises in the same proportion as the variable factor',
    'the marginal product of the variable factor keeps rising without limit',
    'total product falls from the very first unit',
  ],
  sol: 'The law describes returns to a factor in the short run: MP may increase at first, but because the fixed factor does not grow, MP eventually diminishes and can become negative.',
}));
Q('m_lvp_assumption', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which of the following is an assumption of the Law of Variable Proportions?',
  opts: [
    'The state of technology remains unchanged',
    'All factors of production are increased together',
    'Units of the variable factor differ in quality',
    'The price of the product keeps rising',
  ],
  sol: 'The law assumes constant technology, at least one fixed factor, homogeneous units of the variable factor and a short period. Increasing all factors together is the subject of returns to scale.',
}));
Q('m_stage3', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'In the third stage of the Law of Variable Proportions,',
  opts: [
    'marginal product of the variable factor is negative and total product falls',
    'marginal product rises and total product rises at an increasing rate',
    'average product rises and marginal product is above it',
    'marginal product is zero throughout',
  ],
  sol: 'Stage III begins once TP is at its maximum; beyond it each extra unit reduces output, so MP is negative and TP falls.',
}));
Q('m_rational', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A rational producer prefers to operate in which stage of the Law of Variable Proportions?',
  opts: ['Stage II', 'Stage I', 'Stage III', 'Any stage, since output is positive in all three'],
  sol: 'In Stage III fewer units of the variable factor would give more output, and in Stage I the fixed factor is under-used so adding the variable factor keeps raising its average output. Stage II, where both factors have positive marginal products, is where a rational producer operates.',
}));
Q('m_cause_diminishing', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'An imagined Thrissur rubber estate keeps adding tappers to the same 400 trees. The main reason the marginal product of tappers eventually diminishes is that',
  opts: [
    'each tapper has fewer trees to work on, as the fixed factor does not grow',
    'the later tappers are always less skilled than the earlier ones',
    'the price of rubber falls as more tappers are hired',
    'the estate changes its technology after every new tapper',
  ],
  sol: 'With a fixed number of trees, the fixed factor becomes scarce relative to the variable factor, so each extra tapper adds less. The law assumes homogeneous workers and constant technology, and prices play no part in it.',
}));
Q('m_overcrowd', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'On a small fishing boat from an imagined Malvan harbour, adding a ninth crew member reduces the day\'s catch because the crew keep getting in each other\'s way. This is a case of',
  opts: ['negative returns to a factor (Stage III)', 'increasing returns to a factor (Stage I)', 'constant returns to scale', 'increasing returns to scale'],
  sol: 'A fall in total output from one more unit of the variable factor is negative marginal product, which marks Stage III. Overcrowding of the fixed factor (the boat) is its usual cause.',
}));
Q('m_stage1_cause', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'A big oil-expeller machine at an imagined Erode mill needs at least three operators to run properly; with one operator it runs only part of the day. Early increasing returns to operators here are best explained by',
  opts: [
    'better use of an indivisible fixed factor as more operators are added',
    'the fixed factor becoming scarce relative to the operators',
    'overcrowding around the machine',
    'a rise in the price of oil seeds',
  ],
  sol: 'An indivisible fixed factor is under-used when few units of the variable factor work with it; adding operators uses it more fully and allows division of work, so marginal product rises at first.',
}));
Q('m_diagram_read', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `A diagram of an imagined farm's production shows total product rising from 0 to its peak of ${TP(L_TPMAX)} quintals at ${L_TPMAX} workers and falling after that. With ${L_TPMAX + 1} workers, the marginal product of the last worker is`,
  opts: ['negative', 'zero', 'positive and rising', 'positive and falling'],
  sol: `Beyond the peak of TP each extra worker reduces output (TP falls from ${TP(L_TPMAX)} to ${TP(L_TPMAX + 1)}), so marginal product is negative.`,
}));
Q('ar_rational_stage', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'A rational producer would never employ a variable factor in Stage III of the Law of Variable Proportions.',
  r: 'In Stage III the marginal product of the variable factor is negative, so withdrawing some units would raise total output.',
  sol: 'Both are true and R explains A: when the extra units actually reduce output, employing fewer of them would give more output at lower cost, so no rational producer stays in Stage III.',
}));
Q('ar_lvp_fixed', ar({
  t: 3, d: 2, c: 'analysis', key: 'b',
  a: 'The Law of Variable Proportions operates only in the short run.',
  r: 'In the long run a firm can change its technology.',
  sol: 'Both are true, but R does not explain A. The law needs at least one fixed factor, which exists only in the short run; that is why it is a short-run law. Technology changing in the long run is a separate point (the law assumes constant technology anyway).',
}));
Q('tf_stage2_mp', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? In Stage II of the Law of Variable Proportions, marginal product of the variable factor is falling but remains positive.',
  sol: 'Stage II runs up to the point where TP is at its maximum (MP = 0); throughout it MP declines while staying positive, so TP rises at a diminishing rate.',
}));
Q('ord_mp_path', ord({
  t: 3, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these points on the marginal product curve of a variable factor in the order in which they occur as more units are added to a fixed factor.',
  items: [
    'MP reaches its maximum (point of inflexion of TP)',
    'MP becomes equal to AP (AP at its maximum)',
    'MP becomes zero (TP at its maximum)',
    'MP becomes negative (TP falls)',
  ],
  sol: 'MP peaks first; it then falls and cuts AP at AP\'s maximum; it reaches zero where TP peaks; finally it turns negative.',
}));
Q('fb_inflexion', fb({
  t: 3, d: 2, c: 'understanding',
  stem: 'The point on the total product curve where it changes from rising at an increasing rate to rising at a diminishing rate is called the point of ___.',
  acc: [['inflexion', 'inflection']],
  sol: 'At the point of inflexion marginal product is at its maximum; after it TP rises at a diminishing rate.',
}));
Q('s_lvp_assumptions', short({
  t: 3, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State any two assumptions of the Law of Variable Proportions.',
  model: '1. The **state of technology is constant**. 2. **At least one factor is fixed** while only the variable factor changes (and all units of the variable factor are **homogeneous**).',
  sol: 'Any two correct assumptions.',
  scheme: [['First assumption', 1], ['Second assumption', 1]],
}));
Q('s_stage3_why', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Explain why an imagined Bikaner wool-carding shed with four carding machines would never knowingly employ so many workers that it enters Stage III.',
  model: 'In **Stage III** each extra worker makes **total output fall** (negative MP), for example because workers crowd the four machines. The shed would get **more output with fewer workers**, so paying for them would only **raise cost and cut output**.',
  sol: 'Negative MP: fewer workers give more output at less cost.',
  scheme: [['Negative MP and falling TP', 1], ['Irrational to pay for output-reducing workers', 1]],
}));
Q('s_stage2_feature', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Describe the behaviour of total, average and marginal product in Stage II of the Law of Variable Proportions.',
  model: '**TP** rises at a **diminishing rate** and reaches its **maximum** at the end of the stage. **AP** **falls** after its peak. **MP** **falls** and becomes **zero** at the end of the stage, staying below AP.',
  sol: 'Behaviour of TP, AP and MP in Stage II.',
  scheme: [['TP behaviour', 1], ['AP and MP behaviour', 1]],
}));
Q('s3_three_stages', short({
  t: 3, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain the three stages of the Law of Variable Proportions in terms of what happens to marginal and total product in each stage.',
  model: '1. **Stage I (increasing returns to the factor):** MP **rises** at first and stays **above AP**, so **AP rises**; TP rises, at first at an increasing rate.\n2. **Stage II (diminishing returns):** MP **falls** but stays **positive**; TP rises at a **diminishing rate** to its **maximum**, where MP = 0.\n3. **Stage III (negative returns):** MP is **negative** and TP **falls**.',
  sol: 'Three stages with MP and TP behaviour.',
  scheme: [['Stage I', 1], ['Stage II', 1], ['Stage III', 1]],
}));
Q('s3_causes', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Using an imagined Ratnagiri cashew-processing unit with one roasting drum, explain one cause each of increasing, diminishing and negative returns to the variable factor.',
  model: '1. **Increasing returns:** the drum is **indivisible** and under-used by one or two workers; more workers use it **fully** and **divide the work** (feeding, roasting, shelling).\n2. **Diminishing returns:** once the drum is fully used it becomes **scarce** relative to workers, so each extra worker adds **less**.\n3. **Negative returns:** too many workers **crowd** around the one drum and **get in each other\'s way**, so output falls.',
  sol: 'One cause per type of return, tied to the drum.',
  scheme: [['Increasing returns cause', 1], ['Diminishing returns cause', 1], ['Negative returns cause', 1]],
}));
Q('s3_rational_stage2', short({
  t: 3, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Evaluate the claim that a rational producer will operate only in Stage II of the Law of Variable Proportions.',
  model: '1. In **Stage III** the variable factor has a **negative** MP: withdrawing some units **raises output and cuts cost**, so the producer moves back.\n2. In **Stage I** AP of the variable factor is still **rising** and the fixed factor is **under-used**, so it pays to **add** more of the variable factor.\n3. So the producer settles in **Stage II**, where both factors have **positive** MP; the **exact point** depends on **factor and product prices**. The claim is **valid**.',
  sol: 'Reasons to leave Stages III and I; Stage II with the exact point set by prices.',
  scheme: [['Stage III rejected with reason', 1], ['Stage I rejected with reason', 1], ['Conclusion on Stage II with price point', 1]],
}));
Q('l_lvp_full', long({
  t: [3, 2], d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: '(a) State the Law of Variable Proportions and its assumptions. [2]\n(b) Explain its three stages with the help of a described TP, AP and MP diagram. [3]',
  model: '(a) As more units of a **variable factor** are combined with a **fixed factor**, the **marginal product** of the variable factor may **rise at first** but **eventually diminishes** and may become **negative**. Assumptions: **constant technology**, at least **one fixed factor**, **homogeneous** units of the variable factor, a **short period**.\n(b) With labour on the x-axis and output on the y-axis: **Stage I** runs from the origin to the point where **AP is at its maximum** (MP cuts AP); TP rises, first at an increasing rate. **Stage II** runs to the point where **TP is at its maximum** and **MP is zero**; MP and AP fall. **Stage III** lies beyond: **MP is negative** and TP falls.',
  sol: 'Statement and assumptions; three stages located on the diagram.',
  scheme: [['Statement', 1], ['Assumptions', 1], ['Stage I on the diagram', 1], ['Stage II on the diagram', 1], ['Stage III on the diagram', 1]],
}));
Q('l_curves_relation', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: '(a) Explain the relationship between total product and marginal product with a described diagram. [3]\n(b) Explain the relationship between average product and marginal product. [2]',
  model: '(a) **MP rising** → TP rises at an **increasing rate** (up to the point of **inflexion**, where MP is at its maximum). **MP falling but positive** → TP rises at a **diminishing rate**. **MP = 0** → TP is at its **maximum**. **MP negative** → TP **falls**. On the diagram the TP curve is steepest where MP peaks and flat at its top where MP crosses the x-axis.\n(b) **MP > AP** → AP **rises**; **MP = AP** → AP is at its **maximum**; **MP < AP** → AP **falls**. MP can become **negative**; AP stays positive while TP is positive.',
  sol: 'Four TP–MP cases with the diagram; three AP–MP cases.',
  scheme: [['MP rising and falling cases', 1], ['MP zero and negative cases', 1], ['Diagram described', 1], ['AP rising and maximum cases', 1], ['AP falling; MP negative while AP positive', 1]],
}));
Q('l_than_schedule', long({
  t: [2, 3], d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `An imagined Thanjavur farmer records the marginal product of each extra transplanting labourer on a two-acre plot: ${THAN.mp.join(', ')} rows a day.\n(a) Calculate total product and average product for each number of labourers. [3]\n(b) Using the marginal products, explain where total product stops rising, and advise the farmer how many labourers to hire if each costs the same and his only aim is not to waste labour. [2]`,
  model: `(a) Total product is the running sum of the marginal products: **${THAN_TP.join(', ')}** rows a day for one to eight labourers. Average product is TP divided by the number of labourers: **${apOf(THAN_TP).join(', ')}** rows.
(b) TP keeps rising while MP is positive and stops rising at **45 rows** with **6 labourers**: the **seventh adds zero** (TP stays at 45, its maximum) and the **eighth reduces** output because his MP is **−3**, so TP falls to 42. He should hire **no more than 6 labourers**. A seventh labourer would cost a wage and add nothing, and an eighth would actually lower the day's work, so both would waste labour on a fixed plot.`,
  sol: 'Cumulative TP; AP = TP ÷ L; advice from MP reaching zero.',
  scheme: [['TP schedule', 1], ['AP schedule', 1], ['Calculations accurate', 1], ['TP stops rising where MP = 0', 1], ['Advice with reason', 1]],
}));

Q('s3_kutch_salt', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'An imagined salt-pan owner in the Little Rann of Kutch keeps the same 20-acre pan and adds more salt workers each season. Explain why the Law of Variable Proportions applies here, naming the fixed and the variable factor and describing what happens to the marginal product of workers.',
  model: '1. The **salt pan (land)** is the **fixed factor** and the **workers** are the **variable factor**, so only the **factor proportion** changes: this is the **short-run** situation the law describes.\n2. At first more workers use the pan **more fully** (raking, carrying, heaping), so **MP rises**.\n3. As workers increase on the same pan, each has **less land to work**, so **MP diminishes** and, if the pan is overcrowded, can become **negative**.',
  sol: 'Fixed land, variable labour; MP rises, then diminishes, possibly negative.',
  scheme: [['Fixed and variable factors with short run', 1], ['Initial rise in MP', 1], ['Diminishing and possibly negative MP', 1]],
}));
Q('l_bastar_points', long({
  t: [2, 3], d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `A described diagram for an imagined Bastar millet farm (fixed land, workers variable) shows: marginal product reaches its highest value of ${MP(L_INFLEX)} quintals at ${L_INFLEX} workers; average product reaches its highest value of ${AP(L_APMAX)} quintals at ${L_APMAX} workers on the smooth curve; total product reaches its highest value of ${TP(L_TPMAX)} quintals at ${L_TPMAX} workers.\n(a) What happens to the total product curve at ${L_INFLEX} workers, what is the marginal product at ${L_APMAX} workers, and what is the marginal product at ${L_TPMAX} workers? Give a reason for each. [3]\n(b) Identify the range of workers that lies in Stage III, and explain why the farmer should never employ workers in it. [2]`,
  model: `(a) At **${L_INFLEX} workers** MP is at its **maximum**, so the TP curve reaches its **point of inflexion**: it stops rising at an increasing rate and starts rising at a **diminishing** rate. At **${L_APMAX} workers** AP is at its maximum, so **MP = AP = ${AP(L_APMAX)}** quintals, because MP cuts AP at AP's peak. At **${L_TPMAX} workers** TP is at its maximum, so **MP = 0**: the last worker adds nothing.\n(b) **Stage III** is **more than ${L_TPMAX} workers**, where MP is **negative** and TP **falls**. Employing them would mean paying wages for workers who **reduce** output, so the farmer should never do it.`,
  sol: 'Inflexion at MP maximum; MP = AP at AP maximum; MP = 0 at TP maximum; Stage III beyond TP maximum.',
  scheme: [['Inflexion at MP maximum', 1], ['MP = AP at AP maximum', 1], ['MP = 0 at TP maximum', 1], ['Stage III range', 1], ['Reason never to employ there', 1]],
}));

// ================================================================ t04 Returns to scale (meaning only)
Q('m_rts_meaning', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'Returns to scale describe how output changes when',
  opts: [
    'all factors of production are changed in the same proportion in the long run',
    'one factor is increased while the others stay fixed',
    'the price of the product changes',
    'only the fixed factor is reduced',
  ],
  sol: 'Returns to scale are a long-run idea: every input is changed by the same proportion. Changing one factor with others fixed is returns to a factor.',
}));
Q('m_rts_kolhapur', mcq({
  t: 4, d: 2, c: 'application',
  stem: `An imagined ${RTS[0].firm} doubles every input and its output rises from ${RTS[0].before} to ${RTS[0].after} tonnes a day. This shows`,
  opts: ['increasing returns to scale', 'constant returns to scale', 'diminishing returns to scale', 'diminishing returns to a factor'],
  sol: `Inputs rise by 100 per cent and output by ${rtsPct(RTS[0])} per cent, more than in proportion: increasing returns to scale.`,
}));
Q('m_rts_ludhiana', mcq({
  t: 4, d: 2, c: 'application',
  stem: `When an imagined ${RTS[2].firm} doubles all its inputs, output rises from ${RTS[2].before} to ${RTS[2].after} units a day. Identify the type of returns to scale.`,
  opts: ['Diminishing returns to scale', 'Increasing returns to scale', 'Constant returns to scale', 'Negative returns to a factor'],
  sol: `Inputs rise by 100 per cent but output only by ${rtsPct(RTS[2])} per cent, less than in proportion: diminishing returns to scale.`,
}));
Q('m_factor_vs_scale', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'An imagined Jaipur printing press (A) adds workers to its existing machines, while another (B) doubles its machines, workers and building together. Which pair correctly names what each is experiencing?',
  opts: [
    'A: returns to a factor; B: returns to scale',
    'A: returns to scale; B: returns to a factor',
    'Both: returns to a factor',
    'Both: returns to scale',
  ],
  sol: 'Changing one input with others fixed (A) is returns to a factor, a short-run idea; changing all inputs in the same proportion (B) is returns to scale, a long-run idea.',
}));
Q('mt_rts', match({
  t: 4, d: 2, c: 'application',
  marks: 3,
  stem: 'Each imagined factory below doubled every input. Match the factory with the type of returns to scale it shows.',
  pairs: RTS.map((x) => [`${x.firm}: ${x.before} → ${x.after}`, x.kind]),
  sol: `Compare the percentage rise in output with the 100 per cent rise in inputs: ${RTS.map((x) => `${rtsPct(x)} per cent`).join(', ')}.`,
}));
Q('tf_rts_short_run', tf({
  t: 4, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Returns to scale can be observed in the short run, when the factory building cannot be changed.',
  sol: 'Returns to scale need every input, including the building, to change in the same proportion, which is possible only in the long run.',
}));
Q('ar_rts_crs', ar({
  t: 4, d: 3, c: 'analysis', key: 'd',
  a: `The imagined ${RTS[1].firm} shows increasing returns to scale because its output doubled when all inputs doubled.`,
  r: 'Returns to scale are measured by changing only one input while keeping the others fixed.',
  sol: 'Both are false. Output doubling when all inputs double is constant returns to scale, not increasing. And returns to scale change all inputs together; changing one input is returns to a factor.',
}));
Q('s_rts_types', short({
  t: 4, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Define increasing, constant and diminishing returns to scale.',
  model: 'When all inputs rise in the same proportion, output rises in a **greater proportion** (**increasing**), the **same proportion** (**constant**) or a **smaller proportion** (**diminishing**) returns to scale.',
  sol: 'Three proportion-based definitions.',
  scheme: [['Increasing defined', 1], ['Constant and diminishing defined', 1]],
}));
Q('s_factor_scale', short({
  t: [4, 3], d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between returns to a factor and returns to scale on the basis of time period and factor proportions.',
  model: '**Returns to a factor** are a **short-run** idea: only **one factor** varies, so the **factor proportion changes**. **Returns to scale** are a **long-run** idea: **all factors** change in the **same proportion**, so the **factor proportion stays the same**.',
  sol: 'Short run and changing proportion versus long run and constant proportion.',
  scheme: [['Time period contrast', 1], ['Factor proportion contrast', 1]],
}));
Q('s3_rts_three', short({
  t: 4, d: 2, c: 'application', marks: 3, wl: S3,
  stem: `Three imagined factories each doubled all their inputs. Identify the type of returns to scale for each, showing the percentage change in output.\n\n${md(RTS.map((x) => [x.firm, String(x.before), String(x.after)]), ['Factory', 'Output before', 'Output after doubling inputs'])}`,
  model: RTS.map((x, i) => `${i + 1}. **${x.firm}:** output rises **${rtsPct(x)} per cent** against inputs **100 per cent** → **${x.kind.toLowerCase()}**.`).join('\n'),
  sol: 'Compare each percentage rise in output with the 100 per cent rise in inputs.',
  scheme: RTS.map((x) => [`${x.firm}: ${x.kind.toLowerCase()}`, 1]),
}));

// ================================================================ mixed long answers
Q('l_sr_lr_rts', long({
  t: [1, 4], d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: '(a) Distinguish between the short-run and the long-run production function, giving an example of a fixed and a variable factor for an imagined Agra marble-cutting unit. [2]\n(b) Explain the meaning of returns to scale and its three types, and state how they differ from returns to a factor. [3]',
  model: '(a) In the **short run** at least one factor is **fixed** (the **cutting machines** and shed), while **workers and marble blocks** are **variable**. In the **long run** **all factors** can change, including the number of machines and the size of the shed.\n(b) **Returns to scale** show how output responds when **all inputs** change in the **same proportion** in the long run: **increasing** (output rises more than in proportion), **constant** (same proportion) and **diminishing** (less than in proportion). **Returns to a factor** concern **one** input changing with others **fixed**, in the short run.',
  sol: 'Short versus long run with examples; meaning and types of returns to scale; contrast.',
  scheme: [['Short run with fixed and variable examples', 1], ['Long run', 1], ['Meaning of returns to scale', 1], ['Three types', 1], ['Contrast with returns to a factor', 1]],
}));
Q('l_rational_causes', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: '(a) Explain the causes of increasing and diminishing returns to a variable factor. [3]\n(b) An imagined Kochi seafood-processing unit with one freezer finds that its tenth packer reduces output. Should it keep this packer? Justify your answer using the stages of production. [2]',
  model: '(a) **Increasing returns:** fuller use of an **indivisible fixed factor** and **division of labour** among more workers raise each worker\'s addition to output. **Diminishing returns:** once the fixed factor is fully used it becomes **scarce** relative to the variable factor, and factors are **imperfect substitutes**, so each extra worker adds less.\n(b) **No.** A tenth packer who **reduces output** has a **negative marginal product**: the unit is in **Stage III**. Removing him would **raise output and cut cost**, so a rational producer moves back into **Stage II**.',
  sol: 'Causes of increasing and diminishing returns; Stage III decision.',
  scheme: [['Increasing returns causes', 1], ['Diminishing returns causes', 1], ['Imperfect substitutability or scarcity explained', 1], ['Negative MP and Stage III identified', 1], ['Decision justified', 1]],
}));

// ================================================================ ISC paper-style 4-mark and 8-mark items (bank only)
Q('q4_shillong_bakery', short({
  t: 2, d: 3, c: 'application', marks: 4, wl: S4,
  stem: `Answer both parts about an imagined Shillong bakery with one oven. [2 + 2]\n\n(i) It makes ${BAKE.tp0} loaves a day with ${BAKE.l0} bakers and ${BAKE.tp1} with ${BAKE.l1}. Calculate the marginal product of the fifth baker and the average product with five bakers.\n(ii) The owner says a sixth baker would add fewer loaves than the fifth. Name the tendency she expects and give its cause.`,
  model: `(i) **MP** of the fifth baker = ${BAKE.tp1} − ${BAKE.tp0} = **${BAKE_MP} loaves**; **AP** with five bakers = ${BAKE.tp1} ÷ ${BAKE.l1} = **${BAKE_AP1} loaves** per baker.
(ii) She expects **diminishing returns to a factor** (diminishing marginal product). The **oven is fixed**, so each extra baker has **less oven space and time** to work with; the fixed factor becomes **scarce** relative to bakers, and bakers cannot fully replace the missing oven capacity, so each new baker adds fewer loaves than the one before.`,
  sol: 'MP and AP calculations; diminishing returns with cause.',
  scheme: [['(i) MP', 1], ['(i) AP', 1], ['(ii) tendency named', 1], ['(ii) cause', 1]],
}));
Q('q4_stage_choice', short({
  t: 3, d: 3, c: 'analysis', marks: 4, wl: S4,
  stem: 'Answer both parts. [2 + 2]\n\n(i) Explain what happens to marginal product and average product in Stage I of the Law of Variable Proportions, and why the stage gets its name.\n(ii) A manager of an imagined Panipat blanket mill wants to stop hiring as soon as marginal product starts falling. Advise her, with a reason.',
  model: '(i) In **Stage I**, **MP rises** at first and stays **above AP**, so **AP keeps rising**; it is called the stage of **increasing returns** to the factor because output per worker increases.\n(ii) She should **not stop** there. A falling but **positive MP** still **adds to output**, and **AP is still rising** while MP is above it; the mill should keep adding workers into **Stage II**, stopping at a point set by wages and prices, and certainly **before MP becomes negative**.',
  sol: 'Stage I behaviour and name; advice to continue into Stage II.',
  scheme: [['(i) MP and AP behaviour', 1], ['(i) reason for the name', 1], ['(ii) advice not to stop', 1], ['(ii) reason', 1]],
}));
Q('q4_rts_compare', short({
  t: 4, d: 3, c: 'application', marks: 4, wl: S4,
  stem: `Answer both parts. [2 + 2]\n\n(i) An imagined ${RTS[1].firm} doubled every input and its output went from ${RTS[1].before} to ${RTS[1].after} litres a day. Name the type of returns to scale and explain.\n(ii) Explain why this observation tells us nothing about the Law of Variable Proportions for the same plant.`,
  model: `(i) **Constant returns to scale**: inputs rose by **100 per cent** and output also by **${rtsPct(RTS[1])} per cent**, the **same proportion**.\n(ii) The Law of Variable Proportions concerns changing **one input** while **others stay fixed** in the **short run**; here **all inputs** changed together in the **long run**, so the **factor proportion did not change** and the law is not being tested.`,
  sol: 'Constant returns from equal proportions; why returns to scale differ from the law.',
  scheme: [['(i) type named', 1], ['(i) proportions compared', 1], ['(ii) one input versus all', 1], ['(ii) proportion unchanged', 1]],
}));
Q('l8_lvp_isc', long({
  t: [2, 3], d: 4, c: 'analysis', marks: 8, wl: L8,
  stem: `Answer both parts. [4 + 4]\n\n(i) An imagined Nagpur orange-packing shed records total product with 1 to 8 workers: ${NAG.tp.join(', ')} crates a day. Calculate the marginal product of every worker and the average product with 2, 4 and 6 workers.\n(ii) Explain, using the relationships between TP, AP and MP, why the shed's manager stopped hiring at 6 workers when wages were high, and why the 8th worker should never have been hired.`,
  model: `(i) **MP** is the change in TP for each extra worker: **${NAG_MP.join(', ')}** crates. **AP** is TP divided by workers: with 2 workers **${NAG_AP[1]}**, with 4 **${NAG_AP[3]}**, with 6 **${NAG_AP[5]}** crates.
(ii) Up to the fourth worker MP is at or above AP, so AP rises. After the 4th worker MP falls **below** AP, so **AP falls** and each worker produces less on average. The **6th worker adds only ${NAG_MP[5]} crates**; when wages are high, a worker adding so little is **not worth his wage**, so the manager stops hiring there, inside **Stage II**, where MP is still positive but small. The **7th worker adds zero**, so TP is at its **maximum** of ${NAG.tp[6]} crates, and the **8th has a negative MP (${NAG_MP[7]})**: output **falls** to ${NAG.tp[7]}, which is **Stage III**. Paying a worker whose presence **reduces** total output can never be rational, so the 8th worker should never have been hired.`,
  sol: 'MP and AP computed; hiring decision explained by the stages and the curves.',
  scheme: [['(i) MP column', 2], ['(i) AP values', 2], ['(ii) AP falling after MP < AP', 1], ['(ii) small MP versus wage', 1], ['(ii) TP maximum at MP = 0', 1], ['(ii) Stage III and negative MP', 1]],
}));
Q('l8_pf_rts_isc', long({
  t: [1, 4], d: 4, c: 'evaluation', marks: 8, wl: L8,
  stem: 'Answer both parts. [4 + 4]\n\n(i) Explain the concept of a production function and distinguish between its short-run and long-run forms with an imagined Indian example.\n(ii) A company plans to build a second, identical mill beside its first in an imagined Kolhapur district and expects output to more than double. Evaluate this expectation using the idea of returns to scale.',
  model: '(i) A **production function** is the **technical relationship** between **physical inputs** and the **maximum physical output**, given **technology**: Q = f(L, K). In the **short run** at least one input is **fixed** (an imagined Sivakasi printing press cannot add machines within weeks, only workers), so output changes through the **variable factor** and returns to a factor apply. In the **long run** **all inputs** can change, and **returns to scale** apply.\n(ii) Output **more than doubling** would mean **increasing returns to scale**. This is possible if the larger operation allows **specialised machines**, **bulk buying** of cane and **better division of work**. But an **identical** second mill doing the same as the first would more likely give **constant returns** (output just doubles), and problems of **management and coordination** could even give **diminishing returns**. The expectation is **optimistic**: it holds only if the bigger scale brings real **gains in organisation**.',
  sol: 'Concept and forms of the production function; balanced evaluation of returns to scale.',
  scheme: [['(i) definition', 1], ['(i) Q = f(L, K) and technology', 1], ['(i) short run with example', 1], ['(i) long run', 1], ['(ii) increasing returns identified', 1], ['(ii) sources of increasing returns', 1], ['(ii) constant or diminishing possibilities', 1], ['(ii) balanced judgement', 1]],
}));

// ================================================================ case-based
Q('cb_erode_mill', caseQ({
  t: [2, 3], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined notes of an Erode oil-mill supervisor and answer the questions that follow. *(Written by SOYL for practice; the mill and figures are imagined.)*',
  passage: `**Supervisor's notebook, an imagined oil mill in Erode (one expeller machine)**\n\nWith two operators we pressed ${NAG.tp[1] * 5} litres a shift and with three, ${NAG.tp[2] * 5} litres: the third operator kept the machine fed without stopping. With four operators we reached ${NAG.tp[3] * 5} litres. The fifth operator helped a little, but by the seventh the floor around the expeller was so crowded that output did not rise at all.`,
  parts: [
    child('a', num({ t: 2, d: 2, c: 'application', marks: 1, value: NAG_MP[2] * 5, unit: 'litres', stem: 'Calculate the marginal product of the third operator.', sol: `MP = ${NAG.tp[2] * 5} − ${NAG.tp[1] * 5} = ${NAG_MP[2] * 5} litres.` })),
    child('b', short({ t: 3, d: 2, c: 'understanding', marks: 1, stem: 'Which fixed factor limits the mill\'s output in this case?', model: 'The **expeller machine** (with the floor space around it) is the **fixed factor**; only operators are being added.', sol: 'The expeller is fixed.', scheme: [['Expeller identified as fixed', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain the cause of the rising marginal product up to the third operator and of the zero marginal product by the seventh.', model: 'Up to the third operator the **indivisible expeller** is used **more fully** and work can be **divided** (feeding, collecting, packing), so MP **rises**. By the seventh the machine is **overcrowded**: operators get in each other\'s way, so the extra operator adds **nothing**.', sol: 'Fuller use of the fixed factor; overcrowding.', scheme: [['Cause of rising MP', 1], ['Cause of zero MP', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Name the stage of production the mill reaches with the seventh operator and explain what would happen with an eighth.', model: 'With the seventh operator MP is **zero**, so **TP is at its maximum**: the **end of Stage II**. An eighth would add **negative** output by crowding the machine further, taking the mill into **Stage III**, where TP **falls**.', sol: 'End of Stage II; Stage III next.', scheme: [['End of Stage II with MP zero', 1], ['Stage III with an eighth', 1]] }),
    ]),
  ],
}));
Q('cb_two_bakeries', caseQ({
  t: [3, 4], d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the imagined report from a small-business fair in Pune and answer the questions that follow. *(Written by SOYL for practice.)*',
  passage: '**Two bakers at an imagined Pune small-business fair**\n\nAnjali runs a bakery with one oven. She has kept adding helpers this year and says each new helper has added fewer cakes than the one before. Ravi built a second bakery last year with exactly twice the ovens, helpers and floor space of his first, and says his total output more than doubled because each worker could now specialise in one task.',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'understanding', marks: 1, stem: 'Name the tendency Anjali describes.', model: '**Diminishing returns to a factor** (diminishing marginal product of helpers).', sol: 'Diminishing returns to a factor.', scheme: [['Tendency named', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'understanding', marks: 1, stem: 'Name the type of returns Ravi experienced.', model: '**Increasing returns to scale**: all inputs doubled and output **more than doubled**.', sol: 'Increasing returns to scale.', scheme: [['Type named', 1]] })),
    child('c', short({ t: [3, 4], d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Explain why Anjali\'s experience and Ravi\'s experience do not contradict each other.', model: 'Anjali changes **one input** with the oven **fixed** in the **short run**: the factor proportion changes and **returns to a factor** diminish. Ravi changes **all inputs** together in the **long run**: the proportion is unchanged and **returns to scale** apply. They describe **different situations**, so both can be true.', sol: 'Short run, one factor versus long run, all factors.', scheme: [['Anjali: returns to a factor', 1], ['Ravi: returns to scale; different situations', 1]] }), [
      short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Should Anjali stop hiring helpers now? Evaluate, using the stages of production.', model: 'Not necessarily. Each new helper adding **fewer** cakes means she is in **Stage II**, where MP is **falling but positive**, so helpers still **add output**. She should keep hiring while a helper\'s extra cakes are worth more than the **wage**, and must stop **before MP becomes negative** (Stage III).', sol: 'Stage II: falling but positive MP; stop before negative MP.', scheme: [['Stage II identified', 1], ['Reasoned advice', 1]] }),
    ]),
  ],
}));
