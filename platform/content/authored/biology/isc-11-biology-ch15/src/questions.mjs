// ISC 11 Biology ch15 Plant Growth and Development — question bank in ISC school-examination style.
// Every number is computed in calc.mjs. AR keys (ISC options): b a d c a a.
import { mk, add, svgV, r } from '../../isc-11-biology-ch01/src/lib.mjs';
import { GERM_Q, ROOT_Q, SIGMOID, AUXANO, WENT } from './svgs.mjs';
import { arith, doubling, rgr, agr, RGR_PCT, AGR, SEEDLINGS, HEIGHTS, DAYS, AUX, magnification, actualGrowth, pointerFor, WENT as WN, curvature, concFor, MEDIA, ratio, outcome, stockVolume, milligrams, D2, D3, round, eq } from './calc.mjs';

const { mcq, ar, num, short, long } = mk;
const germFig = svgV(GERM_Q, 'Three unlabelled seedlings marked P, Q and R');
const rootFig = svgV(ROOT_Q, 'Unlabelled root tip with regions marked A to D');
const sigFig = svgV(SIGMOID, 'Sigmoid growth curve with lag, log and stationary phases');
const auxFig = svgV(AUXANO, 'Arc auxanometer');
const wentFig = svgV(WENT, 'Went’s experiment on oat coleoptiles');
const optionText = (q) => q.options.find((o) => o.id === q.answer.option_ids[0]).text_md;
const tbl = (rows) => `| Day | Height (cm) |\n|---|---|\n${rows.map(([d, h]) => `| ${d} | ${h} |`).join('\n')}`;
const H = (d) => HEIGHTS[DAYS.indexOf(d)];

// ================================================================ t01 germination
add('epi-mcq', mcq({
  stem: 'Which of the following seeds shows epigeal germination?',
  right: 'Castor',
  wrong: ['Pea', 'Maize', 'Gram'],
  sol: 'In castor the hypocotyl elongates and lifts the cotyledons above the soil; pea, maize and gram are hypogeal — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('hypo-mcq', mcq({
  stem: 'A student sows pea and castor seeds in the same tray. After a week the castor seedlings show two seed leaves above the soil, but the pea seedlings show only a green shoot. This is because in pea',
  right: 'the epicotyl elongates and the cotyledons stay below the soil',
  wrong: ['the hypocotyl elongates and the cotyledons stay below the soil', 'the radicle elongates and lifts the cotyledons', 'the seed germinates on the parent plant'],
  sol: 'Pea shows hypogeal germination; castor shows epigeal germination — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('vivi-mcq', mcq({
  stem: 'On a mangrove tree, the seed germinates inside the fruit and a long radicle grows out while the fruit is still on the branch. This type of germination is',
  right: 'viviparous',
  wrong: ['epigeal', 'hypogeal', 'delayed'],
  sol: 'Germination inside the fruit on the parent plant is vivipary — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('germ-check', mcq({
  stem: 'In hypogeal germination, the part of the seedling that elongates and pushes the shoot upwards is the',
  right: 'epicotyl',
  wrong: ['hypocotyl', 'radicle', 'cotyledon'],
  sol: 'The epicotyl elongates, so the cotyledons stay in the soil — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('germ-fig-mcq', mcq({
  stem: 'In the figure, which seedling shows hypogeal germination?',
  right: 'Q',
  wrong: ['P', 'R', 'P and R'],
  sol: 'In Q the seed stays below the soil and the shoot grows above it — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [germFig],
}));
add('germ-fig2-mcq', mcq({
  stem: 'In the same figure, which seedling is from a mangrove?',
  right: 'R',
  wrong: ['P', 'Q', 'P and Q'],
  sol: 'R shows a long root grown from a fruit still on the branch, which is viviparous germination — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [germFig],
}));
add('germ-ar', ar({
  a: 'In epigeal germination the cotyledons appear above the ground.',
  r: 'In epigeal germination the cotyledons are usually green and make some food.',
  key: 'b',
  sol: 'Both are true, but the colour of the cotyledons does not explain why they appear above ground; the hypocotyl lifts them — option (b).',
  d: 2, c: 'understanding', t: [1],
}));
add('vivi-reason', short({
  marks: 1,
  stem: 'Give a reason: A mangrove seedling establishes itself quickly in marshy mud.',
  model: 'Its seed germinates on the parent plant, so the heavy seedling with a long radicle drops into the mud and fixes itself at once.',
  sol: 'Vivipary.',
  scheme: [['Viviparous germination; seedling drops and roots', 1]],
  d: 2, c: 'application', t: [1],
}));
add('germ-short2', short({
  marks: 2,
  stem: 'Distinguish between epigeal and hypogeal germination, giving one example of each.',
  model: 'In **epigeal** germination the **hypocotyl elongates** and raises the **cotyledons above the soil**, as in **castor** or bean. In **hypogeal** germination the **epicotyl elongates** and the **cotyledons stay in the soil**, as in **pea** or maize.',
  sol: 'Two types.',
  scheme: [['Epigeal: hypocotyl, cotyledons above, example', 1], ['Hypogeal: epicotyl, cotyledons below, example', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('vivi-short2', short({
  marks: 2,
  stem: 'What is viviparous germination? Name two plants in which it occurs and the habitat in which they live.',
  model: '**Viviparous germination** is the germination of the seed **inside the fruit while it is still attached to the parent plant**. It occurs in **mangroves** such as **Rhizophora** and **Sonneratia**, which live in **marshy, saline** coastal soil.',
  sol: 'Definition, plants, habitat.',
  scheme: [['Definition', 1], ['Two plants and habitat', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('germ-short3', short({
  marks: 3,
  stem: 'Compare epigeal, hypogeal and viviparous germination in terms of the part that elongates and the position of the cotyledons, with one example each.',
  model: '**Epigeal:** the **hypocotyl** elongates and the **cotyledons are lifted above the soil** (castor, bean). **Hypogeal:** the **epicotyl** elongates and the **cotyledons remain in the soil** (pea, maize). **Viviparous:** the seed **germinates inside the fruit on the parent plant**, the **radicle** grows out of the fruit, and the seedling then falls into the mud (Rhizophora).',
  sol: 'Three types.',
  scheme: [['Epigeal', 1], ['Hypogeal', 1], ['Viviparous', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ================================================================ t02 phases of growth, rates, measurement, factors
add('phase-mcq', mcq({
  stem: 'In a growing root tip, the cells that take up water, form a large vacuole and increase rapidly in length lie in the zone of',
  right: 'elongation',
  wrong: ['cell division', 'maturation', 'the root cap'],
  sol: 'Cells enlarge by water uptake in the elongation zone — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('meri-mcq', mcq({
  stem: 'A cell from the apical meristem of a root tip would be expected to have',
  right: 'dense cytoplasm, thin walls and a large nucleus',
  wrong: ['a large central vacuole and thick lignified walls', 'no nucleus and a wide lumen', 'chloroplasts and a large vacuole'],
  sol: 'Meristematic cells are small, thin-walled, with dense cytoplasm and a prominent nucleus — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('geo-mcq', mcq({
  stem: 'In geometric growth the rate of increase keeps rising because',
  right: 'both daughter cells formed at each division keep dividing',
  wrong: ['only one daughter cell keeps dividing', 'the cells divide only in the dark', 'the dividing cells all differentiate at once'],
  sol: 'When both daughter cells divide, the number of cells rises exponentially — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('sig-mcq', mcq({
  stem: 'In the sigmoid growth curve of a plant, the phase in which growth is fastest is the',
  right: 'log (exponential) phase',
  wrong: ['lag phase', 'stationary phase', 'senescent phase'],
  sol: 'The log phase has the steepest part of the curve — option (@K).',
  d: 1, c: 'recall', t: [2],
  assets: [sigFig],
}));
add('stat-mcq', mcq({
  stem: 'A culture of plant cells grows rapidly for a few days and then stops increasing in number. The most likely reason is that',
  right: 'nutrients and space have become limiting',
  wrong: ['the cells have switched to arithmetic growth', 'the cells have entered the lag phase again', 'oxygen is no longer needed by the cells'],
  sol: 'Growth reaches a stationary phase when resources become limiting — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('auxano-mcq', mcq({
  stem: `The pointer of an arc auxanometer is 30 cm long and the pulley radius is 2 cm. The pointer moves 45 mm. The actual growth of the shoot is`,
  right: '3 mm',
  wrong: ['0.3 mm', '675 mm', '47 mm'],
  sol: 'Magnification = 30 ÷ 2 = 15; growth = 45 ÷ 15 = 3 mm — option (@K).',
  d: 3, c: 'application', t: [2],
  assets: [auxFig],
}), (q) => (optionText(q) === '3 mm' && 45 / (30 / 2) === 3) || 'key');
add('root-fig-mcq', mcq({
  stem: 'In the figure of a root tip, which letter marks the region in which the cells absorb water and enlarge?',
  right: 'C',
  wrong: ['A', 'B', 'D'],
  sol: 'C is the zone of elongation; A is the cap, B the zone of division and D the zone of maturation — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [rootFig],
}));
add('root-fig2-mcq', mcq({
  stem: 'In the same figure, root hairs are found in the region marked',
  right: 'D',
  wrong: ['A', 'B', 'C'],
  sol: 'Root hairs form in the zone of maturation, D — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [rootFig],
}));
add('factor-mcq', mcq({
  stem: 'Seeds sown in a flooded field germinate poorly and the seedlings grow slowly. The factor most directly missing is',
  right: 'oxygen for respiration',
  wrong: ['water for cell enlargement', 'carbon dioxide for photosynthesis in the root', 'light for the root cells'],
  sol: 'Waterlogged soil has little oxygen, which growing cells need for respiration — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('open-mcq', mcq({
  stem: 'Plants are said to show open growth because',
  right: 'meristems stay active, so growth continues throughout life',
  wrong: ['they stop growing after germination', 'all their cells keep the power to photosynthesise', 'their cells grow only in the light'],
  sol: 'Open growth is the continued growth of a plant from meristems — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
{
  const l0 = 5, rate = 1.2, t = 6, v = arith(l0, rate, t);
  add('arith-num', num({
    stem: `A shoot is ${l0} cm long and grows arithmetically at ${rate} cm a day. What is its length after ${t} days?`,
    value: v, unit: 'cm',
    sol: r`$L_t = L_0 + rt = ${l0} + ${rate} \times ${t} = ${v}$ cm.`,
    scheme: [[`${v} cm`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 12.2 || 'value');
}
{
  const T = 18, h = 72, v = doubling(1, h, T);
  add('geo-num', num({
    stem: `Plant cells in a culture double in number every ${T} hours, and every daughter cell keeps dividing. How many cells will there be after ${h} hours from a single cell?`,
    value: v, unit: 'cells',
    sol: r`Doublings $= ${h} \div ${T} = ${h / T}$; cells $= 2^{${h / T}} = ${v}$.`,
    scheme: [[`${v}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 16 || 'value');
}
{
  const a = 8, b = 14, d = 5, v = round(rgr(a, b, d) * 100, 1);
  add('rgr-check', num({
    stem: `A seedling grows from ${a} cm to ${b} cm in ${d} days. What is its relative growth rate, in percent of the initial size per day?`,
    value: v, unit: '% per day',
    sol: r`$\dfrac{${b - a}}{${a} \times ${d}} \times 100 = ${v}$ percent a day.`,
    scheme: [[`${v}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 15 || 'value');
}
{
  const a = 18, b = 30, d = 6, v = agr(a, b, d);
  add('agr-num', num({
    stem: `A shoot grows from ${a} cm to ${b} cm in ${d} days. What is its absolute growth rate?`,
    value: v, unit: 'cm per day',
    sol: r`$\dfrac{${b} - ${a}}{${d}} = ${v}$ cm per day.`,
    scheme: [[`${v}`, 1]],
    d: 1, c: 'application', t: [2],
  }), (q) => q.answer.value === 2 || 'value');
}
{
  const R = 30, rr = 2.5, mag = R / rr, p = 27, v = round(p / mag, 2);
  add('auxano-num', num({
    stem: `In an arc auxanometer the pointer is ${R} cm long and the pulley radius is ${rr} cm. In 24 hours the pointer moves ${p} mm. What is the actual growth of the shoot in mm?`,
    value: v, unit: 'mm',
    sol: r`Magnification $= ${R} \div ${rr} = ${mag}$; growth $= ${p} \div ${mag} = ${v}$ mm.`,
    scheme: [[`${v} mm`, 1]],
    d: 3, c: 'application', t: [2],
  }), (q) => q.answer.value === 2.25 || 'value');
}
{
  const v = round((H(12) - H(8)) / 4, 2);
  add('rate-num', num({
    stem: `The height of a bean shoot was measured every two days:\n\n${tbl(DAYS.map((d) => [d, H(d)]))}\n\nCalculate the average growth rate between day 8 and day 12, in cm per day.`,
    value: v, tol: 0.05, unit: 'cm per day',
    sol: r`$(${H(12)} - ${H(8)}) \div 4 = ${v}$ cm per day.`,
    scheme: [[`${v}`, 1]],
    d: 3, c: 'application', t: [2],
    assets: [sigFig],
  }), (q) => q.answer.value === 6.95 || 'value');
}
{
  const v = round(H(16) - H(4), 1);
  add('logphase-num', num({
    stem: `Use the height table of a bean shoot:\n\n${tbl(DAYS.map((d) => [d, H(d)]))}\n\nThe log phase of growth lasts from about day 4 to day 16. How many centimetres does the shoot grow in this phase?`,
    value: v, tol: 0.05, unit: 'cm',
    sol: r`$${H(16)} - ${H(4)} = ${v}$ cm, most of the total growth.`,
    scheme: [[`${v} cm`, 1]],
    d: 3, c: 'analysis', t: [2],
  }), (q) => q.answer.value === 54.4 || 'value');
}
add('rate-ar', ar({
  a: 'Two seedlings that add the same length in a day can have different relative growth rates.',
  r: 'Relative growth rate takes the initial size of the seedling into account.',
  key: 'a',
  sol: 'Both are true, and R explains A: the smaller seedling grows more in proportion to its size — option (a).',
  d: 3, c: 'understanding', t: [2],
}));
add('sigmoid-ar', ar({
  a: 'A plant organ shows a sigmoid growth curve.',
  r: 'Growth is slow at first, then rapid, and slows again when resources become limiting.',
  key: 'a',
  sol: 'Both are true, and R describes the three phases that give the S shape — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('elong-reason', short({
  marks: 1,
  stem: 'Give a reason: Cells in the zone of elongation increase rapidly in length.',
  model: 'They take in water, form a large vacuole and their walls are stretched and new wall material is added.',
  sol: 'Water uptake and vacuole.',
  scheme: [['Water uptake, vacuole and wall growth', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('phases-short2', short({
  marks: 2,
  stem: 'Name the three phases of growth seen in a root tip, from the tip upwards, and state one feature of each.',
  model: 'The **meristematic phase**, where cells are small and **divide**; the **elongation phase**, where cells **absorb water, form a vacuole and enlarge**; and the **maturation phase**, where cells reach their final size and **differentiate** into specialised tissues.',
  sol: 'Three phases.',
  scheme: [['Three phases in order', 1], ['A feature of each', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('auxano-short2', short({
  marks: 2,
  stem: 'How does an arc auxanometer measure the growth of a shoot?',
  model: 'A **thread** from the shoot tip passes over a small **pulley** and carries a **weight**. As the shoot grows, the pulley turns and a long **pointer** fixed to it moves over an **arc scale**. Because the pointer is much longer than the pulley radius, growth is **magnified**; **actual growth = pointer movement × pulley radius ÷ pointer length**.',
  sol: 'Working and calculation.',
  scheme: [['Thread, pulley, pointer and scale', 1], ['Magnification; actual growth formula', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('agr-short2', short({
  marks: 2,
  stem: 'Distinguish between absolute growth rate and relative growth rate.',
  model: '**Absolute growth rate** is the **total growth per unit time**, for example centimetres per day. **Relative growth rate** is the growth per unit time **expressed as a proportion of the initial size**, so it allows two organs of different size to be compared fairly.',
  sol: 'Definitions.',
  scheme: [['Absolute rate', 1], ['Relative rate with initial size', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('sigmoid-short3', short({
  marks: 3,
  stem: 'Describe the sigmoid growth curve of a plant, naming its three phases and the reason for the last one.',
  model: 'The curve is S-shaped. In the **lag phase** growth is **slow** as the cells prepare to divide. In the **log (exponential) phase** growth is **fastest**, because the cells divide and enlarge rapidly. In the **stationary phase** growth **slows and stops**, because **nutrients, water and space become limiting** and the organ reaches maturity.',
  sol: 'Three phases.',
  scheme: [['Lag phase', 1], ['Log phase', 1], ['Stationary phase and reason', 1]],
  d: 2, c: 'understanding', t: [2],
  assets: [sigFig],
}));
add('factors-short3', short({
  marks: 3,
  stem: 'Name three external factors that affect plant growth and state the role of each.',
  model: '**Water** is needed for cell enlargement, since cells grow by taking in water. **Oxygen** is needed for respiration, which supplies energy for growth. **Nutrients** supply the raw materials for new protoplasm and cell walls. (**Temperature** controls the rate of enzyme reactions, and **light** affects the form of the plant.)',
  sol: 'Three factors.',
  scheme: [['Water', 1], ['Oxygen', 1], ['Nutrients or another factor', 1]],
  d: 1, c: 'recall', t: [2],
}));
{
  const [a1, a2] = SEEDLINGS.A, [b1, b2] = SEEDLINGS.B;
  add('rgr-short3', short({
    marks: 3,
    stem: `Seedling X grows from ${a1} cm to ${a2} cm and seedling Y from ${b1} cm to ${b2} cm over the same ${SEEDLINGS.days} days. Calculate the absolute and relative growth rate of each, and say which is growing faster in relation to its size.`,
    model: `**Absolute rate:** X = (${a2} − ${a1}) ÷ ${SEEDLINGS.days} = **${AGR.A} cm a day**; Y = **${AGR.B} cm a day**, the same. **Relative rate:** X = ${a2 - a1} ÷ ${a1} ÷ ${SEEDLINGS.days} = **${RGR_PCT.A} percent a day**; Y = ${b2 - b1} ÷ ${b1} ÷ ${SEEDLINGS.days} = about **${RGR_PCT.B} percent a day**. So **seedling X** is growing faster in relation to its size.`,
    sol: 'Rates and comparison.',
    scheme: [['Absolute rates', 1], ['Relative rates', 1], ['X faster in proportion', 1]],
    d: 3, c: 'application', t: [2],
  }), () => (AGR.A === AGR.B && RGR_PCT.A > RGR_PCT.B) || 'rates');
}
add('sigmoid-long', long({
  stem: '(a) Draw a sigmoid growth curve of a plant organ, labelling the axes and the lag, log and stationary phases. [3]\n(b) In which phase is the growth rate highest, and why? [1]\n(c) Explain why the curve levels off in the stationary phase. [1]',
  model: '(a) **Diagram:** **time** on the x-axis and **size (height or weight)** on the y-axis; an **S-shaped curve** that is flat and slow in the **lag phase**, steep in the **log phase** and flat again in the **stationary phase**, each phase labelled.\n\n(b) The **log (exponential) phase**, because cells divide and enlarge rapidly and the resources are plentiful.\n\n(c) **Nutrients, water and space become limiting**, and the organ reaches its final size, so growth slows and stops.',
  sol: 'Curve; fastest phase; levelling.',
  scheme: [['(a) Axes and S curve', 1], ['(a) Three phases labelled', 2], ['(b) Log phase with reason', 1], ['(c) Limiting resources', 1]],
  wl: [50, 200],
  d: 2, c: 'understanding', t: [2],
}));
add('auxano-long', long({
  stem: '(a) Draw a labelled diagram of an arc auxanometer. [3]\n(b) The pointer is 24 cm long and the pulley radius is 2 cm. The pointer moves 30 mm. Calculate the actual growth of the shoot. [2]',
  model: `(a) **Diagram:** a **potted shoot**, a **thread** from its tip over a **pulley** carrying a **weight**; a long **pointer** fixed to the pulley moving over an **arc scale**.\n\n(b) **Magnification = pointer length ÷ pulley radius = ${AUX.R} ÷ ${AUX.r} = ${magnification}.** **Actual growth = 30 ÷ ${magnification} = ${actualGrowth(30)} mm.**`,
  sol: 'Diagram; calculation.',
  scheme: [['(a) Shoot, thread, pulley, weight', 1], ['(a) Pointer and arc scale', 2], ['(b) Magnification', 1], ['(b) Actual growth', 1]],
  wl: [30, 200],
  d: 3, c: 'application', t: [2],
}), () => (actualGrowth(30) === 2.5 && magnification === 12) || 'growth');

// ================================================================ t03 differentiation, dedifferentiation, redifferentiation
add('diff-mcq', mcq({
  stem: 'A meristematic cell becomes a xylem vessel element by losing its protoplasm and depositing lignin in its walls. This is an example of',
  right: 'differentiation',
  wrong: ['dedifferentiation', 'redifferentiation', 'senescence'],
  sol: 'Maturing into a specialised cell is differentiation — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('dediff-mcq', mcq({
  stem: 'During secondary growth, the cork cambium arises from mature cortical cells. This shows',
  right: 'dedifferentiation, because mature cells regain the power to divide',
  wrong: ['differentiation, because meristematic cells become specialised', 'redifferentiation, because the cells lose the power to divide', 'senescence, because the cells stop dividing'],
  sol: 'Permanent cells that start dividing again have dedifferentiated — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('redif-mcq', mcq({
  stem: 'The cells cut off by the cork cambium mature into cork cells and lose the power to divide. This process is',
  right: 'redifferentiation',
  wrong: ['dedifferentiation', 'cell division only', 'germination'],
  sol: 'Cells produced by a dedifferentiated tissue that mature again are said to redifferentiate — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('plastic-mcq', mcq({
  stem: 'Coriander has broad leaves at the base of the plant and finely divided leaves higher up. This shows',
  right: 'heterophylly, a type of developmental plasticity',
  wrong: ['dedifferentiation of leaf cells', 'viviparous germination', 'arithmetic growth'],
  sol: 'Different leaf forms on one plant are heterophylly — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('diff-check', mcq({
  stem: 'A callus of undifferentiated cells forms on a cut piece of stem placed on a culture medium. The cells of the stem piece have undergone',
  right: 'dedifferentiation',
  wrong: ['differentiation', 'senescence', 'abscission'],
  sol: 'Mature cells regaining the power to divide and forming callus have dedifferentiated — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('dediff-reason', short({
  marks: 1,
  stem: 'Give a reason: Formation of a callus in tissue culture is an example of dedifferentiation.',
  model: 'Mature, specialised cells of the explant lose their specialisation and regain the power to divide.',
  sol: 'Mature cells divide again.',
  scheme: [['Mature cells regain division', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('seq-short2', short({
  marks: 2,
  stem: 'State the sequence of developmental processes by which a germinated seed becomes a mature plant body.',
  model: 'After germination the plant grows by **cell division** in meristems, then **cell enlargement**, followed by **differentiation** of cells into tissues and **maturation** of organs. Development includes **growth and differentiation**, and later flowering, fruiting and **senescence**.',
  sol: 'Sequence.',
  scheme: [['Division, enlargement, differentiation, maturation', 1], ['Development and senescence', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('diff-short2', short({
  marks: 2,
  stem: 'Define redifferentiation and give one example from the plant body.',
  model: '**Redifferentiation** is the process in which cells produced by a **dedifferentiated** tissue **lose the capacity to divide again** and **mature** to perform specific functions. For example, the cells formed by the **cork cambium** mature into **cork**, and those from the vascular cambium into secondary xylem.',
  sol: 'Definition and example.',
  scheme: [['Definition', 1], ['Example', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('diff-short3', short({
  marks: 3,
  stem: 'Distinguish differentiation, dedifferentiation and redifferentiation, with one example each.',
  model: '**Differentiation:** cells made by meristems mature into specialised structure and function, such as a **xylem vessel** with lignified walls. **Dedifferentiation:** mature cells **regain the power to divide**, such as the **interfascicular cambium** or **cork cambium**, or callus in culture. **Redifferentiation:** the cells formed by such a tissue **mature and lose the power to divide**, such as **secondary xylem** or **cork**.',
  sol: 'Three processes with examples.',
  scheme: [['Differentiation', 1], ['Dedifferentiation', 1], ['Redifferentiation', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('diff-long', long({
  stem: '(a) Define differentiation, dedifferentiation and redifferentiation. [3]\n(b) Give one example of each in a woody stem. [2]',
  model: '(a) **Differentiation** is the maturation of cells from meristems into specialised cells. **Dedifferentiation** is the regaining of the power to divide by mature cells. **Redifferentiation** is the loss of that power and maturation of the cells formed by dedifferentiated tissue.\n\n(b) **Differentiation:** a cell becoming a **xylem vessel**. **Dedifferentiation:** **interfascicular cambium** or **cork cambium** forming from permanent cells. **Redifferentiation:** **secondary xylem** or **cork** formed from the cambia.',
  sol: 'Three definitions; three examples.',
  scheme: [['(a) Three definitions', 3], ['(b) Two examples', 2]],
  wl: [50, 200],
  d: 2, c: 'understanding', t: [3],
}));

// ================================================================ t04 plant growth regulators
add('went-mcq', mcq({
  stem: 'Auxin was first isolated in agar blocks from the tips of oat coleoptiles by',
  right: 'F. W. Went',
  wrong: ['Charles Darwin', 'E. Kurosawa', 'Skoog and Miller'],
  sol: 'Went (1928) collected auxin in agar blocks — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('auxin-mcq', mcq({
  stem: 'When the shoot tip of a pea plant is removed, the lateral buds begin to grow. The best explanation is that',
  right: 'auxin from the shoot tip had been inhibiting the lateral buds',
  wrong: ['gibberellin from the tip had been promoting them', 'abscisic acid from the lateral buds is now released', 'ethylene from the tip had been ripening them'],
  sol: 'Auxin from the tip causes apical dominance; removing the tip removes the inhibition — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('ga-mcq', mcq({
  stem: 'Rice seedlings with “foolish seedling” (bakanae) disease grow tall and spindly because the fungus Gibberella makes a substance that is now called',
  right: 'gibberellin',
  wrong: ['auxin', 'cytokinin', 'abscisic acid'],
  sol: 'Kurosawa traced the bakanae disease to gibberellin made by the fungus — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('cyto-mcq', mcq({
  stem: 'Kinetin, which promotes cell division in tissue culture, was discovered by Skoog and Miller in',
  right: 'old or autoclaved DNA',
  wrong: ['coleoptile tips', 'the fungus Gibberella', 'ripe oranges'],
  sol: 'Kinetin is a cytokinin first obtained from DNA — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('eth-mcq', mcq({
  stem: 'A trader keeps unripe bananas in a closed room with ripe oranges and finds that the bananas ripen sooner. The substance responsible is',
  right: 'ethylene',
  wrong: ['abscisic acid', 'gibberellin', 'kinetin'],
  sol: 'Ripe fruits release ethylene, a gaseous regulator that ripens other fruits — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('aba-mcq', mcq({
  stem: 'A plant under water stress closes its stomata. The regulator that brings this about is',
  right: 'abscisic acid',
  wrong: ['gibberellin', 'cytokinin', 'indole acetic acid'],
  sol: 'ABA is the stress hormone that closes stomata — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('apical-mcq', mcq({
  stem: 'A gardener pinches off the tips of the shoots of a hedge plant so that it becomes bushy. This works because',
  right: 'the source of auxin is removed, so lateral buds are released',
  wrong: ['the source of abscisic acid is removed, so leaves fall', 'ethylene is released, so the flowers open', 'gibberellin is added, so the stem elongates'],
  sol: 'Removing the tip ends apical dominance — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('went-check', num({
  stem: `In a curvature test an agar block with ${0.5} mg of auxin per litre gave a curvature of ${curvature(0.5)} degrees, and curvature is proportional to concentration. What concentration would give ${24} degrees?`,
  value: concFor(24), unit: 'mg per litre',
  sol: r`${curvature(0.5)} degrees for ${0.5} mg per litre is ${WN.degPerUnit} degrees per mg per litre, so $24 \div ${WN.degPerUnit} = ${concFor(24)}$ mg per litre.`,
  scheme: [[`${concFor(24)}`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => q.answer.value === 0.8 || 'value');
add('abaeth-check', mcq({
  stem: 'Which regulator is a gas that promotes ripening and also the fall of leaves and fruits?',
  right: 'Ethylene',
  wrong: ['Abscisic acid', 'Gibberellin', 'Cytokinin'],
  sol: 'Ethylene is the gaseous regulator; ABA is a solid growth inhibitor — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
{
  const m = { auxin: 3.0, cytokinin: 0.5 }, q = ratio(m), oc = outcome(m);
  add('ratio-num', num({
    stem: `A culture medium contains ${m.auxin} mg per litre of auxin and ${m.cytokinin} mg per litre of cytokinin. What is the auxin to cytokinin ratio, and (taking a high ratio to favour roots) what will the callus form?`,
    value: q, unit: '(ratio)',
    sol: r`Ratio $= ${m.auxin} \div ${m.cytokinin} = ${q}$; a high ratio favours roots.`,
    scheme: [[`${q}`, 1]],
    d: 3, c: 'application', t: [4],
  }), (qq) => (qq.answer.value === 6 && oc === 'roots') || 'value');
}
add('ga-ar', ar({
  a: 'Gibberellins increase the length of sugarcane stems.',
  r: 'Gibberellins are growth inhibitors.',
  key: 'c',
  sol: 'A is true; R is false because gibberellins promote growth — option (c).',
  d: 2, c: 'understanding', t: [4, 5],
}));
add('cyto-ar', ar({
  a: 'Cytokinins delay the senescence of leaves.',
  r: 'Cytokinins promote cell division.',
  key: 'b',
  sol: 'Both are true, but promoting division does not explain the delay in ageing — option (b).',
  d: 3, c: 'understanding', t: [4],
}));
add('aba-ar', ar({
  a: 'Abscisic acid is called the stress hormone.',
  r: 'It closes the stomata of a plant under water stress.',
  key: 'a',
  sol: 'Both are true, and stomatal closure in drought is its best-known stress response — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('went-ar', ar({
  a: 'In Went’s experiment the coleoptile bent towards the side that carried the agar block.',
  r: 'Auxin from the block made the cells on the opposite side elongate more.',
  key: 'd',
  sol: 'Both are false: it bent away from the block, because auxin made the cells below the block elongate more — option (d).',
  d: 4, c: 'analysis', t: [4],
}));
add('aba-reason', short({
  marks: 1,
  stem: 'Give a reason: Abscisic acid is described as a growth inhibitor.',
  model: 'It inhibits seed germination, stem elongation and cell growth, and it promotes dormancy and leaf senescence.',
  sol: 'Inhibits growth.',
  scheme: [['Inhibits growth and promotes dormancy', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('went-short2', short({
  marks: 2,
  stem: 'Why did the oat coleoptile bend in Went’s experiment when an agar block was placed on one side of its cut end?',
  model: 'The agar block had absorbed **auxin from coleoptile tips**. Placed on one side, it let auxin enter only that side, so the cells **below the block elongated more** than those on the other side. The coleoptile therefore **curved away from the block**.',
  sol: 'Auxin and unequal elongation.',
  scheme: [['Auxin from the block on one side', 1], ['More elongation there; curves away', 1]],
  d: 2, c: 'understanding', t: [4],
  assets: [wentFig],
}));
add('auxin-short2', short({
  marks: 2,
  stem: 'State four physiological effects of auxins.',
  model: 'Auxins cause **apical dominance**, in which the shoot tip inhibits lateral buds; they promote **rooting** of stem cuttings; they cause **parthenocarpy**, the formation of seedless fruits; and they **prevent the early fall (abscission)** of young leaves and fruits.',
  sol: 'Four effects.',
  scheme: [['Two effects', 1], ['Two more effects', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('ga-short2', short({
  marks: 2,
  stem: 'State four physiological effects of gibberellins.',
  model: 'Gibberellins make **stems elongate** (bolting, longer sugarcane stems); they **break the dormancy** of seeds and buds (in barley they induce amylase for malting); they **increase fruit size** and cause parthenocarpy, as in grapes; and they promote **bolting and flowering**.',
  sol: 'Four effects.',
  scheme: [['Two effects', 1], ['Two more effects', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('cyto-short2', short({
  marks: 2,
  stem: 'State four physiological effects of cytokinins.',
  model: 'Cytokinins promote **cell division**; they promote the growth of **lateral buds**, overcoming apical dominance; they **delay senescence** of leaves by keeping them green; and they promote **shoot formation** in tissue culture.',
  sol: 'Four effects.',
  scheme: [['Two effects', 1], ['Two more effects', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('eth-short2', short({
  marks: 2,
  stem: 'State four physiological effects of ethylene.',
  model: 'Ethylene **ripens fruits**; it promotes **abscission** of leaves and fruits and senescence; it promotes **flowering** in pineapple and mango and **female flowers** in cucumber; and it **breaks the dormancy** of seeds and buds and promotes root hairs.',
  sol: 'Four effects.',
  scheme: [['Two effects', 1], ['Two more effects', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('aba-short2', short({
  marks: 2,
  stem: 'State four physiological effects of abscisic acid.',
  model: 'Abscisic acid **closes stomata** under water stress; it maintains **seed dormancy** and inhibits germination; it **inhibits growth**, including stem elongation; and it promotes **leaf senescence and abscission**.',
  sol: 'Four effects.',
  scheme: [['Two effects', 1], ['Two more effects', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('went-short3', short({
  marks: 3,
  stem: 'Describe Went’s experiments on oat coleoptiles that led to the discovery of auxin.',
  model: 'Went **cut off the tips** of oat (Avena) coleoptiles and placed them on **agar blocks** for some time, so that a growth substance diffused into the agar. He then placed these blocks **off-centre** on decapitated coleoptiles. The coleoptiles **curved away from the side with the block**, because the **cells on that side elongated more**. The substance was named **auxin**, and the angle of curvature depended on its concentration.',
  sol: 'Method and conclusion.',
  scheme: [['Tips on agar blocks', 1], ['Block placed to one side; curvature away', 1], ['Conclusion: auxin; curvature depends on concentration', 1]],
  d: 2, c: 'understanding', t: [4],
  assets: [wentFig],
}));
add('prom-short3', short({
  marks: 3,
  stem: 'Classify the five plant growth regulators as promoters or inhibitors, giving one effect of each class.',
  model: 'The **promoters** are **auxins, gibberellins and cytokinins**; for example auxins make cells elongate and cause rooting, and cytokinins promote cell division. **Abscisic acid** is the **inhibitor**; it inhibits growth and maintains dormancy. **Ethylene** is a gaseous regulator with both roles: it promotes ripening and abscission, and it can inhibit elongation.',
  sol: 'Classification.',
  scheme: [['Promoters named', 1], ['Inhibitor named with effect', 1], ['Ethylene as gas with both roles', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('apical-short3', short({
  marks: 3,
  stem: 'A hedge is trimmed by cutting off the tips of its shoots. Explain, in terms of growth regulators, why it becomes bushy.',
  model: 'The **shoot tip makes auxin**, which moves down and **inhibits the growth of lateral buds**; this is **apical dominance**. Cutting off the tip **removes the source of auxin**, so the lateral buds are **released** and grow into branches. **Cytokinins**, which promote lateral bud growth, can then act, so the hedge becomes bushy.',
  sol: 'Apical dominance.',
  scheme: [['Tip makes auxin; inhibits laterals', 1], ['Removal releases the lateral buds', 1], ['Role of cytokinin', 1]],
  d: 3, c: 'application', t: [4],
}));
add('culture-short3', short({
  marks: 3,
  stem: `A tissue culture worker has three media with auxin and cytokinin in mg per litre: ${MEDIA.map((m) => `${m.id} (${m.auxin} and ${m.cytokinin})`).join(', ')}. Predict what a callus will form on each medium, with the reason.`,
  model: `The organ depends on the **auxin to cytokinin ratio**. **${MEDIA[0].id}** has a ratio of ${ratio(MEDIA[0])}, a high ratio, so the callus forms **${outcome(MEDIA[0])}**. **${MEDIA[1].id}** has a ratio of ${ratio(MEDIA[1])}, a low ratio, so it forms **${outcome(MEDIA[1])}**. **${MEDIA[2].id}** has equal amounts (ratio ${ratio(MEDIA[2])}), so it stays as **${outcome(MEDIA[2])}**.`,
  sol: 'Ratios and outcomes.',
  scheme: [['M1: roots with ratio', 1], ['M2: shoots with ratio', 1], ['M3: callus with ratio', 1]],
  d: 3, c: 'application', t: [4],
}), () => (outcome(MEDIA[0]) === 'roots' && outcome(MEDIA[1]) === 'shoots') || 'outcomes');
add('went-long', long({
  stem: '(a) Describe the experiment of F. W. Went that led to the discovery of auxin. [3]\n(b) What conclusion did he draw? [1]\n(c) State two other physiological effects of auxins. [1]',
  model: '(a) Went **cut off the tips** of oat coleoptiles and placed them on **agar blocks** so that a chemical diffused into the agar. He placed the blocks **to one side** on the cut ends of **decapitated coleoptiles**. The coleoptiles **bent away from the block side**.\n\n(b) A **chemical made in the coleoptile tip (auxin)** moves down and makes the cells on its side **elongate more**, and the amount of bending depends on its concentration.\n\n(c) Auxins cause **apical dominance** and promote **rooting** of cuttings (or cause parthenocarpy).',
  sol: 'Went’s experiment, conclusion, effects.',
  scheme: [['(a) Tips on agar', 1], ['(a) Block off-centre', 1], ['(a) Curvature away from block', 1], ['(b) Conclusion', 1], ['(c) Two effects', 1]],
  wl: [50, 200],
  d: 2, c: 'understanding', t: [4],
  assets: [wentFig],
}));
add('pgr-long', long({
  stem: '(a) Name the regulator discovered from the rice bakanae disease and the one named kinetin, and say how each was discovered. [2]\n(b) State two physiological effects of each of these two regulators. [2]\n(c) Which of the two delays the senescence of leaves? [1]',
  model: '(a) **Gibberellin** was discovered from the **bakanae (foolish seedling) disease of rice**, caused by the fungus **Gibberella** (Kurosawa). **Kinetin**, a **cytokinin**, was found by **Skoog and Miller** in **old or autoclaved DNA** as a substance that promoted cell division.\n\n(b) **Gibberellin:** elongation of stems and breaking of seed dormancy. **Cytokinin:** promotes cell division and lateral bud growth.\n\n(c) **Cytokinin**.',
  sol: 'Discovery; effects; senescence.',
  scheme: [['(a) Gibberellin discovery', 1], ['(a) Kinetin discovery', 1], ['(b) Two effects each', 2], ['(c) Cytokinin', 1]],
  wl: [50, 200],
  d: 2, c: 'understanding', t: [4],
}));

// ================================================================ t05 agricultural and horticultural applications
add('cutting-mcq', mcq({
  stem: 'A nurseryman wants cuttings of rose stems to form roots quickly. He should dip their cut ends in a solution of',
  right: 'IBA or NAA, which are auxins',
  wrong: ['gibberellic acid', 'abscisic acid', 'ethylene gas'],
  sol: 'Auxins such as IBA and NAA promote rooting of cuttings — option (@K).',
  d: 1, c: 'application', t: [5],
}));
add('apps-check', mcq({
  stem: 'A fruit merchant wants to ripen a batch of mature green mangoes at the same time. He can spray them with',
  right: 'ethephon, which releases ethylene',
  wrong: ['2,4-D, a weedicide', 'abscisic acid, a growth inhibitor', 'kinetin, a cytokinin'],
  sol: 'Ethephon releases ethylene, which ripens fruit — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('weed-mcq', mcq({
  stem: 'A wheat farmer finds broadleaf weeds among his narrow-leaved crop. Which regulator can he spray to kill the weeds but not the wheat?',
  right: '2,4-D',
  wrong: ['Gibberellic acid', 'Kinetin', 'Ethylene'],
  sol: '2,4-D, a synthetic auxin, kills dicot weeds in cereal fields — option (@K).',
  d: 1, c: 'application', t: [5],
}));
add('grape-mcq', mcq({
  stem: 'A grower sprays grape vines with a regulator so that the bunches have larger, seedless berries. The regulator is',
  right: 'gibberellin',
  wrong: ['abscisic acid', 'ethylene', 'cytokinin'],
  sol: 'Gibberellins increase the size of grapes and cause parthenocarpy — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('drop-mcq', mcq({
  stem: 'Apple growers spray their orchards with NAA before the fruit is ripe. The purpose is to',
  right: 'prevent the early fall of fruits',
  wrong: ['kill the weeds under the trees', 'make the fruits ripen at once', 'make the leaves fall'],
  sol: 'Auxins delay abscission and so reduce premature fruit drop — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('flower-mcq', mcq({
  stem: 'A florist wants to keep cut leafy vegetables and flowers fresh for longer by delaying the yellowing of their leaves. Which regulator would help?',
  right: 'A cytokinin',
  wrong: ['Ethylene', 'Abscisic acid', '2,4-D'],
  sol: 'Cytokinins delay leaf senescence — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('cane-mcq', mcq({
  stem: 'Spraying sugarcane plants with gibberellin increases the yield of sugar because it',
  right: 'lengthens the stems, which store the sugar',
  wrong: ['kills the weeds around the cane', 'makes the cane ripen and fall', 'stops the cane from flowering and dying'],
  sol: 'Gibberellins elongate the internodes, so more sugar is stored — option (@K).',
  d: 2, c: 'application', t: [5],
}));
{
  const v = stockVolume(D2.stock, D2.want, D2.ml);
  add('dilution-num', num({
    stem: `A grower needs ${D2.ml / 1000} litres of a ${D2.want} ppm (mg per litre) spray of a regulator, from a stock of ${D2.stock} ppm. How many mL of stock are needed?`,
    value: v, unit: 'mL',
    sol: r`$V_1 = \dfrac{${D2.want} \times ${D2.ml}}{${D2.stock}} = ${v}$ mL.`,
    scheme: [[`${v} mL`, 1]],
    d: 3, c: 'application', t: [5],
  }), (q) => q.answer.value === 100 || 'value');
}
{
  const v = milligrams(D3.want, D3.ml);
  add('mg-num', num({
    stem: `How many milligrams of regulator are present in ${D3.ml} mL of a ${D3.want} ppm (mg per litre) solution?`,
    value: v, unit: 'mg',
    sol: r`$${D3.want} \times ${D3.ml / 1000} = ${v}$ mg.`,
    scheme: [[`${v} mg`, 1]],
    d: 2, c: 'application', t: [5],
  }), (q) => q.answer.value === 50 || 'value');
}
add('apps-short2', short({
  marks: 2,
  stem: 'Name two agricultural uses of ethylene and one of 2,4-D.',
  model: '**Ethylene** (as ethephon) is used to **ripen fruits** such as banana and mango, and to **bring pineapple to flower together** (it also promotes female flowers in cucumber). **2,4-D**, a synthetic auxin, is used as a **weedicide** to kill **broadleaf (dicot) weeds** in cereal fields.',
  sol: 'Uses.',
  scheme: [['Two uses of ethylene', 1], ['Use of 2,4-D', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('apps-short3', short({
  marks: 3,
  stem: 'Name the growth regulator you would use, with a reason, for each of these: (i) ripening mature green bananas, (ii) producing larger seedless grapes, (iii) keeping cut flowers fresh.',
  model: '(i) **Ethylene**, supplied as **ethephon**, because it **ripens fruit** and so brings the whole batch to ripeness together. (ii) **Gibberellin**, because it **increases fruit size** and causes **parthenocarpy**, so the grapes are larger and seedless. (iii) A **cytokinin**, because it **delays senescence** of the leaves and petals, keeping them fresh and green for longer.',
  sol: 'Three uses.',
  scheme: [['Ethylene for ripening', 1], ['Gibberellin for grapes', 1], ['Cytokinin for freshness', 1]],
  d: 2, c: 'application', t: [5],
}));
add('apps-long', long({
  stem: '(a) Name the regulator suitable for (i) rooting of stem cuttings, (ii) killing broadleaf weeds, (iii) preventing fruit drop, (iv) breaking the dormancy of barley seeds in malting. [2]\n(b) Calculate the volume of a 1000 ppm stock needed to prepare 2 litres of a 50 ppm spray and the volume of water to be added. [2]\n(c) How many milligrams of regulator are in this spray? [1]',
  model: `(a) (i) **Auxin (IBA, NAA)**; (ii) **2,4-D**; (iii) **auxin (NAA)**; (iv) **gibberellin**.\n\n(b) **C₁V₁ = C₂V₂**: V₁ = 50 × 2000 ÷ 1000 = **${stockVolume(1000, 50, 2000)} mL** of stock, so water = 2000 − ${stockVolume(1000, 50, 2000)} = **${2000 - stockVolume(1000, 50, 2000)} mL**.\n\n(c) 50 mg per litre × 2 litres = **${milligrams(50, 2000)} mg**.`,
  sol: 'Four uses; dilution; amount.',
  scheme: [['(a) Four regulators', 2], ['(b) Stock volume', 1], ['(b) Water volume', 1], ['(c) Amount', 1]],
  wl: [40, 200],
  d: 3, c: 'application', t: [5],
}), () => (stockVolume(1000, 50, 2000) === 100 && milligrams(50, 2000) === 100) || 'dilution');
void eq;
void GERM_Q;
