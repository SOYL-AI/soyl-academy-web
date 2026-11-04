// ICSE 9 Biology ch05 Seeds: Structure and Germination — question bank in ICSE school-examination style (10-mark structured questions).
// Numbers come from calc.mjs. AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV, r } from '../../icse-9-biology-ch01/src/lib.mjs';
import { BAG, SOAK, SEEDS, TP, TQ, TR, TS, TEST, RADICLE, RADICLE_PER_DAY, COT, DAYS_TO_SURFACE, SOWN_DEPTH_CM, SHOOT_PER_DAY_CM } from './calc.mjs';
import { BEAN_LETTERED, MAIZE_LETTERED, TUBES_SVG } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const beanFig = svgV(BEAN_LETTERED, 'A bean seed from outside and opened, with parts lettered A to E');
const maizeFig = svgV(MAIZE_LETTERED, 'A maize grain in long section with parts lettered A to E');
const tubeFig = svgV(TUBES_SVG, 'Four test tubes P, Q, R and S of seeds under different conditions');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct term', 1]], ...o });

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-cotyledon', mcq({
  stem: 'In a bean seed the food for the embryo is stored in the',
  right: 'cotyledons', wrong: ['micropyle', 'hilum', 'radicle'],
  sol: 'The two thick cotyledons store the food — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('chk-scutellum', mcq({
  stem: 'Which part of a maize grain is its single cotyledon?',
  right: 'Scutellum', wrong: ['Endosperm', 'Coleoptile', 'Coleorhiza'],
  sol: 'The scutellum is the single cotyledon of maize — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('chk-monodi', mcq({
  stem: 'A seed that has a single cotyledon and a large endosperm is a',
  right: 'monocot seed', wrong: ['dicot seed', 'seed without an embryo', 'seed without a coat'],
  sol: 'One cotyledon means a monocot — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('chk-epigeal', mcq({
  stem: 'A seedling lifts its two cotyledons above the soil as the hypocotyl lengthens. This is',
  right: 'epigeal germination', wrong: ['hypogeal germination', 'vegetative propagation', 'pollination'],
  sol: 'Cotyledons carried above the ground show epigeal germination — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('chk-coleoptile', mcq({
  stem: 'In a germinating maize grain, the sheath that protects the young shoot is the',
  right: 'coleoptile', wrong: ['coleorhiza', 'scutellum', 'micropyle'],
  sol: 'The coleoptile guards the plumule — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('chk-oxygen', mcq({
  stem: 'Why is a layer of oil poured over the boiled water in a test tube of seeds?',
  right: 'To keep air from dissolving in the water again', wrong: ['To supply food to the seeds', 'To warm the seeds', 'To make the seeds swell'],
  sol: 'Oil stops air dissolving back, so the seeds get no oxygen — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t01 structure
add('hilum-mcq', mcq({
  stem: 'A student notices a small oval scar on the edge of a soaked gram-type seed. This scar shows',
  right: 'where the seed was attached to the fruit', wrong: ['where the radicle will grow out', 'where the food is stored', 'where the plumule is covered'],
  sol: 'The scar is the hilum, the point of attachment — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('micropyle-mcq', mcq({
  stem: 'When a dry seed is placed in water, it first takes in water mainly through a tiny pore. This pore is the',
  right: 'micropyle', wrong: ['hilum', 'plumule', 'scutellum'],
  sol: 'Water enters through the micropyle — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('radicle-mcq', mcq({
  stem: 'The part of the embryo of a seed that grows into the root is the',
  right: 'radicle', wrong: ['plumule', 'cotyledon', 'testa'],
  sol: 'The radicle becomes the root — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('figB-mcq', mcq({
  stem: 'In the figure of a bean seed, which letter marks the part that stores food?',
  right: 'B', wrong: ['A', 'C', 'D'],
  sol: 'B is the cotyledon; A is the seed coat, C the plumule, D the radicle and E the hilum — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [beanFig],
}));
add('figE-mcq', mcq({
  stem: 'In the figure of a bean seed, which letter marks the scar where the seed was joined to the fruit?',
  right: 'E', wrong: ['A', 'B', 'D'],
  sol: 'E is the hilum — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [beanFig],
}));
add('figC-maize-mcq', mcq({
  stem: 'In the figure of a maize grain, which letter marks the part that passes food from the endosperm to the embryo?',
  right: 'C', wrong: ['A', 'B', 'E'],
  sol: 'C is the scutellum; A is the coat, B the endosperm, D the plumule and E the radicle — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [maizeFig],
}));
add('figD-maize-mcq', mcq({
  stem: 'In the figure of a maize grain, which letter marks the part that grows into the shoot?',
  right: 'D', wrong: ['B', 'C', 'E'],
  sol: 'D is the plumule — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [maizeFig],
}));
add('coleorhiza-mcq', mcq({
  stem: 'A germinating maize grain pushes its young root through the soil without damage because the root tip is covered by the',
  right: 'coleorhiza', wrong: ['coleoptile', 'scutellum', 'endosperm'],
  sol: 'The coleorhiza is the sheath of the radicle — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('ar-testa', ar({
  a: 'The seed coat protects the embryo inside a seed.',
  r: 'The seed coat is a thin outer covering.',
  key: 'd',
  sol: 'Both are true, but being thin does not explain the protection — option (d).',
  d: 3, c: 'analysis', t: [1],
}));
add('ar-maize', ar({
  a: 'A maize grain is called a fruit.',
  r: 'In maize the fruit wall is joined to the seed coat.',
  key: 'c',
  sol: 'Both are true, and the fusion of fruit wall and seed coat is why a grain is a fruit with one seed — option (c).',
  d: 3, c: 'analysis', t: [1],
}));
add('hilum-tf', tf({
  stem: 'The hilum is the part of a bean seed that grows into the root.',
  key: 'f',
  sol: 'False. The hilum is a scar; the radicle grows into the root.',
  d: 1, c: 'recall', t: [1],
}));
add('term-plumule', term({
  stem: 'Give the biological term: the part of the embryo that grows into the shoot.',
  model: '**Plumule.**', sol: 'Plumule.', sch: 'Plumule',
  d: 1, c: 'recall', t: [1],
}));
add('odd-seed', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Plumule, Radicle, Cotyledon, Coleoptile.',
  model: '**Cotyledon**; the others are **parts of the embryo axis**.', sol: 'The cotyledon is the food-storing leaf; the others belong to the embryo axis.', sch: 'Odd one and category',
  d: 3, c: 'analysis', t: [1],
}));
add('reason-micro', term({
  stem: 'Give reason: a bean seed swells soon after it is placed in water.',
  model: 'It **absorbs water**, mainly through the **micropyle**, and the tissues swell.', sol: 'It takes in water.', sch: 'Absorbs water',
  d: 2, c: 'understanding', t: [1],
}));
add('testa-short', short({
  marks: 2,
  stem: 'State two functions of the seed coat.',
  model: 'It **protects the embryo** from injury and germs, and it **prevents the seed from drying out**.',
  sol: 'Protection; prevents drying.',
  scheme: [['Protects the embryo', 1], ['Prevents drying', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('maize-short', short({
  marks: 2,
  stem: 'Why is a grain of maize called a fruit, and not simply a seed?',
  model: 'In maize the **fruit wall (pericarp) is joined to the seed coat**, so the grain is a **fruit with one seed** inside it.',
  sol: 'Fruit wall joined to seed coat.',
  scheme: [['Fruit wall joined to seed coat', 1], ['Fruit with one seed', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('bean-draw', short({
  marks: 3, wl: null,
  stem: 'Draw a neat, labelled diagram of the inside of a bean seed with one cotyledon removed. Label the seed coat, cotyledon, plumule and radicle.',
  model: 'An outline of the **seed coat**, one thick **cotyledon**, and the embryo axis on its surface with the **plumule** (small leaves) and **radicle** (pointed, towards the micropyle). Four labels with ruled lines.',
  sol: 'Opened bean seed with four labels.',
  scheme: [['Seed coat and cotyledon outline', 1], ['Embryo axis with plumule and radicle', 1], ['Four correct labels', 1]],
  d: 2, c: 'application', t: [1],
}));
add('maize-draw', short({
  marks: 3, wl: null,
  stem: 'Draw a neat, labelled diagram of a maize grain in long section. Label the endosperm, scutellum, plumule and radicle.',
  model: 'A grain outline with a large **endosperm**, the **scutellum** at one side, the **plumule** (inside the coleoptile) at the top of the embryo and the **radicle** (inside the coleorhiza) below. Four labels.',
  sol: 'Maize grain in long section with four labels.',
  scheme: [['Grain outline with endosperm', 1], ['Embryo with scutellum, plumule, radicle', 1], ['Four correct labels', 1]],
  d: 2, c: 'application', t: [1],
}));
add('carry-match5', match({
  marks: 5,
  stem: 'Study the diagram of a bean seed and match each lettered part with its function.',
  pairs: [
    ['A', 'Protects the embryo inside the seed'],
    ['B', 'Stores food for the embryo'],
    ['C', 'Grows into the shoot'],
    ['D', 'Grows into the root'],
    ['E', 'Scar showing where the seed was attached to the fruit'],
  ],
  order: [4, 1, 3, 2, 0],
  sol: 'A seed coat; B cotyledon; C plumule; D radicle; E hilum.',
  d: 2, c: 'application', t: [1],
  assets: [beanFig],
}));

// ---------------------------------------------------------------- t02 monocot and dicot seeds
add('sort-mcq', mcq({
  stem: 'A student splits a soaked seed into two equal halves, each thick with stored food. There is no separate food tissue. The seed is most likely a',
  right: 'dicot seed such as a bean', wrong: ['monocot seed such as maize', 'seed without cotyledons', 'monocot seed such as wheat'],
  sol: 'Two food-filled halves are two cotyledons, so it is a dicot seed — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('endo-mcq', mcq({
  stem: 'Which feature is found in a maize grain but not in a bean seed?',
  right: 'A coleoptile around the plumule', wrong: ['A plumule', 'A radicle', 'A seed coat'],
  sol: 'Only the maize grain has a coleoptile — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('food-mcq', mcq({
  stem: 'In which seed is the main food store a separate tissue outside the cotyledon?',
  right: 'Maize', wrong: ['Bean', 'Pea', 'Gram'],
  sol: 'Maize stores food in the endosperm, outside the single cotyledon — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('cot-num', num({
  stem: `A bag holds ${BAG.bean} bean seeds and ${BAG.maize} maize grains. How many cotyledons are there in the ${BAG.bean} bean seeds?`,
  value: BAG.beanCotyledons,
  sol: r`$${BAG.bean} \times ${BAG.beanCot} = ${BAG.beanCotyledons}$ cotyledons.`,
  scheme: [[`${BAG.beanCotyledons}`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === 50 || 'value');
add('ar-mono', ar({
  a: 'A maize seed is a monocot seed.',
  r: 'A maize grain has two cotyledons.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: maize has one cotyledon, the scutellum — option (a).',
  d: 2, c: 'analysis', t: [2],
}));
add('dicot-tf', tf({
  stem: 'A dicot seed always has a large separate endosperm when it is ripe.',
  key: 'f',
  sol: 'False. A bean stores food in its cotyledons and has no separate endosperm when ripe.',
  d: 2, c: 'understanding', t: [2],
}));
add('term-dicot', term({
  stem: 'Give the biological term: a seed with two cotyledons.',
  model: '**Dicot seed** (dicotyledonous seed).', sol: 'Dicot seed.', sch: 'Dicot',
  d: 1, c: 'recall', t: [2],
}));
add('fill-seed', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [endosperm, scutellum, cotyledons, coleoptile, plumule, hilum, radicle, micropyle]\n\nA bean seed has two (a) ______ that store food. A maize grain stores its food in the (b) ______, and the single cotyledon of maize is the (c) ______. In maize the sheath around the shoot is the (d) ______, and the part of the embryo that becomes the root is the (e) ______.',
  acc: [['cotyledons', 'cotyledon'], ['endosperm'], ['scutellum'], ['coleoptile'], ['radicle']],
  sol: '(a) cotyledons; (b) endosperm; (c) scutellum; (d) coleoptile; (e) radicle.',
  d: 2, c: 'understanding', t: [1, 2],
}));
add('diff-short', short({
  marks: 2,
  stem: 'State two differences between a bean seed and a maize grain in the number of cotyledons and the place where food is stored.',
  model: 'A **bean** has **two cotyledons** and stores food **in the cotyledons**. A **maize grain** has **one cotyledon** (scutellum) and stores food **in the endosperm**.',
  sol: 'Cotyledon number; food store.',
  scheme: [['Number of cotyledons', 1], ['Place of food store', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('diff-table', short({
  marks: 3,
  stem: 'Tabulate three differences between a monocot seed and a dicot seed.',
  model: '| Monocot seed | Dicot seed |\n|---|---|\n| **One** cotyledon | **Two** cotyledons |\n| Food in a large **endosperm** | Food in the **cotyledons** |\n| Embryo has **coleoptile and coleorhiza** | **No** such sheaths |\n| Fruit wall **joined** to seed coat (maize) | Seed coat **only** |',
  sol: 'Cotyledons; food store; sheaths.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('classify-short', short({
  marks: 2,
  stem: 'A seed has one cotyledon, a large endosperm and a coleoptile. Name its type and give one example.',
  model: 'One cotyledon, a large endosperm and a coleoptile show that it is a **monocot seed**. A familiar example is **maize** (or wheat), whose single cotyledon is the scutellum.',
  sol: 'Monocot; maize.',
  scheme: [['Monocot seed', 1], ['Example', 1]],
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 germination
add('first-mcq', mcq({
  stem: 'When a seed germinates, the first part of the embryo to come out of the seed coat is the',
  right: 'radicle', wrong: ['plumule', 'cotyledon', 'coleoptile'],
  sol: 'The radicle emerges first and anchors the seedling — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('hypo-mcq', mcq({
  stem: 'A gardener sows gram seeds. After germination he sees the shoot but the cotyledons stay under the soil. This is',
  right: 'hypogeal germination, with the epicotyl lengthening', wrong: ['epigeal germination, with the hypocotyl lengthening', 'epigeal germination, with the epicotyl lengthening', 'hypogeal germination, with the hypocotyl lengthening'],
  sol: 'Cotyledons that stay below the soil show hypogeal germination, driven by the epicotyl — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('arch-mcq', mcq({
  stem: 'In the germination of a bean seed, the arch that pulls the cotyledons upward is formed by the',
  right: 'hypocotyl', wrong: ['epicotyl', 'radicle', 'scutellum'],
  sol: 'The hypocotyl lengthens and arches — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('maizegerm-mcq', mcq({
  stem: 'During germination of a maize grain, food reaches the seedling from the endosperm through the',
  right: 'scutellum', wrong: ['coleoptile', 'radicle', 'micropyle'],
  sol: 'The scutellum passes food across — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('cotgreen-mcq', mcq({
  stem: 'The cotyledons of a bean seedling turn green and shrivel later. They turn green because they are',
  right: 'carried into the light above the soil and make food for a short time', wrong: ['staying in the soil', 'covered by the coleoptile', 'protected by the seed coat'],
  sol: 'Epigeal cotyledons reach the light and can make some food before shrinking — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('ar-radicle', ar({
  a: 'The radicle is the first part to emerge from a germinating seed.',
  r: 'The young seedling must anchor itself and absorb water from the soil.',
  key: 'c',
  sol: 'Both are true, and the early need for anchorage and water explains why the root comes first — option (c).',
  d: 3, c: 'analysis', t: [3],
}));
add('maize-tf', tf({
  stem: 'Maize shows epigeal germination.',
  key: 'f',
  sol: 'False. Maize shows hypogeal germination; its cotyledon stays in the soil.',
  d: 2, c: 'recall', t: [3],
}));
add('term-hypo', term({
  stem: 'Give the biological term: germination in which the cotyledons remain below the soil.',
  model: '**Hypogeal germination.**', sol: 'Hypogeal.', sch: 'Hypogeal',
  d: 1, c: 'recall', t: [3],
}));
add('odd-germ', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Bean, Castor, Cotton, Pea.',
  model: '**Pea**; the others show **epigeal germination**.', sol: 'Pea is hypogeal.', sch: 'Odd one and category',
  d: 3, c: 'analysis', t: [3],
}));
add('radicle-num', num({
  stem: `The radicle of a germinating seed measures ${RADICLE[0]} mm on day 1 and ${RADICLE[3]} mm on day 4. What is its mean growth in millimetres each day over these three days?`,
  value: RADICLE_PER_DAY,
  sol: r`$(${RADICLE[3]} - ${RADICLE[0]}) \div 3 = ${RADICLE_PER_DAY}$ mm per day.`,
  scheme: [[`${RADICLE_PER_DAY}`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === 9 || 'value');
add('shoot-num', num({
  stem: `A hypogeal seed is sown ${SOWN_DEPTH_CM} cm deep. Its shoot grows ${SHOOT_PER_DAY_CM} cm each day. In how many days does the shoot reach the surface?`,
  value: DAYS_TO_SURFACE,
  sol: r`$${SOWN_DEPTH_CM} \div ${SHOOT_PER_DAY_CM} = ${DAYS_TO_SURFACE}$ days.`,
  scheme: [[`${DAYS_TO_SURFACE}`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === 2 || 'value');
add('epi-short', short({
  marks: 2,
  stem: 'State two differences between epigeal and hypogeal germination.',
  model: 'In **epigeal** germination the **hypocotyl lengthens** and the **cotyledons are carried above the soil**. In **hypogeal** germination the **epicotyl lengthens** and the **cotyledons stay below the soil**.',
  sol: 'Part that lengthens; position of cotyledons.',
  scheme: [['Part that lengthens', 1], ['Position of cotyledons', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('bean-short', short({
  marks: 3,
  stem: 'Describe the stages of germination of a bean seed in the correct order.',
  model: '1. The seed **takes in water**, swells and the **seed coat splits**.\n2. The **radicle emerges first** and grows down as the root.\n3. The **hypocotyl arches** and pulls the **cotyledons above the soil**; the **plumule** opens into the first leaves.',
  sol: 'Water and splitting; radicle; hypocotyl and plumule.',
  scheme: [['Water uptake and coat splits', 1], ['Radicle emerges first', 1], ['Hypocotyl lifts cotyledons; plumule forms leaves', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('maize-germ-short', short({
  marks: 3,
  stem: 'Describe the part played by the coleorhiza, the coleoptile and the scutellum in the germination of maize.',
  model: 'The **coleorhiza** **protects the radicle** as the root pushes out. The **coleoptile** **protects the plumule** as the shoot pushes up through the soil. The **scutellum** **passes food from the endosperm** to the growing embryo.',
  sol: 'Coleorhiza protects root; coleoptile protects shoot; scutellum passes food.',
  scheme: [['Coleorhiza protects the radicle', 1], ['Coleoptile protects the plumule', 1], ['Scutellum passes food', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('germ-table', short({
  marks: 3,
  stem: 'Tabulate three differences between epigeal and hypogeal germination, giving one example of each.',
  model: '| Epigeal | Hypogeal |\n|---|---|\n| **Hypocotyl** lengthens | **Epicotyl** lengthens |\n| Cotyledons **above** the soil | Cotyledons **stay below** the soil |\n| Example: **bean** (or castor) | Example: **pea, gram or maize** |',
  sol: 'Part that lengthens; cotyledons; examples.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Examples of both', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 conditions and experiments
add('cond-mcq', mcq({
  stem: 'Which set of conditions is needed for most seeds to germinate?',
  right: 'Water, oxygen and a suitable temperature', wrong: ['Light, carbon dioxide and soil', 'Water, light and sugar', 'Oxygen, minerals and sunlight'],
  sol: 'Water, oxygen and a suitable temperature are the three conditions — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('dry-mcq', mcq({
  stem: 'Dry seeds stored in a sealed tin in a cool store do not germinate. The main reason is that',
  right: 'they have no water to start the changes inside the seed', wrong: ['they have no light', 'they have no soil', 'they have no cotyledons'],
  sol: 'Without water the enzymes stay inactive — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('fridge-mcq', mcq({
  stem: 'Seeds placed on moist cotton wool in a refrigerator germinate very little because',
  right: 'the low temperature slows the changes in the seed', wrong: ['the cotton wool contains no oxygen', 'the seeds are not wet', 'refrigerators have no air'],
  sol: 'Too low a temperature slows the enzymes — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('control-mcq', mcq({
  stem: 'In a germination experiment with four tubes, the tube with moist cotton wool at room temperature, open to the air, is the',
  right: 'control', wrong: ['variable', 'hypothesis', 'result'],
  sol: 'It has every condition and is used for comparison — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('figtube-mcq', mcq({
  stem: 'In the figure of four tubes of seeds, which tube shows that oxygen is needed for germination?',
  right: 'Q', wrong: ['P', 'R', 'S'],
  sol: 'In Q the oil and boiled water keep air from the seeds — option (@K).',
  d: 3, c: 'analysis', t: [4],
  assets: [tubeFig],
}));
add('ar-water', ar({
  a: 'Seeds in the tube with dry cotton wool do not germinate.',
  r: 'Water activates the enzymes of the seed and carries food to the embryo.',
  key: 'c',
  sol: 'Both are true, and the need for water explains the failure in the dry tube — option (c).',
  d: 2, c: 'analysis', t: [4],
}));
add('ar-light', ar({
  a: 'Light is needed for the germination of most seeds.',
  r: 'Seeds germinate well in the dark under the soil.',
  key: 'b',
  sol: 'The assertion is false: most seeds do not need light. The reason is true — option (b).',
  d: 3, c: 'analysis', t: [4],
}));
add('pct-num', num({
  stem: `Out of ${TEST.sown} mustard seeds sown on moist cloth, ${TEST.germ} germinated. What percentage germinated?`,
  value: TEST.pct,
  sol: r`$${TEST.germ} \div ${TEST.sown} \times 100 = ${TEST.pct}$ percent.`,
  scheme: [[`${TEST.pct}`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => q.answer.value === 84 || 'value');
add('term-control', term({
  stem: 'Give the biological term: the set-up in an experiment in which all the conditions are present, used for comparison.',
  model: '**Control.**', sol: 'Control.', sch: 'Control',
  d: 1, c: 'recall', t: [4],
}));
add('reason-boil', term({
  stem: 'Give reason: the water used to cover the seeds in an oxygen experiment is boiled and cooled first.',
  model: 'Boiling **drives out the dissolved air (oxygen)**.', sol: 'Removes dissolved oxygen.', sch: 'Removes dissolved air',
  d: 2, c: 'understanding', t: [4],
}));
add('water-short', short({
  marks: 2,
  stem: 'State two reasons why water is needed for the germination of a seed.',
  model: 'Water **softens the seed coat** and **activates the enzymes**; it also **carries food** to the growing embryo.',
  sol: 'Any two roles of water.',
  scheme: [['First role', 1], ['Second role', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('oxygen-short', short({
  marks: 2,
  stem: 'Why do germinating seeds need oxygen and a suitable temperature?',
  model: 'Oxygen is needed for **respiration**, which releases the **energy** for growth. A suitable temperature lets the **enzymes work well**.',
  sol: 'Oxygen for respiration; temperature for enzymes.',
  scheme: [['Oxygen for respiration and energy', 1], ['Temperature suits enzymes', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('design-short', short({
  marks: 3,
  stem: 'Describe how you would show that seeds need water to germinate. Name the control.',
  model: 'Place the **same number of similar seeds** in two tubes: one on **dry cotton wool** and one on **moist cotton wool**, both at **room temperature in air**. After some days the seeds on the **moist cotton wool (the control)** germinate and those on the dry cotton wool do not.',
  sol: 'Two tubes, same seeds, only water differs; moist tube is the control.',
  scheme: [['Same seeds, dry and moist cotton wool', 1], ['Other conditions kept the same', 1], ['Moist tube is the control, result stated', 1]],
  d: 3, c: 'application', t: [4],
}));
add('cotfood-num', num({
  stem: `The dry mass of the cotyledons of a germinating seedling falls from ${COT.start} mg to ${COT.day8} mg in eight days. What percentage of the stored food was used?`,
  value: COT.pct,
  sol: r`$(${COT.start} - ${COT.day8}) \div ${COT.start} \times 100 = ${COT.pct}$ percent.`,
  scheme: [[`${COT.pct}`, 1]],
  d: 3, c: 'application', t: [3, 4],
}), (q) => q.answer.value === 30 || 'value');

// ---------------------------------------------------------------- 10-mark structured questions
add('bean-long', long({
  marks: 10, wl: null,
  stem: 'Study the diagram of a bean seed. Parts are lettered A to E.\n\n(a) Name the parts A and B and state one function of each. [2]\n\n(b) Name the parts C and D and state what each grows into. [2]\n\n(c) Name the part E and state what it shows. [2]\n\n(d) Draw a neat, labelled diagram of the inside of a bean seed with one cotyledon removed, naming four parts. [4]',
  model: '**(a)** A is the **seed coat**: protects the embryo. B is a **cotyledon**: stores food.\n\n**(b)** C is the **plumule**: grows into the shoot. D is the **radicle**: grows into the root.\n\n**(c)** E is the **hilum**: the scar where the seed was attached to the fruit.\n\n**(d)** An outline of the **seed coat**, one thick **cotyledon**, and the embryo axis with the **plumule** and **radicle**. Four labels.',
  sol: 'Seed coat, cotyledon; plumule, radicle; hilum; labelled seed.',
  scheme: [['A named with function', 1], ['B named with function', 1], ['C with shoot', 1], ['D with root', 1], ['E named', 1], ['E shows attachment', 1], ['Seed outline with cotyledon and embryo', 2], ['Four labels', 2]],
  d: 3, c: 'application', t: [1],
  assets: [beanFig],
}));
add('sort-long', long({
  marks: 10, wl: null,
  stem: 'A nursery assistant has two seeds, X and Y. X has two thick halves and no separate food tissue. Y has one flat cotyledon beside a large starchy tissue, with a sheath around its shoot and another around its root.\n\n(a) Name the type of seed each is and name one example of each. [2]\n\n(b) Name the sheaths of Y and state what each protects. [2]\n\n(c) Tabulate two differences between X and Y apart from the sheaths. [2]\n\n(d) Draw a neat, labelled diagram of Y in long section, naming four parts. [4]',
  model: '**(a)** X is a **dicot** seed (bean); Y is a **monocot** grain (maize).\n\n**(b)** The **coleoptile** protects the **plumule**; the **coleorhiza** protects the **radicle**.\n\n**(c)** X has **two** cotyledons, Y **one**; X stores food **in the cotyledons**, Y in the **endosperm**.\n\n**(d)** A grain outline with **endosperm**, **scutellum**, **plumule** in its coleoptile and **radicle** in its coleorhiza. Four labels.',
  sol: 'Dicot bean, monocot maize; coleoptile and coleorhiza; two differences; labelled maize grain.',
  scheme: [['X dicot with example', 1], ['Y monocot with example', 1], ['Coleoptile protects plumule', 1], ['Coleorhiza protects radicle', 1], ['First difference', 1], ['Second difference', 1], ['Grain outline with embryo', 2], ['Four labels', 2]],
  d: 4, c: 'analysis', t: [1, 2],
}));
add('exp-long', long({
  marks: 10, wl: null,
  stem: `A student sets up four tubes P, Q, R and S, each with ${SEEDS} similar seeds. P: dry cotton wool at room temperature. Q: seeds under boiled, cooled water with a layer of oil. R: moist cotton wool in an ice bath. S: moist cotton wool at room temperature, open to the air. After a week ${TP.germ}, ${TQ.germ}, ${TR.germ} and ${TS.germ} seeds had germinated in P, Q, R and S.\n\n(a) Calculate the percentage of seeds that germinated in R and in S. [2]\n\n(b) Name the condition missing in P and in Q. [2]\n\n(c) Name the control and state why it is needed. [2]\n\n(d) Draw a neat, labelled diagram of tube Q, naming four parts. [4]`,
  model: `**(a)** R: ${TR.germ} ÷ ${SEEDS} × 100 = **${TR.pct}%**. S: ${TS.germ} ÷ ${SEEDS} × 100 = **${TS.pct}%**.\n\n**(b)** P lacks **water**; Q lacks **oxygen (air)**.\n\n**(c)** **Tube S** is the control, with all conditions; it is needed to **compare** with the other tubes and show that the seeds were able to germinate.\n\n**(d)** A **test tube** holding **seeds** at the bottom, **boiled, cooled water** above them and a **layer of oil** on top. Four labels.`,
  sol: `${TR.pct}% and ${TS.pct}%; water and oxygen; tube S is the control; labelled tube.`,
  scheme: [[`R ${TR.pct}%`, 1], [`S ${TS.pct}%`, 1], ['Water missing in P', 1], ['Oxygen missing in Q', 1], ['Control is S', 1], ['Used for comparison', 1], ['Tube with seeds, water and oil drawn', 2], ['Four labels', 2]],
  d: 3, c: 'analysis', t: [4],
  assets: [tubeFig],
}), (q) => TR.pct === 5 && TS.pct === 95 || 'pct');
add('hypo-long', long({
  marks: 10, wl: null,
  stem: 'A student sows bean seeds and pea seeds in separate pots. After a week she finds the two green seed leaves of the bean seedling above the soil, while in the pea seedling the seed leaves are still in the soil.\n\n(a) Name the type of germination shown by each seedling. [2]\n\n(b) Name the part that lengthens in each seedling to cause the difference. [2]\n\n(c) State which structure comes out of the seed first in both and why it does so. [2]\n\n(d) Draw a neat, labelled diagram of the bean seedling above the soil, naming four parts. [4]',
  model: '**(a)** Bean: **epigeal**. Pea: **hypogeal**.\n\n**(b)** Bean: the **hypocotyl**. Pea: the **epicotyl**.\n\n**(c)** The **radicle**; it **anchors the seedling and absorbs water** from the soil.\n\n**(d)** A seedling with **root** in the soil, the **hypocotyl**, two **cotyledons** above the soil and young **leaves** (plumule); soil level marked. Four labels.',
  sol: 'Epigeal and hypogeal; hypocotyl and epicotyl; radicle anchors; labelled seedling.',
  scheme: [['Bean epigeal', 1], ['Pea hypogeal', 1], ['Hypocotyl', 1], ['Epicotyl', 1], ['Radicle', 1], ['Reason', 1], ['Seedling with soil level', 2], ['Four labels', 2]],
  d: 3, c: 'application', t: [3],
}));
add('maize-long', long({
  marks: 10, wl: null,
  stem: 'Study the diagram of a maize grain in long section. Parts are lettered A to E.\n\n(a) Name the parts B and C and state the function of each. [3]\n\n(b) Name the parts D and E and the sheath that protects each. [2]\n\n(c) State the order in which E and D come out when the grain germinates. [2]\n\n(d) Draw a neat, labelled diagram of a germinating maize grain showing the shoot and the root, with three labels. [3]',
  model: '**(a)** B is the **endosperm**: stores food. C is the **scutellum**: passes food to the embryo.\n\n**(b)** D is the **plumule**, protected by the **coleoptile**. E is the **radicle**, protected by the **coleorhiza**.\n\n**(c)** **E (the radicle)** emerges first, then **D (the plumule)**.\n\n**(d)** A grain with a **root** below, a **coleoptile** and shoot above, and the **endosperm**. Three labels.',
  sol: 'Endosperm, scutellum; plumule with coleoptile, radicle with coleorhiza; radicle first; labelled seedling.',
  scheme: [['B endosperm', 1], ['C scutellum', 1], ['Functions', 1], ['D with coleoptile', 1], ['E with coleorhiza', 1], ['Radicle first', 1], ['Then plumule', 1], ['Germinating grain drawn', 1], ['Three labels', 2]],
  d: 3, c: 'application', t: [1, 3],
  assets: [maizeFig],
}));
add('water-long', long({
  marks: 10, wl: null,
  stem: `A student soaks gram seeds overnight. ${SOAK.dry} g of dry seeds become ${SOAK.wet} g. After germination the radicle measures ${RADICLE[0]} mm on day 1, ${RADICLE[1]} mm on day 2, ${RADICLE[2]} mm on day 3 and ${RADICLE[3]} mm on day 4.\n\n(a) Calculate the percentage increase in mass of the seeds. [2]\n\n(b) Calculate the mean growth of the radicle each day from day 1 to day 4. [2]\n\n(c) State two ways in which water helps the seed to germinate. [2]\n\n(d) Draw a neat, labelled diagram of a germinating seed with the radicle emerging, naming four parts. [4]`,
  model: `**(a)** Gain = ${SOAK.wet} − ${SOAK.dry} = ${SOAK.gain} g; ${SOAK.gain} ÷ ${SOAK.dry} × 100 = **${SOAK.pct}%**.\n\n**(b)** (${RADICLE[3]} − ${RADICLE[0]}) ÷ 3 = **${RADICLE_PER_DAY} mm per day**.\n\n**(c)** Water **softens the seed coat**, **activates the enzymes** and **carries food** to the embryo (any two).\n\n**(d)** A seed with a split **seed coat**, a **cotyledon**, the **radicle** emerging and the **plumule**. Four labels.`,
  sol: `${SOAK.pct}%; ${RADICLE_PER_DAY} mm per day; two roles of water; labelled germinating seed.`,
  scheme: [[`Gain ${SOAK.gain} g`, 1], [`${SOAK.pct}%`, 1], ['Difference in length', 1], [`${RADICLE_PER_DAY} mm per day`, 1], ['First role of water', 1], ['Second role of water', 1], ['Seed with radicle emerging', 2], ['Four labels', 2]],
  d: 3, c: 'application', t: [3, 4],
}), (q) => SOAK.pct === 50 && RADICLE_PER_DAY === 9 || 'values');
