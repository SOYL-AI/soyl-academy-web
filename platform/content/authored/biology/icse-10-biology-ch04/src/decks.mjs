// ICSE 10 Biology ch04 Transpiration — Part 1 (t01–t03), Part 2 (t04–t06).
import { sl, deck, table, flow, svgV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { STOMA, POTOMETER, BELLJAR, COBALT_FIG, WEIGHT_FIG, POT_CHART } from './svgs.mjs';
import { WEIGHT, POT, BUDGET } from './calc.mjs';

export const V = {
  stoma: svgV(STOMA, 'An open stoma in light and a closed stoma in the dark'),
  potometer: svgV(POTOMETER, "Ganong's potometer"),
  belljar: svgV(BELLJAR, 'Bell jar experiment with a control'),
  cobalt: svgV(COBALT_FIG, 'Cobalt chloride paper on a dorsiventral leaf'),
  weight: svgV(WEIGHT_FIG, 'Loss-of-weight experiment with a leafy and a leafless shoot'),
  chart: svgV(POT_CHART, 'Potometer readings under four conditions'),
  mechanism: flow('LR', [['l', 'Light'], ['k', 'Potassium ions enter guard cells'], ['w', 'Water enters by osmosis'], ['t', 'Guard cells turgid'], ['o', 'Stoma opens']], [['l', 'k'], ['k', 'w'], ['w', 't'], ['t', 'o']], 'Flow: light, potassium ions enter the guard cells, water enters by osmosis, the guard cells become turgid, the stoma opens'),
};

export const deck1 = deck({
  part: 1,
  title: 'Transpiration — Part 1: The process, stomata and experiments',
  goals: [
    'Define transpiration, name its routes and explain its importance',
    'Explain the opening and closing of stomata by potassium ion exchange',
    'Describe the loss-of-weight, bell jar and cobalt chloride paper experiments',
  ],
  slides: [
    sl('title', 'Transpiration', {
      b: 'Part 1 — how plants lose water vapour, how stomata open and close, and how we show it.',
      v: flow('LR', [['r', 'Roots absorb water'], ['x', 'Xylem carries it up'], ['m', 'Leaf cells'], ['s', 'Stomata'], ['a', 'Water vapour to the air']], [['r', 'x'], ['x', 'm'], ['m', 's'], ['s', 'a']], 'Flow: roots absorb water, xylem carries it up to the leaf cells, and water vapour escapes through the stomata into the air'),
      n: 'A large tree can lift hundreds of litres of water from the soil in a single summer day, and almost all of it escapes from the leaves as invisible vapour. This loss is called transpiration. Let us see where the water goes, why it matters and how we can show it happening.',
    }),
    sl('concept', 'What is transpiration?', {
      b: '**Transpiration** is the loss of water as **vapour** from the aerial parts of a plant.',
      v: table(['Route', 'Share of water lost'], [['Stomata (stomatal transpiration)', 'Most of it'], ['Cuticle (cuticular)', 'A small amount'], ['Lenticels in bark (lenticular)', 'Very little']], 'Table of three routes of transpiration: stomata lose most, the cuticle a small amount and lenticels very little'),
      n: 'Water evaporates from the moist walls of the leaf cells into the air spaces, then diffuses out mainly through the tiny pores called stomata. A little also escapes through the waxy cuticle and through lenticels in the bark of woody stems.',
    }),
    sl('concept', 'Why transpiration matters', {
      v: table(['Effect', 'How it helps the plant'], [['Transpiration pull', 'Draws water and minerals up the xylem from the roots'], ['Cooling', 'Evaporation takes away heat from the leaves'], ['Distribution', 'Carries minerals to all parts of the shoot'], ['Water loss', 'Can cause wilting if loss exceeds uptake: a necessary evil']], 'Table of the effects of transpiration and how each helps or harms the plant'),
      n: 'Transpiration is called a necessary evil. It wastes most of the water a plant takes in, and on hot days can make it wilt. But it also pulls water and minerals up to the leaves and cools them, just as sweating cools us.',
    }),
    sl('diagram', 'The stomatal apparatus', {
      b: 'Each **stoma** is a pore between two bean-shaped **guard cells**, which have **chloroplasts** and a **thick inner wall**.',
      v: V.stoma,
      n: 'Look closely at a stoma. Two kidney shaped guard cells face each other. Their walls next to the pore are thick, their outer walls thin. When the guard cells swell, the thin walls stretch more, the cells bow apart and the pore opens. When they shrink, the pore closes.',
    }),
    sl('concept', 'Potassium ion exchange', {
      b: 'In **light**, potassium ions enter the guard cells; in **darkness** they leave.',
      v: V.mechanism,
      n: 'In light, potassium ions move into the guard cells from the cells around them. The guard cells now hold more dissolved substances, so water flows in by osmosis. They become turgid and the pore opens. At night the ions move out, water follows, and the pore closes.',
    }),
    sl('check', 'Quick check: the pore', {
      b: 'Which lettered part lets water vapour escape?',
      chk: 'fig-pore-mcq',
      n: 'Look for the opening between the two guard cells.',
    }),
    sl('example', 'Worked example 1: how much water is lost?', {
      b: `A potted plant absorbed **${BUDGET.absorbed} mL** of water in a day and kept only **${BUDGET.kept} mL**.`,
      ul: [`Step 1: water lost = ${BUDGET.absorbed} − ${BUDGET.kept} = **${BUDGET.lost} mL**.`, `Step 2: percentage = ${BUDGET.lost} ÷ ${BUDGET.absorbed} × 100 = **${BUDGET.pctLost} per cent**.`, 'Step 3: conclude: almost all the water absorbed is lost by transpiration.'],
      v: table(['Quantity', 'mL'], [['Absorbed', String(BUDGET.absorbed)], ['Kept by the plant', String(BUDGET.kept)], ['Lost by transpiration', String(BUDGET.lost)]], `Worked table: of ${BUDGET.absorbed} millilitres absorbed, ${BUDGET.kept} were kept and ${BUDGET.lost} lost`),
      n: 'Subtract what the plant keeps from what it absorbs, then turn the answer into a percentage. Nearly ninety nine parts in every hundred are lost. That is why measuring water uptake gives a good estimate of transpiration.',
    }),
    sl('check', 'Quick check: which ions?', {
      b: 'Fill in: stomata open when ______ ions enter the guard cells.',
      chk: 'kion-fill',
      n: 'The element with the symbol K.',
    }),
    sl('diagram', 'Experiment: the bell jar', {
      b: 'Cover the **pot and soil** with polythene, place the plant under a **bell jar**, and set up a **control** without a plant. Drops of water form only in the jar with the plant.',
      v: V.belljar,
      n: 'The polythene stops water evaporating from the soil, so any moisture must come from the plant. After a few hours the jar with the plant mists over, while the control stays clear. Blue cobalt chloride paper turning pink would confirm that the drops are water.',
    }),
    sl('diagram', 'Experiment: cobalt chloride paper', {
      b: 'Dry **blue** cobalt chloride paper on both surfaces of a **dorsiventral** leaf: the paper on the **lower** surface turns **pink** first, because it has **more stomata**.',
      v: V.cobalt,
      n: 'Cobalt chloride paper is blue when dry and pink when damp. Clipped under glass slides to both sides of a hibiscus leaf, the lower paper turns pink first. The lower surface of such a leaf has many more stomata than the upper surface.',
    }),
    sl('example', 'Worked example 2: the loss-of-weight experiment', {
      b: `Flask A (leafy shoot) and flask B (leaves removed), each with an oil layer, were weighed over **${WEIGHT.hours} hours**.`,
      ul: [`Step 1: A lost ${WEIGHT.leafy.start.toFixed(1)} − ${WEIGHT.leafy.end.toFixed(1)} = **${WEIGHT.leafy.loss} g**; B lost **${WEIGHT.leafless.loss} g**.`, `Step 2: rate for A = ${WEIGHT.leafy.loss} ÷ ${WEIGHT.hours} = **${WEIGHT.leafy.rate} g per hour**.`, `Step 3: leaves alone lost about ${WEIGHT.leafy.loss} − ${WEIGHT.leafless.loss} = **${WEIGHT.byLeaves} g**: most water is lost through the leaves.`],
      v: V.weight,
      n: 'The oil stops water evaporating from the flask, so the only loss is through the shoot. The leafy shoot lost far more weight than the leafless one. Subtracting the two tells us how much water left through the leaves alone.',
    }),
    sl('check', 'Quick check: cobalt chloride', {
      b: 'Dry cobalt chloride paper is…',
      chk: 'cobalt-mcq',
      n: 'Think of its colour before and after it gets damp.',
    }),
    sl('summary', 'Summary', {
      ul: ['Transpiration: loss of water vapour, mainly through stomata.', 'It causes transpiration pull and cooling, but wastes water.', 'Stomata open when potassium ions and water enter the guard cells; close when they leave.', 'Bell jar, cobalt chloride paper and loss of weight all show water loss by the leaves.'],
      v: table(['Experiment', 'Key observation'], [['Bell jar', 'Drops inside the jar'], ['Cobalt chloride paper', 'Lower surface turns pink first'], ['Loss of weight', 'Leafy shoot loses more weight']], 'Summary table of three experiments and their key observations'),
      n: 'To recap. Plants lose most of the water they absorb as vapour through stomata. Guard cells open the stomata by taking in potassium ions and water. And three simple experiments show that the water is lost mainly from the leaves.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Always mention the **control** and the **precaution** (polythene, oil, glass slides) in experiment answers.', 'Cobalt chloride: **blue to pink**.', 'Explain stomatal opening in order: **potassium ions → osmosis → turgid → open**.', 'Say **water vapour**, not water, for transpiration.'],
      n: 'Exam tips. In every experiment answer, give the control and the precaution. Remember blue to pink. Explain the stomata in order: ions, osmosis, turgor, opening. And write water vapour when you describe transpiration.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: "Transpiration — Part 2: Potometer, factors, guttation",
  goals: [
    "Explain how Ganong's potometer measures water uptake and state its limitations",
    'Predict the effect of light, temperature, humidity and wind, and describe adaptations that reduce water loss',
    'Distinguish guttation from transpiration and from bleeding',
  ],
  slides: [
    sl('title', 'Measuring and Controlling Water Loss', {
      b: 'Part 2 — the potometer, what speeds transpiration up or slows it down, and other ways plants lose water.',
      v: flow('LR', [['p', 'Measure: potometer'], ['f', 'Factors: light, heat, humidity, wind'], ['a', 'Adaptations'], ['g', 'Guttation and bleeding']], [['p', 'f'], ['f', 'a'], ['a', 'g']], 'Flow: measuring with the potometer, factors affecting transpiration, adaptations, and guttation and bleeding'),
      n: 'Can we measure how fast a plant loses water? Yes, with a simple glass apparatus called a potometer. In this part we use it to test what speeds transpiration up or slows it down, see how desert plants save water, and meet two other ways plants give out water.',
    }),
    sl('diagram', "Ganong's potometer", {
      b: 'A **leafy shoot** in an airtight, water-filled apparatus; as it takes up water, an **air bubble** moves along a **graduated capillary** towards the shoot.',
      v: V.potometer,
      n: 'The shoot is fixed into the potometer with an airtight cork. As the leaves lose water, the shoot draws more up, and the whole column of water moves. An air bubble in the capillary tube shows the movement. The faster the bubble, the faster the water uptake.',
    }),
    sl('concept', 'Using the potometer', {
      v: table(['Step', 'Reason'], [['Cut the shoot under water', 'Keeps air out of the xylem'], ['Seal all joints with Vaseline', 'Keeps the apparatus airtight'], ['Let in one air bubble', 'Marks the movement of water'], ['Time the bubble over a fixed distance', 'Gives the rate of water uptake'], ['Open the reservoir stopcock', 'Pushes the bubble back to the start']], 'Table of steps in using a potometer and the reason for each'),
      n: 'Each step has a reason. Cut the shoot under water so no air blocks the xylem. Seal the joints so no air leaks in. Then time the bubble, and use the reservoir to send it back to the start for the next reading.',
    }),
    sl('concept', 'Limitations of the potometer', {
      v: table(['Limitation', 'Why'], [['Measures uptake, not loss', 'A little absorbed water is used or kept by the shoot'], ['Uses a cut shoot', 'Not a whole plant with roots'], ['Air leaks spoil readings', 'The bubble moves for the wrong reason'], ['Temperature changes', 'Water and air expand or contract']], 'Table of four limitations of the potometer and why each arises'),
      n: 'A potometer measures how much water the shoot takes in, not how much vapour it gives out. Since nearly all absorbed water is lost, the two are close but not the same. A cut shoot, leaks and temperature changes add further errors.',
    }),
    sl('check', 'Quick check: the reservoir', {
      b: 'What is the reservoir used for?',
      chk: 'reservoir-mcq',
      n: 'Think about starting a new reading.',
    }),
    sl('example', 'Worked example 1: reading a potometer', {
      b: `The bubble moved these distances in **${POT.minutes} minutes**.`,
      ul: [`Step 1: still air and bright light: ${POT.rows[0].mm} ÷ ${POT.minutes} = **${POT.rows[0].rate} mm per minute**.`, `Step 2: with a fan: **${POT.rows[1].rate}** mm per minute, ${POT.fanTimes} times faster.`, `Step 3: dark cupboard **${POT.rows[2].rate}**; plastic bag **${POT.rows[3].rate}**: both much slower.`],
      v: V.chart,
      n: 'Divide each distance by the time to get a rate, then compare. Wind more than doubles the rate. Darkness closes the stomata, and a plastic bag fills with humid air, so both slow the bubble right down.',
    }),
    sl('check', 'Quick check: the fastest rate', {
      b: 'Under which condition was uptake fastest?',
      chk: 'fastest-mcq',
      n: 'Find the longest bar.',
    }),
    sl('concept', 'Factors affecting transpiration', {
      v: table(['Factor', 'Effect on rate', 'Reason'], [['Light', 'Increases', 'Stomata open'], ['Temperature', 'Increases', 'Faster evaporation; air holds more vapour'], ['Humidity', 'Decreases', 'Less difference in moisture between leaf and air'], ['Wind', 'Increases', 'Moist air around the leaf is blown away'], ['Water in the soil', 'Low water: decreases', 'Stomata close when the plant is short of water']], 'Table of five factors, their effect on the rate of transpiration and the reason'),
      n: 'Bright, hot, dry and windy conditions make plants lose water fastest. Dark, cool, humid and still conditions slow it down. Each factor works by changing either the opening of stomata or how easily water vapour can diffuse away.',
    }),
    sl('concept', 'Adaptations that reduce water loss', {
      v: table(['Adaptation', 'Example', 'How it helps'], [['Leaves reduced to spines', 'Opuntia (cactus)', 'Very little surface for water loss'], ['Thick waxy cuticle', 'Many desert plants', 'Waterproof covering'], ['Sunken stomata', 'Desert plants such as oleander', 'Moist air trapped above the pore'], ['Fewer stomata, mostly on the lower surface', 'Dorsiventral leaves', 'Less exposure to sun and wind'], ['Leaf fall in the dry season', 'Many deciduous trees', 'Removes most transpiring surface']], 'Table of five adaptations that reduce water loss, with examples and how each helps'),
      n: 'Desert plants are experts at saving water. A cactus has spines instead of leaves and a waxy green stem. Others hide their stomata in pits or roll their leaves. Many trees simply drop their leaves when water is scarce.',
    }),
    sl('example', 'Worked example 2: predicting the rate', {
      b: 'A potometer is carried from a bright, dry, breezy balcony into a dark, steamy bathroom.',
      ul: ['Step 1: **dark**: stomata close, rate falls.', 'Step 2: **humid** and **still** air: diffusion slows, rate falls.', 'Step 3: all factors act together: the bubble **slows down greatly**.'],
      v: table(['Factor', 'Balcony', 'Bathroom', 'Effect'], [['Light', 'Bright', 'Dark', 'Lower'], ['Humidity', 'Dry', 'Humid', 'Lower'], ['Wind', 'Breezy', 'Still', 'Lower']], 'Worked table comparing light, humidity and wind on a balcony and in a bathroom, each lowering the rate'),
      n: 'Take one factor at a time and decide whether it raises or lowers the rate. Here every factor lowers it, so the prediction is easy. When factors pull in opposite directions, say which one is likely to matter most.',
    }),
    sl('concept', 'Guttation and bleeding', {
      v: table(['Point', 'Transpiration', 'Guttation', 'Bleeding'], [['Form of water', 'Vapour', 'Liquid drops with salts', 'Sap'], ['Where', 'Stomata of leaves', 'Hydathodes at leaf tips and margins', 'Cut or injured parts'], ['When', 'Mostly by day', 'Night and early morning', 'After injury'], ['Cause', 'Evaporation', 'Root pressure, low transpiration', 'Root pressure']], 'Table comparing transpiration, guttation and bleeding in form, place, time and cause'),
      n: 'On humid mornings you may see beads of water on the tips of grass blades. This is guttation, pushed out by root pressure through special pores called hydathodes. Bleeding is different: it is sap oozing from a cut or wounded part of a plant.',
    }),
    sl('check', 'Quick check: guttation drops', {
      b: 'True or false: the liquid of guttation is pure water.',
      chk: 'gutt-tf',
      n: 'What does root pressure push up from the soil along with water?',
    }),
    sl('summary', 'Summary', {
      ul: ["Ganong's potometer measures water uptake, which approximates transpiration.", 'Light, heat and wind increase transpiration; humidity decreases it.', 'Desert plants reduce water loss with spines, thick cuticles and sunken stomata.', 'Guttation: liquid through hydathodes; bleeding: sap from wounds.'],
      v: table(['Condition', 'Rate'], [['Bright, hot, dry, windy', 'High'], ['Dark, cool, humid, still', 'Low']], 'Summary table: bright, hot, dry and windy conditions give a high rate; dark, cool, humid and still give a low rate'),
      n: 'To recap. The potometer lets us measure water uptake and test the factors. Hot, dry, windy, bright conditions speed transpiration up. Desert plants slow it down. And guttation and bleeding are two other ways water leaves a plant.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['A potometer measures **uptake**, not loss: say "approximately".', 'For a factor, give the **effect** and the **reason**.', 'Guttation: **liquid**, **hydathodes**, **root pressure**.', 'Name a **precaution** for the potometer: cut under water, airtight joints.'],
      n: 'Exam tips. Say the potometer measures uptake, so it is only approximate. Give a reason with every factor. Link guttation with liquid, hydathodes and root pressure. And always add the potometer precautions.',
    }),
  ],
});
