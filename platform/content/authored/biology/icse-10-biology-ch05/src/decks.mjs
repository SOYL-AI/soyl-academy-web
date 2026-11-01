// ICSE 10 Biology ch05 Photosynthesis — Part 1 (t01–t05), Part 2 (t06–t07).
import { sl, deck, table, flow, chem, svgV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { CHLOROPLAST, LEAF_TS, WATERBATH, LIGHTSCREEN, MOLL, VARIEGATED, HYDRILLA, BUBBLES, CARBON } from './svgs.mjs';
import { EQ, HYD } from './calc.mjs';

export const V = {
  equation: chem('6CO2 + 12H2O -> C6H12O6 + 6O2 + 6H2O', 'Balanced equation: six carbon dioxide plus twelve water give one glucose, six oxygen and six water, in the presence of sunlight and chlorophyll', 'Sunlight and chlorophyll are written over the arrow'),
  chloroplast: svgV(CHLOROPLAST, 'Structure of a chloroplast'),
  leaf: svgV(LEAF_TS, 'Section of a leaf showing its adaptations for photosynthesis'),
  bath: svgV(WATERBATH, 'Removing chlorophyll in a water bath'),
  screen: svgV(LIGHTSCREEN, 'Light screen experiment'),
  moll: svgV(MOLL, "Moll's half-leaf experiment"),
  vari: svgV(VARIEGATED, 'Variegated leaf before and after the starch test'),
  hydrilla: svgV(HYDRILLA, 'Oxygen from hydrilla'),
  bubbles: svgV(BUBBLES, 'Hydrilla bubble counts'),
  carbon: svgV(CARBON, 'The carbon cycle'),
  light: flow('LR', [['l', 'Light absorbed by chlorophyll'], ['a', 'Chlorophyll activated'], ['p', 'Photolysis of water'], ['o', 'Oxygen released'], ['e', 'ATP and NADPH formed']], [['l', 'a'], ['a', 'p'], ['p', 'o'], ['p', 'e']], 'Flow of the light phase: light absorbed by chlorophyll activates it, water is split by photolysis, oxygen is released and ATP and NADPH are formed'),
  dark: flow('LR', [['c', 'Carbon dioxide'], ['h', 'Hydrogen from NADPH'], ['e', 'Energy from ATP'], ['g', 'Glucose'], ['s', 'Starch (stored)']], [['c', 'g'], ['h', 'g'], ['e', 'g'], ['g', 's']], 'Flow of the dark phase: carbon dioxide combines with hydrogen from NADPH, using energy from ATP, to form glucose, which is stored as starch'),
};

export const deck1 = deck({
  part: 1,
  title: 'Photosynthesis — Part 1: The process and the leaf',
  goals: [
    'Write the balanced equation for photosynthesis and explain its importance',
    'Locate the light and dark phases in the chloroplast and describe each in outline',
    'Relate the structure of a leaf to efficient photosynthesis',
  ],
  slides: [
    sl('title', 'Photosynthesis', {
      b: 'Part 1 — how green leaves turn light, water and carbon dioxide into food and oxygen.',
      v: flow('LR', [['c', 'Carbon dioxide'], ['w', 'Water'], ['l', 'Light and chlorophyll'], ['g', 'Glucose'], ['o', 'Oxygen']], [['c', 'l'], ['w', 'l'], ['l', 'g'], ['l', 'o']], 'Flow: carbon dioxide and water, with light and chlorophyll, give glucose and oxygen'),
      n: 'Every bite of food you eat and every breath of oxygen you take can be traced back to green leaves. In this part we see what photosynthesis needs and makes, where it happens inside the leaf, and how it works in two phases.',
    }),
    sl('concept', 'The equation', {
      b: `**Photosynthesis**: carbon dioxide and water combine, using **light energy** absorbed by **chlorophyll**, to form **glucose** and **oxygen**. The balanced equation has ${EQ.left.O} oxygen atoms on each side.`,
      v: V.equation,
      m: [String.raw`\ce{6CO2 + 12H2O ->[\text{sunlight}][\text{chlorophyll}] C6H12O6 + 6O2 + 6H2O}`],
      n: 'Six molecules of carbon dioxide and twelve of water are used to make one molecule of glucose. Six molecules of oxygen are given out, and six of water are formed again. Sunlight and chlorophyll are written over the arrow because the reaction needs them but does not use them up.',
    }),
    sl('concept', 'Why photosynthesis matters', {
      v: table(['Importance', 'Why'], [['Food', 'Glucose is the source of food for plants and, through food chains, for animals'], ['Oxygen', 'Keeps up the oxygen in the air for respiration'], ['Energy', 'Traps solar energy as chemical energy in food'], ['Carbon dioxide', 'Removes carbon dioxide from the air'], ['Fuels', 'Coal, oil and wood store energy trapped long ago']], 'Table of five reasons why photosynthesis is important'),
      n: 'Photosynthesis is the only large scale way that energy from the Sun enters living things. It feeds almost every food chain, refills the air with oxygen, removes carbon dioxide and, over millions of years, made the coal and oil we burn today.',
    }),
    sl('check', 'Quick check: day and night', {
      b: 'True or false: plants photosynthesise at night as fast as by day.',
      chk: 'night-tf',
      n: 'What does photosynthesis need that is missing at night?',
    }),
    sl('diagram', 'The chloroplast', {
      b: 'A **double membrane** encloses **grana** (stacks of thylakoids with **chlorophyll**) joined by **stroma lamellae** in the **stroma**. Light phase: **grana**. Dark phase: **stroma**.',
      v: V.chloroplast,
      n: 'The chloroplast is the kitchen of the cell. Its grana are stacks of flattened discs whose membranes hold chlorophyll; this is where light is trapped. Around them is the stroma, full of enzymes, where carbon dioxide is turned into glucose.',
    }),
    sl('concept', 'Stomata supply carbon dioxide', {
      b: 'In light, **potassium ions** enter the guard cells, water follows and the **stomata open**, letting **carbon dioxide** diffuse in and **oxygen** out.',
      v: flow('LR', [['l', 'Light'], ['k', 'Potassium ions enter guard cells'], ['o', 'Stomata open'], ['c', 'Carbon dioxide diffuses in']], [['l', 'k'], ['k', 'o'], ['o', 'c']], 'Flow: light causes potassium ions to enter the guard cells, the stomata open and carbon dioxide diffuses into the leaf'),
      n: 'Carbon dioxide enters through the stomata. In light, potassium ions move into the guard cells, water follows by osmosis, and the stomata open just when photosynthesis needs carbon dioxide most.',
    }),
    sl('diagram', 'The light phase', {
      b: 'In the **grana**: chlorophyll is **activated** by light; water is split (**photolysis**); **oxygen** is released; **ATP** and **NADPH** are formed.',
      v: V.light,
      n: 'Light energy is absorbed by chlorophyll, which becomes activated. This energy splits water molecules, a step called photolysis. The oxygen from the water is released as a gas, while the energy and hydrogen are stored in two carrier molecules, ATP and NADPH.',
    }),
    sl('check', 'Quick check: splitting water', {
      b: 'Fill in: the splitting of water by light is called ______.',
      chk: 'photolysis-fill',
      n: 'Photo means light; lysis means splitting.',
    }),
    sl('diagram', 'The dark phase', {
      b: 'In the **stroma**: **carbon dioxide** combines with **hydrogen from NADPH**, using **energy from ATP**, to form **glucose**; extra glucose is stored as **starch**.',
      v: V.dark,
      n: 'The dark phase does not need light directly. In the stroma, carbon dioxide is joined to the hydrogen carried by NADPH, powered by ATP, building glucose step by step. The detailed equations are not needed at this level.',
    }),
    sl('example', 'Worked example 1: light phase or dark phase?', {
      b: 'Sort each event into the correct phase.',
      ul: ['Step 1: needs **light** or makes **oxygen**? Light phase.', 'Step 2: uses **carbon dioxide** or makes **glucose**? Dark phase.', 'Step 3: give the **site**: grana or stroma.'],
      v: table(['Event', 'Phase', 'Site'], [['Chlorophyll activated', 'Light', 'Grana'], ['Photolysis of water', 'Light', 'Grana'], ['ATP and NADPH formed', 'Light', 'Grana'], ['Carbon dioxide fixed into glucose', 'Dark', 'Stroma']], 'Worked table sorting four events into the light or dark phase with their site'),
      n: 'Ask two questions. Does the event need light or give out oxygen? Then it belongs to the light phase in the grana. Does it use carbon dioxide or build glucose? Then it is the dark phase in the stroma.',
    }),
    sl('example', 'Worked example 2: checking the balance', {
      b: 'Count atoms on each side of the equation.',
      ul: [`Step 1: carbon: left ${EQ.left.C}, right ${EQ.right.C}.`, `Step 2: hydrogen: left ${EQ.left.H}, right ${EQ.right.H}.`, `Step 3: oxygen: left ${EQ.left.O}, right ${EQ.right.O}: the equation is **balanced**.`],
      v: table(['Atom', 'Left side', 'Right side'], [['Carbon', String(EQ.left.C), String(EQ.right.C)], ['Hydrogen', String(EQ.left.H), String(EQ.right.H)], ['Oxygen', String(EQ.left.O), String(EQ.right.O)]], `Worked table: carbon ${EQ.left.C} on both sides, hydrogen ${EQ.left.H} on both sides, oxygen ${EQ.left.O} on both sides`),
      n: 'Multiply each subscript by the number in front of the formula and add up. Carbon, hydrogen and oxygen all match, so the equation is balanced. Counting the oxygen shows that twelve waters are needed to supply all the oxygen released.',
    }),
    sl('diagram', 'A leaf built for photosynthesis', {
      b: '**Broad, thin** blade; **palisade** cells packed with chloroplasts near the top; **spongy** tissue with **air spaces**; many **stomata**; **veins** for water and food.',
      v: V.leaf,
      n: 'A leaf is a solar panel and a gas exchanger in one. It is broad to catch light and thin so that gases reach every cell. Its palisade cells crowd their chloroplasts near the light, air spaces carry carbon dioxide, and veins bring water and carry away food.',
    }),
    sl('check', 'Quick check: the dark phase', {
      b: 'The dark phase is so called because…',
      chk: 'dark-mcq',
      n: 'Does it really happen only at night?',
    }),
    sl('summary', 'Summary', {
      ul: ['Carbon dioxide and water, with light and chlorophyll, give glucose and oxygen.', 'Light phase in the grana: activation, photolysis, oxygen, ATP, NADPH.', 'Dark phase in the stroma: carbon dioxide fixed into glucose using ATP and NADPH.', 'Leaves are broad, thin, rich in chloroplasts, stomata, air spaces and veins.'],
      v: table(['Phase', 'Site', 'Products'], [['Light', 'Grana', 'ATP, NADPH, oxygen'], ['Dark', 'Stroma', 'Glucose']], 'Summary table of the two phases, their sites and products'),
      n: 'To recap. Light is trapped in the grana, where water is split and oxygen released. In the stroma the products of the light phase turn carbon dioxide into glucose. And every feature of a leaf helps this happen efficiently.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Write the equation with **12 water** on the left and **6 water** on the right.', 'Oxygen comes from **water**, not carbon dioxide.', 'The dark phase is **not** "at night": it needs ATP and NADPH from the light phase.', 'Do not write detailed dark-reaction equations: they are not in the syllabus.'],
      n: 'Exam tips. Balance the equation with twelve waters in and six out. Say that oxygen comes from water. Never write that the dark phase happens only at night. And keep the dark phase in outline only.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Photosynthesis — Part 2: Experiments and the carbon cycle',
  goals: [
    'List the steps of the starch test and explain the purpose of each',
    'Design controlled experiments to show that light, carbon dioxide and chlorophyll are necessary, and that oxygen is released',
    'Describe the carbon cycle',
  ],
  slides: [
    sl('title', 'Experiments on Photosynthesis', {
      b: 'Part 2 — proving what a leaf needs, and following carbon round the living world.',
      v: flow('LR', [['d', 'Destarch the plant'], ['t', 'Remove one factor from part of it'], ['l', 'Keep in light'], ['s', 'Test for starch']], [['d', 't'], ['t', 'l'], ['l', 's']], 'Flow of a photosynthesis experiment: destarch the plant, remove one factor from part of it, keep it in light, then test for starch'),
      n: 'How do we know that a leaf needs light, carbon dioxide and chlorophyll? Each experiment follows the same plan. Destarch the plant, take away one factor from part of it, keep it in light, and test for starch. If starch is missing, that factor was needed.',
    }),
    sl('concept', 'Destarching', {
      b: 'Keep the potted plant in **darkness for one to two days**: it uses up its stored starch.',
      v: table(['Why destarch?', 'Without it'], [['Leaves start with no starch', 'Old starch could give a false positive'], ['Any starch found was made during the experiment', 'The result could not be trusted']], 'Table of why destarching is needed and what goes wrong without it'),
      n: 'A leaf that already contains starch would turn blue black whether or not it photosynthesised during the experiment. Keeping the plant in darkness lets it use up its starch, so any starch we find later must be new.',
    }),
    sl('diagram', 'The starch test', {
      b: '1. **Boil in water** (kills cells). 2. **Boil in alcohol** in a **water bath** (removes chlorophyll). 3. **Dip in warm water** (softens). 4. **Add iodine**: **blue-black** means starch.',
      v: V.bath,
      n: 'First boil the leaf in water to kill its cells. Then put it in alcohol, heated in a water bath because alcohol catches fire easily, until the leaf turns pale. Soften it in warm water, spread it on a tile and add iodine. Blue black shows starch.',
    }),
    sl('example', 'Worked example 1: reading starch tests', {
      b: 'Decide what each result shows.',
      ul: ['Step 1: **blue-black** → starch present → photosynthesis took place.', 'Step 2: **brown** (iodine colour) → no starch → photosynthesis did not take place there.', 'Step 3: compare with the **control** part to name the factor that was missing.'],
      v: table(['Leaf part', 'Colour with iodine', 'Meaning'], [['In light, green, with carbon dioxide', 'Blue-black', 'Photosynthesis'], ['Covered from light', 'Brown', 'Light needed'], ['White part of variegated leaf', 'Brown', 'Chlorophyll needed'], ['Inside bottle with potassium hydroxide', 'Brown', 'Carbon dioxide needed']], 'Worked table of four leaf parts, their colour with iodine and what each shows'),
      n: 'Every result is read the same way. Blue black means starch and photosynthesis; brown means none. Compare the brown part with the blue black control on the same leaf, and the one difference between them is the factor that was needed.',
    }),
    sl('check', 'Quick check: the colour of starch', {
      b: 'Fill in: starch gives a ______ colour with iodine.',
      chk: 'iodine-fill',
      n: 'Very dark, almost black.',
    }),
    sl('diagram', 'Light is necessary', {
      b: 'A strip of **black paper** on both sides of a leaf of a destarched plant; after some hours in sunlight the **covered strip** has **no starch**.',
      v: V.screen,
      n: 'Clip black paper across a leaf, top and bottom, and leave the plant in sunlight. In the starch test, the exposed parts turn blue black, but the covered strip stays brown. Without light, no starch was made.',
    }),
    sl('diagram', 'Carbon dioxide is necessary', {
      b: "**Moll's half-leaf experiment**: half a leaf inside a bottle with **potassium hydroxide** (absorbs carbon dioxide); that half makes **no starch**.",
      v: V.moll,
      n: 'Push half of a leaf through a split cork into a bottle containing potassium hydroxide, which soaks up carbon dioxide, and seal the cork. After a few hours in sunlight, only the half outside, which had carbon dioxide, makes starch.',
    }),
    sl('check', 'Quick check: the black strip', {
      b: 'Why does the covered strip stay brown?',
      chk: 'screen-mcq',
      n: 'What could not reach it?',
    }),
    sl('diagram', 'Chlorophyll is necessary', {
      b: 'A **variegated** leaf: only the **green** parts turn **blue-black**; the white parts have no chlorophyll and make no starch.',
      v: V.vari,
      n: 'Some leaves, like croton, have green and white areas. After the starch test, only the green areas turn blue black. The white areas lack chlorophyll, so they could not trap light, and they made no starch.',
    }),
    sl('diagram', 'Oxygen is released', {
      b: '**Hydrilla** in water under a funnel gives off **bubbles**; the gas collected **rekindles a glowing splinter**: **oxygen**.',
      v: V.hydrilla,
      n: 'Water plants such as hydrilla let us see photosynthesis happen. In light, streams of tiny bubbles rise from the leaves and collect in a test tube. A glowing splinter bursts into flame in the gas, showing that it is oxygen.',
    }),
    sl('example', 'Worked example 2: counting bubbles', {
      b: `Bubbles from hydrilla were counted for **${HYD.minutes} minutes** at each lamp distance.`,
      ul: [`Step 1: rate at ${HYD.rows[0].cm} cm = ${HYD.rows[0].n} ÷ ${HYD.minutes} = **${HYD.rows[0].rate}** per minute; at ${HYD.rows[3].cm} cm only **${HYD.rows[3].rate}**.`, `Step 2: with sodium bicarbonate at ${HYD.bicarb.cm} cm: **${HYD.bicarb.rate}** per minute instead of ${HYD.base20}, a rise of **${HYD.bicarbPct} per cent**.`, 'Step 3: more light and more carbon dioxide both speed up photosynthesis.'],
      v: V.bubbles,
      n: `Turn counts into rates by dividing by the time. The nearer lamp gives about ${HYD.nearFar} times as many bubbles as the farthest. Adding sodium bicarbonate, which releases carbon dioxide, raises the rate by half. Light and carbon dioxide both limit the rate.`,
    }),
    sl('check', 'Quick check: more bubbles', {
      b: 'Why does sodium bicarbonate increase the bubbles?',
      chk: 'bicarb-mcq',
      n: 'What gas does it release into the water?',
    }),
    sl('diagram', 'The carbon cycle', {
      b: '**Photosynthesis** removes carbon dioxide; **respiration**, **decomposition** and **combustion** return it.',
      v: V.carbon,
      n: 'Carbon moves in a cycle. Plants take carbon dioxide from the air to make food. Animals eat the plants. Plants, animals and decomposers return carbon dioxide by respiration, and burning fossil fuels returns carbon that was trapped long ago.',
    }),
    sl('summary', 'Summary', {
      ul: ['Destarch first; starch test: water, alcohol in a water bath, warm water, iodine.', 'Black paper: light needed. Potassium hydroxide: carbon dioxide needed. Variegated leaf: chlorophyll needed.', 'Hydrilla bubbles rekindle a glowing splinter: oxygen released.', 'Carbon cycle: photosynthesis takes in carbon dioxide; respiration, decomposition and combustion give it out.'],
      v: table(['Factor tested', 'Method'], [['Light', 'Black paper strip'], ['Carbon dioxide', 'Potassium hydroxide (Moll)'], ['Chlorophyll', 'Variegated leaf'], ['Oxygen released', 'Hydrilla and glowing splinter']], 'Summary table of four factors and the method used to test each'),
      n: 'To recap. Destarch, remove one factor, keep in light, and test for starch. Black paper shows light is needed, potassium hydroxide shows carbon dioxide is needed, and a variegated leaf shows chlorophyll is needed. Hydrilla shows oxygen is given out.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Always state **destarching** and the **control** in an experiment answer.', 'Give the **reason** for each step of the starch test.', '**Potassium hydroxide** absorbs carbon dioxide; **sodium bicarbonate** supplies it.', 'In the carbon cycle, name **all four** processes.'],
      n: 'Exam tips. Mention destarching and the control every time. Give a reason for each step of the starch test. Do not mix up potassium hydroxide, which removes carbon dioxide, with sodium bicarbonate, which adds it. And name all four processes in the carbon cycle.',
    }),
  ],
});
