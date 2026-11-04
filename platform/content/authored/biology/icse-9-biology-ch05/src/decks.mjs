// ICSE 9 Biology ch05 Seeds: Structure and Germination — Part 1 (t01–t02), Part 2 (t03–t04).
import { sl, deck, table, flow, svgV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { BEAN, MAIZE, GERMINATION, TUBES_SVG } from './svgs.mjs';
import { BAG, TUBES, SEEDS, TS, TP, TQ, TR, SOWN_DEPTH_CM, SHOOT_PER_DAY_CM, DAYS_TO_SURFACE } from './calc.mjs';

export const V = {
  bean: svgV(BEAN, 'A bean seed from outside and opened, with its parts labelled'),
  maize: svgV(MAIZE, 'A maize grain in long section with its parts labelled'),
  germination: svgV(GERMINATION, 'Epigeal germination of a bean and hypogeal germination of a pea, with parts labelled'),
  tubes: svgV(TUBES_SVG, 'Four test tubes P, Q, R and S set up to study the conditions needed for germination'),
};

export const deck1 = deck({
  part: 1,
  title: 'Seeds: Structure and Germination — Part 1: Structure of a bean seed and a maize grain',
  goals: [
    'Draw and label the external and internal structure of a bean seed and a maize grain',
    'State the function of each part of the seed',
    'Tabulate the differences between monocot and dicot seeds',
  ],
  slides: [
    sl('title', 'Seeds: Structure and Germination', {
      b: 'Part 1 — what a seed is made of, in a bean and in a maize grain.',
      v: flow('LR', [['o', 'Ovule'], ['f', 'Fertilisation'], ['s', 'Seed: seed coat, embryo, food store']], [['o', 'f'], ['f', 's']], 'Flow from the ovule through fertilisation to a seed with a seed coat, an embryo and a food store'),
      n: 'After fertilisation the ovule becomes a seed. Every seed has the same three jobs to do: protect a tiny new plant, feed it, and wait until conditions are right. We start by opening a bean seed.',
    }),
    sl('diagram', 'A bean seed: outside and inside', {
      b: 'A bean has **two cotyledons** and no separate food store. It is a **dicot** seed.',
      v: V.bean,
      n: 'From outside you see the seed coat, a scar called the hilum where the seed hung from the fruit, and a tiny hole, the micropyle. Inside are two thick cotyledons and the embryo with its plumule and radicle.',
    }),
    sl('concept', 'Parts of a bean seed and what they do', {
      v: table(['Part', 'Function'], [['Seed coat', 'Protects the embryo; keeps out germs and prevents drying'], ['Hilum', 'Scar left where the seed was attached to the fruit'], ['Micropyle', 'Tiny pore; takes in water and lets the radicle come out'], ['Cotyledons (two)', 'Store food for the embryo'], ['Plumule', 'Grows into the shoot'], ['Radicle', 'Grows into the root']], 'Table of the parts of a bean seed and the function of each'),
      n: 'The seed coat protects. The micropyle lets water in. The two cotyledons are the food store. The embryo itself is the plumule, which becomes the shoot, and the radicle, which becomes the root.',
    }),
    sl('check', 'Quick check: the food store', {
      b: 'In a bean seed the food for the embryo is stored in the',
      chk: 'chk-cotyledon',
      n: 'Think of the two thick halves.',
    }),
    sl('diagram', 'A maize grain', {
      b: 'A maize grain is really a **fruit with one seed**. It has **one cotyledon**, the **scutellum**, and a large **endosperm**.',
      v: V.maize,
      n: 'In a maize grain the fruit wall and seed coat are joined. Most of the grain is endosperm, the food store. At one side is the embryo, with a shield-like scutellum, a plumule inside a sheath called the coleoptile, and a radicle inside a sheath called the coleorhiza.',
    }),
    sl('concept', 'Parts of a maize grain and what they do', {
      v: table(['Part', 'Function'], [['Fruit wall and seed coat (joined)', 'Protect the grain'], ['Endosperm', 'Large store of food, mainly starch'], ['Scutellum', 'The single cotyledon; passes food from the endosperm to the embryo'], ['Plumule with coleoptile', 'Shoot; the coleoptile protects it as it pushes up'], ['Radicle with coleorhiza', 'Root; the coleorhiza protects it as it pushes down']], 'Table of the parts of a maize grain and the function of each'),
      n: 'The endosperm holds the food. The scutellum passes that food to the embryo. The coleoptile is a sheath that guards the young shoot, and the coleorhiza is a sheath that guards the young root.',
    }),
    sl('check', 'Quick check: the shield', {
      b: 'Which part of a maize grain is its single cotyledon?',
      chk: 'chk-scutellum',
      n: 'Its name sounds like a shield.',
    }),
    sl('concept', 'Dicot and monocot seeds compared', {
      v: table(['Feature', 'Dicot seed (bean)', 'Monocot seed (maize)'], [['Cotyledons', 'Two', 'One (scutellum)'], ['Food store', 'In the cotyledons; no separate endosperm in a mature seed', 'In a large separate endosperm'], ['Covering', 'Seed coat only', 'Fruit wall joined to the seed coat'], ['Sheaths on the embryo', 'None', 'Coleoptile and coleorhiza'], ['Germination of the example', 'Epigeal (bean)', 'Hypogeal (maize)']], 'Table comparing a dicot seed with a monocot seed in five features'),
      n: 'Count the cotyledons first. Dicots have two, monocots have one. A bean keeps its food in its cotyledons, while maize keeps it in a separate endosperm. Only maize has the two protective sheaths, the coleoptile and the coleorhiza.',
    }),
    sl('example', 'Worked example 1: counting cotyledons', {
      b: `A bag holds ${BAG.bean} bean seeds and ${BAG.maize} maize grains. How many cotyledons are there altogether?`,
      ul: [`Step 1: a bean seed has ${BAG.beanCot} cotyledons, so ${BAG.bean} × ${BAG.beanCot} = **${BAG.beanCotyledons}**.`, `Step 2: a maize grain has ${BAG.maizeCot} cotyledon, so ${BAG.maize} × ${BAG.maizeCot} = **${BAG.maizeCotyledons}**.`, `Step 3: total = ${BAG.beanCotyledons} + ${BAG.maizeCotyledons} = **${BAG.total}**.`],
      v: table(['Seed', 'Number', 'Cotyledons each', 'Cotyledons'], [['Bean', String(BAG.bean), String(BAG.beanCot), String(BAG.beanCotyledons)], ['Maize', String(BAG.maize), String(BAG.maizeCot), String(BAG.maizeCotyledons)], ['Total', String(BAG.bean + BAG.maize), '', String(BAG.total)]], 'Worked table: fifty bean cotyledons, twenty-five maize cotyledons and seventy-five in all'),
      n: 'Count by kind of seed. Twenty-five beans with two cotyledons each give fifty. Twenty-five maize grains with one cotyledon each give twenty-five. Together there are seventy-five cotyledons.',
    }),
    sl('check', 'Quick check: one cotyledon', {
      b: 'A seed that has a single cotyledon and a large endosperm is a',
      chk: 'chk-monodi',
      n: 'Count the cotyledons.',
    }),
    sl('example', 'Worked example 2: naming the seed from clues', {
      b: 'A student soaks a seed and splits it into two thick halves with a tiny shoot between them. There is no separate food store and no sheath around the shoot.',
      ul: ['Step 1: two thick halves are **two cotyledons**.', 'Step 2: no separate endosperm and no sheaths point away from maize.', 'Step 3: so it is a **dicot seed**, like the **bean**.'],
      v: table(['Clue', 'Points to'], [['Two thick halves', 'Two cotyledons: dicot'], ['No separate endosperm', 'Food is in the cotyledons'], ['No sheath on the shoot', 'Not a maize-type grain']], 'Worked table: clues in the soaked seed and what each points to'),
      n: 'Work from the clues. Two thick halves mean two cotyledons. No separate food store and no sheaths mean it is not like maize. So the seed is a dicot, like a bean.',
    }),
    sl('concept', 'Why each part matters', {
      v: table(['Need of the new plant', 'Part that meets it'], [['Protection', 'Seed coat (and fruit wall in maize)'], ['Water in', 'Micropyle'], ['Food', 'Cotyledons (bean); endosperm through the scutellum (maize)'], ['First shoot and root', 'Plumule and radicle'], ['Safe passage through soil', 'Coleoptile and coleorhiza (maize)']], 'Table matching the needs of a young plant to the seed part that meets each'),
      n: 'Think of the seed as a packed lunch for a journey. The coat is the wrapper, the micropyle is the way in for water, the food store is the lunch, and the plumule and radicle are the traveller.',
    }),
    sl('summary', 'Summary', {
      ul: ['Bean: two cotyledons, plumule, radicle, hilum, micropyle, seed coat.', 'Maize: one cotyledon (scutellum), endosperm, coleoptile, coleorhiza.', 'Dicot: two cotyledons. Monocot: one cotyledon.'],
      v: table(['', 'Bean', 'Maize'], [['Cotyledons', 'Two', 'One'], ['Food store', 'Cotyledons', 'Endosperm'], ['Sheaths', 'No', 'Coleoptile and coleorhiza']], 'Summary table comparing a bean seed and a maize grain'),
      n: 'To recap. A bean is a dicot seed with two cotyledons that store food. Maize is a monocot grain with one cotyledon, the scutellum, and a large endosperm. Only maize has the coleoptile and coleorhiza.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['In a labelled diagram show the **hilum and micropyle** from outside and the **plumule and radicle** inside.', 'Do not call the **scutellum** the endosperm: it is the **cotyledon**.', 'In a table of differences, give a **matching point** for each seed.', 'Use **ruled lines** that touch the part.'],
      n: 'Exam tips. In diagrams, draw the hilum and micropyle, and the plumule and radicle. Never confuse the scutellum with the endosperm. In a table of differences, write a matching point for each seed. And use neat ruled lines.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Seeds: Structure and Germination — Part 2: Germination and the conditions it needs',
  goals: [
    'Describe the stages of germination of a bean seed and a maize grain',
    'Distinguish hypogeal from epigeal germination with examples',
    'Design an experiment to show that water, oxygen and a suitable temperature are needed',
  ],
  slides: [
    sl('title', 'Germination', {
      b: 'Part 2 — how a resting seed becomes a seedling, and what it needs.',
      v: flow('LR', [['i', 'Water taken in'], ['r', 'Radicle emerges'], ['p', 'Plumule grows'], ['s', 'Seedling']], [['i', 'r'], ['r', 'p'], ['p', 's']], 'Flow from water taken in to radicle emerging, plumule growing and a seedling'),
      n: 'A dry seed is alive but resting. Germination is the growth of the embryo into a seedling. It begins when the seed takes in water, and the radicle is the first part to come out.',
    }),
    sl('concept', 'Stages of germination of a bean', {
      v: table(['Stage', 'What happens'], [['1', 'The seed takes in water through the micropyle and swells'], ['2', 'The seed coat splits'], ['3', 'The radicle emerges first and grows down as the root'], ['4', 'The hypocotyl lengthens, bends into an arch and pulls the cotyledons above the soil'], ['5', 'The plumule opens into the first leaves; the cotyledons shrink as their food is used']], 'Table of five stages in the germination of a bean seed'),
      n: 'Water comes first and the seed swells. The coat splits. The radicle goes down as the root. Then the hypocotyl arches and drags the cotyledons into the light, and the plumule opens into leaves.',
    }),
    sl('diagram', 'Two ways to germinate', {
      b: 'In **epigeal** germination the **hypocotyl** lengthens; in **hypogeal** germination the **epicotyl** lengthens.',
      v: V.germination,
      n: 'In the bean, the hypocotyl grows long and lifts the cotyledons above the ground. In the pea, the epicotyl grows long and the cotyledons stay in the soil. The word epigeal means above the earth, hypogeal means below.',
    }),
    sl('concept', 'Epigeal and hypogeal germination', {
      v: table(['Feature', 'Epigeal', 'Hypogeal'], [['Part that lengthens', 'Hypocotyl', 'Epicotyl'], ['Cotyledons', 'Carried above the soil; may turn green', 'Stay below the soil'], ['Examples', 'Bean, castor, cotton', 'Pea, gram, maize']], 'Table comparing epigeal and hypogeal germination'),
      n: 'Ask one question: where do the cotyledons end up? Above the soil means epigeal. Below the soil means hypogeal. Beans are epigeal. Peas, gram and maize are hypogeal.',
    }),
    sl('check', 'Quick check: where do the cotyledons end up?', {
      b: 'A seedling lifts its two cotyledons above the soil as the hypocotyl lengthens. This is',
      chk: 'chk-epigeal',
      n: 'Remember the meaning of the word.',
    }),
    sl('concept', 'Germination of a maize grain', {
      v: table(['Stage', 'What happens'], [['1', 'The grain absorbs water and swells'], ['2', 'The coleorhiza is pushed out and the radicle breaks through it'], ['3', 'The coleoptile grows up through the soil, protecting the plumule'], ['4', 'The plumule breaks through the coleoptile and forms leaves'], ['5', 'The scutellum passes food from the endosperm to the seedling']], 'Table of five stages in the germination of a maize grain'),
      n: 'Maize is hypogeal. The coleorhiza and coleoptile act like protective tips, guarding the root and the shoot as they push through the soil. The scutellum passes food across from the endosperm.',
    }),
    sl('check', 'Quick check: the shoot guard', {
      b: 'In a germinating maize grain, the sheath that protects the young shoot is the',
      chk: 'chk-coleoptile',
      n: 'It is the sheath for the plumule.',
    }),
    sl('example', 'Worked example 1: which type, and how long?', {
      b: `A seed is sown ${SOWN_DEPTH_CM} centimetres deep. After germination, the cotyledons stay in the soil and the epicotyl lengthens ${SHOOT_PER_DAY_CM} centimetres each day. Name the type of germination and find the days the shoot needs to reach the surface.`,
      ul: ['Step 1: cotyledons stay in the soil and the epicotyl grows, so it is **hypogeal**.', `Step 2: days = depth ÷ growth each day = ${SOWN_DEPTH_CM} ÷ ${SHOOT_PER_DAY_CM} = **${DAYS_TO_SURFACE}**.`],
      v: table(['Question', 'Answer'], [['Type', 'Hypogeal'], ['Depth', `${SOWN_DEPTH_CM} cm`], ['Growth each day', `${SHOOT_PER_DAY_CM} cm`], ['Days to the surface', String(DAYS_TO_SURFACE)]], 'Worked table: hypogeal germination, four centimetres deep, two centimetres a day, two days to reach the surface'),
      n: 'First decide the type. The cotyledons stay below the soil, so it is hypogeal. Then divide the depth by the daily growth. Four divided by two is two days.',
    }),
    sl('concept', 'Conditions needed for germination', {
      v: table(['Condition', 'Why it is needed'], [['Water', 'Softens the seed coat, activates enzymes and carries food to the embryo'], ['Oxygen', 'For respiration, which releases energy for growth'], ['Suitable temperature', 'Enzymes work best in warmth; too cold or too hot stops germination']], 'Table of three conditions for germination and why each is needed'),
      n: 'A seed needs three things. Water to wake up its enzymes, oxygen for respiration to release energy, and a suitable temperature. Light is not needed by most seeds until the seedling has leaves.',
    }),
    sl('diagram', 'An experiment with four tubes', {
      b: 'Each tube holds the same kind and number of seeds. **Only one condition** is changed at a time.',
      v: V.tubes,
      n: 'Four tubes, same seeds in each. In one tube the cotton wool is dry. In another the seeds lie under boiled water with oil, so no air reaches them. In a third the seeds are cold. The last tube has everything the seeds need.',
    }),
    sl('check', 'Quick check: the oil layer', {
      b: 'Why is a layer of oil poured over the boiled water in a test tube of seeds?',
      chk: 'chk-oxygen',
      n: 'Boiling drives out dissolved air.',
    }),
    sl('example', 'Worked example 2: reading the results', {
      b: `${SEEDS} seeds were used in each tube. Seeds that germinated: P ${TP.germ}, Q ${TQ.germ}, R ${TR.germ}, S ${TS.germ}. Find the percentage in S and say what the results show.`,
      ul: [`Step 1: S = ${TS.germ} ÷ ${SEEDS} × 100 = **${TS.pct} percent**.`, 'Step 2: S is the **control**, with water, air and warmth; almost all its seeds germinated.', 'Step 3: P (no water), Q (no oxygen) and R (cold) germinated hardly at all, so **each condition is needed**.'],
      v: table(['Tube', 'Condition missing', 'Germinated', 'Percent'], TUBES.map((t, i) => [t.id, ['Water', 'Oxygen', 'Warmth', 'None (control)'][i], String(t.germ), String(t.pct)]), 'Worked table of germination in tubes P, Q, R and S with the percentage in each'),
      n: 'Always compare with the control tube. Nineteen of twenty seeds germinated when they had water, air and warmth. Take away any one condition and almost none germinate, so each is needed.',
    }),
    sl('summary', 'Summary', {
      ul: ['Germination: growth of the embryo into a seedling; the radicle comes out first.', 'Epigeal: cotyledons above soil (bean). Hypogeal: cotyledons below soil (pea, gram, maize).', 'Needs: water, oxygen, a suitable temperature.'],
      v: table(['Need', 'Role'], [['Water', 'Wakes up enzymes'], ['Oxygen', 'Respiration'], ['Temperature', 'Enzymes work best in warmth']], 'Summary table of the three conditions for germination and their roles'),
      n: 'To recap. A seed germinates when it has water, oxygen and a suitable temperature. The radicle emerges first. In epigeal germination the cotyledons rise above the soil, and in hypogeal germination they stay below.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Epigeal = **hypocotyl** lengthens; hypogeal = **epicotyl** lengthens.', 'In an experiment, name the **control** and change **only one** condition.', 'Give the **reason** for each condition, not only its name.', 'Write maize as **hypogeal**.'],
      n: 'Exam tips. Link epigeal with the hypocotyl and hypogeal with the epicotyl. In an experiment name the control and change only one condition. Give a reason for each condition. And remember that maize is hypogeal.',
    }),
  ],
});
